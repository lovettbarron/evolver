# Phase 19: Prose & Typography - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Session and patch content reads as polished editorial prose with clear typographic hierarchy — not a markdown viewer. This phase delivers: a display typeface for headings, a modular type scale, @tailwindcss/typography integration, and editorial restyling of all domain-specific elements (param tables, callouts, obsidian tags, code blocks, task lists).

Requirements: TOKEN-02, CONTENT-01

</domain>

<decisions>
## Implementation Decisions

### Typeface Selection
- **D-01:** Add Space Grotesk as the display/heading typeface via `next/font/google`
- **D-02:** Inter remains the body/UI typeface. JetBrains Mono remains for code
- **D-03:** Space Grotesk applies to h1 and h2 only. h3-h4 use Inter bold — clear "display vs body" split

### Modular Type Scale
- **D-04:** Use a major third ratio (1.25) for the heading scale — balanced editorial feel without overwhelming on mobile
- **D-05:** h1 ~2.4x body, h2 ~1.95x, h3 ~1.56x, h4 ~1.25x — applied via CSS custom properties or Tailwind theme tokens

### Prose Rendering Approach
- **D-06:** Adopt @tailwindcss/typography as the prose baseline (new dependency)
- **D-07:** Apply the plugin's `prose` class to markdown content containers
- **D-08:** Domain-specific elements (.param-table, .callout, .obsidian-tag, .quick-ref-prose) override within prose — plugin handles body/heading/list/code, custom CSS handles domain elements

### Domain Element Styling
- **D-09:** Editorial redesign of domain elements, not just palette integration — rethink borders, icons, layout treatments to feel designed
- **D-10:** Param tables: inline with accent — tables flow within prose with accent-colored left border or header bar, not separated into card containers
- **D-11:** Callouts: distinct per type — challenge (orange/amber), tip (green), warning (red) each get their own accent color and icon
- **D-12:** All domain element colors/surfaces must use Phase 18 tokens (OKLCH palette, surface elevations)

### Claude's Discretion
- Code block styling, obsidian tag appearance, task list checkbox styling, and quick-ref-prose adjustments — Claude has flexibility to determine what looks best within the warm dark palette and editorial direction
- Responsive type scaling strategy (fluid clamp vs breakpoint steps)
- Line height and letter spacing fine-tuning for Space Grotesk headings

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Typography & Fonts
- `src/app/layout.tsx` — Current font setup (Inter, JetBrains Mono via next/font/google). Add Space Grotesk here
- `src/app/globals.css` — All current prose rules, domain element styling, theme tokens. Primary file for changes

### Markdown Pipeline
- `src/lib/markdown/processor.ts` — Unified.js pipeline config (remark/rehype plugins)
- `src/lib/markdown/plugins/param-table.ts` — Adds `.param-table`, `.param-name`, `.param-value` classes
- `src/lib/markdown/plugins/obsidian-tags.ts` — Adds `.obsidian-tag` class
- `src/lib/markdown/plugins/mermaid-placeholder.ts` — Mermaid diagram placeholders

### Requirements
- `.planning/REQUIREMENTS.md` — TOKEN-02, CONTENT-01 are the mapped requirements

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Unified.js pipeline** (`src/lib/markdown/processor.ts`): Mature remark/rehype pipeline with custom plugins. No changes needed to the pipeline itself — styling is CSS-only
- **Custom plugins**: param-table, obsidian-tags, mermaid-placeholder — these add CSS classes that the new styling must target
- **rehype-callouts**: Already installed and configured for callout rendering. Supports `data-callout` attribute for type differentiation

### Established Patterns
- **CSS custom properties in `@theme`** block (Tailwind 4): All colors, fonts, spacing defined as CSS variables. New tokens should follow this pattern
- **`@layer base`** for prose rules: Existing pattern for global prose styling
- **Font loading via `next/font/google`**: Established pattern for adding new typefaces

### Integration Points
- `src/app/globals.css` — Primary integration point for all typography and prose changes
- `src/app/layout.tsx` — Font variable injection on `<html>` element
- Every session and patch page that renders markdown content — changes propagate automatically through CSS
- `.quick-ref-prose` variant used in `quick-ref-panel.tsx` — must remain functional

</code_context>

<specifics>
## Specific Ideas

- Space Grotesk chosen for its technical, slightly quirky letterforms and synth/electronic music association
- Param tables with accent left border feel more editorial than card-separated tables
- Callout type differentiation (challenge=amber, tip=green, warning=red) aids ADHD scanning — color is faster than reading labels
- The overall direction is "editorial prose" not "documentation viewer"

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 19-prose-typography*
*Context gathered: 2026-04-07*
