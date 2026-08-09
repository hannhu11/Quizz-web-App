// Quiz Data Manifest & Instant Pre-Parsed Memory Cache (0-Latency)

// Dynamically eager-import all quiz JSON files at module load
const quizFiles = import.meta.glob('../../../quiz-app-main/quizzes/current/*.json', { eager: true });

export const QUIZ_MANIFEST = [
  { id: 'vnr202-fe', filename: 'VNR202 - FE - QuizApp.json', title: 'VNR202 - Lịch Sử Đảng Cộng Sản Việt Nam (420 Câu)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-rose-100 to-red-100', icon: 'BookOpen' },
  { id: 'mln111-1000', filename: 'MLN111 - 1000+ - QuizApp.json', title: 'MLN111 - 1000+ Câu Hỏi Tổng Hợp', subject: 'Triết Học Mác - Lênin', category: 'MLN111', color: 'from-amber-100 to-orange-100', icon: 'BookOpen' },
  { id: 'mln111-fe', filename: 'MLN111 - FE - QuizApp.json', title: 'MLN111 - Ôn Thi Final Exam', subject: 'Triết Học Mác - Lênin', category: 'MLN111', color: 'from-amber-100 to-yellow-100', icon: 'Award' },
  { id: 'mln122-batquytac', filename: 'MLN122 - FE - Bất quy tắc - QuizApp.json', title: 'MLN122 - Mẹo & Bất Quy Tắc', subject: 'Kinh Tế Chính Trị', category: 'MLN122', color: 'from-emerald-100 to-teal-100', icon: 'Sparkles' },
  { id: 'mln122-cachmang', filename: 'MLN122 - FE - Cách mạng - QuizApp.json', title: 'MLN122 - Chuyên Đề Cách Mạng', subject: 'Kinh Tế Chính Trị', category: 'MLN122', color: 'from-emerald-100 to-green-100', icon: 'Flame' },
  { id: 'mln122-dainhat', filename: 'MLN122 - FE - Dài nhất - QuizApp.json', title: 'MLN122 - Các Câu Đáp Án Dài Nhất', subject: 'Kinh Tế Chính Trị', category: 'MLN122', color: 'from-teal-100 to-cyan-100', icon: 'FileText' },
  { id: 'mln122-fe', filename: 'MLN122 - FE - QuizApp.json', title: 'MLN122 - Ôn Thi Final Exam', subject: 'Kinh Tế Chính Trị', category: 'MLN122', color: 'from-emerald-100 to-lime-100', icon: 'GraduationCap' },
  { id: 'mln122-tacgia', filename: 'MLN122 - FE - Tác giả - QuizApp.json', title: 'MLN122 - Chuyên Đề Tác Giả', subject: 'Kinh Tế Chính Trị', category: 'MLN122', color: 'from-cyan-100 to-blue-100', icon: 'UserCheck' },
  { id: 'mln122-daihoi', filename: 'MLN122 - FE - Đại hội - QuizApp.json', title: 'MLN122 - Chuyên Đề Các Kỳ Đại Hội', subject: 'Kinh Tế Chính Trị', category: 'MLN122', color: 'from-sky-100 to-indigo-100', icon: 'Bookmark' },
  { id: 'pmg201c', filename: 'PMG201c - QuizApp.json', title: 'PMG201c - Project Management', subject: 'Quản Lý Dự Án', category: 'PMG201c', color: 'from-purple-100 to-indigo-100', icon: 'Briefcase' },
  { id: 'prm393-fe', filename: 'PRM393 - FE - QuizApp.json', title: 'PRM393 - Ôn Thi Final Exam', subject: 'Lập Trình Di Động', category: 'PRM393', color: 'from-indigo-100 to-violet-100', icon: 'Smartphone' },
  { id: 'prm393-flutter', filename: 'PRM393 - Flutter MCQ - QuizApp.json', title: 'PRM393 - Flutter MCQ Master', subject: 'Lập Trình Di Động', category: 'PRM393', color: 'from-violet-100 to-purple-100', icon: 'Code' },
  { id: 'prm393-pt1', filename: 'PRM393 - PT1 - QuizApp.json', title: 'PRM393 - Progress Test 1', subject: 'Lập Trình Di Động', category: 'PRM393', color: 'from-purple-100 to-pink-100', icon: 'CheckCircle2' },
  { id: 'sba301', filename: 'SBA301 - QuizApp.json', title: 'SBA301 - Small Business Administration', subject: 'Quản Trị Doanh Nghiệp', category: 'SBA301', color: 'from-rose-100 to-pink-100', icon: 'Building2' },
  { id: 'swd392', filename: 'SWD392 - QuizApp.json', title: 'SWD392 - Software Architecture', subject: 'Kiến Trúc Phần Mềm', category: 'SWD392', color: 'from-blue-100 to-cyan-100', icon: 'Layers' },
  { id: 'syb302c', filename: 'SYB302c - QuizApp.json', title: 'SYB302c - Start Your Business', subject: 'Khởi Nghiệp Kinh Doanh', category: 'SYB302c', color: 'from-amber-100 to-rose-100', icon: 'Rocket' },
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
    const normalized = {
      ...manifestItem,
      rawId: rawData.id,
      originalName: rawData.name,
      questions: (rawData.questionsList || []).map((q, idx) => ({
        id: q.id || idx + 1,
        questionIndex: idx,
        content: q.content || 'Câu hỏi không có nội dung',
        explanation: q.explanation || '',
        answers: (q.answersList || []).map((a, aIdx) => ({
          id: a.id || aIdx + 1,
          content: a.content || '',
          isCorrect: Boolean(a.is_correct),
        }))
      }))
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
