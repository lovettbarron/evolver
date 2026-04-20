---
title: 'Session 02: Dual-Peak Resonance Exploration'
session_number: 2
duration: 20
prerequisite: 1
output_type: patch
difficulty: intermediate
tags:
  - resonance
  - dual-peak
  - formant
  - beyond
instrument: ikarie
instrument_type: eurorack_module
reference: 'Ikarie Manual pp. 3-5, Patch Tips 1-2'
section: Resonance
---

# Session 02: Dual-Peak Resonance Exploration

**Objective:** Explore RESONANCE fader behavior, the BEYOND output's twin-peak character at high resonance, and SPREAD mode for formant-like sounds.

> [!tip] If you only have 5 minutes
> Set init state, increase RESONANCE to about 3/4, sweep CUTOFF slowly. Listen to the resonant peak. Now patch BEYOND and compare -- it has a completely different character. That dual-peak sound is unique to Ikarie.

## Warm-Up (2 min)

From init state, sweep CUTOFF from LP to HP while listening. Recall from Session 01 how the full sweep feels. Then increase RESONANCE slightly from minimum and repeat the sweep -- hear how the resonant peak adds emphasis.

## Setup

1. Set all Ikarie controls to the Basic Patch init state
2. Patch audio source to **L IN**
3. Patch **L OUT** to mixer channel 1
4. Patch **BEYOND** to mixer channel 2 (keep it muted initially)
5. Optionally patch **R OUT** to a third channel for stereo monitoring

## Exercises

### Exercise 1: Resonance Sweep (5 min)

<div data-ikarie-panel
  data-knobs="knob-ikarie-cutoff:40"
  data-highlights="slider-ikarie-resonance:amber,knob-ikarie-cutoff:blue"
></div>

1. Set CUTOFF to about 10 o'clock (slightly into LP territory)
2. Slowly push the **RESONANCE** fader up from minimum. Listen for the resonant peak -- it starts as a subtle emphasis and becomes a sharp, ringing peak
3. With RESONANCE at about 3/4, sweep CUTOFF slowly. The resonant peak sweeps with it, creating the classic acid filter sound
4. Push RESONANCE higher and listen for the onset of self-oscillation (we will explore this fully in Session 04)
5. Pull RESONANCE back to about halfway -- this is the sweet spot for musical resonance

### Exercise 2: BEYOND at High Resonance (5 min)

<div data-ikarie-panel
  data-highlights="jack-ikarie-beyond:amber,slider-ikarie-resonance:blue"
  data-knobs="slider-ikarie-resonance:90,knob-ikarie-cutoff:50"
></div>

1. With RESONANCE at halfway, unmute the BEYOND output
2. Listen to BEYOND while sweeping CUTOFF -- it has a band-pass / twin-peak character different from L OUT
3. Increase RESONANCE further. BEYOND becomes more dramatic because it captures the spectral difference between the two filter cores
4. Solo L OUT, then solo BEYOND. They are complementary -- what L OUT removes, BEYOND reveals
5. Try mixing L OUT and BEYOND at different levels for blended timbres

### Exercise 3: SPREAD Mode Formants (5 min)

<div data-ikarie-panel
  data-highlights="switch-ikarie-pan-spread:amber,knob-ikarie-stereo:amber"
  data-knobs="slider-ikarie-resonance:80,knob-ikarie-stereo:90"
></div>

1. Switch to **SPREAD** mode
2. Set RESONANCE to about 2/3 -- enough for clear resonant peaks
3. Slowly turn the **STEREO** knob from center to fully clockwise
4. Listen for formant-like sounds as the two filter cores separate in frequency. The dual peaks create vowel-like timbres
5. Sweep CUTOFF while in SPREAD mode -- the formant character shifts as both peaks move together
6. Find a STEREO position that creates an "ah" or "ee" vowel quality. Document the CUTOFF and STEREO positions

### Exercise 4: Quad Acid (5 min)

<div data-ikarie-panel
  data-highlights="knob-ikarie-cutoff:amber,jack-ikarie-l-out:blue,jack-ikarie-r-out:blue,jack-ikarie-beyond:blue"
  data-knobs="slider-ikarie-resonance:85,knob-ikarie-cutoff:30"
></div>

1. Patch both **L OUT** and **R OUT** and **BEYOND** to separate mixer channels
2. Set RESONANCE to about 2/3, SPREAD mode, STEREO at about 2 o'clock
3. Now slowly sweep CUTOFF from LP to HP. One knob turn produces up to 4 simultaneous resonant filter sweeps across the three outputs
4. This is Patch Tip 2 from the manual -- "Quad Acid." The two filter cores in SPREAD mode each contribute two peak movements
5. Experiment with different STEREO amounts to change the spacing between the four acid lines

## What You Learned

- RESONANCE adds emphasis at the cutoff frequency, from subtle to self-oscillating
- BEYOND output reveals the dual-peak character most dramatically at high resonance
- SPREAD mode with RESONANCE creates formant-like vowel sounds
- One CUTOFF sweep in SPREAD mode produces multiple simultaneous resonant sweeps

## Session Output

Document a resonant patch with these settings:
- CUTOFF position
- RESONANCE fader position
- STEREO knob position
- PAN/SPREAD mode
- Describe the character of the sound
