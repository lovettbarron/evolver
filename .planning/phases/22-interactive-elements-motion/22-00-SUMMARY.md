---
phase: 22-interactive-elements-motion
plan: 00
subsystem: testing
tags: [vitest, motion, react-testing-library, spring-animation, reduced-motion]

requires:
  - phase: 21-cards-content-components
    provides: Card components with .card CSS class pattern
provides:
  - 5 vitest test stubs defining behavioral contracts for all Phase 22 motion components
  - Test coverage for COMP-03 (spring hover, completion celebration) and COMP-04 (scroll reveal, stagger)
  - D-09 reduced motion compliance test suite
affects: [22-01-PLAN, 22-02-PLAN]

tech-stack:
  added: []
  patterns: [motion/react mock strategy with data-attribute prop exposure, useReducedMotion toggle pattern]

key-files:
  created:
    - src/components/__tests__/spring-card.test.tsx
    - src/components/__tests__/completion-celebration.test.tsx
    - src/components/__tests__/scroll-reveal.test.tsx
    - src/components/__tests__/stagger-group.test.tsx
    - src/components/__tests__/reduced-motion.test.tsx
  modified: []

key-decisions:
  - "Mock motion/react via data-attributes on DOM elements to assert animation props without running actual animations"
  - "Tests import from expected component paths; will fail at import until 22-01/22-02 create components (RED state)"

patterns-established:
  - "Motion mock pattern: vi.mock motion/react with data-testid and data-* attributes for prop inspection"
  - "Reduced motion testing: separate test file for cross-cutting D-09 compliance across all motion components"

requirements-completed: [COMP-03, COMP-04]

duration: 4min
completed: 2026-04-11
---

# Phase 22 Plan 00: Wave 0 Test Stubs Summary

**5 vitest test stubs defining behavioral contracts for spring hover, completion celebration, scroll reveal, stagger groups, and reduced motion compliance**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-11T15:36:42Z
- **Completed:** 2026-04-11T15:41:22Z
- **Tasks:** 1
- **Files modified:** 5

## Accomplishments
- Created 5 test files covering COMP-03a (spring hover config), COMP-03b/c (completion celebration spring + fade), COMP-04a (scroll reveal fade-up), COMP-04b (stagger timing), and D-09 (reduced motion)
- Established motion/react mock pattern using data-attributes for prop inspection without running actual animations
- Tests are in RED state -- they will fail at import until plans 22-01 and 22-02 create the motion components

## Task Commits

Each task was committed atomically:

1. **Task 1: Create motion component test stubs** - `72b1575` (test)

## Files Created/Modified
- `src/components/__tests__/spring-card.test.tsx` - Tests SpringCard spring hover config (stiffness 400, damping 28), className passthrough, reduced motion fallback
- `src/components/__tests__/completion-celebration.test.tsx` - Tests CompletionToggle animation: spring entrance (stiffness 500, damping 15), 100ms fade exit, AnimatePresence mode=wait, reduced motion bypass
- `src/components/__tests__/scroll-reveal.test.tsx` - Tests ScrollReveal fade-up (opacity 0, y 16), useInView once:true, animate on view, reduced motion static render
- `src/components/__tests__/stagger-group.test.tsx` - Tests StaggerGroup container variants with staggerChildren 0.05 (50ms), custom staggerMs, StaggerItem hidden/visible variants, reduced motion
- `src/components/__tests__/reduced-motion.test.tsx` - Cross-cutting D-09 compliance: all 4 motion components render static divs with no motion props when useReducedMotion returns true

## Decisions Made
- Mock motion/react via data-attributes on DOM elements to assert animation props without running actual animations
- Tests import from expected component paths and will fail at import until 22-01/22-02 create components (intentional RED state for TDD)

## Deviations from Plan
None - plan executed exactly as written.

## Issues Encountered
- Pre-existing build error in Cascadia cable routing types (SignalType mismatch) -- unrelated to this plan, present on main branch. Logged to deferred items.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Test contracts ready for plans 22-01 (motion components) and 22-02 (completion celebration + integration)
- Running `npx vitest run src/components/__tests__/spring-card.test.tsx` after 22-01 completes should go green

---
*Phase: 22-interactive-elements-motion*
*Completed: 2026-04-11*

## Self-Check: PASSED
- All 5 test files exist
- Task commit 72b1575 verified
