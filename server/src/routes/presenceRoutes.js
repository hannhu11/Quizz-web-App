const express = require('express');
const { optionalAuthenticateToken } = require('../middleware/auth');
const { recordHeartbeat, markOffline } = require('../services/presenceService');

const router = express.Router();

/**
 * POST /api/presence/heartbeat
 * Records heartbeat from authenticated user or guest
 */
router.post('/heartbeat', optionalAuthenticateToken, (req, res) => {
  const user = req.user;
  const guestId = req.body?.guestId;
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';

  if (user) {
    recordHeartbeat({
      userId: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      ip
    });
  } else if (guestId) {
    recordHeartbeat({
      guestId,
      ip
    });
  }

  return res.json({ success: true, timestamp: Date.now() });
});

/**
 * POST /api/presence/offline
 * Beacon endpoint called when student or guest closes browser/tab
 */
router.post('/offline', optionalAuthenticateToken, (req, res) => {
  const userId = req.user?.id || req.body?.userId;
  const guestId = req.body?.guestId;

  markOffline({ userId, guestId });
  return res.json({ success: true });
});

module.exports = router;
