import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, FileText, CheckCircle2, Zap } from 'lucide-react';

export default function ImportModal({ isOpen, onClose, onImportData }) {
  const [rawText, setRawText] = useState('');
  
  // Delimiter states
  const [termDelimiter, setTermDelimiter] = useState('tab'); // 'tab' | 'comma' | 'custom_term'
  const [customTermDelimiter, setCustomTermDelimiter] = useState('-');
  
  const [expDelimiter, setExpDelimiter] = useState('none'); // 'none' | 'tab' | 'custom_exp'
  const [customExpDelimiter, setCustomExpDelimiter] = useState('|');

  const [cardDelimiter, setCardDelimiter] = useState('newline'); // 'newline' | 'semicolon' | 'custom_card'
  const [customCardDelimiter, setCustomCardDelimiter] = useState('%%%');

  const [parsedCards, setParsedCards] = useState([]);
  const [isParsing, setIsParsing] = useState(false);

  // Debounced High-Performance Parser (200ms non-blocking delay)
  useEffect(() => {
    if (!rawText.trim()) {
      setParsedCards([]);
      setIsParsing(false);
      return;
    }

    setIsParsing(true);

    const parseTimer = setTimeout(() => {
      // 1. Determine Card Delimiter
      let cardSep = '\n';
      if (cardDelimiter === 'semicolon') {
        cardSep = ';';
      } else if (cardDelimiter === 'custom_card') {
        cardSep = customCardDelimiter || '%%%';
      }

      // Split raw cards
      let rawCards = [];
      if (cardDelimiter === 'newline') {
        rawCards = rawText.split(/\r?\n/);
      } else {
        rawCards = rawText.split(cardSep);
      }

      // 2. Determine Term & Explanation Delimiters
      let termSep = '\t';
      if (termDelimiter === 'comma') termSep = ',';
      else if (termDelimiter === 'custom_term') termSep = customTermDelimiter || '-';

      let expSep = null;
      if (expDelimiter === 'tab') expSep = '\t';
      else if (expDelimiter === 'custom_exp') expSep = customExpDelimiter || '|';

      const results = [];

      // Single-pass linear scan for max performance
      for (let i = 0; i < rawCards.length; i++) {
        const rawLine = rawCards[i].trim();
        if (!rawLine) continue;

        let term = '';
        let definition = '';
        let explanation = '';

        // If 3rd field explanation delimiter is configured
        if (expSep) {
          const expParts = rawLine.split(expSep);
          if (expParts.length >= 2) {
            explanation = expParts.slice(1).join(' ').trim();
            const termDefPart = expParts[0].trim();
            
            // Split term and definition from first part
            let termDefParts = [];
            if (termDelimiter === 'tab') {
              termDefParts = termDefPart.split(/\t+/);
            } else {
              termDefParts = termDefPart.split(termSep);
            }

            term = (termDefParts[0] || '').trim();
            definition = termDefParts.slice(1).join(' ').trim();
          } else {
            // Fallback split without explanation
            let termDefParts = [];
            if (termDelimiter === 'tab') {
              termDefParts = rawLine.split(/\t+/);
            } else {
              termDefParts = rawLine.split(termSep);
            }
            term = (termDefParts[0] || '').trim();
            definition = termDefParts.slice(1).join(' ').trim();
          }
        } else {
          // Standard 2-Field split (term & definition)
          let parts = [];
          if (termDelimiter === 'tab') {
            parts = rawLine.split(/\t+/);
          } else {
            parts = rawLine.split(termSep);
          }

          if (parts.length >= 3) {
            term = (parts[0] || '').trim();
            definition = (parts[1] || '').trim();
            explanation = parts.slice(2).join(' ').trim(); // automatic 3rd tab fallback
          } else if (parts.length === 2) {
            term = (parts[0] || '').trim();
            definition = (parts[1] || '').trim();
          } else {
            term = rawLine.trim();
          }
        }

        if (term || definition || explanation) {
          results.push({ term, definition, explanation });
        }
      }

      setParsedCards(results);
      setIsParsing(false);
    }, 200);

    return () => clearTimeout(parseTimer);
  }, [
    rawText,
    termDelimiter,
    customTermDelimiter,
    expDelimiter,
    customExpDelimiter,
    cardDelimiter,
    customCardDelimiter
  ]);

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
                placeholder="Word 1    Definition 1    Explanation 1&#10;%%%&#10;Word 2    Definition 2    Explanation 2"
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full p-4 rounded-2xl bg-warm-bg/60 dark:bg-slate-800/60 border border-warm-border dark:border-slate-700 text-xs sm:text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400/40 resize-y"
              />
            </div>

            {/* 3-Field Delimiter Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-warm-bg/40 dark:bg-slate-800/40 border border-warm-border/60 dark:border-slate-800 text-xs">
              {/* Field 1 & 2: Between Term and Definition */}
              <div className="space-y-2">
                <label className="font-bold text-slate-900 dark:text-slate-100 block">
                  Between Term and Definition
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="termDelim"
                      checked={termDelimiter === 'tab'}
                      onChange={() => setTermDelimiter('tab')}
                      className="accent-amber-600"
                    />
                    <span>Tab (Excel/Word)</span>
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

              {/* Field 3: Between Definition and Explanation */}
              <div className="space-y-2">
                <label className="font-bold text-amber-800 dark:text-amber-400 block">
                  Field 3 Explanation Delimiter
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="expDelim"
                      checked={expDelimiter === 'none'}
                      onChange={() => setExpDelimiter('none')}
                      className="accent-amber-600"
                    />
                    <span>Auto (3rd Tab)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="expDelim"
                      checked={expDelimiter === 'tab'}
                      onChange={() => setExpDelimiter('tab')}
                      className="accent-amber-600"
                    />
                    <span>Tab</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="expDelim"
                      checked={expDelimiter === 'custom_exp'}
                      onChange={() => setExpDelimiter('custom_exp')}
                      className="accent-amber-600"
                    />
                    <span>Custom:</span>
                    {expDelimiter === 'custom_exp' && (
                      <input
                        type="text"
                        value={customExpDelimiter}
                        onChange={(e) => setCustomExpDelimiter(e.target.value)}
                        className="w-16 px-2 py-0.5 rounded border border-warm-border dark:border-slate-700 bg-white dark:bg-slate-900 text-center font-mono"
                      />
                    )}
                  </label>
                </div>
              </div>

              {/* Between Cards */}
              <div className="space-y-2">
                <label className="font-bold text-slate-900 dark:text-slate-100 block">
                  Between cards
                </label>
                <div className="space-y-1.5">
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

            {/* Live Real-time Full-Text Preview Area (ZERO TRUNCATION) */}
            <div className="space-y-3 border-t border-warm-border/60 dark:border-slate-800 pt-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100">
                <span className="flex items-center gap-2">
                  Preview ({parsedCards.length} cards)
                  {isParsing && <Zap className="w-3.5 h-3.5 text-amber-500 animate-bounce" />}
                </span>
                {parsedCards.length > 0 && !isParsing && (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Sẵn sàng Import 100%
                  </span>
                )}
              </div>

              {parsedCards.length === 0 ? (
                <div className="text-center py-6 text-xs text-warm-muted dark:text-slate-500 bg-warm-hover/40 dark:bg-slate-800/40 rounded-2xl border border-dashed border-warm-border dark:border-slate-700">
                  Nothing to preview yet. Paste your text above.
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {parsedCards.map((card, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-warm-border dark:border-slate-700 text-xs space-y-2 shadow-xs"
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-extrabold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-800 shrink-0">
                          #{idx + 1}
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-w-0">
                          {/* Term (Full Text Auto-wrap) */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-warm-muted dark:text-slate-400 uppercase tracking-wider block">
                              TERM
                            </span>
                            <div className="font-semibold text-slate-900 dark:text-slate-100 break-words whitespace-pre-wrap leading-relaxed">
                              {card.term || '(Trống)'}
                            </div>
                          </div>

                          {/* Definition (Full Text Auto-wrap) */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-warm-muted dark:text-slate-400 uppercase tracking-wider block">
                              DEFINITION
                            </span>
                            <div className="font-medium text-warm-slate dark:text-slate-300 break-words whitespace-pre-wrap leading-relaxed">
                              {card.definition || '(Chưa có định nghĩa)'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Academic Insight Explanation Box */}
                      {card.explanation && (
                        <div className="mt-2.5 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/80 p-3 border-l-4 border-l-indigo-500 dark:border-slate-800 dark:bg-slate-900/50 dark:border-l-indigo-400 shadow-xs text-xs">
                          <div className="flex items-center gap-1.5 mb-1 text-indigo-700 dark:text-indigo-300">
                            <Sparkles className="w-3.5 h-3.5 stroke-[1.75]" />
                            <span className="text-[10px] font-extrabold uppercase tracking-wider">
                              Phân Tích Học Thuật
                            </span>
                          </div>
                          <p className="leading-relaxed text-slate-700 dark:text-slate-300 font-normal break-words whitespace-pre-wrap">
                            {card.explanation}
                          </p>
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
              disabled={parsedCards.length === 0 || isParsing}
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
