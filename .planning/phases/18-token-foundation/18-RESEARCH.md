# Phase 18: Token Foundation - Research

**Researched:** 2026-04-07
**Domain:** OKLCH design token system, WCAG contrast validation, Tailwind v4 @theme architecture
**Confidence:** HIGH

## Summary

Phase 18 replaces the existing 6-color hex token system in `globals.css @theme` with a full OKLCH-based semantic token architecture comprising 5 surface elevation levels, warm olive-toned color semantics, border tokens, and contrast validation tooling. The phase also migrates all 51 components from hardcoded Tailwind spacing classes (p-4, gap-6) to token-referenced spacing (p-md, gap-lg). A `/dev/tokens` page provides visual contrast verification.

The technical domain is well-understood: Tailwind v4 natively supports OKLCH values in `@theme`, CSS custom properties cascade automatically to all utility-class consumers, and WCAG contrast ratios can be computed from OKLCH via sRGB relative luminance conversion. The primary risk is gamut mapping -- OKLCH colors with chroma values that exceed sRGB must be kept within gamut to ensure contrast calculations match what browsers render on standard displays.

**Primary recommendation:** Implement the three-layer token system (primitive OKLCH palette, semantic aliases, existing 7-token spacing scale) in a single `@theme` rewrite, validate all foreground/background pairings with an OKLCH-to-sRGB contrast script, and migrate spacing references via systematic find-and-replace.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Warm olive/earth undertones for all dark surfaces. Hue angle ~85 in OKLCH (olive family). Background around oklch(0.12 0.01 85). Not yellow -- just absence of cold blue cast.
- **D-02:** Accent color (#c8ff00) gets warmed slightly -- shift hue toward yellow-green (oklch ~105-110 hue range). Still vibrant but more organic against warm surfaces.
- **D-03:** Muted text color gets both warmed AND lightened -- shift to warm olive-gray at higher lightness (~oklch 0.55 0.01 85) to ensure WCAG AA compliance against warm surfaces.
- **D-04:** 5 surface elevation levels: bg, sunken, surface, raised, overlay. All use the same olive hue family with increasing lightness.
- **D-05:** Subtle grain texture overlay using pre-rendered 64x64 WebP tile at opacity 0.02-0.05 via CSS pseudo-element. Zero JS cost, GPU composited.
- **D-06:** Border tokens (border, border-subtle) follow the warm olive hue family -- cohesive with surfaces, not neutral gray.
- **D-07:** Keep the existing 7-token spacing scale (xs through 3xl) -- no expansion needed.
- **D-08:** Full migration of all 51 components from inline Tailwind spacing classes (p-4, gap-6, etc.) to token-based spacing in this phase. Comprehensive consistency from day one.
- **D-09:** Big bang swap -- replace all existing hex color tokens in @theme with OKLCH equivalents plus new semantic tokens in one pass. No additive/gradual migration. The visual change is the point.
- **D-10:** Contrast validation via script (OKLCH math, no browser needed) AND a /dev/tokens visual page showing all color pairings with pass/fail badges. Satisfies "verified by automated tooling" success criterion.

### Claude's Discretion
- Exact OKLCH lightness values for each elevation level -- optimize for visual depth perception and AA contrast
- Grain texture tile generation approach (can be CSS-generated at build time or a static asset)
- Specific radius, shadow, and z-index token values (research mentioned these as part of token foundation)
- Which Tailwind spacing utilities map to which tokens during the full component migration

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| TOKEN-01 | User sees a warm dark color palette with 5+ surface elevation levels (bg, sunken, surface, raised, overlay) | OKLCH primitive palette at hue ~85 with 5 distinct lightness levels; Tailwind v4 @theme natively supports OKLCH values; UI-SPEC specifies exact OKLCH values for each level |
| TOKEN-03 | User sees consistent spacing applied uniformly across all pages and components | Audit shows 79 hardcoded numeric spacing classes across 33 files; existing 7-token scale (xs-3xl) already used in 76 places across 38 files; migration is mechanical find-and-replace |
| TOKEN-04 | User sees all text/background combinations meeting WCAG AA contrast ratios (4.5:1 minimum) | OKLCH-to-sRGB conversion required for WCAG relative luminance formula; validation script + /dev/tokens page; gamut clamping required for accurate results |
| TOKEN-05 | User sees warm dark tones (olive/brown undertones) instead of cold pure grays | OKLCH hue angle ~85 across all neutral surfaces; chroma 0.008-0.015 range adds warmth without appearing colored |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS | 4.2.2 (installed) | Design token system via @theme directive | CSS-first OKLCH support, automatic utility generation from custom properties |
| Next.js | 15.5.14 (installed) | App framework, /dev/tokens route | Existing App Router handles new page route |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| culori (or colorjs.io) | latest | OKLCH-to-sRGB conversion for contrast script | Build-time contrast validation only (dev dependency) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| culori for contrast script | Hand-rolled OKLCH-to-sRGB math | culori is 3KB, well-tested; hand-rolling risks gamut mapping errors |
| culori | colorjs.io | colorjs.io is larger but more complete; culori is lighter and focused on color space conversions |
| culori | chroma.js | chroma.js is larger (~14KB) and older; culori is purpose-built for modern color spaces |

**No new runtime dependencies.** The contrast validation library is a dev dependency for the build-time script only. All token work is pure CSS in @theme.

## Architecture Patterns

### Recommended @theme Structure
```css
@theme {
  /* === Layer 1: Primitives (raw OKLCH palette) === */
  --color-olive-950: oklch(0.10 0.01 85);   /* sunken */
  --color-olive-900: oklch(0.12 0.01 85);   /* bg */
  --color-olive-800: oklch(0.16 0.01 85);   /* surface */
  --color-olive-700: oklch(0.20 0.015 85);  /* surface-raised */
  --color-olive-600: oklch(0.24 0.015 85);  /* overlay */
  --color-olive-500: oklch(0.25 0.01 85);   /* border */
  --color-olive-400: oklch(0.20 0.008 85);  /* border-subtle */
  --color-olive-200: oklch(0.55 0.01 85);   /* muted text */
  --color-olive-100: oklch(0.93 0.01 85);   /* primary text */

  --color-lime-500: oklch(0.85 0.18 105);   /* accent */
  --color-lime-400: oklch(0.72 0.15 120);   /* param */
  --color-red-500: oklch(0.55 0.2 25);      /* destructive */

  /* === Layer 2: Semantic aliases === */
  --color-bg: var(--color-olive-900);
  --color-sunken: var(--color-olive-950);
  --color-surface: var(--color-olive-800);
  --color-surface-raised: var(--color-olive-700);
  --color-overlay: var(--color-olive-600);
  --color-text: var(--color-olive-100);
  --color-muted: var(--color-olive-200);
  --color-accent: var(--color-lime-500);
  --color-param: var(--color-lime-400);
  --color-border: var(--color-olive-500);
  --color-border-subtle: var(--color-olive-400);
  --color-destructive: var(--color-red-500);

  /* === Spacing (unchanged per D-07) === */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;

  /* === Radii === */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* === Shadows === */
  --shadow-card: 0 1px 3px oklch(0 0 0 / 0.3);
  --shadow-card-hover: 0 4px 12px oklch(0.85 0.18 105 / 0.08);

  /* === Content widths === */
  --content-narrow: 720px;
  --content-wide: 960px;

  /* === z-index scale === */
  --z-base: 0;
  --z-sticky: 100;
  --z-dropdown: 200;
  --z-tooltip: 300;
  --z-modal: 400;

  /* === Fonts (unchanged) === */
  --font-sans: var(--font-inter);
  --font-mono: var(--font-jetbrains-mono);
}
```

### Pattern 1: Big Bang Token Swap (D-09)
**What:** Replace all 6 existing hex tokens with OKLCH equivalents plus new semantic tokens in one @theme rewrite.
**When to use:** This phase -- the visual shift from cold to warm is the deliverable.
**Key constraint:** Existing class names (`bg-bg`, `text-text`, `bg-surface`, `text-muted`, `text-accent`, `text-param`) continue to work because the CSS variable names are preserved. New tokens (`bg-sunken`, `bg-surface-raised`, `bg-overlay`, `border-border`, `border-border-subtle`) become available immediately.

### Pattern 2: Spacing Migration via Find-and-Replace
**What:** Map hardcoded Tailwind numeric spacing to token references.
**Mapping:**

| Hardcoded | Token | Value |
|-----------|-------|-------|
| `p-1`, `gap-1`, `m-1` | `p-xs`, `gap-xs`, `m-xs` | 4px |
| `p-2`, `gap-2`, `m-2` | `p-sm`, `gap-sm`, `m-sm` | 8px |
| `p-4`, `gap-4`, `m-4` | `p-md`, `gap-md`, `m-md` | 16px |
| `p-6`, `gap-6`, `m-6` | `p-lg`, `gap-lg`, `m-lg` | 24px |
| `p-8`, `gap-8`, `m-8` | `p-xl`, `gap-xl`, `m-xl` | 32px |

**Note:** `p-3` (12px), `p-5` (20px) have no exact token match. These are uncommon but must be audited -- either round to nearest token or keep as-is if the value is intentional.

### Pattern 3: Contrast Validation Script
**What:** Node.js script that parses OKLCH values from globals.css, converts to sRGB, computes WCAG 2.1 relative luminance, and outputs pass/fail for every foreground/background pairing.
**When to use:** Run after any token value change, before committing.

### Pattern 4: /dev/tokens Visual Page
**What:** Next.js App Router page at `/dev/tokens` showing all color swatches, surface elevations, and contrast pairings with computed ratios and AA pass/fail badges.
**When to use:** Visual verification during development. NOT a production page.

### Anti-Patterns to Avoid
- **Touching SVG panel internals:** Both panel visualizers use hardcoded hex in `const styles = {}`. These simulate physical hardware -- leave them isolated.
- **Partial token migration:** Never have both old hex values and new OKLCH values as "current" in @theme. D-09 mandates a complete swap.
- **Adding a design token tool:** No Style Dictionary, Tokens Studio, or theme.ts. Tailwind v4 @theme IS the token system.
- **Expanding the spacing scale:** D-07 locks the 7-token scale. Do not add spacing-4xl or spacing-5xl.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| OKLCH-to-sRGB color conversion | Manual matrix math | `culori` npm package (dev dep) | Gamut mapping edge cases, ICC profile handling |
| WCAG contrast ratio formula | Copy-pasted luminance formula | `culori` + standard (L1+0.05)/(L2+0.05) | The luminance linearization step has precision requirements |
| Grain texture generation | Canvas API at runtime | Pre-rendered 64x64 WebP tile from fffuel.co/nnnoise | Zero runtime cost, GPU composited |
| Color space gamut clamping | CSS color-mix() workarounds | Keep OKLCH chroma values within sRGB gamut (chroma <= 0.02 for neutrals) | Browsers auto-clamp out-of-gamut colors differently |

**Key insight:** OKLCH values with low chroma (0.008-0.015 for surfaces) are safely within sRGB gamut. The accent color (chroma 0.18) and param color (chroma 0.15) are the ones to verify -- they need to remain in-gamut for contrast calculations to match rendered output.

## Common Pitfalls

### Pitfall 1: OKLCH Gamut Overflow Breaking Contrast
**What goes wrong:** OKLCH colors with high chroma exceed sRGB gamut. Browsers auto-clamp these to the nearest displayable color, but the clamped value has different luminance than the OKLCH value, causing contrast calculations to be wrong.
**Why it happens:** The accent (oklch 0.85 0.18 105) has relatively high chroma. If this falls outside sRGB gamut, the rendered color differs from the specified color.
**How to avoid:** Keep neutral surface chroma at 0.008-0.015. For accent/param colors, verify sRGB gamut membership using culori's `displayable()` function. If out of gamut, reduce chroma until in gamut.
**Warning signs:** Contrast script reports AA pass but visual inspection shows poor readability.

### Pitfall 2: Tailwind v4 @theme Variable Naming Conflicts
**What goes wrong:** Adding new `--color-*` variables that clash with Tailwind's built-in namespace or removing existing variables that components reference.
**Why it happens:** Tailwind v4 generates utility classes from @theme variables. `--color-surface-raised` becomes `bg-surface-raised`. If a component uses `bg-surface` and you rename it, silent breakage.
**How to avoid:** Preserve all existing variable names (`--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-accent`, `--color-param`). Only ADD new variables. The big-bang swap changes values, not names.
**Warning signs:** Components rendering with default/fallback colors instead of theme colors.

### Pitfall 3: Spacing Migration Breaking Non-4px-Multiple Values
**What goes wrong:** Some components use Tailwind values that don't map to the 7-token scale: `p-3` (12px), `p-5` (20px), `p-1.5` (6px), `gap-3` (12px).
**Why it happens:** The token scale uses 4-8-16-24-32-48-64. Values like 12px and 20px fall between tokens.
**How to avoid:** Audit all spacing values first. For non-matching values, decide per-instance: round to nearest token OR keep hardcoded if the specific value is intentional (e.g., 12px for tight padding on filter pills).
**Warning signs:** Layout shifts after spacing migration, elements feeling too cramped or too loose.

### Pitfall 4: Prose Rules Losing color-mix() After Token Swap
**What goes wrong:** The existing `color-mix(in srgb, var(--color-surface) 80%, var(--color-muted))` in table borders (globals.css line 112) uses sRGB mixing. After tokens become OKLCH values, `color-mix(in srgb, ...)` may produce unexpected results.
**Why it happens:** Mixing OKLCH values in sRGB space converts them first, mixes, then the result is in sRGB. This can produce different hues than mixing in OKLCH space.
**How to avoid:** Update `color-mix()` calls to use `in oklch` instead of `in srgb`. Or replace with the new `--color-border-subtle` token which serves the same purpose.
**Warning signs:** Table borders appearing with unexpected color cast.

### Pitfall 5: pulse-glow Keyframe Using Hardcoded RGBA
**What goes wrong:** The existing `@keyframes pulse-glow` (line 199) uses `rgba(200, 255, 0, 0.4)` -- a hardcoded accent color that won't update when `--color-accent` changes to OKLCH.
**Why it happens:** CSS keyframes with hardcoded colors are invisible during a token audit.
**How to avoid:** Update pulse-glow to use `oklch(0.85 0.18 105 / 0.4)` or reference the accent variable via color-mix.
**Warning signs:** Pulse animation shows a different shade of green than the rest of the accent color usage.

## Code Examples

### OKLCH Contrast Validation Script (Node.js)
```javascript
// scripts/validate-contrast.mjs
// Dev dependency: culori
import { oklch, rgb, wcagContrast } from 'culori';

const tokens = {
  bg: 'oklch(0.12 0.01 85)',
  sunken: 'oklch(0.10 0.01 85)',
  surface: 'oklch(0.16 0.01 85)',
  'surface-raised': 'oklch(0.20 0.015 85)',
  overlay: 'oklch(0.24 0.015 85)',
  text: 'oklch(0.93 0.01 85)',
  muted: 'oklch(0.55 0.01 85)',
  accent: 'oklch(0.85 0.18 105)',
  param: 'oklch(0.72 0.15 120)',
};

const pairings = [
  ['text', 'bg', 4.5],
  ['text', 'surface', 4.5],
  ['text', 'surface-raised', 4.5],
  ['muted', 'bg', 4.5],
  ['muted', 'surface', 4.5],
  ['accent', 'bg', 4.5],
  ['accent', 'surface', 4.5],
  ['param', 'surface', 4.5],
];

// Parse and check each pairing
for (const [fg, bg, min] of pairings) {
  const ratio = wcagContrast(tokens[fg], tokens[bg]);
  const pass = ratio >= min;
  console.log(`${fg} on ${bg}: ${ratio.toFixed(2)}:1 ${pass ? 'PASS' : 'FAIL'}`);
}
```

### Grain Texture CSS Pattern
```css
/* Applied to body or .page-wrapper */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  opacity: 0.03;
  pointer-events: none;
  background-image: url('/textures/grain.webp');
  background-repeat: repeat;
  mix-blend-mode: overlay;
  z-index: 9999;
}
```

### /dev/tokens Page Pattern
```tsx
// src/app/dev/tokens/page.tsx
export default function TokensPage() {
  const surfaces = [
    { name: 'bg', class: 'bg-bg' },
    { name: 'sunken', class: 'bg-sunken' },
    { name: 'surface', class: 'bg-surface' },
    { name: 'surface-raised', class: 'bg-surface-raised' },
    { name: 'overlay', class: 'bg-overlay' },
  ];
  // Render swatches, contrast pairings, spacing scale
  // See UI-SPEC for copy: "Surface Elevations", "Contrast Validation", etc.
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Hex colors in @theme | OKLCH values in @theme | Tailwind v4 (Jan 2025) | Perceptually uniform lightness, wider gamut, better palette generation |
| JS config (tailwind.config.js) | CSS-first @theme directive | Tailwind v4 (Jan 2025) | No build step for tokens, inspectable in DevTools |
| color-mix(in srgb, ...) | color-mix(in oklch, ...) | CSS Color Level 4 (2024) | More predictable mixing for perceptual uniformity |
| Separate token tools (Style Dictionary) | @theme IS the token system | Tailwind v4 (Jan 2025) | Single source of truth, no generation step |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.0.0 |
| Config file | vitest.config.ts |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| TOKEN-01 | 5 surface elevation tokens exist in @theme with OKLCH values | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | Wave 0 |
| TOKEN-03 | No hardcoded numeric spacing classes remain in components | unit (grep-based) | `npx vitest run src/app/__tests__/spacing-migration.test.ts -x` | Wave 0 |
| TOKEN-04 | All foreground/background pairings pass WCAG AA 4.5:1 | unit | `npx vitest run scripts/__tests__/validate-contrast.test.ts -x` | Wave 0 |
| TOKEN-05 | All neutral tokens use OKLCH hue ~85 (olive, not gray) | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green + contrast script passes before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/app/__tests__/tokens.test.ts` -- test that token CSS variables are defined with OKLCH values and correct hue angle; covers TOKEN-01, TOKEN-05
- [ ] `src/app/__tests__/spacing-migration.test.ts` -- grep-based test ensuring no `p-[0-9]` / `gap-[0-9]` etc. remain in component files (excluding panels); covers TOKEN-03
- [ ] `scripts/__tests__/validate-contrast.test.ts` -- test that contrast validation script correctly computes ratios and all pairings pass AA; covers TOKEN-04
- [ ] `scripts/validate-contrast.mjs` -- the contrast validation script itself

## Open Questions

1. **Exact OKLCH chroma for accent color**
   - What we know: UI-SPEC says oklch(0.85 0.18 105). Chroma 0.18 is high for sRGB.
   - What's unclear: Whether this specific value is within sRGB gamut on all displays.
   - Recommendation: Verify with culori's `displayable()` during implementation. Reduce chroma by 0.01 increments if out of gamut.

2. **Non-standard spacing values (p-3, p-5, gap-3)**
   - What we know: ~79 hardcoded numeric spacing instances exist. Most map cleanly to the 7-token scale.
   - What's unclear: How many use values between tokens (12px, 20px).
   - Recommendation: Full audit in Wave 1 before migration. Keep as hardcoded if intentional.

3. **Grain texture source**
   - What we know: D-05 specifies 64x64 WebP tile. fffuel.co/nnnoise can generate it.
   - What's unclear: Whether to generate manually or at build time.
   - Recommendation: Generate manually once, commit as static asset. No build-time dependency.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Tailwind CSS | Token system | Yes | 4.2.2 | -- |
| Node.js | Contrast validation script | Yes | (installed with Next.js) | -- |
| Vitest | Test validation | Yes | 3.0.0 | -- |
| culori (npm) | OKLCH-to-sRGB conversion | No (not installed) | Install as dev dep | Hand-roll OKLCH math (not recommended) |

**Missing dependencies with no fallback:** None

**Missing dependencies with fallback:**
- `culori` -- install as dev dependency for contrast validation script. Lightweight (~3KB), focused on color space conversions.

## Project Constraints (from CLAUDE.md)

- Session length 15-30 minutes, ADHD constraint non-negotiable
- Panel SVG internals never modified -- only outer containers (both panels use hardcoded hex, intentionally isolated)
- File naming: kebab-case throughout
- Content reads from ~/song vault, not src/content/ -- but this phase does not touch content pipeline
- Always start from known state (basic patch) -- not directly relevant but informs "no breaking changes" principle

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4 @theme docs](https://tailwindcss.com/docs/theme) -- CSS-first OKLCH support, @theme variable generation
- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4) -- CSS-first configuration philosophy, OKLCH default palette
- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors) -- OKLCH color space in Tailwind
- Codebase analysis: globals.css (213 lines, 6 color tokens, 7 spacing tokens), 51 components audited for token usage
- `.planning/research/ARCHITECTURE.md` -- Three-layer token model, component boundaries
- `.planning/research/PITFALLS.md` -- 14 pitfalls catalogued with prevention strategies
- `.planning/research/STACK.md` -- Stack decisions, two packages only

### Secondary (MEDIUM confidence)
- [OddContrast](https://www.oddcontrast.com/) -- OKLCH contrast checking tool
- [OKLCH in CSS: Consistent, accessible color palettes](https://blog.logrocket.com/oklch-css-consistent-accessible-color-palettes) -- OKLCH gamut considerations
- [Color.js Contrast](https://colorjs.io/docs/contrast) -- WCAG 2.1 contrast algorithm for multiple color spaces
- [culori npm](https://www.npmjs.com/package/culori) -- Color space conversion library

### Tertiary (LOW confidence)
- [OKLCH to HEX Converter](https://66colorful.com/tools/oklch-to-hex-converter) -- gamut clamping behavior reference

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- Tailwind v4 @theme with OKLCH is the documented, canonical approach. No new runtime dependencies.
- Architecture: HIGH -- Three-layer token model is established Tailwind v4 pattern, validated by project research.
- Pitfalls: HIGH -- All pitfalls grounded in specific codebase observations (line numbers, component counts, actual hex values).
- Contrast validation: MEDIUM -- OKLCH-to-sRGB conversion is mathematically sound but gamut edge cases need runtime verification with culori.

**Research date:** 2026-04-07
**Valid until:** 2026-05-07 (stable domain, no fast-moving dependencies)
