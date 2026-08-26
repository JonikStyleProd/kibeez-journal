import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'transfers',
    name: 'Transfers & Market',
    slug: 'transfers',
    description: 'Inside reports on scouting operations, negotiation strategies, player contracts, and high-stakes squad rebuilds.',
    color: '#3B82F6', // Cobalt blue
    accentBg: 'rgba(59, 130, 246, 0.15)',
    iconName: 'ArrowLeftRight',
    articlesCount: 6
  },
  {
    id: 'premier-league',
    name: 'Premier League',
    slug: 'premier-league',
    description: 'The pulse of English football: title races, tactical masterclasses, high-speed transitions, and managerial drama.',
    color: '#8B5CF6', // Purple/Violet
    accentBg: 'rgba(139, 92, 246, 0.15)',
    iconName: 'Trophy',
    articlesCount: 5
  },
  {
    id: 'la-liga',
    name: 'La Liga',
    slug: 'la-liga',
    description: 'Mastery of technical football, Clásico battles, academy revelations, and the evolution of Iberian tactics.',
    color: '#EF4444', // Red
    accentBg: 'rgba(239, 68, 68, 0.15)',
    iconName: 'Flame',
    articlesCount: 4
  },
  {
    id: 'champions-league',
    name: 'Champions League',
    slug: 'champions-league',
    description: 'Under the stadium floodlights: knockout drama, tactical adjustments on continental stages, and legendary European nights.',
    color: '#06B6D4', // Cyan
    accentBg: 'rgba(6, 182, 212, 0.15)',
    iconName: 'Star',
    articlesCount: 5
  },
  {
    id: 'tactics',
    name: 'Tactics & Analytics',
    slug: 'tactics',
    description: 'Deep dissections of pressing structures, positional rotations, space creation, and modern data-driven coaching.',
    color: '#10B981', // Emerald
    accentBg: 'rgba(16, 185, 129, 0.15)',
    iconName: 'Compass',
    articlesCount: 5
  },
  {
    id: 'culture',
    name: 'Football Culture',
    slug: 'culture',
    description: 'Stories beyond the 90 minutes: terrace culture, legendary kits, iconic stadiums, and the romance of the global game.',
    color: '#F59E0B', // Amber
    accentBg: 'rgba(245, 158, 11, 0.15)',
    iconName: 'Sparkles',
    articlesCount: 4
  }
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return CATEGORIES.find(c => c.slug === slug);
};
