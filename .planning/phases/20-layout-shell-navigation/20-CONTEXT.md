# Phase 20: Layout Shell & Navigation - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

<domain>
## Phase Boundary

The app gets a visually weighted navigation bar with brand expression, responsive page containers with differentiated widths per content type, a designed two-column footer, and per-instrument accent color variation. This phase restructures `nav.tsx`, `app-shell.tsx`, and introduces page-type shell components — it does not restyle individual cards, components, or prose content (those are Phase 21+).

Requirements: LAYOUT-01, LAYOUT-02, LAYOUT-03, LAYOUT-04

</domain>

<decisions>
## Implementation Decisions

### Nav Visual Weight & Brand
- **D-01:** Elevated nav bar (~56-64px tall) with raised surface elevation and subtle bottom shadow/border accent. Single continuous surface with two visual zones — brand/search at top area, page links below — no internal divider between them
- **D-02:** Brand wordmark "evolver" uses Space Grotesk (display typeface from Phase 19), bold, slightly larger than nav link text. Replaces current font-mono treatment
- **D-03:** On mobile, nav collapses to hamburger menu — brand + hamburger icon visible, menu slides down or opens as overlay with all links

### Active State & Link Styling
- **D-04:** Active page link indicated by 2-3px accent-colored bottom border bar. High contrast, immediately scannable
- **D-05:** Hover effect is color change only (muted → text color). No underline or background — the accent bar on active already provides visual weight

### Content Width Strategy
- **D-06:** Page-type shell system with 2-3 max-width levels: narrow (~720px) for session reading pages and about, wide (~1200px) for patch grids and module lists. Each page route picks its shell
- **D-07:** Panel visualizer pages (sessions with embedded Evolver/Cascadia panels) — Claude's discretion on whether to use wide shell or narrow-with-breakout approach based on current panel embedding patterns

### Footer
- **D-08:** Two-column footer — left side: project identity (name + tagline), right side: per-instrument quick-links (Evolver sessions, Cascadia sessions, patches) + about link. Uses wide shell width
- **D-09:** Footer gets proper visual treatment with border-top and warm surface elevation, matching the editorial feel established in prior phases

### Per-Instrument Visual Variation
- **D-10:** Per-instrument accent color shift — Evolver keeps warmed yellow-green from Phase 18, Cascadia gets a warm teal accent. Same background surfaces, text colors, and elevations across both
- **D-11:** Implementation via `data-instrument` attribute on AppShell. CSS uses `[data-instrument=cascadia]` to override `--color-accent` and related tokens. SSR-friendly, no JS runtime cost
- **D-12:** Active state bars, callout borders, and interactive highlights all inherit the per-instrument accent automatically through token override

### Claude's Discretion
- Exact nav bar height (56-64px range)
- Shadow/border treatment at bottom of nav
- Hamburger menu animation style (slide-down vs overlay)
- Medium shell width value if a third tier is warranted (~960px for module lists)
- Panel page width approach (wide shell vs breakout)
- Specific warm teal OKLCH values for Cascadia accent (must pass WCAG AA against warm surfaces)
- Footer spacing, typography sizing, and link grouping details

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Current Layout Components
- `src/components/nav.tsx` — Current nav bar (48px, font-mono wordmark, text underline active state, instrument switcher, search bar)
- `src/components/app-shell.tsx` — Current shell (flex column, Nav + main + footer). Footer is inline here — will need extraction or restructuring
- `src/app/layout.tsx` — Root layout with font loading (Inter, JetBrains Mono, Space Grotesk) and AppShell wrapper
- `src/components/instrument-switcher.tsx` — Dropdown instrument picker, already in nav
- `src/components/sticky-header.tsx` — Session-level sticky header with back button and quick-ref

### Design Tokens (Phase 18)
- `src/app/globals.css` — OKLCH tokens, surface elevations, spacing scale, grain texture. All Phase 20 work must use these tokens

### Requirements
- `.planning/REQUIREMENTS.md` — LAYOUT-01 (nav), LAYOUT-02 (responsive widths), LAYOUT-03 (footer), LAYOUT-04 (per-instrument variation)

### Prior Phase Context
- `.planning/phases/18-token-foundation/18-CONTEXT.md` — Warm olive/earth palette decisions, 5 surface elevations, accent color warmth
- `.planning/phases/19-prose-typography/19-CONTEXT.md` — Space Grotesk as display typeface, Inter for body/UI

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `InstrumentSwitcher` component: Fully functional dropdown with keyboard nav, click-outside-to-close. Already in nav — stays as-is
- `SearchBar` component: Already integrated in nav. Position may shift in elevated layout but component unchanged
- `StickyHeader`: Session-level header (back button, quick-ref). Independent of main nav — coexists
- Space Grotesk font: Already loaded in layout.tsx with `--font-space-grotesk` CSS variable. Ready for nav wordmark

### Established Patterns
- Tailwind v4 CSS-first `@theme` tokens — new shell widths and nav tokens follow this pattern
- `clsx` for conditional classes (used in nav.tsx) — continue using for active states
- `usePathname()` for route detection (nav.tsx) — reuse for per-instrument data attribute
- Surface elevation tokens (bg, sunken, surface, raised, overlay) from Phase 18 — nav uses raised or overlay level

### Integration Points
- `app-shell.tsx` is the primary integration point — restructure for elevated nav, page shells, and two-column footer
- `nav.tsx` gets the most significant changes — taller, Space Grotesk wordmark, bottom accent active states, mobile hamburger
- Route pattern `/instruments/[slug]/...` already parsed in nav — extend to set `data-instrument` attribute
- Footer currently inline in app-shell.tsx — may extract to separate component for complexity

</code_context>

<specifics>
## Specific Ideas

- Space Grotesk wordmark ties the nav to the editorial design system — consistency across headings and brand
- Bottom accent bar for active state is a proven pattern that feels polished in elevated nav bars
- Two-column footer mirrors the "editorial publication" feel — project identity left, navigation right
- Warm teal for Cascadia complements Intellijel's brand identity while staying distinct from Evolver's yellow-green
- `data-instrument` attribute approach is clean for SSR and avoids client-side JS for color swapping

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 20-layout-shell-navigation*
*Context gathered: 2026-04-10*
