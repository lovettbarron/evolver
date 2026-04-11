---
phase: 23-panel-progress-polish
plan: 01
subsystem: ui
tags: [motion, svg, animation, viewBox, oklch, css-custom-properties, accent-color]

requires:
  - phase: 23-00
    provides: "Wave 0 test stubs and design contract"
  - phase: 22
    provides: "motion/react integration pattern, MotionProvider"
  - phase: 18
    provides: "OKLCH token system, --color-accent cascade"
provides:
  - "Animated viewBox tween on both panel components via motion.svg"
  - "Accent-aware glow circles, card shadows, and pulse-glow animation"
  - "motion/react mock pattern for panel component tests"
affects: [23-02, panel-visualizer, cascadia-panel]

tech-stack:
  added: []
  patterns:
    - "motion.svg viewBox tween for spatial zoom animation"
    - "oklch(from var(--color-accent) l c h / alpha) for accent-derived colors"
    - "vi.mock Proxy pattern for motion/react in vitest"

key-files:
  created: []
  modified:
    - src/components/evolver-panel.tsx
    - src/components/cascadia-panel.tsx
    - src/app/globals.css
    - src/components/__tests__/evolver-panel.test.tsx
    - src/components/__tests__/cascadia-panel.test.tsx
    - src/app/__tests__/tokens.test.ts

key-decisions:
  - "motion.svg with animate={{ viewBox }} for tween, static viewBox attr as initial state"
  - "var(--color-accent) in SVG fill for glow circles works via CSS custom property inheritance"
  - "oklch(from var(--color-accent) l c h / alpha) for shadow and keyframe accent derivation"

patterns-established:
  - "Panel motion mock: Proxy-based vi.mock that renders motion.svg as svg with data-animate/data-transition attrs"
  - "Accent derivation: oklch relative color syntax for alpha variants of accent color"

requirements-completed: [SPEC-01, TOKEN-06]

duration: 4min
completed: 2026-04-11
---

# Phase 23 Plan 01: Panel ViewBox Tween & Accent Color Audit Summary

**Animated panel zoom via motion.svg viewBox tween, with all hardcoded lime accent values replaced by var(--color-accent) cascade**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-11T20:32:29Z
- **Completed:** 2026-04-11T20:36:52Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Both panel components (Evolver + Cascadia) now use `<motion.svg>` with viewBox tween animation (0.3s easeInOut) for smooth spatial zoom transitions
- Glow circles in both panels changed from hardcoded `#c8ff00` to `var(--color-accent)`, enabling per-instrument accent colors
- `--shadow-card-hover` and `@keyframes pulse-glow` in globals.css now use `oklch(from var(--color-accent) l c h / alpha)` instead of hardcoded lime values
- 47 tests passing across panel and token test suites (24 panel + 23 token)

## Task Commits

Each task was committed atomically:

1. **Task 1: Panel viewBox tween via motion.svg + glow accent fix** - `05bacc2` (feat)
2. **Task 2: Accent color audit -- fix hardcoded lime in globals.css** - `f8fe52e` (feat)

## Files Created/Modified
- `src/components/evolver-panel.tsx` - Added motion.svg viewBox tween, replaced glow #c8ff00 with var(--color-accent)
- `src/components/cascadia-panel.tsx` - Same motion.svg and glow accent changes
- `src/app/globals.css` - Replaced 3 hardcoded oklch(0.85 0.18 105) usages with oklch(from var(--color-accent))
- `src/components/__tests__/evolver-panel.test.tsx` - Added motion mock, viewBox animation tests (12 tests)
- `src/components/__tests__/cascadia-panel.test.tsx` - Added motion mock, viewBox animation tests (12 tests)
- `src/app/__tests__/tokens.test.ts` - Added accent color audit assertions (4 tests)

## Decisions Made
- Used `viewBox="0 0 1200 520"` as static attribute with `animate={{ viewBox }}` for the tween initial state, creating the brief full-panel flash then smooth zoom per D-02
- Used `var(--color-accent)` directly in SVG fill attributes -- CSS custom properties inherit into SVG when the SVG is inline
- Used `oklch(from var(--color-accent) l c h / alpha)` relative color syntax for deriving transparent accent variants in shadows and keyframes

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Panel zoom animation ready for session pages with `zoomSections` prop
- Accent cascade complete -- Cascadia pages now get teal shadows, pulse-glow, and panel glow automatically via `[data-instrument="cascadia"]` CSS override
- Ready for 23-02 (progress bar and completion UI polish)

---
*Phase: 23-panel-progress-polish*
*Completed: 2026-04-11*
