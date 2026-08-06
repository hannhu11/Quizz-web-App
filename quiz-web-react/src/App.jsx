import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SubjectCard from './components/SubjectCard';
import FlashcardViewer from './components/FlashcardViewer';
import PracticeMode from './components/PracticeMode';
import ExamMode from './components/ExamMode';
import LofiAudioPlayer from './components/LofiAudioPlayer';
import CustomModal from './components/CustomModal';
import { QUIZ_MANIFEST, fetchQuizById, getUserProgress, getStarredQuestions, toggleStarQuestion } from './data/quizDataLoader';
import { Sparkles, BookOpen, Layers, Star, Trash2 } from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeQuizId, setActiveQuizId] = useState(null);
  const [studyMode, setStudyMode] = useState(null); // 'FLASHCARD' | 'PRACTICE' | 'EXAM'
  const [loadedQuiz, setLoadedQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  // Handle Mode Selection synchronously & reliably
  const handleSelectMode = (quizId, mode) => {
    setIsLoading(true);
    try {
      const quizData = fetchQuizById(quizId);
      setActiveQuizId(quizId);
      setStudyMode(mode);
      setLoadedQuiz(quizData);
    } catch (err) {
      console.error('Failed to load quiz data', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    setActiveQuizId(null);
    setStudyMode(null);
    setLoadedQuiz(null);
    setProgress(getUserProgress());
  };

  const handleRemoveStar = (questionId) => {
    const updated = toggleStarQuestion(questionId, '', null);
    setStarredQuestions(updated);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-warm-bg text-warm-text'}`}>
      {/* Header Bar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
        starredCount={starredQuestions.length}
        onOpenStarred={() => setIsStarredModalOpen(true)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin mb-4" />
            <p className="text-sm font-semibold text-warm-muted">Đang mở bài học...</p>
          </div>
        )}

        {/* Active Study Views */}
        {!isLoading && studyMode && loadedQuiz && (
          <>
            {studyMode === 'FLASHCARD' && <FlashcardViewer quiz={loadedQuiz} onBack={handleBackToDashboard} />}
            {studyMode === 'PRACTICE' && <PracticeMode quiz={loadedQuiz} onBack={handleBackToDashboard} />}
            {studyMode === 'EXAM' && <ExamMode quiz={loadedQuiz} onBack={handleBackToDashboard} />}
          </>
        )}

        {/* Dashboard Grid (When no quiz is selected) */}
        {!isLoading && !studyMode && (
          <div className="space-y-8">
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-100/90 via-rose-100/80 to-indigo-100/70 p-6 sm:p-8 border border-amber-200/80 shadow-soft">
              <div className="max-w-2xl relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-amber-200 text-amber-900 text-xs font-bold shadow-xs mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Góc Ôn Luyện Kiến Thức
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  Thư Thái Ghi Nhớ • Ôn Luyện Hiệu Quả
                </h2>
                <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                  Ghi nhớ flashcard, luyện tập trắc nghiệm và thư giãn cùng âm thanh không gian thư thái.
                </p>
              </div>

              <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-amber-200/40 blur-2xl pointer-events-none" />
            </div>

            {/* Quizzes List Grid Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-warm-text flex items-center gap-2">
                  <Layers className="w-5 h-5 text-warm-slate" /> Danh Sách Bộ Đề ({filteredQuizzes.length})
                </h3>
                <p className="text-xs text-warm-muted">Chọn chế độ Lật thẻ, Luyện tập hoặc Thi thử để bắt đầu</p>
              </div>
            </div>

            {/* Grid of Subject Cards */}
            {filteredQuizzes.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-warm-border">
                <BookOpen className="w-12 h-12 text-warm-muted mx-auto mb-3" />
                <h4 className="text-base font-bold text-warm-text">Không tìm thấy bộ đề phù hợp</h4>
                <p className="text-xs text-warm-muted mt-1">Hãy thử tìm kiếm với từ khóa khác</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuizzes.map((quiz) => (
                  <SubjectCard
                    key={quiz.id}
                    quiz={quiz}
                    progress={progress}
                    onSelectMode={handleSelectMode}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Starred Questions Modal */}
      <CustomModal
        isOpen={isStarredModalOpen}
        onClose={() => setIsStarredModalOpen(false)}
        title={`Câu Hỏi Đã Lưu (${starredQuestions.length})`}
      >
        {starredQuestions.length === 0 ? (
          <div className="text-center py-8 text-warm-muted">
            <Star className="w-8 h-8 text-warm-border mx-auto mb-2" />
            <p className="text-sm font-semibold">Chưa có câu hỏi nào được lưu</p>
            <p className="text-xs">Bấm vào biểu tượng ngôi sao trong chế độ lật thẻ để lưu câu hỏi cần xem lại.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {starredQuestions.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-warm-bg border border-warm-border flex items-start justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mb-1 inline-block">
                    Câu hỏi #{item.questionId}
                  </span>
                  <p className="font-semibold text-warm-text leading-relaxed">{item.question?.content}</p>
                </div>
                <button
                  onClick={() => handleRemoveStar(item.questionId)}
                  className="p-1.5 rounded-full hover:bg-rose-100 text-rose-500 transition-colors"
                  title="Bỏ lưu"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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
