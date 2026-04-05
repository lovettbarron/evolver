# Phase 13: Cascadia Panel Visualizer - Context

**Gathered:** 2026-04-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Create an interactive Cascadia panel SVG as inline JSX React component — traced from the manual for accurate module layout. Build control metadata map for all knobs, switches, and 90+ patch jacks across 17 modules. Render cable connections between jacks. Embed inline panel diagrams across all 25 Cascadia sessions using the same marker system as the Evolver. Extend session-detail.tsx to support `data-cascadia-panel` markers.

</domain>

<decisions>
## Implementation Decisions

### SVG Source & Rendering
- **D-01:** Single full-panel SVG traced from the Cascadia manual — all 17 modules left-to-right in one view, matching the physical instrument layout. Not a simplified schematic — aim for manual-accurate positions and proportions.
- **D-02:** Monochrome styling (carried from Phase 12) — black/white/grey panel with color only for highlights, section tints, and cable connections.
- **D-03:** Inline JSX approach (carried from Phase 12) — convert SVG to React component with camelCase attributes, individual control IDs, and props-driven state.

### Module Sections
- **D-04:** 1:1 module-to-section mapping — each of the 17 hardware modules is its own section in SECTION_BOUNDS. Section names match module names: `midi-cv`, `vco-a`, `vco-b`, `envelope-a`, `envelope-b`, `line-in`, `mixer`, `vcf`, `wave-folder`, `vca-a`, `push-gate`, `utilities`, `lfo-xyz`, `patchbay`, `vca-b-lpf`, `fx-send-return`, `output-control`.
- **D-05:** Auto-zoom crops to individual modules or groups of modules when `data-sections` is set (carried from Phase 12).

### Patch Points & Cables
- **D-06:** All 90+ patch jacks always visible as small labeled circles at their correct panel positions. Part of the panel identity — the Cascadia IS its patch points.
- **D-07:** Highlighted jacks glow (blue/amber) when a session describes cable connections. New `data-cables` attribute in markers specifies connections.
- **D-08:** Draw colored SVG lines between connected jacks to visualize cable patches. This is the modular equivalent of the Evolver's knob-value visualization. Cable lines rendered as curved SVG paths between source and destination jack positions.

### Interaction & Integration
- **D-09:** Knob drag interaction (carried from Phase 12) — vertical drag changes value, onChange callback.
- **D-10:** Switches and LEDs display-only (carried from Phase 12).
- **D-11:** Hover tooltip with control name, parameter info, and current value (carried from Phase 12).
- **D-12:** Inline session embedding via `<div data-cascadia-panel>` markers in markdown, processed by session-detail.tsx (extend existing Evolver pattern to support both instruments).
- **D-13:** Same four integration contexts as Evolver: session inline, patch detail, quick-ref panel tab, standalone route (/instruments/cascadia/panel).

### Claude's Discretion
- Cable path rendering style (straight lines, bezier curves, or right-angle routes)
- Cable color scheme (per-signal-type, per-connection, or single accent color)
- SVG viewBox dimensions for the wider Cascadia panel
- Exact jack ID naming convention (follow existing module file naming patterns)
- How to handle the multi-instrument panel parsing in session-detail.tsx (separate regex per instrument vs unified)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Panel Source
- `references/cascadia_manual_v1.1_2023.04.18.pdf` — Official manual with panel diagrams, module layouts, and parameter reference
- `references/cascadia-patch-book.pdf` — Patch recipes showing cable connections (reference for data-cables format)

### Existing Implementation (Phase 12 pattern to follow)
- `src/components/evolver-panel.tsx` — Reference implementation: inline JSX SVG, monochrome styling, knob drag, section tints, zoom
- `src/lib/evolver-panel-data.ts` — Reference implementation: control metadata map, SECTION_BOUNDS, midiToRotation
- `src/components/evolver-panel-tooltip.tsx` — Tooltip component (reusable or adaptable)
- `src/components/session-detail.tsx` — Inline panel embedding: HTML splitting at markers, prop parsing, auto-zoom
- `framework/curriculum-authoring-guide.md` — Panel embedding documentation and marker format

### Cascadia Instrument Data
- `instruments/cascadia/overview.md` — Panel layout (17 modules listed in order), normalling overview
- `instruments/cascadia/signal-flow.md` — Audio path and default connections
- `instruments/cascadia/modules.md` — Module index
- `instruments/cascadia/modules/*.md` — Per-module documentation (17 files with parameter details)

### Session Content
- `sessions/cascadia/*.md` — 25 session files to receive panel markers

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `evolver-panel.tsx`: Full pattern for JSX SVG panel with knob drag, glow filters, section tints, memo. Can be adapted for Cascadia.
- `evolver-panel-data.ts`: Metadata map pattern (ControlMeta interface, SECTION_BOUNDS, midiToRotation). Same interface works for Cascadia.
- `evolver-panel-tooltip.tsx`: PanelTooltip component — reusable as-is if props interface matches.
- `session-detail.tsx`: Panel marker parsing with `parsePanelProps()` and HTML splitting. Needs extension for `data-cascadia-panel` markers.

### Established Patterns
- Monochrome SVG styling with color only for highlights
- `data-knobs`, `data-highlights`, `data-sections`, `data-zoom` attribute format
- Auto-zoom via `computeZoomViewBox()` from SECTION_BOUNDS
- Content synced to 3 locations: sessions/, src/content/sessions/, ~/song/sessions/

### Integration Points
- `session-detail.tsx` — add `data-cascadia-panel` marker detection alongside existing Evolver markers
- `quick-ref-panel.tsx` — add Cascadia Panel tab (already has Evolver Panel tab)
- `patch-detail.tsx` — add Cascadia inline panel
- `src/app/instruments/[slug]/panel/page.tsx` — already guards on slug, needs Cascadia component import

### New Capability Needed
- Cable rendering (SVG path between jacks) — new for Cascadia, Evolver didn't have patch points
- `data-cables` attribute parsing in session-detail.tsx
- Jack metadata in addition to knob metadata (ControlMeta type may need `'jack-in' | 'jack-out'` additions)

</code_context>

<specifics>
## Specific Ideas

- The Cascadia manual PDF has panel diagrams that should be traced for accurate module positions — not simplified or schematic
- Cable visualization is the key differentiator from the Evolver panel — it's the modular equivalent of showing knob positions
- The 17 module names should match the existing `instruments/cascadia/modules/` file naming for consistency

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 13-cascadia-panel-visualizer*
*Context gathered: 2026-04-04*
