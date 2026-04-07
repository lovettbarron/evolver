# Phase 18: Token Foundation - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver the complete OKLCH color palette, spacing scale, contrast validation, and warm dark surface elevations that all subsequent v1.3 phases inherit. This phase replaces the existing 6-color hex token system with a full semantic token architecture, migrates all 51 components to token-based spacing, and provides automated contrast verification tooling. Existing app functionality is visually unchanged in structure — only color temperature, surface depth, and spacing consistency are different.

</domain>

<decisions>
## Implementation Decisions

### Color Temperature
- **D-01:** Warm olive/earth undertones for all dark surfaces. Hue angle ~85 in OKLCH (olive family). Background around oklch(0.12 0.01 85). Not yellow — just absence of cold blue cast.
- **D-02:** Accent color (#c8ff00) gets warmed slightly — shift hue toward yellow-green (oklch ~105-110 hue range). Still vibrant but more organic against warm surfaces.
- **D-03:** Muted text color gets both warmed AND lightened — shift to warm olive-gray at higher lightness (~oklch 0.55 0.01 85) to ensure WCAG AA compliance against warm surfaces.

### Surface Elevations
- **D-04:** 5 surface elevation levels: bg, sunken, surface, raised, overlay. All use the same olive hue family with increasing lightness.
- **D-05:** Subtle grain texture overlay using pre-rendered 64x64 WebP tile at opacity 0.02-0.05 via CSS pseudo-element. Zero JS cost, GPU composited.
- **D-06:** Border tokens (border, border-subtle) follow the warm olive hue family — cohesive with surfaces, not neutral gray.

### Spacing Strategy
- **D-07:** Keep the existing 7-token spacing scale (xs through 3xl) — no expansion needed.
- **D-08:** Full migration of all 51 components from inline Tailwind spacing classes (p-4, gap-6, etc.) to token-based spacing in this phase. Comprehensive consistency from day one.

### Migration Approach
- **D-09:** Big bang swap — replace all existing hex color tokens in @theme with OKLCH equivalents plus new semantic tokens in one pass. No additive/gradual migration. The visual change is the point.
- **D-10:** Contrast validation via script (OKLCH math, no browser needed) AND a /dev/tokens visual page showing all color pairings with pass/fail badges. Satisfies "verified by automated tooling" success criterion.

### Claude's Discretion
- Exact OKLCH lightness values for each elevation level — optimize for visual depth perception and AA contrast
- Grain texture tile generation approach (can be CSS-generated at build time or a static asset)
- Specific radius, shadow, and z-index token values (research mentioned these as part of token foundation)
- Which Tailwind spacing utilities map to which tokens during the full component migration

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design Token Architecture
- `.planning/research/SUMMARY.md` — Three-layer token model (primitive -> semantic -> cascade), phase sequencing rationale, pitfall inventory
- `.planning/research/ARCHITECTURE.md` — Detailed architecture approach for token system
- `.planning/research/PITFALLS.md` — Critical pitfalls including token naming conflicts (Pitfall 5) and accessibility regression (Pitfall 2)

### Current Token System
- `src/app/globals.css` — Current @theme block with 6 color tokens + 7 spacing tokens + all prose/component CSS rules (213 lines)

### Requirements
- `.planning/REQUIREMENTS.md` — TOKEN-01 (warm palette, 5+ elevations), TOKEN-03 (consistent spacing), TOKEN-04 (WCAG AA contrast), TOKEN-05 (warm tones not cold grays)

### Existing Patterns
- `.planning/research/STACK.md` — Tailwind v4 CSS-first @theme system, OKLCH support details

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `globals.css @theme` block: Single control point for all design tokens — already established pattern
- Inter (sans) + JetBrains Mono (mono) font setup via next/font — unchanged in this phase
- `.prose` CSS rules (lines 37-196): Extensive markdown styling that references color tokens — will inherit new values automatically

### Established Patterns
- Tailwind v4 CSS-first configuration (no tailwind.config.js) — all tokens in @theme directive
- Components reference tokens via Tailwind utility classes (bg-bg, text-text, bg-surface, etc.)
- color-mix() already used in table styling (line 113) — OKLCH functions will be a natural extension
- `prefers-reduced-motion` media query already present (line 207) — accessibility awareness established

### Integration Points
- All 51 components consume color tokens via Tailwind classes — big bang swap cascades automatically
- Panel visualizers (evolver-panel.tsx, cascadia-panel.tsx) use hardcoded hex in `const styles = {}` — NOT affected by token changes (intentionally isolated)
- `/dev/tokens` page would be a new route — follows existing App Router pattern

</code_context>

<specifics>
## Specific Ideas

- Hologram Electronics warmth as inspiration — organic, boutique instrument feel, not generic dark mode
- Research specified oklch(0.12 0.01 85) as starting point for bg — user confirmed this direction
- Grain texture approach already specced in research: 64x64 WebP tile, opacity 0.02-0.05
- Research noted `--color-muted` (#737373) is near AA threshold — warming and lightening addresses this proactively

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 18-token-foundation*
*Context gathered: 2026-04-07*
