# Stack Research: Cascadia Instrument Support

**Domain:** Semi-modular synth learning platform (CV-only instrument addition)
**Researched:** 2026-03-30
**Confidence:** HIGH

## Executive Summary

The Cascadia milestone requires zero new npm dependencies. The existing stack (Next.js 15, Zod 3, markdown pipeline, Mermaid 11) covers all needs. The primary challenge is representational: how to document CV patch cable routings without SysEx or digital patch memory. The answer is a Patchbook-inspired YAML convention rendered with Mermaid (already installed) and custom React components using Tailwind (already installed).

## Recommended Stack Additions

### New Dependencies

None. The existing `package.json` covers all Cascadia requirements.

### Existing Dependencies That Cover Cascadia Needs

| Existing Dependency | Version (installed) | Cascadia Use |
|---------------------|---------------------|-------------|
| `mermaid` | ^11.13.0 | Signal flow diagrams for Cascadia architecture, auto-generated patch routing diagrams from YAML frontmatter |
| `zod` | ^3.23.0 | Extended PatchSchema with `connections` and `settings` fields for CV patch documentation |
| `gray-matter` | ^4.0.3 | Parse Cascadia patch YAML frontmatter (same pipeline as Evolver) |
| `remark-*` / `rehype-*` pipeline | various | Render Cascadia session and patch markdown identically to Evolver |
| `lucide-react` | ^1.7.0 | Icons for patch point types (audio out, CV in, gate, trigger) and module indicators |
| `react-pdf` | ^10.4.1 | Cascadia manual reference (already at `/content/references/cascadia_manual_v1.1.pdf`) |
| `clsx` | ^2.1.1 | Conditional styling for instrument-specific UI states (hide MIDI workspace, show patch diagram) |

## The Patch Documentation Problem

### Problem

The Evolver stores patches as SysEx parameter dumps -- every knob position is an exact integer in a data structure. The Cascadia has no patch memory and no SysEx. A "patch" is a physical cable configuration plus knob/slider positions. How do we represent this in markdown?

### Solution: Patchbook-Inspired YAML Convention

Use a structured YAML frontmatter format inspired by [Patchbook](https://github.com/SpektroAudio/Patchbook), a markup language for modular synth patches by Spektro Audio. We adopt its conventions as YAML parsed by existing Zod schemas. No new dependency needed -- Patchbook itself is a Python parser we do not want.

**Why not Patchbook directly:** Python tool, wrong runtime. We already have markdown + YAML + Zod. Adopting its notation ideas into our existing format is simpler.

**Why not React Flow (@xyflow/react v12.10.2):** 200KB+ interactive node graph editor designed for drag-and-drop UIs. We need static, read-only patch documentation. Mermaid flowcharts handle this and are already installed.

**Why not d3:** Massive general-purpose visualization library. Overkill for labeled connection diagrams between named modules.

### Proposed Cascadia Patch Frontmatter

```yaml
---
name: "Acid Bass with LPF Sweep"
type: bass
session_origin: 3
description: "303-inspired acid bass using VCO A through the multimode VCF"
tags: [bass, acid, lpf, vcf]
instrument: cascadia
created: "2026-04-15"
patch_format: cv  # distinguishes from Evolver 'sysex' format

# Cable connections (Patchbook-inspired)
connections:
  - from: "VCO A (Triangle)"
    to: "Mixer (Ch 1)"
    type: audio
  - from: "MIDI (Pitch Out)"
    to: "VCO A (1V/Oct)"
    type: pitch
  - from: "EG 1 (Out)"
    to: "VCF (FM 2)"
    type: cv
  - from: "LFO 1 (Triangle)"
    to: "VCO A (FM 1)"
    type: cv

# Knob/slider positions (percentages, not exact values)
settings:
  VCO A:
    frequency: "C2"
    wave_shape: "Triangle"
    pulse_width: "50%"
  VCF:
    cutoff: "30%"
    resonance: "70%"
    mode: "LP"
  EG 1:
    attack: "0%"
    decay: "45%"
    sustain: "5%"
    release: "15%"
---
```

### Connection Type Taxonomy

Adopted from Patchbook's signal type notation:

| Type | Meaning | Color Hint (for diagrams) |
|------|---------|--------------------------|
| `audio` | Audio signal path | Blue |
| `cv` | Control voltage modulation | Orange |
| `pitch` | 1V/Oct pitch tracking | Green |
| `gate` | Gate/trigger signal | Red |
| `clock` | Clock signal | Purple |

### Rendering Strategy

Two render modes from the same YAML data, no new dependencies:

1. **Connection table** (default): Structured "From -> To (Type)" table. Works everywhere including Obsidian.
2. **Mermaid diagram** (enhanced): Auto-generate a Mermaid flowchart from the `connections` array at render time. New component transforms YAML into Mermaid graph definition string, passes to existing `MermaidRenderer`.

Example generated Mermaid:
```
graph LR
    VCOA[VCO A] -->|Triangle| Mixer
    MIDI -->|Pitch Out| VCOA
    EG1[EG 1] -->|CV| VCF
    LFO1[LFO 1] -->|CV| VCOA
    Mixer --> VCF --> VCA --> Output
```

## Schema Changes Required

### Extended PatchSchema

```typescript
const ConnectionSchema = z.object({
  from: z.string(),   // "Module (Output Label)"
  to: z.string(),     // "Module (Input Label)"
  type: z.enum(['audio', 'cv', 'pitch', 'gate', 'clock']),
});

const SettingValueSchema = z.record(z.string(), z.string());

// Add to existing PatchSchema:
patch_format: z.enum(['sysex', 'cv']).optional(),
connections: z.array(ConnectionSchema).optional(),
settings: z.record(z.string(), SettingValueSchema).optional(),
```

The existing `.passthrough()` on PatchSchema means these new fields will pass validation even before the schema is formally updated, but they should be added explicitly for type inference.

### Extended InstrumentFileSchema

```typescript
// Add 'patch-points' to the type enum:
type: z.enum([
  'overview', 'signal-flow', 'basic-patch', 'modules',
  'patch-points',  // NEW: Cascadia's 101 patch points reference
]),
```

## New Components (Zero New Dependencies)

| Component | Purpose | Built With |
|-----------|---------|------------|
| `PatchConnectionDiagram` | Transform `connections` YAML into Mermaid flowchart, render via existing `MermaidRenderer` | `mermaid` (installed) |
| `PatchConnectionTable` | Render connections as structured table with type icons | React + Tailwind + `lucide-react` (installed) |
| `KnobSettings` | Render `settings` YAML as module-grouped parameter tables | React + Tailwind (installed) |
| `PatchPointReference` | Quick-reference of Cascadia's 101 patch points by module | React + Tailwind + `lucide-react` (installed) |
| `InstrumentMidiGuard` | Conditionally hide MIDI/SysEx workspace for CV-only instruments | React conditional rendering |

## Cascadia Module Taxonomy

The Cascadia has a fixed set of modules that patch content must reference consistently. This should be a TypeScript const object, not a dependency:

```typescript
export const CASCADIA_MODULES = {
  'VCO A': { type: 'oscillator', patchPoints: 8 },
  'VCO B': { type: 'oscillator', patchPoints: 6 },
  'Noise': { type: 'source', patchPoints: 2 },
  'Sub Osc': { type: 'source', patchPoints: 1 },
  'Mixer': { type: 'mixer', patchPoints: 8 },
  'VCF': { type: 'filter', patchPoints: 10 },
  'Wave Folder': { type: 'waveshaper', patchPoints: 4 },
  'Ring Mod': { type: 'modulator', patchPoints: 3 },
  'VCA': { type: 'amplifier', patchPoints: 4 },
  'EG 1': { type: 'envelope', patchPoints: 4 },
  'EG 2': { type: 'envelope', patchPoints: 4 },
  'LFO 1': { type: 'modulation', patchPoints: 6 },
  'LFO 2': { type: 'modulation', patchPoints: 4 },
  'S&H': { type: 'utility', patchPoints: 4 },
  'Slew': { type: 'utility', patchPoints: 3 },
  'FX Send/Return': { type: 'effects', patchPoints: 4 },
  'Attenuators': { type: 'utility', patchPoints: 8 },
  'Mult': { type: 'utility', patchPoints: 6 },
  'MIDI': { type: 'interface', patchPoints: 6 },
  'Output': { type: 'output', patchPoints: 4 },
} as const;
```

## Alternatives Considered

| Recommended | Alternative | Why Not |
|-------------|-------------|---------|
| Mermaid flowcharts for patch routing | @xyflow/react (React Flow) v12 | 200KB+ interactive library for read-only static diagrams. Mermaid already installed, works in Obsidian too |
| Patchbook-inspired YAML | Patchbook Python parser | Wrong runtime. We only need the notation conventions, not the Python tool |
| YAML frontmatter for connections | Separate `.patch` file format | Breaks content pipeline. YAML in frontmatter keeps everything in one markdown file |
| Percentage-based knob settings | Free-text parameter tables (like Evolver) | Evolver tables work because SysEx gives exact integers. Cascadia knobs are analog -- percentages need structure to be searchable |
| Mermaid auto-generation from YAML | Hand-written Mermaid in markdown body | Error-prone, duplicates connection data, hard to keep in sync with frontmatter |
| Static SVG panel diagram (future) | Interactive canvas-based patch visualizer | Good long-term differentiator but large design effort. Start with tables + Mermaid |

## What NOT to Add

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `@xyflow/react` | 200KB+, interactive features unused, client-only rendering | Mermaid (installed) |
| `reactflow` | Deprecated package name for @xyflow/react | N/A |
| `d3` / `d3-*` | Massive general-purpose viz library, steep API | Mermaid for graphs, Tailwind for custom UI |
| `tone.js` / Web Audio | This is documentation, not a synth emulator | Out of scope |
| Any new MIDI library | Cascadia has no SysEx. MIDI is input-only (note data) | Existing MIDI code stays Evolver-specific |
| `canvas` / `konva` / `fabric.js` | Canvas-based rendering for what is fundamentally text data | HTML tables + Mermaid SVG |
| `graphviz` / `viz.js` | Patchbook uses GraphViz but we already have Mermaid | Mermaid (installed) |

## Stack Patterns by Instrument Type

**If instrument has SysEx (like Evolver):**
- `patch_format: 'sysex'` in frontmatter
- Show MIDI workspace components
- Render parameter tables with exact numeric values
- Enable SysEx capture/send/diff features

**If instrument is CV-only (like Cascadia):**
- `patch_format: 'cv'` in frontmatter
- Hide MIDI workspace via `InstrumentMidiGuard`
- Render Mermaid signal flow from `connections` array
- Show knob settings as percentage/descriptive values
- Add "Patch Points Used" summary from connections data
- Link to Baratatronix for patch inspiration format reference

## Installation

```bash
# No new packages needed.
# Existing dependencies cover all Cascadia requirements.
```

## Version Compatibility

No new packages means no new compatibility concerns.

| Package | Installed | Cascadia Impact |
|---------|-----------|-----------------|
| mermaid | ^11.13.0 | Flowchart diagram type handles all patch routing visualization needed |
| zod | ^3.23.0 | `.passthrough()` on schemas means new YAML fields work immediately; formal schema update needed for type inference |
| next | ^15.5.14 | App Router conditional rendering handles instrument-specific UI |
| lucide-react | ^1.7.0 | Has cable/plug/signal icons suitable for patch point type indicators |

## Sources

- [Baratatronix Cascadia Patches](https://www.baratatronix.com/cascadia-patches) -- Patch documentation format with audio previews, visual diagrams, tag categorization (MEDIUM confidence)
- [Baratatronix Ageispolis Pad](https://www.baratatronix.com/cascadia/cascadia-ageispolis-pad) -- Individual patch: visual diagram + patching instructions + dual-mono setup (MEDIUM confidence)
- [Intellijel Cascadia Patch Sheet](https://intellijel.com/downloads/manuals/cascadia_patch_sheet.pdf) -- Official blank template for documenting cable connections (HIGH confidence)
- [Intellijel Cascadia Manual v1.1](https://intellijel.com/downloads/manuals/cascadia_manual_v1.1_2023.04.18.pdf) -- 101 patch points, module architecture, default signal flow (HIGH confidence)
- [Patchbook by SpektroAudio](https://github.com/SpektroAudio/Patchbook) -- Markup language for modular patches: connection syntax, type taxonomy, parameter notation (HIGH confidence)
- [PATCH & TWEAK Symbols](https://www.patchandtweak.com/symbols/) -- Free CC-licensed symbol system for modular patch documentation (MEDIUM confidence)
- [@xyflow/react on npm](https://www.npmjs.com/package/@xyflow/react) -- v12.10.2, evaluated and rejected as overkill (HIGH confidence)

---
*Stack research for: Cascadia instrument support in Evolver learning platform*
*Researched: 2026-03-30*
