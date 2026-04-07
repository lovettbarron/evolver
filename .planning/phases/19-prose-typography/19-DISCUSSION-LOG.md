# Phase 19: Prose & Typography - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-07
**Phase:** 19-prose-typography
**Areas discussed:** Typeface selection, Modular type scale, Prose rendering approach, Domain element styling

---

## Typeface Selection

### Q1: Add display typeface or refine Inter?

| Option | Description | Selected |
|--------|-------------|----------|
| Add a display typeface | Second typeface for h1-h3 creates immediate visual hierarchy. Inter stays for body/UI | :heavy_check_mark: |
| Keep Inter only | Use weight contrast and size alone. Simpler, harder to escape generic feel | |
| Add a serif typeface | Serif for headings, Inter for body. More editorial/literary | |

**User's choice:** Add a display typeface
**Notes:** None

### Q2: Direction for display typeface

| Option | Description | Selected |
|--------|-------------|----------|
| Geometric sans | Clean, technical, synth-adjacent. Space Grotesk, Outfit, Sora | :heavy_check_mark: |
| Humanist sans | Warm, approachable, slightly organic. Source Sans 3, DM Sans | |
| Monospace/technical display | Full-on synth aesthetic. Space Mono, IBM Plex Mono | |

**User's choice:** Geometric sans
**Notes:** None

### Q3: Specific font preference

| Option | Description | Selected |
|--------|-------------|----------|
| Space Grotesk | Technical, slightly quirky letterforms. Strong synth/electronic association | :heavy_check_mark: |
| Outfit | Clean geometric with good readability. Versatile, modern | |
| You decide | Claude evaluates options during research | |

**User's choice:** Space Grotesk
**Notes:** None

---

## Modular Type Scale

### Q1: Scale ratio

| Option | Description | Selected |
|--------|-------------|----------|
| Major third (1.25) | Balanced editorial feel. h1 ~2.4x body | :heavy_check_mark: |
| Perfect fourth (1.333) | More dramatic jumps. h1 ~3.2x body. Magazine-like | |
| Minor third (1.2) | Tighter, more subtle hierarchy. h1 ~2.1x body | |

**User's choice:** Major third (1.25)
**Notes:** None

### Q2: Display font scope

| Option | Description | Selected |
|--------|-------------|----------|
| h1-h2 only | Display font for page/section titles. h3-h4 in Inter bold | :heavy_check_mark: |
| h1 through h4 | Full heading hierarchy in Space Grotesk | |
| h1 only | Maximum restraint. Display font for page titles only | |

**User's choice:** h1-h2 only
**Notes:** None

---

## Prose Rendering Approach

### Q1: Custom prose vs @tailwindcss/typography

| Option | Description | Selected |
|--------|-------------|----------|
| Custom prose CSS | Keep current approach, polish it. Full control, no new dependency | |
| @tailwindcss/typography | Adopt plugin for maintained baseline, override for domain elements | :heavy_check_mark: |
| You decide | Claude evaluates during research | |

**User's choice:** @tailwindcss/typography
**Notes:** None

### Q2: Domain element interaction with typography plugin

| Option | Description | Selected |
|--------|-------------|----------|
| Override within prose | Use plugin's prose class, add targeted overrides for domain elements | :heavy_check_mark: |
| Separate zones | Apply prose only to vanilla markdown, domain elements get non-prose styling | |
| You decide | Claude determines cleanest integration | |

**User's choice:** Override within prose
**Notes:** None

---

## Domain Element Styling

### Q1: Polish level

| Option | Description | Selected |
|--------|-------------|----------|
| Warm palette integration | Update colors/borders to Phase 18 tokens. Keep structural layout | |
| Editorial redesign | Rethink how elements look. New borders, icons, layout treatments | :heavy_check_mark: |
| Minimal touch | Only change colors to match tokens. Fastest | |

**User's choice:** Editorial redesign
**Notes:** None

### Q2: Param table direction

| Option | Description | Selected |
|--------|-------------|----------|
| Bordered card style | Param table in subtle bordered container with header row | |
| Inline with accent | Tables flow within prose with accent-colored left border or header bar | :heavy_check_mark: |
| You decide | Claude experiments during implementation | |

**User's choice:** Inline with accent
**Notes:** None

### Q3: Callout type differentiation

| Option | Description | Selected |
|--------|-------------|----------|
| Distinct per type | Each type gets its own accent color and icon. Challenge=amber, tip=green, warning=red | :heavy_check_mark: |
| Unified style | All callouts share one style with text label only | |
| You decide | Claude picks approach fitting palette and ADHD scanning | |

**User's choice:** Distinct per type
**Notes:** None

---

## Claude's Discretion

- Code block styling details
- Obsidian tag appearance
- Task list checkbox styling
- Quick-ref-prose adjustments
- Responsive type scaling strategy
- Line height and letter spacing for Space Grotesk

## Deferred Ideas

None
