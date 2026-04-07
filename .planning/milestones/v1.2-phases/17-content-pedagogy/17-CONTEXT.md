# Phase 17: Content & Pedagogy - Context

**Gathered:** 2026-04-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Users have troubleshooting support when stuck and transitional sessions that scaffold the move from guided to freeform practice. This phase delivers: (1) a symptom-based troubleshooting checklist per instrument, and (2) two partial recipe sessions per instrument that give the target sound and starting patch but leave key parameters as gaps with hints referencing prior sessions.

</domain>

<decisions>
## Implementation Decisions

### Troubleshooting Guide Format
- **D-01:** Symptom-based checklist format — each symptom is an H2 section with 3-5 ordered checkbox items to verify
- **D-02:** Specific parameter values in checks (e.g., "Master Vol > 80", "Osc1 Lvl > 80") — no ambiguity, zero decision fatigue
- **D-03:** One markdown file per instrument, colocated with existing instrument data: `src/content/instruments/<instrument>/troubleshooting.md`
- **D-04:** Content lives in the app (`src/content/`), NOT in the Obsidian vault — vault is for practice data and personal patches only. Uses a custom Zod schema for the troubleshooting content type

### Troubleshooting Guide Scope — Evolver
- **D-05:** Four symptom categories: No audio output, Filter sounds wrong, Modulation not working, MIDI/SysEx issues
- **D-06:** 3-5 checklist items per symptom, covering the most common causes

### Troubleshooting Guide Scope — Cascadia
- **D-07:** Four symptom categories: No audio output, No output from patch point, Unexpected sound behavior, Modulation routing issues
- **D-08:** 3-5 checklist items per symptom, tailored to Cascadia's semi-modular architecture (normalled connections, patch points, CV levels)

### Partial Recipe Session Design
- **D-09:** Sessions placed after existing curriculum — Evolver: sessions 36-37, Cascadia: sessions 26-27
- **D-10:** Two partial recipe sessions per instrument, each targeting a different sound type
- **D-11:** Structure: target sound description + starting patch + numbered steps with 2-3 key parameters left as blanks (underscores)
- **D-12:** Each gap includes a parenthetical hint referencing the specific prior session that covered the technique: "(hint: Session 06 covered detuning)"
- **D-13:** Uses existing session schema — no special `output_type` extension needed. Standard frontmatter with appropriate tags

### Navigation & Discovery
- **D-14:** Troubleshooting accessible via a card on the instrument home page (`/instruments/[slug]`), alongside Sessions, Patches, Progress
- **D-15:** Renders as its own route page: `/instruments/[slug]/troubleshooting` — bookmarkable, consistent with existing page pattern
- **D-16:** Partial recipe sessions appear in the session list with no special visual treatment — same row styling as regular sessions

### Claude's Discretion
- Troubleshooting card visual treatment (icon, description text, hover state)
- Specific checklist items per symptom (following manual references)
- Which sound types to use for partial recipes per instrument (e.g., bass + pad, texture + percussion)
- Which specific parameters to leave as gaps and which prior sessions to reference in hints
- Troubleshooting page layout (header, section spacing, visual treatment of checklist items)
- Zod schema shape for troubleshooting content type

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/milestones/v1.1-REQUIREMENTS.md` — CONTENT-01 (troubleshooting guides per instrument), CONTENT-02 (partial recipe sessions with gaps)

### Reference manuals (for troubleshooting content accuracy)
- `references/Evo_Key_Manual_1.3.pdf` — Official DSI Evolver manual: parameter reference, MIDI/SysEx, audio routing
- `references/evolverguide.pdf` — Anu Kirk's Evolver guide: pedagogical exercises, common issues
- `references/cascadia_manual_v1.1.pdf` — Official Intellijel Cascadia manual: modules, controls, normalled signal path, patch points

### Content pipeline
- `src/lib/content/reader.ts` — `listSessions()`, `listPatches()`, `getContentRoot()` — content loading from `src/content/`
- `src/lib/content/schemas.ts` — `SessionSchema` (title, module, tags, difficulty, output_type), existing Zod schemas at content boundary
- `src/lib/content/types.ts` — TypeScript types inferred from schemas

### Existing instrument data (where troubleshooting files will live)
- `src/content/instruments/evolver/` — overview.md, signal-flow.md (colocate troubleshooting.md here)
- `src/content/instruments/cascadia/` — overview.md, signal-flow.md (colocate troubleshooting.md here)

### Existing sessions (for partial recipe placement and hint references)
- `sessions/evolver/` — 35 sessions, ending at 35-integration-composition.md. New sessions: 36-37
- `sessions/cascadia/` — 25 sessions, ending at 25-sound-design-ambient.md. New sessions: 26-27
- `src/content/sessions/evolver/` — Bundled copy of Evolver sessions
- `src/content/sessions/cascadia/` — Bundled copy of Cascadia sessions

### Instrument home page (integration point for troubleshooting card)
- `src/app/instruments/[slug]/page.tsx` — Instrument home page where troubleshooting card will be added

### Prior phase context
- `.planning/phases/14-learner-state-foundation/14-CONTEXT.md` — Content lives in app, vault for practice data only. Demo mode patterns
- `.planning/PROJECT.md` — ADHD constraints, session design principles, content pipeline patterns

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `getContentRoot()` in `src/lib/content/reader.ts`: Returns `src/content/` path — troubleshooting content reads from same root
- `SessionSchema` in `src/lib/content/schemas.ts`: Template for creating a `TroubleshootingSchema` with appropriate frontmatter fields
- Instrument home page cards: Existing card layout on `/instruments/[slug]` — add troubleshooting card in same grid

### Established Patterns
- Server components load content from `src/content/`, client components handle interactivity
- Instrument-scoped routing: `/instruments/[slug]/...` — troubleshooting follows as `/instruments/[slug]/troubleshooting`
- Content validated via Zod at parse time
- Markdown rendered server-side with frontmatter parsed via gray-matter
- Session files numbered sequentially with kebab-case naming

### Integration Points
- **New route:** `src/app/instruments/[slug]/troubleshooting/page.tsx` — server component reading troubleshooting.md
- **Instrument home:** Add troubleshooting card to existing card grid on instrument home page
- **Content reader:** May need new `getTroubleshooting()` function or extend existing reader
- **Session files:** New sessions 36-37 (Evolver) and 26-27 (Cascadia) in both `sessions/` and `src/content/sessions/`

</code_context>

<specifics>
## Specific Ideas

- Troubleshooting checklist should feel like a quick reference card — glance at it, check the obvious things, get back to making sound
- Specific parameter values eliminate the "what does 'make sure volume is up' mean?" problem — exact numbers, exact parameter names from the manual
- Partial recipes should feel like a music teacher saying "make me a bass sound like this" and pointing at what you've already learned — not a test, a creative prompt
- Hints referencing prior sessions create a web of connections across the curriculum — reinforcing that everything builds on everything
- The troubleshooting card on instrument home should feel like a safety net — "if you get stuck, look here"

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 17-content-pedagogy*
*Context gathered: 2026-04-06*
