import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, CloudRain, Coffee, Waves, Flame, Wind, TreePine, Bird, Music, X, Minimize2 } from 'lucide-react';

const ICONS = {
  CloudRain, Coffee, Waves, Flame, Wind, TreePine, Bird, Music
};

const AMBIENT_SOUNDS = [
  { id: 'rain', title: 'Mưa Rơi', subtitle: 'Tiếng mưa rơi tĩnh lặng', icon: 'CloudRain', src: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_403c94511d.mp3' },
  { id: 'cafe', title: 'Quán Cà Phê', subtitle: 'Không gian góc quán quen', icon: 'Coffee', src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3' },
  { id: 'ocean', title: 'Sóng Biển', subtitle: 'Sóng vỗ du dương bờ cát', icon: 'Waves', src: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a2b5ef.mp3' },
  { id: 'fire', title: 'Lửa Trại', subtitle: 'Tiếng lửa cháy ấm áp', icon: 'Flame', src: 'https://cdn.pixabay.com/download/audio/2024/11/04/audio_5a30a7e498.mp3' },
  { id: 'wind', title: 'Gió Thổi', subtitle: 'Gió nhẹ qua khe cửa', icon: 'Wind', src: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_5765de03a5.mp3' },
  { id: 'forest', title: 'Đêm Rừng', subtitle: 'Tiếng côn trùng đêm khuya', icon: 'TreePine', src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1bab.mp3' },
  { id: 'birds', title: 'Tiếng Chim', subtitle: 'Chim hót ban mai', icon: 'Bird', src: 'https://cdn.pixabay.com/download/audio/2022/08/04/audio_2bdb7ae009.mp3' },
  { id: 'piano', title: 'Piano Nhẹ', subtitle: 'Giai điệu piano tập trung', icon: 'Music', src: 'https://stream.zeno.fm/f3wvbbqmdg8uv' },
];

export default function AmbientSoundWidget({ isExpanded, onClose, onToggleExpand, onStatusChange }) {
  const [activeSounds, setActiveSounds] = useState({});
  const [soundVolumes, setSoundVolumes] = useState(
    AMBIENT_SOUNDS.reduce((acc, sound) => ({ ...acc, [sound.id]: 0.5 }), {})
  );
  const [masterVolume, setMasterVolume] = useState(0.8);
  const audioRefs = useRef({});

  // Clean up all audio on unmount
  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach(audioEl => {
        if (audioEl) {
          audioEl.pause();
        }
      });
    };
  }, []);

  useEffect(() => {
    // Notify parent about status change
    const activeNames = AMBIENT_SOUNDS.filter(s => activeSounds[s.id]).map(s => s.title);
    const anyActive = activeNames.length > 0;
    if (onStatusChange) {
      onStatusChange({ isActive: anyActive, activeSoundNames: activeNames });
    }
  }, [activeSounds, onStatusChange]);

  const toggleSound = (id) => {
    const isNowActive = !activeSounds[id];
    setActiveSounds(prev => ({ ...prev, [id]: isNowActive }));

    const audioEl = audioRefs.current[id];
    if (audioEl) {
      if (isNowActive) {
        audioEl.volume = soundVolumes[id] * masterVolume;
        audioEl.play().catch(e => console.error("Audio play failed", e));
      } else {
        audioEl.pause();
      }
    }
  };

  const handleSoundVolumeChange = (id, vol) => {
    const newVol = parseFloat(vol);
    setSoundVolumes(prev => ({ ...prev, [id]: newVol }));
    const audioEl = audioRefs.current[id];
    if (audioEl && activeSounds[id]) {
      audioEl.volume = newVol * masterVolume;
    }
  };

  const handleMasterVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setMasterVolume(newVol);
    
    // Update all active sounds with new master volume
    Object.keys(activeSounds).forEach(id => {
      if (activeSounds[id] && audioRefs.current[id]) {
        audioRefs.current[id].volume = soundVolumes[id] * newVol;
      }
    });
  };

  return (
    <>
      {/* ALWAYS render audio elements for DOM retention */}
      {AMBIENT_SOUNDS.map(sound => (
        <audio
          key={sound.id}
          ref={el => audioRefs.current[sound.id] = el}
          src={sound.src}
          loop
          preload="none"
          className="hidden"
        />
      ))}

      <motion.div
        className={`fixed z-40 w-80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 shadow-xl rounded-2xl text-slate-800 dark:text-slate-100 transition-all duration-200 flex flex-col ${
          isExpanded 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95 pointer-events-none absolute -z-10 overflow-hidden h-0 w-0'
        }`}
        layout
      >
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200/60 dark:border-slate-700/60 rounded-t-2xl drag-handle cursor-move shrink-0">
          <div className="flex items-center gap-2 font-semibold">
            <Volume2 className="w-4 h-4 text-amber-500" />
            <span>Âm thanh thư giãn</span>
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

        <div className="p-4 flex flex-col gap-4 overflow-hidden">
          {/* Master Volume */}
          <div className="flex items-center gap-3 px-2">
            {masterVolume === 0 ? (
              <VolumeX className="w-5 h-5 text-slate-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-amber-500" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={masterVolume}
              onChange={handleMasterVolumeChange}
              className="flex-1 accent-amber-500 dark:accent-amber-400 cursor-pointer"
            />
            <span className="text-xs font-mono text-slate-500 w-9 text-right">
              {Math.round(masterVolume * 100)}%
            </span>
          </div>

          {/* Sound List */}
          <div className="flex flex-col gap-2 max-h-[320px] overflow-y-auto pr-1 pb-1 custom-scrollbar">
            {AMBIENT_SOUNDS.map(sound => {
              const Icon = ICONS[sound.icon];
              const isOn = activeSounds[sound.id];
              return (
                <div 
                  key={sound.id}
                  className={`flex flex-col gap-2 p-3 rounded-xl border transition-all duration-200 ${
                    isOn 
                      ? 'bg-amber-50/80 dark:bg-amber-500/10 border-amber-200/60 dark:border-amber-500/30' 
                      : 'bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/40 dark:border-slate-700/40 hover:bg-slate-100/50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isOn ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                        {Icon && <Icon className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{sound.title}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{sound.subtitle}</div>
                      </div>
                    </div>
                    
                    <button 
                      role="switch" 
                      aria-checked={isOn}
                      onClick={() => toggleSound(sound.id)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                        isOn ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transform transition-transform ${
                        isOn ? 'translate-x-4' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  {isOn && (
                    <div className="flex items-center gap-3 px-1 mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                      <Volume2 className="w-3.5 h-3.5 text-amber-500/70" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={soundVolumes[sound.id]}
                        onChange={(e) => handleSoundVolumeChange(sound.id, e.target.value)}
                        className="flex-1 h-1.5 bg-amber-200 dark:bg-amber-900/50 rounded-lg appearance-none cursor-pointer accent-amber-500 dark:accent-amber-400"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}
