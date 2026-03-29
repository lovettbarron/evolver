# Phase 1: Content Pipeline + Curriculum - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Data layer that reads, validates, and renders all content types from an Obsidian vault (or bundled fallback), plus the complete 35-session Evolver curriculum as markdown files. This phase delivers the invisible foundation — no UI beyond what's needed to verify rendering.

</domain>

<decisions>
## Implementation Decisions

### Frontmatter schema design
- **Rich YAML frontmatter** on all content types — sessions, patches, and instrument files
- Session frontmatter: title, module, session number, duration, prerequisite, output type (patch/technique/recording), difficulty, tags, instrument
- Patch frontmatter: name, type (bass/lead/pad/drum/texture/sequence), session origin, description, tags, instrument, created date
- Instrument file frontmatter: type (overview/signal-flow/basic-patch/modules), instrument slug, title, manufacturer
- Instrument discovery from filesystem (`instruments/<name>/`) with frontmatter validation on each file
- **Zod validation**: strict on required fields, permissive on extras (passthrough). Required fields must be present and correctly typed. Unknown/extra fields allowed but stripped. Catches real errors while tolerating Obsidian-added metadata

### Curriculum authoring
- **All 35 sessions written from scratch** by Claude, using Anu Kirk guide + official DSI manual as source material
- Existing 7 sessions are **fully rewritten** — they were generated as placeholders and should not be treated as good examples or templates
- Sessions are the core experience — substantial effort required. Apply **adversarial review** against each session to verify it covers what it needs to and doesn't send the learner down a bad path
- **Module map to be revisited** before writing — the 10-module structure and session allocations should be reviewed against reference materials. Target ~35 sessions but quality over hitting exact count
- Sessions **cite specific reference material** sections (e.g., "See Anu Kirk p.42") per SESS-05 requirement. Helps learners go deeper with the guides

### Markdown rendering
- **All Obsidian-flavored markdown** features supported:
  - Parameter tables — core to every session and patch
  - Callouts/admonitions — visual hierarchy for ADHD scanning (`> [!tip]`, `> **If you only have 5 minutes**`)
  - Wikilinks — `[[links]]` resolved to app routes
  - Code blocks with syntax highlighting — signal flow diagrams (ASCII), MIDI data
  - **Mermaid diagrams** — critical for visualizing signal path in sound design sessions
- **Full Obsidian compatibility** — tags (#tag rendered as filterable labels), embeds (![[file]] for inline content), and any other Obsidian syntax that renders in the vault should render in the app
- **Styled inline parameters** — parameter names get visual treatment (bold/monospace/colored) so they pop visually for ADHD scanning: **LPF Freq**: `50`

### Demo content strategy
- **Bundled copy of full curriculum** in the repo — sessions, patches, instrument docs. Same content as the real vault minus personal practice data
- Curriculum content is **public and shareable** — that's part of the value proposition. Only personal practice logs (daily notes, progress data) are private
- Demo mode reads from the bundle; local mode reads from the vault. Content reader returns identical data shapes either way (PIPE-02)
- Vault path configured via a **config file** in the project root (not env var)

### Claude's Discretion
- Exact Zod schema field names and types (within the decisions above)
- Content reader architecture and file I/O patterns
- Markdown rendering library choice (remark/rehype ecosystem, etc.)
- Mermaid rendering approach (client-side vs build-time)
- Config file format (JSON, YAML, or .ts)
- `npm run validate-content` script implementation

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Evolver reference materials
- `references/Evo_Key_Manual_1.3.pdf` — Official DSI operation manual: parameter reference, MIDI spec, SysEx format. Source for accurate parameter names and values in sessions
- `references/evolverguide.pdf` — "The Definitive Guide to Evolver" by Anu Kirk: pedagogical exercises, basic patch approach, progressive learning structure. Primary source for curriculum session content

### Existing curriculum structure
- `instruments/evolver/modules.md` — Module map with 10 modules, session allocations, dependency graph. To be revisited before writing
- `instruments/evolver/basic-patch.md` — Basic patch parameter dump (foundation for all sessions)
- `instruments/evolver/signal-flow.md` — Evolver signal flow documentation
- `instruments/evolver/overview.md` — Instrument architecture overview

### Framework and design
- `framework/adhd-design.md` — ADHD-aware learning design principles. Every session must conform to these
- `framework/README.md` — Reusable learning framework methodology

### Obsidian integration
- `obsidian/session-log-template.md` — Template for session logs in ~/song vault
- `obsidian/instrument-tracker.md` — Instrument tracking template

### Project architecture
- `.planning/PROJECT.md` — PM Toolkit vault reader pattern reference, constraints, key decisions
- `.planning/REQUIREMENTS.md` — PIPE-01 through PIPE-05, CURR-01 through CURR-05, INST-04 requirements

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- No Next.js app or content pipeline code exists yet — this is a greenfield build
- 7 session files exist as structural references (to be fully rewritten)
- Instrument data files (overview, signal-flow, basic-patch, modules) exist and need frontmatter added
- Obsidian templates exist and define the vault integration contract

### Established Patterns
- PM Toolkit pattern (referenced in PROJECT.md): Obsidian vault reader -> Next.js App Router -> server components read vault, client components handle interactivity. Zod schemas at boundaries. Demo mode with bundled content
- Session structure pattern: objective, setup, exercises with specific parameter values, output checklist, 5-min bail-out option
- ADHD design principles codified in `framework/adhd-design.md` — non-negotiable constraints on session design

### Integration Points
- Obsidian vault at ~/song — the content source for local mode
- Bundled content in repo — the content source for demo mode
- Config file in project root — vault path configuration
- `npm run validate-content` — content validation entry point

</code_context>

<specifics>
## Specific Ideas

- Mermaid diagrams are **critical** for signal path visualization in sound design sessions — not optional
- Existing 7 sessions were "generated just to get the idea going" — treat as disposable placeholders, not quality references
- Adversarial agent review approach for sessions: verify each session covers what it needs to, doesn't send learner down weird paths, and conforms to ADHD design principles
- Full Obsidian compatibility goal: if it renders in Obsidian, it should render in the app

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-content-pipeline-curriculum*
*Context gathered: 2026-03-29*
