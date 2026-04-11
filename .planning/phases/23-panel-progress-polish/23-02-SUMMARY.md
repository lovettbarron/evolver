---
phase: 23-panel-progress-polish
plan: 02
subsystem: progress-visualization
tags: [heatmap, practice-metrics, css-grid, data-viz]

requires:
  - phase: 23-panel-progress-polish
    provides: Wave 0 test stubs for heatmap (23-00)
provides:
  - PracticeHeatmap component with 12-week CSS grid and accent intensity
  - getHeatmapData utility for Monday-aligned date grid computation
affects:
  - src/app/instruments/[slug]/progress/page.tsx (CumulativeMetrics replaced)

tech-stack:
  added: []
  patterns: [CSS grid heatmap, color-mix intensity scale, Monday-aligned date grid]

key-files:
  created:
    - src/components/practice-heatmap.tsx
    - src/components/__tests__/practice-heatmap.test.tsx
  modified:
    - src/lib/practice-metrics.ts
    - src/lib/__tests__/practice-metrics.test.ts
    - src/app/instruments/[slug]/progress/page.tsx

decisions:
  - "Heatmap uses inline styles for CSS grid layout (consistent with existing component patterns)"
  - "Day labels rendered as separate column beside grid for alignment control"

metrics:
  duration: 123s
  completed: 2026-04-11
  tasks: 2
  files: 5
---

# Phase 23 Plan 02: Practice Heatmap Summary

**One-liner:** GitHub-style 12-week practice heatmap with accent-colored intensity cells replacing text-only CumulativeMetrics on progress page.

## What Was Done

### Task 1: getHeatmapData utility + tests (7e9c1b1)
- Added `getHeatmapData(completionDates, weeks)` to `practice-metrics.ts`
- Returns cells with date, count, dayOfWeek (Monday=0), and weekIndex
- Aligns start date backward to Monday for clean week columns
- 4 tests: Monday alignment, 12-week default, per-date counting, zero-count empty

### Task 2: PracticeHeatmap component + progress page wiring (aee865f)
- Created `practice-heatmap.tsx` as 'use client' component
- CSS grid layout: 7 rows (Mon-Sun) x N columns (weeks), 12px cells, 4px gap
- 4-level intensity scale using `color-mix(in oklch, var(--color-accent) N%, transparent)`
- Empty state with encouraging message when no practice data exists
- Day labels (Mon/Wed/Fri) in left column, legend (Less/More) right-aligned below
- Native title tooltips on each cell: "{date}: {N} session(s)"
- Swapped CumulativeMetrics import for PracticeHeatmap in progress page
- 6 component tests: grid cells, empty state, intensity, day labels, legend, heading

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Wave 0 test stubs did not exist**
- **Found during:** Task 1
- **Issue:** Plan referenced Wave 0 stubs (it.todo blocks) in test files, but no heatmap stubs existed
- **Fix:** Created tests from scratch following the plan's test specifications
- **Files modified:** src/lib/__tests__/practice-metrics.test.ts, src/components/__tests__/practice-heatmap.test.tsx

## Verification

- `npx vitest run src/lib/__tests__/practice-metrics.test.ts` -- 15 tests pass (including 4 new getHeatmapData tests)
- `npx vitest run src/components/__tests__/practice-heatmap.test.tsx` -- 6 tests pass
- Full suite: 605 pass, 4 fail (pre-existing markdown processor failures, unrelated)
- Progress page imports PracticeHeatmap, not CumulativeMetrics

## Known Stubs

None -- all data flows are wired (completionDates -> getHeatmapData -> PracticeHeatmap grid cells).

## Self-Check: PASSED

- All 5 key files exist on disk
- Both commit hashes (7e9c1b1, aee865f) found in git log
