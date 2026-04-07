# Stack Research: v1.3 Visual Redesign

**Project:** Evolver Deep Learning
**Milestone:** v1.3 Visual Redesign
**Researched:** 2026-04-06
**Confidence:** HIGH

## Executive Summary

This milestone needs exactly two new dependencies: **Motion** (animation library, formerly Framer Motion) and **@tailwindcss/typography** (prose styling plugin). Everything else -- color system, texture/grain, spacing tokens, typography scale -- is achieved through Tailwind v4's existing `@theme` directive with zero new packages.

The key insight: Tailwind v4's CSS-first `@theme` system IS the design token layer. There is no need for a separate design token tool, CSS-in-JS library, or component framework. The visual redesign is a styling overhaul, not a structural one -- the 51 existing components stay, they just get restyled.

## Existing Stack (Unchanged)

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.5.14 | App framework |
| React | 19.2.4 | UI library |
| Tailwind CSS | 4.2.2 | Styling (CSS-first via `@theme`) |
| clsx | 2.1.1 | Conditional class merging |
| Lucide React | 1.7.0 | Icons |
| Inter + JetBrains Mono | next/font/google | Typography |
| Zustand | 5.0.12 | Client state |
| unified/remark/rehype | 11.x | Markdown pipeline |

## Recommended Additions

### 1. Motion (formerly Framer Motion) -- Animation

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `motion` | ^12.38.0 | Component animation, page transitions, micro-interactions | The standard React animation library. Rebranded from framer-motion in mid-2025. Full React 19 + Next.js 15 App Router support. Hardware-accelerated scroll animations in v12. Spring physics, layout animations, gesture handling. 30M+ monthly npm downloads. Nothing else comes close for declarative React animation |

**Import path:** `motion/react` (NOT the old `framer-motion` package)

**Specific uses in this redesign:**
- Page route transition animations (fade/slide between sessions)
- Card hover micro-interactions (lift, scale, subtle glow)
- Stagger animations for list rendering (session lists, patch grids)
- Layout animations when filtering/sorting patches (items reflow smoothly)
- Scroll-linked effects for hero/landing sections (parallax, reveal)
- SVG panel control highlight animations (pulse, focus ring)
- Accordion/expand animations (session quick-ref, troubleshooting)
- Button press feedback (scale down on press, spring back)

**Key APIs for this project:**
- `motion.div` -- basic animation wrapper for any element
- `AnimatePresence` -- exit animations, page transitions
- `useScroll` + `useTransform` -- hardware-accelerated scroll-linked effects (new in v12)
- `LayoutGroup` -- shared layout animations when filtering patch lists
- `spring` transition type -- natural-feeling motion (synth knob tactile feel)
- `whileHover`, `whileTap` -- gesture-driven micro-interactions

**Server/client boundary:** All Motion components require `"use client"`. Wrap animated elements in client components; keep data fetching in server component parents. This matches the existing pattern in the codebase.

### 2. @tailwindcss/typography -- Prose Styling

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `@tailwindcss/typography` | ^0.5.19 | Professional markdown/prose rendering | Official Tailwind plugin. Provides battle-tested typographic defaults for rendered markdown content. The project currently hand-rolls ~100 lines of `.prose` styles in globals.css (lines 37-196). This plugin replaces that with a professional, customizable baseline |

**Integration with Tailwind v4:**
```css
/* In globals.css, add after @import "tailwindcss": */
@plugin "@tailwindcss/typography";
```

**Migration strategy:**
The existing hand-rolled `.prose` styles in globals.css should be progressively replaced by typography plugin defaults. The plugin provides:
- `prose-invert` for dark backgrounds (replaces manual dark color overrides)
- Responsive sizing (`prose-sm`, `prose-lg`, `prose-xl`)
- Color theming via CSS custom properties
- Heading hierarchy, paragraph spacing, list styling
- Code block and inline code styling
- Table base styling, blockquote styling

**What the plugin replaces (currently manual in globals.css):**
- `.prose h1/h2/h3/h4` sizing and spacing (lines 38-45)
- `.prose p` margins (line 53)
- `.prose a` link styling (lines 55-65)
- `.prose ul/ol/li` list styling (lines 67-69)
- `.prose code` and `.prose pre` code styling (lines 71-91)
- `.prose table/th/td` base table styling (lines 93-119)

**What stays custom (domain-specific, keep in globals.css):**
- `.param-table` styling -- synth parameter dump tables are unique to this domain
- `.callout` variants -- challenge, tip, warning callouts
- `.mermaid-placeholder` -- diagram container styling
- Task list checkbox accent color
- `.quick-ref-prose` compact heading overrides

### 3. OKLCH Color System via @theme (No New Dependency)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Tailwind v4 `@theme` | 4.2.2 (installed) | Design token system with OKLCH color scales | No new dependency. Tailwind v4's `@theme` IS the design token system. OKLCH provides perceptually uniform lightness steps -- critical for generating cohesive shade scales |

**Current state:** 6 flat hex colors in `@theme`:
```css
--color-bg: #0a0a0a;
--color-surface: #161616;
--color-text: #e8e8e8;
--color-muted: #737373;
--color-accent: #c8ff00;
--color-param: #a3e635;
```

This is too few for a polished design system. A redesign needs intermediate shades for borders, raised surfaces, hover states, focus rings, and text hierarchy.

**Recommended expansion pattern:**
```css
@theme {
  /* Neutral scale -- warm-tinted for synth hardware feel */
  /* Using OKLCH: consistent lightness steps, slight warm hue */
  --color-neutral-50: oklch(0.98 0.005 80);
  --color-neutral-100: oklch(0.94 0.008 80);
  --color-neutral-200: oklch(0.85 0.010 80);
  --color-neutral-300: oklch(0.70 0.012 80);
  --color-neutral-400: oklch(0.55 0.010 80);
  --color-neutral-500: oklch(0.42 0.008 80);
  --color-neutral-600: oklch(0.30 0.008 80);
  --color-neutral-700: oklch(0.22 0.008 80);
  --color-neutral-800: oklch(0.16 0.006 80);
  --color-neutral-900: oklch(0.10 0.005 80);
  --color-neutral-950: oklch(0.06 0.004 80);

  /* Accent scale -- generated from base accent hue */
  --color-accent-50: oklch(0.97 0.04 110);
  --color-accent-100: oklch(0.93 0.08 110);
  /* ... through 900 */

  /* Semantic aliases -- maps to scale values */
  --color-bg: var(--color-neutral-950);
  --color-surface: var(--color-neutral-900);
  --color-surface-raised: var(--color-neutral-800);
  --color-border: var(--color-neutral-700);
  --color-text: var(--color-neutral-100);
  --color-text-muted: var(--color-neutral-400);
  --color-text-subtle: var(--color-neutral-500);
}
```

**Why OKLCH over hex:** Current hex values (`#0a0a0a`, `#161616`, `#737373`) have no mathematical relationship. OKLCH defines a hue angle and varies only lightness/chroma, producing scales that feel cohesive. Tailwind v4 natively supports OKLCH in all color utilities.

**Why NOT a design token tool (Style Dictionary, Tokens Studio):** The project has one theme. Tailwind v4's `@theme` handles token definition, utility generation, and runtime CSS variable access in a single mechanism. External token tools add complexity for multi-platform or multi-brand scenarios that don't apply here.

### 4. Texture/Grain Overlay (No Dependency)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| CSS + pre-rendered noise tile | N/A (native) | Subtle noise/grain texture overlay inspired by Hologram Electronics aesthetic | Zero dependencies. Generate a small noise tile (64x64px WebP) once using fffuel.co/nnnoise, use as a repeating CSS background on a pseudo-element |

**Implementation approach:**
```css
.texture-grain::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.03;
  pointer-events: none;
  background-image: url('/textures/grain.webp');
  background-repeat: repeat;
  mix-blend-mode: overlay;
  z-index: 1;
}
```

**Why pre-rendered tile over inline SVG feTurbulence:** SVG `feTurbulence` is CPU-rendered on every paint. A pre-rendered 64x64 WebP tile (~2KB) is GPU-composited and costs nothing at runtime. The grain should be subtle (opacity 0.02-0.05) -- it adds warmth and texture without calling attention to itself.

**Asset to generate:** One `grain.webp` file (64x64px), placed in `public/textures/`. Generate using fffuel.co/nnnoise with low frequency, monochrome, and export as WebP.

### 5. Spacing/Typography Scale via @theme (No Dependency)

The existing spacing tokens (`--spacing-xs` through `--spacing-3xl`) cover basic needs but the redesign should expand them:

```css
@theme {
  /* Extended spacing for layout */
  --spacing-4xl: 96px;
  --spacing-5xl: 128px;

  /* Typography scale (if overriding plugin defaults) */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;

  /* Border radius scale */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
}
```

No dependency needed -- these are native Tailwind v4 theme tokens.

## What NOT to Add

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| styled-components / Emotion | CSS-in-JS adds runtime cost, poor RSC support in Next.js 15, conflicts with Tailwind v4's CSS-first model | Tailwind v4 `@theme` + utility classes |
| Radix UI / shadcn/ui | Adds a component abstraction layer over 51 existing working components. This is a visual refresh, not a structural rewrite. Adopting a component library means rewriting every component for cosmetic changes | Restyle existing components with Tailwind utilities |
| GSAP | Overkill for UI micro-interactions. GSAP excels at timeline-heavy marketing animations and scroll stories. Motion covers all needed React animation patterns with better integration | Motion (`motion/react`) |
| tailwindcss-animate | Motion handles all animation needs with more control. tailwindcss-animate adds CSS-only keyframe utilities that duplicate what Motion does better and what CSS `@keyframes` already handles | Motion for complex, CSS `@keyframes` for simple (pulse, spin) |
| Custom font files / self-hosted fonts | Inter and JetBrains Mono via `next/font/google` are already optimal -- automatic subsetting, zero layout shift, CDN caching | Keep existing `next/font/google` setup |
| CSS Modules | Tailwind v4 with `@theme` provides all scoping. CSS Modules would fragment the styling approach across two systems | Tailwind utility classes + globals.css for custom prose/domain styles |
| Sass/SCSS | Tailwind v4 uses Lightning CSS which handles nesting, custom properties, and all modern CSS features. SCSS adds build complexity with zero benefit over native CSS | Native CSS nesting (supported via Lightning CSS in Tailwind v4) |
| react-spring | Smaller community, less React 19 polish, more verbose API than Motion | Motion |
| Style Dictionary / Tokens Studio | Design token management tools for multi-platform, multi-brand systems. This is a single web app with one theme | Tailwind v4 `@theme` in globals.css |
| Chakra UI / Mantine | Full component libraries. Wrong tool for restyling an existing component set | Keep existing components, apply new design tokens |

## Installation

```bash
# New dependencies for v1.3 Visual Redesign
npm install motion@^12.38.0 @tailwindcss/typography@^0.5.19
```

Two packages. That is all.

## Configuration Changes

### globals.css (modified, not new):
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  /* Expanded OKLCH color system */
  /* Extended spacing scale */
  /* Typography scale tokens */
  /* Border radius scale */
  /* Keep existing font-sans and font-mono */
}

/* Existing domain-specific prose overrides stay */
/* New: grain texture utility class */
```

### No new config files:
- No `tailwind.config.ts` -- Tailwind v4 is CSS-first, `@theme` replaces it
- No motion config -- Motion works out of the box with zero configuration
- `postcss.config.mjs` stays unchanged

### Asset to create:
- `public/textures/grain.webp` -- 64x64px noise tile, generated once from fffuel.co/nnnoise

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Motion | CSS `@keyframes` only | If bundle size is the top priority and you only need opacity/transform transitions. Motion adds ~18KB gzipped but provides springs, layout animations, gesture handling, and scroll-linked effects that CSS cannot replicate |
| @tailwindcss/typography | Keep hand-rolled prose styles | If you need zero plugin opinions. But the current hand-rolled styles are converging on what the plugin provides -- why maintain 100+ lines manually when the plugin does it better and handles edge cases (nested lists, code in headings, etc.) |
| OKLCH in @theme | Keep 6 flat hex values | If you genuinely only need 6 colors. But a visual redesign inherently needs shade scales for hover states, borders, raised surfaces, focus rings, and text hierarchy levels |
| Pre-rendered grain tile | SVG feTurbulence filter | If you want animated/moving grain (film-like). For static subtle texture, a pre-rendered tile is vastly more performant |
| Pre-rendered grain tile | grained.js library | If you specifically want animated grain with configurable parameters at runtime. For a static texture, a 2KB WebP tile beats a JavaScript library |

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| `motion@^12.38.0` | React 19.2.x, Next.js 15.x | Full RSC awareness. Components using `motion.*` must be in `"use client"` files. `AnimatePresence` works with App Router. Hardware-accelerated `useScroll` in v12 |
| `@tailwindcss/typography@^0.5.19` | Tailwind CSS 4.2.x | Must use `@plugin` directive in CSS (not JS config). Dark mode supported via `prose-invert` class. Customization via CSS custom properties or `@config` directive |

Both packages are ESM-compatible and tree-shakeable.

## Sources

- [Motion npm](https://www.npmjs.com/package/motion) -- v12.38.0, published March 2026 (HIGH confidence)
- [Motion official docs](https://motion.dev/docs/react) -- React 19 support, hardware-accelerated scroll (HIGH confidence)
- [Motion changelog](https://motion.dev/changelog) -- v12 release notes, OKLCH animation support (HIGH confidence)
- [Tailwind CSS v4 @theme docs](https://tailwindcss.com/docs/theme) -- CSS-first configuration, OKLCH support (HIGH confidence)
- [@tailwindcss/typography npm](https://www.npmjs.com/package/@tailwindcss/typography) -- v0.5.19, last published Oct 2025 (HIGH confidence)
- [Tailwind v4 @plugin directive](https://github.com/tailwindlabs/tailwindcss/discussions/15904) -- Typography plugin v4 integration (HIGH confidence)
- [CSS-Tricks: Grainy Gradients](https://css-tricks.com/grainy-gradients/) -- SVG feTurbulence technique and performance (HIGH confidence)
- [fffuel nnnoise](https://www.fffuel.co/nnnoise/) -- SVG noise texture generation tool (HIGH confidence)
- [Hologram Electronics](https://hologramelectronics.com) -- Design reference: warm cream palette, custom typography, textured imagery (fetched and analyzed)
- [Learning Synths (Ableton)](https://learningsynths.ableton.com) -- Design reference: dark mode, interactive element integration, educational content layout (fetched and analyzed)
- [Da Vinci's Digital](https://davincis.digital) -- Design reference: scroll-triggered animations, parallax, dynamic typography (fetched and analyzed)

---
*Stack research for: v1.3 Visual Redesign*
*Researched: 2026-04-06*
