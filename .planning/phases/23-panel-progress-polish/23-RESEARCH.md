# Phase 23: Panel & Progress Polish - Research

**Researched:** 2026-04-11
**Domain:** SVG animation (viewBox tween), data visualization (practice heatmap), CSS custom property audit
**Confidence:** HIGH

## Summary

Phase 23 has three distinct workstreams: (1) animating SVG viewBox transitions on panel visualizers using the motion library, (2) building a GitHub-style practice heatmap to replace the text-only CumulativeMetrics component, and (3) auditing/extending the `[data-instrument]` accent color cascade across all touchpoints.

The motion library (v12.38.0, locked by Phase 22) natively supports `<motion.svg viewBox>` animation, making the zoom tween straightforward. The heatmap is a pure client component that consumes the existing `completionDates` prop contract. The accent audit has a clear scope: the `[data-instrument="cascadia"]` CSS cascade swaps `--color-accent` to teal, but several hardcoded lime values exist in globals.css shadows and panel SVG glow effects that bypass the token system.

**Primary recommendation:** Implement viewBox tween via `motion.svg`, build PracticeHeatmap as a self-contained client component consuming the same prop interface as CumulativeMetrics, and fix hardcoded accent color references to use `var(--color-accent)` throughout.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Smooth viewBox tween using motion package (~300ms) from full panel to zoomed section. No crossfade or two-step transitions -- spatial zoom preserves context.
- **D-02:** Auto-zoom on page load for session pages with zoomSections. Brief full-panel flash (~200ms), then tween to zoom target. No click-to-zoom interaction needed.
- **D-03:** ViewBox framing IS the contextual focus -- no dimming or opacity treatment on non-relevant sections. Viewport narrowing achieves the same visual focus.
- **D-04:** Panel SVG internals (control positions, section bounds, SECTION_BOUNDS, CONTROL_METADATA) remain completely untouched. Only the `<svg viewBox>` attribute is animated.
- **D-05:** Practice heatmap (GitHub-style contribution grid) replaces the CumulativeMetrics text stats section. Each cell colored by intensity (sessions completed that day).
- **D-06:** Keep the existing 4 CountCards -- they provide at-a-glance numbers. Heatmap adds the temporal/streak view below.
- **D-07:** Heatmap shows 12 weeks (~3 months) of practice history.
- **D-08:** Heatmap cells use var(--color-accent) for intensity levels -- automatically adapts per instrument via existing data-instrument cascade.
- **D-09:** Audit + extend the existing `[data-instrument]` accent swap system. Verify all touchpoints. Fix gaps where accent is hardcoded rather than using the token.
- **D-10:** No secondary accent tints or visual motifs per instrument. Keep it to single `--color-accent` swap.
- **D-11:** Visual audit checklist covering every page/route for ADHD 5-second test. Human verification during UAT.
- **D-12:** No hard cap on simultaneous animations. Rule is "subtle + non-competing."

### Claude's Discretion
- Exact zoom tween duration and easing curve (within ~200-400ms range, using motion spring or tween)
- Heatmap cell size, grid layout, and intensity scale (number of opacity/color levels)
- Heatmap empty state when no practice data exists
- Which specific touchpoints need accent token fixes during the audit
- ModuleJourney visual enhancement (if any beyond accent color alignment)
- Click count baseline measurement approach for the ADHD audit

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SPEC-01 | User sees smooth panel visualizer zoom transitions and contextual dimming of non-relevant sections | motion.svg viewBox animation; D-03 reinterprets "dimming" as viewport narrowing |
| SPEC-02 | User sees an elevated progress page with data visualization instead of plain stat cards | PracticeHeatmap component replaces CumulativeMetrics; CountCards retained |
| TOKEN-06 | User sees subtly different accent colors for Evolver vs Cascadia sections | Accent audit of hardcoded values; extend [data-instrument] cascade coverage |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion | 12.38.0 | SVG viewBox tween animation | Locked by v1.3 research; native `<motion.svg viewBox>` support |
| React | 19.2.4 | UI components | Already installed |
| Next.js | 15.5.14 | App framework | Already installed |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | 2.1.1 | Conditional class composition | Already used throughout |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| motion viewBox | SMIL `<animate>` | No React integration, no spring physics, harder to tie to component lifecycle |
| Custom heatmap | cal-heatmap / nivo | Unnecessary dependency for a single component; custom is simpler with CSS grid |
| Chart library for progress | recharts / chart.js | Over-engineering; heatmap is the only viz element, pure CSS/SVG sufficient |

**Installation:** motion is installed in Phase 22. No new packages needed for Phase 23.

## Architecture Patterns

### Recommended Project Structure
```
src/
  components/
    practice-heatmap.tsx       # NEW - GitHub-style heatmap (client component)
    cumulative-metrics.tsx     # REPLACED (kept for reference, import swapped)
    evolver-panel.tsx          # MODIFIED - wrap <svg> with <motion.svg>
    cascadia-panel.tsx         # MODIFIED - wrap <svg> with <motion.svg>
    module-journey.tsx         # REVIEWED - verify accent token usage
    count-card.tsx             # UNTOUCHED
  components/__tests__/
    practice-heatmap.test.tsx  # NEW - heatmap unit tests
```

### Pattern 1: motion.svg viewBox Tween
**What:** Replace static `<svg viewBox={viewBox}>` with `<motion.svg animate={{ viewBox }}>` for smooth spatial zoom.
**When to use:** Both panel components when zoomSections prop is provided.
**Example:**
```typescript
// Source: https://motion.dev/docs/react-svg-animation
import { motion } from 'motion/react';

const fullViewBox = '0 0 1200 520';
const zoomedViewBox = computeZoomViewBox(zoomSections) ?? fullViewBox;

<motion.svg
  initial={{ viewBox: fullViewBox }}
  animate={{ viewBox: zoomedViewBox }}
  transition={{ duration: 0.3, ease: 'easeInOut' }}
  // ... existing props
>
```

### Pattern 2: CSS Grid Heatmap
**What:** 12-week x 7-day grid using CSS grid, cells colored by accent at varying opacities.
**When to use:** PracticeHeatmap component.
**Example:**
```typescript
// Grid: 7 rows (Mon-Sun) x N columns (weeks)
// Each cell: <div> with background opacity proportional to session count
<div style={{
  display: 'grid',
  gridTemplateRows: 'repeat(7, 1fr)',
  gridAutoFlow: 'column',
  gap: '2px',
}}>
  {cells.map(cell => (
    <div
      key={cell.date}
      style={{
        backgroundColor: cell.count > 0
          ? `color-mix(in oklch, var(--color-accent) ${intensityPercent(cell.count)}%, transparent)`
          : 'var(--color-surface)',
        width: cellSize,
        height: cellSize,
        borderRadius: '2px',
      }}
      title={`${cell.date}: ${cell.count} session(s)`}
    />
  ))}
</div>
```

### Pattern 3: Accent Token Cascade
**What:** All accent-colored elements use `var(--color-accent)` or Tailwind `text-accent`/`bg-accent`, never hardcoded color values.
**When to use:** Every component that currently references lime/accent colors.
**Existing pattern:**
```css
/* globals.css - already exists */
[data-instrument="cascadia"] {
  --color-accent: var(--color-accent-cascadia);
}
```

### Anti-Patterns to Avoid
- **Hardcoded accent in shadows/glows:** `oklch(0.85 0.18 105 / 0.08)` in `--shadow-card-hover` won't respond to instrument cascade. Must use `var(--color-accent)` in a way that works with shadow syntax.
- **Animating SVG internals:** D-04 explicitly forbids touching control positions, section bounds, or CONTROL_METADATA. Only the outer `<svg>` viewBox attribute changes.
- **Building a charting library dependency:** The heatmap is a simple grid of colored cells. No chart library needed.
- **Using `motion()` wrapper on existing SVG:** Known bug -- viewBox animation only works with `<motion.svg>`, not `motion(ExistingSvgComponent)`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SVG viewBox animation | requestAnimationFrame loop with interpolation | `<motion.svg animate={{ viewBox }}>` | motion handles interpolation of all 4 viewBox values, spring/tween physics, and cancellation |
| Reduced motion detection | Manual matchMedia listener | CSS `@media (prefers-reduced-motion)` + motion's built-in respect | motion already skips animations when reduced motion is preferred |
| Date grid computation | Manual week/day math | Leverage `Date` API with ISO week calculation (already in practice-metrics.ts) | `getISOWeekKey` already exists, extend for heatmap grid |

## Common Pitfalls

### Pitfall 1: motion.svg vs motion() wrapper
**What goes wrong:** Using `motion(SvgComponent)` to wrap an existing component doesn't animate viewBox.
**Why it happens:** motion's viewBox interpolation only works on the native `<motion.svg>` element, not wrapped components (documented GitHub issue #1177).
**How to avoid:** Change `<svg>` to `<motion.svg>` directly in the panel component's JSX. Since both panels are 'use client' already, the import is straightforward.
**Warning signs:** viewBox snaps instead of tweening.

### Pitfall 2: Hardcoded accent in CSS shadows
**What goes wrong:** `--shadow-card-hover` uses `oklch(0.85 0.18 105 / 0.08)` -- this is Evolver's lime color hardcoded. On Cascadia pages, card hover shadows will still glow lime instead of teal.
**Why it happens:** CSS custom properties can't be used inside `box-shadow` declarations with alpha channel easily (no `color-mix` in older shadow syntax).
**How to avoid:** Use `color-mix(in oklch, var(--color-accent) 8%, transparent)` for shadow colors, or define `--shadow-card-hover` per instrument. The `color-mix` approach is already used elsewhere in the project.
**Warning signs:** Card shadows look wrong on Cascadia pages.

### Pitfall 3: Panel glow uses hardcoded #c8ff00
**What goes wrong:** Both `evolver-panel.tsx` (line 169) and `cascadia-panel.tsx` (line 614) use `fill="#c8ff00"` for highlight glow circles. This means Cascadia panel highlights glow lime instead of teal.
**Why it happens:** Panel SVGs use inline styles, not CSS custom properties.
**How to avoid:** Replace `#c8ff00` with `var(--color-accent)` in the glow circle fill. SVG `fill` supports CSS custom properties when the SVG is inline (which both panels are). D-04 says internals are frozen, but glow circles are part of the *interaction layer*, not the panel layout -- clarify with the user if this counts.
**Warning signs:** Cascadia panel highlights look off-brand.

### Pitfall 4: Heatmap date alignment
**What goes wrong:** Heatmap grid doesn't align weeks to Monday (ISO standard) or shows wrong day-of-week.
**Why it happens:** JavaScript `Date.getDay()` returns 0=Sunday, but ISO weeks start Monday.
**How to avoid:** Use the existing `getISOWeekKey` pattern from practice-metrics.ts. Normalize day index: `(date.getDay() + 6) % 7` for Monday=0.
**Warning signs:** Grid columns don't represent clean weeks; cells misaligned.

### Pitfall 5: Heatmap opacity vs color-mix
**What goes wrong:** Using `opacity` on cells dims the background too, making cells invisible on dark surfaces.
**Why it happens:** `opacity` affects the entire element including borders.
**How to avoid:** Use `color-mix` or `oklch` alpha channel on `background-color` only, not element `opacity`.
**Warning signs:** Low-intensity cells are invisible against the dark background.

### Pitfall 6: pulse-glow keyframe hardcodes accent
**What goes wrong:** The `@keyframes pulse-glow` in globals.css uses `oklch(0.85 0.18 105 / 0.4)` -- hardcoded lime.
**Why it happens:** CSS keyframes can't use custom properties in all browsers (though modern browsers support it).
**How to avoid:** Replace with `var(--color-accent)` inside the keyframe. Modern browsers (all targets for this app) support custom properties in keyframes.
**Warning signs:** ModuleJourney current-module dot pulses lime on Cascadia pages.

## Code Examples

### ViewBox Animation (Both Panel Components)
```typescript
// Replace: <svg viewBox={viewBox} ...>
// With:
import { motion } from 'motion/react';

const fullViewBox = '0 0 1200 520'; // or '0 0 1000 580' for Cascadia

function EvolverPanelInner({ zoomSections, ...props }: EvolverPanelProps) {
  const zoomedViewBox = zoomSections?.length
    ? computeZoomViewBox(zoomSections)
    : null;
  const targetViewBox = zoomedViewBox ?? fullViewBox;

  return (
    <motion.svg
      ref={svgRef}
      viewBox={fullViewBox}
      animate={{ viewBox: targetViewBox }}
      transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
      // ... rest of existing svg props
    >
      {/* existing children unchanged */}
    </motion.svg>
  );
}
```

### Heatmap Data Utility
```typescript
// New function in practice-metrics.ts
export function getHeatmapData(
  completionDates: string[],
  weeks: number = 12,
): Array<{ date: string; count: number; dayOfWeek: number; weekIndex: number }> {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - weeks * 7 + 1);
  // Align to Monday
  const dayOffset = (startDate.getDay() + 6) % 7;
  startDate.setDate(startDate.getDate() - dayOffset);

  const dateCountMap = new Map<string, number>();
  for (const d of completionDates) {
    dateCountMap.set(d, (dateCountMap.get(d) ?? 0) + 1);
  }

  const cells = [];
  const cursor = new Date(startDate);
  for (let w = 0; cursor <= today; w++) {
    for (let d = 0; d < 7 && cursor <= today; d++) {
      const iso = cursor.toISOString().slice(0, 10);
      cells.push({
        date: iso,
        count: dateCountMap.get(iso) ?? 0,
        dayOfWeek: d,
        weekIndex: w,
      });
      cursor.setDate(cursor.getDate() + 1);
    }
  }
  return cells;
}
```

### Accent Color Audit Fixes
```css
/* globals.css: replace hardcoded lime in shadows */

/* BEFORE */
--shadow-card-hover: 0 4px 12px oklch(0.85 0.18 105 / 0.08);

/* AFTER - use a separate accent shadow token */
--shadow-accent-glow: oklch(from var(--color-accent) l c h / 0.08);
--shadow-card-hover: 0 4px 12px var(--shadow-accent-glow);

/* BEFORE (pulse-glow keyframe) */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 oklch(0.85 0.18 105 / 0.4); }
  50% { box-shadow: 0 0 0 6px oklch(0.85 0.18 105 / 0); }
}

/* AFTER */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 oklch(from var(--color-accent) l c h / 0.4); }
  50% { box-shadow: 0 0 0 6px oklch(from var(--color-accent) l c h / 0); }
}
```

## Accent Audit: Known Hardcoded References

| Location | Line(s) | Value | Fix |
|----------|---------|-------|-----|
| `globals.css` `--shadow-card-hover` | ~57 | `oklch(0.85 0.18 105 / 0.08)` | Use `oklch(from var(--color-accent) ...)` or separate token |
| `globals.css` `.card:hover` | ~109 | `oklch(0.85 0.18 105 / 0.06)` | Same approach |
| `globals.css` `@keyframes pulse-glow` | ~401-402 | `oklch(0.85 0.18 105 / 0.4)` and `0` alpha | Replace with var-based |
| `evolver-panel.tsx` glow circle | ~169 | `#c8ff00` | `var(--color-accent)` in SVG fill |
| `cascadia-panel.tsx` glow circle | ~614 | `#c8ff00` | `var(--color-accent)` in SVG fill |
| `tokens.test.ts` | ~134 | Asserts `#c8ff00` not in theme (already passing) | May need update if panel glow changes |

**Components already using tokens correctly:** nav.tsx (`bg-accent`), count-card.tsx (`text-accent`), module-journey.tsx (`bg-accent`), session-row.tsx (`var(--color-accent)`), hero-card.tsx (`bg-accent`), cumulative-metrics.tsx (`text-accent`).

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| framer-motion | motion (same team, rebranded) | 2024 | Import path changed to `motion/react` |
| CSS viewBox animation via SMIL | motion.svg viewBox prop | motion v10+ | Declarative React-friendly viewBox tween |
| opacity-based cell intensity | color-mix() / oklch relative syntax | CSS Color Level 5 (2024+) | Alpha channel on background only, not whole element |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | vitest 3.0.0 + @testing-library/react 16.3.2 |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SPEC-01 | Panel viewBox is animated (motion.svg used, viewBox prop correct) | unit | `npx vitest run src/components/__tests__/evolver-panel.test.tsx -x` | Exists (needs update) |
| SPEC-01 | Cascadia panel viewBox animated | unit | `npx vitest run src/components/__tests__/cascadia-panel.test.tsx -x` | Exists (needs update) |
| SPEC-02 | PracticeHeatmap renders grid cells with correct date range | unit | `npx vitest run src/components/__tests__/practice-heatmap.test.tsx -x` | Wave 0 |
| SPEC-02 | PracticeHeatmap empty state | unit | `npx vitest run src/components/__tests__/practice-heatmap.test.tsx -x` | Wave 0 |
| SPEC-02 | getHeatmapData utility returns correct cells | unit | `npx vitest run src/lib/__tests__/practice-metrics.test.ts -x` | Exists (needs new tests) |
| TOKEN-06 | No hardcoded lime accent values outside primitives | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | Exists (extend assertions) |
| TOKEN-06 | Accent cascade works on Cascadia instrument pages | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | Exists (may need extension) |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/components/__tests__/practice-heatmap.test.tsx` -- covers SPEC-02 heatmap rendering + empty state
- [ ] Extend `src/lib/__tests__/practice-metrics.test.ts` -- add `getHeatmapData` tests
- [ ] Extend `src/app/__tests__/tokens.test.ts` -- verify no hardcoded lime in shadows/keyframes
- [ ] Update panel tests to verify `motion.svg` usage (or mock motion and verify viewBox prop)

## Open Questions

1. **Panel glow `#c8ff00` -- does D-04 "internals frozen" include glow circles?**
   - What we know: D-04 says "control positions, section bounds, SECTION_BOUNDS, CONTROL_METADATA" are untouched. Glow circles are rendering-layer, not data-layer.
   - What's unclear: Whether changing `fill="#c8ff00"` to `fill="var(--color-accent)"` counts as touching "internals."
   - Recommendation: It's a color value, not a position/layout. Fix it as part of TOKEN-06 accent audit. The spirit of D-04 is "don't move controls around."

2. **`oklch(from ...)` relative color syntax browser support**
   - What we know: Supported in Chrome 119+, Safari 16.4+, Firefox 128+. This is a single-user app targeting modern browsers.
   - What's unclear: Whether the project has a formal browser support target.
   - Recommendation: Use it. If concerns arise, fallback to separate `--shadow-accent-*` tokens per instrument in the `[data-instrument]` block.

3. **ADHD 5-second test -- automated or manual?**
   - What we know: D-11 says "human verification during UAT."
   - What's unclear: Whether any automated checks are expected beyond the visual audit.
   - Recommendation: Create a checklist document as a task output. Automated tests verify structural properties (no competing auto-animations, click count), but the 5-second test is inherently subjective.

## Sources

### Primary (HIGH confidence)
- [motion.dev SVG animation docs](https://motion.dev/docs/react-svg-animation) -- viewBox animation syntax
- [motion.dev animate() docs](https://motion.dev/docs/animate) -- transition config options
- Project source code: `evolver-panel.tsx`, `cascadia-panel.tsx`, `globals.css`, `practice-metrics.ts`, `cumulative-metrics.tsx`

### Secondary (MEDIUM confidence)
- [GitHub issue #1177](https://github.com/motiondivision/motion/issues/1177) -- viewBox only works on `<motion.svg>`, not `motion()` wrapper

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- motion already locked, no new deps needed
- Architecture: HIGH -- existing code patterns well understood, motion viewBox docs verified
- Pitfalls: HIGH -- hardcoded accent values found via grep, motion wrapper bug documented in issue tracker

**Research date:** 2026-04-11
**Valid until:** 2026-05-11 (stable domain, no fast-moving dependencies)
