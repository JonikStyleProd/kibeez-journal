import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeMode, NavigationPage, ArticleComment, AudioListeningRecord } from '../types';

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'bookmark';
}

interface AppContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  currentPage: NavigationPage;
  pageParam: string | null;
  navigateTo: (page: NavigationPage, param?: string) => void;
  bookmarks: string[]; // article slugs
  toggleBookmark: (slug: string) => void;
  isBookmarked: (slug: string) => boolean;
  likedArticles: Record<string, boolean>;
  toggleLikeArticle: (articleId: string) => void;
  clapsMap: Record<string, number>;
  addClap: (articleId: string) => void;
  commentsMap: Record<string, ArticleComment[]>;
  addComment: (articleId: string, authorName: string, content: string) => void;
  likeComment: (articleId: string, commentId: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isReadingListOpen: boolean;
  setIsReadingListOpen: (open: boolean) => void;
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'info' | 'bookmark') => void;
  removeToast: (id: string) => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  // Audio narration state & history
  audioHistory: Record<string, AudioListeningRecord>;
  saveAudioProgress: (record: AudioListeningRecord) => void;
  clearAudioProgress: (articleId: string) => void;
  getAudioRecord: (articleId: string) => AudioListeningRecord | undefined;
  isArticleListened: (articleId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_COMMENTS: Record<string, ArticleComment[]> = {
  'art-1': [
    {
      id: 'c1',
      authorName: 'Julian Sterling',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80',
      timestamp: '2 hours ago',
      content: 'This breakdown of Zone 14 overloads is masterclass journalism. You can clearly see how City and Arsenal engineer that 3-meter window for the cutback.',
      likes: 18,
      userLiked: false
    },
    {
      id: 'c2',
      authorName: 'Marco Bellini',
      authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80',
      timestamp: '5 hours ago',
      content: 'Fascinating point about decel-acceleration. Elite fullbacks simply cannot turn their hips quickly enough when the winger halts momentum.',
      likes: 9,
      userLiked: false
    }
  ],
  'art-2': [
    {
      id: 'c3',
      authorName: 'Dominic Hayes',
      authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&h=200&q=80',
      timestamp: '1 day ago',
      content: 'The amortization breakdown explains why clubs prefer 6-year commitments with tiered release levers. Great piece Alex.',
      likes: 12,
      userLiked: false
    }
  ]
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('kibeez_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  // Navigation state driven by URL hash
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [pageParam, setPageParam] = useState<string | null>(null);

  // Bookmarks state
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kibeez_bookmarks');
      return saved ? JSON.parse(saved) : ['the-anatomy-of-the-modern-inverted-winger', 'terrace-culture-and-the-enduring-romance-of-football-kits'];
    } catch {
      return [];
    }
  });

  // Likes & claps state
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});
  const [clapsMap, setClapsMap] = useState<Record<string, number>>({});
  const [commentsMap, setCommentsMap] = useState<Record<string, ArticleComment[]>>(DEFAULT_COMMENTS);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Audio listening history state
  const [audioHistory, setAudioHistory] = useState<Record<string, AudioListeningRecord>>(() => {
    try {
      const saved = localStorage.getItem('kibeez_audio_history');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReadingListOpen, setIsReadingListOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Apply theme to document
  useEffect(() => {
    localStorage.setItem('kibeez_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem('kibeez_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Persist audio listening history
  useEffect(() => {
    localStorage.setItem('kibeez_audio_history', JSON.stringify(audioHistory));
  }, [audioHistory]);

  // Handle URL Hash navigation
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'home') {
        setCurrentPage('home');
        setPageParam(null);
      } else if (hash.startsWith('article/')) {
        setCurrentPage('article-detail');
        setPageParam(hash.replace('article/', ''));
      } else if (hash.startsWith('category/')) {
        setCurrentPage('category-detail');
        setPageParam(hash.replace('category/', ''));
      } else if (hash.startsWith('author/')) {
        setCurrentPage('author-detail');
        setPageParam(hash.replace('author/', ''));
      } else if (hash === 'articles') {
        setCurrentPage('articles');
        setPageParam(null);
      } else if (hash === 'categories') {
        setCurrentPage('categories');
        setPageParam(null);
      } else if (hash === 'authors') {
        setCurrentPage('authors');
        setPageParam(null);
      } else if (hash === 'about') {
        setCurrentPage('about');
        setPageParam(null);
      } else if (hash === 'contact') {
        setCurrentPage('contact');
        setPageParam(null);
      } else if (hash === 'dashboard') {
        setCurrentPage('dashboard');
        setPageParam(null);
      } else {
        setCurrentPage('home');
        setPageParam(null);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const navigateTo = (page: NavigationPage, param?: string) => {
    let hash = page as string;
    if (page === 'article-detail' && param) {
      hash = `article/${param}`;
    } else if (page === 'category-detail' && param) {
      hash = `category/${param}`;
    } else if (page === 'author-detail' && param) {
      hash = `author/${param}`;
    }
    window.location.hash = hash;
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleBookmark = (slug: string) => {
    setBookmarks(prev => {
      const exists = prev.includes(slug);
      if (exists) {
        showToast('Article removed from Reading List', 'info');
        return prev.filter(s => s !== slug);
      } else {
        showToast('Saved to Reading List', 'bookmark');
        return [...prev, slug];
      }
    });
  };

  const isBookmarked = (slug: string) => bookmarks.includes(slug);

  const toggleLikeArticle = (articleId: string) => {
    setLikedArticles(prev => {
      const isLiked = !prev[articleId];
      if (isLiked) {
        showToast('Added to your favorite articles', 'success');
      }
      return { ...prev, [articleId]: isLiked };
    });
  };

  const addClap = (articleId: string) => {
    setClapsMap(prev => ({
      ...prev,
      [articleId]: (prev[articleId] || 0) + 1
    }));
  };

  const addComment = (articleId: string, authorName: string, content: string) => {
    const newComment: ArticleComment = {
      id: `c_${Date.now()}`,
      authorName: authorName.trim() || 'Football Enthusiast',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      timestamp: 'Just now',
      content: content.trim(),
      likes: 1,
      userLiked: false
    };

    setCommentsMap(prev => ({
      ...prev,
      [articleId]: [newComment, ...(prev[articleId] || [])]
    }));
    showToast('Your perspective has been posted', 'success');
  };

  const likeComment = (articleId: string, commentId: string) => {
    setCommentsMap(prev => {
      const comments = prev[articleId] || [];
      const updated = comments.map(c => {
        if (c.id === commentId) {
          const userLiked = !c.userLiked;
          return {
            ...c,
            userLiked,
            likes: userLiked ? c.likes + 1 : c.likes - 1
          };
        }
        return c;
      });
      return { ...prev, [articleId]: updated };
    });
  };

  const showToast = (message: string, type: 'success' | 'info' | 'bookmark' = 'info') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3600);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Audio history helpers
  const saveAudioProgress = (record: AudioListeningRecord) => {
    setAudioHistory(prev => ({
      ...prev,
      [record.articleId]: {
        ...record,
        lastListenedAt: Date.now(),
        completed: record.completed || record.progress >= 90
      }
    }));
  };

  const clearAudioProgress = (articleId: string) => {
    setAudioHistory(prev => {
      const next = { ...prev };
      delete next[articleId];
      return next;
    });
    showToast('Listening progress reset for this article', 'info');
  };

  const getAudioRecord = (articleId: string): AudioListeningRecord | undefined => {
    return audioHistory[articleId];
  };

  const isArticleListened = (articleId: string): boolean => {
    const record = audioHistory[articleId];
    return !!record && (record.completed || record.progress >= 90);
  };

  // Keyboard shortcut listener: Cmd+K / Ctrl+K for search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsReadingListOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currentPage,
        pageParam,
        navigateTo,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        likedArticles,
        toggleLikeArticle,
        clapsMap,
        addClap,
        commentsMap,
        addComment,
        likeComment,
        isSearchOpen,
        setIsSearchOpen,
        isReadingListOpen,
        setIsReadingListOpen,
        toasts,
        showToast,
        removeToast,
        fontSize,
        setFontSize,
        audioHistory,
        saveAudioProgress,
        clearAudioProgress,
        getAudioRecord,
        isArticleListened
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
