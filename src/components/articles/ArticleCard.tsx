import React from 'react';
import { Clock, Bookmark, Heart, ArrowUpRight, MessageSquare, CheckCircle2, Volume2 } from 'lucide-react';
import { Article } from '../../types';
import { useApp } from '../../context/AppContext';

interface ArticleCardProps {
  article: Article;
  variant?: 'grid' | 'horizontal' | 'compact' | 'featured';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'grid' }) => {
  const { 
    navigateTo, 
    isBookmarked, 
    toggleBookmark, 
    likedArticles, 
    toggleLikeArticle,
    getAudioRecord,
    isArticleListened
  } = useApp();

  const bookmarked = isBookmarked(article.slug);
  const isLiked = !!likedArticles[article.id];
  const isListened = isArticleListened(article.id);
  const audioRecord = getAudioRecord(article.id);

  const handleOpen = () => {
    navigateTo('article-detail', article.slug);
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigateTo('category-detail', article.categorySlug);
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigateTo('author-detail', article.authorId);
  };

  if (variant === 'featured') {
    return (
      <article
        onClick={handleOpen}
        className="group relative cursor-pointer overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xl transition-all duration-300 hover:border-blue-500/40 hover:shadow-blue-500/10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="relative lg:col-span-7 h-72 sm:h-96 lg:h-full min-h-[320px] overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-black/80" />
            <div className="absolute top-4 left-4">
              <span
                onClick={handleCategoryClick}
                className="inline-flex items-center rounded-full bg-blue-600/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md hover:bg-blue-500 transition-colors"
              >
                {article.categoryName}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-10">
            <div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <span>Featured Deep Dive</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {article.readTimeMinutes} min read
                </span>
                {isListened && (
                  <>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="h-3 w-3" /> Listened
                    </span>
                  </>
                )}
                {!isListened && audioRecord && audioRecord.progress > 0 && (
                  <>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      <Volume2 className="h-3 w-3" /> {audioRecord.progress}%
                    </span>
                  </>
                )}
              </div>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-blue-500 transition-colors sm:text-3xl lg:text-3xl leading-snug">
                {article.title}
              </h2>

              <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 sm:line-clamp-4">
                {article.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <div
                onClick={handleAuthorClick}
                className="flex items-center gap-3 group/author"
              >
                <img
                  src={article.authorAvatar}
                  alt={article.authorName}
                  className="h-10 w-10 rounded-full object-cover border border-[var(--border-strong)]"
                />
                <div>
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] group-hover/author:text-blue-500 transition-colors">
                    {article.authorName}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)]">{article.publishedAt}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleBookmark(article.slug);
                  }}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] transition-all ${
                    bookmarked
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)]'
                  }`}
                  title={bookmarked ? 'Remove bookmark' : 'Bookmark story'}
                >
                  <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article
        onClick={handleOpen}
        className="group relative flex flex-col sm:flex-row cursor-pointer gap-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 transition-all duration-300 hover:border-blue-500/40 hover:bg-[var(--bg-elevated)] shadow-md"
      >
        <div className="relative h-44 sm:h-36 sm:w-52 shrink-0 overflow-hidden rounded-xl">
          <img
            src={article.coverImage}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2.5 left-2.5">
            <span
              onClick={handleCategoryClick}
              className="rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-xs"
            >
              {article.categoryName}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--text-muted)]">
              <span className="font-semibold text-[var(--text-secondary)]">{article.authorName}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {article.readTimeMinutes}m
              </span>
              {isListened && (
                <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-1 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="h-2.5 w-2.5" /> Listened
                </span>
              )}
            </div>

            <h3 className="mt-1.5 text-base font-bold text-[var(--text-primary)] group-hover:text-blue-500 transition-colors line-clamp-2">
              {article.title}
            </h3>

            <p className="mt-1.5 text-xs text-[var(--text-secondary)] line-clamp-2">{article.excerpt}</p>
          </div>

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
            <span className="text-[11px] text-[var(--text-muted)]">{article.publishedAt}</span>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" /> {article.commentsCount}
              </span>
              <button
                onClick={e => {
                  e.stopPropagation();
                  toggleBookmark(article.slug);
                }}
                className={`p-1 hover:text-[var(--text-primary)] transition-colors ${bookmarked ? 'text-blue-500' : 'text-[var(--text-muted)]'}`}
              >
                <Bookmark className={`h-3.5 w-3.5 ${bookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Default Grid layout
  return (
    <article
      onClick={handleOpen}
      className="group flex flex-col cursor-pointer overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-lg shadow-[var(--shadow-color)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <img
          src={article.coverImage}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            onClick={handleCategoryClick}
            className="rounded-lg bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md hover:bg-blue-600 transition-colors border border-white/10"
          >
            {article.categoryName}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <button
            onClick={e => {
              e.stopPropagation();
              toggleBookmark(article.slug);
            }}
            className={`flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md transition-all ${
              bookmarked
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-black/50 text-white/80 hover:bg-black/80 hover:text-white'
            }`}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark story'}
          >
            <Bookmark className={`h-3.5 w-3.5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1 font-medium">
              <Clock className="h-3.5 w-3.5 text-blue-500" /> {article.readTimeMinutes} min read
            </span>
            <span>•</span>
            <span>{article.publishedAt}</span>
            {isListened && (
              <>
                <span>•</span>
                <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="h-2.5 w-2.5" /> Listened
                </span>
              </>
            )}
            {!isListened && audioRecord && audioRecord.progress > 0 && (
              <>
                <span>•</span>
                <span className="inline-flex items-center gap-1 rounded bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <Volume2 className="h-2.5 w-2.5" /> {audioRecord.progress}%
                </span>
              </>
            )}
          </div>

          <h3 className="mt-2.5 text-lg font-bold text-[var(--text-primary)] group-hover:text-blue-500 transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>

          <p className="mt-2 text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
          <div
            onClick={handleAuthorClick}
            className="flex items-center gap-2.5 group/author"
          >
            <img
              src={article.authorAvatar}
              alt={article.authorName}
              className="h-7 w-7 rounded-full object-cover border border-[var(--border-strong)]"
            />
            <span className="text-xs font-semibold text-[var(--text-secondary)] group-hover/author:text-blue-500 transition-colors">
              {article.authorName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={e => {
                e.stopPropagation();
                toggleLikeArticle(article.id);
              }}
              className={`flex items-center gap-1 text-xs transition-colors ${
                isLiked ? 'text-rose-500 font-semibold' : 'text-[var(--text-muted)] hover:text-rose-500'
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--bg-subtle)] text-[var(--text-secondary)] group-hover:bg-blue-600 group-hover:text-white transition-all">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
