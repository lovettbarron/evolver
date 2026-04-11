---
phase: 21-cards-content-components
plan: 02
subsystem: ui
tags: [css, cards, className-migration, focus-states, tailwind]

requires:
  - phase: 21-cards-content-components
    plan: 01
    provides: ".card base CSS class, .card-hero variant, :where(:focus-visible) global, editorial prose rules"
provides:
  - "All 5 card components using unified .card CSS class"
  - "HeroCard using .card-hero variant with accent left bar"
  - "CountCard cleaned of inline focus-visible utilities"
  - "SessionRow preserved as non-card list item"
  - "Card unification tests passing (6/6)"
affects: [22-interactive-elements-motion, component-styling]

tech-stack:
  added: []
  patterns: ["CSS class migration: replace inline Tailwind utilities with shared CSS classes"]

key-files:
  created: []
  modified:
    - src/components/hero-card.tsx
    - src/components/patch-card.tsx
    - src/components/module-card.tsx
    - src/components/instrument-card.tsx
    - src/components/count-card.tsx
    - src/components/__tests__/count-card.test.tsx

key-decisions:
  - "SessionRow intentionally excluded from .card migration -- keeps list-item identity"
  - "HeroCard CTA button focus:ring utilities removed in favor of global :where(:focus-visible)"

patterns-established:
  - "Card components use .card CSS class for visual envelope, Tailwind only for layout utilities (flex, block, cursor)"

requirements-completed: [COMP-01, COMP-02, CONTENT-02]

duration: 4min
completed: 2026-04-11
---

# Phase 21 Plan 02: Card Component className Migration Summary

**Migrated all 5 card components to unified .card CSS class, removing 30+ redundant Tailwind utilities per component while preserving layout-specific classes**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-11T06:00:00Z
- **Completed:** 2026-04-11T06:04:00Z
- **Tasks:** 2 (1 auto + 1 human-verify checkpoint)
- **Files modified:** 6

## Accomplishments
- Migrated HeroCard to "card card-hero max-w-[480px] w-full", removed focus:ring from CTA button
- Migrated PatchCard, ModuleCard, InstrumentCard to "card block", removing all inline border/padding/hover/transition utilities
- Migrated CountCard to "card flex flex-col items-center cursor-pointer", removing all inline focus-visible and hover utilities
- SessionRow left unchanged (no .card class) -- preserves its list-item identity with bg-surface hover
- Updated count-card.test.tsx assertions to match new className structure
- All 11 card-related tests pass (6 unification + 5 count-card)
- Visual verification approved: consistent card borders, HeroCard accent bar, keyboard-only focus outlines, editorial session styling

## Task Commits

Each task was committed atomically:

1. **Task 1: Migrate card component classNames to .card base class** - `54349a0` (feat)
2. **Task 2: Visual verification of card unification and editorial styles** - checkpoint, human-approved (no commit)

## Files Created/Modified
- `src/components/hero-card.tsx` - HeroCard with .card .card-hero classes, focus:ring removed from CTA
- `src/components/patch-card.tsx` - PatchCard with "card block"
- `src/components/module-card.tsx` - ModuleCard with "card block"
- `src/components/instrument-card.tsx` - InstrumentCard with "card block"
- `src/components/count-card.tsx` - CountCard with .card class, no inline focus-visible
- `src/components/__tests__/count-card.test.tsx` - Updated assertions for .card class and removed focus-visible checks

## Decisions Made
- SessionRow intentionally excluded from .card migration -- it is a list item, not a card
- HeroCard CTA button focus:ring utilities removed in favor of global :where(:focus-visible) -- consistent keyboard focus across all interactive elements

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - all card components fully migrated and functional.

## Next Phase Readiness
- All card components unified under .card CSS class, ready for Phase 22 motion enhancements
- :where(:focus-visible) providing global keyboard focus indicators
- Card hover states (border-accent + 2px lift + tinted shadow) ready for spring transition upgrade in Phase 22

## Self-Check: PASSED

All key files verified present. Commit 54349a0 verified in git history.

---
*Phase: 21-cards-content-components*
*Completed: 2026-04-11*
