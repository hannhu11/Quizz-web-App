import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, X, ShieldCheck } from 'lucide-react';

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
  ? `${window.location.origin}/api`
  : 'http://localhost:8701/api';

export default function ResetPasswordModal({ isOpen, onClose, resetToken }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Password Strength Calculation (4 Levels: Weak / Medium / Strong / Very Strong)
  const hasMinLength = newPassword.length >= 8;
  const hasLower = /[a-z]/.test(newPassword);
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);

  const passedCriteriaCount = [hasMinLength, hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
  
  let strengthLabel = 'Chưa nhập';
  let strengthColor = 'bg-slate-200 dark:bg-slate-700';
  let strengthTextColor = 'text-slate-500';
  let strengthPercent = '0%';

  if (newPassword.length > 0) {
    if (passedCriteriaCount <= 2) {
      strengthLabel = 'Yếu';
      strengthColor = 'bg-rose-500';
      strengthTextColor = 'text-rose-500';
      strengthPercent = '25%';
    } else if (passedCriteriaCount === 3) {
      strengthLabel = 'Trung bình';
      strengthColor = 'bg-amber-500';
      strengthTextColor = 'text-amber-500';
      strengthPercent = '50%';
    } else if (passedCriteriaCount === 4) {
      strengthLabel = 'Mạnh';
      strengthColor = 'bg-blue-500';
      strengthTextColor = 'text-blue-500';
      strengthPercent = '75%';
    } else if (passedCriteriaCount === 5) {
      strengthLabel = 'Cực kỳ bảo mật';
      strengthColor = 'bg-emerald-500';
      strengthTextColor = 'text-emerald-500';
      strengthPercent = '100%';
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!hasMinLength || !hasLower || !hasUpper || !hasNumber || !hasSpecial) {
      setErrorMsg('Mật khẩu bắt buộc phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt (!@#$%^&*...).');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Mật khẩu nhập lại không trùng khớp.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: resetToken,
          resetToken,
          newPassword
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Đổi mật khẩu mới thành công! Đang chuyển hướng...');
        setTimeout(() => {
          onClose();
          if (typeof window !== 'undefined') {
            window.location.hash = '#/';
          }
        }, 1800);
      } else {
        setErrorMsg(data.message || 'Link khôi phục mật khẩu không hợp lệ hoặc đã hết hạn (15 phút).');
      }
    } catch (err) {
      setErrorMsg('Lỗi kết nối máy chủ.');
    }
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[1.75]" />
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Tạo Mật Khẩu Mới
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Thiết lập mật khẩu an toàn chuẩn quốc tế cho tài khoản QuizzFlow.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mật khẩu mới</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới..."
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {newPassword.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-slate-500">Độ mạnh:</span>
                    <span className={strengthTextColor}>{strengthLabel}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${strengthColor}`}
                      style={{ width: strengthPercent }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nhập lại mật khẩu mới</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới..."
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password Standards Checklist */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
              <div className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" /> Tiêu chuẩn mật khẩu an toàn:
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                <span className={hasMinLength ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>
                  {hasMinLength ? '✓' : '•'} Tối thiểu 8 ký tự
                </span>
                <span className={hasLower ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>
                  {hasLower ? '✓' : '•'} Chữ thường (a-z)
                </span>
                <span className={hasUpper ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>
                  {hasUpper ? '✓' : '•'} Chữ hoa (A-Z)
                </span>
                <span className={hasNumber ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>
                  {hasNumber ? '✓' : '•'} Chữ số (0-9)
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-[0.99] cursor-pointer"
            >
              {isSubmitting ? 'Đang cập nhật...' : 'Cập Nhật Mật Khẩu Mới'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
