# Technology Stack: v1.2 Learner Experience & Discovery

**Project:** Evolver Deep Learning
**Milestone:** v1.2 Learner Experience & Discovery
**Researched:** 2026-04-03
**Confidence:** HIGH

## Executive Summary

This milestone needs two new dependencies: MiniSearch for client-side full-text search, and Zustand for persistent learner state (completion tracking, streaks, "continue where you left off"). Everything else -- prerequisite visualization, progress streaks UI, filtering -- builds on existing Tailwind + Lucide + React patterns with zero new packages.

The key architectural insight: the current app is heavily server-component based with zero client state management. This milestone introduces the first persistent client state (localStorage-backed completion tracking), which requires a deliberate boundary between server-rendered content and client-owned learner state.

## Recommended Stack Additions

### New Dependencies

| Technology | Version | Purpose | Why This One |
|------------|---------|---------|-------------|
| `minisearch` | ^7.2.0 | Client-side full-text search across sessions and patches | 7KB gzipped, zero dependencies, native TypeScript, built-in prefix/fuzzy search. The content corpus is small (~35 sessions + patches) so the index loads instantly. MiniSearch's API is simpler than FlexSearch while being fast enough for datasets 100x this size. |
| `zustand` | ^5.0.0 | Persistent learner state (completion, streaks, last session) | 1.2KB gzipped core. Built-in `persist` middleware handles localStorage with SSR-safe hydration out of the box. Uses React 19's `useSyncExternalStore` internally. No providers, no boilerplate -- just hooks. The app currently has zero client state management; Zustand is the minimal viable solution. |

### Why These and Not Alternatives

**Search: MiniSearch over FlexSearch**
FlexSearch is faster on benchmarks but has a complex, poorly-typed API and its v0.8 has incomplete documentation. MiniSearch is written in TypeScript, has excellent docs, and for ~35-100 documents the performance difference is immeasurable. FlexSearch's "contextual index" optimization matters at 100K+ documents, not 35.

**Search: MiniSearch over Fuse.js**
Fuse.js is fuzzy-only (no full-text indexing) and iterates the entire collection on every query. MiniSearch builds an inverted index, enabling prefix search, field boosting, and ranked results. For searching session bodies + frontmatter, we need actual full-text search, not just fuzzy matching of short strings.

**State: Zustand over raw localStorage hooks**
A custom `useLocalStorage` hook would work for a single value, but this milestone needs: session completion set, streak data, last-visited session, and potentially filter preferences. Managing multiple localStorage keys with hydration-safe hooks, cross-tab sync, and typed access is exactly what Zustand's persist middleware solves. Adding a 1.2KB dependency avoids ~200 lines of error-prone custom hook code.

**State: Zustand over Jotai**
Jotai is atom-based (bottom-up), Zustand is store-based (top-down). Learner state is a single coherent object (completions + streaks + preferences), not independent atoms. Zustand's `persist` middleware is more mature than Jotai's `atomWithStorage`.

**State: Zustand over React Context**
Context re-renders all consumers on any change. The completion store will be read by session rows, module cards, progress dashboard, and the "continue" banner -- all at different granularities. Zustand's selector-based subscriptions prevent unnecessary re-renders.

## Existing Dependencies That Cover v1.2 Needs

| Existing Dependency | v1.2 Use |
|---------------------|----------|
| `lucide-react` ^1.7.0 | Icons for completion checkmarks, lock/unlock states, streak flame, search magnifier |
| `clsx` ^2.1.1 | Conditional classes for completed/locked/available session states |
| `tailwindcss` ^4.2.2 | All new UI (progress bars, streak counters, search results, prerequisite badges) |
| `zod` ^3.23.0 | Validate search index shape if pre-built at build time |

## Integration Architecture

### Search: Build-Time Index, Client-Side Query

```
build time (bundle-content.ts):
  sessions + patches markdown -> extract searchable fields -> JSON index file

runtime (client component):
  load JSON index -> hydrate MiniSearch instance -> query on keystroke
```

**Why build-time indexing:** The content is static (markdown files bundled at build). Building the search index at build time means zero indexing cost at runtime. MiniSearch supports `loadJSON()` for exactly this pattern.

**Server/client boundary:** The index is generated in `bundle-content.ts` (server/build), saved as a JSON file in `src/content/`, and loaded by a `'use client'` search component. The server never runs search queries.

### State: Zustand Store with localStorage Persist

```typescript
// src/lib/learner-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LearnerState {
  // Session completion (replaces Obsidian daily note scanning for web-only users)
  completedSessions: Record<string, number[]>; // instrument -> session numbers

  // Continue where you left off
  lastVisited: Record<string, string>; // instrument -> session slug

  // Streak tracking
  practiceDates: string[]; // ISO date strings of days with activity

  // Actions
  toggleComplete: (instrument: string, sessionNumber: number) => void;
  setLastVisited: (instrument: string, slug: string) => void;
  recordPractice: () => void;
}
```

**Hydration safety:** Zustand's `persist` middleware with `skipHydration: true` option allows server-rendering with empty state, then hydrating from localStorage on the client. This avoids the hydration mismatch that raw `useState` + `useEffect` + localStorage creates.

**Coexistence with Obsidian scanning:** The current `scanDailyNotes()` in `progress.ts` reads completion from Obsidian vault files (server-side). The new Zustand store provides a parallel client-side completion path for users without an Obsidian vault (demo mode, web-only). The progress computation should merge both sources: `obsidianCompleted UNION zustandCompleted`.

### Prerequisite Visualization: Pure Derived State

No new dependency. Prerequisite data already exists in session frontmatter (`prerequisite: number | null`). Visualization is computed from:
- Session list (server component provides all sessions)
- Completion state (Zustand store, client component)
- Prerequisite field (session frontmatter)

States: `completed` | `available` (prerequisites met) | `locked` (prerequisites not met)

This is a pure client-side derivation, no library needed.

### Streak Calculation: Pure TypeScript

No library needed. A streak is consecutive days in `practiceDates`. The calculation is:
1. Sort dates descending
2. Walk backward from today counting consecutive days
3. Display count + flame icon

This is ~20 lines of TypeScript, not a dependency.

## What NOT to Add

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `fuse.js` | Fuzzy-only, no inverted index, slow on full-text search of markdown bodies | MiniSearch |
| `flexsearch` | Complex API, poor TypeScript support, overkill for small corpus | MiniSearch |
| `lunr` | Unmaintained since 2020, larger bundle, no TypeScript | MiniSearch |
| `@tanstack/react-query` | No async data fetching needed -- content is static, state is local | Zustand for state, static imports for content |
| `jotai` | Atom model wrong fit for single coherent learner state object | Zustand |
| `redux` / `@reduxjs/toolkit` | Massive boilerplate for a simple persistent store | Zustand |
| `idb` / `dexie` (IndexedDB) | Overkill for ~100 keys of learner state. localStorage is sufficient | Zustand persist with localStorage (default) |
| `date-fns` / `dayjs` | Streak calculation needs only date string comparison, not a date library | Native `Date` + ISO strings |
| `framer-motion` | Animations are nice-to-have, not in scope for this milestone | CSS transitions via Tailwind |
| `chart.js` / `recharts` | Progress visualization is counters and bars, not charts | Tailwind + custom CSS |

## Installation

```bash
# New dependencies for v1.2
npm install minisearch@^7.2.0 zustand@^5.0.0
```

That is it. Two packages, ~8KB gzipped combined.

## Version Compatibility

| Package | Version | Requires | Compatible With |
|---------|---------|----------|-----------------|
| `minisearch` | ^7.2.0 | No framework dependency | Any environment (browser + Node) |
| `zustand` | ^5.0.0 | React 18+ (uses `useSyncExternalStore`) | React 19.2.4 (installed), Next.js 15 App Router |

Both packages are ESM-compatible and tree-shakeable.

## New Files to Create

| File | Type | Purpose |
|------|------|---------|
| `src/lib/learner-store.ts` | Module | Zustand store with persist middleware for completion, streaks, last-visited |
| `src/lib/search-index.ts` | Module | MiniSearch configuration, field definitions, search helper functions |
| `scripts/build-search-index.ts` | Build script | Extract searchable fields from sessions/patches, serialize MiniSearch index to JSON |
| `src/components/search-bar.tsx` | Client component | Search input with results dropdown, uses MiniSearch |
| `src/components/session-complete-toggle.tsx` | Client component | Checkbox/toggle to mark session complete, writes to Zustand store |
| `src/components/continue-banner.tsx` | Client component | "Continue where you left off" banner reading from Zustand store |
| `src/components/streak-counter.tsx` | Client component | Streak display with flame icon, reads from Zustand store |
| `src/components/prerequisite-badge.tsx` | Client component | Lock/check/circle icon showing session availability state |

## Sources

- [MiniSearch GitHub](https://github.com/lucaong/minisearch) -- TypeScript source, API docs, v7.2.0 (HIGH confidence)
- [MiniSearch npm](https://www.npmjs.com/package/minisearch) -- 556K weekly downloads, actively maintained (HIGH confidence)
- [Zustand docs](https://zustand.docs.pmnd.rs/reference/integrations/persisting-store-data) -- Persist middleware documentation (HIGH confidence)
- [npm-compare: MiniSearch vs FlexSearch vs Fuse.js](https://npm-compare.com/elasticlunr,flexsearch,fuse.js,minisearch) -- Feature and popularity comparison (MEDIUM confidence)
- [npm trends: search libraries](https://npmtrends.com/flexsearch-vs-fuse.js-vs-fuzzysort-vs-match-sorter-vs-minisearch) -- Download trends (MEDIUM confidence)
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) -- Server/client boundary patterns (HIGH confidence)
- [useSyncExternalStore and localStorage](https://dev.to/muhammed_fayazts_e35676/usesyncexternalstore-the-right-way-to-sync-react-with-localstorage-3c5f) -- Hydration safety patterns (MEDIUM confidence)

---
*Stack research for: v1.2 Learner Experience & Discovery*
*Researched: 2026-04-03*
