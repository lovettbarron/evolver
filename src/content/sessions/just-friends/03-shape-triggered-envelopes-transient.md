---
title: 'Session 03: Shape -- Triggered Envelopes (Transient)'
session_number: 3
duration: 25
prerequisite: 2
output_type: patch
difficulty: beginner
tags:
  - shape-mode
  - transient
  - envelope
  - just-friends
instrument: just-friends
instrument_type: eurorack_module
reference: 'Just Friends docs'
section: Shape Mode
---

# Session 03: Shape -- Triggered Envelopes (Transient)

**Objective:** Create shaped triggered envelopes using CURVE and RAMP in Shape/Transient mode. Learn how these controls transform the character of each slope.

> [!tip] If you only have 5 minutes
> Shape/Transient, trigger at IDENTITY, MIX to VCA. Turn CURVE fully CW -- the envelope snaps on and decays slowly (exponential). Turn RAMP fully CW -- the envelope has a fast attack and long decay (percussive). These two knobs are your envelope character controls.

## What You'll Learn

- How CURVE shapes the waveshape (linear, exponential, logarithmic)
- How RAMP controls the attack/decay ratio
- Creating specific envelope characters for different musical uses

## What You'll Need

- Mannequins Just Friends
- A gate or trigger source
- Patch cables (2-3)
- A VCA or filter to modulate with the envelope

## Starting State

| Control | Position |
|---------|----------|
| SOUND/SHAPE | Shape |
| MODE | Transient |
| TIME | 12 o'clock |
| INTONE | 12 o'clock |
| CURVE | 12 o'clock |
| RAMP | 12 o'clock |
| FM | 12 o'clock |

## Warm-Up (2 min)

Patch a trigger to IDENTITY, MIX to your VCA. Send a few triggers to confirm symmetrical envelopes with all controls at noon. The rise and fall should be equal length and linear (straight slopes).

## Exercises

### Exercise 1: CURVE -- Waveshape Character (8 min)

<div data-just-friends-panel
  data-highlights="knob-jf-curve:amber"
  data-knobs="knob-jf-curve:127"
></div>

1. Start with CURVE at noon (12 o'clock) and send a trigger -- the slope is linear, a straight line up and down
2. Turn **CURVE** fully clockwise -- send a trigger. The slope is now **exponential**: sharp attack, slow concave decay. This sounds punchy and percussive
3. Turn **CURVE** fully counter-clockwise -- send a trigger. The slope is now **logarithmic**: slow convex attack, sharp decay. This sounds like a reverse envelope or a swell
4. Find the halfway point between noon and full CW (about 2 o'clock) -- this is a natural-sounding exponential curve, similar to acoustic instrument dynamics
5. Return CURVE to noon

> [!info] Listen For
> Exponential curves (CW) feel "natural" for percussive sounds because acoustic instruments decay exponentially. Logarithmic curves (CCW) feel "reversed" or "swelling." Linear (noon) is the most neutral and clinical-sounding.

### Exercise 2: RAMP -- Attack/Decay Ratio (8 min)

<div data-just-friends-panel
  data-highlights="knob-jf-ramp:amber"
  data-knobs="knob-jf-ramp:110"
></div>

1. With CURVE at noon, turn **RAMP** fully clockwise -- send a trigger. The attack is very short and the decay is very long. This is a classic percussive envelope (short attack, long release)
2. Turn **RAMP** fully counter-clockwise -- send a trigger. Now the attack is long and the decay is short. This sounds like a reversed hit or a swell-then-cut
3. Return RAMP to noon (symmetrical) -- send a trigger for comparison
4. Set RAMP to about 2 o'clock -- this gives a slightly percussive character with a natural attack-to-decay ratio. A good default for many patches

### Exercise 3: CURVE + RAMP Combined (5 min)

<div data-just-friends-panel
  data-highlights="knob-jf-curve:amber,knob-jf-ramp:amber"
  data-knobs="knob-jf-curve:100,knob-jf-ramp:100"
></div>

1. Set CURVE to about 2 o'clock (moderately exponential) and RAMP to about 2 o'clock (moderately percussive) -- send a trigger. This is a classic snappy envelope, great for plucks and percussion
2. Set CURVE to about 10 o'clock (moderately logarithmic) and RAMP to about 10 o'clock (slow attack) -- send a trigger. This is a pad-like swell
3. Try CURVE fully CW with RAMP fully CCW -- an extreme shape: exponential attack (fast snap up) with a slow linear fall
4. Experiment with a few more combinations to build intuition for how CURVE and RAMP interact

## Output

Save your favorite envelope settings as a documented technique:
- **Percussive pluck:** CURVE 2 o'clock, RAMP 2 o'clock, TIME noon
- **Pad swell:** CURVE 10 o'clock, RAMP 10 o'clock, TIME 1 o'clock
- Note any other combinations you discovered

## Next Session Preview

Session 04 explores **Shape/Sustain mode** -- gated envelopes with attack-sustain-release behavior. You will learn how gate length controls the sustain phase and compare Transient vs Sustain responses.
