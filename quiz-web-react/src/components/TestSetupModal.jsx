import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Sparkles, FileText } from 'lucide-react';

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

  // Handle bidirectional sync for Question Count input & slider
  const handleQuestionCountInput = (val) => {
    let num = parseInt(val, 10);
    if (isNaN(num)) num = 1;
    if (num < 1) num = 1;
    if (num > totalQuestionsAvailable) num = totalQuestionsAvailable;
    setQuestionCount(num);
  };

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
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl z-10 max-h-[90vh] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100"
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                {quiz.category || 'Tùy Chỉnh Bài Thi'}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Thiết Lập Bài Thi (Set up your test)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{quiz.title}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Options Scroll Area */}
          <div className="py-5 overflow-y-auto flex-1 space-y-5 pr-1">

            {/* Questions count slider & bidirectional input sync */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-800 dark:text-slate-200">
                <span>Số lượng câu hỏi (Tối đa {totalQuestionsAvailable})</span>
                {/* Synchronized Editable Input Box */}
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="1"
                    max={totalQuestionsAvailable}
                    value={questionCount}
                    onChange={(e) => handleQuestionCountInput(e.target.value)}
                    className="w-16 px-2 py-1 text-center font-mono font-extrabold rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">câu</span>
                </div>
              </div>
              {/* Range Slider */}
              <input
                type="range"
                min="1"
                max={totalQuestionsAvailable}
                value={questionCount}
                onChange={(e) => handleQuestionCountInput(e.target.value)}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
              />
            </div>

            {/* Study starred terms only toggle (Streamlined Notion / Linear style) */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <div>
                <label className="text-xs font-extrabold text-slate-900 dark:text-slate-100 block">Chỉ câu hỏi đã lưu</label>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Chỉ tạo bài thi với những câu đã lưu</span>
              </div>
              <input
                type="checkbox"
                checked={studyStarredOnly}
                onChange={(e) => setStudyStarredOnly(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 dark:accent-indigo-400 rounded cursor-pointer"
              />
            </div>

            {/* Answer With Mode */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 block">Trả lời theo (Answer with)</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'Term', label: 'Thuật ngữ (Term)' },
                  { key: 'Definition', label: 'Định nghĩa (Definition)' },
                  { key: 'Both', label: 'Cả hai (Both)' }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setAnswerWith(opt.key)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all border ${
                      answerWith === opt.key
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Types Toggles */}
            <div className="space-y-2.5">
              <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 block">Loại câu hỏi (Question types)</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60">
                  <span className="text-slate-800 dark:text-slate-200">Đúng / Sai (True/False)</span>
                  <input
                    type="checkbox"
                    checked={enableTrueFalse}
                    onChange={(e) => setEnableTrueFalse(e.target.checked)}
                    className="w-4 h-4 accent-indigo-600 dark:accent-indigo-400 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60">
                  <span className="text-slate-800 dark:text-slate-200">Trắc nghiệm (Multiple Choice)</span>
                  <input
                    type="checkbox"
                    checked={enableMultipleChoice}
                    onChange={(e) => setEnableMultipleChoice(e.target.checked)}
                    className="w-4 h-4 accent-indigo-600 dark:accent-indigo-400 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60">
                  <span className="text-slate-800 dark:text-slate-200">Nối từ (Matching)</span>
                  <input
                    type="checkbox"
                    checked={enableMatching}
                    onChange={(e) => setEnableMatching(e.target.checked)}
                    className="w-4 h-4 accent-indigo-600 dark:accent-indigo-400 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60">
                  <span className="text-slate-800 dark:text-slate-200">Tự luận (Written)</span>
                  <input
                    type="checkbox"
                    checked={enableWritten}
                    onChange={(e) => setEnableWritten(e.target.checked)}
                    className="w-4 h-4 accent-indigo-600 dark:accent-indigo-400 rounded"
                  />
                </label>
              </div>
            </div>

            {/* Timer Setup Section */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">Đếm thời gian làm bài</span>
                </div>
                <input
                  type="checkbox"
                  checked={enableTimer}
                  onChange={(e) => setEnableTimer(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 dark:accent-indigo-400 rounded cursor-pointer"
                />
              </div>

              {enableTimer && (
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-semibold">
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 dark:text-slate-400 mb-1">Chế độ đếm</label>
                    <select
                      value={timerMode}
                      onChange={(e) => setTimerMode(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold"
                    >
                      <option value="countdown">Đếm ngược (Countdown)</option>
                      <option value="countup">Đếm xuôi (Countup)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 dark:text-slate-400 mb-1">Thời gian (phút)</label>
                    <input
                      type="number"
                      min="1"
                      max="180"
                      value={timerMinutes}
                      onChange={(e) => setTimerMinutes(parseInt(e.target.value, 10) || 1)}
                      className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold"
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
              className="px-6 py-2.5 rounded-full bg-warm-slate hover:bg-slate-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Start test
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
