import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX, CloudRain, Waves, Coffee, ChevronUp, ChevronDown } from 'lucide-react';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  const currentTrack = AMBIENT_SOUNDSCAPES[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Audio playback user interaction required', err);
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
        className="rounded-3xl glass-panel border border-warm-border shadow-soft-lg p-3 sm:p-4 text-warm-text max-w-xs transition-all duration-300"
      >
        {/* Compact Bar */}
        <div className="flex items-center gap-3">
          {/* Waveform / Sound Icon */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-200 via-rose-200 to-indigo-200 flex items-center justify-center shrink-0 shadow-xs relative group"
          >
            {isPlaying ? (
              <div className="flex items-end justify-center gap-0.5 h-4">
                <span className="w-1 bg-amber-800 animate-[bounce_1s_infinite_100ms] rounded-full h-3" />
                <span className="w-1 bg-amber-800 animate-[bounce_1s_infinite_300ms] rounded-full h-4" />
                <span className="w-1 bg-amber-800 animate-[bounce_1s_infinite_200ms] rounded-full h-2" />
              </div>
            ) : (
              <Music className="w-4 h-4 text-amber-900 group-hover:scale-110 transition-transform" />
            )}
          </button>

          {/* Track Details */}
          <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <h4 className="text-xs font-bold truncate text-warm-text leading-tight">{currentTrack.title}</h4>
            <p className="text-[10px] text-warm-muted truncate">{currentTrack.subtitle}</p>
          </div>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-warm-slate hover:bg-slate-700 text-white flex items-center justify-center shadow-xs transition-all active:scale-95 shrink-0"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>

          {/* Toggle Expand */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-full hover:bg-warm-hover text-warm-muted hover:text-warm-text transition-all"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Soundscape Selection Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 pt-3 border-t border-warm-border/60 space-y-3 overflow-hidden"
            >
              {/* Volume Controls */}
              <div className="flex items-center gap-2 px-1">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-warm-muted hover:text-warm-text"
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
                  className="w-full h-1 bg-warm-border rounded-lg appearance-none cursor-pointer accent-warm-slate"
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
                          ? 'bg-amber-100/80 font-bold text-amber-950 border border-amber-200/80'
                          : 'hover:bg-warm-hover text-warm-muted hover:text-warm-text'
                      }`}
                    >
                      <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-700' : 'text-warm-muted'}`} />
                      <span className="truncate">{track.title}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
