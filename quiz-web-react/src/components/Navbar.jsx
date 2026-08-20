import React from 'react';
import { Search, Star, Moon, Sun, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({
  searchTerm = '',
  setSearchTerm,
  activeCategory = 'ALL',
  onSelectCategory,
  categories = [],
  starredCount = 0,
  onOpenStarred,
  onOpenCreateSet,
  isDarkMode,
  setIsDarkMode,
  onResetDashboard,
  onOpenAuthModal,
  onOpenProfile,
  onOpenAdmin
}) {
  const { user, logout } = useAuth();
  const isAdmin = user && (user?.role === 'ADMIN' || user?.email === 'hannhu4002@gmail.com');

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-warm-border/60 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand / User 3D Glass Avatar & Facebook Link */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onResetDashboard}>
          <a
            href="https://www.facebook.com/nhu.han.3979"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="relative group block"
            title="Ghé thăm Facebook Hàn Như"
          >
            <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-amber-300 via-rose-300 to-indigo-400 shadow-soft group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <picture>
                <source srcSet="/capybara_avatar.webp?v=4" type="image/webp" />
                <img
                  src="/capybara_avatar.png?v=4"
                  alt="QuizzFlow Capybara Mascot"
                  width="40"
                  height="40"
                  className="w-full h-full object-cover rounded-full bg-white dark:bg-slate-800"
                  onError={(e) => { e.target.src = '/capybara_mascot_v10.webp'; }}
                />
              </picture>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 p-0.5 bg-blue-600 text-white rounded-full border border-white shadow-xs">
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </span>
          </a>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-100 font-sans">
                QuizzFlow
              </span>
              <span className="hidden sm:inline-block text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 tracking-wider">
                STUDY HUB
              </span>
            </div>
            <a
              href="https://hannhu.io.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Nền tảng ôn luyện và ghi nhớ tối ưu</span>
            </a>
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-warm-muted dark:text-slate-400 absolute left-3.5 top-2.5 stroke-[1.75]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm môn học, bài thi..."
              className="w-full pl-9 pr-4 py-1.5 rounded-full bg-warm-bg dark:bg-slate-800 border border-warm-border dark:border-slate-700 text-xs font-medium text-warm-text dark:text-slate-200 placeholder-warm-muted dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Right Actions & Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Create Set Button */}
          <button
            onClick={onOpenCreateSet}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
            title="Tạo bộ đề học tập mới"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Tạo bộ đề</span>
          </button>

          {/* Categorized Starred Questions Trigger */}
          <button
            onClick={onOpenStarred}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold transition-all shadow-2xs cursor-pointer"
            title="Xem danh sách câu hỏi đã lưu theo từng môn"
          >
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 stroke-[1.5]" />
            <span className="hidden sm:inline">Đã lưu</span>
            {starredCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 text-[10px] font-extrabold">
                {starredCount}
              </span>
            )}
          </button>

          {/* Admin Button (Only visible for ADMIN role or hannhu4002@gmail.com) */}
          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-extrabold transition-all cursor-pointer"
              title="Mở Trang Quản Trị Admin QuizzFlow"
            >
              <span>👑 <span className="hidden sm:inline">Quản Trị</span> Admin</span>
            </button>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1.5 sm:p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={isDarkMode ? 'Chuyển giao diện Sáng' : 'Chuyển giao diện Tối'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Auth Controls & Reputation Badge */}
          {user ? (
            <div className="flex items-center gap-1.5 sm:gap-2 pl-1 border-l border-slate-200 dark:border-slate-800">
              <div
                onClick={() => onOpenProfile && onOpenProfile()}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                title="Bấm để xem Hồ Sơ Sinh Viên"
              >
                <span className="text-slate-800 dark:text-slate-200 font-extrabold whitespace-nowrap max-w-[80px] sm:max-w-none truncate">
                  {user?.fullName || user?.email?.split('@')[0]}
                </span>
                {/* Reputation Badge */}
                <span
                  className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight inline-flex items-center gap-1 ${
                    (user?.reputation ?? 10) >= 10
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                      : (user?.reputation ?? 10) >= 0
                      ? 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border border-slate-500/30'
                      : 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30'
                  }`}
                  title="Điểm Uy Tín Tài Khoản QuizzFlow"
                >
                  {(user?.reputation ?? 10) >= 10 ? '🟢' : (user?.reputation ?? 10) >= 0 ? '⚪' : '🔴'} {(user?.reputation ?? 10) >= 0 ? `+${user?.reputation ?? 10}` : user?.reputation} <span className="hidden sm:inline">Uy tín</span>
                </span>
              </div>
              <button
                onClick={logout}
                className="px-2 sm:px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-bold transition-all cursor-pointer"
                title="Đăng xuất tài khoản"
              >
                <span className="hidden xs:inline">Đăng xuất</span>
                <span className="xs:hidden">Thoát</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 pl-1 border-l border-slate-200 dark:border-slate-800">
              <button
                onClick={() => onOpenAuthModal && onOpenAuthModal('LOGIN')}
                className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => onOpenAuthModal && onOpenAuthModal('REGISTER')}
                className="px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                Đăng ký
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Category Tabs Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 overflow-x-auto scrollbar-none flex items-center gap-2">
        <button
          onClick={() => onSelectCategory('ALL')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeCategory === 'ALL'
              ? 'bg-warm-text dark:bg-slate-100 text-white dark:text-slate-900 font-bold shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-warm-hover dark:hover:bg-slate-700 border border-warm-border dark:border-slate-700 font-semibold'
          }`}
        >
          Tất cả môn học
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === category
                ? 'bg-warm-text dark:bg-slate-100 text-white dark:text-slate-900 font-bold shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-warm-hover dark:hover:bg-slate-700 border border-warm-border dark:border-slate-700 font-semibold'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </header>
  );
}
