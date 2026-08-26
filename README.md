# Kibeez — Football Culture & Stories

> A premier independent sports-media platform and portfolio-quality web application built with **React**, **TypeScript**, **Tailwind CSS**, and interactive **3D motion visualizations**.

---

## 🌟 Overview & Concept

**Kibeez** is an editorial sports publication engineered for football purists, tactical analysts, and culture enthusiasts. Moving away from the clickbait sensationalism of generic sports portals, Kibeez treats football as an intersection of **mathematical space, boardroom economics, and generational terrace culture**.

---

## 🔄 Project Evolution: Original Template → 2026 Modernization

| Dimension | Original Legacy Repository | 2026 Kibeez Modernization |
| :--- | :--- | :--- |
| **Architecture** | Scattered static `.html` files with duplicate code & dead links | Modular Single Page Application (React 19 + TypeScript + Vite) |
| **Design System** | Basic CSS stylesheet with generic layout patterns | Obsidian Dark / Editorial Light themes, mathematical padding rhythm, WCAG AA compliance |
| **Interactive 3D Motion** | Static image boxes | Interactive 3D Perspective Pitch with tactical formation switcher & pass progression engine |
| **Editorial Engine** | Static short lorem-style fragments | Structured long-form dossiers with pull-quotes, tactical breakdowns, stat tables, & audio player |
| **Search & Discovery** | Unconnected inputs | Global instant spotlight search (`Cmd+K`), category filtering, read-time presets, and sort orders |
| **State Persistence** | Transient DOM manipulation | Local storage persistence for Reading List, Bookmarks, Theme preferences, and Liked articles |

---

## ⚡ Core Features

### 1. Interactive 3D Tactical Pitch Engine
- **Perspective Parallax**: Dynamic 3D tilt responding to cursor movement on desktop and touch on mobile.
- **Formation Switcher**: Instant switching between elite modern systems (`3-2-4-1 Box Midfield`, `4-3-3 Asymmetrical High Press`, `3-4-2-1 Wingback Overload`).
- **Tactical Simulation**: Live pass trajectory visualization demonstrating how teams overload half-spaces and release inverted wingers.

### 2. Deep Editorial Storytelling & Audio Reader
- **Typography Craftsmanship**: Pairings of *Playfair Display* for dramatic editorial pull-quotes and *Montserrat* for dense tactical readability.
- **Audio Article Simulation**: Built-in voice narrator player with dynamic soundwave bar animations, speed multipliers (1.0x / 1.25x / 1.5x), and scrubbable timeline.
- **Micro-Interactions**: Confetti-powered article applause counter, dynamic font-size scaler (A / A+ / A++), and native Web Share / clipboard copying.

### 3. Comprehensive Navigation & Discovery
- **Spotlight Search (`⌘K` / `Ctrl+K`)**: Instant search across titles, excerpts, clubs, tacticians, and authors.
- **Category Beats**: Dedicated hubs for *Transfers & Market*, *Premier League*, *La Liga*, *Champions League*, *Tactics & Analytics*, and *Football Culture*.
- **The Masthead**: Comprehensive author profile views, beat specialties, and curated writer archives.

### 4. Personal Reader Hub & Library
- **Reading List Drawer**: Slide-over queue of saved articles accessible across all views.
- **Reader Dashboard**: Overview of reading backlog in minutes, liked stories, and ergonomic display settings.

### 5. Validated Editorial Inquiries Form
- Accessible, validated story pitch form with instant reference ticket generation and realistic UI confirmations.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: Canvas Confetti & CSS 3D Transforms

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Development
```bash
# Install dependencies
npm install

# Start development server on http://localhost:3000
npm run dev

# Build for production
npm run build
```

---

## 📂 Project Structure

```
├── public/               # Static assets & favicon
├── images/               # Curated photography and author avatars
├── src/
│   ├── components/
│   │   ├── articles/     # ArticleCard, AudioReaderPlayer, ArticleComments
│   │   ├── common/       # Toast, SearchModal, ReadingListDrawer
│   │   ├── hero/         # HeroTacticalPitch3D interactive engine
│   │   └── layout/       # Navbar, Footer
│   ├── context/          # AppContext (Theme, Bookmarks, History, Modals)
│   ├── data/             # Structured data (Articles, Categories, Authors, Tactics)
│   ├── pages/            # HomePage, ArticlesPage, ArticleDetailPage, CategoryPage, etc.
│   ├── types/            # TypeScript data model declarations
│   ├── App.tsx           # Router and root component
│   ├── index.css         # Tailwind styles, theme variables, & 3D rules
│   └── main.tsx          # React application entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── metadata.json
```

---

*Designed & developed for the 2026 portfolio showcase of modern sports media engineering.*
