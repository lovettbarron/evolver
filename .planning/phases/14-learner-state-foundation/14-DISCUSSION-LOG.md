# Phase 14: Learner State Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-05
**Phase:** 14-learner-state-foundation
**Areas discussed:** Completion toggle UX, Resume bar design, Demo mode interaction, State merge strategy

---

## Completion Toggle UX

### Toggle Placement

| Option | Description | Selected |
|--------|-------------|----------|
| Sticky bottom bar | Always visible at bottom of viewport — "Mark complete" button + session title. Zero scroll needed | ✓ |
| Top of session (under title) | Checkbox right below session title and metadata. Visible on load but scrolls away | |
| End of session content | Toggle after all session steps — natural "I finished" moment but requires scrolling | |

**User's choice:** Sticky bottom bar
**Notes:** None

### Confirmation Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Instant toggle | One tap flips it. Undo by tapping again. Zero friction — matches ADHD principle | ✓ |
| Confirmation dialog | "Mark complete?" with confirm/cancel. Adds a decision point | |
| Instant + undo toast | Toggles immediately, shows brief "Undo" toast. More UI complexity | |

**User's choice:** Instant toggle
**Notes:** None

### Completed State Appearance

| Option | Description | Selected |
|--------|-------------|----------|
| Filled checkbox + "Completed" | Shows ☑ Completed with subtle success color. Still tappable to un-complete | ✓ |
| Hide the bar entirely | Bar disappears for completed sessions. No way to undo from session page | |
| Muted bar with checkmark | Bar stays but dims/fades to indicate done state | |

**User's choice:** Filled checkbox + "Completed"
**Notes:** None

---

## Resume Bar Design

### Placement

| Option | Description | Selected |
|--------|-------------|----------|
| Instrument home page | Shows on /instruments/[slug] — first thing when picking instrument | ✓ |
| Global top bar | Shows across all pages as slim banner. Always accessible but potentially noisy | |
| Session list page | Shows at top of sessions list. Contextual but requires navigating there first | |

**User's choice:** Instrument home page
**Notes:** None

### Next Session Logic

| Option | Description | Selected |
|--------|-------------|----------|
| Last visited + first incomplete | If last-visited incomplete, show that. Otherwise first incomplete in sequence | ✓ |
| Always first incomplete | Ignore last-visited, show earliest incomplete. Simpler but less context-aware | |
| Last visited only | Always return to exact last session viewed, even if complete | |

**User's choice:** Last visited + first incomplete
**Notes:** None

### All Complete State

| Option | Description | Selected |
|--------|-------------|----------|
| Celebration message | "All sessions complete! You've mastered the Evolver." Quiet celebration | |
| Hide the bar | No resume bar when everything done. Clean but feels like something disappeared | |
| Link to freeform practice | "All complete — try a challenge or revisit a favorite." Points to patches/challenges | ✓ |

**User's choice:** Link to freeform practice
**Notes:** None

---

## Demo Mode Interaction

### Demo State Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Read-only synthetic journey | Toggle hidden/disabled. Resume bar shows synthetic journey. Visitors observe only | ✓ |
| Fully interactive demo | Demo users can toggle and persist in localStorage. Full experience but confusing | |
| Interactive but resets | Can toggle but resets on reload. Good for trying UX, ephemeral | |

**User's choice:** Read-only synthetic journey
**Notes:** None

---

## State Merge Strategy

### Merge Timing

| Option | Description | Selected |
|--------|-------------|----------|
| Server props + client hydration merge | Server fetches vault, client hydrates from localStorage, unions on hydration | ✓ |
| API endpoint for vault data | Client fetches via API route, merges in Zustand. More network calls | |
| Server-only with client overlay | Server renders vault state, client tracks only manual diffs | |

**User's choice:** Server props + client hydration merge
**Notes:** None

### Overlap Handling

| Option | Description | Selected |
|--------|-------------|----------|
| Keep both, ignore overlap | Union semantics — if either says complete, it's complete. No deduplication | ✓ |
| Clean up manual when vault confirms | Remove from localStorage when vault also has it. Minimal storage but complex | |

**User's choice:** Keep both, ignore overlap
**Notes:** None

---

## Claude's Discretion

- Zustand store shape and internal API design
- Sticky bar animation/transition details
- Resume bar visual treatment
- Hydration timing and flash prevention
- Last-visited tracking mechanism
- localStorage key naming and versioning

## Deferred Ideas

None — discussion stayed within phase scope
