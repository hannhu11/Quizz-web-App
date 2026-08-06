import 'dart:convert';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:frontend/core/services/object_box_service.dart';
import 'package:frontend/features/library/models/answer.dart';
import 'package:frontend/features/library/models/question.dart';
import 'package:frontend/features/library/models/quiz.dart';
import 'package:frontend/features/library/models/subject.dart';

class SyncService {
  static const String serverUrl = 'https://hannhu.io.vn/api/sync';
  static const String fallbackUrl = 'https://hannhu.io.vn/api/sync';

  /// Sync data from server to local ObjectBox DB automatically
  static Future<bool> syncDataWithServer() async {
    try {
      debugPrint("🔄 Starting Quizlet auto-sync from $serverUrl...");
      
      final client = HttpClient();
      client.connectionTimeout = const Duration(seconds: 5);
      
      Uri uri = Uri.parse(serverUrl);
      HttpClientRequest request = await client.getUrl(uri);
      HttpClientResponse response = await request.close();

      if (response.statusCode != 200) {
        debugPrint("⚠️ Primary sync URL failed with status ${response.statusCode}, trying fallback...");
        uri = Uri.parse(fallbackUrl);
        request = await client.getUrl(uri);
        response = await request.close();
      }

      if (response.statusCode == 200) {
        final String body = await response.transform(utf8.decoder).join();
        final Map<String, dynamic> jsonMap = jsonDecode(body);

        if (jsonMap.containsKey('subjects') && jsonMap['subjects'] is List) {
          await _processServerSubjects(jsonMap['subjects'] as List);
          debugPrint("✅ Auto-sync completed successfully!");
          return true;
        }
      }
    } catch (e) {
      debugPrint("❌ Auto-sync error (operating in offline mode): $e");
    }
    return false;
  }

  static Future<void> _processServerSubjects(List subjectsList) async {
    final store = ObjectBoxService.instance.store;
    final subjectBox = store.box<Subject>();
    final quizBox = store.box<Quiz>();
    final questionBox = store.box<Question>();
    final answerBox = store.box<Answer>();

    for (var s in subjectsList) {
      if (s is! Map<String, dynamic>) continue;

      String code = s['code'] ?? 'GENERAL';
      String name = s['name'] ?? 'Môn Học';

      // Check if subject exists by code or name
      Subject? subject;
      final existingSubjects = subjectBox.getAll();
      for (var existing in existingSubjects) {
        if (existing.code == code || existing.name == name) {
          subject = existing;
          break;
        }
      }

      if (subject == null) {
        subject = Subject(code: code, name: name);
        subjectBox.put(subject);
      }

      if (s['quizzes'] is List) {
        for (var q in s['quizzes']) {
          if (q is! Map<String, dynamic>) continue;
          String title = q['title'] ?? q['name'] ?? 'Bộ đề';

          Quiz? quiz;
          for (var existingQ in subject.quizzes) {
            if (existingQ.name == title) {
              quiz = existingQ;
              break;
            }
          }

          if (quiz == null) {
            quiz = Quiz(name: title);
            quiz.subject.target = subject;
            quizBox.put(quiz);
            subject.quizzes.add(quiz);
            subjectBox.put(subject);
          }

          if (q['questions'] is List) {
            for (var quest in q['questions']) {
              if (quest is! Map<String, dynamic>) continue;
              String content = quest['content'] ?? '';
              String explanation = quest['explanation'] ?? '';

              Question? question;
              for (var existingQuest in quiz.questions) {
                if (existingQuest.content == content) {
                  question = existingQuest;
                  break;
                }
              }

              if (question == null) {
                question = Question(content: content, explanation: explanation);
                question.quiz.target = quiz;
                questionBox.put(question);
                quiz.questions.add(question);
                quizBox.put(quiz);
              }

              if (quest['answers'] is List) {
                for (var ans in quest['answers']) {
                  if (ans is! Map<String, dynamic>) continue;
                  String ansContent = ans['content'] ?? '';
                  bool isCorrect = ans['isCorrect'] ?? false;

                  bool ansExists = false;
                  for (var existingAns in question.answers) {
                    if (existingAns.content == ansContent) {
                      ansExists = true;
                      break;
                    }
                  }

                  if (!ansExists) {
                    final answer = Answer(content: ansContent, isCorrect: isCorrect);
                    answer.question.target = question;
                    answerBox.put(answer);
                    question.answers.add(answer);
                    questionBox.put(question);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
