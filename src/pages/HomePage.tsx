import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  TrendingUp, 
  Clock, 
  Compass, 
  Layers, 
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ARTICLES, getFeaturedArticle, getTrendingArticles } from '../data/articles';
import { CATEGORIES } from '../data/categories';
import { AUTHORS } from '../data/authors';
import { Article, Category, Author } from '../types';
import { HeroTacticalPitch3D } from '../components/hero/HeroTacticalPitch3D';
import { ArticleCard } from '../components/articles/ArticleCard';

export const HomePage: React.FC = () => {
  const { navigateTo } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'tactics' | 'transfers' | 'culture'>('all');

  const featured: Article = getFeaturedArticle();
  const trending: Article[] = getTrendingArticles();

  const filteredArticles = ARTICLES.filter((art: Article) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'tactics') return art.categorySlug === 'tactics';
    if (selectedFilter === 'transfers') return art.categorySlug === 'transfers';
    if (selectedFilter === 'culture') return art.categorySlug === 'culture' || art.categorySlug === 'la-liga';
    return true;
  });

  return (
    <div className="space-y-16 pb-12">
      {/* Breaking Dispatch Ticker */}
      <div className="border-b border-[var(--border-subtle)] bg-gradient-to-r from-blue-950/20 via-[var(--bg-elevated)] to-emerald-950/20 py-2.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 text-xs">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="flex items-center gap-1 rounded-md bg-rose-600 px-2 py-0.5 font-bold uppercase tracking-wider text-white shrink-0 animate-pulse text-[10px]">
              <Flame className="h-3 w-3" /> Live Beat
            </span>
            <p className="text-[var(--text-secondary)] truncate font-medium">
              Tactical dossier: How modern high-pressing rest-defense formations are forcing a tactical rethink across the Champions League.
            </p>
          </div>
          <button
            onClick={() => navigateTo('articles')}
            className="hidden sm:flex items-center gap-1 font-semibold text-blue-500 hover:text-blue-600 transition-colors shrink-0 ml-4 cursor-pointer"
          >
            <span>All Dispatches</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Hero Section: 3D Tactical Pitch & Featured Article */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left: Featured Editorial Headline */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-500 dark:text-blue-400">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
              <span>Cover Story & Deep Dive</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl leading-tight">
              Football as High Art, Tactical Science & Raw Emotion.
            </h1>

            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              Kibeez is an independent football publication exploring the geometries of modern systems, high-stakes boardroom transfer wars, and the timeless heritage of world football culture.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigateTo('article-detail', featured.slug)}
                id="hero-read-featured-btn"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/30 hover:bg-blue-500 transition-all active:scale-95 cursor-pointer"
              >
                <span>Read Featured Story</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigateTo('articles')}
                className="flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-5 py-3 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
              >
                <Compass className="h-4 w-4 text-blue-500" />
                <span>Explore All Articles</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 border-t border-[var(--border-subtle)] pt-6">
              <div>
                <div className="text-xl font-bold text-[var(--text-primary)]">8+</div>
                <div className="text-xs text-[var(--text-muted)]">Deep Dossiers</div>
              </div>
              <div>
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">100%</div>
                <div className="text-xs text-[var(--text-muted)]">Ad-Free Journal</div>
              </div>
              <div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">6</div>
                <div className="text-xs text-[var(--text-muted)]">European Beats</div>
              </div>
            </div>
          </div>

          {/* Right: 3D Tactical Pitch Component */}
          <div className="lg:col-span-6">
            <HeroTacticalPitch3D />
          </div>
        </div>
      </section>

      {/* Trending Stories Strip */}
      <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-surface)] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <TrendingUp className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Trending Dispatches</h2>
            </div>
            <button
              onClick={() => navigateTo('articles')}
              className="text-xs font-semibold text-blue-500 hover:underline cursor-pointer"
            >
              View all →
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {trending.slice(0, 3).map((art: Article, idx: number) => (
              <div
                key={art.id}
                onClick={() => navigateTo('article-detail', art.slug)}
                className="group relative flex cursor-pointer gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 transition-all duration-300 hover:border-amber-500/30 shadow-sm hover:shadow-md"
              >
                <div className="text-2xl font-black text-[var(--text-muted)] group-hover:text-amber-500 transition-colors">
                  0{idx + 1}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">
                    {art.categoryName}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)] group-hover:text-blue-500 transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
                    <span className="font-medium text-[var(--text-secondary)]">{art.authorName}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {art.readTimeMinutes}m
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Big Story Card */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Spotlight Review</span>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Editor’s Deep Dive</h2>
          </div>
        </div>
        <ArticleCard article={featured} variant="featured" />
      </section>

      {/* Latest Stories Grid with Filter Pills */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Curated Journal</span>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Latest Dispatches & Tactical Essays</h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-[var(--bg-subtle)] p-1 border border-[var(--border-subtle)]">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              All Topics
            </button>
            <button
              onClick={() => setSelectedFilter('tactics')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === 'tactics'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Tactics
            </button>
            <button
              onClick={() => setSelectedFilter('transfers')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === 'transfers'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Transfers
            </button>
            <button
              onClick={() => setSelectedFilter('culture')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === 'culture'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Culture
            </button>
          </div>
        </div>

        {/* Grid of Articles */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.slice(0, 6).map((art: Article) => (
            <ArticleCard key={art.id} article={art} variant="grid" />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigateTo('articles')}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-6 py-3 text-sm font-bold text-[var(--text-primary)] hover:border-blue-500 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
          >
            <span>View All Stories in Archive</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Editorial Voices & Masthead Section */}
      <section className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">The Masthead</span>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Voices of Football & Columnists</h2>
            </div>
            <button
              onClick={() => navigateTo('authors')}
              className="text-xs font-semibold text-blue-500 hover:underline cursor-pointer"
            >
              View all writers →
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AUTHORS.slice(0, 3).map((author: Author) => (
              <div
                key={author.id}
                onClick={() => navigateTo('author-detail', author.id)}
                className="group flex cursor-pointer items-start gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5 hover:border-blue-500/40 transition-all shadow-sm"
              >
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-14 w-14 rounded-2xl object-cover border-2 border-[var(--border-strong)] group-hover:scale-105 transition-transform"
                />
                <div>
                  <h4 className="text-base font-bold text-[var(--text-primary)] group-hover:text-blue-500 transition-colors">
                    {author.name}
                  </h4>
                  <p className="text-xs text-blue-500 font-medium">{author.role}</p>
                  <p className="mt-2 text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {author.bio}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-[11px] text-[var(--text-muted)]">
                    <span>{author.location}</span>
                    <span>•</span>
                    <span className="font-semibold text-[var(--text-secondary)]">{author.articlesCount} stories</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Explorer Hub */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Leagues & Beats</span>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Explore by Football Category</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat: Category) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('category-detail', cat.slug)}
              className="group flex flex-col cursor-pointer justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-[var(--bg-elevated)] shadow-sm"
            >
              <div>
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl font-bold"
                  style={{ backgroundColor: cat.accentBg, color: cat.color }}
                >
                  <Layers className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-blue-500 transition-colors">
                  {cat.name}
                </h4>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>{cat.articlesCount} stories</span>
                <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
