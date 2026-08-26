import React, { useState } from 'react';
import { 
  Search, 
  Grid, 
  List, 
  X, 
  ArrowUpDown 
} from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { CATEGORIES } from '../data/categories';
import { Article } from '../types';
import { ArticleCard } from '../components/articles/ArticleCard';

export const ArticlesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'picks'>('latest');
  const [readTimeFilter, setReadTimeFilter] = useState<'all' | 'quick' | 'deep'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'horizontal'>('grid');

  const filteredArticles = ARTICLES.filter((art: Article) => {
    // Search query filter
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchExcerpt = art.excerpt.toLowerCase().includes(q);
      const matchCategory = art.categoryName.toLowerCase().includes(q);
      const matchAuthor = art.authorName.toLowerCase().includes(q);
      const matchTag = art.tags.some((t: string) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchExcerpt && !matchCategory && !matchAuthor && !matchTag) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory !== 'all' && art.categorySlug !== selectedCategory) {
      return false;
    }

    // Read time filter
    if (readTimeFilter === 'quick' && art.readTimeMinutes > 5) return false;
    if (readTimeFilter === 'deep' && art.readTimeMinutes <= 5) return false;

    return true;
  }).sort((a: Article, b: Article) => {
    if (sortBy === 'popular') {
      return b.clapsCount - a.clapsCount;
    }
    if (sortBy === 'picks') {
      return (b.editorsPick ? 1 : 0) - (a.editorsPick ? 1 : 0);
    }
    // Default latest (by id or order)
    return b.id.localeCompare(a.id);
  });

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('latest');
    setReadTimeFilter('all');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || sortBy !== 'latest' || readTimeFilter !== 'all';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-[var(--border-subtle)] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-500">The Full Archive</span>
        <h1 className="mt-1 text-3xl font-extrabold text-[var(--text-primary)] sm:text-4xl">
          Explore Articles & Dossiers
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-2xl">
          Search across tactical breakdowns, transfer investigations, player profiles, and cultural essays from our independent European football masthead.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="space-y-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-lg shadow-[var(--shadow-color)]">
        {/* Top search & views row */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by topic, team, tactician, or player..."
              className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] pl-10 pr-9 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-blue-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-3.5 w-3.5 text-[var(--text-muted)]" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2 text-xs font-semibold text-[var(--text-primary)] focus:border-blue-500 focus:outline-none cursor-pointer"
              >
                <option value="latest">Latest Dispatches</option>
                <option value="popular">Most Popular</option>
                <option value="picks">Editor's Picks</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="Grid view"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('horizontal')}
                className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                  viewMode === 'horizontal' ? 'bg-blue-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="Editorial list view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills & Read Time Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--border-subtle)]">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)]'
            }`}
          >
            All Categories ({ARTICLES.length})
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.slug
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}

          {/* Quick read filters */}
          <div className="ml-auto hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => setReadTimeFilter('all')}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer ${
                readTimeFilter === 'all' ? 'bg-[var(--bg-subtle-hover)] text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Any Length
            </button>
            <button
              onClick={() => setReadTimeFilter('quick')}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer ${
                readTimeFilter === 'quick' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 font-semibold' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Quick Reads (&lt;5m)
            </button>
            <button
              onClick={() => setReadTimeFilter('deep')}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer ${
                readTimeFilter === 'deep' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30 font-semibold' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Deep Dives (6m+)
            </button>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 text-xs text-[var(--text-muted)]">
            <span>
              Showing <strong className="text-[var(--text-primary)]">{filteredArticles.length}</strong> stories
            </span>
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 font-semibold text-rose-500 hover:underline cursor-pointer"
            >
              <X className="h-3 w-3" /> Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Results Rendering */}
      {filteredArticles.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
              : 'space-y-4'
          }
        >
          {filteredArticles.map((art: Article) => (
            <ArticleCard key={art.id} article={art} variant={viewMode === 'grid' ? 'grid' : 'horizontal'} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-12 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--bg-subtle)] text-[var(--text-muted)]">
            <Search className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-[var(--text-primary)]">No articles matched your criteria</h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
            Try adjusting your search query or reset category filters to browse our full archive.
          </p>
          <button
            onClick={clearAllFilters}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-500 transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
