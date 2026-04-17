# Phase 27: Module Navigation + Routing - Context

**Gathered:** 2026-04-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Users can browse eurorack modules by category and navigate to individual module pages with per-module visual identity. This phase creates the `/modules` listing page, `/modules/[slug]/` routes with sub-pages, a "Modules" nav entry, category filtering, and 7 per-module OKLCH color palettes via the `[data-instrument]` CSS cascade.

Requirements: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05

</domain>

<decisions>
## Implementation Decisions

### Module listing layout
- **D-01:** Category tabs + grid layout on `/modules` page. Horizontal category filter tabs (All, VCO, Filter, Effects, Modulator, Function Generator) with module cards in a responsive grid below
- **D-02:** Filter state via query param `?category=vco` — matches existing patch filter bar pattern. "All" tab clears the param. URL-shareable and bookmarkable
- **D-03:** Multi-category modules (e.g., Maths) appear under every category tab they belong to
- **D-04:** Module cards show: name, HP width, manufacturer, category tags, and a mini front-plate SVG thumbnail (once panels exist in Phase 28+)
- **D-05:** Before panel SVGs exist, cards show a module color swatch + proportional HP outline shape as placeholder. Visual identity present even without panel art

### Nav integration
- **D-06:** "Modules" as a separate top-level nav link, not merged into InstrumentSwitcher. Clean conceptual separation — instruments and modules are different things
- **D-07:** InstrumentSwitcher stays for instruments only (Evolver, Cascadia, Octatrack)
- **D-08:** `app-shell.tsx` slug detection extended to match `/modules/[slug]` alongside `/instruments/[slug]`, setting `data-instrument` to the module slug for color theming

### Per-module color identity
- **D-09:** Manufacturer-inspired color palettes — each module's hue drawn from its manufacturer's visual identity (Mutable teal-green, Make Noise warm gold, Intellijel silver-blue, Mannequins rose/pink, Monome sage, Bastl magenta)
- **D-10:** Full surface tinting like instruments — each module gets tinted bg, sunken, surface, surface-raised, overlay, and border tokens. Maximum immersion when on a module page
- **D-11:** Modules sharing a manufacturer (Plaits & Beads = Mutable) get the same hue family but different saturation/lightness to remain distinguishable
- **D-12:** 7 new `[data-instrument="<slug>"]` blocks in globals.css following the existing Evolver/Cascadia/Octatrack pattern

### Module page structure
- **D-13:** Four sub-pages per module: Overview (landing), Sessions, Patches, Panel
- **D-14:** Horizontal tab navigation below a persistent module header (name, manufacturer, HP, categories). Tabs: Overview | Sessions | Patches | Panel
- **D-15:** Shared layout component at `/modules/[slug]/layout.tsx` renders header + tabs; child pages render below. Standard Next.js nested layout pattern — header stays stable across tab switches
- **D-16:** Empty sub-pages (no sessions until Phase 29+, no panels until Phase 28+) show "coming soon" message with context about what to expect. Honest, sets expectations, no broken UI

### Claude's Discretion
- Exact OKLCH values for each module palette (must pass WCAG AA against surfaces)
- Specific saturation/lightness differentiation between same-manufacturer modules
- Tab active state styling (can reuse accent bar pattern from nav)
- Module card grid responsive breakpoints (2-col mobile, 3-col desktop likely)
- HP outline placeholder proportions and styling
- "Coming soon" empty state copy and visual treatment
- Category tab styling (pill buttons, underline tabs, etc.)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Navigation & Layout
- `src/components/app-shell.tsx` — Current shell with `data-instrument` attribute detection from URL path. Must extend to `/modules/[slug]`
- `src/components/nav.tsx` — Current nav bar with InstrumentSwitcher. "Modules" link added here
- `src/components/instrument-switcher.tsx` — Dropdown instrument picker, stays instruments-only
- `src/app/layout.tsx` — Root layout with font loading and AppShell wrapper. Module discovery added here (parallel to instrument discovery)

### Design System
- `src/app/globals.css` — OKLCH token definitions, 3 existing `[data-instrument]` palette blocks. 7 new module palette blocks added here

### Existing Route Patterns
- `src/app/instruments/[slug]/` — Dynamic instrument routes with sub-pages (sessions, patches, panel, etc.). Module routes follow similar structure at `src/app/modules/[slug]/`

### Content Reader
- `src/lib/content/reader.ts` — `discoverInstruments()` function. Phase 26 will add `discoverModules()` — Phase 27 consumes it
- `src/lib/content/schemas.ts` — Zod schemas for content types. Phase 26 will add ModuleConfigSchema

### Requirements
- `.planning/REQUIREMENTS.md` — NAV-01 through NAV-05

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `InstrumentSwitcher` component: Fully functional dropdown with keyboard nav, click-outside-to-close. Stays as-is for instruments
- `InstrumentCard` component (`src/components/instrument-card.tsx`): Pattern for module cards, but modules need different info display (HP, categories, panel thumbnail)
- Patch filter bar: Existing category filter pattern with URL query params — reusable for module category tabs
- `data-instrument` CSS cascade: Proven pattern for per-instrument theming, extended to modules

### Established Patterns
- Dynamic routing via `[slug]` directory convention in Next.js App Router
- Content discovery via filesystem (`discoverInstruments()` → `discoverModules()`)
- Search provider in AppShell — modules may need to be added to search index (future phase)
- OKLCH color system with 5 surface elevations + accent + param per identity

### Integration Points
- `app-shell.tsx` — URL path matching must handle both `/instruments/` and `/modules/` prefixes
- `layout.tsx` — Module discovery added to root layout data fetching
- `globals.css` — 7 new `[data-instrument]` blocks
- `nav.tsx` — New "Modules" link

</code_context>

<specifics>
## Specific Ideas

- Module cards with mini panel SVG thumbnails — creates a visual "front plate" gallery feel on the modules listing page
- HP-proportional color swatch placeholders give a sense of module physical size even before panels are built
- Manufacturer-inspired colors make the site feel connected to the hardware world, not generic

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 27-module-navigation-routing*
*Context gathered: 2026-04-17*
