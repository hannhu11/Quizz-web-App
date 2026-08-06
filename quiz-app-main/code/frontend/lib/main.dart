import 'dart:io';

import 'package:auto_updater/auto_updater.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:frontend/core/constants/app_strings.dart';
import 'package:frontend/core/services/database_cleanup_service.dart';
import 'package:frontend/core/services/device_info_service.dart';
import 'package:frontend/core/services/object_box_service.dart';
import 'package:frontend/core/services/path_service.dart';
import 'package:frontend/routes/app_router.dart';
import 'package:frontend/utils/ocr.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:upgrader/upgrader.dart';
import 'package:google_fonts/google_fonts.dart';

import 'package:frontend/core/services/sync_service.dart';

const String appcastURL =
    'https://raw.githubusercontent.com/hannhu-io-vn/quiz-app/refs/heads/main/deploy/appcast.xml';

void main() async {
  // 1. Đảm bảo Flutter đã sẵn sàng
  WidgetsFlutterBinding.ensureInitialized();

  // 2. Khởi tạo các service (chỉ trên Desktop/Mobile native)
  if (!kIsWeb) {
    await AppPathService().init();
    await ObjectBoxService.create();
    await DatabaseCleanupService.runFullCleanup();
    await DeviceInfoService().init();
    await OcrUtils().initOcr();

    // Tự động đồng bộ dữ liệu từ server (hannhu.io.vn) xuống Windows App
    SyncService.syncDataWithServer();

    // Khởi chạy Auto Updater cho Windows
    if (!kDebugMode && Platform.isWindows) {
      await autoUpdater.setFeedURL(appcastURL);
      await autoUpdater.setScheduledCheckInterval(7200); // Check mỗi 2 tiếng
      await autoUpdater.checkForUpdates(inBackground: true);
    }
  }

  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends HookWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    FlutterError.onError = (FlutterErrorDetails details) {
      if (details.exception is AssertionError &&
          details.exception.toString().contains('mouse_tracker')) {
        return; // "Câm nín" cái lỗi chuột phiền phức kia
      }
      FlutterError.presentError(details);
    };

    return MaterialApp.router(
      title: AppStrings.appName,
      routerConfig: appRouter,
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorSchemeSeed: const Color(0xFF4A6FA5), // Academic Slate Blue
        brightness: Brightness.light,
        scaffoldBackgroundColor: const Color(0xFFF5F4EF), // Warm cream
        textTheme: GoogleFonts.interTextTheme(
          Theme.of(context).textTheme,
        ).copyWith(
          headlineLarge: GoogleFonts.plusJakartaSans(
            fontWeight: FontWeight.w700,
            letterSpacing: -0.5,
          ),
          headlineMedium: GoogleFonts.plusJakartaSans(
            fontWeight: FontWeight.w600,
          ),
          titleLarge: GoogleFonts.plusJakartaSans(
            fontWeight: FontWeight.w600,
          ),
          titleMedium: GoogleFonts.plusJakartaSans(
            fontWeight: FontWeight.w500,
          ),
        ),
        cardTheme: CardThemeData(
          color: Colors.white.withValues(alpha: 0.85),
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
            side: const BorderSide(color: Color(0xFFE5E7EB)),
          ),
        ),
        dividerColor: const Color(0xFFE5E7EB),
      ),
      // Sửa ở đây: Bọc UpgradeAlert bên trong Navigator Context
      builder: (context, child) {
        if (!kIsWeb && !kDebugMode && Platform.isLinux) {
          return UpgradeAlert(
            upgrader: Upgrader(
              storeController: UpgraderStoreController(
                onLinux: () => UpgraderAppcastStore(appcastURL: appcastURL),
              ),
              languageCode: 'vi',
            ),
            child: Builder(
              builder: (innerContext) => child ?? const SizedBox.shrink(),
            ),
          );
        }
        return child ?? const SizedBox.shrink();
      },
    );
  }
}

