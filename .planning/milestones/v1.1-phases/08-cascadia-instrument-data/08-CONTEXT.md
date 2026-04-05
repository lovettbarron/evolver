# Phase 8: Cascadia Instrument Data - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Create the Cascadia instrument documentation: overview page with architecture and quick-start, normalled signal path with Mermaid diagrams, and per-module reference docs covering all controls, jacks, normals, and LEDs. Content sourced primarily from the Cascadia manual (v1.1, 110 pages) with added synthesis perspective. UI updates to support per-module pages and the modules/ subdirectory pattern.

</domain>

<decisions>
## Implementation Decisions

### Module doc structure
- One markdown file per hardware module in a `modules/` subdirectory (e.g., `instruments/cascadia/modules/vco-a.md`)
- ~15 module files covering all Cascadia hardware modules
- Top-level `modules.md` serves as index — lists all hardware modules in panel order with links to individual files
- Index maps hardware modules (physical panel layout), NOT learning modules — curriculum order handled separately in Phase 10

### Module UI rendering
- Each module gets its own route in the UI: `/instruments/cascadia/modules/vcf`
- Content reader needs updates to discover and serve files from the `modules/` subdirectory
- Linked from overview page, module index, and eventually from curriculum sessions

### Normalled signal path
- Separate `signal-flow.md` file (consistent with Evolver pattern), gets its own UI route
- Mermaid diagram showing BOTH normalled connections (solid lines) AND available patch points (nodes)
- Diagram uses Mermaid subgraph syntax to section by signal type (sound sources, shapers, modulators, output) — one diagram with visual groupings, not multiple separate diagrams
- Prose explanation accompanies the diagram: what each normal does and what patching into it overrides

### Per-module template
- Consistent structured template across all modules:
  1. **Purpose** — what the module does
  2. **What Makes It Special** — unique aspects of Cascadia's implementation (comparisons to other designs, unusual normalling, etc.)
  3. **Controls** — table: Control | Type | Range | Notes
  4. **Patch Points** — table: Jack | Type | Normalled To | Notes
  5. **LEDs** — behavior description
  6. **Normalled Connections** — which connections are active by default
- Full reference depth: every knob, switch, jack, and LED documented with value ranges and behavior
- "What Makes It Special" sections include synthesis perspective beyond the manual (e.g., comparing wavefolder to Buchla designs)

### Module frontmatter
- Extended frontmatter beyond standard type/instrument/title:
  - `category`: sound-source | shaper | modulator | utility
  - `control_count`: number
  - `jack_count`: number
  - `has_normals`: boolean
- Enables richer UI display and potential filtering without parsing markdown body

### Overview page structure
- New structure designed for semi-modular (NOT mirroring Evolver's voice architecture pattern):
  - **Identity** — manufacturer, type, format, year
  - **Design Philosophy** — west coast synthesis, semi-modular approach, normalling philosophy
  - **Panel Layout** — high-level module arrangement (left to right)
  - **Normalling Overview** — brief explanation of what normalling means and why it matters
  - **What You Can Do With It** — capabilities and sound design territory
  - **Make a Sound** — condensed quick-start from manual pp. 11-16 (orient the user, not a full walkthrough — full version in Phase 10 Module 1)
- Replaces the current placeholder `overview.md` in `src/content/instruments/cascadia/`

### Content sourcing
- Primary source: `references/cascadia_manual_v1.1.pdf` (110 pages)
- Module ordering follows physical panel layout (left to right), matching the manual's organization
- Content enriched with synthesis knowledge: comparisons, context, "what makes this special" perspective
- Curriculum-specific ordering and pedagogy deferred to Phase 10 sessions

### Claude's Discretion
- Exact Mermaid diagram layout and styling within the subgraph constraint
- How to handle modules that are simple (e.g., output) vs. complex (e.g., Envelope B triple-mode)
- Content reader implementation approach for discovering modules/ subdirectory files
- Whether to create a ModuleSchema or extend existing schemas for module frontmatter validation
- Bundling strategy for src/content/ (mirror instruments/ structure or flatten)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `instruments/evolver/overview.md`: Pattern for overview frontmatter (type, instrument, title, manufacturer) — Cascadia adapts but doesn't mirror structure
- `instruments/evolver/signal-flow.md`: Mermaid diagram pattern with subgraphs — Cascadia extends with patch point nodes
- `src/content/instruments/cascadia/instrument.json`: Already created in Phase 7 with capability flags
- `src/content/instruments/cascadia/overview.md`: Placeholder to be replaced with full overview

### Established Patterns
- Zod schema validation at parse boundaries: new module frontmatter should follow this
- Content reader pattern: `list{Thing}(instrument, config)` — need `listModules(instrument, config)` or similar
- Markdown rendering: rehype pipeline handles Mermaid, callouts, parameter tables already
- Frontmatter types: `type` field determines content category (overview, signal-flow, modules, etc.)

### Integration Points
- Content reader (`src/lib/content/reader.ts`): Needs new function(s) for discovering/reading module files from subdirectory
- Dynamic routes: Need new route `/instruments/[slug]/modules/[module]` for per-module pages
- Overview page (`src/app/instruments/[slug]/page.tsx`): Links to module index and individual modules
- Module index: New page or section listing all modules with links

</code_context>

<specifics>
## Specific Ideas

- Panel order (left to right) is the natural way to organize hardware module reference — it matches how you'd scan the physical instrument
- The "Make a Sound" quick-start in the overview should be just enough to orient someone, not a full learning experience — that's Module 1 in the curriculum
- Extended frontmatter (category, control_count, jack_count, has_normals) enables the UI to show rich module cards without parsing markdown
- Signal flow diagram showing ALL patch points (not just normals) gives the complete picture of what the instrument can do

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 08-cascadia-instrument-data*
*Context gathered: 2026-03-31*
