# Project Research Summary

**Project:** Evolver — v1.1 Cascadia Instrument Support
**Domain:** Multi-instrument synthesizer learning platform (adding CV-only semi-modular to existing SysEx-capable single-instrument app)
**Researched:** 2026-03-30
**Confidence:** HIGH

## Executive Summary

The v1.1 milestone adds the Intellijel Cascadia semi-modular synthesizer as a second instrument to an existing Evolver-focused learning platform. The fundamental challenge is not technical complexity but representational mismatch: the entire codebase assumes a SysEx-capable, preset-storing instrument, while the Cascadia has no patch memory, no SysEx, and no numeric parameters. Every patch is a physical cable configuration plus approximate knob positions. The recommended approach treats these as genuinely different data models — not a generalized abstraction, but instrument-specific data shapes driving shared rendering infrastructure.

The good news is that the existing architecture is well-positioned for this extension. The content reader (`reader.ts`) is already parameterized by instrument slug, the `[slug]` routing works for any instrument immediately, and the markdown pipeline handles any table-based content. Zero new npm dependencies are required — Mermaid, Zod, and Tailwind already cover all Cascadia visualization and validation needs. The primary engineering work is schema extension, UI chrome de-hardcoding, and gating the MIDI workspace behind instrument capability flags. Content authoring (25 sessions, instrument docs, demo patches) is the larger time investment.

The key risk is scope creep in the wrong direction: attempting to build interactive cable visualizers, generalizing the MIDI library, or building a drag-and-drop patch editor before any real curriculum content exists. All three are explicitly anti-patterns. The correct sequence is content-first — write the instrument docs and initial sessions — which forces the natural documentation format to emerge before UI components are built to match it. The Cascadia is a legitimate second-class citizen of the platform by design; Patchbook-inspired YAML in markdown frontmatter, rendered as Mermaid flowcharts and structured tables via existing infrastructure, is sufficient for v1.1.

## Key Findings

### Recommended Stack

Zero new dependencies. The existing Next.js 15, Zod 3, gray-matter, Mermaid 11, and Tailwind stack fully covers Cascadia requirements. Mermaid handles signal flow and auto-generated patch routing diagrams from YAML. Zod extends to cable routing schemas via optional fields on existing schemas (`.passthrough()` already ensures backward compatibility). React PDF already loads the Cascadia manual, which is already in the repository at `src/content/references/cascadia_manual_v1.1.pdf`.

**Core technologies:**
- `mermaid ^11.13.0`: Auto-generate patch routing diagrams from `connections` YAML frontmatter — already installed, no new component library needed
- `zod ^3.23.0`: Extend `PatchSchema` with optional `patch_cables`, `audio_url`, and `connections` fields; extend `InstrumentFileSchema` with `capabilities` and `references` fields
- `gray-matter ^4.0.3`: Parse Cascadia YAML frontmatter in the same pipeline as Evolver — unchanged
- `lucide-react ^1.7.0`: Patch point type icons (audio, CV, gate, clock) — already installed

**What to explicitly avoid:** `@xyflow/react` (200KB+ interactive graph editor for read-only diagrams), any MIDI library (Cascadia has no SysEx), canvas-based rendering tools, Patchbook Python parser (only the notation conventions are needed, not the tool).

### Expected Features

**Must have (table stakes):**
- Cascadia instrument data files (overview, signal-flow, modules, basic-patch/init-state) — parity with Evolver's existing structure
- 25-session curriculum across 7 modules (Foundations, Oscillators, Envelopes, Filter/WaveFolder, Modulation/Utilities, Advanced Patching/FX, Sound Design)
- Patch documentation schema for CV instruments (cable routing YAML + approximate knob positions)
- Instrument selector working in UI — already scaffolded, needs to actually route content
- Hide/adapt SysEx workspace for Cascadia — critical UX correctness issue
- Demo mode with Cascadia synthetic learner data (required for Vercel deployment to show multi-instrument feature)

**Should have (differentiators):**
- Visual patch sheet documentation via Mermaid flowcharts auto-generated from `connections` YAML
- Normalled signal path documentation (Cascadia works without cables; each session must explain which defaults are active)
- Audio preview references per patch (link to Baratatronix initially, self-hosted later)
- Envelope B triple-mode sessions (ENV/LFO/BURST — unique to Cascadia, no Evolver equivalent)
- Cross-instrument concept mapping for users who completed Evolver curriculum first

**Defer to v1.2+:**
- Interactive patch builder / drag-and-drop cable UI
- Visual patch sheet SVG rendering (annotated panel diagrams)
- Self-hosted audio previews
- Cascadia Config App integration
- Normalled-vs-patched interactive diagrams
- Cross-instrument concept mapping (requires both curricula to be complete and tested)

### Architecture Approach

The existing architecture needs extension in two areas: schema evolution to support cable-routing patch data, and UI chrome de-hardcoding to support multiple instruments. The content filesystem, reader, and all `[slug]` routes already work for any instrument slug — adding `src/content/instruments/cascadia/` is sufficient for the instrument to appear in discovery. The critical architectural pattern is **capability flags, not instrument slug checks**: components must read `capabilities.midi_sysex` from instrument frontmatter, not branch on `slug === 'evolver'`.

**Major components and required changes:**
1. `schemas.ts` — Extend `PatchSchema` with optional `patch_cables`/`audio_url` fields; add `capabilities` and `references` to `InstrumentFileSchema`; expand `type` enum to include `patch-points`
2. `nav.tsx` — Replace hardcoded Evolver links with dynamic links from `discoverInstruments()` passed as props from layout server component; hide MIDI link for non-SysEx instruments
3. `[slug]/midi/page.tsx` — Gate behind `capabilities.midi_sysex` check; return informational page for CV instruments
4. `patch-detail.tsx` — Render cable routing section when `patch_cables` present in frontmatter
5. `[slug]/page.tsx` — Read references from overview frontmatter instead of hardcoded const
6. `instrument-overview.tsx` — Compute module count from session data instead of hardcoded "10 modules"
7. `src/lib/midi/` — Leave entirely unchanged. Evolver-specific by design.

**What requires no changes:** `reader.ts`, `session-detail.tsx`, `markdown/processor.ts`, `progress.ts`, `patch-grid.tsx`, all `[slug]` App Router routes.

### Critical Pitfalls

1. **Hardcoded Evolver references in nav and UI chrome** — Nav, send-panel, app-shell, and instrument overview all hardcode "evolver" or "Evolver". Must be fixed before any Cascadia content is added; otherwise the UI is visually broken for the second instrument. Verify with `grep -r "evolver" src/components/` returning zero non-content hits.

2. **PatchSchema assumes SysEx workflow** — `source`, `capture_date`, `program_number`, and writer infrastructure assume Evolver's data model. Cascadia patches use `patch_cables` as a genuinely different optional shape. Do not force CV patch data into SysEx structures; `.passthrough()` is the escape hatch. Create `saveDocumentedPatch()` separate from `saveCapturedPatch()`.

3. **MIDI workspace renders broken UI for non-SysEx instruments** — `/instruments/cascadia/midi` shows Connection/Capture/Send panels that do nothing useful for Cascadia. Gate the route by `capabilities.midi_sysex`. Do not generalize the MIDI library to accommodate Cascadia — the correct answer is to not render it at all.

4. **Config defaults to Evolver, blocking multi-instrument discovery** — Home page uses `config.instrument || 'evolver'`. `discoverInstruments()` already exists and works. Wire it to the home page for an instrument picker; remove the `'evolver'` default.

5. **Building Cascadia UI before content exists** — The wrong abstractions get built when components precede content. Write 5 sessions and 3 patches first; let the natural documentation format emerge; then build UI to match. Violating this order is the most expensive mistake of the milestone.

## Implications for Roadmap

Based on combined research, the dependency chain is clear: content foundation unlocks schema validation, schema extension unlocks UI adaptation, UI adaptation unlocks demo mode verification. Five phases, approximately 5 hours of code changes plus content authoring time.

### Phase 1: Foundation — Schema, UI De-Hardcoding, and Content Structure

**Rationale:** Schema evolution and UI chrome cleanup must happen before any Cascadia content is added. If components hardcode "evolver" and schemas don't support cable routing types, content creation is blocked by validation errors and the live app is visually broken for the second instrument. These are blocking dependencies for all downstream phases.
**Delivers:** Multi-instrument-ready infrastructure; Cascadia content directory appears in instrument discovery; MIDI workspace gated by capability flags; nav shows both instruments dynamically; references data-driven from frontmatter; `output_type` enum extended for Cascadia routing outputs
**Addresses:** Instrument selector, SysEx workspace hiding, instrument data file structure
**Avoids:** Pitfalls 1 (hardcoded nav), 2 (PatchSchema coupling), 3 (MIDI workspace), 4 (config default), 10 (narrow InstrumentFileSchema enum), 11 (hardcoded "10 modules")
**Research flag:** Standard patterns — well-understood Zod schema extension and React conditional rendering. No research phase needed.

### Phase 2: Instrument Documentation and Init State

**Rationale:** The instrument data files (overview, signal-flow, modules, init-state) are the foundation that every curriculum session and patch references. They must be authored before curriculum sessions can be written, as sessions reference module names, normalled connections, and patch point labels that are canonicalized in these files.
**Delivers:** `src/content/instruments/cascadia/` with overview.md, signal-flow.md, modules.md, basic-patch.md; Cascadia manual PDF linkage via references frontmatter; normalled connections map; `CASCADIA_MODULES` taxonomy constant
**Addresses:** Cascadia instrument data files, init state documentation, signal flow documentation
**Avoids:** Pitfall 5 (patch documentation format mismatch — canonical module names established here prevent inconsistent cable routing labels across sessions and patches)
**Research flag:** Skip research phase. Cascadia manual is already in-repository. Source material is HIGH confidence.

### Phase 3: Patch Documentation Schema and Demo Patches

**Rationale:** The cable routing patch format (Patchbook-inspired YAML with `connections`, `settings`, `panel_state`) must be designed and validated against real examples before curriculum sessions reference it. Writing 3-5 demo patches first forces the schema to stabilize and ensures the patch detail component renders correctly before curriculum sessions depend on the format.
**Delivers:** Extended `PatchSchema` with `patch_cables`/`connections`/`audio_url` fields; `patch-detail.tsx` cable routing rendering; 3-5 documented Cascadia demo patches; `PatchConnectionTable` and `KnobSettings` components; patch format indicator on patch cards
**Addresses:** Patch documentation schema, challenge exercises with cable outputs; visual patch sheet documentation via Mermaid
**Avoids:** Pitfall 5 (format mismatch), Anti-Pattern 1 (instrument-specific component forks — single PatchDetail with conditional sections), Anti-Pattern 5 (building UI before content)
**Research flag:** Skip research phase. STACK.md has definitive schema design. Mermaid generation pattern is straightforward.

### Phase 4: Curriculum — Modules 1-3 (Sessions 01-09)

**Rationale:** Modules 1-3 (Foundations, Oscillators, Envelopes/Amplitude) are the minimum viable curriculum. Shipping this subset validates that the session format works for semi-modular instruments before committing to the full 25-session build. Session 01 follows the Cascadia manual's pp.11-16 "Make a Sound" progressive walkthrough — ADHD-optimized, immediate sound within 3 minutes.
**Delivers:** 9 sessions covering setup, panel navigation, VCO A/B, Envelope A/B, VCA, Push Gate; challenge exercises with cable routing outputs; demo mode synthetic learner data for Cascadia
**Addresses:** 25-session curriculum (first 9), ADHD-paced session design, demo mode synthetic data; Envelope B multi-mode sessions
**Avoids:** Pitfall 6 (curriculum pacing assumes preset workflow — sessions must reference cable connections, not menu navigation; use "document your patch" not "save your patch"); Pitfall 8 (add Cascadia test fixtures before this phase)
**Research flag:** Skip research phase. Session format is established and Cascadia manual is primary source.

### Phase 5: Curriculum — Modules 4-7 (Sessions 10-25) and Completion

**Rationale:** Complete the curriculum after the session format is validated against real learner feedback from Modules 1-3. Modules 4-7 build on the foundation with filter/wave folding, modulation utilities, advanced patching, and integration sessions.
**Delivers:** 16 remaining sessions (Filter, WaveFolder, Mixer, LFO/S&H/Slew/Mixuverter/Patchbay, Ring Mod, FX Send/Return, Line In, Burst mode, sound design recipes, DAW integration); 5-10 standalone patch library entries; verified demo mode with both instruments showing in discovery
**Addresses:** Full curriculum completion; FX Send/Return integration sessions, cross-module recipe sessions, unipolar/bipolar slider teaching, VCO B dual-purpose sessions
**Avoids:** Pitfall 9 (demo mode missing Cascadia — verify `discoverInstruments()` returns both instruments before milestone close); Pitfall 8 (test suite must include `instrument: 'cascadia'` fixtures before this phase ships)
**Research flag:** Skip research phase. Standard curriculum authoring against established manual source.

### Phase Ordering Rationale

- Phase 1 before all others: schema validation errors and broken UI chrome block every downstream task
- Phase 2 before Phase 3: canonical module names and normalled connections must be established before patches reference them by name
- Phase 3 before Phase 4: patch documentation format must stabilize before curriculum sessions reference patches
- Phase 4 before Phase 5: validate session format against Modules 1-3 before full curriculum commitment
- `src/lib/midi/` is explicitly excluded from all phases — do not touch it for Cascadia support

### Research Flags

Phases needing deeper research during planning: None. All phases draw from high-confidence existing sources (in-repository manual, direct codebase inspection, established patterns).

Phases with standard patterns (skip research-phase):
- **All phases:** Patterns are well-documented. Stack is existing dependencies. Architecture is direct codebase extension. Schema changes are additive optional fields. Content follows established session and patch templates.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Zero new dependencies; all tools already installed and in use. Alternatives evaluated and rejected with clear rationale (React Flow, Patchbook Python, d3, canvas libraries all dismissed). |
| Features | HIGH | Primary source (Cascadia manual v1.1) is in-repository. Evolver curriculum provides direct precedent for session structure. Baratatronix provides external format validation at MEDIUM confidence. |
| Architecture | HIGH | Based on direct codebase inspection of 98 files. All integration points identified from source, not inference. Component boundaries and data flow are explicit. |
| Pitfalls | HIGH | Identified from direct code audit (nav.tsx, schemas.ts, midi/ directory, component strings). 11 pitfalls documented with specific file references, recovery costs, and phase mapping. |

**Overall confidence:** HIGH

### Gaps to Address

- **Audio preview hosting strategy:** Linking to Baratatronix externally is the right v1.1 approach, but the self-hosted pattern (storage location, Git LFS vs. external) needs a decision before v1.2. Low urgency for this milestone.
- **`output_type` enum for Cascadia:** PITFALLS.md recommends adding `'routing'` to the enum for Cascadia sessions that produce documented cable configurations rather than saved presets. Needs a decision in Phase 1: extend the enum or reinterpret existing `'patch'` type. Either is acceptable; pick one and document it.
- **Demo patch selection:** Research specifies 3-5 demo patches as minimum for demo mode. The exact patches to author for maximum pedagogical coverage (one per module, spread across session origins) is not determined. Resolve during Phase 3 content authoring.
- **Cross-instrument concept mapping format:** The bridge reference pattern needs a frontmatter stub design. Deferred to v1.2, but a `cross_reference` optional field could be reserved in the Phase 1 schema work without building UI for it.

## Sources

### Primary (HIGH confidence)
- `src/content/references/cascadia_manual_v1.1.pdf` (in-repository) — module architecture, 101 patch points, normalled connections, default signal flow, "Make a Sound" walkthrough pp.11-16
- Direct codebase inspection — `src/lib/content/schemas.ts`, `reader.ts`, `nav.tsx`, `src/lib/midi/`, `src/components/` (98 files with Evolver/SysEx references audited)
- Existing Evolver curriculum `src/content/sessions/evolver/` — session format, module grouping, frontmatter schema patterns
- `PROJECT.md` v1.1 milestone definition — scope constraints, anti-features
- [Intellijel Cascadia Patch Sheet](https://intellijel.com/downloads/manuals/cascadia_patch_sheet.pdf) — official blank template for cable documentation
- [Patchbook by SpektroAudio](https://github.com/SpektroAudio/Patchbook) — cable routing notation conventions and signal type taxonomy (audio, cv, pitch, gate, clock)

### Secondary (MEDIUM confidence)
- [Baratatronix.com Cascadia patch library](https://www.baratatronix.com/cascadia-patches) — patch documentation format with audio previews, connection lists, and downloadable Illustrator/Affinity panel templates
- [Baratatronix Ageispolis Pad](https://www.baratatronix.com/cascadia/cascadia-ageispolis-pad) — individual patch example with visual diagram and patching instructions
- [@xyflow/react on npm](https://www.npmjs.com/package/@xyflow/react) — evaluated at v12.10.2 and rejected as overkill for static patch documentation

### Tertiary (LOW confidence)
- [PATCH & TWEAK Symbols](https://www.patchandtweak.com/symbols/) — CC-licensed symbol system for modular documentation; informational only, not adopted

---
*Research completed: 2026-03-30*
*Ready for roadmap: yes*
