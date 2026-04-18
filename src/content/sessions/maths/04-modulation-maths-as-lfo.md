---
title: 'Session 04: Maths as LFO'
session_number: 4
duration: 25
prerequisite: 3
output_type: patch
difficulty: beginner
tags:
  - modulation
  - lfo
  - cycle
  - vari-response
instrument: maths
instrument_type: eurorack_module
reference: 'Maths Manual pp. 6-8'
section: Modulation
---

# Session 04: Maths as LFO

**Objective:** Use Cycle mode at sub-audio rates to create an LFO that modulates another module, and learn how Vari-Response shapes the modulation curve.

> [!tip] If you only have 5 minutes
> Set Ch1 Rise and Fall to 12 o'clock. Press Cycle. Patch Ch1 Variable OUT to a filter cutoff CV input. Set the Attenuverter to 2 o'clock. You should hear the filter sweep up and down automatically. Adjust Rise/Fall for speed, Vari-Response for shape.

## Warm-Up (2 min)

Set Maths to the Basic Patch init state. Briefly enable Cycle on Ch1 with Rise and Fall fully counterclockwise -- confirm you hear the audio-rate tone from Session 03. Press Cycle off. You will use the same mode at slower speeds today.

## Setup

1. Set all Maths controls to the Basic Patch init state (see [Maths Overview](/modules/maths/))
2. Have a sound source running through a VCF or VCA -- you need a destination for the LFO
3. Patch **Ch1 Variable OUT** to the VCF cutoff CV input (or another modulatable parameter)
4. Set the Maths **Attenuverter** to about 2 o'clock (positive, moderate depth)

## Exercises

### Exercise 1: Basic LFO (8 min)

<div data-maths-panel
  data-sections="ch1"
  data-knobs="knob-ch1-rise:64,knob-ch1-fall:64,knob-ch1-attenuverter:96"
  data-highlights="button-ch1-cycle:amber,knob-ch1-rise:blue,knob-ch1-fall:blue"
></div>

1. Set **Rise** and **Fall** both to 12 o'clock (noon)
2. Press **Cycle** -- the Cycle LED lights up. Watch the Unity LED pulse slowly on and off
3. Listen to your sound source -- the filter cutoff (or whatever you patched to) should be sweeping up and down in a steady rhythm
4. Turn **Rise** clockwise -- the upward sweep gets slower
5. Turn **Rise** counterclockwise -- the upward sweep gets faster
6. Do the same with **Fall** -- counterclockwise for fast downward sweep, clockwise for slow
7. Set Rise and Fall to matching positions for a symmetric LFO. Try these speeds:
   - Both at 10 o'clock: moderate speed, good for vibrato
   - Both at 12 o'clock: slow sweep, good for evolving textures
   - Both at 2 o'clock: very slow, good for gradual timbral shifts

### Exercise 2: Asymmetric LFO Shapes (8 min)

<div data-maths-panel
  data-sections="ch1"
  data-knobs="knob-ch1-rise:32,knob-ch1-fall:96,knob-ch1-vari-response:64"
  data-highlights="knob-ch1-rise:amber,knob-ch1-fall:amber,knob-ch1-vari-response:amber"
></div>

1. Set **Rise** to 9 o'clock (fast) and **Fall** to 2 o'clock (slow) -- this creates a saw-like LFO that snaps up quickly and decays slowly
2. Listen to the effect on your filter -- it should have a sharp attack followed by a gradual sweep down
3. Reverse it: set **Rise** to 2 o'clock and **Fall** to 9 o'clock -- now the LFO rises slowly and drops quickly
4. Listen to the difference -- this creates a building swell that cuts off abruptly
5. Now turn the **Vari-Response** knob fully clockwise (exponential) -- the sweep curves become exponential, spending more time at the extremes
6. Turn Vari-Response fully counterclockwise (logarithmic) -- the curves change character again, spending more time at the middle
7. Return to noon (linear) -- smooth, even sweeps

> [!info] Vari-Response is what makes Maths LFOs more expressive than basic LFO modules. A logarithmic curve lingers at the bottom of the sweep and rushes through the top. An exponential curve does the opposite. Linear is the standard triangle LFO. Combined with asymmetric Rise/Fall, you can create LFO shapes that no standard LFO module offers.

### Exercise 3: Control the Depth (5 min)

1. With the LFO running, slowly turn the **Attenuverter** from fully clockwise toward noon -- the modulation depth decreases smoothly
2. At noon, the modulation should stop entirely (zero output from Variable OUT)
3. Continue turning counterclockwise past noon -- the modulation returns but inverted (the sweep goes down when it used to go up)
4. Find a depth that sounds musical -- usually somewhere between 1 o'clock and 3 o'clock for filter modulation

> [!info] The Attenuverter on Variable OUT is your LFO depth control. This is why you patch LFOs from Variable OUT, not Unity OUT -- Unity OUT always sends the full-scale voltage with no depth control.

5. Note your final Attenuverter position

## Session Output

Document your LFO patch in your Obsidian daily note:

- **Rise position:** (clock position)
- **Fall position:** (clock position)
- **Vari-Response position:** (clock position -- log, linear, or exp?)
- **Attenuverter position:** (clock position -- modulation depth)
- **LFO destination:** What parameter did you modulate?
- **Character description:** (steady pulse? slow swell? snappy rhythmic? evolving?)

## What's Next

In the next session, you will learn a completely different use for Maths -- slew limiting. Instead of generating its own voltage, Ch1 will smooth and lag an incoming stepped voltage to create portamento (pitch glide) between notes.
