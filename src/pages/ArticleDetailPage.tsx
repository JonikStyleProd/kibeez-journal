import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Bookmark, 
  Share2, 
  ArrowLeft, 
  Heart, 
  Check, 
  Layers, 
  Tag, 
  ChevronLeft,
  ChevronRight,
  Activity,
  Type,
  Sun,
  Moon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { getArticleBySlug, ARTICLES } from '../data/articles';
import { Article, ArticleContentBlock } from '../types';
import { AudioReaderPlayer } from '../components/articles/AudioReaderPlayer';
import { ArticleComments } from '../components/articles/ArticleComments';
import { ArticleCard } from '../components/articles/ArticleCard';
import { TacticalLensModal } from '../components/articles/TacticalLensModal';

export const ArticleDetailPage: React.FC = () => {
  const { 
    pageParam, 
    navigateTo, 
    isBookmarked, 
    toggleBookmark, 
    clapsMap, 
    addClap, 
    showToast,
    fontSize,
    setFontSize,
    theme,
    toggleTheme
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isTacticalLensOpen, setIsTacticalLensOpen] = useState(false);

  const article: Article = getArticleBySlug(pageParam || '') || ARTICLES[0];
  const bookmarked = isBookmarked(article.slug);
  const currentClaps = (article.clapsCount || 0) + (clapsMap[article.id] || 0);

  const isTacticalArticle = article.tags.some(t => 
    ['Tactics', 'Positional Play', 'Half-Spaces', 'High-Press', 'Midfield Engine'].includes(t)
  ) || article.categoryId === 'cat-1';

  // Find index for next/prev
  const currentIndex = ARTICLES.findIndex((a: Article) => a.id === article.id);
  const prevArticle: Article | null = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const nextArticle: Article | null = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  // Related articles (same category or general)
  const relatedArticles: Article[] = ARTICLES.filter(
    (a: Article) => a.id !== article.id && (a.categoryId === article.categoryId || a.tags.some((t: string) => article.tags.includes(t)))
  ).slice(0, 3);

  // Scroll listener for reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(Math.round(progress));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Article link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: url,
        });
        showToast('Shared successfully', 'success');
      } catch {
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const handleClapClick = () => {
    addClap(article.id);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#3b82f6', '#10b981', '#f59e0b']
    });
    showToast('Thank you for applauding this piece!', 'success');
  };

  const fontClass = fontSize === 'large' ? 'text-lg leading-relaxed' : fontSize === 'xlarge' ? 'text-xl leading-loose' : 'text-base leading-relaxed';

  return (
    <div className="pb-24 relative">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-16 left-0 right-0 z-30 h-1 bg-[var(--bg-subtle)]">
        <div 
          className="h-full bg-blue-600 transition-all duration-150 ease-out" 
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Top Breadcrumb Nav */}
      <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] py-3">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6">
          <button
            onClick={() => navigateTo('articles')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Stories</span>
          </button>
          <div className="flex items-center gap-2">
            <span
              onClick={() => navigateTo('category-detail', article.categorySlug)}
              className="cursor-pointer text-xs font-bold uppercase tracking-wider text-blue-500 hover:underline"
            >
              {article.categoryName}
            </span>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        {/* Header Metadata */}
        <header className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              onClick={() => navigateTo('category-detail', article.categorySlug)}
              className="rounded-full bg-blue-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm cursor-pointer hover:bg-blue-500 transition-colors"
            >
              {article.categoryName}
            </span>
            <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
              <Clock className="h-3.5 w-3.5 text-[var(--text-muted)]" /> {article.readTimeMinutes} min read
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-xs text-[var(--text-muted)]">{article.publishedAt}</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl leading-tight font-sans">
            {article.title}
          </h1>

          <p className="text-lg text-[var(--text-secondary)] font-medium leading-relaxed border-l-2 border-blue-500 pl-4 py-1">
            {article.excerpt}
          </p>

          {/* Author & Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-[var(--border-subtle)] py-4">
            {/* Author */}
            <div
              onClick={() => navigateTo('author-detail', article.authorId)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <img
                src={article.authorAvatar}
                alt={article.authorName}
                className="h-12 w-12 rounded-full object-cover border-2 border-[var(--border-strong)] group-hover:scale-105 transition-transform"
              />
              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-blue-500 transition-colors">
                  {article.authorName}
                </h4>
                <p className="text-xs text-[var(--text-secondary)]">{article.authorRole}</p>
              </div>
            </div>

            {/* Interaction Controls */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              {/* Tactical Lens Button (if tactical) */}
              {isTacticalArticle && (
                <button
                  onClick={() => setIsTacticalLensOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
                  title="Inspect tactical formation lens"
                >
                  <Activity className="h-4 w-4" />
                  <span className="hidden sm:inline">Tactical Lens</span>
                </button>
              )}

              {/* Font Size Adjuster */}
              <div className="flex items-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-1 text-xs">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-1 rounded font-bold transition-colors cursor-pointer ${
                    fontSize === 'normal' ? 'bg-blue-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                  title="Standard text size"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-1 rounded font-bold transition-colors cursor-pointer ${
                    fontSize === 'large' ? 'bg-blue-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                  title="Large text size"
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2 py-1 rounded font-bold transition-colors cursor-pointer ${
                    fontSize === 'xlarge' ? 'bg-blue-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                  title="Extra large text size"
                >
                  A++
                </button>
              </div>

              {/* Bookmark */}
              <button
                onClick={() => toggleBookmark(article.slug)}
                id="article-detail-bookmark-btn"
                className={`flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] transition-all cursor-pointer ${
                  bookmarked
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)]'
                }`}
                title={bookmarked ? 'Remove bookmark' : 'Bookmark story'}
              >
                <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                id="article-detail-share-btn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                title="Share article"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </header>

        {/* Audible Text-To-Speech Narration Player */}
        <div className="mt-8">
          <AudioReaderPlayer article={article} />
        </div>

        {/* Hero Cover Image with Caption */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xl shadow-[var(--shadow-color)]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full max-h-[500px] object-cover"
          />
          {article.coverCaption && (
            <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 text-center text-xs text-[var(--text-muted)]">
              {article.coverCaption}
            </div>
          )}
        </div>

        {/* Article Body Content */}
        <div className={`mt-10 space-y-6 text-[var(--text-secondary)] ${fontClass}`}>
          {article.body.map((block: ArticleContentBlock, idx: number) => {
            if (block.type === 'p') {
              return (
                <p key={idx} className="leading-relaxed">
                  {block.content}
                </p>
              );
            }

            if (block.type === 'h2') {
              return (
                <h2 key={idx} className="pt-6 text-2xl font-bold tracking-tight text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
                  {block.content}
                </h2>
              );
            }

            if (block.type === 'quote') {
              return (
                <blockquote
                  key={idx}
                  className="my-8 rounded-2xl border-l-4 border-blue-500 bg-[var(--bg-elevated)] p-6 italic shadow-md"
                >
                  <p className="text-xl font-serif text-[var(--text-primary)] leading-snug">
                    "{block.content}"
                  </p>
                  {block.authorQuote && (
                    <footer className="mt-3 text-xs font-semibold not-italic text-blue-500">
                      — {block.authorQuote}
                    </footer>
                  )}
                </blockquote>
              );
            }

            if (block.type === 'tactical-breakdown') {
              return (
                <div
                  key={idx}
                  className="my-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6 shadow-xl shadow-[var(--shadow-color)]"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider">
                      <Layers className="h-4 w-4" />
                      <span>{block.content}</span>
                    </div>
                    {isTacticalArticle && (
                      <button
                        onClick={() => setIsTacticalLensOpen(true)}
                        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <Activity className="h-3.5 w-3.5" />
                        <span>Open 3D Pitch View</span>
                      </button>
                    )}
                  </div>
                  <ul className="space-y-2.5">
                    {block.tacticalPoints?.map((pt: string, pIdx: number) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }

            if (block.type === 'stat-box') {
              return (
                <div
                  key={idx}
                  className="my-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-xl shadow-[var(--shadow-color)]"
                >
                  <h4 className="text-sm font-bold uppercase tracking-wider text-blue-500 mb-4">
                    {block.content}
                  </h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {block.stats?.map((stat: { label: string; value: string; detail?: string }, sIdx: number) => (
                      <div key={sIdx} className="rounded-xl bg-[var(--bg-elevated)] p-4 border border-[var(--border-subtle)]">
                        <div className="text-2xl font-black text-[var(--text-primary)]">{stat.value}</div>
                        <div className="text-xs font-semibold text-[var(--text-secondary)] mt-0.5">{stat.label}</div>
                        <div className="text-[11px] text-[var(--text-muted)] mt-1">{stat.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Tags */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-[var(--border-subtle)] pt-6">
          <Tag className="h-4 w-4 text-[var(--text-muted)]" />
          <span className="text-xs font-semibold text-[var(--text-muted)]">Filed under:</span>
          {article.tags.map((t: string) => (
            <span
              key={t}
              onClick={() => navigateTo('articles')}
              className="cursor-pointer rounded-lg bg-[var(--bg-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)] hover:bg-blue-600 hover:text-white transition-colors"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* Claps & Applaud Floating Bar */}
        <div className="mt-10 flex items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-xl shadow-[var(--shadow-color)]">
          <div className="flex items-center gap-4">
            <button
              onClick={handleClapClick}
              id="clap-reaction-btn"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Heart className="h-4 w-4 fill-current text-rose-300" />
              <span>Applaud Story ({currentClaps})</span>
            </button>
            <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
              Give kudos if this tactical insight deepened your understanding.
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2.5 text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5 text-blue-500" />
            <span>Share</span>
          </button>
        </div>

        {/* Author Bio Box */}
        <div className="mt-12 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={article.authorAvatar}
              alt={article.authorName}
              className="h-16 w-16 rounded-2xl object-cover border-2 border-[var(--border-strong)] shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-[var(--text-primary)]">{article.authorName}</h4>
                  <p className="text-xs text-blue-500 font-medium">{article.authorRole}</p>
                </div>
                <button
                  onClick={() => navigateTo('author-detail', article.authorId)}
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                >
                  View Profile
                </button>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Contributing columnist covering European tactics, strategic recruitment, and the modern philosophy of the game.
              </p>
            </div>
          </div>
        </div>

        {/* Prev / Next Article Navigation */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {prevArticle ? (
            <div
              onClick={() => navigateTo('article-detail', prevArticle.slug)}
              className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 hover:border-blue-500/40 transition-all"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-muted)]">
                <ChevronLeft className="h-4 w-4" />
                <span>Previous Story</span>
              </div>
              <h5 className="mt-2 text-sm font-semibold text-[var(--text-primary)] group-hover:text-blue-500 transition-colors line-clamp-2">
                {prevArticle.title}
              </h5>
            </div>
          ) : <div />}

          {nextArticle && (
            <div
              onClick={() => navigateTo('article-detail', nextArticle.slug)}
              className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 hover:border-blue-500/40 transition-all text-right"
            >
              <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-[var(--text-muted)]">
                <span>Next Story</span>
                <ChevronRight className="h-4 w-4" />
              </div>
              <h5 className="mt-2 text-sm font-semibold text-[var(--text-primary)] group-hover:text-blue-500 transition-colors line-clamp-2">
                {nextArticle.title}
              </h5>
            </div>
          )}
        </div>

        {/* Discussion & Comments Area */}
        <ArticleComments articleId={article.id} />

        {/* Related Articles Strip */}
        <section className="mt-16 border-t border-[var(--border-subtle)] pt-10">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-[var(--text-primary)]">Recommended Reading</h3>
            <button
              onClick={() => navigateTo('articles')}
              className="text-xs font-semibold text-blue-500 hover:underline cursor-pointer"
            >
              More in archive →
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedArticles.map((rel: Article) => (
              <ArticleCard key={rel.id} article={rel} variant="grid" />
            ))}
          </div>
        </section>
      </article>

      {/* Floating Reader Experience Bottom Bar */}
      <aside aria-label="Reading Controls" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 backdrop-blur-lg px-4 py-2.5 shadow-2xl shadow-[var(--shadow-color)]">
        {/* Progress indicator */}
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--text-muted)] pr-2 border-r border-[var(--border-subtle)]">
          <span>{readingProgress}%</span>
        </div>

        {/* Font scale toggle */}
        <div className="flex items-center gap-1 pr-2 border-r border-[var(--border-subtle)]">
          <Type className="h-3.5 w-3.5 text-[var(--text-muted)]" />
          <button
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : fontSize === 'large' ? 'xlarge' : 'normal')}
            className="rounded-lg bg-[var(--bg-subtle)] px-2 py-1 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            title="Cycle text size"
          >
            {fontSize === 'normal' ? '1x' : fontSize === 'large' ? '1.25x' : '1.5x'}
          </button>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-xl p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer"
          title="Toggle light/dark theme"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-blue-500" />}
        </button>

        {/* Bookmark toggle */}
        <button
          onClick={() => toggleBookmark(article.slug)}
          className={`rounded-xl p-1.5 transition-colors cursor-pointer ${
            bookmarked
              ? 'text-blue-500 bg-blue-500/10'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
          }`}
          title={bookmarked ? 'Bookmarked' : 'Save to queue'}
        >
          <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Tactical Lens Trigger if relevant */}
        {isTacticalArticle && (
          <button
            onClick={() => setIsTacticalLensOpen(true)}
            className="flex items-center gap-1 rounded-xl bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors cursor-pointer"
            title="Open 3D tactical lens"
          >
            <Activity className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Tactics</span>
          </button>
        )}
      </aside>

      {/* Contextual Tactical Lens Modal */}
      <TacticalLensModal
        isOpen={isTacticalLensOpen}
        onClose={() => setIsTacticalLensOpen(false)}
        articleTitle={article.title}
      />
    </div>
  );
};
