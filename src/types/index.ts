export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  location: string;
  twitter?: string;
  articlesCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  accentBg: string;
  iconName: string;
  articlesCount: number;
}

export interface ArticleParagraph {
  type: 'p' | 'h2' | 'h3' | 'quote' | 'callout' | 'tactical-breakdown' | 'stat-box';
  content: string;
  authorQuote?: string;
  stats?: { label: string; value: string; detail: string }[];
  tacticalPoints?: string[];
}

export type ArticleContentBlock = ArticleParagraph;

export interface ArticleComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  timestamp: string;
  content: string;
  likes: number;
  userLiked?: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: ArticleParagraph[];
  coverImage: string;
  coverCaption?: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  categoryColor: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  publishedAt: string;
  readTimeMinutes: number;
  featured?: boolean;
  trending?: boolean;
  editorsPick?: boolean;
  clapsCount: number;
  commentsCount: number;
  tags: string[];
  audioDuration?: string;
}

export interface TacticalLane {
  fromRole: string;
  toRole: string;
  type?: 'primary' | 'secondary' | 'through' | 'switch' | 'carry';
  animated?: boolean;
}

export interface TacticalSimulationStep {
  stepNumber: number;
  phaseName: string;
  shortLabel: string;
  annotation: string;
  highlightZone?: 'half-space-right' | 'half-space-left' | 'central-box' | 'wide-right' | 'wide-left' | 'penalty-box';
  activeRoles?: string[];
  lanes: TacticalLane[];
  positions: { role: string; x: number; y: number; name: string }[];
}

export interface TacticFormation {
  name: string;
  system: string;
  philosophy: string;
  keyFeature: string;
  positions: { role: string; x: number; y: number; name: string }[];
  simulationSteps: TacticalSimulationStep[];
}

export interface AudioListeningRecord {
  articleId: string;
  articleSlug: string;
  articleTitle: string;
  progress: number; // 0 - 100
  charIndex: number; // character offset in full text
  lastListenedAt: number; // timestamp
  completed: boolean; // true if progress >= 90
  speed: number;
  durationMinutes: number;
}

export type ThemeMode = 'dark' | 'light';

export type NavigationPage = 
  | 'home'
  | 'articles'
  | 'article-detail'
  | 'categories'
  | 'category-detail'
  | 'authors'
  | 'author-detail'
  | 'about'
  | 'contact'
  | 'dashboard';
