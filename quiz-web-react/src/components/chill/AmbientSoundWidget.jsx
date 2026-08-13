import React, { useState, useEffect, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Volume2, VolumeX, CloudRain, Coffee, Waves, Flame, Wind, TreePine, Bird, Music, X, Minimize2, SlidersHorizontal } from 'lucide-react';

const ICONS = { CloudRain, Coffee, Waves, Flame, Wind, TreePine, Bird, Music };

const AMBIENT_SOUNDS = [
  { id: 'rain', title: 'Mưa Rơi', subtitle: 'Tiếng mưa thanh tịnh', icon: 'CloudRain', src: 'https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg' },
  { id: 'cafe', title: 'Quán Cà Phê', subtitle: 'Không gian góc quán quen', icon: 'Coffee', src: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg' },
  { id: 'ocean', title: 'Sóng Biển', subtitle: 'Sóng vỗ du dương bờ cát', icon: 'Waves', src: 'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg' },
  { id: 'fire', title: 'Lửa Trại', subtitle: 'Tiếng lửa bập bùng', icon: 'Flame', src: 'https://actions.google.com/sounds/v1/ambiences/fire.ogg' },
  { id: 'wind', title: 'Tiếng Gió', subtitle: 'Gió vi vu qua khe cửa', icon: 'Wind', src: 'https://actions.google.com/sounds/v1/weather/wind.ogg' },
  { id: 'light_rain', title: 'Mưa Rào', subtitle: 'Mưa phùn rải rác', icon: 'CloudRain', src: 'https://actions.google.com/sounds/v1/weather/light_rain.ogg' },
  { id: 'thunder', title: 'Sấm Sét', subtitle: 'Tiếng sấm mưa đêm', icon: 'TreePine', src: 'https://actions.google.com/sounds/v1/weather/thunderstorm.ogg' },
  { id: 'clock', title: 'Đồng Hồ Focus', subtitle: 'Tiếng gõ nhịp tập trung', icon: 'Music', src: 'https://actions.google.com/sounds/v1/household/clock_ticking.ogg' },
];

export default function AmbientSoundWidget({ isExpanded, onClose, onToggleExpand, onStatusChange, constraintsRef }) {
  const dragControls = useDragControls();
  const [activeSounds, setActiveSounds] = useState({});
  const [soundVolumes, setSoundVolumes] = useState(
    AMBIENT_SOUNDS.reduce((acc, sound) => ({ ...acc, [sound.id]: 0.5 }), {})
  );
  const [masterVolume, setMasterVolume] = useState(0.8);
  const audioRefs = useRef({});

  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach(audioEl => {
        if (audioEl) audioEl.pause();
      });
    };
  }, []);

  useEffect(() => {
    const activeNames = AMBIENT_SOUNDS.filter(s => activeSounds[s.id]).map(s => s.title);
    if (onStatusChange) {
      onStatusChange({ isActive: activeNames.length > 0, activeSoundNames: activeNames });
    }
  }, [activeSounds, onStatusChange]);

  const toggleSound = (id) => {
    const isNowActive = !activeSounds[id];
    setActiveSounds(prev => ({ ...prev, [id]: isNowActive }));
    const audioEl = audioRefs.current[id];
    if (audioEl) {
      if (isNowActive) {
        audioEl.volume = soundVolumes[id] * masterVolume;
        audioEl.play().catch(e => console.error("Audio play error", e));
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
    Object.keys(activeSounds).forEach(id => {
      if (activeSounds[id] && audioRefs.current[id]) {
        audioRefs.current[id].volume = soundVolumes[id] * newVol;
      }
    });
  };

  return (
    <>
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
        style={{
          display: isExpanded ? 'flex' : 'none'
        }}
        className="fixed bottom-20 right-4 sm:right-6 z-40 w-80 max-w-[calc(100vw-2rem)] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xl rounded-2xl text-slate-800 dark:text-slate-100 flex-col"
        drag
        dragMomentum={false}
        dragConstraints={constraintsRef}
        dragListener={false}
        dragControls={dragControls}
      >
        <div 
          onPointerDown={(e) => dragControls.start(e)}
          style={{ touchAction: 'none' }}
          className="flex items-center justify-between px-4 py-3 bg-slate-50/90 dark:bg-slate-800/90 border-b border-slate-200/80 dark:border-slate-700/80 rounded-t-2xl cursor-move shrink-0"
        >
          <div className="flex items-center gap-2 font-bold text-sm">
            <SlidersHorizontal className="w-4 h-4 text-amber-500" />
            <span>Âm Thanh Thư Giãn</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={onToggleExpand} className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400">
              <Minimize2 className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400 transition-colors text-slate-500 dark:text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-4 overflow-hidden">
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
              className="flex-1 accent-amber-500 dark:accent-amber-400 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
            />
            <span className="text-xs font-mono font-bold text-slate-500 w-9 text-right">
              {Math.round(masterVolume * 100)}%
            </span>
          </div>

          <div className="flex flex-col gap-2 max-h-[320px] overflow-y-auto pr-1 pb-1 custom-scrollbar">
            {AMBIENT_SOUNDS.map(sound => {
              const Icon = ICONS[sound.icon];
              const isOn = activeSounds[sound.id];
              return (
                <div 
                  key={sound.id}
                  className={`flex flex-col gap-2 p-3 rounded-xl border transition-all duration-200 ${
                    isOn 
                      ? 'bg-amber-50/80 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/30' 
                      : 'bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-100/50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isOn ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                        {Icon && <Icon className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold">{sound.title}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{sound.subtitle}</div>
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
                    <div className="flex items-center gap-3 px-1 mt-1">
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
