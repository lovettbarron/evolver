# Phase 20: Layout Shell & Navigation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-10
**Phase:** 20-layout-shell-navigation
**Areas discussed:** Nav visual weight & brand, Active state & link styling, Content width strategy, Per-instrument visual variation

---

## Nav Visual Weight & Brand

### Nav bar weight

| Option | Description | Selected |
|--------|-------------|----------|
| Elevated bar | Taller (~56-64px), raised surface elevation, subtle bottom shadow/border accent | ✓ |
| Two-row nav | Brand/utility row on top, page links on second row below | |
| Keep minimal | Stay close to current 48px strip, just refine colors and spacing | |

**User's choice:** Elevated bar
**Notes:** Matches editorial direction from Phase 19. Single surface with two visual zones.

### Brand wordmark treatment

| Option | Description | Selected |
|--------|-------------|----------|
| Space Grotesk wordmark | Display typeface from Phase 19, bold, slightly larger than nav links | ✓ |
| Mono wordmark | Keep current font-mono treatment, technical/terminal feel | |
| You decide | Claude picks best treatment | |

**User's choice:** Space Grotesk wordmark
**Notes:** Ties nav to the design system established in Phase 19.

### Nav layout (brand vs links)

| Option | Description | Selected |
|--------|-------------|----------|
| Single tall bar with zones | One continuous surface, brand/search at top, links below, no divider | ✓ |
| Subtle internal divider | One surface with faint line between brand row and link row | |
| You decide | Claude picks based on warm elevated surface | |

**User's choice:** Single tall bar with zones
**Notes:** Cleaner, less busy. Links and brand share same background.

### Mobile nav collapse

| Option | Description | Selected |
|--------|-------------|----------|
| Hamburger menu | Brand + hamburger icon, menu slides down or opens as overlay | ✓ |
| Bottom tab bar | Fixed bottom bar on mobile for page links | |
| Horizontal scroll | Single row that scrolls horizontally on small screens | |

**User's choice:** Hamburger menu
**Notes:** Standard, zero learning curve, works well with elevated bar.

---

## Active State & Link Styling

### Active page link indicator

| Option | Description | Selected |
|--------|-------------|----------|
| Bottom accent bar | 2-3px accent-colored bottom border, high contrast | ✓ |
| Background pill | Subtle background highlight on active link | |
| Text weight + color | Bold + accent color, no additional visual element | |

**User's choice:** Bottom accent bar
**Notes:** Immediately scannable, polished in elevated nav bars.

### Hover effects

| Option | Description | Selected |
|--------|-------------|----------|
| Color change only | Muted to full text color transition | ✓ |
| Subtle underline on hover | Color shift plus faint underline previewing active state | |
| You decide | Claude picks best complement to bottom accent bar | |

**User's choice:** Color change only
**Notes:** Clean and fast. Accent bar on active already provides visual weight.

---

## Content Width Strategy

### Page content widths

| Option | Description | Selected |
|--------|-------------|----------|
| Page-type shells | 2-3 max-width shells: narrow (~720px), wide (~1200px) | ✓ |
| Fluid with max-width cap | Single fluid container, content chooses own width | |
| You decide | Claude determines breakpoints | |

**User's choice:** Page-type shells
**Notes:** Explicit and predictable. Session pages narrow, grid pages wide.

### Panel visualizer width handling

| Option | Description | Selected |
|--------|-------------|----------|
| Use wide shell for panel pages | Session pages with panels use wide shell | |
| Narrow with breakout panels | Session stays narrow, panels break out of container | |
| You decide | Claude determines based on current panel embedding | ✓ |

**User's choice:** You decide (Claude's discretion)
**Notes:** Claude to determine best approach based on how panels are currently embedded.

### Footer structure

| Option | Description | Selected |
|--------|-------------|----------|
| Two-column footer | Left: identity, Right: instrument nav links + about | ✓ |
| Minimal single row | One row with project name and inline links | |
| You decide | Claude designs footer structure | |

**User's choice:** Two-column footer
**Notes:** Mirrors editorial publication feel.

---

## Per-Instrument Visual Variation

### Variation approach

| Option | Description | Selected |
|--------|-------------|----------|
| Accent color shift | Each instrument gets own accent hue, surfaces stay the same | ✓ |
| Accent + subtle bg tint | Accent shift plus barely-visible background hue shift | |
| You decide | Claude determines variation level | |

**User's choice:** Accent color shift
**Notes:** Evolver = warmed yellow-green, Cascadia = warm teal. Same backgrounds.

### Implementation mechanism

| Option | Description | Selected |
|--------|-------------|----------|
| Data attribute on shell | data-instrument attribute, CSS overrides tokens | ✓ |
| CSS class toggle | .instrument-evolver / .instrument-cascadia classes | |
| You decide | Claude picks cleanest integration | |

**User's choice:** Data attribute on shell
**Notes:** SSR-friendly, no JS runtime cost.

### Cascadia accent color direction

| Option | Description | Selected |
|--------|-------------|----------|
| Warm teal | Complementary to Evolver's yellow-green, evokes Intellijel brand | ✓ |
| Copper/amber | Stays warm family, boutique hardware feel | |
| You decide | Claude picks based on contrast requirements | |

**User's choice:** Warm teal
**Notes:** Teal evokes Intellijel's brand colors while being visually distinct from Evolver.

---

## Claude's Discretion

- Exact nav bar height within 56-64px range
- Shadow/border treatment at bottom of nav
- Hamburger menu animation style
- Medium shell width value if warranted
- Panel page width approach (wide shell vs breakout)
- Specific warm teal OKLCH values for Cascadia accent
- Footer spacing and typography details

## Deferred Ideas

None — discussion stayed within phase scope
