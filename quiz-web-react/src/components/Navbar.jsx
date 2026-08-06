import React, { useState } from 'react';
import { Search, Star, Moon, Sun, Image as ImageIcon, User, Share2 } from 'lucide-react';

export const WALLPAPERS = [
  { id: 'none', name: 'Tối Giản Ấm Áp', bgClass: 'bg-warm-bg', overlay: '', url: '' },
  { id: 'switzerland', name: '🏔️ Thụy Sĩ (Swiss Alps)', url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1920&q=80', overlay: 'bg-slate-900/40 backdrop-blur-[2px]' },
  { id: 'sweden', name: '🌲 Thụy Điển (Sweden Forest)', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80', overlay: 'bg-slate-900/35 backdrop-blur-[2px]' },
  { id: 'rain', name: '🌧️ Mưa Rơi Bên Cửa Sổ', url: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1920&q=80', overlay: 'bg-slate-950/45 backdrop-blur-[3px]' },
  { id: 'kyoto', name: '⛩️ Kyoto Chiều Tà', url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80', overlay: 'bg-slate-900/40 backdrop-blur-[2px]' },
];

export default function Navbar({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
  categories,
  starredCount,
  onOpenStarred,
  isDarkMode,
  setIsDarkMode,
  currentWallpaper,
  setCurrentWallpaper
}) {
  const [showBgDropdown, setShowBgDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-warm-border/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand / User Avatar Logo with Facebook link */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.facebook.com/nhu.han.3979"
            target="_blank"
            rel="noopener noreferrer"
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
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-warm-text flex items-center gap-2">
              Quizzlet <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100/90 text-amber-900 border border-amber-200">Hàn Như</span>
            </h1>
            <p className="text-[11px] text-warm-muted hidden sm:block">Góc học tập & ôn thi nhẹ nhàng</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-muted" />
            <input
              type="text"
              placeholder="Tìm môn học, bài thi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-white/90 border border-warm-border/80 text-warm-text placeholder:text-warm-muted focus:outline-none focus:ring-2 focus:ring-warm-slate/30 focus:border-warm-slate transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Wallpaper Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowBgDropdown(!showBgDropdown)}
              className="p-2 rounded-full hover:bg-warm-hover text-warm-muted hover:text-warm-text transition-all active:scale-95 flex items-center gap-1"
              title="Đổi khung cảnh nền Chill"
            >
              <ImageIcon className="w-4 h-4 text-warm-slate" />
            </button>

            {showBgDropdown && (
              <div className="absolute right-0 top-11 w-52 bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-warm-border shadow-soft-lg z-50 text-xs space-y-1">
                <div className="font-bold text-warm-muted px-2 py-1 border-b border-warm-border/40">Khung Cảnh Nền</div>
                {WALLPAPERS.map((wp) => (
                  <button
                    key={wp.id}
                    onClick={() => { setCurrentWallpaper(wp); setShowBgDropdown(false); }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl transition-all ${
                      currentWallpaper.id === wp.id ? 'bg-amber-100 text-amber-900 font-bold' : 'hover:bg-warm-hover text-warm-text'
                    }`}
                  >
                    {wp.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Starred Questions Button */}
          <button
            onClick={onOpenStarred}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 text-xs font-semibold transition-all shadow-xs active:scale-95"
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
            className="p-2 rounded-full hover:bg-warm-hover text-warm-muted hover:text-warm-text transition-all active:scale-95"
            title="Đổi giao diện Sáng / Tối"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Category Tabs Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 overflow-x-auto scrollbar-none flex items-center gap-2">
        <button
          onClick={() => setActiveCategory('ALL')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            activeCategory === 'ALL'
              ? 'bg-warm-text text-white shadow-xs'
              : 'bg-white/70 hover:bg-white text-warm-muted hover:text-warm-text border border-warm-border/60'
          }`}
        >
          Tất cả môn học
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-warm-slate text-white shadow-xs'
                : 'bg-white/70 hover:bg-white text-warm-muted hover:text-warm-text border border-warm-border/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </header>
  );
}
