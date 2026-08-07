import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Play, Pause, RotateCcw, X, Minimize2, Coffee } from 'lucide-react';

const MODES = {
  WORK: { id: 'WORK', time: 25 * 60, label: 'Phiên tập trung', Icon: Timer },
  BREAK: { id: 'BREAK', time: 5 * 60, label: 'Nghỉ ngơi ngắn', Icon: Coffee },
  LONG_BREAK: { id: 'LONG_BREAK', time: 15 * 60, label: 'Nghỉ ngơi dài', Icon: Coffee }
};

export default function PomodoroWidget({ isExpanded, onClose, onToggleExpand, onStatusChange }) {
  const [mode, setMode] = useState('WORK');
  const [timeLeft, setTimeLeft] = useState(MODES.WORK.time);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const playAlarm = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [988, 1319].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.3);
        gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.3);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.3 + 0.5);
        osc.connect(gain).connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.3);
        osc.stop(ctx.currentTime + i * 0.3 + 0.5);
      });
    } catch(e) {
      console.error('AudioContext error:', e);
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setTimeLeft(MODES[newMode].time);
    setIsActive(false);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(MODES[mode].time);
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      playAlarm();
      let nextMode = 'WORK';
      if (mode === 'WORK') nextMode = 'BREAK';
      else if (mode === 'BREAK') nextMode = 'WORK';
      else if (mode === 'LONG_BREAK') nextMode = 'WORK';
      
      setMode(nextMode);
      setTimeLeft(MODES[nextMode].time);
      setIsActive(false); // auto-switch and wait for user to start, or we could auto-start. Let's pause.
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft, mode]);

  useEffect(() => {
    if (onStatusChange) {
      onStatusChange({ isActive, timeDisplay: formatTimer(timeLeft), mode });
    }
  }, [isActive, timeLeft, mode, onStatusChange]);

  const CurrentIcon = MODES[mode].Icon;

  return (
    <>
      {/* Hidden layout class wrapper, timer still runs in background */}
      <motion.div
        className={`fixed z-40 w-80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 shadow-xl rounded-2xl text-slate-800 dark:text-slate-100 transition-all duration-200 ${
          isExpanded 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95 pointer-events-none absolute -z-10 overflow-hidden h-0 w-0'
        }`}
        layout
      >
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200/60 dark:border-slate-700/60 rounded-t-2xl drag-handle cursor-move">
          <div className="flex items-center gap-2 font-semibold">
            <Timer className="w-4 h-4 text-rose-500" />
            <span>Pomodoro</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={onToggleExpand} className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer text-slate-500 dark:text-slate-400">
              <Minimize2 className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer text-slate-500 dark:text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-5 flex flex-col items-center gap-6">
          <div className="flex w-full bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl">
            <button
              onClick={() => handleModeChange('WORK')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                mode === 'WORK' 
                  ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
              }`}
            >
              Làm việc
            </button>
            <button
              onClick={() => handleModeChange('BREAK')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                mode === 'BREAK' 
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
              }`}
            >
              Nghỉ ngắn
            </button>
            <button
              onClick={() => handleModeChange('LONG_BREAK')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                mode === 'LONG_BREAK' 
                  ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
              }`}
            >
              Nghỉ dài
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="font-mono text-5xl font-extrabold tabular-nums tracking-widest text-slate-800 dark:text-slate-100 my-4">
              {formatTimer(timeLeft)}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <CurrentIcon className="w-4 h-4" />
              <span>{MODES[mode].label}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 w-full">
            <button 
              onClick={toggleTimer}
              className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all duration-200 cursor-pointer shadow-lg"
            >
              {isActive ? (
                <Pause className="w-7 h-7 fill-current" />
              ) : (
                <Play className="w-7 h-7 fill-current ml-1" />
              )}
            </button>
            <button 
              onClick={resetTimer}
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
              title="Reset timer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
