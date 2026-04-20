---
title: 'Session 03: Envelope Follower as Modulation Source'
session_number: 3
duration: 25
prerequisite: 01-foundations-filter-modes-stereo
output_type: patch
difficulty: intermediate
tags:
  - modulation
  - envelope-follower
  - follow
  - dynamics
instrument: ikarie
instrument_type: eurorack_module
reference: 'Ikarie Manual pp. 3-4'
section: Modulation
cross_references:
  - ref: 'swells/06-freeze-reverse-performance'
    reason: 'Feed Ikarie filtered output into Swells freeze for spectral snapshots'
---

# Session 03: Envelope Follower as Modulation Source

**Objective:** Deep dive into the FOLLOW output and MOD attenuverter -- use the envelope follower as an internal and external modulation source, and explore what happens when you break the normalling.

> [!tip] If you only have 5 minutes
> Set init state, turn MOD to 2 o'clock, play rhythmic audio. Hear the auto-wah. Now patch a cable from FOLLOW to an external VCA CV input -- you just created a dynamics-responsive level controller. Remove the cable from MOD input to restore the normalling.

## Warm-Up (2 min)

From init state, play audio into Ikarie. Turn MOD clockwise past noon and listen to the auto-wah. Switch FOLLOW SPEED through all three positions -- recall from Session 01 how each speed feels.

## Setup

1. Set all Ikarie controls to the Basic Patch init state
2. Patch a rhythmic audio source (drum machine, sequenced synth, or any dynamic material) to **L IN**
3. Patch **L OUT** to mixer
4. Have a second module ready to receive CV (VCA, another filter, or oscillator pitch input)

## Exercises

### Exercise 1: FOLLOW Output on an Oscilloscope (5 min)

<div data-ikarie-panel
  data-highlights="jack-ikarie-follow:amber,switch-ikarie-follow-speed:blue"
></div>

1. Patch **FOLLOW** output to an oscilloscope, visual CV monitor, or a module with LED indication
2. Play audio into Ikarie and watch the FOLLOW output -- it traces the amplitude envelope of your input
3. Switch FOLLOW SPEED to **SLOW** -- the CV rises and falls sluggishly, smoothing out transients
4. Switch to **MID** -- tighter tracking, individual hits are visible
5. Switch to **FAST** -- the CV follows every wavecycle, almost like rectification. On rhythmic material, you see a jagged, detailed envelope
6. Note: FOLLOW output is always active regardless of what is patched to MOD input

### Exercise 2: Breaking the Normalling (5 min)

<div data-ikarie-panel
  data-highlights="jack-ikarie-mod-in:amber,knob-ikarie-mod:amber"
  data-knobs="knob-ikarie-mod:90"
></div>

1. With MOD at about 2 o'clock, confirm you hear the auto-wah effect
2. Now patch an **external CV source** (LFO, envelope, or even a static voltage) to the **MOD** input jack
3. The auto-wah stops immediately -- patching a cable to MOD breaks the FOLLOW normalling
4. The MOD attenuverter now controls the depth and polarity of your external CV source instead
5. Remove the cable from MOD -- the auto-wah returns. This is how normalling works: the internal connection exists only when nothing is plugged in
6. Understanding this gives you two distinct modes of operation from the same circuit

### Exercise 3: FOLLOW as External Modulation (8 min)

<div data-ikarie-panel
  data-highlights="jack-ikarie-follow:amber"
></div>

1. Patch **FOLLOW** output to an external destination -- try these:
   - **VCA CV input** on another module: creates dynamics-responsive level control (like a compressor/expander)
   - **Another filter's cutoff CV**: the second filter opens when Ikarie's input is loud
   - **Oscillator pitch CV**: pitch bends in response to input dynamics
2. The FOLLOW output can be patched to multiple destinations using a mult or stackable
3. Note that patching FOLLOW to an external destination does NOT break the MOD normalling -- FOLLOW is an output, not an input. You get both the auto-wah AND external modulation simultaneously
4. Set FOLLOW SPEED to match the character you want at the external destination

### Exercise 4: Inverted Envelope Follower (5 min)

<div data-ikarie-panel
  data-knobs="knob-ikarie-mod:20"
  data-highlights="knob-ikarie-mod:amber"
></div>

1. Remove any external cables from MOD input (restore normalling)
2. Turn **MOD** counterclockwise past noon (about 8 o'clock)
3. Play rhythmic audio -- the modulation is now inverted. Loud transients close the filter instead of opening it
4. This creates a ducking effect: the filter darkens on hits and opens during quiet moments
5. Try this with FOLLOW SPEED at SLOW for a pumping, sidechain-like effect
6. Compare: MOD at 2 o'clock (positive, auto-wah) vs MOD at 8 o'clock (inverted, ducking). Same circuit, opposite character

## What You Learned

- FOLLOW output is always active and provides amplitude-tracking CV
- Patching a cable to MOD input breaks the FOLLOW normalling
- Patching FOLLOW to external destinations does NOT break the normalling
- The MOD attenuverter controls depth and polarity of whatever modulates cutoff
- Inverted modulation (MOD CCW) creates ducking/sidechain-like effects

## Session Output

Document a dynamics-responsive patch:
- What is the audio source?
- Where did you patch FOLLOW output?
- MOD attenuverter position and polarity
- FOLLOW SPEED setting
- Describe the musical effect
