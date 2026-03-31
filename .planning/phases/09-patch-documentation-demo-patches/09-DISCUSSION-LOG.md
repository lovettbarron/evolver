# Phase 9: Patch Documentation + Demo Patches - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-31
**Phase:** 09-patch-documentation-demo-patches
**Areas discussed:** Cable routing schema, Knob settings format, Audio previews, Patch content scope

---

## Cable Routing Schema

| Option | Description | Selected |
|--------|-------------|----------|
| Flat connections array | Array of {source, destination, purpose} objects. One entry per cable. | ✓ |
| Grouped by signal type | Connections grouped under audio/cv/gate categories. More organized but adds nesting. | |
| Minimal pairs format | Source and destination as compact string pair, purpose in markdown body. | |

**User's choice:** Flat connections array
**Notes:** Simple, one entry per physical cable. No grouping by signal type.

### Follow-up: Jack Names

| Option | Description | Selected |
|--------|-------------|----------|
| Human-friendly labels | Display names like "VCO-A Saw Out". More readable, used directly in Mermaid labels. | ✓ |
| Canonical IDs + display | Machine-readable ID alongside display label. Enables future linking but adds complexity. | |

**User's choice:** Human-friendly labels
**Notes:** No machine IDs needed now.

---

## Knob Settings Format

| Option | Description | Selected |
|--------|-------------|----------|
| Clock positions | Clock notation ("7 o'clock", "12 o'clock", "full CW") for all controls. | |
| Percentage values | 0-100% for all controls. More precise, less natural. | |
| Mixed (clock + notes) | Clock positions for knobs, actual values for switches/toggles. | ✓ |

**User's choice:** Mixed (clock + notes)
**Notes:** Clock positions for continuous controls, actual values (ON, LP, Mid) for switches and toggles.

### Follow-up: Completeness

| Option | Description | Selected |
|--------|-------------|----------|
| Only non-default controls | Just the knobs you turned. Assumes reader knows normalled state. | |
| All controls per active module | Every knob/switch on every module used. Complete but verbose. | |
| Key controls + "rest at default" note | Important knobs documented, "rest at default" note per module. | ✓ |

**User's choice:** Key controls + "rest at default" note
**Notes:** Middle ground between brevity and completeness.

---

## Audio Previews

| Option | Description | Selected |
|--------|-------------|----------|
| Reference-only field | Frontmatter has audio_preview filename. No files shipped. UI shows placeholder when missing. | ✓ |
| Embedded audio player | Build working audio player component now, ship with placeholder files. | |
| External links only | Link to SoundCloud/YouTube. No audio infrastructure needed. | |

**User's choice:** Reference-only field
**Notes:** Schema ready for audio, player deferred until recordings exist. Files expected at public/audio/cascadia/.

---

## Patch Content Scope

### Category Balance

| Option | Description | Selected |
|--------|-------------|----------|
| Balanced spread | 2-3 patches per category. ~14 patches total covering all territory equally. | ✓ |
| Weighted toward Cascadia strengths | More patches in west coast timbres, drones, textures. Fewer conventional. | |
| Curriculum-aligned | Patches chosen to preview curriculum session topics. | |

**User's choice:** Balanced spread
**Notes:** bass (2-3), lead (2-3), pad (2-3), drum (2), texture (2), FX (2).

### Provenance

| Option | Description | Selected |
|--------|-------------|----------|
| Standalone | Demo patches independent, no session_origin. Curriculum references patches later. | ✓ |
| Forward-reference sessions | Set session_origin to planned session numbers now. | |

**User's choice:** Standalone
**Notes:** Avoids circular dependencies. Curriculum sessions (Phase 10-11) will reference patches, not the other way around.

### Mermaid Rendering

| Option | Description | Selected |
|--------|-------------|----------|
| Auto-generated from cable_routing | Patch detail page generates Mermaid from frontmatter. Every patch gets a visual. | ✓ |
| Hand-written per patch | Each patch includes hand-crafted Mermaid in markdown body. | |
| Both options | Auto-generated default with optional override field. | |

**User's choice:** Auto-generated from cable_routing
**Notes:** No hand-written diagrams needed. Mermaid flowchart generated directly from the cable_routing array.

---

## Claude's Discretion

- Exact Mermaid graph direction and node styling
- Patch naming conventions and slug format
- Instrument type detection for conditional rendering
- Complexity range across demo patches
- Whether to add helper fields alongside knob settings

## Deferred Ideas

None — discussion stayed within phase scope.
