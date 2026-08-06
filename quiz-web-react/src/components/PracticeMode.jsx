import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, HelpCircle, Star, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { toggleStarQuestion, getStarredQuestions, saveQuizProgress } from '../data/quizDataLoader';
import confetti from 'canvas-confetti';

export default function PracticeMode({ quiz, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionIndex: answerId }
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [starredIds, setStarredIds] = useState(() => {
    return new Set(getStarredQuestions().map(s => s.questionId));
  });

  const questions = quiz.questions || [];
  const currentQ = questions[currentIndex] || {};
  const currentSelected = selectedAnswers[currentIndex];
  const isAnswered = currentSelected !== undefined;
  const isStarred = currentQ.id ? starredIds.has(currentQ.id) : false;

  // Listen to global star update event
  useEffect(() => {
    const checkStar = () => {
      setStarredIds(new Set(getStarredQuestions().map(s => s.questionId)));
    };
    window.addEventListener('quizzlet_star_updated', checkStar);
    return () => window.removeEventListener('quizzlet_star_updated', checkStar);
  }, []);

  const handleSelectOption = (answer) => {
    if (isAnswered) return;

    const isCorrect = answer.isCorrect;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: answer.id }));

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      const finalScore = score + (questions[currentIndex] && (currentQ.answers.find(a => a.id === selectedAnswers[currentIndex])?.isCorrect) ? 1 : 0);
      saveQuizProgress(quiz.id, finalScore, questions.length, 'PRACTICE');
      try {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setScore(0);
    setIsCompleted(false);
  };

  const handleToggleStar = () => {
    if (!currentQ.id) return;
    toggleStarQuestion(currentQ.id, quiz.id, currentQ, currentIndex);
  };

  const correctAnswer = (currentQ.answers || []).find(a => a.isCorrect);

  if (isCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-warm-text dark:text-slate-100">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-warm-border dark:border-slate-800 shadow-soft-lg space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center border border-amber-200 dark:border-amber-800">
            <Trophy className="w-8 h-8 fill-amber-400 text-amber-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Hoàn Thành Luyện Tập!</h2>
            <p className="text-sm text-warm-muted dark:text-slate-400 mt-1">{quiz.title}</p>
          </div>

          <div className="p-6 rounded-2xl bg-warm-bg dark:bg-slate-800 border border-warm-border dark:border-slate-700 inline-block min-w-[240px]">
            <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">{score} / {questions.length}</div>
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">Đạt {percentage}% tổng điểm</div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-warm-border/60 dark:border-slate-800">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-slate-800 border border-warm-border dark:border-slate-700 hover:bg-warm-hover dark:hover:bg-slate-700 font-semibold text-sm shadow-xs transition-all active:scale-95 text-warm-text dark:text-slate-100"
            >
              <RotateCcw className="w-4 h-4 text-warm-slate dark:text-slate-300" /> Luyện lại
            </button>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-warm-slate dark:bg-slate-800 hover:bg-slate-700 dark:hover:bg-slate-700 text-white font-semibold text-sm shadow-xs transition-all active:scale-95"
            >
              Quay lại danh sách
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 text-warm-text dark:text-slate-100">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-warm-slate dark:text-slate-300 hover:text-warm-text bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 px-4 py-2 rounded-full shadow-xs hover:shadow transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Đúng: {score}
          </span>
          <span className="text-xs font-bold text-warm-muted dark:text-slate-300 px-3 py-1 bg-warm-hover dark:bg-slate-800 rounded-full border border-warm-border/60 dark:border-slate-700">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-warm-border/40 dark:bg-slate-800 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-warm-slate dark:bg-slate-400 transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-warm-border dark:border-slate-800 shadow-soft mb-6 space-y-6">
        <div className="flex items-center justify-between text-xs font-bold text-warm-muted dark:text-slate-400">
          <span className="text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200/80 dark:border-amber-800">
            Câu {currentIndex + 1}
          </span>
          <div className="flex items-center gap-2">
            <span>{quiz.subject}</span>
            <button
              onClick={handleToggleStar}
              className="p-1.5 rounded-full hover:bg-warm-hover dark:hover:bg-slate-800 transition-transform active:scale-125"
              title="Lưu câu hỏi ⭐"
            >
              <Star className={`w-5 h-5 ${isStarred ? 'fill-amber-400 text-amber-500' : 'text-warm-muted dark:text-slate-500'}`} />
            </button>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed break-words">
          {currentQ.content}
        </h3>

        {/* Options List */}
        <div className="space-y-3">
          {(currentQ.answers || []).map((answer, aIdx) => {
            const isSelected = currentSelected === answer.id;
            let optionStyle = "bg-white dark:bg-slate-900 border-warm-border dark:border-slate-800 text-warm-text dark:text-slate-100 hover:bg-warm-hover dark:hover:bg-slate-800";

            if (isAnswered) {
              if (answer.isCorrect) {
                optionStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-semibold shadow-xs";
              } else if (isSelected && !answer.isCorrect) {
                optionStyle = "bg-rose-50 dark:bg-rose-950/60 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200 font-semibold";
              } else {
                optionStyle = "bg-gray-50/60 dark:bg-slate-800/40 border-gray-200 dark:border-slate-800 text-gray-400 dark:text-slate-500 opacity-60";
              }
            }

            return (
              <button
                key={answer.id || aIdx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(answer)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-3 text-sm font-medium ${optionStyle} active:scale-[0.99]`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-warm-hover dark:bg-slate-800 text-warm-slate dark:text-slate-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-warm-border/60 dark:border-slate-700">
                    {String.fromCharCode(65 + aIdx)}
                  </span>
                  <span className="break-words leading-relaxed">{answer.content}</span>
                </div>

                {isAnswered && (
                  <div className="shrink-0 mt-0.5">
                    {answer.isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />}
                    {isSelected && !answer.isCorrect && <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 fill-rose-100 dark:fill-rose-950" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Banner: ANSWER FIRST -> EXPLANATION SECOND RULE */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 space-y-3"
          >
            {/* DÒNG 1: ĐÁP ÁN ĐÚNG ĐẦY ĐỦ (FIRST) */}
            <div className="p-3 rounded-xl bg-white/90 dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 text-xs font-bold text-emerald-950 dark:text-emerald-200">
              🎯 Đáp án chính xác: <span className="text-emerald-700 dark:text-emerald-300">{correctAnswer ? correctAnswer.content : 'Chưa có'}</span>
            </div>

            {/* DÒNG 2: GIẢI THÍCH CHI TIẾT (BELOW / SECOND) */}
            {currentQ.explanation && (
              <div className="leading-relaxed">
                <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1">💡 Giải thích chi tiết:</span>
                {currentQ.explanation}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Footer Navigation */}
      {isAnswered && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-warm-slate dark:bg-slate-800 hover:bg-slate-700 dark:hover:bg-slate-700 text-white font-semibold text-sm shadow-soft transition-all active:scale-95"
          >
            {currentIndex < questions.length - 1 ? 'Câu kế tiếp' : 'Xem kết quả'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
