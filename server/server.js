require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const authRoutes = require('./src/routes/authRoutes');
const commentRoutes = require('./src/routes/commentRoutes');
const savedRoutes = require('./src/routes/savedRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 8701;
const CUSTOM_QUIZZES_PATH = path.join(__dirname, 'custom_quizzes.json');
const DELETED_QUIZZES_PATH = path.join(__dirname, 'deleted_quiz_ids.json');
const ADMIN_MASTER_KEY = 'nhu';

// Enable Gzip/Brotli HTTP compression
app.use(compression());

// Security Hardening Headers (OWASP & Lighthouse Audit Compliant)
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval';");
  next();
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate Limiting: Max 5000 requests per minute (High capacity for batch learning & comment counts)
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5000,
  message: {
    success: false,
    message: 'Quá nhiều truy vấn từ IP của bạn, vui lòng thử lại sau 1 phút.'
  }
});

app.use('/api/', apiLimiter);

// ----------------------------------------------------
// 1. QuizzFlow v2.0 Routes (Auth, Discussions, Saved & Admin)
// ----------------------------------------------------
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/saved-questions', savedRoutes);
app.use('/api/admin', adminRoutes);

// ----------------------------------------------------
// 1.5. On-Demand Secure Quiz Content API (Pure RAM Cache)
// ----------------------------------------------------
const QUIZZES_DIR = path.join(__dirname, 'quizzes', 'current');
const quizCache = new Map();

function initQuizCache() {
  try {
    if (!fs.existsSync(QUIZZES_DIR)) {
      console.warn('Quizzes directory not found at:', QUIZZES_DIR);
      return;
    }
    const files = fs.readdirSync(QUIZZES_DIR);
    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const filePath = path.join(QUIZZES_DIR, file);
          const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          const rawQuestions = raw.questionsList || raw.questions || [];
          const normalized = {
            id: file.replace('.json', ''),
            rawId: raw.id,
            title: raw.name || file.replace('.json', ''),
            originalName: raw.name,
            questions: rawQuestions.map((q, idx) => {
              const rawAnswers = q.answersList || q.answers || [];
              return {
                id: q.id || idx + 1,
                questionIndex: idx,
                content: q.content || 'Câu hỏi không có nội dung',
                explanation: q.explanation || '',
                answers: rawAnswers.map((a, aIdx) => ({
                  id: a.id || aIdx + 1,
                  content: a.content || '',
                  isCorrect: a.isCorrect !== undefined ? Boolean(a.isCorrect) : Boolean(a.is_correct),
                }))
              };
            })
          };
          const baseName = file.replace('.json', '').toLowerCase();
          quizCache.set(baseName, normalized);
          quizCache.set(file.toLowerCase(), normalized);
          if (raw.id) quizCache.set(String(raw.id).toLowerCase(), normalized);
        } catch (e) {
          console.error(`Error loading quiz file ${file}:`, e);
        }
      }
    }
    console.log(`[QuizEngine] Pre-loaded ${quizCache.size} quiz mappings into RAM cache.`);
  } catch (err) {
    console.error('Error initializing quiz cache:', err);
  }
}

initQuizCache();

app.get('/api/quizzes/content/:quizId', (req, res) => {
  const quizId = String(req.params.quizId || '').trim().toLowerCase();
  
  if (quizCache.has(quizId)) {
    return res.json({ success: true, quiz: quizCache.get(quizId) });
  }

  const customQuizzes = readCustomQuizzes();
  const custom = customQuizzes.find(q => String(q.id).toLowerCase() === quizId);
  if (custom) {
    return res.json({ success: true, quiz: custom });
  }

  for (const [key, val] of quizCache.entries()) {
    if (key.includes(quizId) || quizId.includes(key)) {
      return res.json({ success: true, quiz: val });
    }
  }

  return res.status(404).json({ success: false, message: 'Quiz not found' });
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    version: '2.0.0',
    app: 'QuizzFlow Production Server',
    timestamp: new Date().toISOString()
  });
});

// ----------------------------------------------------
// 2. Legacy / Community Quizzes Persistence APIs
// ----------------------------------------------------
function readCustomQuizzes() {
  try {
    if (!fs.existsSync(CUSTOM_QUIZZES_PATH)) {
      fs.writeFileSync(CUSTOM_QUIZZES_PATH, JSON.stringify([], null, 2), 'utf8');
      return [];
    }
    const data = fs.readFileSync(CUSTOM_QUIZZES_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading custom_quizzes.json:', err);
    return [];
  }
}

function writeCustomQuizzes(quizzes) {
  try {
    fs.writeFileSync(CUSTOM_QUIZZES_PATH, JSON.stringify(quizzes, null, 2), 'utf8');
    setImmediate(() => triggerGitHubBackup());
  } catch (err) {
    console.error('Error writing custom_quizzes.json:', err);
  }
}

function readDeletedQuizIds() {
  try {
    if (!fs.existsSync(DELETED_QUIZZES_PATH)) {
      fs.writeFileSync(DELETED_QUIZZES_PATH, JSON.stringify([], null, 2), 'utf8');
      return [];
    }
    const data = fs.readFileSync(DELETED_QUIZZES_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading deleted_quiz_ids.json:', err);
    return [];
  }
}

function writeDeletedQuizIds(deletedIds) {
  try {
    fs.writeFileSync(DELETED_QUIZZES_PATH, JSON.stringify(deletedIds, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing deleted_quiz_ids.json:', err);
  }
}

function triggerGitHubBackup() {
  const repoDir = path.join(__dirname, '../');
  const gitCmd = 'cd ' + repoDir + ' && git add . && git commit -m "backup: update community custom quizzes" && git push origin main';
  exec(gitCmd, (error, stdout, stderr) => {
    if (error) {
      console.log('GitHub backup log:', stderr || error.message);
    } else {
      console.log('GitHub backup pushed successfully');
    }
  });
}

app.get('/api/quizzes', (req, res) => {
  const customQuizzes = readCustomQuizzes();
  const deletedQuizIds = readDeletedQuizIds();
  res.json({ customQuizzes, deletedQuizIds });
});

app.post('/api/quizzes/create', (req, res) => {
  const newQuiz = req.body;
  if (!newQuiz || !newQuiz.id || !newQuiz.title) {
    return res.status(400).json({ error: 'Invalid quiz payload' });
  }

  const quizzes = readCustomQuizzes();
  const existingIdx = quizzes.findIndex(q => q.id === newQuiz.id);
  if (existingIdx >= 0) {
    quizzes[existingIdx] = newQuiz;
  } else {
    quizzes.unshift(newQuiz);
  }

  writeCustomQuizzes(quizzes);

  let deletedIds = readDeletedQuizIds();
  if (deletedIds.includes(newQuiz.id)) {
    deletedIds = deletedIds.filter(id => id !== newQuiz.id);
    writeDeletedQuizIds(deletedIds);
  }

  res.json({ success: true, quiz: newQuiz });
});

app.post('/api/quizzes/verify-password', (req, res) => {
  const { quizId, password } = req.body;
  const inputPassword = String(password || '').trim();

  if (inputPassword === ADMIN_MASTER_KEY) {
    return res.json({ valid: true });
  }

  const quizzes = readCustomQuizzes();
  const target = quizzes.find(q => q.id === quizId);
  const quizPassword = String(target?.password || '').trim();

  const isValid = quizPassword !== '' && inputPassword === quizPassword;
  res.json({ valid: isValid });
});

app.post('/api/quizzes/update', (req, res) => {
  const { quizId, password, updatedSet } = req.body;
  const inputPassword = String(password || '').trim();

  const quizzes = readCustomQuizzes();
  const target = quizzes.find(q => q.id === quizId);
  const quizPassword = String(target?.password || '').trim();

  const isAuthorized = inputPassword === ADMIN_MASTER_KEY || (quizPassword !== '' && inputPassword === quizPassword);

  if (!isAuthorized) {
    return res.status(403).json({ error: 'Mật khẩu không chính xác' });
  }

  const idx = quizzes.findIndex(q => q.id === quizId);
  if (idx >= 0) {
    quizzes[idx] = { ...quizzes[idx], ...updatedSet };
    writeCustomQuizzes(quizzes);
  }

  res.json({ success: true });
});

app.post('/api/quizzes/delete', (req, res) => {
  const { quizId, password } = req.body;
  const inputPassword = String(password || '').trim();

  const quizzes = readCustomQuizzes();
  const target = quizzes.find(q => q.id === quizId);
  const quizPassword = String(target?.password || '').trim();

  const isAuthorized = inputPassword === ADMIN_MASTER_KEY || (quizPassword !== '' && inputPassword === quizPassword);

  if (!isAuthorized) {
    return res.status(403).json({ error: 'Mật khẩu không chính xác' });
  }

  let deletedIds = readDeletedQuizIds();
  if (!deletedIds.includes(quizId)) {
    deletedIds.push(quizId);
    writeDeletedQuizIds(deletedIds);
  }

  const updatedQuizzes = quizzes.filter(q => q.id !== quizId);
  writeCustomQuizzes(updatedQuizzes);

  res.json({ success: true, deletedQuizId: quizId });
});

// ----------------------------------------------------
// 3. Static Assets & Frontend Routing Fallback
// ----------------------------------------------------
const webDistPath = path.join(__dirname, '../web_dist');
app.use(express.static(webDistPath, {
  maxAge: '1y',
  immutable: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html') || filePath.endsWith('robots.txt')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    const indexPath = path.join(webDistPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      return res.sendFile(indexPath);
    }
  }
  res.status(404).json({ error: 'Not found' });
});

// ----------------------------------------------------
// 4. Start Server
// ----------------------------------------------------
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 QuizzFlow Production Server running on port ${PORT}`);
});
