---
phase: 24-instrument-color-identity
plan: 01
subsystem: ui
tags: [css-tokens, oklch, color-system, wcag-aa, per-instrument-theming]

# Dependency graph
requires:
  - phase: 23-design-token-architecture
    provides: Three-layer token architecture (primitive, semantic, cascade) and @theme block structure
provides:
  - Per-instrument color primitives (blue, steel, neutral) replacing lime/teal
  - CSS cascade overrides for [data-instrument="evolver"] and [data-instrument="cascadia"]
  - Per-instrument surface/background color overrides
  - WCAG AA contrast-validated accent and param tokens
  - 44 token tests covering primitives, cascade, cleanup, and contrast
affects: [future-instrument-additions, panel-visualization, session-pages]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Per-instrument surface color overrides via [data-instrument] cascade blocks"
    - "WCAG AA lightness validation in token tests (L >= 0.65 accent, L >= 0.70 param)"

key-files:
  created: []
  modified:
    - src/app/globals.css
    - src/app/__tests__/tokens.test.ts
    - src/components/app-shell.tsx

key-decisions:
  - "Evolver blue hue 245 with 0.15 chroma -- saturated enough to feel blue, not overwhelming"
  - "Cascadia steel uses same hue 250 but chroma 0.04 -- subtly colored gray, not pure neutral"
  - "Neutral base chroma 0.03 -- barely tinted, reads as aluminum hardware"
  - "Per-instrument surface overrides added to cascade blocks for distinct background feel"
  - "bg-bg class applied to instrument div in app-shell for surface override visibility"

patterns-established:
  - "Per-instrument cascade: add [data-instrument='name'] block with --color-accent, --color-param, and surface overrides"
  - "Token test structure: primitives, cascade, legacy cleanup, WCAG contrast as separate describe blocks"

requirements-completed: [COLOR-01, COLOR-02, COLOR-03, COLOR-04, COLOR-05, COLOR-06]

# Metrics
duration: 25min
completed: 2026-04-13
---

# Phase 24 Plan 01: Instrument Color Identity Summary

**Per-instrument color system replacing lime palette -- Evolver blue (DSI Lexan), Cascadia steel gray (Intellijel aluminum), neutral aluminum base, with surface overrides and WCAG AA contrast validation**

## Performance

- **Duration:** ~25 min (across checkpoint)
- **Started:** 2026-04-12T20:09:19Z
- **Completed:** 2026-04-13T19:51:58Z
- **Tasks:** 3 (2 auto + 1 human-verify checkpoint)
- **Files modified:** 3

## Accomplishments

- Replaced lime/teal palette with 6 new oklch primitives: blue-500/400 (Evolver), steel-500/400 (Cascadia), neutral-500/400 (base)
- Default accent changed from lime to neutral aluminum -- home page and non-instrument routes show hardware-inspired gray
- Per-instrument cascade blocks override accent, param, and surface tokens for distinct visual identity per instrument
- App-shell instrument div applies bg-bg so surface overrides are visible
- 44 token tests validate primitives, cascade overrides, legacy cleanup, and WCAG AA contrast

## Task Commits

Each task was committed atomically:

1. **Task 1: Update token tests for new color system (TDD RED)** - `946a652` (test)
2. **Task 2: Replace lime palette with per-instrument colors (TDD GREEN)** - `06bf856` (feat)
3. **Task 2b: Add per-instrument surface color overrides** - `5a379d6` (feat)
4. **Task 2c: Apply bg-bg to instrument div** - `def92cd` (fix)
5. **Task 3: Visual verification checkpoint** - human-approved

## Files Created/Modified

- `src/app/globals.css` - New blue/steel/neutral primitives, neutral default semantics, per-instrument cascade blocks with accent + param + surface overrides
- `src/app/__tests__/tokens.test.ts` - 44 tests covering primitives, cascade, legacy cleanup, WCAG AA contrast estimation
- `src/components/app-shell.tsx` - Added bg-bg class to instrument div for surface override visibility

## Decisions Made

- Evolver blue hue 245 with chroma 0.15 -- saturated enough for brand recognition without overwhelming
- Cascadia steel uses same hue 250 but chroma 0.04 -- subtly colored gray, distinct from pure neutral
- Neutral base chroma 0.03 -- reads as aluminum hardware, not colored
- Per-instrument surface overrides (bg, surface, surface-raised) added beyond original plan scope for complete visual identity
- App-shell instrument div needed bg-bg class to make surface overrides actually render

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Per-instrument surface color overrides**
- **Found during:** Task 3 visual verification
- **Issue:** Accent colors changed but backgrounds remained identical across instruments -- the visual identity felt incomplete
- **Fix:** Added --color-bg, --color-surface, and --color-surface-raised overrides to each [data-instrument] cascade block with instrument-appropriate hue tints
- **Files modified:** src/app/globals.css, src/app/__tests__/tokens.test.ts
- **Committed in:** 5a379d6

**2. [Rule 1 - Bug] bg-bg class on instrument div**
- **Found during:** Task 3 visual verification
- **Issue:** Surface overrides defined in CSS but not visible because the instrument div in app-shell lacked a background class
- **Fix:** Added bg-bg class to the instrument wrapper div in app-shell.tsx
- **Files modified:** src/components/app-shell.tsx
- **Committed in:** def92cd

---

**Total deviations:** 2 auto-fixed (1 missing critical, 1 bug)
**Impact on plan:** Both fixes were necessary for the visual identity to actually be perceptible. No scope creep -- they complete the plan's stated goal.

## Issues Encountered

None -- pre-existing test failures (17 tests in instrument-overview, card-unification, session-detail, markdown processor, curriculum) are unrelated to color changes and existed before this plan.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None -- all color tokens are fully wired and rendering.

## Next Phase Readiness

- Per-instrument color identity complete and visually verified
- Pattern established for adding new instruments: add a [data-instrument="name"] cascade block with accent, param, and surface overrides
- Token test structure supports easy extension for new instrument color palettes

## Self-Check: PASSED

- All 3 modified files exist on disk
- All 4 task commit hashes verified in git history
- SUMMARY.md created at correct path

---
*Phase: 24-instrument-color-identity*
*Completed: 2026-04-13*
