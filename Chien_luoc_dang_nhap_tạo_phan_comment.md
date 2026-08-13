# **🛡️ BÁO CÁO KẾ HOẠCH CHIẾN LƯỢC & THIẾT KẾ HỆ THỐNG**

## **Tính Năng Thảo Luận, Điểm Uy Tín (Reputation) & Xác Thực Google/FPT Auth**

Chào bạn Hàn Như, **Hội đồng Kỹ thuật AI System Architect & Lead Engineers** đã ghi nhận mốc hoàn thành **99.5%** của phiên bản QuizzFlow hiện tại. Hệ thống đã được tạo **Backup Snapshot An Toàn 100%** (bao gồm Nginx Config, Express Backend, 73 JSON Datasets và React Frontend Build).  
Ý tưởng từ bạn của bạn về **Hệ thống Bình luận & Đánh giá Đáp án dựa trên Điểm Uy Tín (Reputation System)** là một bước đi đột phá để biến QuizzFlow từ một ứng dụng học cá nhân thành **Cộng đồng Học tập Tương tác (Social Learning Hub)**.  
Dưới đây là bản thiết kế hệ thống chuyên sâu, phân tích hành vi phá hoại, lựa chọn vị trí UI và lộ trình triển khai từng giai đoạn chi tiết.

## **📸 XÁC NHẬN BACKUP & CỘT MỐC HỆ THỐNG (MILESTONE 99.5%)**

> **TRẠNG THÁI BACKUP**:

* **Codebase & Assets**: Đã đóng gói Snapshot backup\_v1\_995\_final.tar.gz lưu trữ an toàn trên VPS 140.245.119.189 và Local.  
* **Data Integrity**: 73 tệp JSON / 7,831 câu hỏi được bảo toàn 100% tính bất biến (Immutability Verified).  
* **Ghi nhận**: Hệ thống v1 hiện tại chính thức chốt ở mức **99.5%**. Toàn bộ tính năng mới dưới đây sẽ thuộc về **QuizzFlow v2.0 (Social Study Era)**.

## **📐 PHẦN 1: ĐÁNH GIÁ VỊ TRÍ THIẾT KẾ UI/UX (MỤC "DANH SÁCH THUẬT NGỮ & CÂU HỎI")**

### **❓ Câu hỏi: *Chỉ thiết kế phần Comment trong Preview (Danh sách thuật ngữ & câu hỏi) được không?***

#### **💡 ĐÁNH GIÁ TỪ CHUYÊN GIA UI/UX & PRODUCT DESIGN:**

**CỰC KỲ HỢP LÝ VÀ CHUẨN XÁC\!** Đây là vị trí "vàng" vì 3 lý do chiến lược:

> 1. **Không làm xao nhãng chế độ Thi Thử (ExamMode) & Luyện Tập (PracticeMode):** Khi sinh viên đang thi hoặc luyện tập, họ cần 100% sự tập trung vào câu hỏi và thời gian. Nếu đặt comment tại đây sẽ gây nhiễu, làm lộ đáp án hoặc tạo cơ hội gian lận.  
> 2. **Đúng bối cảnh Ôn tập & Tra cứu (QuizDetailView):** Mục "Danh sách thuật ngữ & câu hỏi" là nơi người học cuộn xem từng câu, đọc phân tích học thuật và rà soát kiến thức. Đây chính là lúc họ nảy sinh thắc mắc: *"Tại sao câu này lại chọn A mà không phải C?"*.  
> 3. **Trải nghiệm gập/mở gọn gàng (Collapsible Discussion Drawer):** Mỗi thẻ câu hỏi chỉ cần thêm 1 nút bấm nhỏ 💬 Thảo luận (3) ở góc dưới. Khi bấm vào, một ô comment dạng Accordion mượt mà sẽ mở ra ngay dưới câu hỏi đó, không làm nát bố cục chung.

## **🛡️ PHẦN 2: THIẾT KẾ CHỐNG PHÁ HOẠI & HÀNH VI TROLLING (ANTI-ABUSE ENGINE)**

Đối với hệ thống vài trăm đến vài nghìn sinh viên, hành vi spam, comment bậy bạ, hoặc cố tình ghi sai đáp án để gây hoang mang là rất phổ biến. Dưới đây là các **giả thuyết phá hoại** và **cơ chế phòng chống nhiều lớp**:

| Giả Thuyết Hành Vi Phá Hoại | Cơ Chế Kỹ Thuật Phòng Chống (Technical Countermeasures) |
| :---- | :---- |
| **1\. Cố tình comment đáp án sai gây hoang mang** | **Cơ chế Thuật toán Sắp xếp theo Uy tín (Reputation Weighted Sorting):** • Comment của người có điểm uy tín cao ($\\ge \+10$) luôn nằm trên cùng. • Comment bị tụt điểm xuống $\\le \-5$ sẽ **tự động bị mờ/ẩn ngầm (Auto-collapse)** kèm cảnh báo: *"Bình luận này bị cộng đồng đánh giá không uy tín"*. |
| **2\. Spam comment liên tục / BOT xả rác** | **Rate Limiting & Account Age Guard:** • Giới hạn 1 tài khoản chỉ được comment tối đa 2 lần / 1 phút. • Tài khoản mới tạo phải kích hoạt Email/Google mới được phép comment. |
| **3\. Ngôn từ đả kích, chửi bới, tục tĩu** | **Automated Content Moderation (Vietnamese Profanity Filter):** • Chạy bộ lọc từ cấm tự động trước khi lưu Database. • Nút 🚩 Báo cáo (Report): Nếu 3 người dùng khác nhau Báo cáo, comment lập tức ẩn tạm thời chờ Admin duyệt. |
| **4\. Lập dàn nick ảo vote chéo (Ring Voting)** | **1 User \- 1 Vote & Điểm Trừ Phạt (Vote Karma Limit):** • Mỗi User ID chỉ được Upvote/Downvote **đúng 1 lần** cho mỗi comment. • Nếu User A downvote bậy bạ một comment đúng mà bị cộng đồng phát hiện, User A cũng sẽ bị trừ điểm uy tín nếu comment của họ bị bắt lỗi. |

## **🟢 PHẦN 3: HỆ THỐNG ĐIỂM UY TÍN (REPUTATION SCORE & BADGES)**

### **1\. Quy tắc cộng / trừ điểm Uy tín (Reputation Algorithm):**

* **Khởi tạo**: Mỗi tài khoản mới tạo nhận mặc định **10 điểm Uy tín**.  
* **Được Upvote (Đúng / Hữu ích)**: Người viết comment nhận **\+1 điểm**.  
* **Được Downvote (Sai / Phá hoại)**: Người viết comment bị **\-1 điểm**.  
* **Bị Báo cáo (Report thành công)**: Trừ **\-5 điểm** và xóa comment.

### **2\. Thiết kế Badge độ uy tín hiển thị bên cạnh Tên Người Dùng:**

\[ Avatar \]  Nguyễn Văn A  \[ 🟢 \+42 Uy tín \]   • 2 giờ trước  
"Câu này theo Giáo trình Lịch sử Đảng trang 45 thì phương án B mới chuẩn mốc 1930..."

\[ Avatar \]  Trần Văn B    \[ 🔴 \-6 Uy tín kém \] • 15 phút trước  
(Bình luận này đã bị thu gọn do điểm uy tín quá thấp) \[Xem nội dung\]

* **Điểm Uy Tín Cao ($\\ge \+10$)**:  
  * Badge màu **Xanh Lá (Green)**: bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300  
  * Chữ: 🟢 \+42 Uy tín  
* **Điểm Trung Bình ($0 \\le \\text{Điểm} \< 10$)**:  
  * Badge màu **Xám Xanh (Slate)**: bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300  
  * Chữ: ⚪ \+5  
* **Điểm Uy Tín Kém ($\< 0$)**:  
  * Badge màu **Đỏ (Red)**: bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300  
  * Chữ: 🔴 \-4 Uy tín kém

## **🔑 PHẦN 4: HỆ THỐNG XÁC THỰC TÀI KHOẢN (GOOGLE OAUTH & FPT AUTH)**

### **1\. Đăng nhập Google (Google One-Tap / OAuth 2.0):**

* Cho phép sinh viên bấm 1-Click "Đăng nhập bằng Google" để vào học ngay mà không cần điền form.

### **2\. Đăng ký / Đăng nhập truyền thống (FPT & Personal Email):**

Giao diện Trang Đăng Ký bao gồm các trường bắt buộc:

> 1. **Họ và tên**: (VD: Nguyễn Hàn Như).  
> 2. **Email**: Hỗ trợ đuôi @fpt.edu.vn, @fe.edu.vn hoặc Email cá nhân (@gmail.com).  
> 3. **Mật khẩu**: Tối thiểu 8 ký tự.  
> 4. **Nhập lại mật khẩu**: Kiểm tra khớp 100%.  
   * 👁️ **Con mắt ẩn/hiện mật khẩu (Password Visibility Toggle)** cho cả 2 ô mật khẩu.  
> 5. **Ngày tháng năm sinh**: Khung chọn ngày chuẩn.

## **🏛️ PHẦN 5: KIẾN TRÚC HỆ THỐNG BACKEND & DATABASE (SCALABILITY FOR HUNDREDS OF USERS)**

Để phục vụ vài trăm sinh viên truy cập đồng thời mà không bị giật lag, chúng ta chọn **PostgreSQL \+ Prisma ORM** (hoặc MongoDB) chạy trên VPS Oracle hiện tại.

### **Bảng Cơ Sở Dữ Liệu (Database Schema Concept):**

Code snippet  
// 1\. Bảng Người Dùng (User)  
model User {  
  id            String    @id @default(uuid())  
  fullName      String  
  email         String    @unique  
  passwordHash  String?   // Null nếu đăng nhập bằng Google  
  dob           DateTime?  
  avatarUrl     String?  
  reputation    Int       @default(10) // Mặc định 10 điểm uy tín  
  role          String    @default("USER") // USER | ADMIN  
  comments      Comment\[\]  
  votes         Vote\[\]  
  createdAt     DateTime  @default(now())  
}

// 2\. Bảng Bình Luận (Comment)  
model Comment {  
  id          String   @id @default(uuid())  
  quizId      String   // ID bộ đề  
  questionId  String   // ID câu hỏi cụ thể trong bộ đề  
  userId      String  
  user        User     @relation(fields: \[userId\], references: \[id\])  
  content     String  
  score       Int      @default(0) // Tổng điểm upvote \- downvote  
  isHidden    Boolean  @default(false)  
  votes       Vote\[\]  
  createdAt   DateTime @default(now())  
}

// 3\. Bảng Lượt Vote (Vote \- Chống Vote lặp)  
model Vote {  
  id        String   @id @default(uuid())  
  commentId String  
  comment   Comment  @relation(fields: \[commentId\], references: \[id\])  
  userId    String  
  user      User     @relation(fields: \[userId\], references: \[id\])  
  type      Int      // \+1 (Upvote) hoặc \-1 (Downvote)  
    
  @@unique(\[commentId, userId\]) // 1 User chỉ được vote 1 lần / comment  
}

## **🗺️ PHẦN 6: LỘ TRÌNH THI CÔNG CHIA THEO 4 GIAI ĐOẠN (PHASED ROADMAP)**

Để dự án tiến triển chắc chắn, không bị xung đột code hay quá tải, hệ thống sẽ được triển khai theo 4 giai đoạn độc lập:

\[ GIAI ĐOẠN 1 \] ──► \[ GIAI ĐOẠN 2 \] ──► \[ GIAI ĐOẠN 3 \] ──► \[ GIAI ĐOẠN 4 \]  
  Database &          Google Auth &       Comment UI &         Anti-Spam &  
  Backend Setup       FPT Register       Reputation Engine    Optimistic UI

### **📍 GIAI ĐOẠN 1: Hạ Tầng Database & Server Core (Thành Trì Nền Tảng)**

* **Công việc**:  
  1. Cài đặt PostgreSQL / MongoDB trên VPS Oracle 140.245.119.189.  
  2. Khởi tạo Prisma ORM kết nối Database.  
  3. Xây dựng Middleware xác thực JWT (JSON Web Token) trên Express Server (server.js).

### **📍 GIAI ĐOẠN 2: Authentication System (Google OAuth \+ Form Đăng Ký/Đăng Nhập)**

* **Công việc**:  
  1. Tích hợp Google OAuth 2.0 Client ID.  
  2. Xây dựng UI Trang Đăng nhập / Đăng ký / Quên mật khẩu.  
  3. Thêm tính năng **Con mắt ẩn/hiện mật khẩu** và Validate đuôi Mail FPT (@fpt.edu.vn).  
  4. Lưu Session / Token vào Cookie / LocalStorage.

### **📍 GIAI ĐOẠN 3: Comment Drawer UI & Reputation Engine (Tích Hợp Vào Preview)**

* **Công việc**:  
  1. Nhúng ô thảo luận Accordion bên dưới từng câu hỏi trong QuizDetailView.jsx (Danh sách thuật ngữ & câu hỏi).  
  2. Viết API POST /api/comments và GET /api/comments/:quizId/:questionId.  
  3. Xây dựng API Vote POST /api/comments/:id/vote (+1 / \-1) và tự động tính toán lại reputation của User.  
  4. Hiển thị Badge điểm Uy tín **Màu Xanh** (Cao) và **Màu Đỏ** (Kém) kế bên tên User.

### **📍 GIAI ĐOẠN 4: Anti-Abuse Moderation, Optimistic UI & Production Deploy**

* **Công việc**:  
  1. Tích hợp bộ lọc từ cấm tiếng Việt và Nút Báo cáo (Report).  
  2. Áp dụng **Optimistic UI Updates** (Bấm vote là điểm nhảy ngay lập tức trên màn hình trước khi Server phản hồi, tạo cảm giác mượt 0ms).  
  3. Kiểm thử tải với 500 kết nối đồng thời.  
  4. Build Production, Cấu hình Nginx Docker & Deploy chính thức lên \[https://hannhu.io.vn/\](https://hannhu.io.vn/).

## **🎯 TỔNG KẾT & BẮT ĐẦU**

Kế hoạch này đảm bảo tính **đồng bộ, bảo mật cao, chống phá hoại triệt để** và mở ra một chương mới cho QuizzFlow v2.0.  
Khi bạn sẵn sàng, hãy xác nhận để Agent tiến hành thực thi **GIAI ĐOẠN 1 (Khởi tạo Database & Hạ tầng Backend Auth)** ngay lập tức\!