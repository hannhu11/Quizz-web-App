import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  User,
  Calendar,
  Eye,
  EyeOff,
  X,
  ShieldCheck,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import GoogleAuthBtn from './GoogleAuthBtn';

export default function AuthModal({ isOpen, onClose, initialMode = 'LOGIN' }) {
  const { login, register } = useAuth();

  const [mode, setMode] = useState(initialMode); // 'LOGIN' | 'REGISTER' | 'FORGOT_PASSWORD'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');

  // UI States
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setErrorMsg('');
    setSuccessMsg('');
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDob('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleModeSwitch = (newMode) => {
    resetForm();
    setMode(newMode);
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    if (mode === 'LOGIN') {
      if (!email.trim() || !password) {
        setErrorMsg('Vui lòng nhập Email và Mật khẩu.');
        setIsSubmitting(false);
        return;
      }

      const res = await login(email.trim(), password);
      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => {
          onClose();
          resetForm();
        }, 1000);
      } else {
        setErrorMsg(res.message);
      }
    } else if (mode === 'REGISTER') {
      if (!fullName.trim() || !email.trim() || !password) {
        setErrorMsg('Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu.');
        setIsSubmitting(false);
        return;
      }

      if (password.length < 8) {
        setErrorMsg('Mật khẩu phải chứa ít nhất 8 ký tự.');
        setIsSubmitting(false);
        return;
      }

      if (password !== confirmPassword) {
        setErrorMsg('Mật khẩu nhập lại không trùng khớp.');
        setIsSubmitting(false);
        return;
      }

      const res = await register(fullName.trim(), email.trim(), password, confirmPassword, dob);
      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => {
          onClose();
          resetForm();
        }, 1200);
      } else {
        setErrorMsg(res.message);
      }
    } else if (mode === 'FORGOT_PASSWORD') {
      if (!email.trim()) {
        setErrorMsg('Vui lòng nhập Email để nhận hướng dẫn khôi phục.');
        setIsSubmitting(false);
        return;
      }

      setSuccessMsg('Hướng dẫn khôi phục mật khẩu đã được gửi tới Email của bạn!');
      setTimeout(() => {
        handleModeSwitch('LOGIN');
      }, 2000);
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
          {/* Close Button */}
          <button
            onClick={() => { onClose(); resetForm(); }}
            className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Header Title */}
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {mode === 'LOGIN' && 'Đăng Nhập QuizzFlow'}
              {mode === 'REGISTER' && 'Tạo Tài Khoản Sinh Viên'}
              {mode === 'FORGOT_PASSWORD' && 'Khôi Phục Mật Khẩu'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {mode === 'LOGIN' && 'Đăng nhập để tích lũy Điểm Uy Tín & Thảo luận đáp án'}
              {mode === 'REGISTER' && 'Tạo tài khoản bằng email FPT hoặc Gmail'}
              {mode === 'FORGOT_PASSWORD' && 'Nhập email sinh viên để nhận lại mật khẩu'}
            </p>
          </div>

          {/* Alert Error / Success Messages */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* REGISTER MODE: Full Name */}
            {mode === 'REGISTER' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Họ và tên <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 stroke-[1.75]" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nguyễn Hàn Như"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                </div>
              </div>
            )}

            {/* EMAIL FIELD (All Modes) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Sinh Viên / Gmail <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 stroke-[1.75]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nhunh@fpt.edu.vn hoặc user@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>
            </div>

            {/* PASSWORD FIELD (Login & Register) */}
            {mode !== 'FORGOT_PASSWORD' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Mật khẩu <span className="text-rose-500">*</span>
                  </label>
                  {mode === 'LOGIN' && (
                    <button
                      type="button"
                      onClick={() => handleModeSwitch('FORGOT_PASSWORD')}
                      className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      Quên mật khẩu?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 stroke-[1.75]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu tối thiểu 8 ký tự..."
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                  {/* Eye Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 stroke-[1.75]" />
                    ) : (
                      <Eye className="w-4 h-4 stroke-[1.75]" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* REGISTER MODE: Confirm Password & DOB */}
            {mode === 'REGISTER' && (
              <>
                {/* Confirm Password Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nhập lại mật khẩu <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 stroke-[1.75]" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Xác nhận lại mật khẩu..."
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                    {/* Eye Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                      title={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 stroke-[1.75]" />
                      ) : (
                        <Eye className="w-4 h-4 stroke-[1.75]" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Date of Birth Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Ngày tháng năm sinh
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 stroke-[1.75]" />
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50 mt-2"
            >
              {isSubmitting ? (
                'Đang xử lý...'
              ) : (
                <>
                  {mode === 'LOGIN' && 'Đăng Nhập Ngay'}
                  {mode === 'REGISTER' && 'Tạo Tài Khoản & Nhận 🟢 +10 Uy Tín'}
                  {mode === 'FORGOT_PASSWORD' && 'Gửi Yêu Cầu Khôi Phục'}
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          {mode !== 'FORGOT_PASSWORD' && (
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <span className="relative px-3 bg-white dark:bg-slate-900 text-[11px] font-semibold text-slate-400">
                HOẶC
              </span>
            </div>
          )}

          {/* Google Auth 1-Click Button */}
          {mode !== 'FORGOT_PASSWORD' && (
            <GoogleAuthBtn
              onSuccess={(msg) => {
                setSuccessMsg(msg);
                setTimeout(() => {
                  onClose();
                  resetForm();
                }, 1000);
              }}
              onError={(err) => setErrorMsg(err)}
            />
          )}

          {/* Switch Mode Footer */}
          <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            {mode === 'LOGIN' ? (
              <p>
                Chưa có tài khoản QuizzFlow?{' '}
                <button
                  type="button"
                  onClick={() => handleModeSwitch('REGISTER')}
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Đăng ký ngay
                </button>
              </p>
            ) : (
              <p>
                Đã có tài khoản QuizzFlow?{' '}
                <button
                  type="button"
                  onClick={() => handleModeSwitch('LOGIN')}
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Đăng nhập
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
