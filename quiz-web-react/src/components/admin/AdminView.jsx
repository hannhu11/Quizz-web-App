import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, MessageSquare, AlertTriangle, ArrowLeft, Search, Plus, Minus, Trash2, Eye, EyeOff, CheckCircle2, Lock, Crown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
  ? `${window.location.origin}/api`
  : 'http://localhost:8701/api';

const SUPER_ADMIN_EMAIL = 'hannhu4002@gmail.com';

export default function AdminView({ onBack }) {
  const { user, token } = useAuth();

  const isAuthorizedAdmin = user && (
    user.role === 'ADMIN' ||
    user.email === SUPER_ADMIN_EMAIL
  );

  const isSuperAdmin = user && user.email === SUPER_ADMIN_EMAIL;

  const [activeTab, setActiveTab] = useState('USERS'); // 'USERS' | 'COMMENTS'
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState('');

  // Fetch Users & Comments for Admin
  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const authToken = token || localStorage.getItem('quizzflow_token');
      const headers = { Authorization: `Bearer ${authToken}` };
      
      const usersRes = await fetch(`${API_BASE_URL}/admin/users`, { headers });
      const usersData = await usersRes.json();
      if (usersData.success) {
        setUsers(usersData.users || []);
      } else {
        setMsg(usersData.message || 'Bạn không có quyền xem danh sách người dùng.');
      }

      const commentsRes = await fetch(`${API_BASE_URL}/admin/comments`, { headers });
      const commentsData = await commentsRes.json();
      if (commentsData.success) {
        setComments(commentsData.comments || []);
      }
    } catch (err) {
      console.error('Fetch Admin Data Error:', err);
      setMsg('Lỗi kết nối máy chủ quản trị.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthorizedAdmin) {
      fetchAdminData();
    }
  }, [token, isAuthorizedAdmin]);

  // Adjust Reputation Handler
  const handleAdjustReputation = async (userId, delta) => {
    try {
      const authToken = token || localStorage.getItem('quizzflow_token');
      const res = await fetch(`${API_BASE_URL}/admin/users/${userId}/reputation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ delta })
      });
      const data = await res.json();
      if (data.success) {
        fetchAdminData();
      }
    } catch (e) {
      console.error('Adjust reputation error:', e);
    }
  };

  // Toggle User Role Handler (Only Super Admin can change)
  const handleToggleRole = async (targetUser) => {
    if (targetUser.email === SUPER_ADMIN_EMAIL) {
      alert('Tài khoản Chủ Sở Hữu (Super Admin) là bất khả xâm phạm!');
      return;
    }

    if (!isSuperAdmin) {
      alert('Chỉ duy nhất Chủ sở hữu hệ thống (Super Admin hannhu4002@gmail.com) mới có quyền thay đổi vai trò!');
      return;
    }

    const newRole = targetUser.role === 'ADMIN' ? 'USER' : 'ADMIN';
    try {
      const authToken = token || localStorage.getItem('quizzflow_token');
      const res = await fetch(`${API_BASE_URL}/admin/users/${targetUser.id}/role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ role: newRole })
      });
      const data = await res.json();
      if (data.success) {
        fetchAdminData();
      }
    } catch (e) {
      console.error('Toggle role error:', e);
    }
  };

  // Delete User Handler
  const handleDeleteUser = async (targetUser) => {
    if (targetUser.email === SUPER_ADMIN_EMAIL) {
      alert('Không thể xóa tài khoản Chủ Sở Hữu hệ thống!');
      return;
    }

    if (!window.confirm(`Xác nhận xóa vĩnh viễn tài khoản sinh viên "${targetUser.fullName}" (${targetUser.email}) khỏi hệ thống?`)) return;
    try {
      const authToken = token || localStorage.getItem('quizzflow_token');
      const res = await fetch(`${API_BASE_URL}/admin/users/${targetUser.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchAdminData();
      }
    } catch (e) {
      console.error('Delete user error:', e);
    }
  };

  // Toggle Comment Hide/Show Handler
  const handleToggleHideComment = async (commentId, currentIsHidden) => {
    try {
      const authToken = token || localStorage.getItem('quizzflow_token');
      const res = await fetch(`${API_BASE_URL}/admin/comments/${commentId}/moderate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ isHidden: !currentIsHidden })
      });
      const data = await res.json();
      if (data.success) {
        fetchAdminData();
      }
    } catch (e) {
      console.error('Moderate comment error:', e);
    }
  };

  // Guard: If not authorized admin, render Access Denied (after all hooks are called!)
  if (!isAuthorizedAdmin) {
    return (
      <div className="p-8 text-center space-y-4 bg-white dark:bg-slate-900 rounded-3xl border border-rose-500/30 max-w-lg mx-auto my-12 shadow-xl">
        <div className="text-5xl">🚫</div>
        <h3 className="text-lg font-extrabold text-rose-600 dark:text-rose-400">Truy Cấp Bị Từ Chối (RBAC Protected)</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Tài khoản <strong>{user?.email || 'Guest'}</strong> không có quyền truy cập trang quản trị Admin hệ thống.
        </p>
        <button
          onClick={onBack}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
        >
          Về Trang Chủ QuizzFlow
        </button>
      </div>
    );
  }

  const filteredUsers = users.filter(u =>
    (u.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Trung Tâm Quản Trị QuizzFlow
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kiểm duyệt thảo luận, quản lý tài khoản & phân quyền hệ thống chuẩn quốc tế.
            </p>
          </div>
        </div>

        {/* Super Admin Badge Banner */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-xs">
          <Crown className="w-4 h-4 text-amber-500" />
          <span>Chủ sở hữu: <strong>{SUPER_ADMIN_EMAIL}</strong></span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Tổng Sinh Viên</span>
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{users.length}</h4>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Tổng Bình Luận Thảo Luận</span>
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{comments.length}</h4>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Báo Cáo Vi Phạm</span>
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
              {comments.filter(c => c.reportCount > 0).length}
            </h4>
          </div>
          <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('USERS')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'USERS'
              ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" /> Quản Lý Sinh Viên ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('COMMENTS')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'COMMENTS'
              ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Kiểm Duyệt Thảo Luận ({comments.length})
        </button>
      </div>

      {/* Search Input for Users */}
      {activeTab === 'USERS' && (
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Tìm theo Tên hoặc Email sinh viên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 shadow-xs focus:ring-2 focus:ring-indigo-500/20 outline-none"
          />
        </div>
      )}

      {/* Users Table */}
      {activeTab === 'USERS' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-850 text-slate-500 dark:text-slate-400 uppercase font-bold border-b border-slate-200/80 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">Sinh Viên</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Điểm Uy Tín</th>
                  <th className="px-6 py-4">Vai Trò</th>
                  <th className="px-6 py-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                {filteredUsers.map((u) => {
                  const isUserSuperAdmin = u.email === SUPER_ADMIN_EMAIL;

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        {isUserSuperAdmin && <Crown className="w-3.5 h-3.5 text-amber-500" />}
                        {u.fullName}
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{u.email}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">+{u.reputation}</span>
                          <button
                            onClick={() => handleAdjustReputation(u.id, 10)}
                            className="p-1 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100 cursor-pointer"
                            title="Cộng 10 Uy tín"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleAdjustReputation(u.id, -10)}
                            className="p-1 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer"
                            title="Trừ 10 Uy tín"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {isUserSuperAdmin ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 inline-flex items-center gap-1">
                            👑 Super Admin / Chủ Sở Hữu
                          </span>
                        ) : (
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${u.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-700'}`}>
                            {u.role}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {isUserSuperAdmin ? (
                          <span className="text-[11px] font-bold text-slate-400 italic">
                            🔒 Bất khả xâm phạm
                          </span>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            {isSuperAdmin && (
                              <button
                                onClick={() => handleToggleRole(u)}
                                className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-[11px] font-bold cursor-pointer"
                              >
                                {u.role === 'ADMIN' ? 'Xuống USER' : 'Lên ADMIN'}
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteUser(u)}
                              className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600 hover:bg-rose-100 cursor-pointer"
                              title="Xóa tài khoản"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Comments Moderation Table */}
      {activeTab === 'COMMENTS' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft overflow-hidden">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {comments.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 font-semibold">Chưa có bình luận nào trên hệ thống</div>
            ) : (
              comments.map((c) => (
                <div key={c.id} className={`p-4 flex items-start justify-between gap-4 text-xs transition-colors ${c.isHidden ? 'bg-rose-50/20 dark:bg-rose-950/10' : ''}`}>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 dark:text-slate-100">{c.user?.fullName || 'Sinh Viên'}</span>
                      <span className="text-slate-400 text-[11px]">({c.user?.email})</span>
                      {c.isHidden ? (
                        <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[10px] font-extrabold border border-rose-200 dark:border-rose-800">
                          🚫 Đang ẩn khỏi sinh viên
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                          ✓ Đang hiển thị công khai
                        </span>
                      )}
                      {c.reportCount > 0 && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 text-[10px] font-extrabold inline-flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-600" /> {c.reportCount} Báo cáo vi phạm
                        </span>
                      )}
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 font-semibold">{c.content}</p>
                    <div className="text-[11px] text-slate-400 flex items-center gap-3 pt-1">
                      <span>Quiz ID: <code className="text-indigo-600 dark:text-indigo-400 font-mono">{c.quizId}</code></span>
                      <span>Điểm đánh giá: <strong>{c.score}</strong></span>
                      <span>Ngày đăng: {new Date(c.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleHideComment(c.id, c.isHidden)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer ${
                      c.isHidden
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-rose-600 hover:bg-rose-700 text-white'
                    }`}
                  >
                    {c.isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    {c.isHidden ? 'Hiện công khai lại' : 'Ẩn bình luận này'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
