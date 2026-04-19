# Phase 32: Progress, Demo + Cross-Module Polish - Context

**Gathered:** 2026-04-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Per-module progress tracking in the Zustand learner store, demo mode with synthetic learner journeys for Maths and Plaits, cross-module session references via frontmatter, and category-based module suggestions on overview pages.

Requirements: PROG-01, PROG-02, PROG-03, XMOD-01, XMOD-02

</domain>

<decisions>
## Implementation Decisions

### Cross-Module References (XMOD-01)
- **D-01:** Cross-references authored as a `cross_references` array in session frontmatter (structured, queryable, validated by schema)
- **D-02:** Each cross-reference is an object with `ref` (module/session slug) and `reason` (short description of the connection). Example: `{ref: 'maths/03-slew-portamento', reason: 'Similar envelope shapes'}`
- **D-03:** Cross-references render as a "Related Sessions" card section at the bottom of the session page, showing module icon, session title, and the reason as subtitle
- **D-04:** Cross-references are auto-bidirectional — if session A references session B, session B's page automatically shows A in its Related Sessions section (computed at build time). Only one side needs the frontmatter entry

### Category Suggestions (XMOD-02)
- **D-05:** All modules sharing a category are shown in suggestions — no "owned" concept needed since this is a personal tool with curated modules only
- **D-06:** Category suggestions appear at the bottom of the module overview page, after the module's own content and session list
- **D-07:** Suggestions are grouped by category with separate headings (e.g., "Other VCOs", "Other Modulators"). Multi-category modules show multiple groups. Modules appearing in multiple groups are not deduplicated — the category context explains why they're related

### Claude's Discretion
- Zustand store key strategy for module completions (likely same `completions` record keyed by module slug, matching the existing instrument pattern)
- Synthetic journey pacing for Maths and Plaits demo data (follow ADHD-realistic pattern from Evolver/Cascadia/Octatrack)
- SessionSchema extension for `cross_references` field validation
- Prerequisite badge implementation for module sessions (reuse existing `getSessionState` + `prerequisite.ts` pattern)
- Related Sessions card component design and styling
- Which specific sessions get cross-references and what reasons to write

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Progress & Learner State
- `src/stores/learner-store.ts` — Zustand store with completions record, lastVisited, toggleCompletion. Key pattern: `completions[instrument] = number[]`
- `src/lib/progress.ts` — ProgressData interface, scanDailyNotes(), module completion map
- `src/lib/prerequisite.ts` — getSessionState() and getCurrentModule() — generic, takes completedSessions Set
- `src/lib/practice-metrics.ts` — Cumulative practice metrics calculation

### Demo Mode / Synthetic Data
- `src/lib/synthetic-daily-notes.ts` — SYNTHETIC_COMPLETED_SESSIONS for Evolver, Cascadia, Octatrack with ADHD-paced journey weeks. Pattern: exported `Set<number>` + journey weeks array
- `src/lib/config.ts` — Demo mode detection and config

### Session Schema
- `src/lib/content/schemas.ts` — SessionSchema definition (needs `cross_references` field addition)
- `src/lib/content/reader.ts` — discoverModules(), listSessions()

### Module Data
- `modules/*/module.json` — ModuleConfigSchema with categories array (multi-category support)
- `src/lib/sessions.ts` — groupByModule() for section-based grouping

### UI Components
- `src/components/completion-toggle.tsx` — Session completion toggle component
- `src/components/resume-bar.tsx` — Resume bar with last-visited tracking
- `src/components/session-list-client.tsx` — Client-side session list with learner store integration
- `src/components/instrument-module-card.tsx` — Module card component (reusable for category suggestions)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `useLearnerStore` (Zustand 5 + persist): Already keys completions by slug string — modules can use the same record with module slugs as keys
- `getSessionState()` and `getCurrentModule()`: Generic functions taking `completedSessions: Set<number>` — work for modules without modification
- `SYNTHETIC_*_COMPLETED_SESSIONS` pattern: Well-established for 3 instruments — adding Maths + Plaits follows the same export pattern
- `instrument-module-card.tsx`: Existing card component for module listings — reusable for category suggestion cards

### Established Patterns
- Synthetic data: `Set<number>` for completed sessions + `journey_weeks` array describing ADHD pacing narrative
- Progress: Server-side `scanDailyNotes()` merged with client-side `useLearnerStore` completions
- Prerequisite badges: `SessionState` type ('completed' | 'available' | 'locked') with soft visual gating

### Integration Points
- Module overview pages at `/modules/[slug]/` (Phase 27) — category suggestions section goes at bottom
- Session pages at `/modules/[slug]/sessions/[session]` — Related Sessions card goes at bottom
- `SessionSchema` in `schemas.ts` — needs `cross_references` optional field
- `synthetic-daily-notes.ts` — needs new exports for Maths and Plaits journeys

</code_context>

<specifics>
## Specific Ideas

- Cross-reference reason text should be pedagogically useful — explaining the connection helps learners build mental models across modules (e.g., "Apply this envelope technique to filter cutoff" rather than just "Related")
- Category suggestions grouped by heading mirror the multi-category taxonomy from Phase 26 — reinforces the concept that modules serve multiple roles in a rack
- Auto-bidirectional references reduce authoring burden — only need to author the reference on the session where the connection is most pedagogically relevant

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 32-progress-demo-cross-module-polish*
*Context gathered: 2026-04-19*
