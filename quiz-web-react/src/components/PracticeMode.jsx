import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCw, Star, CheckCircle, XCircle, Volume2, Award, Sparkles, HelpCircle } from 'lucide-react';
import { toggleStarQuestion, getStarredQuestions, saveQuizProgress, setQuizCardState, getQuestionTypeInfo } from '../data/quizDataLoader';

export default function PracticeMode({ quiz, onBack }) {
  const questions = quiz.questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerIds, setSelectedAnswerIds] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const [starredIds, setStarredIds] = useState(() => {
    return new Set(getStarredQuestions(quiz.id).map(s => s.questionId));
  });

  const currentQ = questions[currentIndex] || {};
  const isStarred = starredIds.has(currentQ.id);
  const typeInfo = getQuestionTypeInfo(currentQ);

  // Sync Starred State
  useEffect(() => {
    const checkStar = () => {
      setStarredIds(new Set(getStarredQuestions(quiz.id).map(s => s.questionId)));
    };
    window.addEventListener('quizzlet_star_updated', checkStar);
    return () => window.removeEventListener('quizzlet_star_updated', checkStar);
  }, [quiz.id]);

  const handleSelectOption = (answerId) => {
    if (isAnswered) return;

    if (typeInfo.isMultipleChoice) {
      setSelectedAnswerIds(prev => {
        const exists = prev.includes(answerId);
        return exists ? prev.filter(id => id !== answerId) : [...prev, answerId];
      });
    } else {
      const selected = [answerId];
      setSelectedAnswerIds(selected);
      evaluateAnswer(selected);
    }
  };

  const evaluateAnswer = (chosenIds) => {
    setIsAnswered(true);
    const chosenSet = new Set(chosenIds);
    const correctSet = new Set((currentQ.answers || []).filter(a => Boolean(a.isCorrect)).map(a => a.id));

    const isMatch = chosenSet.size === correctSet.size && [...correctSet].every(id => chosenSet.has(id));

    if (isMatch) {
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

  const handleConfirmMultipleChoice = () => {
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

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswerIds([]);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      window.speechSynthesis.speak(utterance);
    }
  };

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

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 shadow-soft max-w-sm mx-auto space-y-3">
          <div className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {score} / {questions.length}
          </div>
          <div className="text-xs font-bold text-warm-muted dark:text-slate-400">
            Tỷ lệ chính xác: {percentage}%
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-slate-800 border border-warm-border dark:border-slate-700 hover:bg-warm-hover font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 text-warm-text dark:text-slate-100"
          >
            <RotateCw className="w-4 h-4" /> Luyện tập lại
          </button>
          <button
            onClick={onBack}
            className="px-6 py-2.5 rounded-full bg-warm-slate dark:bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  const correctAnswersText = typeInfo.correctAnswers.map(ca => {
    const cIdx = (currentQ.answers || []).indexOf(ca);
    return cIdx >= 0 ? `${String.fromCharCode(65 + cIdx)}. ${ca.content}` : ca.content;
  }).join(' | ');

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-warm-text dark:text-slate-100">
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
          onClick={toggleStarQuestion.bind(null, currentQ.id, quiz.id, currentQ, currentIndex)}
          className="p-2 rounded-full bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-slate dark:text-slate-300 transition-transform active:scale-125"
          title="Lưu câu hỏi ⭐"
        >
          <Star className={`w-5 h-5 ${isStarred ? 'fill-amber-400 text-amber-500' : 'text-warm-muted dark:text-slate-500'}`} />
        </button>
      </div>

      <div className="w-full h-1.5 bg-warm-border/40 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-indigo-500 transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-warm-border dark:border-slate-800 shadow-soft space-y-6">
        <div className="flex items-start justify-between gap-4 border-b border-warm-border/40 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-md border border-amber-200/80 dark:border-amber-800">
                Câu #{currentIndex + 1}
              </span>
              {typeInfo.isMultipleChoice ? (
                <span className="text-xs font-bold text-purple-800 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 px-2.5 py-0.5 rounded-md border border-purple-300 dark:border-purple-800">
                  Multiple Choice (Chọn tất cả {typeInfo.correctCount} đáp án đúng)
                </span>
              ) : (
                <span className="text-xs font-bold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                  Single Choice
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed break-words whitespace-pre-wrap">
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

        <div className="space-y-3 pt-2">
          {(currentQ.answers || []).map((answer, aIdx) => {
            const isSelected = selectedAnswerIds.includes(answer.id);
            let btnStyle = 'bg-warm-bg/70 dark:bg-slate-800/60 border-warm-border dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:border-amber-400';

            if (isAnswered) {
              if (answer.isCorrect) {
                btnStyle = 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-bold';
              } else if (isSelected && !answer.isCorrect) {
                btnStyle = 'bg-rose-50 dark:bg-rose-950/80 border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-200 font-bold';
              } else {
                btnStyle = 'bg-warm-bg/40 dark:bg-slate-800/30 border-warm-border/40 dark:border-slate-800 opacity-60';
              }
            } else if (isSelected) {
              btnStyle = 'bg-purple-100 dark:bg-purple-950/80 border-purple-400 dark:border-purple-600 font-semibold shadow-xs';
            }

            return (
              <button
                key={answer.id || aIdx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(answer.id)}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all duration-200 flex items-start gap-3 leading-relaxed break-words whitespace-pre-wrap ${btnStyle}`}
              >
                {typeInfo.isMultipleChoice ? (
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                    isSelected ? 'bg-purple-600 text-white border-purple-700' : 'bg-warm-hover dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-warm-border/60'
                  }`}>
                    {isSelected ? '✓' : String.fromCharCode(65 + aIdx)}
                  </div>
                ) : (
                  <span className="font-extrabold shrink-0 mt-0.5">
                    {String.fromCharCode(65 + aIdx)}.
                  </span>
                )}
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

        {typeInfo.isMultipleChoice && !isAnswered && (
          <div className="pt-3 text-right">
            <button
              disabled={selectedAnswerIds.length === 0}
              onClick={handleConfirmMultipleChoice}
              className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 inline-flex items-center gap-2"
            >
              Kiểm Tra Đáp Án ({selectedAnswerIds.length} chọn) <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 pt-4 border-t border-warm-border/60 dark:border-slate-800"
            >
              <div className="p-4 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                  ✓ Đáp án đúng ({typeInfo.correctCount} đáp án):
                </span>
                <p className="font-extrabold text-emerald-950 dark:text-emerald-100 text-sm leading-relaxed">
                  {correctAnswersText || 'Chưa có đáp án'}
                </p>
              </div>

              {currentQ.explanation && (
                <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 leading-relaxed break-words whitespace-pre-wrap">
                  <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1">💡 Giải thích chi tiết:</span>
                  {currentQ.explanation}
                </div>
              )}

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
