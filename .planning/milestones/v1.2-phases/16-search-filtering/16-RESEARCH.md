# Phase 16: Search & Filtering - Research

**Researched:** 2026-04-06
**Domain:** Client-side search, filtering, and sort UX in Next.js App Router
**Confidence:** HIGH

## Summary

This phase adds two features to an existing Next.js 15 / React 19 app: (1) a global search bar in the nav with a dropdown overlay, and (2) enhanced filter/sort controls on the Patches page. Both operate entirely client-side on pre-loaded data (~60 sessions, ~36 patches) with no server infrastructure needed.

The architecture is straightforward: server components already load all sessions and patches. The challenge is threading that data to a client component in the nav (which lives in the root layout) and building the search/filter UX per the UI spec. No external libraries are needed -- `String.includes()` for matching, React state for filters, URL search params for filter persistence.

**Primary recommendation:** Build two independent client components (SearchBar + SearchDropdown for nav, PatchFilterBar for patches page). Thread search data via props from root layout through AppShell. Use URL search params for patch filter state (shareable, survives navigation) and ephemeral React state for search query.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Global search bar in the top nav/app shell -- always accessible from any page
- **D-02:** Results appear as a dropdown overlay below the search bar as you type -- user stays on current page
- **D-03:** Results grouped by category (Sessions, Patches) in the dropdown with counts
- **D-04:** Search scoped to the current instrument (derived from URL context)
- **D-05:** Minimal result items: title + type badge. Sessions show "#NN Title . Module". Patches show "Name [type]"
- **D-06:** Dropdown dismisses on click-away or Escape
- **D-07:** Pill/chip toggles for patch type filtering -- horizontal row above grid, OR within types
- **D-08:** Tag filters as second row of toggleable pills. Type + tag combine with AND logic
- **D-09:** Sort control as small dropdown right-aligned: Name, Date, Type
- **D-10:** Search frontmatter fields only (title, module, tags, difficulty for sessions; name, description, tags, type for patches). No full markdown body search
- **D-11:** Case-insensitive substring matching (simple `includes()`). No fuzzy matching
- **D-12:** Search empty: "No results for [query]" with suggestion + [Clear search] button
- **D-13:** Filter empty: Contextual "No [type] patches match your filters" with [Clear filters] button
- **D-14:** Search is client-side (all data already loaded) -- no loading spinner, instant results

### Claude's Discretion
- Search bar visual treatment (width, placeholder text, icon style)
- Dropdown max height and scroll behavior
- Debounce timing for search input (if any needed)
- Pill/chip visual styling (colors, hover states, active states)
- Sort dropdown implementation details
- Keyboard navigation within search results dropdown
- How filter state persists (URL params, local state, or neither)

### Deferred Ideas (OUT OF SCOPE)
None
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-03 | User can search across all sessions and patches by title, description, and tags via full-text search | SearchBar + SearchDropdown components in nav; client-side `includes()` matching on frontmatter fields from existing `listSessions()`/`listPatches()` data |
| NAV-04 | User can filter patches by type and tags, and sort by date, name, or type | PatchFilterBar component wrapping PatchGrid; multi-select type pills, tag pills, sort dropdown; URL param persistence |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React 19 | 19.x | UI components, state management | Already in project |
| Next.js 15 | 15.x | App Router, server/client boundary | Already in project |
| clsx | 2.1.x | Conditional class merging | Already in project, used in nav.tsx |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/navigation | (bundled) | `useSearchParams`, `useRouter`, `usePathname` for URL state | Filter/sort persistence on patches page |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Raw `includes()` | Fuse.js (fuzzy search) | D-11 explicitly locks to substring matching -- fuzzy is out of scope |
| URL params | Zustand store | URL params are shareable, survive refresh, already used by PatchGrid |
| Custom dropdown | cmdk / headless-ui | Overkill for a single dropdown with 3 options; project convention is hand-built Tailwind |

**Installation:**
```bash
# No new packages needed -- everything is already in the project
```

## Architecture Patterns

### Data Flow: Search

```
RootLayout (server)
  -> loadConfig(), discoverInstruments(), loadInstrumentConfig()
  -> listSessions(slug, config) + listPatches(slug, config)  [NEW: per instrument]
  -> AppShell (server component wrapper)
    -> Nav (client) receives searchable data as serialized props
      -> SearchBar (client) + SearchDropdown (client)
```

**Key challenge:** The root layout currently does NOT load sessions/patches -- it only loads instrument configs. Search data must be threaded somehow. Two viable approaches:

**Option A (Recommended): React Context provider in root layout**
- Root layout loads all sessions + patches for all instruments
- Passes to a `<SearchProvider>` context that wraps children
- SearchBar reads from context, filters by current instrument slug from URL
- Pros: clean separation, data loaded once at server boundary
- Cons: all instrument data serialized to client (but dataset is tiny: ~96 items total)

**Option B: Instrument-scoped layout**
- Each `/instruments/[slug]/layout.tsx` loads sessions + patches for that instrument
- Passes to SearchBar via context or props
- Pros: only loads current instrument data
- Cons: search not available on home page (acceptable per D-04 which scopes to current instrument); need to create instrument layout if one does not exist

**Recommendation:** Option A is simpler. The total data for search is lightweight (just frontmatter fields, no markdown content). Serialize a minimal search index (title, module, tags, type, slug, session_number) rather than full content objects.

### Data Flow: Patch Filters

```
PatchListPage (server)
  -> listPatches(slug, config)
  -> PatchFilterBar (client) wraps PatchGrid
    -> URL params: ?type=bass,lead&tag=dark&sort=date
    -> Filters patches in-memory
    -> Passes filtered patches to PatchGrid
```

This mirrors the existing PatchGrid pattern which already uses `useSearchParams` for single-type filtering. The enhancement: multi-select types, tag pills, and sort.

### Recommended Component Structure
```
src/
  components/
    search-bar.tsx          # Input + keyboard shortcuts + focus management
    search-dropdown.tsx     # Overlay with grouped results
    search-provider.tsx     # Context providing searchable data
    patch-filter-bar.tsx    # Type pills + tag pills + sort dropdown
  lib/
    search.ts               # Pure search/filter functions (testable)
```

### Pattern 1: Searchable Data Index
**What:** Create a minimal serializable index of frontmatter fields for search
**When to use:** When passing search data from server to client components

```typescript
// src/lib/search.ts
export interface SearchableSession {
  slug: string;
  title: string;
  module: string;
  tags: string[];
  difficulty: string;
  sessionNumber: number;
  instrument: string;
}

export interface SearchablePatch {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  type: string;
  instrument: string;
}

export type SearchResult =
  | { kind: 'session'; item: SearchableSession }
  | { kind: 'patch'; item: SearchablePatch };

export function searchItems(
  query: string,
  sessions: SearchableSession[],
  patches: SearchablePatch[],
  instrumentSlug: string,
): { sessions: SearchableSession[]; patches: SearchablePatch[] } {
  const q = query.toLowerCase().trim();
  if (!q) return { sessions: [], patches: [] };

  const matchedSessions = sessions
    .filter((s) => s.instrument === instrumentSlug)
    .filter((s) =>
      s.title.toLowerCase().includes(q) ||
      s.module.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)) ||
      s.difficulty.toLowerCase().includes(q)
    );

  const matchedPatches = patches
    .filter((p) => p.instrument === instrumentSlug)
    .filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.type.toLowerCase().includes(q)
    );

  return { sessions: matchedSessions, patches: matchedPatches };
}
```

### Pattern 2: Multi-Select Filter with URL Params
**What:** Extend existing PatchGrid URL param pattern to support multiple types + tags + sort
**When to use:** Patch filter bar

```typescript
// URL: ?type=bass,lead&tag=dark,ambient&sort=date
const types = searchParams.get('type')?.split(',').filter(Boolean) ?? [];
const tags = searchParams.get('tag')?.split(',').filter(Boolean) ?? [];
const sort = searchParams.get('sort') ?? 'name';

// Filter: type OR within types, AND with tags
let filtered = patches;
if (types.length > 0) {
  filtered = filtered.filter((p) => types.includes(p.data.type));
}
if (tags.length > 0) {
  filtered = filtered.filter((p) =>
    p.data.tags.some((t) => tags.includes(t))
  );
}

// Sort
filtered.sort((a, b) => {
  switch (sort) {
    case 'date': return b.data.created.localeCompare(a.data.created);
    case 'type': return a.data.type.localeCompare(b.data.type);
    default: return a.data.name.localeCompare(b.data.name);
  }
});
```

### Pattern 3: Click-Outside Dismiss
**What:** Close dropdown when clicking outside the search area
**When to use:** SearchDropdown dismiss behavior

```typescript
useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);
```

### Pattern 4: Global Keyboard Shortcut
**What:** `/` to focus search from anywhere
**When to use:** SearchBar keyboard shortcut per UI spec

```typescript
useEffect(() => {
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
      e.preventDefault();
      inputRef.current?.focus();
    }
  }
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);
```

### Anti-Patterns to Avoid
- **Fetching search data on every keystroke:** All data is already loaded client-side. Never add API calls for search
- **Debouncing search input:** D-14 says instant results. The dataset is ~96 items -- no debounce needed
- **Storing search query in URL:** D-14 says search is ephemeral. Only patch filters go in URL params
- **Searching markdown body content:** D-10 restricts to frontmatter fields only

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| URL search param parsing | Custom parser | `useSearchParams` from next/navigation | Already used by PatchGrid, handles encoding/decoding |
| Focus trap in dropdown | Custom focus management | Simple `onKeyDown` handler with index tracking | Full focus trap is overkill for a search dropdown |

**Key insight:** This phase is deliberately simple -- substring matching on a tiny dataset with standard React state patterns. The complexity is in UX polish (keyboard nav, focus management, transitions), not in data infrastructure.

## Common Pitfalls

### Pitfall 1: Server/Client Component Boundary for Search Data
**What goes wrong:** Trying to pass session/patch data from the root layout (server) to a client component (SearchBar) in the nav without proper serialization
**Why it happens:** Root layout is a server component; Nav is 'use client'. Passing non-serializable data (functions, Dates) across the boundary fails silently in Next.js 15
**How to avoid:** Create a minimal serializable search index (plain objects with string/number/array fields only). Strip markdown content, keep only frontmatter fields
**Warning signs:** "Functions cannot be passed directly to Client Components" error; hydration mismatches

### Pitfall 2: Stale Search Results After Navigation
**What goes wrong:** Search dropdown shows results for a previous instrument after switching instruments
**Why it happens:** The search input retains its query but the instrument context (from URL) changed
**How to avoid:** Clear search query when instrument slug changes (detect via `usePathname`)
**Warning signs:** Search results showing Cascadia sessions while on Evolver pages

### Pitfall 3: PatchGrid Regression from Filter Enhancement
**What goes wrong:** Existing single-type filter breaks when upgrading to multi-select
**Why it happens:** Current PatchGrid uses `?type=bass` (single value). New multi-select uses `?type=bass,lead` (comma-separated)
**How to avoid:** Replace PatchGrid's filter logic wholesale with PatchFilterBar. Ensure backward compat: `?type=bass` still works (single value = array of one)
**Warning signs:** Type filter pills not highlighting correctly; "All" button logic broken

### Pitfall 4: Dropdown Z-Index Conflicts
**What goes wrong:** Search dropdown renders behind other page content
**Why it happens:** Nav is fixed/sticky; dropdown needs to appear above all page content
**How to avoid:** Use `z-50` on the dropdown, ensure it's absolutely positioned relative to the search input container
**Warning signs:** Dropdown partially hidden behind hero cards or session lists

### Pitfall 5: Keyboard Navigation Index Out of Bounds
**What goes wrong:** ArrowDown/ArrowUp navigation crashes or wraps incorrectly when result count changes mid-typing
**Why it happens:** Focused index state not reset when search results change
**How to avoid:** Reset focused index to -1 (no focus) whenever the query changes. Clamp index on ArrowDown/ArrowUp
**Warning signs:** Enter navigates to wrong result; focus ring appears on non-existent item

## Code Examples

### Existing PatchGrid Filter Pattern (to extend)
```typescript
// Source: src/components/patch-grid.tsx lines 16-26
const activeType = searchParams.get('type') ?? 'all';

function setFilter(type: string) {
  const params = new URLSearchParams(searchParams.toString());
  if (type === 'all') params.delete('type');
  else params.set('type', type);
  router.replace(`${pathname}?${params.toString()}`);
}
```

### Root Layout Data Loading (current)
```typescript
// Source: src/app/layout.tsx lines 24-34
// Currently loads: config, isDemoMode, instrument slugs + configs
// Does NOT load: sessions, patches
// Phase 16 must add: session/patch loading for search index
```

### Nav Component (integration point)
```typescript
// Source: src/components/nav.tsx lines 44-78
// Search bar goes between InstrumentSwitcher and the nav links div
// Currently: <InstrumentSwitcher /> ... <div className="flex items-center gap-md overflow-x-auto ml-auto">
// After: <InstrumentSwitcher /> <SearchBar /> <div className="flex ...">
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Single type filter (PatchGrid) | Multi-select type + tag + sort (PatchFilterBar) | Phase 16 | PatchGrid filter tabs replaced by PatchFilterBar |
| No search | Global search in nav | Phase 16 | AppShell/Nav get search data props |

**Deprecated/outdated:**
- PatchGrid's built-in single-type filter tabs will be superseded by PatchFilterBar (but PatchGrid itself remains as the rendering component)

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest + jsdom |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-03 | Search matches sessions by title, module, tags, difficulty | unit | `npx vitest run src/lib/__tests__/search.test.ts -t "session search" -x` | Wave 0 |
| NAV-03 | Search matches patches by name, description, tags, type | unit | `npx vitest run src/lib/__tests__/search.test.ts -t "patch search" -x` | Wave 0 |
| NAV-03 | Search scoped to current instrument | unit | `npx vitest run src/lib/__tests__/search.test.ts -t "instrument scope" -x` | Wave 0 |
| NAV-03 | Case-insensitive substring matching | unit | `npx vitest run src/lib/__tests__/search.test.ts -t "case insensitive" -x` | Wave 0 |
| NAV-04 | Multi-type filter (OR within types) | unit | `npx vitest run src/lib/__tests__/search.test.ts -t "type filter" -x` | Wave 0 |
| NAV-04 | Tag filter (AND with types, OR within tags) | unit | `npx vitest run src/lib/__tests__/search.test.ts -t "tag filter" -x` | Wave 0 |
| NAV-04 | Sort by name, date, type | unit | `npx vitest run src/lib/__tests__/search.test.ts -t "sort" -x` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run src/lib/__tests__/search.test.ts -x`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/lib/__tests__/search.test.ts` -- covers all NAV-03 and NAV-04 search/filter/sort logic
- [ ] `src/lib/search.ts` -- pure function module (testable without DOM)

## Open Questions

1. **Search data loading in root layout**
   - What we know: Root layout currently loads only instrument configs, not sessions/patches
   - What's unclear: Whether loading all sessions + patches for all instruments in the root layout is acceptable from a performance perspective
   - Recommendation: It should be fine -- total dataset is ~96 items, frontmatter only. Create a minimal search index to minimize serialization cost. If instruments grow, revisit with lazy loading per instrument

2. **"See all N results" link destination**
   - What we know: UI spec says "See all N sessions" links to `/instruments/{slug}/sessions?q={query}`
   - What's unclear: The sessions page does not currently support a `?q=` param for filtering
   - Recommendation: Phase can add `?q=` support to sessions page as a stretch, or the link can simply navigate to sessions page without filtering. The dropdown itself shows results -- the link is a convenience

## Sources

### Primary (HIGH confidence)
- `src/components/patch-grid.tsx` -- existing URL param filter pattern, pill styling
- `src/components/nav.tsx` -- integration point for search bar
- `src/app/layout.tsx` -- root layout data loading pattern
- `src/lib/content/reader.ts` -- `listSessions()`, `listPatches()` server-side loaders
- `src/lib/content/schemas.ts` -- `SessionSchema`, `PatchSchema` field definitions
- `src/lib/patches.ts` -- `TYPE_ORDER`, `getAvailableTypes()`, `groupByType()`
- `16-UI-SPEC.md` -- complete visual/interaction contract for all components
- `16-CONTEXT.md` -- all locked decisions (D-01 through D-14)

### Secondary (MEDIUM confidence)
- Next.js App Router server/client boundary patterns (from project's existing usage)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - no new dependencies, all patterns already in codebase
- Architecture: HIGH - extends existing data flow patterns (PatchGrid URL params, server-to-client prop passing)
- Pitfalls: HIGH - identified from reading actual source code and understanding the server/client boundary

**Research date:** 2026-04-06
**Valid until:** 2026-05-06 (stable -- no external dependencies to go stale)
