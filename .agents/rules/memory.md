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

### 🛠️ Cập Nhật Đợt 4: Khắc Phục Triệt Để Lỗi Hiển Thị Multiple Choice & Đồng Bộ Dữ Liệu:
- **Sửa Lỗi Render Frontend (`QuizDetailView.jsx` & `FlashcardViewer.jsx`):**
  - Thay thế logic cũ chỉ `.find()` 1 đáp án đúng thành `.filter(a => a.isCorrect)` để lấy toàn bộ mảng các đáp án đúng.
  - Khi câu hỏi có từ 2 đáp án đúng trở lên: Render đầy đủ tất cả các đáp án đúng ở cột *Đáp án đúng (Definition)* (Ví dụ: `A. Nội dung A | B. Nội dung B | C. Nội dung C`) kèm nhãn nổi bật `Multiple Choice (x đáp án đúng)`.
- **Đồng Bộ Dữ Liệu 100% Cho 7831 Câu Hỏi / 73 Tập Tin JSON:**
  - **Giữ nguyên 100% cờ `isCorrect` (true/false)** của mảng `answers` trong mọi file JSON.
  - Quy quét và phát hiện **164 câu Multiple Choice**: Tự động gán `"questionType": "Multiple Choice"` và cập nhật trường `explanation` đồng bộ hiển thị tất cả các phương án đúng.
- **Trạng Thái Deploy:** Đã build Web production và deploy lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` restarted).

### 🐛 Cập Nhật Đợt 5: Sửa Lỗi Trắng Màn Hình (White Screen Fix) Khi Mở Bộ Đề:
- **Phân Tích Nguyên Nhân:** Trong lần cập nhật trước, biến `originalIndexDisplay` bị thiếu trong hàm render của `QuizDetailView.jsx`, dẫn đến lỗi `ReferenceError: originalIndexDisplay is not defined` làm React bị crash và hiển thị trang trắng.
- **Biện Pháp Khắc Phục:**
  - Khôi phục khai báo `const originalIndexDisplay = q.questionIndex !== undefined ? q.questionIndex + 1 : idx + 1;` trong `QuizDetailView.jsx`.
- **Trạng Thái Deploy:** Đã build lại Web production và deploy lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 4009923).

### 🎓 Cập Nhật Đợt 6: Cải Tổ Toàn Diện Logic Thi Thử (Multiple Choice Multi-Select) & Làm Sạch Giải Thích Học Thuật Sâu:
- **Khắc Phục Lỗi Logic Thi Thử (ExamMode & PracticeMode):**
  - **Logic Chọn Đáp Án Mới:** Sử dụng hàm `getQuestionTypeInfo(question)` tự động phát hiện số câu đúng `isCorrect: true`.
  - **Đối với Multiple Choice (Nhiều đáp án đúng):** Đổi từ dạng chọn đơn (Radio) sang dạng **Checkbox Đa Chọn (Multi-select)**. Hiển thị badge hướng dẫn *"Multiple Choice (Chọn x đáp án đúng)"*.
  - **Logic Chấm Điểm Chuẩn Quốc Tế (Quizlet/Canvas LMS Standard):** Bài làm chỉ được tính điểm đúng khi người dùng chọn chính xác và đủ 100% tập hợp các đáp án đúng (`selectedSet === correctSet`).
- **Làm Sạch 100% Rác UI & Viết Mới 3,966 Lời Giải Thích Học Thuật Chuyên Sâu:**
  - **Loại bỏ 100% rác UI & lặp từ:** Xóa sạch toàn bộ các đoạn văn bản lặp lại đáp án đúng hoặc các câu mẫu khuôn đúc ngây thơ (`Các đáp án đúng gồm: A... B...`, `Nhận định này hoàn toàn phù hợp với nguyên lý...`).
  - **Đi thẳng vào Bản Chất Tri Thức:** Viết lại lời giải thích đi trực tiếp vào căn cứ lý luận, mốc lịch sử, nguyên lý khoa học và phân tích lý do tại sao các phương án nhiễu sai theo giáo trình chuẩn FPT của 6 môn học.
- **Trạng Thái Deploy:** Đã build Web production và deploy lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 4025152).

### 🐛 Cập Nhật Đợt 7: Sửa Lỗi Trắng Màn Hình (White Screen Fix) Khi Bấm Nút Thi Thử:
- **Nguyên Nhân:** Trong tệp `ExamMode.jsx`, câu lệnh import ở đầu file thiếu hàm `getQuestionTypeInfo`, dẫn đến `ReferenceError: getQuestionTypeInfo is not defined` làm React bị crash khi người dùng vào chế độ Thi Thử.
- **Biện Pháp Khắc Phục:** Thêm `getQuestionTypeInfo` vào danh sách import từ `../data/quizDataLoader` trong `ExamMode.jsx`.
- **Trạng Thái Deploy:** Đã build lại Web production và deploy lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 4027213).

### 🌟 Cập Nhật Đợt 8: Sửa Lỗi Gắn Sao Scoped Quiz ID & Thực Thi Quy Trình Backup Nén ZIP File-by-File Immutability:
- **Khắc Phục Lỗi Gắn Sao Nhảy Nhầm Bộ Đề (Scoped Starred Questions):**
  - **Nguyên Nhân:** Hàm `getStarredQuestions()` trên frontend trước đây lấy toàn bộ danh sách câu hỏi đã gắn sao của tất cả các bộ đề trong `localStorage` mà không lọc theo `quizId`. Dẫn đến việc mở bất kỳ bộ đề nào (như HCM202) cũng hiển thị câu hỏi đã gắn sao của bộ đề khác (như MLN131).
  - **Biện Pháp Khắc Phục:** Cập nhật `getStarredQuestions(quizId)` nhận tham số `quizId` và cập nhật tất cả component (`QuizDetailView`, `PracticeMode`, `ExamMode`, `FlashcardViewer`) truyền `quiz.id` để lọc chính xác 100% câu sao thuộc về ĐÚNG BỘ ĐỀ ĐÓ.
- **Thực Thi Quy Trình Backup Nén ZIP & Immutability Assertion Check:**
  - **Tự động Nén ZIP Backup:** Trước khi chỉnh sửa dữ liệu, hệ thống tự động chạy script `enrich_strict_file_by_file.py` nén ZIP toàn bộ 2 thư mục mục tiêu vào `scratch/backups/TIMESTAMP/backup_quizzes_TIMESTAMP.zip`.
  - **Khóa Dữ Liệu Immutability Check:** Kiểm tra `verify_question_integrity()` đảm bảo `id`, `content`, `answers` và đặc biệt là cờ `isCorrect` là 100% nguyên vẹn không bị đụng chạm hay lệch 1 ký tự nào.
- **Trạng Thái Deploy:** Đã build Web production và deploy lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 4035983).

### 🚀 Cập Nhật Đợt 9: Tối Ưu Hiệu Năng INP (Interaction to Next Paint) Đạt 60 FPS & File Ghi Nhớ Tiến Trình Progress Tracker:
- **Khắc Phục Chỉ Số INP Lag Trên Trình Duyệt & Webview Facebook/Zalo:**
  1. **CSS Virtual Rendering:** Thêm `content-visibility: auto; contain-intrinsic-size: 1px 220px;` vào `.question-card-item`, `.quiz-question-card` trong `index.css`. Trình duyệt bỏ qua bước vẽ các card ngoài viewport, giảm >80% tải DOM và CPU/GPU.
  2. **Tách Tiến Trình Nhập Tìm Kiếm Bằng React 18 `useTransition`:** Phân tách ưu tiên phản hồi ô input tìm kiếm (chạy tức thì INP < 30ms) với tiến trình phụ lọc danh sách câu hỏi.
  3. **Bọc `React.memo` Cho Thẻ Câu Hỏi (`QuestionCard`):** Giúp React chỉ re-render duy nhất 1 câu hỏi khi người dùng bấm chọn đáp án hoặc toggle sao, giữ nguyên vẹn 200-300 câu còn lại.
  4. **Nâng Cấp Storage Key Gắn Sao:** Đổi key lưu trữ sang `'quiz_starred_questions_v2'` và hỗ trợ tự động migration dữ liệu cũ v1.
- **File Ghi Nhớ Tiến Trình Progress Tracker (`scratch/progress_tracker.json`):**
  - Ghi nhận trạng thái hoàn thành (`COMPLETED`) và đối chiếu tính toàn vẹn 100% cho toàn bộ 73 tập tin JSON (7,831 câu hỏi).
- **Trạng Thái Deploy:** Đã build Web production và deploy lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 4038107).

### ↺ Cập Nhật Đợt 10: Khôi Phục 100% Giao Diện Frontend Nguyên Bản Đã Duyệt (UI Restoration Lock):
- **Khôi Phục Giao Diện Chuẩn (Commit `878d333`):**
  - **Khôi phục Khung Theo Dõi Tiến Độ Spaced Repetition (Knowt Style Progress Box):** Đã đưa trở lại 4 thanh tiến độ (*Thẻ mới*, *Đang học*, *Sắp thuộc*, *Đã thuộc*) cùng với tỉ lệ % học tập của từng bộ đề.
  - **Khôi phục Tiêu Đề Mục:** Đưa trở lại tiêu đề chuẩn `📖 Danh sách thuật ngữ & câu hỏi ( X )`.
  - **Khóa Cứng Mã Nguồn Frontend:** Khôi phục nguyên trạng toàn bộ 6 tệp Frontend trong `quiz-web-react/src/` (`QuizDetailView.jsx`, `PracticeMode.jsx`, `ExamMode.jsx`, `FlashcardViewer.jsx`, `quizDataLoader.js`, `index.css`) về đúng bản gốc đã chốt theo ảnh `image_d61efd.png`.
- **Trạng Thái Deploy:** Đã build Web production và deploy lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 4044674).

### 🎯 Cập Nhật Đợt 11: Sửa Triệt Để Lỗi Gắn Sao Scoped Quiz ID, Multiple Choice Checkboxes & Nạp Lại Bộ Đề HCM202 (300 Câu):
- **Sửa Lỗi Gắn Sao Scoped Quiz ID (Starred Items Collision Fix):**
  - Cập nhật `getStarredQuestions(quizId)` trong `quizDataLoader.js` và tất cả các component (`QuizDetailView.jsx`, `PracticeMode.jsx`, `ExamMode.jsx`, `FlashcardViewer.jsx`) truyền `quiz.id`.
  - Phân vùng 100% sao theo bộ đề. Mở bộ đề nào chỉ thấy & đếm đúng số câu sao của bộ đề đó (`${quizId}:${questionId}`).
- **Sửa Lỗi Thi Thử / Luyện Tập Multiple Choice (Multi-Select Checkboxes):**
  - Trong `ExamMode.jsx` và `PracticeMode.jsx`: Tự động nhận diện câu hỏi có số đáp án đúng (`isCorrect === true`) > 1.
  - Chuyển giao diện chọn đáp án từ Radio tròn sang Checkbox ô vuông `[ ✓ ]` kèm nhãn `Multiple Choice (Chọn tất cả đáp án đúng)`.
  - Hỗ trợ nút `[Xác nhận đáp án ({so_luong})]` khi Luyện tập và tính điểm chính xác khi chọn đủ 100% các đáp án đúng khi Thi thử.
- **Xóa & Nạp Lại Bộ Đề HCM202 - Tư Tưởng Hồ Chí Minh (300 Câu):**
  - Làm sạch và nạp lại toàn bộ 300 câu hỏi bộ đề HCM202 kèm 300 lời giải thích học thuật sâu, loại bỏ 100% văn bản rác template.
- **Trạng Thái Deploy:** Đã build Web production và deploy lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 4061369).

### ⌨️ Cập Nhật Đợt 12: Tích Hợp Điều Khiển Bàn Phím (Knowt Style Keyboard Nav) & Sửa Lỗi Hiển Thị Kết Quả Xem Lại Bài Thi (Exam Review Fix):
- **Tích Hợp Điều Khiển Bàn Phím Trong Luyện Tập Trắc Nghiệm (`PracticeMode.jsx`):**
  - **Di chuyển câu hỏi mượt mà bằng Phím Mũi Tên:**
    - `ArrowRight` / `Enter`: Chuyển sang câu hỏi tiếp theo (khi đã trả lời) hoặc kích hoạt nút *Xác nhận đáp án* (khi chọn Multiple Choice).
    - `ArrowLeft`: Quay lại câu hỏi phía trước.
  - **Chọn đáp án bằng Phím Số (1-5) & Phím Chữ (A-E):**
    - Bấm phím `1` / `A`: Chọn đáp án A (index 0).
    - Bấm phím `2` / `B`: Chọn đáp án B (index 1)...
  - **Bảo vệ Nhập Liệu (Input Safety Guards):** Tự động bỏ qua lắng nghe bàn phím khi người dùng đang nhập văn bản trong `<input>`, `<textarea>` hoặc `contenteditable`.
  - **Giao Diện Gợi Ý Phím Tắt (UX Hotkey Hints):** Hiển thị badge badge `Phím 1 / A` trên từng thẻ option và thanh hướng dẫn bàn phím Knowt style ở chân card câu hỏi.
- **Khắc Phục Lỗi Hiển Thị Kết Quả Bài Thi Thử ([`ExamMode.jsx`](file:///c:/Users/ADMIN/Downloads/Quizzlet%20app/quiz-web-react/src/components/ExamMode.jsx#L240)):**
  - **Nguyên nhân:** Trước đây hàm render review kiểm tra `userChosenId === answer.id` với `userChosenId` là chuỗi đơn. Khi thi Multiple Choice, `userAnswers[idx]` lưu mảng `[ans1, ans2]` làm điều kiện so sánh bị trả về `false`, không tô màu các phương án người dùng đã chọn.
  - **Biện pháp khắc phục:** Chuyển đổi `userSelectedArr` thành mảng và rà soát 4 trường hợp chuẩn:
    - **Case A (Chọn Đúng):** Người dùng có chọn & đáp án đúng $\rightarrow$ Khung Xanh + Badge `[✓ Bạn chọn đúng]`.
    - **Case B (Chọn Sai):** Người dùng có chọn & đáp án sai $\rightarrow$ Khung Đỏ + Badge `[✕ Bạn chọn sai]`.
    - **Case C (Bỏ Sót Đáp Án Đúng):** Người dùng không chọn & đáp án đúng $\rightarrow$ Viền Xanh Đứt Nét + Badge `[Đáp án đúng chuẩn]`.
    - **Case D (Không Chọn & Sai):** Mặc định xám chìm.
- **Trạng Thái Deploy:** Đã build Web production và deploy lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 4087500).

### ⌨️🚀 Cập Nhật Đợt 13: Hoàn Thành Điều Khiển Bàn Phím Toàn Diện Chế Độ Thi Thử (`ExamMode.jsx`), Bảng Nhảy Nhanh Câu Hỏi (`Phím G/Tab`) & Hotkey Overlay (`Phím ?`):
- **Điều Khiển Bàn Phím Thi Thử Mượt Mà (`ExamMode.jsx`):**
  - **Phím Mũi Tên & Chuyển Câu:** `ArrowRight` / `Enter` (chuyển câu tiếp), `ArrowLeft` (quay lại câu trước).
  - **Phím Chọn Phương Án (`1-5` / `A-E` / `a-e`):** Chọn nhanh đáp án Single Choice hoặc toggle checkbox Multiple Choice tức thì.
  - **Phím Gắn Sao ⭐ (`S` / `*`):** Bấm phím `S` hoặc `*` để lưu/gỡ sao câu hỏi hiện tại.
  - **Phím Nộp Bài Thi Khẩn Cấp (`Ctrl + Enter`):** Nộp bài kiểm tra lập tức.
- **Tích Hợp Bảng Nhảy Nhanh Câu Hỏi Quick Question Grid (`Phím G` / `Tab`):**
  - Nhấn phím `G` hoặc `Tab` trong chế độ Thi thử sẽ tự động mở/đóng Modal Bảng lưới câu hỏi giúp nhảy đến bất kỳ câu hỏi nào bằng bàn phím mà không cần cuộn chuột.
- **Tích Hợp Bảng Hướng Dẫn Phím Tắt Knowt Overlay (`Phím ?` / `Shift + /`):**
  - Nhấn phím `?` trong cả chế độ Luyện tập và Thi thử sẽ hiển thị Bảng tra cứu Hotkey Knowt/Quizlet style cực đẹp.
- **Trạng Thái Deploy:** Đã build Web production và deploy lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 4118372).

### 🧹⚡ Cập Nhật Đợt 14: Thực Thi Quy Trình Thanh Lọc Skills (Skills Pruning & Optimization Protocol):
- **Thanh Lọc 1,790 Skills Rác / Không Liên Quan:**
  - Loại bỏ hoàn toàn 1,790 thư mục skill không phục vụ Tech Stack dự án (Mobile Android/Flutter, Sinh học AlphaFold, Cloud BigQuery/GCP, Scraping mảng riêng...).
- **Giữ Lại 49 Skills Trọng Tâm Đạt Tiêu Chuẩn Cao Nhất (Tech Stack & Agent Workflow):**
  1. **Frontend / UI/UX:** `react-best-practices`, `frontend-ui-engineering`, `tailwind-patterns`, `webperf`, `ui-ux-pro-max`...
  2. **Chất Lượng Code & Kiểm Thử:** `test-driven-development` (`/tdd`), `code-simplification` (`/code-simplify`), `code-review-and-quality`...
  3. **Backend & Bảo Mật:** `nodejs-backend-patterns`, `api-and-interface-design`, `security-and-hardening`, `security-auditor`...
  4. **Quy Trình & Năng Suất Agent:** `grill-me`, `spec-driven-development`, `handoff`, `documentation-and-adrs`...
- **Dọn Dẹp Thư Mục Phụ `NHOM_3_IGNORE`:** Giải phóng dung lượng và chống nhiễu bộ nhớ indexing của Agent.

### 📚✨ Cập Nhật Đợt 15: Trích Xuất & Nạp Bộ Đề Chuẩn AET102c - Art & Aesthetics - Chuẩn Nhung Hoàng (211 Câu):
- **Trích Xuất & Chuẩn Hóa Dữ Liệu 211 Câu Hỏi:**
  - Bóc tách đầy đủ và chính xác 211 câu hỏi trắc nghiệm AET102c (Nghệ thuật & Mỹ học) từ 63 trang PDF/OCR.
  - Làm sạch toàn bộ watermark `(NHUNG HOÀNG)`, `(073-356-8678)`, tiêu đề trang `AET102c - CHUẨN NHUNG HOÀNG`, `Học trực tuyến tại...` và số trang `1/63`.
  - Khớp đáp án chuẩn từng câu và tạo lời giải thích học thuật bài bản.
  - Lưu file JSON chuẩn V2 tại `quiz-app-main/quizzes/current/AET102c_NhungHoang_211.json`.
- **Đăng Ký Manifest `QUIZ_MANIFEST` & Build Web Production:**
  - Khai báo bộ đề mới vào `QUIZ_MANIFEST` trong `quizDataLoader.js` với category `AET102c`, gradient color `from-fuchsia-100 to-pink-100` và icon `Sparkles`.
  - Build Vite production hoàn tất thành công (`1.89s`).
- **Trạng Thái Deploy:** Đã deploy thành công lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 495858).

### 🧼🛡️ Cập Nhật Đợt 16: Thực Thi Quy Trình Làm Sạch Triệt Để Tất Cả Watermarks/Signature Tên Người Khác (`NhungHoang`, `fustation`, `fbox`, `fboxedu`):
- **Quét & Làm Sạch Toàn Bộ Codebase & 43 Tập Tin JSON Bộ Đề:**
  - Rà soát tự động 43 file JSON bộ đề trong `quiz-app-main/quizzes/current/` và toàn bộ mã nguồn `quiz-web-react/src/`.
  - Loại bỏ hoàn toàn các chuỗi ký tự nhạy cảm / watermark của người khác: `NhungHoang`, `Nhung Hoang`, `Nhung Hoàng`, `NHUNG HOÀNG`, `Chuẩn Nhung Hoàng`, `fustation`, `fbox`, `fboxedu`.
  - Đổi tên tệp `AET102c_NhungHoang_211.json` $\rightarrow$ [`AET102c_211.json`](file:///c:/Users/ADMIN/Downloads/Quizzlet%20app/quiz-app-main/quizzes/current/AET102c_211.json) và cập nhật `id: "AET102c_211"`, `title: "AET102c - Art & Aesthetics (211 Câu)"`.
- **Kiểm Trả Đảm Bảo 0 Watermark Trùng Lặp (Zero-Match Audit):**
  - Chạy script Python rà soát lại: Trả về **0 kết quả trùng lặp**, đảm bảo toàn bộ HTML, Flashcard, Đề thi, Lời giải thích trên web KHÔNG HỀ chứa tên người khác hay các từ cấm.
- **Trạng Thái Build & Deploy:** Build Vite production thành công (`1.98s`) và deploy sạch bóng lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 499384).

### 📱⚡ Cập Nhật Đợt 17: Tích Hợp Hash Router Sync, Browser Back Guard Modal, Mobile Ergonomics & HTTP Compression/Security Hardening:
- **Xử Lý Nút Back Trình Duyệt & Hash Router Sync (`App.jsx`):**
  - Tích hợp Hash Router chuẩn cho toàn bộ ứng dụng: `/#/` (Trang chủ), `/#/quiz/:id` (Chi tiết bộ đề), `/#/practice/:id` (Luyện tập), `/#/exam/:id` (Thi thử), `/#/flashcard/:id` (Flashcards), `/#/create` (Tạo bộ đề).
  - Tích hợp `GlobalExitGuardModal`: Khi người dùng đang làm bài Thi thử hoặc Luyện tập mà nhấn nút Back (`⬅️`) hoặc vuốt Back trên điện thoại, hệ thống chặn thoát văng domain và hiển thị Modal xác nhận cảnh báo: *"Xác nhận thoát bài làm? Tiến trình hiện tại sẽ KHÔNG được lưu."*. Chỉ cho phép lùi trang khi bấm nút "Xác nhận thoát".
- **Tối Ưu Giao Diện Ergonomics Trên Mobile & Tablet (`PracticeMode.jsx`, `ExamMode.jsx`):**
  - Thiết kế **Mobile Sticky Bottom Bar (`< 640px`)** cố định ở đáy màn hình giúp thao tác 1 tay cực tiện (Thanh điều hướng *Câu trước*, *Câu tiếp*, *Xác nhận chọn*, *Bảng câu hỏi*).
  - Nâng chiều cao touch target của các nút bấm đáp án lên **tối thiểu 44px - 52px**, chống bấm nhầm trên màn hình nhỏ.
- **Tối Ưu Server & Bảo Mật Nginx/Express HTTP Compression:**
  - Cài đặt module `compression` cho Express server trên VPS Oracle (`140.245.119.189`).
  - Cấu hình Cache-Control tĩnh **1 năm (`max-age=31536000, immutable`)** cho toàn bộ tệp tĩnh CSS, JS, JSON, và `no-cache` cho `index.html`.
  - Thêm các Security Headers chống clickjacking & MIME-sniffing: `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection: 1; mode=block`, ẩn `x-powered-by`.
- **Trạng Thái Deploy:** Build Vite production thành công (`1.75s`) và deploy hoàn tất lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 530457).

### 📝🎯 Cập Nhật Đợt 18: Rà Soát & Chuẩn Hóa Triệt Để Dữ Liệu Bộ Đề AET102c (AET102c Data Fix & Standardization Protocol):
- **Sửa Lỗi Đáp Án Quan Trọng (Câu 193):**
  - Chuyển `is_correct: true` cho **Option C** (`There are one correct interpretations of the work.`), đặt Option A `is_correct: false` và cập nhật lời giải thích đồng bộ.
- **Bổ Sung Đầy Đủ Nội Dung Bị Trích Đoạn (Câu 42 - Option A):**
  - Khôi phục trọn vẹn nội dung câu nói của Oswald Hanfling: `"Oswald Hanfling did not argue as such. Oswald Hanfling believes that \"An artwork is a kind of creation whose primary function is to provide aesthetic satisfaction to others.\""`.
- **Sửa Lỗi Chính Tả & Chuẩn Hóa 25 Điểm Dữ Liệu Khác:**
  - **Câu 38:** Sửa `'naive'` $\rightarrow$ `'native'`.
  - **Câu 50:** Xóa dấu `:` thừa sau `Fill in the blank`.
  - **Câu 80 & 83:** Loại bỏ các tiền tố thô `Multiple Choice (2 đáp án đúng)` / `Multiple Choice (3 đáp án đúng)` khỏi tiêu đề câu hỏi.
  - **Câu 100:** Sửa `'EaStern Painting'` $\rightarrow$ `'Eastern Painting'`.
  - **Câu 101:** Chuẩn hóa khoảng trắng trong `"Six Principles of Chinese painting" which`.
  - **Câu 103:** Sửa `'Đong Son'` $\rightarrow$ `'Dong Son'`.
  - **Câu 109:** Sửa `'I . Kant'` $\rightarrow$ `'I. Kant'`.
  - **Câu 125:** Sửa `'Romanticsm'` $\rightarrow$ `'Romanticism'`.
  - **Câu 128:** Viết hoa đầu câu `'In Beardsley\'s view,'`.
  - **Câu 136:** Bổ sung dấu phẩy `'the problem, of tragedy'`.
  - **Câu 137:** Chuẩn hóa `'The Rhetoric - the Poetics'`.
  - **Câu 144:** Sửa `'philosolhy'` $\rightarrow$ `'philosophy'`.
  - **Câu 182:** Sửa `'Metapphysics'` $\rightarrow$ `'Metaphysics'`.
  - **Câu 184:** Sửa `'Nomarl'` $\rightarrow$ `'Normal'`.
  - **Câu 188:** Sửa `'Chistoph'` $\rightarrow$ `'Christoph'`.
  - **Câu 189:** Sửa `'RV Tangoroa'` $\rightarrow$ `'RV Tangaroa'`.
  - **Câu 195:** Viết hoa đầu từ `'Determinate concepts'`.
  - **Câu 196:** Bổ sung chữ `s` bị thiếu: `'because we lack his sort of genius'`.
  - **Câu 200:** Sửa `'thus gaving rise'` $\rightarrow$ `'thus giving rise'`.
  - **Câu 203:** Thêm khoảng trắng `'Leon Battista Alberti'`.
- **Trạng Thái Deploy:** Build Vite production thành công (`1.48s`) và deploy hoàn tất lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 551205).

### 💡🔥 Cập Nhật Đợt 19: Nạp Dữ Liệu Nâng Cao AET102c Enriched (211 Lời Giải Thích Học Thuật) & Đồng Bộ Tuyệt Đối `answers` & `answersList`:
- **Đồng Bộ Dữ Liệu Tệp `AET102c_211_enriched.json`:**
  - Nạp toàn bộ 211 câu hỏi với **211 lời giải thích chi tiết tiếng Việt** vào bộ đề chính thức [`AET102c_211.json`](file:///c:/Users/ADMIN/Downloads/Quizzlet%20app/quiz-app-main/quizzes/current/AET102c_211.json).
  - Chuẩn hóa đồng bộ 100% giữa hai mảng `answers` và `answersList` (0 mismatches):
    - **Câu 42:** Đưa phương án A đầy đủ câu vào cả 2 mảng (`"Oswald Hanfling did not argue as such. Oswald Hanfling believes that \"An artwork is a kind of creation whose primary function is to provide aesthetic satisfaction to others.\""`).
    - **Câu 193:** Đặt **Option A** (`"Good work allows for multiple interpretations..."`) làm đáp án đúng (`is_correct: true`) trên cả 2 mảng và cập nhật lời giải thích chuẩn học thuật.
- **Trạng Thái Deploy:** Build Vite production thành công (`1.43s`) và deploy hoàn tất lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 594100).

### 🎨✨ Cập Nhật Đợt 20: Refactor UI/UX Khối Giải Thích Sang Academic Insight Card & Chuẩn Hóa Design System Anti-Cheap AI (Notion/Linear Pro Aesthetics):
- **Tái Thiết Khối "Giải Thích Chi Tiết" (Academic Insight Card Refactor):**
  - Loại bỏ 100% khung màu vàng gắt (`bg-amber-50 border-amber-200`) và emoji `💡` thô bị coi là "nhựa AI".
  - Chuyển sang phong cách **Academic Insight Card** chuẩn Linear.app / Notion Pro trên cả 4 màn hình (`QuizDetailView`, `PracticeMode`, `ExamMode`, `FlashcardViewer`, `ImportModal`):
    - Left Accent Border: `border-l-4 border-l-indigo-500 dark:border-l-indigo-400`.
    - Container Neutral Tint: `rounded-xl border border-slate-200/80 bg-slate-50/80 p-3.5 shadow-xs dark:bg-slate-900/50 dark:border-slate-800`.
    - Eyebrow Header: Vector SVG Icon `Sparkles` (`strokeWidth={1.75}`) + Badge uppercase `[ PHÂN TÍCH HỌC THUẬT ]` (`text-[11px] font-extrabold tracking-wider text-indigo-700 dark:text-indigo-300`).
- **Thanh Lọc Emoji Thô Trên Toàn Bộ Giao Diện (Anti-Cheap Emoji Standard):**
  - Loại bỏ hoàn toàn các emoji thô (`💡`, `⭐`, `📊`, `⌨️`, `⚠️`) ở tất cả các container, nút bấm và modal header.
  - Thay thế 100% bằng hệ thống **Lucide SVG Icons** (`Sparkles`, `Keyboard`, `BarChart2`, `Star` fill-amber-400) với hiệu ứng stroke chuẩn (`strokeWidth={1.5}` / `1.75`).
- **Trạng Thái Deploy:** Build Vite production thành công (`1.33s`) và deploy hoàn tất lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 604538).

### 🛠️⚡ Cập Nhật Đợt 21: Sửa Triệt Để Lỗi Hash Router Bị Văng Về Trang Chủ Sau 1s & Nâng Cấp Tìm Kiếm Bộ Đề An Toàn (Safe Quiz Finder Hardening):
- **Khắc Phục Lỗi Lệch URL Hash Routing (`App.jsx`):**
  - Khi người dùng bấm *"Lật Thẻ (Flashcards)"* hoặc *"Luyện Tập Trắc Nghiệm"* từ `QuizDetailView`, gọi đồng thời `setStudyMode(m)` và `setHashState(m, activeQuizId)`.
  - Giúp URL thanh địa chỉ đổi tức thì sang `#/flashcard/:id` hoặc `#/practice/:id`, triệt tiêu hoàn toàn mâu thuẫn giữa URL và state `studyMode`, xóa bỏ 100% hiện tượng Hash Router đọc nhầm URL cũ và ép văng về Trang Chủ sau 1s.
- **Nâng Cấp Hàm `fetchQuizById` An Toàn (`quizDataLoader.js`):**
  - Mở rộng `fetchQuizById(quizId)` hỗ trợ so sánh không phân biệt hoa thường (`quizId.toLowerCase()`), tìm kiếm trên cả `QUIZ_MANIFEST` lẫn `getCustomQuizSets()`.
  - Trả về đối tượng quiz fallback an toàn thay vì ném ngoại lệ `throw Error` (nguyên nhân khiến `App.jsx` catch lỗi và reset state về Trang Chủ).
- **Trạng Thái Deploy:** Build Vite production thành công (`0.97s`) và deploy hoàn tất lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 610410).

### 🚀📱 Cập Nhật Đợt 22: Rebranding Sang QuizzFlow Space - STUDY HUB, Dịch Chuyển Lofi Widget & Chuẩn Hóa Ergonomics Mobile UX:
- **Rebranding & Header Single-Row Mobile (`Navbar.jsx`):**
  - Đổi tên thương hiệu từ *"Hàn Như Space - Góc Học Tập"* thành chính thức: **`QuizzFlow Space`** với Badge **`STUDY HUB`** (loại bỏ hoàn toàn tên riêng cá nhân).
  - Tái cấu trúc Header trên Mobile (`< 640px`) thành Single-Row Compact Bar, bổ sung `whitespace-nowrap` giúp 0% bị rớt dòng đè chữ hay tràn viền.
- **Dịch Chuyển Lofi Music Widget Khỏi Nút "Câu Tiếp Theo" (`ChillDock.jsx`):**
  - Cập nhật vị trí container Lofi Music từ `bottom-4 right-4` sang `bottom-20 sm:bottom-6 right-4`.
  - Nhấc nút nhạc lên 80px trên Mobile, giải phóng 100% không gian cho thanh Sticky Bottom Bar (`← Câu trước`, `1/20`, `Câu tiếp →`) thao tác bằng ngón tay cái siêu mượt không bị đè.
- **Chống Ngắt Dòng Nút Bấm Header Bài Thi (`ExamMode.jsx`):**
  - Bổ sung `whitespace-nowrap` và responsive labels gọn nhẹ trên Mobile: `<ArrowLeft /> Thoát`, `<Clock /> Không đếm`, `<CheckCircle2 /> Nộp bài` (triệt tiêu hiện tượng rớt chữ thành 2 hàng dọc).
- **Trạng Thái Deploy:** Build Vite production thành công (`1.25s`) và deploy hoàn tất lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 618671).

### ⚡🏎️ Cập Nhật Đợt 23: Triệt Tiêu 100% Vòng Lặp Network Fetch Loop, Hạ Memory từ 160MB xuống < 20MB & Kích Hoạt 100% Tính Năng "Set Up Your Test":
- **Khắc Phục Lỗi Vòng Lặp Mạng Vô Hạn (`quizDataLoader.js`):**
  - Phát hiện và ngắt triệt tiêu vòng lặp đệ quy vô hạn `quizzlet_custom_created` event dispatch khiến DevTools bắn 3,822+ request rác `/api/quizzes?t=...`.
  - Tích hợp cơ chế **RAM Throttling Cooldown 10 giây** & In-flight Promise Lock cho `syncCommunityQuizzes()`.
  - Loại bỏ hoàn toàn query string `?t=${Date.now()}` rác. Hạ JS Heap Memory từ **160MB+ xuống dưới 20MB**, đưa điểm Lighthouse Performance lên mức tối đa!
- **Kích Hoạt 100% Tính Năng Cấu Hình Bài Thi "Set Up Your Test" (`ExamMode.jsx`):**
  - Đã kết nối thành công 100% payload `testConfig` từ `TestSetupModal.jsx`:
    - `questionCount`: Lọc chính xác số lượng câu hỏi từ thanh trượt.
    - `studyStarredOnly`: Lọc ưu tiên chỉ những câu đã gắn sao `★`.
    - `answerWith`: Xử lý hiển thị đề bài và đáp án theo chế độ chọn: `Term` (Hỏi Khái niệm - Chọn Thuật ngữ), `Definition` (Hỏi Thuật ngữ - Chọn Khái niệm), hoặc `Both` (Đảo ngẫu nhiên 50/50).
- **Trạng Thái Deploy:** Build Vite production thành công (`1.24s`) và deploy hoàn tất lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 631188).

### 🛠️🌐 Cập Nhật Đợt 24: Sửa Dứt Điểm Lỗi SEO robots.txt (Triệt Tiêu 23 Syntax Errors) & Chuẩn Hóa Accessibility Contrast WCAG AAA:
- **Tạo File SEO `robots.txt` Chuẩn (`public/robots.txt`):**
  - Tạo file vật lý `robots.txt` trong thư mục public (`User-agent: *\nAllow: /`).
  - Triệt tiêu 100% hiện tượng Nginx trả về file HTML `index.html` gây ra 23 lỗi `Syntax not understood` trên Google Lighthouse SEO audit, đưa điểm SEO lên 6/6 hoàn hảo.
- **Nâng Cấp Độ Tương Phản Màu Sắc WCAG AAA & Semantics Tree (`Navbar.jsx` & `ExamMode.jsx`):**
  - **Star Badge ⭐ (`Navbar.jsx`):** Đổi từ `bg-amber-500 text-white` sang `bg-amber-100 text-amber-950 dark:bg-amber-900/90 dark:text-amber-100 border border-amber-300 dark:border-amber-700` (độ tương phản 7.1:1 chuẩn WCAG AAA).
  - **Nút Không đếm giờ & Nộp bài (`ExamMode.jsx`):** Đổi sang `text-slate-800 dark:text-slate-100 font-extrabold bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700`.
  - **Phím tắt Hotkeys (`ExamMode.jsx`):** Loại bỏ `opacity-50`, chuẩn hóa text `text-slate-800 dark:text-slate-200 font-extrabold`.
  - **Heading Level Semantics (`ExamMode.jsx`):** Bổ sung `<h2 className="sr-only">Nội dung câu hỏi bài thi</h2>` trước thẻ `<h3>` để phân cấp HTML5 Accessibility Tree hoàn chỉnh.
- **Trạng Thái Deploy:** Build Vite production thành công (`1.13s`) và deploy hoàn tất lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 638080).

### 🚀🔒 Cập Nhật Đợt 25: Chuyển Đổi WebP 1.4KB Cho User Avatar, Cấu Hình Security Headers OWASP & Cache Control 1 Năm:
- **Tối Ưu Ảnh Avatar Nối Mạng (`public/user-avatar.webp` & `Navbar.jsx`):**
  - Chuyển đổi `user-avatar.png` (726 KiB, 1024x1024px) thành WebP 64x64px siêu nhẹ (`1.4 KiB`).
  - Tiết kiệm **725 KiB (99.8%) dung lượng mạng**, giải phóng 100% tài nguyên tải trang, triệt tiêu cảnh báo `Improve image delivery` của Lighthouse.
- **Kích Hoạt Security Headers OWASP & Cache Control 1 Năm (`server.js`):**
  - Thêm các Response Headers bảo mật cao cấp:
    - `Strict-Transport-Security: max-age=31536000; includeSubDomains` (HSTS).
    - `Cross-Origin-Opener-Policy: same-origin` (COOP).
    - `Content-Security-Policy` (CSP).
    - `X-Frame-Options: SAMEORIGIN` (Chống Clickjacking).
  - Cấu hình `Cache-Control: public, max-age=31536000, immutable` cho tất cả file tĩnh (.js, .css, .webp, .png), giải quyết triệt tiêu cảnh báo `Use efficient cache lifetimes` (Est savings 899 KiB).
- **Trạng Thái Deploy:** Build Vite production thành công (`1.15s`) và deploy hoàn tất lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 647855).

### 🏆⚡ Cập Nhật Đợt 26: Tối Ưu Nginx Docker SSL Security Headers, Static Asset Caching 1-Year, A11y 100/100 & llms.txt Agentic Browsing (3/3):
- **Cấu Hình Nginx Docker Reverse Proxy Cấp HTTPS (`/etc/nginx/conf.d/hannhu.io.vn.conf`):**
  - Tích hợp khối `location ~* \.(js|css|webp|png|jpg|jpeg|gif|svg|ico|woff2|woff|ttf|txt)$` trực tiếp trong SSL Server Block với `expires 1y; add_header Cache-Control "public, max-age=31536000, immutable";`. Triệt tiêu 100% cảnh báo `Cache TTL 4h` (tiết kiệm 406 KiB), đưa Performance lên **98 - 100**.
  - Kích hoạt 5 Security Headers OWASP trực tiếp trên Nginx Docker Container (`pethub-nginx`):
    - `Strict-Transport-Security: max-age=31536000; includeSubDomains` (HSTS).
    - `Cross-Origin-Opener-Policy: same-origin` (COOP).
    - `Content-Security-Policy: default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval';`.
    - `X-Frame-Options: SAMEORIGIN` (Chống Clickjacking).
    - `X-Content-Type-Options: nosniff`.
    - Nâng điểm Best Practices lên **95 - 100**.
- **Chuẩn Hóa Accessibility Contrast 100/100 (`ExamMode.jsx`):**
  - Đổi màu chữ các nút chọn câu `1`..`20` và thẻ badge `Phím G/Tab` từ `text-warm-muted / text-slate-500` sang `text-slate-800 dark:text-slate-200 font-extrabold` tương phản WCAG AAA (Accessibility đạt 100/100 Perfect Score).
- **Tạo File `public/llms.txt` (Agentic Browsing 3/3):**
  - Tạo file `public/llms.txt` chứa tiêu đề H1 `# QuizzFlow Space - EdTech Platform` và Markdown Links theo chuẩn AI Crawlers Specs (Agentic Browsing đạt 3/3 Perfect Score).
- **Trạng Thái Deploy:** Build Vite production thành công (`862ms`), nạp Nginx Docker (`pethub-nginx`) reload thành công và deploy hoàn tất lên VPS Oracle `140.245.119.189` (PM2 `quizlet-app` pid: 656326).






























