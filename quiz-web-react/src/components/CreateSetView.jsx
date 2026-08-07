import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, FileText, Sparkles, Lock, KeyRound } from 'lucide-react';
import ImportModal from './ImportModal';
import { createCustomQuizSet, updateCustomQuizSet } from '../data/quizDataLoader';

export default function CreateSetView({ onBack, onSetCreated, editQuiz = null }) {
  const isEditing = Boolean(editQuiz && editQuiz.id);

  const [title, setTitle] = useState(editQuiz?.title || '');
  const [description, setDescription] = useState(editQuiz?.subject || '');
  const [password, setPassword] = useState(editQuiz?.password || '');
  const [isImportOpen, setIsImportOpen] = useState(false);

  // Parse card fields for full editor (including options A, B, C, D)
  const [cards, setCards] = useState(() => {
    if (editQuiz && Array.isArray(editQuiz.questions) && editQuiz.questions.length > 0) {
      return editQuiz.questions.map((q, idx) => {
        const answersList = q.answers || [];
        const correctAns = answersList.find(a => a.isCorrect);

        // Format TERM: Question + Full Options list A, B, C, D if options exist
        let termText = q.content || '';
        if (answersList.length > 1 && !termText.includes('A.')) {
          const optionsFormatted = answersList
            .map((a, aIdx) => `${String.fromCharCode(65 + aIdx)}. ${a.content}`)
            .join('\n');
          termText = `${termText}\n\n${optionsFormatted}`;
        }

        // Format DEFINITION: Correct Answer with Letter Prefix (e.g. "A. Option content")
        let defText = '';
        if (correctAns) {
          const correctIdx = answersList.findIndex(a => a.isCorrect);
          if (correctIdx >= 0 && answersList.length > 1) {
            defText = `${String.fromCharCode(65 + correctIdx)}. ${correctAns.content}`;
          } else {
            defText = correctAns.content;
          }
        }

        return {
          id: q.id || idx + 1,
          term: termText,
          definition: defText,
          explanation: q.explanation || ''
        };
      });
    }
    return [
      { id: 1, term: '', definition: '', explanation: '' },
      { id: 2, term: '', definition: '', explanation: '' },
      { id: 3, term: '', definition: '', explanation: '' }
    ];
  });

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

    const hasExistingContent = cards.some(c => c.term.trim() || c.definition.trim());
    if (!hasExistingContent) {
      setCards(newCards);
    } else {
      setCards(prev => [...prev, ...newCards]);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Vui lòng nhập Tiêu đề bộ đề!');
      return;
    }

    if (!password.trim()) {
      alert('Vui lòng nhập Mật khẩu quản lý bộ đề!');
      return;
    }

    const validQuestions = cards.filter(c => c.term.trim() || c.definition.trim());
    if (validQuestions.length === 0) {
      alert('Vui lòng nhập ít nhất 1 thẻ câu hỏi!');
      return;
    }

    const finalPassword = password.trim();

    if (isEditing) {
      try {
        const updated = await updateCustomQuizSet(editQuiz.id, finalPassword, {
          title,
          description,
          questions: validQuestions
        });
        onSetCreated(updated);
      } catch (err) {
        alert(err.message || 'Mật khẩu quản lý không chính xác!');
      }
    } else {
      try {
        const createdSet = await createCustomQuizSet({
          title,
          description,
          password: finalPassword,
          questions: validQuestions
        });
        onSetCreated(createdSet);
      } catch (err) {
        alert(err.message || 'Lỗi khi tạo bộ đề. Vui lòng kiểm tra lại kết nối!');
      }
    }
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
          {isEditing ? 'Chỉnh sửa bộ đề' : 'Tạo bộ đề mới'}
        </h1>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> {isEditing ? 'Lưu chỉnh sửa' : 'Tạo bộ đề'}
        </button>
      </div>

      {/* Form Fields Section */}
      <div className="space-y-4 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-warm-border dark:border-slate-800 shadow-soft">
        {/* Title Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-warm-muted dark:text-slate-400">Tiêu đề bộ đề (Title) *</label>
          <input
            type="text"
            placeholder="Nhập tiêu đề bộ đề..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-2xl bg-warm-bg/60 dark:bg-slate-800/60 border border-warm-border dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        {/* Description Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-warm-muted dark:text-slate-400">Mô tả bộ đề (Description)</label>
          <textarea
            rows={2}
            placeholder="Nhập mô tả chi tiết cho bộ đề..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 rounded-2xl bg-warm-bg/60 dark:bg-slate-800/60 border border-warm-border dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none"
          />
        </div>

        {/* Password Management Input (Strict Required) */}
        <div className="space-y-1.5 pt-1">
          <label className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5" /> Mật khẩu quản lý bộ đề (Bắt buộc - Dùng để Sửa/Xóa) *
          </label>
          <input
            type="password"
            placeholder="Nhập mật khẩu quản lý của bạn..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3.5 rounded-2xl bg-amber-50/50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
          />
          <span className="text-[11px] text-warm-muted dark:text-slate-400 block">
            Mật khẩu giúp bảo vệ bộ đề của bạn khỏi bị xóa hoặc chỉnh sửa trái phép bởi người khác.
          </span>
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

      {/* Cards List Inputs */}
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

            {/* 3 Input Fields Grid with Auto-Wrapping Textarea */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Field 1: Enter Term & Options */}
              <div className="space-y-1">
                <textarea
                  rows={4}
                  placeholder="Enter term & options (Nhập câu hỏi & danh sách phương án A, B, C, D)"
                  value={card.term}
                  onChange={(e) => handleCardChange(card.id, 'term', e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-warm-bg/70 dark:bg-slate-800/60 border border-warm-border/80 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-y leading-relaxed"
                />
                <span className="text-[10px] font-bold text-warm-muted dark:text-slate-500 uppercase tracking-wider block">
                  TERM (THUẬT NGỮ / CÂU HỎI & CÁC LỰA CHỌN)
                </span>
              </div>

              {/* Field 2: Enter Definition / Correct Answer */}
              <div className="space-y-1">
                <textarea
                  rows={4}
                  placeholder="Enter definition (Nhập đáp án đúng, ví dụ: 'A. Chủ nghĩa xã hội...')"
                  value={card.definition}
                  onChange={(e) => handleCardChange(card.id, 'definition', e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-warm-bg/70 dark:bg-slate-800/60 border border-warm-border/80 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-y leading-relaxed"
                />
                <span className="text-[10px] font-bold text-warm-muted dark:text-slate-500 uppercase tracking-wider block">
                  DEFINITION (ĐỊNH NGHĨA / ĐÁP ÁN ĐÚNG)
                </span>
              </div>
            </div>

            {/* Field 3: Enter Explanation (Optional) */}
            <div className="space-y-1">
              <textarea
                rows={2}
                placeholder="Enter explanation (Giải thích chi tiết - Tùy chọn)"
                value={card.explanation}
                onChange={(e) => handleCardChange(card.id, 'explanation', e.target.value)}
                className="w-full p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/60 text-xs text-amber-950 dark:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 resize-y leading-relaxed"
              />
              <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
                EXPLANATION (TRƯỜNG THỨ 3 – GIẢI THÍCH CHI TIẾT)
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
          <Plus className="w-4 h-4 text-warm-slate dark:text-slate-300" /> Thêm thẻ mới
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
