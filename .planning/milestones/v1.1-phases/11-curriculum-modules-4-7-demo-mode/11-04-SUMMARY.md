---
phase: 11-curriculum-modules-4-7-demo-mode
plan: 04
subsystem: ui
tags: [demo-mode, synthetic-data, progress, bundling, cascadia]

requires:
  - phase: 11-plans-01-03
    provides: 25 sessions and 23+ patches in project root
provides:
  - Cascadia synthetic journey data (12 sessions, 6-week ADHD pacing)
  - Instrument-aware getSyntheticCompletedSessions() function
  - Bundled Cascadia content in src/content/ for Vercel demo mode
  - Build verification with all content
affects: [verification, demo-mode]

tech-stack:
  added: []
  patterns: [instrument-aware-synthetic-data]

key-files:
  created: []
  modified:
    - src/lib/synthetic-daily-notes.ts
    - src/lib/progress.ts
    - src/app/instruments/[slug]/progress/page.tsx
    - src/lib/progress.test.ts

key-decisions:
  - "Demo patches copied from src/content/ to project root to survive bundle-content cpSync"
  - "Cascadia journey shows 12/25 sessions (~48%), Modules 1-4 complete"
  - "getSyntheticCompletedSessions() defaults to Evolver for backward compatibility"

patterns-established:
  - "Instrument-specific synthetic journey data via optional slug parameter"

requirements-completed: [CDEMO-01, CDEMO-02, CDEMO-03]

duration: 10min
completed: 2026-04-04
---

# Plan 11-04: Demo Mode Bundling

**Cascadia synthetic journey data added, progress page made instrument-aware, all content bundled and build verified for Vercel demo mode.**

## Self-Check: PASSED

- [x] SYNTHETIC_CASCADIA_COMPLETED_SESSIONS has 12 entries (sessions 1-12)
- [x] SYNTHETIC_CASCADIA_JOURNEY_WEEKS has 6 entries totaling 12 sessions
- [x] getSyntheticCompletedSessions('cascadia') returns 12-session Set
- [x] getSyntheticCompletedSessions() returns 21-session Set (backward compat)
- [x] Progress page passes slug to getSyntheticCompletedSessions
- [x] 25 Cascadia sessions bundled in src/content/sessions/cascadia/
- [x] 23+ Cascadia patches bundled in src/content/patches/cascadia/
- [x] npm run build succeeds
- [x] All new tests pass
