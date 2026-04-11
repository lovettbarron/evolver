# Phase 21: Cards & Content Components - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-11
**Phase:** 21-cards-content-components
**Areas discussed:** Card unification strategy, Focus state design, Editorial session layout, Card hover & interaction feel

---

## Card Unification Strategy

### How should the 6 card types be unified visually?

| Option | Description | Selected |
|--------|-------------|----------|
| Shared base class | Create a unified .card base style in globals.css that all 6 card types inherit | ✓ |
| Tailwind utility tokens | Standardize on same Tailwind utility values across all cards individually | |
| Card wrapper component | Create a `<Card>` React component wrapping all card types | |

**User's choice:** Shared base class
**Notes:** None

### Should the subtle border be visible by default, or only appear on hover?

| Option | Description | Selected |
|--------|-------------|----------|
| Always visible | Subtle border-subtle always showing, hover intensifies to accent | ✓ |
| Hover only | No visible border at rest, appears on hover as accent | |
| No border, shadow only | Use subtle box-shadow instead of borders | |

**User's choice:** Always visible
**Notes:** None

### Should HeroCard get special treatment or follow the same base card style?

| Option | Description | Selected |
|--------|-------------|----------|
| Same base, larger padding | Same .card base with p-2xl | |
| Distinct hero treatment | Unique look (accent border-left, gradient, etc.) | ✓ |
| You decide | Claude picks | |

**User's choice:** Distinct hero treatment
**Notes:** None

### Should SessionRow also adopt the card base, or stay as a row/list-item style?

| Option | Description | Selected |
|--------|-------------|----------|
| Keep as row | Compact list item, no card treatment, just unified hover/focus | ✓ |
| Card-ify rows | Full .card treatment on each row | |
| You decide | Claude picks | |

**User's choice:** Keep as row
**Notes:** None

---

## Focus State Design

### What should focus rings look like across the app?

| Option | Description | Selected |
|--------|-------------|----------|
| Accent ring with offset | 2px solid accent outline with 2px offset, focus-visible only | ✓ |
| Subtle glow | Box-shadow glow in accent color | |
| Border color change | Border transitions to accent on focus | |

**User's choice:** Accent ring with offset
**Notes:** None

### Should focus states be applied globally or per-component?

| Option | Description | Selected |
|--------|-------------|----------|
| Global base + overrides | One global :focus-visible rule, components override only if needed | ✓ |
| Per-component only | Each component gets its own focus-visible style | |

**User's choice:** Global base + overrides
**Notes:** None

---

## Editorial Session Layout

### How should parameter callouts be styled within session prose?

| Option | Description | Selected |
|--------|-------------|----------|
| Inline pill/badge | Small inline pill with accent background, left border, mono font | ✓ |
| Sidebar callout blocks | Parameters as margin notes alongside prose | |
| Highlighted inline text | Accent color + mono font only, no background | |
| You decide | Claude picks | |

**User's choice:** Inline pill/badge
**Notes:** None

### How should numbered steps in sessions be visually marked?

| Option | Description | Selected |
|--------|-------------|----------|
| Accent-colored step numbers | Bold accent numerals via ::marker, slightly larger | ✓ |
| Circled step badges | Numbers inside accent circles | |
| Progress track | Vertical stepper with connected dots | |
| You decide | Claude picks | |

**User's choice:** Accent-colored step numbers
**Notes:** None

### How should section dividers work within session content?

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle horizontal rule | Thin border-subtle line with generous margin-block | ✓ |
| Labeled section headers | Styled subheadings with accent bar | |
| You decide | Claude picks | |

**User's choice:** Subtle horizontal rule
**Notes:** None

---

## Card Hover & Interaction Feel

### What interaction personality should cards have on hover?

| Option | Description | Selected |
|--------|-------------|----------|
| Border accent + subtle lift | Border to accent + 2px lift + faint accent shadow | ✓ |
| Border accent only | Only border transitions to accent | |
| Lift + shadow only | Only translate-y and shadow, no border change | |
| You decide | Claude picks | |

**User's choice:** Border accent + subtle lift
**Notes:** None

### Should SessionRow have a different hover treatment?

| Option | Description | Selected |
|--------|-------------|----------|
| Background highlight | Subtle bg-surface on hover, no lift or border | ✓ |
| Same as cards | Full card hover treatment | |
| You decide | Claude picks | |

**User's choice:** Background highlight
**Notes:** None

---

## Claude's Discretion

- Exact HeroCard hero treatment style
- CountCard focus-visible adjustment vs global inheritance
- Specific param-pill background color
- Whether ::marker styling needs plugin changes
- Search input / completion toggle focus override specifics

## Deferred Ideas

None — discussion stayed within phase scope
