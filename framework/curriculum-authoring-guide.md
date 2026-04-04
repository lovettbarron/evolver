# Curriculum Authoring Guide

How to create instrument curriculum for this framework. Whether you're forking the repo for your own synth, adding a new instrument to an existing instance, or contributing sessions, this document covers the pedagogical approach, content structure, and interactive panel system.

**Prerequisites**: Read [README.md](README.md) (core principles) and [adhd-design.md](adhd-design.md) (ADHD design rationale) first. This guide assumes you understand why sessions are 15-30 minutes with tangible output.

## Part 1: Planning a Curriculum

### Step 1: Gather Source Material

You need two types of sources:

**Primary sources** (manufacturer documentation):
- Official manual (PDF) — parameter reference, signal flow, MIDI/sysex specs
- Factory preset documentation
- Firmware/OS release notes for your version

**Pedagogical sources** (how people actually learn the instrument):
- Third-party guides (e.g., Anu Kirk's guide for the Evolver)
- YouTube tutorials from respected educators
- Forum posts explaining non-obvious techniques
- Patch recipe collections

Put PDFs in `references/` and note their page ranges per topic area. You'll reference these throughout your sessions.

### Step 2: Map the Signal Flow

Before writing sessions, trace the complete audio path of your instrument. Create `instruments/<name>/signal-flow.md` documenting:

1. **Sound sources** — oscillators, noise, samples, external input
2. **Mixing** — how sources combine before filtering
3. **Shaping** — filters, waveshapers, VCAs
4. **Modulation** — envelopes, LFOs, mod matrix, sequencer
5. **Effects** — delay, reverb, distortion, etc.
6. **Output** — stereo/mono, headphones, individual outs

This signal flow determines your module ordering. You always teach upstream before downstream: sources → shaping → modulation → effects → integration.

### Step 3: Define the Basic Patch

Every instrument needs a "home base" — a minimal, known-good state that isolates whatever you're studying. Document it in `instruments/<name>/basic-patch.md` with every parameter value.

A good basic patch:
- Uses one oscillator (or the simplest voice configuration)
- Has the filter open or nearly open
- Has a simple amplitude envelope (instant attack, some release)
- Has all effects off
- Produces a clean, audible tone when you press a key

This is the starting point for almost every session. Students load this before each exercise.

### Step 4: Create the Module Map

Map your instrument to the 10-module taxonomy in `instruments/<name>/modules.md`:

| # | Module | Adapt to your instrument |
|---|--------|--------------------------|
| 1 | Foundations | Navigation, saving, basic patch, factory tour |
| 2 | Sound Sources | Your oscillators, noise generators, sample playback |
| 3 | Sound Shaping | Your filters, waveshapers, VCAs |
| 4 | Envelopes | Your envelope generators and their routings |
| 5 | Modulation | LFOs, mod matrix, expression inputs |
| 6 | Effects | Built-in effects chain |
| 7 | Sequencer/Arp | Step sequencer, arpeggiator, motion recording |
| 8 | Sound Design | Combining everything — recipe-based patches |
| 9 | Performance | Live techniques, expression, MIDI control |
| 10 | Integration | DAW workflow, recording, using in compositions |

Skip modules that don't apply (no sequencer? skip 7). Split modules that are unusually deep (the Evolver splits Sound Sources into Analog Oscillators + Digital Oscillators).

**Dependency rules**:
- Module 1 has no prerequisites
- Modules 2-4 depend on Module 1
- Module 5 depends on 3 and 4 (you need to know what modulation is acting on)
- Modules 6-7 depend on 5
- Module 8 depends on everything before it
- Modules 9-10 come last

For each module, list:
- **Goal** — one sentence: "Understand and use all analog oscillator parameters"
- **Source** — manual pages, guide chapters, video timestamps
- **Sessions** — table with topic, duration, and output type
- **Session specifics** — 2-3 sentences per session describing the key exercises

### Step 5: Plan Session Count

Target 3-5 sessions per module. Each session is 15-30 minutes. A typical instrument curriculum is:

- **Simple instrument** (mono synth, single voice): 15-25 sessions across 8-10 modules
- **Medium instrument** (polysynth, moderate modulation): 25-35 sessions
- **Complex instrument** (modular, deep mod matrix): 35-50 sessions

More sessions is not better. Each session must have a clear, single objective and a tangible output. If you can't state the objective in one sentence, split the session.

## Part 2: Writing Sessions

### Session File Format

```markdown
---
title: "Session XX: Title Goes Here"
module: "Module Name"
session_number: 5
duration: 20
prerequisite: 3
output_type: patch
difficulty: intermediate
tags: [tag1, tag2, tag3]
instrument: your-instrument
reference: "Source Guide p.17-21, Manual p.15"
---

# Session XX: Title Goes Here

**Objective:** One sentence — what the student will be able to do after this session.

> [!tip] If you only have 5 minutes
> A condensed version that hits the core concept in minimal time.

## Warm-Up (2-3 min)

Reinforces the previous session. Always a physical action, never reading.
"Load your [patch name] from Session XX. Play a sustained note and listen to [thing]."

## Setup

Exact starting state. From the basic patch or a previously saved patch.
Use bold for parameter names and backticks for values:

- Set **Filter Frequency** to `80`
- Set **Resonance** to `0`
- Verify **Osc 1 Shape** is `Saw`

## Exercises

### Exercise 1: Name (X min)

Numbered steps with specific values and expected audible results:

1. Turn **Parameter Name** to `value` — you should hear [expected result]
2. Now change **Other Parameter** from `value` to `value` — you should hear [result]
3. Compare: set it back to `original`. Notice [difference]

### Exercise 2: Name (X min)

Continue building. Each exercise adds one concept on top of the previous.

### Exercise 3: Name (X min)

The culminating exercise that combines what was learned.

## Exploration (optional, hyperfocus days)

- Try [bounded suggestion 1]
- Try [bounded suggestion 2]
- Add [specific effect with specific values]

## Output Checklist

- [ ] Can explain [concept] in one sentence
- [ ] [Patch name] saved
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Bullet 1: core concept
- Bullet 2: practical rule of thumb
- Bullet 3: connection to bigger picture

## Next Session Preview

One sentence about what's next and why it builds on this.
```

### Writing Rules

**Parameter values must be exact.** Not "turn up the filter" but "set **Filter Frequency** to `80`". Vague instructions cause drift. Exact values let students hear the intended result and compare.

**Every step has an audible result.** After each numbered step, state what the student should hear: "you should hear a bright, resonant sweep" or "the pitch should stay constant while the timbre changes." If a step doesn't produce an audible change, it's setup — move it to the Setup section.

**Use "you should hear" consistently.** This phrase signals an expected outcome the student can verify. It builds confidence ("I'm doing this right") and catches mistakes ("that doesn't sound right — let me re-check").

**Reference your sources.** At the end of exercise sections, cite the source material: "See Anu Kirk p.17-20" or "DSI Manual p.15." This lets curious students go deeper and validates your teaching sequence.

**The 5-minute tip box is mandatory.** Every session needs a `> [!tip] If you only have 5 minutes` block. This is the ADHD escape hatch — when activation energy is high and time is short, this gives a micro-version that still produces learning.

**Exploration is bounded.** Not "experiment freely" but "try these 3 specific things." Each suggestion should take 1-2 minutes and build on the exercises.

### Difficulty Calibration

| Difficulty | What it means | Session characteristics |
|-----------|---------------|----------------------|
| beginner | First time touching this area | Every step spelled out, one concept only |
| intermediate | Has completed prerequisite sessions | Builds on known concepts, 2-3 new ideas |
| advanced | Comfortable with the instrument | Combines multiple subsystems, subtle techniques |

### Output Types

| Type | What the student saves |
|------|----------------------|
| patch | A named, documented patch with parameter values |
| technique | A named technique they can describe and reproduce |
| recording | An audio snippet demonstrating the concept |
| composition | A musical phrase or element using the technique |

Early modules produce mostly `patch` and `technique`. Later modules produce `recording` and `composition`.

## Part 3: Interactive Panel Diagrams

For instruments with a physical panel layout (knobs, sliders, switches), you can embed interactive SVG panel diagrams directly into session content. The panel shows the exact control positions described in the text, highlights relevant sections, and can zoom to specific areas.

### How It Works

1. **Panel SVG** — A scalable vector graphic of the instrument's front panel with every control as a named group (`id="knob-filter-frequency"`, `id="switch-sync"`, etc.)

2. **Control metadata** — A TypeScript map (`src/lib/<instrument>-panel-data.ts`) linking each SVG control ID to its name, parameter number, section, and control type

3. **Inline markers** — HTML `<div>` tags in session markdown that the rendering pipeline preserves and replaces with interactive React panel components

### Creating a Panel for a New Instrument

#### Step 1: Create the panel SVG

Create `references/<instrument>-panel.svg` with:
- A `viewBox` that covers the full panel (e.g., `0 0 1200 520`)
- Every control as a `<g>` group with a unique `id`:
  - Knobs: `id="knob-<section>-<name>"` (e.g., `knob-filter-frequency`)
  - Switches: `id="switch-<name>"` (e.g., `switch-sync`)
  - LEDs: `id="led-<name>"` (e.g., `led-seq-1`)
- CSS classes for control types: `.knob-large`, `.knob-small`, `.switch`, `.led`
- Section labels as `<text>` elements

The SVG doesn't need to be photorealistic. A clean schematic with correct relative positions works best — the monochrome rendering style means detail is less important than layout accuracy.

#### Step 2: Create the control metadata

Create `src/lib/<instrument>-panel-data.ts`:

```typescript
export interface ControlMeta {
  id: string;
  name: string;           // Human-readable: "Filter Frequency"
  nrpn: number | null;    // MIDI parameter number (null for LEDs, display-only)
  section: string;        // Matches SECTION_BOUNDS keys
  type: 'knob-large' | 'knob-small' | 'switch' | 'led';
}

// Every control from the SVG, mapped to its metadata
export const CONTROL_METADATA: Record<string, ControlMeta> = {
  'knob-filter-frequency': {
    id: 'knob-filter-frequency',
    name: 'Filter Frequency',
    nrpn: 20,
    section: 'filter',
    type: 'knob-large',
  },
  // ... all controls
};

// Bounding boxes for each panel section (used for tinting and zoom)
export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  'oscillators': { x: 55, y: 155, width: 225, height: 150 },
  'filter': { x: 310, y: 155, width: 288, height: 150 },
  // ... all sections
};

// Convert MIDI 0-127 to knob rotation angle
export function midiToRotation(value: number): number {
  return -135 + (value / 127) * 270;  // -135° to +135°, noon at 64
}
```

**Getting the NRPN numbers**: These come from the instrument's MIDI implementation chart in the manual. Every controllable parameter has a unique number. LEDs and display-only elements get `null`.

**Getting the section bounds**: Open your SVG, note the x/y coordinates of each section's top-left corner and its width/height. These don't need to be pixel-perfect — they're used for highlight tinting and zoom framing with padding.

#### Step 3: Create the panel React component

Create `src/components/<instrument>-panel.tsx` following the pattern in `src/components/evolver-panel.tsx`:

- Convert SVG to inline JSX (camelCase attributes, `className` instead of `class`)
- Monochrome styling — blacks, whites, greys only. Color comes from highlights and section tints
- Knob rotation driven by `knobValues` prop via `midiToRotation()`
- `zoomSections` prop crops the viewBox to specified section bounding boxes
- `highlights` prop renders colored glow rings around specific controls
- `activeSections` prop renders tint rectangles over sections
- Uncontrolled mode (no props) uses internal state with all knobs at noon

### Embedding Panels in Sessions

Use `<div data-evolver-panel>` markers (replace `evolver` with your instrument name once you've wired up the component in `session-detail.tsx`):

```markdown
## Setup

From the basic patch:
- Set **Filter Frequency** to `80`
- Set **Resonance** to `45`

<div data-evolver-panel data-knobs="knob-filter-frequency:80,knob-filter-resonance:45" data-highlights="knob-filter-frequency:amber,knob-filter-resonance:amber" data-sections="filter"></div>
```

#### Marker Attributes

| Attribute | Format | Purpose |
|-----------|--------|---------|
| `data-knobs` | `id:value,id:value,...` | Set knob positions (MIDI 0-127) |
| `data-highlights` | `id:color,id:color,...` | Glow ring around controls (`blue` or `amber`) |
| `data-sections` | `name,name,...` | Tint rectangles over sections |
| `data-zoom` | `name,name,...` | Explicit zoom to specific sections |

#### Auto-Zoom Behavior

When a panel has `data-sections` but no `data-zoom`, **it automatically zooms to the active sections**. This means:

- A panel highlighting just the filter section will zoom in to show only the filter area
- A panel highlighting oscillators + envelope3 will zoom to a bounding box covering both
- Multiple non-adjacent sections zoom to the smallest box that contains all of them

To show the full panel with section highlighting but no zoom, use `data-zoom="false"`.

#### When to Use Panels

**Full patch setup** — When a session describes an entire patch state (multiple sections involved), embed a panel after the parameter list. Use `data-zoom="false"` if you want the full panel visible, or let auto-zoom frame the relevant sections:

```markdown
### Exercise 3: Classic Prophet Sync Lead (10 min)

Enter these values exactly:
1. **Sync 2->1** = `ON`
2. **Osc 1 Shape** = `P-50`
3. **Osc 1 Frequency** = `C2`
...

<div data-evolver-panel data-knobs="knob-osc-frequency:24,knob-env3-attack:15,knob-env3-decay:87" data-highlights="knob-osc-frequency:amber,switch-sync:amber" data-sections="oscillators,envelope3"></div>

Play a note. You should hear an aggressive, biting lead tone.
```

**Single adjustment** — When a session asks the student to change one or two controls in one section, the panel auto-zooms to just that area:

```markdown
Now set up **ENV 3** to sweep the oscillator:
- Set **Attack** to `15`
- Set **Decay** to `87`

<div data-evolver-panel data-knobs="knob-env3-attack:15,knob-env3-decay:87" data-highlights="knob-env3-attack:amber,knob-env3-decay:amber" data-sections="envelope3"></div>
```

**Don't overuse panels.** One or two per exercise is plenty. Place them at the moment the student needs to verify their setup — typically right before "Play a note" or "you should hear."

### Wiring Up the Rendering Pipeline

The inline panel system works through the markdown rendering pipeline:

1. **Markdown** contains `<div data-evolver-panel ...></div>` raw HTML
2. **rehype-raw** in the unified pipeline preserves raw HTML through to the output string
3. **session-detail.tsx** splits the HTML string at panel markers using a regex
4. **React** renders `<EvolverPanel>` components between the HTML segments with parsed props

To add panel support for a new instrument, update `session-detail.tsx`:
- Add a regex for your instrument's marker (`data-<instrument>-panel`)
- Import your instrument's panel component
- Parse the same attribute format (knobs, highlights, sections, zoom)
- Render your component between HTML segments

The `SECTION_BOUNDS` in your metadata file drive both the tint rectangles and the zoom viewBox calculation. Getting these right is the key to good zoom framing.

## Part 4: Deriving Curriculum from Manuals

The hardest part of curriculum creation is turning a reference manual into a learning sequence. Manuals are organized by feature; curricula are organized by concept progression.

### The Translation Process

**1. Read the manual cover-to-cover** (or at least the relevant sections). Note which features depend on understanding other features.

**2. Identify the "aha moments"** — the demonstrations that make a concept click. For the Evolver's hard sync, it's "turn Sync ON, sweep Osc 1 Frequency, hear the timbre morph at constant pitch." Every session needs at least one aha moment.

**3. Find a pedagogical source** if one exists. Third-party guides (like Anu Kirk's Evolver guide) often have exercise sequences that have been tested with real learners. Use their ordering as a starting point.

**4. Map manual sections to modules**:

| Manual Section | Maps to Module |
|---------------|----------------|
| Quick Start, Navigation | 1: Foundations |
| Oscillators chapter | 2: Sound Sources |
| Filter chapter | 3: Sound Shaping |
| Envelope chapter | 4: Envelopes |
| LFO / Mod Matrix chapter | 5: Modulation |
| Effects chapter | 6: Effects |
| Sequencer chapter | 7: Sequencer |
| (no direct chapter) | 8-10: Sound Design, Performance, Integration |

**5. Order by dependency, not by manual page order.** Manuals often put filters before envelopes, but students need to understand amplitude envelopes (Module 4) to hear filter envelope sweeps properly. Let the signal flow guide you.

### Using Internet Documentation

Forum posts, YouTube tutorials, and blog articles fill gaps that manuals miss:

- **"How do I get X sound?"** posts reveal the most-wanted techniques — prioritize these in your Sound Design module
- **"What does parameter Y actually do?"** posts reveal the confusing parameters — give these extra exercise time
- **Tutorial videos** often demonstrate techniques in a learning-friendly order — note their sequence even if you restructure it
- **Patch recipe collections** provide ready-made Exercise 3 material (the culminating exercise per session)

When using community knowledge, always verify parameter values against the official manual. Community posts sometimes have errors, outdated information, or apply to a different firmware version.

### The 3-Exercise Pattern

Most sessions work well with three exercises that follow this arc:

1. **Isolate** — Hear the thing in isolation. "Turn this on. Hear what it does alone."
2. **Explore** — Vary the parameters. "Now sweep this from 0 to 127. Notice how the character changes."
3. **Apply** — Use it musically. "Set up these exact values. Play a note. This is the classic [technique name] sound."

Exercise 3 is where patch recipes from manuals, guides, and community posts land. The first two exercises build the understanding needed to appreciate why the recipe works.

## Quick Reference: File Checklist for a New Instrument

```
instruments/<name>/
├── overview.md          # Architecture, capabilities, voice count
├── signal-flow.md       # Audio path diagram (text or mermaid)
├── basic-patch.md       # Every parameter value for the home base patch
└── modules.md           # Module map, dependency graph, session tables

sessions/<name>/
├── 01-foundations-*.md   # Start here
├── 02-*.md through XX-*.md
└── (15-50 sessions total)

patches/<name>/
���── basic-patch.md        # The home base (also in instruments/)
└── (patches created during sessions)

references/
├── <manual>.pdf          # Official manual
├── <guide>.pdf           # Third-party guides
└── <name>-panel.svg      # Panel diagram (if creating interactive panels)

src/lib/<name>-panel-data.ts        # Control metadata (if panel)
src/components/<name>-panel.tsx     # Panel component (if panel)
```
