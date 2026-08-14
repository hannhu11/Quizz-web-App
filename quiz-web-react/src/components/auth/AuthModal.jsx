import React, { useState, useEffect } from 'react';
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
  CheckCircle2,
  KeyRound,
  ArrowLeft,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import GoogleAuthBtn from './GoogleAuthBtn';

export default function AuthModal({ isOpen, onClose, initialMode = 'LOGIN' }) {
  const { login, register, requestRegisterOtp, verifyRegisterOtp } = useAuth();

  const [mode, setMode] = useState(initialMode); // 'LOGIN' | 'REGISTER' | 'FORGOT_PASSWORD'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');

  // OTP Verification States
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [countdown, setCountdown] = useState(0);

  // UI States
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  if (!isOpen) return null;

  const resetForm = () => {
    setErrorMsg('');
    setSuccessMsg('');
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDob('');
    setIsOtpStep(false);
    setOtpCode('');
    setCountdown(0);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleModeSwitch = (newMode) => {
    resetForm();
    setMode(newMode);
  };

  // Resend OTP Handler
  const handleResendOtp = async () => {
    if (countdown > 0 || isSubmitting) return;
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      const res = await requestRegisterOtp(fullName.trim(), email.trim(), password, confirmPassword, dob);
      if (res.success) {
        setSuccessMsg('Đã gửi lại mã OTP mới vào hộp thư của bạn!');
        setCountdown(60);
      } else {
        setErrorMsg(res.message || 'Không thể gửi lại mã OTP. Vui lòng thử lại!');
      }
    } catch (err) {
      setErrorMsg('Lỗi kết nối máy chủ gửi OTP.');
    } finally {
      setIsSubmitting(false);
    }
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
      if (!isOtpStep) {
        // Step 1: Validate Registration Details & Request OTP Email
        if (!fullName.trim() || !email.trim() || !password) {
          setErrorMsg('Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu.');
          setIsSubmitting(false);
          return;
        }

        const hasMinLength = password.length >= 8;
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);

        if (!hasMinLength || !hasLower || !hasUpper || !hasNumber || !hasSpecial) {
          setErrorMsg('Mật khẩu phải chứa ít nhất 8 ký tự gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt (!@#$%...).');
          setIsSubmitting(false);
          return;
        }

        if (password !== confirmPassword) {
          setErrorMsg('Mật khẩu nhập lại không trùng khớp.');
          setIsSubmitting(false);
          return;
        }

        const res = await requestRegisterOtp(fullName.trim(), email.trim(), password, confirmPassword, dob);
        if (res.success) {
          setIsOtpStep(true);
          setSuccessMsg(res.message || 'Mã xác thực OTP (6 chữ số) đã được gửi đến email của bạn.');
          setCountdown(60);
        } else {
          // If server fails or offline, fallback direct register
          const directRes = await register(fullName.trim(), email.trim(), password, confirmPassword, dob);
          if (directRes.success) {
            setSuccessMsg(directRes.message);
            setTimeout(() => {
              onClose();
              resetForm();
            }, 1200);
          } else {
            setErrorMsg(res.message || directRes.message);
          }
        }
      } else {
        // Step 2: Validate 6-digit OTP Code
        if (!otpCode.trim() || otpCode.trim().length < 6) {
          setErrorMsg('Vui lòng nhập đầy đủ 6 chữ số mã xác thực OTP.');
          setIsSubmitting(false);
          return;
        }

        const res = await verifyRegisterOtp(email.trim(), otpCode.trim());
        if (res.success) {
          setSuccessMsg(res.message || 'Xác thực OTP thành công! Đang chuyển hướng...');
          setTimeout(() => {
            onClose();
            resetForm();
          }, 1200);
        } else {
          setErrorMsg(res.message || 'Mã OTP không chính xác hoặc đã hết hạn.');
        }
      }
    } else if (mode === 'FORGOT_PASSWORD') {
      if (!email.trim()) {
        setErrorMsg('Vui lòng nhập Email để nhận hướng dẫn khôi phục.');
        setIsSubmitting(false);
        return;
      }

      try {
        const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
          ? `${window.location.origin}/api`
          : 'http://localhost:8701/api';

        const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim() })
        });
        const data = await res.json();
        if (data.success) {
          setSuccessMsg(data.message || 'Hướng dẫn khôi phục mật khẩu đã được gửi tới Email của bạn!');
          setTimeout(() => {
            handleModeSwitch('LOGIN');
          }, 3000);
        } else {
          setErrorMsg(data.message || 'Lỗi gửi yêu cầu khôi phục mật khẩu.');
        }
      } catch (err) {
        console.error('Forgot password error:', err);
        setErrorMsg('Không thể kết nối máy chủ gửi email.');
      }
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
              {mode === 'REGISTER' && (!isOtpStep ? 'Tạo Tài Khoản Sinh Viên' : 'Xác Thực Mã OTP Email')}
              {mode === 'FORGOT_PASSWORD' && 'Khôi Phục Mật Khẩu'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {mode === 'LOGIN' && 'Đăng nhập để tích lũy Điểm Uy Tín & Thảo luận đáp án'}
              {mode === 'REGISTER' && (!isOtpStep ? 'Tạo tài khoản bằng email FPT hoặc Gmail' : `Mã 6 chữ số đã gửi đến: ${email}`)}
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
            {/* REGISTER OTP SCREEN */}
            {mode === 'REGISTER' && isOtpStep ? (
              <div className="space-y-4 py-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 text-center">
                    Nhập mã xác thực 6 chữ số <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500 stroke-[1.75]" />
                    <input
                      type="text"
                      maxLength={6}
                      required
                      autoFocus
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • • • •"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-2 border-indigo-500/40 dark:border-indigo-500/40 rounded-xl text-center text-xl tracking-[8px] font-mono font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Mã xác thực có hiệu lực trong <strong>5 phút</strong>. Vui lòng kiểm tra hộp thư đến (hoặc thư rác).
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => { setIsOtpStep(false); setOtpCode(''); setErrorMsg(''); }}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-semibold cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Quay lại
                  </button>

                  <button
                    type="button"
                    disabled={countdown > 0 || isSubmitting}
                    onClick={handleResendOtp}
                    className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold hover:underline disabled:opacity-50 disabled:no-underline cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {countdown > 0 ? `Gửi lại mã (${countdown}s)` : 'Gửi lại mã OTP'}
                  </button>
                </div>
              </div>
            ) : (
              <>
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
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      />
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

                    {/* Strict Password Requirements Hint for Registration */}
                    {mode === 'REGISTER' && (
                      <div className="mt-1.5 text-[10px] space-y-0.5 text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <span className={password.length >= 8 ? "text-emerald-500 font-bold" : "text-slate-400"}>• Tối thiểu 8 ký tự</span>
                          <span className={/[A-Z]/.test(password) ? "text-emerald-500 font-bold" : "text-slate-400"}>• 1 chữ in hoa</span>
                          <span className={/[0-9]/.test(password) ? "text-emerald-500 font-bold" : "text-slate-400"}>• 1 chữ số</span>
                          <span className={/[^A-Za-z0-9]/.test(password) ? "text-emerald-500 font-bold" : "text-slate-400"}>• 1 ký tự đặc biệt</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* REGISTER MODE: Confirm Password & DOB */}
                {mode === 'REGISTER' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Xác nhận lại mật khẩu <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 stroke-[1.75]" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        />
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
                  {mode === 'REGISTER' && (!isOtpStep ? 'Tạo Tài Khoản' : 'Xác Nhận & Kích Hoạt Tài Khoản')}
                  {mode === 'FORGOT_PASSWORD' && 'Gửi Yêu Cầu Khôi Phục'}
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          {mode !== 'FORGOT_PASSWORD' && !isOtpStep && (
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <span className="relative px-3 bg-white dark:bg-slate-900 text-[11px] font-semibold text-slate-400">
                HOẶC
              </span>
            </div>
          )}

          {/* Google One-Tap / OAuth Button */}
          {mode !== 'FORGOT_PASSWORD' && !isOtpStep && (
            <div className="mb-4">
              <GoogleAuthBtn
                onSuccess={() => {
                  onClose();
                  resetForm();
                }}
                onError={(err) => setErrorMsg(err)}
              />
            </div>
          )}

          {/* Mode Switch Footers */}
          <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            {mode === 'LOGIN' && (
              <p>
                Chưa có tài khoản?{' '}
                <button
                  type="button"
                  onClick={() => handleModeSwitch('REGISTER')}
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Tạo tài khoản sinh viên
                </button>
              </p>
            )}

            {mode === 'REGISTER' && (
              <p>
                Đã có tài khoản?{' '}
                <button
                  type="button"
                  onClick={() => handleModeSwitch('LOGIN')}
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Đăng nhập ngay
                </button>
              </p>
            )}

            {mode === 'FORGOT_PASSWORD' && (
              <p>
                Nhớ lại mật khẩu?{' '}
                <button
                  type="button"
                  onClick={() => handleModeSwitch('LOGIN')}
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Quay lại Đăng nhập
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
