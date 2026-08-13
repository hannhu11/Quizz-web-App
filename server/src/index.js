require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. CORS Setup
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Body Parser
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// 3. Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: {
    success: false,
    message: 'Quá nhiều truy vấn từ IP của bạn, vui lòng thử lại sau 1 phút.'
  }
});

app.use('/api/', apiLimiter);

// 4. API Routes
app.use('/api/auth', authRoutes);

// 5. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    version: '2.0.0',
    app: 'QuizzFlow Backend Server',
    timestamp: new Date().toISOString()
  });
});

// 6. Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 QuizzFlow Backend Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
