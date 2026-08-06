class Box<T> {
  final List<T> _items = [];

  List<T> getAll() => List.unmodifiable(_items);

  int put(T object) {
    if (!_items.contains(object)) {
      _items.add(object);
    }
    return 1;
  }

  List<int> putMany(List<T> objects) {
    _items.addAll(objects);
    return List.generate(objects.length, (i) => i + 1);
  }

  bool remove(int id) {
    if (_items.isNotEmpty) {
      _items.removeAt(0);
      return true;
    }
    return false;
  }

  int removeAll() {
    final count = _items.length;
    _items.clear();
    return count;
  }
}

class ObjectBoxService {
  static ObjectBoxService? _instance;
  final Map<Type, Box> _boxes = {};

  static ObjectBoxService get instance {
    _instance ??= ObjectBoxService._create();
    return _instance!;
  }

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
