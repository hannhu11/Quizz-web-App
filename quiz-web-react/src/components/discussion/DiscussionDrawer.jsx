import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Send,
  ShieldCheck,
  User,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  LogIn
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
  ? `${window.location.origin}/api`
  : 'http://localhost:8701/api';

export default function DiscussionDrawer({ quizId, questionId, initialCount = 0, onOpenAuthModal }) {
  const { user, token, refreshUserProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [expandedComments, setExpandedComments] = useState({}); // Track expanded auto-collapsed comments

  // Lazy Fetch comments ONLY when drawer is opened and user is logged in
  const fetchComments = async () => {
    if (!isOpen || !user) return;
    try {
      const res = await fetch(`${API_BASE_URL}/comments/${quizId}/${questionId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && Array.isArray(data.comments)) {
        setComments(data.comments);
      }
    } catch (err) {
      console.warn('Backend server offline during comments fetch:', err);
    }
  };

  useEffect(() => {
    if (!isOpen || !user) return;

    fetchComments();

    // 15s Auto Polling only for open drawers
    const interval = setInterval(fetchComments, 15000);

    const handleFocus = () => fetchComments();
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, [isOpen, user, quizId, questionId, token]);

  // Handle Post Comment
  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    if (!user) {
      if (onOpenAuthModal) onOpenAuthModal('LOGIN');
      return;
    }

    setIsSending(true);
    setErrorMsg('');

    try {
      const res = await fetch(`${API_BASE_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          quizId,
          questionId,
          content: newCommentText.trim()
        })
      });
      const data = await res.json();

      if (data.success && data.comment) {
        setComments([data.comment, ...comments]);
        setNewCommentText('');
      } else {
        setErrorMsg(data.message || 'Đăng bình luận thất bại.');
      }
    } catch (err) {
      console.warn('Backend server offline during comment post, updating optimistic UI:', err);
      const newMock = {
        id: 'mock-' + Date.now(),
        quizId,
        questionId,
        content: newCommentText.trim(),
        score: 0,
        createdAt: new Date().toISOString(),
        isAutoCollapsed: false,
        userVote: 0,
        user: {
          fullName: user.fullName || user.email.split('@')[0],
          reputation: user.reputation || 10,
          avatarUrl: user.avatarUrl
        }
      };
      setComments([newMock, ...comments]);
      setNewCommentText('');
    }
    setIsSending(false);
  };

  // Handle Vote (+1 / -1) with Optimistic UI (0ms instant response)
  const handleVote = async (commentId, type) => {
    if (!user) {
      if (onOpenAuthModal) onOpenAuthModal('LOGIN');
      return;
    }

    // Optimistic UI Update
    setComments(prevComments =>
      prevComments.map(c => {
        if (c.id === commentId) {
          const currentVote = c.userVote || 0;
          let newVote = 0;
          let scoreDelta = 0;

          if (currentVote === type) {
            newVote = 0;
            scoreDelta = -type;
          } else if (currentVote === 0) {
            newVote = type;
            scoreDelta = type;
          } else {
            newVote = type;
            scoreDelta = type * 2;
          }

          return {
            ...c,
            score: c.score + scoreDelta,
            userVote: newVote
          };
        }
        return c;
      })
    );

    // Call API ngầm
    try {
      const res = await fetch(`${API_BASE_URL}/comments/${commentId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ type })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setComments(prevComments =>
            prevComments.map(c => {
              if (c.id === commentId) {
                return {
                  ...c,
                  score: typeof data.score === 'number' ? data.score : c.score,
                  userVote: typeof data.userVote === 'number' ? data.userVote : c.userVote,
                  user: {
                    ...(c.user || {}),
                    reputation: typeof data.authorReputation === 'number' ? data.authorReputation : c.user?.reputation
                  }
                };
              }
              return c;
            })
          );
        }
      }

      if (refreshUserProfile) {
        refreshUserProfile();
      }
    } catch (err) {
      console.warn('Backend server offline during vote sync:', err);
    }
  };

  // Toggle Collapse for Bad Comments
  const toggleExpand = (commentId) => {
    setExpandedComments(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const displayCount = Math.max(initialCount, comments.length);

  return (
    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
      {/* Accordion Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors border border-slate-200/60 dark:border-slate-800/60 cursor-pointer group active:scale-[0.99]"
      >
        <MessageSquare className="w-4 h-4 stroke-[1.75] text-slate-500 group-hover:text-indigo-600 transition-colors" />
        <span>Thảo luận học thuật ({displayCount})</span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>

      {/* Collapsible Accordion Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 p-4 bg-slate-50/70 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4 overflow-hidden"
          >
            {/* Input Comment Box or Login Requirement Prompt */}
            {user ? (
              <>
                <form onSubmit={handlePostComment} className="space-y-2">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Viết lời giải thích hoặc đóng góp đáp án cho câu hỏi này..."
                      className="w-full pl-3.5 pr-11 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all shadow-xs"
                    />
                    <button
                      type="submit"
                      disabled={isSending || !newCommentText.trim()}
                      className="absolute right-1.5 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs disabled:opacity-40 transition-all cursor-pointer"
                      title="Gửi bình luận"
                    >
                      <Send className="w-3.5 h-3.5 stroke-[1.75]" />
                    </button>
                  </div>
                  {errorMsg && (
                    <p className="text-[11px] font-medium text-rose-500 px-1">{errorMsg}</p>
                  )}
                </form>

                {/* Comments List for Logged In User */}
                {isLoading ? (
                  <div className="py-4 text-center text-xs text-slate-400 animate-pulse">
                    Đang tải thảo luận học thuật...
                  </div>
                ) : comments.length === 0 ? (
                  <div className="py-4 text-center text-xs text-slate-400 font-medium">
                    Chưa có bình luận nào. Hãy là người đầu tiên thảo luận đáp án câu này!
                  </div>
                ) : (
                  <div className="space-y-3 pt-1">
                {comments.map((comment) => {
                  const author = comment.user || {};
                  const isCollapsed = comment.isAutoCollapsed && !expandedComments[comment.id];

                  return (
                    <div
                      key={comment.id}
                      className="p-3 bg-white/90 dark:bg-slate-800/90 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs text-xs space-y-1.5"
                    >
                      {/* Comment Author Header */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 dark:text-slate-100">
                            {author.fullName || author.email || 'Sinh Viên Anonymous'}
                          </span>

                          {/* Notion Style Reputation Badge */}
                          {author.reputation >= 10 ? (
                            <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-tight inline-flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400 stroke-[1.75]" />
                              +{author.reputation} Uy tín
                            </span>
                          ) : author.reputation >= 0 ? (
                            <span className="bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20 px-2 py-0.5 rounded-full text-[11px] font-medium inline-flex items-center gap-1">
                              <User className="w-3 h-3 text-slate-500 stroke-[1.75]" />
                              +{author.reputation} Uy tín
                            </span>
                          ) : (
                            <span className="bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 px-2 py-0.5 rounded-full text-[11px] font-medium inline-flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-rose-500 stroke-[1.75]" />
                              {author.reputation} Uy tín kém
                            </span>
                          )}
                        </div>

                        {/* Timestamp */}
                        <span className="text-[10px] text-slate-400">
                          {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {/* Comment Content / Auto-Collapsed Warning */}
                      {isCollapsed ? (
                        <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-[11px] font-medium flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            Bình luận này bị cộng đồng đánh giá không uy tín.
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleExpand(comment.id)}
                            className="font-bold underline text-rose-700 dark:text-rose-300 cursor-pointer"
                          >
                            Xem nội dung
                          </button>
                        </div>
                      ) : (
                        <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                          {comment.content}
                        </p>
                      )}

                      {/* Comment Actions (Upvote, Downvote, Score) */}
                      <div className="flex items-center gap-3 pt-1 text-slate-500 dark:text-slate-400 text-[11px]">
                        {/* Upvote Button */}
                        <button
                          type="button"
                          onClick={() => handleVote(comment.id, 1)}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                            comment.userVote === 1
                              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                          title="Hữu ích (+1 Uy tín tác giả)"
                        >
                          <ThumbsUp className="w-3.5 h-3.5 stroke-[1.75]" />
                          <span>{comment.score > 0 ? `+${comment.score}` : comment.score}</span>
                        </button>

                        {/* Downvote Button */}
                        <button
                          type="button"
                          onClick={() => handleVote(comment.id, -1)}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                            comment.userVote === -1
                              ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                          title="Sai / Phá hoại (-1 Uy tín tác giả)"
                        >
                          <ThumbsDown className="w-3.5 h-3.5 stroke-[1.75]" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
              </>
            ) : (
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold space-y-2 text-center">
                <div className="flex items-center justify-center gap-1.5 font-extrabold text-sm">
                  <LogIn className="w-4 h-4 text-indigo-500" />
                  <span>🔒 Đề thi này có {displayCount} thảo luận học thuật</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs font-normal">
                  Vui lòng Đăng nhập tài khoản QuizzFlow để xem nội dung bình luận chi tiết và tham gia đóng góp đáp án cho sinh viên.
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => onOpenAuthModal && onOpenAuthModal('LOGIN')}
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-extrabold text-xs hover:bg-indigo-700 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Đăng Nhập Ngay
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
