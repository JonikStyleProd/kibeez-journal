import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ArticleCommentsProps {
  articleId: string;
}

export const ArticleComments: React.FC<ArticleCommentsProps> = ({ articleId }) => {
  const { commentsMap, addComment, likeComment } = useApp();
  const [authorName, setAuthorName] = useState('');
  const [commentContent, setCommentContent] = useState('');

  const comments = commentsMap[articleId] || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    addComment(articleId, authorName, commentContent);
    setCommentContent('');
  };

  return (
    <section className="mt-14 border-t border-[var(--border-subtle)] pt-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
            <MessageSquare className="h-4 w-4" />
          </div>
          <h3 className="text-xl font-bold text-[var(--text-primary)]">
            Editorial Perspectives & Discussion ({comments.length})
          </h3>
        </div>
        <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
          <Shield className="h-3.5 w-3.5" /> Moderated Forum
        </span>
      </div>

      {/* Add comment box */}
      <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-lg shadow-[var(--shadow-color)]">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={authorName}
            onChange={e => setAuthorName(e.target.value)}
            placeholder="Your name or handle (optional)"
            className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-blue-500 focus:outline-none sm:w-64"
          />
        </div>
        <div className="mt-3">
          <textarea
            rows={3}
            value={commentContent}
            onChange={e => setCommentContent(e.target.value)}
            placeholder="Contribute your tactical perspective or reaction to this piece..."
            className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] text-[var(--text-muted)]">Constructive debates only. Keep it respectful.</span>
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-all active:scale-95 cursor-pointer"
          >
            <span>Post Perspective</span>
            <Send className="h-3 w-3" />
          </button>
        </div>
      </form>

      {/* Comments list */}
      <div className="mt-8 space-y-4">
        {comments.length > 0 ? (
          comments.map(comment => (
            <div
              key={comment.id}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4.5 transition-colors hover:border-blue-500/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={comment.authorAvatar}
                    alt={comment.authorName}
                    className="h-8 w-8 rounded-full object-cover border border-[var(--border-subtle)]"
                  />
                  <div>
                    <h5 className="text-sm font-semibold text-[var(--text-primary)]">{comment.authorName}</h5>
                    <span className="text-[11px] text-[var(--text-muted)]">{comment.timestamp}</span>
                  </div>
                </div>

                <button
                  onClick={() => likeComment(articleId, comment.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                    comment.userLiked
                      ? 'bg-blue-600/20 text-blue-500 border border-blue-500/30'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <ThumbsUp className={`h-3 w-3 ${comment.userLiked ? 'fill-current' : ''}`} />
                  <span>{comment.likes}</span>
                </button>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pl-11">
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--border-subtle)] p-8 text-center text-xs text-[var(--text-muted)]">
            Be the first to share a tactical observation on this article!
          </div>
        )}
      </div>
    </section>
  );
};
