# Phase 25: Complete Octatrack Curriculum + Site Integration - Context

**Gathered:** 2026-04-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Take the Octatrack MKII from "metadata + 6 of 31 sessions + panel SVG" to full Cascadia-parity on the evolver site: complete curriculum, triple-write pipeline, full site integration (instrument selector, nav, capability-gated routes, demo mode), new sampler capability profile, Elektron-orange color identity with surface tinting, and 3-4 demo project patches. Curriculum authoring weight goes to Modules 7-10 (Scenes & Crossfader, Parts & Pattern Workflow, Live Sampling & Looping, Songwriting & Arrangement) — the roadmap's named focus.

</domain>

<decisions>
## Implementation Decisions

### Curriculum Scope
- **D-01:** Author all 25 missing sessions to reach full 31-session parity with Evolver (37) and Cascadia (27). Existing 6 sessions (01, 09, 25, 28, 29, 31) stay in place and get integrated; 25 new sessions (02-08, 10-24, 26-27, 30) are written from scratch.
- **D-02:** Authoring weight is biased to Modules 7-10 (the roadmap focus). Depth/marker density/patch coverage is highest here. Modules 1-6 are complete but may be tighter.
- **D-03:** Every session triple-writes to `sessions/octatrack/`, `src/content/sessions/octatrack/`, and `~/song/sessions/octatrack/`. No session is "done" until all three locations have it.
- **D-04:** Session format matches existing Octatrack drafts: YAML frontmatter with `title`, `module`, `session_number`, `duration` (15-30 min hard cap), `prerequisite`, `output_type`, `difficulty`, `tags`, `instrument: octatrack`, `reference`. Content structure: Objective → "If you only have 5 minutes" tip → Warm-Up → Setup → Exercises → Output.

### Site Integration Depth
- **D-05:** Full Cascadia-parity integration — not minimal listing. Octatrack appears in instrument selector, home page instrument card, nav, session browser, progress/prerequisite system, global search, and demo mode with a synthetic learner journey.
- **D-06:** Wire `src/app/instruments/[slug]/panel/page.tsx` to resolve `octatrack` → `OctatrackPanel`. Panel route, standalone panel client, and session-detail panel marker rendering all work end-to-end.
- **D-07:** Add `instruments/octatrack/instrument.json` (matching Cascadia's shape) declaring metadata, capability flags, and module list.

### Capability Profile (Sampler)
- **D-08:** Introduce a new capability profile rather than retrofitting Evolver or Cascadia shapes. Flags: `has_sampler=true`, `has_sequencer=true`, `has_midi_sequencer=true`, `has_sysex=false`, `has_patch_memory=false`.
- **D-09:** `has_sysex=false` hides the MIDI SysEx page for Octatrack. `has_patch_memory=false` causes patch pages to render the project-state format (sample list, track config, scenes, arranger) rather than the parameter-dump format Evolver uses.
- **D-10:** `has_midi_sequencer=true` is new — signals "this instrument sequences OTHER gear via MIDI." Currently informational; UI surfacing of that capability is not required in Phase 25, but the flag exists so future phases can light it up.
- **D-11:** Capability gating pattern follows Phase 7 precedent: conditional rendering based on flag presence, not instrument-name switching.

### Color Identity
- **D-12:** Octatrack accent is **Elektron orange** — warm hue (direction: 35-45°), chroma ~0.15-0.17. Warm pole against the existing cool accents (Evolver blue hue 245 / Cascadia steel hue 250). Exact OKLCH values picked during implementation with WCAG AA contrast validation against all surface backgrounds.
- **D-13:** Lighter `--color-param` derivative required (visibly lighter than accent, matches COLOR-04 pattern), also WCAG AA validated.
- **D-14:** Surface tinting enabled — add `data-instrument='octatrack'` cascade overrides for `--color-bg`, `--color-surface`, `--color-surface-raised`. Subtle warm-tint mirroring Evolver/Cascadia pattern established in Phase 24. Chroma stays low on surface tokens (~0.03-0.04) to avoid visual noise while conveying instrument context.
- **D-15:** Color work follows Phase 24's three-layer token architecture (primitive → semantic → cascade). No changes to the token architecture itself.

### Patches (Octatrack Project-State Documents)
- **D-16:** Ship 3-4 demo project patches, one per focus module:
  - Module 7 (Scenes & Crossfader): scene-morphing performance project
  - Module 8 (Parts & Pattern Workflow): Parts-as-song-sections project
  - Module 9 (Live Sampling & Looping): live-looping project with Pickup machines + track recorders
  - Module 10 (Songwriting & Arrangement): full arrangement project
- **D-17:** Patch format follows `patches/octatrack/README.md` spec (sample list, track config, pattern map, scene notes, performance tips). No parameter-dump format.
- **D-18:** Also include `basic-project.md` as the reference starting state (already spec'd in README, not yet written).
- **D-19:** Patches are bundled into `src/content/patches/octatrack/` for demo mode, same pattern as Cascadia.

### Panel Markers in Sessions
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

### Deferred Within Phase 25
- No deferred items — the phase is scoped broad but all four areas are in-scope.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Octatrack domain knowledge
- `instruments/octatrack/overview.md` — Architecture overview, 5 machine types, Parts/Patterns/Scenes concepts, physical controls map
- `instruments/octatrack/modules.md` — Authoritative 31-session curriculum structure, module-by-module breakdown with session titles, durations, outputs, and specifics. This is the authoring spec for new sessions.
- `instruments/octatrack/signal-flow.md` — Audio path: external inputs → 8 track chain → outputs. Reference for sessions covering routing, resampling, effects chains.
- `instruments/octatrack/basic-patch.md` — Starting-state "basic project" setup. Every session begins from this state.
- `patches/octatrack/README.md` — Patch format spec (sample list, track config, pattern map, scene notes, performance tips). Authoritative for patch authoring.
- `references/Evo_Key_Manual_1.3.pdf` — (not Octatrack-specific, but noted for reference-first authoring pattern)

### Evolver site integration patterns (reference implementations)
- `src/lib/octatrack-panel-data.ts` — `CONTROL_METADATA` keys (authoritative for panel marker control IDs) and `SECTION_BOUNDS`
- `src/components/octatrack-panel.tsx` — Already-built panel SVG component (frozen — do not edit)
- `src/components/session-detail.tsx` §28-29 — Existing `data-octatrack-panel` regex and marker integration logic
- `src/components/session-detail.tsx` §225-227 — Panel marker rendering condition for octatrack
- `src/app/instruments/[slug]/panel/page.tsx` — Panel route that needs octatrack resolution added (currently cascadia-only)
- `src/app/instruments/[slug]/panel/standalone-panel-client.tsx` — Standalone panel route client that needs octatrack branch

### Per-instrument color architecture (Phase 24 patterns to replicate)
- `.planning/phases/24-instrument-color-identity/24-01-PLAN.md` — Implementation plan for per-instrument color primitives + semantic defaults + cascade overrides
- `.planning/phases/24-instrument-color-identity/24-01-SUMMARY.md` — Decisions record (Evolver hue 245 chroma 0.15; Cascadia hue 250 chroma 0.04)
- `src/app/globals.css` — Token architecture (primitive → semantic → cascade) and existing `[data-instrument]` cascade blocks

### Content pipeline (triple-write reference)
- `sessions/cascadia/` — Working-dir session source (27 sessions)
- `src/content/sessions/cascadia/` — Bundled content for demo mode
- `~/song/sessions/cascadia/` — Vault copy
- `src/lib/content/reader.ts` (implied from __tests__/reader.test.ts) — Vault reader pattern
- `evolver.config.json` — `vaultPath: "~/song"` — confirms vault location

### Capability profile patterns
- `src/lib/content/__tests__/__fixtures__/instruments/cascadia/instrument.json` — Cascadia instrument.json shape (template for octatrack's instrument.json)
- `src/lib/content/schemas.ts` (implied from schemas.test.ts) — Zod schemas at content boundary

### Demo mode synthetic journey (Cascadia parity reference)
- `src/lib/synthetic-daily-notes.ts` — Synthetic learner journey generator (template for octatrack's journey)

### Project-level
- `.planning/PROJECT.md` — ADHD constraint (non-negotiable 15-30 min sessions, tangible output, sequence-based), Obsidian source of truth, demo/local split
- `CLAUDE.md` — Guardrails, conventions, and the synth-panel-builder skill note (not needed — panel is done, but informs any panel-data corrections)
- `.planning/REQUIREMENTS.md` — Not directly in scope (v1.3 requirements already mapped to Phases 18-24)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **OctatrackPanel + octatrack-panel-data.ts**: Complete. Panel SVG with CONTROL_METADATA already built (Phase 25 quick task 260416-9hx, commit 9cb345b). Marker integration already in session-detail.
- **Cascadia integration pattern**: Every integration touchpoint (instrument.json schema, panel route, standalone panel route, capability gating, color cascade, nav entries, demo journey, search indexing) has a working Cascadia reference to clone.
- **Content pipeline**: Vault reader, Zod schemas, markdown rendering, bundled-content loader all work for two instruments — adding a third is additive, not restructural.
- **Token architecture**: Phase 24's primitive → semantic → cascade tokens make per-instrument color a matter of adding primitives and a `[data-instrument="octatrack"]` cascade block, not rewriting tokens.
- **Zustand learner state**: No changes needed — it already handles per-instrument completion tracking, prerequisite gating, resume bar.

### Established Patterns
- **Triple-write content pipeline**: `sessions/<slug>/` (working) + `src/content/sessions/<slug>/` (bundled) + `~/song/sessions/<slug>/` (vault). Must match for site + demo + local to all work.
- **Capability-gated rendering**: Conditional on flag presence (`has_sysex`), not instrument name. New flags (`has_sampler`, `has_sequencer`, `has_midi_sequencer`, `has_patch_memory`) follow the same pattern.
- **Panel markers in sessions**: `<div data-{instrument}-panel="control-id[, control-id]"></div>` triggers zoom-on-scroll. Control IDs must match panel-data metadata keys exactly.
- **Per-instrument color cascade**: `[data-instrument="<slug>"]` CSS override block in globals.css, not runtime theme switching.

### Integration Points
- `src/app/instruments/[slug]/panel/page.tsx` — add octatrack branch
- `src/app/instruments/[slug]/panel/standalone-panel-client.tsx:11` — add octatrack branch
- `src/app/globals.css` — add octatrack cascade block (accent, param, surface tints)
- `src/components/nav.tsx` or equivalent — add octatrack nav entry
- Instrument selector / home instrument cards — add octatrack entry
- `src/lib/content/schemas.ts` (capability flag schema) — extend with new sampler flags
- `instruments/octatrack/instrument.json` — new file, Cascadia-shape
- `src/lib/synthetic-daily-notes.ts` — extend with octatrack journey data
- Search indexer — pick up new sessions automatically once in `src/content/sessions/octatrack/`

</code_context>

<specifics>
## Specific Ideas

- **Elektron orange direction**: References the MKI OLED red-orange and Elektron brand orange. Warm pole opposite of Evolver blue / Cascadia steel cool accents. The MKII has a white OLED, but the brand identity is still orange-forward.
- **Sampler profile as new category**: OT is neither a synth (like Evolver) nor semi-modular (like Cascadia). Its capabilities (sampler, sequencer, MIDI sequencer for external gear, no patch dump) deserve distinct flags rather than squashing into an existing profile.
- **"Patches" as project states, not sounds**: OT's patches document project configuration (sample slot list, track machine assignments, pattern map, scene assignments, arranger rows) — fundamentally different from parameter dumps. The README format already reflects this.
- **Focus module bias**: "Ready for the site" means the curriculum's headline value (songwriting/arrangement/live/looping) is deeply supported, while foundational modules are complete but can be authoring-light if needed.
- **Panel markers earn their place**: The OT panel has 30+ controls with non-obvious gestures (FUNC combos, SRC Setup, holding SCENE A/B + TRIG). Markers should appear where the gesture isn't self-evident from text.

</specifics>

<deferred>
## Deferred Ideas

- **Extended patch library (10+ patches beyond the 4 demo projects)** — add to backlog; author naturally as real practice produces documentable project states.
- **UI surfacing of `has_midi_sequencer` capability** — flag exists after Phase 25 but dedicated MIDI sequencer page/widget for Octatrack is a future phase.
- **Video or audio recording integration for Octatrack sessions** — aligned with PROJECT.md active requirement "Audio recording integration," but not scoped to this phase.
- **Retroactive milestone placement** — Phase 25 sits at the tail of v1.3 Visual Redesign despite being content+integration. Acknowledged but not addressed in this phase; handle during milestone audit or new-milestone transition.

</deferred>

---

*Phase: 25-complete-the-octatrack-curriculum-work-so-that-it-is-ready-to-add-to-the-evolver-site-focus-on-song-writing-and-arrangement-and-live-sessions-and-looping*
*Context gathered: 2026-04-16*
