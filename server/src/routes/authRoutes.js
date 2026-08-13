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

    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() }
    });

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
 * GET /api/auth/me
 * Lấy thông tin tài khoản hiện tại qua JWT Bearer Token
 */
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        dob: true,
        avatarUrl: true,
        reputation: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thông tin tài khoản.'
      });
    }

    return res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get Me Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ khi lấy thông tin tài khoản.'
    });
  }
});

module.exports = router;
