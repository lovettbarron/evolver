# Phase 21: Cards & Content Components - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning

<domain>
## Phase Boundary

All card types share a unified visual language with consistent borders, padding, hover states, and border-radius. All interactive elements get intentional focus states matching the warm dark design system. Session content uses editorial layout with designed parameter callouts, step markers, and section dividers. This phase does NOT add motion/animation (Phase 22) or panel visualizer polish (Phase 23).

Requirements: COMP-01, COMP-02, CONTENT-02

</domain>

<decisions>
## Implementation Decisions

### Card Unification Strategy
- **D-01:** Shared `.card` base class in globals.css — consistent border-radius (8px), padding (--spacing-lg), background (--color-surface), and border (1px solid --color-border-subtle). All card components (HeroCard, PatchCard, ModuleCard, InstrumentCard, CountCard) inherit this base and add only their unique content layout.
- **D-02:** Border always visible at rest (border-subtle), intensifies to accent on hover. Cards feel like defined objects on the page, not floating surfaces.
- **D-03:** HeroCard gets distinct hero treatment — accent border-left bar, unique visual emphasis, or gradient to stand out as the primary CTA on instrument pages. Not just "bigger card."
- **D-04:** SessionRow stays as a list-item style (no card base, no border at rest). Only hover and focus states are unified with the card system.

### Focus State Design
- **D-05:** Global `:focus-visible` rule in globals.css: 2px solid accent-colored outline with 2px offset. Applied to all interactive elements by default. Only keyboard navigation triggers it (not mouse clicks).
- **D-06:** Global base rule plus per-component overrides only where needed (e.g., search input might want inset focus). Individual components do NOT define their own focus styles unless overriding the global.

### Editorial Session Layout
- **D-07:** Parameter callouts as inline pill/badge elements — subtle accent background with accent-colored left border, mono font, compact padding. Flow within prose paragraphs. Leverages existing `.param-table` classes from the markdown plugin.
- **D-08:** Numbered steps use accent-colored step markers — bold accent-colored numerals via `::marker` pseudo-element, slightly larger than body text. Clean, scannable, no circles or tracks.
- **D-09:** Section dividers as subtle horizontal rules — thin border-subtle line with generous vertical spacing (margin-block: --spacing-2xl). Clean visual break between session phases.

### Card Hover & Interaction
- **D-10:** Cards get combined border-accent + subtle lift on hover: border transitions to accent color, card lifts ~2px with faint accent-tinted shadow (rgba accent at ~0.06 opacity). Transition duration ~150ms.
- **D-11:** SessionRow hover keeps current background-highlight treatment (bg-surface on hover). No lift or border change — rows feel like list items, not cards.

### Claude's Discretion
- Exact HeroCard hero treatment (accent-left bar vs gradient vs other approach — pick what looks best)
- Whether existing inline focus-visible on CountCard needs adjustment or can just inherit global
- Specific param-pill background color within the warm surface palette
- Whether `::marker` styling requires any remark/rehype plugin changes or is pure CSS
- Any search input or completion toggle focus override specifics

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Card Components (all 6 types to unify)
- `src/components/hero-card.tsx` — Primary CTA card, currently p-2xl rounded-lg, needs distinct hero treatment
- `src/components/patch-card.tsx` — Patch listing card, currently rounded-[6px] p-lg border-transparent hover:border-accent
- `src/components/module-card.tsx` — Module listing card, currently rounded-[6px] p-lg border-transparent hover:border-accent
- `src/components/instrument-card.tsx` — Instrument picker card, currently rounded-md p-2xl border-surface hover:border-accent
- `src/components/count-card.tsx` — Stat counter card, currently rounded-lg p-lg with translate-y hover and focus-visible
- `src/components/session-row.tsx` — Session list item (NOT card), currently py-md px-sm hover:bg-surface

### Session Content Rendering
- `src/components/session-detail.tsx` — Renders session markdown HTML with panel marker injection. Editorial styling targets here
- `src/lib/markdown/plugins/param-table.ts` — Adds `.param-table`, `.param-name`, `.param-value` classes to parameter tables

### Design System (from prior phases)
- `src/app/globals.css` — All current token definitions, prose rules, domain element styling. Primary file for .card base class, focus states, and editorial CSS
- `.planning/phases/18-token-foundation/18-CONTEXT.md` — OKLCH palette, surface elevations, spacing tokens
- `.planning/phases/19-prose-typography/19-CONTEXT.md` — Typography scale, prose plugin integration, domain element styling
- `.planning/phases/20-layout-shell-navigation/20-CONTEXT.md` — Layout shells, nav, per-instrument accent via [data-instrument]

### Requirements
- `.planning/REQUIREMENTS.md` — COMP-01 (unified card language), COMP-02 (focus states), CONTENT-02 (editorial session layout)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.card` base class: new (to be created in globals.css)
- `.param-table` / `.param-name` / `.param-value` classes: already exist from markdown plugin — editorial pill styling can extend these
- `--color-surface`, `--color-border-subtle`, `--color-accent` tokens: established in Phase 18
- `--spacing-lg`, `--spacing-2xl` etc: token scale established in Phase 18
- Phase 19 prose rules: `@tailwindcss/typography` already applied to markdown containers

### Established Patterns
- All cards use Next.js `<Link>` as the clickable element (some wrap a `<div>`, some use Link directly)
- Transition utilities: `transition-colors`, `transition-[transform,box-shadow]` already used in various cards
- `focus-visible:` Tailwind prefix used only in CountCard — rest have no focus styles
- Session markdown rendered as `dangerouslySetInnerHTML` in session-detail.tsx

### Integration Points
- `globals.css` is the single file for all CSS additions (base class, focus states, editorial styles)
- Card components: 5 files to update className references
- `session-detail.tsx` may need wrapper class adjustments for editorial CSS targeting
- `::marker` styling for ordered lists works within existing `.prose` containers

</code_context>

<specifics>
## Specific Ideas

- Card hover combines both current patterns (PatchCard's border-accent + CountCard's translate-y lift) into one unified interaction
- Parameter callouts specifically requested as inline pill/badge with left accent border and mono font — not margin notes or plain highlighting
- The accent-tinted shadow on card hover should use rgba of the accent color at very low opacity (~0.06) for warmth

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 21-cards-content-components*
*Context gathered: 2026-04-11*
