---
title: 'Session 15: Conditional Trigs & Fill Mode'
session_number: 15
duration: 20
prerequisite: 14
output_type: recording
difficulty: intermediate
tags:
  - sequencer
  - conditional-trigs
  - fill-mode
  - generative
  - probability
instrument: octatrack
reference: Elektron Manual Ch. 12.5
section: Sequencer Deep Dive
instrument_type: instrument
---

# Session 15: Conditional Trigs & Fill Mode

**Objective:** Make patterns generative using conditional trigs. Set steps to fire on a 50% chance, every other loop, only after a previous trig played, only during fills. Build a pattern that evolves over 32 loops without ever repeating identically.

> [!tip] If you only have 5 minutes
> Hold a [TRIG] step. Find the TRIG CONDITION parameter. Set it to `50%`. Release. That step now fires randomly half the time. Repeat across the pattern. Boredom-proof.

## Warm-Up (2 min)

You can build patterns. They loop perfectly. After 8 bars, they get boring. Conditional trigs solve that. Press **[PLAY]** on a current pattern, listen for 16 bars, notice how repetition deadens. Stop. Time to add evolution.

## Setup

Start from the `LAB` project. Have a working pattern on Tracks 1-3 (drums minimum). Trigs placed in standard positions. Press **[PLAY]** to confirm — note how the pattern feels static. We're about to break that.

## Exercises

### Exercise 1: Probability — The 50% Trick (4 min)

The simplest conditional: a step that fires randomly with a probability.

1. Press **[STOP]**. Press **[TRACK 3]** (your hat track, with trigs on 3, 7, 11, 15)
2. **Hold [TRIG 3]**. Find the **TRIG CONDITION** parameter (often on the screen as you hold; or press an arrow key to navigate options)
3. Set TRG (trig condition) to `50%`. Release
4. Hold **[TRIG 7]** + TRG = `50%`. Release. Repeat for trigs 11 and 15
5. Press **[PLAY]**. The hats now play roughly half as often, randomly. Each loop sounds different
6. **Other probabilities**: `25%`, `33%`, `50%`, `66%`, `75%`. Choose based on density desired

<div data-octatrack-panel
  data-sections="trig"
  data-highlights="key-trig-3:cyan,key-trig-7:cyan,key-trig-11:cyan,key-trig-15:cyan"
></div>

### Exercise 2: 1:N — Every Nth Loop (4 min)

Trig fires only on every Nth iteration of the pattern.

1. Stop. Press **[TRACK 2]** (snare). Hold **[TRIG 13]** (a snare trig)
2. Set TRG to `1:2` — fires only on every 2nd loop
3. Now hold **[TRIG 5]** (also snare) + TRG = `2:2` — fires only on the *other* loop
4. Press **[PLAY]**. Loop 1: snare on step 13. Loop 2: snare on step 5. Loop 3: step 13. Loop 4: step 5
5. **Other ratios**: `1:2`, `2:2`, `1:3`, `2:3`, `3:3`, `1:4`, `2:4`, etc. — patterns that morph over multi-loop cycles
6. Try TRG = `1:4` on a kick — kicks only the first of every 4 loops. Adds a low-frequency pulse to long-form patterns

### Exercise 3: PRE — Conditional on Previous Trig (3 min)

PRE means "fire this trig only if the previous conditional trig fired." Cascading conditional logic.

1. Stop. Press **[TRACK 1]** (kick). Place trigs on 1, 5, 9, 13
2. Hold **[TRIG 5]** + TRG = `50%`
3. Hold **[TRIG 9]** + TRG = `PRE` (only fires if step 5 fired)
4. Hold **[TRIG 13]** + TRG = `PRE` (only fires if step 9 fired, which only fires if 5 fired)
5. Press **[PLAY]**. Either: only step 1 fires (50% chance every loop), OR steps 1 + 5 + 9 + 13 all fire (the other 50%). All-or-nothing chains
6. **NOT-PRE** (`!PRE` in some firmware): the inverse — fires only if previous did NOT fire

### Exercise 4: FILL — Fill Mode Trigs (4 min)

Some trigs fire only when you press the FILL button. Used for drum fills and break sections.

1. Stop. Press **[TRACK 2]** (snare). Place trigs on **[TRIG 14, 15, 16]** — three rapid snare hits at the end of the bar
2. Hold each of those trigs and set TRG = `FILL` — only plays during fill mode
3. Press **[PLAY]**. Normal pattern plays — those three end-of-bar snares are silent
4. Press **[FUNC] + [YES]** (FILL key, varies by firmware) — fill mode toggles on. Keep playing. The next bar's last 3 steps have the snare fill
5. Release fill mode (toggle off, or hold-only). Pattern returns to normal
6. **Use case**: build entire fill sections that are silent until you trigger them — instant break, drop, transition material

### Exercise 5: Combine Conditional Types (5 min)

Layer the conditional types for evolving patterns.

1. **Track 1 (kick)**: trigs on 1, 5, 9, 13
   - Step 1: TRG = `1:1` (always fires — root anchor)
   - Step 5: TRG = `75%`
   - Step 9: TRG = `1:2` (every other loop)
   - Step 13: TRG = `PRE` (fires if 9 fired)
2. **Track 2 (snare)**: trigs on 5, 13
   - Step 5: TRG = `1:2`
   - Step 13: TRG = `2:2` (the loop where 5 doesn't)
3. **Track 3 (hat)**: trigs on 3, 7, 11, 15
   - Steps 3, 11: TRG = `50%`
   - Steps 7, 15: TRG = `66%`
4. Press **[PLAY]** and let it run for 32 bars. Listen — the pattern morphs continuously. Sometimes sparse, sometimes dense. Snares alternate. Kicks have probabilistic anchors
5. Record a 30-second pass to capture one variation: press **[FUNC] + [REC1]** (or set up a track recorder) to capture the audio
6. Save: **[FUNC] + [PROJ]**

## Exploration (if time allows)

- Try `NEI` (neighbor) condition — fires if the same step on the neighboring track fired. Useful for sympathetic patterns
- Combine 1:N with PRE for deeply staggered patterns: trig 1 = 1:4, trig 2 = PRE — both fire only on every 4th loop
- Long patterns + conditional trigs = music that feels composed rather than looped. 64-step patterns with conditional trigs can sustain interest for minutes

## Output Checklist

- [ ] I set a trig to `50%` and heard probabilistic firing
- [ ] I used `1:N` to make a trig fire only on certain loops
- [ ] I chained PRE conditional trigs
- [ ] I built fill-mode-only trigs and triggered them with the FILL gesture
- [ ] I built a multi-track pattern combining 4+ different conditional types
- [ ] I let the pattern play for 16+ bars and heard it evolve

## Key Takeaways

- **Conditional trigs** turn static patterns into generative ones — `50%`, `1:N`, `PRE`, `FILL`, `NEI` are the vocabulary
- **Probability (`50%`, etc.)** = randomness; **`1:N`** = deterministic cycling; **`PRE`** = chained logic; **`FILL`** = on-demand sections
- A pattern with mixed conditional types can play for 32+ bars without repeating identically — solves the boredom problem
- Combine with parameter locks (Session 14) for evolution that's both rhythmic AND timbral

## Next Session Preview

Next: micro timing, slide trigs, and scale settings. Shift trigs off the grid by fractions of a step (humanization). Slide parameters smoothly between steps. Set per-track length for polymetric patterns. The advanced sequencer toolkit.
