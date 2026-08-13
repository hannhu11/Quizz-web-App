import React, { useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Video, ExternalLink, Link2, X, Minimize2, Radio, Square } from 'lucide-react';

function extractYouTubeId(url) {
  if (!url) return null;
  const trimmed = url.trim();
  if (trimmed.length === 11 && /^[A-Za-z0-9_-]+$/.test(trimmed)) return trimmed;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = trimmed.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function extractSpotifyEmbedUrl(input) {
  if (!input) return null;
  const trimmed = input.trim();
  if (trimmed.includes('spotify.com/embed')) return trimmed;
  const urlMatch = trimmed.match(/open\.spotify\.com\/(playlist|album|track|artist)\/([a-zA-Z0-9]+)/);
  if (urlMatch) return `https://open.spotify.com/embed/${urlMatch[1]}/${urlMatch[2]}?utm_source=generator`;
  const uriMatch = trimmed.match(/spotify:(playlist|album|track|artist):([a-zA-Z0-9]+)/);
  if (uriMatch) return `https://open.spotify.com/embed/${uriMatch[1]}/${uriMatch[2]}?utm_source=generator`;
  return null;
}

const SPOTIFY_PRESETS = [
  { name: 'Myy Happyyy', uri: 'https://open.spotify.com/embed/playlist/43OQrrLcyzbUR1oL0r2RZO?utm_source=generator&si=e3b55d26ee2f49f3' },
  { name: 'Chill Lofi Mix', uri: 'https://open.spotify.com/embed/playlist/2cIuTzSPlELxZ07giRKmP3?utm_source=generator&si=6477324161bd49d1' },
  { name: 'Study Beats', uri: 'https://open.spotify.com/embed/playlist/5SB9FzK07VsvJv0J46FlqP?utm_source=generator&si=c7495dcb810c4d77' },
];

const YOUTUBE_PRESETS = [
  { name: 'Chillhop Radio 24/7', id: '5yx6BWlEVcY' },
  { name: 'Lofi Girl Study', id: 'jfKfPfyJRdk' },
  { name: 'Synthwave Chill', id: '4xDzrJKXOOY' },
  { name: 'Zelda Lofi Beats', id: 'WBFAgT3aN20' },
];

export default function MediaStreamWidget({ isExpanded, onClose, onToggleExpand, onStatusChange, constraintsRef }) {
  const dragControls = useDragControls();
  const [streamSubTab, setStreamSubTab] = useState('SPOTIFY');
  const [activeSpotifyEmbedUrl, setActiveSpotifyEmbedUrl] = useState(() => {
    return localStorage.getItem('quizzlet_last_spotify_url') || SPOTIFY_PRESETS[0].uri;
  });
  const [activeSpotifyPresetName, setActiveSpotifyPresetName] = useState('Myy Happyyy');
  const [activeYoutubeId, setActiveYoutubeId] = useState(() => {
    return localStorage.getItem('quizzlet_last_youtube_id') || YOUTUBE_PRESETS[0].id;
  });
  const [spotifyInput, setSpotifyInput] = useState('');
  const [youtubeInput, setYoutubeInput] = useState('');

  useEffect(() => {
    localStorage.setItem('quizzlet_last_spotify_url', activeSpotifyEmbedUrl);
  }, [activeSpotifyEmbedUrl]);

  useEffect(() => {
    localStorage.setItem('quizzlet_last_youtube_id', activeYoutubeId);
  }, [activeYoutubeId]);

  useEffect(() => {
    if (onStatusChange) {
      onStatusChange({
        isActive: true,
        source: streamSubTab === 'SPOTIFY' ? 'spotify' : 'youtube',
        label: streamSubTab === 'SPOTIFY' ? activeSpotifyPresetName : 'YouTube'
      });
    }
  }, [streamSubTab, activeSpotifyEmbedUrl, activeYoutubeId, activeSpotifyPresetName, onStatusChange]);

  const handleSpotifySubmit = (e) => {
    e.preventDefault();
    const url = extractSpotifyEmbedUrl(spotifyInput);
    if (url) {
      setActiveSpotifyEmbedUrl(url);
      setActiveSpotifyPresetName('Custom');
      setSpotifyInput('');
    }
  };

  const handleYoutubeSubmit = (e) => {
    e.preventDefault();
    const id = extractYouTubeId(youtubeInput);
    if (id) {
      setActiveYoutubeId(id);
      setYoutubeInput('');
    }
  };

  return (
    <motion.div
      style={{
        display: isExpanded ? 'flex' : 'none'
      }}
      className="fixed bottom-20 right-4 sm:right-6 z-[41] w-80 sm:w-96 max-w-[calc(100vw-2rem)] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xl rounded-2xl text-slate-800 dark:text-slate-100 flex-col"
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragListener={false}
      dragControls={dragControls}
    >
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        style={{ touchAction: 'none' }}
        className="flex items-center justify-between p-3 bg-slate-50/90 dark:bg-slate-800/90 border-b border-slate-200/80 dark:border-slate-700/80 cursor-move rounded-t-2xl shrink-0"
      >
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-sm">Media Stream</h3>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={onToggleExpand}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:bg-slate-700/60 cursor-pointer transition-all duration-200"
            title="Thu nhỏ"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button 
            onClick={onToggleExpand}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:bg-slate-700/60 cursor-pointer transition-all duration-200"
            title="Thu nhỏ xuống thanh trạng thái"
          >
            <X className="w-4 h-4" />
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-rose-100 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-950 dark:hover:text-rose-400 cursor-pointer transition-all duration-200"
            title="Dừng phát hoàn toàn"
          >
            <Square className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>

      <div className="p-3">
        <div className="flex gap-1 p-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 mb-4">
          <button
            onClick={() => setStreamSubTab('SPOTIFY')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all duration-200 ${
              streamSubTab === 'SPOTIFY'
                ? 'bg-[#1DB954] text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/60'
            }`}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.3.102zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38C8.88 5.82 15.96 6.06 20.28 8.64c.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"/>
            </svg>
            Spotify
          </button>
          <button
            onClick={() => setStreamSubTab('YOUTUBE')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all duration-200 ${
              streamSubTab === 'YOUTUBE'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/60'
            }`}
          >
            <Video className="w-4 h-4" />
            YouTube
          </button>
        </div>

        {/* Spotify Section - Only mount iframe when active tab is SPOTIFY */}
        {streamSubTab === 'SPOTIFY' && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {SPOTIFY_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setActiveSpotifyEmbedUrl(preset.uri);
                    setActiveSpotifyPresetName(preset.name);
                  }}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs border cursor-pointer transition-all duration-200 ${
                    activeSpotifyEmbedUrl === preset.uri
                      ? 'bg-[#1DB954]/15 text-[#1DB954] border-[#1DB954]/30 font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: '12px' }}
              src={activeSpotifyEmbedUrl}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />

            <form onSubmit={handleSpotifySubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={spotifyInput}
                  onChange={(e) => setSpotifyInput(e.target.value)}
                  placeholder="Spotify URL..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-xl text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1DB954]/50"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-xl font-bold text-xs cursor-pointer transition-all duration-200"
              >
                Phát
              </button>
            </form>

            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-[#1DB954] hover:bg-[#1DB954]/10 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200"
            >
              Mở Spotify
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* YouTube Section - Only mount iframe when active tab is YOUTUBE */}
        {streamSubTab === 'YOUTUBE' && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {YOUTUBE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setActiveYoutubeId(preset.id)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs border cursor-pointer transition-all duration-200 ${
                    activeYoutubeId === preset.id
                      ? 'bg-red-600/15 text-red-600 border-red-600/30 font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            <iframe
              className="w-full"
              style={{ aspectRatio: '16/9', borderRadius: '12px' }}
              src={`https://www.youtube-nocookie.com/embed/${activeYoutubeId}?autoplay=0`}
              title="YouTube Stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />

            <form onSubmit={handleYoutubeSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={youtubeInput}
                  onChange={(e) => setYoutubeInput(e.target.value)}
                  placeholder="YouTube URL..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-xl text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs cursor-pointer transition-all duration-200"
              >
                Phát
              </button>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
}
