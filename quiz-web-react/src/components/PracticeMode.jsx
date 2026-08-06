import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, HelpCircle, Star, ArrowRight, RotateCcw, Trophy, Award } from 'lucide-react';
import { toggleStarQuestion, getStarredQuestions, saveQuizProgress } from '../data/quizDataLoader';
import confetti from 'canvas-confetti';

export default function PracticeMode({ quiz, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionIndex: answerId }
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = quiz.questions || [];
  const currentQ = questions[currentIndex] || {};
  const currentSelected = selectedAnswers[currentIndex];
  const isAnswered = currentSelected !== undefined;

  const handleSelectOption = (answer) => {
    if (isAnswered) return; // Lock option once selected

    const isCorrect = answer.isCorrect;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: answer.id }));
    setShowExplanation(true);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed practice
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
    setShowExplanation(false);
  };

  if (isCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 border border-warm-border shadow-soft-lg space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center border border-amber-200">
            <Trophy className="w-8 h-8 fill-amber-400 text-amber-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-warm-text">Hoàn Thành Luyện Tập!</h2>
            <p className="text-sm text-warm-muted mt-1">{quiz.title}</p>
          </div>

          <div className="p-6 rounded-2xl bg-warm-bg border border-warm-border inline-block min-w-[240px]">
            <div className="text-4xl font-extrabold text-warm-slate">{score} / {questions.length}</div>
            <div className="text-xs font-semibold text-emerald-600 mt-1">Đạt {percentage}% tổng điểm</div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-warm-border/60">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-warm-border hover:bg-warm-hover font-semibold text-sm shadow-sm transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4 text-warm-slate" /> Luyện lại
            </button>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-warm-slate hover:bg-slate-700 text-white font-semibold text-sm shadow-sm transition-all active:scale-95"
            >
              Quay lại danh sách
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-warm-slate hover:text-warm-text bg-white border border-warm-border px-4 py-2 rounded-full shadow-sm hover:shadow transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Đúng: {score}
          </span>
          <span className="text-xs font-bold text-warm-muted px-3 py-1 bg-warm-hover rounded-full border border-warm-border/60">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-warm-border/40 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-warm-slate transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-warm-border shadow-soft mb-6">
        <div className="flex items-center justify-between text-xs font-bold text-warm-muted mb-4">
          <span className="text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
            Câu {currentIndex + 1}
          </span>
          <span className="text-warm-muted">{quiz.subject}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-warm-text leading-relaxed mb-6">
          {currentQ.content}
        </h3>

        {/* Options List */}
        <div className="space-y-3">
          {(currentQ.answers || []).map((answer, aIdx) => {
            const isSelected = currentSelected === answer.id;
            let optionStyle = "bg-white border-warm-border text-warm-text hover:bg-warm-hover hover:border-warm-slate/40";

            if (isAnswered) {
              if (answer.isCorrect) {
                optionStyle = "bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold shadow-sm";
              } else if (isSelected && !answer.isCorrect) {
                optionStyle = "bg-rose-50 border-rose-400 text-rose-950 font-semibold";
              } else {
                optionStyle = "bg-gray-50/60 border-gray-200 text-gray-400 opacity-60";
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
                  <span className="w-6 h-6 rounded-full bg-warm-hover text-warm-slate flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-warm-border/60">
                    {String.fromCharCode(65 + aIdx)}
                  </span>
                  <span>{answer.content}</span>
                </div>

                {isAnswered && (
                  <div className="shrink-0 mt-0.5">
                    {answer.isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />}
                    {isSelected && !answer.isCorrect && <XCircle className="w-5 h-5 text-rose-600 fill-rose-100" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Banner */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 space-y-1.5"
          >
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <HelpCircle className="w-4 h-4 text-amber-600" /> Giải thích & Đáp án
            </div>
            <p className="leading-relaxed">{currentQ.explanation || 'Đáp án chính xác được đánh dấu màu xanh lá lá.'}</p>
          </motion.div>
        )}
      </div>

      {/* Footer Navigation */}
      {isAnswered && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-warm-slate hover:bg-slate-700 text-white font-semibold text-sm shadow-soft transition-all active:scale-95"
          >
            {currentIndex < questions.length - 1 ? 'Câu kế tiếp' : 'Xem kết quả'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
