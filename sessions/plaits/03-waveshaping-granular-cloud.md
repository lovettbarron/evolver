---
title: 'Session 03: Waveshaping & Granular Cloud'
session_number: 3
duration: 20
prerequisite: 2
output_type: patch
difficulty: intermediate
tags:
  - mode-pairs
  - waveshaping
  - granular
  - bank-1-model-2
  - bank-2-model-1
instrument: plaits
instrument_type: eurorack_module
reference: 'Plaits Manual pp. 7, 9'
section: Mode Pairs
---

# Session 03: Waveshaping & Granular Cloud

**Objective:** Explore the waveshaping oscillator (Bank 1 Model 2) and granular cloud (Bank 2 Model 1) -- two models that transform simple sources into complex, evolving textures through different mechanisms.

> [!tip] If you only have 5 minutes
> Set init state. Select Bank 1 Model 2 (waveshaping). Sweep TIMBRE to hear the wavefolder amount change from clean triangle to aggressive harmonics. Then switch to Bank 2 Model 1 (granular cloud) and sweep TIMBRE -- you now control grain density. Two very different approaches to complexity.

## Warm-Up (2 min)

Set init state. Briefly revisit Bank 1 Model 1 and confirm you can hear the VA oscillators. Sweep HARMONICS once as a quick ear calibration. Now switch to Model 2 -- you are in waveshaping territory.

## Setup

1. Set all controls to init state
2. Patch V/OCT to **V/OCT**, OUT to mixer
3. Select Bank 1 Model 2 (second LED in left column)

## Exercises

### Exercise 1: Waveshaping Oscillator (7 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:64,knob-plaits-timbre:40,knob-plaits-morph:64"
  data-highlights="knob-plaits-timbre:amber,knob-plaits-harmonics:blue"
></div>

1. On Bank 1 Model 2, start with all knobs at noon. You should hear an asymmetric triangle processed through a waveshaper and wavefolder
2. Sweep **TIMBRE** from CCW to CW: this controls the wavefolder amount. Low = clean triangle, high = aggressively folded with rich harmonics. Find the sweet spot where it adds just enough grit
3. Sweep **HARMONICS**: this selects the waveshaper waveform. You will hear different harmonic patterns emerge
4. Sweep **MORPH**: this controls waveform asymmetry. Combined with TIMBRE, you get a wide range of tones from smooth to brutal
5. Listen to AUX -- it carries a variant with a different wavefolder curve, giving you two flavors simultaneously

### Exercise 2: Granular Cloud (7 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:30,knob-plaits-timbre:90,knob-plaits-morph:64"
  data-highlights="knob-plaits-timbre:amber,knob-plaits-harmonics:blue,knob-plaits-morph:blue"
></div>

1. Switch to Bank 2 Model 1 (press MODEL 2 once -- top LED in right column). This is the granular cloud: a swarm of 8 enveloped sawtooth waves
2. Sweep **TIMBRE**: this controls grain density -- from sparse, rhythmic clicks to a dense, shimmering cloud. Start low and slowly increase
3. Sweep **HARMONICS**: this controls pitch randomization of the grains. Fully CCW = all grains at the same pitch. CW = chaotic pitch scatter
4. Sweep **MORPH**: this controls grain duration and overlap. Short grains = clicky, long grains = overlapping wash
5. AUX uses sine wave oscillators instead of sawtooth grains -- listen to the difference: smoother, more bell-like clouds

### Exercise 3: Texture Contrast (4 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:50,knob-plaits-timbre:80"
  data-highlights="jack-plaits-out:amber,jack-plaits-aux:blue"
></div>

1. Stay on the granular cloud. Set TIMBRE high (dense cloud), HARMONICS at about 10 o'clock (slight pitch randomization), MORPH at noon
2. This creates a shimmering pad texture from a single module with no external modulation needed
3. Switch to Bank 1 Model 2 (waveshaping) without changing knob positions. Notice how the same TIMBRE position now means heavy wavefolding instead of grain density
4. Flip back and forth between the two models -- same knobs, one produces pitched complexity, the other produces granular texture

## Session Output

Document in your Obsidian daily note:

- **Waveshaping sweet spot:** Note TIMBRE/HARMONICS positions where the wavefolder added harmonics without becoming harsh
- **Granular cloud pad:** Note the settings for a usable shimmering pad texture (TIMBRE/HARMONICS/MORPH positions)
- **AUX comparison:** Which model's AUX output did you prefer and why?

## What's Next

In the next session, you will explore two-operator FM (Bank 1 Model 3) and particle noise (Bank 2 Model 3) -- both involve frequency-domain complexity, but FM is precise while particle noise is chaotic.
