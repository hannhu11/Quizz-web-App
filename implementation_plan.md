# Tái Cấu Trúc Chill Space → Floating Widgets Độc Lập (LifeAt Style)

## Bối Cảnh & Vấn Đề

Hiện tại toàn bộ Chill Space nằm trong 1 file duy nhất [`LofiAudioPlayer.jsx`](file:///C:/Users/ADMIN/Downloads/Quizzlet%20app/quiz-web-react/src/components/LofiAudioPlayer.jsx) (617 dòng) với các lỗi nghiêm trọng:

1. **Theme Mismatch**: Khung widget luôn dùng nền tối cứng (`bg-slate-900/95`) dù app đang ở Light Mode → vi phạm logic design
2. **Icon AI / rẻ tiền**: Dùng emoji (🇻🇳, ☕, 🧠, 🌧️) và icon `Sparkles` (AI-looking) thay vì vector icon chuyên nghiệp
3. **Preset hỏng**: 4 Spotify playlist không truy cập được (Piano VN, Acoustic Lofi, Deep Focus, Rainy Lofi) + YouTube Lofi Girl
4. **Không độc lập**: 3 tools (Âm Thanh, Media, Pomodoro) nhồi chung 1 panel, không thể mở/thu nhỏ riêng
5. **Ambient Sound đơn**: Chỉ phát 1 âm thanh, không trộn nhiều tiếng cùng lúc
6. **Thu nhỏ thiếu thông tin**: Mini dock không hiển thị tên album/video đang phát

---

## Proposed Changes

### Component Architecture (Tách thành 4 file)

> [!IMPORTANT]
> Thay thế 1 file `LofiAudioPlayer.jsx` bằng 4 components mới trong `src/components/chill/`

```
src/components/chill/
├── ChillDock.jsx              ← Thanh dock chính + orchestrator
├── AmbientSoundWidget.jsx     ← Widget âm thanh thiên nhiên (multi-mix)
├── MediaStreamWidget.jsx      ← Widget Spotify + YouTube  
└── PomodoroWidget.jsx         ← Widget đồng hồ Pomodoro
```

---

### [NEW] `src/components/chill/ChillDock.jsx`

**Chức năng chính:**
- Thanh dock nổi nhỏ gọn ở góc phải dưới màn hình
- 3 nút toggle: Ambient Sounds / Media Stream / Pomodoro
- Mỗi nút bật/tắt widget tương ứng **độc lập**
- Hiển thị **Mini Status Bar** khi widget đang hoạt động nhưng đã thu nhỏ:
  - Spotify đang phát → hiện tên playlist + nút pause
  - YouTube đang phát → hiện "YouTube" + nút pause  
  - Ambient sounds đang bật → hiện tên tiếng (VD: "Mưa + Cà phê")
  - Pomodoro đang chạy → hiện countdown `24:59`
- **Theme-aware**: Dùng `dark:` variants → Light mode = nền trắng glass, Dark mode = nền tối glass
- Icon: 100% Lucide React SVG (`Volume2`, `Radio`, `Timer`, `Music`, `X`)

**Thiết kế:**
- Light mode: `bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-lg`
- Dark mode: `dark:bg-slate-900/90 dark:border-slate-700/60`
- Bo góc: `rounded-2xl`
- Animate: `framer-motion` cho expand/collapse mượt

---

### [NEW] `src/components/chill/AmbientSoundWidget.jsx`

**Chức năng chính:**
- Floating widget độc lập, có thể mở/thu nhỏ riêng
- **Multi-sound mixing**: Phát nhiều âm thanh cùng lúc (dùng nhiều `<audio>` elements)
- Mỗi âm thanh có: toggle on/off + volume slider riêng
- 8 ambient sounds (mở rộng từ 4 hiện tại):

| # | Tên | Icon (Lucide) | Source |
|---|-----|---------------|--------|
| 1 | Mưa Rơi | `CloudRain` | Pixabay CDN |
| 2 | Quán Cà Phê | `Coffee` | Pixabay CDN |
| 3 | Sóng Biển | `Waves` | Pixabay CDN |
| 4 | Lửa Trại | `Flame` | Pixabay CDN |
| 5 | Gió Thổi | `Wind` | Pixabay CDN |
| 6 | Đêm Rừng | `TreePine` | Pixabay CDN |
| 7 | Tiếng Chim | `Bird` | Pixabay CDN |
| 8 | Sấm Nhẹ | `CloudLightning` | Pixabay CDN |

- Master volume slider ở header
- **DOM Retention**: Khi thu nhỏ, `<audio>` elements vẫn giữ trong DOM → âm thanh không bị ngắt
- Thu nhỏ = hiện mini bar: "Mưa + Cà phê ☁️" + nút phóng to

**Thiết kế:**
- Light: `bg-white/90 backdrop-blur-xl border-slate-200/60 shadow-xl`
- Dark: `dark:bg-slate-900/90 dark:border-slate-700/60`
- Header: Drag handle + Title + Minimize/Close buttons
- Width: `w-80` (320px) cho gọn nhẹ
- Rounded: `rounded-2xl`

---

### [NEW] `src/components/chill/MediaStreamWidget.jsx`

**Chức năng chính:**
- Floating widget độc lập cho Spotify & YouTube
- 2 sub-tabs: Spotify / YouTube

**Spotify tab:**
- **Xóa**: Piano VN, Acoustic Lofi, Deep Focus, Rainy Lofi Vibes  
- **Giữ**: Myy Happyyy (Hàn Như) - `playlist/43OQrrLcyzbUR1oL0r2RZO`
- **Thêm 2 playlist mới** (user cung cấp):
  - `playlist/2cIuTzSPlELxZ07giRKmP3`
  - `playlist/5SB9FzK07VsvJv0J46FlqP`
- iframe height = `352px` (full tracklist)
- Custom URL input để dán link Spotify bất kỳ
- Nút mở app Spotify

**YouTube tab:**
- **Xóa**: Lofi Girl Live 24/7
- **Giữ**: Chillhop Radio, Synthwave Chill
- Custom URL input để dán link YouTube bất kỳ
- URL parser hỗ trợ: `youtu.be/`, `watch?v=`, `embed/`, raw 11-char ID

**DOM Retention**: Khi thu nhỏ, iframe vẫn trong DOM → nhạc không bị ngắt  
**Mini bar**: Hiện "Spotify" hoặc "YouTube" + nút phóng to

**Thiết kế:**
- Giống AmbientSoundWidget (theme-aware glassmorphism)
- Width: `w-96` (384px) cho iframe Spotify vừa đẹp

---

### [NEW] `src/components/chill/PomodoroWidget.jsx`

**Chức năng chính:**
- Floating widget Pomodoro chuẩn LifeAt style
- 3 chế độ: `Pomodoro (25m)` | `Short Break (5m)` | `Long Break (15m)`
- Font số lớn sắc nét: `font-mono text-5xl font-extrabold tabular-nums`
- Nút START / PAUSE / RESET
- **Alarm sound**: Dùng Web Audio API (oscillator sine wave) thay vì external CDN + browser `alert()`
- Tự động chuyển mode khi hết giờ

**Mini bar**: Hiện countdown realtime `24:59` + nút pause

**Thiết kế:**
- Light: Nền trắng glass, chữ đen đậm
- Dark: Nền tối glass, chữ trắng
- Width: `w-80` (320px)
- Rounded: `rounded-2xl`
- Mode buttons: Subtle, không dùng màu quá chói

---

### [MODIFY] [`App.jsx`](file:///C:/Users/ADMIN/Downloads/Quizzlet%20app/quiz-web-react/src/App.jsx)

- Thay `import LofiAudioPlayer` → `import ChillDock` 
- Thay `<LofiAudioPlayer />` → `<ChillDock />`
- Không thay đổi gì khác

---

### [DELETE] `src/components/LofiAudioPlayer.jsx`

File cũ 617 dòng sẽ bị thay thế hoàn toàn bởi 4 file mới trong `chill/`.

---

### [MODIFY] [`index.css`](file:///C:/Users/ADMIN/Downloads/Quizzlet%20app/quiz-web-react/src/index.css)

- Thêm CSS cho custom range slider (volume) theme-aware
- Thêm animation keyframes cho equalizer bars
- Thêm scrollbar-none utility class

---

## Design Rules (Từ Reference Folders)

Áp dụng nghiêm ngặt từ `impeccable-main`, `ui-ux-pro-max-skill-main`, `awesome-cursorrules-main`:

| Rule | Implementation |
|------|---------------|
| ❌ No emojis as icons | 100% Lucide React SVG |
| ❌ No pure black `#000` | Dùng `slate-900`, `slate-950` (tinted black) |
| ❌ No AI slop (Sparkles, neon glow) | Header icon = `Music` hoặc `Headphones` |
| ❌ No dark widget on light page | Dùng `dark:` Tailwind variants |
| ✅ WCAG contrast 4.5:1 | `text-slate-800` on light, `text-slate-100` on dark |
| ✅ Hover states 150-300ms | `transition-all duration-200` |
| ✅ Touch targets 44×44px | Buttons `min-w-[44px] min-h-[44px]` |
| ✅ `prefers-reduced-motion` | Wrap animations in media query |
| ✅ Lucide icons 20-24px | `className="w-5 h-5"` consistently |

---

## Strict Guardrails — KHÔNG THAY ĐỔI

- Danh sách bộ đề & Bộ lọc môn học
- Tạo bộ đề mới (Create set)
- Lật thẻ 3D (Flashcards)
- Luyện tập trắc nghiệm (Practice mode)
- Thi thử (Exam setup)
- Danh sách thuật ngữ & câu hỏi (Terms list)
- Câu hỏi đã lưu (Starred items)
- Navbar, SubjectCard, và tất cả các component khác

---

## Verification Plan

### Automated Tests
```bash
npm run build
```
Build thành công = không có lỗi syntax/import.

### Manual Verification
1. Light Mode: Widget hiển thị nền sáng glass, chữ đen rõ → ✅ Theme harmony
2. Dark Mode: Widget hiển thị nền tối glass, chữ trắng rõ → ✅ Theme harmony  
3. Bật Ambient Sound → Thu nhỏ → Âm thanh vẫn phát → ✅ DOM Retention
4. Bật Spotify → Thu nhỏ → Nhạc vẫn phát, mini bar hiện playlist → ✅
5. Bật Pomodoro → Thu nhỏ → Countdown vẫn chạy trên mini bar → ✅
6. 3 widget mở cùng lúc → Không xung đột → ✅ Independent
7. Flashcard, Practice, Exam vẫn hoạt động → ✅ No regression

### Deployment
```bash
npm run build
# SCP dist lên VPS 140.245.119.189
# Restart PM2
git add . && git commit -m "refactor(chill): independent floating widgets, theme-aware, no AI icons" && git push origin main
```

---

## Lưu Ý Kỹ Thuật & Edge Cases

### 1. Quản Lý Z-Index & Drag Boundary

| Element | Z-Index | Lý do |
|---------|---------|-------|
| Navbar | `z-30` | Thanh điều hướng chính |
| 3D Flashcard | `z-20` | Lật thẻ 3D perspective |
| Widget Panels | `z-40` | Nổi trên content nhưng dưới dock |
| ChillDock Bar | `z-50` | Luôn ở trên cùng |
| Modal/Overlay | `z-[60]` | Cao nhất |

### 2. Audio Coexistence
- Ambient Sounds default volume `0.5` (50%) — không lấn áp Spotify/YouTube
- Master volume default `0.8` (80%)
- Nhiều ambient + Spotify phát đồng thời = sound mixing chuẩn LifeAt

### 3. CDN Fallback
- Giai đoạn 1: Pixabay CDN trực tiếp
- Giai đoạn 2: Self-host `public/audio/` (compress < 500KB/file)

### 4. Browser Autoplay
- `audioEl.play().catch()` xử lý lỗi im lặng
- Web Audio API alarm cần ít nhất 1 user click trước

---

## Quy Tắc Thiết Kế Chuyên Nghiệp

### A. Icon — TUYỆT ĐỐI TUÂN THỦ

| ✅ ĐÚNG | ❌ SAI |
|---------|-------|
| Lucide React SVG | Emoji Unicode (🎵, ☕, 🧠) |
| Custom SVG chuyên nghiệp (Spotify logo) | Icon PNG/JPG từ Google/Facebook |
| Monochrome outline style đồng bộ | Mixed style filled+outline lẫn lộn |

1. **Một bộ icon duy nhất** — Chỉ Lucide React. Không trộn thư viện.
2. **Kích thước nhất quán** — Header `w-5 h-5`, inline `w-4 h-4`.
3. **Emoji chỉ trong content** — KHÔNG BAO GIỜ làm button/tab/status icon.

### B. Màu Sắc & Theme
1. Không `#000000` — dùng `slate-900/950`
2. Accent: Amber (Sounds), Emerald (Media), Rose (Pomodoro)
3. Dark mode rebuild, không invert

### C. Animation
1. 150-200ms hover, 200-300ms panel. KHÔNG bounce/elastic
2. GPU-only: `transform` + `opacity`
3. `prefers-reduced-motion` compliance

### D. Glassmorphism
1. `backdrop-blur-xl`, `bg-white/90` light, `dark:bg-slate-900/90` dark
2. WCAG AA 4.5:1 contrast trên glass surface
3. Chỉ dùng cho floating overlay, không cho inline cards

