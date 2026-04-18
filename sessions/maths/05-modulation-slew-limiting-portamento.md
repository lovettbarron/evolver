---
title: 'Session 05: Slew Limiting and Portamento'
session_number: 5
duration: 20
prerequisite: 4
output_type: technique
difficulty: intermediate
tags:
  - modulation
  - slew
  - portamento
  - lag
  - signal-input
instrument: maths
instrument_type: eurorack_module
reference: 'Maths Manual pp. 5-6, Maths Illustrated Supplement'
section: Modulation
---

# Session 05: Slew Limiting and Portamento

**Objective:** Use the Signal IN jack to add slew (lag/glide) to a stepped pitch CV, creating portamento between notes.

> [!tip] If you only have 5 minutes
> Patch a sequencer or keyboard pitch CV into Ch1 Signal IN. Patch Ch1 Unity OUT to an oscillator's pitch input. Set Rise and Fall to 10 o'clock. Play notes -- the pitch should glide smoothly between them instead of jumping. Turn Rise/Fall clockwise for longer glides.

## Warm-Up (2 min)

Set Maths to the Basic Patch init state. Make sure Ch1 Cycle is off. Briefly send a gate to Ch1 Trigger IN to confirm the envelope fires normally -- you will not use the trigger input today, but confirming it works verifies your init state.

## Setup

1. Set all Maths controls to the Basic Patch init state (see [Maths Overview](/modules/maths/))
2. Make sure Ch1 **Cycle is off** (LED dark)
3. Have a pitch CV source ready -- a keyboard, sequencer, or MIDI-to-CV converter
4. Have an oscillator with a pitch CV input available
5. **Do not patch anything yet** -- you will hear the difference between direct and slewed CV

## Exercises

### Exercise 1: Direct vs Slewed Pitch CV (8 min)

<div data-maths-panel
  data-sections="ch1"
  data-knobs="knob-ch1-rise:48,knob-ch1-fall:80"
  data-highlights="jack-ch1-signal-in:amber,jack-ch1-unity-out:amber,knob-ch1-rise:blue,knob-ch1-fall:blue"
></div>

1. Patch your pitch CV source **directly** to the oscillator's pitch input (bypassing Maths). Play a few notes -- the pitch jumps instantly from note to note. This is normal behavior
2. Now disconnect the pitch CV from the oscillator. Patch the pitch CV into **Ch1 Signal IN**
3. Patch **Ch1 Unity OUT** to the oscillator's pitch input
4. Play the same notes -- the pitch should now **glide** between notes instead of jumping. The Rise knob controls how fast the pitch slides up, and the Fall knob controls how fast it slides down

> [!info] Signal IN is a direct-coupled input -- it does not need a trigger or gate. Whatever voltage you feed in, Maths applies its Rise and Fall times as slew (smoothing). Stepped voltages become smooth glides. This is identical to what a dedicated portamento or glide circuit does, but with independent control of upward and downward glide time.

5. Turn **Rise** and **Fall** both to 12 o'clock -- the glide is now longer. Play notes and hear the portamento
6. Turn both to 9 o'clock -- the glide is shorter, more subtle

### Exercise 2: Independent Rise and Fall Slew (7 min)

<div data-maths-panel
  data-sections="ch1"
  data-knobs="knob-ch1-rise:96,knob-ch1-fall:20"
  data-highlights="knob-ch1-rise:amber,knob-ch1-fall:amber"
></div>

1. Set **Rise** to 2 o'clock (slow) and **Fall** to 9 o'clock (fast)
2. Play an ascending sequence of notes -- the pitch slides up slowly between each note
3. Now play a descending sequence -- the pitch snaps down quickly
4. Reverse the settings: **Rise** to 9 o'clock (fast), **Fall** to 2 o'clock (slow)
5. Play ascending notes -- the pitch jumps up quickly
6. Play descending notes -- the pitch slides down slowly

> [!info] Independent Rise and Fall slew is unique to function generators like Maths. A standard portamento knob on a synthesizer applies the same glide time in both directions. With Maths, you can have instant upward jumps with slow downward slides, or vice versa. This creates expressive, asymmetric pitch movement.

7. Find a combination where ascending and descending glides feel musical together

### Exercise 3: Slew on Other CV Sources (3 min)

1. If you have a stepped LFO, random voltage, or sample-and-hold output, try patching it through Ch1 Signal IN instead of the pitch CV
2. With moderate Rise/Fall settings, the stepped voltages become smooth, organic curves
3. Patch Ch1 Unity OUT to a filter cutoff or other modulation destination to hear the smoothed modulation

> [!info] Slew limiting is not just for pitch. Any stepped or abrupt voltage change can be smoothed by Maths. Smooth a random voltage for organic modulation. Smooth a clock signal for ramp waves. This is one of the most versatile patches in modular synthesis.

## Session Output

Document the following in your Obsidian daily note:

- **Portamento technique:** Rise at ___, Fall at ___ (clock positions for your preferred glide)
- **Asymmetric glide discovery:** Which direction (up or down) did you prefer slower? Why?
- **Signal IN concept:** "Signal IN applies Rise/Fall as slew -- no trigger needed"
- **Other CV source tested:** (if applicable) What did smoothing do to it?

## What's Next

In the next session, you will explore Channels 2 and 3 -- the simple attenuverter channels. You will learn how to scale, offset, and invert control voltages, turning Maths into a voltage processing utility.
