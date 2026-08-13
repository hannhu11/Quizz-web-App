import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, ShieldCheck, Award, Star, MessageSquare, Calendar, Key, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getStarredQuestions } from '../../data/quizDataLoader';

export default function ProfileModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('INFO'); // 'INFO' | 'SECURITY'
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !user) return null;

  const starredCount = getStarredQuestions().length;
  const isGoogleAccount = user.authProvider === 'GOOGLE' || (Boolean(user.googleId) && !user.hasPassword);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    if (newPassword.length < 8) {
      setMsg({ type: 'error', text: 'Mật khẩu mới phải có độ dài tối thiểu 8 ký tự.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMsg({ type: 'error', text: 'Mật khẩu nhập lại không khớp.' });
      return;
    }

    setIsSubmitting(true);
    try {
      // Endpoint for password update
      const res = await fetch('/api/auth/me/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('quizzflow_token')}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (data.success) {
        setMsg({ type: 'success', text: 'Đổi mật khẩu thành công!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMsg({ type: 'error', text: data.message || 'Lỗi đổi mật khẩu.' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Không thể kết nối máy chủ.' });
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
          className="relative w-full max-w-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Profile Header */}
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="relative w-16 h-16 rounded-2xl bg-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md overflow-hidden shrink-0">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full object-cover" />
              ) : (
                <span>{(user.fullName || user.email || 'S').charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  {user.fullName || 'Sinh Viên QuizzFlow'}
                </h3>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                    user.reputation >= 10
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                      : user.reputation >= 0
                      ? 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border border-slate-500/30'
                      : 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {user.reputation >= 10 ? '🟢' : user.reputation >= 0 ? '⚪' : '🔴'} +{user.reputation} Uy tín
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> {user.email}
              </p>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex items-center gap-2 pt-4 pb-2">
            <button
              onClick={() => setActiveTab('INFO')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'INFO'
                  ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Hồ Sơ & Thống Kê
            </button>
            <button
              onClick={() => setActiveTab('SECURITY')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'SECURITY'
                  ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Bảo Mật & Mật Khẩu
            </button>
          </div>

          {/* Tab Content: Info */}
          {activeTab === 'INFO' && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    <Star className="w-4 h-4 text-amber-500" /> Câu hỏi đã lưu
                  </div>
                  <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{starredCount} câu</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-indigo-500" /> Loại tài khoản
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100 truncate">
                    {user.role === 'ADMIN' ? '👑 Quản Trị Viên' : isGoogleAccount ? '🌐 Google Verified' : '🎓 Sinh viên FPT'}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-emerald-500" /> Điểm Uy Tín Học Thuật:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">+{user.reputation} điểm</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-indigo-500" /> Ngày gia nhập:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : '13/08/2026'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Security */}
          {activeTab === 'SECURITY' && (
            <div className="space-y-4 pt-2">
              {isGoogleAccount ? (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Đã xác thực qua Google OAuth</div>
                    <p className="mt-1 text-[11px] opacity-90">
                      Tài khoản của bạn đăng nhập an toàn thông qua Google. Bạn không cần đặt mật khẩu riêng.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-3">
                  {msg.text && (
                    <div className={`p-3 rounded-xl text-xs font-semibold ${msg.type === 'error' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {msg.text}
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mật khẩu hiện tại</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mật khẩu mới</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nhập lại mật khẩu mới</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    {isSubmitting ? 'Đang cập nhật...' : 'Lưu mật khẩu mới'}
                  </button>
                </form>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
