import { Author } from '../types';

export const AUTHORS: Author[] = [
  {
    id: 'jonik-style',
    name: 'Jonik Style',
    role: 'Editor-in-Chief & Lead Tactics Columnist',
    avatar: '/images/avatar3.jpg',
    bio: 'Veteran football journalist covering European club architecture, manager philosophy shifts, and tactical macro-trends across the continent.',
    location: 'London / Madrid',
    twitter: '@jonikstyle_kibeez',
    articlesCount: 14
  },
  {
    id: 'alex-proctor',
    name: 'Alex Proctor',
    role: 'European Football & Transfer Insider',
    avatar: '/images/avatar4.jpg',
    bio: 'Specialist in continental scouting networks, contract clauses, and high-stakes transfer negotiations across Premier League and Serie A.',
    location: 'Manchester, UK',
    twitter: '@alexproctor_fb',
    articlesCount: 18
  },
  {
    id: 'sofia-ramos',
    name: 'Sofia Ramos',
    role: 'La Liga & Iberian Culture Correspondent',
    avatar: '/images/avatar5.jpg',
    bio: 'Investigative correspondent bringing nuanced insight into Spanish club dynamics, academy systems, and South American player pipelines.',
    location: 'Barcelona, Spain',
    twitter: '@sofiaramos_es',
    articlesCount: 9
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Tactical Analyst & Performance Data Editor',
    avatar: '/images/avatar6.jpg',
    bio: 'Former UEFA B-license coach dissecting high-pressing triggers, expected threat models, and positional play in elite modern football.',
    location: 'Munich, Germany',
    twitter: '@marcusvance_tactics',
    articlesCount: 12
  },
  {
    id: 'mateo-rossi',
    name: 'Mateo Rossi',
    role: 'Serie A & Champions League Analyst',
    avatar: '/images/avatar7.jpg',
    bio: 'Chronicling the renaissance of Italian tactical discipline, historic rivalry lore, and tactical reinventions on European nights.',
    location: 'Milan, Italy',
    twitter: '@mateorossi_calcio',
    articlesCount: 8
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Global Football Culture Essayist',
    avatar: '/images/avatar8.jpg',
    bio: 'Documenting ultras culture, stadium architecture, kit heritage, and the socio-political heartbeats of football communities worldwide.',
    location: 'Paris, France',
    twitter: '@elenarostova_mag',
    articlesCount: 11
  }
];

export const getAuthorById = (id: string): Author | undefined => {
  return AUTHORS.find(a => a.id === id);
};
