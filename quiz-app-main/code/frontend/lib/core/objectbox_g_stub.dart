// ignore_for_file: camel_case_types

import 'package:frontend/core/objectbox_stub.dart';
import 'package:frontend/features/library/models/subject.dart';
import 'package:frontend/features/library/models/quiz.dart';
import 'package:frontend/features/library/models/question.dart';
import 'package:frontend/features/library/models/answer.dart';
import 'package:frontend/features/setting/models/app_config.dart';
import 'package:frontend/features/learning/models/session/learning_session.dart';
import 'package:frontend/features/learning/models/session/learning_session_detail.dart';

class Condition<T> {
  Condition<T> operator &(Condition<T> other) => this;
  Condition<T> operator |(Condition<T> other) => this;
  Condition<T>? and(Condition<T>? other) => this;
  Condition<T>? or(Condition<T>? other) => this;
}

class QueryRelationToOne<Source, Target> {
  Condition<Source> equals(int id) => Condition<Source>();
}

class QueryRelationToMany<Source, Target> {
  Condition<Source> equals(int id) => Condition<Source>();
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
enum Order { ascending, descending }

class Query<T> {
  int offset = 0;
  int limit = 0;
  List<T> find() => [];
  List<int> findIds() => [];
  Future<List<T>> findAsync() async => [];
  T? findFirst() => null;
  Future<T?> findFirstAsync() async => null;
  int count() => 0;
  int remove() => 0;
  Future<int> removeAsync() async => 0;
  void close() {}
}

class QueryBuilder<T> {
  Query<T> build() => Query<T>();
  Stream<Query<T>> watch({bool triggerImmediately = false}) =>
      Stream.value(Query<T>());
  QueryBuilder<T> order(dynamic property, {dynamic flags}) => this;
  QueryBuilder<T> link<Target>(QueryRelationToOne<T, Target> rel, [Condition<Target>? cond]) => this;
  QueryBuilder<T> linkMany<Target>(QueryRelationToMany<T, Target> rel, [Condition<Target>? cond]) => this;
  QueryBuilder<T> backlink<Source>(QueryRelationToOne<Source, T> rel, [Condition<Source>? cond]) => this;
  QueryBuilder<T> backlinkMany<Source>(QueryRelationToMany<Source, T> rel, [Condition<Source>? cond]) => this;
}

extension BoxQueryExtension<T> on Box<T> {
  QueryBuilder<T> query([dynamic condition]) => QueryBuilder<T>();
}

class Subject_ {
  static final id = QueryProperty<Subject, int>();
  static final code = QueryProperty<Subject, String>();
  static final name = QueryProperty<Subject, String>();
}

class Quiz_ {
  static final id = QueryProperty<Quiz, int>();
  static final name = QueryProperty<Quiz, String>();
  static final subject = QueryRelationToOne<Quiz, Subject>();
}

class Question_ {
  static final id = QueryProperty<Question, int>();
  static final content = QueryProperty<Question, String>();
  static final quiz = QueryRelationToOne<Question, Quiz>();
}

class Answer_ {
  static final id = QueryProperty<Answer, int>();
  static final content = QueryProperty<Answer, String>();
  static final question = QueryRelationToOne<Answer, Question>();
}

class AppConfig_ {
  static final id = QueryProperty<AppConfig, int>();
}

class LearningSession_ {
  static final id = QueryProperty<LearningSession, int>();
  static final quiz = QueryRelationToOne<LearningSession, Quiz>();
  static final learningMode = QueryProperty<LearningSession, String>();
  static final isCompleted = QueryProperty<LearningSession, bool>();
  static final startTime = QueryProperty<LearningSession, DateTime>();
}


class LearningSessionDetail_ {
  static final id = QueryProperty<LearningSessionDetail, int>();
  static final question = QueryRelationToOne<LearningSessionDetail, Question>();
  static final learningSession = QueryRelationToOne<LearningSessionDetail, LearningSession>();
}



