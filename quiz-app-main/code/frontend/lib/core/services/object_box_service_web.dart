import 'package:frontend/core/objectbox_g_stub.dart';
import 'package:frontend/core/objectbox_stub.dart';

export 'package:frontend/core/objectbox_g_stub.dart';
export 'package:frontend/core/objectbox_stub.dart';

class ObjectBoxService {
  static ObjectBoxService? _instance;
  final Map<Type, Box> _boxes = {};
  final Store _store = Store();

  static ObjectBoxService get instance {
    _instance ??= ObjectBoxService._create();
    return _instance!;
  }

  Store get store => _store;

  ObjectBoxService._create();

  void register<T>() {
    _boxes[T] = Box<T>();
  }

  Box<T> get<T>() {
    _boxes.putIfAbsent(T, () => Box<T>());
    return _boxes[T] as Box<T>;
  }

  static Future<ObjectBoxService> create() async {
    _instance = ObjectBoxService._create();
    return _instance!;
  }

  void dispose() {}
}
