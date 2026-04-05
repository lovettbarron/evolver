# Phase 14: Learner State Foundation - Research

**Researched:** 2026-04-05
**Domain:** Client-side state management with Zustand persist middleware in Next.js 15 App Router
**Confidence:** HIGH

## Summary

This phase introduces the first client-side state management layer to the Evolver app. The app currently has zero client state libraries -- all data flows server-to-client via server components and props. Zustand with its persist middleware is the locked decision for managing learner state (completions and last-visited tracking) in localStorage. The main technical challenges are: (1) avoiding Next.js hydration mismatches when persisted localStorage data differs from server-rendered initial state, (2) merging server-provided vault-scanned completions with client-stored manual completions using union semantics, and (3) integrating client components (sticky completion bar, resume bar) into existing server component pages without disrupting the established patterns.

The existing codebase already has a clean server-side progress system (`src/lib/progress.ts`) that scans vault daily notes for completion tags. This phase layers client-side manual completions on top, merging both sources. The architecture keeps a clean boundary: server components load vault data as props, client components hydrate from localStorage and union-merge on mount.

**Primary recommendation:** Use Zustand 5.x with built-in persist middleware targeting localStorage, instrument-scoped state keys, and a `useHydrated` pattern to prevent SSR/client mismatches.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Sticky bottom bar on session detail page -- always visible at bottom of viewport with checkbox and session title. Zero scroll needed
- **D-02:** Instant toggle, no confirmation dialog -- one tap flips completion state. Undo by tapping again. Zero friction, matches ADHD low-activation-energy principle
- **D-03:** Completed state shows filled checkbox + "Completed" label with subtle success color. Still tappable to un-complete. Quiet, not celebratory
- **D-04:** Resume bar appears on instrument home page (`/instruments/[slug]`) -- first thing you see when picking an instrument
- **D-05:** "Next session" logic: if last-visited session is incomplete, show that. Otherwise, show first incomplete session in sequence order. Simple, predictable
- **D-06:** When all sessions are complete, show "All complete" with link to freeform practice (challenges, patches, revisit favorites)
- **D-07:** Read-only synthetic journey in demo mode. Completion toggle is hidden or disabled. Resume bar shows next session in the synthetic journey. Visitors see what the app looks like mid-curriculum without modifying state
- **D-08:** Server passes vault-scanned completions as props; client Zustand store hydrates from localStorage, then unions with server-provided vault data on hydration. Single merge point on page load. Clean server/client boundary
- **D-09:** Keep both sources, ignore overlap -- union semantics as specified. Manual toggles in localStorage are cheap and harmless. No deduplication logic

### Claude's Discretion
- Zustand store shape and internal API design
- Sticky bar animation/transition details
- Resume bar visual treatment (card style, accent color, hover state)
- Hydration timing and flash prevention strategy
- How last-visited tracking fires (on mount, on scroll, debounced)
- localStorage key naming and versioning strategy

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LSTATE-01 | User can mark a session as complete via toggle in session detail page, persisted in localStorage | Zustand persist middleware writes to localStorage automatically; completion toggle component pattern documented below |
| LSTATE-02 | User's last-visited session is tracked automatically and persisted across browser sessions | Store tracks `lastVisited` per instrument; fires on session page mount via useEffect |
| LSTATE-03 | Completion data merges vault-scanned and manual sources using union semantics | Union merge on client: spread server Set into client Set on hydration; documented in Architecture Patterns |
| LSTATE-04 | Zustand store with persist middleware provides client-side state layer for all learner data | Zustand 5.x with persist middleware; store shape and hydration pattern documented below |
| NAV-01 | User sees "continue where you left off" resume bar showing next recommended session | Resume bar consumes merged completions + lastVisited from Zustand store; "next session" logic uses existing `groupByModule()` |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| zustand | 5.0.12 | Client-side state management with persist | Minimal API, built-in persist middleware, no providers needed, works with Next.js App Router |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 1.7.0 (existing) | Icons for checkbox, resume bar | Check, BookOpen, ArrowRight, CheckCircle, Play icons per UI spec |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Zustand | React Context + useReducer | More boilerplate, no built-in persist, would need custom localStorage sync |
| Zustand | Jotai | Atomic model adds complexity for this use case; persist middleware less mature |
| localStorage direct | IndexedDB | Overkill for simple key-value completion state |

**Installation:**
```bash
npm install zustand
```

**Version verification:** `npm view zustand version` returned `5.0.12` on 2026-04-05.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── stores/
│   └── learner-store.ts     # Zustand store definition with persist
├── hooks/
│   └── use-hydrated.ts      # SSR hydration guard hook
├── components/
│   ├── completion-toggle.tsx # Sticky bottom bar (client component)
│   └── resume-bar.tsx        # Resume bar (client component)
```

### Pattern 1: Zustand Store with Persist Middleware
**What:** Single store holding all learner state, scoped by instrument slug.
**When to use:** All learner-facing components that need completion or last-visited data.
**Example:**
```typescript
// src/stores/learner-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LearnerState {
  // Keyed by instrument slug
  completions: Record<string, number[]>;
  lastVisited: Record<string, { sessionSlug: string; sessionNumber: number }>;

  // Actions
  toggleCompletion: (instrument: string, sessionNumber: number) => void;
  setLastVisited: (instrument: string, sessionSlug: string, sessionNumber: number) => void;
  getCompletedSessions: (instrument: string) => Set<number>;
}

export const useLearnerStore = create<LearnerState>()(
  persist(
    (set, get) => ({
      completions: {},
      lastVisited: {},

      toggleCompletion: (instrument, sessionNumber) =>
        set((state) => {
          const current = state.completions[instrument] ?? [];
          const isComplete = current.includes(sessionNumber);
          return {
            completions: {
              ...state.completions,
              [instrument]: isComplete
                ? current.filter((n) => n !== sessionNumber)
                : [...current, sessionNumber],
            },
          };
        }),

      setLastVisited: (instrument, sessionSlug, sessionNumber) =>
        set((state) => ({
          lastVisited: {
            ...state.lastVisited,
            [instrument]: { sessionSlug, sessionNumber },
          },
        })),

      getCompletedSessions: (instrument) => {
        return new Set(get().completions[instrument] ?? []);
      },
    }),
    {
      name: 'evolver-learner-state',
      version: 1,
    }
  )
);
```

### Pattern 2: Hydration Guard for SSR
**What:** Prevent hydration mismatch by rendering client-only state after mount.
**When to use:** Any component consuming Zustand persist store in a Next.js server-rendered page.
**Example:**
```typescript
// src/hooks/use-hydrated.ts
import { useEffect, useState } from 'react';

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}
```

**Usage in components:**
```typescript
// In resume bar or completion toggle
const hydrated = useHydrated();
if (!hydrated) return null; // Or return skeleton/placeholder
```

**Alternative approach using Zustand's onRehydrateStorage:**
```typescript
persist(
  // ... store definition
  {
    name: 'evolver-learner-state',
    onRehydrateStorage: () => (state) => {
      // Called after hydration completes
      // Can set a `_hasHydrated` flag in the store
    },
  }
)
```

### Pattern 3: Union Merge on Component Mount
**What:** Server passes vault completions as props; client component merges with localStorage completions.
**When to use:** Resume bar and any component that needs the "truth" -- combined completions.
**Example:**
```typescript
// In resume bar component
function ResumeBar({
  instrumentSlug,
  vaultCompletions,  // Set<number> from server
  sessions,
}: ResumeBarProps) {
  const hydrated = useHydrated();
  const manualCompletions = useLearnerStore((s) => s.getCompletedSessions(instrumentSlug));
  const lastVisited = useLearnerStore((s) => s.lastVisited[instrumentSlug]);

  if (!hydrated) return null;

  // Union merge: either source saying complete = complete
  const merged = new Set([...vaultCompletions, ...manualCompletions]);

  // "Next session" logic (D-05):
  // 1. If last-visited is incomplete, show that
  // 2. Otherwise, show first incomplete in sequence order
  const nextSession = computeNextSession(lastVisited, merged, sessions);
  // ...
}
```

### Pattern 4: Last-Visited Tracking
**What:** Automatically record which session the user is viewing.
**When to use:** Session detail page, fires on mount.
**Example:**
```typescript
// In completion toggle (already on session detail page)
useEffect(() => {
  if (!isDemo) {
    setLastVisited(instrumentSlug, sessionSlug, sessionNumber);
  }
}, [instrumentSlug, sessionSlug, sessionNumber]);
```

**Recommendation:** Fire on mount only (not on scroll or debounced). The session detail page is the unit of "visiting" -- opening it is sufficient signal. Simple, no edge cases.

### Anti-Patterns to Avoid
- **Wrapping app in a Zustand Provider:** Zustand does not need providers. The store is a module-level singleton. Do NOT create a context provider wrapper.
- **Reading persist store during SSR:** Server components cannot access localStorage. Never import the Zustand store in server components. Pass vault data as props instead.
- **Storing vault completions in Zustand:** Only manual toggle completions go in localStorage. Vault data stays server-side and is passed as props. This prevents stale cached vault data in localStorage.
- **Using `useStore` with selector in server component:** Zustand stores are client-only. The `useLearnerStore` hook must only be called inside `'use client'` components.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| localStorage persistence | Custom localStorage wrapper with JSON serialization | Zustand persist middleware | Handles serialization, versioning, migration, error recovery |
| State hydration timing | Manual `useEffect` + `useState` for each piece of persisted state | Zustand persist `onRehydrateStorage` or `useHydrated` hook | Centralized hydration logic, one pattern for all components |
| State merge logic | Custom deep-merge utility | Simple Set spread (`new Set([...a, ...b])`) | Union semantics is trivial with Set; no library needed |
| Next session computation | Complex priority queue | Linear scan through sorted sessions | Sessions are already sorted by `session_number`; scan for first incomplete is O(n) with n < 60 |

**Key insight:** The complexity in this phase is in the integration boundaries (server/client, SSR/hydration, vault/manual), not in the state management itself. Zustand handles the hard parts (persistence, serialization). The merge logic is deliberately simple (union).

## Common Pitfalls

### Pitfall 1: Hydration Mismatch
**What goes wrong:** Next.js server renders a component with default state (no completions), but on client hydration Zustand loads from localStorage with completions. React throws a hydration error.
**Why it happens:** `persist` middleware asynchronously loads from localStorage after the initial render.
**How to avoid:** Use the `useHydrated` pattern. Render `null` or a skeleton during SSR, then show the real content after hydration. The UI spec already accounts for this: resume bar renders nothing during SSR/hydration (see Interaction States in UI-SPEC).
**Warning signs:** Console errors mentioning "Text content does not match server-rendered HTML" or "Hydration failed."

### Pitfall 2: Stale Vault Data in Client Store
**What goes wrong:** If vault completions are stored in Zustand/localStorage, they become stale when the user logs sessions in Obsidian. The app shows outdated progress.
**Why it happens:** localStorage is a cache with no invalidation signal from the vault.
**How to avoid:** Never store vault completions in localStorage. Always pass them as server props on each page load. Only manual toggle completions live in localStorage (D-08).
**Warning signs:** Progress page and resume bar showing different completion counts.

### Pitfall 3: Instrument State Collision
**What goes wrong:** Evolver and Cascadia completions overwrite each other in localStorage.
**Why it happens:** Flat state shape without instrument scoping.
**How to avoid:** Scope all state by instrument slug: `completions: Record<string, number[]>`. One localStorage key, instrument-keyed data within.
**Warning signs:** Completing an Evolver session marks a Cascadia session as complete.

### Pitfall 4: Demo Mode Writing to localStorage
**What goes wrong:** Demo mode visitors create localStorage entries that persist, causing confusion if they later set up a vault.
**Why it happens:** Toggle component renders in demo mode and writes to store.
**How to avoid:** In demo mode, hide the completion toggle entirely (D-07). Resume bar uses synthetic data only. Guard all write actions with `isDemo` check.
**Warning signs:** localStorage has entries for `evolver-learner-state` on a Vercel-deployed demo site.

### Pitfall 5: Sticky Bar Covering Content
**What goes wrong:** The fixed-position sticky bar at the bottom covers the last paragraph or navigation of the session content.
**Why it happens:** No bottom padding compensation.
**How to avoid:** Add `padding-bottom: 72px` (56px bar + 16px breathing room) to the session detail page content wrapper. UI spec section 3 (Scroll Compensation) specifies this.
**Warning signs:** Users can't see the prev/next navigation links.

## Code Examples

### Existing Integration Points

**Session detail page** (`src/app/instruments/[slug]/sessions/[id]/page.tsx`):
- Server component that loads session data and passes to `<SessionDetail>`.
- `<SessionDetail>` is already a `'use client'` component.
- Completion toggle can be added as a child of `<SessionDetail>` or as a sibling component rendered alongside it.
- Key props needed: `session.session_number`, `instrumentSlug`, `isDemo` (needs to be threaded from config).

**Instrument home page** (`src/app/instruments/[slug]/page.tsx`):
- Server component that renders `<InstrumentOverview>`.
- Already computes `nextSession` from first session in list.
- Resume bar needs: vault completions (from `scanDailyNotes` or synthetic), all sessions list, instrument slug.
- The existing `nextSession` prop can be replaced/augmented by the resume bar's smarter logic.

**Progress page** (`src/app/instruments/[slug]/progress/page.tsx`):
- Currently uses only vault-scanned completions.
- Future integration point: will need to merge vault + manual completions.
- Can remain server-only for now if scope is limited, or add a client wrapper.

### Demo Mode Detection Pattern
```typescript
// In server component (page.tsx):
const config = await loadConfig();
const isDemo = !config.vaultPath;

// Pass to client component:
<CompletionToggle isDemo={isDemo} ... />
<ResumeBar isDemo={isDemo} ... />
```

### Vault Completions as Server Props
```typescript
// In instrument home page (server component):
const completedSessions = config.vaultPath
  ? (await scanDailyNotes(config.vaultPath)).sessionNumbers
  : getSyntheticCompletedSessions(slug);

// Serialize Set to array for props (Sets can't be serialized across server/client boundary):
<ResumeBar vaultCompletions={Array.from(completedSessions)} ... />
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Zustand v4 `create()` | Zustand v5 `create()()` (curried for TypeScript) | Zustand 5.0 (2024) | Double-invocation pattern: `create<State>()(...)` |
| `zustand/middleware` named imports | Same, stable API | Unchanged | `persist` import path is stable |
| Custom localStorage adapter | Built-in `localStorage` default in persist | Zustand 4+ | No custom storage needed for localStorage |

**Deprecated/outdated:**
- Zustand v3 `create(set => ...)` without TypeScript currying -- v5 requires `create<T>()(...)` form for proper type inference
- `createContext` from zustand/context -- removed in v5, not needed anyway (Zustand doesn't use React context)

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.x with jsdom |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| LSTATE-01 | Toggle completion persists in store | unit | `npx vitest run src/stores/learner-store.test.ts -x` | Wave 0 |
| LSTATE-02 | Last-visited updates on setLastVisited | unit | `npx vitest run src/stores/learner-store.test.ts -x` | Wave 0 |
| LSTATE-03 | Union merge of vault + manual completions | unit | `npx vitest run src/lib/learner-utils.test.ts -x` | Wave 0 |
| LSTATE-04 | Store shape and persist config | unit | `npx vitest run src/stores/learner-store.test.ts -x` | Wave 0 |
| NAV-01 | Next session computation logic | unit | `npx vitest run src/lib/learner-utils.test.ts -x` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/stores/learner-store.test.ts` -- covers LSTATE-01, LSTATE-02, LSTATE-04 (store actions and shape)
- [ ] `src/lib/learner-utils.test.ts` -- covers LSTATE-03, NAV-01 (union merge, next-session logic)
- [ ] Note: Vitest jsdom environment is already configured. `@testing-library/react` is already installed for component tests if needed.

## Open Questions

1. **Should the progress page also merge manual completions?**
   - What we know: Progress page currently only uses vault-scanned data (PROG-01 through PROG-04 are complete)
   - What's unclear: Whether phase 14 should update the progress page to also show manual completions
   - Recommendation: Defer progress page integration. The phase requirements don't mention the progress page. Keep the progress page as-is (vault-only). A future phase can integrate merged state.

2. **localStorage key versioning strategy**
   - What we know: Zustand persist supports a `version` field and `migrate` function for schema evolution
   - What's unclear: Whether to start at version 1 and plan for future migrations
   - Recommendation: Start with `version: 1`. The `migrate` function is optional and can be added later when the schema changes. The state shape is simple enough that a version bump with migration is straightforward.

3. **isDemo prop threading**
   - What we know: `loadConfig()` in server components determines demo mode. Layout already passes `isDemoMode` to `<AppShell>`.
   - What's unclear: Best path to get `isDemo` to the completion toggle and resume bar
   - Recommendation: Pass `isDemo` as a prop from the server component page to the client component. This is simpler than context and follows the existing pattern.

## Sources

### Primary (HIGH confidence)
- Zustand official docs: [Persisting store data](https://zustand.docs.pmnd.rs/reference/integrations/persisting-store-data)
- `npm view zustand version` -- confirmed 5.0.12 on 2026-04-05
- Existing codebase: `src/lib/progress.ts`, `src/components/session-detail.tsx`, `src/app/layout.tsx`

### Secondary (MEDIUM confidence)
- [Zustand + Next.js hydration discussion](https://github.com/pmndrs/zustand/discussions/2788) -- hydration patterns
- [Zustand persist + SSR issue #1145](https://github.com/pmndrs/zustand/issues/1145) -- SSR compatibility

### Tertiary (LOW confidence)
- None

## Project Constraints (from CLAUDE.md)

- **File naming:** kebab-case throughout (applies to new files like `learner-store.ts`, `completion-toggle.tsx`, `resume-bar.tsx`)
- **ADHD constraint:** Zero friction, instant feedback, no confirmation dialogs (aligns with D-02)
- **Demo mode:** Must work in both vault mode and demo mode (aligns with D-07)
- **No database/ORM:** Markdown + flat files + localStorage is correct (no server-side DB for learner state)
- **Content pipeline:** App reads from vault via config; demo mode uses bundled content + synthetic data
- **Tailwind-only styling:** No CSS modules or styled-components; use existing CSS custom properties
- **Testing:** Vitest with jsdom, existing test patterns in `src/lib/progress.test.ts`

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- Zustand is locked decision, version verified, API well-documented
- Architecture: HIGH -- Clean server/client split follows existing Next.js App Router patterns in codebase
- Pitfalls: HIGH -- Hydration mismatch is the #1 documented issue with Zustand persist + Next.js; solutions are well-known

**Research date:** 2026-04-05
**Valid until:** 2026-05-05 (Zustand 5.x API is stable)
