# Phase 19: Prose & Typography - Research

**Researched:** 2026-04-07
**Domain:** CSS typography, Tailwind typography plugin, Next.js font loading
**Confidence:** HIGH

## Summary

Phase 19 is a CSS-only styling phase with one new npm dependency (`@tailwindcss/typography`) and one new font (`Space Grotesk` via `next/font/google`). The implementation touches exactly two source files: `globals.css` (bulk of changes) and `layout.tsx` (font setup). All markdown rendering infrastructure (unified.js pipeline, custom rehype plugins) is already in place and unchanged.

The primary risk is the interaction between `@tailwindcss/typography`'s opinionated default styles and the existing hand-written `.prose` rules in `globals.css`. The plugin applies its own heading sizes, colors, margins, max-width, and element spacing. These defaults MUST be overridden to match the UI-SPEC's type scale and dark palette -- otherwise the plugin's light-mode gray defaults will conflict. The `prose-invert` modifier class handles basic dark text inversion, but the project's OKLCH token palette requires further CSS custom property overrides.

**Primary recommendation:** Install `@tailwindcss/typography`, register via `@plugin` in CSS, apply `prose prose-invert` to content containers, then systematically override the plugin's CSS custom properties (`--tw-prose-body`, `--tw-prose-headings`, etc.) with Phase 18 tokens. Replace existing `.prose` heading/element rules with the new type scale.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Add Space Grotesk as the display/heading typeface via `next/font/google`
- **D-02:** Inter remains the body/UI typeface. JetBrains Mono remains for code
- **D-03:** Space Grotesk applies to h1 and h2 only. h3-h4 use Inter bold -- clear "display vs body" split
- **D-04:** Use a major third ratio (1.25) for the heading scale
- **D-05:** h1 ~2.4x body, h2 ~1.95x, h3 ~1.56x, h4 ~1.25x
- **D-06:** Adopt @tailwindcss/typography as the prose baseline (new dependency)
- **D-07:** Apply the plugin's `prose` class to markdown content containers
- **D-08:** Domain-specific elements override within prose -- plugin handles body/heading/list/code, custom CSS handles domain elements
- **D-09:** Editorial redesign of domain elements, not just palette integration
- **D-10:** Param tables: inline with accent-colored left border, not card containers
- **D-11:** Callouts: distinct per type (challenge=amber, tip=green, warning=red)
- **D-12:** All domain element colors/surfaces must use Phase 18 tokens (OKLCH palette, surface elevations)

### Claude's Discretion
- Code block styling, obsidian tag appearance, task list checkbox styling, quick-ref-prose adjustments
- Responsive type scaling strategy (fluid clamp vs breakpoint steps)
- Line height and letter spacing fine-tuning for Space Grotesk headings

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| TOKEN-02 | User sees a modular typography scale with distinct heading and body typefaces | Space Grotesk (display) + Inter (body) with major third ratio scale. Implemented via `next/font/google` + CSS custom properties in `@theme` block. UI-SPEC defines exact sizes: Display 39px, Heading 25px, Body 16px, Small 13px |
| CONTENT-01 | User sees markdown content rendered as polished prose -- styled headings, tables, code blocks, callouts, and task lists that look designed | `@tailwindcss/typography` plugin provides baseline prose styling; CSS overrides in `@layer base` customize colors, domain elements (.param-table, .callout, .obsidian-tag), and type scale to match editorial direction |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @tailwindcss/typography | 0.5.19 | Prose baseline styling for markdown content | Official Tailwind Labs plugin; handles ~30 HTML elements with sensible defaults. Avoids hand-rolling prose reset for p, ul, ol, blockquote, table, code, etc. |
| next/font/google (Space Grotesk) | Built into Next.js 15 | Display typeface loading | Zero-layout-shift font loading via Next.js built-in. Space Grotesk is available on Google Fonts |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| tailwindcss | 4.2.2 (already installed) | CSS framework | Already in use; provides @theme, @layer, @plugin directives |
| next/font/google (Inter, JetBrains Mono) | Built into Next.js 15 (already configured) | Body and code typefaces | Already set up in layout.tsx |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @tailwindcss/typography | Hand-written prose CSS | Already have hand-written rules; plugin provides 30+ element coverage vs ~15 currently hand-written. Plugin is additive, not a rewrite risk |

**Installation:**
```bash
npm install @tailwindcss/typography@^0.5.19
```

**Version verification:** `@tailwindcss/typography` latest is 0.5.19 (verified via `npm view`). Tailwind 4.2.2 is already installed locally.

## Architecture Patterns

### File Change Map
```
src/
├── app/
│   ├── layout.tsx         # Add Space_Grotesk import + CSS variable
│   └── globals.css        # @plugin, type scale, prose overrides, domain elements
└── components/
    └── quick-ref-panel.tsx # Verify only (no changes expected)
```

### Pattern 1: Tailwind v4 Plugin Registration via @plugin
**What:** In Tailwind v4, plugins are loaded in CSS using `@plugin` directive instead of JS config
**When to use:** Any time a Tailwind plugin needs to be added in a v4 CSS-first project
**Example:**
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```
**Confidence:** HIGH -- verified in Tailwind v4 docs and GitHub discussions

### Pattern 2: Typography Plugin Dark Mode Override
**What:** Override the plugin's CSS custom properties to map to the project's dark palette tokens
**When to use:** When the project uses a custom dark color palette (not Tailwind's built-in grays)
**Example:**
```css
/* In @layer base, override typography plugin variables */
.prose {
  --tw-prose-body: var(--color-text);
  --tw-prose-headings: var(--color-text);
  --tw-prose-links: var(--color-text);
  --tw-prose-code: var(--color-param);
  --tw-prose-pre-bg: var(--color-surface);
  --tw-prose-pre-code: var(--color-text);
  --tw-prose-counters: var(--color-muted);
  --tw-prose-bullets: var(--color-muted);
  --tw-prose-hr: var(--color-border);
  --tw-prose-quotes: var(--color-text);
  --tw-prose-quote-borders: var(--color-border);
  --tw-prose-th-borders: var(--color-muted);
  --tw-prose-td-borders: var(--color-border-subtle);
}
```
**Confidence:** HIGH -- this is the documented customization mechanism

### Pattern 3: next/font/google Font Addition
**What:** Add a new Google Font using Next.js built-in font optimization
**When to use:** Adding Space Grotesk as display typeface
**Example:**
```typescript
// layout.tsx
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['700'],  // Only bold weight needed for headings
});

// In JSX:
<html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
```
**Confidence:** HIGH -- follows exact pattern already used for Inter and JetBrains Mono in the codebase

### Pattern 4: CSS clamp() for Responsive Type
**What:** Fluid typography scaling between viewport breakpoints using clamp()
**When to use:** h1 and h2 responsive scaling (mobile 320px to desktop 768px+)
**Example:**
```css
.prose h1 {
  font-size: clamp(1.75rem, 1.2rem + 2vw, 2.4375rem);
}
.prose h2 {
  font-size: clamp(1.5rem, 1.1rem + 1.5vw, 1.9375rem);
}
```
**Confidence:** HIGH -- standard CSS technique, values from UI-SPEC

### Anti-Patterns to Avoid
- **Adding prose-invert without overriding variables:** `prose-invert` uses Tailwind's default inverted grays, not the project's OKLCH palette. Using it alone would introduce cold grays. Override the `--tw-prose-invert-*` variables, or skip `prose-invert` entirely and set `--tw-prose-*` variables directly to dark values
- **Duplicating plugin defaults in custom CSS:** The typography plugin already handles `p`, `ul`, `ol`, `blockquote`, `table` base styling. Don't re-declare these in `@layer base` unless overriding a specific property. Keep existing custom rules only for properties the plugin doesn't handle or where the UI-SPEC diverges
- **Using @utility to override prose:** Some GitHub discussions suggest `@utility prose { ... }` for customization. This creates a new utility that competes with the plugin's prose class. Use `@layer base` overrides on `.prose` instead
- **Applying `max-w-prose` to content containers:** The typography plugin adds `max-width: 65ch` by default. The project's layout likely handles width constraints at the page/container level. Add `max-w-none` to prose containers or override in CSS

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Prose element reset (margins, line-heights for p, ul, ol, blockquote, hr, img, figure, figcaption) | Custom CSS for every markdown element | @tailwindcss/typography plugin | Plugin handles ~30 elements with tested defaults; hand-rolling misses edge cases like nested lists, figure captions, consecutive headings |
| Font loading with FOUT prevention | Manual @font-face + preload | next/font/google | Next.js automatically handles font subsetting, preloading, CSS variable injection, and zero-layout-shift |

## Common Pitfalls

### Pitfall 1: Typography Plugin Default Max-Width
**What goes wrong:** Plugin applies `max-width: 65ch` to `.prose` containers, overriding the project's layout width constraints
**Why it happens:** The plugin is designed for standalone article pages and assumes content width should be limited
**How to avoid:** Either add `max-w-none` class alongside `prose` on containers, or override in CSS: `.prose { max-width: none; }`
**Warning signs:** Content appears narrower than expected after adding the plugin

### Pitfall 2: Specificity Conflicts with Existing .prose Rules
**What goes wrong:** Existing `.prose h1`, `.prose table`, etc. rules in `@layer base` may have lower specificity than plugin-generated styles (which are utility-layer)
**Why it happens:** Tailwind typography generates styles at utility specificity; `@layer base` rules have lower specificity
**How to avoid:** Override using the `--tw-prose-*` CSS custom properties rather than fighting specificity. For structural overrides (font-family, font-size), apply directly on `.prose` selectors in `@layer base` with sufficient specificity. Test that custom rules win
**Warning signs:** Heading sizes or colors revert to plugin defaults despite custom CSS

### Pitfall 3: prose-invert Cold Grays
**What goes wrong:** Adding `prose-invert` class introduces Tailwind's default inverted gray palette (cold blue-grays) instead of the project's warm OKLCH tokens
**Why it happens:** `prose-invert` maps to `--tw-prose-invert-*` variables which default to Tailwind's built-in gray palette
**How to avoid:** Override `--tw-prose-invert-*` variables with project tokens, OR skip `prose-invert` entirely and set the `--tw-prose-*` variables directly to dark-appropriate values (since the app is always dark mode, no light/dark toggle exists)
**Warning signs:** Text appears as cool gray instead of warm `#e8e8e8`

### Pitfall 4: Space Grotesk Weight Bloat
**What goes wrong:** Loading all Space Grotesk weights (300-700) when only bold (700) is needed for headings
**Why it happens:** Default next/font/google import without specifying weights loads variable font with all weights
**How to avoid:** Specify `weight: ['700']` in the Space_Grotesk constructor to load only the needed weight
**Warning signs:** Larger font file download, slower page load

### Pitfall 5: quick-ref-prose Regression
**What goes wrong:** The compact `.quick-ref-prose` variant breaks when typography plugin adds its own heading sizes
**Why it happens:** Typography plugin styles may override the compact heading sizes defined for quick-ref-prose
**How to avoid:** Ensure `.quick-ref-prose` overrides have sufficient specificity to beat both the plugin and the new type scale. The existing pattern (`className="prose quick-ref-prose"`) should work if CSS specificity is maintained
**Warning signs:** Quick-ref panel headings appear at full editorial size instead of compact 20px/16px/14px

### Pitfall 6: Callout Plugin CSS Conflicts
**What goes wrong:** `rehype-callouts` generates its own default CSS that conflicts with custom callout styling
**Why it happens:** The rehype-callouts@2.1.2 package may inject default styles via its own CSS
**How to avoid:** Verify whether rehype-callouts ships CSS. If so, either import it and override, or exclude it. The project's existing custom `.callout` styles in globals.css should take precedence if specificity is managed
**Warning signs:** Callouts appear with unexpected default styling (different padding, borders, colors)

## Code Examples

### Font Setup in layout.tsx
```typescript
// Source: Existing codebase pattern (Inter/JetBrains Mono setup)
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['700'],
});

// In html className:
className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
```

### Plugin Registration + Theme Token in globals.css
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  /* Existing tokens... */
  --font-display: var(--font-space-grotesk);
}
```

### Typography Plugin Variable Overrides
```css
@layer base {
  .prose {
    --tw-prose-body: var(--color-text);
    --tw-prose-headings: var(--color-text);
    --tw-prose-links: var(--color-text);
    --tw-prose-bold: var(--color-text);
    --tw-prose-code: var(--color-param);
    --tw-prose-pre-bg: var(--color-surface);
    --tw-prose-pre-code: var(--color-text);
    --tw-prose-counters: var(--color-muted);
    --tw-prose-bullets: var(--color-muted);
    --tw-prose-hr: var(--color-border);
    --tw-prose-th-borders: var(--color-muted);
    --tw-prose-td-borders: var(--color-border-subtle);
    max-width: none;
  }
}
```

### Display vs Body Heading Split
```css
@layer base {
  .prose h1,
  .prose h2 {
    font-family: var(--font-display);
    letter-spacing: -0.025em;
    line-height: 1.15;
  }

  .prose h1 {
    font-size: clamp(1.75rem, 1.2rem + 2vw, 2.4375rem);
    font-weight: 700;
  }

  .prose h2 {
    font-size: clamp(1.5rem, 1.1rem + 1.5vw, 1.9375rem);
    font-weight: 700;
    margin-top: 2em;
    margin-bottom: 0.75em;
  }

  .prose h3 {
    font-family: var(--font-sans);
    font-size: 1.5625rem; /* 25px */
    font-weight: 700;
    letter-spacing: -0.015em;
    line-height: 1.3;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }

  .prose h4 {
    font-family: var(--font-sans);
    font-size: 1.25rem; /* 20px */
    font-weight: 700;
    letter-spacing: -0.015em;
    line-height: 1.3;
    margin-top: 1.25em;
    margin-bottom: 0.5em;
  }
}
```

### Callout Type Differentiation
```css
@layer base {
  .prose .callout[data-callout="challenge"] {
    border-left-color: oklch(0.75 0.15 85); /* amber */
  }
  .prose .callout[data-callout="challenge"] .callout-title {
    color: oklch(0.75 0.15 85);
  }

  .prose .callout[data-callout="tip"] {
    border-left-color: oklch(0.70 0.15 145); /* green */
  }
  .prose .callout[data-callout="tip"] .callout-title {
    color: oklch(0.70 0.15 145);
  }

  .prose .callout[data-callout="warning"] {
    border-left-color: oklch(0.65 0.20 25); /* red */
  }
  .prose .callout[data-callout="warning"] .callout-title {
    color: oklch(0.65 0.20 25);
  }
}
```

### Param Table with Accent Left Border (D-10)
```css
@layer base {
  .prose .param-table {
    border-left: 3px solid var(--color-accent);
    border-collapse: collapse;
    margin-bottom: 1em;
    font-size: 14px;
  }

  .prose .param-table th {
    background-color: var(--color-surface);
    /* ... other styles */
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `plugins: [typography()]` in tailwind.config.js | `@plugin "@tailwindcss/typography"` in CSS | Tailwind v4.0 (Jan 2025) | Plugin registration moved to CSS-first; no JS config file needed |
| `@tailwind base; @tailwind utilities;` | `@import "tailwindcss";` | Tailwind v4.0 (Jan 2025) | Single import replaces multiple directives |
| typography config via JS theme extension | Override `--tw-prose-*` CSS custom properties | Tailwind v4.0 (Jan 2025) | CSS-first customization; JS config still works via `@config` but not needed here |

## Open Questions

1. **prose-invert vs direct variable override**
   - What we know: `prose-invert` provides dark mode defaults, but uses Tailwind's cold grays. Direct `--tw-prose-*` overrides with project tokens achieve the correct palette
   - What's unclear: Whether both `prose` and `prose-invert` classes are needed, or if setting `--tw-prose-*` directly on `.prose` is sufficient (since the app has no light mode)
   - Recommendation: Set `--tw-prose-*` variables directly. Skip `prose-invert` class since there is no light/dark toggle -- the app is always dark. This avoids cold gray bleed-through from any unoverridden `--tw-prose-invert-*` variables

2. **rehype-callouts default CSS**
   - What we know: rehype-callouts@2.1.2 is installed and configured. The project has custom `.callout` CSS
   - What's unclear: Whether the package injects its own CSS that might conflict with the new callout type colors
   - Recommendation: Check if rehype-callouts ships default styles. If it does, ensure custom styles override them. The existing pattern of targeting `.prose .callout[data-callout]` should have sufficient specificity

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.x |
| Config file | vitest.config.ts |
| Quick run command | `npm run test -- --run` |
| Full suite command | `npm run test` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| TOKEN-02 | Modular type scale with distinct typefaces | visual / manual | Manual browser inspection | N/A -- CSS-only, no unit test possible |
| CONTENT-01 | Markdown rendered as polished prose | smoke | `npm run build` (catches CSS/import errors) | N/A -- CSS-only |
| CONTENT-01 | Domain elements retain styling | regression | `npm run test -- --run src/components/__tests__/quick-ref-panel.test.tsx` | Yes |
| CONTENT-01 | Prose class applied to content containers | unit | `npm run test -- --run src/components/__tests__/session-detail.test.tsx` | Yes |

### Sampling Rate
- **Per task commit:** `npm run build` (validates CSS imports, font loading, no build errors)
- **Per wave merge:** `npm run test` (full suite)
- **Phase gate:** Full suite green + visual inspection of 3+ session pages, 2+ patch pages, quick-ref panel

### Wave 0 Gaps
None -- existing test infrastructure covers build validation. This phase is primarily CSS changes validated visually. Existing component tests verify `.prose` class application on content containers.

## Sources

### Primary (HIGH confidence)
- Tailwind CSS v4 docs: Functions and Directives -- @plugin syntax (https://tailwindcss.com/docs/functions-and-directives)
- GitHub tailwindlabs/tailwindcss-typography README -- prose-invert mechanism, CSS custom properties (https://github.com/tailwindlabs/tailwindcss-typography)
- Existing codebase: `src/app/globals.css`, `src/app/layout.tsx`, `src/lib/markdown/processor.ts` -- current implementation patterns

### Secondary (MEDIUM confidence)
- GitHub Discussion #15904 -- Tailwind v4 typography configuration patterns (https://github.com/tailwindlabs/tailwindcss/discussions/15904)
- npm registry -- version verification for @tailwindcss/typography (0.5.19) and tailwindcss (4.2.2)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- single well-known dependency, verified versions, existing codebase patterns
- Architecture: HIGH -- CSS-only changes, two files, patterns already established in codebase
- Pitfalls: HIGH -- well-documented plugin behavior, specificity model understood

**Research date:** 2026-04-07
**Valid until:** 2026-05-07 (stable domain, no fast-moving changes expected)
