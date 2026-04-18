---
title: 'Session 03: Delay Mode -- Infinite Grains & Slicing'
session_number: 3
duration: 20
prerequisite: 2
output_type: recording
difficulty: intermediate
tags:
  - delay
  - feedback
  - slicer
  - infinite-grain
instrument: beads
instrument_type: eurorack_module
reference: 'Beads Manual pp. 10-11'
section: Grain Modes
---

# Session 03: Delay Mode -- Infinite Grains & Slicing

**Objective:** Transform Beads into a delay effect by setting SIZE fully clockwise, creating rhythmic delay patches with feedback and pitch-shifted repeats.

> [!tip] If you only have 5 minutes
> Set init state. Turn SIZE fully clockwise (infinity symbol). DENSITY at 1 o'clock. You now have a delay effect. TIME controls delay time. Turn FEEDBACK to 11 o'clock for repeating echoes. Done -- Beads is a delay.

## Warm-Up (2 min)

Set Beads to init state with audio patched. Confirm latched grain generation. Briefly turn DENSITY to 1 o'clock to hear grains, then return to noon. Sweep SIZE from CCW to CW and listen to how grain length increases.

## Exercises

### Exercise 1: Enter Delay Mode (4 min)

<div data-beads-panel
  data-knobs="knob-beads-size:127,knob-beads-density:80"
  data-highlights="knob-beads-size:amber"
></div>

1. Turn **SIZE** fully clockwise until you see the infinity symbol -- this creates one infinite grain that continuously reads from the buffer. Beads is now a delay
2. Set DENSITY to about 1 o'clock
3. Listen -- you should hear delayed versions of your input. The delay time is set by the buffer position
4. The character is different from a standard delay: the grain envelope and quality settings still color the sound

### Exercise 2: Delay Time with TIME and DENSITY (5 min)

<div data-beads-panel
  data-knobs="knob-beads-size:127,knob-beads-density:64,knob-beads-time:40"
  data-highlights="knob-beads-time:amber,knob-beads-density:blue"
></div>

1. In delay mode, **DENSITY** controls the delay time when the SEED input is unpatched and SEED is latched. At noon, the delay time equals the full buffer length
2. Turn DENSITY counterclockwise from noon -- the delay time shortens. At extreme CCW positions, you get very short delays that approach flanger and comb-filtering territory
3. Turn DENSITY clockwise from noon -- additional unevenly spaced taps appear, creating a multi-tap delay effect
4. **TIME** now controls which part of the buffer the delay reads from -- sweep it to hear different delay positions

### Exercise 3: Feedback for Repeating Echoes (4 min)

<div data-beads-panel
  data-knobs="knob-beads-size:127,knob-beads-feedback:60,knob-beads-density:50"
  data-highlights="knob-beads-feedback:amber"
></div>

1. Turn **FEEDBACK** clockwise to about 10 o'clock -- delayed audio is fed back into the input, creating repeating echoes
2. Increase to noon -- the echoes repeat longer before fading
3. Increase past noon cautiously -- the feedback approaches self-oscillation. The quality setting affects the saturation character (clean brickwall at high quality, grungy tape saturation at low quality)
4. Try switching quality modes while feedback is active -- each mode produces a different distortion character on the feedback path
5. Return FEEDBACK to about 10 o'clock for musical repeats

### Exercise 4: Pitch-Shifted Delays (3 min)

<div data-beads-panel
  data-knobs="knob-beads-size:127,knob-beads-pitch:75,knob-beads-feedback:50"
  data-highlights="knob-beads-pitch:amber,knob-beads-feedback:blue"
></div>

1. Set PITCH to about +5 semitones (just past noon clockwise)
2. With moderate FEEDBACK, each repeat is pitched up -- creating a rising shimmer delay effect
3. Set PITCH to about -7 semitones -- each repeat drops in pitch, creating a descending cascade
4. With high FEEDBACK and PITCH offset, the repeats spiral up or down in pitch until they fade -- a classic granular delay effect

### Exercise 5: Rhythmic Delay Patch (2 min)

<div data-beads-panel
  data-knobs="knob-beads-size:127,knob-beads-density:40,knob-beads-feedback:55,knob-beads-dry-wet:90"
  data-highlights="knob-beads-density:amber,knob-beads-dry-wet:blue"
></div>

1. Feed a rhythmic source (drums, percussive sequence)
2. Adjust DENSITY to set a delay time that complements the rhythm
3. Set FEEDBACK to about 10 o'clock for a few repeats
4. Adjust DRY/WET to blend the delay with the dry signal
5. Record a 30-second clip of your rhythmic delay patch

## Session Output

Document the following in your Obsidian daily note:

- **Delay mode entry:** SIZE fully CW = infinite grain = delay behavior
- **DENSITY as delay time:** How turning DENSITY CCW shortens the delay
- **Feedback character:** Which quality mode produced your favorite feedback saturation?
- **Pitch-shifted delay:** Did the rising or falling pitch cascade sound more musical?
- **Recording:** Save your rhythmic delay patch clip

## What's Next

In Session 04, you will explore the remaining grain generation modes -- Clocked (external clock) and Gated (manual trigger) -- to create rhythmically synchronized granular textures.
