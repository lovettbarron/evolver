# Architecture: Learner Experience Features

**Domain:** Learner UX layer on server-component + filesystem architecture
**Researched:** 2026-04-03
**Confidence:** HIGH (patterns well-understood, no novel infrastructure)

## Executive Summary

The v1.2 learner experience features require solving one core architectural problem: **where does mutable user state live in a read-only filesystem architecture?** The answer is localStorage, managed through a React Context provider that bridges the server-component world (which computes content and prerequisites) with client-side persistence (which tracks completions, last session, and streaks).

The existing architecture is clean: server components read filesystem content, validate with Zod, and pass data down. The new features layer on top without disrupting this. Content indexing for search happens via an API route (server reads content, returns JSON, client indexes it). Prerequisite visualization is purely computed from existing `prerequisite` fields in session frontmatter plus completion state. No database, no mutation API routes, no new server infrastructure.

## Current Architecture (As-Is)

```
                    evolver.config.json
                         |
                    loadConfig()
                         |
              +----------+-----------+
              |                      |
         vaultPath set?         no vaultPath
              |                      |
     ~/song vault (local)    src/content/ (demo)
              |                      |
              +----------+-----------+
                         |
                   reader.ts (Zod validation)
                         |
              +----------+-----------+
              |          |           |
         listSessions  listPatches  listModules
              |          |           |
              +----------+-----------+
                         |
                Server Components (pages)
                         |
                Client Components (presentational only)
```

**Key characteristics:**
- All data flows top-down from filesystem through server components
- No mutable state anywhere -- progress is computed from daily note scanning or synthetic data
- Client components are purely presentational (SessionRow, ModuleJourney, etc.)
- The `prerequisite` field exists in SessionSchema but is not used in the UI yet
- Server components load config, read content, compute progress, pass props to client components

## Proposed Architecture (To-Be)

### New Layer: Client-Side Learner State

```
                  Server Components (unchanged)
                         |
                   props with content data
                         |
              LearnerStateProvider (client context)
                    |           |
              localStorage    React state
              (persistent)    (reactive)
                    |           |
              +-----+-----+----+----+
              |           |         |
         CompletionState  LastSession  StreakData
              |           |         |
         SessionList    ContinueBar  ProgressPage
         (enhanced)     (new)        (enhanced)
```

### Component Classification

| Component | Current | v1.2 Change | Server/Client |
|-----------|---------|-------------|---------------|
| `SessionList` | Server component, presentational | Receives completion map, passes to enhanced rows | Server (wrapper) |
| `SessionRow` | Server component, link only | Add completion badge + prerequisite lock icon | Client (needs state) |
| `ModuleJourney` | Server component, dots only | Add click-through to module detail, "you are here" marker | Client (needs state) |
| `ProgressPage` | Server component | Merge server-computed + client completion data | Server (data) + Client (merge) |
| `ContinueBar` | Does not exist | "Continue: Session 22 - Sequencer Basics" banner | Client (reads last session) |
| `SearchOverlay` | Does not exist | Cmd+K full-text search dialog | Client (search index) |
| `CompletionToggle` | Does not exist | Checkbox on session detail page | Client (writes state) |
| `StreakDisplay` | Does not exist | Current streak + best streak on progress page | Client (computed from timestamps) |

## Feature Architecture Details

### 1. Learner State Provider

**Pattern:** React Context + localStorage + custom hook

This is the central new abstraction. A single `'use client'` context provider wraps the app (inside `AppShell`) and manages all mutable learner state.

```typescript
// src/lib/learner-state.tsx
'use client';

interface LearnerState {
  // Completion tracking
  completions: Record<string, CompletionRecord>;  // keyed by "{instrument}:{session_number}"

  // Last session visited (for "continue where you left off")
  lastSession: { instrument: string; slug: string; title: string; number: number } | null;

  // Streak data
  streakDays: string[];  // ISO date strings of days with completions
}

interface CompletionRecord {
  completedAt: string;   // ISO timestamp
  source: 'manual' | 'vault';  // manual = toggle, vault = daily note scan
}
```

**Why a single provider, not per-feature hooks:**
- All features share the same localStorage backing store
- Prevents multiple competing `useEffect` syncs
- Single hydration boundary simplifies SSR handling
- One place to handle the demo-mode vs local-mode branching

**Hydration strategy:**
- Provider initializes with `null` state (matches server render)
- `useEffect` loads from localStorage on mount
- Components show a neutral state (no badge, no streak) until hydrated
- No layout shift because completion badges and streak numbers are additive, not replacing content

**localStorage schema:**

```json
{
  "version": 1,
  "completions": {
    "evolver:1": { "completedAt": "2026-04-03T10:30:00Z", "source": "manual" },
    "evolver:2": { "completedAt": "2026-04-03T11:00:00Z", "source": "manual" }
  },
  "lastSession": {
    "instrument": "evolver",
    "slug": "22-sequencer-basics",
    "title": "Sequencer Basics",
    "number": 22
  },
  "streakDays": ["2026-04-01", "2026-04-02", "2026-04-03"]
}
```

**Why version field:** Future schema migrations. Parse with Zod on load, reset to defaults if validation fails.

### 2. Completion Tracking (Manual Mark-Complete)

**Data flow:**

```
Session Detail Page (server)
  |
  renders session content + CompletionToggle (client)
  |
CompletionToggle reads/writes LearnerStateProvider
  |
  writes to localStorage key: "evolver-learner-state"
  |
  updates completions["{instrument}:{session_number}"]
```

**Merging with vault-scanned completions:**

The progress page currently gets completed sessions from either vault scanning or synthetic data (server-side). Manual completions live in localStorage (client-side). These must merge:

```typescript
// In a client wrapper component:
// Server provides: vaultCompletedSessions (Set<number>) as serialized array via props
// Client provides: manualCompletions from LearnerStateProvider
// Merged set = union of both, displayed in progress UI
```

**Important constraint:** Manual completions NEVER write back to the vault. They are a client-only convenience for users who do not use Obsidian or who want quick tracking. The vault remains the source of truth for users who have it configured.

### 3. Search

**Architecture: API route + client-side MiniSearch**

Use **MiniSearch** (8KB gzipped, zero dependencies) because:
- The corpus is small (35 sessions + ~20 patches per instrument = well under 1000 documents)
- Full-text with fuzzy matching and field boosting covers all needs
- No server infrastructure needed beyond a read-only JSON endpoint
- Loads fast, searches instantly after first fetch

**Index serving via API route (recommended):**

Create `src/app/api/search-index/[instrument]/route.ts` that reads content server-side and returns JSON. This is the first API route in the project but it is strictly read-only -- no state mutation. It aligns with the filesystem-read pattern and keeps page payload small.

```typescript
// src/app/api/search-index/[instrument]/route.ts
import { NextResponse } from 'next/server';
import { loadConfig } from '@/lib/config';
import { listSessions, listPatches } from '@/lib/content/reader';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ instrument: string }> }
) {
  const { instrument } = await params;
  const config = await loadConfig();
  const [sessions, patches] = await Promise.all([
    listSessions(instrument, config),
    listPatches(instrument, config),
  ]);

  const documents = [
    ...sessions.map(s => ({
      id: `session:${s.slug}`,
      type: 'session' as const,
      title: s.data.title,
      module: s.data.module,
      tags: s.data.tags.join(' '),
      body: s.content.slice(0, 2000),
      href: `/instruments/${instrument}/sessions/${s.slug}`,
    })),
    ...patches.map(p => ({
      id: `patch:${p.slug}`,
      type: 'patch' as const,
      title: p.data.name,
      tags: p.data.tags.join(' '),
      body: p.data.description,
      href: `/instruments/${instrument}/patches/${p.slug}`,
    })),
  ];

  return NextResponse.json(documents);
}
```

**Why API route over build-time index:** When `vaultPath` is set, content comes from the live vault (which changes between sessions). A build-time index would be stale. The API route reads fresh content at request time and benefits from Next.js request deduplication.

**Search UI flow:**

```
Cmd+K (or search icon in nav)
  |
  opens SearchOverlay (dialog/modal, client component)
  |
  fetches /api/search-index/{instrument} once (cached in component state)
  |
  MiniSearch indexes documents on first open
  |
  user types -> miniSearch.search(query) -> results grouped by type
  |
  keyboard navigation (up/down/enter)
  |
  selecting a result navigates via Next.js router.push()
```

### 4. Prerequisite Visualization

**Entirely computed from existing data, no new state needed.**

The `SessionSchema` already has `prerequisite: z.union([z.number(), z.null()])` -- a session number that must be completed before this session is available.

**State derivation:**

```typescript
type SessionAvailability = 'completed' | 'available' | 'locked';

function getAvailability(
  session: Session,
  completedSessions: Set<number>
): SessionAvailability {
  if (completedSessions.has(session.session_number)) return 'completed';
  if (session.prerequisite === null) return 'available';
  if (completedSessions.has(session.prerequisite)) return 'available';
  return 'locked';
}
```

**UI treatment in SessionRow:**

| State | Visual | Interaction |
|-------|--------|-------------|
| `completed` | Green checkmark badge | Normal link |
| `available` | No badge (default) | Normal link |
| `locked` | Lock icon, muted text | Link still works (soft lock, not hard block) |

**Why soft lock:** Hard blocking creates frustration for ADHD users who might want to peek ahead. The lock is informational ("you should do session 7 first") not prohibitive.

**Data flow:**

```
SessionListPage (server)
  |
  loads sessions + vault completions (as serialized number array)
  |
  passes as props to SessionListWithState (new client wrapper)
  |
  SessionListWithState merges vault completions + manual completions from LearnerStateProvider
  |
  computes availability per session
  |
  renders SessionRow with availability prop
```

### 5. "Continue Where You Left Off"

**Track last-visited session in LearnerStateProvider.**

```
SessionDetailPage (server) renders SessionDetail (client)
  |
  useEffect on mount: update lastSession in LearnerStateProvider
  |
  LearnerStateProvider persists to localStorage

InstrumentPage reads lastSession from LearnerStateProvider
  |
  renders ContinueBar: "Continue: Session 22 - Sequencer Basics"
  |
  only shows if lastSession.instrument matches current instrument
```

**ContinueBar component:** A prominent banner shown at the top of the instrument overview page. Shows session title, module context, and a direct link. Not dismissable -- it is the primary navigation mechanism for returning learners.

### 6. Progress Streaks

**Computed from completion timestamps in localStorage.**

```typescript
interface StreakInfo {
  currentStreak: number;   // consecutive days ending today (or yesterday)
  bestStreak: number;      // all-time best
  lastActiveDate: string;  // ISO date
}

function computeStreak(streakDays: string[]): StreakInfo {
  // Sort dates, walk backwards from today
  // Count consecutive days (allowing yesterday as "still active")
  // Track best streak seen during walk
}
```

**ADHD-friendly streak design:** A streak is not broken until TWO days pass without activity. One day off is normal and expected per the project's design principles. This prevents guilt spirals.

**Data source:** When a completion is recorded (manual toggle), add today's date to `streakDays` array. Vault-scanned completions currently lack timestamps, so they do not feed streaks.

**Future enhancement:** Since Obsidian daily note filenames ARE dates (e.g., `2026-04-03.md`), vault scanning could extract dates and feed streaks. Flag this for a later phase.

### 7. Clickable Progress Counts

**Enhancement to existing CountCard component.**

Currently `CountCard` shows a number and label. Add an optional `href` prop to make it a link:

```typescript
interface CountCardProps {
  count: number;
  label: string;
  href?: string;  // NEW: optional link destination
}
```

- "Sessions Completed" links to session list
- "Patches Created" links to patch library
- "Modules Done" links to module index
- Pure UI enhancement, no architecture change needed

## Component Dependency Graph and Build Order

Build order matters because features share the LearnerStateProvider:

```
Phase 1: Foundation
  LearnerStateProvider (context + localStorage + Zod schema for stored data)
    |
Phase 2: Core Features (can parallelize after Phase 1)
    |
    +-- CompletionToggle (depends on: LearnerStateProvider)
    |
    +-- ContinueBar (depends on: LearnerStateProvider)
    |
    +-- SessionRow enhancement with prereq viz (depends on: LearnerStateProvider)
    |
Phase 3: Computed Features (depend on completion data existing)
    |
    +-- StreakDisplay (depends on: CompletionToggle populating timestamp data)
    |
    +-- Progress page merge (depends on: LearnerStateProvider + existing progress.ts)
    |
    +-- Clickable CountCard (independent, can go anywhere)
    |
Phase 4: Independent Feature (no dependency on LearnerStateProvider)
    |
    +-- SearchOverlay + API route + MiniSearch integration
```

**Phase 4 (Search) can be built in parallel with Phases 1-3.** It has no dependency on the learner state system.

## New Files (Predicted)

| File | Type | Purpose |
|------|------|---------|
| `src/lib/learner-state.tsx` | Client context provider | Central mutable state management with localStorage persistence |
| `src/lib/learner-state-schema.ts` | Zod schema | Validate localStorage data shape on load, handle migrations |
| `src/hooks/use-learner-state.ts` | Custom hook | Convenience wrapper: `const { completions, markComplete, lastSession } = useLearnerState()` |
| `src/lib/availability.ts` | Pure function | `getAvailability(session, completedSessions)` -- testable without React |
| `src/lib/streaks.ts` | Pure function | `computeStreak(streakDays)` -- testable without React |
| `src/app/api/search-index/[instrument]/route.ts` | API route (read-only) | Serve search document JSON for client-side indexing |
| `src/components/search-overlay.tsx` | Client component | Cmd+K search dialog with MiniSearch |
| `src/components/completion-toggle.tsx` | Client component | Manual mark-complete checkbox on session detail |
| `src/components/continue-bar.tsx` | Client component | "Continue where you left off" banner |
| `src/components/streak-display.tsx` | Client component | Current streak + best streak counters |
| `src/components/session-list-with-state.tsx` | Client component | Wrapper that merges vault + manual completions, computes availability |

## Modified Files (Predicted)

| File | Change |
|------|--------|
| `src/components/app-shell.tsx` | Wrap children in `LearnerStateProvider` |
| `src/components/session-row.tsx` | Add completion badge, prerequisite lock icon, `availability` prop |
| `src/components/session-list.tsx` | Accept vault completion data, delegate to `SessionListWithState` |
| `src/components/module-journey.tsx` | Add `'use client'`, "you are here" marker based on completions, click-through links |
| `src/components/count-card.tsx` | Add optional `href` prop for navigation |
| `src/components/session-detail.tsx` | Add CompletionToggle, track lastSession on mount |
| `src/components/nav.tsx` | Add search trigger button (magnifying glass / Cmd+K hint) |
| `src/app/instruments/[slug]/sessions/page.tsx` | Load vault completions, pass to enhanced session list |
| `src/app/instruments/[slug]/progress/page.tsx` | Serialize vault completions as props for client-side merge |
| `src/app/instruments/[slug]/page.tsx` | Add ContinueBar component |
| `package.json` | Add `minisearch` dependency |

## Anti-Patterns to Avoid

### Anti-Pattern 1: Server-Side Mutation for Completions
**What:** Creating API routes that write completion state to a JSON file or SQLite database.
**Why bad:** Breaks the read-only filesystem contract. Introduces write concurrency. Diverges from vault-as-source-of-truth. Adds deployment complexity on Vercel.
**Instead:** localStorage for manual completions. The vault handles "real" tracking via daily notes.

### Anti-Pattern 2: Lifting All Components to Client
**What:** Making SessionListPage, ProgressPage etc. fully `'use client'` to access learner state.
**Why bad:** Loses server-side rendering benefits. Session content does not need client rendering.
**Instead:** Keep page-level data loading in server components. Create thin client wrappers that receive server data as props AND access learner state from context.

### Anti-Pattern 3: Pre-Building Search Index at Build Time
**What:** Running a build script to generate `search-index.json` as a static asset.
**Why bad:** When `vaultPath` is set, content comes from the live vault (which changes). A build-time index would be stale. Having two code paths (build-time for demo, runtime for vault) is fragile.
**Instead:** API route that reads content at request time. Works identically in both modes.

### Anti-Pattern 4: Hard Prerequisite Locks
**What:** Returning 404 or blocking navigation to sessions with unmet prerequisites.
**Why bad:** ADHD users explore non-linearly. Hard blocks create frustration and may trigger abandonment.
**Instead:** Visual indicators (lock icon, muted styling) with a tooltip explaining recommended order. Navigation always works.

### Anti-Pattern 5: Multiple localStorage Keys
**What:** Separate keys for completions, last-session, streaks, search-history.
**Why bad:** Fragmented state, no single migration path, race conditions between independent writes.
**Instead:** Single `evolver-learner-state` key with versioned JSON. One read on mount, one write per mutation.

## Demo Mode Considerations

| Feature | Local Mode | Demo Mode |
|---------|-----------|-----------|
| Completions source | Vault scan + manual (localStorage) | Synthetic set + manual (localStorage) |
| Search index | API route reads vault content | API route reads src/content/ |
| Continue bar | localStorage (persists between visits) | localStorage (persists between visits) |
| Streaks | Manual completions only (no vault timestamps) | Manual completions only |
| Prerequisites | Computed from vault + manual completions | Computed from synthetic + manual |

**Key insight:** localStorage works identically in both modes. Demo visitors can mark sessions complete, see streaks, and use "continue." This makes the demo genuinely interactive rather than purely passive.

## Data Flow Summary

```
Filesystem (vault or bundled)
    |
    | (server-side read, Zod validated)
    v
Server Components (pages)
    |
    | (props: sessions, patches, vault completions as number[])
    v
LearnerStateProvider (client context, wraps app in AppShell)
    |
    | (merges vault completions + localStorage manual completions)
    v
Client Components
    |
    +-- SessionRow: shows completed/available/locked via availability prop
    +-- CompletionToggle: writes to localStorage via context
    +-- ContinueBar: reads lastSession from context
    +-- StreakDisplay: computed from streakDays in context
    +-- SearchOverlay: fetches index from API route, searches client-side with MiniSearch
    +-- ModuleJourney: shows "you are here" based on merged completions
```

## Scalability Notes

This architecture handles the current scale (35 sessions, 20 patches, 2 instruments) comfortably. At 10 instruments with 50 sessions each (500 total), the search index would be ~500KB JSON -- still fine for client-side search. localStorage has a 5-10MB limit; completion records for 500 sessions would use ~50KB. No scaling concerns for the foreseeable multi-instrument roadmap.

## Sources

- Existing codebase: `src/lib/progress.ts`, `src/lib/content/reader.ts`, `src/lib/content/schemas.ts` -- direct inspection (HIGH confidence)
- Session schema `prerequisite` field already defined in `schemas.ts` line 8 -- unused in UI (HIGH confidence)
- [MiniSearch](https://github.com/lucaong/minisearch) -- 8KB client-side full-text search, zero dependencies (HIGH confidence)
- [Next.js App Router localStorage patterns](https://app.studyraid.com/en/read/1903/31004/persisting-state-on-the-client-side) (MEDIUM confidence)
- [FlexSearch](https://github.com/nextapps-de/flexsearch) -- considered, rejected for simpler MiniSearch API (MEDIUM confidence)
