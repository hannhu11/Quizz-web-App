const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, generateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Email validation helper: Supporting @fpt.edu.vn, @fe.edu.vn, @gmail.com
const FPT_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(fpt\.edu\.vn|fe\.edu\.vn|gmail\.com)$/i;

/**
 * POST /api/auth/register
 * Đăng ký tài khoản sinh viên FPT & Email cá nhân
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

    // 3. Password Length & Match Validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu phải có độ dài tối thiểu 8 ký tự.'
      });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu nhập lại không trùng khớp với mật khẩu đã tạo.'
      });
    }

    // 4. Duplicate Email Check
    const existingUser = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() }
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
        email: email.trim().toLowerCase(),
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
        avatarUrl: user.avatarUrl
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
        avatarUrl: user.avatarUrl
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

    let user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          avatarUrl: avatarUrl || null,
          reputation: 10
        }
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
        avatarUrl: user.avatarUrl
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
      // Return success to prevent email enumeration
      return res.json({
        success: true,
        message: 'Nếu Email của bạn tồn tại trên hệ thống, link khôi phục mật khẩu đã được gửi.'
      });
    }

    if (!user.passwordHash) {
      return res.status(400).json({
        success: false,
        message: 'Tài khoản này được đăng ký qua Google OAuth. Vui lòng chọn "Đăng nhập bằng Google" trực tiếp không cần mật khẩu!'
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

    // Send email via Resend API if RESEND_API_KEY exists, else fallback to console.log
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = require('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'QuizzFlow <auth@hannhu.io.vn>',
          to: [user.email],
          subject: '🔑 Khôi phục mật khẩu tài khoản QuizzFlow',
          html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 16px;">
              <h2 style="color: #4f46e5;">QuizzFlow Password Reset</h2>
              <p>Chào <strong>${user.fullName}</strong>,</p>
              <p>Bạn vừa yêu cầu khôi phục mật khẩu tài khoản QuizzFlow. Vui lòng bấm vào nút bên dưới để đổi mật khẩu (Link có hiệu lực trong 15 phút):</p>
              <a href="${resetLink}" style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 16px 0;">Đổi Mật Khẩu Ngay</a>
              <p style="font-size: 12px; color: #64748b;">Nếu bạn không yêu cầu thao tác này, xin vui lòng bỏ qua email này.</p>
            </div>
          `
        });
      } catch (emailErr) {
        console.error('Resend Email Error:', emailErr);
      }
    } else {
      console.log('------------------------------------------------------');
      console.log('🔑 [DEV FALLBACK] PASSWORD RESET LINK FOR:', user.email);
      console.log(resetLink);
      console.log('------------------------------------------------------');
    }

    return res.json({
      success: true,
      message: 'Link khôi phục mật khẩu đã được gửi đến email của bạn!',
      resetToken // Return token for dev testing preview
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
    const { token, newPassword } = req.body;

    if (!token || !newPassword || newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu mới phải có độ dài tối thiểu 8 ký tự.'
      });
    }

    const jwt = require('jsonwebtoken');
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'quizzflow_super_secret_jwt_key_2026_v20');
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

module.exports = router;
