# Phase 15: Navigation & Progress Enhancements - Context

**Gathered:** 2026-04-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Users can see their position in the curriculum at a glance. This phase adds prerequisite state badges to the session list, makes count cards clickable on the progress page, adds a "you are here" marker to the module journey, and introduces cumulative practice metrics. Depends on Phase 14's Zustand completion state for prerequisite/completion data.

</domain>

<decisions>
## Implementation Decisions

### Prerequisite State Badges
- **D-01:** Icon badges left of session number — checkmark for completed, open-circle for available, lock for locked. Small, scannable at a glance
- **D-02:** Locked sessions show inline hint text "Requires #NN" next to the lock icon, telling the learner exactly what to complete next
- **D-03:** Prerequisite state derived from `prerequisite` field in session schema (already `z.number() | z.null()`) combined with completion data from Zustand store

### Soft Gating Behavior
- **D-04:** Tapping a locked session navigates to the session page (no blocking) but shows a dismissible info banner at top: "This session builds on Session #NN — complete it first for the best experience"
- **D-05:** Banner includes a clickable link to the prerequisite session — one tap to get back on track
- **D-06:** Soft gating is informational only, never blocks navigation. ADHD-friendly: no friction, just a nudge

### Count Card Destinations
- **D-07:** Each count card links to the most relevant existing content page: Sessions Completed → /sessions, Patches Created → /patches, Modules Done → /modules, Challenges Completed → /sessions (challenges section)
- **D-08:** Subtle hover lift affordance — slight shadow elevation + cursor pointer on hover. Discoverable but not distracting

### You Are Here Marker
- **D-09:** Current module gets a pulsing/glowing accent dot — visually distinct from completed (solid filled) and future (outline). Draws the eye naturally
- **D-10:** "Current module" defined as the module containing the first incomplete session in sequence order. Deterministic, aligns with Phase 14's resume bar "next session" logic
- **D-11:** When all modules complete, no pulsing dot — all dots are solid (celebratory state)

### Cumulative Practice Metrics
- **D-12:** New metrics section on progress page showing "Sessions this month" and "Total active weeks"
- **D-13:** An "active week" is any week where at least one session was marked complete. Simple, motivating — even one session counts
- **D-14:** Metrics are additive-only and never guilt-inducing per project ADHD principles

### Claude's Discretion
- Specific icon choices (SVG icons, emoji, or CSS shapes for lock/check/circle)
- Banner dismissal behavior (X button, auto-dismiss, or persistent per visit)
- Pulsing animation implementation (CSS animation, keyframes, timing)
- How "sessions this month" is computed (calendar month vs rolling 30 days)
- Count card hover transition timing and shadow values
- Layout of cumulative metrics within the progress page

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase dependencies
- `.planning/phases/14-learner-state-foundation/14-CONTEXT.md` — Zustand store shape, completion toggle, resume bar, vault+manual merge strategy. Phase 15 reads from this state layer

### Existing components to modify
- `src/components/count-card.tsx` — Current static CountCard, needs clickable wrapper + hover affordance
- `src/components/module-journey.tsx` — Current dot visualization, needs pulsing "you are here" marker
- `src/components/session-list.tsx` — Session list consuming SessionRow, needs prerequisite state badges
- `src/components/session-row.tsx` — Individual row component, needs icon badge + inline prerequisite hint

### Progress system
- `src/lib/progress.ts` — `computeProgress()`, `scanDailyNotes()`, `getSyntheticCompletedSessions()`. Source for completion data
- `src/lib/sessions.ts` — `groupByModule()`, session ordering. Used for "first incomplete" logic
- `src/app/instruments/[slug]/progress/page.tsx` — Progress page where count cards and metrics live

### Session pages
- `src/app/instruments/[slug]/sessions/[id]/page.tsx` — Session detail page where prerequisite banner appears
- `src/app/instruments/[slug]/sessions/page.tsx` — Session list page consuming SessionList

### Schemas
- `src/lib/content/schemas.ts` — Session schema with `prerequisite: z.number() | z.null()` field

### Project context
- `.planning/PROJECT.md` — ADHD constraints, additive-only progress philosophy, demo/local split

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `CountCard` component (`src/components/count-card.tsx`): Simple div with count + label. Needs wrapping in a Link and adding hover styles
- `ModuleJourney` component (`src/components/module-journey.tsx`): Dot-based module visualization with complete/incomplete states. Needs a third "current" state with pulsing animation
- `SessionRow` component: Renders session number, title, duration. Needs icon badge slot and optional prerequisite hint text
- `computeProgress()` in `src/lib/progress.ts`: Already computes module completion map — can derive "current module" from first incomplete entry

### Established Patterns
- Server components for data loading, client components for interactivity (Next.js App Router)
- Instrument-scoped routing: `/instruments/[slug]/...`
- Tailwind-only styling via CSS custom properties
- Demo mode detection via config (isDemo flag)
- Phase 14 introduces Zustand with persist middleware as first client-side state layer

### Integration Points
- **Session list page**: Needs completion data from Zustand store (Phase 14) to compute prerequisite states for each session row
- **Session detail page**: Needs prerequisite check to conditionally render soft-gating banner
- **Progress page**: CountCard wrapping in Link components, new cumulative metrics section below existing cards
- **ModuleJourney**: Needs "current module" prop derived from first-incomplete-session logic

</code_context>

<specifics>
## Specific Ideas

- Prerequisite badges should be instantly scannable — a quick glance at the session list tells you where you are in the curriculum
- Soft gating banner is a nudge, not a wall — matches the ADHD principle of zero friction
- "You are here" pulsing dot should feel like a GPS marker on a map — "you are right here, keep going"
- Cumulative metrics should feel encouraging — "3 active weeks" is a celebration, not "you missed 2 weeks"
- Count cards becoming clickable is a natural discovery — hover lift makes it feel like "oh, I can explore this"

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 15-navigation-progress-enhancements*
*Context gathered: 2026-04-05*
