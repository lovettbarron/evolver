# Phase 15: Navigation & Progress Enhancements - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-05
**Phase:** 15-navigation-progress-enhancements
**Areas discussed:** Prerequisite badges, Soft gating behavior, Count card destinations, You are here marker

---

## Prerequisite Badges

| Option | Description | Selected |
|--------|-------------|----------|
| Icon badges | Small icon left of session number — lock for locked, open-circle for available, checkmark for completed. Minimal, scannable at a glance | ✓ |
| Opacity + subtle text | Completed rows normal, available rows normal with 'Next' chip, locked rows at 50% opacity with 'Requires #N' text. No icons | |
| Color-coded left border | Colored left border on each row — accent for completed, muted for available, faint for locked | |

**User's choice:** Icon badges
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, inline hint | Small muted text like 'Requires #03' next to the lock icon | ✓ |
| No, just the lock | Lock icon is enough — session list order makes prerequisites obvious | |
| On hover/tap only | Lock icon by default, tooltip shows prerequisite on interaction | |

**User's choice:** Yes, inline hint
**Notes:** None

---

## Soft Gating Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Navigate with banner | Go to session page but show dismissible info banner. No blocking. ADHD-friendly nudge | ✓ |
| Inline toast, no navigation | Stay on session list, show brief toast | |
| Navigate freely, no warning | Lock icon purely informational, no message | |

**User's choice:** Navigate with banner
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, link to prereq | Banner includes clickable link to prerequisite session | ✓ |
| No, just inform | Banner names prerequisite but doesn't link | |

**User's choice:** Yes, link to prereq
**Notes:** None

---

## Count Card Destinations

| Option | Description | Selected |
|--------|-------------|----------|
| Natural content pages | Sessions → /sessions, Patches → /patches, Modules → /modules, Challenges → /sessions (challenges) | ✓ |
| Filtered session list | All cards link to /sessions with different filters applied | |
| You decide | Claude picks sensible destinations | |

**User's choice:** Natural content pages
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle hover lift | Slight shadow elevation + cursor pointer on hover | ✓ |
| Arrow icon | Small arrow or chevron in card corner | |
| You decide | Claude picks affordance for consistency | |

**User's choice:** Subtle hover lift
**Notes:** None

---

## You Are Here Marker

| Option | Description | Selected |
|--------|-------------|----------|
| Pulsing dot | Current module gets pulsing/glowing accent dot — distinct from completed and future | ✓ |
| Arrow pointer below | Small upward-pointing triangle below current module dot | |
| Enlarged dot + label | Current module dot 1.5x size with 'Current' label below | |

**User's choice:** Pulsing dot
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| First incomplete session's module | Deterministic, aligns with resume bar logic from Phase 14 | ✓ |
| Last visited module | Tracks actual behavior, could differ from resume bar | |

**User's choice:** First incomplete session's module
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Any completion that week | A week is 'active' if at least one session was marked complete | ✓ |
| You decide | Claude picks sensible definition | |

**User's choice:** Any completion that week
**Notes:** Simple, motivating — even one session counts

---

## Claude's Discretion

- Specific icon choices (SVG, emoji, or CSS shapes)
- Banner dismissal behavior
- Pulsing animation implementation
- "Sessions this month" computation method
- Count card hover transition timing
- Layout of cumulative metrics section

## Deferred Ideas

None — discussion stayed within phase scope
