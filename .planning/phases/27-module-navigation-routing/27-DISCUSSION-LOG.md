# Phase 27: Module Navigation + Routing - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-17
**Phase:** 27-module-navigation-routing
**Areas discussed:** Module listing layout, Nav integration, Per-module color identity, Module page structure

---

## Module Listing Layout

### Organization

| Option | Description | Selected |
|--------|-------------|----------|
| Category tabs + grid | Horizontal category filter tabs with module cards in grid below. Matches patch filter bar pattern | ✓ |
| Grouped sections | No tabs — modules grouped under category headings on single scrollable page | |
| Flat grid, no categories | Simple grid, categories as tags on cards | |

**User's choice:** Category tabs + grid
**Notes:** None

### Card Content

| Option | Description | Selected |
|--------|-------------|----------|
| Name + HP + categories | Compact, matches instrument card density | |
| Name + HP + mini panel preview | Same plus tiny front-plate SVG thumbnail | ✓ |
| Name + HP + session count | Learning-focused, less hardware-focused | |

**User's choice:** Name + HP + mini panel preview
**Notes:** Panels won't exist until Phase 28+, so placeholder needed

### Placeholder Before Panels

| Option | Description | Selected |
|--------|-------------|----------|
| Module color swatch + HP outline | Colored rectangle at accent color with proportional HP width outline | ✓ |
| Manufacturer logo placeholder | Generic silhouette or text in accent color | |
| You decide | Claude picks | |

**User's choice:** Module color swatch + HP outline

### Filter URL State

| Option | Description | Selected |
|--------|-------------|----------|
| Query param ?category=vco | Same pattern as patch filter bar, URL-shareable | ✓ |
| Path segment /modules/category/vco | Separate routes per category | |

**User's choice:** Query param ?category=vco

---

## Nav Integration

### Nav Placement

| Option | Description | Selected |
|--------|-------------|----------|
| Separate nav link | "Modules" as own top-level link alongside instruments | ✓ |
| Merged into switcher | Combined picker with Instruments and Modules sections | |
| Both — link + switcher section | Nav link for listing + modules in sectioned switcher | |

**User's choice:** Separate nav link

### Color Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Module slug sets data-instrument | app-shell detects /modules/[slug] and sets data-instrument | ✓ |
| Shared 'modules' identity | All module pages share single accent color | |

**User's choice:** Module slug sets data-instrument

---

## Per-Module Color Identity

### Color Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Manufacturer-inspired | Colors drawn from manufacturer visual identity | ✓ |
| Category-coded | Colors tied to functional category | |
| Fully distinct spectrum spread | 7 hues evenly distributed around hue wheel | |

**User's choice:** Manufacturer-inspired

### Tint Depth

| Option | Description | Selected |
|--------|-------------|----------|
| Full tint like instruments | Full surface elevation tinting per module | ✓ |
| Accent only, neutral surfaces | Only accent/param colors change | |
| You decide | Claude picks based on how colors work at low lightness | |

**User's choice:** Full tint like instruments

### Same-Manufacturer Modules

| Option | Description | Selected |
|--------|-------------|----------|
| Same hue, different saturation | Same manufacturer hue family, distinguishable variants | ✓ |
| Fully distinct per module | Unique hue regardless of manufacturer | |
| Identical palette per manufacturer | Exact same palette for all modules from same maker | |

**User's choice:** Same manufacturer hue, different saturation

---

## Module Page Structure

### Sub-Pages

| Option | Description | Selected |
|--------|-------------|----------|
| Overview (landing page) | Name, manufacturer, HP, categories, architecture, controls ref | ✓ |
| Sessions | Learning sessions list with completion state | ✓ |
| Patches | Module-specific patches/presets | ✓ |
| Panel | Full-screen panel visualizer | ✓ |

**User's choice:** All four sub-pages (multiselect)

### Page Navigation

| Option | Description | Selected |
|--------|-------------|----------|
| Horizontal tabs below header | Overview, Sessions, Patches, Panel tabs at top | ✓ |
| Same as instruments | Mirror instrument page layout exactly | |
| You decide | Claude picks | |

**User's choice:** Horizontal tabs below header

### Header Component

| Option | Description | Selected |
|--------|-------------|----------|
| Shared layout with tabs | /modules/[slug]/layout.tsx renders header + tabs | ✓ |
| Per-page rendering | Each sub-page renders own header | |

**User's choice:** Shared layout with tabs

### Empty States

| Option | Description | Selected |
|--------|-------------|----------|
| Coming soon message with context | Honest message about what to expect | ✓ |
| Hide tabs until content exists | Only show tabs for sub-pages with content | |
| You decide | Claude picks | |

**User's choice:** Coming soon message with context

---

## Claude's Discretion

- Exact OKLCH values for 7 module palettes
- Saturation/lightness differentiation between same-manufacturer modules
- Tab active state styling
- Module card grid responsive breakpoints
- HP outline placeholder proportions
- "Coming soon" empty state copy
- Category tab styling

## Deferred Ideas

None — discussion stayed within phase scope
