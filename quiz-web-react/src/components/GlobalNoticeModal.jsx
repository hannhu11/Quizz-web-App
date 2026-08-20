import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'quizzflow_hide_notice_v1';

export default function GlobalNoticeModal() {
  const [isOpen, setIsOpen] = useState(() => {
    try {
      if (typeof window === 'undefined') return false;
      return localStorage.getItem(STORAGE_KEY) !== 'true';
    } catch (e) {
      return false;
    }
  });

  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Close modal handler with persistence
  const handleClose = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch (e) {
        console.warn('Cannot write to localStorage:', e);
      }
    }
    setIsOpen(false);
  };

  // Keyboard navigation: Close on Escape key for Accessibility
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dontShowAgain]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs transition-opacity"
        />

        {/* Centered Floating Micro-Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200/80 dark:border-slate-800 z-10 space-y-4"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            aria-label="Đóng thông báo"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Header Icon + Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/80 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 stroke-[1.75]" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Thông Báo Học Thuật
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Chào Mừng Bạn Đến QuizzFlow
              </h3>
            </div>
          </div>

          {/* Notice Body */}
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2.5 bg-slate-50/80 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <p>
              Nhằm đem lại nguồn tài liệu ôn tập đầy đủ nhất kèm lời giải chi tiết, hệ thống đã tổng hợp dữ liệu từ 2 nền tảng khác nhau. Việc này có thể dẫn đến hiện tượng trùng lặp ở một số đề (do khác ca thi hoặc nguồn gốc).
            </p>
            <p>
              Nếu bạn phát hiện nội dung cần bổ sung hoặc có mong muốn đóng góp thêm đề mới lên web, vui lòng inbox trực tiếp qua fanpage:{' '}
              <a
                href="https://www.facebook.com/nhu.han.3979"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-0.5"
              >
                QuizzFlow - Nền Tảng Ôn Luyện & Trắc Nghiệm Thông Minh
                <ExternalLink className="w-3 h-3 inline-block ml-0.5 stroke-[2]" />
              </a>{' '}
              hoặc nhấn vào logo QuizzFlow ở thanh menu để liên hệ đóng góp cho cộng đồng nhé! (Hệ thống sẽ vinh danh tên các bạn đóng góp).
            </p>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Checkbox Do not show again */}
            <label
              className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors w-full sm:w-auto"
            >
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 cursor-pointer"
              />
              <span>Không hiển thị lại thông báo này</span>
            </label>

            {/* Primary Action Button */}
            <button
              onClick={handleClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 cursor-pointer active:scale-98"
            >
              Đã hiểu & Bắt đầu học
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
