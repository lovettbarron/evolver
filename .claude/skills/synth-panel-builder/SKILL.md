---
name: synth-panel-builder
description: Build interactive SVG panel components for synthesizer instruments. Use when adding a new instrument to the project, creating or modifying panel visualizer components, or when the user references panel layout, control placement, or instrument panel design.
---

# Synth Panel Builder

Build interactive SVG panel components that faithfully reproduce physical synthesizer panel layouts as React components with hand-placed controls, interactive knobs/sliders, cable visualization, and session embedding.

## When to Use

- Adding a new instrument to the project
- Creating or modifying `*-panel.tsx` components
- Adding or fixing control positions in `*-panel-data.ts`
- The user mentions panel layout, control placement, or synth panel design
- Fixing visual issues with panel rendering

## Critical Principle: Reference-First, Never Algorithmic

**Every control must be hand-placed based on the physical panel image.** Do not use algorithmic grid layouts, computed positions, or uniform spacing. Real synth panels have intentional, non-uniform layouts that cannot be derived from control counts.

Before writing any code:
1. Read the instrument manual PDF (in `references/`) for panel layout pages
2. Ask the user for panel photos if the manual is unclear
3. Map the physical layout structure: which rows, which modules break the grid, which sections contain sub-sections

## Two Approaches — When to Use Which

### Data-Driven (Cascadia pattern) — DEFAULT for new instruments

Positions in a `CONTROL_POSITIONS` map, rendering via a generic loop over `CONTROL_METADATA`. Best when:
- Many repeated control types (knobs, sliders, jacks) across many modules
- Modular or semi-modular instruments with patch jacks and cables
- Frequent position iteration (change one number, not hunt through JSX)
- Cable rendering needed (jack positions in a lookup table)

**Reference implementation**: `src/components/cascadia-panel.tsx` + `src/lib/cascadia-panel-data.ts`

Key patterns:
- `CONTROL_POSITIONS` constant maps every control ID to `{x, y}`
- `SELECTOR_KNOBS` config maps selector knob IDs to their position labels
- `TWO_WAY_SWITCHES` Set distinguishes 2-way from 3-way rendering
- Generic render loop: `CONTROL_METADATA` → lookup position → switch on type → render component
- Cable paths render from `JACK_POSITIONS` lookup
- Sub-section labels and dividers as explicit SVG elements outside the loop

### Inline JSX (Evolver pattern) — for instruments with unique UI elements

Every control placed as explicit JSX with a `K()` helper. Best when:
- Instrument has many one-off visual elements (LCD display, sequencer LED grids, keyboard, mod wheels)
- Each section has a unique layout that doesn't repeat
- Few or no patch jacks / cable connections
- Small total control count

**Reference implementation**: `src/components/evolver-panel.tsx` + `src/lib/evolver-panel-data.ts`

Key patterns:
- `K(id, x, y, large, label)` helper renders interactive knobs inline
- Switches as inline `<g>` elements with hand-coded transforms
- Decorative elements (wood cheeks, LCD, brand text) mixed naturally with controls
- Two knob sizes: `knob-large` (r=14) and `knob-small` (r=10)
- NRPN parameter numbers in metadata (for MIDI-equipped instruments)

### Evolver-specific metadata differences
```typescript
// Evolver uses NRPN numbers and knob size distinction
interface ControlMeta {
  id: string;
  name: string;
  nrpn: number | null;           // MIDI parameter number
  section: string;
  type: 'knob-large' | 'knob-small' | 'switch' | 'led';  // No jacks, no sliders
}
```

## Architecture

Each instrument panel has two files:

### Data File: `src/lib/{instrument}-panel-data.ts`

For data-driven panels (Cascadia pattern):
```typescript
export interface {Instrument}ControlMeta {
  id: string;
  name: string;       // Short label matching the panel silk-screen
  module: string;     // Module/section it belongs to
  type: 'knob' | 'slider' | 'switch' | 'jack-in' | 'jack-out' | 'led';
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';  // Required for jacks
}

export const CONTROL_METADATA: Record<string, {Instrument}ControlMeta> = { ... };
export const SECTION_BOUNDS: Record<string, { x; y; width; height }> = { ... };
export function midiToRotation(value: number): number;
export function midiToSliderPosition(value: number): number;
```

For inline panels (Evolver pattern):
```typescript
export interface ControlMeta {
  id: string;
  name: string;
  nrpn: number | null;
  section: string;
  type: 'knob-large' | 'knob-small' | 'switch' | 'led';
}
```

### Component File: `src/components/{instrument}-panel.tsx`
- `'use client'` React component
- Data-driven: `CONTROL_POSITIONS` constant + type-switching render loop
- Inline: `K()` helper + explicit JSX per section
- Shared: `useKnobDrag` hook, glow filter defs, `PanelTooltip`, event delegation for hover
- Memo'd main component

## Control Types and How to Render Them

### Regular Knobs
Rotary knobs with indicator line. Supports drag interaction via `useKnobDrag`.
- Circle with indicator line rotated by `midiToRotation(value)`
- Label below
- Evolver distinguishes large (r=14) and small (r=10); Cascadia uses uniform r=12

### Selector Knobs (click-position rotary selectors)
Rotary selectors that click into labeled positions (e.g., VCF Mode: LP1-PHZ, Octave: 0-7).
- Larger circle with position labels arranged in an arc around it
- NOT a switch, NOT a regular knob — distinct visual treatment
- Data type is `'knob'` but listed in `SELECTOR_KNOBS` config: `{ 'knob-id': ['POS1', 'POS2', ...] }`
- Render with `SelectorKnobComponent`

### Sliders (modular instruments only)
Vertical faders with draggable thumb via `useSliderDrag`.
- Track height ~90px to match physical fader proportions
- Thumb slides vertically based on MIDI value
- Label below

### 2-Way Switches (on/off toggles)
Two circles stacked vertically. Selected position filled orange (`#cc4422`), other open.
- Listed in `TWO_WAY_SWITCHES` Set
- Examples: Soft Clip, TZFM, AC/DC, VCO/LFO, Env Follow, Slew Shape

### 3-Way Switches (three-position selectors)
Three circles stacked vertically (traffic light style). Selected position filled orange.
- Default for any switch NOT in `TWO_WAY_SWITCHES`
- Examples: Sub Type, Noise Type, Slew Direction, Pitch Source
- Labels go ABOVE the switch, not below (prevents visual association with wrong control)

### Rectangular Button Switches (Evolver style)
Small labeled rectangles. Used for mode/program selection, sequencer controls.
- `<rect>` with `switchRect` style + centered `<text>` label
- Optional LED indicator circle adjacent
- Used when the physical panel has labeled pushbuttons rather than toggle switches

### Input Jacks (modular only)
Dark circles (`fill: #1a1a1a`, `stroke: #555`).
- Label below with name (e.g., "PITCH IN", "FM 1 IN")

### Output Jacks (modular only)
**White-filled circles** (`fill: #e8e8e8`, `stroke: #fff`).
- Immediately distinguishable from input jacks
- Labels should NOT include "OUT" — just the signal name (e.g., "SINE", "LP4", "VCF")

### LEDs
Small indicator dots (r=3-4). Near switches or controls they indicate.
- Evolver: colored styles (`ledBlue`, `ledRed`, `ledOff`) for sequencer/mode indication
- Cascadia: simple off state, used sparingly

### Special Elements (inline approach only)
- **LCD Display**: `<rect>` background + monospace `<text>` for program/parameter display
- **Sequencer LEDs**: Grid of circles with `ledBlue`/`ledOff` states
- **Keyboard**: White and black key `<rect>` elements
- **Mod/Pitch Wheels**: Rounded rectangles with track + position indicator
- **Wood Side Cheeks**: Decorative side panels (`<rect>` with wood-tone fill)

## Layout Rules

### Row Structure
Panels are organized in horizontal rows separated by thin bars:
```
Top strip:   FX/Output controls, or logo/display area
Row 1:       Main audio path modules
Row 2:       Modulation/utility modules
Row 3:       Oscillators, envelopes
```

Evolver uses two rows (top: modulators/sequencer/display, bottom: oscillators/filters/output).
Cascadia uses four zones (top strip + 3 rows) with a grid-breaking left column.

### Grid-Breaking Sections
Some modules span multiple rows on one side. Handle with:
- Partial-width separator bars (don't span full width where the column breaks through)
- Separate divider bars within the breaking column
- Section bounds that reflect the actual span

### Sub-Sections
Complex modules may contain distinct sub-sections needing their own labels and dividers:
- **Utilities** → S&H, Slew/Env Follow, Mixuverter
- **Patchbay** → Mults, Sum, Invert, Bi+Uni, Expr Src, Ring Mod
- Set the parent module's display name to `''` and add explicit `<text>` sub-labels

### Section Labels
- Position in the **separator bar above** each row, not inside the module area
- Use `??` (nullish coalescing) not `||` when checking display names, so `''` doesn't fall through to the module key

## Spacing Guidelines

1. **Jacks near their controls** — patch points close to associated sliders/knobs, not far below
2. **Align across sections** — jacks in the same row across modules share the same y-coordinate
3. **Sliders under jacks** — each slider aligns vertically with its corresponding input jack
4. **Switches stacked vertically** — never in horizontal rows. Stacked on the side of the module
5. **Eliminate whitespace** — tighten vertically and horizontally between rows and controls
6. **ViewBox sizing** — height fits the content exactly, no excess space at bottom

## Data Model Accuracy Checklist

Before creating control metadata, verify against the physical panel:

- [ ] Every jack is typed correctly as `jack-in` or `jack-out`
- [ ] External inputs (EXT IN) are `jack-in`, not switches/buttons
- [ ] Rotary selectors with click positions are `knob` type, listed in `SELECTOR_KNOBS`
- [ ] Toggle switches classified as 2-way or 3-way correctly
- [ ] No phantom controls that don't exist on the physical panel
- [ ] Output jack names don't include "OUT"
- [ ] Control count per module matches the physical panel
- [ ] NRPN numbers verified against manual parameter list (if applicable)

## Integration Points

### Session Detail Embedding
`src/components/session-detail.tsx` detects panel markers per instrument:
- Regex: `/<div data-{instrument}-panel([^>]*)>\s*<\/div>/g`
- Parser function: `parse{Instrument}PanelProps(attrString)`
- Renders the correct panel component based on `instrumentSlug`
- When adding a new instrument, add a new regex + parser + conditional render branch

### Standalone Route
`src/app/instruments/[slug]/panel/page.tsx` renders the panel at `/instruments/{slug}/panel`.
- Add the instrument to `PANEL_CONFIG` with title, description, and maxWidth
- Update `standalone-panel-client.tsx` to conditionally render the new panel component

### Quick Reference Panel
`src/components/quick-ref-panel.tsx` shows a Panel tab in the session sidebar.
- Add conditional `{instrumentSlug === '{slug}' && <{Instrument}Panel />}` block

### Patch Detail
`src/components/patch-detail.tsx` shows the panel inline for patch pages.
- Add conditional render for the new instrument with cable_routing mapping

## Content Pipeline

When adding panel markers to session files, **update all three locations**:
1. `sessions/{instrument}/*.md` — source of truth in the repo
2. `src/content/sessions/{instrument}/*.md` — bundled content for Vercel deploys
3. `~/song/sessions/{instrument}/*.md` — Obsidian vault (app reads from here locally)

The app reads from `~/song` when `vaultPath` is configured in `evolver.config.json`. If the vault doesn't exist (Vercel), it falls back to `src/content/`. Missing the vault sync means panels won't render locally even though the code is correct.

### Marker Format
```html
<!-- Basic: zoom to sections, highlight controls -->
<div data-{instrument}-panel
  data-sections="module-a,module-b"
  data-knobs="knob-id:64,slider-id:100"
  data-highlights="control-id:blue,jack-id:amber"
></div>

<!-- With cables (modular instruments) -->
<div data-{instrument}-panel
  data-sections="vco-a,mixer"
  data-cables="jack-source>jack-dest:audio,jack-b>jack-c:cv"
></div>
```

## Iterative Workflow

Panel building is inherently visual and iterative:

1. **Study the reference** — read the manual, identify every control type and its physical position
2. **Structure first** — get the row layout and module positions roughly right
3. **Module by module** — work through each section comparing to the reference image
4. **User screenshots** — the user will share screenshots showing issues. Compare to the manual
5. **Small adjustments** — position tweaks of 10-20px are normal. Make the change, reload, check
6. **Test after changes** — run `npx vitest run` on the data and component test files
7. **Tighten last** — eliminate whitespace only after positions are structurally correct

## Testing

### Data tests (`src/lib/__tests__/{instrument}-panel-data.test.ts`)
- Total control count matches expected
- Every entry has required fields (id, name, module, type)
- Every jack has signalType
- Module names are all valid
- Section bounds have positive dimensions
- Per-module control counts match the physical panel
- Utility functions (midiToRotation, midiToSliderPosition) boundary values

### Component tests (`src/components/__tests__/{instrument}-panel.test.tsx`)
- Renders without crashing
- SVG has correct viewBox
- Cable paths appear with correct bezier commands (modular only)
- Cable colors match signal type
- Glow filter applied for highlighted controls
- Zoom changes viewBox when zoomSections provided

## File Naming Convention

- Data: `src/lib/{instrument}-panel-data.ts`
- Component: `src/components/{instrument}-panel.tsx`
- Tests: `src/lib/__tests__/{instrument}-panel-data.test.ts`, `src/components/__tests__/{instrument}-panel.test.tsx`
- Tooltip: `src/components/evolver-panel-tooltip.tsx` (shared across instruments)
- ID convention: `{type}-{module}-{name-kebab}` (e.g., `knob-vco-a-pitch`, `jack-mixer-out`, `switch-vcf-mode`)
