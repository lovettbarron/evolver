---
phase: 260416-9hx
plan: 01
subsystem: ui
tags: [octatrack, svg, panel, react, vitest, tdd]

requires:
  - phase: 24-instrument-color-identity
    provides: Per-instrument accent tokens and surface overrides — Octatrack inherits default dark palette until a future color-identity session lands

provides:
  - OctatrackPanel React component (data-driven SVG) with interactive knobs, horizontal crossfader, LCD, and labeled pushbutton switches
  - Octatrack control metadata model (67 controls covering every front-panel control documented in overview.md)
  - Integration hooks so `<div data-octatrack-panel>` markers, `/instruments/octatrack/panel`, quick-ref panel tab, and patch detail all render the new panel
  - First `useHorizontalSliderDrag` hook in the codebase (crossfader) — reference for future horizontal faders

affects: [octatrack-curriculum, panel-embedding, patch-detail]

tech-stack:
  added: []
  patterns:
    - Display type in the control meta union ('display') for LCD-bearing instruments
    - useHorizontalSliderDrag hook pattern (clientX delta) — mirrors useSliderDrag but for horizontal faders
    - Accept-but-ignore cables prop pattern (API parity when an instrument has no cable routing)

key-files:
  created:
    - src/lib/octatrack-panel-data.ts (211 lines)
    - src/lib/__tests__/octatrack-panel-data.test.ts (203 lines)
    - src/components/octatrack-panel.tsx (999 lines)
    - src/components/__tests__/octatrack-panel.test.tsx (134 lines)
  modified:
    - src/components/session-detail.tsx (added OCTATRACK_PANEL_RE + parseOctatrackPanelProps + render branch)
    - src/app/instruments/[slug]/panel/page.tsx (PANEL_CONFIG.octatrack entry)
    - src/app/instruments/[slug]/panel/standalone-panel-client.tsx (octatrack branch)
    - src/components/quick-ref-panel.tsx (showPanelTab includes octatrack + render branch)
    - src/components/patch-detail.tsx (octatrack render block, no cables)

key-decisions:
  - "Type union extended with 'display' for LCD (option (a) in plan) — explicit in tests and render switch"
  - "Crossfader uses a new useHorizontalSliderDrag hook (clientX delta) — only horizontal slider in the app"
  - "All Octatrack front-panel 'switches' render as rectangular labeled pushbuttons (Evolver switchRect pattern) since none are toggle switches"
  - "Octatrack has no patch jacks on the front panel — cables prop accepted but IGNORED for API parity"
  - "Track keys arranged 1x8 horizontally below the LCD (one of two physically-accurate arrangements; MKI layout is 4+4 flanking LCD). Committed to 1x8."
  - "ViewBox 0 0 1000 500 (horizontal aspect close to real MKII)"

patterns-established:
  - "Accept-but-ignore prop pattern: components can expose cables in their prop type but route around it internally so consumers don't need instrument-specific branches"
  - "data-control-id attribute on every SVG control group to enable robust test-side querying"
  - "Hand-placed positions for all non-repeating controls; loops only for genuinely-regular rows (trigs, tracks)"

requirements-completed: [OCT-PANEL-DATA, OCT-PANEL-COMPONENT, OCT-PANEL-INTEGRATION]

duration: 8min
completed: 2026-04-16
---

# 260416-9hx Plan 01: Generate Octatrack Front-Panel SVG Component Summary

**67-control Octatrack MKII SVG panel with 16 trigs, 8 tracks, 6 data knobs, horizontal crossfader, and full integration into session-detail parser, panel route, quick-ref tab, and patch detail.**

## Performance

- **Duration:** 8 min
- **Started:** 2026-04-16T04:55:36Z
- **Completed:** 2026-04-16T05:03:36Z
- **Tasks:** 3 (all autonomous, TDD on 1 and 2)
- **Files created:** 4 (2 source + 2 tests)
- **Files modified:** 5 (integration glue)

## Accomplishments

- **Data file (67 controls):** Complete CONTROL_METADATA covering every control in `instruments/octatrack/overview.md` Physical Controls section: 3 transport + 8 tracks + 16 trigs + 6 data knobs + 3 main/hp/level + 1 crossfader + 2 scenes + 3 pattern/bank/page + 7 function keys + 5 track parameter keys + 6 navigation + 3 recorders + 1 cue + 1 tempo + 1 LCD + 1 CF card LED.
- **Component:** `OctatrackPanel` renders an SVG with interactive knobs (drag to rotate), a horizontal crossfader (drag to slide), labeled pushbutton switches (with green PLAY / red REC accent pips), and a styled LCD rect with 6-parameter grid hints.
- **Integration:** The four consumer files all render `<OctatrackPanel />` when `instrumentSlug === 'octatrack'`, mirroring the existing Evolver/Cascadia conditional pattern exactly.
- **Tests:** 32 new tests pass (19 data + 13 component) covering shape, counts, render, highlight filters, viewBox zoom, and cables-prop-ignored.

## Task Commits

1. **Task 1 RED: Failing data tests** — `9888826` (test)
2. **Task 1 GREEN: Data file implementation** — `8d9fd4f` (feat)
3. **Task 2 RED: Failing component tests** — `bfdea1f` (test)
4. **Task 2 GREEN: Component implementation** — `233d764` (feat)
5. **Task 3: Integration wiring** — `12c3c27` (feat)

_TDD pattern: task 1 and task 2 each had a failing-test commit (RED) followed by a passing-implementation commit (GREEN). No refactor commits were needed — first-pass implementations stayed clean._

## Files Created/Modified

### Created

- `src/lib/octatrack-panel-data.ts` (211 lines) — Control metadata (67 entries), SECTION_BOUNDS (14 modules), `midiToRotation`, `midiToSliderPosition`, `OctatrackControlMeta` type. Top-of-file comment documents the reference-first source and the no-physical-image caveat.
- `src/lib/__tests__/octatrack-panel-data.test.ts` (203 lines) — 19 tests mirroring cascadia-panel-data.test.ts structure plus per-group count guards (16 trigs, 8 tracks, 6 data knobs, etc.).
- `src/components/octatrack-panel.tsx` (999 lines) — Data-driven SVG component. Includes KnobGroup, ButtonSwitchComponent, LCDComponent, CrossfaderComponent, LEDComponent, plus `useKnobDrag` and the new `useHorizontalSliderDrag` hook.
- `src/components/__tests__/octatrack-panel.test.tsx` (134 lines) — 13 tests covering render, viewBox, control counts, LCD presence, crossfader presence, highlight glow filters, zoom viewBox, cables ignored, named export.

### Modified

- `src/components/session-detail.tsx` — Added `OCTATRACK_PANEL_RE`, `parseOctatrackPanelProps`, `hasOctatrackPanel`, updated `hasPanel`, `panelRe`, `parseProps`, and the render branch (three-way ternary: Evolver / Cascadia / Octatrack).
- `src/app/instruments/[slug]/panel/page.tsx` — Added `octatrack` entry to `PANEL_CONFIG` with `maxWidth: max-w-[1400px]`.
- `src/app/instruments/[slug]/panel/standalone-panel-client.tsx` — Early-return branch for `octatrack` before the Cascadia branch.
- `src/components/quick-ref-panel.tsx` — Imported `OctatrackPanel`, added `octatrack` to `showPanelTab` check, added render branch.
- `src/components/patch-detail.tsx` — Imported `OctatrackPanel`, added conditional render block (no `cables` prop — Octatrack has no cable routing).

## Key Data-Model Decisions

- **ViewBox:** `0 0 1000 500` — horizontal aspect approximating the physical MKII panel.
- **Type union:** `knob | slider | switch | led | display`. The Cascadia set extended with `display` for the LCD (option (a) in the plan — explicit in VALID_TYPES and the render switch).
- **No jack types:** The front panel has no patch jacks. Rear-panel jacks are out of scope.
- **Module names:** `transport, track, trig, data, main, mix, scene, nav, func, param, rec, tempo, lcd, card` (14 modules, each with a `SECTION_BOUNDS` entry).
- **Control counts by module:**
  - transport: 3 — PLAY, STOP, REC
  - track: 9 — T1-T8 + CUE
  - trig: 16 — TRIG1-TRIG16
  - data: 6 — knobs A-F
  - main: 3 — VOLUME, HP VOL, LEVEL
  - mix: 1 — CROSSFADER (slider)
  - scene: 2 — SCENE A, SCENE B
  - nav: 9 — UP/DOWN/LEFT/RIGHT/YES/NO + PTN/BANK/PAGE
  - func: 7 — FUNC/PROJ/PART/AED/MIX/ARR/MIDI
  - param: 5 — SRC/AMP/LFO/FX1/FX2
  - rec: 3 — REC1/REC2/REC3
  - tempo: 1 — TEMPO
  - lcd: 1 — display-lcd-screen (display type)
  - card: 1 — led-card-status
  - **Total: 67**

## Deviations from Plan

None - plan executed exactly as written.

The plan's minimum bar was ≥60 entries; delivered 67 (every single control from overview.md Physical Controls). No unplanned fixes were required — the plan's structural pattern (mirror cascadia exactly + remove cables + add display type + horizontal slider) translated cleanly to implementation.

## Positions Flagged for Follow-Up Session

Per the plan's iteration note and the reference-first rule, the first-pass layout is **structurally correct** but exact x/y coordinates are a guess and will need a verify-against-manual pass:

- **Trig key spacing:** 60px steps starting at x=40 — plausible for 16 keys on a 1000-wide viewBox but not physically measured.
- **Track key arrangement:** Committed to 1x8 row below the LCD. If the MKII manual actually has a different arrangement (e.g., split 4+4 flanking the LCD), swap the loop for hand-placed positions.
- **LCD size:** 420x120 rect positioned at {130, 25}. Rough proportion check vs. the manual is needed.
- **Data knob cluster:** 3-col x 2-row grid right of LCD. Real MKII layout should be checked — may be 6-in-a-row or 2x3.
- **Navigation diamond:** Arrows arranged in a diamond at {780, 260}. Physical MKII may use a 2x2 grid or linear strip.
- **Crossfader length:** 380px track. The real crossfader occupies a specific middle-panel span that should be measured against the diagram.

## Known Stubs

**None.** The LCD renderer includes placeholder text ("OCTATRACK" / "PTN A01 PART 1 BPM 120.0") as cosmetic visual decoration — this is an intentional design choice to make the LCD visually recognizable, not a stub. There is no downstream code that reads from or depends on the placeholder text.

## Verification

**Passing suites (run during execution):**
- `src/lib/__tests__/octatrack-panel-data.test.ts` — 19/19 pass
- `src/components/__tests__/octatrack-panel.test.tsx` — 13/13 pass
- `src/components/__tests__/quick-ref-panel.test.tsx` — 6/6 pass (no regression)

**Pre-existing failures NOT caused by this plan:**
- `src/components/__tests__/session-detail.test.tsx` — 4 tests fail with `ReferenceError: IntersectionObserver is not defined`. Verified failing on `main` before any Octatrack changes. Cause: framer-motion `whileInView` needs an IntersectionObserver polyfill in the vitest setup. Tracked in `deferred-items.md` in this quick-task folder. Out of scope.
- `npx tsc --noEmit` — 10+ pre-existing TS errors in unrelated test fixtures and source files (not Octatrack-related). Confirmed with `grep -i octatrack` returning no matches. Tracked in `deferred-items.md`.

## Issues Encountered

- One minor zsh-globbing snag when `git add` received unquoted bracketed paths (`src/app/instruments/[slug]/...`). Re-quoted and commit succeeded. Not an executable problem — tooling nuance only.

## Next Phase Readiness

- Session markdown can now embed `<div data-octatrack-panel data-sections="func,param" data-knobs="knob-data-a:64"></div>` and get an inline panel.
- `/instruments/octatrack/panel` will render when an Octatrack instrument entry exists in the content pipeline.
- Follow-up session work: (a) verify-against-manual x/y tweaking, (b) hover tooltip strings on Octatrack controls, (c) Octatrack color-identity palette if/when the user adopts instrument color tokens for Octatrack.

## Self-Check: PASSED

- src/lib/octatrack-panel-data.ts — FOUND
- src/lib/__tests__/octatrack-panel-data.test.ts — FOUND
- src/components/octatrack-panel.tsx — FOUND
- src/components/__tests__/octatrack-panel.test.tsx — FOUND
- Commit 9888826 — FOUND
- Commit 8d9fd4f — FOUND
- Commit bfdea1f — FOUND
- Commit 233d764 — FOUND
- Commit 12c3c27 — FOUND

---
*Quick task: 260416-9hx*
*Completed: 2026-04-16*
