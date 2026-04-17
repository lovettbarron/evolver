# Domain Pitfalls

**Domain:** Adding individual eurorack module learning to an existing instrument mastery platform
**Researched:** 2026-04-16

## Critical Pitfalls

Mistakes that cause rewrites or major issues.

### Pitfall 1: Content Type Collision Between "Modules" (Instrument Sections) and "Modules" (Eurorack Units)

**What goes wrong:** The existing codebase already uses "module" to mean a *section within an instrument's curriculum* (e.g., Evolver's "Analog Oscillators" module containing sessions 03-06, or Cascadia's "Oscillators" module). The `SessionSchema` has a `module: z.string()` field that groups sessions into these curriculum sections. The `listModules()` function in `reader.ts` lists module documentation files from `instruments/{slug}/modules/`. The route `/instruments/[slug]/modules/[module]` already exists. Adding eurorack "modules" (hardware units like Plaits or Maths) creates a naming collision where "module" means two completely different things in code, URLs, schemas, and user-facing copy.

**Why it happens:** Eurorack calls its units "modules" -- it is the standard industry term. The existing codebase adopted "module" for curriculum grouping before eurorack support was planned. Both usages feel natural in isolation but create ambiguity when they coexist.

**Consequences:** Developers (including AI agents) confuse `listModules()` (instrument section docs) with a hypothetical `listEurorackModules()`. URL routing collides if eurorack modules are placed under `/modules/` while curriculum modules already live at `/instruments/[slug]/modules/`. Schema validation errors when a `module` field on a session means "curriculum section" for instruments but "hardware unit" for eurorack. Confusing navigation where "Modules" in the nav could mean either.

**Prevention:**
- Adopt explicit terminology in code: "curriculum module" or just "section" for the existing concept, "eurorack module" or just "unit" for the new hardware concept. In the codebase, prefer `unit` or `eurorackModule` as the type/variable name.
- Give eurorack modules their own top-level route: `/eurorack/[slug]` or `/modules/[slug]` (NOT under `/instruments/`), making the routing unambiguous.
- In the `SessionSchema`, the existing `module` field should keep its meaning (curriculum section). Eurorack module sessions get a separate `unit` or `eurorack_module` field, or the `instrument` field references the module slug directly.
- In user-facing copy, always say "module" for eurorack hardware (users expect it) but "section" or "topic" for curriculum grouping.

**Detection:** Search the codebase for `module` -- if it returns hits from both the curriculum-grouping domain and the eurorack-hardware domain without clear disambiguation, the collision is happening.

### Pitfall 2: Schema Explosion from Modules-as-Instruments vs Modules-as-New-Type

**What goes wrong:** The existing `InstrumentConfigSchema` assumes each entity is a full instrument with `sysex: boolean`, `patch_memory: boolean`, `sampler: boolean`, `sequencer: boolean`, and `reference_pdfs`. Trying to shoehorn eurorack modules into this schema means every module gets `sysex: false`, `patch_memory: false`, `sampler: false`, `sequencer: false` -- these fields are meaningless for modules. Alternatively, creating a completely separate `ModuleConfigSchema` duplicates shared logic (session listing, patch display, progress tracking, panel rendering) and doubles the maintenance surface.

**Why it happens:** The existing architecture was built for "complete instruments" that are self-contained music-making devices. Eurorack modules are components that only make sense in a larger system. The conceptual mismatch means neither "same type" nor "new type" is clean.

**Consequences:** If modules are instruments: the instrument selector becomes cluttered with 6+ items that are categorically different from the 3 existing instruments. The `discoverInstruments()` function returns mixed results. Capability-gated routes (MIDI, SysEx) render empty pages for modules. If modules are a new type: every reader function, every route, every component that renders instrument data needs a parallel module version, roughly doubling the code.

**Prevention:**
- Modules should be a new content type with their own schema, NOT extensions of `InstrumentConfigSchema`. The schema should include: `manufacturer`, `hp_width`, `categories` (array -- modules can belong to multiple), `power_requirements`, `documentation_url`, `panel_svg`, `control_count`.
- Share rendering components via composition, not inheritance. A `SessionList` component should accept sessions regardless of whether they came from an instrument or a module. Same for `PatchList`, `PanelVisualizer`, and progress tracking.
- The content reader should have `listEurorackModules()` and `loadModuleConfig()` functions that are parallel to but separate from the instrument functions. They read from `modules/{slug}/` not `instruments/{slug}/`.
- The navigation should have a separate "Eurorack" or "Modules" section, distinct from the instrument selector dropdown.

**Detection:** If you find yourself adding `optional()` to 4+ fields on `InstrumentConfigSchema` to accommodate modules, you are shoehorning.

### Pitfall 3: Triple-Write Pipeline Becomes Quintuple-Write

**What goes wrong:** The existing content pipeline requires writing session/patch content to three locations: `sessions/{instrument}/`, `src/content/sessions/{instrument}/`, and `~/song/sessions/{instrument}/`. Adding a new `modules/` content hierarchy means every module's sessions must also be written to three locations: `sessions/modules/{slug}/` or `modules/{slug}/sessions/`, `src/content/modules/{slug}/sessions/`, and `~/song/modules/{slug}/sessions/`. If the directory structure diverges between these three roots (e.g., repo uses `modules/plaits/sessions/` but vault uses `sessions/modules/plaits/`), content silently fails to load depending on which root is active.

**Why it happens:** The `getContentRoot()` function switches between vault and bundled content based on config. Both roots must have identical directory structures. When adding a new content hierarchy, it is easy to set up the repo structure correctly but forget to mirror it in the vault, or vice versa.

**Consequences:** Sessions appear in local development but vanish on Vercel (or the reverse). Patches show in the vault but not in bundled content. Panel markers reference controls that only exist in one location. The developer spends hours debugging "missing content" that turns out to be a path mismatch between the three roots.

**Prevention:**
- Before writing any module content, document the EXACT directory structure in a single reference that covers all three roots. Enforce it with a validation script that diffs the directory trees.
- Consider simplifying the pipeline for v2.0: make the repo the source of truth and use a build step to copy to `src/content/`, rather than manually maintaining two copies. The vault sync is separate (Obsidian handles this).
- Add a CI check that verifies every session/patch file in `sessions/` or `modules/` has a corresponding file in `src/content/`.

**Detection:** Run `diff <(find sessions/ -name '*.md' | sort) <(find src/content/sessions/ -name '*.md' | sort)` and check for mismatches.

## Moderate Pitfalls

### Pitfall 4: Panel SVG Complexity Varies Wildly Per Module

**What goes wrong:** The existing panel builder skill assumes instruments have 60-180 controls with consistent manufacturer aesthetics. Eurorack modules range from 5 controls (Just Friends: 6 knobs + 13 jacks = ~19 controls total) to 20+ controls (Maths: 4 knobs + 4 sliders + 4 attenuverters + 12 jacks + switches = ~30 controls). More importantly, each manufacturer has a completely different visual language -- Mutable's clean minimalism vs Make Noise's dense illustrative style vs Mannequins' stark typography. Applying the same SVG rendering approach to all 6 will produce panels that either look homogeneous (wrong) or require 6 different visual treatments (expensive).

**Per-module complexity assessment:**

| Module | Est. Controls | Panel Aesthetic | SVG Difficulty | Notes |
|--------|--------------|----------------|----------------|-------|
| Plaits | ~15 | Clean, labeled, white panel | LOW | Clear layout, few controls, good docs |
| Beads | ~20 | Clean, labeled, dark panel | LOW-MED | More controls, density modes change behavior |
| Swells | ~18 | Intellijel standard, labeled | LOW | Same manufacturer as Cascadia -- existing style works |
| Maths | ~30 | Dense, illustrative, curves on panel | MED-HIGH | Complex panel art, many patch points, visual noise |
| Just Friends | ~19 | Minimal, sparse, large text | LOW | Few controls, clean layout |
| Ikarie | ~16 | Unique Bastl aesthetic, colored | MED | Non-standard layout conventions |

**Prevention:**
- Use the data-driven panel approach (Cascadia pattern) for ALL modules -- it is proven to scale better than inline JSX.
- Accept that each module panel will have a different background color/texture but use the SAME control rendering primitives (knobs, jacks, switches from the existing library).
- Do NOT try to replicate manufacturer panel art (Make Noise's waveshape illustrations, Bastl's color gradients). Render the controls faithfully; omit decorative elements. The panel is a learning tool, not a replica.
- Prioritize Plaits and Swells first (lowest complexity) to establish the pattern, then tackle Maths last (highest complexity).

**Detection:** If a panel SVG component exceeds 400 LOC, the approach is too bespoke. Each module panel should be ~100-200 LOC of data + ~100 LOC of shared component.

### Pitfall 5: Multi-Category Modules Create Duplicate Navigation

**What goes wrong:** Maths is simultaneously a function generator, envelope generator, LFO, slew limiter, and utility. Just Friends is a modulator, VCO, and envelope generator. If the category taxonomy shows modules under each category they belong to, Maths appears in 4+ categories and Just Friends in 3+. Users clicking "Function Generators" and then "Envelopes" see the same module, creating a sense of duplicate content and confusion about where "their" progress lives.

**Why it happens:** Multi-function modules are the norm in eurorack, not the exception. A rigid one-module-one-category taxonomy does not match the domain.

**Consequences:** Navigation feels redundant. Progress tracking may double-count if each category appearance is treated as a separate learning path. Users are unsure whether "Maths under Envelopes" and "Maths under Function Generators" have different sessions or the same ones.

**Prevention:**
- Each module has ONE canonical location. Categories are tags/filters, not containers. The module lives at `/modules/maths` regardless of how the user found it.
- Category pages show filtered views of the same module list, with a clear "also in: [other categories]" badge.
- Sessions within a module can be tagged by which function they teach (e.g., "Maths as LFO" vs "Maths as Envelope"), but they all live under the module, not the category.
- Progress is tracked per module, not per category.

**Detection:** If adding a new category requires creating new session files, the taxonomy is wrong. Categories should be metadata, not directory structure.

### Pitfall 6: Scope Creep into System Design Teaching

**What goes wrong:** The project scope is "teach individual modules." But modules exist in a system. Once you start writing sessions for Plaits, the natural next step is "now patch Plaits into Ikarie" which requires teaching signal flow, gain staging, and eurorack system design. This is a completely different curriculum domain (modular synthesis methodology) that can consume months of content creation for diminishing returns.

**Why it happens:** Modules are inherently interconnected. "What do I do with the output?" is a valid question after every module session. The temptation is to answer it comprehensively, which means teaching patching, signal routing, and system architecture -- an entire course in itself.

**Consequences:** The 6-module curriculum balloons from ~30 sessions to 60+ as "cross-module" and "system design" sessions are added. Content creation stalls because writing system-level sessions requires planning the entire modular rack, not just one module. The ADHD-friendly constraint (15-30 min, single objective) is violated when sessions try to cover "patch Plaits through Maths into Ikarie."

**Prevention:**
- Hard boundary: v2.0 teaches modules in isolation. Cross-module patching is out of scope for this milestone.
- Each module session can include a "Next steps" note suggesting what to patch it into, but this is a one-sentence pointer, not a full session.
- Cross-module interaction is explicitly flagged as a v3.0 milestone that requires its own research, planning, and curriculum design.
- Session count targets per module should be proportional to the module's complexity, not its number of categories. Target: 3-5 sessions for simple modules (Swells, Ikarie), 5-8 for complex ones (Maths, Plaits).

**Detection:** If a session's objective mentions two modules by name, it has crossed the scope boundary.

### Pitfall 7: Documentation Quality Varies by Manufacturer

**What goes wrong:** Session content quality depends on having good reference documentation. The 6 target modules have dramatically different documentation quality:

| Module | Manufacturer | Doc Quality | Doc Format | Availability | Risk |
|--------|-------------|-------------|------------|--------------|------|
| Plaits | Mutable Instruments (closed 2022) | EXCELLENT | Web (GitHub Pages) + quickstart PDF | Public, archived | LOW -- docs preserved on GitHub |
| Beads | Mutable Instruments (closed 2022) | EXCELLENT | Web (GitHub Pages) + quickstart PDF | Public, archived | LOW -- same archive |
| Maths | Make Noise | GOOD | Official PDF + illustrated supplement | Official website | LOW -- manufacturer active |
| Swells | Intellijel | GOOD | Official PDF manual | Official website | LOW -- manufacturer active, brand new module |
| Just Friends | Mannequins/Whimsical Raps | MEDIUM | GitHub "Technical Maps" (MD + PDF), terse | GitHub, community forums | MEDIUM -- documentation is deliberately minimal/poetic |
| Crow | Monome/Mannequins | MEDIUM-HIGH | Web docs + GitHub | monome.org | MEDIUM -- requires understanding Lua scripting |
| Ikarie | Casper x Bastl | MEDIUM | PDF manual, less detailed | Bastl website | MEDIUM -- smaller manufacturer, less community content |

**Why it happens:** Eurorack is a diverse ecosystem. Large manufacturers (Intellijel, Make Noise) produce thorough documentation. Boutique makers (Mannequins, Casper x Bastl) often produce artistic/minimal documentation that assumes modular synthesis experience. Mutable Instruments produced excellent docs but the company is closed; docs are community-archived.

**Consequences:** Sessions for well-documented modules (Plaits, Maths) can reference specific manual pages. Sessions for poorly-documented modules (Just Friends) must compensate with more explanatory content, which takes longer to write and may contain errors.

**Prevention:**
- Download and store ALL reference documentation before writing any sessions. Store in `references/modules/{slug}/` to keep them separate from instrument manuals.
- For Just Friends: the Mannequins Technical Maps GitHub repo is the canonical reference. The lines (llllllll.co) community thread has years of user-generated documentation -- extract key insights.
- For Crow: monome.org/docs/crow is comprehensive but deeply technical (Lua scripting). Sessions should focus on CV behavior and i2c integration with Just Friends, not Lua programming.
- For Ikarie: the Bastl PDF manual plus ModWiggler community threads are the primary sources. Accept that sessions may need more "discover by experiment" exercises.
- Prioritize writing sessions for well-documented modules first (Plaits, Maths, Swells) to establish patterns, then tackle the harder ones.

**Detection:** If a session draft includes phrases like "refer to the manual for details" without a specific page/section reference, the documentation is insufficient and the session needs more original explanatory content.

### Pitfall 8: Just Friends + Crow is Two Modules, Not One

**What goes wrong:** The milestone description lists "Mannequins Just Friends + Crow" as a single item. But Just Friends and Crow are two separate eurorack modules from different manufacturers (Mannequins vs Monome) that communicate via i2c. Treating them as a single learning unit creates confusion: Do they share a panel SVG? Do sessions assume both are present? What happens when someone has Just Friends but not Crow?

**Why it happens:** Just Friends + Crow are commonly paired in the eurorack community because Crow can control Just Friends polyphonically via i2c/ii, unlocking capabilities that Just Friends alone cannot access. But they are distinct hardware with distinct documentation.

**Consequences:** The panel SVG needs to represent two separate physical modules side by side (or two separate SVGs). Session prerequisites become complex: "This session requires both modules" vs "This session works with Just Friends alone." The control metadata has to span two manufacturers' design languages.

**Prevention:**
- Treat Just Friends and Crow as TWO separate modules in the data model: `just-friends` and `crow`. Each gets its own `module.json`, panel SVG, and core sessions.
- Create a separate "Just Friends + Crow" cross-module session set that has BOTH as prerequisites. These sessions are optional extensions, not part of the core module curriculum.
- The Just Friends core sessions (3-5) should work WITHOUT Crow. Crow core sessions (2-3) should focus on its standalone CV/scripting capabilities.
- The combined sessions (2-3) are the first taste of cross-module content and serve as a prototype for v3.0 cross-module curriculum.

**Detection:** If a session file has `instrument: just-friends` but its content references Crow controls or i2c commands, the modules are being conflated.

### Pitfall 9: Session Count Mismatch -- Too Few Sessions Per Module

**What goes wrong:** Existing instruments have 25-37 sessions each. Individual eurorack modules are much simpler -- Swells is one reverb effect with ~15 controls. Writing 25 sessions for Swells would be absurd padding. But writing only 2 sessions risks feeling like "why did we build all this infrastructure for 2 pages of content?" The ADHD-friendly design requires sessions that are complete, focused, and tangible -- which means some modules genuinely warrant only 2-3 sessions.

**Why it happens:** The framework was designed for complete instruments where deep mastery takes months. Modules are components that can be learned in 1-4 focused sessions. The infrastructure-to-content ratio feels wrong at small session counts.

**Consequences:** If too few: the module feels like a stub, not a learning resource. The progress tracking (completion percentage, streak) becomes meaningless with 2 items. If too many: sessions are padded with filler ("experiment freely" contradicts the specific-parameter ADHD constraint), and the learner feels patronized.

**Suggested session counts:**

| Module | Suggested Sessions | Rationale |
|--------|-------------------|-----------|
| Maths | 6-8 | Most complex -- 4 distinct functions, illustrated supplement has 32 patch ideas |
| Plaits | 5-6 | 16 synthesis modes, but many are variations -- group by category |
| Beads | 4-5 | 4 quality modes, granular concepts need layered introduction |
| Just Friends | 3-4 | 3 modes (Shape/Sustain/Cycle) each need focused exploration |
| Swells | 3-4 | 9 reverb models but same control scheme -- group by character |
| Ikarie | 3-4 | Filter morphing + envelope follower + stereo -- 3 distinct concepts |
| Crow (standalone) | 2-3 | CV basics, scripting intro, i2c overview |
| JF + Crow combined | 2-3 | Polyphonic voice, generative sequences |

**Prevention:**
- Set minimum 3 sessions per module (foundation, exploration, sound design application). Below 3, the module does not warrant its own section.
- Do NOT pad. If a module is genuinely simple, 3 sessions is correct. The completion tracking can show "3/3 complete" without it feeling empty if the sessions are substantive.
- The first session for every module should be "Orientation + First Sound" following the Cascadia/Octatrack pattern -- zero-to-sound in 15 minutes.

**Detection:** If a session's content is less than 300 words, it probably should be merged with an adjacent session.

## Minor Pitfalls

### Pitfall 10: Copyright and Licensing for Reference PDFs

**What goes wrong:** Storing manufacturer PDF manuals in the repo (`references/`) and serving them via the web app may violate copyright. The existing Evolver and Cascadia manuals are stored in `references/` and gitignored (not distributed), but if eurorack module manuals are added the same way, it is fine for personal use. However, if any of this content is served via the public Vercel demo, it becomes distribution.

**Why it happens:** Manuals are copyrighted by their manufacturers. Personal use is fine. Public distribution is not, even if the product is discontinued (Mutable Instruments).

**Prevention:**
- Store module manuals in `references/modules/{slug}/` and add them to `.gitignore`. They should never be committed to the repo or served publicly.
- For the public demo, link to official manual URLs rather than serving PDFs.
- Mutable Instruments documentation is open-source (CC-BY-SA 3.0) and hosted on GitHub Pages -- this is the one exception where linking is unambiguous.
- Make Noise, Intellijel, and Bastl provide official download links -- link to those rather than hosting copies.
- Mannequins Technical Maps are on GitHub with no explicit license -- treat as copyrighted and link rather than host.

**Detection:** Check `.gitignore` for `references/`. If PDF files appear in `git status`, they should not be committed.

### Pitfall 11: Existing Panel Component Bloat

**What goes wrong:** Each instrument currently has its own panel component: `evolver-panel.tsx`, `cascadia-panel.tsx`, `octatrack-panel.tsx`. Adding 6-7 more creates 9-10 panel components, each with potentially 100-400 LOC. The `session-detail.tsx` file already has regex patterns and conditional rendering for 3 instruments; adding 6-7 more creates a long chain of `if (instrumentSlug === 'plaits')` branches.

**Prevention:**
- Create a generic `ModulePanel` component that accepts control metadata and positions as props, rather than a bespoke component per module. The Cascadia data-driven pattern already supports this -- extract the rendering logic into a reusable component, then each module only provides a data file.
- The `session-detail.tsx` panel marker should use a single regex pattern like `data-module-panel` with a `data-module="plaits"` attribute, rather than 6 separate regex patterns.
- The standalone panel route should load panel data dynamically based on slug rather than having conditional imports.

**Detection:** If `session-detail.tsx` has more than 4 regex patterns for panel markers, it needs refactoring.

### Pitfall 12: Demo Mode Content Bundling for 6+ Modules

**What goes wrong:** The existing demo mode bundles synthetic learner journeys for 3 instruments. Adding 6-7 modules means 9-10 synthetic journeys, each needing plausible session completions, patch data, and practice timestamps. The demo mode data files grow proportionally, and the "random realistic data" generation becomes harder to maintain.

**Prevention:**
- Start with demo mode for 2-3 modules (Plaits and Maths as showcase modules), not all 6-7. The demo only needs to prove the concept, not demonstrate every module.
- Reuse the existing demo data generation patterns. Module demo data is simpler than instrument data because there are fewer sessions per module.
- Defer full demo mode for all modules until the curriculum content is actually written. Demo data should follow real content, not precede it.

**Detection:** If demo mode setup takes more than 1 hour per module, the approach is too bespoke.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Schema and data model design | Name collision (#1), schema explosion (#2) | Decide "module" terminology day 1. New type, not extension |
| Content directory structure | Triple-write (#3) | Document exact paths across all 3 roots before writing content |
| Panel SVG creation | Per-module complexity (#4), existing component bloat (#11) | Generic ModulePanel component. Start with simple modules |
| Category taxonomy | Duplicate navigation (#5) | Categories as tags, not containers. One canonical URL per module |
| Session curriculum writing | Scope creep (#6), session count (#9), doc quality (#7) | Hard isolation boundary. Min 3, max 8 sessions. Download docs first |
| Just Friends + Crow | Two-module conflation (#8) | Separate data models. JF works standalone. Crow works standalone |
| Reference materials | Copyright (#10), doc quality (#7) | Gitignore all PDFs. Link to official sources in public demo |
| Demo mode | Content bundling (#12) | Start with 2-3 modules in demo. Follow real content |

## Sources

- Codebase analysis: `schemas.ts` (SessionSchema with `module` field, InstrumentConfigSchema with instrument-specific flags), `reader.ts` (content path resolution, `listModules()` function), `session-detail.tsx` (per-instrument panel marker regex), CLAUDE.md (triple-write pipeline documentation)
- [Mutable Instruments Documentation Archive](https://pichenettes.github.io/mutable-instruments-documentation/) -- Plaits and Beads manuals (CC-BY-SA 3.0)
- [Mannequins Technical Maps](https://github.com/whimsicalraps/Mannequins-Technical-Maps) -- Just Friends documentation
- [Monome Crow Documentation](https://monome.org/docs/crow/) -- Crow scripting and CV documentation
- [Make Noise Maths Manual](https://www.makenoisemusic.com/modules/maths/) -- Official Maths documentation and illustrated supplement
- [Intellijel Swells Manual](https://intellijel.com/downloads/manuals/swells_manual_v1.0_2026.04.09.pdf) -- Official Swells documentation
- [Bastl Ikarie Manual](https://bastl-instruments.com/files/manual-ikarie-web.pdf) -- Official Ikarie documentation
- synth-panel-builder skill (`.claude/skills/synth-panel-builder/SKILL.md`) -- Panel SVG complexity benchmarks from Evolver (110 controls), Cascadia (179 controls), Octatrack (67 controls)
