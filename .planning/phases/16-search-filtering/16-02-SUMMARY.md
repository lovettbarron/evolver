---
phase: 16-search-filtering
plan: 02
subsystem: search-ui
tags: [react, context, search-bar, dropdown, keyboard-nav, next-js]
dependency_graph:
  requires: [16-01]
  provides: [SearchProvider, SearchBar, SearchDropdown]
  affects: [nav, app-shell, layout]
tech_stack:
  added: []
  patterns: [react-context, click-outside-handler, keyboard-shortcuts]
key_files:
  created:
    - src/components/search-provider.tsx
    - src/components/search-bar.tsx
    - src/components/search-dropdown.tsx
  modified:
    - src/app/layout.tsx
    - src/components/app-shell.tsx
    - src/components/nav.tsx
decisions:
  - SearchProvider wraps at AppShell level so all client components can access search data
  - Search bar hidden on non-instrument pages (home, about) per D-04 instrument-scoped search
  - Dropdown shows max 4 results per category with "See all" links to filtered list pages
metrics:
  duration: 5min
  completed: "2026-04-06T20:17:19Z"
---

# Phase 16 Plan 02: Global Search Bar UI Summary

SearchBar in nav with instant dropdown overlay, keyboard navigation, and SearchProvider context feeding searchable session/patch data from root layout.

## What Was Built

### SearchProvider Context (`search-provider.tsx`)
- React context providing `SearchableSession[]` and `SearchablePatch[]` to all client components
- `useSearchData()` hook for consumer access
- Wraps entire app at the AppShell level, fed by data loaded in root layout

### Data Loading (`layout.tsx`)
- Root layout now loads all sessions and patches for all instruments at build time
- Converts to searchable format via `toSearchableSession` / `toSearchablePatch`
- Threads data through AppShell props to SearchProvider

### SearchBar Component (`search-bar.tsx`)
- Embedded in nav between InstrumentSwitcher and nav links
- Expands from 200px to 320px on focus with smooth transition
- Magnifying glass icon (muted -> accent on focus)
- Clear button appears when query is non-empty
- Global `/` shortcut focuses the search input
- Escape clears query or blurs input
- Arrow keys navigate dropdown results, Enter selects
- Focused index resets on query change
- Query clears on instrument change
- Click-outside dismisses dropdown
- Hidden on non-instrument pages

### SearchDropdown Component (`search-dropdown.tsx`)
- Absolute-positioned overlay below search input
- Sessions section: header with count badge, up to 4 items showing `#number title` + module
- Patches section: header with count badge, up to 4 items showing name + `[type]` badge
- "See all N sessions/patches" links when results exceed 4
- Empty state with "No results for ..." message and Clear button
- Keyboard-focused item highlighted with ring

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | 9ff46bb | SearchProvider context + data loading in layout |
| 2 | 253e047 | SearchBar and SearchDropdown components in Nav |

## Deviations from Plan

None - plan executed exactly as written.

## Pre-existing Issues (Out of Scope)

- TypeScript build error in `src/app/instruments/[slug]/panel/page.tsx` line 127: SignalType 'gate' not assignable to CascadiaPanel cables union type. Pre-exists on main branch.
- 8 pre-existing test failures in markdown processor tests (heading anchors). Not related to search changes.

## Self-Check: PASSED
