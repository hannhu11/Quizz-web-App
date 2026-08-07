import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Layers, Play, CheckCircle2, Star, Volume2, BookOpen } from 'lucide-react';
import { toggleStarQuestion, getStarredQuestions, unstarQuizSet } from '../data/quizDataLoader';

export default function QuizDetailView({ quiz, onBack, onStartMode, onOpenTestSetup }) {
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL' | 'STARRED'
  const [starredIds, setStarredIds] = useState(() => {
    return new Set(getStarredQuestions().map(s => s.questionId));
  });

  // Listen to global star update event
  useEffect(() => {
    const checkStar = () => {
      setStarredIds(new Set(getStarredQuestions().map(s => s.questionId)));
    };
    window.addEventListener('quizzlet_star_updated', checkStar);
    return () => window.removeEventListener('quizzlet_star_updated', checkStar);
  }, []);

  const questions = quiz.questions || [];

  const handleToggleStar = (q, idx) => {
    toggleStarQuestion(q.id, quiz.id, q, idx);
  };

  const handleDeselectAllSet = () => {
    unstarQuizSet(quiz.id);
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const displayedQuestions = questions.filter(q => {
    if (filterMode === 'STARRED') {
      return starredIds.has(q.id);
    }
    return true;
  });

  const starredCountInSet = questions.filter(q => starredIds.has(q.id)).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 text-warm-text dark:text-slate-100">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-warm-slate dark:text-slate-300 hover:text-warm-text bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 px-4 py-2 rounded-full shadow-xs hover:shadow transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
        </button>

        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          {quiz.category} • {questions.length} câu hỏi
        </span>
      </div>

      {/* Hero Banner Section */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 border border-warm-border dark:border-slate-800 shadow-soft space-y-6">
        <div>
          <span className="text-xs font-bold text-warm-muted dark:text-slate-400">{quiz.subject}</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{quiz.title}</h1>
        </div>

        {/* 3 Main Action Triggers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Flashcard Button */}
          <button
            onClick={() => onStartMode('FLASHCARD')}
            className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800 font-bold text-sm shadow-xs transition-all active:scale-98 group"
          >
            <Layers className="w-5 h-5 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Lật Thẻ (Flashcards)</span>
          </button>

          {/* Practice Button */}
          <button
            onClick={() => onStartMode('PRACTICE')}
            className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-900 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 font-bold text-sm shadow-xs transition-all active:scale-98 group"
          >
            <Play className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>Luyện Tập Trắc Nghiệm</span>
          </button>

          {/* Setup Test Button */}
          <button
            onClick={onOpenTestSetup}
            className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-900 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 font-bold text-sm shadow-xs transition-all active:scale-98 group"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Thi Thử (Set up test)</span>
          </button>
        </div>
      </div>

      {/* Terms In This Set Section Header & Star Filter + Batch Unstar Button */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-warm-border/60 dark:border-slate-800 pb-3 flex-wrap gap-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-warm-slate dark:text-slate-400" />
            Terms in this set ({questions.length})
          </h3>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 text-xs font-semibold bg-warm-bg dark:bg-slate-800 p-1 rounded-xl border border-warm-border dark:border-slate-700">
              <button
                onClick={() => setFilterMode('ALL')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filterMode === 'ALL' ? 'bg-white dark:bg-slate-900 text-warm-text dark:text-slate-100 font-bold shadow-xs' : 'text-warm-muted dark:text-slate-400 hover:text-warm-text'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterMode('STARRED')}
                className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  filterMode === 'STARRED' ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-bold shadow-xs' : 'text-warm-muted dark:text-slate-400 hover:text-warm-text'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>★ {starredCountInSet}</span>
              </button>
            </div>

            {/* Batch Unstar Button (Deselect All N / Unstar these N) */}
            {starredCountInSet > 0 && (
              <button
                onClick={handleDeselectAllSet}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950 hover:bg-amber-100 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-xs font-bold shadow-xs transition-all active:scale-95"
                title="Bỏ gắn sao toàn bộ câu hỏi trong bộ đề này"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>Deselect all {starredCountInSet}</span>
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Clean Cards List (CLEAN QUIZLET STANDARD: TERM + DEFINITION ONLY) */}
        {displayedQuestions.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-warm-border dark:border-slate-800 text-warm-muted dark:text-slate-400">
            <Star className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-sm font-semibold">Chưa có câu hỏi nào trong mục này</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedQuestions.map((q, idx) => {
              const isStarred = starredIds.has(q.id);
              const correctAnswer = (q.answers || []).find(a => a.isCorrect);

              // Format answer letter if available
              let formattedAnswerText = correctAnswer ? correctAnswer.content : 'Chưa có đáp án';
              const answersList = q.answers || [];
              const correctIdx = answersList.findIndex(a => a.isCorrect);
              if (correctIdx >= 0 && answersList.length > 1 && correctAnswer) {
                formattedAnswerText = `${String.fromCharCode(65 + correctIdx)}. ${correctAnswer.content}`;
              }

              return (
                <motion.div
                  key={q.id || idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-warm-border dark:border-slate-800 shadow-xs hover:shadow-soft transition-all duration-200 text-warm-text dark:text-slate-100"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    {/* Left Column: Question / Term */}
                    <div className="space-y-3 pr-4 border-b md:border-b-0 md:border-r border-warm-border/40 dark:border-slate-800 pb-4 md:pb-0">
                      <div className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-md border border-amber-200/80 dark:border-amber-800 inline-block">
                        Câu {idx + 1}
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed break-words whitespace-pre-wrap">
                        {q.content}
                      </p>
                    </div>

                    {/* Right Column: Definition / Correct Answer & Actions */}
                    <div className="flex flex-col justify-between pl-0 md:pl-2 space-y-4">
                      <div>
                        <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 inline-block mb-2">
                          Đáp án đúng (Definition)
                        </span>
                        <p className="text-sm font-bold text-emerald-950 dark:text-emerald-200 leading-relaxed break-words whitespace-pre-wrap">
                          {formattedAnswerText}
                        </p>
                      </div>

                      {/* Action Icons (Star & Speech) */}
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-warm-border/40 dark:border-slate-800">
                        <button
                          onClick={() => handleSpeak(q.content)}
                          className="p-2 rounded-full hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-muted dark:text-slate-400 hover:text-warm-text transition-colors"
                          title="Đọc phát âm"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleToggleStar(q, idx)}
                          className="p-2 rounded-full hover:bg-warm-hover dark:hover:bg-slate-800 transition-transform active:scale-125"
                          title="Lưu câu hỏi ⭐"
                        >
                          <Star className={`w-5 h-5 ${isStarred ? 'fill-amber-400 text-amber-500' : 'text-warm-muted dark:text-slate-500'}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
