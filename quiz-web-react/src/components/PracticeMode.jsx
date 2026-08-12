import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCw, Star, CheckCircle, XCircle, Volume2, Award, Sparkles, HelpCircle, CheckCircle2, Keyboard } from 'lucide-react';
import { toggleStarQuestion, getStarredQuestions, saveQuizProgress, setQuizCardState } from '../data/quizDataLoader';

export default function PracticeMode({ quiz, onBack }) {
  const questions = quiz.questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerIds, setSelectedAnswerIds] = useState([]); // Array for multi-select support
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHotkeyModal, setShowHotkeyModal] = useState(false);

  const [starredIds, setStarredIds] = useState(() => {
    return new Set(getStarredQuestions(quiz.id).map(s => s.questionId));
  });

  const currentQ = questions[currentIndex] || {};
  const isStarred = starredIds.has(currentQ.id);

  const correctAnswers = (currentQ.answers || []).filter(a => a.isCorrect);
  const isMultiSelect = correctAnswers.length > 1;

  // Sync Starred State
  useEffect(() => {
    const checkStar = () => {
      setStarredIds(new Set(getStarredQuestions(quiz.id).map(s => s.questionId)));
    };
    window.addEventListener('quizzlet_star_updated', checkStar);
    return () => window.removeEventListener('quizzlet_star_updated', checkStar);
  }, [quiz.id]);

  const handleToggleOptionSelect = (answerId) => {
    if (isAnswered) return;
    if (isMultiSelect) {
      setSelectedAnswerIds(prev =>
        prev.includes(answerId) ? prev.filter(id => id !== answerId) : [...prev, answerId]
      );
    } else {
      setSelectedAnswerIds([answerId]);
      evaluateAnswer([answerId]);
    }
  };

  const evaluateAnswer = (selectedIds) => {
    setIsAnswered(true);
    const correctIds = correctAnswers.map(a => a.id);
    const isCorrect = correctIds.length === selectedIds.length &&
      correctIds.every(id => selectedIds.includes(id));

    if (isCorrect) {
      setScore(prev => prev + 1);
      if (currentQ.id) {
        setQuizCardState(quiz.id, currentQ.id, 'MASTERED');
      }
    } else {
      if (currentQ.id) {
        setQuizCardState(quiz.id, currentQ.id, 'LEARNING');
      }
    }
  };

  const handleConfirmMultiSubmit = () => {
    if (isAnswered || selectedAnswerIds.length === 0) return;
    evaluateAnswer(selectedAnswerIds);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswerIds([]);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      saveQuizProgress(quiz.id, score, questions.length, 'PRACTICE');
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setSelectedAnswerIds([]);
      setIsAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswerIds([]);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  const handleToggleStar = () => {
    if (!currentQ.id) return;
    toggleStarQuestion(currentQ.id, quiz.id, currentQ, currentIndex);
  };

  // Keyboard Shortcuts Navigation & Selection (Knowt / Quizlet Style)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      const isInput = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.isContentEditable
      );
      if (isInput || isCompleted) return;

      const key = e.key;

      if (key === '?' || (key === '/' && e.shiftKey)) {
        e.preventDefault();
        setShowHotkeyModal(prev => !prev);
        return;
      }

      if (key === 's' || key === 'S' || key === '*') {
        e.preventDefault();
        handleToggleStar();
        return;
      }

      if (key === 'ArrowRight' || key === 'Enter') {
        if (isAnswered) {
          e.preventDefault();
          handleNextQuestion();
        } else if (isMultiSelect && selectedAnswerIds.length > 0) {
          e.preventDefault();
          handleConfirmMultiSubmit();
        }
      } else if (key === 'ArrowLeft') {
        if (currentIndex > 0) {
          e.preventDefault();
          handlePrevQuestion();
        }
      }

      if (!isAnswered) {
        const options = currentQ.answers || [];
        let optionIdx = -1;

        if (['1', '2', '3', '4', '5'].includes(key)) {
          optionIdx = parseInt(key, 10) - 1;
        } else if (['a', 'b', 'c', 'd', 'e', 'A', 'B', 'C', 'D', 'E'].includes(key)) {
          const lower = key.toLowerCase();
          optionIdx = lower.charCodeAt(0) - 97;
        }

        if (optionIdx >= 0 && optionIdx < options.length) {
          e.preventDefault();
          const targetOption = options[optionIdx];
          if (targetOption) {
            handleToggleOptionSelect(targetOption.id);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isAnswered, isCompleted, isMultiSelect, selectedAnswerIds, currentQ, questions.length, currentQ.id]);

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Completion Screen
  if (isCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-6 text-warm-text dark:text-slate-100">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-200 dark:border-emerald-800 shadow-soft"
        >
          <Award className="w-10 h-10" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Hoàn Thành Ôn Luyện!
          </h2>
          <p className="text-sm text-warm-muted dark:text-slate-400">
            Bạn đã hoàn thành bộ đề <span className="font-bold text-slate-800 dark:text-slate-200">"{quiz.title}"</span>
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 shadow-soft grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-warm-muted dark:text-slate-400">Điểm số</span>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{score} / {questions.length}</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-warm-muted dark:text-slate-400">Tỷ lệ chính xác</span>
            <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{percentage}%</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-full bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 hover:bg-warm-hover dark:hover:bg-slate-800 font-bold text-xs sm:text-sm text-warm-text dark:text-slate-100 transition-colors shadow-xs"
          >
            Quay lại bộ đề
          </button>

          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs flex items-center gap-2"
          >
            <RotateCw className="w-4 h-4" /> Luyện tập lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-warm-text dark:text-slate-100 pb-20 sm:pb-6">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-warm-slate dark:text-slate-300 hover:text-warm-text bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 px-4 py-2 rounded-full shadow-xs hover:shadow transition-all active:scale-95 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHotkeyModal(true)}
            className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 hover:bg-amber-50 dark:hover:bg-slate-800 text-amber-600 dark:text-amber-400 transition-colors shadow-xs"
            title="Bảng phím tắt (?)"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            onClick={handleToggleStar}
            className={`p-2.5 rounded-full border transition-all ${
              isStarred
                ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400'
                : 'bg-white dark:bg-slate-900 border-warm-border dark:border-slate-800 text-warm-muted dark:text-slate-400 hover:text-amber-500'
            }`}
            title={isStarred ? 'Đã gắn sao câu này' : 'Gắn sao câu hỏi'}
          >
            <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-500' : ''}`} />
          </button>

          <button
            onClick={() => handleSpeak(currentQ.content)}
            className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 text-warm-muted dark:text-slate-400 hover:text-warm-text transition-colors shadow-xs"
            title="Đọc câu hỏi"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-bold text-warm-muted dark:text-slate-400">
          <span>Câu hỏi {currentIndex + 1} / {questions.length}</span>
          <span>Đúng: {score} câu</span>
        </div>
        <div className="w-full h-2 rounded-full bg-warm-border/50 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Box */}
      <div className="bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft space-y-6">
        <div className="space-y-2">
          {isMultiSelect && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-extrabold border border-amber-200 dark:border-amber-800">
              <Sparkles className="w-3.5 h-3.5" /> Chọn nhiều đáp án (Multiple Choice)
            </span>
          )}

          <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
            {currentQ.content}
          </h3>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {(currentQ.answers || []).map((ans, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isSelected = selectedAnswerIds.includes(ans.id);
            const isCorrectOption = ans.isCorrect;

            let borderStyle = 'border-warm-border/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-amber-400 dark:hover:border-slate-700';

            if (isAnswered) {
              if (isCorrectOption) {
                borderStyle = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 font-bold';
              } else if (isSelected) {
                borderStyle = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/60 text-rose-950 dark:text-rose-100 font-bold';
              } else {
                borderStyle = 'border-warm-border/40 dark:border-slate-800/60 opacity-50 bg-white dark:bg-slate-900';
              }
            } else if (isSelected) {
              borderStyle = 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/60 text-amber-950 dark:text-amber-100 font-bold shadow-xs';
            }

            return (
              <button
                key={ans.id || idx}
                onClick={() => handleToggleOptionSelect(ans.id)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 min-h-[52px] ${borderStyle}`}
              >
                <span className="w-7 h-7 rounded-xl bg-warm-bg dark:bg-slate-800 text-warm-text dark:text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 border border-warm-border/60 dark:border-slate-700 mt-0.5">
                  {letter}
                </span>

                <div className="flex-1 text-xs sm:text-sm font-medium pt-1 leading-relaxed">
                  {ans.content}
                </div>

                {isAnswered && (
                  <div className="shrink-0 mt-0.5">
                    {isCorrectOption ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Multi-select Submit Button */}
        {isMultiSelect && !isAnswered && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleConfirmMultiSubmit}
              disabled={selectedAnswerIds.length === 0}
              className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white font-extrabold text-xs sm:text-sm shadow-soft transition-all active:scale-95 flex items-center gap-2 min-h-[44px]"
            >
              <CheckCircle2 className="w-4 h-4" /> Xác nhận đáp án ({selectedAnswerIds.length})
            </button>
          </div>
        )}

        {/* Explanation & Correct Answer Box */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 pt-4 border-t border-warm-border/60 dark:border-slate-800"
            >
              {/* Correct Answer Display */}
              <div className="p-4 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                  ✓ Đáp án đúng:
                </span>
                <p className="font-extrabold text-emerald-950 dark:text-emerald-100 text-sm whitespace-pre-wrap">
                  {correctAnswers.length > 1
                    ? correctAnswers.map(ca => {
                        const cIdx = (currentQ.answers || []).indexOf(ca);
                        return cIdx >= 0 ? `${String.fromCharCode(65 + cIdx)}. ${ca.content}` : ca.content;
                      }).join('\n')
                    : (correctAnswers[0]?.content || 'Chưa có đáp án')}
                </p>
              </div>

              {/* Academic Insight Explanation Box */}
              {currentQ.explanation && (
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 border-l-4 border-l-indigo-500 dark:border-slate-800 dark:bg-slate-900/50 dark:border-l-indigo-400 shadow-xs transition-all">
                  <div className="flex items-center gap-1.5 mb-1.5 text-indigo-700 dark:text-indigo-300">
                    <Sparkles className="w-4 h-4 stroke-[1.75]" />
                    <span className="text-[11px] font-extrabold uppercase tracking-wider">
                      Phân Tích Học Thuật
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-normal break-words whitespace-pre-wrap">
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              {/* Next Question Trigger (Desktop) */}
              <div className="text-right pt-2 hidden sm:block">
                <button
                  onClick={handleNextQuestion}
                  className={`px-6 py-2.5 rounded-full text-white font-extrabold text-xs sm:text-sm shadow-xs transition-all active:scale-95 inline-flex items-center gap-2 min-h-[44px] ${
                    currentIndex === questions.length - 1
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {currentIndex === questions.length - 1 ? '✓ Nộp bài thi' : 'Câu tiếp theo →'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Ergonomic Sticky Bottom Bar (< 640px) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-warm-border dark:border-slate-800 p-3 flex items-center justify-between gap-3 shadow-lg">
        <button
          disabled={currentIndex === 0}
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex(prev => prev - 1);
              setIsAnswered(false);
            }
          }}
          className="px-4 py-2 rounded-xl border border-warm-border dark:border-slate-800 text-xs font-bold disabled:opacity-40 min-h-[44px] flex items-center gap-1"
        >
          ← Câu trước
        </button>

        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
          {currentIndex + 1} / {questions.length}
        </span>

        {isAnswered ? (
          <button
            onClick={handleNextQuestion}
            className={`px-4 py-2 rounded-xl text-white text-xs font-extrabold active:scale-95 min-h-[44px] flex items-center gap-1 ${
              currentIndex === questions.length - 1
                ? 'bg-emerald-600'
                : 'bg-indigo-600'
            }`}
          >
            {currentIndex === questions.length - 1 ? '✓ Nộp bài' : 'Câu tiếp →'}
          </button>
        ) : isMultiSelect ? (
          <button
            onClick={handleConfirmMultiSubmit}
            disabled={selectedAnswerIds.length === 0}
            className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white font-extrabold text-xs min-h-[44px] shadow-xs active:scale-95 flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" /> Xác nhận chọn ({selectedAnswerIds.length})
          </button>
        ) : (
          <span className="text-xs font-bold text-warm-muted dark:text-slate-400">
            Chạm đáp án để trả lời
          </span>
        )}
      </div>

      {/* Knowt Style Hotkey Overlay Modal */}
      {showHotkeyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setShowHotkeyModal(false)}>
          <div className="bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-warm-text dark:text-slate-100" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-warm-border/60 dark:border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-indigo-600 dark:text-indigo-400 stroke-[1.75]" />
                Bảng Phím Tắt Luyện Tập (Knowt Style)
              </h3>
              <button onClick={() => setShowHotkeyModal(false)} className="p-1.5 rounded-full hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-muted dark:text-slate-400">✕</button>
            </div>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1.5 border-b border-warm-border/30 dark:border-slate-800/60">
                <span>Chọn đáp án (1 đến 5)</span>
                <code className="bg-warm-bg dark:bg-slate-800 px-2 py-1 rounded font-mono font-bold text-amber-600 dark:text-amber-400">1, 2, 3, 4, 5 / A, B, C, D, E</code>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-warm-border/30 dark:border-slate-800/60">
                <span>Chuyển câu tiếp theo</span>
                <code className="bg-warm-bg dark:bg-slate-800 px-2 py-1 rounded font-mono font-bold text-amber-600 dark:text-amber-400">→ / Enter</code>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-warm-border/30 dark:border-slate-800/60">
                <span>Quay lại câu trước</span>
                <code className="bg-warm-bg dark:bg-slate-800 px-2 py-1 rounded font-mono font-bold text-amber-600 dark:text-amber-400">←</code>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-warm-border/30 dark:border-slate-800/60">
                <span>Gắn sao câu hỏi ⭐</span>
                <code className="bg-warm-bg dark:bg-slate-800 px-2 py-1 rounded font-mono font-bold text-amber-600 dark:text-amber-400">S / *</code>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span>Mở/Đóng Bảng phím tắt này</span>
                <code className="bg-warm-bg dark:bg-slate-800 px-2 py-1 rounded font-mono font-bold text-amber-600 dark:text-amber-400">?</code>
              </div>
            </div>
            <button onClick={() => setShowHotkeyModal(false)} className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors">
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
