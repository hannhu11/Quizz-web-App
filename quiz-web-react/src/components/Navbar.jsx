import React from 'react';
import { Search, Star, Moon, Sun, Plus } from 'lucide-react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  activeCategory,
  onSelectCategory,
  categories,
  starredCount,
  onOpenStarred,
  onOpenCreateSet,
  isDarkMode,
  setIsDarkMode,
  onResetDashboard
}) {
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
              <img
                src="/user-avatar.png"
                alt="Hàn Như Avatar"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => { e.target.src = '/vite.svg'; }}
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 p-0.5 bg-blue-600 text-white rounded-full border border-white shadow-xs">
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </span>
          </a>

          <div>
            <h1 className="text-sm sm:text-lg font-extrabold tracking-tight text-warm-text dark:text-slate-100 flex items-center gap-1.5 whitespace-nowrap">
              QuizzFlow <span className="text-[10px] sm:text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-100/90 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 whitespace-nowrap">STUDY HUB</span>
            </h1>
            <p className="text-[11px] text-warm-muted dark:text-slate-400 hidden sm:block">Không gian ôn luyện & học tập tối giản</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-muted dark:text-slate-400" />
            <input
              type="text"
              placeholder="Tìm môn học, bài thi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-white/90 dark:bg-slate-800 border border-warm-border/80 dark:border-slate-700 text-warm-text dark:text-slate-100 placeholder:text-warm-muted dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-warm-slate/30 dark:focus:ring-slate-600 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Create New Set Button */}
          <button
            onClick={onOpenCreateSet}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs active:scale-95"
            title="Tạo bộ đề Flashcard mới"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">Tạo bộ đề</span>
          </button>

          {/* Starred Questions Button */}
          <button
            onClick={onOpenStarred}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 text-xs font-semibold transition-all shadow-xs active:scale-95"
            title="Danh sách câu hỏi đã lưu"
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span className="hidden md:inline">Đã lưu</span>
            {starredCount > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[10px] font-bold">
                {starredCount}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-muted dark:text-slate-300 hover:text-warm-text transition-all active:scale-95"
            title="Đổi giao diện Sáng / Tối"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Category Tabs Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 overflow-x-auto scrollbar-none flex items-center gap-2">
        <button
          onClick={() => onSelectCategory('ALL')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            activeCategory === 'ALL'
              ? 'bg-warm-text dark:bg-slate-100 text-white dark:text-slate-900 font-bold shadow-xs'
              : 'bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 text-warm-muted dark:text-slate-300 hover:text-warm-text border border-warm-border/60 dark:border-slate-700'
          }`}
        >
          Tất cả môn học
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeCategory === category
                ? 'bg-warm-text dark:bg-slate-100 text-white dark:text-slate-900 font-bold shadow-xs'
                : 'bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 text-warm-muted dark:text-slate-300 hover:text-warm-text border border-warm-border/60 dark:border-slate-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </header>
  );
}
