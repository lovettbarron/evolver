# Phase 23: Panel & Progress Polish - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Polished panel visualizer zoom transitions (smooth viewBox tween via motion), elevated progress page with practice heatmap visualization, audit/extension of per-instrument accent color identity, and ADHD 5-second test verification across all pages. Panel SVG internals remain untouched — only the container/viewport animation layer changes.

Requirements: SPEC-01, SPEC-02, TOKEN-06

</domain>

<decisions>
## Implementation Decisions

### Panel Zoom Transitions
- **D-01:** Smooth viewBox tween using motion package (~300ms) from full panel to zoomed section. No crossfade or two-step transitions — spatial zoom preserves context.
- **D-02:** Auto-zoom on page load for session pages with zoomSections. Brief full-panel flash (~200ms), then tween to zoom target. No click-to-zoom interaction needed.
- **D-03:** ViewBox framing IS the contextual focus — no dimming or opacity treatment on non-relevant sections. The tween naturally pushes non-zoomed areas out of frame. This reinterprets the "contextual dimming" success criterion: viewport narrowing achieves the same visual focus.
- **D-04:** Panel SVG internals (control positions, section bounds, SECTION_BOUNDS, CONTROL_METADATA) remain completely untouched. Only the `<svg viewBox>` attribute is animated.

### Progress Visualization
- **D-05:** Practice heatmap (GitHub-style contribution grid) replaces the CumulativeMetrics text stats section. Each cell colored by intensity (sessions completed that day).
- **D-06:** Keep the existing 4 CountCards (sessions, patches, modules, challenges) — they provide at-a-glance numbers. Heatmap adds the temporal/streak view below.
- **D-07:** Heatmap shows 12 weeks (~3 months) of practice history. Covers the ~10-week curriculum timeframe without overwhelming.
- **D-08:** Heatmap cells use var(--color-accent) for intensity levels — automatically adapts per instrument via the existing data-instrument cascade (lime for Evolver, teal for Cascadia).

### Per-Instrument Accent Identity
- **D-09:** Audit + extend the existing `[data-instrument]` accent swap system. Verify it covers all touchpoints: nav highlights, card hover borders, focus rings, progress indicators, heatmap cells, ModuleJourney dots. Fix any gaps where accent is hardcoded rather than using the token.
- **D-10:** No secondary accent tints (tinted backgrounds/surfaces) or visual motifs per instrument. Keep it to the single `--color-accent` swap.

### ADHD 5-Second Test
- **D-11:** Visual audit checklist covering every page/route. For each page: verify single clear visual hierarchy (one focal point), no competing animations, click count audit (same or fewer clicks than pre-redesign). Human verification during UAT.
- **D-12:** No hard cap on simultaneous animations. Rule is "subtle + non-competing": no auto-looping animations, stagger delays prevent overload, all animations are understated (Phase 22 D-08). The eye should have one clear place to look, but background fades are fine.

### Claude's Discretion
- Exact zoom tween duration and easing curve (within ~200-400ms range, using motion spring or tween)
- Heatmap cell size, grid layout, and intensity scale (number of opacity/color levels)
- Heatmap empty state when no practice data exists
- Which specific touchpoints need accent token fixes during the audit
- ModuleJourney visual enhancement (if any beyond accent color alignment)
- Click count baseline measurement approach for the ADHD audit

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Panel Visualizers
- `src/components/evolver-panel.tsx` — EvolverPanel component with zoomSections/activeSections props, computeZoomViewBox function
- `src/components/cascadia-panel.tsx` — CascadiaPanel component with same zoom interface plus cable rendering
- `src/lib/evolver-panel-data.ts` — CONTROL_METADATA, SECTION_BOUNDS for Evolver panel
- `src/lib/cascadia-panel-data.ts` — CONTROL_METADATA, SECTION_BOUNDS for Cascadia panel

### Progress Page
- `src/app/instruments/[slug]/progress/page.tsx` — Current progress page (CountCards + ModuleJourney + CumulativeMetrics)
- `src/components/cumulative-metrics.tsx` — Text-only stats component to be REPLACED with heatmap
- `src/components/count-card.tsx` — Stat cards to KEEP
- `src/components/module-journey.tsx` — Dot strip to KEEP (verify accent color alignment)
- `src/lib/practice-metrics.ts` — getSessionsThisMonth, getActiveWeeks (data source for heatmap)
- `src/lib/progress.ts` — computeProgress function

### Accent System
- `src/app/globals.css` — `[data-instrument="cascadia"]` block, `--color-accent-cascadia` token
- `src/components/app-shell.tsx` — Sets data-instrument attribute on root element

### Motion (from Phase 22)
- `.planning/phases/22-interactive-elements-motion/22-CONTEXT.md` — Motion package decisions, spring personality, prefers-reduced-motion handling
- `package.json` — motion@^12.38.0 (installed in Phase 22)

### Design System (from prior phases)
- `.planning/phases/18-token-foundation/18-CONTEXT.md` — OKLCH palette, surface elevations, spacing tokens
- `.planning/phases/21-cards-content-components/21-CONTEXT.md` — Card unification, .card base class

### Requirements
- `.planning/REQUIREMENTS.md` — SPEC-01 (panel zoom), SPEC-02 (progress viz), TOKEN-06 (accent identity)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `computeZoomViewBox()` in both panel components — already computes target viewBox from SECTION_BOUNDS. Just needs animated transition instead of instant swap.
- `[data-instrument]` CSS cascade — accent swap infrastructure already built. Heatmap and other new elements get accent color for free by using var(--color-accent).
- `CumulativeMetrics` component — provides the data interface (completionDates as ISO strings) that heatmap will consume. Replace the component, keep the prop contract.
- `getSessionsThisMonth()`, `getActiveWeeks()` in practice-metrics.ts — existing data aggregation. Heatmap needs per-day data, may need new utility.
- motion package (Phase 22) — available for viewBox tween animation. `animate()` or `motion.svg` wrapper.

### Established Patterns
- Panel components are `'use client'` with useState/useRef — animation fits naturally
- Progress page is a server component — heatmap component needs to be client-side for interactivity (hover tooltips on cells)
- All animations respect `prefers-reduced-motion` (Phase 22 D-09) — zoom tween and heatmap must follow this

### Integration Points
- Panel components: wrap or animate the `<svg viewBox>` attribute using motion
- Progress page: swap `<CumulativeMetrics>` import for new `<PracticeHeatmap>` component
- globals.css: may need heatmap intensity CSS custom properties
- ADHD audit: touches all pages/routes — verification task, not implementation

</code_context>

<specifics>
## Specific Ideas

- The zoom tween should feel like the camera is smoothly gliding to the relevant panel section — spatial, not a cut
- Practice heatmap should be immediately motivating: seeing a streak of colored cells reinforces consistency
- The 12-week window covers roughly the Evolver curriculum length, making it a natural "course completion" view
- Accent-colored heatmap cells create a subtle but recognizable instrument identity even on the progress page

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 23-panel-progress-polish*
*Context gathered: 2026-04-11*
