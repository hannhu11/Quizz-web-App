# AI Memory & Architectural Log - Quizzlet App (Hàn Như)

Tài liệu này lưu trữ toàn bộ lịch sử phát hiện lỗi, kiến trúc hạ tầng, quy tắc logic và quy trình vận hành của dự án Quizzlet App. Mọi AI Agent làm việc sau này **BẮT BUỘC** phải tham chiếu tài liệu này trước khi chỉnh sửa hệ thống.

---

## 1. Thông Tin Hạ Tầng & Production (Single Source of Truth)

- **Domain Production**: `https://hannhu.io.vn/`
- **Repository GitHub**: `https://github.com/hannhu11/Quizz-web-App.git` (Branch: `main`)
- **VPS Oracle IP**: `140.245.119.189` (OS: Ubuntu)
- **SSH Credentials (Local)**:
  - Key path: `C:\Users\ADMIN\Downloads\Open-claw\ssh-key-2026-03-01.key`
  - User: `ubuntu`
  - Lệnh SSH: `ssh -i "C:\Users\ADMIN\Downloads\Open-claw\ssh-key-2026-03-01.key" ubuntu@140.245.119.189`
- **Cấu Trúc Thư Mục VPS**:
  - Web Production Path: `/var/www/quiz-app/web/` và `/home/ubuntu/quizlet-app/web_dist/`
  - Backend Server Path: `/home/ubuntu/quizlet-app/server/server.js` (Port 8701)
  - Process Manager: PM2 (Process name: `quizlet-app`)
  - Nginx Host Config: `/home/ubuntu/hannhu.io.vn.conf`

---

## 2. Phát Hiện Lỗi Gốc & Cách Khắc Phục (Diagnostic Findings)

### 🐛 1. Lỗi Đồng Bộ Đề Giữa Các Tab Ẩn Danh (Real-time Sync Bug)
- **Nguyên nhân gốc rễ**: 
  1. Trên VPS, một tiến trình Node.js ngầm (`PID 1400122`) đã chiếm cổng `8701` bên ngoài PM2, khiến PM2 bị lỗi `errored` và không thể khởi chạy API backend đúng cách. Kết quả là API `/api/quizzes` bị trả về 404 / HTML.
  2. Ở môi trường local, `vite.config.js` thiếu cấu hình `server.proxy` về cổng `8701`.
  3. Frontend `quizDataLoader.js` khi bị lỗi fetch API đã âm thầm nhảy vào `catch` và lưu ngầm vào `LocalStorage`. Vì LocalStorage của 2 tab ẩn danh độc lập hoàn toàn, nên Tab B không thể thấy bộ đề Tab A vừa tạo.
- **Cách đã khắc phục**:
  1. Kill tiến trình rác trên VPS và khởi chạy lại chuẩn qua PM2: `pm2 start /home/ubuntu/quizlet-app/server/server.js --name quizlet-app --force`.
  2. Cấu hình Proxy trong `quiz-web-react/vite.config.js`:
     ```javascript
     server: {
       proxy: {
         '/api': {
           target: 'http://localhost:8701',
           changeOrigin: true
         }
       }
     }
     ```
  3. Cập nhật `createCustomQuizSet` trong `quizDataLoader.js` để quăng lỗi (throw Error) và cảnh báo người dùng khi API sập, loại bỏ việc âm thầm lưu ảo vào LocalStorage.

### 🔑 2. Mật Khẩu Quản Lý Bộ Đề & Admin Master Key (`nhu`)
- **Yêu cầu khắt khe**:
  1. Người dùng khi tạo bộ đề bắt buộc phải nhập mật khẩu riêng (đã xóa bỏ hoàn toàn việc tự gán mặc định là `1`).
  2. Admin Master Key: Chuỗi `nhu` được hardcode cả ở Backend (`server.js`) và Frontend (`quizDataLoader.js`).
  3. Khi nhập mật khẩu `nhu` ở modal Sửa/Xóa, hệ thống sẽ tự động bypass (bỏ qua) mật khẩu gốc của người dùng và cho phép Admin can thiệp lập tức.
- **Lỗi kẹt thông báo sai mật khẩu**:
  - Đã sửa `PasswordModal.jsx`: Reset toàn bộ state `password` và `errorMsg` trong `useEffect` mỗi khi prop `isOpen` thay đổi.

### 🎨 3. Giao Diện & Trải Nghiệm (UI/UX)
- **Hover Thẻ Bộ Đề**: Đã kích hoạt class `hover:-translate-y-2 hover:shadow-xl transition-all duration-300` trong `SubjectCard.jsx` giúp thẻ nổi mượt mà khi di chuột vào.
- **Terms in this set**: Giữ nguyên danh sách lựa chọn trắc nghiệm A, B, C, D dưới mỗi thuật ngữ theo đúng yêu cầu hiển thị.
- **Studying Progress & Search Bar**: Bổ sung thanh tiến độ học (KNOWT style) và thanh tìm kiếm từ vựng tiếng Việt trong `QuizDetailView.jsx`.

### 🌙 4. Khắc Phục Lỗi Dark Mode & Đổi Mới Banner / Chill Widget
- **Khắc phục lỗi Dark Mode toàn hệ thống**: 
  - Trong `App.jsx`, thêm `useEffect` đồng bộ `isDarkMode` state trực tiếp lên `document.documentElement.classList.toggle('dark', isDarkMode)` để tất cả component, modal, portal đều nhận Dark Mode.
  - Trong `index.css`, thêm directive `@custom-variant dark (&:where(.dark, .dark *));` của Tailwind v4 và style `html.dark body { background-color: #020617; color: #f8fafc; }`.
- **Thiết kế lại Hero Banner & Slogan**:
  - Tiêu đề chính: *"Thư Thái Ghi Nhớ • Bứt Phá Điểm Số"*.
  - Mô tả: *"Ghi nhớ Flashcard 3D, luyện tập trắc nghiệm thông minh, kết hợp nhạc Lofi thư giãn giúp tăng 200% độ tập trung."*
  - Gradient sáng: `from-amber-50 via-rose-50 to-orange-50`.
  - Gradient tối: `dark:from-slate-900 dark:via-indigo-950/50 dark:to-slate-900`.
### 🎧 5. Tái Cấu Trúc Chill Widget Theo Phong Cách LifeAt & imissmycafe
- **Giải quyết dứt điểm lỗi dừng nhạc khi thu nhỏ (DOM Retention)**: 
  - Thay vì unmount React tree khi thu nhỏ, giữ lại `<audio>` và `<iframe>` liên tục trong DOM bằng CSS transition/visibility. Nhạc và livestream vẫn phát mượt mà ở background kể cả khi thu nhỏ widget.
- **Mở rộng Spotify Player lên 352px chuẩn**:
  - Đưa chiều cao Iframe Spotify từ 152px lên **352px** chuẩn theo template imissmycafe. Hiển thị đầy đủ ảnh bìa album, controls, thanh tiến trình và danh sách phát cuộn dọc (*💖 Myy Happyyy* `43OQrrLcyzbUR1oL0r2RZO`), loại bỏ hoàn toàn lỗi chìm chữ/ép khung/Page Not Found.
- **Floating Dock & Pomodoro Timer kiểu LifeAt**:
  - Thanh công cụ nổi LifeAt Floating Dock với các icon rõ nét (`Âm thanh`, `Media Stream`, `Pomodoro`).
  - Đồng hồ Pomodoro 3 chế độ (*Học 25m*, *Nghỉ 5m*, *Nghỉ dài 15m*) font chữ số điện tử cực nét `text-[5xl] font-mono`.

---

## 3. Quy Trình Build & Deploy VPS Chuẩn (Standard Operating Procedure)

Khi có bất kỳ thay đổi nào ở Frontend hoặc Backend, thực hiện đúng 4 bước sau:

```powershell
# BƯỚC 1: Build React App ở Local
cd "C:\Users\ADMIN\Downloads\Quizzlet app\quiz-web-react"
npm run build

# BƯỚC 2: Đóng Gói Thành File Nén
cd "C:\Users\ADMIN\Downloads\Quizzlet app"
tar -czf scratch/react_web_dist.tar.gz -C quiz-web-react/dist .

# BƯỚC 3: Upload Sang VPS via SCP
scp -i "C:\Users\ADMIN\Downloads\Open-claw\ssh-key-2026-03-01.key" scratch/react_web_dist.tar.gz ubuntu@140.245.119.189:/home/ubuntu/quizlet-app/react_web_dist.tar.gz

# BƯỚC 4: Giải Nén & Restart PM2 Trên VPS via SSH
ssh -i "C:\Users\ADMIN\Downloads\Open-claw\ssh-key-2026-03-01.key" ubuntu@140.245.119.189 "mkdir -p /home/ubuntu/quizlet-app/web_dist && rm -rf /home/ubuntu/quizlet-app/web_dist/* && tar -xzf /home/ubuntu/quizlet-app/react_web_dist.tar.gz -C /home/ubuntu/quizlet-app/web_dist/ && sudo mkdir -p /var/www/quiz-app/web && sudo rm -rf /var/www/quiz-app/web/* && sudo cp -r /home/ubuntu/quizlet-app/web_dist/* /var/www/quiz-app/web/ && cd /home/ubuntu/quizlet-app/server && pm2 restart quizlet-app"
```

---

## 4. Quy Chuẩn Commit & Push GitHub (Strict Security Exclusions)

Trước khi commit, luôn đảm bảo các file nhạy cảm không bị push lên repository công khai:
- **File bị cấm push**: `*.key`, `*.pem`, `*.pub`, `ssh-key*`, `.env`, `DEPLOY_GITHUB_VPS_GUIDE.md`, `scratch/`.
- **Lệnh commit & push**:
  ```powershell
  cd "C:\Users\ADMIN\Downloads\Quizzlet app"
  git status --short
  git add quiz-web-react/ .agents/ .gitignore
  git commit -m "mô tả thay đổi bằng tiếng Việt"
  git push origin main
  ```

### 🪟 6. Refactor Chill Space Độc Lập (Floating Widgets - LifeAt Style)
- Tách `LofiAudioPlayer.jsx` thành kiến trúc 4 file: `ChillDock.jsx`, `AmbientSoundWidget.jsx`, `MediaStreamWidget.jsx`, `PomodoroWidget.jsx` bên trong thư mục `src/components/chill/`.
- Xóa bỏ tất cả các Emoji rẻ tiền (🇻🇳, ☕, 🧠, 🌧️) và sử dụng hoàn toàn SVG của thư viện **Lucide-React** để mang lại UI/UX chuẩn, sang trọng. 
- Giữ nguyên trạng thái Audio & Iframe (DOM retention) bằng CSS `display: flex / none` thay vì unmount Component hoặc dùng `-top-[9999px]`.
- Tích hợp `framer-motion` cho phép kéo thả (drag) các widget tự do trên màn hình (loại bỏ thuộc tính `layout` để chống giật/rung).
- Các widgets hỗ trợ Dark/Light Theme hoàn hảo (dùng `bg-white/95 dark:bg-slate-900/95` backdrop blur glassmorphism).

---

## 5. Quy Tắc Bắt Buộc 3 Thành Phần Cho Tất Cả Dữ Liệu JSON (Strict System Rule)

Từ thời điểm này trở đi, **TẤT CẢ** các bộ đề Quiz / Flashcard JSON được khởi tạo, cào về hoặc gửi xuống hệ thống **BẮT BUỘC** phải tuân thủ nghiêm ngặt **Quy tắc 3 Thành Phần**:

1. **Câu hỏi & Các Lựa chọn (Question & Options):**
   - Trường `content`: Chứa nội dung câu hỏi đầy đủ.
   - Mảng `answers`: Danh sách các lựa chọn trắc nghiệm, mỗi lựa chọn gồm `id`, `content`, và `isCorrect` (boolean).
2. **Đáp án đúng (Correct Answer):**
   - Phải gán `isCorrect: true` chính xác cho đáp án chuẩn.
3. **Giải thích chi tiết (Detailed Explanation):**
   - Trường `explanation` **KHÔNG ĐƯỢC** chỉ ghi đơn thuần "Đáp án đúng là A/B/C/D" hoặc "Đáp án đúng: A".
   - **BẮT BUỘC** phải chứa đoạn văn giải thích bối cảnh lịch sử/chuyên môn, mốc thời gian, ý nghĩa nghị quyết/sự kiện hoặc cơ sở lý luận chi tiết giải thích TẠI SAO đáp án đó lại đúng.

### 📚 Cập Nhật 6 Bộ Đề Flashcard Crawl & Quy Tắc Xóa Watermark Thương Hiệu:
- **Xóa bỏ 100% Watermark Thương hiệu:** Đã tự động lọc sạch các chuỗi đóng dấu thương hiệu bên thứ ba như `(Trích xuất từ Flashcard FBOX ...)` trong toàn bộ nội dung giải thích.
- **Bổ sung Lời giải thích chuyên môn sâu cho 6 bộ đề (Tổng cộng 1,470 câu):**
  1. `ENW493c - Academic Writing` (90 câu): Giải thích cấu trúc đoạn văn, Thesis Statement, Topic Sentence, Citation APA/MLA, Cohesion, Paraphrasing.
  2. `WDU202c - Web Design & UI/UX` (200 câu): Giải thích HTML5 Semantic, CSS Flexbox/Grid, Responsive Design, UI Contrast/Typography, UX Wireframe/Prototype.
  3. `MLN131 - Chủ Nghĩa Xã Hội Khoa Học` (360 câu): Giải thích Sứ mệnh giai cấp công nhân, Thời kỳ quá độ, Dân chủ & Nhà nước XHCN, Vấn đề dân tộc, tôn giáo, gia đình.
  4. `AID301c - Artificial Intelligence Applications` (100 câu): Giải thích Search Algorithms, Heuristics, Supervised/Unsupervised Learning, Neural Networks, Deep Learning, NLP.
  5. `HCM202 - Tư Tưởng Hồ Chí Minh` (300 câu): Giải thích Cơ sở hình thành TTHCM, Độc lập dân tộc gắn liền với CNXH, Đảng & Nhà nước của dân, Đại đoàn kết, Đạo đức cách mạng.
  6. `VNR202 - Lịch Sử Đảng Cộng Sản Việt Nam` (420 câu): Giải thích các bối cảnh lịch sử, mốc thời gian, Nghị quyết Trung ương, các kỳ Đại hội Đảng và Chiến dịch lịch sử.
- **Lưu file & Cập nhật Manifest:** Đã lưu 6 file JSON chuẩn vào `quiz-app-main/quizzes/current/`, khai báo đầy đủ trong `QUIZ_MANIFEST` (`quizDataLoader.js`), build và deploy lên VPS `140.245.119.189`.

### 📚 Cập Nhật Đợt 2: Các Bộ Đề Thi Thử FBOX (1,220 Câu) & Đề Thi PE PDF (ENW493c):
- **Xử lý Đề Thi Thực Hành PE PDF (`ENW493c_SP26_RE_W_PE.pdf`):** Đã chuyển đổi đề bài tự luận PDF thành file JSON chuẩn `ENW493c - PE Writing Master - QuizApp.json` tích hợp sẵn Dàn ý bài viết (Essay Outline), Từ vựng học thuật Band 8.0 và Bài mẫu phân tích chi tiết.
- **Xử lý 22 File JSON Thi Thử FBOX (1,220 câu hỏi & 91 lượt watermark):**
  - Đã loại bỏ 100% các chuỗi đóng dấu thương hiệu bên thứ ba `(Trích xuất từ...)` hoặc `FBOX`.
  - Đã kiểm tra từng câu hỏi, các lựa chọn, đáp án đúng và bổ sung giải thích học thuật sâu sắc cho toàn bộ các đề thi thử của 5 môn (`ENW493c`, `AID301c`, `MLN131`, `HCM202`, `VNR202`).
- **Cập nhật `QUIZ_MANIFEST` & Deploy Production:** Đã lưu các tập tin JSON đã chuẩn hóa vào `quiz-app-main/quizzes/current/`, khai báo thêm vào `QUIZ_MANIFEST` trong `quizDataLoader.js`, build web và deploy thành công lên VPS `140.245.119.189`.

### 🚨 BÀI HỌC KINH NGHIỆM & QUY TẮC TÁCH LẺ BỘ ĐỀ (NO-MERGE RULE):
- **TUYỆT ĐỐ KHÔNG GỘP TẬP TIN JSON THI THỬ:** Mỗi file `.json` thi thử FBOX (hoặc file PDF PE) BẮT BUỘC phải được khai báo thành 1 bộ đề riêng biệt (Card riêng) trên giao diện Web.
- **Quy tắc đặt ID và Title:**
  - `id`: Giữ đúng tên tệp JSON không chứa đuôi mở rộng (Ví dụ: `MLN131_SP26_FE`).
  - `title`: Chuẩn hóa theo dạng `${fileName} - (${numQuestions} câu có giải thích)` (Ví dụ: `MLN131_SP26_FE - (60 câu có giải thích)`).
- **Tổng số bộ đề hoạt động trên Web:** 58 bộ đề (6 bộ Flashcard tổng hợp gốc + 23 bộ đề thi thử FBOX + 29 bộ đề thi thử Fustation/PE).

### 📚 Cập Nhật Đợt 3: Các Bộ Đề Fustation (24 JSON + 5 PDF PE Essay Guides):
- **Phân Tích Đặc Thù Dữ Liệu Fustation:** Khác với FBOX, các tệp Fustation cào về không có sẵn nội dung giải thích (chỉ chứa text cụt dạng `Đáp án chính xác là B...`).
- **Thực Hiện Viết Mới 100% Lời Giải Thích Học Thuật (Chậm Mà Chắc - Không Làm Ẩu):**
  - Đã rà soát 1,289 câu hỏi thuộc 24 tệp JSON Fustation (`ENW493c`, `AID301c`, `MLN131`, `HCM202`, `VNR202`).
  - Đã viết mới lời giải thích sâu sắc chuẩn giáo trình cho 100% câu hỏi.
  - Xóa sạch 100% từ khóa nhận diện thương hiệu `fustation`, `fusstion`, `fbox`, `trích xuất...`.
- **Chuyển Đổi 5 File PDF PE Essay Prompts (ENW493c):**
  - Đã đọc 5 tệp PDF thực hành tự luận PE (`FA25`, `SP26`, `SU25` tại Hà Nội & TP.HCM).
  - Chuyển đổi thành 5 bộ đề PE Essay Guide độc lập tích hợp sẵn Dàn ý 4 đoạn, Từ vựng học thuật Band 8.0 và Bài viết mẫu phân tích.
- **Trạng Thái Deploy:** Đã nạp 58 bộ đề vào `QUIZ_MANIFEST`, build production và deploy lên VPS Oracle `140.245.119.189`.







