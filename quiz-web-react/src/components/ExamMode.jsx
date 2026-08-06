import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, CheckCircle2, AlertCircle, Trophy, RotateCcw, ShieldCheck } from 'lucide-react';
import { saveQuizProgress } from '../data/quizDataLoader';
import confetti from 'canvas-confetti';

export default function ExamMode({ quiz, onBack }) {
  const questions = quiz.questions || [];
  const [userAnswers, setUserAnswers] = useState({}); // { qIndex: answerId }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(questions.length * 60); // 1 minute per question
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (answerId) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [currentIndex]: answerId }));
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach((q, idx) => {
      const selectedId = userAnswers[idx];
      const correctAns = q.answers?.find(a => a.isCorrect);
      if (correctAns && selectedId === correctAns.id) {
        correctCount += 1;
      }
    });

    saveQuizProgress(quiz.id, correctCount, questions.length, 'EXAM');
    if (correctCount / questions.length >= 0.7) {
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  const currentQ = questions[currentIndex] || {};

  // Compute final score if submitted
  let finalScore = 0;
  if (isSubmitted) {
    questions.forEach((q, idx) => {
      const selectedId = userAnswers[idx];
      const correctAns = q.answers?.find(a => a.isCorrect);
      if (correctAns && selectedId === correctAns.id) {
        finalScore += 1;
      }
    });
  }

  if (isSubmitted) {
    const percentage = Math.round((finalScore / questions.length) * 100);
    const isPassed = percentage >= 70;

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 border border-warm-border shadow-soft-lg text-center space-y-6"
        >
          <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center border ${
            isPassed ? 'bg-emerald-100 text-emerald-600 border-emerald-200' : 'bg-rose-100 text-rose-600 border-rose-200'
          }`}>
            {isPassed ? <ShieldCheck className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
          </div>

          <div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {isPassed ? 'ĐÃ ĐẠT (PASSED)' : 'CHƯA ĐẠT (RETAKE RECOMMENDED)'}
            </span>
            <h2 className="text-2xl font-extrabold text-warm-text mt-3">Kết Quả Thi Thử</h2>
            <p className="text-xs text-warm-muted">{quiz.title}</p>
          </div>

          <div className="p-6 rounded-2xl bg-warm-bg border border-warm-border inline-block min-w-[280px]">
            <div className="text-4xl font-extrabold text-warm-text">{finalScore} / {questions.length}</div>
            <div className={`text-sm font-bold mt-1 ${isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
              Đạt {percentage}% điểm tổng
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3 pt-4 border-t border-warm-border/60">
            <button
              onClick={() => { setIsSubmitted(false); setUserAnswers({}); setCurrentIndex(0); setTimeLeft(questions.length * 60); }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-warm-border hover:bg-warm-hover font-semibold text-sm shadow-sm transition-all active:scale-95 text-warm-text"
            >
              <RotateCcw className="w-4 h-4 text-warm-slate" /> Thi lại
            </button>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-warm-slate hover:bg-slate-700 text-white font-semibold text-sm shadow-sm transition-all active:scale-95"
            >
              Quay lại danh sách
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header Bar with Countdown Timer */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-warm-slate hover:text-warm-text bg-white border border-warm-border px-4 py-2 rounded-full shadow-sm hover:shadow transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Thoát bài thi
        </button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-mono font-bold text-sm shadow-sm">
            <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={handleSubmitExam}
            className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95"
          >
            Nộp Bài Thi
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Question Panel */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 border border-warm-border shadow-soft">
          <div className="flex items-center justify-between text-xs font-bold text-warm-muted mb-4">
            <span className="text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
              Câu {currentIndex + 1} / {questions.length}
            </span>
            <span>Môn: {quiz.category}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-warm-text leading-relaxed mb-6">
            {currentQ.content}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {(currentQ.answers || []).map((answer, aIdx) => {
              const isSelected = userAnswers[currentIndex] === answer.id;
              return (
                <button
                  key={answer.id || aIdx}
                  onClick={() => handleSelectOption(answer.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3 text-sm font-medium ${
                    isSelected
                      ? 'bg-warm-slate text-white border-warm-slate shadow-sm'
                      : 'bg-white border-warm-border text-warm-text hover:bg-warm-hover'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                    isSelected ? 'bg-white/20 text-white border-white/30' : 'bg-warm-hover text-warm-slate border-warm-border/60'
                  }`}>
                    {String.fromCharCode(65 + aIdx)}
                  </span>
                  <span>{answer.content}</span>
                </button>
              );
            })}
          </div>

          {/* Previous / Next buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-warm-border/40">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="px-4 py-2 rounded-full border border-warm-border text-xs font-semibold text-warm-text hover:bg-warm-hover disabled:opacity-40"
            >
              Câu trước
            </button>
            <button
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="px-4 py-2 rounded-full bg-warm-slate text-white text-xs font-semibold hover:bg-slate-700 disabled:opacity-40"
            >
              Câu tiếp theo
            </button>
          </div>
        </div>

        {/* Question Grid Navigator Sidebar */}
        <div className="bg-white rounded-3xl p-5 border border-warm-border shadow-soft h-fit">
          <h4 className="text-xs font-bold text-warm-text mb-3 uppercase tracking-wider">Danh Sách Câu Hỏi</h4>
          <div className="grid grid-cols-5 gap-2 max-h-[360px] overflow-y-auto pr-1">
            {questions.map((_, idx) => {
              const isAnswered = userAnswers[idx] !== undefined;
              const isCurrent = idx === currentIndex;

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center border ${
                    isCurrent
                      ? 'ring-2 ring-warm-slate border-warm-slate bg-warm-slate text-white'
                      : isAnswered
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-warm-bg text-warm-muted border-warm-border hover:bg-warm-hover'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-warm-border/60 space-y-2 text-[11px] text-warm-muted font-medium">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300" /> Đã trả lời ({Object.keys(userAnswers).length})
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-warm-bg border border-warm-border" /> Chưa trả lời ({questions.length - Object.keys(userAnswers).length})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
