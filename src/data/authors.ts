import { Author } from '../types';

export const AUTHORS: Author[] = [
  {
    id: 'jonik-style',
    name: 'Jonik Style',
    role: 'Editor-in-Chief & Lead Tactics Columnist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Veteran football journalist covering European club architecture, manager philosophy shifts, and tactical macro-trends across the continent.',
    location: 'London / Madrid',
    twitter: '@jonikstyle_kibeez',
    articlesCount: 14
  },
  {
    id: 'alex-proctor',
    name: 'Alex Proctor',
    role: 'European Football & Transfer Insider',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Specialist in continental scouting networks, contract clauses, and high-stakes transfer negotiations across Premier League and Serie A.',
    location: 'Manchester, UK',
    twitter: '@alexproctor_fb',
    articlesCount: 18
  },
  {
    id: 'sofia-ramos',
    name: 'Sofia Ramos',
    role: 'La Liga & Iberian Culture Correspondent',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Investigative correspondent bringing nuanced insight into Spanish club dynamics, academy systems, and South American player pipelines.',
    location: 'Barcelona, Spain',
    twitter: '@sofiaramos_es',
    articlesCount: 9
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Tactical Analyst & Performance Data Editor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Former UEFA B-license coach dissecting high-pressing triggers, expected threat models, and positional play in elite modern football.',
    location: 'Munich, Germany',
    twitter: '@marcusvance_tactics',
    articlesCount: 12
  },
  {
    id: 'mateo-rossi',
    name: 'Mateo Rossi',
    role: 'Serie A & Champions League Analyst',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Chronicling the renaissance of Italian tactical discipline, historic rivalry lore, and tactical reinventions on European nights.',
    location: 'Milan, Italy',
    twitter: '@mateorossi_calcio',
    articlesCount: 8
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Global Football Culture Essayist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Documenting ultras culture, stadium architecture, kit heritage, and the socio-political heartbeats of football communities worldwide.',
    location: 'Paris, France',
    twitter: '@elenarostova_mag',
    articlesCount: 11
  }
];

export const getAuthorById = (id: string): Author | undefined => {
  return AUTHORS.find(a => a.id === id);
};
