import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

export default function ImportModal({ isOpen, onClose, onImportData }) {
  const [rawText, setRawText] = useState('');
  const [termDelimiter, setTermDelimiter] = useState('tab'); // 'tab' | 'comma' | 'custom_term'
  const [customTermDelimiter, setCustomTermDelimiter] = useState('-');
  
  const [cardDelimiter, setCardDelimiter] = useState('newline'); // 'newline' | 'semicolon' | 'custom_card'
  const [customCardDelimiter, setCustomCardDelimiter] = useState('||');

  const [parsedCards, setParsedCards] = useState([]);

  // Real-time Live Parser
  useEffect(() => {
    if (!rawText.trim()) {
      setParsedCards([]);
      return;
    }

    // Determine actual card splitting string/regex
    let rawCards = [];
    if (cardDelimiter === 'newline') {
      rawCards = rawText.split(/\r?\n/);
    } else if (cardDelimiter === 'semicolon') {
      rawCards = rawText.split(';');
    } else if (cardDelimiter === 'custom_card') {
      const sep = customCardDelimiter || '\n';
      rawCards = rawText.split(sep);
    }

    // Determine term splitting
    let termSep = '\t';
    if (termDelimiter === 'comma') {
      termSep = ',';
    } else if (termDelimiter === 'custom_term') {
      termSep = customTermDelimiter || '\t';
    }

    const cards = [];
    rawCards.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      let parts = [];
      if (termDelimiter === 'tab') {
        parts = trimmed.split(/\t+/);
      } else {
        parts = trimmed.split(termSep);
      }

      if (parts.length >= 2) {
        const term = parts[0].trim();
        const definition = parts[1].trim();
        const explanation = parts.slice(2).join(' ').trim(); // Field 3 (Explanation if present)
        if (term || definition) {
          cards.push({ term, definition, explanation });
        }
      } else if (parts.length === 1 && parts[0].trim()) {
        cards.push({ term: parts[0].trim(), definition: '', explanation: '' });
      }
    });

    setParsedCards(cards);
  }, [rawText, termDelimiter, customTermDelimiter, cardDelimiter, customCardDelimiter]);

  if (!isOpen) return null;

  const handleConfirmImport = () => {
    if (parsedCards.length > 0) {
      onImportData(parsedCards);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-warm-border dark:border-slate-800 shadow-soft-lg z-10 max-h-[90vh] flex flex-col overflow-hidden text-warm-text dark:text-slate-100"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-warm-border/60 dark:border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" /> Import your data
              </h2>
              <p className="text-xs text-warm-muted dark:text-slate-400 mt-0.5">
                Copy and Paste your data here (from Word, Excel, Google Docs, Quizlet, etc.)
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-muted dark:text-slate-400 hover:text-warm-text transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Scroll Area */}
          <div className="py-5 overflow-y-auto flex-1 space-y-6 pr-1">
            {/* Raw Textarea */}
            <div className="space-y-2">
              <textarea
                rows={7}
                placeholder="Word 1    Definition 1&#10;Word 2    Definition 2&#10;Word 3    Definition 3"
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full p-4 rounded-2xl bg-warm-bg/60 dark:bg-slate-800/60 border border-warm-border dark:border-slate-700 text-xs sm:text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400/40 resize-y"
              />
            </div>

            {/* Delimiter Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-2xl bg-warm-bg/40 dark:bg-slate-800/40 border border-warm-border/60 dark:border-slate-800 text-xs">
              {/* Between Term and Definition */}
              <div className="space-y-2.5">
                <label className="font-bold text-slate-900 dark:text-slate-100 block">
                  Between Term and Definition
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="termDelim"
                      checked={termDelimiter === 'tab'}
                      onChange={() => setTermDelimiter('tab')}
                      className="accent-amber-600"
                    />
                    <span>Tab (Default for Excel/Word)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="termDelim"
                      checked={termDelimiter === 'comma'}
                      onChange={() => setTermDelimiter('comma')}
                      className="accent-amber-600"
                    />
                    <span>Comma (,)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="termDelim"
                      checked={termDelimiter === 'custom_term'}
                      onChange={() => setTermDelimiter('custom_term')}
                      className="accent-amber-600"
                    />
                    <span>Custom:</span>
                    {termDelimiter === 'custom_term' && (
                      <input
                        type="text"
                        value={customTermDelimiter}
                        onChange={(e) => setCustomTermDelimiter(e.target.value)}
                        className="w-16 px-2 py-0.5 rounded border border-warm-border dark:border-slate-700 bg-white dark:bg-slate-900 text-center font-mono"
                      />
                    )}
                  </label>
                </div>
              </div>

              {/* Between cards */}
              <div className="space-y-2.5">
                <label className="font-bold text-slate-900 dark:text-slate-100 block">
                  Between cards
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="cardDelim"
                      checked={cardDelimiter === 'newline'}
                      onChange={() => setCardDelimiter('newline')}
                      className="accent-amber-600"
                    />
                    <span>New Line (Default)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="cardDelim"
                      checked={cardDelimiter === 'semicolon'}
                      onChange={() => setCardDelimiter('semicolon')}
                      className="accent-amber-600"
                    />
                    <span>Semicolon (;)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="cardDelim"
                      checked={cardDelimiter === 'custom_card'}
                      onChange={() => setCardDelimiter('custom_card')}
                      className="accent-amber-600"
                    />
                    <span>Custom:</span>
                    {cardDelimiter === 'custom_card' && (
                      <input
                        type="text"
                        value={customCardDelimiter}
                        onChange={(e) => setCustomCardDelimiter(e.target.value)}
                        className="w-16 px-2 py-0.5 rounded border border-warm-border dark:border-slate-700 bg-white dark:bg-slate-900 text-center font-mono"
                      />
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Live Real-time Preview Area */}
            <div className="space-y-3 border-t border-warm-border/60 dark:border-slate-800 pt-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100">
                <span>Preview ({parsedCards.length} cards)</span>
                {parsedCards.length > 0 && (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Sẵn sàng Import
                  </span>
                )}
              </div>

              {parsedCards.length === 0 ? (
                <div className="text-center py-6 text-xs text-warm-muted dark:text-slate-500 bg-warm-hover/40 dark:bg-slate-800/40 rounded-2xl border border-dashed border-warm-border dark:border-slate-700">
                  Nothing to preview yet. Paste your text above.
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {parsedCards.map((card, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-warm-border dark:border-slate-700 text-xs flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800 shrink-0">
                          #{idx + 1}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-slate-100 truncate">
                          {card.term || '(Trống)'}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 text-warm-slate dark:text-slate-300 truncate">
                        {card.definition || '(Chưa có định nghĩa)'}
                      </div>

                      {card.explanation && (
                        <div className="text-[11px] italic text-amber-800 dark:text-amber-300 shrink-0">
                          💡 {card.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="pt-4 border-t border-warm-border/60 dark:border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-warm-border dark:border-slate-700 text-xs font-semibold text-warm-muted dark:text-slate-300 hover:bg-warm-hover dark:hover:bg-slate-800 transition-colors"
            >
              Cancel Import
            </button>

            <button
              disabled={parsedCards.length === 0}
              onClick={handleConfirmImport}
              className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs active:scale-95 transition-all disabled:opacity-40 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Import {parsedCards.length} cards
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
