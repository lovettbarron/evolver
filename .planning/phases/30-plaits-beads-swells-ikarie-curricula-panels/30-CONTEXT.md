# Phase 30: Plaits, Beads, Swells, Ikarie Curricula + Panels - Context

**Gathered:** 2026-04-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Four additional eurorack modules get complete learning curricula and hand-placed panel SVGs, following the pattern proven by Maths in Phase 29. Deliverables: 25 sessions total (8 Plaits, 6 Beads, 6 Swells, 5 Ikarie), 4 panel SVGs at correct HP widths, and triple-write content pipeline for all module content.

Requirements: CURR-02, CURR-03, CURR-06, CURR-07, PANEL-02, PANEL-04, PANEL-08

</domain>

<decisions>
## Implementation Decisions

### Curriculum Depth Per Module
- **D-01:** Plaits gets 8 sessions using mode-pair structure — each session covers 2 related synthesis modes side-by-side (e.g., VA oscillator + waveshaper, FM + grain formant). All 16 modes covered in 8 sessions
- **D-02:** Beads gets 6 sessions: 1 foundations (controls, buffer, quality), 1 per grain mode (3 sessions: Granular, Delay, Looper), 1 attenurandomizers/modulation, 1 creative patch
- **D-03:** Swells gets 6 sessions: 1 foundations (controls, routing), 3 algorithm-group sessions (plate/hall, shimmer/cloud, modulated/resonant covering all 9 algorithms), 1 Swell Generator deep dive, 1 Freeze/Reverse + performance
- **D-04:** Ikarie gets 5 sessions: 1 foundations (filter modes, stereo routing), 1 dual-peak resonance exploration, 1 envelope follower as modulation source, 1 self-oscillation/feedback, 1 in-context patch (Ikarie in a voice chain)

### Session Sequencing Strategy
- **D-05:** Foundational-first progressive complexity for all modules. Session 1 is always foundations (controls, routing, init state). Build toward advanced techniques. Final session is always a creative patch combining what was learned
- **D-06:** Warm-ups reference only previous sessions within the same module. Each module is self-contained — no cross-module dependencies. Cross-module connections are a Phase 32 concern
- **D-07:** Independent numbering per module. Each module starts at session 01. File paths: `sessions/plaits/01-*.md`, `sessions/beads/01-*.md`, etc. Matches existing instrument pattern

### Panel Reference Sources
- **D-08:** Download proper PDF manuals for Swells and Ikarie before building panels. Current text file references are insufficient for hand-placement
- **D-09:** Use PDFs + product photos for all four modules. Cross-reference manual diagrams with manufacturer product photos for maximum accuracy
- **D-10:** Plaits and Beads already have PDF manuals in `references/`. Mutable Instruments manuals include detailed front plate diagrams

### Execution Ordering
- **D-11:** One module end-to-end before starting the next. Complete curriculum + panel for each module as a self-contained plan
- **D-12:** Module order: Plaits first (most sessions, panel groundwork from Phase 28), then Beads, then Swells, then Ikarie (simplest, 5 sessions, 8HP)
- **D-13:** Each module becomes its own plan: 30-01 Plaits, 30-02 Beads, 30-03 Swells, 30-04 Ikarie

### Claude's Discretion
- Specific synthesis mode pairings for Plaits sessions (which 2 modes per session)
- Algorithm groupings for Swells sessions (which algorithms in which group)
- Session titles and specific exercise design within each session
- Panel SVG control placement coordinates (hand-placed from references)
- Session frontmatter tags and difficulty progression

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Module Manuals (Panel References)
- `references/plaits-manual.pdf` — Mutable Instruments Plaits manual with front plate diagram. 16 synthesis modes across 2 banks
- `references/beads-manual.pdf` — Mutable Instruments Beads manual with front plate diagram. 3 grain modes, quality settings
- `references/swells-manual.txt` — Current text reference (needs PDF replacement before panel work)
- `references/ikarie-manual.txt` — Current text reference (needs PDF replacement before panel work)

### Module Configs (Already Created)
- `modules/plaits/module.json` — 12HP, VCO category, Mutable Instruments
- `modules/beads/module.json` — 14HP, Effects category, Mutable Instruments
- `modules/swells/module.json` — 20HP, Effects category, Intellijel
- `modules/ikarie/module.json` — 8HP, Filter category, Bastl Instruments

### Session Template Pattern
- `sessions/evolver/01-foundations-navigation.md` — Reference session format (frontmatter, warm-up, exercises, output)
- `framework/` — Reusable learning methodology (instrument-agnostic)

### Panel Design References
- `.claude/skills/synth-panel-builder/SKILL.md` — Panel design principles, control type conventions, visual conventions
- `src/components/evolver-panel.tsx` — Reference panel implementation for instruments
- `src/components/cascadia-panel.tsx` — Reference panel implementation with 179 controls

### Data Pipeline
- `src/lib/content/schemas.ts` — SessionSchema with instrument_type field, ModuleConfigSchema
- `src/lib/content/reader.ts` — discoverModules(), listSessions() reader functions

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ModuleConfigSchema` in `src/lib/content/schemas.ts` — validates module.json files
- `discoverModules()` in `src/lib/content/reader.ts` — finds module directories
- Triple-write pipeline established in Phase 26 — works for module content
- Panel components: `evolver-panel.tsx`, `cascadia-panel.tsx`, `octatrack-panel.tsx` — patterns for SVG panel rendering
- Generic `ModulePanel` renderer from Phase 28 — data-driven panel from per-module data files

### Established Patterns
- Session frontmatter: title, session_number, duration (15-30), prerequisite, output_type, difficulty, tags, instrument, reference, section, instrument_type
- Panel SVG: hand-placed controls with control IDs matching `CONTROL_METADATA`, `data-*-panel` markers in sessions
- OKLCH color identity per module already defined in Phase 27 (7 palettes in globals.css)

### Integration Points
- Module pages at `/modules/[slug]/` already route and render (Phase 27)
- Session and panel sub-pages exist but show "coming soon" — these get populated by this phase
- `~/song/modules/` vault path for Obsidian integration

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches following the Maths pattern from Phase 29.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 30-plaits-beads-swells-ikarie-curricula-panels*
*Context gathered: 2026-04-18*
