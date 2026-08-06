import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Trash2 } from 'lucide-react';

export default function CustomModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-xl bg-white rounded-3xl p-6 border border-warm-border shadow-soft-lg z-10 overflow-hidden max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-warm-border/60">
            <h3 className="text-base font-bold text-warm-text">{title}</h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-warm-hover text-warm-muted hover:text-warm-text transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="py-4 overflow-y-auto flex-1">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
