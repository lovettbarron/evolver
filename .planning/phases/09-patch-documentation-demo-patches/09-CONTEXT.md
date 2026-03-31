# Phase 9: Patch Documentation + Demo Patches - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Cascadia patches documented with structured cable routing and knob positions in frontmatter, validated by Zod. Patch detail page renders cable connections as auto-generated Mermaid signal flow diagrams and knob settings grouped by module. Audio preview field in schema (player deferred). 12-16 demo patches covering all sound categories with balanced spread.

</domain>

<decisions>
## Implementation Decisions

### Cable routing schema
- **D-01:** Refine `cable_routing` from `z.unknown().optional()` to a typed array: `z.array(z.object({ source: z.string(), destination: z.string(), purpose: z.string() })).optional()`
- **D-02:** Flat connections array — one entry per physical cable, no grouping by signal type
- **D-03:** Source/destination use human-friendly labels (e.g. "VCO-A Saw Out", "VCF Cutoff CV In"), not machine IDs
- **D-04:** Mermaid signal flow diagrams are auto-generated from `cable_routing` frontmatter on the patch detail page — no hand-written diagrams per patch

### Knob settings format
- **D-05:** Refine `knob_settings` from `z.unknown().optional()` to a typed map: module name as key, array of `{ control: string, value: string }` objects as value
- **D-06:** Mixed value format: clock positions for continuous knobs ("2 o'clock", "full CW"), actual values for switches/toggles ("LP", "ON", "Mid")
- **D-07:** Document key controls that differ from normalled default, with a "rest at default" note per module — not exhaustive listing of every control

### Audio previews
- **D-08:** Add `audio_preview: z.string().optional()` field to PatchSchema — filename reference only (e.g. "sub-bass-01.mp3")
- **D-09:** Audio files expected at `public/audio/cascadia/{filename}` — no files shipped in this phase
- **D-10:** UI shows placeholder text ("Audio preview not yet recorded") when file is missing — no audio player component built in this phase

### Patch content scope
- **D-11:** 12-16 demo patches with balanced category spread: bass (2-3), lead (2-3), pad (2-3), drum (2), texture (2), FX (2)
- **D-12:** PatchSchema `type` enum extended to include `fx` (currently: bass, lead, pad, drum, texture, sequence)
- **D-13:** Demo patches are standalone — `session_origin: null`, no forward-references to curriculum sessions
- **D-14:** Curriculum sessions (Phase 10-11) will reference patches, not the other way around

### Claude's Discretion
- Exact Mermaid graph direction and node styling for auto-generated diagrams
- Patch naming conventions and slug format for Cascadia patches
- How the patch detail page detects instrument type to switch between parameter tables (Evolver) and cable routing + knob settings (Cascadia)
- Whether to add a `notes` or `default_note` field alongside knob settings entries
- Complexity range across demo patches (simple 2-cable patches to complex 6+ cable patches)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase requirements
- `.planning/ROADMAP.md` — Phase 9 success criteria (5 criteria) and requirements CPATCH-01 through CPATCH-06
- `.planning/REQUIREMENTS.md` — Full requirement definitions for CPATCH-01 through CPATCH-06

### Instrument data
- `references/cascadia_manual_v1.1_2023.04.18.pdf` — Cascadia manual (110 pages), source for patch point names and module controls
- `src/content/instruments/cascadia/modules/` — Module docs with control tables and jack names (canonical source for knob_settings control names and cable_routing source/destination labels)
- `src/content/instruments/cascadia/signal-flow.md` — Normalled signal path (defines "default state" that patches diverge from)

### Existing code (integration points)
- `src/lib/content/schemas.ts` — PatchSchema with `cable_routing` and `knob_settings` stubs to refine; `type` enum to extend with `fx`
- `src/lib/content/reader.ts` — Content reader functions; patch reading already works, may need minor updates
- `src/app/instruments/[slug]/patches/[id]/page.tsx` — Patch detail page to extend with Cascadia rendering
- `src/content/patches/evolver/` — Existing Evolver patch format for reference (parameter tables pattern)

### Prior phase context
- `.planning/phases/07-multi-instrument-ui-schema-foundation/07-CONTEXT.md` — PatchSchema stub decisions, `.passthrough()` pattern
- `.planning/phases/08-cascadia-instrument-data/08-CONTEXT.md` — Module doc structure, frontmatter categories, content sourcing approach

### External inspiration
- [baratatronix.com](https://www.baratatronix.com/) — Cascadia patch library with audio previews (referenced in PROJECT.md as documentation format inspiration)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `PatchSchema` in schemas.ts: Already has `cable_routing` and `knob_settings` as `z.unknown().optional()` — refine in place
- `InstrumentConfigSchema`: Has `sysex` and `patch_memory` capability flags — can be used to determine which patch rendering mode to use
- Existing Evolver patch files (16 patches): Established frontmatter pattern and markdown body structure to mirror for Cascadia
- Mermaid rendering pipeline: Already configured in rehype pipeline — auto-generated Mermaid code blocks will render automatically

### Established Patterns
- Zod schema validation at parse boundaries: cable_routing and knob_settings refinement follows this
- Content reader pattern: `listPatches(instrument, config)` already works per-instrument
- Patch detail page: Already renders Evolver patches with parameter tables — needs conditional rendering branch for Cascadia
- `.passthrough()` on PatchSchema: Existing Evolver patches won't break when new fields are added

### Integration Points
- Patch detail page (`src/app/instruments/[slug]/patches/[id]/page.tsx`): Needs to detect instrument type and render cable routing + knob settings instead of parameter tables
- Schema file (`src/lib/content/schemas.ts`): `cable_routing` and `knob_settings` stubs replaced with typed shapes; `type` enum extended
- Content directory: New `src/content/patches/cascadia/` directory with 12-16 markdown files
- Public assets: `public/audio/cascadia/` directory created (empty — placeholder for future recordings)

</code_context>

<specifics>
## Specific Ideas

- Cable routing labels should match the jack names used in the Phase 8 module docs — consistency between module reference and patch documentation
- Clock position notation is the standard way synth players communicate knob positions verbally — "2 o'clock" is universally understood
- "Rest at default" notes per module keep patches readable without being exhaustive — reader can check module docs for what "default" means
- Balanced category spread ensures the patch library demonstrates the full range of Cascadia's capabilities, not just its west coast strengths

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 09-patch-documentation-demo-patches*
*Context gathered: 2026-03-31*
