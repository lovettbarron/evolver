---
title: 'Session 04: Shape -- Gated Envelopes (Sustain)'
session_number: 4
duration: 25
prerequisite: 3
output_type: patch
difficulty: intermediate
tags:
  - shape-mode
  - sustain
  - asr
  - just-friends
instrument: just-friends
instrument_type: eurorack_module
reference: 'Just Friends docs'
section: Shape Mode
---

# Session 04: Shape -- Gated Envelopes (Sustain)

**Objective:** Create gated ASR (attack-sustain-release) envelopes in Shape/Sustain mode and understand how gate length controls the sustain phase.

> [!tip] If you only have 5 minutes
> Switch MODE to Sustain. Patch a gate (not trigger) to IDENTITY, MIX to a VCA. Hold a long gate -- the envelope rises, holds at full level while the gate is high, then falls when you release. That is ASR behavior. Compare with Transient mode where the envelope always completes its full cycle regardless of gate length.

## What You'll Learn

- How Sustain mode creates ASR envelopes from gate signals
- The difference between Transient (trigger-ignores-gate) and Sustain (gate-controls-sustain)
- Using gate length as an expressive control

## What You'll Need

- Mannequins Just Friends
- A gate source with variable length (keyboard, sequencer with adjustable gate length)
- Patch cables (2-3)
- A VCA or filter to hear envelope behavior

## Starting State

| Control | Position |
|---------|----------|
| SOUND/SHAPE | Shape |
| MODE | **Sustain** |
| TIME | 12 o'clock |
| INTONE | 12 o'clock |
| CURVE | 12 o'clock |
| RAMP | 12 o'clock |
| FM | 12 o'clock |

## Warm-Up (2 min)

Start in Transient mode briefly: patch a gate to IDENTITY, MIX to VCA. Send a long gate -- notice the envelope rises and falls completely, ignoring how long the gate is held. Now switch MODE to Sustain and send the same long gate -- the envelope rises, sustains, then falls on release. Feel the difference.

## Exercises

### Exercise 1: Gate Length as Expression (8 min)

<div data-just-friends-panel
  data-highlights="switch-jf-mode:amber,jack-jf-identity-trig:blue"
  data-knobs="knob-jf-time:64"
></div>

1. In Sustain mode, send a **short gate** (quick tap on keyboard) -- the envelope barely rises before falling. Like a staccato note
2. Send a **medium gate** (hold briefly) -- the envelope rises fully, sustains for the gate duration, then falls
3. Send a **long gate** (hold for 2-3 seconds) -- the envelope rises, holds at maximum, and stays there until you release
4. Try rapid repeated short gates -- you get a choppy, rhythmic envelope pattern
5. The key insight: in Sustain mode, **you control the sustain duration with your gate length**

### Exercise 2: CURVE and RAMP in Sustain Mode (8 min)

<div data-just-friends-panel
  data-highlights="knob-jf-curve:amber,knob-jf-ramp:amber"
  data-knobs="knob-jf-curve:100,knob-jf-ramp:90"
></div>

1. Turn CURVE clockwise to about 2 o'clock -- send a medium gate. The attack is exponential (snappy) and the release is exponential (natural decay)
2. Turn RAMP clockwise to about 2 o'clock -- now the attack is faster than the release. Combined with exponential CURVE, this creates a very natural-sounding instrument envelope
3. Try the opposite: CURVE CCW (logarithmic), RAMP CCW (slow attack). This creates pad-like swells even with short gates because the attack takes time
4. Return both to noon

### Exercise 3: INTONE with Sustain Envelopes (5 min)

<div data-just-friends-panel
  data-highlights="knob-jf-intone:amber"
  data-knobs="knob-jf-intone:95"
></div>

1. Turn INTONE to about 2 o'clock so channels have different speeds
2. Send a gate and watch the LEDs -- each channel rises at a different speed, but they all sustain and then release together when the gate drops
3. Listen to the MIX output -- the attack phase is complex (multiple envelopes at different speeds layering) but the sustain and release are unified
4. This creates richer, more organic-feeling envelopes compared to a single envelope generator

## Output

Save your ASR envelope patch settings:
- **Natural sustain:** CURVE 2 o'clock, RAMP 2 o'clock, INTONE noon
- **Rich layered ASR:** CURVE noon, RAMP noon, INTONE 2 o'clock
- Note how gate length interacts with each setting

## Next Session Preview

Session 05 combines Shape mode with the MODE switch at Cycle and the RUN jack to explore **burst and strata** behaviors -- rhythmic envelope patterns that emerge from the interaction of triggered shapes and continuous cycling.
