import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Global Error Boundary caught error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {}
    window.location.href = window.location.origin + window.location.pathname;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-4">
            <h2 className="text-xl font-extrabold text-amber-400">⚡ QuizzFlow Self-Healing</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hệ thống vừa phát hiện sự cố dữ liệu local cũ. Đã kích hoạt cơ chế tự khôi phục dữ liệu sạch.
            </p>
            {this.state.error?.message && (
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 text-[11px] font-mono text-rose-300 text-left overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Dọn Dẹp Bộ Nhớ & Tải Lại Trang Chủ QuizzFlow
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GlobalErrorBoundary>
  </StrictMode>,
)
