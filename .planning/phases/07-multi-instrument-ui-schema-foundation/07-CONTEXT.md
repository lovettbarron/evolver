# Phase 7: Multi-Instrument UI + Schema Foundation - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

De-hardcode the UI chrome so both Evolver and Cascadia appear dynamically in navigation, routing, and data schemas. Add per-instrument capability flags to control feature visibility. Extend PatchSchema with stub fields for CV-based instruments. No hardcoded Evolver assumptions remain in UI chrome after this phase.

</domain>

<decisions>
## Implementation Decisions

### Instrument capability config
- Separate `instrument.json` file per instrument directory (not frontmatter, not a new schema type)
- Fields: `display_name` (string), `tagline` (string), `manufacturer` (string), `sysex` (bool), `patch_memory` (bool), `reference_pdfs` (array of {label, file})
- Reader function reads instrument.json from each discovered instrument directory
- Zod schema validates instrument.json at parse time (consistent with existing schema-at-boundary pattern)

### Nav structure
- Instrument switcher in nav: current instrument name acts as dropdown switcher
- Sub-links (Sessions, Patches, MIDI, Progress) scope to selected instrument
- Brand text stays as "evolver" (project name, not instrument name)
- Nav links conditionally hidden based on capability flags (e.g., no MIDI link for instruments with `sysex: false`)
- Switching instruments navigates to that instrument's overview page (`/instruments/{slug}`), not equivalent sub-page
- Demo badge preserved (Phase 6 decision)

### Landing page
- Instrument cards replace the current single-instrument hero
- One card per discovered instrument: display_name, tagline, session count, patch count
- Clicking a card navigates to `/instruments/{slug}` (instrument overview)
- Next session hero card moves to the instrument overview page (not landing)
- Landing page is the instrument selector; instrument overview is the "what to do next" page

### No-SysEx MIDI page
- Generic capability-driven page, not Cascadia-specific
- Reads instrument.json to determine what to show and why
- Includes CTA linking to the instrument's patch library (`/instruments/{slug}/patches`)
- Reusable for any future instrument without SysEx capability

### PatchSchema extension
- Phase 7 adds stub fields: `cable_routing: z.unknown().optional()` and `knob_settings: z.unknown().optional()`
- Proves schema won't break existing Evolver patches (`.passthrough()` already in place, stubs make intent explicit)
- Phase 9 refines stubs into full Zod shapes (CableConnection[], KnobSetting[]) when real Cascadia patches exist

### Claude's Discretion
- Exact instrument switcher dropdown component design (consistent with Ghostly/Domus dark editorial aesthetic)
- How to handle the ~20 hardcoded "evolver" references in source-refs, markdown processor, config defaults
- Instrument card layout details (spacing, typography, hover states)
- Whether to create a new `loadInstrumentConfig()` function or extend existing `discoverInstruments()`

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase requirements
- `.planning/ROADMAP.md` -- Phase 7 success criteria (5 criteria defined)
- `.planning/REQUIREMENTS.md` -- Requirements MULTI-01 through MULTI-04, CASC-04

### Instrument data
- `references/cascadia_manual_v1.1.pdf` -- Cascadia manual, needed for reference PDF wiring (CASC-04)
- `instruments/evolver/` -- Existing instrument data structure to mirror for Cascadia

### Existing code (integration points)
- `src/components/nav.tsx` -- Nav component to refactor (6 hardcoded evolver references)
- `src/app/page.tsx` -- Landing page to replace with instrument selector
- `src/app/instruments/[slug]/page.tsx` -- Instrument overview page (receives hero card)
- `src/app/instruments/[slug]/midi/page.tsx` -- MIDI route (needs capability check)
- `src/lib/content/reader.ts` -- `discoverInstruments()` already works, add instrument.json reader
- `src/lib/content/schemas.ts` -- PatchSchema to extend with stubs

### Prior phase context
- `.planning/phases/02-session-browser/02-CONTEXT.md` -- Dark editorial aesthetic (Ghostly/Domus), Tailwind, minimal nav
- `.planning/phases/06-deployment/06-CONTEXT.md` -- Demo badge, react-pdf viewer, evolver.config.json

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `discoverInstruments()` in reader.ts: Already scans instrument directories, returns string[]. Ready to use for nav and landing page.
- `[slug]` dynamic routes: All instrument pages already use dynamic routing. No route changes needed.
- `HeroCard` component: Can be moved to instrument overview page as-is.
- `loadConfig()` / `ConfigSchema`: Config system exists, needs minor update for multi-instrument awareness.

### Established Patterns
- Zod schemas at parse boundaries: instrument.json should follow this pattern with a new InstrumentConfigSchema.
- `.passthrough()` on schemas: PatchSchema already passes through unknown fields, stubs make intent explicit.
- Server components for file I/O: instrument.json reading should happen server-side like all other content.
- Content reader functions: Pattern is `list{Thing}(instrument, config)` -- new `loadInstrumentConfig(slug, config)` follows this.

### Integration Points
- Nav component: Currently imported in app-shell.tsx. Needs to accept instrument list + current instrument as props (or fetch server-side).
- Landing page: Needs to call `discoverInstruments()` + `loadInstrumentConfig()` for each.
- MIDI route page: Needs to check `sysex` capability flag before rendering MidiPage component.
- Instrument overview page: Receives hero card responsibility, reads reference_pdfs from instrument.json instead of hardcoded array.

### Hardcoded References (~20 total)
- `src/components/nav.tsx` (6): navLinks array, brand label
- `src/app/page.tsx` (2): default instrument, hero card
- `src/app/instruments/[slug]/page.tsx` (1): hardcoded PDF references
- `src/components/midi-page.tsx` (1): basic-patch.sysex.json import
- `src/components/source-ref.tsx` (2): PDF reference mappings
- `src/lib/markdown/processor.ts` (1): embed permalink template
- `src/lib/content/schemas.ts` (1): ConfigSchema default
- `src/lib/config.ts` (1): config filename
- `src/lib/midi/connection.ts` (2): device name detection (OK to leave -- Evolver-specific MIDI code)

</code_context>

<specifics>
## Specific Ideas

- Instrument cards on landing should feel like "mission briefings" -- consistent with the Phase 2 hero card aesthetic
- Nav switcher should be subtle, not a heavy dropdown -- consistent with the minimal editorial style
- The "evolver" brand name stays even with multiple instruments -- it's the project identity
- MIDI connection code in src/lib/midi/ is explicitly Evolver-only and should NOT be abstracted for multi-instrument (Cascadia has no SysEx)

</specifics>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope.

</deferred>

---

*Phase: 07-multi-instrument-ui-schema-foundation*
*Context gathered: 2026-03-31*
