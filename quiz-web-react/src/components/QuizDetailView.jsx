import React, { useState, useEffect, useRef, useMemo, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Sparkles, BookOpen, Star, RotateCcw, Search, Volume2, Trophy, MoreVertical, Lock, Key, Trash2, Edit3, ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';
import { toggleStarQuestion, getStarredQuestions, unstarQuizSet, verifyQuizPassword, deleteCustomQuizSet, calculateQuizProgressStats } from '../data/quizDataLoader';
import PasswordModal from './PasswordModal';

function removeAccents(str) {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

const QuestionCard = React.memo(({ q, idx, isStarred, onToggleStar, onSpeak }) => {
  const originalIndexDisplay = q.questionIndex !== undefined ? q.questionIndex + 1 : idx + 1;
  const correctAnswers = (q.answers || []).filter(a => Boolean(a.isCorrect));
  let formattedAnswerText = 'Chưa có đáp án';
  if (correctAnswers.length > 1) {
    formattedAnswerText = correctAnswers.map(ca => {
      const cIdx = (q.answers || []).indexOf(ca);
      return cIdx >= 0 ? `${String.fromCharCode(65 + cIdx)}. ${ca.content}` : ca.content;
    }).join('\n');
  } else if (correctAnswers.length === 1) {
    const ca = correctAnswers[0];
    const cIdx = (q.answers || []).indexOf(ca);
    formattedAnswerText = cIdx >= 0 && (q.answers || []).length > 1
      ? `${String.fromCharCode(65 + cIdx)}. ${ca.content}`
      : ca.content;
  }

  return (
    <div className="question-card-item quiz-question-card bg-white dark:bg-slate-900 rounded-3xl p-6 border border-warm-border dark:border-slate-800 shadow-xs hover:shadow-soft transition-all duration-200 text-warm-text dark:text-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        <div className="space-y-3 pr-4 border-b md:border-b-0 md:border-r border-warm-border/40 dark:border-slate-800 pb-4 md:pb-0">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-md border border-amber-200/80 dark:border-amber-800 inline-block">
              Câu #{originalIndexDisplay}
            </div>
            {correctAnswers.length > 1 && (
              <div className="text-xs font-bold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-200 dark:border-purple-800 inline-block">
                Multiple Choice ({correctAnswers.length} đáp án đúng)
              </div>
            )}
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed break-words whitespace-pre-wrap">
            {q.content}
          </p>

          {(q.answers || []).length > 0 && (
            <div className="space-y-1.5 pt-2">
              {q.answers.map((a, aIdx) => (
                <div
                  key={aIdx}
                  className={`text-xs px-3 py-2 rounded-xl border leading-relaxed break-words whitespace-pre-wrap ${
                    a.isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800 font-semibold'
                      : 'bg-warm-bg dark:bg-slate-800/60 text-warm-text dark:text-slate-300 border-warm-border/60 dark:border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-1.5">{String.fromCharCode(65 + aIdx)}.</span>
                  {a.content}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between pl-0 md:pl-2 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 inline-block">
                Đáp án đúng (Definition)
              </span>
              {correctAnswers.length > 1 && (
                <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-700 inline-block">
                  Gồm {correctAnswers.length} đáp án đúng
                </span>
              )}
            </div>
            <p className="text-sm font-bold text-emerald-950 dark:text-emerald-200 leading-relaxed break-words whitespace-pre-wrap">
              {formattedAnswerText}
            </p>

            {q.explanation && (
              <div className="mt-3 p-3 rounded-2xl bg-amber-50/90 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 leading-relaxed break-words whitespace-pre-wrap">
                <span className="font-bold text-amber-900 dark:text-amber-300 block mb-0.5">💡 Giải thích chi tiết:</span>
                {q.explanation}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-warm-border/40 dark:border-slate-800">
            <button
              onClick={() => onSpeak(q.content)}
              className="p-2 rounded-full hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-muted dark:text-slate-400 hover:text-warm-text transition-colors"
              title="Đọc phát âm"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => onToggleStar(q, originalIndexDisplay - 1)}
              className="p-2 rounded-full hover:bg-warm-hover dark:hover:bg-slate-800 transition-transform active:scale-125"
              title="Lưu câu hỏi ⭐"
            >
              <Star className={`w-5 h-5 ${isStarred ? 'fill-amber-400 text-amber-500' : 'text-warm-muted dark:text-slate-500'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}, (prev, next) => {
  return (
    prev.isStarred === next.isStarred &&
    prev.idx === next.idx &&
    prev.q.id === next.q.id &&
    prev.q.explanation === next.q.explanation
  );
});

export default function QuizDetailView({ quiz, onBack, onStartMode, onOpenTestSetup, onEditQuiz, onDeleteQuiz }) {
  const [filterMode, setFilterMode] = useState('ALL');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [passwordModalConfig, setPasswordModalConfig] = useState(null);

  const [starredIds, setStarredIds] = useState(() => {
    return new Set(getStarredQuestions(quiz.id).map(s => s.questionId));
  });

  const [srsStats, setSrsStats] = useState(() => calculateQuizProgressStats(quiz));
  const menuRef = useRef(null);
  const questions = quiz.questions || [];

  useEffect(() => {
    const refreshData = () => {
      setStarredIds(new Set(getStarredQuestions(quiz.id).map(s => s.questionId)));
      setSrsStats(calculateQuizProgressStats(quiz));
    };

    refreshData();
    window.addEventListener('quizzlet_star_updated', refreshData);
    window.addEventListener('quizzlet_srs_updated', refreshData);
    return () => {
      window.removeEventListener('quizzlet_star_updated', refreshData);
      window.removeEventListener('quizzlet_srs_updated', refreshData);
    };
  }, [quiz]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handlePasswordVerification = async (password) => {
    const isValid = await verifyQuizPassword(quiz.id, password);
    if (!isValid) return false;

    if (passwordModalConfig?.actionType === 'EDIT') {
      onEditQuiz(quiz, password);
    } else if (passwordModalConfig?.actionType === 'DELETE') {
      await deleteCustomQuizSet(quiz.id, password);
      onDeleteQuiz(quiz.id);
    }
    return true;
  };

  const handleSearchInputChange = (e) => {
    const val = e.target.value;
    setSearchInput(val);
    startTransition(() => {
      setSearchQuery(val);
    });
  };

  const filteredQuestions = useMemo(() => {
    let result = questions;
    if (filterMode === 'STARRED') {
      result = result.filter(q => starredIds.has(q.id));
    }

    if (!searchQuery.trim()) return result;

    const normalizedQuery = removeAccents(searchQuery.toLowerCase());
    return result.filter(q => {
      const contentMatch = removeAccents((q.content || '').toLowerCase()).includes(normalizedQuery);
      const explanationMatch = removeAccents((q.explanation || '').toLowerCase()).includes(normalizedQuery);
      const answerMatch = (q.answers || []).some(a => removeAccents((a.content || '').toLowerCase()).includes(normalizedQuery));
      return contentMatch || explanationMatch || answerMatch;
    });
  }, [questions, filterMode, starredIds, searchQuery]);

  const starredCountInSet = questions.filter(q => starredIds.has(q.id)).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 text-warm-text dark:text-slate-100">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-warm-slate dark:text-slate-300 hover:text-warm-text bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 px-4 py-2 rounded-full shadow-xs hover:shadow transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
        </button>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            {quiz.category} • {questions.length} câu hỏi
          </span>

          <div ref={menuRef} className="relative">
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              className="p-2 rounded-full bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-slate dark:text-slate-300 hover:text-warm-text shadow-xs transition-all active:scale-95"
              title="Tùy chọn bộ đề"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl border border-warm-border dark:border-slate-800 shadow-lg py-2 z-50 text-xs font-semibold"
                >
                  <button
                    onClick={() => { setIsMenuOpen(false); setPasswordModalConfig({ isOpen: true, actionType: 'EDIT' }); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-warm-hover dark:hover:bg-slate-800 flex items-center gap-2 text-slate-800 dark:text-slate-200"
                  >
                    <Edit3 className="w-4 h-4 text-warm-slate dark:text-slate-300" /> Chỉnh sửa bộ đề
                  </button>

                  <button
                    onClick={() => { setIsMenuOpen(false); setPasswordModalConfig({ isOpen: true, actionType: 'DELETE' }); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center gap-2 text-rose-600 dark:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4 text-rose-500" /> Xóa bộ đề
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-warm-border dark:border-slate-800 shadow-soft space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 leading-tight">
            {quiz.title}
          </h1>
          {quiz.description && (
            <p className="text-xs sm:text-sm text-warm-muted dark:text-slate-400 mt-2 leading-relaxed">
              {quiz.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <button
            onClick={() => onStartMode('FLASHCARD')}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/80 transition-all active:scale-95 group text-amber-900 dark:text-amber-300"
          >
            <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">Thẻ ghi nhớ</span>
          </button>

          <button
            onClick={() => onStartMode('PRACTICE')}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 transition-all active:scale-95 group text-emerald-900 dark:text-emerald-300"
          >
            <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">Học ôn luyện</span>
          </button>

          <button
            onClick={() => onStartMode('EXAM')}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/80 transition-all active:scale-95 group text-blue-900 dark:text-blue-300"
          >
            <Play className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">Thi thử</span>
          </button>

          <button
            onClick={() => onOpenTestSetup(quiz)}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/80 transition-all active:scale-95 group text-purple-900 dark:text-purple-300"
          >
            <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">Cấu hình bài thi</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-muted dark:text-slate-500" />
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Tìm kiếm câu hỏi, đáp án, hoặc nội dung giải thích..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 text-xs sm:text-sm text-warm-text dark:text-slate-100 placeholder-warm-muted dark:placeholder-slate-500 focus:outline-none focus:border-amber-400 dark:focus:border-slate-700 shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                filterMode === 'ALL'
                  ? 'bg-warm-slate dark:bg-slate-800 text-white border-warm-slate dark:border-slate-700 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-warm-muted dark:text-slate-400 border-warm-border dark:border-slate-800 hover:bg-warm-hover'
              }`}
            >
              Tất cả ({questions.length})
            </button>

            <button
              onClick={() => setFilterMode('STARRED')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                filterMode === 'STARRED'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-warm-muted dark:text-slate-400 border-warm-border dark:border-slate-800 hover:bg-warm-hover'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>Đã gắn sao ({starredCountInSet})</span>
            </button>

            {starredCountInSet > 0 && (
              <button
                onClick={handleDeselectAllSet}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950 hover:bg-amber-100 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-xs font-bold shadow-xs transition-all active:scale-95"
                title="Bỏ gắn sao toàn bộ câu hỏi trong bộ đề này"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>Bỏ gắn sao {starredCountInSet} câu này</span>
              </button>
            )}
          </div>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-warm-border dark:border-slate-800 text-warm-muted dark:text-slate-400">
            <Star className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-sm font-semibold">Không tìm thấy câu hỏi phù hợp</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => {
              const isStarred = starredIds.has(q.id);
              return (
                <QuestionCard
                  key={q.id || idx}
                  q={q}
                  idx={idx}
                  isStarred={isStarred}
                  onToggleStar={handleToggleStar}
                  onSpeak={handleSpeak}
                />
              );
            })}
          </div>
        )}
      </div>

      <PasswordModal
        isOpen={Boolean(passwordModalConfig?.isOpen)}
        onClose={() => setPasswordModalConfig(null)}
        actionType={passwordModalConfig?.actionType || 'DELETE'}
        quizTitle={quiz.title}
        onConfirm={handlePasswordVerification}
      />
    </div>
  );
}
