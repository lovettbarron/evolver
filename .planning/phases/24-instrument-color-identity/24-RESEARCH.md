# Phase 24: Instrument Color Identity - Research

**Researched:** 2026-04-12
**Domain:** CSS custom properties, OKLCH color system, per-instrument theming
**Confidence:** HIGH

## Summary

Phase 24 replaces the current lime-centric color palette with brand-aligned per-instrument colors: a blue accent for Evolver (inspired by the DSI Evolver's iconic blue Lexan panel overlay) and a cool neutral gray for Cascadia (inspired by Intellijel's aluminum panel aesthetic). The neutral base palette (shown on the home page and non-instrument routes) shifts from lime to an aluminum-neutral tone, reflecting the eurorack hardware aesthetic that is the project's broader identity.

The existing architecture is well-suited for this change. The three-layer token system (primitives -> semantic -> cascade) means the color swap is concentrated in `globals.css`: define new primitives, update semantic mappings, and extend the `[data-instrument]` cascade selectors. All ~60+ components already use semantic tokens (`text-accent`, `bg-accent`, `var(--color-accent)`, `var(--color-param)`) -- no component-level color changes are needed.

The primary risk is WCAG AA contrast regression. The current lime accent (L=0.85) is extremely bright against the dark background (L=0.12). A blue accent will have lower lightness by nature. Each candidate color must be validated against the 4.5:1 text contrast minimum and the 3:1 non-text contrast minimum. The `--color-param` token (used for inline code and parameter values) also needs per-instrument variants since it currently references lime-400.

**Primary recommendation:** Define blue and neutral-gray primitive palettes in the `@theme` block, update the default `--color-accent` from lime to the neutral base, add `[data-instrument="evolver"]` and update `[data-instrument="cascadia"]` cascade blocks, add `--color-param` per-instrument overrides, and validate all combinations against WCAG AA.

## Project Constraints (from CLAUDE.md)

- SVG panel internals frozen -- only outer containers may change (CLAUDE.md guardrail)
- Two packages only for v1.3: motion@^12.38.0 and @tailwindcss/typography@^0.5.19 (STATE.md decision)
- Three-layer token architecture: primitive, semantic, cascade (STATE.md decision)
- ADHD constraint as hard acceptance criterion every phase (STATE.md decision)
- All text/background combinations must meet WCAG AA 4.5:1 minimum (TOKEN-04, completed Phase 18)

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS | v4 | Utility classes + `@theme` custom properties | Already installed, drives entire design token system |
| OKLCH color space | CSS native | Perceptually uniform color definitions | Already used throughout; hue rotation preserves perceived lightness |

### Supporting
No new packages needed. This phase is pure CSS token changes.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| OKLCH manual values | CSS `oklch(from ... h)` hue rotation | Hue rotation from lime to blue would change chroma/lightness unpredictably; hand-tuned values give precise control |
| Per-instrument CSS cascade | JavaScript theme context | Unnecessary complexity; CSS custom property override via `[data-instrument]` is already proven in this codebase |

## Architecture Patterns

### Current Token Architecture (unchanged structure)
```
@theme {
  /* Layer 1: Primitives (raw OKLCH) */
  --color-blue-500: oklch(...)    /* NEW: Evolver brand blue */
  --color-blue-400: oklch(...)    /* NEW: Evolver param blue */
  --color-neutral-500: oklch(...) /* NEW: aluminum neutral accent */
  --color-neutral-400: oklch(...) /* NEW: aluminum neutral param */
  --color-steel-500: oklch(...)   /* NEW: Cascadia cool gray accent */
  --color-steel-400: oklch(...)   /* NEW: Cascadia param gray */

  /* Layer 2: Semantic aliases -- DEFAULT is neutral (no instrument) */
  --color-accent: var(--color-neutral-500);
  --color-param: var(--color-neutral-400);
}

/* Layer 3: Cascade overrides per instrument */
[data-instrument="evolver"] {
  --color-accent: var(--color-blue-500);
  --color-param: var(--color-blue-400);
}
[data-instrument="cascadia"] {
  --color-accent: var(--color-steel-500);
  --color-param: var(--color-steel-400);
}
```

### Pattern 1: Instrument Cascade Override
**What:** Each instrument overrides `--color-accent` and `--color-param` via `[data-instrument]` attribute selector.
**When to use:** Any color that should vary per instrument.
**Key change from current:** Currently only Cascadia has an override; Evolver uses the default (lime). Phase 24 makes the default *neutral* and gives *both* instruments explicit overrides.

### Pattern 2: Home Page Neutral
**What:** The home page and non-instrument routes (about, dev/tokens) show the neutral aluminum palette.
**When to use:** When `data-instrument` is absent (no instrument context).
**Current behavior:** Home page shows lime accent. After Phase 24: aluminum neutral accent.

### Anti-Patterns to Avoid
- **Adding a third layer of complexity (JS theming):** The CSS cascade is sufficient and proven. Do not introduce React context or CSS-in-JS for color switching.
- **Changing surface/background tokens:** The warm olive surface palette (hue 85) stays unchanged. Only accent and param colors change. Do not shift the dark background toward blue or gray.
- **Making callout type colors instrument-aware:** Challenge/tip/warning callout colors (amber, green, red) are semantic and must NOT change per instrument.
- **Touching panel SVG internal colors:** Per CLAUDE.md, panel SVG internals are frozen. The existing panel highlight system (blue/amber) is a separate concern from the design system accent color.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| WCAG contrast validation | Manual visual inspection | Automated test using OKLCH lightness-based contrast estimation | Phase 18 established the pattern; extend `tokens.test.ts` |
| Per-instrument color switching | React context + useTheme | CSS `[data-instrument]` attribute cascade | Zero JS overhead, already works, SSR-safe |
| Color palette generation | Algorithmic palette from single hue | Hand-tuned OKLCH values | Brand colors need precise aesthetic judgment, not algorithms |

## Color Palette Research

### Evolver Blue (DSI Brand)
The Dave Smith Evolver's physical panel is a **blue Lexan overlay** with white and yellow text. Blue LEDs are a signature visual element. The blue is a medium-saturated blue, not neon or royal.

**Candidate values (require visual validation):**
- Accent: `oklch(0.65 0.15 245)` -- medium blue, visible against dark olive bg
- Param: `oklch(0.72 0.12 250)` -- lighter blue for inline code readability
- These need WCAG AA verification against `--color-bg` (oklch 0.12 0.01 85)

### Cascadia Gray (Intellijel Aluminum)
Intellijel Cascadia comes in "Dark Grey" as the primary colorway. The panel design language emphasizes clarity with aluminum-gray surfaces. Intellijel's brand accent is red (#ed2f42), but the instrument's visual identity is the gray aluminum panel.

**Candidate values (require visual validation):**
- Accent: `oklch(0.65 0.03 250)` -- desaturated cool gray with slight blue undertone
- Param: `oklch(0.72 0.02 250)` -- lighter neutral for inline code
- Very low chroma (0.02-0.03) keeps it clearly "gray" not "blue"

### Neutral Base (No Instrument)
When no instrument is selected (home page, about page), the app should feel hardware-neutral.

**Candidate values:**
- Accent: same as Cascadia gray or a slight variant -- the aluminum neutral IS the base identity
- Alternatively: a slightly warmer neutral that bridges between the olive backgrounds and the cool instrument accents

### WCAG Contrast Considerations
- Current lime accent L=0.85 against bg L=0.12 has roughly 7:1+ contrast (well above AA)
- Blue at L=0.65 against bg L=0.12 is approximately 4.5:1 (AA threshold for normal text)
- May need to push blue lightness to L=0.70 for comfortable margin above AA
- Gray at L=0.65 with near-zero chroma will have similar contrast to blue
- The `--color-param` values used in inline `<code>` elements MUST pass AA at their lightness level
- Buttons with `bg-accent text-bg` need the accent to have enough contrast against the dark bg text reversed onto it

**Critical:** The planner must include a contrast validation task that tests all accent/param values against bg, surface, and surface-raised backgrounds.

## Common Pitfalls

### Pitfall 1: Blue Accent Disappears Against Olive Background
**What goes wrong:** A pure blue (hue 245) with low lightness becomes invisible or muddy against the warm olive (hue 85) dark background.
**Why it happens:** Complementary hues (blue vs yellow-green) can create visual tension at low lightness values. If chroma is too low, the blue reads as gray.
**How to avoid:** Keep chroma at 0.12-0.18 for the blue accent. Test on actual dark surfaces, not in isolation. The existing `--color-bg` is oklch(0.12 0.01 85) -- very dark with minimal olive tint, so blue should read clearly.
**Warning signs:** Blue text looks "muddy" or "washed out" on the dark background.

### Pitfall 2: Param Color Loses Distinctiveness
**What goes wrong:** The `--color-param` (used for inline code like parameter names) becomes indistinguishable from `--color-accent` or `--color-text`.
**Why it happens:** When accent and param are both blue, they can blend together visually, unlike lime-500/lime-400 which had distinct lightness levels.
**How to avoid:** Maintain at least 0.07 OKLCH lightness difference between accent and param. Param should be noticeably lighter and slightly lower chroma than accent.
**Warning signs:** Inline `<code>` elements don't visually "pop" against surrounding prose text.

### Pitfall 3: Cascadia Gray Accent Lacks Visual Weight
**What goes wrong:** A near-neutral gray accent fails to draw attention as a call-to-action color (buttons, active indicators, focus rings).
**Why it happens:** Gray has near-zero chroma; it doesn't attract the eye the way saturated colors do.
**How to avoid:** Give the Cascadia gray a very slight blue or teal tint (chroma 0.03-0.05) to maintain some color identity while staying "gray." Alternatively, consider keeping the buttons slightly more saturated than the text accents.
**Warning signs:** "Start Session" buttons on Cascadia pages look like disabled/muted elements.

### Pitfall 4: Test Regressions in tokens.test.ts
**What goes wrong:** Existing token tests assert specific primitive names (e.g., `--color-lime-500`) and values that will change.
**Why it happens:** Phase 18 and 23 added specific assertions about lime primitives.
**How to avoid:** Update test assertions to match the new primitive names. The test at line 173 (`--color-lime-500 primitive definition is preserved`) must be rewritten for the new blue/neutral primitives.
**Warning signs:** `vitest run src/app/__tests__/tokens.test.ts` fails immediately after globals.css changes.

### Pitfall 5: Forgetting to Add Evolver Override
**What goes wrong:** With the default changed from lime to neutral, Evolver pages lose their accent color identity and show neutral gray instead of blue.
**Why it happens:** Currently Evolver has no `[data-instrument="evolver"]` override because it uses the default. After changing the default to neutral, Evolver MUST get its own override block.
**How to avoid:** Add `[data-instrument="evolver"] { --color-accent: ...; --color-param: ...; }` alongside the existing Cascadia block.
**Warning signs:** Evolver pages look identical to the home page (no color personality).

### Pitfall 6: Shadow and Glow Token Regression
**What goes wrong:** `--shadow-card-hover` and `@keyframes pulse-glow` already use `oklch(from var(--color-accent) ...)` (fixed in Phase 23). But if any new hardcoded color values were introduced between Phase 23 and now, they would bypass the cascade.
**How to avoid:** Run a grep audit for any hardcoded OKLCH values in globals.css that should reference `var(--color-accent)`.
**Warning signs:** Card hover glows or pulse animations show wrong color on instrument pages.

## Code Examples

### globals.css Token Changes
```css
@theme {
  /* === Layer 1: Primitives === */

  /* Warm olive surface palette (UNCHANGED) */
  --color-olive-950: oklch(0.10 0.01 85);
  --color-olive-900: oklch(0.12 0.01 85);
  /* ... rest unchanged ... */

  /* Evolver blue (DSI panel blue) */
  --color-blue-500: oklch(0.70 0.15 245);  /* accent */
  --color-blue-400: oklch(0.78 0.10 250);  /* param */

  /* Cascadia steel gray (Intellijel aluminum) */
  --color-steel-500: oklch(0.70 0.04 250); /* accent */
  --color-steel-400: oklch(0.78 0.03 250); /* param */

  /* Neutral base (hardware aluminum) */
  --color-neutral-500: oklch(0.70 0.03 250); /* accent */
  --color-neutral-400: oklch(0.78 0.02 250); /* param */

  /* REMOVED: --color-lime-500, --color-lime-400, --color-teal-500 */
  /* (or kept as legacy if any non-accent usage exists) */

  /* === Layer 2: Semantic — defaults to neutral === */
  --color-accent: var(--color-neutral-500);
  --color-param: var(--color-neutral-400);
  /* rest unchanged */
}

/* === Layer 3: Per-instrument cascade === */
[data-instrument="evolver"] {
  --color-accent: var(--color-blue-500);
  --color-param: var(--color-blue-400);
}

[data-instrument="cascadia"] {
  --color-accent: var(--color-steel-500);
  --color-param: var(--color-steel-400);
}
```

### Updated Token Test Pattern
```typescript
describe('Per-instrument accent tokens', () => {
  it('default --color-accent references neutral primitive', () => {
    const value = getTokenValue('--color-accent');
    expect(value).toContain('--color-neutral');
  });

  it('[data-instrument="evolver"] override exists', () => {
    expect(globalsContent).toContain('[data-instrument="evolver"]');
    expect(globalsContent).toMatch(
      /\[data-instrument="evolver"\]\s*\{[^}]*--color-accent/
    );
  });

  it('[data-instrument="cascadia"] override exists', () => {
    expect(globalsContent).toContain('[data-instrument="cascadia"]');
    expect(globalsContent).toMatch(
      /\[data-instrument="cascadia"\]\s*\{[^}]*--color-accent/
    );
  });
});
```

## Migration Scope

### Files That MUST Change
| File | Change | Risk |
|------|--------|------|
| `src/app/globals.css` | New primitives, updated semantic defaults, new Evolver cascade block, updated Cascadia cascade block | HIGH -- central to entire app |
| `src/app/__tests__/tokens.test.ts` | Update assertions for new primitive names, add per-instrument cascade tests | MEDIUM -- test updates |

### Files That Should NOT Change
| File | Why |
|------|-----|
| All ~60+ component files | Already use semantic tokens (`text-accent`, `bg-accent`, `var(--color-accent)`) |
| Panel SVG components | Internals frozen; glow circles already use `var(--color-accent)` (Phase 23 fix) |
| `app-shell.tsx` | `data-instrument` wiring already works correctly |

### Cleanup Candidates
| Item | Action |
|------|--------|
| `--color-lime-500`, `--color-lime-400`, `--color-teal-500` primitives | Remove from `@theme` if no other references exist |
| `--color-accent-cascadia` semantic token | Remove -- replaced by direct cascade override |
| Token test asserting lime-500 value preserved | Remove or replace with new primitive assertions |

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
| COLOR-01 | Default accent is neutral (not lime) | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | Exists (needs update) |
| COLOR-02 | Evolver gets blue accent via cascade | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | Exists (needs new tests) |
| COLOR-03 | Cascadia gets gray accent via cascade | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | Exists (needs update) |
| COLOR-04 | --color-param has per-instrument overrides | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | Needs new assertions |
| COLOR-05 | All accent/bg combinations pass WCAG AA | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | Needs new test |
| COLOR-06 | No hardcoded lime/teal values outside primitives | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | Partially exists |

### Sampling Rate
- **Per task commit:** `npx vitest run src/app/__tests__/tokens.test.ts --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] Update `src/app/__tests__/tokens.test.ts` -- remove lime-specific assertions, add per-instrument cascade tests, add WCAG contrast estimation
- [ ] No new test files needed -- all validation fits in existing token test file

## Open Questions

1. **Exact OKLCH values for Evolver blue**
   - What we know: DSI Evolver has a blue Lexan panel. The blue is medium-saturated, not neon.
   - What's unclear: Exact target hue, chroma, lightness. The L=0.65-0.70 range needs visual experimentation.
   - Recommendation: Start with `oklch(0.70 0.15 245)`, validate WCAG AA, then adjust visually. This is inherently a visual design decision that benefits from iteration.

2. **Should the neutral base and Cascadia gray be identical or slightly different?**
   - What we know: Cascadia IS the Intellijel aluminum identity. The neutral base represents generic hardware.
   - What's unclear: Whether the home page accent should be distinguishable from Cascadia pages.
   - Recommendation: Make them very close but not identical. Neutral could have slightly less blue tint (hue 240 vs 250) or slightly less chroma. Or they could be the same -- simplicity favors identical.

3. **Should --color-param stay independent per instrument or derive from --color-accent?**
   - What we know: Param is used for inline code/parameter values. It needs to be lighter than accent and readable against surface-raised backgrounds.
   - What's unclear: Whether it's simpler to define param as a function of accent or as an independent token.
   - Recommendation: Keep independent tokens. `oklch(from var(--color-accent) calc(l + 0.08) calc(c - 0.03) h)` is theoretically possible but fragile across the different accent colors. Explicit values are safer.

4. **Legacy lime primitive removal**
   - What we know: `--color-lime-500`, `--color-lime-400`, `--color-teal-500` are only referenced in the `@theme` block semantic assignments.
   - What's unclear: Whether any future phase or user customization might want them.
   - Recommendation: Remove them. Dead primitives cause confusion. They can be re-added trivially if needed.

## Sources

### Primary (HIGH confidence)
- Project source: `src/app/globals.css` -- complete token architecture, current color values
- Project source: `src/components/app-shell.tsx` -- `data-instrument` cascade mechanism
- Project source: `src/app/__tests__/tokens.test.ts` -- existing test assertions to update
- Phase 23 research (`23-RESEARCH.md`) -- accent audit findings, all hardcoded values already fixed
- [Sound on Sound - Dave Smith Evolver review](https://www.soundonsound.com/reviews/dave-smith-evolver) -- blue Lexan overlay confirmation
- [B&H Photo - Intellijel Cascadia Dark Grey](https://www.bhphotovideo.com/c/product/1794543-REG/intellijel_cascadia_drkgry_cascadia_mono_semi_modular_analog.html) -- dark gray color identity

### Secondary (MEDIUM confidence)
- [Intellijel.com](https://intellijel.com) -- brand accent red (#ed2f42), but instrument identity is aluminum gray
- [Sequential.com Evolver page](https://sequential.com/product/evolver/) -- product reference

### Tertiary (LOW confidence)
- OKLCH contrast estimation is approximate; true WCAG contrast requires sRGB conversion. The lightness-based estimation (L difference) is directionally correct but not precise for certification.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new packages, pure CSS change
- Architecture: HIGH -- existing three-layer token system proven across 6 phases
- Pitfalls: HIGH -- comprehensive review of all accent touchpoints from Phase 23 audit
- Color values: MEDIUM -- exact OKLCH values need visual validation and WCAG testing

**Research date:** 2026-04-12
**Valid until:** 2026-05-12 (stable domain, no fast-moving dependencies)
