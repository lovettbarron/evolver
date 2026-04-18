---
phase: 29-maths-curriculum-panel
plan: 04
subsystem: panel
tags: [maths, panel-svg, make-noise, eurorack, gap-closure]

requires:
  - phase: 29-maths-curriculum-panel
    plan: 01
    provides: CONTROL_METADATA with 45 entries, maths-panel-data.ts structure
provides:
  - Hand-placed CONTROL_POSITIONS for all 45 Maths controls
  - SECTION_BOUNDS with real dimensions for 5 channel groups
  - MathsPanel SVG component with data-driven rendering
---

## What was built

Closed the PANEL-07 verification gap by hand-placing all 45 Maths control positions and creating the MathsPanel SVG component.

### Task 1: Hand-place all 45 control positions and section bounds
- Replaced all placeholder `{x:0, y:0}` positions in `CONTROL_POSITIONS` with hand-placed coordinates for the Make Noise Maths 20HP module
- ViewBox `0 0 300 700` for the vertically-oriented eurorack format
- Symmetrical left-right layout: Ch1 (left), Ch2+Ch3 (center), Ch4 (right mirror), Buses (bottom center)
- Updated `SECTION_BOUNDS` with real bounding rectangles for all 5 channel groups

### Task 2: Create MathsPanel SVG component
- Created `src/components/maths-panel.tsx` (848 lines) following `cascadia-panel.tsx` patterns
- Data-driven rendering loop over CONTROL_METADATA + CONTROL_POSITIONS
- Supports: knobValues, highlights, activeSections, zoomSections, cables, onKnobChange
- Control types: knobs (r=12 with indicator), buttons (r=8 for Cycle), jacks (dark input / white output), LEDs (r=3)
- Includes: useKnobDrag hook, computeZoomViewBox, CablePath, PanelTooltip, section labels, dividers, brand text
- Component memo'd with React.memo for performance
- Created component test suite (5 tests)

## Self-Check: PASSED

- [x] All 45 CONTROL_POSITIONS have non-zero x/y values
- [x] No placeholder comments remain
- [x] SECTION_BOUNDS have non-zero dimensions for all 5 groups
- [x] MathsPanel component exports and renders
- [x] Data test suite: 9/9 passed
- [x] Component test suite: 5/5 passed
- [x] Total: 14/14 tests passed

## Deviations

None. Plan executed as specified.

## Key Files

### key-files.created
- src/components/maths-panel.tsx — MathsPanel SVG component (848 lines)
- src/components/__tests__/maths-panel.test.tsx — Component render tests (76 lines)

### key-files.modified
- src/lib/maths-panel-data.ts — Hand-placed CONTROL_POSITIONS and SECTION_BOUNDS
- src/lib/__tests__/maths-panel-data.test.ts — Updated data tests (93 lines)
