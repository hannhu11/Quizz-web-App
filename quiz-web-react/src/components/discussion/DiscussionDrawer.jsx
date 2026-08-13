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
  LogIn,
  X,
  CheckCircle2
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
  const [reportingCommentId, setReportingCommentId] = useState(null);
  const [reportReason, setReportReason] = useState('Nội dung sai lệch');
  const [reportSuccessMsg, setReportSuccessMsg] = useState('');
  const [isReporting, setIsReporting] = useState(false);

  // Lazy Fetch comments ONLY when drawer is opened and user is logged in
  const fetchComments = async () => {
    if (!isOpen || !user) return;
    try {
      const authToken = token || localStorage.getItem('quizzflow_token');
      const res = await fetch(`${API_BASE_URL}/comments/${quizId}/${questionId}`, {
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {}
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
    setIsLoading(true);
    fetchComments().finally(() => setIsLoading(false));
  }, [isOpen, user, quizId, questionId]);

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
      const authToken = token || localStorage.getItem('quizzflow_token');
      const res = await fetch(`${API_BASE_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
          quizId: String(quizId).trim(),
          questionId: String(questionId).trim(),
          content: newCommentText.trim()
        })
      });

      const data = await res.json();

      if (data.success && data.comment) {
        setComments(prev => [data.comment, ...prev]);
        setNewCommentText('');
        if (refreshUserProfile) {
          refreshUserProfile();
        }
      } else {
        setErrorMsg(data.message || 'Không thể đăng bình luận.');
      }
    } catch (err) {
      setErrorMsg('Lỗi kết nối máy chủ.');
    } finally {
      setIsSending(false);
    }
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
          let newLikeDelta = 0;
          let newDislikeDelta = 0;

          if (currentVote === type) {
            newVote = 0;
            if (type === 1) newLikeDelta = -1;
            if (type === -1) newDislikeDelta = -1;
          } else if (currentVote === 0) {
            newVote = type;
            if (type === 1) newLikeDelta = 1;
            if (type === -1) newDislikeDelta = 1;
          } else {
            newVote = type;
            if (type === 1) { newLikeDelta = 1; newDislikeDelta = -1; }
            if (type === -1) { newDislikeDelta = 1; newLikeDelta = -1; }
          }

          return {
            ...c,
            score: c.score + (type === 1 ? newLikeDelta : -newDislikeDelta),
            likeCount: Math.max(0, (c.likeCount || 0) + newLikeDelta),
            dislikeCount: Math.max(0, (c.dislikeCount || 0) + newDislikeDelta),
            userVote: newVote
          };
        }
        return c;
      })
    );

    // Call API
    try {
      const authToken = token || localStorage.getItem('quizzflow_token');
      const res = await fetch(`${API_BASE_URL}/comments/${commentId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ type })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const targetAuthorEmail = comments.find(c => c.id === commentId)?.user?.email;
          const targetAuthorId = data.authorId || comments.find(c => c.id === commentId)?.userId || comments.find(c => c.id === commentId)?.user?.id;

          setComments(prevComments =>
            prevComments.map(c => {
              const isSameAuthor = (targetAuthorId && (c.userId === targetAuthorId || c.user?.id === targetAuthorId)) ||
                                   (targetAuthorEmail && c.user?.email === targetAuthorEmail);

              const updatedUser = isSameAuthor && typeof data.authorReputation === 'number'
                ? { ...(c.user || {}), reputation: data.authorReputation }
                : c.user;

              if (c.id === commentId) {
                return {
                  ...c,
                  score: typeof data.score === 'number' ? data.score : c.score,
                  likeCount: typeof data.likeCount === 'number' ? data.likeCount : c.likeCount,
                  dislikeCount: typeof data.dislikeCount === 'number' ? data.dislikeCount : c.dislikeCount,
                  userVote: typeof data.userVote === 'number' ? data.userVote : c.userVote,
                  user: updatedUser
                };
              }

              return {
                ...c,
                user: updatedUser
              };
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

  // Handle Report Comment
  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportingCommentId) return;

    setIsReporting(true);
    try {
      const authToken = token || localStorage.getItem('quizzflow_token');
      const res = await fetch(`${API_BASE_URL}/comments/${reportingCommentId}/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ reason: reportReason })
      });
      const data = await res.json();
      if (data.success) {
        setReportSuccessMsg('Đã gửi báo cáo vi phạm đến ban quản trị!');
        setTimeout(() => {
          setReportingCommentId(null);
          setReportSuccessMsg('');
        }, 1500);
      } else {
        alert(data.message || 'Bạn đã báo cáo bình luận này trước đó.');
        setReportingCommentId(null);
      }
    } catch (err) {
      alert('Lỗi kết nối máy chủ khi gửi báo cáo.');
    } finally {
      setIsReporting(false);
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
        type="button"
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

                          {/* Comment Actions (Upvote, Downvote, Score, Report) */}
                          <div className="flex items-center gap-3 pt-1 text-slate-500 dark:text-slate-400 text-[11px]">
                            {/* Upvote Button */}
                            <button
                              type="button"
                              onClick={() => handleVote(comment.id, 1)}
                              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                                comment.userVote === 1
                                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold'
                                  : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                              }`}
                              title="Hữu ích (+1 Uy tín tác giả)"
                            >
                              <ThumbsUp className="w-3.5 h-3.5 stroke-[1.75]" />
                              <span>{comment.likeCount || 0}</span>
                            </button>

                            {/* Downvote Button */}
                            <button
                              type="button"
                              onClick={() => handleVote(comment.id, -1)}
                              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                                comment.userVote === -1
                                  ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold'
                                  : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                              }`}
                              title="Sai / Phá hoại (-1 Uy tín tác giả)"
                            >
                              <ThumbsDown className="w-3.5 h-3.5 stroke-[1.75]" />
                              <span>{comment.dislikeCount || 0}</span>
                            </button>

                            {/* Report Violation Button */}
                            <button
                              type="button"
                              onClick={() => setReportingCommentId(comment.id)}
                              className="flex items-center gap-1 px-2 py-0.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors ml-auto cursor-pointer"
                              title="Báo cáo vi phạm"
                            >
                              <Flag className="w-3 h-3 stroke-[1.75]" />
                              <span className="text-[10px] font-semibold">Báo cáo</span>
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
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    Đăng Nhập Ngay
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Reason Modal */}
      <AnimatePresence>
        {reportingCommentId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4"
            >
              <button
                type="button"
                onClick={() => setReportingCommentId(null)}
                className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-2">
                  <Flag className="w-5 h-5" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-100">Báo Cáo Vi Phạm</h4>
                <p className="text-xs text-slate-500">Giúp cộng đồng QuizzFlow duy trì môi trường học tập chuẩn mực.</p>
              </div>

              {reportSuccessMsg ? (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{reportSuccessMsg}</span>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Lý do báo cáo:</label>
                    <select
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-slate-100 outline-none"
                    >
                      <option value="Nội dung sai lệch">Đáp án sai lệch / Gây hiểu lầm</option>
                      <option value="Ngôn từ xúc phạm">Ngôn từ không phù hợp / Xúc phạm</option>
                      <option value="Spam hoặc quảng cáo">Spam hoặc nội dung quảng cáo</option>
                      <option value="Vi phạm bản quyền hoặc gian lận">Gian lận / Độc hại</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setReportingCommentId(null)}
                      className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={isReporting}
                      className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {isReporting ? 'Đang gửi...' : 'Gửi Báo Cáo'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
