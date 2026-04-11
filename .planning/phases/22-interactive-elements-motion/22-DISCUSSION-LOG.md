# Phase 22: Interactive Elements & Motion - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-11
**Phase:** 22-interactive-elements-motion
**Areas discussed:** Hover micro-interactions, Scroll reveal style, Completion celebration, Motion intensity

---

## Hover Micro-Interactions

### Card hover approach

| Option | Description | Selected |
|--------|-------------|----------|
| Replace with springs (Recommended) | Swap CSS transition-all for motion spring on card lift + shadow. Organic and bouncy instead of linear. One system for all hover. | ✓ |
| Layer on top | Keep Phase 21 CSS hover as-is. Only use motion for new things. Simpler. | |
| Springs on select elements only | Only upgrade HeroCard and CompletionToggle. Targeted enhancement. | |

**User's choice:** Replace with springs
**Notes:** All card types get spring hover replacing CSS transitions.

### Spring scope beyond cards

| Option | Description | Selected |
|--------|-------------|----------|
| Nav links | Subtle scale or underline spring on navigation link hover | |
| Buttons (CTA, toggle) | Spring press-down on click, spring hover scale on buttons | |
| Session rows | Spring highlight on session list rows | |
| You decide | Claude picks which elements benefit from springs | ✓ |

**User's choice:** You decide
**Notes:** Claude has discretion on which non-card elements get spring hover.

---

## Scroll Reveal Style

### Reveal direction

| Option | Description | Selected |
|--------|-------------|----------|
| Fade-up (Recommended) | Elements fade in + translate ~12-16px upward. Classic, subtle. | ✓ |
| Fade only | Pure opacity fade, no movement. Minimal, zero risk. | |
| Fade-up with stagger | Same as fade-up, but items stagger with ~50ms delay. More dynamic. | |

**User's choice:** Fade-up
**Notes:** None

### Stagger behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle stagger (Recommended) | ~50ms delay between siblings in a grid/list. Gentle cascade. | ✓ |
| No stagger | All items in a group fade-up simultaneously. | |
| You decide | Claude picks per component type. | |

**User's choice:** Subtle stagger
**Notes:** None

---

## Completion Celebration

### Celebration style

| Option | Description | Selected |
|--------|-------------|----------|
| Checkmark spring + color pulse | Check icon springs in with overshoot, button pulses accent color. Contained. | ✓ |
| Confetti burst | Small particle burst from button. More celebratory, could be distracting. | |
| Subtle scale bounce | Button scales up ~1.1x then bounces back. Minimal but tactile. | |
| You decide | Claude picks most rewarding without being distracting. | |

**User's choice:** Checkmark spring + color pulse
**Notes:** None

### Uncomplete animation

| Option | Description | Selected |
|--------|-------------|----------|
| Quick fade-out | Check fades out quickly (~100ms), smooth return to default. | ✓ |
| Instant snap | No animation on uncomplete. Immediate. | |
| You decide | Claude picks. | |

**User's choice:** Quick fade-out
**Notes:** None

---

## Motion Intensity

### Motion personality

| Option | Description | Selected |
|--------|-------------|----------|
| Understated & precise (Recommended) | Low bounce, quick settle. Apple iOS springs. Best for ADHD. | ✓ |
| Warm & organic | Medium bounce, slightly longer settle. More character. | |
| Barely there | Minimal overshoot, very fast settle. Almost CSS-like. | |

**User's choice:** Understated & precise
**Notes:** None

### Reduced motion behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Zero animation (Recommended) | prefers-reduced-motion disables ALL motion. Elements appear in final state. | ✓ |
| Reduced alternatives | Replace springs with instant changes, keep opacity fades. More nuance. | |

**User's choice:** Zero animation
**Notes:** None

---

## Claude's Discretion

- Which non-card elements get spring hover
- Exact spring config values (stiffness, damping)
- Scroll reveal implementation approach (useInView vs IntersectionObserver)
- Stagger implementation detail
- Whether to create reusable motion wrapper components

## Deferred Ideas

None
