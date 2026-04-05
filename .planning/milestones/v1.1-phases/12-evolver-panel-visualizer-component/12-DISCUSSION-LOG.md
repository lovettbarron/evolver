# Phase 12: Evolver Panel Visualizer Component - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-03
**Phase:** 12-evolver-panel-visualizer-component
**Areas discussed:** Rendering approach, Annotation overlays, Integration surface, Interaction model

---

## Rendering Approach

### SVG Rendering Method

| Option | Description | Selected |
|--------|-------------|----------|
| Inline JSX SVG | Convert SVG to React component with JSX. Each control gets props for state. Full React control via existing IDs. | ✓ |
| SVG ref injection | Load SVG via fetch, inject into DOM, query elements by ID to manipulate. Less React-idiomatic. | |
| Hybrid: SVG import + overlay | Static SVG image with transparent React overlay layer for interactive elements. | |

**User's choice:** Inline JSX SVG
**Notes:** Preview showed component API with knobValues, highlights, and ledStates props.

### Knob Position Visualization

| Option | Description | Selected |
|--------|-------------|----------|
| Indicator rotation | Rotate existing knob indicator line based on MIDI value (0-127 → ~-135° to +135°). Matches real knobs. | ✓ |
| Color intensity | Change knob fill color intensity based on value. Simpler but less realistic. | |
| Both rotation + color | Rotate indicator AND add color ring that intensifies with value. Most informative but busiest. | |

**User's choice:** Indicator rotation
**Notes:** None

### Feedback Section Fix

| Option | Description | Selected |
|--------|-------------|----------|
| Fix it first | Correct Feedback section layout before converting to JSX. One-time fix, clean foundation. | ✓ |
| Ship as-is, fix later | Convert current SVG as-is. Layout inaccuracy is minor. | |
| You decide | Claude's discretion. | |

**User's choice:** Fix it first
**Notes:** Known issue from SVG v1 — Frequency on top, Level large below, Grunge as switch not knob.

---

## Annotation Overlays

### Highlight Style

| Option | Description | Selected |
|--------|-------------|----------|
| Glow ring | Colored glow/ring around highlighted controls. Blue for "adjust", amber for "listen". Subtle, works on dark panel. | ✓ |
| Numbered callouts | Numbered badges next to controls matching exercise steps. Clear ordering but visual clutter. | |
| Color fill change | Change knob/switch fill color when highlighted. Simpler but less visible. | |
| Glow ring + step numbers | Combine glow rings with small step number badges. Most informative. | |

**User's choice:** Glow ring
**Notes:** Preview showed SVG circle with filter glow effect.

### Value Labels

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, on hover | Show target value as tooltip when hovering highlighted control. Clean by default, informative on demand. | ✓ |
| Always visible | Small value labels next to every highlighted control. Could get crowded. | |
| No value labels | Just highlight controls. Users read session text for values. | |
| You decide | Claude's discretion. | |

**User's choice:** Yes, on hover
**Notes:** None

### Signal Flow

| Option | Description | Selected |
|--------|-------------|----------|
| Not in this phase | Individual control highlights only. Signal flow deferred. | |
| Simple section highlighting | Highlight entire sections with subtle background tint to show active signal chain areas. | ✓ |
| Connected path lines | Draw SVG path lines between sections. Most informative but significantly more complex. | |

**User's choice:** Simple section highlighting
**Notes:** None

---

## Integration Surface

### Placement

| Option | Description | Selected |
|--------|-------------|----------|
| Session detail pages | Panel alongside session exercises, highlighting controls being taught. | ✓ |
| Patch detail pages | Panel with knob positions set to patch's parameter values. | ✓ |
| Quick-ref panel | Add to existing quick-ref panel as interactive reference. | ✓ |
| Standalone route | Dedicated /instruments/evolver/panel page for exploring layout. | ✓ |

**User's choice:** All four placements
**Notes:** Multi-select — component will be reusable with different prop configurations per context.

### Session Page Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Collapsible sidebar | Panel in collapsible sidebar next to session text. Highlights update contextually. | ✓ |
| Inline between exercises | Panel renders inline within session content between exercise blocks. | |
| Sticky top panel | Panel fixed at top, always visible. Session content scrolls below. | |
| You decide | Claude's discretion. | |

**User's choice:** Collapsible sidebar
**Notes:** Preview showed sidebar layout with panel alongside session exercises.

---

## Interaction Model

### Interactivity Level

| Option | Description | Selected |
|--------|-------------|----------|
| Hover-only | Hover shows name, value, description. Read-only visualization. Simplest. | |
| Hover + click to filter | Hover shows info. Click filters sessions/patches to those using the control. | |
| Full interactive | Hover, click, drag knobs to change values. Most ambitious. | ✓ |
| You decide | Claude's discretion. | |

**User's choice:** Full interactive
**Notes:** None

### Knob Drag Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Visual only | Dragging updates rotation visually and shows value. No external side effects. | |
| Visual + callback prop | Dragging updates visually AND fires onChange callback. Parent decides what to do. | ✓ |
| Visual + MIDI CC output | Dragging sends MIDI CC to Evolver via WebMIDI. Full soft-panel. | |

**User's choice:** Visual + callback prop
**Notes:** Enables future MIDI wiring without coupling component to WebMIDI.

### Switch/LED Interactivity

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, fully interactive | Switches toggle on click, LEDs reflect state changes. Consistent with knobs. | |
| Display only | Show state but can't be toggled. Only knobs are draggable. | ✓ |
| You decide | Claude's discretion. | |

**User's choice:** Display only
**Notes:** None

---

## Claude's Discretion

- Patch detail page layout approach
- Quick-ref panel integration approach
- Standalone route layout and exploratory features
- Knob drag gesture specifics (vertical vs radial)
- Tooltip styling and positioning

## Deferred Ideas

None — discussion stayed within phase scope
