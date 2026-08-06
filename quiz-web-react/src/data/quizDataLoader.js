// Quiz Data Manifest & Instant Pre-Parsed Memory Cache (0-Latency)

// Dynamically eager-import all quiz JSON files at module load
const quizFiles = import.meta.glob('../../../quiz-app-main/quizzes/current/*.json', { eager: true });

export const QUIZ_MANIFEST = [
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

    // Dispatch global event for instant reactivity across all open views
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('quizzlet_star_updated', { detail: updated }));
    }
    return updated;
  } catch (e) {
    console.error('Error toggling star question', e);
    return [];
  }
}
