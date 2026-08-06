import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Star, Shuffle, CheckCircle, HelpCircle } from 'lucide-react';
import { toggleStarQuestion, getStarredQuestions } from '../data/quizDataLoader';

export default function FlashcardViewer({ quiz, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [questions, setQuestions] = useState(quiz.questions || []);
  const [isStarred, setIsStarred] = useState(false);
  const [masteredIds, setMasteredIds] = useState(new Set());

  const currentQ = questions[currentIndex] || {};
  const correctAnswer = (currentQ.answers || []).find(a => a.isCorrect);

  // Check starred status on index change
  useEffect(() => {
    if (!currentQ.id) return;
    const stars = getStarredQuestions();
    setIsStarred(stars.some(s => s.questionId === currentQ.id));
    setIsFlipped(false);
  }, [currentIndex, currentQ.id]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions.length]);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % questions.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + questions.length) % questions.length);
  };

  const handleShuffle = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleToggleStar = () => {
    if (!currentQ.id) return;
    const updated = toggleStarQuestion(currentQ.id, quiz.id, currentQ);
    setIsStarred(updated.some(s => s.questionId === currentQ.id));
  };

  const toggleMastered = () => {
    setMasteredIds(prev => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) {
        next.delete(currentQ.id);
      } else {
        next.add(currentQ.id);
      }
      return next;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 flex flex-col justify-between">
      {/* Top Controls Header */}
      <div className="flex items-center justify-between gap-3 mb-4 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-warm-slate hover:text-warm-text bg-white border border-warm-border px-4 py-2 rounded-full shadow-xs hover:shadow transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-warm-border hover:bg-warm-hover text-warm-text text-xs font-semibold transition-all shadow-xs active:scale-95"
            title="Xáo trộn câu hỏi"
          >
            <Shuffle className="w-3.5 h-3.5 text-warm-slate" /> Xáo trộn
          </button>

          <span className="text-xs font-bold text-warm-muted px-3.5 py-1.5 bg-warm-hover rounded-full border border-warm-border/60">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-warm-border/40 rounded-full mb-4 overflow-hidden shrink-0">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-warm-slate transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* HARDWARE-ACCELERATED GPU 3D FLASHCARD CONTAINER (min-h-[460px], NO LAG) */}
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
          {/* Card Front (Question / Term + Options List) */}
          <div className="absolute inset-0 backface-hidden w-full h-full rounded-[24px] bg-white p-6 sm:p-8 border border-warm-border shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] flex flex-col justify-between items-center text-center overflow-hidden">
            {/* Top Bar inside Card */}
            <div className="w-full flex items-center justify-between text-xs font-bold text-warm-muted shrink-0">
              <span className="inline-flex items-center gap-1.5 text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" /> Câu hỏi #{currentIndex + 1}
              </span>

              <button
                onClick={(e) => { e.stopPropagation(); handleToggleStar(); }}
                className="p-2 rounded-full hover:bg-warm-hover text-amber-400 transition-transform active:scale-125"
                title="Lưu câu hỏi ⭐"
              >
                <Star className={`w-5 h-5 ${isStarred ? 'fill-amber-400 text-amber-500' : 'text-warm-muted'}`} />
              </button>
            </div>

            {/* Question / Term & Options List */}
            <div className="my-auto py-2 px-2 max-w-2xl w-full text-center flex flex-col items-center justify-center space-y-3">
              <p className="text-base sm:text-lg md:text-xl font-bold text-slate-900 leading-snug break-words">
                {currentQ.content}
              </p>

              {/* Display Options List (Term & Options) */}
              {(currentQ.answers || []).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full pt-2">
                  {currentQ.answers.map((a, aIdx) => (
                    <div
                      key={aIdx}
                      className="text-xs p-2.5 rounded-xl border border-warm-border/80 bg-warm-bg/70 text-warm-text font-medium text-left flex items-start gap-2"
                    >
                      <span className="font-bold text-warm-slate shrink-0">
                        {String.fromCharCode(65 + aIdx)}.
                      </span>
                      <span className="truncate">{a.content}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Flip Hint Footer */}
            <div className="w-full flex items-center justify-center gap-2 text-xs text-warm-muted font-medium pt-3 border-t border-warm-border/40 shrink-0">
              <RotateCw className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
              <span>Bấm vào thẻ hoặc phím <kbd className="px-2 py-0.5 bg-warm-hover border border-warm-border rounded font-mono text-[11px]">Space</kbd> để lật xem đáp án</span>
            </div>
          </div>

          {/* Card Back (Definition / Answer & Explanation) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full rounded-[24px] bg-gradient-to-br from-amber-50/90 via-white to-indigo-50/70 p-6 sm:p-8 border border-amber-200/80 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] flex flex-col justify-between items-center text-center overflow-hidden">
            {/* Top Bar inside Answer Card */}
            <div className="w-full flex items-center justify-between text-xs font-bold text-emerald-800 shrink-0">
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Đáp án chính xác
              </span>
              <span className="text-warm-muted">Bấm để lật lại câu hỏi</span>
            </div>

            {/* Answer & Explanation Centered */}
            <div className="my-auto py-2 px-2 max-w-2xl w-full text-center flex flex-col items-center justify-center space-y-3">
              <div className="p-4 rounded-2xl bg-white/90 border border-emerald-200 text-center shadow-xs w-full">
                <p className="text-base sm:text-lg font-extrabold text-emerald-950 leading-snug break-words">
                  {correctAnswer ? correctAnswer.content : 'Chưa có đáp án'}
                </p>
              </div>

              {currentQ.explanation && (
                <div className="p-3 rounded-xl bg-warm-hover/70 border border-warm-border text-xs text-warm-text leading-relaxed text-left w-full">
                  <span className="font-bold text-warm-slate block mb-1">💡 Giải thích chi tiết:</span>
                  {currentQ.explanation}
                </div>
              )}
            </div>

            {/* Bottom Status Footer */}
            <div className="w-full flex items-center justify-between pt-3 border-t border-warm-border/40 text-xs text-warm-muted shrink-0">
              <span>{quiz.subject}</span>
              <button
                onClick={(e) => { e.stopPropagation(); toggleMastered(); }}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                  masteredIds.has(currentQ.id)
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-warm-border text-warm-muted hover:text-warm-text'
                }`}
              >
                {masteredIds.has(currentQ.id) ? '✓ Đã thuộc' : '+ Đánh dấu đã thuộc'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 mt-4 shrink-0">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-warm-border hover:bg-warm-hover text-warm-text font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-warm-slate" /> Câu trước
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-warm-muted font-medium bg-white/60 px-4 py-1.5 rounded-full border border-warm-border/60">
          <span>Phím <kbd className="px-1.5 py-0.5 bg-warm-hover border rounded">←</kbd> <kbd className="px-1.5 py-0.5 bg-warm-hover border rounded">→</kbd> chuyển câu</span>
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-warm-slate hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-95"
        >
          Câu tiếp <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
