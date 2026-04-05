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

## Architecture

Each instrument panel has two files:

### Data File: `src/lib/{instrument}-panel-data.ts`
```typescript
// Control metadata — every control on the physical panel
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

### Component File: `src/components/{instrument}-panel.tsx`
- `'use client'` React component
- Hand-placed `CONTROL_POSITIONS` constant (NOT computed)
- Rendering helpers: `InteractiveKnob`, `InteractiveSlider`, `SwitchGroupComponent`, `JackGroupComponent`, `SelectorKnobComponent`, `CablePath`
- Memo'd main component with SVG output

## Control Types and How to Render Them

### Regular Knobs
Rotary knobs with indicator line. Supports drag interaction.
- Circle with indicator line rotated by `midiToRotation(value)`
- Label below

### Selector Knobs (click-position rotary selectors)
Rotary selectors that click into labeled positions (e.g., VCF Mode: LP1-PHZ, Octave: 0-7).
- Larger circle with position labels arranged in an arc
- NOT a switch, NOT a regular knob
- Define in `SELECTOR_KNOBS` config: `{ 'knob-id': ['POS1', 'POS2', ...] }`
- Render with `SelectorKnobComponent`

### Sliders
Vertical faders with draggable thumb.
- Track height should be tall (~90px) to match physical fader proportions
- Thumb slides vertically based on MIDI value
- Label below

### 2-Way Switches (on/off toggles)
Two circles stacked vertically. Selected position filled orange, other open.
- Define in `TWO_WAY_SWITCHES` Set
- Examples: Soft Clip, TZFM, AC/DC, VCO/LFO, Env Follow

### 3-Way Switches (three-position selectors)
Three circles stacked vertically (traffic light style). Selected position filled orange.
- Default for any switch NOT in `TWO_WAY_SWITCHES`
- Examples: Sub Type, Noise Type, Slew Direction, Pitch Source
- Labels go ABOVE the switch, not below (prevents visual association with wrong control)

### Input Jacks
Dark circles (`fill: #1a1a1a`, `stroke: #555`).
- Label below with full name (e.g., "PITCH IN", "FM 1 IN")

### Output Jacks
**White-filled circles** (`fill: #e8e8e8`, `stroke: #fff`).
- Immediately distinguishable from input jacks
- Labels should NOT include "OUT" — just the signal name (e.g., "SINE", "LP4", "VCF")

### LEDs
Small indicator dots. Usually near switches or controls they indicate.

## Layout Rules

### Row Structure
Panels are organized in horizontal rows separated by thin bars:
```
Top strip:   FX/Output controls (if applicable)
Row 1:       Main audio path modules
Row 2:       Modulation/utility modules
Row 3:       Oscillators, envelopes
```

### Grid-Breaking Sections
Some modules span multiple rows on one side. For example, Cascadia's S&H + VCO B form a vertical column on the left that breaks through Rows 2 and 3. Handle this with:
- Partial-width separator bars (don't span full width)
- Separate divider bars within the breaking column
- Adjusted section bounds

### Sub-Sections
Complex modules may contain distinct sub-sections:
- **Utilities** on Cascadia → S&H, Slew/Env Follow, Mixuverter (each with own label + divider)
- **Patchbay** → Mults, Sum, Invert, Bi+Uni, Expr Src, Ring Mod
- Add vertical divider lines and individual sub-section labels

### Section Labels
- Position in the **separator bar above** each row, not inside the module area
- Use empty string `''` in `MODULE_DISPLAY_NAMES` for sections that have sub-labels instead
- Sub-section labels rendered as explicit `<text>` elements

## Spacing Guidelines

1. **Jacks near their controls** — patch points sit close to associated sliders/knobs, not far below
2. **Align across sections** — jacks in the same row across different modules should share the same y-coordinate
3. **Sliders under jacks** — each slider should align vertically with its corresponding input jack above
4. **Switches stacked vertically** — never in horizontal rows. Stacked on the side of the module (usually left or right)
5. **Eliminate whitespace** — tighten controls vertically and horizontally. If there's a gap between rows, the separator bar and row content should be close
6. **ViewBox sizing** — set the viewBox height to just fit the content, no excess space at bottom

## Data Model Accuracy Checklist

Before creating control metadata, verify against the physical panel:

- [ ] Every jack is typed correctly as `jack-in` or `jack-out`
- [ ] External inputs (EXT IN) are `jack-in`, not switches/buttons
- [ ] Rotary selectors with click positions are `knob` type (not `switch`), listed in `SELECTOR_KNOBS`
- [ ] Toggle switches are classified as 2-way or 3-way correctly
- [ ] No phantom controls that don't exist on the physical panel
- [ ] Output jack names don't include "OUT"
- [ ] Control count per module matches the physical panel

## Content Pipeline

When adding panel markers to session files, **update all three locations**:
1. `sessions/{instrument}/*.md` — source of truth
2. `src/content/sessions/{instrument}/*.md` — bundled content
3. `~/song/sessions/{instrument}/*.md` — Obsidian vault (the app reads from here via `evolver.config.json`)

The app reads from `~/song` when `vaultPath` is configured. Missing this step means panels won't render even though the code is correct.

### Marker Format
```html
<div data-{instrument}-panel
  data-sections="module-a,module-b"
  data-knobs="knob-id:64,slider-id:100"
  data-highlights="control-id:blue,jack-id:amber"
  data-cables="jack-source>jack-dest:audio"
></div>
```

## Iterative Workflow

Panel building is inherently visual and iterative:

1. **Structure first** — get the row layout and module positions roughly right
2. **Module by module** — work through each section comparing to the reference image
3. **User screenshots** — the user will share screenshots showing issues. Compare to the manual
4. **Small adjustments** — position tweaks of 10-20px are normal. Make the change, reload, check
5. **Test after changes** — run `npx vitest run` on the data and component test files

## File Naming Convention

- Data: `src/lib/{instrument}-panel-data.ts`
- Component: `src/components/{instrument}-panel.tsx`
- Tests: `src/lib/__tests__/{instrument}-panel-data.test.ts`, `src/components/__tests__/{instrument}-panel.test.tsx`
- ID convention: `{type}-{module}-{name-kebab}` (e.g., `knob-vco-a-pitch`, `jack-mixer-out`, `switch-vcf-mode`)
