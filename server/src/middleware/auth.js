const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'quizzflow_super_secret_jwt_key_2026_v20';

/**
 * Middleware xác thực JWT Token trong Authorization Header
 * Format: Authorization: Bearer <token>
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Yêu cầu đăng nhập để thực hiện thao tác này (Thiếu Token).'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Phiên đăng nhập đã hết hạn hoặc Token không hợp lệ.'
      });
    }
    req.user = decodedUser;
    next();
  });
}

/**
 * Middleware phân quyền Admin (Dành cho quản trị viên)
 */
function requireAdmin(req, res, next) {
  const isAuthorized = req.user && (
    req.user.role === 'ADMIN' ||
    req.user.email === 'hannhu4002@gmail.com'
  );

  if (!isAuthorized) {
    return res.status(403).json({
      success: false,
      message: 'Bạn không có quyền thực hiện thao tác quản trị này.'
    });
  }
  next();
}

/**
 * Tạo JWT Token cho User
 */
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      reputation: user.reputation
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

module.exports = {
  authenticateToken,
  requireAdmin,
  generateToken,
  JWT_SECRET
};
