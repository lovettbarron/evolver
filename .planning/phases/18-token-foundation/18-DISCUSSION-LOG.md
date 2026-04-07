# Phase 18: Token Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-07
**Phase:** 18-token-foundation
**Areas discussed:** Color temperature, Surface elevations, Spacing strategy, Migration approach

---

## Color Temperature

### Background Warmth

| Option | Description | Selected |
|--------|-------------|----------|
| Warm olive/earth (Recommended) | Olive-brown undertones, oklch(0.12 0.01 85), organic synth hardware feel | ✓ |
| Warm brown/amber | Deeper brown-amber warmth, more pronounced, leather/wood tones | |
| Neutral warm | Very subtle warmth, just enough to remove cold cast | |

**User's choice:** Warm olive/earth
**Notes:** None — straightforward selection of recommended approach

### Accent Color

| Option | Description | Selected |
|--------|-------------|----------|
| Keep #c8ff00 as-is | Lime-green stays, high contrast, energetic | |
| Warm it slightly | Shift hue toward yellow-green (~105-110), more organic | ✓ |
| You decide | Claude picks based on contrast testing | |

**User's choice:** Warm it slightly
**Notes:** None

### Muted Text

| Option | Description | Selected |
|--------|-------------|----------|
| Warm + lighten (Recommended) | Warm olive-gray at higher lightness, ~oklch(0.55 0.01 85) | ✓ |
| Lighten only | Keep neutral gray, increase lightness to ~#8a8a8a | |
| You decide | Claude optimizes for AA compliance | |

**User's choice:** Warm + lighten
**Notes:** None

---

## Surface Elevations

### Elevation Count

| Option | Description | Selected |
|--------|-------------|----------|
| 5 levels (Recommended) | bg, sunken, surface, raised, overlay | ✓ |
| 7 levels | Add surface-subtle and raised-subtle for finer depth | |
| You decide | Claude determines based on component needs | |

**User's choice:** 5 levels
**Notes:** None

### Surface Texture

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle grain (Recommended) | Pre-rendered 64x64 WebP tile at opacity 0.02-0.05, GPU composited | ✓ |
| Flat surfaces | No texture, let warm colors do the work | |
| You decide | Claude experiments during implementation | |

**User's choice:** Subtle grain
**Notes:** None

### Border Hue

| Option | Description | Selected |
|--------|-------------|----------|
| Warm olive borders (Recommended) | Same olive hue family as surfaces, cohesive palette | ✓ |
| Neutral borders | Pure gray for sharper separation | |
| You decide | Claude picks for harmony | |

**User's choice:** Warm olive borders
**Notes:** None

---

## Spacing Strategy

### Scale Size

| Option | Description | Selected |
|--------|-------------|----------|
| Keep 7 tokens (Recommended) | xs(4)-sm(8)-md(16)-lg(24)-xl(32)-2xl(48)-3xl(64) | ✓ |
| Add 4xl and micro | micro(2px) + 4xl(96px) for edge cases | |
| You decide | Claude audits and expands where needed | |

**User's choice:** Keep 7 tokens
**Notes:** None

### Enforcement Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Token audit only (Recommended) | Define scale in globals.css, don't touch component classNames yet | |
| Full migration now | Replace all inline p-4/gap-6/etc across all 51 components | ✓ |
| You decide | Claude determines which components benefit most | |

**User's choice:** Full migration now
**Notes:** User chose comprehensive approach over incremental — wants consistency from day one rather than deferring to later phases

---

## Migration Approach

### Token Swap Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Big bang swap (Recommended) | Replace all hex tokens with OKLCH equivalents in one pass | ✓ |
| Additive then remove | Add new alongside old, migrate one-by-one, then remove old | |
| You decide | Claude picks based on risk assessment | |

**User's choice:** Big bang swap
**Notes:** None

### Contrast Validation

| Option | Description | Selected |
|--------|-------------|----------|
| Script + visual page (Recommended) | Contrast script + /dev/tokens page with pass/fail badges | ✓ |
| Manual check only | Browser devtools / online tools | |
| You decide | Claude determines minimum viable approach | |

**User's choice:** Script + visual page
**Notes:** None

---

## Claude's Discretion

- Exact OKLCH lightness values for each elevation level
- Grain texture tile generation approach
- Radius, shadow, and z-index token values
- Tailwind spacing utility → token mapping strategy

## Deferred Ideas

None — discussion stayed within phase scope
