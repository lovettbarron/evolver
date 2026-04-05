# Phase 13: Cascadia Panel Visualizer - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-04
**Phase:** 13-cascadia-panel-visualizer
**Areas discussed:** SVG source strategy, Module granularity, Patch point rendering

---

## SVG Source Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Simplified schematic | Monochrome block layout, ~1500-2000 lines, functional reference | |
| Trace from manual | Use manual panel diagram for accurate representation, higher fidelity | ✓ |
| Module cards | Separate card/block per module, simpler but loses panel context | |

**User's choice:** Trace from manual
**Notes:** User wants higher fidelity traced from the Cascadia manual PDF

### Follow-up: Full panel vs per-module SVGs

| Option | Description | Selected |
|--------|-------------|----------|
| Single full panel | One wide SVG, all 17 modules left-to-right, zoom crops to relevant modules | ✓ |
| Per-module SVGs | 17 individual SVGs, composed together or shown individually | |

**User's choice:** Single full panel
**Notes:** Consistent with Evolver approach

---

## Module Granularity

| Option | Description | Selected |
|--------|-------------|----------|
| 1:1 module-to-section | Each of 17 modules is its own section, clean curriculum mapping | ✓ |
| Grouped sections | Combine related modules (~10 sections), less precise zoom | |
| Hybrid | Both individual and group sections available | |

**User's choice:** 1:1 module-to-section
**Notes:** Sessions target specific modules, so 1:1 mapping gives precise zoom

---

## Patch Point Rendering

| Option | Description | Selected |
|--------|-------------|----------|
| Always visible, small circles | All jacks rendered at correct positions, highlighted when referenced | ✓ |
| Visible but muted | Very subtle dots, prominent only when highlighted | |
| Hidden unless highlighted | Invisible by default, appear only when session highlights them | |

**User's choice:** Always visible, small circles
**Notes:** Jacks are part of the Cascadia's identity

### Follow-up: Cable visualization

| Option | Description | Selected |
|--------|-------------|----------|
| Draw cable lines | Colored SVG lines between connected jacks, data-cables attribute | ✓ |
| Highlight jacks only | Glow source/destination jacks without connecting line | |
| You decide | Claude's discretion | |

**User's choice:** Draw cable lines
**Notes:** The modular equivalent of Evolver's knob-value visualization

---

## Claude's Discretion

- Cable path rendering style (bezier, straight, right-angle)
- Cable color scheme
- SVG viewBox dimensions
- Jack ID naming convention
- Multi-instrument panel parsing approach in session-detail.tsx

## Deferred Ideas

None
