/**
 * QuizzFlow In-Memory Real-Time Presence Service
 * High-Performance, Zero Disk I/O, Sub-millisecond RAM Tracker
 */

const activeUsersMap = new Map(); // userId -> { id, fullName, email, role, lastSeen: timestamp, ip }
const activeGuestsMap = new Map(); // guestSessionId -> { id, lastSeen: timestamp }

const ONLINE_THRESHOLD_MS = 50 * 1000; // 50 seconds threshold for active online status

/**
 * Record a heartbeat ping from a student or guest
 */
function recordHeartbeat({ userId, fullName, email, role, guestId, ip }) {
  const now = Date.now();
  if (userId) {
    activeUsersMap.set(String(userId), {
      id: String(userId),
      fullName: fullName || 'Sinh viên',
      email: email || '',
      role: role || 'USER',
      lastSeen: now,
      ip: ip || ''
    });
  } else if (guestId) {
    activeGuestsMap.set(String(guestId), {
      id: String(guestId),
      lastSeen: now
    });
  }
}

/**
 * Mark a user or guest offline immediately (called on beforeunload beacon)
 */
function markOffline({ userId, guestId }) {
  if (userId) {
    activeUsersMap.delete(String(userId));
  }
  if (guestId) {
    activeGuestsMap.delete(String(guestId));
  }
}

/**
 * Get aggregated presence data for Admin Dashboard
 */
function getActivePresence() {
  const now = Date.now();
  const onlineUsersList = [];

  for (const [userId, data] of activeUsersMap.entries()) {
    if (now - data.lastSeen <= ONLINE_THRESHOLD_MS) {
      onlineUsersList.push({
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        lastSeen: data.lastSeen,
        secondsAgo: Math.max(0, Math.round((now - data.lastSeen) / 1000))
      });
    } else {
      activeUsersMap.delete(userId); // auto GC
    }
  }

  let onlineGuestsCount = 0;
  for (const [guestId, data] of activeGuestsMap.entries()) {
    if (now - data.lastSeen <= ONLINE_THRESHOLD_MS) {
      onlineGuestsCount++;
    } else {
      activeGuestsMap.delete(guestId); // auto GC
    }
  }

  return {
    success: true,
    onlineUsersCount: onlineUsersList.length,
    onlineGuestsCount,
    totalOnline: onlineUsersList.length + onlineGuestsCount,
    onlineUsers: onlineUsersList
  };
}

// Background Garbage Collector every 60s
setInterval(() => {
  const now = Date.now();
  for (const [userId, data] of activeUsersMap.entries()) {
    if (now - data.lastSeen > ONLINE_THRESHOLD_MS * 2) {
      activeUsersMap.delete(userId);
    }
  }
  for (const [guestId, data] of activeGuestsMap.entries()) {
    if (now - data.lastSeen > ONLINE_THRESHOLD_MS * 2) {
      activeGuestsMap.delete(guestId);
    }
  }
}, 60000);

module.exports = {
  recordHeartbeat,
  markOffline,
  getActivePresence,
  ONLINE_THRESHOLD_MS
};
