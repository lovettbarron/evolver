---
phase: 06-deployment
plan: 02
subsystem: ui
tags: [demo-mode, synthetic-data, nav, about-page]

# Dependency graph
requires:
  - phase: 05-progress
    provides: progress computation and getSyntheticCompletedSessions
provides:
  - Realistic 21-session ADHD-paced synthetic journey data
  - Demo badge in nav when no vault configured
  - Setup CTA in footer and about page for demo visitors
affects: [06-deployment]

# Tech tracking
tech-stack:
  added: []
  patterns: [isDemoMode prop threading from layout through AppShell to Nav]

key-files:
  created: [src/lib/synthetic-daily-notes.ts]
  modified: [src/lib/progress.ts, src/components/nav.tsx, src/components/app-shell.tsx, src/app/about/page.tsx, src/app/layout.tsx]

key-decisions:
  - "Synthetic journey uses 21 sessions (Modules 1-6), not 24, per plan specification"
  - "isDemoMode derived from !config.vaultPath in layout.tsx and threaded as prop"

patterns-established:
  - "isDemoMode prop pattern: server layout derives flag, passes through AppShell to client Nav"

requirements-completed: [DEPL-01, DEPL-03]

# Metrics
duration: 2min
completed: 2026-03-30
---

# Phase 06 Plan 02: Demo Mode Enhancement Summary

**Realistic 21-session ADHD-paced synthetic journey with demo badge in nav and setup CTA on about page**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-30T18:37:56Z
- **Completed:** 2026-03-30T18:40:12Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Created synthetic-daily-notes.ts with 8-week ADHD-paced learning journey (gaps, week-long break)
- Refactored getSyntheticCompletedSessions to return 21 sessions (Modules 1-6 complete)
- Added "Demo" badge to nav bar when no vault path configured
- Added "Run it yourself" footer link and full setup instructions on about page

## Task Commits

Each task was committed atomically:

1. **Task 1: Expand synthetic learner journey data** - `47b5df7` (feat)
2. **Task 2: Add demo badge to nav and setup CTA to about page/footer** - `a860c2c` (feat)

## Files Created/Modified
- `src/lib/synthetic-daily-notes.ts` - Synthetic 8-week ADHD-paced journey data with SYNTHETIC_COMPLETED_SESSIONS and SYNTHETIC_JOURNEY_WEEKS exports
- `src/lib/progress.ts` - Updated to import from synthetic-daily-notes instead of inline set
- `src/lib/progress.test.ts` - Updated test to expect 21 sessions instead of 24
- `src/app/layout.tsx` - Async layout that derives isDemoMode from config
- `src/components/app-shell.tsx` - Accepts isDemoMode prop, shows footer CTA in demo mode
- `src/components/nav.tsx` - Accepts isDemoMode prop, shows Demo badge
- `src/app/about/page.tsx` - Shows "Run It Yourself" setup section in demo mode

## Decisions Made
- Synthetic journey uses exactly 21 sessions (Modules 1-6), matching the plan's module-to-session mapping
- isDemoMode is derived from `!config.vaultPath` in the server-side layout and threaded as a prop

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Updated progress test for new session count**
- **Found during:** Task 1
- **Issue:** Existing test expected 24 sessions, but plan specifies 21
- **Fix:** Updated test assertion from 24 to 21, added check that session 22 is excluded
- **Files modified:** src/lib/progress.test.ts
- **Verification:** npm test passes (298 tests)
- **Committed in:** 47b5df7

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Test update necessary for correctness. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Demo mode fully functional with realistic synthetic data
- Ready for Vercel deployment (06-03)

---
*Phase: 06-deployment*
*Completed: 2026-03-30*
