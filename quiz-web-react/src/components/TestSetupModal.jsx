import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Clock, HelpCircle, Check, Sparkles, AlertCircle, FileText } from 'lucide-react';

export default function TestSetupModal({ isOpen, onClose, quiz, onStartTest }) {
  if (!isOpen || !quiz) return null;

  const totalQuestionsAvailable = (quiz.questions || []).length;

  // Options State matching Quizlet Pro Test Setup
  const [questionCount, setQuestionCount] = useState(Math.min(20, totalQuestionsAvailable));
  const [studyStarredOnly, setStudyStarredOnly] = useState(false);

  // Question Types Toggle
  const [enableTrueFalse, setEnableTrueFalse] = useState(true);
  const [enableMultipleChoice, setEnableMultipleChoice] = useState(true);
  const [enableMatching, setEnableMatching] = useState(false);
  const [enableWritten, setEnableWritten] = useState(false);

  // Answer With Mode
  const [answerWith, setAnswerWith] = useState('Both'); // 'Term' | 'Definition' | 'Both'

  // Expandable sections
  const [showFormatOptions, setShowFormatOptions] = useState(false);
  const [showErrorOptions, setShowErrorOptions] = useState(false);

  // Error options
  const [requireOnlyOneAnswer, setRequireOnlyOneAnswer] = useState(false);
  const [typoHelp, setTypoHelp] = useState(true);

  // Timer Configuration
  const [enableTimer, setEnableTimer] = useState(false);
  const [timerMode, setTimerMode] = useState('countdown'); // 'countdown' | 'countup'
  const [timerMinutes, setTimerMinutes] = useState(20);

  const handleStart = () => {
    onStartTest({
      questionCount: Math.min(questionCount, totalQuestionsAvailable),
      studyStarredOnly,
      questionTypes: {
        trueFalse: enableTrueFalse,
        multipleChoice: enableMultipleChoice,
        matching: enableMatching,
        written: enableWritten
      },
      answerWith,
      requireOnlyOneAnswer,
      typoHelp,
      timer: {
        enabled: enableTimer,
        mode: timerMode,
        minutes: timerMinutes
      }
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-warm-border shadow-soft-lg z-10 max-h-[90vh] flex flex-col overflow-hidden text-warm-text"
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between pb-4 border-b border-warm-border/60">
            <div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {quiz.category || 'Quizlet Test'}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
                <FileText className="w-5 h-5 text-warm-slate" /> Set up your test
              </h2>
              <p className="text-xs text-warm-muted">{quiz.title}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-warm-hover text-warm-muted hover:text-warm-text transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Options Scroll Area */}
          <div className="py-5 overflow-y-auto flex-1 space-y-6 pr-1">

            {/* Questions count slider & input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-warm-text">
                <span>Questions (max {totalQuestionsAvailable})</span>
                <span className="px-2.5 py-1 rounded-lg bg-warm-hover text-warm-slate font-mono text-sm">
                  {questionCount}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max={totalQuestionsAvailable}
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value) || 1)}
                className="w-full h-2 bg-warm-border rounded-lg appearance-none cursor-pointer accent-warm-slate"
              />
            </div>

            {/* Study starred terms only toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
              <div>
                <label className="text-xs font-bold text-amber-950 block">Study starred terms only ⭐</label>
                <span className="text-[11px] text-amber-800">Chỉ tạo bài thi với những câu đã lưu ngôi sao</span>
              </div>
              <input
                type="checkbox"
                checked={studyStarredOnly}
                onChange={(e) => setStudyStarredOnly(e.target.checked)}
                className="w-5 h-5 accent-amber-600 rounded cursor-pointer"
              />
            </div>

            {/* Answer With Mode */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-warm-text block">Answer with</label>
              <div className="grid grid-cols-3 gap-2">
                {['Term', 'Definition', 'Both'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswerWith(opt)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                      answerWith === opt
                        ? 'bg-warm-slate text-white border-warm-slate shadow-xs'
                        : 'bg-white border-warm-border text-warm-muted hover:text-warm-text'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Types Toggles */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-warm-text block">Question types</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                <label className="flex items-center justify-between p-3 rounded-xl border border-warm-border bg-white cursor-pointer hover:bg-warm-hover">
                  <span>True/False</span>
                  <input
                    type="checkbox"
                    checked={enableTrueFalse}
                    onChange={(e) => setEnableTrueFalse(e.target.checked)}
                    className="w-4 h-4 accent-warm-slate rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-warm-border bg-white cursor-pointer hover:bg-warm-hover">
                  <span>Multiple Choice</span>
                  <input
                    type="checkbox"
                    checked={enableMultipleChoice}
                    onChange={(e) => setEnableMultipleChoice(e.target.checked)}
                    className="w-4 h-4 accent-warm-slate rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-warm-border bg-white cursor-pointer hover:bg-warm-hover">
                  <span>Matching</span>
                  <input
                    type="checkbox"
                    checked={enableMatching}
                    onChange={(e) => setEnableMatching(e.target.checked)}
                    className="w-4 h-4 accent-warm-slate rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-warm-border bg-white cursor-pointer hover:bg-warm-hover">
                  <span>Written</span>
                  <input
                    type="checkbox"
                    checked={enableWritten}
                    onChange={(e) => setEnableWritten(e.target.checked)}
                    className="w-4 h-4 accent-warm-slate rounded"
                  />
                </label>
              </div>
            </div>

            {/* Timer Setup Section */}
            <div className="p-4 rounded-2xl bg-warm-bg border border-warm-border space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-warm-slate" />
                  <span className="text-xs font-bold text-warm-text">Hẹn giờ bài thi (Timer)</span>
                </div>
                <input
                  type="checkbox"
                  checked={enableTimer}
                  onChange={(e) => setEnableTimer(e.target.checked)}
                  className="w-4 h-4 accent-warm-slate rounded cursor-pointer"
                />
              </div>

              {enableTimer && (
                <div className="pt-2 border-t border-warm-border/60 space-y-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTimerMode('countdown')}
                      className={`flex-1 py-1.5 rounded-lg font-semibold border ${
                        timerMode === 'countdown' ? 'bg-warm-slate text-white border-warm-slate' : 'bg-white border-warm-border text-warm-muted'
                      }`}
                    >
                      Đếm ngược (Tự nộp)
                    </button>
                    <button
                      onClick={() => setTimerMode('countup')}
                      className={`flex-1 py-1.5 rounded-lg font-semibold border ${
                        timerMode === 'countup' ? 'bg-warm-slate text-white border-warm-slate' : 'bg-white border-warm-border text-warm-muted'
                      }`}
                    >
                      Đếm tiến (Tùy nộp)
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-warm-muted font-medium">Thời gian (phút):</span>
                    <input
                      type="number"
                      min="1"
                      max="180"
                      value={timerMinutes}
                      onChange={(e) => setTimerMinutes(parseInt(e.target.value) || 1)}
                      className="w-20 px-2 py-1 text-center font-mono font-bold rounded-lg border border-warm-border bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Question Format Accordion */}
            <div className="border-t border-warm-border/60 pt-3">
              <button
                onClick={() => setShowFormatOptions(!showFormatOptions)}
                className="w-full flex items-center justify-between text-xs font-bold text-warm-muted hover:text-warm-text py-1"
              >
                <span>Question format</span>
                <span>{showFormatOptions ? 'Hide' : 'Show'}</span>
              </button>
              {showFormatOptions && (
                <div className="mt-2 p-3 rounded-xl bg-warm-hover/60 text-xs space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="format" defaultChecked className="accent-warm-slate" /> Answer with Term
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="format" className="accent-warm-slate" /> Answer with Definition
                  </label>
                </div>
              )}
            </div>

            {/* Error Checking Options Accordion */}
            <div className="border-t border-warm-border/60 pt-3">
              <button
                onClick={() => setShowErrorOptions(!showErrorOptions)}
                className="w-full flex items-center justify-between text-xs font-bold text-warm-muted hover:text-warm-text py-1"
              >
                <span>Error checking options</span>
                <span>{showErrorOptions ? 'Hide' : 'Show'}</span>
              </button>
              {showErrorOptions && (
                <div className="mt-2 p-3 rounded-xl bg-warm-hover/60 text-xs space-y-3">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requireOnlyOneAnswer}
                      onChange={(e) => setRequireOnlyOneAnswer(e.target.checked)}
                      className="mt-0.5 accent-warm-slate rounded"
                    />
                    <div>
                      <span className="font-bold text-warm-text block">Require only 1 answer</span>
                      <span className="text-[11px] text-warm-muted leading-tight block">
                        Mark the question as correct when at least one answer is provided.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={typoHelp}
                      onChange={(e) => setTypoHelp(e.target.checked)}
                      className="mt-0.5 accent-warm-slate rounded"
                    />
                    <div>
                      <span className="font-bold text-warm-text block">Typo help</span>
                      <span className="text-[11px] text-warm-muted leading-tight block">
                        Ignore typos and minor spelling differences.
                      </span>
                    </div>
                  </label>
                </div>
              )}
            </div>

          </div>

          {/* Footer Action Bar */}
          <div className="pt-4 border-t border-warm-border/60 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-warm-border text-xs font-semibold text-warm-muted hover:text-warm-text hover:bg-warm-hover transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleStart}
              className="px-6 py-2.5 rounded-full bg-warm-slate hover:bg-slate-700 text-white text-xs font-bold shadow-sm active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Start test
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
