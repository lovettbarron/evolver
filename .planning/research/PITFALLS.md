# Pitfalls Research: v1.1 Cascadia Multi-Instrument Support

**Domain:** Adding a second instrument (Intellijel Cascadia) to an existing single-instrument learning platform
**Researched:** 2026-03-30
**Confidence:** HIGH (based on direct codebase audit of 98 files with Evolver/SysEx references, schema analysis, and component inspection)

## Critical Pitfalls

### Pitfall 1: Hardcoded Evolver References in Navigation and UI Chrome

**What goes wrong:**
The nav component (`src/components/nav.tsx`) hardcodes all links to `/instruments/evolver/*` and displays "evolver" as the app title. The send-panel success message reads "Patch loaded on Evolver". The confirm dialog title reads "Send Patch to Evolver". Adding Cascadia without touching these means the nav only shows Evolver links, the brand text is instrument-specific, and UI copy references the wrong instrument.

**Why it happens:**
v1.0 was explicitly single-instrument. Hardcoding was the correct decision then -- it avoided premature abstraction. But these assumptions are now load-bearing in the nav, the home page (`config.instrument || 'evolver'`), the instrument overview page (hardcoded `references` array for Evolver PDFs), and multiple component strings.

**How to avoid:**
1. Make `Nav` dynamically build links from `discoverInstruments()` results passed as props
2. Replace hardcoded "evolver" branding with the active instrument name or a generic app name
3. Audit all string literals containing "Evolver" in components -- there are at least 4 files with hardcoded instrument text (`nav.tsx`, `send-panel.tsx`, `app/instruments/[slug]/page.tsx`, `config.ts`)
4. The instrument overview page hardcodes `references` for Evolver PDFs -- this must become data-driven (from frontmatter or a per-instrument config)

**Warning signs:**
- `grep -r "evolver" src/components/` returns hits in non-content files
- Nav links don't change when navigating to `/instruments/cascadia`
- Instrument overview shows Evolver reference PDFs when viewing Cascadia

**Phase to address:**
Phase 1 (UI abstraction) -- must happen before any Cascadia content is added, otherwise the app is visually broken for the second instrument.

---

### Pitfall 2: PatchSchema Assumes SysEx-Based Workflow

**What goes wrong:**
The `PatchSchema` in `schemas.ts` includes `source: z.enum(['manual', 'sysex'])`, `capture_date`, and `program_number` fields. The content reader (`reader.ts`) looks for `.sysex.json` sidecar files for every patch. The patch writer (`writer.ts`) always creates a `.sysex.json` sidecar with `raw_byte_count: 192` and Evolver-specific sequencer fields (`seq1_steps` through `seq4_steps`). Cascadia is CV-only with no SysEx, no program numbers, and no patch memory. Patches are documented as cable routing descriptions, not parameter dumps.

**Why it happens:**
The SysEx integration was a v1.0 feature built specifically for the Evolver. The `CapturedPatchInput` interface in `writer.ts` requires `parameters: Record<string, number>` and `sequencer` with four 16-step tracks -- these are Evolver-specific data structures. The `ParsedPatch` type (`types.ts`) assumes 128 program parameters and a 4-track sequencer. None of this maps to Cascadia.

**How to avoid:**
1. The existing `PatchSchema` uses `.passthrough()` -- this is the escape hatch. Cascadia patches can include extra frontmatter fields (like `patch_connections`, `module_settings`) without breaking validation. Do NOT try to force Cascadia patch data into the existing parameter/sequencer structure.
2. Make `source` optional or add a `'documented'` variant for manually documented patches without SysEx origin.
3. The `.sysex.json` sidecar pattern should be treated as Evolver-specific. The reader already handles missing sidecar files gracefully (`sysexData: null`). Cascadia patches simply won't have sidecars.
4. Do NOT create a unified "instrument patch data format" that tries to represent both SysEx dumps and cable routings -- they are fundamentally different. Keep them as separate optional data structures.

**Warning signs:**
- Attempting to define a Cascadia `parameters.ts` file that mirrors the Evolver's 128-parameter structure
- Creating `.sysex.json` files for Cascadia patches
- Patch detail UI crashes when `sysexData` is null and a component assumes it exists

**Phase to address:**
Phase 1 (schema evolution) -- extend schemas before creating Cascadia content, otherwise content creation is blocked by validation errors.

---

### Pitfall 3: MIDI Workspace Renders Broken UI for Non-SysEx Instruments

**What goes wrong:**
The MIDI page (`midi/page.tsx`) renders for any instrument slug, but the entire page is Evolver-specific: it imports `basic-patch.sysex.json` from the Evolver content directory, uses `findEvolverPorts()` for MIDI auto-detection, and all four panels (Connection, Capture, Send, Compare) assume SysEx communication. Navigating to `/instruments/cascadia/midi` shows a page that looks functional but does nothing useful -- the capture button sends Evolver SysEx requests, the send panel filters for `.sysex.json` sidecars that Cascadia patches don't have, and the diff view references Evolver parameters.

**Why it happens:**
The `MidiPage` component directly imports Evolver-specific modules (`@/content/instruments/evolver/basic-patch.sysex.json`) and uses Evolver-specific MIDI functions. There's no instrument capability system that would tell the UI "this instrument doesn't support SysEx."

**How to avoid:**
1. Add an instrument capability model: each instrument declares what it supports (e.g., `{ sysex: boolean, midi: boolean, cv: boolean }`). This can live in the instrument's `overview.md` frontmatter or a separate config file.
2. For Cascadia: hide the MIDI workspace entirely, or replace it with a CV reference page (patch point documentation, voltage ranges).
3. Do NOT try to make the MIDI workspace "work" for CV instruments by mapping CV concepts to SysEx metaphors -- they are different paradigms.
4. The nav link "MIDI" should conditionally appear based on instrument capabilities.

**Warning signs:**
- `/instruments/cascadia/midi` is accessible and shows Connection/Capture/Send panels
- Tests for MIDI page pass because they use Evolver mocks and never test non-SysEx instruments
- Users reach a broken MIDI page via nav and think the app is bugged

**Phase to address:**
Phase 2 (instrument capability system) -- after schema work, before Cascadia content goes live.

---

### Pitfall 4: Config Defaults to Evolver, Breaking Multi-Instrument Discovery

**What goes wrong:**
The `ConfigSchema` defaults `instrument` to `'evolver'`. The home page uses `config.instrument || 'evolver'` to determine which sessions to show. The config file is named `evolver.config.json`. This means:
- The app always boots to the Evolver view
- There's no concept of browsing multiple instruments from the home page
- The config filename itself is instrument-specific

**Why it happens:**
The config was designed for a single-instrument app. The `instrument` field was a forward-looking concession but the implementation treats it as "the one instrument."

**How to avoid:**
1. Home page should show an instrument picker when multiple instruments exist (use `discoverInstruments()`)
2. Rename config file to something generic (`instruments.config.json` or `app.config.json`) -- or better, keep `evolver.config.json` but document that it's the app config, not instrument-specific
3. Remove the default `instrument: 'evolver'` from ConfigSchema, or make it `instrument: z.string().optional()` and have the home page handle the no-default case by showing all instruments
4. The `discoverInstruments()` function already exists in `reader.ts` and works correctly -- it scans for subdirectories. The infrastructure is there, just not wired to the UI.

**Warning signs:**
- Home page always shows Evolver sessions even after Cascadia content is added
- No way to navigate to Cascadia without typing the URL manually
- Config schema still defaults to `'evolver'`

**Phase to address:**
Phase 1 (routing/navigation) -- must be addressed alongside nav changes.

---

### Pitfall 5: Cascadia Patch Documentation Format Mismatch

**What goes wrong:**
Evolver patches are documented as parameter tables (Osc 1 Shape: Saw, Filter Freq: 45, etc.) because the Evolver has numbered parameters that can be entered via front-panel controls. Cascadia patches must be documented as cable routings (e.g., "VCO 1 Saw -> VCF Input, LFO 1 Triangle -> VCF Cutoff CV") because the instrument is semi-modular with 100+ patch points. Trying to use the same markdown format produces documentation that doesn't help the user actually recreate the patch.

**Why it happens:**
The Evolver patch documentation format was designed around the question "what values do I enter?" The Cascadia patch documentation must answer "what cables do I plug in and what knob positions do I set?" These are fundamentally different instructional paradigms. The existing patch markdown template (parameter tables with Value columns) doesn't have a way to represent patch cable connections.

**How to avoid:**
1. Define a Cascadia-specific patch documentation template that includes: cable connections (from -> to), module knob positions (with visual/descriptive values, not MIDI numbers), and audio signal flow description
2. Use the [baratatronix.com](https://www.baratatronix.com/) patch library format as reference -- it documents Cascadia patches with connection lists and audio previews
3. The `PatchSchema` already uses `.passthrough()`, so extra frontmatter fields won't break validation. Add Cascadia-specific frontmatter like `connections: [{from: "VCO1 Saw Out", to: "VCF Audio In"}]` alongside the universal fields
4. The patch detail component (`patch-detail.tsx`) renders markdown HTML -- this is format-agnostic. The different documentation structure lives in the markdown body, not the schema. This is actually safe.
5. Do NOT try to normalize Cascadia cable routings into the Evolver parameter table format

**Warning signs:**
- Cascadia patch files look like Evolver patches with different parameter names
- No mention of cable connections in Cascadia patch documentation
- Patch detail page looks empty because Cascadia patches lack parameter tables

**Phase to address:**
Phase 3 (content creation) -- but the documentation template should be designed in Phase 1 alongside schema work.

---

### Pitfall 6: Curriculum Pacing Assumes Preset-Based Workflow

**What goes wrong:**
The Evolver curriculum is structured around progressive parameter exploration: Session 1 navigates programs, Session 3 explores oscillator waveshapes, Session 11 introduces filters. Each session says "set parameter X to value Y" and produces a saved patch. Cascadia sessions can't follow this pattern because:
- There are no programs to navigate (no patch memory)
- You can't "set parameter X to value Y" -- you patch cables and turn knobs with visual/tactile feedback
- Sessions must include setup time for cable patching that Evolver sessions don't need
- The ADHD "zero activation energy" principle is harder with semi-modular: you need cables, you need to build from scratch each time

**Why it happens:**
The 35-session Evolver curriculum was designed for a specific learning modality: menu-based parameter entry on a fixed-architecture synth. Cascadia's learning modality is exploratory patching on a modular architecture. The session template assumes `output_type: 'patch'` means "save a preset" but for Cascadia it means "document a cable configuration."

**How to avoid:**
1. Design Cascadia sessions around "patch recipes" not "parameter entry" -- each session provides a cable routing to follow, then encourages variations
2. Respect that Cascadia sessions need different time allocations: 5 min setup (finding cables, understanding the starting patch point), 15 min exploration, 5 min documentation
3. Start with fewer sessions: 15-20 instead of 35. Semi-modular has a steeper initial learning curve but faster skill compounding. The modules are the curriculum -- VCO, VCF, VCA, LFO, ENV, then combined
4. The `duration: z.number().int().min(5).max(30)` constraint still works -- Cascadia sessions fit in 15-30 minutes
5. Session output types need a new option or reinterpretation: `output_type: 'patch'` for Cascadia means "documented cable routing + photo" not "saved preset"
6. Consider adding `output_type: 'routing'` to the enum for clarity

**Warning signs:**
- Cascadia sessions read like Evolver sessions with different parameter names
- Sessions say "save your patch" but Cascadia has no save function
- No mention of cable connections in session exercises
- Session count matches Evolver (35) without pedagogical justification

**Phase to address:**
Phase 3 (content creation) -- but the session template and `output_type` enum should be updated in Phase 1.

---

### Pitfall 7: Entire `src/lib/midi/` Directory is Evolver-Specific

**What goes wrong:**
The MIDI library (`connection.ts`, `sysex.ts`, `parser.ts`, `encoder.ts`, `parameters.ts`, `types.ts`, `diff.ts`) is 100% Evolver-specific. Every function, constant, and type assumes the Evolver's SysEx protocol. The function is literally named `findEvolverPorts()`. The parameter map is the Evolver's 128 parameters. The SysEx validation checks for DSI manufacturer ID `0x01` and Evolver device ID `0x20`. This entire directory cannot be reused for Cascadia and should not be refactored to accommodate it.

**Why it happens:**
This is correct engineering for v1.0 -- the MIDI library does exactly what it should for one instrument. The pitfall is attempting to "generalize" it. Abstracting SysEx protocol handling into an instrument-agnostic framework is unnecessary complexity when only one instrument uses SysEx.

**How to avoid:**
1. Leave `src/lib/midi/` exactly as it is. It works for Evolver. Don't touch it.
2. Do NOT create an abstract `InstrumentProtocol` interface that the Evolver and Cascadia both implement -- Cascadia has no digital protocol to implement
3. If a future instrument needs SysEx (e.g., a Moog or another DSI synth), create `src/lib/midi/instruments/evolver.ts` and `src/lib/midi/instruments/[other].ts` at that point -- not now
4. The MIDI page visibility is the only thing that needs to change: hide it for instruments that don't support SysEx (see Pitfall 3)

**Warning signs:**
- Creating abstract MIDI/protocol interfaces "for future extensibility"
- Renaming `findEvolverPorts` to `findInstrumentPorts` and adding instrument-switching logic
- Spending more than 0 hours modifying `src/lib/midi/` for Cascadia support

**Phase to address:**
No phase -- this is an anti-pitfall. The correct action is to NOT refactor the MIDI library.

---

## Moderate Pitfalls

### Pitfall 8: Test Fixtures Assume Evolver Content Structure

**What goes wrong:**
Test fixtures in `src/lib/content/__tests__/__fixtures__/` contain Evolver-specific content (sessions with `instrument: 'evolver'`, patches with Evolver parameters, instrument files for Evolver). The schema tests all use `instrument: 'evolver'` in their test data. The MIDI tests (`connection.test.ts`, `parser.test.ts`, `diff.test.ts`) test Evolver SysEx protocol. Adding Cascadia doesn't break these tests -- but it also means zero test coverage for Cascadia content paths.

**Why it happens:**
Tests were written for the only instrument that existed. They pass, so there's no signal that Cascadia needs its own test fixtures.

**How to avoid:**
1. Add Cascadia test fixtures: at minimum, a session with `instrument: 'cascadia'`, a patch without sysex data, and an instrument overview
2. Test that `listPatches('cascadia', config)` returns patches with `sysexData: null` correctly
3. Test that `discoverInstruments()` returns both `['cascadia', 'evolver']`
4. Do NOT modify existing Evolver tests -- they verify Evolver behavior and should continue to do so
5. Schema tests should add cases with `instrument: 'cascadia'` to verify passthrough fields work for Cascadia-specific frontmatter

**Warning signs:**
- `npm test` passes with 100% success but no test mentions "cascadia"
- Cascadia content is added but never validated by automated tests
- A schema change breaks Cascadia content silently because no test catches it

**Phase to address:**
Phase 2 (test infrastructure) -- add Cascadia fixtures before content creation begins.

---

### Pitfall 9: Demo Mode Needs Cascadia Synthetic Data

**What goes wrong:**
Demo mode uses bundled content from `src/content/`. For Cascadia to appear in demo mode, there must be content at `src/content/instruments/cascadia/`, `src/content/sessions/cascadia/`, and `src/content/patches/cascadia/`. If Cascadia content only exists in the Obsidian vault (local mode), the demo deployment on Vercel shows only Evolver -- making the multi-instrument feature invisible to anyone visiting the demo.

**Why it happens:**
Demo mode is content-driven via filesystem discovery (`discoverInstruments()` scans directories). No Cascadia directory = no Cascadia in demo mode. Developers working locally with vault content may not notice the demo mode gap.

**How to avoid:**
1. Create bundled Cascadia demo content alongside real content: at minimum 3-5 sessions, 3-5 patches, and the instrument overview files
2. Verify demo mode shows both instruments before considering the milestone done
3. The synthetic data for Cascadia should include example cable routing documentation (not just repurposed Evolver parameter tables)

**Warning signs:**
- Demo deployment only shows Evolver in the nav/instrument picker
- `src/content/instruments/` only contains `evolver/` directory
- Cascadia content exists only in the Obsidian vault

**Phase to address:**
Phase 4 (demo data + deployment verification) -- after content is created.

---

### Pitfall 10: InstrumentFileSchema Type Enum is Too Narrow

**What goes wrong:**
`InstrumentFileSchema` restricts `type` to `['overview', 'signal-flow', 'basic-patch', 'modules']`. Cascadia may need additional types: `'patch-points'` (listing all 100+ I/O jacks), `'normalled-connections'` (internal routings when no cable is plugged in), `'voltage-specs'` (CV ranges for each input). These files fail schema validation.

**Why it happens:**
The four types map directly to the Evolver's documentation structure. Cascadia has a different documentation taxonomy because semi-modular instruments need different reference material.

**How to avoid:**
1. Expand the `type` enum to include Cascadia-relevant types: at minimum add `'patch-points'` and `'normalled-connections'`
2. Alternatively, use `.passthrough()` more aggressively and make `type` a `z.string()` instead of a strict enum -- the enum doesn't provide much safety since these are author-controlled content files, not user input
3. Consider making the enum extensible per-instrument rather than global

**Warning signs:**
- Cascadia instrument documentation uses `type: 'overview'` for everything because the other types don't fit
- Schema validation errors when creating Cascadia instrument files with new type values

**Phase to address:**
Phase 1 (schema evolution) -- must be resolved before Cascadia instrument content is created.

---

### Pitfall 11: Instrument Overview Hardcodes "10 modules" Text

**What goes wrong:**
The `InstrumentOverview` component (`instrument-overview.tsx` line 85) displays `"{sessionCount} sessions across 10 modules"`. The Evolver curriculum has 10 modules. Cascadia will have a different number of modules. This text will be factually wrong for any non-Evolver instrument.

**Why it happens:**
Hardcoded string that was true for the only instrument. Easy to miss in a UI review because it looks correct when viewing Evolver content.

**How to avoid:**
1. Compute module count from session data: `new Set(sessions.map(s => s.data.module)).size`
2. Pass module count as a prop to `InstrumentOverview` alongside `sessionCount`
3. Or remove the "across N modules" text entirely -- it adds minimal value

**Warning signs:**
- Cascadia overview page says "15 sessions across 10 modules" when Cascadia has 6 modules
- Any hardcoded number in a component that should be data-driven

**Phase to address:**
Phase 1 (UI abstraction) -- quick fix, include in the nav/chrome cleanup pass.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Keep MIDI library Evolver-only | Zero refactoring effort, no regression risk | Third instrument with SysEx requires restructuring | Always -- abstract when needed, not before |
| Cascadia patches without `.sysex.json` sidecars | Clean separation, no fake data | Two different patch data patterns to maintain | Always -- these are genuinely different data models |
| Hardcoded `evolver.config.json` filename | No migration needed for existing users | Confusing when the app supports multiple instruments | Until v1.2 -- rename when adding a third instrument |
| Fewer Cascadia sessions (15-20 vs 35) | Faster delivery, honest scope | Users may want deeper Cascadia curriculum later | For v1.1 -- validate the framework first, expand content in v1.2 |
| Using `passthrough()` for Cascadia-specific fields | No schema migration, backward compatible | Type safety is weaker for instrument-specific fields | For v1.1 -- formalize discriminated union schemas in v1.2 if needed |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Content reader + Cascadia patches | Assuming every patch has `sysexData` in components/templates | Always check `sysexData !== null` before rendering SysEx-related UI (reader already returns null, components must handle it) |
| Instrument discovery + Nav | Building nav links before `discoverInstruments()` returns | Pass discovered instruments as props to Nav, or use a layout-level data fetch |
| Patch writer + non-SysEx patches | Using `saveCapturedPatch()` for Cascadia patches | Create a separate `saveDocumentedPatch()` function that doesn't require `parameters` or `sequencer` fields |
| Progress tracking + Cascadia | Assuming progress = "patches with sysex captures" | Progress for Cascadia = sessions completed + patches documented (as markdown, not as SysEx captures) |
| Demo mode + instrument discovery | Forgetting to add Cascadia to `src/content/instruments/` | Run `discoverInstruments()` in demo mode and verify both instruments appear before deploying |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Showing MIDI workspace for Cascadia | User sees Connection/Capture/Send panels that do nothing for their instrument | Hide MIDI nav link for instruments without SysEx; show CV reference page instead |
| Same session format for both instruments | Cascadia sessions feel like translated Evolver sessions, not native to the instrument | Design Cascadia sessions around cable patching: "Connect VCO Saw to VCF, patch LFO to Cutoff" |
| Parameter table UI for Cascadia patches | Shows empty parameter table or irrelevant fields | Render cable routing list for Cascadia; keep parameter table for Evolver |
| "Save your patch" language in Cascadia sessions | User can't save patches on Cascadia -- creates confusion | Use "Document your patch" or "Photograph your patch" for Cascadia |
| Single instrument default on home page | Cascadia users always land on Evolver content | Show instrument picker when multiple instruments exist |

## "Looks Done But Isn't" Checklist

- [ ] **Navigation:** All instrument nav links are dynamic, not hardcoded to Evolver
- [ ] **Home page:** Shows instrument picker or respects active instrument, not hardcoded to Evolver
- [ ] **Instrument overview:** Module count is computed, not "10 modules"
- [ ] **Instrument overview:** References/PDFs are per-instrument, not hardcoded Evolver manuals
- [ ] **MIDI page:** Hidden or replaced for instruments without SysEx capability
- [ ] **Patch detail:** Renders correctly when `sysexData` is null (no parameter table, no diff option)
- [ ] **Send panel:** Success text says instrument name, not "Evolver"
- [ ] **Schema:** `InstrumentFileSchema.type` enum includes Cascadia-relevant types
- [ ] **Schema:** `PatchSchema.source` handles non-SysEx patches
- [ ] **Demo mode:** `src/content/instruments/cascadia/` exists with overview, signal-flow, and at least basic content
- [ ] **Demo mode:** `src/content/sessions/cascadia/` has 3+ sessions
- [ ] **Demo mode:** `src/content/patches/cascadia/` has 3+ patches with cable routing documentation
- [ ] **Tests:** At least one test uses `instrument: 'cascadia'` fixtures
- [ ] **Tests:** `discoverInstruments()` returns both instruments in test environment
- [ ] **Config:** Home page works without `instrument` default or handles multi-instrument gracefully
- [ ] **Session output_type:** Accommodates Cascadia's "documented routing" output type

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Hardcoded nav/UI strings | LOW | Find-and-replace "evolver"/"Evolver" in component files, make dynamic |
| Schema too narrow for Cascadia content | LOW | Extend enums, add optional fields -- `.passthrough()` prevents breaking changes |
| MIDI page renders for Cascadia | LOW | Add instrument capability check, conditionally render or redirect |
| Curriculum uses Evolver pedagogy for Cascadia | MEDIUM | Rewrite affected sessions -- content rewrite, not code change |
| Premature MIDI library abstraction | HIGH | Undo abstraction, restore Evolver-specific code, write new tests -- this is why the recommendation is "don't do it" |
| Demo mode missing Cascadia content | LOW | Create 3-5 demo sessions/patches, add instrument files -- just content creation |
| Config defaults break multi-instrument | LOW | Remove default, add instrument picker to home page |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Hardcoded Evolver nav/UI (P1) | Phase 1: UI Abstraction | `grep -r "evolver" src/components/` returns zero non-content hits |
| PatchSchema SysEx coupling (P2) | Phase 1: Schema Evolution | Cascadia patch frontmatter validates without SysEx fields |
| MIDI page for non-SysEx instruments (P3) | Phase 2: Instrument Capabilities | `/instruments/cascadia/midi` returns 404 or capability-appropriate page |
| Config defaults to Evolver (P4) | Phase 1: Routing/Navigation | Home page shows instrument picker with 2+ instruments |
| Patch documentation format (P5) | Phase 1: Template Design + Phase 3: Content | Cascadia patches include cable routing documentation |
| Curriculum pacing (P6) | Phase 3: Content Creation | Cascadia sessions reference cable connections, not menu navigation |
| MIDI library over-abstraction (P7) | No phase (anti-pitfall) | `src/lib/midi/` is unchanged from v1.0 |
| Test fixtures Evolver-only (P8) | Phase 2: Test Infrastructure | Test suite includes `instrument: 'cascadia'` assertions |
| Demo mode missing Cascadia (P9) | Phase 4: Demo Data | `discoverInstruments()` returns `['cascadia', 'evolver']` in demo mode |
| InstrumentFileSchema too narrow (P10) | Phase 1: Schema Evolution | Cascadia instrument files use appropriate type values without validation errors |
| Hardcoded "10 modules" (P11) | Phase 1: UI Abstraction | Module count is computed from session data |

## Sources

- Direct codebase audit: `src/components/nav.tsx` (hardcoded links), `src/lib/content/schemas.ts` (schema definitions), `src/lib/midi/` (entire directory), `src/components/midi-page.tsx` (SysEx workflow), `src/components/send-panel.tsx` (hardcoded strings), `src/app/instruments/[slug]/page.tsx` (hardcoded references), `src/lib/config.ts` (default instrument), `src/components/instrument-overview.tsx` (hardcoded module count)
- Content audit: `src/content/patches/evolver/acid-bass.md` (parameter table format), `src/content/sessions/evolver/01-foundations-navigation.md` (session structure)
- Test audit: `src/lib/content/__tests__/schemas.test.ts`, `src/lib/midi/__tests__/connection.test.ts`, `src/app/__tests__/routing.test.tsx` (all Evolver-only fixtures)
- Cascadia reference: `cascadia_manual_v1.1.pdf` per PROJECT.md, [baratatronix.com](https://www.baratatronix.com/) for patch documentation format inspiration

---
*Pitfalls research for: v1.1 Cascadia multi-instrument support*
*Researched: 2026-03-30*
