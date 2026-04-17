---
phase: 27-module-navigation-routing
plan: 04
subsystem: ui
tags: [react, typescript, component-rename, interface-collision]

requires:
  - phase: 27-module-navigation-routing
    provides: eurorack ModuleCard component (plan 02)
provides:
  - InstrumentModuleCard component with original instrument sub-module interface
  - module-index.tsx migrated to InstrumentModuleCard
  - card-unification tests updated for InstrumentModuleCard
affects: [module-navigation-routing, instrument-detail-pages]

tech-stack:
  added: []
  patterns: [separate card components for eurorack modules vs instrument sub-modules]

key-files:
  created: [src/components/instrument-module-card.tsx]
  modified: [src/components/module-index.tsx, src/components/__tests__/card-unification.test.tsx]

key-decisions:
  - "InstrumentModuleCard links to /instruments/{slug}/modules/{moduleSlug} path, keeping instrument sub-module routing separate from eurorack /modules/{slug} routing"

patterns-established:
  - "Naming convention: instrument sub-module cards use InstrumentModuleCard, eurorack module cards use ModuleCard"

requirements-completed: [NAV-01]

duration: 2min
completed: 2026-04-17
---

# Phase 27 Plan 04: ModuleCard Interface Collision Fix Summary

**InstrumentModuleCard component created to resolve eurorack vs instrument sub-module ModuleCard naming collision**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-17T21:14:15Z
- **Completed:** 2026-04-17T21:15:44Z
- **Tasks:** 1
- **Files modified:** 3

## Accomplishments
- Created InstrumentModuleCard component with the original instrument sub-module interface (slug, instrumentSlug, title, purpose, category, controlCount, jackCount, hasNormals)
- Updated module-index.tsx to exclusively use InstrumentModuleCard -- zero remaining ModuleCard references
- Updated card-unification.test.tsx to test InstrumentModuleCard instead of the old ModuleCard
- TypeScript compilation passes with zero errors from the collision
- InstrumentModuleCard test passes (5/6 card-unification tests pass; 1 pre-existing HeroCard failure unrelated)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create InstrumentModuleCard and update consumers** - `e51e5c4` (feat)

## Files Created/Modified
- `src/components/instrument-module-card.tsx` - New InstrumentModuleCard component with instrument sub-module interface, links to /instruments/{slug}/modules/{moduleSlug}
- `src/components/module-index.tsx` - Migrated from ModuleCard to InstrumentModuleCard import and usage
- `src/components/__tests__/card-unification.test.tsx` - Updated import and test to use InstrumentModuleCard

## Decisions Made
- InstrumentModuleCard uses the exact same interface as the pre-Phase-27 ModuleCard (slug, instrumentSlug, title, purpose, category, controlCount, jackCount, hasNormals)
- The eurorack ModuleCard in module-card.tsx was left completely untouched

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Pre-existing HeroCard test failure in card-unification.test.tsx (test 1 of 6) -- the HeroCard container class check fails. This is unrelated to the ModuleCard collision fix and was not introduced by this plan's changes. Logged as out of scope.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- The ModuleCard interface collision is fully resolved
- module-index.tsx renders instrument sub-module cards correctly with InstrumentModuleCard
- Eurorack ModuleCard remains untouched for the /modules/ routing flow

## Self-Check: PASSED

- FOUND: src/components/instrument-module-card.tsx
- FOUND: src/components/module-index.tsx
- FOUND: src/components/__tests__/card-unification.test.tsx
- FOUND: .planning/phases/27-module-navigation-routing/27-04-SUMMARY.md
- FOUND: commit e51e5c4

---
*Phase: 27-module-navigation-routing*
*Completed: 2026-04-17*
