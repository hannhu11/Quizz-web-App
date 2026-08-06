import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Layers, CheckCircle2, Play, Trophy, Sparkles } from 'lucide-react';

export default function SubjectCard({ quiz, progress, onSelectMode }) {
  const quizProgress = progress[quiz.id] || { attempts: 0, bestScore: 0 };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative rounded-3xl bg-white p-5 border border-warm-border shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Banner Gradient Decoration */}
      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${quiz.color}`} />

      <div>
        {/* Category Badge & Progress */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-warm-hover text-warm-slate border border-warm-border/60">
            {quiz.category}
          </span>
          {quizProgress.bestScore > 0 && (
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
              <Trophy className="w-3 h-3 text-amber-500 fill-amber-400" />
              <span>{quizProgress.bestScore}% Best</span>
            </div>
          )}
        </div>

        {/* Title & Subject */}
        <h3 className="text-base font-bold text-warm-text group-hover:text-warm-slate transition-colors line-clamp-2 mb-1">
          {quiz.title}
        </h3>
        <p className="text-xs text-warm-muted mb-4 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          {quiz.subject}
        </p>
      </div>

      {/* Action Buttons & Modes */}
      <div className="pt-4 border-t border-warm-border/40 space-y-2">
        <div className="grid grid-cols-3 gap-2">
          {/* Flashcard Mode */}
          <button
            onClick={() => onSelectMode(quiz.id, 'FLASHCARD')}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-amber-50/70 hover:bg-amber-100/80 text-amber-900 border border-amber-200/60 transition-all active:scale-95 text-xs font-semibold group/btn"
          >
            <Layers className="w-4 h-4 mb-1 text-amber-600 group-hover/btn:scale-110 transition-transform" />
            <span>Lật Thẻ</span>
          </button>

          {/* Practice Mode */}
          <button
            onClick={() => onSelectMode(quiz.id, 'PRACTICE')}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-indigo-50/70 hover:bg-indigo-100/80 text-indigo-900 border border-indigo-200/60 transition-all active:scale-95 text-xs font-semibold group/btn"
          >
            <Play className="w-4 h-4 mb-1 text-indigo-600 group-hover/btn:scale-110 transition-transform" />
            <span>Luyện Tập</span>
          </button>

          {/* Exam Mode */}
          <button
            onClick={() => onSelectMode(quiz.id, 'EXAM')}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-200/60 transition-all active:scale-95 text-xs font-semibold group/btn"
          >
            <CheckCircle2 className="w-4 h-4 mb-1 text-emerald-600 group-hover/btn:scale-110 transition-transform" />
            <span>Thi Thử</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
