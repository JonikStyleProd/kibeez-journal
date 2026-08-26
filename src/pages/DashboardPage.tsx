import React from 'react';
import { 
  Bookmark, 
  Heart, 
  Clock, 
  Sliders, 
  Sun, 
  Moon, 
  BookOpen,
  Volume2,
  CheckCircle2,
  Play,
  Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ARTICLES } from '../data/articles';
import { Article } from '../types';
import { ArticleCard } from '../components/articles/ArticleCard';

export const DashboardPage: React.FC = () => {
  const { 
    bookmarks, 
    likedArticles, 
    navigateTo, 
    theme, 
    toggleTheme,
    fontSize,
    setFontSize,
    audioHistory,
    clearAudioProgress
  } = useApp();

  const savedArticles: Article[] = ARTICLES.filter((a: Article) => bookmarks.includes(a.slug));
  const favoriteArticles: Article[] = ARTICLES.filter((a: Article) => likedArticles[a.id]);
  const audioHistoryEntries = Object.values(audioHistory).sort((a, b) => b.lastListenedAt - a.lastListenedAt);

  const totalReadingMinutes: number = savedArticles.reduce((acc: number, curr: Article) => acc + curr.readTimeMinutes, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Personal Hub</span>
        <h1 className="mt-1 text-3xl font-extrabold text-[var(--text-primary)] sm:text-4xl">
          Reader Studio & Library
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-2xl">
          Manage your saved offline reading queue, favorited tactical breakdowns, and custom visual preferences.
        </p>
      </div>

      {/* Reader Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-lg shadow-[var(--shadow-color)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Saved Articles</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              <Bookmark className="h-4 w-4 fill-current" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-[var(--text-primary)]">{savedArticles.length}</div>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Stored in your local browser cache</p>
        </div>

        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-lg shadow-[var(--shadow-color)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Reading Backlog</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-emerald-600 dark:text-emerald-400">{totalReadingMinutes}m</div>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Total estimated reading time</p>
        </div>

        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-lg shadow-[var(--shadow-color)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Liked Dispatches</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
              <Heart className="h-4 w-4 fill-current" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-rose-500">{favoriteArticles.length}</div>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Tactical pieces you commended</p>
        </div>
      </div>

      {/* Reader Settings Box */}
      <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-xl shadow-[var(--shadow-color)]">
        <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2 mb-6">
          <Sliders className="h-5 w-5 text-blue-500" />
          <span>Reader Ergonomics & Preferences</span>
        </h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Theme setting */}
          <div className="flex items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
            <div>
              <div className="text-sm font-bold text-[var(--text-primary)]">Visual Atmosphere</div>
              <div className="text-xs text-[var(--text-muted)]">Toggle between Dark Obsidian & Light Editorial</div>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 rounded-xl bg-[var(--bg-subtle)] px-4 py-2 text-xs font-bold text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-blue-500 transition-all cursor-pointer"
            >
              {theme === 'dark' ? (
                <>
                  <Moon className="h-4 w-4 text-blue-400" />
                  <span>Dark Obsidian</span>
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4 text-amber-500" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>

          {/* Typography Scale */}
          <div className="flex items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
            <div>
              <div className="text-sm font-bold text-[var(--text-primary)]">Article Font Scale</div>
              <div className="text-xs text-[var(--text-muted)]">Adjust body text sizing for comfortable reading</div>
            </div>
            <div className="flex items-center rounded-xl bg-[var(--bg-subtle)] p-1 border border-[var(--border-subtle)]">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  fontSize === 'normal' ? 'bg-blue-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  fontSize === 'large' ? 'bg-blue-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                Large
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  fontSize === 'xlarge' ? 'bg-blue-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                XL
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Narration & Listening History */}
      {audioHistoryEntries.length > 0 && (
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-xl shadow-[var(--shadow-color)]">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20">
                <Volume2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">Audio Narration History</h3>
                <p className="text-xs text-[var(--text-muted)]">Track listening progress across your tactical dispatches</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[var(--text-muted)]">{audioHistoryEntries.length} tracked</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {audioHistoryEntries.map(entry => (
              <div
                key={entry.articleId}
                className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 hover:border-blue-500/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-1.5">
                    <span className="font-mono text-[10px]">Speed: {entry.speed || 1}x</span>
                    {entry.completed || entry.progress >= 90 ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" /> Listened
                      </span>
                    ) : (
                      <span className="text-blue-500 font-semibold text-[10px]">
                        {entry.progress}% completed
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] line-clamp-2">
                    {entry.articleTitle}
                  </h4>
                </div>

                <div className="mt-4">
                  {/* Progress bar */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-subtle)] mb-3">
                    <div
                      className={`h-full ${entry.completed || entry.progress >= 90 ? 'bg-emerald-500' : 'bg-blue-600'}`}
                      style={{ width: `${entry.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => navigateTo('article-detail', entry.articleSlug)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1 text-xs font-bold text-white hover:bg-blue-500 transition-colors cursor-pointer"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      <span>{entry.completed || entry.progress >= 90 ? 'Listen Again' : 'Continue'}</span>
                    </button>

                    <button
                      onClick={() => clearAudioProgress(entry.articleId)}
                      className="p-1 text-[var(--text-muted)] hover:text-rose-500 transition-colors cursor-pointer"
                      title="Clear from history"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved Bookmarks Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-blue-500 fill-current" />
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Saved Reading Queue</h2>
          </div>
          <span className="text-xs text-[var(--text-muted)]">{savedArticles.length} stories</span>
        </div>

        {savedArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedArticles.map((art: Article) => (
              <ArticleCard key={art.id} article={art} variant="grid" />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[var(--border-subtle)] p-12 text-center text-[var(--text-muted)]">
            <BookOpen className="mx-auto h-10 w-10 text-[var(--text-muted)] mb-3" />
            <h4 className="text-base font-semibold text-[var(--text-primary)]">No articles saved yet</h4>
            <p className="text-xs text-[var(--text-muted)] mt-1 max-w-sm mx-auto">
              Explore the archive and click the bookmark icon to create your personal offline reading queue.
            </p>
            <button
              onClick={() => navigateTo('articles')}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-500 transition-all cursor-pointer"
            >
              Discover Stories
            </button>
          </div>
        )}
      </div>

      {/* Liked Articles Section */}
      {favoriteArticles.length > 0 && (
        <div className="border-t border-[var(--border-subtle)] pt-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-500 fill-current" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Favorited Dispatches</h2>
            </div>
            <span className="text-xs text-[var(--text-muted)]">{favoriteArticles.length} stories</span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favoriteArticles.map((art: Article) => (
              <ArticleCard key={art.id} article={art} variant="grid" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
