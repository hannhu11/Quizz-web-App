# AGENT SKILLS REFERENCE MAP

Mọi AI Agent khi nhận nhiệm vụ BẮT BUỘC phải tham chiếu trực tiếp đến các file kỹ thuật trong thư mục Local:
- Core Rules & Memory: `C:\Users\ADMIN\Downloads\Quizzlet app\.agents\rules\memory.md`
- Phản biện & Skill tương tác: `C:\Users\ADMIN\Downloads\Quizzlet app\Reffernce\NHOM_2_CORE_LOGIC\skills-main`
- Kỹ thuật Lập trình & TDD: `C:\Users\ADMIN\Downloads\Quizzlet app\Reffernce\NHOM_2_CORE_LOGIC\agent-skills-main`
- Quy trình tự chủ Devin: `C:\Users\ADMIN\Downloads\Quizzlet app\Reffernce\NHOM_2_CORE_LOGIC\devin.cursorrules-master`

# Quy Tắc Phát Triển & Deploy Dự Án Quizz App (Hàn Như)

## 1. Commit & Push GitHub Standard
- Mỗi khi hoàn thành thay đổi, BẮT BUỘC commit với message tiếng Việt rõ ràng, mô tả chính xác những tính năng đã thêm hoặc lỗi đã sửa.
- Remote Repository duy nhất: `https://github.com/hannhu11/Quizz-web-App`

## 2. Tiêu Chuẩn Bảo Mật Quốc Tế (Strict Security & Exclusions)
- TUYỆT ĐỐI KHÔNG push các file chứa thông tin nhạy cảm lên GitHub:
  - Private SSH Key (`*.key`, `*.pem`, `*.pub`, `ssh-key*`)
  - Biến môi trường & Credentials (`.env`, `.env.*`, `secrets.*`, API Keys, Passwords)
  - File hướng dẫn deploy nội bộ (`DEPLOY_GITHUB_VPS_GUIDE.md`)
  - Thư mục temporary & binary build không cần thiết (`.venv/`, `node_modules/`, `build/`, `*.exe`, `*.dill`)
- Luôn kiểm tra `.gitignore` và chạy kiểm tra bảo mật trước khi `git commit` / `git push`.

## 3. Quy Trình Deploy VPS (`hannhu.io.vn`)
- Sau mỗi thay đổi, BẮT BUỘC deploy bản Web lên VPS Oracle `140.245.119.189`:
  - Thư mục VPS: `/home/ubuntu/quizlet-app/`
  - Quản lý process: `pm2 restart quizlet-app`
  - Domain: `https://hannhu.io.vn/`
- Kiểm tra trực tiếp qua HTTPS / API `/api/sync` sau khi deploy.

## 4. Đồng Bộ Đa Nền Tảng (Web & Windows Desktop)
- Tất cả thay đổi về UI/UX và Logic trong dự án phải giữ tính nhất quán giữa bản Web và bản Windows Desktop.
- BẮT BUỘC thực hiện `flutter build windows --release` để đóng gói bản cài đặt Windows cho người dùng sau khi cập nhật tính năng.
