---
title: 'Session 01: Foundations -- Filter Modes & Stereo Routing'
session_number: 1
duration: 25
prerequisite: null
output_type: technique
difficulty: beginner
tags:
  - foundations
  - filter-modes
  - stereo
  - follow-normalling
instrument: ikarie
instrument_type: eurorack_module
reference: 'Ikarie Manual pp. 1-5'
section: Foundations
---

# Session 01: Foundations -- Filter Modes & Stereo Routing

**Objective:** Understand Ikarie's filter sweep range, stereo modes, BEYOND output, and the critical FOLLOW-to-MOD normalling that gives this filter its auto-wah character.

> [!tip] If you only have 5 minutes
> Patch audio to L IN and L OUT to your mixer. Set init state. Before touching anything, play a rhythmic source and listen -- the filter is already subtly responding to your input dynamics. That is the FOLLOW-to-MOD normalling in action. Now sweep CUTOFF left and right. You have heard the full filter range and the auto-wah. That is the core concept.

## Warm-Up (2 min)

This is your first Ikarie session -- no warm-up needed. Look at the module's front panel. Notice the large CUTOFF knob at center, the RESONANCE fader on the right, and the row of jacks at the bottom. The BEYOND and FOLLOW output jacks are key to Ikarie's unique character.

## Setup

1. Set all Ikarie controls to the Basic Patch init state (see [Ikarie Overview](/modules/ikarie/))
2. Patch an audio source (oscillator, drum machine, or any sound) to **L IN**
3. Patch **L OUT** to your mixer or audio interface
4. Make sure no cables are patched to MOD input -- this preserves the FOLLOW normalling

## Exercises

### Exercise 1: The FOLLOW Normalling -- Auto-Wah Without Cables (5 min)

<div data-ikarie-panel
  data-highlights="jack-ikarie-follow:blue,jack-ikarie-mod-in:blue,knob-ikarie-mod:amber"
  data-knobs="knob-ikarie-cutoff:64,knob-ikarie-mod:64"
></div>

**Before touching anything**, play a rhythmic audio source into Ikarie. Listen carefully.

1. The filter is already responding to your input dynamics -- this is the **FOLLOW output normalled to MOD input**. The envelope follower tracks your input amplitude and automatically modulates the cutoff frequency
2. Turn **MOD** clockwise past noon -- the auto-wah effect becomes more pronounced. The filter opens wider on loud transients
3. Turn **MOD** counterclockwise past noon -- the modulation inverts. Loud transients now close the filter (a ducking effect)
4. Return MOD to noon. The normalling is still active but the modulation depth is zero at center

**Key concept:** Patching any cable to the MOD input jack breaks this normalling. For now, leave it unpatched.

### Exercise 2: Full Cutoff Sweep -- LP to HP (5 min)

<div data-ikarie-panel
  data-knobs="knob-ikarie-cutoff:0"
  data-highlights="knob-ikarie-cutoff:amber"
></div>

1. Turn **CUTOFF** fully counterclockwise -- this is low-pass mode. High frequencies are removed, the sound is dark and muffled
2. Slowly sweep CUTOFF clockwise through center and all the way to the right -- high-pass mode. Now low frequencies are removed, the sound is thin and bright
3. Find the center position -- the filter is fully open here, all frequencies pass through
4. Sweep back and forth several times. Notice how Ikarie's filter sweep feels compared to other filters you have used

### Exercise 3: PAN vs SPREAD Stereo Modes (8 min)

<div data-ikarie-panel
  data-knobs="knob-ikarie-stereo:64"
  data-highlights="switch-ikarie-pan-spread:amber,knob-ikarie-stereo:amber,jack-ikarie-r-out:blue"
></div>

1. Patch **R OUT** to a second mixer channel so you have stereo monitoring
2. Set the **PAN/SPREAD** switch to **PAN**
3. Turn the **STEREO** knob left and right -- the sound pans between L and R outputs. This is simple stereo panning controlled by a knob (or CV)
4. Now switch to **SPREAD** mode
5. Turn STEREO left and right again -- this time the two filter cores shift in opposite directions, creating a frequency spread. Listen for the dual-peak character as the two cutoff frequencies diverge
6. Try SPREAD mode with CUTOFF slightly off-center and the STEREO knob at different positions. The stereo image becomes wide and unusual

### Exercise 4: The BEYOND Output (4 min)

<div data-ikarie-panel
  data-highlights="jack-ikarie-beyond:amber,jack-ikarie-l-out:blue"
  data-knobs="knob-ikarie-cutoff:64,slider-ikarie-resonance:40"
></div>

1. Patch **BEYOND** to a third mixer channel (or replace R OUT temporarily)
2. Listen to BEYOND while sweeping CUTOFF -- this output provides the spectral difference between the two filter cores
3. Compare BEYOND to L OUT at the same cutoff position -- BEYOND has a band-pass/twin-peak character that L OUT does not
4. Increase **RESONANCE** slightly and listen to BEYOND again -- the twin-peak character becomes more pronounced

### Exercise 5: FOLLOW Speed Comparison (3 min)

<div data-ikarie-panel
  data-highlights="switch-ikarie-follow-speed:amber"
  data-knobs="knob-ikarie-mod:90"
></div>

1. Turn **MOD** clockwise to about 2 o'clock so the auto-wah is clearly audible
2. Set **FOLLOW SPEED** to **SLOW** -- the filter responds sluggishly, with a pumping, compressor-like character
3. Switch to **MID** -- tighter tracking, natural dynamics following
4. Switch to **FAST** -- the filter responds to every transient, almost like a full-wave rectifier. On rhythmic material, this creates a very animated filter effect
5. Choose the speed that sounds best with your current source material

## What You Learned

- Ikarie's CUTOFF sweeps from LP (CCW) through open (center) to HP (CW)
- The FOLLOW output is normalled to MOD input, creating auto-wah without any cables
- PAN mode provides stereo panning; SPREAD mode creates dual-peak frequency spread
- BEYOND output gives you the spectral difference between filter cores
- FOLLOW SPEED changes the envelope follower character from slow pumping to fast transient tracking

## Session Output

Document your impressions:
- Which FOLLOW SPEED setting did you prefer for your source material?
- How did BEYOND sound compared to the main L/R outputs?
- Did you notice the auto-wah effect before being told about it?
