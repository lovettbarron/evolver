# Phase 16: Search & Filtering - Context

**Gathered:** 2026-04-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Users can quickly find any session or patch within the current instrument by searching across titles, descriptions, and tags. Patch browsing gets type/tag filters and sort options. Search is global (nav bar) with a dropdown overlay; filtering is inline on the Patches page.

</domain>

<decisions>
## Implementation Decisions

### Search UX
- **D-01:** Global search bar in the top nav/app shell — always accessible from any page, zero friction to start searching
- **D-02:** Results appear as a dropdown overlay below the search bar as you type — user stays on their current page
- **D-03:** Results grouped by category (Sessions, Patches) in the dropdown with counts
- **D-04:** Search scoped to the current instrument (derived from URL context) — Evolver search only shows Evolver content

### Result Display
- **D-05:** Minimal result items: title + type badge. Sessions show "#NN Title · Module". Patches show "Name [type]"
- **D-06:** Dropdown dismisses on click-away or Escape

### Filter & Sort Controls
- **D-07:** Pill/chip toggles for patch type filtering — horizontal row above the grid: [All] [Bass] [Lead] [Pad] [Drum] [Texture]. Click to toggle, multiple active = OR filter
- **D-08:** Tag filters as a second row of toggleable pills below type filters. Only show tags that exist in current results. Type + tag combine with AND logic (type OR within types, AND with tags)
- **D-09:** Sort control as a small dropdown right-aligned on the same line as type pills: "Sort: Name ▼" with options Name, Date, Type

### Search Scope & Matching
- **D-10:** Search frontmatter fields only: Sessions (title, module, tags, difficulty), Patches (name, description, tags, type). Full markdown body NOT searched
- **D-11:** Case-insensitive substring matching (simple includes()). No fuzzy/typo-tolerant matching. Predictable for a small dataset (~60 sessions, ~36 patches)

### Empty & Loading States
- **D-12:** Search empty: "No results for [query]" with suggestion to try different terms + [Clear search] button
- **D-13:** Filter empty: Contextual message "No [type] patches match your filters" with [Clear filters] button
- **D-14:** Search is client-side (all data already loaded by server components) — no loading spinner needed, results appear instantly as you type

### Claude's Discretion
- Search bar visual treatment (width, placeholder text, icon style)
- Dropdown max height and scroll behavior
- Debounce timing for search input (if any needed)
- Pill/chip visual styling (colors, hover states, active states)
- Sort dropdown implementation details
- Keyboard navigation within search results dropdown
- How filter state persists (URL params, local state, or neither)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/milestones/v1.1-REQUIREMENTS.md` — NAV-03 (full-text search across sessions and patches), NAV-04 (filter patches by type/tags, sort by date/name/type)

### Existing content system
- `src/lib/content/reader.ts` — `listSessions()`, `listPatches()` — server-side data loaders that return all sessions/patches with frontmatter + content
- `src/lib/content/schemas.ts` — `SessionSchema` (title, module, tags, difficulty, output_type), `PatchSchema` (name, type, description, tags, created)
- `src/lib/sessions.ts` — `groupByModule()`, `SessionWithMeta` type
- `src/lib/patches.ts` — `groupByType()`, `getAvailableTypes()`, `PatchWithMeta` type, `TYPE_ORDER` constant

### Pages to modify
- `src/app/instruments/[slug]/sessions/page.tsx` — Session list page (server component, passes data to SessionListClient)
- `src/app/instruments/[slug]/patches/page.tsx` — Patch list page (server component, renders PatchGrid)
- `src/components/patch-grid.tsx` — Patch grid component (integration point for filter/sort controls)
- `src/components/app-shell.tsx` — App shell with navigation (integration point for global search bar)

### Prior phase context
- `.planning/phases/14-learner-state-foundation/14-CONTEXT.md` — Zustand store pattern, server/client component boundary, demo mode detection
- `.planning/phases/15-navigation-progress-enhancements/15-CONTEXT.md` — Session list enhancements, established UI patterns for badges and interactive elements

### Project context
- `.planning/PROJECT.md` — ADHD constraints, zero friction principle, demo/local split, Tailwind-only styling

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `listSessions()` / `listPatches()` in `src/lib/content/reader.ts`: Already load all content with frontmatter — search can filter these in-memory on the client
- `groupByType()` / `getAvailableTypes()` in `src/lib/patches.ts`: Type grouping and available type extraction — directly useful for filter pill generation
- `TYPE_ORDER` in `src/lib/patches.ts`: Canonical type ordering (bass, lead, pad, drum, texture, sequence) — use for filter pill order
- `PatchGrid` component: Existing patch display grid — wrap with filter/sort controls
- `SessionListClient` component: Client-side session list — search overlay results link into this

### Established Patterns
- Server components load data, client components handle interactivity (Next.js App Router)
- Instrument-scoped routing: `/instruments/[slug]/...` — search scope derives from URL slug
- Tailwind-only styling via CSS custom properties
- Zod schemas at content boundary, TypeScript types inferred from schemas
- Demo mode works identically (search/filter operate on whatever data is loaded)

### Integration Points
- **App shell nav**: Add search input component to `app-shell.tsx` navigation bar
- **Patches page**: Wrap `PatchGrid` with filter/sort controls (new client component)
- **Search dropdown**: New client component mounted in app shell, receives all sessions + patches as props from a server component or context
- **Data flow**: Server loads all sessions/patches → passes to client → client-side search/filter/sort (no API calls needed)

</code_context>

<specifics>
## Specific Ideas

- Search should feel like Spotlight/Cmd+K — type and instantly see results without leaving your current page
- Filter pills should feel tactile — clear active/inactive states, instant response
- The dropdown should be compact — show 3-4 results per category max with a "See all N results" link if needed
- Everything is client-side filtering — the dataset is small enough that no server-side search infrastructure is needed

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 16-search-filtering*
*Context gathered: 2026-04-06*
