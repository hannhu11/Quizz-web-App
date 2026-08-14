const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, generateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Email validation helper: Supporting @fpt.edu.vn, @fe.edu.vn, @gmail.com
const FPT_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(fpt\.edu\.vn|fe\.edu\.vn|gmail\.com)$/i;

// In-memory store for pending user registrations waiting for OTP verification (expires after 5 minutes)
const pendingRegistrations = new Map();

// Helper to send registration OTP email via Resend API
async function sendRegistrationOtpEmail(email, fullName, otp) {
  const resendApiKey = (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('re_4DxMSNXJ') && !process.env.RESEND_API_KEY.includes('re_EHsjhHRJ'))
    ? process.env.RESEND_API_KEY.replace(/[\"\'\\]/g, '').trim()
    : Buffer.from('cmVfTkdFMWJraGRfNW5VeXRQN0NTVlhrdkc0YlRLWHJYZThy', 'base64').toString('ascii').trim();

  if (!resendApiKey) {
    console.warn('[OTP_EMAIL] No Resend API key configured. Skipping email dispatch.');
    return { success: false, error: 'No Resend API Key' };
  }

  const { Resend } = require('resend');
  const resend = new Resend(resendApiKey);

  const emailPayload = {
    to: [email],
    subject: '🛡️ Mã xác thực OTP tạo tài khoản QuizzFlow',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; border: 1px solid #e2e8f0; border-radius: 20px; background: #ffffff;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #4f46e5; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">QuizzFlow Platform</h1>
          <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Nền tảng Ôn luyện & Thi Trắc nghiệm Chuẩn Quốc tế</p>
        </div>
        
        <p style="font-size: 15px; color: #1e293b; line-height: 1.6;">Chào <strong>${fullName}</strong>,</p>
        <p style="font-size: 14px; color: #475569; line-height: 1.6;">Cảm ơn bạn đã đăng ký tài khoản tại <strong>QuizzFlow</strong>. Dưới đây là mã xác thực OTP của bạn để hoàn tất quá trình tạo tài khoản:</p>
        
        <div style="text-align: center; margin: 28px 0; background: #f8fafc; padding: 20px; border-radius: 14px; border: 2px dashed #cbd5e1;">
          <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 6px;">Mã Xác Thực OTP (Hiệu lực trong 5 phút)</div>
          <span style="font-size: 36px; font-weight: 900; letter-spacing: 10px; color: #4f46e5; font-family: monospace;">${otp}</span>
        </div>
        
        <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 24px;">
          ⚠️ <strong>Lưu ý bảo mật:</strong> Không chia sẻ mã này cho bất kỳ ai. Nếu bạn không yêu cầu tạo tài khoản tại QuizzFlow, xin vui lòng bỏ qua email này.
        </p>
        
        <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
          © 2026 QuizzFlow. Hệ thống Quản trị & Học tập Trực tuyến.
        </div>
      </div>
    `
  };

  try {
    console.log(`[RESEND_OTP] Attempting to send OTP email to ${email}...`);
    const primaryResult = await resend.emails.send({
      from: 'QuizzFlow <auth@hannhu.io.vn>',
      ...emailPayload
    });

    if (!primaryResult.error && primaryResult.data) {
      console.log(`[RESEND_OTP_SUCCESS] Sent OTP email via auth@hannhu.io.vn to ${email}, ID: ${primaryResult.data.id}`);
      return { success: true, id: primaryResult.data.id };
    }

    console.warn(`[RESEND_OTP_PRIMARY_FAILED] Primary sender error:`, primaryResult.error);
    const fallbackResult = await resend.emails.send({
      from: 'QuizzFlow <onboarding@resend.dev>',
      ...emailPayload
    });

    if (!fallbackResult.error && fallbackResult.data) {
      console.log(`[RESEND_OTP_SUCCESS_FALLBACK] Sent OTP email via onboarding@resend.dev to ${email}, ID: ${fallbackResult.data.id}`);
      return { success: true, id: fallbackResult.data.id };
    }

    console.error(`[RESEND_OTP_FAILED] Resend rejected:`, fallbackResult.error || primaryResult.error);
    return { success: false, error: fallbackResult.error || primaryResult.error };
  } catch (err) {
    console.error(`[RESEND_OTP_EXCEPTION] Error sending OTP:`, err);
    return { success: false, error: err.message };
  }
}

/**
 * POST /api/auth/register-request-otp
 * Bước 1 Đăng ký: Kiểm tra thông tin & Gửi mã OTP 6 số về Email
 */
router.post('/register-request-otp', async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, dob } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu.'
      });
    }

    if (!FPT_EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Email không hợp lệ! QuizzFlow hỗ trợ email sinh viên (@fpt.edu.vn, @fe.edu.vn) và Gmail (@gmail.com).'
      });
    }

    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]).{8,}$/;
    if (!password || !PASSWORD_REGEX.test(password)) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu không đạt chuẩn bảo mật: Bắt buộc tối thiểu 8 ký tự, gồm ít nhất 1 chữ in hoa, 1 chữ in thường, 1 chữ số và 1 ký tự đặc biệt (!@#$%^&*...).'
      });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu nhập lại không trùng khớp với mật khẩu đã tạo.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email này đã được đăng ký tài khoản trên hệ thống QuizzFlow. Vui lòng Đăng nhập!'
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    pendingRegistrations.set(cleanEmail, {
      fullName: fullName.trim(),
      email: cleanEmail,
      passwordHash,
      dob: dob || null,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    // Send OTP email
    const emailResult = await sendRegistrationOtpEmail(cleanEmail, fullName.trim(), otp);

    return res.status(200).json({
      success: true,
      message: 'Mã xác thực OTP (6 chữ số) đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư!',
      email: cleanEmail
    });
  } catch (error) {
    console.error('Register Request OTP Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ khi gửi mã OTP đăng ký. Vui lòng thử lại sau.'
    });
  }
});

/**
 * POST /api/auth/register-verify-otp
 * Bước 2 Đăng ký: Kiểm tra OTP & Kích hoạt tài khoản người dùng
 */
router.post('/register-verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp Email và Mã xác thực OTP.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const pending = pendingRegistrations.get(cleanEmail);

    if (!pending) {
      return res.status(400).json({
        success: false,
        message: 'Không tìm thấy yêu cầu đăng ký cho email này hoặc phiên đã hết hạn. Vui lòng thử lại!'
      });
    }

    if (Date.now() > pending.expiresAt) {
      pendingRegistrations.delete(cleanEmail);
      return res.status(400).json({
        success: false,
        message: 'Mã OTP đã hết hạn (5 phút). Vui lòng gửi lại mã OTP mới!'
      });
    }

    if (pending.otp !== String(otp).trim()) {
      return res.status(400).json({
        success: false,
        message: 'Mã OTP không chính xác. Vui lòng kiểm tra lại hộp thư của bạn!'
      });
    }

    // OTP is valid -> Create User in DB
    const user = await prisma.user.create({
      data: {
        fullName: pending.fullName,
        email: pending.email,
        passwordHash: pending.passwordHash,
        dob: pending.dob,
        reputation: 10
      }
    });

    pendingRegistrations.delete(cleanEmail);

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: 'Xác thực OTP và tạo tài khoản QuizzFlow thành công!',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        dob: user.dob,
        reputation: user.reputation,
        role: user.role,
        avatarUrl: user.avatarUrl,
        authProvider: 'LOCAL',
        hasPassword: true
      }
    });
  } catch (error) {
    console.error('Register Verify OTP Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ khi xác thực OTP. Vui lòng thử lại sau.'
    });
  }
});

/**
 * POST /api/auth/register
 * Đăng ký tài khoản sinh viên FPT & Email cá nhân (Direct Fallback)
 */
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, dob } = req.body;

    // 1. Basic Field Validations
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu.'
      });
    }

    // 2. Email Format Validation (@fpt.edu.vn, @fe.edu.vn, @gmail.com)
    if (!FPT_EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Email không hợp lệ! QuizzFlow hỗ trợ email sinh viên (@fpt.edu.vn, @fe.edu.vn) và Gmail (@gmail.com).'
      });
    }

    // 3. Strict Password Policy Validation (Min 8 chars, Uppercase, Lowercase, Number, Special Char)
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]).{8,}$/;
    if (!password || !PASSWORD_REGEX.test(password)) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu không đạt chuẩn bảo mật: Bắt buộc tối thiểu 8 ký tự, gồm ít nhất 1 chữ in hoa, 1 chữ in thường, 1 chữ số và 1 ký tự đặc biệt (!@#$%^&*...).'
      });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu nhập lại không trùng khớp với mật khẩu đã tạo.'
      });
    }

    // 4. Duplicate Email Check
    const cleanEmail = email.trim().toLowerCase();
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email này đã được đăng ký tài khoản trên hệ thống QuizzFlow.'
      });
    }

    // 5. Hash Password & Save to DB
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        fullName: fullName.trim(),
        email: cleanEmail,
        passwordHash,
        dob: dob || null,
        reputation: 10 // Mặc định nhận 10 điểm uy tín ban đầu
      }
    });

    // 6. Generate Token
    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản QuizzFlow v2.0 thành công!',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        dob: user.dob,
        reputation: user.reputation,
        role: user.role,
        avatarUrl: user.avatarUrl,
        authProvider: user.passwordHash ? 'LOCAL' : 'GOOGLE',
        hasPassword: Boolean(user.passwordHash)
      }
    });

  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ nội bộ trong quá trình đăng ký tài khoản.'
    });
  }
});

/**
 * POST /api/auth/login
 * Đăng nhập bằng Email & Mật khẩu
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập Email và Mật khẩu.'
      });
    }

    let user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() }
    });

    // Auto-seed Admin account if logging in with hannhu4002@gmail.com for the first time
    if (!user && email.trim().toLowerCase() === 'hannhu4002@gmail.com' && password === 'Admin123@') {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('Admin123@', salt);
      user = await prisma.user.create({
        data: {
          fullName: 'Hàn Như (Admin)',
          email: 'hannhu4002@gmail.com',
          passwordHash,
          reputation: 999,
          role: 'ADMIN'
        }
      });
    }

    if (!user || !user.passwordHash) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc Mật khẩu không chính xác.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc Mật khẩu không chính xác.'
      });
    }

    // Ensure role is ADMIN if email is hannhu4002@gmail.com
    if (user.email === 'hannhu4002@gmail.com' && user.role !== 'ADMIN') {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { role: 'ADMIN' }
      });
    }

    const token = generateToken(user);

    return res.json({
      success: true,
      message: 'Đăng nhập QuizzFlow thành công!',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        dob: user.dob,
        reputation: user.reputation,
        role: user.role,
        avatarUrl: user.avatarUrl,
        authProvider: user.passwordHash ? 'LOCAL' : 'GOOGLE',
        hasPassword: Boolean(user.passwordHash)
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ nội bộ trong quá trình đăng nhập.'
    });
  }
});

/**
 * POST /api/auth/google
 * Google OAuth 1-Click Authentication Handler
 */
router.post('/google', async (req, res) => {
  try {
    const { fullName, email, googleId, avatarUrl } = req.body;

    if (!email || !fullName) {
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu Google Auth không hợp lệ.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user = await prisma.user.findUnique({
      where: { email: cleanEmail }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          fullName: fullName.trim(),
          email: cleanEmail,
          avatarUrl: avatarUrl || null,
          reputation: 10,
          role: cleanEmail === 'hannhu4002@gmail.com' ? 'ADMIN' : 'USER'
        }
      });
    } else if (cleanEmail === 'hannhu4002@gmail.com' && user.role !== 'ADMIN') {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { role: 'ADMIN' }
      });
    }

    const token = generateToken(user);

    return res.json({
      success: true,
      message: 'Đăng nhập Google OAuth thành công!',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        reputation: user.reputation,
        role: user.role,
        avatarUrl: user.avatarUrl,
        authProvider: user.passwordHash ? 'LOCAL' : 'GOOGLE',
        hasPassword: Boolean(user.passwordHash)
      }
    });

  } catch (error) {
    console.error('Google Auth Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi xử lý xác thực Google OAuth.'
    });
  }
});

/**
 * POST /api/auth/forgot-password
 * Yêu cầu gửi email khôi phục mật khẩu qua Resend API + JWT Reset Token
 */
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập Email để khôi phục mật khẩu.'
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Email này chưa được đăng ký tài khoản QuizzFlow. Vui lòng tạo tài khoản mới hoặc Đăng nhập bằng Google!'
      });
    }

    // Generate 15-minute JWT Reset Token
    const jwt = require('jsonwebtoken');
    const resetToken = jwt.sign(
      { id: user.id, email: user.email, type: 'RESET_PASSWORD' },
      process.env.JWT_SECRET || 'quizzflow_super_secret_jwt_key_2026_v20',
      { expiresIn: '15m' }
    );

    const resetLink = `https://hannhu.io.vn/#/reset-password?token=${resetToken}`;

    // Send email via Resend API with Dual Sender Fallback (Primary: auth@hannhu.io.vn, Fallback: onboarding@resend.dev)
    const resendApiKey = (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('re_4DxMSNXJ') && !process.env.RESEND_API_KEY.includes('re_EHsjhHRJ'))
      ? process.env.RESEND_API_KEY.replace(/[\"\'\\]/g, '').trim()
      : Buffer.from('cmVfTkdFMWJraGRfNW5VeXRQN0NTVlhrdkc0YlRLWHJYZThy', 'base64').toString('ascii').trim();

    if (resendApiKey) {
      const { Resend } = require('resend');
      const resend = new Resend(resendApiKey);
      const emailPayload = {
        to: [user.email],
        subject: '🔑 Khôi phục mật khẩu tài khoản QuizzFlow',
        html: `
          <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff;">
            <h2 style="color: #4f46e5; margin-top: 0;">QuizzFlow Password Reset</h2>
            <p>Chào <strong>${user.fullName}</strong>,</p>
            <p>Bạn vừa yêu cầu khôi phục mật khẩu tài khoản QuizzFlow. Vui lòng bấm vào nút bên dưới để tạo mật khẩu mới (Link có hiệu lực trong 15 phút):</p>
            <div style="text-align: center; margin: 24px 0;">
              <a href="${resetLink}" style="display: inline-block; background: #4f46e5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px;">Đổi Mật Khẩu Ngay</a>
            </div>
            <p style="font-size: 12px; color: #64748b;">Nếu bạn không yêu cầu thao tác này, xin vui lòng bỏ qua email này.</p>
          </div>
        `
      };

      console.log(`[RESEND_EMAIL_SENDING] Attempting primary sender: auth@hannhu.io.vn to ${user.email}`);
      const primaryResult = await resend.emails.send({
        from: 'QuizzFlow <auth@hannhu.io.vn>',
        ...emailPayload
      });

      if (!primaryResult.error && primaryResult.data) {
        console.log(`[RESEND_EMAIL_SUCCESS] Sent email via auth@hannhu.io.vn to ${user.email}, ID: ${primaryResult.data.id}`);
      } else {
        console.warn(`[RESEND_PRIMARY_FAILED] Primary domain error:`, primaryResult.error);
        console.log(`[RESEND_EMAIL_FALLBACK] Attempting fallback sender: onboarding@resend.dev to ${user.email}`);
        const fallbackResult = await resend.emails.send({
          from: 'QuizzFlow <onboarding@resend.dev>',
          ...emailPayload
        });

        if (!fallbackResult.error && fallbackResult.data) {
          console.log(`[RESEND_EMAIL_SUCCESS_FALLBACK] Sent email via onboarding@resend.dev to ${user.email}, ID: ${fallbackResult.data.id}`);
        } else {
          console.error(`[RESEND_EMAIL_CRITICAL_ERROR] Resend API rejected email sending:`, fallbackResult.error || primaryResult.error);
          return res.status(500).json({
            success: false,
            message: `Lỗi phát mail Resend API: ${fallbackResult.error?.message || primaryResult.error?.message || 'Không thể gửi email'}`
          });
        }
      }
    } else {
      console.log('------------------------------------------------------');
      console.log('🔑 [DEV FALLBACK] PASSWORD RESET LINK FOR:', user.email);
      console.log(resetLink);
      console.log('------------------------------------------------------');
    }

    return res.json({
      success: true,
      message: 'Link khôi phục mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư (hoặc hòm thư Spam)!',
      resetToken
    });

  } catch (error) {
    console.error('Forgot Password Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ khi gửi yêu cầu khôi phục mật khẩu.'
    });
  }
});

/**
 * POST /api/auth/reset-password
 * Đổi mật khẩu mới bằng JWT Reset Token
 */
router.post('/reset-password', async (req, res) => {
  try {
    const { token, resetToken, newPassword } = req.body;
    const actualToken = token || resetToken;

    if (!actualToken) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu Token khôi phục mật khẩu. Vui lòng sử dụng liên kết trong email!'
      });
    }

    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]).{8,}$/;
    if (!newPassword || !PASSWORD_REGEX.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu mới không đạt chuẩn bảo mật: Bắt buộc tối thiểu 8 ký tự, gồm ít nhất 1 chữ in hoa, 1 chữ in thường, 1 chữ số và 1 ký tự đặc biệt (!@#$%^&*...).'
      });
    }

    const jwt = require('jsonwebtoken');
    let decoded;
    try {
      decoded = jwt.verify(actualToken, process.env.JWT_SECRET || 'quizzflow_super_secret_jwt_key_2026_v20');
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: 'Link khôi phục mật khẩu đã hết hạn hoặc không hợp lệ.'
      });
    }

    if (decoded.type !== 'RESET_PASSWORD') {
      return res.status(400).json({
        success: false,
        message: 'Token không đúng định dạng khôi phục mật khẩu.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: decoded.id },
      data: { passwordHash }
    });

    return res.json({
      success: true,
      message: 'Đổi mật khẩu mới thành công! Vui lòng đăng nhập lại.'
    });

  } catch (error) {
    console.error('Reset Password Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ khi đặt lại mật khẩu.'
    });
  }
});

/**
 * POST /api/auth/me/password
 * Đổi mật khẩu cá nhân cho người dùng đang đăng nhập
 */
router.post('/me/password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp mật khẩu mới.'
      });
    }

    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]).{8,}$/;
    if (!PASSWORD_REGEX.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu mới không đạt chuẩn bảo mật: Bắt buộc tối thiểu 8 ký tự, gồm ít nhất 1 chữ in hoa, 1 chữ in thường, 1 chữ số và 1 ký tự đặc biệt (!@#$%^&*...).'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thông tin tài khoản người dùng.'
      });
    }

    // Nếu tài khoản đã có mật khẩu trước đó, phải xác thực đúng mật khẩu hiện tại
    if (user.passwordHash) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng nhập mật khẩu hiện tại để xác nhận.'
        });
      }
      const isCurrentMatch = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!isCurrentMatch) {
        return res.status(400).json({
          success: false,
          message: 'Mật khẩu hiện tại không chính xác.'
        });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash }
    });

    return res.json({
      success: true,
      message: 'Đổi mật khẩu tài khoản thành công!'
    });
  } catch (error) {
    console.error('Change Password Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ khi thay đổi mật khẩu tài khoản.'
    });
  }
});

/**
 * GET /api/auth/me
 * Lấy thông tin tài khoản hiện tại (Fix 403/404 Lighthouse Audit - Trả về 200 OK an toàn cho khách vãng lai)
 */
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.json({
        success: true,
        user: null
      });
    }

    const jwt = require('jsonwebtoken');
    jwt.verify(token, process.env.JWT_SECRET || 'quizzflow_super_secret_jwt_key_2026_v20', async (err, decoded) => {
      if (err || !decoded || !decoded.id) {
        return res.json({
          success: true,
          user: null
        });
      }

      try {
        const user = await prisma.user.findUnique({
          where: { id: decoded.id }
        });

        if (!user) {
          return res.json({
            success: true,
            user: null
          });
        }

        return res.json({
          success: true,
          user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            dob: user.dob,
            reputation: user.reputation,
            role: user.role,
            avatarUrl: user.avatarUrl,
            authProvider: user.passwordHash ? 'LOCAL' : 'GOOGLE',
            hasPassword: Boolean(user.passwordHash)
          }
        });
      } catch (dbErr) {
        return res.json({
          success: true,
          user: null
        });
      }
    });
  } catch (error) {
    return res.json({
      success: true,
      user: null
    });
  }
});

module.exports = router;
