import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Radio, Timer, Music, Maximize2, X } from 'lucide-react';
import AmbientSoundWidget from './AmbientSoundWidget';
import MediaStreamWidget from './MediaStreamWidget';
import PomodoroWidget from './PomodoroWidget';

export default function ChillDock() {
  const constraintsRef = useRef(null);

  const [widgets, setWidgets] = useState({
    sounds: { isOpen: false, isExpanded: false },
    media:  { isOpen: false, isExpanded: false },
    pomodoro: { isOpen: false, isExpanded: false },
  });

  const [status, setStatus] = useState({
    sounds: { isActive: false, activeSoundNames: [] },
    media:  { isActive: false, source: 'spotify', label: '' },
    pomodoro: { isActive: false, timeDisplay: '25:00', mode: 'WORK' },
  });

  const [isDockExpanded, setIsDockExpanded] = useState(false);

  const toggleWidget = (key) => {
    setWidgets(prev => {
      const widget = prev[key];
      const next = { ...prev };
      let targetIsExpanded = false;
      if (!widget.isOpen) {
        next[key] = { isOpen: true, isExpanded: true };
        targetIsExpanded = true;
      } else if (widget.isExpanded) {
        next[key] = { ...widget, isExpanded: false };
      } else {
        next[key] = { ...widget, isExpanded: true };
        targetIsExpanded = true;
      }
      if (targetIsExpanded && window.innerWidth < 640) {
        Object.keys(next).forEach(k => {
          if (k !== key && next[k].isExpanded) {
            next[k].isExpanded = false;
          }
        });
      }
      return next;
    });
  };

  const expandWidget = (key) => {
    setWidgets(prev => {
      const next = { ...prev, [key]: { ...prev[key], isExpanded: true } };
      if (window.innerWidth < 640) {
        Object.keys(next).forEach(k => {
          if (k !== key && next[k].isExpanded) {
            next[k].isExpanded = false;
          }
        });
      }
      return next;
    });
  };

  const minimizeWidget = (key) => {
    setWidgets(prev => ({
      ...prev,
      [key]: { ...prev[key], isExpanded: false }
    }));
  };

  const closeWidget = (key) => {
    setWidgets(prev => ({
      ...prev,
      [key]: { isOpen: false, isExpanded: false }
    }));
    if (key === 'sounds') setStatus(prev => ({ ...prev, sounds: { isActive: false, activeSoundNames: [] } }));
    if (key === 'media') setStatus(prev => ({ ...prev, media: { isActive: false, source: 'spotify', label: '' } }));
    if (key === 'pomodoro') setStatus(prev => ({ ...prev, pomodoro: { isActive: false, timeDisplay: '25:00', mode: 'WORK' } }));
  };

  const handleSoundsStatus = useCallback((s) => setStatus(prev => ({ ...prev, sounds: s })), []);
  const handleMediaStatus = useCallback((s) => setStatus(prev => ({ ...prev, media: s })), []);
  const handlePomodoroStatus = useCallback((s) => setStatus(prev => ({ ...prev, pomodoro: s })), []);

  const anyActive = status.sounds.isActive || status.media.isActive || status.pomodoro.isActive;

  return (
    <>
      {/* Constraints Viewport boundary */}
      <div ref={constraintsRef} className="fixed inset-4 pointer-events-none z-0" />

      {/* Floating Widgets - Rendered persistently while open to keep audio/timer state */}
      {widgets.sounds.isOpen && (
        <AmbientSoundWidget
          isExpanded={widgets.sounds.isExpanded}
          onClose={() => closeWidget('sounds')}
          onToggleExpand={() => minimizeWidget('sounds')}
          onStatusChange={handleSoundsStatus}
          constraintsRef={constraintsRef}
        />
      )}

      {widgets.media.isOpen && (
        <MediaStreamWidget
          isExpanded={widgets.media.isExpanded}
          onClose={() => closeWidget('media')}
          onToggleExpand={() => minimizeWidget('media')}
          onStatusChange={handleMediaStatus}
          constraintsRef={constraintsRef}
        />
      )}

      {widgets.pomodoro.isOpen && (
        <PomodoroWidget
          isExpanded={widgets.pomodoro.isExpanded}
          onClose={() => closeWidget('pomodoro')}
          onToggleExpand={() => minimizeWidget('pomodoro')}
          onStatusChange={handlePomodoroStatus}
          constraintsRef={constraintsRef}
        />
      )}

      {/* Main Dock Container */}
      <div className="fixed bottom-4 right-4 sm:right-6 z-50 flex flex-col items-end gap-3 max-w-[calc(100vw-2rem)]">
        {/* Mini Status Bars */}
        <AnimatePresence>
          {widgets.pomodoro.isOpen && !widgets.pomodoro.isExpanded && status.pomodoro.isActive && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 shadow-lg cursor-pointer"
              onClick={() => expandWidget('pomodoro')}
            >
              <Timer className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-mono font-bold tabular-nums text-slate-800 dark:text-slate-100">
                {status.pomodoro.timeDisplay}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); closeWidget('pomodoro'); }}
                className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
            </motion.div>
          )}

          {widgets.sounds.isOpen && !widgets.sounds.isExpanded && status.sounds.isActive && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 shadow-lg cursor-pointer max-w-[240px]"
              onClick={() => expandWidget('sounds')}
            >
              <Volume2 className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                {status.sounds.activeSoundNames.join(' + ')}
              </span>
              <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </motion.div>
          )}

          {widgets.media.isOpen && !widgets.media.isExpanded && status.media.isActive && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 shadow-lg cursor-pointer max-w-[240px]"
              onClick={() => expandWidget('media')}
            >
              <Radio className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                {status.media.label}
              </span>
              <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Bar */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 shadow-xl max-w-full">
          <button
            onClick={() => setIsDockExpanded(!isDockExpanded)}
            className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-400 via-rose-400 to-indigo-500 flex items-center justify-center shrink-0 shadow-md cursor-pointer group relative"
            title="Chill Space"
          >
            {anyActive ? (
              <div className="flex items-end justify-center gap-[3px] h-4">
                <span className="w-[3px] bg-white rounded-full animate-[bounce_1s_infinite_100ms]" style={{height: '12px'}} />
                <span className="w-[3px] bg-white rounded-full animate-[bounce_1s_infinite_300ms]" style={{height: '16px'}} />
                <span className="w-[3px] bg-white rounded-full animate-[bounce_1s_infinite_200ms]" style={{height: '8px'}} />
              </div>
            ) : (
              <Music className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            )}
          </button>

          <AnimatePresence>
            {isDockExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5 overflow-hidden"
              >
                <button
                  onClick={() => toggleWidget('sounds')}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer relative ${
                    widgets.sounds.isOpen
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent'
                  }`}
                  title="Âm thanh thư giãn"
                >
                  <Volume2 className="w-5 h-5" />
                  {status.sounds.isActive && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-white dark:border-slate-900" />
                  )}
                </button>

                <button
                  onClick={() => toggleWidget('media')}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer relative ${
                    widgets.media.isOpen
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent'
                  }`}
                  title="Media Stream"
                >
                  <Radio className="w-5 h-5" />
                  {status.media.isActive && widgets.media.isOpen && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                  )}
                </button>

                <button
                  onClick={() => toggleWidget('pomodoro')}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer relative ${
                    widgets.pomodoro.isOpen
                      ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent'
                  }`}
                  title="Pomodoro Timer"
                >
                  <Timer className="w-5 h-5" />
                  {status.pomodoro.isActive && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white dark:border-slate-900" />
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
