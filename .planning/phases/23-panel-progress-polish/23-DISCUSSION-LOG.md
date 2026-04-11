# Phase 23: Panel & Progress Polish - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-11
**Phase:** 23-panel-progress-polish
**Areas discussed:** Panel zoom transitions, Progress visualization, Per-instrument accent identity, ADHD 5-second test

---

## Panel Zoom Transitions

| Option | Description | Selected |
|--------|-------------|----------|
| Smooth viewBox tween | Animate SVG viewBox from full panel to zoomed section over ~300ms using motion | ✓ |
| Zoom + contextual dim | Animate viewBox AND fade non-relevant sections to ~20% opacity | |
| Crossfade transition | Fade out full panel, fade in zoomed view | |

**User's choice:** Smooth viewBox tween
**Notes:** None

### Zoom Trigger

| Option | Description | Selected |
|--------|-------------|----------|
| Auto-zoom on load | Session pages with zoomSections auto-zoom after brief full-panel flash | ✓ |
| Click-to-zoom | Panel starts at full view, user clicks to zoom | |
| Both — auto on load, click to toggle | Auto-zoom on session pages, click to toggle anytime | |

**User's choice:** Auto-zoom on load
**Notes:** None

### Dimming Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| ViewBox only — no dimming | ViewBox tween naturally pushes non-relevant sections out of frame | ✓ |
| Subtle opacity fade on non-relevant | Sections outside zoom fade to ~30% during tween | |
| Blur + dim non-relevant | Gaussian blur + opacity reduction | |

**User's choice:** ViewBox only — no dimming
**Notes:** None

### Success Criterion Reinterpretation

| Option | Description | Selected |
|--------|-------------|----------|
| Reinterpret — viewBox framing IS the focus | Tween narrows viewport to relevant section, achieving same goal as dimming | ✓ |
| Add light dim during tween only | Subtle opacity fade during ~300ms tween, gone once zoomed | |

**User's choice:** Reinterpret — viewBox framing IS the context focus
**Notes:** The "contextual dimming" success criterion is satisfied by the zoom itself narrowing the viewport.

---

## Progress Visualization

| Option | Description | Selected |
|--------|-------------|----------|
| Practice heatmap | GitHub-style contribution grid showing practice days, intensity-colored cells | ✓ |
| Streak timeline + sparklines | Horizontal timeline with sparkline charts | |
| Radial progress rings | Circular progress indicators per metric | |
| Combination — CountCards + heatmap | Keep existing CountCards, add heatmap below | |

**User's choice:** Practice heatmap
**Notes:** None

### What It Replaces

| Option | Description | Selected |
|--------|-------------|----------|
| Replace CumulativeMetrics only | Keep CountCards for stats, replace text-only CumulativeMetrics with heatmap | ✓ |
| Replace both CumulativeMetrics and CountCards | Heatmap becomes primary visualization | |
| Replace CumulativeMetrics + enhance CountCards | Heatmap + mini sparklines in CountCards | |

**User's choice:** Replace CumulativeMetrics only
**Notes:** None

### Heatmap Range

| Option | Description | Selected |
|--------|-------------|----------|
| 12 weeks | ~3 months, covers curriculum timeframe | ✓ |
| 26 weeks | 6 months of history | |
| Dynamic — all available data | Adapts to user's history | |

**User's choice:** 12 weeks
**Notes:** None

---

## Per-Instrument Accent Identity

| Option | Description | Selected |
|--------|-------------|----------|
| Audit + extend existing system | Verify accent swap covers all touchpoints, fix gaps | ✓ |
| Add secondary accent tints | Instrument-specific tints for backgrounds and surfaces | |
| Instrument identity beyond color | Different accent + visual motifs per instrument | |

**User's choice:** Audit + extend existing system
**Notes:** None

### Heatmap Color

| Option | Description | Selected |
|--------|-------------|----------|
| Accent-colored cells | Heatmap cells use var(--color-accent), adapts per instrument | ✓ |
| Neutral green for all | GitHub-style green regardless of instrument | |

**User's choice:** Accent-colored cells
**Notes:** None

---

## ADHD 5-Second Test

| Option | Description | Selected |
|--------|-------------|----------|
| Visual audit checklist | Checklist of every page/route with hierarchy, animation, and click count checks | ✓ |
| Automated motion audit | Test checking max simultaneous animations + human checklist | |
| Claude's discretion | Verifier agent assesses during phase verification | |

**User's choice:** Visual audit checklist
**Notes:** None

### Motion Cap

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle + non-competing | No hard cap, but no auto-looping, stagger prevents overload, understated | ✓ |
| Hard cap: max 1 animation | Only one element animates at any moment | |
| Cap per viewport zone | Max 1 animation per visual zone | |

**User's choice:** Subtle + non-competing
**Notes:** None

---

## Claude's Discretion

- Exact zoom tween duration/easing within ~200-400ms range
- Heatmap cell size, grid layout, intensity scale
- Heatmap empty state
- Which specific touchpoints need accent token fixes
- ModuleJourney visual enhancement (if any)
- Click count baseline measurement approach

## Deferred Ideas

None — discussion stayed within phase scope
