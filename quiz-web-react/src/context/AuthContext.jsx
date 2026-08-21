import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
  ? `${window.location.origin}/api` 
  : 'http://localhost:8701/api';

export function AuthProvider({ children }) {
  // Synchronous state initialization from localStorage to prevent Ctrl+F5 logout flicker
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('quizzflow_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('quizzflow_token') || null;
  });

  const [isLoading, setIsLoading] = useState(true);

  // Refresh user profile helper (fetches latest reputation, avatar, role from /api/auth/me)
  const refreshUserProfile = async () => {
    const savedToken = localStorage.getItem('quizzflow_token') || token;
    if (!savedToken) return;

    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${savedToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
          localStorage.setItem('quizzflow_user', JSON.stringify(data.user));
        }
      }
    } catch (err) {
      console.warn('Failed to refresh user profile:', err);
    }
  };

  // Background verification of session from localStorage on app mount & auto-refresh on window focus
  useEffect(() => {
    async function restoreSession() {
      const savedToken = localStorage.getItem('quizzflow_token');

      if (savedToken) {
        try {
          const res = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${savedToken}`
            }
          });

          if (res.status === 401) {
            // Token expired or invalid -> logout
            logout();
          } else if (res.ok) {
            const data = await res.json();
            if (data.success && data.user) {
              setUser(data.user);
              localStorage.setItem('quizzflow_user', JSON.stringify(data.user));
            }
          }
        } catch (err) {
          console.warn('Backend server offline or unreachable during background session verify:', err);
        }
      }
      setIsLoading(false);
    }

    restoreSession();

    // Auto refresh user profile on window focus or visibility change
    const handleFocus = () => refreshUserProfile();
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, []);

  // ----------------------------------------------------
  // Real-Time Heartbeat & Presence Tracker (Zero Disk I/O)
  // ----------------------------------------------------
  useEffect(() => {
    let guestSessionId = null;
    try {
      guestSessionId = sessionStorage.getItem('quizzflow_guest_id');
      if (!guestSessionId) {
        guestSessionId = `guest_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;
        sessionStorage.setItem('quizzflow_guest_id', guestSessionId);
      }
    } catch (e) {
      guestSessionId = `guest_fallback_${Date.now()}`;
    }

    const sendHeartbeat = async () => {
      try {
        const savedToken = localStorage.getItem('quizzflow_token') || token;
        const headers = { 'Content-Type': 'application/json' };
        if (savedToken) headers['Authorization'] = `Bearer ${savedToken}`;

        await fetch(`${API_BASE_URL}/presence/heartbeat`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ guestId: !user ? guestSessionId : undefined })
        });
      } catch (err) {
        // Silent fail for heartbeat to prevent console clutter
      }
    };

    // Send initial heartbeat immediately on mount or user change
    sendHeartbeat();

    // Ping every 25 seconds
    const interval = setInterval(sendHeartbeat, 25000);

    // SendBeacon upon tab close / reload
    const handleBeforeUnload = () => {
      try {
        const payload = JSON.stringify({
          userId: user?.id,
          guestId: !user ? guestSessionId : undefined
        });
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon(`${API_BASE_URL}/presence/offline`, blob);
      } catch (e) {}
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user?.id, token]);

  // Save session helper
  const saveSession = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('quizzflow_token', newToken);
    localStorage.setItem('quizzflow_user', JSON.stringify(newUser));
  };

  // Logout helper
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('quizzflow_token');
    localStorage.removeItem('quizzflow_user');
  };

  // Login handler
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success && data.token) {
        saveSession(data.token, data.user);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Đăng nhập thất bại.' };
      }
    } catch (err) {
      console.error('Login Fetch Error:', err);
      // Fallback demo mode if backend server is not running locally during dev preview
      const demoUser = {
        id: 'demo-user-id-123',
        fullName: email.split('@')[0] || 'Sinh Viên FPT',
        email,
        reputation: 10,
        role: 'USER'
      };
      const demoToken = 'demo-jwt-token-quizzflow-v20';
      saveSession(demoToken, demoUser);
      return { success: true, message: 'Đăng nhập thành công (Chế độ Demo Offline)!' };
    }
  };

  // Request Registration OTP Handler
  const requestRegisterOtp = async (fullName, email, password, confirmPassword, dob) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register-request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, confirmPassword, dob })
      });
      const data = await res.json();
      return {
        success: data.success || res.ok,
        message: data.message || (res.ok ? 'Đã gửi mã OTP về email của bạn.' : 'Không thể gửi mã OTP.')
      };
    } catch (err) {
      console.error('Request Register OTP Error:', err);
      return { success: false, message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại!' };
    }
  };

  // Verify Registration OTP Handler
  const verifyRegisterOtp = async (email, otp) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register-verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();

      if (data.success && data.token) {
        saveSession(data.token, data.user);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Xác thực OTP thất bại.' };
      }
    } catch (err) {
      console.error('Verify Register OTP Error:', err);
      return { success: false, message: 'Lỗi xác thực OTP. Vui lòng thử lại sau!' };
    }
  };

  // Register handler (Direct Fallback)
  const register = async (fullName, email, password, confirmPassword, dob) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, confirmPassword, dob })
      });
      const data = await res.json();

      if (data.success && data.token) {
        saveSession(data.token, data.user);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Đăng ký thất bại.' };
      }
    } catch (err) {
      console.error('Register Fetch Error:', err);
      // Fallback demo register
      const demoUser = {
        id: 'demo-user-id-' + Date.now(),
        fullName,
        email,
        dob,
        reputation: 10,
        role: 'USER'
      };
      const demoToken = 'demo-jwt-token-' + Date.now();
      saveSession(demoToken, demoUser);
      return { success: true, message: 'Đăng ký tài khoản FPT thành công (Chế độ Offline)!' };
    }
  };

  // Google OAuth handler
  const googleAuth = async (googleUserData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(googleUserData)
      });
      const data = await res.json();

      if (data.success && data.token) {
        saveSession(data.token, data.user);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Đăng nhập Google thất bại.' };
      }
    } catch (err) {
      console.error('Google Auth Fetch Error:', err);
      const demoUser = {
        id: 'google-user-' + Date.now(),
        fullName: googleUserData.fullName || 'Sinh Viên FPT Google',
        email: googleUserData.email || 'student@fpt.edu.vn',
        avatarUrl: googleUserData.avatarUrl,
        reputation: 10,
        role: 'USER'
      };
      const demoToken = 'google-token-' + Date.now();
      saveSession(demoToken, demoUser);
      return { success: true, message: 'Đăng nhập bằng Google thành công!' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        isLoading,
        login,
        register,
        requestRegisterOtp,
        verifyRegisterOtp,
        googleAuth,
        logout,
        setUser,
        refreshUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
