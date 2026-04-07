# Domain Pitfalls

**Domain:** Visual redesign of existing Next.js synth learning app
**Researched:** 2026-04-06

## Critical Pitfalls

Mistakes that cause rewrites or major issues.

### Pitfall 1: SVG Panel Coordinate Corruption

**What goes wrong:** CSS changes (new font sizes, spacing tokens, container queries, or layout restructuring) silently break the 289 hand-placed SVG controls across both panel visualizers (evolver-panel.tsx at 782 LOC, cascadia-panel.tsx at 1350 LOC). The panels use precise viewBox coordinates (`0 0 1200 520` for Evolver) with hardcoded x,y positions for every knob, slider, switch, and jack. Any CSS that affects the SVG's container sizing, aspect ratio, or transform origin can shift controls out of alignment, break drag interactions (pointer capture uses clientY deltas), or crop the panel entirely.

**Why it happens:** Redesigns typically change container widths, padding, and flex/grid layouts. SVG panels render inline via React and rely on the container to determine their rendered size. A new layout grid that changes the panel's parent width from 100% to a constrained max-width alters the mapping between screen pixels and SVG coordinates, breaking the drag sensitivity (the `delta / 3` calculation in useKnobDrag assumes a specific pixel-to-SVG-unit ratio). The zoom-section feature (`computeZoomViewBox`) also depends on stable SECTION_BOUNDS data mapping to the rendered output.

**Consequences:** Knob drag becomes too sensitive or too sluggish. Tooltip positions drift from controls. Zoom viewBox calculations produce incorrect crops. Cable bezier curves in Cascadia (droop formula: `min(80, 30 + dx * 0.15)`) render at wrong positions. Session panel markers (`data-evolver-panel`, `data-cascadia-panel` embedded in 60+ markdown files) display broken visualizations.

**Prevention:**
- Treat both panel components as frozen during initial redesign phases. Wrap them in a stable container div with fixed `aspect-ratio` CSS and never change the wrapper during layout restructuring.
- Create a visual regression test page that renders both panels at multiple container widths with known knob values and highlight states. Screenshot-diff this page before and after every CSS change.
- The panel components should be the LAST thing styled in the redesign, in a dedicated phase, after all layout work is stable.
- If the panel container must change size, the `delta / 3` drag sensitivity constant in `useKnobDrag` must be recalibrated to the new pixel-to-SVG-unit ratio.

**Detection:** Drag a knob on both panels after any layout change. If the value jumps erratically or the tooltip drifts more than 5px from the control center, the container sizing has changed.

### Pitfall 2: Accessibility Regression in Dark Theme Redesign

**What goes wrong:** New color palette breaks WCAG contrast ratios that currently work. The existing system uses `#e8e8e8` on `#0a0a0a` (contrast ratio ~17:1) and `#737373` for muted text on `#0a0a0a` (~5.5:1, passing AA). A redesign inspired by "calm colors" (Hologram Electronics reference) or "dynamic colors" (DaVincis reference) introduces mid-tone backgrounds or lower-contrast accent colors that fail AA, especially for the `--color-muted` text which is already near the 4.5:1 threshold.

**Why it happens:** Designers optimize for aesthetic feel, not contrast math. "Calm" palettes tend toward low-contrast muted tones. The dark theme amplifies this risk because small changes to background luminance have outsized effects on contrast ratios. Additionally, the `--color-param` (#a3e635, lime green for parameter values) and `--color-accent` (#c8ff00) are carefully chosen to be readable on dark backgrounds; swapping to a different accent hue (e.g., a cooler blue-green) may tank contrast for inline code in `.prose code` blocks.

**Consequences:** Parameter values in session content become unreadable. Muted labels on patch cards, module headers, and progress metrics fade into backgrounds. Users with visual impairments lose access. WCAG AA compliance is lost silently because there is no automated contrast checking in the build pipeline.

**Prevention:**
- Run every new color combination through a contrast checker BEFORE implementation. Enforce minimum 4.5:1 for body text, 3:1 for large text, 7:1 target for primary content.
- Add a lint step or build-time check (e.g., `eslint-plugin-jsx-a11y`) that flags color pairings below AA.
- Define the new palette as CSS custom properties first, then audit every usage against every background it appears on. The `.prose` styles alone use 6 different color/background combinations.
- Test with a color blindness simulator (protanopia, deuteranopia) since synth panel controls use color-coded highlights (blue vs amber).

**Detection:** Install the axe browser extension and run it on every page template after palette changes. Check the `.prose code` elements specifically since parameter values are central to the educational content.

### Pitfall 3: ADHD Design Principle Violations

**What goes wrong:** The redesign introduces visual complexity, animation, or layout changes that violate the project's core ADHD constraints, turning a focused learning tool into a visually overwhelming experience. Common violations: adding decorative animations that compete with content, introducing navigation patterns that require more decisions, creating layouts with too many visual focal points, or adding transitions that make the interface feel "alive" but distracting.

**Why it happens:** The design references (Hologram Electronics, Ableton Learning Synths, DaVincis) are portfolio/marketing sites designed to impress on first visit, not educational tools designed for repeated focused use. Borrowing their visual energy without filtering through ADHD constraints produces a site that looks great in screenshots but is exhausting to use for 15-30 minute learning sessions. Research on ADHD web design specifically warns that "excessive movement can be distracting and make it harder for users to concentrate" and that "cluttered interfaces, excessive distractions and complex navigation can create barriers to engagement."

**Consequences:** Users with ADHD (the primary user, the project owner) experience decision fatigue from too many visual elements competing for attention. Startup friction increases if navigation becomes more complex. Session focus degrades if animations or visual effects distract from the educational content. The fundamental value proposition -- zero activation energy, single focus -- is undermined.

**Prevention:**
- Codify ADHD design rules as acceptance criteria for every redesign phase:
  - Maximum one animated element visible at any time
  - No autoplay animations longer than 3 seconds
  - Navigation must be completable in 2 clicks or fewer from any page
  - Each page must have exactly one primary visual hierarchy (one thing draws the eye first)
  - Content density must not increase (same or fewer elements per viewport)
- Apply the "5-second test": show each redesigned page for 5 seconds, then ask "what is this page for?" If the answer is not immediate, the visual hierarchy has failed.
- The Ableton Learning Synths reference is the ONLY appropriate model for layout -- it is actually an educational tool. Hologram and DaVincis should inform texture and color only, not layout or interaction patterns.
- Follow the research principle: "Simplify layouts: avoid clutter and use clear, consistent navigation. Straightforward menus and intuitive pathways help users stay focused."

**Detection:** Before/after comparison of each page's visual weight. Count the number of distinct visual elements (colored regions, text blocks, interactive controls) in one viewport. If the count increased by more than 20%, the page has become more complex, not less.

### Pitfall 4: Markdown Prose Styling Cascade Destruction

**What goes wrong:** The existing `.prose` CSS in globals.css (lines 37-196) is a carefully tuned cascade of 20+ rules covering headings, links, tables, code, callouts, task lists, parameter tables, and mermaid placeholders. A redesign that replaces this with Tailwind's `@tailwindcss/typography` plugin or refactors the prose styles breaks the rendering of 60 session markdown files and 36 patch documents. The custom `.param-table` styling, `.callout` blocks, `.quick-ref-prose` overrides, and heading anchor link behavior are all bespoke and interleave with the markdown HTML output.

**Why it happens:** Redesigns naturally want to consolidate styling. The temptation is to replace hand-written prose CSS with the typography plugin or a component library. But the markdown rendering pipeline (session-detail.tsx) processes raw HTML with regex-matched panel markers, meaning the prose styles must work with arbitrary markdown-generated HTML structures, not just controlled component output.

**Consequences:** Parameter tables lose their monospace value styling (critical for synth parameter documentation). Callout blocks lose their accent-colored left border. Heading anchors break. The `quick-ref-prose` compact variant used in the side panel diverges from the main prose styles. Worst case: session content becomes unreadable and every session file appears broken.

**Prevention:**
- Treat the prose CSS as a unit. Never partially refactor it. Either port ALL prose rules to the new system in one phase, or leave them entirely alone until a dedicated prose-styling phase.
- Create a test fixture page that renders a "worst case" markdown document containing every element type: H1-H4, tables, param-tables, code blocks, callouts, task lists, links, heading anchors, ordered and unordered lists, and embedded panel markers. Screenshot-diff this page before and after every prose CSS change.
- If adopting `@tailwindcss/typography`, use it as a BASE and layer custom overrides on top, rather than expecting it to handle bespoke elements like `.param-table` and `.callout`.
- The `color-mix()` function used in table borders (line 113) is a modern CSS feature -- verify it still works in the new styling context.

**Detection:** Render three session pages (one Evolver, one Cascadia, one with panel markers) and visually inspect every element type.

## Moderate Pitfalls

### Pitfall 5: Animation Performance Degradation

**What goes wrong:** Adding micro-interactions, page transitions, hover effects, and animated card reveals to 51 components causes layout thrashing and dropped frames, especially on the panel visualizer pages where SVG rendering is already complex. The Cascadia panel with 179 controls and cable bezier curves is particularly vulnerable.

**Prevention:**
- Limit animations to `transform` and `opacity` only (GPU-composited properties). Never animate `width`, `height`, `margin`, `padding`, or `top/left`.
- Use `will-change` sparingly and only on elements that actually animate.
- Budget: total page animation count must stay under 10 simultaneous animations. The panel pages get 0 decorative animations -- all animation budget goes to functional feedback (knob rotation, highlight transitions).
- Test on a throttled CPU (Chrome DevTools, 4x slowdown) to catch jank that is invisible on a fast Mac.

### Pitfall 6: Motion Sickness from Parallax and Scroll Animations

**What goes wrong:** Design references like DaVincis use dynamic scroll-triggered animations and parallax. Implementing these triggers vestibular disorders in affected users (~8 million US adults report chronic balance problems). The existing codebase correctly handles `prefers-reduced-motion` for the pulse-glow animation (globals.css line 207-212), but new animations may not get the same treatment.

**Prevention:**
- EVERY animation must have a `prefers-reduced-motion` counterpart that provides the same information without motion. The existing pattern in globals.css (`@media (prefers-reduced-motion: reduce) { animation: none; border: 2px solid var(--color-accent); }`) is the template.
- Never use parallax scrolling. The educational content is text-heavy and scroll-intensive; parallax would directly harm readability.
- Avoid scroll-triggered animations entirely for content pages (sessions, patches). Reserve them only for the landing/home page if at all.
- Follow WCAG 2.1 SC 2.3.3: "Motion animation triggered by interaction can be disabled, unless the animation is essential to the functionality."

### Pitfall 7: Responsive Breakpoint Regression

**What goes wrong:** The redesign introduces a new breakpoint system or layout grid that works at desktop widths but breaks the panel visualizers and session content at tablet/mobile widths. The SVG panels need a minimum readable width (~600px) before controls become too small to identify; below that, the zoom-section feature must activate.

**Prevention:**
- Define and test at exactly three breakpoints: mobile (375px), tablet (768px), desktop (1280px).
- Panel visualizers should switch to a section-zoom-only mode below 768px rather than trying to render the full panel.
- Session content with inline panels should stack vertically on mobile (panel above, prose below) rather than side-by-side.
- Test the patch parameter tables at mobile width -- they are dense data tables that need horizontal scroll, not column wrapping.

### Pitfall 8: Font Loading FOUT/FOIT

**What goes wrong:** Changing typography (new typeface for headings, different monospace font for parameter values) introduces Flash of Unstyled Text or Flash of Invisible Text. The existing stack uses Inter (sans) and JetBrains Mono (mono) via `next/font`, which handles self-hosting and font-display automatically. Switching to a non-next/font font or adding a third typeface (display/decorative) breaks this.

**Prevention:**
- Keep fonts loaded via `next/font` for automatic optimization.
- Maximum two font families (sans + mono). A third display font adds load time and visual complexity with minimal payoff for an educational app.
- If changing fonts, verify that JetBrains Mono (or replacement) renders parameter values with consistent character widths -- proportional fonts make parameter tables misaligned and values harder to read.
- Test font loading on a simulated slow 3G connection to catch FOUT.

### Pitfall 9: Tailwind v4 @theme Token Conflicts

**What goes wrong:** The app already uses Tailwind v4 with `@theme` CSS custom properties (globals.css lines 3-20). The redesign adds new tokens or renames existing ones, but some of the 51 components still reference old token names via inline Tailwind classes, creating a split where some components use the old palette and others use the new one.

**Prevention:**
- Inventory ALL current `--color-*`, `--spacing-*`, and `--font-*` token usages across all 51 components BEFORE changing any tokens.
- Use find-and-replace at the token level, not component-by-component. Changing `--color-accent` from `#c8ff00` to a new value must update everywhere simultaneously.
- If adding new semantic tokens (e.g., `--color-surface-elevated`, `--color-border`), add them alongside existing tokens first, then migrate components, then remove old tokens. Never have a phase where both old and new tokens are "current."
- Remember that Tailwind v4 does NOT use `tailwind.config.js` -- all theming is in CSS via `@theme`. There is no config file to forget to update.

### Pitfall 10: Search and Filter UI Regression

**What goes wrong:** Phase 16 shipped a working search bar with instant grouped results and a patch filter bar with multi-select pills. Restyling these interactive components breaks their state management (URL param persistence, dropdown positioning, keyboard navigation) because the redesign changes the DOM structure that the JavaScript expects.

**Prevention:**
- Restyle interactive components by changing CSS properties only, not DOM structure, wherever possible.
- If DOM restructuring is necessary (e.g., wrapping in new layout containers), test all interactive states: empty state, loading, results displayed, filter selected, filter cleared, keyboard navigation, URL param round-trip.
- The search dropdown positioning depends on its parent's position context. Changing the nav layout can push the dropdown off-screen or behind other elements.

## Minor Pitfalls

### Pitfall 11: z-index Stack Collapse

**What goes wrong:** The sticky header, search dropdown, panel tooltips, and modal dialogs all have z-index values that form an implicit stacking context. Adding new decorative layers, backdrop overlays, or fixed-position elements without a z-index system creates overlap bugs.

**Prevention:** Define a z-index scale in the `@theme` block: `--z-base: 0`, `--z-sticky: 100`, `--z-dropdown: 200`, `--z-tooltip: 300`, `--z-modal: 400`. Migrate all existing z-index values to use these tokens.

### Pitfall 12: Build Size Inflation from Animation Libraries

**What goes wrong:** Adding Framer Motion or GSAP for page transitions and micro-interactions adds 30-150KB to the client bundle. For a content-heavy educational app where most pages are server-rendered markdown, this is disproportionate overhead.

**Prevention:** Use CSS animations and transitions exclusively for the redesign. CSS can handle fade-in, slide-in, scale, color transitions, hover states, and even staggered list reveals via `animation-delay`. Reserve a JS animation library ONLY if a specific interaction requires physics-based spring animations that CSS cannot achieve, and then use a lightweight option like `motion` (the lite Framer Motion export, ~5KB).

### Pitfall 13: Color-Only Information Loss in Panel Visualizers

**What goes wrong:** The panel visualizers use blue and amber highlight colors to distinguish control categories. A palette change that makes these colors too similar, or a new highlight system that relies solely on color, excludes colorblind users (8% of men).

**Prevention:** Every color-coded element must have a secondary non-color indicator: shape, pattern, label, or icon. The existing panel highlights should add a shape difference (circle for blue, diamond for amber) in addition to color.

### Pitfall 14: Losing the "Designed Prose" Feel by Over-Componentizing

**What goes wrong:** The redesign goal includes making markdown rendering "feel native, not like raw markdown." The temptation is to wrap every markdown element in a React component for fine-grained control. But this breaks the content pipeline: session content is stored as markdown in the Obsidian vault, rendered as HTML by the markdown processor, and then enhanced by regex-based panel marker injection in session-detail.tsx. Over-componentizing the prose output conflicts with this pipeline.

**Prevention:** Achieve the "designed prose" look through CSS-only styling of the existing HTML output structure. Use the `.prose` class cascade, not component wrappers. The goal is CSS that makes `<h2>`, `<table>`, `<code>`, and `<blockquote>` elements look polished within the prose context, not MDX components that replace them.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Design token/palette definition | Contrast regression (#2), ADHD violations (#3) | Contrast-check every pairing before coding. Apply ADHD 5-second test to mockups |
| Layout restructuring | SVG panel corruption (#1), responsive regression (#7) | Freeze panel containers. Test at 3 breakpoints |
| Typography changes | Font loading issues (#8), prose cascade destruction (#4) | Use next/font only. Port all prose rules as a unit |
| Component restyling | Search/filter regression (#10), z-index collapse (#11) | CSS-only changes where possible. Define z-index scale |
| Animation/motion | Performance degradation (#5), motion sickness (#6), ADHD violations (#3), bundle inflation (#12) | CSS-only animations. prefers-reduced-motion for all. Budget of 10 max simultaneous |
| Panel visualizer styling | SVG coordinate corruption (#1), color information loss (#13) | Dedicated final phase. Visual regression screenshots |
| Prose/markdown styling | Cascade destruction (#4), over-componentizing (#14) | Fixture page with all element types. CSS-only approach. All-or-nothing port |

## "Looks Done But Isn't" Checklist

- [ ] **Contrast**: Every text/background combination meets WCAG AA (4.5:1 body, 3:1 large text)
- [ ] **Contrast**: `--color-muted` on `--color-bg` still passes AA after palette change
- [ ] **Contrast**: `--color-param` inline code on `--color-surface` still readable
- [ ] **Panel integrity**: Evolver panel knob drag works correctly at new container width
- [ ] **Panel integrity**: Cascadia panel cables render at correct positions
- [ ] **Panel integrity**: Panel zoom-section crops correctly in session markdown context
- [ ] **Prose rendering**: All 6 heading/list/table/code/callout/task-list element types render correctly
- [ ] **Prose rendering**: `.param-table` monospace values intact
- [ ] **Prose rendering**: `.quick-ref-prose` compact variant still distinct from main prose
- [ ] **Motion**: Every animation has a `prefers-reduced-motion` fallback
- [ ] **Motion**: No parallax or scroll-triggered animations on content pages
- [ ] **Motion**: Maximum one animated element visible at any time per page
- [ ] **ADHD**: Each page has exactly one primary visual focal point
- [ ] **ADHD**: Navigation complexity did not increase (same or fewer clicks to any destination)
- [ ] **ADHD**: No autoplay animations longer than 3 seconds
- [ ] **Responsive**: Panels readable at 768px, zoom-only below 768px
- [ ] **Responsive**: Parameter tables horizontally scrollable at mobile width
- [ ] **Tokens**: No component references a deleted or renamed CSS custom property
- [ ] **Performance**: No JS animation library exceeding 10KB added to bundle
- [ ] **z-index**: Sticky header, search dropdown, and panel tooltips layer correctly
- [ ] **Fonts**: All fonts loaded via `next/font`, maximum 2 families

## Sources

- [Designing for users with ADHD](https://digitalcommunications.wp.st-andrews.ac.uk/2025/02/12/designing-for-users-with-adhd/) -- ADHD web design principles
- [ADHD-Friendly Web Design: Minimizing Distractions](https://www.boia.org/blog/adhd-friendly-web-design-minimizing-distractions) -- ADHD accessibility patterns
- [Designing Safer Web Animation For Motion Sensitivity](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/) -- vestibular disorder animation safety
- [WCAG 2.1 Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html) -- W3C animation accessibility standard
- [prefers-reduced-motion - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) -- reduced motion media query
- [How to Scale SVG - CSS-Tricks](https://css-tricks.com/scale-svg/) -- SVG viewBox responsive scaling
- [6 Common SVG Fails](https://css-tricks.com/6-common-svg-fails-and-how-to-fix-them/) -- SVG rendering pitfalls
- [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide) -- official Tailwind v4 migration docs
- [Tailwind CSS 4 Migration: What Changed](https://designrevision.com/blog/tailwind-4-migration) -- Tailwind v4 breaking changes
- Codebase analysis: globals.css (213 lines, 6 color tokens, 7 spacing tokens, 20+ prose rules), evolver-panel.tsx (782 LOC, 110 controls), cascadia-panel.tsx (1350 LOC, 179 controls), session-detail.tsx (panel marker regex injection pipeline)
