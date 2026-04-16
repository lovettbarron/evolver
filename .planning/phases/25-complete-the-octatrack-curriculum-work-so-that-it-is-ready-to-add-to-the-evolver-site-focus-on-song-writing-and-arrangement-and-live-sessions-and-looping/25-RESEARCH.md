# Phase 25: Complete Octatrack Curriculum + Site Integration — Research

**Researched:** 2026-04-16
**Domain:** Content authoring + multi-instrument site integration + capability schema + color identity + project-state patches
**Confidence:** HIGH

## Summary

Phase 25 is four separate scopes bolted together. The good news: the scaffolding for most of the integration work (panel route, panel client, session-detail marker parser, patch-detail panel wiring, nav capability gating) has already landed during the Phase 23 panel work and the `260416-9hx` quick task — probably more than the CONTEXT.md author realized. The **core remaining site-integration work is narrower than it looks**: add `instrument.json`, extend the `InstrumentConfig` Zod schema with sampler capability flags, bootstrap the octatrack bundle directories (`src/content/sessions/octatrack/`, `src/content/patches/octatrack/`, `src/content/instruments/octatrack/`), and extend `synthetic-daily-notes.ts` for demo journey.

The **dominant remaining work is content authoring** — 25 new sessions (Modules 1-10), 3-4 project-state patches, one `basic-project.md` patch, all triple-written to three locations. At 20-25 min each with 15-30 min ADHD cap, this is ~10-12 hours of careful authoring that must follow the existing Octatrack draft style (Module 1, 3, 9, 10 drafts all confirm the pedagogical template). Weighted to Modules 7-10.

The **biggest hidden risk** is that `~/song/instruments/octatrack/`, `~/song/sessions/octatrack/`, `~/song/patches/octatrack/`, and **all** `src/content/*/octatrack/` directories are empty. Triple-write in Phase 25 means bootstrapping the instrument presence in the vault and bundle from scratch, not just adding to existing directories. Any plan that says "copy new session to vault" without first "mkdir vault/sessions/octatrack" will silently produce a site that renders zero Octatrack content in demo mode.

**Primary recommendation:** Decompose into five waves: (1) schema/capability/tokens foundation, (2) bundle bootstrap + directory scaffolding, (3) session authoring in two parallel streams (Modules 1-6 and 7-10), (4) patches + basic-project, (5) site verification + demo-journey + visual checkpoint.

## User Constraints (from CONTEXT.md)

### Locked Decisions

**Curriculum Scope**
- **D-01:** Author all 25 missing sessions to reach full 31-session parity with Evolver (37) and Cascadia (27). Existing 6 sessions (01, 09, 25, 28, 29, 31) stay in place and get integrated; 25 new sessions (02-08, 10-24, 26-27, 30) are written from scratch.
- **D-02:** Authoring weight is biased to Modules 7-10 (the roadmap focus). Depth/marker density/patch coverage is highest here. Modules 1-6 are complete but may be tighter.
- **D-03:** Every session triple-writes to `sessions/octatrack/`, `src/content/sessions/octatrack/`, and `~/song/sessions/octatrack/`. No session is "done" until all three locations have it.
- **D-04:** Session format matches existing Octatrack drafts: YAML frontmatter with `title`, `module`, `session_number`, `duration` (15-30 min hard cap), `prerequisite`, `output_type`, `difficulty`, `tags`, `instrument: octatrack`, `reference`. Content structure: Objective → "If you only have 5 minutes" tip → Warm-Up → Setup → Exercises → Output.

**Site Integration Depth**
- **D-05:** Full Cascadia-parity integration — not minimal listing. Octatrack appears in instrument selector, home page instrument card, nav, session browser, progress/prerequisite system, global search, and demo mode with a synthetic learner journey.
- **D-06:** Wire `src/app/instruments/[slug]/panel/page.tsx` to resolve `octatrack` → `OctatrackPanel`. Panel route, standalone panel client, and session-detail panel marker rendering all work end-to-end.
- **D-07:** Add `instruments/octatrack/instrument.json` (matching Cascadia's shape) declaring metadata, capability flags, and module list.

**Capability Profile (Sampler)**
- **D-08:** Introduce a new capability profile rather than retrofitting Evolver or Cascadia shapes. Flags: `has_sampler=true`, `has_sequencer=true`, `has_midi_sequencer=true`, `has_sysex=false`, `has_patch_memory=false`.
- **D-09:** `has_sysex=false` hides the MIDI SysEx page for Octatrack. `has_patch_memory=false` causes patch pages to render the project-state format (sample list, track config, scenes, arranger) rather than the parameter-dump format Evolver uses.
- **D-10:** `has_midi_sequencer=true` is new — signals "this instrument sequences OTHER gear via MIDI." Currently informational; UI surfacing of that capability is not required in Phase 25, but the flag exists so future phases can light it up.
- **D-11:** Capability gating pattern follows Phase 7 precedent: conditional rendering based on flag presence, not instrument-name switching.

**Color Identity**
- **D-12:** Octatrack accent is **Elektron orange** — warm hue (direction: 35-45°), chroma ~0.15-0.17. Warm pole against the existing cool accents (Evolver blue hue 245 / Cascadia steel hue 250). Exact OKLCH values picked during implementation with WCAG AA contrast validation against all surface backgrounds.
- **D-13:** Lighter `--color-param` derivative required (visibly lighter than accent, matches COLOR-04 pattern), also WCAG AA validated.
- **D-14:** Surface tinting enabled — add `data-instrument='octatrack'` cascade overrides for `--color-bg`, `--color-surface`, `--color-surface-raised`. Subtle warm-tint mirroring Evolver/Cascadia pattern established in Phase 24. Chroma stays low on surface tokens (~0.03-0.04) to avoid visual noise while conveying instrument context.
- **D-15:** Color work follows Phase 24's three-layer token architecture (primitive → semantic → cascade). No changes to the token architecture itself.

**Patches (Octatrack Project-State Documents)**
- **D-16:** Ship 3-4 demo project patches, one per focus module:
  - Module 7 (Scenes & Crossfader): scene-morphing performance project
  - Module 8 (Parts & Pattern Workflow): Parts-as-song-sections project
  - Module 9 (Live Sampling & Looping): live-looping project with Pickup machines + track recorders
  - Module 10 (Songwriting & Arrangement): full arrangement project
- **D-17:** Patch format follows `patches/octatrack/README.md` spec (sample list, track config, pattern map, scene notes, performance tips). No parameter-dump format.
- **D-18:** Also include `basic-project.md` as the reference starting state (already spec'd in README, not yet written).
- **D-19:** Patches are bundled into `src/content/patches/octatrack/` for demo mode, same pattern as Cascadia.

**Panel Markers in Sessions**
- **D-20:** Marker coverage is biased to focus modules (7-10) — key exercises get `data-octatrack-panel` markers pointing to the hero control(s). Earlier modules get sparse markers on critical hardware gestures (Parts key, Scene A/B, Crossfader, REC1-3, Track keys).
- **D-21:** Marker syntax reuses the existing pattern in `src/components/session-detail.tsx:29`: `<div data-octatrack-panel="[comma-separated control-ids]"></div>`. Control IDs must match `CONTROL_METADATA` keys in `src/lib/octatrack-panel-data.ts` exactly.
- **D-22:** Panel SVG internals stay frozen (Phase 23 decision) — no touching `octatrack-panel.tsx` or `octatrack-panel-data.ts` except to verify control-id accuracy as sessions are written.

### Claude's Discretion
- Session topic depth within each module (stay within 15-30 min, single objective, tangible output — ADHD hard constraints)
- Exact OKLCH numbers for orange accent — iterate against WCAG AA, commit the final values
- How many markers per session in focus modules (use comprehension as the gate)
- Synthetic daily-notes content for Octatrack demo journey (realistic cadence, match Cascadia's synthetic-daily-notes pattern)
- Patch sample choices and exact project configurations within the 4 demo projects
- Session ordering/dependencies already defined in `instruments/octatrack/modules.md` — follow it

### Deferred Ideas (OUT OF SCOPE)
- **Extended patch library (10+ patches beyond the 4 demo projects)** — add to backlog; author naturally as real practice produces documentable project states.
- **UI surfacing of `has_midi_sequencer` capability** — flag exists after Phase 25 but dedicated MIDI sequencer page/widget for Octatrack is a future phase.
- **Video or audio recording integration for Octatrack sessions** — aligned with PROJECT.md active requirement "Audio recording integration," but not scoped to this phase.
- **Retroactive milestone placement** — Phase 25 sits at the tail of v1.3 Visual Redesign despite being content+integration. Acknowledged but not addressed in this phase; handle during milestone audit or new-milestone transition.

## Project Constraints (from CLAUDE.md)

Directives with the same authority as locked decisions. Planner and implementer MUST honor these:

- **Session length non-negotiable**: 15-30 minutes, single focused objective, tangible output. No session in Phase 25 may exceed 30 min. Split if necessary.
- **File naming**: kebab-case throughout. Session files follow `XX-<module-slug>-<topic>.md` (e.g., `22-parts-save-reload-copy.md`).
- **Triple-write is the pipeline**: `sessions/` (working) + `src/content/sessions/` (bundled) + `~/song/sessions/` (vault). A session is not "done" until all three locations have it.
- **Patches must be documented**: every patch authored gets full parameter values / project-state dump. No undocumented patches.
- **Panel SVG is frozen**: `octatrack-panel.tsx` and `octatrack-panel-data.ts` are from Phase 23 / quick task `260416-9hx`. Do not restyle or reposition. Verify control-IDs only.
- **Obsidian vault path**: `~/song` (set in `evolver.config.json` as `vaultPath: "~/song"`). Vault reader uses this path.
- **synth-panel-builder skill**: informs panel-data corrections if any surface during session authoring. Not needed for greenfield panel work (panel is done).
- **Progress tracking in ~/song via Obsidian templates**: Phase 25 content must remain compatible with the existing daily-note / progress scan pattern.

## Phase Requirements

This phase has no REQ-IDs assigned in REQUIREMENTS.md. CONTEXT.md's 22 locked decisions (D-01 through D-22) are the authoritative requirements. Research maps research findings to them below.

| ID | Description | Research Support |
|----|-------------|------------------|
| D-01 | 25 new sessions, 31 total parity | Modules.md has complete spec for sessions 02-08, 10-24, 26-27, 30. Existing 6 drafts are style reference. |
| D-02 | Module 7-10 weight bias | Focus modules are 3+3+4+3 = 13 sessions out of 25. Drafts 25, 28, 29, 31 confirm the deeper-marker pattern. |
| D-03 | Triple-write | Bootstrap step: `~/song/{instruments,sessions,patches}/octatrack/` and `src/content/{instruments,sessions,patches}/octatrack/` directories do not yet exist. |
| D-04 | Session format | Frontmatter + 5-section body confirmed from 4 drafts; SessionSchema in `schemas.ts:3-14` validates it. |
| D-05 | Full Cascadia-parity integration | `discoverInstruments()` already auto-discovers any directory under `src/content/instruments/`; nav/search/home pages all iterate that list. Most integration is automatic once bundle directory exists. |
| D-06 | Panel route wiring | Already done: panel/page.tsx:16-20 and standalone-panel-client.tsx:8-10 have octatrack branches. Verify only. |
| D-07 | instrument.json | New file at `instruments/octatrack/instrument.json` (plus triple-write to vault + bundle). |
| D-08 | Capability flags | Requires Zod schema extension in `schemas.ts:73-83` — 4 new optional fields. |
| D-09 | has_sysex=false hides MIDI page | Existing pattern in `app/instruments/[slug]/midi/page.tsx:13-18` uses `instrumentConfig.sysex` — naming mismatch vs. CONTEXT.md "has_sysex" (see research §Capability Schema). |
| D-09 | has_patch_memory=false uses project-state render | No project-state renderer exists. README format in `patches/octatrack/README.md` plus cable_routing/knob_settings schema fields give a hybrid path — see research. |
| D-10 | has_midi_sequencer flag | Schema-only addition; no UI consumption required in Phase 25. |
| D-11 | Capability gating via flag, not instrument name | Current code partially follows this (MIDI page uses `.sysex`); patch-detail.tsx:117-145 still switches on `instrumentSlug` string. Research §Anti-patterns for details. |
| D-12, D-13, D-14 | Elektron orange, lighter param, surface tint | Phase 24 pattern in globals.css:101-125 is the exact template. New primitives + new cascade block. |
| D-15 | Three-layer token architecture unchanged | Confirmed — globals.css already has Layer 1/2/3 shape. |
| D-16 | 3-4 demo project patches on Modules 7-10 | Patch format in `patches/octatrack/README.md` is authoritative. |
| D-17 | Project-state patch format | README matches; schema's `cable_routing` and `knob_settings` fields are optional and can be omitted — no schema change needed for project-state patches. |
| D-18 | basic-project.md | `instruments/octatrack/basic-patch.md` already exists; patch version (`patches/octatrack/basic-project.md`) still needs writing. |
| D-19 | Patches bundled for demo mode | Requires `src/content/patches/octatrack/` directory. bundle-content.ts copies the whole tree — no script change needed. |
| D-20, D-21 | Panel markers | `data-octatrack-panel` regex at session-detail.tsx:29 already exists. Content-side work only. |
| D-22 | Panel frozen | Already built (commit 9cb345b). |

## Standard Stack

This phase adds NO new runtime dependencies. All work uses the existing stack.

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| zod | ^3.23.0 | Capability schema extension | Already defines `InstrumentConfigSchema` in schemas.ts |
| gray-matter | ^4.0.3 | Session/patch frontmatter parse | Used by `readContentFile()` in reader.ts |
| glob | ^11.0.0 | Triple-write file discovery | Used by `listSessions()` / `listPatches()` |
| tailwindcss | ^4.2.2 | Color token cascade | Phase 24 pattern in `@theme` and `[data-instrument]` blocks |
| vitest | ^3.0.0 | Schema + tokens tests | Existing test suite in `src/app/__tests__/tokens.test.ts` |
| culori | ^4.0.2 (dev) | OKLCH contrast validation | Used by `scripts/validate-contrast.mjs` |

### Authoring Tools (none required)
Session authoring is pure markdown + frontmatter. No new editor tooling.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Zod optional flags on existing InstrumentConfigSchema | Separate `CapabilityProfileSchema` | Adds indirection; current schema is already permissive via `.passthrough()`. Extend in place. |
| One big "author everything" wave | Per-module waves (one wave per module) | Per-module sequencing is too slow; parallel authoring streams on module ranges is the correct level of granularity. |
| Adding project-state patch renderer as new component | Re-use `PatchDetail` with conditional rendering | Current `PatchDetail` already renders markdown body + knob_settings table + octatrack panel view (patch-detail.tsx:140-145). Leave `knob_settings` empty, put project-state in the markdown body. Zero new components needed. |

## Architecture Patterns

### Recommended Directory Structure (Delta from Current State)

```
evolver/
├── instruments/octatrack/
│   ├── instrument.json             # NEW — capability + metadata
│   ├── modules.md                  # EXISTING (authoring spec, do not modify)
│   ├── overview.md                 # EXISTING
│   ├── signal-flow.md              # EXISTING
│   └── basic-patch.md              # EXISTING
│
├── sessions/octatrack/             # EXISTING (6 sessions)
│   ├── 01-foundations-orientation-first-sound.md  # EXISTING
│   ├── 02-foundations-demo-patterns-factory-tour.md  # NEW
│   ├── 03-foundations-project-setup.md  # NEW
│   ├── 04-sample-management-loading-assigning.md  # NEW
│   ... (22 more new session files) ...
│   └── 31-songwriting-composition-workflow.md  # EXISTING
│
├── patches/octatrack/
│   ├── README.md                   # EXISTING (format spec)
│   ├── basic-project.md            # NEW (D-18 reference starting state)
│   ├── scene-morphing-performance.md  # NEW (Module 7)
│   ├── parts-song-sections.md      # NEW (Module 8)
│   ├── live-loop-layers.md         # NEW (Module 9)
│   └── full-arrangement.md         # NEW (Module 10)
│
├── src/content/instruments/octatrack/      # NEW DIRECTORY — bootstrap
│   └── (mirror of instruments/octatrack/)
├── src/content/sessions/octatrack/         # NEW DIRECTORY — bootstrap
│   └── (mirror of sessions/octatrack/)
├── src/content/patches/octatrack/          # NEW DIRECTORY — bootstrap
│   └── (mirror of patches/octatrack/)
│
└── ~/song/ (vault)
    ├── instruments/octatrack/              # NEW DIRECTORY — bootstrap
    ├── sessions/octatrack/                 # NEW DIRECTORY — bootstrap
    └── patches/octatrack/                  # NEW DIRECTORY — bootstrap
```

**Critical:** Nine new directories. All three trees (working / bundled / vault) currently have zero Octatrack content beyond the six sessions in `sessions/octatrack/` and the instrument-level markdown in `instruments/octatrack/`. A plan that assumes vault and bundle already exist will silently fail.

### Pattern 1: Session Authoring Template

**What:** Every Octatrack session follows the same 5-section structure derived from existing drafts (01, 09, 25, 28, 29, 31) and matches the Cascadia/Evolver session taxonomy.

**When to use:** All 25 new sessions.

**Template:**
```markdown
---
title: "Session XX: {Topic}"
module: "{Module Name}"
session_number: XX
duration: 15-30       # integer, ADHD hard cap
prerequisite: XX      # or null for session 01
output_type: patch|technique|recording|composition
difficulty: beginner|intermediate|advanced
tags: [kebab, tags, ...]
instrument: octatrack
reference: "Elektron Manual Ch. X.Y; Merlin Ch. Z"
---

# Session XX: {Title}

**Objective:** One sentence — what you will do and why.

> [!tip] If you only have 5 minutes
> Micro-tip that captures the headline gesture. One or two sentences.

## Warm-Up (2 min)
One paragraph. Reuse a gesture from the previous session to build muscle memory.

## Setup
Explicit starting-state list. Reference the basic project unless a prior session's state is required.

## Exercises

### Exercise 1: {Name} (N min)
Numbered steps, each step gets `**[CONTROL NAME]**` for hardware keys, backtick-ed `PARAM` for on-screen params.

[panel marker in focus modules — see Pattern 2]

### Exercise 2: ...

### Exercise 3: ...

## Exploration (if time allows)
Optional deepening, 2-3 bullets.

## Output Checklist
- [ ] Tangible deliverables, 4-6 items

## Key Takeaways
- 2-4 bullets. The "retain this" summary.

## Next Session Preview
One sentence pointing forward.
```

### Pattern 2: Panel Marker Syntax

**What:** Panel markers are zero-content `<div>` elements with a `data-octatrack-panel` attribute plus optional data attributes for highlights, sections, knob values, and zoom behavior.

**Source:** `src/components/session-detail.tsx:29,147-195`; regex at line 29 matches `<div data-octatrack-panel((?:[^>"]|"[^"]*")*)>\s*</div>`.

**Syntax (all attributes optional except the marker itself):**

```html
<div data-octatrack-panel></div>
<!-- Full panel, no highlights -->

<div data-octatrack-panel
  data-highlights="key-scene-a:amber,key-scene-b:amber,slider-mix-crossfader:blue"
  data-sections="scene,mix"
></div>
<!-- Highlight scene keys + crossfader, zoom to scene+mix sections -->

<div data-octatrack-panel
  data-sections="track,param"
  data-zoom="false"
></div>
<!-- Active sections but full panel (no zoom) -->

<div data-octatrack-panel
  data-knobs="knob-data-a:64,knob-main-level:96"
  data-highlights="knob-data-a:amber"
  data-zoom="data"
></div>
<!-- Knob value override + highlight + explicit zoom target -->
```

**Attribute reference:**
- `data-highlights` — comma-separated `controlId:amber|blue`
- `data-sections` — comma-separated section names (see SECTION_BOUNDS keys below)
- `data-knobs` — comma-separated `controlId:midiValue` (0-127)
- `data-zoom` — `"false"` disables auto-zoom, or comma-separated section names for explicit zoom targets. If omitted, auto-zoom uses `data-sections`.

**Valid section names (from `octatrack-panel-data.ts:174-200`):**
`main`, `rec`, `card`, `lcd`, `track`, `data`, `tempo`, `transport`, `func`, `param`, `nav`, `scene`, `mix`, `trig`.

**Valid control IDs (hero set — full list in `CONTROL_METADATA` at `octatrack-panel-data.ts:67-144`):**
- Transport: `key-transport-play`, `key-transport-stop`, `key-transport-record`
- Track keys: `key-track-1` through `key-track-8`, `key-track-cue`
- Trig keys: `key-trig-1` through `key-trig-16`
- Data knobs: `knob-data-a` through `knob-data-f`
- Main: `knob-main-level`, `knob-main-headphones`, `knob-track-level`
- Scene: `key-scene-a`, `key-scene-b`, `slider-mix-crossfader`
- Track params: `key-param-src`, `key-param-amp`, `key-param-lfo`, `key-param-fx1`, `key-param-fx2`
- Function: `key-func-func`, `key-func-proj`, `key-func-part`, `key-func-aed`, `key-func-mix`, `key-func-arr`, `key-func-midi`
- Rec: `key-rec-1`, `key-rec-2`, `key-rec-3`
- Nav: `key-nav-up`, `key-nav-down`, `key-nav-left`, `key-nav-right`, `key-nav-yes`, `key-nav-no`, `key-nav-pattern`, `key-nav-bank`, `key-nav-page`
- Tempo: `key-tempo-tempo`
- LCD: `display-lcd-screen`
- CF card: `led-card-status`

**Example for Module 9 Session 26 (Pickup mastery):**
```html
<div data-octatrack-panel
  data-sections="track,rec,scene"
  data-highlights="key-track-8:amber,key-rec-1:amber,slider-mix-crossfader:blue"
  data-zoom="track,rec"
></div>
```

### Pattern 3: Capability Schema Extension

**Source of truth:** `src/lib/content/schemas.ts:73-83` (`InstrumentConfigSchema`).

**Current schema:**
```typescript
export const InstrumentConfigSchema = z.object({
  display_name: z.string(),
  tagline: z.string(),
  manufacturer: z.string(),
  sysex: z.boolean(),             // legacy field name, NOT has_sysex
  patch_memory: z.boolean(),      // legacy field name, NOT has_patch_memory
  reference_pdfs: z.array(z.object({ label: z.string(), file: z.string() })),
}).passthrough();
```

**Naming mismatch (IMPORTANT):** CONTEXT.md D-08 uses `has_sysex`, `has_patch_memory`, `has_sampler`, `has_sequencer`, `has_midi_sequencer`. The existing schema uses `sysex` and `patch_memory` (no `has_` prefix). Consumers (`midi/page.tsx:13`, `nav.tsx:78`, `app-shell.tsx:31`) read `instrumentConfig.sysex`. **Two options:**

- **Option A (recommended):** Keep existing field names. Add the four new flags without the `has_` prefix for consistency: `sampler`, `sequencer`, `midi_sequencer`. Keep `sysex` and `patch_memory` as-is. Minimal churn, zero consumer breakage, still expresses the same capability model.
- **Option B:** Rename all six flags to the `has_` prefix for consistency with CONTEXT.md language. Touches ~6 consumer files plus all three instrument.json files plus ~2 test files. More cleanup, more risk.

**Recommendation:** Option A. Document the naming convention clearly in the schema comments. CONTEXT.md's D-08 names can be treated as conceptual labels, not literal JSON keys — the flags exist and work the same way.

**Proposed schema:**
```typescript
export const InstrumentConfigSchema = z.object({
  display_name: z.string(),
  tagline: z.string(),
  manufacturer: z.string(),
  sysex: z.boolean(),                              // existing — maps to has_sysex
  patch_memory: z.boolean(),                       // existing — maps to has_patch_memory
  sampler: z.boolean().optional(),                 // NEW — has_sampler
  sequencer: z.boolean().optional(),               // NEW — has_sequencer
  midi_sequencer: z.boolean().optional(),          // NEW — has_midi_sequencer
  reference_pdfs: z.array(z.object({ label: z.string(), file: z.string() })),
}).passthrough();
```

**Why `.optional()`:** Backward compatibility with existing Evolver/Cascadia `instrument.json` files that don't declare these new flags. Treat `undefined` as `false` at consumer sites.

**Octatrack `instrument.json`:**
```json
{
  "display_name": "Octatrack MKII",
  "tagline": "Performance sampler, live looper, and MIDI brain",
  "manufacturer": "Elektron",
  "sysex": false,
  "patch_memory": false,
  "sampler": true,
  "sequencer": true,
  "midi_sequencer": true,
  "reference_pdfs": [
    { "label": "Octatrack MKII Manual (OS 1.40A)", "file": "octatrack_mkii_manual.pdf" }
  ]
}
```

**Note on PDF:** `references/` does not appear to currently contain an Octatrack manual PDF. Either add the file, drop the PDF reference to an empty array, or document the constraint for the planner. **Recommend: empty `reference_pdfs: []` for Phase 25.** The `reference:` frontmatter in each session (e.g., "Elektron Manual Ch. 9") carries the same information inline.

### Pattern 4: Color Cascade Block (Elektron Orange)

**Source:** `src/app/globals.css:100-125` — exact shape to clone.

**New primitives (Layer 1):**
```css
/* Octatrack Elektron orange */
--color-orange-500: oklch(0.72 0.16 40);   /* accent — D-12 warm hue 35-45° */
--color-orange-400: oklch(0.80 0.12 42);   /* param — D-13 lighter derivative */
```

**New cascade block (Layer 3), placed after the `[data-instrument="cascadia"]` block:**
```css
[data-instrument="octatrack"] {
  --color-accent: var(--color-orange-500);
  --color-param: var(--color-orange-400);
  /* Warm orange-tinted surfaces (Elektron identity) */
  --color-bg: oklch(0.12 0.03 40);
  --color-sunken: oklch(0.10 0.03 40);
  --color-surface: oklch(0.16 0.03 40);
  --color-surface-raised: oklch(0.20 0.03 40);
  --color-overlay: oklch(0.24 0.03 40);
  --color-border: oklch(0.25 0.03 40);
  --color-border-subtle: oklch(0.20 0.025 40);
}
```

**OKLCH values are starting points**; iterate during implementation with the contrast validator (see §Common Pitfalls / WCAG).

### Pattern 5: Synthetic Demo Journey

**Source:** `src/lib/synthetic-daily-notes.ts`.

**Existing shape (Evolver + Cascadia):**
- `SYNTHETIC_COMPLETED_SESSIONS: Set<number>` — which session numbers are "done" in demo mode
- `SYNTHETIC_JOURNEY_WEEKS: Array<{week, sessions, note}>` — pacing narrative

**Consumer wiring:** `src/lib/progress.ts:102-107` — `getSyntheticCompletedSessions(instrument)` returns Cascadia set when `instrument === 'cascadia'`, else Evolver. Extension: add `instrument === 'octatrack'` branch.

**Octatrack journey recommendation (matches the CONTEXT.md roadmap framing of "ready for Module 7-10 depth"):**
- Reference start date: `2026-03-10` (after Cascadia journey)
- Weeks 1-4: Modules 1-6 complete, 18 sessions (faster pace than first two — learner is experienced)
- Week 5: One-session slowdown (content depth increases)
- Week 6: Back-on-track, Module 7 complete (sessions 19-21)
- Week 7: Current position — partway through Module 8 (22-23 done, 24 pending)
- Result: 23 of 31 complete, actively in the "songwriting focus" zone of the curriculum

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Auto-discovery of octatrack in nav/home/footer | Custom octatrack detection | `discoverInstruments(config)` in `reader.ts:70-78` | Reads any directory under `instruments/` automatically. Zero code changes once `src/content/instruments/octatrack/` exists. |
| Search indexing for Octatrack sessions | Custom index builder | `listSessions(slug, config)` in `layout.tsx:47-58` | Layout already iterates all discovered slugs and builds search index. Zero code changes. |
| Per-page octatrack feature gating | String comparison `instrumentSlug === 'octatrack'` | `instrumentConfig.sysex` / `.sampler` flag checks | Pattern already established in `midi/page.tsx:13` (sysex) and `nav.tsx:78` (sysex for MIDI link). New flags follow same pattern. D-11 is explicit. |
| Project-state patch renderer | Custom React component for sample-list/track-config tables | Markdown body in PatchDetail | `PatchDetail` renders `html` via `dangerouslySetInnerHTML` (patch-detail.tsx:91-94). Omit `cable_routing` and `knob_settings` in frontmatter; put tables in the body. Panel view below is already octatrack-branch'd (lines 140-145). |
| Directory bootstrapping in tests | Custom fs.mkdir setup | Existing test fixtures pattern | `src/lib/content/__tests__/__fixtures__/instruments/{evolver,cascadia}/` are the template; add `octatrack/` mirroring Cascadia. |
| WCAG contrast validation | Custom ratio math | `culori` + `scripts/validate-contrast.mjs` | Script exists but has HARDCODED old lime palette (`TOKEN_MAP` at script line 13-23) — see Pitfall #3 below. Update before adding orange. |
| Frontmatter validation | Custom YAML parsing + checks | Zod + `scripts/validate-content.ts` + `SessionSchema` / `PatchSchema` | `npm run validate-content` already walks `src/content/` and validates every file. Triple-write must pass this. |

**Key insight:** Phase 25's "site integration" is 80% automatic through existing auto-discovery patterns. The work is **content + schema + tokens + bundle-dir bootstrap**, not wiring.

## Runtime State Inventory

> Included because Phase 25 involves bootstrapping instrument state in multiple runtime locations (vault, bundle). This is not a rename, but it is a state-change phase.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data (vault) | `~/song/sessions/octatrack/`, `~/song/instruments/octatrack/`, `~/song/patches/octatrack/` — **all missing** | `mkdir -p` + triple-write bootstrap as part of first content-authoring task |
| Stored data (bundle) | `src/content/sessions/octatrack/`, `src/content/instruments/octatrack/`, `src/content/patches/octatrack/` — **all missing** | Created automatically by `scripts/bundle-content.ts` on build, but the source directories must be populated first. Test fixture directory `src/lib/content/__tests__/__fixtures__/instruments/octatrack/` may need adding if any test references octatrack fixtures. |
| Live service config | None. Evolver is a local-first app with no external services. | None — verified by absence of any cloud/API config in layout.tsx or reader.ts |
| OS-registered state | None. No launch agents, daemons, or Task Scheduler entries for instrument content. | None — verified by absence of platform-specific scripts |
| Secrets/env vars | None. Content is public. | None — verified by reviewing evolver.config.json and .env absence |
| Build artifacts | `src/content/` is regenerated on every `npm run build` (see `package.json` "prebuild" → `bundle-content`). No stale artifact risk. | None, but: the `bundle-content.ts` script does a `fs.cpSync(src, dest, { recursive: true })` from project root — as long as working `sessions/octatrack/` is complete, `src/content/sessions/octatrack/` stays in sync. |

**Canonical question:** After every file in the repo is updated, what runtime systems still have old state cached? Answer for Phase 25: the **vault** (`~/song/`) is the only runtime state outside the repo, and it is currently empty for Octatrack. Bootstrap explicitly; do not assume triple-write will "just work."

## Common Pitfalls

### Pitfall 1: Triple-write divergence

**What goes wrong:** A session is authored in `sessions/octatrack/` but never copied to `src/content/sessions/octatrack/` or `~/song/sessions/octatrack/`. In production (demo mode), the bundle dir is missing the session and the site shows a truncated curriculum. In local mode, the vault is missing it and `scanDailyNotes()` behaves incorrectly.

**Why it happens:** Triple-write is a manual step in the current pipeline. No script enforces it. It's easy to forget after editing a session.

**How to avoid:**
- Every session-authoring task in the plan ends with explicit triple-write as the last numbered step.
- Consider adding a `scripts/sync-vault.sh` helper as a pre-commit hook or a one-liner planners can cite: `cp -r sessions/octatrack/*.md src/content/sessions/octatrack/ && cp -r sessions/octatrack/*.md ~/song/sessions/octatrack/`.
- Add a verification task at end of phase: `diff -r sessions/octatrack src/content/sessions/octatrack` and `diff -r sessions/octatrack ~/song/sessions/octatrack` — both must show zero differences.
- Run `npm run validate-content` (`scripts/validate-content.ts`) as a phase gate — it scans all three locations' frontmatter against SessionSchema.

**Warning signs:**
- Session count in demo mode differs from count in development mode.
- Cascadia has 27 bundled sessions but only 20 work-tree sessions (or vice versa).
- `listSessions('octatrack', config)` returns a different array length in server (bundle) vs. vault contexts.

### Pitfall 2: Panel marker control-ID drift

**What goes wrong:** A session references `key-func-part` but `CONTROL_METADATA` has it as `key-func-part` (OK) or `knob-data-g` (does not exist — panel has only A-F). The marker is silently dropped by `parseOctatrackPanelProps()` in session-detail.tsx:152-159 because the ID check rejects it, and the learner sees a full-panel zoom with no highlight where they expected focus.

**Why it happens:** Author writes the marker from memory of the manual rather than from `CONTROL_METADATA` keys.

**How to avoid:**
- Keep `src/lib/octatrack-panel-data.ts:67-144` open in a second pane during session authoring.
- Validation task per wave: grep all session files for `data-highlights=` and `data-knobs=`, extract IDs, verify each ID exists in `CONTROL_METADATA`.
- Add a vitest spec that loads every octatrack session, extracts panel marker attrs, validates every control-id against the metadata. Model after `session-detail.test.tsx`.

**Warning signs:**
- Visual QA shows panel renders but markers don't highlight anything.
- Cascadia sessions work but Octatrack sessions don't after authoring.

### Pitfall 3: Contrast validator uses outdated token map

**What goes wrong:** `scripts/validate-contrast.mjs:13-23` has `TOKEN_MAP` hardcoded with `accent: 'oklch(0.85 0.18 105)'` — the **old lime palette**. Running the validator against new Octatrack orange primitives produces meaningless results because the reference colors are wrong.

**Why it happens:** Phase 24 replaced the lime palette in `globals.css` and `tokens.test.ts`, but the `scripts/validate-contrast.mjs` script was not updated.

**How to avoid:**
- Phase 25 must update `scripts/validate-contrast.mjs` `TOKEN_MAP` to current Phase 24 values before adding orange. This is a precondition for D-12/D-13 WCAG validation.
- Better: refactor `validate-contrast.mjs` to read `globals.css` directly (as `tokens.test.ts:5-15` does) so it stays in sync.
- Add Octatrack-specific pairings: orange accent on every surface token at both neutral base and octatrack-tinted surfaces.

**Warning signs:**
- Contrast validator passes but real-world rendering shows illegible orange text.
- Test says 4.5:1 but eye test says 3:1.

### Pitfall 4: Session scope creep past 30 minutes

**What goes wrong:** Module 10 Session 31 ("Composition Workflow") already spans a 5-phase workflow in ~25 min and is dense. Authoring new sessions in Modules 7-10 with "deep" focus is tempting to make 40-45 min. Violates CLAUDE.md's hard ADHD constraint.

**Why it happens:** Focus modules naturally invite depth. Each exercise feels important. "Just one more step."

**How to avoid:**
- Every session's `duration` frontmatter field is validated by Zod: `z.number().int().min(5).max(30)` (SessionSchema in schemas.ts:7). Any value > 30 fails `validate-content`.
- Author internal "time budget" at planning time: sum of exercise minutes must be ≤ duration − (warmup 2 + setup 2 + output 2) ≈ duration − 6.
- If a topic needs > 30 min of content, split into two sessions. The 31-session curriculum in `modules.md` is already split this way in several places (e.g., Module 5 has 4 sessions).

**Warning signs:**
- Exercise times sum to > session duration.
- A single exercise has > 5 sub-steps.
- "Explore if time allows" runs to > 5 bullets (that's a sign material should have been cut).

### Pitfall 5: Capability flag reads fail silently

**What goes wrong:** A component reads `instrumentConfig.sampler` expecting `true` for Octatrack, but the `sampler: true` field is missing from `instrument.json`, and the `.passthrough()` schema accepts the file without the field. The component receives `undefined`, evaluates `if (instrumentConfig.sampler)` as falsy, and skips sampler-gated UI.

**Why it happens:** Optional Zod fields + passthrough + falsy-undefined checks = quiet failures.

**How to avoid:**
- Schema makes new fields optional for backward compat, but the Octatrack-specific file MUST declare all five capability flags explicitly.
- Add a test in `src/lib/content/__tests__/schemas.test.ts` that loads `src/content/instruments/octatrack/instrument.json` and asserts `sampler === true`, `sequencer === true`, `midi_sequencer === true`, `sysex === false`, `patch_memory === false`.
- Helper: `hasCapability(config, flag): boolean` that normalizes `config[flag] === true` vs. `undefined` for every consumer.

**Warning signs:**
- Octatrack MIDI page renders (should be gated out by `sysex === false`) — means `sysex` field missing or `true` in the JSON.
- Cascadia patch page starts showing project-state format (should only happen for Octatrack via `patch_memory === false`) — means capability check is coupled to the wrong field or flag.

### Pitfall 6: Bundle-content.ts misses empty source directories

**What goes wrong:** `scripts/bundle-content.ts` uses `fs.cpSync(src, dest, { recursive: true })`. If the source (`patches/octatrack/` before any patches are written) exists but is empty except for `README.md`, `cpSync` copies just the README. So far, so good. But if the planner's Wave ordering puts site integration BEFORE patch authoring, the bundled patches directory will have only the README and the demo-mode site will show "0 patches" for Octatrack.

**Why it happens:** Wave ordering that lands the bundle before the content.

**How to avoid:**
- Don't build before patches are triple-written.
- Wave ordering must be: schema/tokens → bootstrap dirs → session authoring → patches → bundle/verify. Do not run `npm run build` between intermediate waves (dev mode uses vault, so dev doesn't care, but demo verification does).

**Warning signs:**
- Demo-mode home page says "Octatrack: 0 patches" after build.
- `/instruments/octatrack/patches/` renders an empty list despite patches existing in `patches/octatrack/`.

## Code Examples

### Example 1: Extending InstrumentConfigSchema

```typescript
// Source: src/lib/content/schemas.ts:73-83 — CURRENT
export const InstrumentConfigSchema = z.object({
  display_name: z.string(),
  tagline: z.string(),
  manufacturer: z.string(),
  sysex: z.boolean(),
  patch_memory: z.boolean(),
  reference_pdfs: z.array(z.object({
    label: z.string(),
    file: z.string(),
  })),
}).passthrough();

// Source: src/lib/content/schemas.ts:73-83 — PROPOSED
export const InstrumentConfigSchema = z.object({
  display_name: z.string(),
  tagline: z.string(),
  manufacturer: z.string(),
  sysex: z.boolean(),
  patch_memory: z.boolean(),
  sampler: z.boolean().optional(),         // Phase 25: has_sampler
  sequencer: z.boolean().optional(),       // Phase 25: has_sequencer
  midi_sequencer: z.boolean().optional(),  // Phase 25: has_midi_sequencer (informational)
  reference_pdfs: z.array(z.object({
    label: z.string(),
    file: z.string(),
  })),
}).passthrough();
```

### Example 2: Octatrack instrument.json

```json
{
  "display_name": "Octatrack MKII",
  "tagline": "Performance sampler, live looper, and MIDI brain",
  "manufacturer": "Elektron",
  "sysex": false,
  "patch_memory": false,
  "sampler": true,
  "sequencer": true,
  "midi_sequencer": true,
  "reference_pdfs": []
}
```

### Example 3: Color cascade block (insert into globals.css after line 125)

```css
/* Octatrack Elektron orange (Phase 25) */
[data-instrument="octatrack"] {
  --color-accent: var(--color-orange-500);
  --color-param: var(--color-orange-400);
  /* Warm orange-tinted surfaces (Elektron identity) */
  --color-bg: oklch(0.12 0.03 40);
  --color-sunken: oklch(0.10 0.03 40);
  --color-surface: oklch(0.16 0.03 40);
  --color-surface-raised: oklch(0.20 0.03 40);
  --color-overlay: oklch(0.24 0.03 40);
  --color-border: oklch(0.25 0.03 40);
  --color-border-subtle: oklch(0.20 0.025 40);
}
```

And in the `@theme` block (insert after `--color-steel-400`):

```css
/* Octatrack Elektron orange */
--color-orange-500: oklch(0.72 0.16 40);
--color-orange-400: oklch(0.80 0.12 42);
```

### Example 4: Session authoring — Module 7 Session 19

```markdown
---
title: "Session 19: Scene Fundamentals — Assign, Fade, Mute"
module: "Scenes & Crossfader"
session_number: 19
duration: 25
prerequisite: 18
output_type: technique
difficulty: intermediate
tags: [scenes, crossfader, performance, parameter-snapshots]
instrument: octatrack
reference: "Elektron Manual Ch. 10.3; Merlin Ch. 6"
---

# Session 19: Scene Fundamentals — Assign, Fade, Mute

**Objective:** Assign parameter snapshots to Scene A and Scene B, use the crossfader
to morph between them, and mute/unmute scenes for instant jumps. This is the OT's
primary performance gesture.

> [!tip] If you only have 5 minutes
> Hold [SCENE A] + [TRIG 1] to enter Scene 1 assign mode. Turn a filter knob to
> change its value for that scene. Hold [SCENE B] + [TRIG 1] and set the same
> knob differently. Move the crossfader. You just performed a scene morph.

## Warm-Up (2 min)

[...]

## Setup

[...]

## Exercises

<div data-octatrack-panel
  data-sections="scene,mix,param"
  data-highlights="key-scene-a:amber,key-scene-b:amber,slider-mix-crossfader:blue"
></div>

### Exercise 1: Assign a Scene (5 min)

1. Select Track 1 (drum loop) — press **[TRACK 1]**
2. Press **[FX1]** to see the filter parameters
3. Hold **[SCENE A]** and press **[TRIG 1]** — you're now editing Scene 1's A side
4. While holding **[SCENE A]**, turn Data Entry knob A to modify the filter cutoff
[...]

### Exercise 2: The Crossfader Morph (8 min)
[...]

### Exercise 3: Scene Mute (5 min)
[...]

### Exercise 4: Multiple Parameters (5 min)
[...]

## Output Checklist

- [ ] I assigned Scene 1 to Side A (default) and Scene 2 to Side B (destroyed)
- [ ] Moving the crossfader smoothly interpolates between the two states
- [ ] I muted a scene and instantly jumped between states
- [ ] I can describe the difference between scene assignment and scene mute

## Key Takeaways

- Scenes are parameter snapshots; the crossfader interpolates between them
- Hold [SCENE A/B] + [TRIG] to enter assign mode; turn knobs to change values
- Muting a scene creates an instant state jump (no morph)

## Next Session Preview

Next: XLEV and XVOL — scene-controlled track volumes that unlock smooth,
professional-sounding mix fades.
```

### Example 5: Synthetic journey extension

```typescript
// Source: src/lib/synthetic-daily-notes.ts — append after line 88

/**
 * Synthetic Octatrack journey (~7 weeks).
 * Learner starts after Cascadia is well-established and goes deep on the
 * songwriting/looping focus. Pacing matches the focus-module weight:
 * Modules 1-6 move quickly (mechanical); 7-10 slow down (compositional).
 *
 * Result: 23/31 complete, currently in Module 8 (Parts), with Module 10
 * Songwriting still ahead — matches curriculum focus framing.
 */
export const SYNTHETIC_OCTATRACK_COMPLETED_SESSIONS: Set<number> = new Set([
  1, 2, 3,           // Module 1 Foundations
  4, 5, 6,           // Module 2 Sample Management
  7, 8, 9,           // Module 3 Machines & Playback
  10, 11, 12,        // Module 4 Effects
  13, 14, 15, 16,    // Module 5 Sequencer
  17, 18,            // Module 6 Modulation
  19, 20, 21,        // Module 7 Scenes & Crossfader (focus module — complete)
  22, 23,            // Module 8 Parts (focus module — partway)
]);

export const SYNTHETIC_OCTATRACK_JOURNEY_WEEKS = [
  { week: 1, sessions: [1, 2, 3, 4], note: 'Experienced learner — third instrument, fast foundations' },
  { week: 2, sessions: [5, 6, 7, 8, 9], note: 'Through machines and into effects' },
  { week: 3, sessions: [10, 11, 12], note: 'Effects module, normal pace' },
  { week: 4, sessions: [13, 14, 15], note: 'Sequencer deep dive — slowing down' },
  { week: 5, sessions: [16, 17, 18], note: 'Finishing modulation' },
  { week: 6, sessions: [19, 20, 21], note: 'Scene-and-crossfader depth (focus module)' },
  { week: 7, sessions: [22, 23], note: 'Current position, mid-Parts-module' },
] as const;
```

And the consumer (`src/lib/progress.ts:102-107`):

```typescript
export function getSyntheticCompletedSessions(instrument?: string): Set<number> {
  if (instrument === 'cascadia') {
    return SYNTHETIC_CASCADIA_COMPLETED_SESSIONS;
  }
  if (instrument === 'octatrack') {
    return SYNTHETIC_OCTATRACK_COMPLETED_SESSIONS;
  }
  return SYNTHETIC_COMPLETED_SESSIONS;
}
```

(And `src/lib/practice-metrics.ts:45-48` similarly for `getSyntheticCompletionDates`.)

### Example 6: Project-state patch (Module 9 — live loop project)

```markdown
---
name: "Live Loop Layers"
type: texture
session_origin: 28
description: "A live-sampling performance project using Pickup machines on Tracks 7-8 and track recorders on Tracks 2-4. Demonstrates Master/Slave sync, overdub layering, and live resampling."
tags: [octatrack, live-looping, pickup-machines, resampling, performance]
instrument: octatrack
created: "2026-04-17"
---

# Live Loop Layers

**Session**: 28 | **Bank**: A | **Type**: performance

## Description

A performance-oriented project state. Input A/B carries your live source
(synth, guitar, or voice). Track 8 is the Master Pickup — first recording
sets the loop length. Track 7 is a Slave Pickup that syncs to Track 8.
Tracks 2-4 are Flex machines pointed at recorder buffers, reading audio
captured via Recorder Trigs on every pattern loop.

## Sample List

| Slot | Sample | Type | Notes |
|------|--------|------|-------|
| Flex 01 | basic-kick.wav | Drums | Foundation beat on Track 1 |
| Flex 02 | recorder-2 | Buffer | Captured from Input A/B on every loop |
| Flex 03 | recorder-3 | Buffer | One-shot capture (re-armable) |
| Flex 04 | recorder-4 | Buffer | Captures MAIN output for resampling |

## Track Configuration

| Track | Machine | Sample | FX1 | FX2 |
|-------|---------|--------|-----|-----|
| T1 | Flex | basic-kick | Comp | — |
| T2 | Flex | recorder-2 | Filter | Delay |
| T3 | Flex | recorder-3 | Lo-Fi | Reverb |
| T4 | Flex | recorder-4 | — | — |
| T5-6 | — | — | — | — |
| T7 | Pickup (Slave) | live input | — | Reverb |
| T8 | Pickup (Master) | live input | Filter | Delay |

## Pattern Map

| Pattern | Part | Description |
|---------|------|-------------|
| A01 | 1 | Kick only — Master loop setup |
| A02 | 1 | Kick + track recorders armed |
| A03 | 1 | Full loop layering |

## Scene Notes

**Scene A (default):** Flat mix, subtle FX.
**Scene B:** Filter closes on Tracks 2-3, delay feedback increases on T7-T8,
crossfader sweep builds tension for breakdown.

## Performance Tips

1. Start with A01 — play drums, hold [TRACK 8] + [REC1] to start recording the
   Master loop. Play 4 bars. Hit [TRACK 8] + [REC1] again to close the loop.
2. Switch to A02 — now Recorder Trigs on Tracks 2-4 fire every loop. Your
   input becomes a live sample fed through Filter, Lo-Fi, and resample chains.
3. Switch to A03 — Slave Pickup (T7) enables on the next loop; layer harmony
   or counter-rhythm. One-shot trig on T3 captures "the good take" and holds it.
4. Crossfader: slow morph from A to B over 16 bars builds the breakdown.

## Tags
#octatrack #performance #live-looping
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Single-instrument (Evolver only) site | Multi-instrument with discovery + per-instrument config | Phase 7 (v1.1) | Adding Octatrack is pure additive content — zero new architecture. |
| Lime-green accent across all routes | Per-instrument color cascade via `[data-instrument]` | Phase 24 | Orange is one more cascade block; no architecture change. |
| Patch pages render only parameter-dump format | Conditional octatrack branch renders panel-only | `260416-9hx` (Phase 25 bootstrap) | Project-state format needs no renderer — it fits in markdown body. |
| Panel integration was Evolver-specific | Generic panel-marker regex with instrument-specific parse | Phase 13 (Cascadia panel) | Octatrack marker pattern already wired in session-detail.tsx:29. |

**Deprecated/outdated:**
- **`scripts/validate-contrast.mjs` TOKEN_MAP**: still has lime palette (`accent: 'oklch(0.85 0.18 105)'`). Must be updated before orange validation runs.

## Open Questions

### 1. Octatrack manual PDF presence
- **What we know:** `references/Evo_Key_Manual_1.3.pdf` and `references/evolverguide.pdf` are in the repo. Cascadia has a referenced `cascadia_manual_v1.1.pdf` in its instrument.json. There is no visible Octatrack manual PDF in `references/`.
- **What's unclear:** Should Phase 25 include adding the Octatrack MKII manual PDF to `references/`, or leave `reference_pdfs: []`?
- **Recommendation:** Leave empty. Session frontmatter `reference:` field carries manual chapter references inline (pattern used in all 6 existing draft sessions: "Elektron Manual Ch. X.Y"). User can add a PDF in a later quick task if desired. No blocking issue.

### 2. Octatrack module page rendering
- **What we know:** `listModules()` in reader.ts:146-164 reads `instruments/<slug>/modules/*.md` files. Cascadia has `instruments/cascadia/modules/` with individual module files. Octatrack has only a single `instruments/octatrack/modules.md` (authoring spec, no per-module pages).
- **What's unclear:** Does the module browser page at `src/app/instruments/[slug]/modules/page.tsx` render correctly when the modules directory is missing?
- **Recommendation:** Inspect during Wave 1 foundation work. If broken, either (a) generate per-module markdown files from `modules.md` data, or (b) make the modules page fall back to reading `modules.md` as a single document. This is not a hard blocker — Octatrack progress page can still reference module names via session frontmatter `module:` field.

### 3. Session 22 (Parts deep dive) scope
- **What we know:** Module 8 Session 22 in modules.md says "Save, reload, copy" in 25 min. Parts mechanics are non-trivial (save/copy/reload/relationship-to-patterns).
- **What's unclear:** Does 25 minutes hold if the session authors the full mental model of Parts vs. Patterns?
- **Recommendation:** Author to fit 25 min. If content exceeds budget, split into 22a (save/reload mechanics) and 22b (copy + relationship to patterns). Add a session number shift only if necessary; prefer tight authoring over splits.

### 4. Progress page per-module aggregation for Octatrack
- **What we know:** Progress page consumes session frontmatter `module:` string. Module strings in draft sessions use the human names from modules.md ("Foundations", "Machines & Playback", "Live Sampling & Looping").
- **What's unclear:** Does the progress page display module order correctly when all 10 modules are represented?
- **Recommendation:** Verify during the final site-integration wave. Cascadia has 7 modules and works; Octatrack has 10 modules and could reveal layout issues. Not a content-authoring blocker.

### 5. Whether demo mode needs patches or just sessions
- **What we know:** Cascadia has 22 bundled patches in `src/content/patches/cascadia/`. The CONTEXT.md D-16 specifies exactly 3-4 patches for Octatrack.
- **What's unclear:** Does the demo-mode UX need more patches to feel "complete" for the user-facing journey?
- **Recommendation:** 4 demo patches + basic-project.md = 5 total. Matches the "headline depth on focus modules" framing. Extended patch library is explicitly deferred (CONTEXT.md Deferred Ideas).

## Environment Availability

This phase has no new external dependencies. All tooling already installed per `package.json`:

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js + npm | All scripts | ✓ | — (project established) | — |
| vitest | Schema and token tests | ✓ | ^3.0.0 (dev) | — |
| culori | OKLCH contrast validation | ✓ | ^4.0.2 (dev) | — |
| zod | Schema | ✓ | ^3.23.0 | — |
| Next.js | Dev + build | ✓ | ^15.5.14 | — |
| gray-matter + glob | Content reader | ✓ | existing | — |

**External to the repo:**
- `~/song/` vault — verified to exist but does not contain octatrack content. Phase 25 must bootstrap its directory structure.
- `references/octatrack_mkii_manual.pdf` — not present. Not required if `reference_pdfs: []` (recommendation above).

**Missing dependencies with no fallback:** None.
**Missing dependencies with fallback:** None.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | vitest ^3.0.0 + @testing-library/react ^16.3.2 + jsdom ^29.0.1 |
| Config file | Implicit via `vitest` CLI; co-located `__tests__/` directories |
| Quick run command | `npm test -- <test-path>` or `npm test -- -t "<pattern>"` |
| Full suite command | `npm test` (runs `vitest run` per package.json) |

**Supporting scripts:**
| Script | Command | Purpose |
|--------|---------|---------|
| Schema validation | `npm run validate-content` | Walks `src/content/` and validates every markdown file's frontmatter against Zod schemas |
| Contrast validation | `node scripts/validate-contrast.mjs` | WCAG AA contrast check for token pairs (NOTE: TOKEN_MAP outdated — update before using) |
| Content bundle | `npm run bundle-content` (auto-runs as prebuild) | Copies `{instruments,sessions,patches,references}/` → `src/content/` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| D-01 | 25 new sessions validate against SessionSchema | unit (schema) | `npm run validate-content` | ✅ (script exists; tests new content automatically) |
| D-03 | Triple-write — all three locations match | integration | `diff -r sessions/octatrack src/content/sessions/octatrack` + `diff -r sessions/octatrack ~/song/sessions/octatrack` | ❌ Wave 0 (add `npm script: check-sync-octatrack`) |
| D-04 | Duration ≤ 30 min enforced | unit (schema) | `npm run validate-content` | ✅ (SessionSchema enforces `z.number().int().min(5).max(30)`) |
| D-05 | Octatrack auto-discovered by `discoverInstruments()` | unit | `vitest run src/lib/content/__tests__/reader.test.ts -t "discoverInstruments"` | ✅ (test exists; add octatrack fixture) |
| D-06 | Panel route resolves octatrack | unit | `vitest run src/app/instruments/.../panel/__tests__` | ❌ Wave 0 (no test exists for panel page; add one or rely on StandalonePanelClient test) |
| D-07 | instrument.json validates | unit (schema) | `vitest run src/lib/content/__tests__/schemas.test.ts -t "InstrumentConfigSchema"` | ✅ (extend with octatrack case) |
| D-08 | Capability flags on Octatrack = expected values | unit | `vitest run src/lib/content/__tests__/instrument-json-octatrack.test.ts` (new) | ❌ Wave 0 |
| D-09 | `has_sysex=false` hides MIDI page | unit | `vitest run src/app/__tests__/midi-capability.test.tsx` | ✅ (extend with octatrack case) |
| D-09 | `has_patch_memory=false` renders project-state | manual + unit | Visual inspection + `vitest run src/components/__tests__/patch-detail.test.tsx` | ❌ Wave 0 for patch-detail octatrack case |
| D-11 | No instrument-name string checks in new code | code review | `grep -n "instrumentSlug ===" src/**/*.tsx` audit | ✅ (grep) |
| D-12, D-13 | Orange accent + param pass WCAG AA 4.5:1 on all surface tokens | unit (contrast) | `vitest run src/app/__tests__/tokens.test.ts -t "Octatrack"` + `node scripts/validate-contrast.mjs` | ❌ Wave 0 (extend tokens test; update validate-contrast.mjs) |
| D-14 | `[data-instrument="octatrack"]` block in globals.css | unit | `vitest run src/app/__tests__/tokens.test.ts -t 'data-instrument="octatrack"'` | ❌ Wave 0 |
| D-16, D-17, D-18 | 4 project-state patches + basic-project.md validate | unit (schema) | `npm run validate-content` | ✅ (script auto-validates) |
| D-20, D-21 | Panel markers — all control-IDs exist in CONTROL_METADATA | unit | `vitest run src/lib/__tests__/octatrack-marker-ids.test.ts` (new) | ❌ Wave 0 |
| D-22 | Panel files not modified | code review | `git diff --stat HEAD~N src/components/octatrack-panel.tsx src/lib/octatrack-panel-data.ts` | — (manual gate) |

### Sampling Rate

- **Per session commit (content authoring):** `npm run validate-content` — validates frontmatter. Fast (<5s per run). Runs on the specific session file touched.
- **Per wave merge (foundation / schema / tokens):** `npm test` — full suite. Catches regressions in nav, app-shell, panel rendering, schema.
- **Phase gate (before `/gsd:verify-work`):**
  1. `npm test` — full suite green
  2. `npm run validate-content` — all three locations pass schema
  3. `node scripts/validate-contrast.mjs` (after TOKEN_MAP update) — Octatrack pairings pass 4.5:1
  4. `npm run build` — bundle step succeeds
  5. `diff -r sessions/octatrack src/content/sessions/octatrack` — empty diff
  6. `diff -r sessions/octatrack ~/song/sessions/octatrack` — empty diff
  7. Manual UAT: visual checkpoint (ADHD 5-second test; see §Manual UAT below)

### Wave 0 Gaps

Tests / scripts that need to exist before implementation starts:

- [ ] `src/lib/content/__tests__/__fixtures__/instruments/octatrack/instrument.json` — test fixture for capability schema
- [ ] `src/lib/content/__tests__/__fixtures__/instruments/octatrack/overview.md` — test fixture for instrument file schema
- [ ] Extend `src/lib/content/__tests__/schemas.test.ts` — add octatrack instrument config cases (sampler flags, patch_memory=false, sysex=false)
- [ ] Extend `src/lib/content/__tests__/reader.test.ts` — discoverInstruments returns `['cascadia', 'evolver', 'octatrack']` after fixture added
- [ ] Extend `src/app/__tests__/tokens.test.ts` — `[data-instrument="octatrack"]` block exists; orange primitives exist; surface tokens use hue 35-45; WCAG AA lightness check
- [ ] Extend `src/app/__tests__/midi-capability.test.tsx` — octatrack shows NoSysexPage
- [ ] Extend `src/components/__tests__/nav.test.tsx` — nav uses `sysex:false` for octatrack to hide MIDI link
- [ ] Extend `src/components/__tests__/app-shell.test.tsx` — data-instrument="octatrack" set on octatrack routes
- [ ] NEW `src/lib/__tests__/octatrack-marker-ids.test.ts` — every `data-highlights=`/`data-knobs=`/`data-sections=` ID in octatrack sessions exists in CONTROL_METADATA or SECTION_BOUNDS
- [ ] NEW `src/components/__tests__/patch-detail-octatrack.test.tsx` — Octatrack patch renders markdown body (project-state format) and OctatrackPanel below; does not render Evolver-style cable routing
- [ ] Update `scripts/validate-contrast.mjs` — TOKEN_MAP must reflect Phase 24 palette (blue/steel/neutral) + Phase 25 orange, not lime
- [ ] NEW `scripts/check-triple-write.sh` or npm script — verify `sessions/octatrack/`, `src/content/sessions/octatrack/`, `~/song/sessions/octatrack/` match (same for patches and instruments)

### Manual UAT

Required manual inspection steps (cannot be automated):

- [ ] Home page: three instrument cards render (Evolver, Cascadia, Octatrack) with correct taglines and session/patch counts
- [ ] Instrument selector dropdown: Octatrack appears and navigates correctly
- [ ] Navigate to `/instruments/octatrack` — overview, signal flow, basic project, modules all render
- [ ] Navigate to `/instruments/octatrack/sessions` — all 31 sessions listed, prerequisite chain visible
- [ ] Navigate to any Module 7-10 session with panel markers — panel zoom, highlights, and knob value overrides all visible
- [ ] Navigate to `/instruments/octatrack/patches` — 5 patches visible (4 demo + basic-project)
- [ ] Open a patch — project-state tables render, OctatrackPanel appears below body, no cable routing section shown
- [ ] Navigate to `/instruments/octatrack/midi` — NoSysexPage renders (not MIDI page)
- [ ] Navigate to `/instruments/octatrack/progress` — synthetic demo journey shows ~23/31 sessions complete, heatmap shows realistic pacing
- [ ] Global search: search "scene" — Octatrack Session 19 appears in results
- [ ] Visual check: surface backgrounds have subtle warm orange tint on octatrack routes; accent is visibly Elektron orange
- [ ] WCAG visual check: orange accent text readable on `--color-bg`, `--color-surface`, `--color-surface-raised`, `--color-overlay`
- [ ] ADHD 5-second test: open any Octatrack session on mobile; single clear visual hierarchy; panel marker immediately communicates where to look

## Risk Inventory

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| **Scope size** — 25 sessions + 5 patches + integration + tokens is a big phase | Schedule overrun; rushed quality | HIGH | Decompose into 5 waves with parallel authoring streams (Module 1-6 one stream, 7-10 another). Each wave has a single focus. Gate each wave with validation before moving to the next. |
| **Content authoring time** — realistic 30-40 min per session × 25 = 12-17 hrs focused work | Time budget blown | HIGH | Use modules.md as the authoring spec verbatim (it has session topic, duration, output already). Treat session writing as a pure expansion task, not a design task. Match existing draft style. |
| **Triple-write drift** — sessions authored but not copied to vault or bundle | Demo mode shows wrong content; validation passes in one location only | MEDIUM | Every session-authoring task ends with triple-write as an explicit step. Add a `check-triple-write` script to the phase gate. Wave 0 creates the 9 missing directories before authoring starts. |
| **Capability gate leakage** — Cascadia accidentally picks up octatrack flag behavior | Cascadia regression | LOW | Schema changes are additive with `.optional()`. Fixed-literal checks like `sysex === false` stay the same for Cascadia. Test coverage for Cascadia flags unchanged. |
| **Color contrast failure** — chosen OKLCH numbers don't meet WCAG AA on all 5 surface tokens | Visual checkpoint fails; need to iterate orange values | MEDIUM | Update `validate-contrast.mjs` TOKEN_MAP in Wave 0. Run validator before committing each orange variant. Expect 2-3 iterations on exact chroma/lightness. |
| **Panel marker control-ID mismatch** — author writes `knob-data-g` (doesn't exist) | Silent failure; marker parsed but highlight ignored | MEDIUM | Wave 0 test: `src/lib/__tests__/octatrack-marker-ids.test.ts` that validates every ID in every Octatrack session. Runs in full test suite on every wave merge. |
| **ADHD cap violation** — a session naturally wants 35-40 min | Fails schema validation | LOW | `SessionSchema.duration.max(30)` enforces at validation time. If a topic overruns, split into sub-sessions (mark with 'a'/'b' or renumber). Planner must not plan a 45-min session. |
| **Bundled patches out of order with sessions** — site builds but demo has 0 patches | Build succeeds, demo is hollow | LOW | Wave ordering: schema/tokens → bootstrap dirs → session authoring → patches → bundle + verify. Do not run build between waves; use dev mode + vault for intermediate verification. |
| **Octatrack manual PDF missing** — `reference_pdfs: []` vs. a real PDF path | Minor — references in session bodies compensate | LOW | Leave `reference_pdfs: []`. User can add PDF in a follow-up quick task if desired. |
| **Progress page layout breaks with 10 modules** — UI tested with Evolver's 9 modules + Cascadia's 7 | Visual regression for Octatrack progress only | LOW | Manual UAT step catches this. If it fails, small CSS fix, not a structural change. |

## Decomposition Guidance

Recommended breakdown into plans. Five waves with the internal work cleanly separable.

### Wave 0: Foundation Tests + Contrast Script Update (blocks everything)
**Plan 25-00: Wave 0 — Test infrastructure + contrast script**
- Create `src/lib/content/__tests__/__fixtures__/instruments/octatrack/{instrument.json, overview.md}` test fixtures
- Extend `schemas.test.ts` for new capability flags and the Octatrack config values
- Extend `tokens.test.ts` with `[data-instrument="octatrack"]` cascade tests (starting as skipped/todo)
- Extend `app-shell.test.tsx` and `nav.test.tsx` for octatrack cases
- Create `octatrack-marker-ids.test.ts` skeleton
- Create `patch-detail-octatrack.test.tsx` skeleton
- Update `scripts/validate-contrast.mjs` TOKEN_MAP to Phase 24 palette + Octatrack orange entries (tests will fail until Wave 1 lands)
- Create `scripts/check-triple-write.sh` (or npm script)
- **Exit criteria:** Full test suite runs with new tests as todo; validate-contrast script updated to read from globals.css (or static-updated correctly)

### Wave 1: Schema + Tokens + Panel-Route Verification (blocks authoring)
**Plan 25-01: Schema + tokens + route verification**
- Extend `InstrumentConfigSchema` with optional `sampler`, `sequencer`, `midi_sequencer` fields
- Add `--color-orange-500` and `--color-orange-400` primitives to `@theme` block in globals.css
- Add `[data-instrument="octatrack"]` cascade block with accent, param, and surface overrides
- Verify `src/app/instruments/[slug]/panel/page.tsx` and `standalone-panel-client.tsx` already have octatrack branches (they do) — no code change, add a regression test if missing
- Make all Wave 0 todo tests pass
- Run contrast validator; iterate OKLCH values until all pairings pass 4.5:1
- **Exit criteria:** `npm test` green, `node scripts/validate-contrast.mjs` green, visual spot-check on existing 6 Octatrack sessions shows orange accent + warm surface tint

### Wave 2: Bootstrap Dirs + instrument.json + Bundle Content
**Plan 25-02: Content directory scaffolding + metadata**
- Create all 9 missing directories (three trees × `instruments`, `sessions`, `patches`)
- Write `instruments/octatrack/instrument.json` with capability flags
- Triple-write the existing 4 instrument markdown files (`overview.md`, `modules.md`, `signal-flow.md`, `basic-patch.md`) to `src/content/instruments/octatrack/` and `~/song/instruments/octatrack/`
- Triple-write the existing 6 octatrack sessions from `sessions/octatrack/` to `src/content/sessions/octatrack/` and `~/song/sessions/octatrack/`
- Triple-write `patches/octatrack/README.md` to `src/content/patches/octatrack/` and `~/song/patches/octatrack/`
- Run `npm run validate-content` — all new content passes
- Run `npm run bundle-content` — bundle directory populates correctly
- Visual verify in dev mode: home page shows 3 instruments, Octatrack overview renders, existing 6 sessions appear at `/instruments/octatrack/sessions`
- **Exit criteria:** Octatrack is a first-class instrument on the site with 6 sessions visible; triple-write sync diff is empty; demo journey integration pending

### Wave 3: Session Authoring (parallelizable in two streams)
**Plan 25-03a: Modules 1-6 sessions** (12 new sessions: 02, 03, 04, 05, 06, 07, 08, 10, 11, 12, 13, 14, 15, 16, 17, 18)
- Author each session per template in Pattern 1
- Sparse panel markers for critical hardware gestures (Parts key, Scene keys, REC1-3, Track keys)
- Triple-write every session
- Validate frontmatter with `npm run validate-content`
- **Exit criteria:** 12 new Modules-1-6 sessions exist in all 3 locations; schema passes; marker IDs pass

**Plan 25-03b: Modules 7-10 sessions** (13 new sessions: 19, 20, 21, 22, 23, 24, 26, 27, 30)
- Focus-module authoring with deeper marker coverage
- Match pedagogical style of existing drafts 25, 28, 29, 31
- Triple-write every session
- Validate
- **Exit criteria:** 13 new Modules-7-10 sessions exist in all 3 locations; focus-module marker density visible (estimate 2-4 markers per session vs. 0-1 for earlier modules)

Note: plans 25-03a and 25-03b can run in parallel (different session number ranges, no cross-dependencies).

### Wave 4: Patches (depends on Wave 3)
**Plan 25-04: Demo project patches**
- Write `patches/octatrack/basic-project.md` (D-18 reference starting state)
- Write 4 focus-module demo patches: scene-morphing (M7), parts-song-sections (M8), live-loop-layers (M9), full-arrangement (M10)
- Triple-write all 5 patches
- Validate PatchSchema
- Visual verify patch page rendering: markdown body renders project-state tables, panel view appears below, no cable-routing block shown
- **Exit criteria:** 5 patches in all 3 locations; patch page renders correctly for a test case

### Wave 5: Demo Journey + Verification + Visual Checkpoint
**Plan 25-05: Synthetic journey + final site verification**
- Extend `synthetic-daily-notes.ts` with `SYNTHETIC_OCTATRACK_COMPLETED_SESSIONS` and `SYNTHETIC_OCTATRACK_JOURNEY_WEEKS`
- Extend `progress.ts` and `practice-metrics.ts` to return octatrack data when `instrument === 'octatrack'`
- Run full test suite
- Run all phase gates (§Validation Architecture Phase gate)
- Manual UAT checklist (§Manual UAT)
- Visual checkpoint: ADHD 5-second test on home, instrument overview, session detail (with markers), patch detail, progress page
- **Exit criteria:** Demo-mode shows realistic Octatrack learner journey; all 31 sessions listed; orange identity visible; UAT passes

### Sequencing Constraints (Critical)

- **Wave 0 → Wave 1:** Tests must exist before they pass.
- **Wave 1 → Wave 2:** Schema + tokens must land before directory-bootstrap validates.
- **Wave 2 → Wave 3:** Directory structure must exist before authoring writes into it.
- **Waves 3a ∥ 3b:** Can run in parallel — different session ranges.
- **Wave 3 → Wave 4:** Patches reference session numbers; session numbers must exist for `session_origin` field.
- **Wave 4 → Wave 5:** Demo journey consumes full session + patch list.

### Plan Count Estimate
- Wave 0: 1 plan
- Wave 1: 1 plan
- Wave 2: 1 plan
- Wave 3: 2 plans (parallel)
- Wave 4: 1 plan
- Wave 5: 1 plan

**Total: 7 plans** (similar to v1.1's Phase 11 size). If Wave 3 plans are too large to complete in a single agent session, split by module (e.g., 3a1 = Modules 1-3, 3a2 = Modules 4-6).

## Sources

### Primary (HIGH confidence — direct source code inspection)
- `src/lib/content/schemas.ts` — Zod InstrumentConfigSchema, SessionSchema, PatchSchema
- `src/lib/content/reader.ts` — discoverInstruments, listSessions, listPatches, loadInstrumentConfig
- `src/app/globals.css` — Phase 24 three-layer token architecture and [data-instrument] cascade blocks
- `src/app/__tests__/tokens.test.ts` — token test patterns (44 tests)
- `src/components/session-detail.tsx` — panel marker regex, parseOctatrackPanelProps, panel rendering
- `src/components/patch-detail.tsx` — patch rendering with octatrack branch
- `src/components/nav.tsx` — capability-gated MIDI link via instrumentConfig.sysex
- `src/app/instruments/[slug]/midi/page.tsx` — NoSysexPage gating pattern
- `src/app/instruments/[slug]/panel/page.tsx` — already has octatrack branch (confirmed)
- `src/app/instruments/[slug]/panel/standalone-panel-client.tsx` — already has octatrack branch (confirmed)
- `src/lib/octatrack-panel-data.ts` — CONTROL_METADATA and SECTION_BOUNDS (authoritative ID list for markers)
- `src/lib/synthetic-daily-notes.ts` — journey shape pattern
- `src/lib/progress.ts` — getSyntheticCompletedSessions dispatch
- `src/lib/practice-metrics.ts` — getSyntheticCompletionDates dispatch
- `scripts/bundle-content.ts` — fs.cpSync pipeline
- `scripts/validate-content.ts` — Zod-based content validator
- `scripts/validate-contrast.mjs` — culori WCAG validator (OUTDATED TOKEN_MAP)
- `instruments/octatrack/modules.md` — 31-session authoring spec (authoritative)
- `instruments/octatrack/overview.md` — Octatrack architecture and physical controls
- `instruments/octatrack/basic-patch.md` — basic project document
- `patches/octatrack/README.md` — project-state patch format spec
- `sessions/octatrack/{01,09,25,28,29,31}*.md` — style reference for new sessions
- `sessions/cascadia/01-foundations-orientation-first-sound.md` — Cascadia panel marker syntax reference
- `sessions/evolver/01-foundations-navigation.md` — Evolver panel marker reference
- `.planning/phases/24-instrument-color-identity/24-01-SUMMARY.md` — Phase 24 decisions record

### Secondary (MEDIUM confidence — confirmed patterns, not explicit docs)
- Color cascade pattern (`[data-instrument]` surface overrides) — inferred from globals.css Phase 24 structure; confirmed via tokens.test.ts:205-247
- Triple-write workflow — inferred from CLAUDE.md + vault/bundle directory inspection; no explicit docs but practice is clear

### Tertiary (LOW confidence — not applicable)
None — all research sourced from repo inspection.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages already installed and in use
- Architecture patterns: HIGH — every pattern (color cascade, panel markers, capability schema) has a working Cascadia reference
- Pitfalls: HIGH — grounded in repo inspection; contrast validator outdated TOKEN_MAP directly verified, triple-write vault gap directly verified
- Decomposition: HIGH — wave ordering derived from explicit dependency chain (schema → dirs → content → patches → demo)
- Session authoring: HIGH for template/style; MEDIUM for exact time budget per Modules 7-10 (CONTEXT.md gives the intent; actual content density is a writing judgment)
- Validation architecture: HIGH — reused existing tests + scripts; new tests all follow established patterns

**Research date:** 2026-04-16
**Valid until:** 2026-05-16 (stable architecture; session content stale risk if Octatrack drafts evolve)
