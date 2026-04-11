---
phase: 23-panel-progress-polish
plan: 00
subsystem: testing
tags: [vitest, tdd, heatmap, panel-animation, design-tokens]

requires:
  - phase: 22-motion-interaction
    provides: motion.svg pattern and SpringCard wrapper for panel/card animation
provides:
  - Failing test stubs for heatmap component (6 todos)
  - Failing test stubs for getHeatmapData utility (4 todos)
  - Failing test stubs for panel viewBox animation (6 todos across 2 panels)
  - Failing test stubs for accent color audit (3 todos)
affects: [23-01, 23-02, 23-03]

tech-stack:
  added: []
  patterns: [it.todo stubs for wave-0 test-first scaffolding]

key-files:
  created:
    - src/components/__tests__/practice-heatmap.test.tsx
  modified:
    - src/lib/__tests__/practice-metrics.test.ts
    - src/components/__tests__/evolver-panel.test.tsx
    - src/components/__tests__/cascadia-panel.test.tsx
    - src/app/__tests__/tokens.test.ts

key-decisions:
  - "Used it.todo() for all stubs to keep suite green while signaling implementation targets"

patterns-established:
  - "Wave 0 test-first: create it.todo stubs before implementation waves begin"

requirements-completed: [SPEC-01, SPEC-02, TOKEN-06]

duration: 2min
completed: 2026-04-11
---

# Phase 23 Plan 00: Wave 0 Test Stubs Summary

**19 it.todo test stubs across 5 files covering heatmap, panel viewBox animation, and accent color audit**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-11T20:28:47Z
- **Completed:** 2026-04-11T20:30:51Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Created practice-heatmap.test.tsx with 6 todo stubs for grid rendering, empty state, intensity levels, day labels, legend, and section heading
- Extended practice-metrics.test.ts with 4 todo stubs for getHeatmapData utility (Monday alignment, 12-week range, session counting, zero-count cells)
- Extended both panel test files with 3 todo stubs each for motion.svg viewBox animation
- Extended tokens.test.ts with 3 todo stubs for hardcoded lime accent color audit

## Task Commits

Each task was committed atomically:

1. **Task 1: Create heatmap test stubs + extend practice-metrics tests** - `222c031` (test)
2. **Task 2: Extend panel tests + tokens tests for Phase 23 assertions** - `0ce654b` (test)

## Files Created/Modified
- `src/components/__tests__/practice-heatmap.test.tsx` - New file with 6 it.todo stubs for PracticeHeatmap component
- `src/lib/__tests__/practice-metrics.test.ts` - Extended with 4 it.todo stubs for getHeatmapData
- `src/components/__tests__/evolver-panel.test.tsx` - Extended with 3 it.todo stubs for viewBox animation
- `src/components/__tests__/cascadia-panel.test.tsx` - Extended with 3 it.todo stubs for viewBox animation
- `src/app/__tests__/tokens.test.ts` - Extended with 3 it.todo stubs for accent color audit

## Decisions Made
- Used it.todo() instead of throwing stubs to keep the test suite green during Wave 0

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 19 test stubs ready as targets for Wave 1 implementation plans (23-01 through 23-03)
- Stubs cover: heatmap component, heatmap data utility, panel viewBox animation, accent token audit

---
*Phase: 23-panel-progress-polish*
*Completed: 2026-04-11*
