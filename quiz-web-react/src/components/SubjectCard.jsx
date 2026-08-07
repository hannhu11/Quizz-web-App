import React from 'react';
import { Layers, Play, CheckCircle2, Trophy, BookOpen, Award, Sparkles, Flame, FileText, GraduationCap, UserCheck, Bookmark, Briefcase, Smartphone, Code, Building2, Rocket } from 'lucide-react';

const ICON_MAP = {
  BookOpen, Award, Sparkles, Flame, FileText, GraduationCap, UserCheck, Bookmark, Briefcase, Smartphone, Code, CheckCircle2, Building2, Layers, Rocket
};

export default function SubjectCard({ quiz, progress, onSelectMode }) {
  const IconComponent = ICON_MAP[quiz.icon] || BookOpen;
  const quizProgress = progress[quiz.id] || { attempts: 0, bestScore: 0 };

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-warm-border dark:border-slate-800 shadow-soft hover:shadow-xl transition-all duration-300 ease-out transform hover:-translate-y-2 hover:border-amber-300/80 dark:hover:border-slate-700 flex flex-col justify-between overflow-hidden cursor-pointer">
      {/* Top Accent Line */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${quiz.color || 'from-amber-200 to-indigo-200'}`} />

      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-warm-hover dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-warm-border/60 dark:border-slate-700">
            {quiz.category}
          </span>

          {quizProgress.bestScore > 0 && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
              <Trophy className="w-3 h-3 text-amber-500" />
              {quizProgress.bestScore}% Best
            </span>
          )}
        </div>

        {/* Title & Subject */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
          {quiz.title}
        </h3>
        <p className="text-xs text-warm-muted dark:text-slate-400 mt-1 flex items-center gap-1">
          <IconComponent className="w-3.5 h-3.5 text-warm-slate dark:text-slate-400" />
          {quiz.subject}
        </p>
      </div>

      {/* Mode Buttons Row */}
      <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-warm-border/40 dark:border-slate-800">
        <button
          onClick={(e) => { e.stopPropagation(); onSelectMode(quiz.id, 'FLASHCARD'); }}
          className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800 text-[11px] font-bold transition-all active:scale-95 gap-1 shadow-xs"
          title="Lật thẻ ghi nhớ"
        >
          <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Lật Thẻ</span>
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onSelectMode(quiz.id, 'PRACTICE'); }}
          className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-900 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 text-[11px] font-bold transition-all active:scale-95 gap-1 shadow-xs"
          title="Luyện tập trắc nghiệm"
        >
          <Play className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Luyện Tập</span>
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onSelectMode(quiz.id, 'EXAM'); }}
          className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-900 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 text-[11px] font-bold transition-all active:scale-95 gap-1 shadow-xs"
          title="Thi thử"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Thi Thử</span>
        </button>
      </div>
    </div>
  );
}
