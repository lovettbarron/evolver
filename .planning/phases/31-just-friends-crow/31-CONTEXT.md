# Phase 31: Just Friends + Crow - Context

**Gathered:** 2026-04-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Two Mannequins/Monome modules get standalone curricula and panel SVGs, plus optional combined i2c integration sessions. Deliverables: 11 Just Friends sessions (foundations, Run/Intone, 3 Shape, 3 Cycle, 3 Sound), 5-6 Crow sessions (3 standalone + 2-3 i2c combined with JF), 2 hand-placed panel SVGs (JF 14HP, Crow 2HP), and scraped web documentation as local markdown references.

Requirements: CURR-04, CURR-05, PANEL-05, PANEL-06

</domain>

<decisions>
## Implementation Decisions

### Crow Standalone Scope
- **D-01:** Crow gets 3 standalone sessions: (1) what Crow is, USB connection, Druid REPL; (2) basic input/output scripts (read a knob, send a voltage); (3) ASL slope language for envelopes/LFOs
- **D-02:** Crow is taught as a scripting platform with its own value before introducing i2c. Standalone sessions build the foundation needed to understand what Crow brings to the JF connection

### i2c Combined Sessions
- **D-03:** 2-3 combined i2c sessions live under Crow's namespace (`sessions/crow/04-i2c-*.md` onwards). Crow is the "host" that drives JF — JF's sessions stay purely standalone
- **D-04:** Combined sessions are marked in frontmatter as requiring both modules. They're optional extensions, clearly flagged in the UI as needing JF + Crow
- **D-05:** This puts Crow at 5-6 total sessions (3 standalone + 2-3 combined), aligning with the CURR-05 requirement range of 4-6

### JF Mode Coverage
- **D-06:** Just Friends gets 11 sessions total (stretching slightly beyond the CURR-04 range of 8-10). JF is a deep module with three distinct modes — the extra session is justified
- **D-07:** Session distribution: 1 foundations, 1 dedicated Run/Intone session, 3 Shape mode, 3 Cycle mode, 3 Sound mode. Equal depth across all three modes
- **D-08:** Run jack and Intone get their own dedicated session early in the curriculum. These span all modes and fundamentally change JF's behavior — they deserve focused attention rather than being woven into mode sessions

### Reference Documentation
- **D-09:** Scrape web documentation to local markdown files in `references/`. Mannequins docs from whimsicalraps.com, Crow docs from monome.org. Ensures offline access and stable references
- **D-10:** Download high-res panel photos alongside the scraped docs for hand-placement of panel SVGs

### Panel Approach
- **D-11:** Full interactive panel SVG for both modules, including Crow at 2HP. Consistency across all modules — same tooltips, session annotations, and interactive behavior regardless of size
- **D-12:** JF panel at 14HP with 6-channel layout (6 outputs, trigger/run/intone/fm inputs, time/intone/fm knobs, mode switch)
- **D-13:** Crow panel at 2HP — smallest panel in the project (~6 controls: 2 inputs, 2 outputs, USB indicator)

### Execution Ordering
- **D-14:** Follow Phase 30 pattern: one module end-to-end before starting the next
- **D-15:** Just Friends first (more sessions, more complex panel), then Crow standalone, then i2c combined sessions last (requires both modules to be complete)

### Claude's Discretion
- Specific session topics and titles within the mode/progression constraints above
- Panel SVG control placement coordinates (hand-placed from scraped references and photos)
- Session frontmatter tags, difficulty progression, and warm-up design
- Specific i2c integration exercises and creative patch ideas
- Which web pages to scrape and how to structure the local markdown

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Module Data (already created)
- `modules/just-friends/module.json` — JF config (14HP, Mannequins, categories: vco/modulator/envelope-generator)
- `modules/just-friends/overview.md` — Stub overview to be expanded
- `modules/crow/module.json` — Crow config (2HP, Monome, category: modulator)
- `modules/crow/overview.md` — Stub overview to be expanded

### Reference Documentation (web sources — to be scraped)
- `references/just-friends-manual.txt` — Current placeholder (4 lines). Points to whimsicalraps.com for full docs
- `references/crow-docs.txt` — Current placeholder (5 lines). Points to monome.org for full docs
- Mannequins Just Friends: https://www.whimsicalraps.com/pages/just-friends
- Monome Crow reference: https://monome.org/docs/crow/reference/
- Monome Crow scripting: https://monome.org/docs/crow/scripting/

### Session Template Pattern
- `sessions/evolver/01-foundations-navigation.md` — Reference session format
- `framework/` — Reusable learning methodology

### Panel Design References
- `.claude/skills/synth-panel-builder/SKILL.md` — Panel design principles, control type conventions
- `src/components/maths-panel.tsx` — Recent panel implementation (20HP, similar complexity to JF)
- `src/lib/maths-panel-data.ts` — Recent panel data file pattern

### Data Pipeline
- `src/lib/content/schemas.ts` — SessionSchema, ModuleConfigSchema
- `src/lib/content/reader.ts` — discoverModules(), listSessions()

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- 8 existing panel components (`evolver-panel.tsx`, `cascadia-panel.tsx`, `maths-panel.tsx`, `plaits-panel.tsx`, `beads-panel.tsx`, `swells-panel.tsx`, `ikarie-panel.tsx`, `octatrack-panel.tsx`) — proven patterns for SVG panel rendering
- 8 panel data files in `src/lib/*-panel-data.ts` — control metadata pattern well established
- Triple-write pipeline established — works for module content
- OKLCH color palettes for all 7 modules defined in Phase 27

### Established Patterns
- Session frontmatter: title, session_number, duration, prerequisite, output_type, difficulty, tags, instrument, reference, section, instrument_type
- Panel SVG: hand-placed controls with control IDs matching CONTROL_METADATA, `data-*-panel` markers in sessions
- Module end-to-end: curriculum + panel + overview as a self-contained unit (proven in Phases 29-30)

### Integration Points
- Module pages at `/modules/just-friends/` and `/modules/crow/` already route (Phase 27)
- Session and panel sub-pages exist with "coming soon" placeholders
- `~/song/modules/` vault path for Obsidian integration

</code_context>

<specifics>
## Specific Ideas

- Run/Intone as a dedicated early session — these cross-cutting features fundamentally change JF's behavior across all modes and deserve focused attention
- Crow i2c sessions as the capstone of the Crow curriculum — standalone scripting skills build toward the payoff of controlling JF programmatically
- Crow at 2HP will be the smallest panel in the project — a good test of whether the panel system handles extreme sizes gracefully

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 31-just-friends-crow*
*Context gathered: 2026-04-18*
