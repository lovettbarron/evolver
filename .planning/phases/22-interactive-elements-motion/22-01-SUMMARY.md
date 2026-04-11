---
phase: 22-interactive-elements-motion
plan: 01
subsystem: ui
tags: [motion, spring-physics, animation, react, reduced-motion, accessibility]

# Dependency graph
requires:
  - phase: 21-cards-content-components
    provides: .card CSS base class and 5 card components
provides:
  - motion@^12.38.0 installed as project dependency
  - MotionProvider wrapper with reducedMotion="user" in app shell
  - SpringCard reusable spring hover wrapper component
  - All 5 card types wired with spring hover physics
  - CSS .card hover stripped of transform/box-shadow (dual-system with border-color CSS)
affects: [22-02-scroll-reveal-completion, 23-panel-progress-polish]

# Tech tracking
tech-stack:
  added: [motion@^12.38.0]
  patterns: [spring-hover-wrapper, dual-system-css-motion, reduced-motion-guard]

key-files:
  created:
    - src/components/motion/motion-provider.tsx
    - src/components/motion/spring-card.tsx
  modified:
    - src/components/app-shell.tsx
    - src/app/globals.css
    - src/components/hero-card.tsx
    - src/components/patch-card.tsx
    - src/components/module-card.tsx
    - src/components/instrument-card.tsx
    - src/components/count-card.tsx

key-decisions:
  - "Dual-system hover: border-color stays as CSS transition, transform/boxShadow via motion spring"
  - "SpringCard wrapper pattern: server components import client SpringCard without adding use client"
  - "MotionConfig reducedMotion=user at app shell level for global reduced-motion respect"

patterns-established:
  - "SpringCard wrapper: wrap any element with <SpringCard> for spring hover lift + shadow"
  - "Dual-system animation: CSS handles color transitions, motion handles transforms"
  - "Server/client boundary: server components can render client SpringCard as children boundary"

requirements-completed: [COMP-03]

# Metrics
duration: 5min
completed: 2026-04-11
---

# Phase 22 Plan 01: Spring Hover Infrastructure Summary

**motion@^12.38.0 spring physics replacing CSS transitions for card hover lift/shadow across all 5 card types with reduced-motion guard**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-11T15:36:57Z
- **Completed:** 2026-04-11T15:42:15Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments
- Installed motion package and created MotionProvider with reducedMotion="user" wrapping the app shell
- Created SpringCard reusable wrapper with spring config (stiffness 400, damping 28) and useReducedMotion guard
- Wired SpringCard into all 5 card types (HeroCard, PatchCard, ModuleCard, InstrumentCard, CountCard) without converting server components to client
- Updated CSS .card hover to only handle border-color (intentional dual-system: CSS for color, motion for transforms)

## Task Commits

Each task was committed atomically:

1. **Task 1: Install motion and create motion primitives** - `4953f17` (feat)
2. **Task 2: Wire SpringCard into all card components** - `3579d6c` (feat)

## Files Created/Modified
- `src/components/motion/motion-provider.tsx` - MotionConfig wrapper with reducedMotion="user"
- `src/components/motion/spring-card.tsx` - Reusable spring hover wrapper with reduced-motion fallback
- `src/components/app-shell.tsx` - Added MotionProvider wrapping app children
- `src/app/globals.css` - Removed transform/box-shadow from .card hover, kept border-color CSS transition
- `src/components/hero-card.tsx` - Wrapped card div with SpringCard
- `src/components/patch-card.tsx` - Wrapped Link with SpringCard (server component preserved)
- `src/components/module-card.tsx` - Wrapped Link with SpringCard (server component preserved)
- `src/components/instrument-card.tsx` - Wrapped Link with SpringCard (server component preserved)
- `src/components/count-card.tsx` - Wrapped Link with SpringCard (server component preserved)

## Decisions Made
- Dual-system hover is intentional: border-color via CSS transition (not a transform, no benefit from spring physics), y/boxShadow via motion spring
- SpringCard renders a plain div when prefers-reduced-motion is active (no animation at all)
- Server components import SpringCard as a client component boundary without adding "use client" themselves

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Pre-existing build failure in Cascadia panel component (type error: '"gate"' not assignable to cable type) confirmed present on main before changes. Out of scope for this plan, logged as pre-existing.
- Test stub files from 22-00 plan not yet present in this worktree (expected to be created by parallel agent). Verification against tests skipped; build verification used instead.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Motion infrastructure ready for 22-02 (scroll reveal, completion celebration, stagger groups)
- SpringCard pattern established for any future motion-wrapped components
- MotionProvider in place at app shell level for global motion configuration

---
*Phase: 22-interactive-elements-motion*
*Completed: 2026-04-11*
