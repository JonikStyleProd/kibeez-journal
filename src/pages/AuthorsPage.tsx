import React from 'react';
import { ArrowLeft, MapPin, BookOpen, ChevronRight, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AUTHORS, getAuthorById } from '../data/authors';
import { getArticlesByAuthor } from '../data/articles';
import { Author, Article } from '../types';
import { ArticleCard } from '../components/articles/ArticleCard';

export const AuthorsPage: React.FC = () => {
  const { pageParam, navigateTo } = useApp();

  const selectedAuthor: Author | undefined = pageParam ? getAuthorById(pageParam) : undefined;
  const authorArticles: Article[] = selectedAuthor ? getArticlesByAuthor(selectedAuthor.id) : [];

  if (selectedAuthor) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        <button
          onClick={() => navigateTo('authors')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Writers</span>
        </button>

        {/* Author Spotlight Profile */}
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 sm:p-12 shadow-xl shadow-[var(--shadow-color)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src={selectedAuthor.avatar}
              alt={selectedAuthor.name}
              className="h-28 w-28 rounded-3xl object-cover border-4 border-[var(--border-strong)] shadow-lg"
            />
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Editorial Staff</span>
              <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">{selectedAuthor.name}</h1>
              <p className="text-sm font-semibold text-[var(--text-secondary)]">{selectedAuthor.role}</p>
              <p className="text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed pt-1">
                {selectedAuthor.bio}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[var(--text-muted)]" /> {selectedAuthor.location}
                </span>
                {selectedAuthor.twitter && (
                  <span className="flex items-center gap-1 text-blue-500">
                    <Globe className="h-3.5 w-3.5" /> {selectedAuthor.twitter}
                  </span>
                )}
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <BookOpen className="h-3.5 w-3.5" /> {authorArticles.length} published stories
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stories by this author */}
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
            Articles by {selectedAuthor.name} ({authorArticles.length})
          </h2>
          {authorArticles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {authorArticles.map((art: Article) => (
                <ArticleCard key={art.id} article={art} variant="grid" />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[var(--border-subtle)] p-12 text-center text-[var(--text-muted)]">
              <p>No articles found for this columnist.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-500">The Masthead</span>
        <h1 className="mt-1 text-3xl font-extrabold text-[var(--text-primary)] sm:text-4xl">
          Voices of Kibeez
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-2xl">
          Our independent roster of tacticians, investigative reporters, and football culture essayists based across European football capitals.
        </p>
      </div>

      {/* Grid of All Authors */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {AUTHORS.map((author: Author) => (
          <div
            key={author.id}
            onClick={() => navigateTo('author-detail', author.id)}
            className="group flex flex-col justify-between cursor-pointer rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-sm hover:shadow-md hover:border-blue-500/40 hover:bg-[var(--bg-elevated)] transition-all duration-300"
          >
            <div>
              <div className="flex items-center gap-4">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-[var(--border-strong)] group-hover:scale-105 transition-transform"
                />
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-blue-500 transition-colors">
                    {author.name}
                  </h3>
                  <p className="text-xs text-blue-500 font-medium line-clamp-1">{author.role}</p>
                  <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] mt-1">
                    <MapPin className="h-3 w-3" /> {author.location}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                {author.bio}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4 text-xs">
              <span className="font-semibold text-[var(--text-secondary)]">{author.articlesCount} Articles</span>
              <span className="flex items-center gap-1 font-bold text-blue-500 group-hover:translate-x-0.5 transition-transform">
                <span>View archive</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
