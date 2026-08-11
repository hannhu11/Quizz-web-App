import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Star, Shuffle, CheckCircle, HelpCircle, X, Check, Maximize2, Minimize2 } from 'lucide-react';
import { toggleStarQuestion, getStarredQuestions, setQuizCardState } from '../data/quizDataLoader';

export default function FlashcardViewer({ quiz, onBack, initialIndex = 0 }) {
  const [questions, setQuestions] = useState(quiz.questions || []);
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  // Track Progress States
  const [isTrackProgressEnabled, setIsTrackProgressEnabled] = useState(false);
  const [stillLearningCount, setStillLearningCount] = useState(0);
  const [knowCount, setKnowCount] = useState(0);

  // Fullscreen State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const currentQ = questions[currentIndex] || {};
  const correctAnswers = (currentQ.answers || []).filter(a => a.isCorrect);

  // Format full answer text with letter prefix (e.g. "C. Cả a và b")
  let formattedAnswerText = 'Chưa có đáp án';
  if (correctAnswers.length > 1) {
    formattedAnswerText = correctAnswers.map(ca => {
      const cIdx = (currentQ.answers || []).indexOf(ca);
      return cIdx >= 0 ? `${String.fromCharCode(65 + cIdx)}. ${ca.content}` : ca.content;
    }).join('\n');
  } else if (correctAnswers.length === 1) {
    const ca = correctAnswers[0];
    const cIdx = (currentQ.answers || []).indexOf(ca);
    formattedAnswerText = cIdx >= 0 && (currentQ.answers || []).length > 1
      ? `${String.fromCharCode(65 + cIdx)}. ${ca.content}`
      : ca.content;
  }

  // Sync initialIndex prop
  useEffect(() => {
    if (initialIndex >= 0 && initialIndex < questions.length) {
      setCurrentIndex(initialIndex);
    }
  }, [initialIndex, questions.length]);

  // Sync Starred status on change & listen to global star update event
  useEffect(() => {
    const checkStar = () => {
      if (!currentQ.id) return;
      const stars = getStarredQuestions(quiz.id);
      setIsStarred(stars.some(s => s.questionId === currentQ.id));
    };

    checkStar();
    setIsFlipped(false);

    window.addEventListener('quizzlet_star_updated', checkStar);
    return () => window.removeEventListener('quizzlet_star_updated', checkStar);
  }, [currentIndex, currentQ.id]);

  // Keyboard Navigation Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.code === 'ArrowRight') {
        if (isTrackProgressEnabled) {
          handleMarkKnow();
        } else {
          handleNext();
        }
      } else if (e.code === 'ArrowLeft') {
        if (isTrackProgressEnabled) {
          handleMarkStillLearning();
        } else {
          handlePrev();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions.length, isTrackProgressEnabled, currentQ.id]);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % questions.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + questions.length) % questions.length);
  };

  const handleMarkKnow = () => {
    if (currentQ.id) {
      setQuizCardState(quiz.id, currentQ.id, 'MASTERED');
    }
    setKnowCount(prev => prev + 1);
    handleNext();
  };

  const handleMarkStillLearning = () => {
    if (currentQ.id) {
      setQuizCardState(quiz.id, currentQ.id, 'LEARNING');
    }
    setStillLearningCount(prev => prev + 1);
    handleNext();
  };

  const handleShuffle = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleToggleStar = () => {
    if (!currentQ.id) return;
    toggleStarQuestion(currentQ.id, quiz.id, currentQ, currentIndex);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-4xl mx-auto px-4 py-4 flex flex-col justify-between text-warm-text dark:text-slate-100 ${
        isFullscreen ? 'fixed inset-0 z-50 bg-warm-bg dark:bg-slate-950 p-8 max-w-none justify-between overflow-y-auto' : ''
      }`}
    >
      {/* Top Header & Quizlet Position Indicator */}
      <div className="flex items-center justify-between gap-3 mb-4 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-warm-slate dark:text-slate-300 hover:text-warm-text bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 px-4 py-2 rounded-full shadow-xs hover:shadow transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>

        {/* Center Quizlet Position Badge */}
        <div className="text-center">
          <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
            {currentIndex + 1} / {questions.length}
          </div>
          <div className="text-[11px] font-semibold text-warm-muted dark:text-slate-400">
            {quiz.category || 'MÔN'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-text dark:text-slate-100 text-xs font-semibold transition-all shadow-xs active:scale-95"
            title="Xáo trộn câu hỏi"
          >
            <Shuffle className="w-3.5 h-3.5 text-warm-slate dark:text-slate-400" /> Xáo trộn
          </button>
        </div>
      </div>

      {/* Progress Counter Badges (When Track Progress is ON) */}
      {isTrackProgressEnabled && (
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800">
            <span className="w-2 h-2 rounded-full bg-orange-500" /> {stillLearningCount} Still learning
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
            Know {knowCount} <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </span>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-warm-border/40 dark:bg-slate-800 rounded-full mb-4 overflow-hidden shrink-0">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-warm-slate transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* HARDWARE-ACCELERATED GPU 3D FLASHCARD CONTAINER */}
      <div
        className="w-full max-w-[800px] h-[460px] min-h-[460px] mx-auto my-2 relative perspective-1000 select-none cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className="w-full h-full relative transform-style-3d transition-transform duration-300 ease-out rounded-[24px]"
          style={{
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            willChange: 'transform'
          }}
        >
          {/* Card Front */}
          <div className="absolute inset-0 backface-hidden w-full h-full rounded-[24px] bg-white dark:bg-slate-900 p-6 sm:p-8 border border-warm-border dark:border-slate-800 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] flex flex-col justify-between items-center text-center overflow-hidden">
            <div className="w-full flex items-center justify-between text-xs font-bold text-warm-muted dark:text-slate-400 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200/80 dark:border-amber-800/80">
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" /> Câu hỏi #{currentQ.questionIndex !== undefined ? currentQ.questionIndex + 1 : currentIndex + 1}
              </span>

              <button
                onClick={(e) => { e.stopPropagation(); handleToggleStar(); }}
                className="p-2 rounded-full hover:bg-warm-hover dark:hover:bg-slate-800 transition-transform active:scale-125"
                title="Lưu câu hỏi ⭐"
              >
                <Star className={`w-5 h-5 ${isStarred ? 'fill-amber-400 text-amber-500' : 'text-warm-muted dark:text-slate-500'}`} />
              </button>
            </div>

            <div className="my-auto py-2 px-2 max-w-2xl w-full text-center flex flex-col items-center justify-center space-y-3">
              <p className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug break-words">
                {currentQ.content}
              </p>

              {(currentQ.answers || []).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full pt-2">
                  {currentQ.answers.map((a, aIdx) => (
                    <div
                      key={aIdx}
                      className="text-xs p-2.5 rounded-xl border border-warm-border/80 dark:border-slate-800 bg-warm-bg/70 dark:bg-slate-800/60 text-warm-text dark:text-slate-200 font-medium text-left flex items-start gap-2 leading-relaxed break-words"
                    >
                      <span className="font-bold text-warm-slate dark:text-slate-300 shrink-0">
                        {String.fromCharCode(65 + aIdx)}.
                      </span>
                      <span className="break-words line-clamp-3">{a.content}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full flex items-center justify-center gap-2 text-xs text-warm-muted dark:text-slate-400 font-medium pt-3 border-t border-warm-border/40 dark:border-slate-800 shrink-0">
              <RotateCw className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
              <span>Bấm vào thẻ hoặc phím <kbd className="px-2 py-0.5 bg-warm-hover dark:bg-slate-800 border border-warm-border dark:border-slate-700 rounded font-mono text-[11px]">Space</kbd> để lật xem đáp án</span>
            </div>
          </div>

          {/* Card Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full rounded-[24px] bg-gradient-to-br from-amber-50/90 via-white to-indigo-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 p-6 sm:p-8 border border-amber-200/80 dark:border-slate-800 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] flex flex-col justify-between items-center text-center overflow-hidden">
            <div className="w-full flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300 shrink-0">
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Đáp án chính xác
              </span>
              <span className="text-warm-muted dark:text-slate-400">Bấm để lật lại câu hỏi</span>
            </div>

            <div className="my-auto py-2 px-2 max-w-2xl w-full text-center flex flex-col items-center justify-center space-y-4">
              <div className="p-5 rounded-2xl bg-white/90 dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 text-center shadow-xs w-full">
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                  ✓ Đáp án đúng
                </p>
                <p className="text-base sm:text-lg font-extrabold text-emerald-950 dark:text-emerald-200 leading-snug break-words">
                  {formattedAnswerText}
                </p>
              </div>

              {currentQ.explanation && (
                <div className="p-3.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 leading-relaxed text-left w-full">
                  <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1">💡 Giải thích chi tiết:</span>
                  {currentQ.explanation}
                </div>
              )}
            </div>

            <div className="w-full flex items-center justify-between pt-3 border-t border-warm-border/40 dark:border-slate-800 text-xs text-warm-muted dark:text-slate-400 shrink-0">
              <span>{quiz.subject}</span>
              <span className="text-[11px] italic">Thẻ #{currentQ.questionIndex !== undefined ? currentQ.questionIndex + 1 : currentIndex + 1}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Controls Row */}
      <div className="flex items-center justify-between gap-3 mt-4 shrink-0">
        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-warm-text dark:text-slate-200">
          <span>Track progress</span>
          <input
            type="checkbox"
            checked={isTrackProgressEnabled}
            onChange={(e) => setIsTrackProgressEnabled(e.target.checked)}
            className="w-4 h-4 accent-warm-slate rounded cursor-pointer"
          />
        </label>

        {isTrackProgressEnabled ? (
          <div className="flex items-center gap-4">
            <button
              onClick={handleMarkStillLearning}
              className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950/80 hover:bg-orange-200 text-orange-600 dark:text-orange-400 border border-orange-300 dark:border-orange-800 flex items-center justify-center shadow-xs transition-all active:scale-90"
              title="Chưa thuộc (Phím ←)"
            >
              <X className="w-6 h-6 stroke-[3]" />
            </button>

            <button
              onClick={handleMarkKnow}
              className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 hover:bg-emerald-200 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center shadow-xs transition-all active:scale-90"
              title="Đã thuộc (Phím →)"
            >
              <Check className="w-6 h-6 stroke-[3]" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-text dark:text-slate-100 font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-warm-slate dark:text-slate-300" /> Câu trước
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-warm-slate dark:bg-slate-800 hover:bg-slate-700 dark:hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-95"
            >
              Câu tiếp <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <button
          onClick={toggleFullscreen}
          className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-muted dark:text-slate-300 hover:text-warm-text transition-all active:scale-95"
          title="Bật/Tắt Toàn Màn Hình"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
