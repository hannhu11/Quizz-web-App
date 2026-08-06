class Entity {
  final int? realClassId;
  const Entity({this.realClassId});
}

class Id {
  final bool assignable;
  final int? realFieldId;
  const Id({this.assignable = false, this.realFieldId});
}

class Index {
  final IndexType? type;
  const Index({this.type});
}

enum IndexType { value, hash, hash64 }

class Backlink {
  final String? to;
  const Backlink([this.to]);
}

class Transient {
  const Transient();
}

class Sync {
  const Sync();
}

class Unique {
  final UniqueConflict? onConflict;
  const Unique({this.onConflict});
}

enum UniqueConflict { error, replace }

class Property {
  final int? id;
  final PropertyType? type;
  const Property({this.id, this.type});
}

enum PropertyType {
  bool,
  byte,
  short,
  int,
  long,
  float,
  double,
  string,
  date,
  dateNano,
  byteVector,
  stringVector,
  relation
}

class ToOne<T> {
  T? target;
  int targetId = 0;

  ToOne();
}

class ToMany<T> {
  final List<T> _items = [];

  List<T> toList() => _items;
  int get length => _items.length;
  bool get isEmpty => _items.isEmpty;
  bool get isNotEmpty => _items.isNotEmpty;

  void add(T item) => _items.add(item);
  void addAll(Iterable<T> items) => _items.addAll(items);
  void clear() => _items.clear();
  bool remove(Object? element) => _items.remove(element);

  T operator [](int index) => _items[index];
  void operator []=(int index, T value) => _items[index] = value;

  Iterator<T> get iterator => _items.iterator;
}

class Box<T> {
  final List<T> _items = [];

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

  T? get(int id) => _items.isNotEmpty ? _items.first : null;
  Future<T?> getAsync(int id) async => get(id);

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
