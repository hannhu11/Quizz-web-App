import 'package:flutter/foundation.dart';
import 'package:frontend/core/services/path_service.dart';
import 'package:frontend/features/learning/models/session/learning_session.dart';
import 'package:frontend/features/learning/models/session/learning_session_detail.dart';
import 'package:frontend/features/library/models/answer.dart';
import 'package:frontend/features/library/models/question.dart';
import 'package:frontend/features/library/models/quiz.dart';
import 'package:frontend/features/library/models/subject.dart';
import 'package:frontend/features/setting/models/app_config.dart';
import 'package:frontend/objectbox.g.dart';

class ObjectBoxService {
  static ObjectBoxService? _instance;

  late final Store store;
  final Map<Type, Box> _boxes = {};

  static ObjectBoxService get instance {
    if (_instance == null) {
      throw Exception("ObjectBoxService chưa được khởi tạo!");
    }
    return _instance!;
  }

  ObjectBoxService._create(this.store) {
    _initBoxes();
  }

  void _initBoxes() {
    register<Answer>();
    register<Question>();
    register<Quiz>();
    register<Subject>();
    register<LearningSession>();
    register<LearningSessionDetail>();
    register<AppConfig>();
  }

  void register<T>() {
    _boxes[T] = store.box<T>();
  }

  Box<T> get<T>() => _boxes[T] as Box<T>;

  static Future<ObjectBoxService> create() async {
    if (_instance != null) return _instance!;
    final String customPath = AppPathService().databasePath;
    debugPrint("ObjectBox Path chuẩn: $customPath");
    final store = await openStore(directory: customPath);
    _instance = ObjectBoxService._create(store);
    return _instance!;
  }

  void dispose() {
    store.close();
  }
}
