# Phase 14: Learner State Foundation - Context

**Gathered:** 2026-04-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Users have persistent learning state that survives browser restarts — they can mark sessions complete, and the app remembers where they left off. This phase introduces Zustand with persist middleware as the first client-side state layer, a completion toggle on session detail pages, automatic last-visited tracking, vault+manual merge with union semantics, and a "continue where you left off" resume bar on the instrument home page.

</domain>

<decisions>
## Implementation Decisions

### Completion Toggle UX
- **D-01:** Sticky bottom bar on session detail page — always visible at bottom of viewport with checkbox and session title. Zero scroll needed
- **D-02:** Instant toggle, no confirmation dialog — one tap flips completion state. Undo by tapping again. Zero friction, matches ADHD low-activation-energy principle
- **D-03:** Completed state shows filled checkbox + "Completed" label with subtle success color. Still tappable to un-complete. Quiet, not celebratory

### Resume Bar Design
- **D-04:** Resume bar appears on instrument home page (`/instruments/[slug]`) — first thing you see when picking an instrument
- **D-05:** "Next session" logic: if last-visited session is incomplete, show that. Otherwise, show first incomplete session in sequence order. Simple, predictable
- **D-06:** When all sessions are complete, show "All complete" with link to freeform practice (challenges, patches, revisit favorites)

### Demo Mode Interaction
- **D-07:** Read-only synthetic journey in demo mode. Completion toggle is hidden or disabled. Resume bar shows next session in the synthetic journey. Visitors see what the app looks like mid-curriculum without modifying state

### State Merge Strategy
- **D-08:** Server passes vault-scanned completions as props; client Zustand store hydrates from localStorage, then unions with server-provided vault data on hydration. Single merge point on page load. Clean server/client boundary
- **D-09:** Keep both sources, ignore overlap — union semantics as specified. Manual toggles in localStorage are cheap and harmless. No deduplication logic

### Claude's Discretion
- Zustand store shape and internal API design
- Sticky bar animation/transition details
- Resume bar visual treatment (card style, accent color, hover state)
- Hydration timing and flash prevention strategy
- How last-visited tracking fires (on mount, on scroll, debounced)
- localStorage key naming and versioning strategy

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` (in git, deleted from working tree) — LSTATE-01 through LSTATE-04, NAV-01 requirements

### Existing progress system
- `src/lib/progress.ts` — Current server-side progress computation (scanDailyNotes, computeProgress, getSyntheticCompletedSessions). The merge strategy builds on top of this
- `src/lib/progress.test.ts` — Tests for progress computation
- `src/lib/synthetic-daily-notes.ts` — Synthetic completion data for demo mode (SYNTHETIC_COMPLETED_SESSIONS, SYNTHETIC_CASCADIA_COMPLETED_SESSIONS)
- `src/lib/sessions.ts` — groupByModule(), session navigation helpers

### Session detail pages
- `src/app/instruments/[slug]/sessions/[session]/page.tsx` — Session detail page where completion toggle will be added
- `src/app/instruments/[slug]/page.tsx` — Instrument home page where resume bar will appear

### Config and schemas
- `src/lib/config.ts` — Config loader with vault path / demo mode detection
- `src/lib/content/schemas.ts` — Session and Patch Zod schemas
- `src/lib/content/types.ts` — TypeScript types from schemas

### Prior phase context
- `.planning/phases/05-progress-challenges/05-CONTEXT.md` — Established binary completion model, additive-only progress philosophy, demo mode synthetic data pattern

### Project context
- `.planning/PROJECT.md` — ADHD constraints, vault-as-source-of-truth, demo/local split

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/progress.ts`: `scanDailyNotes()` — vault scanning for completion tags, returns `Set<number>` of completed session numbers. Will be the server-side data source for merge
- `src/lib/progress.ts`: `getSyntheticCompletedSessions()` — returns instrument-specific synthetic completions for demo mode
- `src/lib/progress.ts`: `computeProgress()` — computes module completion from session numbers, reusable for resume bar logic
- `src/lib/sessions.ts`: `groupByModule()` — groups sessions by module with ordering, useful for "first incomplete" logic
- `src/components/count-card.tsx` — Existing UI card component on progress page
- `src/app/instruments/[slug]/progress/page.tsx` — Progress page consuming completion data (integration point)

### Established Patterns
- Server components for data loading, client components for interactivity (Next.js App Router)
- Instrument-scoped routing: `/instruments/[slug]/...`
- Tailwind-only styling via CSS custom properties
- Demo mode detection via config (isDemo flag)
- Content validated via Zod at parse time

### Integration Points
- **New dependency:** Zustand (not yet installed — first client-side state management library)
- **Session detail page:** Add sticky bottom bar with completion toggle (client component)
- **Instrument home page:** Add resume bar component (client component consuming Zustand store + server-passed vault data)
- **Progress page:** Will consume merged completion data from Zustand store instead of only server-scanned data
- **Layout/providers:** Zustand provider or store initialization at app level

</code_context>

<specifics>
## Specific Ideas

- Sticky bottom bar should feel like a natural "I'm done" action at the end of a practice session — not a todo checkbox
- Resume bar should feel like opening a book to your bookmark — immediate, no decisions needed
- "All complete" state links to freeform practice rather than just celebrating, keeping the momentum going
- Demo mode is strictly read-only for state — visitors observe a mid-curriculum journey without confusion from interactive state
- Union merge is intentionally simple — no clever deduplication, no conflict resolution. Either source saying "complete" is enough

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 14-learner-state-foundation*
*Context gathered: 2026-04-05*
