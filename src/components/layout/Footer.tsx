import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)]">
      {/* Top Newsletter / Pitch Dispatch Band */}
      <div className="border-b border-[var(--border-subtle)] bg-gradient-to-r from-blue-950/20 via-[var(--bg-elevated)] to-[var(--bg-surface)] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-0.5 text-xs font-semibold text-blue-500 dark:text-blue-400">
                <Sparkles className="h-3 w-3 text-amber-500 dark:text-amber-400" />
                <span>Weekly Tactical Briefing</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
                The Sunday Morning Whiteboard
              </h3>
              <p className="text-sm text-[var(--text-secondary)] max-w-xl">
                Curated tactical dossiers, data models, and boardroom transfer economics delivered ad-free every weekend.
              </p>
            </div>

            <div className="md:col-span-5">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  alert('Thank you for subscribing to the Sunday Whiteboard!');
                }}
                className="flex flex-col sm:flex-row gap-2.5"
              >
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  required
                  className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-3 text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-all shrink-0 active:scale-95 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                <span>Zero spam. Unsubscribe anytime with 1-click.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 font-black text-white shadow-lg shadow-blue-600/30">
                K
              </div>
              <span className="font-serif text-xl font-black tracking-wider text-[var(--text-primary)]">
                KIBEEZ
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Independent football journalism celebrating tactical geometry, boardroom mechanics, and global terrace culture. Rebuilt with a 2026 digital product architecture.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/JonikStyleProd"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:border-blue-500 hover:text-[var(--text-primary)] transition-colors"
                title="GitHub"
              >
                <Globe className="h-4 w-4" />
              </a>
              <span className="text-[11px] text-[var(--text-muted)] font-mono">Bureaus in London, Madrid & Milan</span>
            </div>
          </div>

          {/* Categories Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-3">
              Beats & Leagues
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigateTo('category-detail', cat.slug)}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Editorial Links Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-3">
              Editorial
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('articles')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  All Dispatches
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('authors')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  The Masthead
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Manifesto & Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Pitch a Story
                </button>
              </li>
            </ul>
          </div>

          {/* Reader Studio Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-3">
              Reader Studio
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('dashboard')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Saved Bookmarks
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('dashboard')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Reading Backlog
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('dashboard')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Visual Preferences
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-muted)] gap-4">
          <p>© 2026 Kibeez Media Ltd. All rights reserved. Modernized from JonikStyleProd/Responsive-Blog.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[var(--text-secondary)] cursor-pointer" onClick={() => navigateTo('about')}>Privacy</span>
            <span className="hover:text-[var(--text-secondary)] cursor-pointer" onClick={() => navigateTo('about')}>Ethics Policy</span>
            <span className="hover:text-[var(--text-secondary)] cursor-pointer" onClick={() => navigateTo('contact')}>Editorial Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
