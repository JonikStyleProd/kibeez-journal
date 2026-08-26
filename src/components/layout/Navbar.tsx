import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bookmark, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Compass, 
  BookOpen, 
  Users, 
  Info, 
  Mail, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationPage } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    theme, 
    toggleTheme, 
    currentPage, 
    navigateTo, 
    bookmarks, 
    setIsSearchOpen, 
    setIsReadingListOpen 
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: NavigationPage; icon: React.FC<{ className?: string }> }[] = [
    { label: 'Home', page: 'home', icon: Sparkles },
    { label: 'Explore Stories', page: 'articles', icon: Compass },
    { label: 'Categories', page: 'categories', icon: SlidersHorizontal },
    { label: 'Authors', page: 'authors', icon: Users },
    { label: 'About', page: 'about', icon: Info },
    { label: 'Contact', page: 'contact', icon: Mail }
  ];

  const handleNavClick = (page: NavigationPage) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'border-b border-[var(--border-subtle)] bg-[var(--bg-overlay)] py-3 backdrop-blur-xl shadow-lg shadow-[var(--shadow-color)]'
            : 'border-b border-[var(--border-subtle)] bg-[var(--bg-overlay)]/70 py-4 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-400 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[var(--bg-page)] font-black text-xs text-[var(--text-primary)]">
                  KB
                </div>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-[var(--text-primary)] font-sans">
                  KIBEEZ
                </span>
                <span className="hidden sm:inline-block ml-1.5 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Journal
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-1.5 backdrop-blur-md">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              id="global-search-trigger"
              className="flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:border-blue-500/40 hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)] transition-all"
              title="Search articles (Cmd+K)"
            >
              <Search className="h-3.5 w-3.5 text-blue-500" />
              <span className="hidden sm:inline font-medium">Search</span>
              <kbd className="hidden lg:inline-flex rounded border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-1.5 py-0.2 text-[10px] text-[var(--text-muted)] font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Reading List Drawer Button */}
            <button
              onClick={() => setIsReadingListOpen(true)}
              id="reading-list-btn"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:border-blue-500/40 hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)] transition-all"
              title="Saved Reading List"
            >
              <Bookmark className="h-4 w-4" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-xs">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              id="theme-toggle-btn"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:border-amber-500/40 hover:bg-[var(--bg-subtle-hover)] hover:text-amber-500 transition-all"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-blue-600" />}
            </button>

            {/* Reader Dashboard Shortcut */}
            <button
              onClick={() => handleNavClick('dashboard')}
              className="hidden lg:flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Reader Hub</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              id="mobile-menu-btn"
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-[var(--bg-page)]/98 pt-20 px-6 backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col gap-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`flex items-center gap-3 rounded-xl p-3.5 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-subtle-hover)]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            
            <button
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-3 rounded-xl bg-emerald-500/15 p-3.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
            >
              <BookOpen className="h-4 w-4" />
              <span>Personal Reader Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
