import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Layers, Play, CheckCircle2, Star, Volume2, Sparkles, BookOpen } from 'lucide-react';
import { toggleStarQuestion, getStarredQuestions } from '../data/quizDataLoader';

export default function QuizDetailView({ quiz, onBack, onStartMode, onOpenTestSetup }) {
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL' | 'STARRED'
  const [starredIds, setStarredIds] = useState(() => {
    return new Set(getStarredQuestions().map(s => s.questionId));
  });

  const questions = quiz.questions || [];

  const handleToggleStar = (q) => {
    const updated = toggleStarQuestion(q.id, quiz.id, q);
    setStarredIds(new Set(updated.map(s => s.questionId)));
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
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 text-warm-text">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-warm-slate hover:text-warm-text bg-white border border-warm-border px-4 py-2 rounded-full shadow-xs hover:shadow transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
        </button>

        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
          {quiz.category} • {questions.length} câu hỏi
        </span>
      </div>

      {/* Hero Banner Section */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-warm-border shadow-soft space-y-6">
        <div>
          <span className="text-xs font-bold text-warm-muted">{quiz.subject}</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{quiz.title}</h1>
        </div>

        {/* 3 Main Action Triggers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Flashcard Button */}
          <button
            onClick={() => onStartMode('FLASHCARD')}
            className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-sm shadow-xs transition-all active:scale-98 group"
          >
            <Layers className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
            <span>Lật Thẻ (Flashcards)</span>
          </button>

          {/* Practice Button */}
          <button
            onClick={() => onStartMode('PRACTICE')}
            className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-bold text-sm shadow-xs transition-all active:scale-98 group"
          >
            <Play className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
            <span>Luyện Tập Trắc Nghiệm</span>
          </button>

          {/* Setup Test Button */}
          <button
            onClick={onOpenTestSetup}
            className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold text-sm shadow-xs transition-all active:scale-98 group"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
            <span>Thi Thử (Set up test)</span>
          </button>
        </div>
      </div>

      {/* Terms In This Set Section Header & Star Filter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-warm-border/60 pb-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-warm-slate" />
            Terms in this set ({questions.length})
          </h3>

          {/* Starred filter toggle tab */}
          <div className="flex items-center gap-1 text-xs font-semibold bg-warm-bg p-1 rounded-xl border border-warm-border">
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterMode === 'ALL' ? 'bg-white text-warm-text font-bold shadow-xs' : 'text-warm-muted hover:text-warm-text'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterMode('STARRED')}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                filterMode === 'STARRED' ? 'bg-amber-100 text-amber-900 font-bold shadow-xs' : 'text-warm-muted hover:text-warm-text'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>★ {starredCountInSet}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Cards List */}
        {displayedQuestions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-warm-border text-warm-muted">
            <Star className="w-8 h-8 text-amber-300 mx-auto mb-2" />
            <p className="text-sm font-semibold">Chưa có câu hỏi nào trong mục này</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedQuestions.map((q, idx) => {
              const isStarred = starredIds.has(q.id);
              const correctAnswer = (q.answers || []).find(a => a.isCorrect);

              return (
                <motion.div
                  key={q.id || idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-6 border border-warm-border shadow-xs hover:shadow-soft transition-all duration-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    {/* Left Column: Question & Options */}
                    <div className="space-y-3 pr-4 border-b md:border-b-0 md:border-r border-warm-border/40 pb-4 md:pb-0">
                      <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/80 inline-block">
                        Câu {idx + 1}
                      </div>
                      <p className="text-sm font-semibold text-slate-900 leading-relaxed break-words">
                        {q.content}
                      </p>

                      {/* Render option list if present */}
                      {(q.answers || []).length > 0 && (
                        <div className="space-y-1.5 pt-2">
                          {q.answers.map((a, aIdx) => (
                            <div
                              key={aIdx}
                              className={`text-xs px-3 py-1.5 rounded-xl border ${
                                a.isCorrect ? 'bg-emerald-50 text-emerald-950 border-emerald-200 font-semibold' : 'bg-warm-bg text-warm-muted border-warm-border/60'
                              }`}
                            >
                              <span className="font-bold mr-1.5">{String.fromCharCode(65 + aIdx)}.</span>
                              {a.content}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right Column: Correct Answer & Actions */}
                    <div className="flex flex-col justify-between pl-0 md:pl-2 space-y-4">
                      <div>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mb-2">
                          Đáp án đúng
                        </span>
                        <p className="text-sm font-bold text-emerald-950 leading-relaxed break-words">
                          {correctAnswer ? correctAnswer.content : 'Chưa có đáp án'}
                        </p>
                        {q.explanation && (
                          <p className="text-xs text-warm-muted mt-2 italic bg-warm-hover/60 p-2.5 rounded-xl border border-warm-border">
                            💡 {q.explanation}
                          </p>
                        )}
                      </div>

                      {/* Action Icons (Star & Speech) */}
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-warm-border/40">
                        <button
                          onClick={() => handleSpeak(q.content)}
                          className="p-2 rounded-full hover:bg-warm-hover text-warm-muted hover:text-warm-text transition-colors"
                          title="Đọc phát âm"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleToggleStar(q)}
                          className="p-2 rounded-full hover:bg-warm-hover transition-transform active:scale-125"
                          title="Lưu câu hỏi ⭐"
                        >
                          <Star className={`w-5 h-5 ${isStarred ? 'fill-amber-400 text-amber-500' : 'text-warm-muted'}`} />
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
