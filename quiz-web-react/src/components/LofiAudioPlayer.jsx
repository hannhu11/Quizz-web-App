import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, RotateCcw, Volume2, VolumeX, CloudRain, Waves, Coffee, Radio, Timer, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';

const AMBIENT_SOUNDSCAPES = [
  {
    id: 'rain-sounds',
    title: 'Mưa Rơi Rì Rầm',
    subtitle: 'Tiếng mưa rơi tĩnh lặng',
    icon: CloudRain,
    src: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_403c94511d.mp3'
  },
  {
    id: 'cozy-cafe',
    title: 'Quán Cà Phê Yên Tĩnh',
    subtitle: 'Không gian góc quán quen',
    icon: Coffee,
    src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3'
  },
  {
    id: 'ocean-waves',
    title: 'Sóng Biển Hoàng Hôn',
    subtitle: 'Sóng vỗ du dương bờ cát',
    icon: Waves,
    src: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a2b5ef.mp3'
  },
  {
    id: 'lofi-piano',
    title: 'Lofi Piano Study',
    subtitle: 'Giai điệu piano tập trung',
    icon: Music,
    src: 'https://stream.zeno.fm/f3wvbbqmdg8uv'
  }
];

export default function LofiAudioPlayer() {
  const [activeTab, setActiveTab] = useState('SOUNDS'); // 'SOUNDS' | 'STREAM' | 'POMODORO'
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Pomodoro Timer States (25 mins work / 5 mins break)
  const [pomodoroMode, setPomodoroMode] = useState('WORK'); // 'WORK' | 'BREAK'
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const audioRef = useRef(null);

  const currentTrack = AMBIENT_SOUNDSCAPES[currentTrackIndex];

  // Audio volume sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Pomodoro Countdown Logic
  useEffect(() => {
    let timer = null;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
      // Play alert sound when timer finishes
      try {
        const audio = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3');
        audio.play().catch(() => {});
      } catch (e) {}

      if (pomodoroMode === 'WORK') {
        alert('🎉 Hết 25 phút tập trung! Hãy nghỉ ngơi 5 phút nhé.');
        setPomodoroMode('BREAK');
        setTimeLeft(5 * 60);
      } else {
        alert('🔔 Hết 5 phút nghỉ ngơi! Cùng quay lại học tập thôi.');
        setPomodoroMode('WORK');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, pomodoroMode]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Audio playback requires interaction', err);
      });
    }
  };

  const handleTrackChange = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 150);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetPomodoro = () => {
    setIsTimerRunning(false);
    setTimeLeft(pomodoroMode === 'WORK' ? 25 * 60 : 5 * 60);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="none"
        loop
      />

      <motion.div
        layout
        className="rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-warm-border dark:border-slate-800 shadow-soft-lg p-3 sm:p-4 text-warm-text dark:text-slate-100 max-w-xs transition-all duration-300"
      >
        {/* Mini Bar Header */}
        <div className="flex items-center gap-3">
          {/* Animated Spectrum Icon */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-200 via-rose-200 to-indigo-200 dark:from-indigo-900 dark:via-purple-900 dark:to-slate-800 flex items-center justify-center shrink-0 shadow-xs relative group"
          >
            {isPlaying ? (
              <div className="flex items-end justify-center gap-0.5 h-4">
                <span className="w-1 bg-amber-800 dark:bg-amber-300 animate-[bounce_1s_infinite_100ms] rounded-full h-3" />
                <span className="w-1 bg-amber-800 dark:bg-amber-300 animate-[bounce_1s_infinite_300ms] rounded-full h-4" />
                <span className="w-1 bg-amber-800 dark:bg-amber-300 animate-[bounce_1s_infinite_200ms] rounded-full h-2" />
              </div>
            ) : (
              <Music className="w-4 h-4 text-amber-900 dark:text-amber-300 group-hover:scale-110 transition-transform" />
            )}
          </button>

          {/* Track Name */}
          <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <h4 className="text-xs font-bold truncate text-slate-900 dark:text-slate-100 leading-tight">
              {isTimerRunning ? `⏱️ Pomodoro (${formatTimer(timeLeft)})` : currentTrack.title}
            </h4>
            <p className="text-[10px] text-warm-muted dark:text-slate-400 truncate">
              {isTimerRunning ? (pomodoroMode === 'WORK' ? 'Tập trung học tập' : 'Nghỉ giải lao') : currentTrack.subtitle}
            </p>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-xs transition-all active:scale-95 shrink-0"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          {/* Expand Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-full hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-muted dark:text-slate-400 hover:text-warm-text transition-all"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Controls Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 pt-3 border-t border-warm-border/60 dark:border-slate-800 space-y-3 overflow-hidden"
            >
              {/* Tab Selector Header */}
              <div className="flex items-center justify-between p-1 rounded-xl bg-warm-hover dark:bg-slate-800 border border-warm-border/60 dark:border-slate-700 text-xs">
                <button
                  onClick={() => setActiveTab('SOUNDS')}
                  className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all text-[11px] flex items-center justify-center gap-1 ${
                    activeTab === 'SOUNDS'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                      : 'text-warm-muted dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Music className="w-3 h-3" /> Âm thanh
                </button>

                <button
                  onClick={() => setActiveTab('STREAM')}
                  className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all text-[11px] flex items-center justify-center gap-1 ${
                    activeTab === 'STREAM'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                      : 'text-warm-muted dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Radio className="w-3 h-3" /> Lofi Stream
                </button>

                <button
                  onClick={() => setActiveTab('POMODORO')}
                  className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all text-[11px] flex items-center justify-center gap-1 ${
                    activeTab === 'POMODORO'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                      : 'text-warm-muted dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Timer className="w-3 h-3" /> Pomodoro
                </button>
              </div>

              {/* TAB 1: AMBIENT SOUNDS */}
              {activeTab === 'SOUNDS' && (
                <div className="space-y-3">
                  {/* Volume Slider */}
                  <div className="flex items-center gap-2 px-1">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-warm-muted dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                    >
                      {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
                      className="w-full h-1 bg-warm-border dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-amber-400"
                    />
                  </div>

                  {/* Soundscapes List */}
                  <div className="space-y-1">
                    {AMBIENT_SOUNDSCAPES.map((track, idx) => {
                      const IconComp = track.icon;
                      const isSelected = currentTrackIndex === idx;

                      return (
                        <button
                          key={track.id}
                          onClick={() => handleTrackChange(idx)}
                          className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs transition-all ${
                            isSelected
                              ? 'bg-amber-100/90 dark:bg-amber-950/80 font-bold text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-800'
                              : 'hover:bg-warm-hover dark:hover:bg-slate-800 text-warm-muted dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                          }`}
                        >
                          <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-700 dark:text-amber-400' : 'text-warm-muted dark:text-slate-400'}`} />
                          <span className="truncate">{track.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: LOFI STREAM EMBED */}
              {activeTab === 'STREAM' && (
                <div className="space-y-2">
                  <div className="rounded-2xl overflow-hidden border border-warm-border dark:border-slate-800 bg-black aspect-video relative">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?autoplay=0"
                      title="Lofi Girl Stream"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-[10px] text-center text-warm-muted dark:text-slate-400">
                    Lofi Girl Live Radio • Nhạc tập trung 24/7
                  </p>
                </div>
              )}

              {/* TAB 3: POMODORO TIMER */}
              {activeTab === 'POMODORO' && (
                <div className="space-y-3 text-center py-1">
                  <div className="flex justify-center gap-2 mb-2">
                    <button
                      onClick={() => { setPomodoroMode('WORK'); setTimeLeft(25 * 60); setIsTimerRunning(false); }}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                        pomodoroMode === 'WORK'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                          : 'bg-warm-hover dark:bg-slate-800 text-warm-muted dark:text-slate-400'
                      }`}
                    >
                      Tập trung (25m)
                    </button>
                    <button
                      onClick={() => { setPomodoroMode('BREAK'); setTimeLeft(5 * 60); setIsTimerRunning(false); }}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                        pomodoroMode === 'BREAK'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : 'bg-warm-hover dark:bg-slate-800 text-warm-muted dark:text-slate-400'
                      }`}
                    >
                      Nghỉ ngơi (5m)
                    </button>
                  </div>

                  <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-slate-100 tracking-wider">
                    {formatTimer(timeLeft)}
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs active:scale-95 flex items-center gap-1"
                    >
                      {isTimerRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      <span>{isTimerRunning ? 'Tạm dừng' : 'Bắt đầu'}</span>
                    </button>

                    <button
                      onClick={resetPomodoro}
                      className="p-1.5 rounded-full bg-warm-hover dark:bg-slate-800 text-warm-muted dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                      title="Đặt lại đồng hồ"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
