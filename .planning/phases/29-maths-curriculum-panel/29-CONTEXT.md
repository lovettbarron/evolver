# Phase 29: Maths Curriculum + Panel - Context

**Gathered:** 2026-04-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Users can learn Make Noise Maths through a complete 10-12 session curriculum with a full overview page and panel data file. This phase delivers: Maths curriculum sessions (15-30 min, ADHD-friendly), a detailed overview page (architecture, controls reference, init state), a panel data file for the generic ModulePanel renderer (Phase 28), and downloading the actual Maths manual PDF. The most complex module proves the curriculum framework handles the hardest case.

</domain>

<decisions>
## Implementation Decisions

### Curriculum Progression
- **D-01:** First session focuses on Rise/Fall as a basic attack-decay envelope — most intuitive use case, immediate musical result (shape a VCA or filter)
- **D-02:** Teach on Channel 1 first, introduce Channel 4's unique features (EOC/EOR) as a later progression — reduces cognitive load
- **D-03:** Audio-rate Maths gets an early taste (session 3-4, "listen to this!") with a full deep dive later (session 9-10)
- **D-04:** 1-2 integration sessions at the end of the curriculum patching Maths into other owned modules (Cascadia, Plaits, Ikarie) — shows real-world use after mastering Maths standalone

### Overview Page Content
- **D-05:** Full overview matching the instrument pattern — architecture description (4 channels, OR/SUM/INV, EOC/EOR), complete controls reference table, and recommended init state
- **D-06:** Define a "basic patch" init state — specific knob positions producing a known result (e.g., Ch1 as simple envelope, everything else zeroed). All sessions start from here

### Panel Approach
- **D-07:** Create a Maths panel data file (controls, positions, types) for the generic ModulePanel renderer from Phase 28. Panel won't render until Phase 28 ships, but data is ready
- **D-08:** Channel-based control IDs — e.g., `knob-ch1-rise`, `knob-ch1-fall`, `jack-ch1-trig`, `jack-or` — matches how Maths users think about the module

### Manual & References
- **D-09:** Download the actual Maths manual PDF before curriculum work begins — essential for accurate content and panel hand-placement
- **D-10:** Reference the official manual plus well-known community guides (e.g., "Maths Illustrated Supplement", Make Noise patch guides) — more pedagogical than the manual alone

### Claude's Discretion
- Exact session topics and titles for the 10-12 sessions (within the progression constraints above)
- Controls reference table format and detail level
- Specific "basic patch" knob positions for the init state
- Panel data file format (must be compatible with whatever Phase 28 defines)
- Which community guides to reference alongside the official manual

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Module Data (already created)
- `modules/maths/module.json` — Maths config (20HP, Make Noise, categories, power specs)
- `modules/maths/overview.md` — Stub overview to be expanded with full architecture + controls reference

### Maths Manual
- `references/maths-manual.txt` — Placeholder only (4 lines). Actual PDF must be downloaded as first task
- Make Noise website (https://www.makenoisemusic.com/modules/maths) — Download source for the manual PDF

### Existing Session Patterns
- `sessions/evolver/01-foundations-navigation.md` — Reference session format (frontmatter, warm-up, exercises, panel annotations)
- `sessions/cascadia/01-foundations-orientation-first-sound.md` — Alternative session format reference

### Existing Panel Components
- `src/components/evolver-panel.tsx` — Reference for panel control types and rendering patterns
- `src/components/cascadia-panel.tsx` — Reference for panel with many controls and cable rendering

### Panel Design Principles
- `CLAUDE.md` §Panel SVG Design Principles — Reference-first hand-placement rules, control type conventions, visual standards

### Content Pipeline
- `src/lib/content/schemas.ts` — SessionSchema with `instrument_type` field, ModuleConfigSchema
- `src/lib/content/reader.ts` — discoverModules(), listSessions() patterns
- `src/content/modules/maths/` — Mirror location for triple-write pipeline

### Phase Dependencies
- Phase 28 (Panel System + First Panel) — Generic ModulePanel renderer this phase's data file targets. PANEL-01, PANEL-09, PANEL-10 defined there

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `modules/maths/module.json` — Module config already validated and in place
- `src/app/modules/[slug]/panel/page.tsx` — Panel page exists with "coming soon" placeholder, ready to be wired up once Phase 28 ships
- `src/app/modules/[slug]/` — Full module route structure with Overview/Sessions/Patches/Panel tabs (Phase 27)
- Session frontmatter schema supports `instrument_type: eurorack_module` and `section` field

### Established Patterns
- Triple-write: working tree + `src/content/` + `~/song/` for all content
- Session format: YAML frontmatter → warm-up → exercises → panel annotations via `data-*-panel` markers
- Panel data: control metadata objects with type, position, label, and section grouping

### Integration Points
- Sessions render at `/modules/maths/sessions/` via existing module route
- Overview renders at `/modules/maths/` via existing module route
- Panel data consumed by future generic ModulePanel component (Phase 28)

</code_context>

<specifics>
## Specific Ideas

- Early audio-rate "taste" session — brief exposure to Maths as an oscillator in session 3-4 ("listen to this!") before the full deep dive in sessions 9-10. Keeps engagement high with an unexpected capability
- Cross-module integration sessions at the end patch Maths into Cascadia, Plaits, or Ikarie — grounding the abstract in real music-making
- "Basic patch" init state serves the same role as the Evolver's basic patch — a reliable home base for every session

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 29-maths-curriculum-panel*
*Context gathered: 2026-04-18*
