# Phase 12: Evolver Panel Visualizer Component - Context

**Gathered:** 2026-04-03
**Status:** Ready for planning

<domain>
## Phase Boundary

React component that renders the Evolver panel SVG as inline JSX with interactive state: draggable knobs with indicator rotation, glow-ring highlights for curriculum annotations, section highlighting for signal flow context, and hover tooltips with parameter info. Deployed across session detail, patch detail, quick-ref panel, and standalone route.

</domain>

<decisions>
## Implementation Decisions

### Rendering Approach
- **D-01:** Inline JSX SVG — convert the existing `references/evolver-panel.svg` to a React component with JSX. Each control element gets props for state (knob rotation, LED color, highlight). Full React control over every element via existing IDs.
- **D-02:** Knob positions visualized via indicator line rotation. MIDI value 0-127 maps to ~-135deg to +135deg sweep (7 o'clock to 5 o'clock). The SVG already has indicator lines on every knob.
- **D-03:** Fix the Feedback section layout in the SVG before converting to JSX — Frequency on top, Level large below, Grunge as switch not knob. One-time fix, clean foundation.

### Annotation Overlays
- **D-04:** Curriculum annotations use colored glow rings around highlighted controls (blue for "adjust this", amber for "listen to this change"). Subtle, doesn't obscure controls, works well on dark panel background. SVG filter `url(#glow)` approach.
- **D-05:** Value labels shown on hover only — tooltip with target value (e.g., "Filter Freq: 85 / 127") appears when hovering a highlighted control. Clean by default, informative on demand.
- **D-06:** Simple section highlighting — entire panel sections (Oscillators, Filter, Amp, etc.) get a subtle background tint to show which part of the signal chain is active in a session context. No connected path lines between sections.

### Integration Surface
- **D-07:** Component appears in four places: session detail pages (collapsible sidebar), patch detail pages, quick-ref panel, and standalone route (/instruments/evolver/panel).
- **D-08:** Session detail pages use a collapsible sidebar layout — panel sits next to session text, highlights update contextually with exercises. Doesn't take over the reading flow.
- **D-09:** Single reusable component with different prop configurations per context (sessions pass highlights + section tints, patches pass knob values, quick-ref is neutral, standalone is exploratory).

### Interaction Model
- **D-10:** Full interactive knobs — drag to change value, updates rotation visually and fires an onChange callback prop. Parent component decides what to do with value changes (future MIDI wiring).
- **D-11:** Switches and LEDs are display-only — show state but cannot be toggled by the user. Only knobs are draggable.
- **D-12:** Hover any control shows tooltip with name, current value (if set), and NRPN parameter number.

### Claude's Discretion
- Patch detail page layout (sidebar vs inline vs modal) — follow existing patch-detail component patterns
- Quick-ref panel integration approach — extend existing quick-ref-panel component
- Standalone route layout and any additional exploratory features
- Knob drag gesture specifics (vertical drag vs radial drag)
- Tooltip styling and positioning

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### SVG Source
- `references/evolver-panel.svg` — Source of truth SVG with all control IDs, CSS classes, and layout. Must be read to understand element structure before JSX conversion.

### Instrument Data
- `references/Evo_Key_Manual_1.3.pdf` — Official DSI manual with parameter numbers (NRPN), value ranges, and control descriptions needed for tooltips
- `instruments/evolver/parameters/` — Parameter data files if they exist (knob names, value ranges, NRPN mappings)

### Existing Components
- `src/components/cable-routing-diagram.tsx` — Prior art for interactive instrument visualization (Cascadia cable routing). Pattern reference for SVG-in-React approach.
- `src/components/knob-settings-table.tsx` — Existing component for displaying knob parameter values. Uses `KnobSetting` type from schemas.
- `src/components/quick-ref-panel.tsx` — Existing quick-ref panel that will be extended with the visualizer.
- `src/components/session-detail.tsx` — Session detail page where collapsible sidebar will be added.
- `src/components/patch-detail.tsx` — Patch detail page where panel visualization will be integrated.

### Schemas
- `src/lib/content/schemas.ts` — Zod schemas including KnobSetting, patch parameter types

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `cable-routing-diagram.tsx` — Interactive Cascadia cable diagram with hover states, prior art for SVG-based instrument visualization
- `knob-settings-table.tsx` — Renders knob settings grouped by module, uses `KnobSetting` schema
- `quick-ref-panel.tsx` — Existing quick-ref panel component, integration point for standalone panel view
- `mermaid-renderer.tsx` — Client-side rendering pattern (use client directive)

### Established Patterns
- Client components use `'use client'` directive for interactive features
- Tailwind CSS for styling throughout the app
- Zod schemas at content boundaries (`src/lib/content/schemas.ts`)
- Component props follow TypeScript interfaces

### Integration Points
- Session detail page — add collapsible sidebar with panel component
- Patch detail page — add panel visualization showing patch's knob positions
- Quick-ref panel — extend with interactive panel reference
- App routing — add `/instruments/evolver/panel` standalone route

</code_context>

<specifics>
## Specific Ideas

- Knob indicator rotation matches real hardware: 7 o'clock (0) to 5 o'clock (127), ~270-degree sweep
- Glow ring effect using SVG filter for curriculum highlights — blue for "adjust", amber for "listen"
- Section highlighting with subtle background tint shows active signal chain areas without path lines
- Collapsible sidebar on session pages keeps the reading flow intact while providing visual reference
- onChange callback prop on knobs enables future MIDI CC output without coupling the component to WebMIDI

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 12-evolver-panel-visualizer-component*
*Context gathered: 2026-04-03*
