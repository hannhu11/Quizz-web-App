import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import SubjectCard from './components/SubjectCard';
import QuizDetailView from './components/QuizDetailView';
import FlashcardViewer from './components/FlashcardViewer';
import PracticeMode from './components/PracticeMode';
import ExamMode from './components/ExamMode';
import TestSetupModal from './components/TestSetupModal';
import LofiAudioPlayer from './components/LofiAudioPlayer';
import CustomModal from './components/CustomModal';
import { QUIZ_MANIFEST, fetchQuizById, getUserProgress, getStarredQuestions, toggleStarQuestion } from './data/quizDataLoader';
import { Sparkles, BookOpen, Layers, Star, Trash2, ArrowRight } from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeQuizId, setActiveQuizId] = useState(null);
  const [studyMode, setStudyMode] = useState(null); // 'DETAIL' | 'FLASHCARD' | 'PRACTICE' | 'EXAM'
  const [loadedQuiz, setLoadedQuiz] = useState(null);
  const [initialQuestionIndex, setInitialQuestionIndex] = useState(0);
  const [testConfig, setTestConfig] = useState(null);
  const [isTestSetupOpen, setIsTestSetupOpen] = useState(false);

  const [progress, setProgress] = useState({});
  const [starredQuestions, setStarredQuestions] = useState([]);
  const [isStarredModalOpen, setIsStarredModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load progress and starred questions on mount
  useEffect(() => {
    setProgress(getUserProgress());
    setStarredQuestions(getStarredQuestions());
  }, []);

  // Filter Categories list
  const categories = Array.from(new Set(QUIZ_MANIFEST.map(q => q.category)));

  // Filter Quizzes based on search & category
  const filteredQuizzes = QUIZ_MANIFEST.filter(quiz => {
    const matchesCategory = activeCategory === 'ALL' || quiz.category === activeCategory;
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          quiz.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          quiz.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Top bar Navigation Reset when category clicked
  const handleSelectCategory = useCallback((category) => {
    setActiveCategory(category);
    setActiveQuizId(null);
    setStudyMode(null);
    setLoadedQuiz(null);
  }, []);

  // Instant zero-latency navigation handlers (RAM Cached < 0.1ms)
  const handleOpenQuizDetail = useCallback((quizId) => {
    const quizData = fetchQuizById(quizId);
    setActiveQuizId(quizId);
    setLoadedQuiz(quizData);
    setInitialQuestionIndex(0);
    setStudyMode('DETAIL');
  }, []);

  const handleSelectModeDirect = useCallback((quizId, mode) => {
    const quizData = fetchQuizById(quizId);
    setActiveQuizId(quizId);
    setLoadedQuiz(quizData);
    setInitialQuestionIndex(0);

    if (mode === 'EXAM') {
      setIsTestSetupOpen(true);
    } else {
      setStudyMode(mode);
    }
  }, []);

  // Start Test from Setup Modal
  const handleStartConfiguredTest = useCallback((config) => {
    setTestConfig(config);
    setStudyMode('EXAM');
  }, []);

  const handleBackToDetailOrDashboard = useCallback(() => {
    if (studyMode === 'FLASHCARD' || studyMode === 'PRACTICE' || studyMode === 'EXAM') {
      setStudyMode('DETAIL');
    } else {
      setActiveQuizId(null);
      setStudyMode(null);
      setLoadedQuiz(null);
    }
    setProgress(getUserProgress());
    setStarredQuestions(getStarredQuestions());
  }, [studyMode]);

  const handleRemoveStar = useCallback((questionId) => {
    const updated = toggleStarQuestion(questionId, '', null);
    setStarredQuestions(updated);
  }, []);

  // Click-to-Jump Deep Linking from Starred Modal
  const handleJumpToStarredQuestion = useCallback((item) => {
    try {
      const targetQuizId = item.quizId || item.question?.quizId || QUIZ_MANIFEST[0].id;
      const quizData = fetchQuizById(targetQuizId);
      setActiveQuizId(targetQuizId);
      setLoadedQuiz(quizData);
      setInitialQuestionIndex(item.questionIndex || 0);
      setStudyMode('FLASHCARD');
      setIsStarredModalOpen(false);
    } catch (e) {
      console.error('Failed to deep link to starred item', e);
    }
  }, []);

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
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onResetDashboard={() => handleSelectCategory('ALL')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active Study Views */}
        {studyMode && loadedQuiz && (
          <>
            {studyMode === 'DETAIL' && (
              <QuizDetailView
                quiz={loadedQuiz}
                onBack={handleBackToDetailOrDashboard}
                onStartMode={(m) => setStudyMode(m)}
                onOpenTestSetup={() => setIsTestSetupOpen(true)}
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
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-100/90 via-rose-100/80 to-indigo-100/70 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-6 sm:p-8 border border-amber-200/80 dark:border-slate-800 shadow-soft">
              <div className="max-w-2xl relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-amber-900 dark:text-amber-300 text-xs font-bold shadow-xs mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Góc Ôn Luyện Kiến Thức
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
                  Thư Thái Ghi Nhớ • Ôn Luyện Hiệu Quả
                </h2>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                  Ghi nhớ flashcard 3D, xem lại danh sách câu hỏi Terms in this set và làm bài thi thử theo phong cách Quizlet.
                </p>
              </div>

              <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-amber-200/40 dark:bg-slate-800/40 blur-2xl pointer-events-none" />
            </div>

            {/* Quizzes List Grid Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-warm-text dark:text-slate-100 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-warm-slate dark:text-slate-400" /> Danh Sách Bộ Đề ({filteredQuizzes.length})
                </h3>
                <p className="text-xs text-warm-muted dark:text-slate-400">Bấm vào bộ đề để xem danh sách câu hỏi hoặc chọn chế độ học</p>
              </div>
            </div>

            {/* Grid of Subject Cards */}
            {filteredQuizzes.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-warm-border dark:border-slate-800">
                <BookOpen className="w-12 h-12 text-warm-muted dark:text-slate-500 mx-auto mb-3" />
                <h4 className="text-base font-bold text-warm-text dark:text-slate-200">Không tìm thấy bộ đề phù hợp</h4>
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

      {/* Relational Starred Questions Modal (Click-to-Jump Deep Linking) */}
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
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {starredQuestions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleJumpToStarredQuestion(item)}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-warm-border dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 shadow-xs hover:shadow-soft transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 text-xs group"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-800 dark:text-slate-200 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-800">
                      [{item.subjectCode || 'MÔN'}] {item.quizTitle || 'Bộ Đề'}
                    </span>
                    <span className="font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                      Câu #{(item.questionIndex ?? 0) + 1}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100 leading-relaxed group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                    {item.question?.content || 'Nội dung câu hỏi'}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="p-1.5 rounded-full bg-warm-hover dark:bg-slate-700 text-warm-slate dark:text-slate-300 group-hover:bg-amber-100 dark:group-hover:bg-amber-900 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRemoveStar(item.questionId); }}
                    className="p-1.5 rounded-full hover:bg-rose-100 dark:hover:bg-rose-950 text-rose-500 transition-colors"
                    title="Bỏ lưu"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CustomModal>

      {/* Floating Compact Ambient Sound Player */}
      <LofiAudioPlayer />
    </div>
  );
}
