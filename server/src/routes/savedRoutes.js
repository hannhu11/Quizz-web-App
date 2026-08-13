const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

/**
 * GET /api/saved-questions
 * Lấy danh sách tất cả câu hỏi đã lưu / gắn sao của người dùng
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const savedList = await prisma.savedQuestion.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    const formatted = savedList.map(item => {
      let questionObj = {};
      try {
        questionObj = JSON.parse(item.questionData);
      } catch (e) {
        questionObj = {};
      }
      return {
        id: item.id,
        quizId: item.quizId,
        questionId: item.questionId,
        quizTitle: item.quizTitle,
        subjectCode: item.subjectCode,
        question: questionObj,
        createdAt: item.createdAt
      };
    });

    return res.json({
      success: true,
      count: formatted.length,
      savedQuestions: formatted
    });

  } catch (error) {
    console.error('Get Saved Questions Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ khi lấy danh sách câu hỏi đã lưu.'
    });
  }
});

/**
 * POST /api/saved-questions
 * Lưu / Gắn sao 1 câu hỏi mới
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { quizId, questionId, quizTitle, subjectCode, question } = req.body;

    if (!quizId || !questionId || !question) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu dữ liệu câu hỏi cần lưu.'
      });
    }

    const questionData = typeof question === 'string' ? question : JSON.stringify(question);

    const saved = await prisma.savedQuestion.upsert({
      where: {
        userId_quizId_questionId: { userId, quizId, questionId }
      },
      update: {
        quizTitle,
        subjectCode,
        questionData
      },
      create: {
        userId,
        quizId,
        questionId,
        quizTitle,
        subjectCode,
        questionData
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Đã lưu câu hỏi vào tài khoản của bạn!',
      saved
    });

  } catch (error) {
    console.error('Save Question Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ khi lưu câu hỏi.'
    });
  }
});

/**
 * POST /api/saved-questions/sync
 * Đồng bộ danh sách câu hỏi gắn sao từ LocalStorage lên Server
 */
router.post('/sync', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { localSavedList } = req.body; // Array of saved question objects

    if (Array.isArray(localSavedList) && localSavedList.length > 0) {
      for (const item of localSavedList) {
        if (item.quizId && (item.questionId || item.id)) {
          const qId = item.questionId || item.id;
          const qData = JSON.stringify(item.question || item);
          await prisma.savedQuestion.upsert({
            where: {
              userId_quizId_questionId: { userId, quizId: item.quizId, questionId: qId }
            },
            update: {
              quizTitle: item.quizTitle,
              subjectCode: item.subjectCode,
              questionData: qData
            },
            create: {
              userId,
              quizId: item.quizId,
              questionId: qId,
              quizTitle: item.quizTitle,
              subjectCode: item.subjectCode,
              questionData: qData
            }
          });
        }
      }
    }

    // Return current full saved questions list
    const allSaved = await prisma.savedQuestion.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    const formatted = allSaved.map(item => {
      let questionObj = {};
      try {
        questionObj = JSON.parse(item.questionData);
      } catch (e) {}
      return {
        id: item.id,
        quizId: item.quizId,
        questionId: item.questionId,
        quizTitle: item.quizTitle,
        subjectCode: item.subjectCode,
        question: questionObj,
        createdAt: item.createdAt
      };
    });

    return res.json({
      success: true,
      message: 'Đồng bộ câu hỏi đã lưu thành công!',
      count: formatted.length,
      savedQuestions: formatted
    });

  } catch (error) {
    console.error('Sync Saved Questions Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi đồng bộ câu hỏi đã lưu.'
    });
  }
});

/**
 * DELETE /api/saved-questions/:quizId/:questionId
 * Bỏ gắn sao / Bỏ lưu câu hỏi
 */
router.delete('/:quizId/:questionId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { quizId, questionId } = req.params;

    await prisma.savedQuestion.deleteMany({
      where: {
        userId,
        quizId,
        questionId
      }
    });

    return res.json({
      success: true,
      message: 'Đã bỏ lưu câu hỏi khỏi tài khoản.'
    });

  } catch (error) {
    console.error('Delete Saved Question Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa câu hỏi đã lưu.'
    });
  }
});

module.exports = router;
