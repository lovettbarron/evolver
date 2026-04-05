---
phase: 12-evolver-panel-visualizer-component
verified: 2026-04-03T09:20:00Z
status: gaps_found
score: 5/6 requirements verified
re_verification: false
gaps:
  - truth: "Section tint rectangles render correctly for activeSections and envelope3 section has valid bounds"
    status: partial
    reason: "envelope3 is referenced in session panel markers (data-sections) and by 8 controls in CONTROL_METADATA, but has no entry in SECTION_BOUNDS. The activeSections tint silently fails for envelope3. Additionally, the test asserts fill-opacity='0.08' but implementation uses fillOpacity={0.15} — causing 1 failing test."
    artifacts:
      - path: "src/lib/evolver-panel-data.ts"
        issue: "SECTION_BOUNDS missing 'envelope3' entry (16 sections defined, envelope3 omitted)"
      - path: "src/components/__tests__/evolver-panel.test.tsx"
        issue: "Test checks fill-opacity='0.08' but implementation renders fillOpacity={0.15}. Test fails."
    missing:
      - "Add envelope3 bounding box to SECTION_BOUNDS: { x: 55, y: 10, width: 140, height: 135 }"
      - "Update test assertion to match implemented value (0.15) or change implementation to match plan spec (0.08)"
  - truth: "SessionPanelSidebar wired into session-detail for Evolver sessions (per EPANEL-06 requirement text)"
    status: partial
    reason: "EPANEL-06 in REQUIREMENTS.md still says 'collapsible sidebar'. The implementation pivoted to inline embedding via HTML markers. SessionPanelSidebar exists at src/components/session-panel-sidebar.tsx (41 lines) but is not imported anywhere — it is orphaned. The requirement text needs to be updated to reflect the delivered inline embedding approach."
    artifacts:
      - path: "src/components/session-panel-sidebar.tsx"
        issue: "Component exists and is substantive but not imported or used anywhere (orphaned)"
      - path: ".planning/REQUIREMENTS.md"
        issue: "EPANEL-06 text says 'collapsible sidebar' but delivered approach is inline embedding via HTML markers"
    missing:
      - "Update REQUIREMENTS.md EPANEL-06 to reflect actual delivered integration: inline embedding via <div data-evolver-panel> markers in markdown"
      - "Either import and use SessionPanelSidebar somewhere, or remove/archive the file to avoid confusion"
human_verification:
  - test: "Section tint rendering at the correct opacity"
    expected: "When activeSections=['filter'] is passed to EvolverPanel, a translucent blue rectangle appears over the Filter section of the panel"
    why_human: "Test is failing due to value mismatch; visual check needed to confirm tint is visible at 0.15 opacity"
  - test: "Inline panel in session 05"
    expected: "Visit /instruments/evolver/sessions/05-analog-osc-hard-sync — two EvolverPanel components should appear inline within the lesson content at the marker positions, with correct section highlights and zoom"
    why_human: "Requires browser to verify markdown rendering, HTML splitting, and panel rendering in prose flow"
  - test: "Tooltip on hover"
    expected: "Hover any knob — tooltip appears above it showing control name, NRPN number, and current value"
    why_human: "getBoundingClientRect depends on real browser layout, not testable in jsdom"
  - test: "Knob drag interaction"
    expected: "Drag a knob upward — indicator line rotates clockwise. Drag downward — rotates counterclockwise."
    why_human: "PointerEvent drag UX requires real browser interaction"
---

# Phase 12: Evolver Panel Visualizer Component — Verification Report

**Phase Goal:** Create an interactive React component rendering the Evolver panel SVG with control metadata, knob interaction, tooltip overlays, and page integrations (session inline, patch detail, quick-ref, standalone route).
**Verified:** 2026-04-03
**Status:** gaps_found
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | EvolverPanel renders inline SVG with all control IDs preserved | VERIFIED | `viewBox="0 0 1200 520"`, `width="100%"`, 110 controls mapped in CONTROL_METADATA, all IDs present in JSX SVG |
| 2 | Knob indicators rotate -135deg to +135deg via midiToRotation | VERIFIED | `midiToRotation` at line 197 of evolver-panel-data.ts: `-135 + (value/127)*270`. Test confirms -135 at 0, +135 at 127, noon at 64. |
| 3 | Dragging a knob fires onChange with clamped 0-127 value | VERIFIED | `useKnobDrag` hook: pointer capture, 1 MIDI unit per 3px, `Math.max(0, Math.min(127, ...))`. Drag test passes. |
| 4 | Switches and LEDs are display-only (no drag handlers) | VERIFIED | Switch groups have `style={{ cursor: 'default' }}` and no pointer event handlers. LEDs same. |
| 5 | Feedback section: Frequency top, Level large, Grunge as switch | VERIFIED | Line 675-677: `K('knob-feedback-frequency', ...)`, `K('knob-feedback-amount', ..., true, 'Level')`, `<g id="switch-feedback-grunge">` |
| 6 | Uncontrolled mode uses internal state, knobs default to noon | VERIFIED | `const [internalValues, setInternalValues] = useState<Record<string,number>>({})`, `effectiveValues = knobValues ?? internalValues`, `getVal(id) => effectiveValues[id] ?? 64` |
| 7 | Tooltip shows control name, NRPN, and value on hover | VERIFIED | `PanelTooltip` component uses `getBoundingClientRect`, imports `CONTROL_METADATA`, renders name/NRPN/value |
| 8 | Session detail shows inline panel at marker positions | VERIFIED | `session-detail.tsx` splits HTML at `data-evolver-panel` markers, renders `<EvolverPanel>` components with parsed props |
| 9 | Patch detail renders inline panel for Evolver patches | VERIFIED | Lines 114-119 of patch-detail.tsx: `{instrumentSlug === 'evolver' && <div><EvolverPanel /></div>}` |
| 10 | Quick-ref panel has Evolver Panel tab | VERIFIED | `quick-ref-panel.tsx` lines 22-23, 89-101: `showPanelTab = instrumentSlug === 'evolver'`, "Evolver Panel" tab button rendered |
| 11 | Standalone route /instruments/evolver/panel works, 404 for others | VERIFIED | `page.tsx`: `if (slug !== 'evolver') return notFound()`. StandalonePanelClient renders EvolverPanel in uncontrolled mode. |
| 12 | Section tint rectangles render for activeSections | PARTIAL | Tint renders at fillOpacity={0.15} (not 0.08 per original plan). envelope3 section has no SECTION_BOUNDS entry — tint silently skipped for envelope3 in session 05's second panel. Test fails. |
| 13 | ZoomSections crops viewBox to named sections | VERIFIED | `computeZoomViewBox()` calculates bounding box from SECTION_BOUNDS entries. Used in session 05 (`data-zoom="oscillators"`). |

**Score:** 12/13 truths verified (1 partial)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/lib/evolver-panel-data.ts` | Control metadata map, SECTION_BOUNDS, midiToRotation | VERIFIED | 206 lines. 110 controls, 16 section bounds (envelope3 missing), midiToRotation, getSectionForControl |
| `src/components/evolver-panel.tsx` | Core EvolverPanel, inline JSX SVG, knob drag | VERIFIED | 782 lines. Full inline SVG, useKnobDrag, KnobGroup, memo, glow filters, section tints |
| `src/components/evolver-panel-tooltip.tsx` | HTML tooltip over SVG | VERIFIED | 150 lines. getBoundingClientRect, flip-below logic, CONTROL_METADATA lookup, z-30, pointer-events:none |
| `src/components/__tests__/evolver-panel.test.tsx` | Wave 0 test stubs | VERIFIED | 68 lines. 8 tests, 7 passing, 1 failing (section tint value mismatch) |
| `src/lib/__tests__/evolver-panel-data.test.ts` | Metadata completeness tests | VERIFIED | 9/9 tests passing |
| `src/components/session-panel-sidebar.tsx` | Collapsible sidebar wrapper | ORPHANED | 41 lines. Exists and is substantive, but not imported anywhere. Plan 03 pivoted to inline embedding. |
| `src/components/session-detail.tsx` | Modified with inline panel embedding | VERIFIED | 162 lines. HTML splitting at data-evolver-panel markers, parsePanelProps, EvolverPanel inline rendering |
| `src/components/patch-detail.tsx` | Modified with inline panel for Evolver | VERIFIED | 123 lines. EvolverPanel rendered for instrumentSlug === 'evolver' |
| `src/components/quick-ref-panel.tsx` | Modified with Evolver Panel tab | VERIFIED | 126 lines. instrumentSlug prop, showPanelTab, EvolverPanel in tab |
| `src/app/instruments/[slug]/panel/page.tsx` | Standalone panel route | VERIFIED | 27 lines. notFound() for non-evolver, StandalonePanelClient rendered |
| `src/app/instruments/[slug]/panel/standalone-panel-client.tsx` | Client wrapper | VERIFIED | 12 lines. EvolverPanel in uncontrolled mode |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `evolver-panel.tsx` | `evolver-panel-data.ts` | imports CONTROL_METADATA, SECTION_BOUNDS, midiToRotation | WIRED | Line 5: `import { CONTROL_METADATA, SECTION_BOUNDS, midiToRotation } from '@/lib/evolver-panel-data'` |
| `evolver-panel.tsx` | `evolver-panel-tooltip.tsx` | renders PanelTooltip as sibling to SVG | WIRED | Line 6: `import { PanelTooltip } from './evolver-panel-tooltip'`. PanelTooltip rendered at bottom of div |
| `evolver-panel-tooltip.tsx` | `evolver-panel-data.ts` | imports CONTROL_METADATA for name and NRPN | WIRED | Line 4: `import { CONTROL_METADATA } from '@/lib/evolver-panel-data'` |
| `session-detail.tsx` | `evolver-panel.tsx` | renders EvolverPanel inline at marker positions | WIRED | Line 8: import, line 134: `<EvolverPanel knobValues={...} highlights={...} activeSections={...} zoomSections={...} />` |
| `session-panel-sidebar.tsx` | `evolver-panel.tsx` | renders EvolverPanel | ORPHANED | Import exists in sidebar file but sidebar is not imported by any page or layout |
| `patch-detail.tsx` | `evolver-panel.tsx` | renders EvolverPanel inline for evolver | WIRED | Line 10: import, line 117: `<EvolverPanel />` |
| `quick-ref-panel.tsx` | `evolver-panel.tsx` | renders EvolverPanel in panel tab | WIRED | Line 6: import, line 109: `<EvolverPanel className="w-full" />` |
| `sticky-header.tsx` | `quick-ref-panel.tsx` | threads instrumentSlug for panel tab | WIRED | Line 12: prop defined, line 51: `instrumentSlug={instrumentSlug}` passed |
| `panel/page.tsx` | `standalone-panel-client.tsx` | renders StandalonePanelClient | WIRED | Line 3: import, line 23: `<StandalonePanelClient />` |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|-------------------|--------|
| `evolver-panel.tsx` | `effectiveValues[id]` | `knobValues` prop or `internalValues` state via `useKnobDrag` | Yes — knob rotation driven by real prop or drag state | FLOWING |
| `evolver-panel-tooltip.tsx` | `meta` (name, nrpn) | `CONTROL_METADATA[controlId]` — static compile-time data | Yes — 110 real controls with accurate NRPN numbers | FLOWING |
| `session-detail.tsx` | `panelProps[]` | `parsePanelProps()` parsing `data-*` attributes from session markdown | Yes — attributes from session 05 contain real control IDs and knob values | FLOWING |
| `quick-ref-panel.tsx` | `EvolverPanel` | EvolverPanel in uncontrolled mode (internal state) | Yes — panel renders, knob values managed internally | FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| CONTROL_METADATA has 110+ entries | `node -e "const fs=require('fs'); const c=fs.readFileSync('src/lib/evolver-panel-data.ts','utf8'); console.log(c.match(/^  'knob-|^  'switch-|^  'led-/gm).length)"` | 110 | PASS |
| midiToRotation(0) = -135 | Verified by 9/9 metadata tests | -135 confirmed | PASS |
| panel test suite | `vitest run src/components/__tests__/evolver-panel.test.tsx` | 7/8 passing, 1 failing (section tint) | PARTIAL |
| data test suite | `vitest run src/lib/__tests__/evolver-panel-data.test.ts` | 9/9 passing | PASS |
| TypeScript (panel files) | `tsc --noEmit` | Zero errors in evolver-panel*.tsx, evolver-panel-data.ts, patch-detail, quick-ref-panel, sticky-header, session-detail, panel/page.tsx | PASS |
| TypeScript (overall) | `tsc --noEmit` | 14 errors in pre-existing test files (instrument-overview.test, routing.test, session-detail.test, sessions.test, schemas.test, connection.test) — none in Phase 12 production code | PASS (panel files) |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| EPANEL-01 | 12-01 | Inline JSX SVG, ~110 controls, responsive, Feedback fix | SATISFIED | 782-line component, 110 controls in data file, viewBox="0 0 1200 520", switch-feedback-grunge in component |
| EPANEL-02 | 12-01 | Knob rotation -135 to +135, drag interaction, display-only switches/LEDs | SATISFIED | useKnobDrag hook, midiToRotation, cursor:default on switches |
| EPANEL-03 | 12-01, 12-02 | Glow rings (blue/amber) and section tint rectangles | PARTIAL | Glow filters defined and wired. Section tints render at 0.15 opacity. envelope3 missing from SECTION_BOUNDS — tint silently fails for that section. Test fails on value assertion. |
| EPANEL-04 | 12-02 | Tooltip: name, MIDI value, NRPN, positioned via getBoundingClientRect | SATISFIED | PanelTooltip uses getBoundingClientRect, CONTROL_METADATA lookup, renders all three fields |
| EPANEL-05 | 12-01, 12-02 | Metadata map: 110 controls, names, NRPNs, sections, types | SATISFIED | 110 entries in CONTROL_METADATA with all required fields |
| EPANEL-06 | 12-03 | Four page integrations: session detail, patch detail, quick-ref, standalone route | PARTIALLY SATISFIED | Three integrations fully wired (patch-detail, quick-ref, standalone). Session detail uses inline embedding (not sidebar per requirement text). REQUIREMENTS.md text is stale — deliverable matches phase goal but not requirements text. SessionPanelSidebar is orphaned. |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/lib/evolver-panel-data.ts` | 172-190 | SECTION_BOUNDS missing 'envelope3' entry | Warning | Section tint silently fails for envelope3; used in session-05 second panel marker (`data-sections="oscillators,envelope3"`) |
| `src/components/__tests__/evolver-panel.test.tsx` | 46 | `fill-opacity` value mismatch: test checks `'0.08'`, implementation uses `0.15` | Warning | 1 test failing; plan spec said 0.08, implementation uses 0.15 |
| `src/components/session-panel-sidebar.tsx` | all | Component exists but not imported anywhere | Info | Orphaned file; sidebar approach was abandoned per design pivot. Not a runtime issue. |

### Human Verification Required

#### 1. Section Tint Visibility

**Test:** Visit `/instruments/evolver/sessions/05-analog-osc-hard-sync`, scroll to second panel marker. Inspect whether the Envelope 3 section shows a blue tint rectangle.
**Expected:** Oscillators section shows tint; Envelope 3 does NOT (missing from SECTION_BOUNDS).
**Why human:** Requires browser rendering to confirm the gap is noticeable to users.

#### 2. Inline Panel in Session Flow

**Test:** Visit `/instruments/evolver/sessions/05-analog-osc-hard-sync` in a browser. Confirm two EvolverPanel components appear inline within the lesson prose at the marker positions (not at top/bottom of page).
**Expected:** First panel shows zoomed oscillators section with knob-osc-level highlighted blue, switch-sync amber. Second shows full panel with oscillators + envelope3 sections.
**Why human:** HTML splitting and rehype-raw rendering cannot be verified without browser.

#### 3. Tooltip Positioning and Content

**Test:** On `/instruments/evolver/panel`, hover over the Filter Frequency knob.
**Expected:** Tooltip appears above the knob showing "Filter Frequency", "NRPN 20", and current MIDI value.
**Why human:** `getBoundingClientRect` depends on real browser layout; jsdom returns zeros.

#### 4. Knob Drag UX

**Test:** On `/instruments/evolver/panel`, drag the Filter Frequency knob upward by approximately 1cm.
**Expected:** The indicator line rotates clockwise (increasing value). Release and rehover — tooltip shows updated value.
**Why human:** Pointer capture API and visual rotation require real browser interaction.

### Gaps Summary

Two gaps block complete requirement satisfaction:

**Gap 1 — SECTION_BOUNDS missing envelope3 (EPANEL-03, minor):** The `envelope3` section has 8 controls mapped in CONTROL_METADATA and is referenced in session 05's panel marker (`data-sections="oscillators,envelope3"`), but has no bounding box in SECTION_BOUNDS. This silently skips the tint for envelope3. Fix: add `'envelope3': { x: 55, y: 10, width: 140, height: 135 }` to SECTION_BOUNDS. Additionally, the test checks `fill-opacity="0.08"` but the component renders `fillOpacity={0.15}`. One of these needs to align with the other.

**Gap 2 — REQUIREMENTS.md stale on EPANEL-06 + orphaned sidebar (EPANEL-06, documentation):** The requirement says "collapsible sidebar" but the delivered approach (user-directed pivot) is inline embedding via HTML markers. The `SessionPanelSidebar` component exists and is functional but is not wired into any page. The actual integration is better than the requirement described — inline embedding is more contextually useful. The fix is to update REQUIREMENTS.md EPANEL-06 to reflect the actual delivery, and either archive or delete session-panel-sidebar.tsx to avoid confusion.

Neither gap blocks runtime functionality for the primary use case. All four integration contexts are functionally accessible. The section tint gap only affects one specific section (envelope3) in one existing session file.

---

_Verified: 2026-04-03T09:20:00Z_
_Verifier: Claude (gsd-verifier)_
