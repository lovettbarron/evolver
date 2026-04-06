---
phase: 15-navigation-progress-enhancements
plan: "02"
subsystem: progress-page
tags: [count-card, practice-metrics, cumulative-metrics, clickable-navigation]
dependency_graph:
  requires: [14-01, 14-02]
  provides: [clickable-count-cards, practice-metrics-utils, cumulative-metrics-component]
  affects: [progress-page, count-card]
tech_stack:
  added: []
  patterns: [TDD-red-green, client-component-metrics, pure-utility-functions]
key_files:
  created:
    - src/lib/practice-metrics.ts
    - src/lib/__tests__/practice-metrics.test.ts
    - src/components/cumulative-metrics.tsx
    - src/components/__tests__/cumulative-metrics.test.tsx
    - src/components/__tests__/count-card.test.tsx
  modified:
    - src/components/count-card.tsx
    - src/lib/progress.ts
    - src/app/instruments/[slug]/progress/page.tsx
decisions:
  - CountCard wrapped in Next.js Link rather than onClick handler for proper anchor semantics
  - CumulativeMetrics is a client component since it needs to call date computation functions
  - ISO week computation uses Thursday-based algorithm per ISO 8601
metrics:
  duration: 5min
  completed: "2026-04-06"
  tasks: 3
  files_created: 5
  files_modified: 3
  test_cases_added: 20
requirements: [PROG-10, PROG-12]
---

# Phase 15 Plan 02: Clickable Count Cards & Cumulative Practice Metrics Summary

Clickable count cards navigating to content lists, plus "Sessions this month" and "Active weeks" cumulative metrics on the progress page with ADHD-friendly additive-only language.

## What Was Done

### Task 1: Clickable CountCard with hover lift (TDD)
- Wrapped CountCard content in Next.js `Link` with `href` prop
- Added hover lift affordance: `translateY(-2px)` + glow shadow on hover
- Added `focus-visible:outline` for keyboard accessibility
- Preserved `aria-label` pattern for screen readers
- 5 test cases covering link rendering, aria-label, hover classes, focus classes
- **Commit:** 3d3206c

### Task 2: Practice metrics utility functions (TDD)
- Created `getSessionsThisMonth()` — counts completions in current calendar month
- Created `getActiveWeeks()` — counts distinct ISO weeks with at least one completion
- Created `getSyntheticCompletionDates()` — generates date Map from journey week data for demo mode
- ISO week key uses Thursday-based algorithm per ISO 8601 standard
- 11 test cases covering edge cases (empty arrays, cross-month, cross-year, same-week dedup)
- **Commit:** 691ad67

### Task 3: CumulativeMetrics component and progress page integration
- Extended `CompletedSessions` interface with `completionDates: Map<number, string>`
- Updated `scanDailyNotes` to extract dates from daily note filenames (YYYY-MM-DD.md)
- Created `CumulativeMetrics` client component with "Practice Activity" section
- Added empty state: "Keep going" heading with encouraging copy
- Added `href` prop to all 4 CountCard instances on progress page
- Wired synthetic completion dates for demo mode via `getSyntheticCompletionDates`
- 4 test cases including guilt-language absence check
- **Commit:** a20811a

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed test assertions using `toHaveAttribute`**
- **Found during:** Task 1
- **Issue:** Project uses Vitest without jest-dom matchers, so `toHaveAttribute` is not available
- **Fix:** Used `getAttribute()` pattern consistent with existing tests
- **Files modified:** src/components/__tests__/count-card.test.tsx

## Pre-existing Test Failures

2 tests in `src/lib/markdown/__tests__/processor.test.ts` fail (heading anchor rendering) — pre-existing, not related to this plan's changes.

## Known Stubs

None. All components are fully wired to real data sources.

## Self-Check: PASSED
