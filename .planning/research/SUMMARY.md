# Project Research Summary

**Project:** Evolver Deep Learning — v1.3 Visual Redesign
**Domain:** Visual/design overhaul of an existing Next.js 15 synth learning app
**Researched:** 2026-04-06
**Confidence:** HIGH

## Executive Summary

The v1.3 Visual Redesign is a **styling overhaul, not a structural rewrite**. The existing 51-component architecture, App Router data flow, and Obsidian vault content pipeline remain entirely unchanged. All visual work flows through a single control point — the `@theme` block in `globals.css` — which makes this a token-first, cascade-driven redesign. Two new packages are needed: `motion` (formerly Framer Motion, for micro-interactions and spring-physics animations) and `@tailwindcss/typography` (to replace 100+ lines of hand-rolled prose CSS). Everything else — OKLCH color scales, spacing tokens, grain texture, typography scale — is achieved within Tailwind v4's existing CSS-first `@theme` system with zero additional dependencies.

The recommended approach is layered token architecture: a primitive palette layer feeds semantic intent tokens (`--color-surface-raised`, `--color-border`, `--color-text-muted`), which cascade automatically into all 51 components. The build order is strict: **tokens first, then prose, then shell/nav, then cards, then interactive elements, then motion.** This sequencing prevents rework because every downstream layer inherits from upstream token decisions. The prose styling is the single highest-impact surface — sessions are the core product, and the `.prose` cascade touches 60 session files and 36 patch documents simultaneously. It must be treated as an atomic unit, never partially refactored.

The dominant risks are: (1) **SVG panel corruption** from container sizing changes disrupting 289 hand-placed controls in the two panel visualizers — both must be frozen until a dedicated final phase; (2) **accessibility regression** as "calm" or warm palette choices push muted text colors below the WCAG AA 4.5:1 threshold; and (3) **ADHD design violations** if motion or visual complexity increases beyond the project's single-focus learning constraint. The ADHD constraint is non-negotiable and must function as an acceptance criterion for every phase.

## Key Findings

### Recommended Stack

The existing stack (Next.js 15, React 19, Tailwind v4, Zustand, unified/remark) requires only two additions. Tailwind v4's `@theme` directive IS the design token system — there is no need for Style Dictionary, CSS-in-JS, or a component library. The `motion` package (v12+, import from `motion/react`) handles all animation needs including spring physics, layout animations, gesture handling, and hardware-accelerated scroll effects; all motion components require `"use client"` which matches existing codebase patterns. The `@tailwindcss/typography` plugin replaces hand-rolled prose styles and integrates via `@plugin` directive in CSS (not JS config) with Tailwind v4.

**Core technologies:**
- `motion@^12.38.0`: Animation — spring physics, layout animations, micro-interactions; replaces need for GSAP or CSS-only animation hacks
- `@tailwindcss/typography@^0.5.19`: Prose rendering baseline — replaces 100+ lines of manual `.prose` CSS while preserving domain-specific overrides
- Tailwind v4 `@theme` (already installed): Design token system — OKLCH color scales, spacing, radius, shadow tokens; no external token tool needed
- Pre-rendered 64x64 WebP grain tile (`public/textures/grain.webp`): Texture overlay — zero runtime cost vs. SVG feTurbulence; GPU-composited via CSS pseudo-element at opacity 0.02-0.05

**What NOT to add:** Radix UI / shadcn/ui (wrong scale — adds a component layer over 51 working components), GSAP (overkill vs. Motion), CSS Modules (fragments the styling approach), Sass (Lightning CSS already handles nesting), react-spring (less React 19 polish than Motion), any design token tool.

### Expected Features

The feature research defines a clear three-phase build sequence with explicit dependencies: color palette must land before typography, typography before component work, and prose before editorial layout. The "designed prose" differentiator is a two-pass effort — table-stakes pass makes it look decent, a later editorial pass makes it feel designed.

**Must have (table stakes):**
- Refined color palette with depth layers — current 3-surface system is visually flat; needs at minimum `surface-raised`, `border`, and `border-subtle` semantic tokens
- Typography scale with modular rhythm — current hard-coded px sizes lack hierarchy; impacts every component
- Card visual consistency — 5 card types (Hero, Patch, Module, Instrument, Count) have divergent border/padding/hover treatments
- Polished markdown/prose rendering — sessions are the core product; generic markdown viewer feel undermines the entire app
- Navigation visual weight — current minimal 48px bar has no brand expression
- Accessible contrast ratios — `--color-muted` (#737373) is near the AA threshold; warmth-shifting the palette risks regression

**Should have (differentiators):**
- Textured/warm dark theme — shift from cold gray to warm dark tones with subtle grain (Hologram reference without mimicking it)
- Micro-interactions on interactive elements — transform + scale hover states, spring-physics feel
- Session content as editorial layout — parameter callouts, step markers, pull-quote elements as designed components
- Instrument-aware page shells — per-instrument accent color token at layout level via `[data-instrument="x"]` override
- Scroll-driven content reveals — subtle opacity fade-in only; no lateral movement or parallax
- Progress page data visualization — module journey map from stat cards to something worth looking at
- Footer as deliberate design element

**Defer (v2+):**
- Light mode / theme toggle — doubles design work; dark mode is the brand identity
- Animated page transitions — Next.js App Router transitions are complex and add latency perception
- Glassmorphism effects — poor readability on dark backgrounds, ages quickly
- Skeleton loading screens — overkill for a local-first, server-component-heavy app
- Custom cursor effects — breaks accessibility, adds nothing

### Architecture Approach

The redesign operates as a layered token replacement on top of the existing component tree with no structural changes to routing, data flow, or server/client boundaries. The three-layer token model (primitive → semantic → component) is the key pattern: primitives are raw OKLCH palette values, semantics map intent (`--color-bg`, `--color-surface-raised`), and the cascade handles the rest. The SVG panel internals are architecturally isolated — they use a `const styles = {}` object with hardcoded hex values representing physical hardware appearance, not UI chrome, and must not receive CSS variables.

**Major components by redesign tier:**
1. `globals.css @theme` — token foundation; all other work depends on this landing first
2. Layout shell (`app-shell.tsx`, `nav.tsx`, `layout.tsx`) — sets the visual frame; Tier 2 after tokens
3. Primary content cards (`hero-card.tsx`, `patch-card.tsx`, `module-card.tsx`, `instrument-card.tsx`, `count-card.tsx`, `session-row.tsx`) — highest visual identity impact; Tier 3
4. Interactive elements (`search-bar.tsx`, `patch-filter-bar.tsx`, `completion-toggle.tsx`) — focus/hover/active states; Tier 4, CSS-only DOM changes to protect state management
5. Motion and polish layer — micro-interactions, reduced-motion variants; Tier 5, final
6. Panel visualizer containers only — outer container styling only, never internals; dedicated final phase

### Critical Pitfalls

1. **SVG panel coordinate corruption** — Layout changes (container width, padding, flex/grid restructuring) silently break 289 hand-placed controls in both panel visualizers. The `delta / 3` drag sensitivity constant assumes a specific pixel-to-SVG-unit ratio; any container resize breaks it. Prevention: wrap panels in a stable `aspect-ratio` container from day one, freeze the panels until a dedicated final phase, and create a visual regression screenshot page before touching any layout.

2. **Accessibility regression in dark theme redesign** — Warming the palette (Hologram reference) tends toward lower-contrast muted tones. `--color-muted` (#737373 on #0a0a0a) is already near the AA threshold. Prevention: contrast-check every new color pairing before writing code; target 4.5:1 for body text, 7:1 for primary content. Run axe on every page template after palette changes.

3. **ADHD design principle violations** — References like Hologram and DaVincis are portfolio/marketing sites, not educational tools. Borrowing their visual energy unfiltered produces a visually impressive but exhausting interface. Prevention: treat ADHD constraints as hard acceptance criteria: max one animated element visible at a time, no autoplay >3 seconds, same or fewer clicks to any destination, each page has exactly one primary visual hierarchy.

4. **Markdown prose cascade destruction** — The `.prose` block in globals.css (lines 37-196) is an atomic unit covering 20+ rules for `.param-table`, `.callout`, `.quick-ref-prose`, heading anchors, and panel marker interop. Partial refactoring breaks 96 content files simultaneously. Prevention: create a test fixture page rendering every element type; treat prose as all-or-nothing per phase.

5. **Tailwind v4 token naming conflicts** — Renaming or removing existing `--color-*` tokens before migrating all 51 component className strings creates a silent split where some components use old palette values and others new. Prevention: inventory all token usages first, migrate at token level with find-and-replace, use an additive strategy (add new tokens alongside old, migrate, then remove old).

## Implications for Roadmap

Based on research, the dependency graph is deterministic: tokens must land before everything else, prose before editorial, layout before cards, cards before motion. Six phases map cleanly to the architecture tiers.

### Phase 1: Token Foundation
**Rationale:** Every other visual change references the palette. Changing colors after building other features causes cascading rework across all 51 components. This phase has zero visible impact to users but enables all subsequent phases.
**Delivers:** Expanded `@theme` block with OKLCH primitive scale, semantic color aliases (`surface-raised`, `border`, `border-subtle`), radius scale, shadow tokens, content width tokens, z-index scale. Zero visual regression — new tokens initially map to existing hex values.
**Addresses:** Color depth layers, accessible contrast foundation, spacing consistency, WCAG AA verification tooling
**Avoids:** Pitfall 5 (token naming conflicts), Pitfall 2 (accessibility regression) by establishing contrast checks before any visual changes

### Phase 2: Prose and Typography
**Rationale:** The prose layer is the highest single-impact visual surface (60 session files, 36 patch documents) and must be treated as an atomic unit. Typography scale decisions cascade into every component, so this must be defined before card or shell work.
**Delivers:** Rewritten `.prose` rules using semantic tokens, `@tailwindcss/typography` as base with domain-specific overrides retained (`.param-table`, `.callout`, `.quick-ref-prose`), modular type scale, improved table/code/callout/heading rendering. Test fixture page for regression.
**Uses:** `@tailwindcss/typography@^0.5.19`, OKLCH tokens from Phase 1
**Implements:** Prose styling as design system expression
**Avoids:** Pitfall 4 (cascade destruction) by treating prose atomically; Pitfall 14 (over-componentizing) by staying CSS-only

### Phase 3: Layout Shell and Navigation
**Rationale:** The shell sets the visual frame that all content pages inherit. Standardizing page containers and nav before touching cards prevents layout regressions when card dimensions change.
**Delivers:** Updated `nav.tsx` (visual weight, brand expression, active states), updated `app-shell.tsx` footer (deliberate design element), `.page-container` CSS utility replacing 13 pages of repeated `max-w-[720px]` inline patterns, panel visualizer containers wrapped in stable `aspect-ratio` divs (frozen, protected for final phase)
**Addresses:** Navigation visual weight, footer redesign, responsive layout foundation
**Avoids:** Pitfall 1 (SVG panel corruption) by locking panel containers before any layout work begins; Pitfall 7 (responsive breakpoint regression)

### Phase 4: Cards and Content Components
**Rationale:** Cards are the primary visual identity surface after shell and prose. All five card types share the same token foundation and can be standardized in one pass.
**Delivers:** Visual unification of all card components — shared border treatment, hover states, border-radius, padding, shadow tokens. Per-instrument accent color override via `[data-instrument]` CSS selector. Responsive layout refinement for patch grid and home page.
**Addresses:** Card visual consistency, instrument-aware theming, warm dark theme color temperature
**Avoids:** Pitfall 9 (token conflicts) — cards reference tokens, not raw hex values

### Phase 5: Interactive Elements and Motion
**Rationale:** Interactive element styling must come after card styling to inherit consistent hover/focus patterns. Motion is last because it depends on stable DOM structure and final token values.
**Delivers:** Search bar, filter pills, completion toggle, resume bar restyling (CSS-only DOM changes). Micro-interactions via `motion/react` (whileHover scale, spring transitions, stagger for list rendering). `prefers-reduced-motion` fallbacks for every animation. Grain texture overlay. Scroll-driven opacity reveals on session content.
**Uses:** `motion@^12.38.0`
**Avoids:** Pitfall 5 (animation performance) — transform/opacity only; Pitfall 6 (motion sickness) — reduced-motion for all; Pitfall 3 (ADHD violations) — one animated element at a time; Pitfall 12 (bundle inflation)

### Phase 6: Panel Visualizer Integration and Final Audit
**Rationale:** Panel components are the most complex and fragile in the codebase (782 and 1350 LOC). They must be last, only after all layout work is stable and verified. This phase is also the cross-cutting audit for the "looks done but isn't" checklist.
**Delivers:** Panel container integration polish (outer div only — zoom transitions, contextual dimming, mobile treatment). Full visual regression check across all pages. Contrast audit via axe. ADHD 5-second test for each page. Progress page visualization upgrade. Final "looks done but isn't" checklist verification.
**Avoids:** Pitfall 1 (SVG panel corruption) by operating only on outer containers; Pitfall 13 (color-only information loss in panels)

### Phase Ordering Rationale

- **Tokens before everything:** The cascade dependency is absolute. Changing `--color-accent` after card hover states are built means touching 51 component className strings. Changing it in the token layer means touching one line.
- **Prose before shell, shell before cards:** Prose defines the typographic scale that cards inherit; shell defines the spatial frame that cards occupy. Reversing this order requires rework at each step.
- **Motion last:** Animations layer on top of stable visual states. Adding springs and hover transforms while token values and DOM structure are still changing produces brittle animation code.
- **Panels in dedicated final phase:** Not because they're unimportant, but because they're the most fragile. Every layout restructuring in phases 1-5 must be complete and verified before panel container dimensions are considered final.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 5 (Motion):** The interaction between `motion/react` `AnimatePresence` and Next.js App Router page navigation has known edge cases. Validate the specific route transition pattern before planning implementation details.
- **Phase 6 (Panels):** The `delta / 3` drag sensitivity recalibration formula in `useKnobDrag` needs measurement at the actual new container dimensions. This requires running the app, not just reading code.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Tokens):** OKLCH in Tailwind v4 `@theme` is well-documented with official sources. Direct implementation.
- **Phase 2 (Prose/Typography):** `@tailwindcss/typography` `@plugin` integration is documented. Challenge is domain-specific (prose override inventory), not technical research.
- **Phase 3 (Shell):** CSS utility `.page-container` extraction is a mechanical refactor. No research needed.
- **Phase 4 (Cards):** Token-driven className updates. Mechanical once tokens are defined.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All packages verified with official sources and npm. Motion v12 and @tailwindcss/typography v0.5.19 confirmed compatible with React 19 + Tailwind v4 + Next.js 15. The "two packages only" conclusion is strongly supported. |
| Features | HIGH | Reference site analysis (Hologram, Ableton, DaVincis) was direct/fetched. Existing codebase audit confirmed current token and component inventory. Feature dependency graph is derived from the actual codebase, not speculation. |
| Architecture | HIGH | Based on direct codebase analysis of all 51 components, globals.css, and both panel visualizers. Three-layer token pattern is a well-established Tailwind v4 practice. SVG panel isolation finding is based on actual code inspection. |
| Pitfalls | HIGH | Pitfalls 1-4 are grounded in specific codebase observations (line numbers, LOC counts, actual hex values, specific component behaviors). Pitfalls 5-10 are grounded in established web platform constraints. |

**Overall confidence:** HIGH

### Gaps to Address

- **Display typeface decision:** Research recommends adding a display/heading typeface with music/instrument character but does not commit to a specific font. This requires a design decision before Phase 2 begins. Validate against `next/font` availability.
- **Accent color warmth:** Research flags that `--color-accent` (#c8ff00) may need warmth adjustment but does not commit. This requires visual experimentation against the warm dark background before Phase 1 token values are finalized.
- **Per-instrument accent color values:** Phase 4 implements instrument-aware theming but does not specify what the Cascadia accent color should be. Defer to Phase 4 planning.
- **Motion budget for panel pages:** Phase 5 specifies no decorative animations on panel pages, but the panel zoom transition (Phase 6) is interactive animation. The boundary needs explicit definition during Phase 5 planning.

## Sources

### Primary (HIGH confidence)
- [Motion npm](https://www.npmjs.com/package/motion) — v12.38.0, React 19 + Next.js 15 compatibility
- [Motion official docs](https://motion.dev/docs/react) — `motion/react` import path, hardware-accelerated scroll in v12
- [Tailwind CSS v4 @theme docs](https://tailwindcss.com/docs/theme) — CSS-first configuration, OKLCH support
- [@tailwindcss/typography npm](https://www.npmjs.com/package/@tailwindcss/typography) — v0.5.19, `@plugin` directive integration
- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first configuration philosophy
- Codebase analysis: globals.css (213 lines), evolver-panel.tsx (782 LOC, 110 controls), cascadia-panel.tsx (1350 LOC, 179 controls), session-detail.tsx (panel marker regex pipeline), all 51 components

### Secondary (MEDIUM confidence)
- [Design Tokens That Scale in 2026 (Tailwind v4)](https://www.maviklabs.com/blog/design-tokens-tailwind-v4-2026) — three-layer token pattern
- [Epic Web Dev: Tailwind CSS Color Tokens](https://www.epicweb.dev/tutorials/tailwind-color-tokens) — semantic color token patterns
- [Dark Mode Best Practices 2026](https://natebal.com/best-practices-for-dark-mode/) — surface elevation, color temperature
- [Inclusive Dark Mode — Smashing Magazine](https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/) — accessible dark theme patterns

### Tertiary (reference / design direction)
- [Hologram Electronics](https://hologramelectronics.com) — warm neutrals, material-aware design, boutique instrument feel; fetched and analyzed
- [Ableton Learning Synths](https://learningsynths.ableton.com) — interactive element integration, educational information architecture; fetched and analyzed
- [Da Vincis Digital](https://davincis.digital) — scroll-driven animation reference, used selectively and filtered through ADHD constraints
- [Designing for users with ADHD](https://digitalcommunications.wp.st-andrews.ac.uk/2025/02/12/designing-for-users-with-adhd/) — ADHD web design principles
- [Designing Safer Web Animation For Motion Sensitivity](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/) — vestibular disorder animation safety

---
*Research completed: 2026-04-06*
*Ready for roadmap: yes*
