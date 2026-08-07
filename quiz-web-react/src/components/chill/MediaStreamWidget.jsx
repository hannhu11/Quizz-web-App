import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, ExternalLink, Link2, X, Minimize2, Radio } from 'lucide-react';

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
  { name: 'Chillhop Radio', id: '5yx6BWlEVcY' },
  { name: 'Synthwave Chill', id: '4xDzrJKXOOY' },
];

export default function MediaStreamWidget({ isExpanded, onClose, onToggleExpand, onStatusChange }) {
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

  const spotifyContainerStyle = {
    position: streamSubTab === 'SPOTIFY' ? 'relative' : 'absolute',
    visibility: streamSubTab === 'SPOTIFY' ? 'visible' : 'hidden',
    height: streamSubTab === 'SPOTIFY' ? 'auto' : '0',
    overflow: 'hidden'
  };

  const youtubeContainerStyle = {
    position: streamSubTab === 'YOUTUBE' ? 'relative' : 'absolute',
    visibility: streamSubTab === 'YOUTUBE' ? 'visible' : 'hidden',
    height: streamSubTab === 'YOUTUBE' ? 'auto' : '0',
    overflow: 'hidden'
  };

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isExpanded ? 1 : 0,
        scale: isExpanded ? 1 : 0.95,
      }}
      className={`fixed z-40 w-96 right-6 bottom-24 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-xl text-slate-800 dark:text-slate-100 transition-all duration-200 ${
        !isExpanded ? 'opacity-0 scale-95 pointer-events-none absolute -z-10 overflow-hidden h-0 w-0' : ''
      }`}
    >
      <div className="flex items-center justify-between p-3 bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200/60 dark:border-slate-700/60">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold">Media Stream</h3>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={onToggleExpand}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:bg-slate-700/60 cursor-pointer transition-all duration-200"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-red-100 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-500/20 dark:hover:text-red-400 cursor-pointer transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-3">
        <div className="flex gap-1 p-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 mb-4">
          <button
            onClick={() => setStreamSubTab('SPOTIFY')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm cursor-pointer transition-all duration-200 ${
              streamSubTab === 'SPOTIFY'
                ? 'bg-[#1DB954] text-white font-bold shadow-sm'
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
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm cursor-pointer transition-all duration-200 ${
              streamSubTab === 'YOUTUBE'
                ? 'bg-red-600 text-white font-bold shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/60'
            }`}
          >
            <Video className="w-4 h-4" />
            YouTube
          </button>
        </div>

        <div style={spotifyContainerStyle} className="flex flex-col gap-3">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {SPOTIFY_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  setActiveSpotifyEmbedUrl(preset.uri);
                  setActiveSpotifyPresetName(preset.name);
                }}
                className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-sm border cursor-pointer transition-all duration-200 ${
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
                className="w-full pl-9 pr-3 py-2 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1DB954]/50"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-xl font-bold text-sm cursor-pointer transition-all duration-200"
            >
              Phát
            </button>
          </form>

          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-[#1DB954] hover:bg-[#1DB954]/10 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200"
          >
            Mở Spotify
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div style={youtubeContainerStyle} className="flex flex-col gap-3">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {YOUTUBE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setActiveYoutubeId(preset.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-sm border cursor-pointer transition-all duration-200 ${
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
                className="w-full pl-9 pr-3 py-2 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-sm cursor-pointer transition-all duration-200"
            >
              Phát
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
