import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, BookOpen, Clock, CheckCircle2, Volume2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ARTICLES } from '../../data/articles';

export const ReadingListDrawer: React.FC = () => {
  const { 
    isReadingListOpen, 
    setIsReadingListOpen, 
    bookmarks, 
    toggleBookmark, 
    navigateTo,
    isArticleListened,
    getAudioRecord
  } = useApp();

  if (!isReadingListOpen) return null;

  const bookmarkedArticles = ARTICLES.filter(art => bookmarks.includes(art.slug));

  const handleOpenArticle = (slug: string) => {
    setIsReadingListOpen(false);
    navigateTo('article-detail', slug);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xl">
          <div className="flex h-full flex-col">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] p-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/30">
                  <Bookmark className="h-4 w-4 fill-current" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">Reading List</h3>
                  <p className="text-xs text-[var(--text-muted)]">{bookmarks.length} {bookmarks.length === 1 ? 'story' : 'stories'} saved</p>
                </div>
              </div>
              <button
                onClick={() => setIsReadingListOpen(false)}
                className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {bookmarkedArticles.length > 0 ? (
                bookmarkedArticles.map(art => (
                  <div
                    key={art.id}
                    className="group relative rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] p-3.5 hover:border-blue-500/30 hover:bg-[var(--bg-subtle-hover)] transition-all"
                  >
                    <div className="flex gap-3">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="h-16 w-16 rounded-lg object-cover border border-[var(--border-subtle)] shrink-0 cursor-pointer"
                        onClick={() => handleOpenArticle(art.slug)}
                      />
                      <div className="flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">{art.categoryName}</span>
                        <h4
                          onClick={() => handleOpenArticle(art.slug)}
                          className="cursor-pointer text-sm font-semibold text-[var(--text-primary)] group-hover:text-blue-500 transition-colors line-clamp-2"
                        >
                          {art.title}
                        </h4>
                        <div className="mt-1.5 flex flex-wrap items-center justify-between text-xs text-[var(--text-muted)] gap-1">
                          <div className="flex items-center gap-1.5">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {art.readTimeMinutes}m
                            </span>
                            {isArticleListened(art.id) && (
                              <span className="inline-flex items-center gap-0.5 rounded bg-emerald-500/10 px-1 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                <CheckCircle2 className="h-2.5 w-2.5" /> Listened
                              </span>
                            )}
                            {!isArticleListened(art.id) && getAudioRecord(art.id)?.progress ? (
                              <span className="inline-flex items-center gap-0.5 rounded bg-blue-500/10 px-1 py-0.5 text-[9px] font-semibold text-blue-500">
                                <Volume2 className="h-2.5 w-2.5" /> {getAudioRecord(art.id)?.progress}%
                              </span>
                            ) : null}
                          </div>
                          <button
                            onClick={() => toggleBookmark(art.slug)}
                            className="text-[var(--text-muted)] hover:text-red-500 transition-colors cursor-pointer"
                            title="Remove from bookmarks"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                    <BookOpen className="h-7 w-7" />
                  </div>
                  <h4 className="mt-4 text-base font-semibold text-[var(--text-primary)]">Your list is empty</h4>
                  <p className="mt-1 text-xs text-[var(--text-muted)] max-w-xs mx-auto">
                    Click the bookmark icon on any article to save it for offline or later reading.
                  </p>
                  <button
                    onClick={() => {
                      setIsReadingListOpen(false);
                      navigateTo('articles');
                    }}
                    className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-all cursor-pointer"
                  >
                    <span>Browse Articles</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            {bookmarkedArticles.length > 0 && (
              <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
                <button
                  onClick={() => {
                    setIsReadingListOpen(false);
                    navigateTo('dashboard');
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/20 hover:brightness-110 transition-all cursor-pointer"
                >
                  <span>Open Full Reader Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
