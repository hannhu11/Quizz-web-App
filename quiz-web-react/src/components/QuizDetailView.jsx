import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Layers, Play, CheckCircle2, Star, Volume2, BookOpen, MoreHorizontal, Edit, Trash2, Search, Sparkles } from 'lucide-react';
import { toggleStarQuestion, getStarredQuestions, unstarQuizSet, verifyQuizPassword, deleteCustomQuizSet, calculateQuizProgressStats, getCanonicalQuestionId } from '../data/quizDataLoader';
import PasswordModal from './PasswordModal';
import DiscussionDrawer from './discussion/DiscussionDrawer';
import { useAuth } from '../context/AuthContext';

function removeAccents(str) {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export default function QuizDetailView({ quiz, onBack, onStartMode, onOpenTestSetup, onEditQuiz, onDeleteQuiz, onOpenAuthModal }) {
  const { user } = useAuth();
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL' | 'STARRED'
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [passwordModalConfig, setPasswordModalConfig] = useState(null);
  const [visibleCount, setVisibleCount] = useState(25);

  const [starredIds, setStarredIds] = useState(() => {
    return new Set(getStarredQuestions(quiz.id).map(s => s.questionId));
  });

  const [srsStats, setSrsStats] = useState(() => calculateQuizProgressStats(quiz));
  const [commentCountsMap, setCommentCountsMap] = useState({});

  const menuRef = useRef(null);
  const questions = quiz.questions || [];

  // 1-Request Bulk Fetch for all question comment counts in this quiz set (0ms Latency, 1 HTTP Request)
  useEffect(() => {
    if (!quiz?.id) return;
    const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
      ? `${window.location.origin}/api`
      : 'http://localhost:8701/api';

    fetch(`${API_BASE_URL}/comments/counts/${quiz.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.counts) {
          setCommentCountsMap(data.counts);
        }
      })
      .catch(err => console.warn('Bulk comment counts fetch warning:', err));
  }, [quiz]);

  // Listen to SRS progress update event & star update event
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

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const starredCountInSet = useMemo(() => {
    return questions.filter(q => starredIds.has(q.id)).length;
  }, [questions, starredIds]);

  const filteredQuestions = useMemo(() => {
    let result = questions;
    if (filterMode === 'STARRED') {
      result = result.filter(q => starredIds.has(q.id));
    }
    if (searchQuery.trim()) {
      const qClean = removeAccents(searchQuery.toLowerCase().trim());
      result = result.filter(q => {
        const contentClean = removeAccents((q.content || '').toLowerCase());
        const answersClean = (q.answers || []).map(a => removeAccents((a.content || '').toLowerCase())).join(' ');
        const expClean = removeAccents((q.explanation || '').toLowerCase());
        return contentClean.includes(qClean) || answersClean.includes(qClean) || expClean.includes(qClean);
      });
    }
    return result;
  }, [questions, filterMode, searchQuery, starredIds]);

  // Progressive Lazy Loading: limit initial render to 25 questions for instant LCP & 60fps mobile scrolling
  const displayedQuestions = useMemo(() => {
    return filteredQuestions.slice(0, visibleCount);
  }, [filteredQuestions, visibleCount]);

  const handleToggleStar = (q, idx) => {
    const isStarred = starredIds.has(q.id);
    toggleStarQuestion(q.id, quiz.id, q, idx);
    const updated = new Set(starredIds);
    if (isStarred) {
      updated.delete(q.id);
    } else {
      updated.add(q.id);
    }
    setStarredIds(updated);
  };

  const handleDeselectAllSet = () => {
    if (window.confirm(`Bạn có chắc muốn bỏ gắn sao toàn bộ câu hỏi trong bộ đề "${quiz.title}"?`)) {
      unstarQuizSet(quiz.id);
      setStarredIds(new Set());
    }
  };

  const handlePasswordVerification = async (passwordInput) => {
    if (!passwordModalConfig) return;
    const { actionType } = passwordModalConfig;
    const isValid = await verifyQuizPassword(quiz.id, passwordInput);
    if (isValid) {
      if (actionType === 'EDIT') {
        onEditQuiz && onEditQuiz(quiz);
      } else if (actionType === 'DELETE') {
        await deleteCustomQuizSet(quiz.id, passwordInput);
        onDeleteQuiz && onDeleteQuiz(quiz.id);
      }
      setPasswordModalConfig(null);
    } else {
      alert('Mật khẩu không chính xác! Vui lòng nhập đúng mật khẩu bộ đề hoặc master key.');
    }
  };

  const handleSpeak = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <h2 className="sr-only">Chi tiết bộ đề và tiến độ học tập</h2>
      {/* Top Header & Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 px-4 py-2 rounded-full shadow-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Thoát bài thi</span>
        </button>

        {/* Edit / Delete Context Menu */}
        <div className="flex items-center gap-2">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              className="p-2 rounded-full bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 hover:bg-warm-hover dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all"
              title="Tùy chọn bộ đề"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-warm-border dark:border-slate-800 p-1.5 z-20 text-xs font-bold"
                >
                  <button
                    onClick={() => { setIsMenuOpen(false); setPasswordModalConfig({ isOpen: true, actionType: 'EDIT' }); }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-warm-hover dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors text-left"
                  >
                    <Edit className="w-4 h-4 text-indigo-500" />
                    <span>Chỉnh sửa bộ đề</span>
                  </button>

                  <button
                    onClick={() => { setIsMenuOpen(false); setPasswordModalConfig({ isOpen: true, actionType: 'DELETE' }); }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/60 text-rose-600 dark:text-rose-400 transition-colors text-left"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Xóa bộ đề</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 border border-warm-border dark:border-slate-800 shadow-soft space-y-6">
        <div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{quiz.subject}</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{quiz.title}</h1>
        </div>

        {/* 3 Main Action Triggers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Flashcard Button */}
          <button
            onClick={() => {
              if (!user) { onOpenAuthModal('LOGIN'); return; }
              onStartMode('FLASHCARD');
            }}
            className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800 font-bold text-sm shadow-xs transition-all active:scale-98 group"
          >
            <Layers className="w-5 h-5 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Lật Thẻ (Flashcards)</span>
          </button>

          {/* Practice Button */}
          <button
            onClick={() => {
              if (!user) { onOpenAuthModal('LOGIN'); return; }
              onStartMode('PRACTICE');
            }}
            className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-900 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 font-bold text-sm shadow-xs transition-all active:scale-98 group"
          >
            <Play className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>Luyện Tập Trắc Nghiệm</span>
          </button>

          {/* Setup Test Button */}
          <button
            onClick={() => {
              if (!user) { onOpenAuthModal('LOGIN'); return; }
              onOpenTestSetup();
            }}
            className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-900 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 font-bold text-sm shadow-xs transition-all active:scale-98 group"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Thi Thử (Set up test)</span>
          </button>
        </div>
      </div>

      {/* KNOWT-STYLE STUDYING PROGRESS BOX */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-warm-border dark:border-slate-800 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
            Tiến độ học tập (Studying Progress)
          </h2>
          <span className="px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold">
            {srsStats.percentage}%
          </span>
        </div>

        {/* 4 Category Progress Bars */}
        <div className="space-y-3">
          {/* 1. New cards (Thẻ mới) */}
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 text-xs">
            <div className="flex items-center gap-2.5 flex-1">
              <span className="w-3 h-3 rounded-full bg-rose-400 shrink-0" />
              <span className="font-bold text-rose-900 dark:text-rose-200">Thẻ mới (New cards)</span>
            </div>
            <span className="font-extrabold text-rose-900 dark:text-rose-200">{srsStats.newCount}</span>
            <button
              onClick={() => onStartMode('FLASHCARD')}
              className="px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold hover:bg-rose-100 dark:hover:bg-slate-700 transition-colors shadow-xs cursor-pointer"
            >
              Học
            </button>
          </div>

          {/* 2. Still learning (Đang học) */}
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-900/40 text-xs">
            <div className="flex items-center gap-2.5 flex-1">
              <span className="w-3 h-3 rounded-full bg-purple-400 shrink-0" />
              <span className="font-bold text-purple-900 dark:text-purple-200">Đang học (Still learning)</span>
            </div>
            <span className="font-extrabold text-purple-900 dark:text-purple-200">{srsStats.learningCount}</span>
            <button
              onClick={() => onStartMode('PRACTICE')}
              className="px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold hover:bg-purple-100 dark:hover:bg-slate-700 transition-colors shadow-xs cursor-pointer"
            >
              Học
            </button>
          </div>

          {/* 3. Almost done (Sắp thuộc) */}
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/60 dark:border-sky-900/40 text-xs">
            <div className="flex items-center gap-2.5 flex-1">
              <span className="w-3 h-3 rounded-full bg-sky-400 shrink-0" />
              <span className="font-bold text-sky-900 dark:text-sky-200">Sắp thuộc (Almost done)</span>
            </div>
            <span className="font-extrabold text-sky-900 dark:text-sky-200">{srsStats.almostCount}</span>
            <button
              onClick={() => onStartMode('PRACTICE')}
              className="px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold hover:bg-sky-100 dark:hover:bg-slate-700 transition-colors shadow-xs cursor-pointer"
            >
              Học
            </button>
          </div>

          {/* 4. Mastered (Đã thuộc) */}
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40 text-xs">
            <div className="flex items-center gap-2.5 flex-1">
              <span className="w-3 h-3 rounded-full bg-emerald-400 shrink-0" />
              <span className="font-bold text-emerald-900 dark:text-emerald-200">Đã thuộc (Mastered)</span>
            </div>
            <span className="font-extrabold text-emerald-900 dark:text-emerald-200">{srsStats.masteredCount}</span>
            <button
              onClick={() => onStartMode('FLASHCARD')}
              className="px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold hover:bg-emerald-100 dark:hover:bg-slate-700 transition-colors shadow-xs cursor-pointer"
            >
              Học
            </button>
          </div>
        </div>
      </div>

      {/* Terms In This Set Section Header with Search Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-warm-border/60 dark:border-slate-800 pb-3 flex-wrap gap-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-warm-slate dark:text-slate-300" />
            Danh sách thuật ngữ & câu hỏi ({questions.length})
          </h2>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Bar for Terms & Definitions */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
              <input
                id="quiz-terms-search-input"
                name="quizTermsSearch"
                type="text"
                placeholder="Tìm thuật ngữ, câu hỏi, đáp án..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-full bg-white dark:bg-slate-800 border border-warm-border dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 w-48 sm:w-64"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 text-xs font-semibold bg-warm-bg dark:bg-slate-800 p-1 rounded-xl border border-warm-border dark:border-slate-700">
              <button
                onClick={() => setFilterMode('ALL')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filterMode === 'ALL' ? 'bg-white dark:bg-slate-900 text-warm-text dark:text-slate-100 font-bold shadow-xs' : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Tất cả ({questions.length})
              </button>
              <button
                onClick={() => setFilterMode('STARRED')}
                className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  filterMode === 'STARRED' ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-bold shadow-xs' : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>Đã gắn sao ({starredCountInSet})</span>
              </button>
            </div>

            {/* Batch Unstar Button */}
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

        {/* 2-Column Full Cards List (WITH OPTIONS & EXPLANATION) */}
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-warm-border dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <Star className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-sm font-semibold">Không tìm thấy câu hỏi phù hợp</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedQuestions.map((q, idx) => {
              const isStarred = starredIds.has(q.id);
              const originalIndexDisplay = q.questionIndex !== undefined ? q.questionIndex + 1 : idx + 1;
              const correctAnswers = (q.answers || []).filter(a => a.isCorrect);
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
                <motion.div
                  key={q.id || idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-warm-border dark:border-slate-800 shadow-xs hover:shadow-soft transition-all duration-200 text-warm-text dark:text-slate-100"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    {/* Left Column: Question / Term & Full Options List (A, B, C, D) */}
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

                      {/* Full Options List (A, B, C, D) */}
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

                    {/* Right Column: Correct Answer & Explanation */}
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

                        {/* Academic Insight Explanation Box */}
                        {q.explanation && (
                          <div className="mt-3 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/80 p-3.5 border-l-4 border-l-indigo-500 dark:border-slate-800 dark:bg-slate-900/50 dark:border-l-indigo-400 shadow-xs transition-all">
                            <div className="flex items-center gap-1.5 mb-1.5 text-indigo-700 dark:text-indigo-300">
                              <Sparkles className="w-3.5 h-3.5 stroke-[1.75]" />
                              <span className="text-[11px] font-extrabold uppercase tracking-wider">
                                Phân Tích Học Thuật
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-normal break-words whitespace-pre-wrap">
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Action Icons (Star & Speech) */}
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-warm-border/40 dark:border-slate-800">
                        <button
                          onClick={() => handleSpeak(q.content)}
                          className="p-2 rounded-full hover:bg-warm-hover dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 transition-colors"
                          title="Đọc phát âm"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleToggleStar(q, originalIndexDisplay - 1)}
                          className="p-2 rounded-full hover:bg-warm-hover dark:hover:bg-slate-800 transition-transform active:scale-125 cursor-pointer"
                          title="Lưu câu hỏi ⭐"
                        >
                          <Star className={`w-5 h-5 ${isStarred ? 'fill-amber-400 text-amber-500' : 'text-slate-400 dark:text-slate-500'}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Academic Discussion Drawer */}
                  <DiscussionDrawer
                    quizId={quiz.id}
                    questionId={getCanonicalQuestionId(quiz.id, q, originalIndexDisplay - 1)}
                    initialCount={commentCountsMap[getCanonicalQuestionId(quiz.id, q, originalIndexDisplay - 1)] || 0}
                    onOpenAuthModal={onOpenAuthModal}
                  />
                </motion.div>
              );
            })}

            {/* Progressive Loading Controls for Mobile & Desktop Performance */}
            {visibleCount < filteredQuestions.length && (
              <div className="flex items-center justify-center gap-3 pt-6 pb-2 flex-wrap">
                <button
                  onClick={() => setVisibleCount(prev => Math.min(prev + 25, filteredQuestions.length))}
                  className="px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-extrabold text-xs transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  Tải thêm +25 câu (Đang xem {displayedQuestions.length}/{filteredQuestions.length})
                </button>
                <button
                  onClick={() => setVisibleCount(filteredQuestions.length)}
                  className="px-6 py-3 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white font-extrabold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Xem toàn bộ ({filteredQuestions.length} câu)
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Password Modal Verification */}
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
