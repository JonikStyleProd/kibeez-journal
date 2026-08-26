import React from 'react';
import { Sparkles, Shield, Compass, BookOpen, Award, Heart, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>The Kibeez Manifesto</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl">
          Restoring Depth to Football Journalism
        </h1>
        <p className="mx-auto max-w-2xl text-base text-[var(--text-secondary)] leading-relaxed">
          Kibeez was founded on a singular premise: football is not merely content to be scrolled past in five seconds. It is a nuanced intersection of mathematical space, human passion, and timeless subculture.
        </p>
      </div>

      {/* Hero Quote Block */}
      <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 sm:p-10 shadow-xl shadow-[var(--shadow-color)]">
        <blockquote className="text-xl sm:text-2xl font-serif text-[var(--text-primary)] italic leading-relaxed text-center">
          "When you remove the noise of sensationalist headlines, what remains is the pure poetry of geometry, movement, and collective human spirit."
        </blockquote>
        <p className="mt-4 text-center text-xs font-bold uppercase tracking-wider text-blue-500">
          — Kibeez Editorial Desk
        </p>
      </div>

      {/* The 4 Editorial Pillars */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center sm:text-left">
          Our Four Journalistic Pillars
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 mb-4">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">1. Forensic Tactical Dissection</h3>
            <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              We break down positional play, half-space dynamics, and rest-defense structures with rigorous analytical models rather than emotional hot takes.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">2. Boardroom Financial Truth</h3>
            <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Transfer analysis backed by amortization tables, UEFA sustainability constraints, and verified scouting intelligence, not agent fabrication.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 mb-4">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">3. Terrace Heritage & Soul</h3>
            <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Honoring grassroots supporter culture, vintage aesthetic archives, and the personal memories that give football its generational heartbeat.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 mb-4">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">4. Pure Editorial Craft</h3>
            <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Cinematic typography, comfortable reading modes, and an ad-free interface designed to respect your focus and time.
            </p>
          </div>
        </div>
      </div>

      {/* The 2026 Modernization Journey */}
      <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 shadow-sm">
        <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-500" />
          <span>The 2026 Architecture Rebuild</span>
        </h3>
        <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          Kibeez originated as a classic multipage template. In 2026, it was re-architected from the ground up into a high-performance single-page web app powered by React, TypeScript, Tailwind CSS, and interactive 3D tactical pitch visualizers.
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-[var(--text-secondary)]">Client-side structured state with zero lag</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-[var(--text-secondary)]">Interactive 3D tactics simulation canvas</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-[var(--text-secondary)]">Accessible audio article reader engine</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-[var(--text-secondary)]">Persistent Reading List & dark/light themes</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => navigateTo('articles')}
          className="rounded-2xl bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/30 hover:bg-blue-500 transition-all active:scale-95 cursor-pointer"
        >
          Explore All Football Stories
        </button>
      </div>
    </div>
  );
};
