import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, MessageSquare, AlertTriangle, ArrowLeft, Search, Plus, Minus, Trash2, Eye, EyeOff, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
  ? `${window.location.origin}/api`
  : 'http://localhost:8701/api';

export default function AdminView({ onBack }) {
  const { user, token } = useAuth();
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
      const headers = { Authorization: `Bearer ${token || localStorage.getItem('quizzflow_token')}` };
      
      const usersRes = await fetch(`${API_BASE_URL}/admin/users`, { headers });
      const usersData = await usersRes.json();
      if (usersData.success) {
        setUsers(usersData.users || []);
      }

      const commentsRes = await fetch(`${API_BASE_URL}/admin/comments`, { headers });
      const commentsData = await commentsRes.json();
      if (commentsData.success) {
        setComments(commentsData.comments || []);
      }
    } catch (err) {
      console.error('Fetch Admin Data Error:', err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAdminData();
  }, [token]);

  // Adjust Reputation Handler
  const handleAdjustReputation = async (userId, delta) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users/${userId}/reputation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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

  // Toggle User Role Handler
  const handleToggleRole = async (userId, currentRole) => {
    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users/${userId}/role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Xác nhận xóa tài khoản người dùng này khỏi hệ thống?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
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
      const res = await fetch(`${API_BASE_URL}/admin/comments/${commentId}/moderate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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

  const filteredUsers = users.filter(u =>
    (u.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-full shadow-xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Về Trang Chủ
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
            <Lock className="w-3.5 h-3.5" /> Quản Trị Hệ Thống QuizzFlow (RBAC Protected)
          </span>
        </div>
      </div>

      {/* Metrics Banner */}
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
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all ${
            activeTab === 'USERS'
              ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" /> Quản Lý Sinh Viên ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('COMMENTS')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all ${
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
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 shadow-xs focus:ring-2 focus:ring-indigo-500/20 outline-none"
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
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">{u.fullName}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{u.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">+{u.reputation}</span>
                        <button
                          onClick={() => handleAdjustReputation(u.id, 10)}
                          className="p-1 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                          title="Cộng 10 Uy tín"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleAdjustReputation(u.id, -10)}
                          className="p-1 rounded bg-rose-50 text-rose-600 hover:bg-rose-100"
                          title="Trừ 10 Uy tín"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${u.role === 'ADMIN' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleRole(u.id, u.role)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-[11px] font-bold"
                        >
                          {u.role === 'ADMIN' ? 'Xuống USER' : 'Lên ADMIN'}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600 hover:bg-rose-100"
                          title="Xóa tài khoản"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
                <div key={c.id} className="p-4 flex items-start justify-between gap-4 text-xs">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-slate-100">{c.user?.fullName || 'Sinh Viên'}</span>
                      <span className="text-slate-400">({c.user?.email})</span>
                      {c.isHidden && (
                        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">Đã ẩn</span>
                      )}
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 font-semibold">{c.content}</p>
                    <div className="text-[11px] text-slate-400 flex items-center gap-3 pt-1">
                      <span>Quiz: {c.quizId}</span>
                      <span>Báo cáo: {c.reportCount}</span>
                      <span>Điểm: {c.score}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleHideComment(c.id, c.isHidden)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                      c.isHidden
                        ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                    }`}
                  >
                    {c.isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    {c.isHidden ? 'Hiện lại' : 'Ẩn bình luận'}
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
