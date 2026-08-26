import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ArrowRight, 
  Tag, 
  Clock, 
  Newspaper, 
  Home, 
  Compass, 
  Users, 
  Bookmark, 
  LayoutDashboard, 
  Sun, 
  Moon,
  Command
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ARTICLES } from '../../data/articles';
import { CATEGORIES } from '../../data/categories';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    navigateTo, 
    setIsReadingListOpen,
    theme,
    toggleTheme
  } = useApp();
  
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const quickActions = [
    { id: 'act-home', title: 'Go to Home', subtitle: 'Headline feed and pitch visualizer', icon: Home, action: () => { navigateTo('home'); setIsSearchOpen(false); } },
    { id: 'act-articles', title: 'Browse All Stories', subtitle: 'Complete archive & investigative features', icon: Compass, action: () => { navigateTo('articles'); setIsSearchOpen(false); } },
    { id: 'act-authors', title: 'Editorial Board & Columnists', subtitle: 'Meet our tactical analysts and writers', icon: Users, action: () => { navigateTo('authors'); setIsSearchOpen(false); } },
    { id: 'act-queue', title: 'Open Reading List', subtitle: 'Access saved offline stories', icon: Bookmark, action: () => { setIsSearchOpen(false); setIsReadingListOpen(true); } },
    { id: 'act-dash', title: 'Editorial Dashboard', subtitle: 'Publication metrics and submit story', icon: LayoutDashboard, action: () => { navigateTo('dashboard'); setIsSearchOpen(false); } },
    { id: 'act-theme', title: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Obsidian', subtitle: 'Toggle reading appearance mode', icon: theme === 'dark' ? Sun : Moon, action: () => { toggleTheme(); } }
  ];

  const filteredArticles = ARTICLES.filter(art => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      art.title.toLowerCase().includes(q) ||
      art.excerpt.toLowerCase().includes(q) ||
      art.categoryName.toLowerCase().includes(q) ||
      art.authorName.toLowerCase().includes(q) ||
      art.tags.some(t => t.toLowerCase().includes(q))
    );
  }).slice(0, 6);

  const filteredActions = quickActions.filter(a => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q);
  });

  const handleSelectArticle = (slug: string) => {
    setIsSearchOpen(false);
    navigateTo('article-detail', slug);
  };

  const handleSelectCategory = (slug: string) => {
    setIsSearchOpen(false);
    navigateTo('category-detail', slug);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-16 sm:pt-20 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xl shadow-[var(--shadow-color)]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-5 py-4">
          <Command className="h-5 w-5 text-blue-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command or search stories, tactics, transfers, authors..."
            className="w-full bg-transparent text-base text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2 py-0.5 text-[11px] font-mono text-[var(--text-muted)]">
            ESC
          </kbd>
        </div>

        {/* Categories Quick Chips */}
        {!query && (
          <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Explore Topics</span>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.slug)}
                  className="flex items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-500 transition-all cursor-pointer"
                >
                  <Tag className="h-3 w-3 text-[var(--text-muted)]" />
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="max-h-[55vh] overflow-y-auto p-3 space-y-4">
          {/* Quick Actions / Navigation */}
          {filteredActions.length > 0 && (
            <div>
              <div className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Quick Navigation
              </div>
              <div className="space-y-1 mt-1">
                {filteredActions.slice(0, query ? 2 : 4).map(action => {
                  const Icon = action.icon;
                  return (
                    <div
                      key={action.id}
                      onClick={action.action}
                      className="group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 hover:bg-[var(--bg-subtle-hover)] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] group-hover:text-blue-500 transition-colors">
                            {action.title}
                          </div>
                          <div className="text-[11px] text-[var(--text-muted)]">{action.subtitle}</div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 group-hover:text-blue-500 transition-all shrink-0 ml-2" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stories Section */}
          <div>
            <div className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Stories & Tactical Breakdowns ({filteredArticles.length})
            </div>
            {filteredArticles.length > 0 ? (
              <div className="space-y-1 mt-1">
                {filteredArticles.map(art => (
                  <div
                    key={art.id}
                    onClick={() => handleSelectArticle(art.slug)}
                    className="group flex cursor-pointer items-center justify-between rounded-xl p-3 hover:bg-[var(--bg-subtle-hover)] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="h-12 w-14 rounded-xl object-cover border border-[var(--border-subtle)]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold uppercase text-blue-500">{art.categoryName}</span>
                          <span className="text-[var(--text-muted)]">•</span>
                          <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)]">
                            <Clock className="h-3 w-3" /> {art.readTimeMinutes} min read
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-blue-500 transition-colors line-clamp-1">
                          {art.title}
                        </h4>
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-1">{art.excerpt}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 group-hover:text-blue-500 transition-all shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <Newspaper className="mx-auto h-8 w-8 text-[var(--text-muted)]" />
                <p className="mt-2 text-sm font-medium text-[var(--text-secondary)]">No articles matched "{query}"</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">Try keywords like "Tactics", "Transfers", "Madrid", or "Haaland"</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-5 py-3 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <kbd className="rounded border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-1.5 py-0.5 text-[10px] font-mono">⌘K</kbd>
            <span>Command Palette & Search</span>
          </div>
          <button
            onClick={() => {
              setIsSearchOpen(false);
              navigateTo('articles');
            }}
            className="font-semibold text-blue-500 hover:underline cursor-pointer"
          >
            View all stories →
          </button>
        </div>
      </div>
    </div>
  );
};
