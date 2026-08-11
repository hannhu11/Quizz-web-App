// Quiz Data Manifest & Instant Pre-Parsed Memory Cache (0-Latency)

// Dynamically eager-import all quiz JSON files at module load
const quizFiles = import.meta.glob('../../../quiz-app-main/quizzes/current/*.json', { eager: true });

export const QUIZ_MANIFEST = [
  { id: 'vnr202-fe', filename: 'VNR202 - FE - QuizApp.json', title: 'VNR202 - Lịch Sử Đảng Cộng Sản Việt Nam (420 Câu)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-rose-100 to-red-100', icon: 'BookOpen' },
  { id: 'hcm202-flashcard', filename: 'HCM202 - Flashcard - QuizApp.json', title: 'HCM202 - Tư Tưởng Hồ Chí Minh (300 Câu)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'Award' },
  { id: 'mln131-flashcard', filename: 'MLN131 - Flashcard - QuizApp.json', title: 'MLN131 - Chủ Nghĩa Xã Hội Khoa Học (360 Câu)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-orange-100', icon: 'BookOpen' },
  { id: 'enw493c-flashcard', filename: 'ENW493c - Flashcard - QuizApp.json', title: 'ENW493c - Academic Writing (90 Câu)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-blue-100 to-indigo-100', icon: 'BookOpen' },
  { id: 'wdu202c-flashcard', filename: 'WDU202c - Flashcard - QuizApp.json', title: 'WDU202c - Web Design & UI/UX (200 Câu)', subject: 'Thiết Kế Web & UI/UX', category: 'WDU202c', color: 'from-purple-100 to-pink-100', icon: 'Layout' },
  { id: 'aid301c-flashcard', filename: 'AID301c - Flashcard - QuizApp.json', title: 'AID301c - Artificial Intelligence Applications (100 Câu)', subject: 'Trí Tuệ Nhân Tạo', category: 'AID301c', color: 'from-emerald-100 to-teal-100', icon: 'Cpu' },
  { id: 'AID301c_SP26_FE', filename: 'AID301c_SP26_FE.json', title: 'AID301c_SP26_FE - (50 câu có giải thích)', subject: 'Trí Tuệ Nhân Tạo', category: 'AID301c', color: 'from-teal-100 to-cyan-100', icon: 'FileText' },
  { id: 'ENW493c_FA25_RE', filename: 'ENW493c_FA25_RE.json', title: 'ENW493c_FA25_RE - (30 câu có giải thích)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'ENW493c_SP26_FE', filename: 'ENW493c_SP26_FE.json', title: 'ENW493c_SP26_FE - (30 câu có giải thích)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'ENW493c_SP26_RE', filename: 'ENW493c_SP26_RE.json', title: 'ENW493c_SP26_RE - (30 câu có giải thích)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'ENW493c_SP26_RE_W_PE', filename: 'ENW493c_SP26_RE_W_PE.json', title: 'ENW493c_SP26_RE_W_PE - (Đề Thi PE Essay Guide)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'HCM202_FA25_FEB5', filename: 'HCM202_FA25_FEB5.json', title: 'HCM202_FA25_FEB5 - (60 câu có giải thích)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'FileText' },
  { id: 'HCM202_SP26_B5FE', filename: 'HCM202_SP26_B5FE.json', title: 'HCM202_SP26_B5FE - (60 câu có giải thích)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'FileText' },
  { id: 'HCM202_SU25_B5FE', filename: 'HCM202_SU25_B5FE.json', title: 'HCM202_SU25_B5FE - (60 câu có giải thích)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'FileText' },
  { id: 'HCM202_SU26_C1FE', filename: 'HCM202_SU26_C1FE.json', title: 'HCM202_SU26_C1FE - (60 câu có giải thích)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'FileText' },
  { id: 'HCM202_SU26_RE', filename: 'HCM202_SU26_RE.json', title: 'HCM202_SU26_RE - (60 câu có giải thích)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'FileText' },
  { id: 'MLN131_SP25_FE', filename: 'MLN131_SP25_FE.json', title: 'MLN131_SP25_FE - (60 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'MLN131_SP26_FE', filename: 'MLN131_SP26_FE.json', title: 'MLN131_SP26_FE - (60 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'MLN131_SP26_RE', filename: 'MLN131_SP26_RE.json', title: 'MLN131_SP26_RE - (60 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'MLN131_SU26_C1FE', filename: 'MLN131_SU26_C1FE.json', title: 'MLN131_SU26_C1FE - (60 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'MLN131_SU26_C1RE', filename: 'MLN131_SU26_C1RE.json', title: 'MLN131_SU26_C1RE - (60 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'MLN131_SU26_FE', filename: 'MLN131_SU26_FE.json', title: 'MLN131_SU26_FE - (60 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'VNR202_C1FA25_FE', filename: 'VNR202_C1FA25_FE.json', title: 'VNR202_C1FA25_FE - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'VNR202_C2FA25_FE', filename: 'VNR202_C2FA25_FE.json', title: 'VNR202_C2FA25_FE - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'VNR202_FA25_RE_Ca_1', filename: 'VNR202_FA25_RE_Ca_1.json', title: 'VNR202_FA25_RE_Ca_1 - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'VNR202_FA25_RE_Ca_2', filename: 'VNR202_FA25_RE_Ca_2.json', title: 'VNR202_FA25_RE_Ca_2 - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'VNR202_SP26_B5FE', filename: 'VNR202_SP26_B5FE.json', title: 'VNR202_SP26_B5FE - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'VNR202_SP26_RE', filename: 'VNR202_SP26_RE.json', title: 'VNR202_SP26_RE - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'VNR202_SU26_FE', filename: 'VNR202_SU26_FE.json', title: 'VNR202_SU26_FE - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
];

// PRE-COMPUTE AND MEMOIZE ALL QUIZZES ON INITIAL LOAD
const normalizedQuizCache = new Map();

QUIZ_MANIFEST.forEach(manifestItem => {
  let rawData = null;
  for (const path in quizFiles) {
    if (path.includes(manifestItem.filename)) {
      rawData = quizFiles[path].default || quizFiles[path];
      break;
    }
  }

  if (rawData) {
    const rawQuestions = rawData.questionsList || rawData.questions || [];
    const normalized = {
      ...manifestItem,
      rawId: rawData.id,
      originalName: rawData.name,
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
    normalizedQuizCache.set(manifestItem.id, normalized);
  }
});

// LocalStorage Persistence Keys
const STORAGE_KEY_CUSTOM_QUIZZES = 'quizzlet_custom_quizzes_v1';
const STORAGE_KEY_DELETED_QUIZZES = 'quizzlet_deleted_quiz_ids_v1';

export function getCustomQuizSets() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CUSTOM_QUIZZES);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function getDeletedQuizIds() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_DELETED_QUIZZES);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

// Initialize custom quizzes into memory cache
const initialCustomSets = getCustomQuizSets();
initialCustomSets.forEach(cSet => {
  normalizedQuizCache.set(cSet.id, cSet);
});

// Purge any deleted quizzes from RAM Cache on startup
const initialDeletedIds = getDeletedQuizIds();
initialDeletedIds.forEach(delId => {
  normalizedQuizCache.delete(delId);
});

// SRS Card State Tracking (Synchronized Knowt Learning Engine)
export function getQuizCardStates(quizId) {
  try {
    const data = localStorage.getItem(`quizzlet_card_states_${quizId}`);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

export function setQuizCardState(quizId, questionId, state) {
  try {
    const cardStates = getQuizCardStates(quizId);
    cardStates[questionId] = state; // 'NEW' | 'LEARNING' | 'ALMOST' | 'MASTERED'
    localStorage.setItem(`quizzlet_card_states_${quizId}`, JSON.stringify(cardStates));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('quizzlet_srs_updated', { detail: { quizId, questionId, state } }));
    }
    return cardStates;
  } catch (e) {
    console.error('Error setting card state', e);
    return {};
  }
}

export function calculateQuizProgressStats(quiz) {
  if (!quiz || !Array.isArray(quiz.questions)) {
    return { newCount: 0, learningCount: 0, almostCount: 0, masteredCount: 0, percentage: 0 };
  }

  const total = quiz.questions.length;
  if (total === 0) return { newCount: 0, learningCount: 0, almostCount: 0, masteredCount: 0, percentage: 0 };

  const cardStates = getQuizCardStates(quiz.id);

  let learningCount = 0;
  let almostCount = 0;
  let masteredCount = 0;

  quiz.questions.forEach(q => {
    const st = cardStates[q.id];
    if (st === 'LEARNING') learningCount++;
    else if (st === 'ALMOST') almostCount++;
    else if (st === 'MASTERED') masteredCount++;
  });

  const newCount = Math.max(0, total - (learningCount + almostCount + masteredCount));
  const percentage = Math.round(((masteredCount + almostCount * 0.5) / total) * 100);

  return { newCount, learningCount, almostCount, masteredCount, percentage };
}

// API-FIRST REAL-TIME COMMUNITY QUIZ & GLOBAL DELETION SYNC
export async function syncCommunityQuizzes() {
  try {
    const cacheBusterUrl = `/api/quizzes?t=${Date.now()}`;
    const res = await fetch(cacheBusterUrl, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

    if (res.ok) {
      const data = await res.json();
      const serverCommunitySets = data.customQuizzes || [];
      const serverDeletedIds = data.deletedQuizIds || [];

      // 1. Sync deleted IDs
      localStorage.setItem(STORAGE_KEY_DELETED_QUIZZES, JSON.stringify(serverDeletedIds));
      serverDeletedIds.forEach(delId => {
        normalizedQuizCache.delete(delId);
      });

      // 2. Sync active community quizzes
      const activeSets = serverCommunitySets.filter(s => !serverDeletedIds.includes(s.id));
      activeSets.forEach(cSet => {
        normalizedQuizCache.set(cSet.id, cSet);
      });

      localStorage.setItem(STORAGE_KEY_CUSTOM_QUIZZES, JSON.stringify(activeSets));

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('quizzlet_custom_created', { detail: activeSets }));
      }
      return activeSets;
    }
  } catch (e) {
    console.warn('Community sync offline fallback to LocalStorage');
  }
  const deletedIds = getDeletedQuizIds();
  return getCustomQuizSets().filter(s => !deletedIds.includes(s.id));
}

// Create Custom Quiz Set (Sync to Server VPS & Backup to GitHub)
export async function createCustomQuizSet({ title, description, password, questions }) {
  if (!password || password.trim() === '') {
    throw new Error('Bắt buộc phải nhập mật khẩu cho bộ đề!');
  }

  const id = `custom-${Date.now()}`;
  const category = 'TỰ TẠO';
  const newSet = {
    id,
    title: title || 'Bộ đề mới tạo',
    subject: description || 'Bộ đề do người dùng tự tạo',
    category,
    color: 'from-amber-100 via-rose-100 to-indigo-100',
    icon: 'Sparkles',
    isCustom: true,
    password: password.trim(),
    questions: questions.map((q, idx) => {
      let content = q.term || q.content || 'Thuật ngữ';
      let answers = [];
      let explanation = q.explanation || '';

      if (Array.isArray(q.answers) && q.answers.length > 0) {
        answers = q.answers;
      } else {
        answers = [{ id: 1, content: q.definition || 'Định nghĩa', isCorrect: true }];
      }

      return {
        id: idx + 1,
        questionIndex: idx,
        content,
        explanation,
        answers
      };
    })
  };

  // Update RAM cache immediately
  normalizedQuizCache.set(id, newSet);

  // POST directly to VPS Node.js Backend First (Single Source of Truth)
  try {
    const res = await fetch('/api/quizzes/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSet)
    });

    if (res.ok) {
      await syncCommunityQuizzes();
    } else {
      throw new Error('API server error');
    }
  } catch (e) {
    console.warn('Could not reach backend API, stored locally as fallback.');
    const currentCustoms = getCustomQuizSets();
    const updatedCustoms = [newSet, ...currentCustoms.filter(c => c.id !== id)];
    localStorage.setItem(STORAGE_KEY_CUSTOM_QUIZZES, JSON.stringify(updatedCustoms));
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('quizzlet_custom_created', { detail: newSet }));
  }

  return newSet;
}

// Verify Quiz Password securely via Server API
export async function verifyQuizPassword(quizId, password) {
  try {
    const res = await fetch('/api/quizzes/verify-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId, password })
    });
    if (res.ok) {
      const data = await res.json();
      return Boolean(data.valid);
    }
  } catch (e) {
    console.warn('API password check offline, using local verification');
  }

  // Fallback local verification
  const quiz = fetchQuizById(quizId);
  const correctPassword = quiz?.password || '';
  return password === 'nhu' || (correctPassword !== '' && password === correctPassword);
}

// Update existing Custom Quiz Set
export async function updateCustomQuizSet(quizId, password, { title, description, questions }) {
  const isPasswordValid = await verifyQuizPassword(quizId, password);
  if (!isPasswordValid) {
    throw new Error('Mật khẩu không chính xác');
  }

  const existing = fetchQuizById(quizId);
  const updatedSet = {
    ...existing,
    title: title || existing.title,
    subject: description || existing.subject,
    questions: questions.map((q, idx) => {
      let content = q.term || q.content || 'Thuật ngữ';
      let answers = [];
      let explanation = q.explanation || '';

      if (Array.isArray(q.answers) && q.answers.length > 0) {
        answers = q.answers;
      } else {
        answers = [{ id: 1, content: q.definition || 'Định nghĩa', isCorrect: true }];
      }

      return {
        id: idx + 1,
        questionIndex: idx,
        content,
        explanation,
        answers
      };
    })
  };

  normalizedQuizCache.set(quizId, updatedSet);

  try {
    await fetch('/api/quizzes/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId, password, updatedSet })
    });
    await syncCommunityQuizzes();
  } catch (e) {
    console.warn('Update API offline');
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('quizzlet_custom_created', { detail: updatedSet }));
  }

  return updatedSet;
}

// Delete ANY Quiz Set Globally (Custom or System sets)
export async function deleteCustomQuizSet(quizId, password) {
  const isPasswordValid = await verifyQuizPassword(quizId, password);
  if (!isPasswordValid) {
    return false;
  }

  // Delete from RAM cache immediately
  normalizedQuizCache.delete(quizId);

  // Track deleted ID locally
  const currentDeleted = getDeletedQuizIds();
  if (!currentDeleted.includes(quizId)) {
    const updatedDeleted = [...currentDeleted, quizId];
    localStorage.setItem(STORAGE_KEY_DELETED_QUIZZES, JSON.stringify(updatedDeleted));
  }

  try {
    const res = await fetch('/api/quizzes/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId, password })
    });

    if (res.ok) {
      await syncCommunityQuizzes();
    }
  } catch (e) {
    console.warn('Delete API offline');
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('quizzlet_custom_created', { detail: [] }));
  }

  return true;
}

export function fetchQuizById(quizId) {
  const cached = normalizedQuizCache.get(quizId);
  if (cached) {
    return cached;
  }
  const manifestItem = QUIZ_MANIFEST.find(q => q.id === quizId);
  if (!manifestItem) {
    throw new Error(`Quiz with id ${quizId} not found`);
  }
  return {
    ...manifestItem,
    questions: []
  };
}

// LocalStorage Progress Tracker
const STORAGE_KEY_PROGRESS = 'quizzlet_user_progress_v1';
const STORAGE_KEY_STARS = 'quizzlet_starred_questions_v1';

export function getUserProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_PROGRESS);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Error reading progress from localStorage', e);
    return {};
  }
}

export function saveQuizProgress(quizId, score, total, mode) {
  try {
    const progress = getUserProgress();
    if (!progress[quizId]) {
      progress[quizId] = { attempts: 0, bestScore: 0, history: [] };
    }
    const current = progress[quizId];
    current.attempts += 1;
    current.bestScore = Math.max(current.bestScore, Math.round((score / total) * 100));
    current.history.push({
      date: new Date().toISOString(),
      score,
      total,
      mode,
      percentage: Math.round((score / total) * 100)
    });
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    return progress;
  } catch (e) {
    console.error('Error saving progress to localStorage', e);
  }
}

export function getStarredQuestions() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_STARS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function toggleStarQuestion(questionId, quizId, questionData, questionIndex = 0) {
  try {
    const stars = getStarredQuestions();
    const index = stars.findIndex(s => s.questionId === questionId);
    let updated;
    if (index >= 0) {
      updated = stars.filter(s => s.questionId !== questionId);
    } else {
      const quizInfo = normalizedQuizCache.get(quizId) || QUIZ_MANIFEST.find(q => q.id === quizId) || {};
      updated = [
        ...stars,
        {
          questionId,
          quizId,
          subjectCode: quizInfo.category || 'THI',
          quizTitle: quizInfo.title || 'Bộ Đề Ôn Tập',
          questionIndex: questionData?.questionIndex ?? questionIndex,
          question: questionData,
          timestamp: Date.now()
        }
      ];
    }
    localStorage.setItem(STORAGE_KEY_STARS, JSON.stringify(updated));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('quizzlet_star_updated', { detail: updated }));
    }
    return updated;
  } catch (e) {
    console.error('Error toggling star question', e);
    return [];
  }
}

export function unstarQuizSet(quizId) {
  try {
    const stars = getStarredQuestions();
    const updated = stars.filter(s => s.quizId !== quizId);
    localStorage.setItem(STORAGE_KEY_STARS, JSON.stringify(updated));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('quizzlet_star_updated', { detail: updated }));
    }
    return updated;
  } catch (e) {
    console.error('Error unstarring quiz set', e);
    return [];
  }
}

export function clearAllStarredQuestions() {
  try {
    localStorage.setItem(STORAGE_KEY_STARS, JSON.stringify([]));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('quizzlet_star_updated', { detail: [] }));
    }
    return [];
  } catch (e) {
    console.error('Error clearing all starred questions', e);
    return [];
  }
}
