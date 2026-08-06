import 'package:flutter/foundation.dart';
import 'package:just_audio/just_audio.dart';
import 'package:flutter_riverpod/legacy.dart';

/// Lofi ambient sound tracks - stream from free CDN URLs
class LofiTrack {
  final String title;
  final String icon;
  final String url;

  const LofiTrack({
    required this.title,
    required this.icon,
    required this.url,
  });
}

const List<LofiTrack> lofiTracks = [
  LofiTrack(
    title: 'Lofi Beats',
    icon: '🎵',
    url: 'https://cdn.pixabay.com/audio/2024/11/29/audio_fc130cd069.mp3',
  ),
  LofiTrack(
    title: 'Mưa Nhẹ',
    icon: '🌧️',
    url: 'https://cdn.pixabay.com/audio/2022/05/16/audio_1aa057d2b7.mp3',
  ),
  LofiTrack(
    title: 'Sóng Biển',
    icon: '🌊',
    url: 'https://cdn.pixabay.com/audio/2024/09/10/audio_6e50db42d1.mp3',
  ),
  LofiTrack(
    title: 'Rừng Thông',
    icon: '🌲',
    url: 'https://cdn.pixabay.com/audio/2022/08/31/audio_419263a258.mp3',
  ),
];

class LofiAudioNotifier extends ChangeNotifier {
  AudioPlayer? _player;
  bool isPlaying = false;
  int currentTrackIndex = 0;
  double volume = 0.5;

  LofiTrack get currentTrack => lofiTracks[currentTrackIndex];

  AudioPlayer get _audioPlayer {
    _player ??= AudioPlayer();
    return _player!;
  }

  @override
  void dispose() {
    _player?.dispose();
    super.dispose();
  }

  Future<void> togglePlay() async {
    try {
      if (isPlaying) {
        await _audioPlayer.pause();
        isPlaying = false;
        notifyListeners();
      } else {
        final track = lofiTracks[currentTrackIndex];
        await _audioPlayer.setUrl(track.url);
        await _audioPlayer.setLoopMode(LoopMode.one);
        await _audioPlayer.setVolume(volume);
        await _audioPlayer.play();
        isPlaying = true;
        notifyListeners();
      }
    } catch (e) {
      debugPrint('LofiAudio error: $e');
    }
  }

  Future<void> nextTrack() async {
    currentTrackIndex = (currentTrackIndex + 1) % lofiTracks.length;
    notifyListeners();
    if (isPlaying) {
      try {
        final track = lofiTracks[currentTrackIndex];
        await _audioPlayer.setUrl(track.url);
        await _audioPlayer.setLoopMode(LoopMode.one);
        await _audioPlayer.play();
      } catch (e) {
        debugPrint('LofiAudio next track error: $e');
      }
    }
  }

  Future<void> setVolume(double vol) async {
    volume = vol;
    notifyListeners();
    try {
      await _audioPlayer.setVolume(vol);
    } catch (e) {
      debugPrint('LofiAudio volume error: $e');
    }
  }
}

final lofiAudioNotifierProvider =
    ChangeNotifierProvider<LofiAudioNotifier>((ref) {
  return LofiAudioNotifier();
});
