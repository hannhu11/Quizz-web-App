import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCw, Star, CheckCircle, XCircle, Volume2, Award, Sparkles, HelpCircle } from 'lucide-react';
import { toggleStarQuestion, getStarredQuestions, saveQuizProgress, setQuizCardState } from '../data/quizDataLoader';

export default function PracticeMode({ quiz, onBack }) {
  const questions = quiz.questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const [starredIds, setStarredIds] = useState(() => {
    return new Set(getStarredQuestions().map(s => s.questionId));
  });

  const currentQ = questions[currentIndex] || {};
  const isStarred = starredIds.has(currentQ.id);

  // Sync Starred State
  useEffect(() => {
    const checkStar = () => {
      setStarredIds(new Set(getStarredQuestions().map(s => s.questionId)));
    };
    window.addEventListener('quizzlet_star_updated', checkStar);
    return () => window.removeEventListener('quizzlet_star_updated', checkStar);
  }, []);

  const handleSelectOption = (answerId, isCorrect) => {
    if (isAnswered) return;
    setSelectedAnswerId(answerId);
    setIsAnswered(true);

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

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswerId(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      saveQuizProgress(quiz.id, score, questions.length, 'PRACTICE');
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswerId(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  const handleToggleStar = () => {
    if (!currentQ.id) return;
    toggleStarQuestion(currentQ.id, quiz.id, currentQ, currentIndex);
  };

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

  const correctAnswer = (currentQ.answers || []).find(a => a.isCorrect);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-warm-text dark:text-slate-100">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-warm-slate dark:text-slate-300 hover:text-warm-text bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 px-4 py-2 rounded-full shadow-xs hover:shadow transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>

        <div className="text-center">
          <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
            Câu {currentIndex + 1} / {questions.length}
          </div>
          <div className="text-[11px] font-semibold text-warm-muted dark:text-slate-400">
            Đúng: {score} câu
          </div>
        </div>

        <button
          onClick={handleToggleStar}
          className="p-2 rounded-full bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-slate dark:text-slate-300 transition-transform active:scale-125"
          title="Lưu câu hỏi ⭐"
        >
          <Star className={`w-5 h-5 ${isStarred ? 'fill-amber-400 text-amber-500' : 'text-warm-muted dark:text-slate-500'}`} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-warm-border/40 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-indigo-500 transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-warm-border dark:border-slate-800 shadow-soft space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-md border border-amber-200/80 dark:border-amber-800 inline-block">
              Câu hỏi #{currentQ.questionIndex !== undefined ? currentQ.questionIndex + 1 : currentIndex + 1}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed pt-2">
              {currentQ.content}
            </h3>
          </div>

          <button
            onClick={() => handleSpeak(currentQ.content)}
            className="p-2 rounded-full hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-muted dark:text-slate-400 hover:text-warm-text transition-colors shrink-0"
            title="Đọc phát âm"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {(currentQ.answers || []).map((answer, aIdx) => {
            const isSelected = selectedAnswerId === answer.id;
            let btnStyle = 'bg-warm-bg/70 dark:bg-slate-800/60 border-warm-border dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:border-amber-400';

            if (isAnswered) {
              if (answer.isCorrect) {
                btnStyle = 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-bold';
              } else if (isSelected && !answer.isCorrect) {
                btnStyle = 'bg-rose-50 dark:bg-rose-950/80 border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-200 font-bold';
              } else {
                btnStyle = 'bg-warm-bg/40 dark:bg-slate-800/30 border-warm-border/40 dark:border-slate-800 opacity-60';
              }
            }

            return (
              <button
                key={answer.id || aIdx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(answer.id, answer.isCorrect)}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all duration-200 flex items-start gap-3 leading-relaxed break-words whitespace-pre-wrap ${btnStyle}`}
              >
                <span className="font-extrabold shrink-0 mt-0.5">
                  {String.fromCharCode(65 + aIdx)}.
                </span>
                <span className="flex-1">{answer.content}</span>

                {isAnswered && answer.isCorrect && (
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
                {isAnswered && isSelected && !answer.isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

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
                <p className="font-extrabold text-emerald-950 dark:text-emerald-100 text-sm">
                  {correctAnswer ? correctAnswer.content : 'Chưa có đáp án'}
                </p>
              </div>

              {/* Detailed Explanation */}
              {currentQ.explanation && (
                <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
                  <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1">💡 Giải thích chi tiết:</span>
                  {currentQ.explanation}
                </div>
              )}

              {/* Next Question Trigger */}
              <div className="text-right pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 inline-flex items-center gap-2"
                >
                  {currentIndex + 1 < questions.length ? 'Câu tiếp theo' : 'Xem kết quả'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
