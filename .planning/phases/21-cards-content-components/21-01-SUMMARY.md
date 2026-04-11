---
phase: 21-cards-content-components
plan: 01
subsystem: ui
tags: [css, cards, focus-states, prose, editorial-layout]

requires:
  - phase: 18-token-foundation
    provides: "OKLCH tokens, spacing scale, surface elevations"
  - phase: 19-prose-typography
    provides: "Prose plugin integration, typography rules"
  - phase: 20-layout-shell-navigation
    provides: "Layout shells, per-instrument accent via [data-instrument]"
provides:
  - ".card base CSS class with hover states"
  - ".card-hero variant with accent left bar"
  - "Global :where(:focus-visible) keyboard focus indicator"
  - "Editorial prose: accent step markers, subtle dividers, inline code pills"
  - "Card unification test scaffold (failing until Plan 02)"
affects: [21-02-PLAN, component-migration]

tech-stack:
  added: []
  patterns: [":where() zero-specificity for global defaults with component override"]

key-files:
  created:
    - src/components/__tests__/card-unification.test.tsx
  modified:
    - src/app/globals.css

key-decisions:
  - "Used :where(:focus-visible) for zero specificity so Tailwind utility overrides win naturally"
  - "Inline code pill uses surface-raised bg + 2px accent left border for visual distinction"

patterns-established:
  - "Card CSS class pattern: .card base + .card-{variant} for specialized treatments"
  - ":where() wrapper for global defaults that components can override without specificity wars"

requirements-completed: [COMP-01, COMP-02, CONTENT-02]

duration: 3min
completed: 2026-04-11
---

# Phase 21 Plan 01: Cards & Content CSS Foundation Summary

**Shared .card CSS class with hover lift, .card-hero accent bar variant, global :where(:focus-visible), and editorial prose rules for step markers, dividers, and inline code pills**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-11T05:55:40Z
- **Completed:** 2026-04-11T05:58:47Z
- **Tasks:** 3
- **Files modified:** 2

## Accomplishments
- Created .card base class with 8px radius, surface bg, subtle border, and hover state (accent border + 2px lift + tinted shadow)
- Created .card-hero variant with 3px accent left bar and asymmetric border-radius
- Added global :where(:focus-visible) with zero specificity for keyboard focus indication
- Added editorial prose rules: accent step markers (::marker), subtle hr dividers, inline code pill with accent left border
- Created test scaffold verifying all 5 card components adopt .card class (tests fail until Plan 02)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add .card base class, .card-hero variant, and :focus-visible global** - `b90f203` (feat)
2. **Task 2: Add editorial prose styles (step markers, section dividers, inline code pill)** - `768c424` (feat)
3. **Task 3: Create card unification test scaffold** - `0d5649c` (test)

## Files Created/Modified
- `src/app/globals.css` - Added .card/.card-hero classes, :where(:focus-visible), prose editorial rules (markers, hr, code pill)
- `src/components/__tests__/card-unification.test.tsx` - Test scaffold for 6 components: 5 card tests (expect .card class) + 1 SessionRow test (expect NO .card class)

## Decisions Made
- Used `:where(:focus-visible)` instead of bare `:focus-visible` for zero specificity -- component-level Tailwind utilities (outline-none, ring-*) naturally override it without per-component suppressions
- Updated `--tw-prose-hr` from `var(--color-muted)` to `var(--color-border-subtle)` to match D-09 subtle divider intent

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - all CSS rules are complete and functional.

## Next Phase Readiness
- .card and .card-hero CSS classes ready for Plan 02 component migration
- Test scaffold will validate migration: 5 tests will turn green as components adopt .card class
- :where(:focus-visible) is live and already providing keyboard focus indicators globally

---
*Phase: 21-cards-content-components*
*Completed: 2026-04-11*
