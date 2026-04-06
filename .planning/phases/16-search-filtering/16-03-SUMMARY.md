---
phase: 16-search-filtering
plan: 03
subsystem: patches-ui
tags: [react, filter-bar, url-params, multi-select, patches]

requires:
  - "Pure search/filter/sort functions from 16-01 (filterPatches, sortPatches, toSearchablePatch)"
  - "PatchGrid component (simplified in this plan)"
provides:
  - "PatchFilterBar component with multi-select type pills, tag pills, sort dropdown, URL param persistence"
  - "Simplified PatchGrid as pure renderer without built-in filter tabs"
affects:
  - "src/app/instruments/[slug]/patches/page.tsx (now renders PatchFilterBar instead of PatchGrid)"

tech_stack:
  added: []
  patterns:
    - "URL param state management via useSearchParams/useRouter for filter persistence"
    - "Conditional rendering: grouped PatchGrid when unfiltered, flat PatchCard grid when filtered"
    - "Dynamic tag computation from type-filtered results"

key_files:
  created:
    - src/components/patch-filter-bar.tsx
  modified:
    - src/components/patch-grid.tsx
    - src/app/instruments/[slug]/patches/page.tsx

decisions:
  - "Preserve grouped-by-type PatchGrid view when no filters active (no UX regression)"
  - "Render flat PatchCard grid when filters active (type grouping irrelevant for filtered subsets)"
  - "Tag pills dynamically reflect only tags present in type-filtered results"
  - "All-types-selected clears to equivalent All state rather than listing all types in URL"

metrics:
  duration: "3min"
  completed: "2026-04-06"
  tasks: 2
  files: 3
---

# Phase 16 Plan 03: Patch Filter Bar Summary

PatchFilterBar with multi-select type pills (OR), tag pills (AND with types), sort dropdown (Name/Date/Type), and URL param persistence replacing PatchGrid's built-in single-type filter

## What Was Built

### Task 1: PatchFilterBar component (653b23f)
- Created `src/components/patch-filter-bar.tsx` as a 'use client' component
- Multi-select type pills with OR logic and "All" toggle
- Tag pills computed from type-filtered results, AND logic between type and tag groups
- Sort dropdown (Name/Date/Type) with click-outside dismiss
- URL param persistence: `?type=bass,lead&tag=dark&sort=date`
- Backward compatible with existing `?type=bass` single value
- Grouped PatchGrid view when no filters active, flat PatchCard grid when filtered
- Empty state with contextual message and "Clear filters" button

### Task 2: Simplify PatchGrid and wire PatchFilterBar (3ab5d9d)
- Simplified `patch-grid.tsx`: removed useSearchParams, useRouter, usePathname, filter tabs, setFilter logic
- PatchGrid is now a pure renderer that takes patches and displays them grouped by type
- Updated `patches/page.tsx` to import and render PatchFilterBar instead of PatchGrid
- Kept Suspense wrapper around PatchFilterBar (uses useSearchParams)

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

- TypeScript: No errors in any modified/created files (pre-existing errors in unrelated test files only)
- Tests: 40/41 test files pass, 519/521 tests pass (2 pre-existing failures in markdown processor tests)
- All acceptance criteria met for both tasks

## Self-Check: PASSED
