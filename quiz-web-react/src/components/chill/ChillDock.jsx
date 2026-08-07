import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Radio, Timer, Music, Pause, Play, Maximize2, X } from 'lucide-react';
import AmbientSoundWidget from './AmbientSoundWidget';
import MediaStreamWidget from './MediaStreamWidget';
import PomodoroWidget from './PomodoroWidget';

/**
 * ChillDock — Main orchestrator for independent floating widgets (LifeAt style).
 * 
 * Architecture:
 * - Dock bar at bottom-right with 3 tool toggles
 * - Each widget opens/closes/minimizes independently
 * - Audio continues playing when widgets are minimized (DOM Retention)
 * - Mini status bars show active content when minimized
 */
export default function ChillDock() {
  // Widget open state (mounted in DOM when true)
  const [widgets, setWidgets] = useState({
    sounds: { isOpen: false, isExpanded: false },
    media:  { isOpen: false, isExpanded: false },
    pomodoro: { isOpen: false, isExpanded: false },
  });

  // Widget active status (reported by children)
  const [status, setStatus] = useState({
    sounds: { isActive: false, activeSoundNames: [] },
    media:  { isActive: false, source: 'spotify', label: '' },
    pomodoro: { isActive: false, timeDisplay: '25:00', mode: 'WORK' },
  });

  // Dock collapsed/expanded
  const [isDockExpanded, setIsDockExpanded] = useState(false);

  // Toggle a widget: if closed -> open+expand, if open+expanded -> minimize, if open+minimized -> expand
  const toggleWidget = (key) => {
    setWidgets(prev => {
      const widget = prev[key];
      if (!widget.isOpen) {
        return { ...prev, [key]: { isOpen: true, isExpanded: true } };
      } else if (widget.isExpanded) {
        return { ...prev, [key]: { ...widget, isExpanded: false } };
      } else {
        return { ...prev, [key]: { ...widget, isExpanded: true } };
      }
    });
  };

  const expandWidget = (key) => {
    setWidgets(prev => ({
      ...prev,
      [key]: { ...prev[key], isExpanded: true }
    }));
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
    // Reset status
    if (key === 'sounds') setStatus(prev => ({ ...prev, sounds: { isActive: false, activeSoundNames: [] } }));
    if (key === 'media') setStatus(prev => ({ ...prev, media: { isActive: false, source: 'spotify', label: '' } }));
    if (key === 'pomodoro') setStatus(prev => ({ ...prev, pomodoro: { isActive: false, timeDisplay: '25:00', mode: 'WORK' } }));
  };

  // Status callbacks from widgets
  const handleSoundsStatus = useCallback((s) => setStatus(prev => ({ ...prev, sounds: s })), []);
  const handleMediaStatus = useCallback((s) => setStatus(prev => ({ ...prev, media: s })), []);
  const handlePomodoroStatus = useCallback((s) => setStatus(prev => ({ ...prev, pomodoro: s })), []);

  // Check if any widget is actively minimized (open but not expanded)
  const hasMinimizedActive = 
    (widgets.sounds.isOpen && !widgets.sounds.isExpanded && status.sounds.isActive) ||
    (widgets.media.isOpen && !widgets.media.isExpanded && status.media.isActive) ||
    (widgets.pomodoro.isOpen && !widgets.pomodoro.isExpanded && status.pomodoro.isActive);

  // Check any active widget
  const anyActive = status.sounds.isActive || status.media.isActive || status.pomodoro.isActive;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">

      {/* === FLOATING WIDGETS (positioned above dock) === */}

      {/* Ambient Sound Widget */}
      {widgets.sounds.isOpen && (
        <div className="fixed bottom-20 right-4 z-40">
          <AmbientSoundWidget
            isExpanded={widgets.sounds.isExpanded}
            onClose={() => closeWidget('sounds')}
            onToggleExpand={() => minimizeWidget('sounds')}
            onStatusChange={handleSoundsStatus}
          />
        </div>
      )}

      {/* Media Stream Widget */}
      {widgets.media.isOpen && (
        <div className="fixed bottom-20 right-4 z-[41]">
          <MediaStreamWidget
            isExpanded={widgets.media.isExpanded}
            onClose={() => closeWidget('media')}
            onToggleExpand={() => minimizeWidget('media')}
            onStatusChange={handleMediaStatus}
          />
        </div>
      )}

      {/* Pomodoro Widget */}
      {widgets.pomodoro.isOpen && (
        <div className="fixed bottom-20 right-4 z-[42]">
          <PomodoroWidget
            isExpanded={widgets.pomodoro.isExpanded}
            onClose={() => closeWidget('pomodoro')}
            onToggleExpand={() => minimizeWidget('pomodoro')}
            onStatusChange={handlePomodoroStatus}
          />
        </div>
      )}

      {/* === MINI STATUS BARS (for minimized but active widgets) === */}
      <AnimatePresence>
        {/* Pomodoro Mini Bar */}
        {widgets.pomodoro.isOpen && !widgets.pomodoro.isExpanded && status.pomodoro.isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg cursor-pointer"
            onClick={() => expandWidget('pomodoro')}
          >
            <Timer className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-mono font-bold tabular-nums text-slate-800 dark:text-slate-100">
              {status.pomodoro.timeDisplay}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); closeWidget('pomodoro'); }}
              className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
            <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
          </motion.div>
        )}

        {/* Sounds Mini Bar */}
        {widgets.sounds.isOpen && !widgets.sounds.isExpanded && status.sounds.isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg cursor-pointer max-w-[240px]"
            onClick={() => expandWidget('sounds')}
          >
            <Volume2 className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
              {status.sounds.activeSoundNames.join(' + ')}
            </span>
            <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </motion.div>
        )}

        {/* Media Mini Bar */}
        {widgets.media.isOpen && !widgets.media.isExpanded && status.media.isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg cursor-pointer max-w-[240px]"
            onClick={() => expandWidget('media')}
          >
            {status.media.source === 'spotify' ? (
              <svg className="w-4 h-4 text-[#1DB954] fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.3.102zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38C8.88 5.82 15.96 6.06 20.28 8.64c.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"/>
              </svg>
            ) : (
              <Video className="w-4 h-4 text-red-500 shrink-0" />
            )}
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
              {status.media.label}
            </span>
            <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* === MAIN DOCK BAR === */}
      <motion.div
        layout
        className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 shadow-xl"
      >
        {/* Trigger button - always visible */}
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

        {/* Tool toggle buttons - shown when dock is expanded */}
        <AnimatePresence>
          {isDockExpanded && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 overflow-hidden"
            >
              {/* Ambient Sounds Toggle */}
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

              {/* Media Stream Toggle */}
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

              {/* Pomodoro Toggle */}
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
      </motion.div>
    </div>
  );
}
