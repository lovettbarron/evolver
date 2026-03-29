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

## Guardrails — Push Back If Asked To

1. **Skip the basic patch** — The "basic patch" (from Anu Kirk's guide) is the foundation. Always start sessions from a known state
2. **Rush through modules** — Mastery requires repetition. Don't advance until the current module's outcomes are achieved
3. **Add instruments without the framework** — Every new instrument must follow the framework structure
4. **Create sessions longer than 30 minutes** — ADHD constraint is non-negotiable. Split into multiple sessions
5. **Disconnect from Obsidian** — Progress tracking in ~/song is the accountability mechanism
6. **Make patches without documenting them** — Undocumented patches are lost patches

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

## Session Workflow

1. **Before**: Read session brief (2 min), set up Evolver with basic patch or specified starting state
2. **During**: Follow the session steps, experiment within the focused area
3. **After**: Document what you learned, save any patches, log in Obsidian daily note
4. **Between**: The session brief for next time includes a "warm-up" that reinforces previous learning
