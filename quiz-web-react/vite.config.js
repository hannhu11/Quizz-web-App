import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            return 'vendor-libs';
          }
          if (id.includes('quiz-app-main/quizzes/current') || id.includes('quiz-app-main\\quizzes\\current')) {
            const parts = id.replace(/\\/g, '/').split('/');
            const filename = parts[parts.length - 1] || 'quiz';
            const cleanName = filename.replace('.json', '').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase().slice(0, 20);
            return `quiz-pkg-${cleanName}`;
          }
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8701',
        changeOrigin: true,
      }
    }
  }
})

