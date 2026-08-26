import React from 'react';
import { Layers, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, getCategoryBySlug } from '../data/categories';
import { getArticlesByCategory } from '../data/articles';
import { Category, Article } from '../types';
import { ArticleCard } from '../components/articles/ArticleCard';

export const CategoryPage: React.FC = () => {
  const { pageParam, navigateTo } = useApp();

  const currentCategory: Category = getCategoryBySlug(pageParam || '') || CATEGORIES[0];
  const categoryArticles: Article[] = getArticlesByCategory(currentCategory.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Back Button */}
      <button
        onClick={() => navigateTo('articles')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to All Articles</span>
      </button>

      {/* Category Header Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 sm:p-12 shadow-xl shadow-[var(--shadow-color)]">
        <div
          className="absolute top-0 right-0 h-64 w-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: currentCategory.color }}
        />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider"
            style={{ backgroundColor: currentCategory.accentBg, color: currentCategory.color }}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Category Hub</span>
          </div>

          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
            {currentCategory.name}
          </h1>

          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            {currentCategory.description}
          </p>

          <div className="flex items-center gap-4 pt-2 text-xs text-[var(--text-muted)]">
            <span><strong className="text-[var(--text-primary)]">{categoryArticles.length}</strong> in-depth articles</span>
            <span>•</span>
            <span>Curated by the Kibeez European desk</span>
          </div>
        </div>
      </div>

      {/* Categories quick pill switch */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border-subtle)] pb-4">
        {CATEGORIES.map((cat: Category) => (
          <button
            key={cat.id}
            onClick={() => navigateTo('category-detail', cat.slug)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              currentCategory.slug === cat.slug
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Category Articles */}
      <div>
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
          Latest Stories in {currentCategory.name}
        </h2>

        {categoryArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categoryArticles.map((art: Article) => (
              <ArticleCard key={art.id} article={art} variant="grid" />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--border-subtle)] p-12 text-center text-[var(--text-muted)]">
            <p>More stories in this beat are currently being written by our columnists.</p>
          </div>
        )}
      </div>
    </div>
  );
};
