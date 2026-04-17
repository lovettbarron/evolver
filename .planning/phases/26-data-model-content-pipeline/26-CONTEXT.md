# Phase 26: Data Model + Content Pipeline - Context

**Gathered:** 2026-04-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Module content can be authored, validated, and read by the app. This phase delivers: ModuleConfigSchema, `discoverModules()` reader, the `module`→`section` rename across 95 sessions, `instrument_type` field for distinguishing module vs instrument sessions, triple-write pipeline for module content, and downloading 7 module reference manuals.

</domain>

<decisions>
## Implementation Decisions

### Module Config Shape
- **D-01:** ModuleConfigSchema includes essential fields + power specs: `display_name`, `tagline`, `manufacturer`, `hp_width`, `categories[]`, `reference_pdfs[]`, plus `power_specs` object (+12V/-12V mA draw)
- **D-02:** ModuleConfigSchema is independent of InstrumentConfigSchema — share rendering components, not schemas (carried from v2.0 research)
- **D-03:** No `init_state` field in module.json — init state is curriculum content (lives in overview.md or sessions), not hardware metadata

### Content Directory Layout
- **D-04:** Module directories live at top-level `modules/<slug>/` parallel to `instruments/<slug>/` — clean separation, matches /modules route in Phase 27
- **D-05:** Each module directory contains `module.json` (config) and `overview.md` (architecture, controls reference) — additional docs added per-module as curriculum needs emerge
- **D-06:** Triple-write pipeline mirrors all three locations: working tree `modules/<slug>/`, `src/content/modules/<slug>/`, and `~/song/modules/<slug>/` — consistent with instrument pattern

### Category Taxonomy
- **D-07:** Categories are a fixed Zod enum — catches typos at validation, easy to extend by adding values
- **D-08:** Initial enum values follow functional roles: `vco`, `filter`, `effects`, `modulator`, `function-generator`, `envelope-generator`
- **D-09:** Module category assignments: Maths = [function-generator, envelope-generator, modulator], Plaits = [vco], Beads = [effects], Swells = [effects], Ikarie = [filter], Just Friends = [vco, modulator, envelope-generator], Crow = [modulator]

### Session File Paths
- **D-10:** Module sessions live at `sessions/<module-slug>/` — same pattern as instruments, works with existing `listSessions()` reader
- **D-11:** `instrument_type` field added to SessionSchema: `'instrument'` (default) or `'eurorack_module'` — reader can filter by type
- **D-12:** The `module`→`section` rename AND `instrument_type: instrument` addition happen in a single batch migration across all 95 existing sessions (combined operation, one migration pass)

### Carried from v2.0 Research
- Just Friends and Crow are separate modules with separate configs/panels
- Generic ModulePanel renderer + per-module data files (Phase 28 concern, not this phase)

### Claude's Discretion
- Exact field names and Zod schema structure for power_specs (e.g., object vs nested fields)
- Migration script approach for the 95-session rename + type addition
- `discoverModules()` implementation details (parallel to `discoverInstruments()`)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Schemas and Readers
- `src/lib/content/schemas.ts` — Current InstrumentConfigSchema, SessionSchema (module field on line 6), PatchSchema, InstrumentFileSchema
- `src/lib/content/reader.ts` — discoverInstruments(), listSessions(), listModules(), readContentFile() patterns
- `src/lib/content/writer.ts` — saveCapturedPatch() for write pipeline pattern
- `src/lib/config.ts` — loadConfig() and vault path resolution

### Existing Content Structure
- `src/content/instruments/evolver/instrument.json` — Reference instrument.json format
- `instruments/evolver/` — Reference instrument directory structure (overview.md, modules.md, signal-flow.md)
- `evolver.config.json` — vaultPath configuration

### Project Docs
- `.planning/REQUIREMENTS.md` — DATA-01 through DATA-06 requirements
- `.planning/PROJECT.md` — Constraints, key decisions, instrument list

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `discoverInstruments()` in reader.ts — Direct pattern to parallel for `discoverModules()`
- `InstrumentConfigSchema` in schemas.ts — Reference for ModuleConfigSchema structure (same style: Zod object with .passthrough())
- `readContentFile()` — Generic schema-validated file reader, works for any Zod schema
- `loadInstrumentConfig()` — Pattern for `loadModuleConfig()`

### Established Patterns
- Zod schemas with `.passthrough()` for forward compatibility
- gray-matter for frontmatter extraction
- glob-based file discovery
- Config-driven content root (vault path or bundled src/content/)

### Integration Points
- `SessionSchema.module` (line 6 of schemas.ts) — rename to `section`, add `instrument_type` field
- `listSessions()` — may need optional type filter parameter
- Content root resolution in `getContentRoot()` — modules/ directory must exist in both vault and bundled paths
- Triple-write: working tree, `src/content/modules/`, `~/song/modules/`

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches following existing patterns.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 26-data-model-content-pipeline*
*Context gathered: 2026-04-17*
