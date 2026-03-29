# Phase 3: Patch Library - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Users can browse, filter, and inspect their documented patches with full parameter detail and session provenance. This phase adds patch browsing UI, filtering by type, patch detail pages, and creates the demo patch content files needed to populate the library.

</domain>

<decisions>
## Implementation Decisions

### Patch browsing layout
- **Card grid** layout, not list — responsive 2-column grid, stacks to 1 column on mobile
- Each card shows: type badge (single accent color, not per-type colors), patch name as title, description snippet, tags, date created
- Session origin link intentionally **omitted from cards** — visible only in detail view to keep cards clean
- Distinct visual feel from the session list (cards vs rows) while staying within the editorial design system

### Filtering & organization
- **Horizontal pill tabs** at top of page: All, Bass, Lead, Pad, Drum, Texture, Sequence
- Active pill uses accent color; inactive pills are muted
- **Hide empty types** from pill tabs — only show types that have patches
- Default sort: **grouped by type, then by session origin** (curriculum order within each type)
- When a type filter is active, **no type group headers** — just cards sorted by session origin
- When "All" is active, type group headers separate the sections

### Patch detail view
- **Sticky header** with patch name and "Back to patches" link — reuses session sticky header pattern
- Session provenance as **header metadata line** below patch name: "BASS - Created in Session 06: Oscillator Mixing" (clickable link to session)
- Parameter dump **grouped by synth section**: Oscillators, Filter, Envelopes, LFOs, Sequencer, etc. — matches how the Evolver is structured
- Playing tips and technique notes displayed as **callout boxes** (Obsidian-style admonitions) — visually distinct from parameter tables, eye-catching for ADHD scanning
- Markdown body rendered below metadata via the existing rendering pipeline

### Patch content creation
- **15+ demo patches** with full curriculum coverage — at least one patch per recipe/creation session
- Parameter values sourced from **Anu Kirk's guide examples** — authentic to the reference material
- **Key parameters only** (diff from basic patch) — full dumps deferred to Phase 4 (MIDI SysEx)
- **Curriculum-authentic type spread** — types reflect what the curriculum actually produces (emphasis on bass, lead, pad, texture; drum and sequence from later modules)
- Patch files follow the existing PatchSchema: name, type, session_origin, description, tags, instrument, created

### Claude's Discretion
- Exact card dimensions and spacing within the 2-column grid
- Pill tab responsive behavior (wrap vs scroll on narrow screens)
- Parameter table section groupings (which Evolver parameters go in which section)
- Callout box styling (colors, icons) within the design system tokens
- Mobile breakpoint behavior
- Loading states and transitions
- Which specific Anu Kirk exercises map to which patches

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Patch data and schema
- `src/lib/content/schemas.ts` — PatchSchema defines frontmatter fields: name, type, session_origin, description, tags, instrument, created
- `src/lib/content/reader.ts` — `listPatches()` function already exists — data layer is ready
- `src/lib/content/types.ts` — Patch type export
- `patches/evolver/README.md` — Patch template with naming convention and structure

### Design system and UI patterns (from Phase 2)
- `src/app/globals.css` — Tailwind theme tokens (bg, surface, text, muted, accent, param)
- `src/components/sticky-header.tsx` — Sticky header pattern to reuse for patch detail
- `src/components/session-list.tsx` — List/grouping pattern (patch library diverges to cards but same data flow)
- `src/components/session-detail.tsx` — Detail page pattern with markdown rendering

### Content pipeline
- `src/lib/markdown/processor.ts` — Markdown rendering with parameter tables, callouts, mermaid
- `src/lib/config.ts` — Config loader for vault path / demo mode

### Source material for patch content
- `references/evolverguide.pdf` — Anu Kirk's guide with exercises and example patches (primary source for parameter values)
- `references/Evo_Key_Manual_1.3.pdf` — DSI parameter reference (parameter names, ranges, defaults)
- `instruments/evolver/basic-patch.md` — Basic patch parameter dump (baseline for key-parameter diffs)

### Session cross-references
- `sessions/evolver/` — All 35 sessions; patches reference session_origin numbers that link here
- `instruments/evolver/modules.md` — Module map showing which sessions produce patches

### Project context
- `.planning/REQUIREMENTS.md` — PTCH-01 through PTCH-04 requirements
- `.planning/PROJECT.md` — PM Toolkit vault reader pattern, constraints

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/content/reader.ts`: `listPatches()` returns `{ data: Patch; content: string; slug: string }[]` — data layer ready
- `src/lib/content/schemas.ts`: `PatchSchema` with type enum matching filter categories exactly
- `src/components/sticky-header.tsx`: Reusable sticky header with back nav pattern
- `src/lib/markdown/processor.ts`: `renderMarkdown()` handles parameter tables and callouts — renders patch body content
- `src/components/source-ref.tsx`: Source reference component (being wired in Phase 2 gap closure)

### Established Patterns
- Server components for data loading (listSessions pattern), client components for interactivity
- Instrument-scoped routing: `/instruments/[slug]/...`
- Tailwind-only styling via CSS custom properties (no hardcoded colors)
- Content validated via Zod at parse time — components can trust the data
- `.passthrough()` on all schemas for Obsidian metadata tolerance

### Integration Points
- Route: `/instruments/[slug]/patches` (list) and `/instruments/[slug]/patches/[id]` (detail)
- Nav component needs "Patches" link added
- Session detail could link TO patches (session shows "Patches created in this session") — but that's bidirectional and may be Phase 5 scope
- Bundled patches go in `src/content/patches/evolver/` alongside the README

</code_context>

<specifics>
## Specific Ideas

- Card grid gives the patch library a **distinct visual identity** from the session list — sessions are a curriculum (linear list), patches are a collection (browsable grid)
- Type badges all use the single accent color — restraint over variety, consistent with Ghostly/Domus editorial aesthetic
- Callout boxes for playing tips make them **scannable for ADHD** — parameter tables are reference, tips are actionable
- "Created in Session 06: Oscillator Mixing" provenance link reinforces that patches come FROM the learning process, not in isolation

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-patch-library*
*Context gathered: 2026-03-29*
