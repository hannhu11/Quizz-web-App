class Entity {
  final int? realClassId;
  const Entity({this.realClassId});
}

class Id {
  final int? realFieldId;
  const Id({this.realFieldId});
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
  T? _target;
  int targetId = 0;

  T? get target => _target;
  set target(T? val) {
    _target = val;
  }

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
