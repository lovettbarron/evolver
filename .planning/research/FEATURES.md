# Feature Research: Visual Redesign

**Domain:** Educational instrument learning app — visual/layout redesign
**Researched:** 2026-04-06
**Confidence:** HIGH (based on reference site analysis, existing codebase audit, and established design best practices)

## Feature Landscape

### Table Stakes (Users Expect These)

Features that are baseline for a polished, designed-feeling app. Missing any of these and the app still looks like a developer prototype.

| Feature | Why Expected | Complexity | Dependencies | Notes |
|---------|--------------|------------|--------------|-------|
| Refined color palette with depth layers | Current 3-color system (#0a0a0a, #161616, #e8e8e8) is flat. Users expect at least 4-5 surface elevation levels for visual hierarchy | LOW | Modifies `--color-*` CSS variables in globals.css | Hologram uses cream/olive/taupe with multiple neutrals. Add `--color-surface-raised`, `--color-surface-sunken`, `--color-border` at minimum |
| Typography scale with clear hierarchy | Current hard-coded px sizes (36/24/20) lack rhythm. A modular scale communicates structure | MEDIUM | Touches every component's text sizing. May change `--font-sans` choice | Hologram uses Hamburg Hand / Chalet pairing. Consider a display font for headings (instrument/music feel) vs Inter body. At minimum, implement a type scale (e.g., 1.25 ratio) |
| Consistent spacing system | Current custom spacing tokens (4/8/16/24/32/48/64px) are already decent but applied inconsistently across 51 components | MEDIUM | Audit all components for spacing consistency | Hologram uses 30px grid gutters. Current tokens are fine — the issue is consistent application |
| Card component visual consistency | ModuleCard, PatchCard, InstrumentCard, CountCard all use slightly different patterns (border vs no-border, different padding, different hover states) | MEDIUM | Touches 5+ card components | Standardize: surface color, border treatment, hover state, border-radius, padding, and content layout pattern |
| Polished markdown/prose rendering | Current `.prose` styles are functional but generic — looks like a styled markdown viewer, not designed content. Tables, code blocks, callouts, headings all need the "this was designed" treatment | HIGH | globals.css `.prose` rules + potentially a custom MDX component map | Biggest single impact item. Sessions are the core product — if they look like raw markdown, the whole app feels unfinished |
| Navigation with visual weight | Current nav is a minimal 48px bar with monospace "evolver" text. No visual presence or brand expression | MEDIUM | `nav.tsx`, `app-shell.tsx` — sticky header behavior already exists | Hologram has minimal but intentional nav. Add logo treatment, better active states, possibly a left sidebar for instrument context |
| Accessible contrast ratios | Current #737373 muted on #0a0a0a = 4.2:1 ratio, barely passes WCAG AA for normal text. Several areas likely fail | LOW | Audit and bump muted color values | Non-negotiable for any redesign. Check all text/background combinations |
| Responsive layout refinement | Current responsive approach is basic Tailwind utilities. Pages like home and session list need mobile-specific layouts, not just reflowed desktop | MEDIUM | Touch page layouts and card components | Current max-width is a flat 720px everywhere — consider wider for some views (patches grid, panel visualizer) |
| Focus states and keyboard navigation | Current focus states are minimal/default. A designed app has intentional focus rings that match the design system | LOW | Add focus-visible styles to design tokens | Use accent color ring with proper offset |

### Differentiators (Set This App Apart)

Features from the reference sites that would elevate this from "clean dark app" to "this feels like a music instrument company made it."

| Feature | Value Proposition | Complexity | Reference | Notes |
|---------|-------------------|------------|-----------|-------|
| Textured/warm dark theme | Move from "generic dark mode" to a warm, instrument-like feel. Think dark wood, aged metal, matte plastic — the materials of synthesizers | MEDIUM | Hologram (earth tones, cream/olive) | Shift from pure cold grays to warm dark tones. Not a full light mode — warm darks. e.g., background from #0a0a0a to a very dark warm gray like #0d0d0b, accent from neon green to something earthier or keep green but add warm secondary colors |
| Micro-interactions on interactive elements | Panel visualizer controls, filter pills, card hovers, completion toggles — subtle motion that makes the app feel alive and responsive | MEDIUM | Da Vincis (scroll animations, scale), Ableton (loading states) | Current hover states are color-only. Add transform scale, subtle shadows, spring-like transitions. Use `prefers-reduced-motion` guard (already have precedent with pulse-glow) |
| Session content as designed editorial layout | Sessions rendered not as "markdown viewer" but as a designed reading experience — pull quotes, parameter callouts as styled inline elements, step numbers as designed markers, section dividers | HIGH | Ableton (educational integration), Hologram (restraint) | This is the single biggest differentiator. Custom MDX components or remark plugins to transform markdown elements into designed components. Parameter tables become styled inline panels, not HTML tables |
| Instrument-aware page shells | Different instruments get subtly different visual treatments — section tint, accent color variation, header imagery. The Evolver pages feel different from Cascadia pages without breaking the design system | MEDIUM | N/A (unique to this app) | Already have section tint precedent (opacity 0.08). Extend to per-instrument accent color token + subtle visual differentiators |
| Panel visualizer integration polish | Panel SVGs embedded in sessions should feel integrated into the content flow, not dropped-in widgets. Smooth zoom transitions, contextual dimming of non-relevant sections, better mobile treatment | HIGH | Ableton (interactive element integration) | Current panel embedding works but feels like a separate tool pasted in. Add transition animations for zoom, fade non-active sections more gracefully |
| Progress visualization as data art | Progress page transforms from stat cards into something visually interesting — a module map, a journey visualization, practice heat map | HIGH | Da Vincis (dynamic visual energy) | Already have module-journey.tsx with pulsing dot. Elevate from functional to beautiful — make the progress page something users want to look at |
| Scroll-driven content reveals | Subtle fade-in and slide-up for content sections as they enter the viewport, especially on longer session pages | LOW | Da Vincis (scroll-triggered animations) | Use CSS `@scroll-timeline` or Intersection Observer. Keep subtle — Hologram's restraint, not Da Vincis' drama |
| Footer as design element | Current footer is an afterthought. Make it a deliberate design element — project identity, instrument quick links, warm closing to the page | LOW | Hologram (understated premium) | Small effort, outsized polish impact |

### Anti-Features (Do NOT Build These)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Light mode / theme toggle | "Every app should have both modes" | Doubles the design work for a single-user app. Dark mode is the brand identity. Instrument panels are designed for dark backgrounds | Commit to dark mode. Make it a warm, comfortable dark — not a compromise dark |
| Parallax scrolling or heavy scroll effects | Da Vincis reference has dramatic scroll animations | Motion-heavy pages conflict with ADHD focus. Session content should be read, not watched. Causes motion sickness for some users | Use minimal scroll-driven reveals (opacity fade only). Never move content laterally or scale on scroll |
| Custom cursor or pointer effects | "Makes it feel premium" | Breaks accessibility, confuses muscle memory, adds no information | Standard cursors with well-designed hover states |
| Glassmorphism / frosted glass effects | Trending in 2025-2026 design | Reduces text readability on dark backgrounds, performs poorly on older devices, ages quickly | Clean surface elevation with subtle borders — Hologram's "zero border-radius, 1px borders" approach |
| Animated page transitions | "SPA-like feel" | Next.js App Router page transitions are complex to implement well, add loading latency perception, and distract from content | Fast, clean page loads. If anything, a subtle top progress bar |
| Skeleton loading screens everywhere | "Modern loading pattern" | Over-engineering for a local-first app that loads from filesystem. Demo mode on Vercel is the only slow path | Show content immediately (server components already do this). Skeleton only for the search dropdown which is client-side |
| Gradient backgrounds or neon glow effects | "Synth aesthetic" | Neon/retrowave is cliche for synth apps. Reads as "student project" not "instrument company" | The Hologram approach: understated, material-aware, grown-up. Save neon for the single accent color at most |

## Feature Dependencies

```
Color Palette Refinement
    |
    +---> Typography Scale (type colors reference palette)
    |         |
    |         +---> Prose/Markdown Rendering (inherits type scale + colors)
    |         |
    |         +---> Card Visual Consistency (inherits type scale)
    |
    +---> Navigation Redesign (references palette tokens)
    |
    +---> Micro-interactions (hover/focus colors from palette)
    |
    +---> Instrument-aware Page Shells (extends palette with per-instrument tokens)

Spacing System Audit
    +---> Card Visual Consistency (uses standardized spacing)
    +---> Responsive Layout Refinement (spacing adapts per breakpoint)

Prose/Markdown Rendering (table stakes)
    +---> Session Editorial Layout (differentiator, extends prose into designed content)
          +---> Panel Visualizer Integration (panels embedded in editorial flow)

Accessible Contrast Ratios
    +---> Every other visual feature (contrast must be validated after each change)
```

### Dependency Notes

- **Color palette must come first:** Every other visual change references the palette. Changing colors after building other features causes rework.
- **Typography scale before component work:** Card text, nav text, prose text all need the scale defined before individual component styling.
- **Prose rendering is the bridge:** Table-stakes prose gets markdown looking decent; differentiator editorial layout makes it feel designed. Build in two passes.
- **Contrast validation is continuous:** Not a one-time task. Check after palette changes, after component styling, after prose updates.

## MVP Definition

### Phase 1: Foundation (Must Complete First)

- [ ] Color palette expansion — add depth layers, warm the darks, refine accent
- [ ] Typography scale — define modular scale, choose heading typeface, set hierarchy
- [ ] Spacing audit — apply existing tokens consistently across all 51 components
- [ ] Accessible contrast — validate all text/background combinations against WCAG AA

### Phase 2: Core Surfaces (Build on Foundation)

- [ ] Card component standardization — unified visual language across all card types
- [ ] Navigation redesign — visual weight, brand expression, better instrument context
- [ ] Prose/markdown polish — styled headings, code blocks, tables, callouts, task lists
- [ ] Footer redesign — deliberate design element, not an afterthought
- [ ] Focus states — intentional keyboard navigation styling
- [ ] Responsive refinement — mobile-specific layouts for key pages

### Phase 3: Elevation (Differentiators)

- [ ] Micro-interactions — hover transforms, spring transitions, completion celebrations
- [ ] Session editorial layout — custom components for parameters, steps, pull-quotes
- [ ] Panel visualizer integration — smooth zoom transitions, contextual dimming
- [ ] Instrument-aware theming — per-instrument accent colors and subtle visual variation
- [ ] Scroll-driven content reveals — subtle fade-in for session content sections
- [ ] Progress page visual upgrade — from stat cards to data visualization

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority | Phase |
|---------|------------|---------------------|----------|-------|
| Color palette refinement | HIGH | LOW | P1 | 1 |
| Typography scale | HIGH | MEDIUM | P1 | 1 |
| Prose/markdown rendering | HIGH | HIGH | P1 | 2 |
| Card visual consistency | HIGH | MEDIUM | P1 | 2 |
| Navigation redesign | MEDIUM | MEDIUM | P1 | 2 |
| Accessible contrast | HIGH | LOW | P1 | 1 |
| Responsive layout | MEDIUM | MEDIUM | P2 | 2 |
| Micro-interactions | MEDIUM | MEDIUM | P2 | 3 |
| Session editorial layout | HIGH | HIGH | P2 | 3 |
| Panel visualizer polish | MEDIUM | HIGH | P2 | 3 |
| Instrument-aware theming | LOW | MEDIUM | P3 | 3 |
| Scroll content reveals | LOW | LOW | P3 | 3 |
| Progress page visualization | LOW | HIGH | P3 | 3 |
| Footer redesign | LOW | LOW | P2 | 2 |
| Focus states | MEDIUM | LOW | P2 | 2 |

## Reference Site Pattern Analysis

| Pattern | Hologram | Ableton Learning Synths | Da Vincis | Our Approach |
|---------|----------|------------------------|-----------|--------------|
| Color temperature | Warm neutrals (cream, olive, taupe) | Cold (black + white + blue) | Dark charcoal + cyan | Warm darks — dark olive/brown undertones, not cold gray. Closer to Hologram's warmth in a dark palette |
| Typography | Custom display + body pairing | System-like, functional | GT Flexa display + Georgia body | Display font for headings (music/instrument character) + Inter body. Consider a humanist sans or slab serif for display |
| Spacing | Generous (30px gutters, 55px sections) | Modular (0.625rem increments) | Dense with dramatic vertical scale | Generous — the content is educational, it needs room to breathe. Increase section spacing from current values |
| Borders and surfaces | Zero border-radius, 1px borders, minimal shadow | Minimal, flat | Minimal | Move toward zero or very small border-radius (currently 6px). 1px borders for surface edges. Drop current rounded-lg cards to rounded or rounded-sm |
| Animation | Restrained (almost none) | Loading spinner, functional transitions | Heavy scroll + scale animations | Restrained with purpose — Hologram's philosophy. Transition on interaction, not on scroll. Exception: panel zoom |
| Brand expression | Strong (custom fonts, consistent palette, photography) | Moderate (Ableton brand, interactive is the brand) | Strong (motion is the brand) | Moderate — the instruments and curriculum are the brand. Design should support, not compete with, the synth panels and session content |
| Interactive elements | Outlined inputs, clean focus states | Blue primary buttons, outline secondaries | Minimal interactive | Warm accent buttons, outlined form elements, accent-tinted interactive states |
| Content presentation | Clean product cards, restrained | Interactive synth embedded in educational flow | Showcase/portfolio layout | Sessions as editorial content with embedded interactive panels — closest to Ableton's approach but with Hologram's restraint |

## Existing CSS Variable System (Integration Notes)

The current design system uses Tailwind v4's `@theme` directive with custom tokens in `globals.css`:

```css
@theme {
  --color-bg: #0a0a0a;        /* Will become warmer */
  --color-surface: #161616;    /* Needs elevation variants */
  --color-text: #e8e8e8;       /* May soften slightly */
  --color-muted: #737373;      /* Needs contrast bump */
  --color-accent: #c8ff00;     /* Evaluate warmth vs keep as-is */
  --color-param: #a3e635;      /* Parameter-specific green */
  --font-sans: var(--font-inter);
  --font-mono: var(--font-jetbrains-mono);
  --spacing-xs through --spacing-3xl;  /* Keep, enforce consistency */
}
```

All 51 components reference these tokens via Tailwind classes (`bg-surface`, `text-muted`, etc.). The redesign should extend this system, not replace it. New tokens get added; existing tokens get updated. No component should use raw hex values — everything flows through the theme.

Key integration points:
- **`globals.css @theme`** — single source of truth for all design tokens
- **`.prose` rules in `@layer base`** — all markdown rendering styles live here
- **Tailwind utility classes** — components use `bg-surface`, `text-accent`, `p-lg` etc. throughout
- **Per-instrument accent** — would need a CSS custom property override at the instrument layout level (e.g., `[data-instrument="cascadia"] { --color-accent: #4ecdc4; }`)

## Sources

- [Hologram Electronics](https://hologramelectronics.com) — reference site analysis (warm neutrals, material-aware design, boutique instrument feel)
- [Ableton Learning Synths](https://learningsynths.ableton.com) — reference site analysis (interactive element integration, educational information architecture)
- [Da Vincis Digital](https://davincis.digital) — reference site analysis (scroll-driven animation, dynamic visual energy — used selectively)
- [Dark Mode UI Best Practices 2025](https://www.graphiceagle.com/dark-mode-ui/) — contrast ratios, typography weight in dark mode, avoiding pure black
- [Inclusive Dark Mode — Smashing Magazine](https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/) — accessible dark theme patterns
- [Dark Mode Best Practices 2026](https://natebal.com/best-practices-for-dark-mode/) — surface elevation, color temperature
- [Syntorial Review](https://producerhive.com/buyer-guides/learn/syntorial-review/) — synth learning app UX patterns
- [Modern Web App Design 2026](https://halodigital.co/modern-web-application-design/) — micro-interaction and subtle animation trends

---
*Feature research for: Visual Redesign of Evolver Deep Learning App (v1.3 milestone)*
*Researched: 2026-04-06*
