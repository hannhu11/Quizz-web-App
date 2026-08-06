enum TxMode { read, write }

class Store {
  Future<R> runInTransactionAsync<R, P>(
    TxMode mode,
    Future<R> Function(P param) callback,
    P param,
  ) async {
    return await callback(param);
  }
  void close() {}
}

class QueryBuilder<T> {
  Query<T> build() => Query<T>();
  List<int> getIdsAndClose() => [];
  QueryBuilder<T> safeLink<Target, V>(dynamic value, dynamic rel, dynamic builder) => this;
  QueryBuilder<T> safeLinkMany<Target, V>(dynamic value, dynamic rel, dynamic builder) => this;
  QueryBuilder<T> safeBacklink<Source, V>(dynamic value, dynamic rel, dynamic builder) => this;
  QueryBuilder<T> safeBacklinkMany<Source, V>(dynamic value, dynamic rel, dynamic builder) => this;
  QueryBuilder<T> link(dynamic rel, [dynamic cond]) => this;
  QueryBuilder<T> linkMany(dynamic rel, [dynamic cond]) => this;
  QueryBuilder<T> backlink(dynamic rel, [dynamic cond]) => this;
  QueryBuilder<T> backlinkMany(dynamic rel, [dynamic cond]) => this;
}

class Query<T> {
  int limit = 0;
  int offset = 0;
  List<T> find() => [];
  List<int> findIds() => [];
  T? findFirst() => null;
  int remove() => 0;
  void close() {}
}

class Box<T> {
  final List<T> _items = [];

  T? get(int id) => _items.isNotEmpty ? _items.first : null;

  Future<T?> getAsync(int id) async => get(id);

  List<T> getAll() => List.unmodifiable(_items);

  int put(T object) {
    if (!_items.contains(object)) {
      _items.add(object);
    }
    return 1;
  }

  Future<int> putAsync(T object) async => put(object);

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

  QueryBuilder<T> query([dynamic condition]) => QueryBuilder<T>();
}

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
