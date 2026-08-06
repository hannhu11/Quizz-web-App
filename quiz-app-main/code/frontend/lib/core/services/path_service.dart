import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';

class AppPathService {
  static final AppPathService _instance = AppPathService._internal();

  factory AppPathService() => _instance;

  AppPathService._internal();

  late final String _rootPath;
  bool _isInitialized = false;

  String get rootPath => _rootPath;

  String get databasePath => p.join(_rootPath, 'database');

  String get tessDataPath => p.join(_rootPath, 'tessdata');

  String get tempPath => p.join(_rootPath, 'temp');

  Future<void> init() async {
    if (_isInitialized) return;

    // 1. Lấy đường dẫn gốc chuẩn hệ điều hành (VD: ~/.local/share/quizapp)
    final Directory appSupportDir = await getApplicationSupportDirectory();

    // 2. Phương án B: Nếu Debug thì chui vào folder ẩn '.debug', Release dùng trực tiếp thư mục gốc
    if (kDebugMode) {
      _rootPath = p.join(appSupportDir.path, '.debug');
    } else {
      _rootPath = appSupportDir.path;
    }

    // 3. Tự động chuyển dữ liệu cũ nếu chạy trên Windows
    if (Platform.isWindows) {
      await _migrateWindowsOldData();
    }

    // 4. Khởi tạo tất cả thư mục làm việc (Gốc, database, tessdata, temp)
    final foldersToCreate = [_rootPath, databasePath, tessDataPath, tempPath];
    for (var path in foldersToCreate) {
      final dir = Directory(path);
      if (!await dir.exists()) {
        await dir.create(recursive: true);
        debugPrint("📁 Đã tạo thư mục: $path");
      }
    }

    _isInitialized = true;
  }

  /// Tự động chuyển dữ liệu từ đường dẫn cũ (%APPDATA%/QuizApp hoặc QuizApp_Debug) sang cấu trúc mới
  Future<void> _migrateWindowsOldData() async {
    final String? roamingPath = Platform.environment['APPDATA'];
    if (roamingPath == null) return;

    final String oldFolderName = kDebugMode ? 'QuizApp_Debug' : 'QuizApp';
    final String oldPath = p.join(roamingPath, oldFolderName);
    final Directory oldDir = Directory(oldPath);
    final Directory newDir = Directory(_rootPath);

    if (await oldDir.exists() && !await newDir.exists()) {
      try {
        debugPrint(
          "🚚 Phát hiện dữ liệu cũ tại $oldPath. Đang di chuyển sang: $_rootPath...",
        );
        await newDir.parent.create(recursive: true);
        await oldDir.rename(_rootPath);
        debugPrint("✅ Di chuyển dữ liệu thành công!");
      } catch (e) {
        debugPrint(
          "⚠️ Rename không thành công ($e), tiến hành copy thủ công...",
        );
        await _copyDirectory(oldDir, newDir);
        await oldDir.delete(recursive: true);
      }
    }
  }

  Future<void> _copyDirectory(Directory source, Directory destination) async {
    await destination.create(recursive: true);
    await for (var entity in source.list(recursive: false)) {
      final newPath = p.join(destination.path, p.basename(entity.path));
      if (entity is Directory) {
        await _copyDirectory(entity, Directory(newPath));
      } else if (entity is File) {
        await entity.copy(newPath);
      }
    }
  }
}
