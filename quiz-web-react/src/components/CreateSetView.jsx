import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, FileText, Sparkles, Image, Lock } from 'lucide-react';
import ImportModal from './ImportModal';
import { createCustomQuizSet } from '../data/quizDataLoader';

export default function CreateSetView({ onBack, onSetCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isImportOpen, setIsImportOpen] = useState(false);

  // Cards list state (default 3 cards)
  const [cards, setCards] = useState([
    { id: 1, term: '', definition: '', explanation: '' },
    { id: 2, term: '', definition: '', explanation: '' },
    { id: 3, term: '', definition: '', explanation: '' }
  ]);

  const handleCardChange = (id, field, value) => {
    setCards(prev => prev.map(card => {
      if (card.id === id) {
        return { ...card, [field]: value };
      }
      return card;
    }));
  };

  const handleAddCard = () => {
    setCards(prev => [
      ...prev,
      { id: Date.now() + Math.random(), term: '', definition: '', explanation: '' }
    ]);
  };

  const handleDeleteCard = (id) => {
    if (cards.length <= 1) return;
    setCards(prev => prev.filter(c => c.id !== id));
  };

  // Import handler from ImportModal
  const handleImportData = (importedCards) => {
    const newCards = importedCards.map(ic => ({
      id: Date.now() + Math.random(),
      term: ic.term || '',
      definition: ic.definition || '',
      explanation: ic.explanation || ''
    }));

    // Replace empty draft cards if all cards were blank, or append
    const hasExistingContent = cards.some(c => c.term.trim() || c.definition.trim());
    if (!hasExistingContent) {
      setCards(newCards);
    } else {
      setCards(prev => [...prev, ...newCards]);
    }
  };

  const handleCreate = () => {
    if (!title.trim()) {
      alert('Vui lòng nhập Tiêu đề bộ đề!');
      return;
    }

    const validQuestions = cards.filter(c => c.term.trim() || c.definition.trim());
    if (validQuestions.length === 0) {
      alert('Vui lòng nhập ít nhất 1 thẻ câu hỏi!');
      return;
    }

    const createdSet = createCustomQuizSet({
      title,
      description,
      questions: validQuestions
    });

    onSetCreated(createdSet);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 text-warm-text dark:text-slate-100">
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-warm-slate dark:text-slate-300 hover:text-warm-text bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 px-4 py-2 rounded-full shadow-xs hover:shadow transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>

        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
          Create a new flashcard set
        </h1>

        <button
          onClick={handleCreate}
          className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Create
        </button>
      </div>

      {/* Form Fields Section */}
      <div className="space-y-4 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-warm-border dark:border-slate-800 shadow-soft">
        {/* Title Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-warm-muted dark:text-slate-400">Title</label>
          <input
            type="text"
            placeholder="Enter title, e.g. 'MLN131 - Triết học Mác - Lênin'"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-2xl bg-warm-bg/60 dark:bg-slate-800/60 border border-warm-border dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        {/* Description Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-warm-muted dark:text-slate-400">Add a description...</label>
          <textarea
            rows={2}
            placeholder="Add a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 rounded-2xl bg-warm-bg/60 dark:bg-slate-800/60 border border-warm-border dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none"
          />
        </div>

        {/* Action Tools Bar (+ Import, + Add diagram) */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => setIsImportOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-xs font-bold shadow-xs transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Import
          </button>

          <button
            disabled
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-warm-bg dark:bg-slate-800 text-warm-muted dark:text-slate-500 border border-warm-border dark:border-slate-700 text-xs font-bold opacity-60 cursor-not-allowed"
          >
            <Plus className="w-4 h-4" /> Add diagram <Lock className="w-3 h-3 ml-1" />
          </button>
        </div>
      </div>

      {/* Cards List Inputs (3-Field Standard: Term, Definition, Explanation) */}
      <div className="space-y-6">
        {cards.map((card, idx) => (
          <div
            key={card.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-warm-border dark:border-slate-800 shadow-xs space-y-4"
          >
            {/* Card Header & Delete Button */}
            <div className="flex items-center justify-between border-b border-warm-border/60 dark:border-slate-800 pb-3">
              <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                {idx + 1}
              </span>

              <button
                onClick={() => handleDeleteCard(card.id)}
                className="p-1.5 rounded-full hover:bg-rose-100 dark:hover:bg-rose-950 text-rose-500 transition-colors"
                title="Xóa thẻ này"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* 3 Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Field 1: Enter Term */}
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Enter term"
                  value={card.term}
                  onChange={(e) => handleCardChange(card.id, 'term', e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-warm-bg/70 dark:bg-slate-800/60 border border-warm-border/80 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
                <span className="text-[10px] font-bold text-warm-muted dark:text-slate-500 uppercase tracking-wider block">
                  TERM (Thuật ngữ / Câu hỏi)
                </span>
              </div>

              {/* Field 2: Enter Definition */}
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Enter definition"
                  value={card.definition}
                  onChange={(e) => handleCardChange(card.id, 'definition', e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-warm-bg/70 dark:bg-slate-800/60 border border-warm-border/80 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
                <span className="text-[10px] font-bold text-warm-muted dark:text-slate-500 uppercase tracking-wider block">
                  DEFINITION (Định nghĩa / Đáp án)
                </span>
              </div>
            </div>

            {/* Field 3: Enter Explanation (Optional) */}
            <div className="space-y-1">
              <input
                type="text"
                placeholder="Enter explanation (Optional)"
                value={card.explanation}
                onChange={(e) => handleCardChange(card.id, 'explanation', e.target.value)}
                className="w-full p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/60 text-xs text-amber-950 dark:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
              />
              <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
                EXPLANATION (Trường thứ 3 - Giải thích chi tiết)
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Add Card Button */}
      <div className="text-center pt-4">
        <button
          onClick={handleAddCard}
          className="px-8 py-3 rounded-full bg-white dark:bg-slate-900 border border-warm-border dark:border-slate-800 hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-text dark:text-slate-100 font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-warm-slate dark:text-slate-300" /> Add a card
        </button>
      </div>

      {/* Import Modal */}
      <ImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImportData={handleImportData}
      />
    </div>
  );
}
