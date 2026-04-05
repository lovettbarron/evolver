# Evolver Deep Learning Project

A structured instrument mastery system, starting with the Dave Smith Mono Evolver keyboard. Designed for ADHD-friendly micro-sessions (15-30 min) with clear outcomes and shareable output.

## Project Context

- **Owner**: Andrew — PM, synth enthusiast, ADHD
- **Core instrument**: Dave Smith Mono Evolver (keyboard version, OS 2.0+)
- **Obsidian vault**: ~/song (music/songwriting vault with daily notes)
- **Next instrument**: Intellijel Cascadia (modular)

## Conventions

- **Session length**: 15-30 minutes, always with a single focused objective
- **Session output**: Every session produces something tangible — a patch, a technique documented, a recording snippet, or a composition element
- **File naming**: kebab-case throughout
- **Instruments**: Each instrument lives in `instruments/<name>/`
- **Sessions**: Numbered sequentially within modules: `sessions/<instrument>/XX-<module>-<topic>.md`
- **Patches**: Documented in `patches/<instrument>/` with full parameter dumps
- **Progress**: Tracked in Obsidian via templates in `obsidian/`

## Skills

- **synth-panel-builder** (`.claude/skills/synth-panel-builder/SKILL.md`): Use this skill whenever adding a new instrument, creating or modifying panel SVG components, or fixing panel layout issues. It contains all the design principles and control type conventions learned from building the Evolver and Cascadia panels.

## Guardrails — Push Back If Asked To

1. **Skip the basic patch** — The "basic patch" (from Anu Kirk's guide) is the foundation. Always start sessions from a known state
2. **Rush through modules** — Mastery requires repetition. Don't advance until the current module's outcomes are achieved
3. **Add instruments without the framework** — Every new instrument must follow the framework structure
4. **Create sessions longer than 30 minutes** — ADHD constraint is non-negotiable. Split into multiple sessions
5. **Disconnect from Obsidian** — Progress tracking in ~/song is the accountability mechanism
6. **Make patches without documenting them** — Undocumented patches are lost patches
7. **Build a panel without the reference image** — Read the synth-panel-builder skill first. Every control must be hand-placed from the physical panel, never algorithmically computed

## Key References

- `references/Evo_Key_Manual_1.3.pdf` — Official DSI operation manual (parameter reference, MIDI, sysex)
- `references/evolverguide.pdf` — "The Definitive Guide to Evolver" by Anu Kirk (pedagogical, exercise-based)

## Architecture

```
evolver/
├── framework/           # Reusable learning methodology (instrument-agnostic)
├── instruments/         # Per-instrument data (architecture, signal flow, parameters)
│   └── evolver/
├── sessions/            # Structured learning sessions (15-30 min each)
│   └── evolver/
├── patches/             # Documented patches with full parameter values
│   └── evolver/
├── obsidian/            # Templates for ~/song vault integration
├── references/          # Source manuals and guides (PDFs)
└── .planning/           # GSD planning artifacts
```

## Panel SVG Design Principles

When creating or modifying instrument panel SVG components (`src/components/*-panel.tsx`), follow these hard-won principles:

### Reference-First, Not Algorithmic
- **Always study the physical panel image** before placing controls. Never compute positions algorithmically from a grid — real synth panels have intentional, non-uniform layouts
- The manual PDF or panel photo is the source of truth for layout, not the data model
- Each control needs hand-placed x,y coordinates based on its physical position

### Data Model Must Match the Physical Panel
- **Control types must match reality**: EXT IN jacks are `jack-in`, not switches. Octave selectors are rotary selector knobs with labeled click positions, not switches. 2-way toggles and 3-way toggles render differently
- **Don't invent controls** that don't exist on the physical panel (e.g., "Rate Trimmers" knob)
- When in doubt about a control type, check the manual image

### Layout Can Break the Grid
- Some panels have sections that span multiple rows (e.g., Cascadia's S&H + VCO B column on the left)
- Complex modules (Utilities, Patchbay) often contain distinct sub-sections that need their own labels and dividers
- Separator bars between rows may not span the full width when a column breaks through

### Visual Conventions
- **Output jacks**: filled white (`#e8e8e8`), no "OUT" in the label — immediately distinguishable from dark input jacks
- **2-way switches**: 2 circles stacked vertically (selected = filled orange)
- **3-way switches**: 3 circles stacked vertically (traffic light style, selected = filled orange)
- **Selector knobs**: rotary knob with labeled click positions arranged in an arc (e.g., VCF Mode: LP1-PHZ, Octave: 0-7)
- **Section labels**: positioned in the separator bars between rows, never overlapping controls
- **Switch labels**: above the switch, not below (prevents visual association with the wrong control)

### Spacing and Alignment
- **Eliminate whitespace aggressively** — tighten controls vertically and horizontally
- Patch points (jacks) should sit close to their associated sliders/knobs, not far below
- Align jacks across sections to the same y-coordinate when they're in the same row
- Align switches vertically with their associated output jacks
- Switches in a column should be stacked vertically (e.g., Mixer's Sub Type / Noise Type / Soft Clip)

### Content Pipeline
- The app reads content from `~/song` (via `evolver.config.json` vaultPath), not from `src/content/` or `sessions/`
- When modifying session markdown (e.g., adding panel markers), update all three locations: `sessions/`, `src/content/sessions/`, and `~/song/sessions/`
- Control IDs in session `data-cascadia-panel` markers must match `CONTROL_METADATA` keys exactly

## Session Workflow

1. **Before**: Read session brief (2 min), set up Evolver with basic patch or specified starting state
2. **During**: Follow the session steps, experiment within the focused area
3. **After**: Document what you learned, save any patches, log in Obsidian daily note
4. **Between**: The session brief for next time includes a "warm-up" that reinforces previous learning
