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
      localStorage.removeItem('quizzlet_starred_v2');
    } catch (e) {}
    window.location.href = window.location.origin + window.location.pathname + '#/';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-4">
            <h2 className="text-xl font-extrabold text-amber-400">⚡ QuizzFlow Self-Healing</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hệ thống vừa phát hiện sự cố khôi phục dữ liệu local. Đã kích hoạt cơ chế tự khắc phục.
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs transition-all shadow-md active:scale-95"
            >
              Tải lại trang chủ QuizzFlow
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </StrictMode>,
)
