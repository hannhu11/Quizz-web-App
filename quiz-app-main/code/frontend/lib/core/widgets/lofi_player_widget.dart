import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:frontend/core/services/lofi_audio_service.dart';

/// Compact Lofi Ambient Player widget for sidebar footer
class LofiPlayerWidget extends HookConsumerWidget {
  final bool isCollapsed;

  const LofiPlayerWidget({super.key, this.isCollapsed = false});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final audio = ref.watch(lofiAudioNotifierProvider);
    final showVolume = useState(false);

    if (isCollapsed) {
      return _buildCollapsedView(audio);
    }

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: const Color(0xFFF5F4EF),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFFE5E7EB)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Header row
          Row(
            children: [
              Text(
                audio.currentTrack.icon,
                style: const TextStyle(fontSize: 18),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Lofi Chill',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF64748B),
                        letterSpacing: 0.5,
                      ),
                    ),
                    Text(
                      audio.currentTrack.title,
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF1E293B),
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          // Controls row
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Volume toggle
              _buildIconButton(
                icon: showVolume.value
                    ? Icons.volume_up_rounded
                    : Icons.volume_down_rounded,
                onTap: () => showVolume.value = !showVolume.value,
                size: 18,
              ),
              const SizedBox(width: 8),
              // Play/Pause
              _buildPlayButton(audio),
              const SizedBox(width: 8),
              // Next track
              _buildIconButton(
                icon: Icons.skip_next_rounded,
                onTap: () => audio.nextTrack(),
                size: 18,
              ),
            ],
          ),
          // Volume slider (animated)
          if (showVolume.value) ...[
            const SizedBox(height: 6),
            SliderTheme(
              data: const SliderThemeData(
                activeTrackColor: Color(0xFF4A6FA5),
                inactiveTrackColor: Color(0xFFE5E7EB),
                thumbColor: Color(0xFF4A6FA5),
                trackHeight: 3,
                thumbShape: RoundSliderThumbShape(enabledThumbRadius: 6),
                overlayShape: RoundSliderOverlayShape(overlayRadius: 12),
              ),
              child: Slider(
                value: audio.volume,
                onChanged: (v) => audio.setVolume(v),
                min: 0,
                max: 1,
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildCollapsedView(LofiAudioNotifier audio) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Column(
        children: [
          Text(audio.currentTrack.icon, style: const TextStyle(fontSize: 16)),
          const SizedBox(height: 4),
          _buildPlayButton(audio, size: 28),
        ],
      ),
    );
  }

  Widget _buildPlayButton(LofiAudioNotifier audio, {double size = 34}) {
    return GestureDetector(
      onTap: () => audio.togglePlay(),
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          color: audio.isPlaying
              ? const Color(0xFF4A6FA5)
              : const Color(0xFFE5E7EB),
          shape: BoxShape.circle,
          boxShadow: audio.isPlaying
              ? [
                  BoxShadow(
                    color: const Color(0xFF4A6FA5).withValues(alpha: 0.3),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ]
              : null,
        ),
        child: Icon(
          audio.isPlaying ? Icons.pause_rounded : Icons.play_arrow_rounded,
          color: audio.isPlaying ? Colors.white : const Color(0xFF64748B),
          size: size * 0.5,
        ),
      ),
    );
  }

  Widget _buildIconButton({
    required IconData icon,
    required VoidCallback onTap,
    double size = 18,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(6),
        decoration: BoxDecoration(
          color: const Color(0xFFE5E7EB).withValues(alpha: 0.5),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(icon, size: size, color: const Color(0xFF64748B)),
      ),
    );
  }
}
