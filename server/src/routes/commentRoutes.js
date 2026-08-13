const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Vietnamese Profanity Filter Dictionary (Basic list)
const BANNED_WORDS = ['dm', 'dkm', 'vl', 'vcl', 'cl', 'lon', 'buoi', 'cac', 'cc', 'vc', 'dmm', 'fuck'];

function containsProfanity(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return BANNED_WORDS.some(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(lower);
  });
}

/**
 * GET /api/comments/:quizId/:questionId
 * Lấy danh sách bình luận của câu hỏi (Sắp xếp theo Điểm Uy Tín người viết)
 */
router.get('/:quizId/:questionId', async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const authHeader = req.headers['authorization'];
    let currentUserId = null;

    // Optional Token parse to get user's vote state
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'quizzflow_super_secret_jwt_key_2026_v20');
        currentUserId = decoded.id;
      } catch (e) {}
    }

    const comments = await prisma.comment.findMany({
      where: {
        quizId,
        questionId
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            reputation: true,
            avatarUrl: true,
            role: true
          }
        },
        votes: currentUserId ? { where: { userId: currentUserId } } : false
      },
      orderBy: [
        { score: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    // Format response & sort high-reputation users first
    const formatted = comments.map(c => {
      const userVote = c.votes && c.votes.length > 0 ? c.votes[0].type : 0;
      const isAutoCollapsed = c.user.reputation <= -5 || c.score <= -5;
      return {
        id: c.id,
        quizId: c.quizId,
        questionId: c.questionId,
        content: c.content,
        score: c.score,
        reportCount: c.reportCount,
        isHidden: c.isHidden,
        isAutoCollapsed,
        createdAt: c.createdAt,
        user: c.user,
        userVote // +1 (Upvoted), -1 (Downvoted), 0 (None)
      };
    });

    // Custom sorting: High reputation users (>= 10) & highest score on top
    formatted.sort((a, b) => {
      if (a.user.reputation >= 10 && b.user.reputation < 10) return -1;
      if (a.user.reputation < 10 && b.user.reputation >= 10) return 1;
      return b.score - a.score;
    });

    return res.json({
      success: true,
      count: formatted.length,
      comments: formatted
    });

  } catch (error) {
    console.error('Fetch Comments Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi tải danh sách bình luận câu hỏi.'
    });
  }
});

/**
 * POST /api/comments
 * Tạo bình luận mới cho câu hỏi (Yêu cầu đăng nhập)
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { quizId, questionId, content } = req.body;
    const userId = req.user.id;

    if (!quizId || !questionId || !content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập nội dung bình luận.'
      });
    }

    if (content.trim().length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Nội dung bình luận quá dài (tối đa 1000 ký tự).'
      });
    }

    // Rate Limiting: Max 2 comments per minute per user
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const recentCount = await prisma.comment.count({
      where: {
        userId,
        createdAt: { gte: oneMinuteAgo }
      }
    });

    if (recentCount >= 2) {
      return res.status(429).json({
        success: false,
        message: 'Bạn đăng bình luận quá nhanh! Vui lòng đợi 1 phút trước khi tiếp tục.'
      });
    }

    // Profanity Filter Check
    const hasProfanity = containsProfanity(content);
    let finalContent = content.trim();
    if (hasProfanity) {
      // Mask bad words
      BANNED_WORDS.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        finalContent = finalContent.replace(regex, '***');
      });
    }

    const comment = await prisma.comment.create({
      data: {
        quizId,
        questionId,
        userId,
        content: finalContent
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            reputation: true,
            avatarUrl: true,
            role: true
          }
        }
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Đăng bình luận thảo luận thành công!',
      comment: {
        ...comment,
        userVote: 0,
        isAutoCollapsed: comment.user.reputation <= -5
      }
    });

  } catch (error) {
    console.error('Create Comment Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ khi đăng bình luận.'
    });
  }
});

/**
 * POST /api/comments/:id/vote
 * Upvote (+1) / Downvote (-1) bình luận (Yêu cầu đăng nhập & Cập nhật Reputation)
 */
router.post('/:id/vote', authenticateToken, async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;
    const { type } = req.body; // +1 or -1

    if (type !== 1 && type !== -1) {
      return res.status(400).json({
        success: false,
        message: 'Loại vote không hợp lệ (+1 hoặc -1).'
      });
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: { user: true }
    });

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bình luận.'
      });
    }

    // Check existing vote by this user on this comment
    const existingVote = await prisma.vote.findUnique({
      where: {
        commentId_userId: { commentId, userId }
      }
    });

    let scoreDelta = 0;
    let reputationDelta = 0;
    let newUserVote = 0;

    if (!existingVote) {
      // 1. New Vote
      await prisma.vote.create({
        data: { commentId, userId, type }
      });
      scoreDelta = type;
      reputationDelta = type; // +1 or -1 for author
      newUserVote = type;
    } else if (existingVote.type === type) {
      // 2. Same vote clicked again -> Cancel vote
      await prisma.vote.delete({
        where: { id: existingVote.id }
      });
      scoreDelta = -type;
      reputationDelta = -type; // Revert author reputation
      newUserVote = 0;
    } else {
      // 3. Changed vote (e.g. from +1 to -1)
      await prisma.vote.update({
        where: { id: existingVote.id },
        data: { type }
      });
      scoreDelta = type * 2; // Delta is +2 or -2
      reputationDelta = type * 2;
      newUserVote = type;
    }

    // Update Comment score
    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { score: comment.score + scoreDelta }
    });

    // Update Author Reputation (If not voting on one's own comment)
    if (comment.userId !== userId) {
      await prisma.user.update({
        where: { id: comment.userId },
        data: { reputation: comment.user.reputation + reputationDelta }
      });
    }

    return res.json({
      success: true,
      message: newUserVote !== 0 ? 'Đã ghi nhận vote của bạn!' : 'Đã hủy vote.',
      score: updatedComment.score,
      userVote: newUserVote
    });

  } catch (error) {
    console.error('Vote Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi ghi nhận vote bình luận.'
    });
  }
});

/**
 * POST /api/comments/:id/report
 * Báo cáo bình luận vi phạm
 */
router.post('/:id/report', authenticateToken, async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;
    const { reason } = req.body;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: { user: true }
    });

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bình luận.'
      });
    }

    // Check duplicate report
    const existingReport = await prisma.report.findUnique({
      where: { commentId_userId: { commentId, userId } }
    });

    if (existingReport) {
      return res.status(400).json({
        success: false,
        message: 'Bạn đã báo cáo bình luận này trước đó.'
      });
    }

    await prisma.report.create({
      data: { commentId, userId, reason: reason || 'Nội dung vi phạm/sai lệch' }
    });

    const newReportCount = comment.reportCount + 1;
    let isHidden = comment.isHidden;

    // Auto-hide if 3 reports accumulate
    if (newReportCount >= 3) {
      isHidden = true;
      // Deduct 5 reputation points from author
      await prisma.user.update({
        where: { id: comment.userId },
        data: { reputation: Math.max(-20, comment.user.reputation - 5) }
      });
    }

    await prisma.comment.update({
      where: { id: commentId },
      data: {
        reportCount: newReportCount,
        isHidden
      }
    });

    return res.json({
      success: true,
      message: 'Đã gửi báo cáo vi phạm. Cảm ơn bạn đã đóng góp xây dựng cộng đồng QuizzFlow!'
    });

  } catch (error) {
    console.error('Report Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi gửi báo cáo bình luận.'
    });
  }
});

module.exports = router;
