import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowLeft, CheckCircle2, XCircle, AlertCircle, Trophy, RotateCcw, ShieldCheck, Star, Check, X, Sparkles, Keyboard, BarChart2 } from 'lucide-react';
import { saveQuizProgress, getStarredQuestions, toggleStarQuestion } from '../data/quizDataLoader';
import confetti from 'canvas-confetti';

export default function ExamMode({ quiz, testConfig, onBack }) {
  // Extract configuration or defaults
  const config = testConfig || {};
  const timerConfig = config.timer || { enabled: false, mode: 'countdown', minutes: 20 };

  // Prepare questions pool (filter starred if requested)
  let initialQuestionsPool = quiz.questions || [];
  if (config.studyStarredOnly) {
    const starredIds = new Set(getStarredQuestions(quiz.id).map(s => s.questionId));
    initialQuestionsPool = initialQuestionsPool.filter(q => starredIds.has(q.id));
    if (initialQuestionsPool.length === 0) {
      initialQuestionsPool = quiz.questions || []; // fallback if no starred questions exist
    }
  }

  // Shuffle and slice requested question count
  const targetCount = Math.min(config.questionCount || 20, initialQuestionsPool.length);
  const [questions] = useState(() => {
    return [...initialQuestionsPool].sort(() => Math.random() - 0.5).slice(0, targetCount);
  });

  const [userAnswers, setUserAnswers] = useState({}); // { qIndex: answerId }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Track starred items on result screen
  const [starredIds, setStarredIds] = useState(() => {
    return new Set(getStarredQuestions(quiz.id).map(s => s.questionId));
  });

  // Listen to global star update event
  useEffect(() => {
    const checkStar = () => {
      setStarredIds(new Set(getStarredQuestions(quiz.id).map(s => s.questionId)));
    };
    window.addEventListener('quizzlet_star_updated', checkStar);
    return () => window.removeEventListener('quizzlet_star_updated', checkStar);
  }, [quiz.id]);

  // Timer states
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState((timerConfig.minutes || 20) * 60);

  // Modal Dialog states
  const [showExitModal, setShowExitModal] = useState(false);
  const [unansweredWarning, setUnansweredWarning] = useState(null);
  const [showGridModal, setShowGridModal] = useState(false);
  const [showHotkeyModal, setShowHotkeyModal] = useState(false);

  const questionRef = useRef(null);

  const handleToggleStar = (q, idx) => {
    if (!q || !q.id) return;
    toggleStarQuestion(q.id, quiz.id, q, idx);
  };

  // Keyboard Navigation in ExamMode (Knowt / Quizlet Style)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      const isInput = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.isContentEditable
      );
      if (isInput || isSubmitted) return;

      const key = e.key;

      // 1. Hotkey Help Overlay (?)
      if (key === '?' || (key === '/' && e.shiftKey)) {
        e.preventDefault();
        setShowHotkeyModal(prev => !prev);
        return;
      }

      // 2. Quick Question Grid Toggle (G or Tab)
      if (key === 'g' || key === 'G' || key === 'Tab') {
        e.preventDefault();
        setShowGridModal(prev => !prev);
        return;
      }

      // 3. Star Toggle (S or *)
      if (key === 's' || key === 'S' || key === '*') {
        e.preventDefault();
        const currentQ = questions[currentIndex];
        if (currentQ) {
          handleToggleStar(currentQ, currentIndex);
        }
        return;
      }

      // 4. Navigation & Submit Shortcuts
      if (key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        handleAttemptSubmit();
        return;
      }

      if (key === 'ArrowRight' || key === 'Enter') {
        if (currentIndex + 1 < questions.length) {
          e.preventDefault();
          setCurrentIndex(prev => prev + 1);
        }
      } else if (key === 'ArrowLeft') {
        if (currentIndex > 0) {
          e.preventDefault();
          setCurrentIndex(prev => prev - 1);
        }
      }

      // 5. Option Selection (1-5 or A-E)
      const currentQ = questions[currentIndex] || {};
      const options = currentQ.answers || [];
      const isMultiSelect = (options.filter(a => a.isCorrect)).length > 1;

      let optionIdx = -1;
      if (['1', '2', '3', '4', '5'].includes(key)) {
        optionIdx = parseInt(key, 10) - 1;
      } else if (['a', 'b', 'c', 'd', 'e', 'A', 'B', 'C', 'D', 'E'].includes(key)) {
        const lower = key.toLowerCase();
        optionIdx = lower.charCodeAt(0) - 97;
      }

      if (optionIdx >= 0 && optionIdx < options.length) {
        e.preventDefault();
        const targetOption = options[optionIdx];
        if (targetOption) {
          handleSelectOption(targetOption.id, isMultiSelect);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isSubmitted, questions, userAnswers]);

  // Timer Interval Effect
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      if (timerConfig.enabled && timerConfig.mode === 'countdown') {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      } else {
        setSecondsElapsed(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timerConfig.enabled, timerConfig.mode]);

  const formatTime = (totalSec) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (answerId, isMultiSelect) => {
    if (isSubmitted) return;
    if (isMultiSelect) {
      const currentSelected = Array.isArray(userAnswers[currentIndex]) ? userAnswers[currentIndex] : [];
      const updated = currentSelected.includes(answerId)
        ? currentSelected.filter(id => id !== answerId)
        : [...currentSelected, answerId];
      setUserAnswers(prev => ({ ...prev, [currentIndex]: updated }));
    } else {
      setUserAnswers(prev => ({ ...prev, [currentIndex]: answerId }));
    }
  };

  const handleAttemptSubmit = () => {
    const unansweredIndices = [];
    questions.forEach((_, idx) => {
      const ans = userAnswers[idx];
      if (ans === undefined || (Array.isArray(ans) && ans.length === 0)) {
        unansweredIndices.push(idx);
      }
    });

    if (unansweredIndices.length > 0) {
      setUnansweredWarning({
        count: unansweredIndices.length,
        firstUnansweredIndex: unansweredIndices[0]
      });
      return;
    }

    forceSubmit();
  };

  const handleAutoSubmit = () => {
    forceSubmit();
  };

  const forceSubmit = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach((q, idx) => {
      const userSel = userAnswers[idx];
      const selectedArr = Array.isArray(userSel) ? userSel : (userSel ? [userSel] : []);
      const correctArr = (q.answers || []).filter(a => a.isCorrect).map(a => a.id);

      const isAllMatched = correctArr.length === selectedArr.length &&
        correctArr.every(id => selectedArr.includes(id));

      if (isAllMatched && correctArr.length > 0) {
        correctCount += 1;
      }
    });

    saveQuizProgress(quiz.id, correctCount, questions.length, 'EXAM');
    if (correctCount / questions.length >= 0.7) {
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  const handleJumpToUnanswered = () => {
    if (unansweredWarning) {
      setCurrentIndex(unansweredWarning.firstUnansweredIndex);
      setUnansweredWarning(null);
      if (questionRef.current) {
        questionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleExitRequest = () => {
    if (isSubmitted || Object.keys(userAnswers).length === 0) {
      onBack();
    } else {
      setShowExitModal(true);
    }
  };

  const currentQ = questions[currentIndex] || {};

  // Compute final score
  let finalScore = 0;
  if (isSubmitted) {
    questions.forEach((q, idx) => {
      const selectedId = userAnswers[idx];
      const correctAns = q.answers?.find(a => a.isCorrect);
      if (correctAns && selectedId === correctAns.id) {
        finalScore += 1;
      }
    });
  }

  // EXAM RESULT SCREEN WITH DETAILED QUESTION BREAKDOWN
  if (isSubmitted) {
    const percentage = Math.round((finalScore / questions.length) * 100);
    const isPassed = percentage >= 70;

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 text-warm-text dark:text-slate-100">
        {/* Score Summary Box */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-warm-border dark:border-slate-800 shadow-soft text-center space-y-6"
        >
          <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center border ${
            isPassed ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'
          }`}>
            {isPassed ? <ShieldCheck className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
          </div>

          <div>
            <span className={`text-xs font-bold px-3.5 py-1 rounded-full ${
              isPassed ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
            }`}>
              {isPassed ? 'ĐÃ ĐẠT (PASSED)' : 'CHƯA ĐẠT (RETAKE RECOMMENDED)'}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-3">Kết Quả Bài Thi</h2>
            <p className="text-xs text-warm-muted dark:text-slate-400">{quiz.title}</p>
          </div>

          <div className="p-6 rounded-2xl bg-warm-bg dark:bg-slate-800 border border-warm-border dark:border-slate-700 inline-block min-w-[280px]">
            <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">{finalScore} / {questions.length}</div>
            <div className={`text-sm font-bold mt-1 ${isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              Đạt {percentage}% điểm tổng
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-4 border-t border-warm-border/60 dark:border-slate-800">
            <button
              onClick={() => { setIsSubmitted(false); setUserAnswers({}); setCurrentIndex(0); setSecondsElapsed(0); setSecondsRemaining((timerConfig.minutes || 20) * 60); }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-slate-800 border border-warm-border dark:border-slate-700 hover:bg-warm-hover dark:hover:bg-slate-700 font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-95 text-warm-text dark:text-slate-100"
            >
              <RotateCcw className="w-4 h-4 text-warm-slate dark:text-slate-300" /> Thi lại bài mới
            </button>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-warm-slate dark:bg-slate-800 hover:bg-slate-700 dark:hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-95"
            >
              Quay lại danh sách
            </button>
          </div>
        </motion.div>

        {/* DETAILED QUESTION REVIEW BREAKDOWN */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-warm-border/60 dark:border-slate-800 pb-3">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">Chi Tiết Xem Lại Bài Làm ({questions.length} câu)</h3>
            <span className="text-xs text-warm-muted dark:text-slate-400">Bấm icon ⭐ để lưu các câu làm sai</span>
          </div>

          {questions.map((q, idx) => {
            const userSel = userAnswers[idx];
            const userSelectedArr = Array.isArray(userSel) ? userSel : (userSel !== undefined ? [userSel] : []);
            const correctAnswersArr = (q.answers || []).filter(a => a.isCorrect);
            const correctIdsArr = correctAnswersArr.map(a => a.id);

            const isQuestion100PercentCorrect = correctIdsArr.length === userSelectedArr.length &&
              correctIdsArr.every(id => userSelectedArr.includes(id));
            const isUnanswered = userSelectedArr.length === 0;
            const isStarred = starredIds.has(q.id);

            let statusBadge = (
              <span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> Chính xác
              </span>
            );

            if (isUnanswered) {
              statusBadge = (
                <span className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 px-3 py-1 rounded-full text-xs font-bold">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" /> Chưa trả lời
                </span>
              );
            } else if (!isQuestion100PercentCorrect) {
              statusBadge = (
                <span className="inline-flex items-center gap-1 bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300 border border-rose-300 dark:border-rose-800 px-3 py-1 rounded-full text-xs font-bold">
                  <X className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" /> Chưa chính xác
                </span>
              );
            }

            return (
              <div
                key={q.id || idx}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-warm-border dark:border-slate-800 shadow-xs space-y-5"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-warm-muted dark:text-slate-400">Câu hỏi {idx + 1}</span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed break-words">
                      {q.content}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {statusBadge}
                    <button
                      onClick={() => handleToggleStar(q, idx)}
                      className="p-2 rounded-full hover:bg-warm-hover dark:hover:bg-slate-800 transition-transform active:scale-125"
                      title="Lưu câu hỏi ⭐"
                    >
                      <Star className={`w-5 h-5 ${isStarred ? 'fill-amber-400 text-amber-500' : 'text-warm-muted dark:text-slate-500'}`} />
                    </button>
                  </div>
                </div>

                {/* Answer Options List with Color Coding */}
                <div className="space-y-2.5">
                  {(q.answers || []).map((answer, aIdx) => {
                    const isUserChoice = userSelectedArr.includes(answer.id);
                    const isRightAnswer = Boolean(answer.isCorrect);

                    let optionStyle = "bg-gray-50/50 dark:bg-slate-800/40 border-gray-200 dark:border-slate-800 text-gray-400 dark:text-slate-500 opacity-60";
                    let optionBadge = null;

                    if (isUserChoice && isRightAnswer) {
                      optionStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-semibold shadow-xs";
                      optionBadge = (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Bạn chọn đúng
                        </span>
                      );
                    } else if (isUserChoice && !isRightAnswer) {
                      optionStyle = "bg-rose-50 dark:bg-rose-950/60 border-rose-500 dark:border-rose-700 text-rose-950 dark:text-rose-200 font-semibold shadow-xs";
                      optionBadge = (
                        <span className="flex items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-400">
                          <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Bạn chọn sai
                        </span>
                      );
                    } else if (isRightAnswer && !isUserChoice) {
                      optionStyle = "bg-emerald-50/60 dark:bg-emerald-950/40 border-2 border-dashed border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-300 font-semibold";
                      optionBadge = (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-400">
                          [Đáp án đúng chuẩn]
                        </span>
                      );
                    }

                    return (
                      <div
                        key={answer.id || aIdx}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 text-xs sm:text-sm font-medium ${optionStyle}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {String.fromCharCode(65 + aIdx)}
                          </span>
                          <span className="break-words leading-relaxed">{answer.content}</span>
                        </div>

                        {optionBadge && <div className="shrink-0 mt-0.5">{optionBadge}</div>}
                      </div>
                    );
                  })}
                </div>

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
            );
          })}
        </div>
      </div>
    );
  }

  // ACTIVE EXAM QUESTION SCREEN
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 text-warm-text dark:text-slate-100">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleExitRequest}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-warm-slate dark:text-slate-300 hover:text-warm-text bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 px-3.5 sm:px-4 py-2 rounded-full shadow-xs hover:shadow transition-all active:scale-95 whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Thoát bài thi</span>
          <span className="sm:hidden">Thoát</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Timer Display if enabled */}
          {timerConfig.enabled ? (
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 font-mono font-bold text-xs sm:text-sm shadow-xs whitespace-nowrap shrink-0">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 dark:text-amber-400 animate-pulse shrink-0" />
              <span>{timerConfig.mode === 'countdown' ? formatTime(secondsRemaining) : formatTime(secondsElapsed)}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-warm-bg dark:bg-slate-800 border border-warm-border dark:border-slate-700 text-warm-muted dark:text-slate-400 font-mono text-xs font-bold whitespace-nowrap shrink-0">
              <span className="hidden sm:inline">Không đếm giờ</span>
              <span className="sm:hidden">Không đếm</span>
            </div>
          )}

          <button
            onClick={handleAttemptSubmit}
            className="px-3.5 sm:px-5 py-2 rounded-full bg-emerald-600 dark:bg-emerald-700 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 whitespace-nowrap shrink-0"
          >
            <span className="hidden sm:inline">Nộp Bài Thi</span>
            <span className="sm:hidden">Nộp bài</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Question Panel */}
        <div ref={questionRef} className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-warm-border dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between text-xs font-bold text-warm-muted dark:text-slate-400 mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200/80 dark:border-amber-800">
                Câu {currentIndex + 1} / {questions.length}
              </span>
              {(currentQ.answers || []).filter(a => a.isCorrect).length > 1 && (
                <span className="text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-md border border-purple-200 dark:border-purple-800">
                  Multiple Choice (Chọn tất cả đáp án đúng)
                </span>
              )}
            </div>
            <span>{quiz.category}</span>
          </div>

          <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed mb-6 break-words">
            {currentQ.content}
          </h3>

          {/* Options List */}
          <div className="space-y-3 mb-8">
            {(currentQ.answers || []).map((answer, aIdx) => {
              const isMultiSelect = (currentQ.answers || []).filter(a => a.isCorrect).length > 1;
              const userSel = userAnswers[currentIndex];
              const isSelected = isMultiSelect
                ? (Array.isArray(userSel) && userSel.includes(answer.id))
                : (userSel === answer.id);

              return (
                <button
                  key={answer.id || aIdx}
                  onClick={() => handleSelectOption(answer.id, isMultiSelect)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3 text-xs sm:text-sm font-medium min-h-[52px] ${
                    isSelected
                      ? 'bg-warm-slate dark:bg-slate-800 text-white border-warm-slate dark:border-slate-700 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-warm-border dark:border-slate-800 text-warm-text dark:text-slate-100 hover:bg-warm-hover dark:hover:bg-slate-800'
                  }`}
                >
                  <span className={`w-6 h-6 ${isMultiSelect ? 'rounded-md' : 'rounded-full'} flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                    isSelected ? 'bg-white/20 text-white border-white/30' : 'bg-warm-hover dark:bg-slate-800 text-warm-slate dark:text-slate-300 border-warm-border/60 dark:border-slate-700'
                  }`}>
                    {isMultiSelect ? (isSelected ? '✓' : String.fromCharCode(65 + aIdx)) : String.fromCharCode(65 + aIdx)}
                  </span>
                  <span className="break-words leading-relaxed flex-1">{answer.content}</span>

                  <span className="hidden sm:inline-block text-[10px] font-mono opacity-50 px-1.5 py-0.5 rounded border border-current shrink-0">
                    Phím {aIdx + 1} / {String.fromCharCode(65 + aIdx)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Keyboard Helper Hint Bar (Knowt & Quizlet Style) */}
          <div className="flex items-center justify-between text-[11px] font-medium text-warm-muted dark:text-slate-400 pt-2 pb-4 border-t border-warm-border/40 dark:border-slate-800/60 flex-wrap gap-2">
            <span className="flex items-center gap-1.5"><Keyboard className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> <b>Phím tắt:</b> <code className="bg-warm-bg dark:bg-slate-800 px-1 py-0.5 rounded border border-warm-border dark:border-slate-700 font-mono font-bold">1-5 / A-E</code> chọn • <code className="bg-warm-bg dark:bg-slate-800 px-1 py-0.5 rounded border border-warm-border dark:border-slate-700 font-mono font-bold">S / *</code> Gắn sao</span>
            <span><code className="bg-warm-bg dark:bg-slate-800 px-1 py-0.5 rounded border border-warm-border dark:border-slate-700 font-mono font-bold">G / Tab</code> Bảng câu • <code className="bg-warm-bg dark:bg-slate-800 px-1 py-0.5 rounded border border-warm-border dark:border-slate-700 font-mono font-bold">?</code> Trợ giúp</span>
          </div>

          {/* Previous / Next buttons (Desktop) */}
          <div className="hidden sm:flex items-center justify-between pt-4 border-t border-warm-border/40 dark:border-slate-800">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="px-4 py-2 rounded-full border border-warm-border dark:border-slate-800 text-xs font-semibold text-warm-text dark:text-slate-200 hover:bg-warm-hover dark:hover:bg-slate-800 disabled:opacity-40 min-h-[44px]"
            >
              Câu trước
            </button>
            <button
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="px-4 py-2 rounded-full bg-warm-slate dark:bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 dark:hover:bg-slate-700 disabled:opacity-40 min-h-[44px]"
            >
              Câu tiếp theo
            </button>
          </div>
        </div>

        {/* Mobile Ergonomic Sticky Bottom Bar (< 640px) */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-warm-border dark:border-slate-800 p-3 flex items-center justify-between gap-2 shadow-lg">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className="px-3 py-2 rounded-xl border border-warm-border dark:border-slate-800 text-xs font-bold disabled:opacity-40 min-h-[44px] flex items-center gap-1"
          >
            ← Câu trước
          </button>

          <button
            onClick={() => setShowGridModal(true)}
            className="px-3 py-2 rounded-xl bg-warm-bg dark:bg-slate-800 border border-warm-border dark:border-slate-700 text-xs font-bold min-h-[44px] flex items-center gap-1.5"
          >
            <span>{currentIndex + 1} / {questions.length}</span>
            <BarChart2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          </button>

          <button
            disabled={currentIndex === questions.length - 1}
            onClick={() => setCurrentIndex(prev => prev + 1)}
            className="px-3 py-2 rounded-xl bg-warm-slate dark:bg-slate-800 text-white text-xs font-bold disabled:opacity-40 min-h-[44px] flex items-center gap-1"
          >
            Câu tiếp →
          </button>
        </div>

        {/* Question Grid Navigator Sidebar */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-warm-border dark:border-slate-800 shadow-soft h-fit">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">DANH SÁCH CÂU HỎI</h4>
            <span className="text-[10px] font-mono text-warm-muted dark:text-slate-500 bg-warm-bg dark:bg-slate-800 px-1.5 py-0.5 rounded border border-warm-border dark:border-slate-700">Phím G / Tab</span>
          </div>
          <div className="grid grid-cols-5 gap-2 max-h-[360px] overflow-y-auto pr-1">
            {questions.map((_, idx) => {
              const isAnswered = userAnswers[idx] !== undefined;
              const isCurrent = idx === currentIndex;

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center border ${
                    isCurrent
                      ? 'ring-2 ring-warm-slate border-warm-slate bg-warm-slate text-white'
                      : isAnswered
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                      : 'bg-warm-bg dark:bg-slate-800 text-warm-muted dark:text-slate-400 border-warm-border dark:border-slate-700 hover:bg-warm-hover dark:hover:bg-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-warm-border/60 dark:border-slate-800 space-y-2 text-[11px] text-warm-muted dark:text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-800" /> Đã chọn ({Object.keys(userAnswers).length})
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-warm-bg dark:bg-slate-800 border border-warm-border dark:border-slate-700" /> Chưa chọn ({questions.length - Object.keys(userAnswers).length})
            </div>
          </div>
        </div>
      </div>

      {/* Quick Question Grid Drawer / Modal (HotKey G or Tab) */}
      <AnimatePresence>
        {showGridModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowGridModal(false)}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-warm-border dark:border-slate-800 shadow-soft-lg max-w-lg w-full z-10 space-y-4" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-warm-border/60 dark:border-slate-800 pb-3">
                <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">🎯 Bảng Nhảy Nhanh Câu Hỏi (Phím G / Tab)</h3>
                <button onClick={() => setShowGridModal(false)} className="p-1.5 rounded-full hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-muted dark:text-slate-400">✕</button>
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2.5 max-h-[320px] overflow-y-auto p-1">
                {questions.map((_, idx) => {
                  const isAnswered = userAnswers[idx] !== undefined;
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setShowGridModal(false);
                      }}
                      className={`h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center border ${
                        isCurrent
                          ? 'ring-2 ring-warm-slate border-warm-slate bg-warm-slate text-white'
                          : isAnswered
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                          : 'bg-warm-bg dark:bg-slate-800 text-warm-muted dark:text-slate-400 border-warm-border dark:border-slate-700 hover:bg-warm-hover dark:hover:bg-slate-700'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => setShowGridModal(false)} className="w-full py-2.5 rounded-xl bg-warm-slate dark:bg-slate-800 text-white font-bold text-xs transition-colors">
                Đóng
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Knowt Style Hotkey Overlay Modal (Hotkey ?) */}
      <AnimatePresence>
        {showHotkeyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowHotkeyModal(false)}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-warm-border dark:border-slate-800 shadow-soft-lg max-w-md w-full z-10 space-y-4 text-warm-text dark:text-slate-100" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-warm-border/60 dark:border-slate-800 pb-3">
                <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">⌨️ Bảng Phím Tắt Thi Thử (Knowt Style)</h3>
                <button onClick={() => setShowHotkeyModal(false)} className="p-1.5 rounded-full hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-muted dark:text-slate-400">✕</button>
              </div>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-warm-border/30 dark:border-slate-800/60">
                  <span>Chọn đáp án (1 đến 5)</span>
                  <code className="bg-warm-bg dark:bg-slate-800 px-2 py-1 rounded font-mono font-bold text-amber-600 dark:text-amber-400">1, 2, 3, 4, 5 / A, B, C, D, E</code>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-warm-border/30 dark:border-slate-800/60">
                  <span>Chuyển câu tiếp theo / trước</span>
                  <code className="bg-warm-bg dark:bg-slate-800 px-2 py-1 rounded font-mono font-bold text-amber-600 dark:text-amber-400">→ / Enter  •  ←</code>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-warm-border/30 dark:border-slate-800/60">
                  <span>Gắn sao câu hỏi ⭐</span>
                  <code className="bg-warm-bg dark:bg-slate-800 px-2 py-1 rounded font-mono font-bold text-amber-600 dark:text-amber-400">S / *</code>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-warm-border/30 dark:border-slate-800/60">
                  <span>Bật Bảng nhảy nhanh câu hỏi</span>
                  <code className="bg-warm-bg dark:bg-slate-800 px-2 py-1 rounded font-mono font-bold text-amber-600 dark:text-amber-400">G / Tab</code>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-warm-border/30 dark:border-slate-800/60">
                  <span>Nộp bài thi khẩn cấp</span>
                  <code className="bg-warm-bg dark:bg-slate-800 px-2 py-1 rounded font-mono font-bold text-amber-600 dark:text-amber-400">Ctrl + Enter</code>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span>Mở/Đóng Bảng trợ giúp này</span>
                  <code className="bg-warm-bg dark:bg-slate-800 px-2 py-1 rounded font-mono font-bold text-amber-600 dark:text-amber-400">?</code>
                </div>
              </div>
              <button onClick={() => setShowHotkeyModal(false)} className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors">
                Đã hiểu
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Unanswered Warning Modal */}
      <AnimatePresence>
        {unansweredWarning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-warm-border dark:border-slate-800 shadow-soft-lg max-w-sm w-full z-10 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">Còn câu chưa trả lời!</h4>
                <p className="text-xs text-warm-muted dark:text-slate-400 mt-1">
                  Bạn còn <span className="font-bold text-rose-600 dark:text-rose-400">{unansweredWarning.count} câu</span> chưa chọn đáp án.
                </p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleJumpToUnanswered}
                  className="flex-1 py-2 rounded-full bg-warm-slate dark:bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 dark:hover:bg-slate-700"
                >
                  Nhảy tới câu chưa chọn
                </button>
                <button
                  onClick={forceSubmit}
                  className="px-4 py-2 rounded-full border border-warm-border dark:border-slate-700 text-xs font-semibold text-warm-muted dark:text-slate-300 hover:bg-warm-hover dark:hover:bg-slate-800"
                >
                  Vẫn nộp
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Exit Guard Confirmation Modal */}
      <AnimatePresence>
        {showExitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-warm-border dark:border-slate-800 shadow-soft-lg max-w-sm w-full z-10 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">Xác nhận thoát bài thi?</h4>
                <p className="text-xs text-warm-muted dark:text-slate-400 mt-1 leading-relaxed">
                  Bạn đang làm bài kiểm tra. Nếu thoát ra, tiến trình bài làm hiện tại <span className="font-bold text-rose-600 dark:text-rose-400">sẽ KHÔNG được lưu</span>.
                </p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="flex-1 py-2 rounded-full border border-warm-border dark:border-slate-700 text-xs font-bold text-warm-text dark:text-slate-200 hover:bg-warm-hover dark:hover:bg-slate-800"
                >
                  Tiếp tục làm bài
                </button>
                <button
                  onClick={onBack}
                  className="px-4 py-2 rounded-full bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
                >
                  Xác nhận thoát
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
