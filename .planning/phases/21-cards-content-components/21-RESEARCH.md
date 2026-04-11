# Phase 21: Cards & Content Components - Research

**Researched:** 2026-04-11
**Domain:** CSS component unification, focus states, editorial content styling
**Confidence:** HIGH

## Summary

This phase is a pure CSS and className refactoring exercise. No new dependencies are needed. The work involves: (1) creating a shared `.card` base class in `globals.css` that unifies the visual language across 5 card components, (2) adding a global `:focus-visible` rule for keyboard navigation, and (3) adding editorial styles for session content (parameter callout pills, ordered step markers, section divider `<hr>`s).

All six target components have been audited. They currently use inconsistent border-radius values (6px, 8px, 12px via rounded-md/rounded-lg/rounded-[6px]), inconsistent border strategies (some transparent at rest, some visible), and inconsistent hover treatments (some border-only, some translate-y lift). The unification consolidates these into a single `.card` class with consistent 8px radius, visible border at rest, and combined border+lift hover. SessionRow is explicitly excluded from the card base.

**Primary recommendation:** Define `.card` as a CSS class in `globals.css` (not a Tailwind @apply), then update each card component's className to use `.card` plus its own content-specific classes. Add global `:focus-visible` outside `@layer base` for specificity. Editorial styles target `.prose ol`, `.prose hr`, and a new `.param-pill` class (or extend existing `.param-name`/`.param-value` for inline context).

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Shared `.card` base class in globals.css -- consistent border-radius (8px), padding (--spacing-lg), background (--color-surface), and border (1px solid --color-border-subtle). All card components inherit this base and add only their unique content layout.
- **D-02:** Border always visible at rest (border-subtle), intensifies to accent on hover. Cards feel like defined objects on the page.
- **D-03:** HeroCard gets distinct hero treatment -- accent border-left bar, unique visual emphasis. Not just "bigger card."
- **D-04:** SessionRow stays as a list-item style (no card base, no border at rest). Only hover and focus states are unified with the card system.
- **D-05:** Global `:focus-visible` rule in globals.css: 2px solid accent-colored outline with 2px offset. Applied to all interactive elements by default. Only keyboard navigation triggers it (not mouse clicks).
- **D-06:** Global base rule plus per-component overrides only where needed. Individual components do NOT define their own focus styles unless overriding the global.
- **D-07:** Parameter callouts as inline pill/badge elements -- subtle accent background with accent-colored left border, mono font, compact padding. Leverages existing `.param-table` classes from the markdown plugin.
- **D-08:** Numbered steps use accent-colored step markers -- bold accent-colored numerals via `::marker` pseudo-element, slightly larger than body text. No circles or tracks.
- **D-09:** Section dividers as subtle horizontal rules -- thin border-subtle line with generous vertical spacing (margin-block: --spacing-2xl).
- **D-10:** Cards get combined border-accent + subtle lift on hover: border transitions to accent color, card lifts ~2px with faint accent-tinted shadow (rgba accent at ~0.06 opacity). Transition duration ~150ms.
- **D-11:** SessionRow hover keeps current background-highlight treatment (bg-surface on hover). No lift or border change.

### Claude's Discretion
- Exact HeroCard hero treatment (accent-left bar vs gradient vs other approach -- pick what looks best)
- Whether existing inline focus-visible on CountCard needs adjustment or can just inherit global
- Specific param-pill background color within the warm surface palette
- Whether `::marker` styling requires any remark/rehype plugin changes or is pure CSS
- Any search input or completion toggle focus override specifics

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| COMP-01 | User sees unified visual language across all card types (consistent borders, padding, hover states, border-radius) | `.card` base class in globals.css applied to HeroCard, PatchCard, ModuleCard, InstrumentCard, CountCard. Audit of current inconsistencies documented below. |
| COMP-02 | User sees intentional focus states on all interactive elements matching the design system | Global `:focus-visible` rule in globals.css. CountCard inline focus styles removed. Search input may need inset override. |
| CONTENT-02 | User sees session content with editorial layout -- parameter callouts as styled inline elements, numbered steps as designed markers, section dividers | `::marker` styling for `.prose ol`, `hr` margin/border rules, param-pill CSS. All pure CSS within existing `.prose` context -- no plugin changes needed. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| tailwindcss | 4.2.2 | Utility classes, existing in project | Already installed and configured |
| @tailwindcss/typography | 0.5.19 | Prose styling base | Already installed, provides `.prose` container |

### Supporting
No new packages needed. This phase is entirely CSS + className changes.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS `.card` class | Tailwind @apply | Raw CSS is more readable for multi-property shared classes and avoids @apply specificity issues in Tailwind v4 |
| `::marker` CSS | rehype plugin to wrap markers | Pure CSS works -- no plugin complexity needed |

## Architecture Patterns

### File Change Map
```
src/app/globals.css           # Add .card class, :focus-visible global, editorial prose rules
src/components/hero-card.tsx   # Replace className with .card + hero variant
src/components/patch-card.tsx  # Replace className with .card
src/components/module-card.tsx # Replace className with .card
src/components/instrument-card.tsx # Replace className with .card
src/components/count-card.tsx  # Replace className with .card, remove inline focus-visible
src/components/session-row.tsx # No .card -- only inherits global :focus-visible
```

### Pattern 1: CSS Base Class with Component Overrides
**What:** A single `.card` class in globals.css defines shared visual properties. Components use `className="card ..."` and add only layout-specific utilities via Tailwind.
**When to use:** When 5+ components share the same visual envelope but differ in content structure.
**Example:**
```css
/* In globals.css, OUTSIDE @layer base for specificity */
.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: 8px;
  padding: var(--spacing-lg);
  transition: border-color 150ms, transform 150ms, box-shadow 150ms;
}

.card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px oklch(0.85 0.18 105 / 0.06);
}
```

### Pattern 2: Global Focus-Visible Rule
**What:** A single `:focus-visible` rule at global scope provides keyboard navigation outlines for all interactive elements.
**When to use:** Design system consistency -- one rule covers all links, buttons, inputs.
**Example:**
```css
/* In globals.css, OUTSIDE @layer base */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

### Pattern 3: HeroCard Hero Variant
**What:** HeroCard uses `.card` base but overrides border-left and border-radius to create an accent left-bar editorial treatment.
**Example:**
```css
.card-hero {
  border-left: 3px solid var(--color-accent);
  border-radius: 2px 8px 8px 2px;
}
```

### Anti-Patterns to Avoid
- **Inline Tailwind for shared styles:** Do not replicate `rounded-[8px] border border-border-subtle bg-surface p-lg ...` across 5 components. That is exactly what a CSS class solves.
- **@layer base for new rules:** The existing prose rules are deliberately OUTSIDE `@layer base` to beat typography plugin specificity. The `.card` class and `:focus-visible` should follow the same pattern.
- **:focus instead of :focus-visible:** Using `:focus` would show outlines on mouse clicks. The decision is explicitly `:focus-visible` only.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Shared card styles | Tailwind utility repetition across 5 files | Single `.card` CSS class | Maintenance -- one change updates all cards |
| Focus ring management | Per-component focus-visible declarations | Global `:focus-visible` rule | Consistency -- no component should be missed |
| `::marker` styling | Custom counter-increment/counter-reset with `::before` | Native `::marker` pseudo-element | Browser support is excellent (all modern browsers), simpler CSS |

## Common Pitfalls

### Pitfall 1: Tailwind v4 @layer Specificity
**What goes wrong:** Placing `.card` inside `@layer base` means Tailwind utility classes always win (utilities are higher layer). But placing it outside `@layer` means it beats utilities.
**Why it happens:** Tailwind v4 uses CSS cascade layers. Unlayered styles have higher specificity than layered ones.
**How to avoid:** Place `.card` and `:focus-visible` OUTSIDE `@layer base`, consistent with existing `.prose` overrides in globals.css. Components can still use Tailwind utilities for content-specific layout (flex, gap, etc.) since those don't conflict with the card envelope properties.
**Warning signs:** Card padding/border-radius not applying, or Tailwind utilities not overriding when they should.

### Pitfall 2: Search Input Focus Override
**What goes wrong:** The search input currently uses `outline-none` and a custom `focus:border-accent` pattern. A global `:focus-visible` would add a second outline.
**Why it happens:** The search input has a rounded-full pill shape where an outer outline would clip or look wrong.
**How to avoid:** Add a specific override for the search input: `.search-input:focus-visible { outline: none; }` or use `outline-offset: -2px` for an inset treatment. The search input already has its own focus indicator (border-accent + width expansion).
**Warning signs:** Double focus rings on the search input.

### Pitfall 3: HeroCard Link Focus vs Card Focus
**What goes wrong:** HeroCard wraps a `<div>` (not focusable) with a `<Link>` inside. The focus ring appears on the Link, not the card.
**Why it happens:** HeroCard's structure is `<div class="card">` with a `<Link>` button inside, unlike PatchCard/ModuleCard where the Link IS the card.
**How to avoid:** HeroCard is different structurally. The global `:focus-visible` will correctly target the `<Link>` element inside. No action needed, but verify visually.
**Warning signs:** Focus ring appearing on just the "Start Session" button rather than the full card.

### Pitfall 4: `::marker` Limited Styling
**What goes wrong:** `::marker` only supports a subset of CSS properties: color, font-size, font-weight, font-family, content, direction, unicode-bidi, animation/transition, and a few more. You cannot set padding, background, or border on `::marker`.
**Why it happens:** CSS specification limits `::marker` intentionally.
**How to avoid:** The decision only asks for color, font-weight, and font-size on markers -- all supported. Do not attempt background colors or custom shapes via `::marker`.
**Warning signs:** Styles not applying to list markers.

### Pitfall 5: CountCard Removing Existing Focus Styles
**What goes wrong:** CountCard has inline `focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2` that duplicates the global rule.
**Why it happens:** CountCard was the only component that previously had focus styles.
**How to avoid:** Remove the inline focus-visible utilities from CountCard when adding the global rule. The global rule produces identical output, so this is a safe removal.
**Warning signs:** None if done correctly; the visual result should be identical.

### Pitfall 6: Parameter Pill vs Parameter Table Confusion
**What goes wrong:** The existing `.param-table` classes style TABLE elements. The new parameter "pill" is for INLINE elements within prose paragraphs. These are different things.
**Why it happens:** D-07 says "Leverages existing `.param-table` classes" but the inline pill is a new concept -- inline `<code>` or `<span>` elements within paragraph text, not table cells.
**How to avoid:** The inline param pill styling should target `.prose code` or a new `.param-pill` class. The existing `.param-table` styles for tables remain unchanged. The `rehypeParamTable` plugin adds classes to TABLE elements only. For inline parameter callouts, session markdown already uses backtick code blocks (e.g., `` `C0` ``, `` `Saw` ``), which render as `<code>` with existing `--color-param` styling. The pill treatment (left border, background) enhances these existing inline codes.
**Warning signs:** Accidentally breaking existing parameter table rendering.

## Code Examples

### Current Card Inconsistencies (Audit)

```
Component        | border-radius       | padding  | border at rest        | hover border  | hover lift
-----------------+---------------------+----------+-----------------------+---------------+-----------
HeroCard         | rounded-lg (12px)   | p-2xl    | none                  | none          | none
PatchCard        | rounded-[6px]       | p-lg     | border-transparent    | border-accent | none
ModuleCard       | rounded-[6px]       | p-lg     | border-transparent    | border-accent | none
InstrumentCard   | rounded-md (6px)    | p-2xl    | border-surface        | border-accent | none
CountCard        | rounded-lg (12px)   | p-lg     | none (implicit)       | none          | translateY(-2px) + shadow
SessionRow       | none                | py-md px-sm | none               | bg-surface    | none
```

### Target .card Base Class
```css
/* globals.css -- OUTSIDE @layer base */
.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: 8px;
  padding: var(--spacing-lg);
  transition: border-color 150ms, transform 150ms, box-shadow 150ms;
}

.card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px oklch(0.85 0.18 105 / 0.06);
}
```

### Target HeroCard Hero Variant
```css
.card-hero {
  border-left: 3px solid var(--color-accent);
  border-radius: 2px 8px 8px 2px;
  padding: var(--spacing-2xl);
}
```

### Target Global Focus-Visible
```css
/* globals.css -- OUTSIDE @layer base */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

### Target Editorial Styles
```css
/* Ordered step markers -- D-08 */
.prose ol > li::marker {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 1.125rem;
}

/* Section dividers -- D-09 */
.prose hr {
  border: none;
  border-top: 1px solid var(--color-border-subtle);
  margin-block: var(--spacing-2xl);
}

/* Inline parameter code styling enhancement -- D-07 */
/* Existing .prose code already has --color-param, mono font, surface bg.
   Enhance with left-border pill treatment for editorial feel. */
.prose :where(code) {
  border-left: 2px solid var(--color-accent);
  background-color: var(--color-surface-raised);
  /* existing: font-family mono, font-size 0.875em, padding 2px 6px, border-radius 3px */
}
```

### Component className Transformations

**PatchCard (before):**
```tsx
className="block bg-surface rounded-[6px] p-lg border border-transparent hover:border-accent transition-colors"
```

**PatchCard (after):**
```tsx
className="card block"
```

**CountCard (before):**
```tsx
className="bg-surface p-lg rounded-lg flex flex-col items-center cursor-pointer
           transition-[transform,box-shadow] duration-150 ease-out
           hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(200,255,0,0.08)]
           focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
```

**CountCard (after):**
```tsx
className="card flex flex-col items-center cursor-pointer"
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| :focus for outlines | :focus-visible | Widely supported since 2022 | Only keyboard nav triggers outlines, not mouse clicks |
| Custom counter-increment for numbered lists | ::marker pseudo-element | Full browser support since 2021 | Simpler CSS for list marker styling |
| @apply for shared classes (Tailwind v3) | Raw CSS classes (Tailwind v4) | Tailwind v4 (2024) | @apply works but raw CSS is preferred for multi-property base classes in v4's layer system |

## Open Questions

1. **Inline param pill targeting strategy**
   - What we know: Session markdown uses backtick code blocks for parameter values (e.g., `` `C0` ``, `` `Saw` ``). These render as `<code>` elements with existing `--color-param` + mono font styling.
   - What's unclear: Whether ALL inline `<code>` in sessions should get the pill treatment, or only specific ones. The UI-SPEC says "parameter callouts as styled inline elements" with left-border accent.
   - Recommendation: Apply the pill treatment to ALL `.prose :where(code)` since existing inline codes in sessions are predominantly parameter values. Pre-block code (`.prose pre code`) is already reset to no background/padding. This is safe and the simplest approach.

2. **Search input focus interaction**
   - What we know: Search input uses `outline-none` and custom focus-via-border. Global `:focus-visible` will conflict.
   - What's unclear: Whether inset outline or suppressed outline is better visually.
   - Recommendation: Suppress outline on the search input since it already has a clear focus indicator (border-accent + width expansion from 200px to 320px). Add `outline: none` to the search input's focus-visible state.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.x + @testing-library/react 16.x + jsdom |
| Config file | vitest.config.ts |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| COMP-01 | Unified card visual language (className includes "card") | unit (render check) | `npx vitest run src/components/__tests__/card-unification.test.tsx -x` | Wave 0 |
| COMP-02 | Focus-visible rule exists in globals.css | manual (CSS inspection) | Manual: keyboard-tab through all interactive elements | N/A |
| CONTENT-02 | Editorial prose styles (marker, hr, code pill) | manual (visual) | Manual: view session page, check ol markers, hr dividers, code pills | N/A |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/components/__tests__/card-unification.test.tsx` -- render tests verifying each card component outputs the `.card` CSS class (or `card` in className). Covers COMP-01.
- Existing test infrastructure (vitest + jsdom + testing-library) is sufficient. No new framework install needed.

## Sources

### Primary (HIGH confidence)
- Direct codebase audit of all 6 card components, globals.css, session-detail.tsx, param-table.ts plugin
- 21-CONTEXT.md locked decisions (D-01 through D-11)
- 21-UI-SPEC.md design contract (interaction states, color roles, component inventory)

### Secondary (MEDIUM confidence)
- CSS `::marker` specification: limited to color, font-size, font-weight, content, direction, unicode-bidi per CSS Lists and Counters Module Level 3. All requested properties (color, weight, size) are within the allowed set.
- Tailwind v4 cascade layers: unlayered CSS beats `@layer base` utilities, confirmed by existing project pattern (prose overrides are already outside @layer).

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - No new dependencies, pure CSS/className changes on existing codebase
- Architecture: HIGH - Pattern directly follows existing globals.css conventions (prose overrides, no @layer)
- Pitfalls: HIGH - All pitfalls identified from direct code audit (search input, CountCard, HeroCard structure, ::marker limits)

**Research date:** 2026-04-11
**Valid until:** 2026-05-11 (stable -- CSS fundamentals, no fast-moving dependencies)
