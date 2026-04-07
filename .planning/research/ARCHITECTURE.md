# Architecture Patterns: Visual Redesign Integration

**Domain:** Visual redesign of a Next.js 15 synth learning app with Tailwind v4 + CSS variable architecture
**Researched:** 2026-04-06

## Recommended Architecture

The redesign operates as a **layered token replacement** on top of the existing component tree. No structural changes to routing, data flow, or server/client boundaries. The existing architecture (App Router server components reading Obsidian vault, client components for interactivity) remains untouched. The redesign is purely the visual layer: tokens, styles, and component presentation.

### Core Principle: Three-Layer Token System

The current `@theme` block has 6 colors and 6 spacing values inline. This is workable for a small app but breaks down during a redesign because every token change requires auditing all 51 components. Replace with a three-layer system:

```
Layer 1: Primitive tokens (raw palette values)
Layer 2: Semantic tokens (purpose-driven: what it means)
Layer 3: Component tokens (scoped overrides, optional)
```

This is the standard pattern for Tailwind v4 design systems in 2026, validated by the `@theme` directive's CSS-first approach.

### Component Boundaries

| Component Layer | Count | Redesign Impact | Strategy |
|----------------|-------|-----------------|----------|
| Layout shell (AppShell, Nav, layout.tsx) | 3 | HIGH - structural visual changes | Modify in-place, token-first |
| Page containers (13 route pages) | 13 | MEDIUM - max-width, spacing, padding | Batch update after tokens land |
| Content cards (HeroCard, PatchCard, ModuleCard, CountCard, InstrumentCard) | 5 | HIGH - primary visual identity | Redesign with new tokens, same props |
| Data display (tables, lists, session rows) | 8 | MEDIUM - typography and spacing | Token cascade handles most changes |
| Interactive (SearchBar, PatchFilterBar, CompletionToggle) | 5 | MEDIUM - input styling, states | Update focus/hover/active states |
| Panel visualizers (EvolverPanel, CascadiaPanel) | 2 | LOW-MEDIUM - self-contained SVG | Isolated; touch only outer container |
| Prose/markdown (.prose CSS rules) | 1 (globals.css) | HIGH - 80+ lines of prose styling | Rewrite prose block with new tokens |
| Supporting (tooltips, banners, dialogs) | 15+ | LOW - cascade from token changes | Minimal manual intervention |

### Data Flow for Design Tokens

```
globals.css @theme block
    |
    v
Tailwind v4 utility generation (bg-surface, text-muted, etc.)
    |
    +---> Component className strings (all 51 components)
    |
    +---> .prose CSS rules (markdown rendering)
    |
    +---> SVG panel inline styles (ISOLATED - hardcoded hex values)
```

**Key insight:** The SVG panels do NOT use CSS variables. They use a `const styles = {}` object with hardcoded hex values (`#111`, `#333`, `#999`, etc.). This is intentional -- SVG panel colors represent physical hardware appearance and should NOT change with a theme redesign. The panel visualizers are a visual simulation of physical instruments, not UI chrome.

## Patterns to Follow

### Pattern 1: Layered Token Architecture in @theme

**What:** Replace flat token list with primitive + semantic layers. Primitives are the raw palette; semantics map intent.

**When:** First step of the redesign. Everything else depends on this.

**Example:**
```css
@theme {
  /* === Primitives (raw palette) === */
  --color-neutral-950: #0a0a0a;
  --color-neutral-900: #161616;
  --color-neutral-800: #1e1e1e;
  --color-neutral-400: #737373;
  --color-neutral-200: #e8e8e8;
  --color-lime-400: #c8ff00;
  --color-lime-300: #a3e635;

  /* === Semantic (what it means) === */
  --color-bg: var(--color-neutral-950);
  --color-surface: var(--color-neutral-900);
  --color-surface-raised: var(--color-neutral-800);
  --color-border: var(--color-neutral-800);
  --color-border-subtle: color-mix(in srgb, var(--color-neutral-900) 80%, var(--color-neutral-400));
  --color-text: var(--color-neutral-200);
  --color-text-muted: var(--color-neutral-400);
  --color-accent: var(--color-lime-400);
  --color-accent-soft: var(--color-lime-300);

  /* === Typography === */
  --font-sans: var(--font-inter);
  --font-mono: var(--font-jetbrains-mono);

  /* === Spacing (keep existing, add semantic) === */
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
  --shadow-card: 0 1px 3px rgba(0,0,0,0.3);
  --shadow-card-hover: 0 4px 12px rgba(200,255,0,0.08);

  /* === Content widths === */
  --content-narrow: 720px;
  --content-wide: 960px;
}
```

**Why this structure:**
- Changing the accent color means editing ONE primitive; all semantics cascade
- Adding `--color-surface-raised` and `--color-border` fills real gaps (currently components use `border-surface` which is invisible against `bg-surface`)
- `--radius-*` tokens eliminate the inconsistent `rounded-[6px]` / `rounded-lg` / `rounded` scattered across components
- `--content-narrow` / `--content-wide` replaces the hardcoded `max-w-[720px]` repeated in every page

### Pattern 2: Component Visual Layer Separation

**What:** Separate component structure (props, logic, layout) from visual presentation (colors, spacing, borders). The redesign only touches the visual layer.

**When:** Every component update during the redesign.

**Example of current pattern (PatchCard):**
```tsx
// Structure and visual are interleaved
<Link className="block bg-surface rounded-[6px] p-lg border border-transparent hover:border-accent transition-colors">
```

**Redesigned (same structure, updated visual):**
```tsx
// Same structure, tokens do the work
<Link className="block bg-surface rounded-md p-lg border border-border hover:border-accent transition-colors shadow-card hover:shadow-card-hover">
```

The key is that no props change, no data flow changes, no test breakage. Only className strings update.

### Pattern 3: Prose Styling as Design System Expression

**What:** The `.prose` rules in globals.css are the most impactful visual surface -- they render ALL session content, patch descriptions, and instrument overviews. Treat prose styling as first-class design system work, not an afterthought.

**When:** After token system is in place, before component visual refresh.

**Current problem:** Prose uses hardcoded `font-size: 36px`, `margin-top: 2em` etc. These should reference tokens or at minimum use a consistent typographic scale.

**Target approach:**
```css
.prose h2 {
  font-size: 1.5rem;
  margin-top: var(--spacing-2xl);
  margin-bottom: var(--spacing-md);
  letter-spacing: -0.01em;
}

.prose table td {
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--color-border-subtle);
}

.prose .callout {
  background-color: var(--color-surface);
  border-left: 3px solid var(--color-accent);
  padding: var(--spacing-md);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}
```

### Pattern 4: Content Width Standardization

**What:** Every page currently repeats `max-w-[720px] mx-auto px-lg lg:px-xl py-2xl`. Extract this into a reusable pattern.

**When:** During layout restructuring phase.

**Approach:** A CSS utility class or a thin wrapper component:

```css
/* In globals.css */
.page-container {
  max-width: var(--content-narrow);
  margin-inline: auto;
  padding-inline: var(--spacing-lg);
  padding-block: var(--spacing-2xl);
}

@media (min-width: 1024px) {
  .page-container { padding-inline: var(--spacing-xl); }
}
```

This is simpler than a React component wrapper because it's purely presentational. 13 pages can be updated with find-and-replace.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Touching SVG Panel Internals During Redesign

**What:** Changing the hardcoded hex values inside `evolver-panel.tsx` and `cascadia-panel.tsx` styles objects to use CSS variables.

**Why bad:** The panel visualizers simulate physical hardware. Their colors (#111 panel background, #999 labels, #555 knob strokes) represent the actual instrument appearance. Making them theme-responsive would break the skeuomorphic accuracy that is the entire point of these components. Additionally, these are the two most complex components in the codebase (~800+ lines each with 110-179 controls). Any change risks breaking interaction behavior.

**Instead:** Only touch the outer container styling (the `className` prop on the top-level `<div>`) for integration with the page layout. Leave all internal SVG styles untouched.

### Anti-Pattern 2: Big-Bang Component Rewrite

**What:** Rewriting all 51 components simultaneously with new visual styles.

**Why bad:** No way to verify visual correctness incrementally. Regression risk is enormous. You cannot tell which component broke the layout.

**Instead:** Follow the dependency order: tokens first, then prose, then shell/nav, then cards, then interactive elements, then supporting components. Each layer can be visually verified before moving to the next.

### Anti-Pattern 3: Adding a Component Library or CSS-in-JS

**What:** Introducing Radix Themes, shadcn/ui, Chakra, or styled-components as part of the redesign.

**Why bad:** The app already has 51 working components with consistent patterns. Adding a component library means either replacing them (massive rewrite) or running two systems in parallel (inconsistency). The existing Tailwind v4 + CSS variables approach is the right architecture for this app's scale.

**Instead:** Use the existing pattern: Tailwind utilities + CSS variable tokens + clsx for conditional classes. The redesign is about better tokens and better visual choices, not different tooling.

### Anti-Pattern 4: Introducing a Separate Theme File

**What:** Creating a `theme.ts` or `design-tokens.json` that generates CSS.

**Why bad:** Tailwind v4's entire philosophy is CSS-first configuration. The `@theme` block IS the theme file. Adding a JavaScript theme layer reintroduces the build-time indirection that v4 was designed to eliminate.

**Instead:** Keep everything in `globals.css` `@theme`. It is inspectable in DevTools, requires no build step, and is the canonical Tailwind v4 approach.

## Integration Points: New vs Modified Components

### New Components (create during redesign)

| Component | Purpose | Depends On |
|-----------|---------|------------|
| None required | The redesign is visual-only; no new components needed | - |

**Important:** This is a redesign, not a feature addition. Every component already exists. The work is updating className strings and CSS rules, not creating new React components. If the redesign scope creeps into new components, that is a feature milestone, not a visual redesign.

### Modified Components (update during redesign)

**Tier 1 - Token Foundation (must land first):**
- `globals.css` -- expanded @theme block, rewritten .prose rules

**Tier 2 - Layout Shell (sets the visual frame):**
- `app-shell.tsx` -- footer styling, overall page chrome
- `nav.tsx` -- navigation bar, active states, search integration
- `layout.tsx` -- font loading (potentially add/change fonts)

**Tier 3 - Primary Content (highest visual impact):**
- `hero-card.tsx` -- landing experience
- `instrument-card.tsx` -- instrument selection
- `patch-card.tsx` -- patch browsing
- `module-card.tsx` -- module browsing
- `count-card.tsx` -- progress dashboard
- `session-row.tsx` -- session list items
- `instrument-overview.tsx` -- instrument landing page

**Tier 4 - Interactive Elements:**
- `search-bar.tsx` -- input styling, dropdown
- `search-dropdown.tsx` -- results presentation
- `patch-filter-bar.tsx` -- pill buttons, sort dropdown
- `completion-toggle.tsx` -- toggle states
- `resume-bar.tsx` -- progress indicator

**Tier 5 - Supporting (cascade from tokens):**
- `prerequisite-banner.tsx`, `sticky-header.tsx`, `prev-next-nav.tsx`, `source-ref.tsx`, `confirm-dialog.tsx`, `status-indicator.tsx`, etc.
- Most of these will look correct just from token changes without explicit modification.

### Untouched Components (do not modify)

- `evolver-panel.tsx` -- internal SVG rendering
- `cascadia-panel.tsx` -- internal SVG rendering
- `evolver-panel-tooltip.tsx` -- tooltip content (already minimal)
- `mermaid-renderer.tsx` -- third-party rendering
- `midi-connection.tsx`, `capture-panel.tsx`, `send-panel.tsx`, `diff-view.tsx`, `diff-picker.tsx` -- MIDI functionality pages (low traffic, functional-first)
- All test files

## Suggested Build Order

This order minimizes risk and maximizes visual feedback at each step.

### Phase 1: Token Foundation
1. Expand `@theme` block with primitive + semantic layers
2. Ensure zero visual regression (new tokens map to same values initially)
3. Add missing tokens: `--color-surface-raised`, `--color-border`, `--color-border-subtle`, `--radius-*`, `--shadow-*`, `--content-*`

### Phase 2: Prose Overhaul
1. Rewrite `.prose` rules using new semantic tokens
2. Refine typography scale (heading sizes, line heights, letter spacing)
3. Improve table, callout, code block, and list styling
4. Verify with actual session content (markdown rendering is the primary content surface)

### Phase 3: Layout Shell
1. Update Nav (height, spacing, active indicator style, search bar integration)
2. Update AppShell footer
3. Standardize page containers (introduce `.page-container` pattern)
4. Update `layout.tsx` if fonts change

### Phase 4: Card and Content Components
1. Update all card components (hero, instrument, patch, module, count, session-row)
2. Apply new border, shadow, radius, and hover tokens
3. Update instrument-overview page layout

### Phase 5: Interactive Elements
1. Search bar input and dropdown styling
2. Filter bar pills and sort dropdown
3. Completion toggle, resume bar
4. Focus and hover state consistency pass

### Phase 6: Motion and Polish
1. Add transition tokens if needed
2. Micro-interactions (hover lifts, focus rings, state transitions)
3. Reduced-motion variants
4. Cross-page visual consistency audit

## Scalability Considerations

| Concern | Current (6 tokens) | After Redesign (~25 tokens) | Future (themes/dark-light) |
|---------|--------------------|-----------------------------|----------------------------|
| Token management | Flat list, easy to scan | Layered but still one file | Swap primitive layer per theme |
| Component updates | Edit className strings | Same mechanism | Same mechanism |
| SVG panels | Hardcoded, isolated | Unchanged | Could add theme layer later |
| Prose rendering | Inline values | Token-referenced | Theme-responsive automatically |

The layered token architecture is specifically chosen to make future theming trivial: swap the primitive layer values, and all semantic + component tokens cascade automatically. This is not needed now (the app is dark-only) but the architecture does not preclude it.

## Sources

- [Tailwind CSS v4 Theme Variables](https://tailwindcss.com/docs/theme) -- official @theme documentation (HIGH confidence)
- [Design Tokens That Scale in 2026 (Tailwind v4 + CSS Variables)](https://www.maviklabs.com/blog/design-tokens-tailwind-v4-2026) -- three-layer token pattern (MEDIUM confidence)
- [Epic Web Dev: Tailwind CSS Color Tokens](https://www.epicweb.dev/tutorials/tailwind-color-tokens) -- semantic color token patterns (MEDIUM confidence)
- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4) -- CSS-first configuration philosophy (HIGH confidence)
- Codebase analysis of 51 components, globals.css, and 2 SVG panel visualizers (HIGH confidence)
