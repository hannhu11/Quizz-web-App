import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, RotateCcw, Volume2, VolumeX, CloudRain, Waves, Coffee, Radio, Timer, Sparkles, ChevronUp, ChevronDown, Video, ExternalLink, Link2 } from 'lucide-react';

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

const YOUTUBE_PRESETS = [
  { name: 'Lofi Girl Live', id: 'jfKfPfyJRdk' },
  { name: 'Chillhop Radio', id: '5yx6BWlEVcY' },
  { name: 'Synthwave Chill', id: '4xDzrJKXOOY' }
];

const SPOTIFY_PRESETS = [
  { name: '💖 Myy Happyyy (Hàn Như)', uri: 'https://open.spotify.com/embed/playlist/43OQrrLcyzbUR1oL0r2RZO?utm_source=generator&si=e3b55d26ee2f49f3' },
  { name: '🇻🇳 Piano Việt Nam Thư Giãn', uri: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq31qU' },
  { name: '☕ Acoustic Lofi Chill', uri: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWWQR0awES2v8' },
  { name: '🧠 Deep Focus', uri: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadARdKQ' },
  { name: '🌧️ Rainy Lofi Vibes', uri: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX8Ueb2C1u6qE' }
];

function extractYouTubeId(url) {
  if (!url) return 'jfKfPfyJRdk';
  const trimmed = url.trim();
  if (trimmed.length === 11) return trimmed;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);
  return (match && match[2].length === 11) ? match[2] : 'jfKfPfyJRdk';
}

function extractSpotifyEmbedUrl(input) {
  if (!input) return SPOTIFY_PRESETS[0].uri;
  const trimmed = input.trim();
  if (trimmed.includes('spotify.com/embed')) return trimmed;

  const urlMatch = trimmed.match(/open\.spotify\.com\/(playlist|album|track|artist)\/([a-zA-Z0-9]+)/);
  if (urlMatch) {
    return `https://open.spotify.com/embed/${urlMatch[1]}/${urlMatch[2]}?utm_source=generator`;
  }

  const uriMatch = trimmed.match(/spotify:(playlist|album|track|artist):([a-zA-Z0-9]+)/);
  if (uriMatch) {
    return `https://open.spotify.com/embed/${uriMatch[1]}/${uriMatch[2]}?utm_source=generator`;
  }

  return SPOTIFY_PRESETS[0].uri;
}

export default function LofiAudioPlayer() {
  const [activeTab, setActiveTab] = useState('SOUNDS'); // 'SOUNDS' | 'STREAM' | 'POMODORO'
  const [streamSubTab, setStreamSubTab] = useState('SPOTIFY'); // 'SPOTIFY' | 'YOUTUBE'

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // YouTube Custom State
  const [youtubeInput, setYoutubeInput] = useState('');
  const [activeYoutubeId, setActiveYoutubeId] = useState(() => {
    return localStorage.getItem('quizzlet_last_youtube_id') || 'jfKfPfyJRdk';
  });

  // Spotify Custom State
  const [spotifyInput, setSpotifyInput] = useState('');
  const [activeSpotifyEmbedUrl, setActiveSpotifyEmbedUrl] = useState(() => {
    return localStorage.getItem('quizzlet_last_spotify_url') || SPOTIFY_PRESETS[0].uri;
  });

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

  const handleApplyYoutubeUrl = (e) => {
    e.preventDefault();
    if (!youtubeInput.trim()) return;
    const yId = extractYouTubeId(youtubeInput);
    setActiveYoutubeId(yId);
    localStorage.setItem('quizzlet_last_youtube_id', yId);
    setYoutubeInput('');
  };

  const handleApplySpotifyUrl = (e) => {
    e.preventDefault();
    if (!spotifyInput.trim()) return;
    const sUrl = extractSpotifyEmbedUrl(spotifyInput);
    setActiveSpotifyEmbedUrl(sUrl);
    localStorage.setItem('quizzlet_last_spotify_url', sUrl);
    setSpotifyInput('');
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
        className="rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-warm-border dark:border-slate-800 shadow-soft-lg p-3 sm:p-4 text-warm-text dark:text-slate-100 max-w-sm w-80 sm:w-88 transition-all duration-300"
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
              {/* Main Tab Selector Header */}
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
                  <Radio className="w-3 h-3" /> Music Stream
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

              {/* TAB 2: STREAM (SPOTIFY & YOUTUBE) */}
              {activeTab === 'STREAM' && (
                <div className="space-y-3">
                  {/* Stream Sub-tab Selector */}
                  <div className="flex items-center gap-1.5 p-0.5 bg-slate-100 dark:bg-slate-800/60 rounded-lg text-[11px]">
                    <button
                      onClick={() => setStreamSubTab('SPOTIFY')}
                      className={`flex-1 py-1 rounded-md font-bold transition-all flex items-center justify-center gap-1.5 ${
                        streamSubTab === 'SPOTIFY'
                          ? 'bg-[#1DB954] text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.3.102zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38C8.88 5.82 15.96 6.06 20.28 8.64c.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"/>
                      </svg>
                      <span>Spotify Lounge</span>
                    </button>

                    <button
                      onClick={() => setStreamSubTab('YOUTUBE')}
                      className={`flex-1 py-1 rounded-md font-bold transition-all flex items-center justify-center gap-1.5 ${
                        streamSubTab === 'YOUTUBE'
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>YouTube Lofi</span>
                    </button>
                  </div>

                  {/* SUB-TAB: SPOTIFY LOUNGE */}
                  {streamSubTab === 'SPOTIFY' && (
                    <div className="space-y-2.5">
                      {/* Curated Spotify Presets */}
                      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                        {SPOTIFY_PRESETS.map((preset) => (
                          <button
                            key={preset.name}
                            onClick={() => {
                              setActiveSpotifyEmbedUrl(preset.uri);
                              localStorage.setItem('quizzlet_last_spotify_url', preset.uri);
                            }}
                            className={`px-2.5 py-1 rounded-full whitespace-nowrap font-bold transition-colors ${
                              activeSpotifyEmbedUrl === preset.uri
                                ? 'bg-[#1DB954] text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>

                      {/* Spotify Embed Player */}
                      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs bg-slate-950">
                        <iframe
                          data-testid="embed-iframe"
                          style={{ borderRadius: '12px' }}
                          src={activeSpotifyEmbedUrl}
                          width="100%"
                          height="152"
                          frameBorder="0"
                          allowFullScreen=""
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                        />
                      </div>

                      {/* Spotify Custom Link Input & Connect Button */}
                      <form onSubmit={handleApplySpotifyUrl} className="flex gap-1.5">
                        <div className="relative flex-1">
                          <Link2 className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Dán link Playlist / URI Spotify..."
                            value={spotifyInput}
                            onChange={(e) => setSpotifyInput(e.target.value)}
                            className="w-full pl-7 pr-2 py-1.5 text-[11px] rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#1DB954]"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-3 py-1.5 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-white text-[11px] font-bold shadow-xs transition-transform active:scale-95 shrink-0"
                        >
                          Phát
                        </button>
                      </form>

                      {/* Spotify Connect External Button */}
                      <a
                        href="https://open.spotify.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 text-[#1DB954] border border-[#1DB954]/40 text-[11px] font-bold transition-all"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Mở App Spotify Cá Nhân</span>
                      </a>
                    </div>
                  )}

                  {/* SUB-TAB: YOUTUBE LOFI */}
                  {streamSubTab === 'YOUTUBE' && (
                    <div className="space-y-2.5">
                      {/* YouTube Quick Presets */}
                      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                        {YOUTUBE_PRESETS.map((preset) => (
                          <button
                            key={preset.id}
                            onClick={() => {
                              setActiveYoutubeId(preset.id);
                              localStorage.setItem('quizzlet_last_youtube_id', preset.id);
                            }}
                            className={`px-2.5 py-1 rounded-full whitespace-nowrap font-bold transition-colors ${
                              activeYoutubeId === preset.id
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>

                      {/* YouTube Embed Player */}
                      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black aspect-video relative">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube-nocookie.com/embed/${activeYoutubeId}?autoplay=0`}
                          title="YouTube Stream"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>

                      {/* YouTube Link Parser Input Form */}
                      <form onSubmit={handleApplyYoutubeUrl} className="flex gap-1.5">
                        <div className="relative flex-1">
                          <Video className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-rose-500" />
                          <input
                            type="text"
                            placeholder="Dán link YouTube Lofi tại đây..."
                            value={youtubeInput}
                            onChange={(e) => setYoutubeInput(e.target.value)}
                            className="w-full pl-7 pr-2 py-1.5 text-[11px] rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold shadow-xs transition-transform active:scale-95 shrink-0"
                        >
                          Phát
                        </button>
                      </form>
                    </div>
                  )}
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
