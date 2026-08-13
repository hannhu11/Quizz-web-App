import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import SubjectCard from './components/SubjectCard';
import QuizDetailView from './components/QuizDetailView';
import FlashcardViewer from './components/FlashcardViewer';
import PracticeMode from './components/PracticeMode';
import ExamMode from './components/ExamMode';
import CreateSetView from './components/CreateSetView';
import TestSetupModal from './components/TestSetupModal';
import ChillDock from './components/chill/ChillDock';
import CustomModal from './components/CustomModal';
import AuthModal from './components/auth/AuthModal';
import ProfileModal from './components/auth/ProfileModal';
import AdminView from './components/admin/AdminView';
import { QUIZ_MANIFEST, fetchQuizById, getUserProgress, getStarredQuestions, toggleStarQuestion, unstarQuizSet, clearAllStarredQuestions, getCustomQuizSets, getDeletedQuizIds, syncCommunityQuizzes } from './data/quizDataLoader';
import { Sparkles, BookOpen, Layers, Star, Trash2, ArrowRight, BookMarked, Plus } from 'lucide-react';

import { useAuth } from './context/AuthContext';

export default function App() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeQuizId, setActiveQuizId] = useState(null);
  const [studyMode, setStudyMode] = useState(null); // 'DETAIL' | 'FLASHCARD' | 'PRACTICE' | 'EXAM' | 'CREATE_SET'
  const [loadedQuiz, setLoadedQuiz] = useState(null);
  const [editingQuizData, setEditingQuizData] = useState(null);
  const [initialQuestionIndex, setInitialQuestionIndex] = useState(0);
  const [testConfig, setTestConfig] = useState(null);
  const [isTestSetupOpen, setIsTestSetupOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isStarredModalOpen, setIsStarredModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('LOGIN');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [progress, setProgress] = useState({});
  const [starredQuestions, setStarredQuestions] = useState([]);
  const [customQuizList, setCustomQuizList] = useState([]);
  const [deletedQuizIds, setDeletedQuizIds] = useState([]);

  // Sync dark class to documentElement for full Tailwind CSS Dark Mode support
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Global Exit Guard state for browser back button during Exam / Practice
  const [showGlobalExitGuard, setShowGlobalExitGuard] = useState(false);
  const [targetHashState, setTargetHashState] = useState(null);

  // Hash Router Helper Functions
  const parseHashState = useCallback(() => {
    const rawHash = window.location.hash.replace(/^#\/?/, '');
    if (!rawHash) return { mode: null, quizId: null };
    const parts = rawHash.split('/');
    if (parts[0] === 'quiz' && parts[1]) return { mode: 'DETAIL', quizId: parts[1] };
    if (parts[0] === 'flashcard' && parts[1]) return { mode: 'FLASHCARD', quizId: parts[1] };
    if (parts[0] === 'practice' && parts[1]) return { mode: 'PRACTICE', quizId: parts[1] };
    if (parts[0] === 'exam' && parts[1]) return { mode: 'EXAM', quizId: parts[1] };
    if (parts[0] === 'create') return { mode: 'CREATE_SET', quizId: null };
    return { mode: null, quizId: null };
  }, []);

  const setHashState = useCallback((mode, quizId = null, replace = false) => {
    let hashStr = '#/';
    if (mode === 'DETAIL' && quizId) hashStr = `#/quiz/${quizId}`;
    else if (mode === 'FLASHCARD' && quizId) hashStr = `#/flashcard/${quizId}`;
    else if (mode === 'PRACTICE' && quizId) hashStr = `#/practice/${quizId}`;
    else if (mode === 'EXAM' && quizId) hashStr = `#/exam/${quizId}`;
    else if (mode === 'CREATE_SET') hashStr = `#/create`;

    if (window.location.hash !== hashStr) {
      if (replace) {
        window.history.replaceState(null, '', hashStr);
      } else {
        window.location.hash = hashStr;
      }
    }
  }, []);

  // Listen to hashchange / popstate to synchronize view with browser history
  useEffect(() => {
    const handleHashChange = () => {
      const { mode, quizId } = parseHashState();

      // Guard back navigation if user is in an active test/practice session
      if ((studyMode === 'PRACTICE' || studyMode === 'EXAM') && (mode !== studyMode || quizId !== activeQuizId)) {
        setShowGlobalExitGuard(true);
        setTargetHashState({ mode, quizId });
        // Temporarily revert hash so URL stays on current exam/practice until user confirms
        setHashState(studyMode, activeQuizId, true);
        return;
      }

      // Apply route change smoothly
      if (mode === 'CREATE_SET') {
        setStudyMode('CREATE_SET');
        setEditingQuizData(null);
      } else if (quizId) {
        try {
          const quizData = fetchQuizById(quizId);
          setActiveQuizId(quizId);
          setLoadedQuiz(quizData);
          setStudyMode(mode || 'DETAIL');
        } catch (e) {
          console.error('Failed to load quiz from URL hash', e);
          setStudyMode(null);
          setActiveQuizId(null);
        }
      } else {
        setActiveQuizId(null);
        setStudyMode(null);
        setLoadedQuiz(null);
        setEditingQuizData(null);
      }
    };

    // Initial load from hash
    const initialRoute = parseHashState();
    if (initialRoute.quizId) {
      try {
        const quizData = fetchQuizById(initialRoute.quizId);
        setActiveQuizId(initialRoute.quizId);
        setLoadedQuiz(quizData);
        setStudyMode(initialRoute.mode || 'DETAIL');
      } catch (e) {
        console.error('Error loading initial hash route', e);
      }
    } else if (initialRoute.mode === 'CREATE_SET') {
      setStudyMode('CREATE_SET');
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [studyMode, activeQuizId, parseHashState, setHashState]);

  // Synchronize progress, community custom quizzes, deleted quiz IDs, and starred questions
  useEffect(() => {
    const refreshData = () => {
      setProgress(getUserProgress());
      setStarredQuestions(getStarredQuestions());
      setCustomQuizList(getCustomQuizSets());
      setDeletedQuizIds(getDeletedQuizIds());
      syncCommunityQuizzes().then(sets => {
        setCustomQuizList(sets);
        setDeletedQuizIds(getDeletedQuizIds());
      });
    };

    refreshData();

    // Window Focus & Visibility Revalidation (Real-time Sync like Knowt / Quizlet)
    const handleFocusRevalidate = () => {
      syncCommunityQuizzes().then(sets => {
        setCustomQuizList(sets);
        setDeletedQuizIds(getDeletedQuizIds());
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        syncCommunityQuizzes().then(sets => {
          setCustomQuizList(sets);
          setDeletedQuizIds(getDeletedQuizIds());
        });
      }
    };

    window.addEventListener('focus', handleFocusRevalidate);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('quizzlet_star_updated', refreshData);
    window.addEventListener('quizzlet_custom_created', refreshData);

    return () => {
      window.removeEventListener('focus', handleFocusRevalidate);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('quizzlet_star_updated', refreshData);
      window.removeEventListener('quizzlet_custom_created', refreshData);
    };
  }, []);

  // Combine static manifest + custom community created quizzes, excluding deleted quiz IDs
  const rawQuizzes = [...customQuizList, ...QUIZ_MANIFEST];
  const deletedSet = new Set(deletedQuizIds);
  const allQuizzes = rawQuizzes.filter(q => !deletedSet.has(q.id));

  // Filter Categories list
  const categories = Array.from(new Set(allQuizzes.map(q => q.category)));

  // Filter Quizzes based on search & category
  const filteredQuizzes = allQuizzes.filter(quiz => {
    const matchesCategory = activeCategory === 'ALL' || quiz.category === activeCategory;
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          quiz.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          quiz.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Top bar Navigation Reset when category clicked (triggers community sync)
  const handleSelectCategory = useCallback((category) => {
    setActiveCategory(category);
    setActiveQuizId(null);
    setStudyMode(null);
    setLoadedQuiz(null);
    setEditingQuizData(null);
    setHashState(null);
    syncCommunityQuizzes().then(sets => {
      setCustomQuizList(sets);
      setDeletedQuizIds(getDeletedQuizIds());
    });
  }, [setHashState]);

  // Instant zero-latency navigation handlers (RAM Cached < 0.1ms)
  const handleOpenQuizDetail = useCallback((quizId) => {
    const quizData = fetchQuizById(quizId);
    setActiveQuizId(quizId);
    setLoadedQuiz(quizData);
    setInitialQuestionIndex(0);
    setStudyMode('DETAIL');
    setHashState('DETAIL', quizId);
  }, [setHashState]);

  const handleSelectModeDirect = useCallback((quizId, mode) => {
    // Auth Guard Enforcement: Must be logged in to access learning modes
    if (!user) {
      setAuthModalMode('LOGIN');
      setIsAuthModalOpen(true);
      return;
    }

    const quizData = fetchQuizById(quizId);
    setActiveQuizId(quizId);
    setLoadedQuiz(quizData);
    setInitialQuestionIndex(0);

    if (mode === 'EXAM') {
      setIsTestSetupOpen(true);
    } else {
      setStudyMode(mode);
      setHashState(mode, quizId);
    }
  }, [user, setHashState]);

  // Handle Set Created or Updated
  const handleSetCreated = useCallback((newSet) => {
    setActiveQuizId(newSet.id);
    setLoadedQuiz(newSet);
    setInitialQuestionIndex(0);
    setStudyMode('DETAIL');
    setEditingQuizData(null);
    setHashState('DETAIL', newSet.id);
    syncCommunityQuizzes().then(sets => {
      setCustomQuizList(sets);
      setDeletedQuizIds(getDeletedQuizIds());
    });
  }, [setHashState]);

  // Edit Quiz Handler
  const handleEditQuizRequest = useCallback((quiz) => {
    setEditingQuizData(quiz);
    setStudyMode('CREATE_SET');
    setHashState('CREATE_SET');
  }, [setHashState]);

  // Delete Quiz Handler
  const handleDeleteQuizRequest = useCallback((quizId) => {
    setActiveQuizId(null);
    setStudyMode(null);
    setLoadedQuiz(null);
    setEditingQuizData(null);
    setHashState(null);
    syncCommunityQuizzes().then(sets => {
      setCustomQuizList(sets);
      setDeletedQuizIds(getDeletedQuizIds());
    });
  }, [setHashState]);

  // Start Test from Setup Modal
  const handleStartConfiguredTest = useCallback((config) => {
    setTestConfig(config);
    setStudyMode('EXAM');
    if (activeQuizId) {
      setHashState('EXAM', activeQuizId);
    }
  }, [activeQuizId, setHashState]);

  const handleBackToDetailOrDashboard = useCallback(() => {
    if (studyMode === 'FLASHCARD' || studyMode === 'PRACTICE' || studyMode === 'EXAM') {
      setStudyMode('DETAIL');
      if (activeQuizId) setHashState('DETAIL', activeQuizId);
    } else {
      setActiveQuizId(null);
      setStudyMode(null);
      setLoadedQuiz(null);
      setEditingQuizData(null);
      setHashState(null);
      syncCommunityQuizzes().then(sets => {
        setCustomQuizList(sets);
        setDeletedQuizIds(getDeletedQuizIds());
      });
    }
    setProgress(getUserProgress());
    setStarredQuestions(getStarredQuestions());
  }, [studyMode, activeQuizId, setHashState]);

  const handleRemoveStar = useCallback((questionId) => {
    toggleStarQuestion(questionId, '', null);
  }, []);

  const handleClearSetStars = useCallback((quizId) => {
    unstarQuizSet(quizId);
  }, []);

  const handleClearAllStars = useCallback(() => {
    clearAllStarredQuestions();
  }, []);

  // Click-to-Jump Deep Linking from Starred Modal
  const handleJumpToStarredQuestion = useCallback((item) => {
    try {
      const targetQuizId = item.quizId || item.question?.quizId || 'STARRED';
      let quizData = fetchQuizById(targetQuizId);
      
      // If quizData is missing or has no questions, try looking up manifest by title or construct Virtual Starred Quiz Set
      if (!quizData || !quizData.questions || quizData.questions.length === 0) {
        const foundManifest = QUIZ_MANIFEST.find(m => 
          String(m.id).toLowerCase() === String(targetQuizId).toLowerCase() ||
          String(m.title).toLowerCase() === String(item.quizTitle || '').toLowerCase()
        );
        if (foundManifest) {
          quizData = fetchQuizById(foundManifest.id);
        }
      }

      if (!quizData || !quizData.questions || quizData.questions.length === 0) {
        const setQuestions = starredQuestions
          .filter(s => 
            String(s.quizId) === String(targetQuizId) || 
            String(s.quizTitle || '').toLowerCase() === String(item.quizTitle || '').toLowerCase() ||
            targetQuizId === 'STARRED'
          )
          .map(s => s.question)
          .filter(Boolean);

        quizData = {
          id: targetQuizId,
          title: item.quizTitle || 'Câu Hỏi Đã Lưu',
          subject: item.subjectCode || 'Câu Hỏi Đã Lưu',
          category: 'ĐÃ LƯU',
          questions: setQuestions.length > 0 ? setQuestions : [item.question].filter(Boolean)
        };
      }

      // Find index of clicked item within questions array
      const targetIdx = quizData.questions.findIndex(q => 
        String(q.id) === String(item.questionId) || 
        (q.content && item.question?.content && String(q.content).trim() === String(item.question.content).trim())
      );

      setActiveQuizId(quizData.id);
      setLoadedQuiz(quizData);
      setInitialQuestionIndex(targetIdx >= 0 ? targetIdx : (item.questionIndex || 0));
      setStudyMode('FLASHCARD');
      setHashState('FLASHCARD', quizData.id);
      setIsStarredModalOpen(false);
    } catch (e) {
      console.error('Failed to deep link to starred item', e);
    }
  }, [starredQuestions, setHashState]);

  // Group Starred Questions by Quiz Title / Subject Group (Safe String Conversion)
  const groupedStarred = (starredQuestions || []).reduce((acc, q) => {
    if (!q) return acc;
    const strQuizId = String(q.quizId || '');
    const titleKey = q.quizTitle || q.question?.quizTitle || 'Bộ Đề Ôn Tập';
    const groupKey = strQuizId && !strQuizId.startsWith('custom_') && !strQuizId.startsWith('exam_') 
      ? strQuizId 
      : titleKey;

    if (!acc[groupKey]) {
      acc[groupKey] = {
        quizId: q.quizId || 'STARRED',
        quizTitle: titleKey,
        subjectCode: q.subjectCode || 'BỘ ĐỀ',
        items: []
      };
    }
    acc[groupKey].items.push(q);
    return acc;
  }, {});

  const groupedStarredList = Object.values(groupedStarred).filter(group => group.items && group.items.length > 0);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-warm-bg text-warm-text'}`}>
      {/* Header Bar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        categories={categories}
        starredCount={starredQuestions.length}
        onOpenStarred={() => setIsStarredModalOpen(true)}
        onOpenCreateSet={() => { setEditingQuizData(null); setStudyMode('CREATE_SET'); }}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onResetDashboard={() => handleSelectCategory('ALL')}
        onOpenAuthModal={(mode) => {
          setAuthModalMode(mode || 'LOGIN');
          setIsAuthModalOpen(true);
        }}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenAdmin={() => setStudyMode('ADMIN')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create / Edit Set View */}
        {studyMode === 'CREATE_SET' && (
          <CreateSetView
            onBack={() => setStudyMode(null)}
            onSetCreated={handleSetCreated}
            editQuiz={editingQuizData}
          />
        )}

        {/* Admin Portal Management View */}
        {studyMode === 'ADMIN' && (
          <AdminView onBack={() => setStudyMode(null)} />
        )}

        {/* Active Study Views */}
        {studyMode && studyMode !== 'CREATE_SET' && studyMode !== 'ADMIN' && loadedQuiz && (
          <>
            {studyMode === 'DETAIL' && (
              <QuizDetailView
                quiz={loadedQuiz}
                onBack={handleBackToDetailOrDashboard}
                onStartMode={(m) => {
                  setStudyMode(m);
                  if (activeQuizId) setHashState(m, activeQuizId);
                }}
                onOpenTestSetup={() => setIsTestSetupOpen(true)}
                onEditQuiz={handleEditQuizRequest}
                onDeleteQuiz={handleDeleteQuizRequest}
                onOpenAuthModal={(mode) => {
                  setAuthModalMode(mode || 'LOGIN');
                  setIsAuthModalOpen(true);
                }}
              />
            )}
            {studyMode === 'FLASHCARD' && (
              <FlashcardViewer
                quiz={loadedQuiz}
                initialIndex={initialQuestionIndex}
                onBack={handleBackToDetailOrDashboard}
              />
            )}
            {studyMode === 'PRACTICE' && (
              <PracticeMode
                quiz={loadedQuiz}
                onBack={handleBackToDetailOrDashboard}
              />
            )}
            {studyMode === 'EXAM' && (
              <ExamMode
                quiz={loadedQuiz}
                testConfig={testConfig}
                onBack={handleBackToDetailOrDashboard}
              />
            )}
          </>
        )}

        {/* Dashboard Grid (When no quiz is selected) */}
        {!studyMode && (
          <div className="space-y-8">
            {/* Hero Banner (Warm Minimalist / Lofi Study - Clean Flat Design) */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-900/90 p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between flex-wrap gap-6 transition-all">
              <div className="max-w-2xl relative z-10 space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-2xs">
                  <BookOpen className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400 stroke-[1.75]" /> Góc Ôn Luyện Kiến Thức
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
                  Thư Thái Ghi Nhớ • Bứt Phá Điểm Số
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  Ghi nhớ Flashcard, luyện tập trắc nghiệm thông minh, kết hợp nhạc Lofi thư giãn giúp tăng 200% độ tập trung.
                </p>
                <div className="pt-1">
                  <button
                    onClick={() => { setEditingQuizData(null); setStudyMode('CREATE_SET'); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-white font-extrabold text-xs sm:text-sm shadow-sm transition-all active:scale-95 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> + Tạo Bộ Đề Mới
                  </button>
                </div>
              </div>

              {/* Capybara Mascot (Academic Suit & Flower Bouquet) */}
              <div className="relative z-10 shrink-0 self-center hidden sm:block">
                <img
                  src="/capybara_mascot_transparent_v9.png"
                  alt="Linh vật Capybara QuizzFlow"
                  className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-amber-100/30 dark:bg-indigo-900/10 blur-2xl pointer-events-none" />
            </div>

            {/* Quizzes List Grid Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-warm-slate dark:text-slate-300" /> Danh Sách Bộ Đề ({filteredQuizzes.length})
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">Bấm vào bộ đề để xem danh sách câu hỏi hoặc chọn chế độ học</p>
              </div>
            </div>

            {/* Grid of Subject Cards */}
            {filteredQuizzes.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-warm-border dark:border-slate-800">
                <BookOpen className="w-12 h-12 text-warm-muted dark:text-slate-500 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">Không tìm thấy bộ đề phù hợp</h4>
                <p className="text-xs text-warm-muted dark:text-slate-400 mt-1">Hãy thử tìm kiếm với từ khóa khác</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuizzes.map((quiz) => (
                  <div key={quiz.id} onClick={() => handleOpenQuizDetail(quiz.id)} className="cursor-pointer">
                    <SubjectCard
                      quiz={quiz}
                      progress={progress}
                      onSelectMode={(qId, mode) => {
                        handleSelectModeDirect(qId, mode);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Test Setup Modal (Quizlet Pro Style) */}
      <TestSetupModal
        isOpen={isTestSetupOpen}
        onClose={() => setIsTestSetupOpen(false)}
        quiz={loadedQuiz}
        onStartTest={handleStartConfiguredTest}
      />

      {/* Categorized Starred Questions Modal (Grouped by Quiz Set) */}
      <CustomModal
        isOpen={isStarredModalOpen}
        onClose={() => setIsStarredModalOpen(false)}
        title={`Câu Hỏi Đã Lưu (${starredQuestions.length})`}
      >
        {starredQuestions.length === 0 ? (
          <div className="text-center py-8 text-warm-muted dark:text-slate-400">
            <Star className="w-8 h-8 text-warm-border dark:text-slate-700 mx-auto mb-2" />
            <p className="text-sm font-semibold">Chưa có câu hỏi nào được lưu</p>
            <p className="text-xs">Bấm vào biểu tượng ngôi sao ★ để lưu câu hỏi khó.</p>
          </div>
        ) : (
          <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-1">
            {/* Top Bar with Clear All Everything Button */}
            <div className="flex items-center justify-between pb-2 border-b border-warm-border/60 dark:border-slate-800">
              <span className="text-xs font-bold text-warm-muted dark:text-slate-400">
                Phân loại theo {groupedStarredList.length} bộ đề
              </span>
              <button
                onClick={handleClearAllStars}
                className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 flex items-center gap-1 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" /> Xóa tất cả ({starredQuestions.length})
              </button>
            </div>

            {/* Grouped Lists by Quiz Set */}
            {groupedStarredList.map((group) => (
              <div key={group.quizId} className="space-y-3 p-4 rounded-2xl bg-warm-bg/60 dark:bg-slate-800/50 border border-warm-border/80 dark:border-slate-700/80">
                {/* Quiz Set Header & Clear Set Button */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <BookMarked className="w-4 h-4 text-warm-slate dark:text-slate-300" />
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      [{group.subjectCode}] {group.quizTitle}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      {group.items.length} câu
                    </span>
                  </div>

                  <button
                    onClick={() => handleClearSetStars(group.quizId)}
                    className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 flex items-center gap-1 hover:bg-rose-50 dark:hover:bg-rose-950/60 px-2.5 py-1 rounded-lg transition-colors"
                    title="Xóa tất cả câu lưu trong bộ đề này"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Xóa bộ này
                  </button>
                </div>

                {/* Items in this Quiz Set */}
                <div className="space-y-2.5">
                  {group.items.map((item, idx) => (
                    <div
                      key={item.questionId || idx}
                      onClick={() => handleJumpToStarredQuestion(item)}
                      className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 shadow-xs hover:shadow-soft transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 text-xs group"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800 text-[11px]">
                            Câu #{(item.questionIndex ?? 0) + 1}
                          </span>
                        </div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 leading-relaxed group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                          {item.question?.content || 'Nội dung câu hỏi'}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="p-1.5 rounded-full bg-warm-hover dark:bg-slate-800 text-warm-slate dark:text-slate-300 group-hover:bg-amber-100 dark:group-hover:bg-amber-900 transition-colors">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRemoveStar(item.questionId); }}
                          className="p-1.5 rounded-full hover:bg-rose-100 dark:hover:bg-rose-950 text-rose-500 transition-colors"
                          title="Bỏ lưu câu này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CustomModal>

      {/* Global Browser Back Navigation Guard Modal */}
      {showGlobalExitGuard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-warm-border dark:border-slate-800 shadow-soft-lg max-w-sm w-[92vw] text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center font-bold text-xl">
              ⚠️
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">Xác nhận thoát bài làm?</h4>
              <p className="text-xs text-warm-muted dark:text-slate-400 mt-1 leading-relaxed">
                Bạn đang trong bài làm. Nếu lùi trang, tiến trình hiện tại <span className="font-bold text-rose-600 dark:text-rose-400">sẽ KHÔNG được lưu</span>.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  setShowGlobalExitGuard(false);
                  setTargetHashState(null);
                }}
                className="flex-1 py-2.5 rounded-full border border-warm-border dark:border-slate-700 text-xs font-bold text-warm-text dark:text-slate-200 hover:bg-warm-hover dark:hover:bg-slate-800"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={() => {
                  setShowGlobalExitGuard(false);
                  if (targetHashState) {
                    if (targetHashState.quizId) {
                      try {
                        const quizData = fetchQuizById(targetHashState.quizId);
                        setActiveQuizId(targetHashState.quizId);
                        setLoadedQuiz(quizData);
                        setStudyMode(targetHashState.mode || 'DETAIL');
                        setHashState(targetHashState.mode || 'DETAIL', targetHashState.quizId, true);
                      } catch (e) {
                        setStudyMode(null);
                        setActiveQuizId(null);
                        setHashState(null, null, true);
                      }
                    } else {
                      setStudyMode(targetHashState.mode || null);
                      setActiveQuizId(null);
                      setLoadedQuiz(null);
                      setHashState(targetHashState.mode, null, true);
                    }
                  } else {
                    setStudyMode('DETAIL');
                    if (activeQuizId) setHashState('DETAIL', activeQuizId, true);
                  }
                  setTargetHashState(null);
                }}
                className="px-4 py-2.5 rounded-full bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-xs"
              >
                Xác nhận thoát
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Glassmorphic Auth Modal (Login / Register FPT / Google Auth) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {/* Student Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Chill Space - Independent Floating Widgets (LifeAt Style) */}
      <ChillDock />
    </div>
  );
}
