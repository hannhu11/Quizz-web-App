import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, AlertCircle } from 'lucide-react';

export default function PasswordModal({ isOpen, onClose, onConfirm, actionType = 'DELETE', quizTitle = '' }) {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Automatically reset input state and error whenever modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setErrorMsg('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCloseModal = () => {
    setPassword('');
    setErrorMsg('');
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMsg('Vui lòng nhập mật khẩu quản lý!');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const isValid = await onConfirm(password.trim());
      if (!isValid) {
        setErrorMsg('Mật khẩu không chính xác. Vui lòng thử lại!');
        setIsSubmitting(false);
      } else {
        setPassword('');
        setErrorMsg('');
        setIsSubmitting(false);
        onClose();
      }
    } catch (err) {
      setErrorMsg('Mật khẩu không chính xác. Vui lòng thử lại!');
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 10 }}
          className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 border border-warm-border dark:border-slate-800 shadow-soft-lg z-10 text-warm-text dark:text-slate-100"
        >
          {/* Close button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-muted dark:text-slate-400 hover:text-warm-text transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <form onSubmit={handleSubmit} className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                Xác nhận mật khẩu quản lý
              </h3>
              <p className="text-xs text-warm-muted dark:text-slate-400 mt-1 leading-relaxed">
                Nhập mật khẩu để {actionType === 'DELETE' ? 'xóa' : 'chỉnh sửa'} bộ đề <span className="font-bold text-slate-800 dark:text-slate-200">"{quizTitle}"</span>
              </p>
            </div>

            <div className="space-y-2 text-left">
              <input
                type="password"
                placeholder="Nhập mật khẩu quản lý..."
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}
                autoFocus
                className="w-full px-4 py-2.5 rounded-2xl bg-warm-bg/70 dark:bg-slate-800 border border-warm-border dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              />

              {errorMsg && (
                <div className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/60 p-2 rounded-xl border border-rose-200 dark:border-rose-900">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleCloseModal}
                className="flex-1 py-2.5 rounded-full border border-warm-border dark:border-slate-700 text-xs font-bold text-warm-text dark:text-slate-300 hover:bg-warm-hover dark:hover:bg-slate-800 transition-colors"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 py-2.5 rounded-full text-white text-xs font-bold shadow-xs transition-all active:scale-95 disabled:opacity-50 ${
                  actionType === 'DELETE' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? 'Đang xác thực...' : 'Xác nhận'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
