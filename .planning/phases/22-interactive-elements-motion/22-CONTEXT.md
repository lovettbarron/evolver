# Phase 22: Interactive Elements & Motion - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Micro-interactions on hover (spring physics via motion package), scroll-reveal animations for content entering the viewport, and a completion celebration animation on session toggle. All motion respects `prefers-reduced-motion`. This phase does NOT touch panel visualizer zoom (Phase 23), page transitions (future), or card/component visual styling (Phase 21).

Requirements: COMP-03, COMP-04

</domain>

<decisions>
## Implementation Decisions

### Hover Micro-Interactions
- **D-01:** Motion springs replace Phase 21's CSS `transition-all` on card hover. All card types (HeroCard, PatchCard, ModuleCard, InstrumentCard, CountCard) use motion spring for lift + shadow instead of CSS transitions. One system, one feel.
- **D-02:** Claude's discretion on which non-card elements get spring hover (nav links, buttons, session rows). Pick what feels natural — not everything needs springs.

### Scroll Reveal
- **D-03:** Fade-up reveal — elements fade in + translate ~12-16px upward as they enter the viewport. Classic vertical scroll feel.
- **D-04:** Subtle stagger for grid/list siblings — ~50ms delay between items in a group (card grids, session rows). Gives a gentle cascade without feeling slow.
- **D-05:** Scroll reveal applies to content sections, card grids, and list groups. Not to navigation, headers, or persistent UI elements.

### Completion Celebration
- **D-06:** Checkmark spring + color pulse on completion — check icon springs in with overshoot, button background pulses accent color briefly then settles. Satisfying but contained within button bounds.
- **D-07:** Quick fade-out (~100ms) on uncomplete — check fades out, button returns to default smoothly. No celebration on undo.

### Motion Intensity & Accessibility
- **D-08:** Understated & precise personality — low bounce, quick settle, snappy not wobbly. Think Apple iOS springs. Motion exists but doesn't demand attention. Critical for ADHD-friendliness.
- **D-09:** `prefers-reduced-motion` disables ALL animation — zero springs, zero fade-in, zero celebration. Elements appear in final state immediately. Cleanest accessibility story.

### Claude's Discretion
- Which non-card elements benefit from spring hover (nav links, buttons, session rows, etc.)
- Exact spring config values (stiffness, damping) within the "understated & precise" personality
- Whether scroll reveal uses `motion`'s `useInView` or a lighter `IntersectionObserver` wrapper
- Stagger implementation detail (CSS animation-delay vs motion orchestration)
- Whether to create reusable motion wrapper components or inline motion on each element

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Motion Library
- `package.json` — motion@^12.38.0 locked as only animation dependency (v1.3 Research decision). Not yet installed — this phase adds it.

### Components to Animate
- `src/components/hero-card.tsx` — Primary CTA card, gets spring hover
- `src/components/patch-card.tsx` — Patch listing card, gets spring hover
- `src/components/module-card.tsx` — Module listing card, gets spring hover
- `src/components/instrument-card.tsx` — Instrument picker card, gets spring hover
- `src/components/count-card.tsx` — Stat counter card, gets spring hover (already has translate-y hover)
- `src/components/completion-toggle.tsx` — Session completion button, gets spring celebration + pulse
- `src/components/session-row.tsx` — Session list item (spring hover at Claude's discretion)

### Scroll Reveal Targets
- `src/components/patch-grid.tsx` — Card grid needing staggered reveal
- `src/components/module-index.tsx` — Module card grid needing staggered reveal
- `src/components/session-list-client.tsx` — Session row list needing staggered reveal
- `src/components/instrument-overview.tsx` — Page sections needing fade-up reveal

### Existing Animation Patterns
- `src/app/globals.css` — Has `prefers-reduced-motion` rules, `@keyframes pulse-glow`, existing CSS animations
- `src/components/nav.tsx` — Uses `motion-safe:animate-[slideDown_150ms]` pattern (Tailwind motion-safe prefix)
- `src/components/module-journey.tsx` — Uses `animate-pulse-glow` CSS keyframes

### Design System (from prior phases)
- `.planning/phases/18-token-foundation/18-CONTEXT.md` — OKLCH palette, spacing tokens
- `.planning/phases/21-cards-content-components/21-CONTEXT.md` — Card hover specs (D-10: border-accent + 2px lift + accent shadow ~150ms) that this phase replaces with springs

### Requirements
- `.planning/REQUIREMENTS.md` — COMP-03 (micro-interactions), COMP-04 (scroll fade-in)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `motion-safe:` / `motion-reduce:` Tailwind prefixes already used in nav.tsx — established pattern for motion accessibility
- `@keyframes pulse-glow` in globals.css — existing custom animation keyframe
- `useHydrated` hook — useful for preventing SSR flash before client-side motion initializes
- Phase 21 `.card` base class — all card hover CSS lives here, single place to swap for spring

### Established Patterns
- Cards use Next.js `<Link>` as clickable wrapper — motion needs to wrap or replace the transition layer, not the Link
- `dangerouslySetInnerHTML` for session content — scroll reveal wraps containers, not individual HTML elements
- All animation currently CSS-only — this phase introduces the first JS-driven animation via motion package

### Integration Points
- `package.json` — install motion@^12.38.0
- Card components (5 files) — wrap or replace CSS hover with motion spring
- `completion-toggle.tsx` — add spring entrance for check icon + color pulse
- Grid/list containers — wrap with scroll-reveal component or hook
- `globals.css` — update `prefers-reduced-motion` media query to disable motion library animations

</code_context>

<specifics>
## Specific Ideas

- Spring personality is "understated & precise" — reference Apple iOS springs for the right feel. Low bounce, quick settle.
- Completion celebration is self-contained within the button — no particles or effects that escape the element bounds
- Stagger gives a cascade feel on card grids (~50ms between items) but should never make the page feel slow to populate
- Phase 21's CSS hover values (border-accent, 2px lift, accent shadow at 0.06 opacity) should transfer to spring targets — same visual result, different physics

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 22-interactive-elements-motion*
*Context gathered: 2026-04-11*
