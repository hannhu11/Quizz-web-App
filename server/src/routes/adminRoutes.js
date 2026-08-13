const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Middleware: Require ADMIN Role
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Bạn không có quyền truy cập trang quản trị Admin.'
    });
  }
  next();
};

/**
 * GET /api/admin/users
 * Lấy danh sách tất cả sinh viên người dùng
 */
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        dob: true,
        reputation: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.json({ success: true, count: users.length, users });
  } catch (error) {
    console.error('Admin Get Users Error:', error);
    return res.status(500).json({ success: false, message: 'Lỗi server khi lấy danh sách User.' });
  }
});

/**
 * POST /api/admin/users/:id/reputation
 * Cộng / Trừ điểm uy tín người dùng
 */
router.post('/users/:id/reputation', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { delta } = req.body; // e.g. +10 or -10

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { reputation: { increment: Number(delta) || 0 } }
    });

    return res.json({ success: true, message: 'Đã cập nhật điểm uy tín!', user: updatedUser });
  } catch (error) {
    console.error('Admin Adjust Reputation Error:', error);
    return res.status(500).json({ success: false, message: 'Lỗi server khi cập nhật điểm uy tín.' });
  }
});

/**
 * POST /api/admin/users/:id/role
 * Đổi vai trò (USER / ADMIN)
 */
router.post('/users/:id/role', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body; // 'USER' | 'ADMIN'

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role }
    });

    return res.json({ success: true, message: 'Đã cập nhật vai trò Admin!', user: updatedUser });
  } catch (error) {
    console.error('Admin Change Role Error:', error);
    return res.status(500).json({ success: false, message: 'Lỗi server khi cập nhật vai trò.' });
  }
});

/**
 * DELETE /api/admin/users/:id
 * Xóa người dùng
 */
router.delete('/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({ where: { id } });
    return res.json({ success: true, message: 'Đã xóa người dùng khỏi hệ thống.' });
  } catch (error) {
    console.error('Admin Delete User Error:', error);
    return res.status(500).json({ success: false, message: 'Lỗi server khi xóa người dùng.' });
  }
});

/**
 * GET /api/admin/comments
 * Lấy tất cả bình luận để kiểm duyệt
 */
router.get('/comments', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        user: {
          select: { fullName: true, email: true, reputation: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.json({ success: true, count: comments.length, comments });
  } catch (error) {
    console.error('Admin Get Comments Error:', error);
    return res.status(500).json({ success: false, message: 'Lỗi server khi lấy danh sách bình luận.' });
  }
});

/**
 * POST /api/admin/comments/:id/moderate
 * Ẩn hoặc hiện bình luận
 */
router.post('/comments/:id/moderate', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { isHidden } = req.body;

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { isHidden: Boolean(isHidden) }
    });

    return res.json({ success: true, message: 'Đã cập nhật trạng thái bình luận!', comment: updatedComment });
  } catch (error) {
    console.error('Admin Moderate Comment Error:', error);
    return res.status(500).json({ success: false, message: 'Lỗi server khi kiểm duyệt bình luận.' });
  }
});

module.exports = router;
