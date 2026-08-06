import 'package:frontend/core/objectbox_stub.dart';

class Condition<T> {
  Condition<T>? and(Condition<T>? other) => this;
  Condition<T>? or(Condition<T>? other) => this;
}

class QueryProperty<E, T> {
  Condition<E> equals(T val) => Condition<E>();
  Condition<E> contains(String val, {bool caseSensitive = true}) =>
      Condition<E>();
  Condition<E> equalsTo(int id) => Condition<E>();
}

class Store {
  void close() {}
  Box<T> box<T>() => Box<T>();
  Future<R> runInTransactionAsync<R, P>(
    TxMode mode,
    R Function(Store store, P params) fn,
    P params,
  ) async {
    return fn(this, params);
  }
}

enum TxMode { read, write }

class Query<T> {
  int offset = 0;
  int limit = 0;
  List<T> find() => [];
  Future<List<T>> findAsync() async => [];
  T? findFirst() => null;
  Future<T?> findFirstAsync() async => null;
  int count() => 0;
  int remove() => 0;
  void close() {}
}

class QueryBuilder<T> {
  Query<T> build() => Query<T>();
  Stream<Query<T>> watch({bool triggerImmediately = false}) =>
      Stream.value(Query<T>());
}

extension BoxQueryExtension<T> on Box<T> {
  QueryBuilder<T> query([dynamic condition]) => QueryBuilder<T>();
}

class Subject_ {
  static final id = QueryProperty<dynamic, int>();
  static final code = QueryProperty<dynamic, String>();
  static final name = QueryProperty<dynamic, String>();
}

class Quiz_ {
  static final id = QueryProperty<dynamic, int>();
  static final name = QueryProperty<dynamic, String>();
  static final subject = QueryProperty<dynamic, int>();
}

class Question_ {
  static final id = QueryProperty<dynamic, int>();
  static final content = QueryProperty<dynamic, String>();
  static final quiz = QueryProperty<dynamic, int>();
}

class Answer_ {
  static final id = QueryProperty<dynamic, int>();
  static final content = QueryProperty<dynamic, String>();
  static final question = QueryProperty<dynamic, int>();
}

class AppConfig_ {
  static final id = QueryProperty<dynamic, int>();
}

class LearningSession_ {
  static final id = QueryProperty<dynamic, int>();
}

class LearningSessionDetail_ {
  static final id = QueryProperty<dynamic, int>();
}
