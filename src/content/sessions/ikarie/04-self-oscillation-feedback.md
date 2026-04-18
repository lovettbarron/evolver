---
title: 'Session 04: Self-Oscillation & Feedback'
session_number: 4
duration: 20
prerequisite: 02-dual-peak-resonance
output_type: patch
difficulty: advanced
tags:
  - self-oscillation
  - feedback
  - pinging
  - advanced
instrument: ikarie
instrument_type: eurorack_module
reference: 'Ikarie Manual Patch Tips 4-5, 8'
section: Advanced
---

# Session 04: Self-Oscillation & Feedback

**Objective:** Push Ikarie into self-oscillation for sine-like tones, use V/OCT for pitch tracking, explore filter pinging for percussive sounds, and chain outputs for aggressive 24dB filtering.

> [!tip] If you only have 5 minutes
> Set INPUT to minimum, RESONANCE to maximum. Ikarie self-oscillates as a sine tone. Patch V/OCT from a keyboard or sequencer. You now have a playable sine oscillator from a filter module.

## Warm-Up (2 min)

From init state, sweep RESONANCE from minimum to about 3/4 while CUTOFF is at noon. Recall from Session 02 how the resonant peak builds. Today we push past that point into self-oscillation.

## Setup

1. Set all Ikarie controls to the Basic Patch init state
2. Patch **L OUT** to mixer
3. Have a 1V/oct pitch CV source ready (keyboard, sequencer, or precision voltage source)
4. Have a trigger/gate source ready (clock, button, or sequencer gate)
5. **Remove audio input from L IN** -- we start this session with no input signal

## Exercises

### Exercise 1: Self-Oscillation (5 min)

<div data-ikarie-panel
  data-knobs="knob-ikarie-input:0,slider-ikarie-resonance:127,knob-ikarie-cutoff:64"
  data-highlights="slider-ikarie-resonance:amber,knob-ikarie-input:blue"
></div>

1. Turn **INPUT** fully counterclockwise (0x gain -- no input)
2. Push **RESONANCE** fader to maximum
3. Listen -- Ikarie is now self-oscillating, producing a sine-ish tone. The pitch is determined by the CUTOFF position
4. Sweep CUTOFF slowly and hear the pitch change smoothly from low to high
5. The tone is not a pure sine -- Ikarie's dual-peak architecture adds subtle harmonics that make it warmer than a typical self-oscillating filter

### Exercise 2: V/OCT Pitch Tracking (5 min)

<div data-ikarie-panel
  data-highlights="jack-ikarie-v-oct:amber,knob-ikarie-cutoff:blue"
  data-knobs="slider-ikarie-resonance:127,knob-ikarie-input:0"
></div>

1. With Ikarie still self-oscillating (INPUT at min, RESONANCE at max)
2. Patch a **V/OCT** source (keyboard CV, sequencer) to the **V/OCT** input
3. Play notes -- Ikarie tracks pitch at 1V/octave. Adjust CUTOFF to set the base octave
4. Play a simple melody. The tracking may not be perfectly precise across many octaves, but within 2-3 octaves it is musically useful
5. This is Patch Tip 5 from the manual: a filter module becomes a playable oscillator

### Exercise 3: Pinging the Filter (5 min)

<div data-ikarie-panel
  data-highlights="jack-ikarie-l-in:amber,knob-ikarie-input:amber,slider-ikarie-resonance:blue"
  data-knobs="slider-ikarie-resonance:100,knob-ikarie-input:100"
></div>

1. Reduce RESONANCE slightly from maximum (about 3/4)
2. Turn INPUT up to about 3 o'clock
3. Patch a **trigger or short gate** source to **L IN** (not a sustained audio signal -- short impulses)
4. Each trigger "pings" the resonant filter, producing a decaying percussive tone. The pitch is set by CUTOFF
5. Adjust RESONANCE to change the decay time -- more resonance = longer ring, less = shorter thump
6. Patch V/OCT and sequence both triggers and pitch for melodic percussion
7. This is Patch Tip 4 from the manual: "Pinging & FM Pinging"

### Exercise 4: Aggressive 24dB Filtering (3 min)

<div data-ikarie-panel
  data-highlights="jack-ikarie-l-out:amber,jack-ikarie-r-in:amber"
  data-knobs="slider-ikarie-resonance:60,knob-ikarie-input:64"
  data-cables="jack-ikarie-l-out>jack-ikarie-r-in:audio"
></div>

1. Patch an audio source back to **L IN** with moderate INPUT gain
2. Reduce RESONANCE to about halfway
3. Patch **L OUT** into **R IN** -- you are now running the signal through both filter cores in series
4. Listen to **R OUT** -- the filter slope is now steeper (approximately 24dB/octave instead of 12dB)
5. Sweep CUTOFF and compare the steepness to the normal single-pass filtering
6. This is Patch Tip 8: "Aggressive 24dB Filtering" -- useful when you need a more dramatic filter effect

### Exercise 5: Post-Filter Ring Mod (2 min)

<div data-ikarie-panel
  data-highlights="jack-ikarie-beyond:amber,switch-ikarie-pan-spread:blue"
  data-knobs="slider-ikarie-resonance:80"
></div>

1. With audio patched in, set PAN/SPREAD to **PAN**
2. Set RESONANCE high (about 3/4)
3. Listen to **BEYOND** output while sweeping the STEREO knob
4. The combination of PAN mode and the BEYOND output creates ring-modulator-like metallic effects
5. This is Patch Tip 6 from the manual

## What You Learned

- Ikarie self-oscillates at maximum RESONANCE with INPUT at minimum
- V/OCT provides pitch tracking for the self-oscillating filter
- Short triggers into L IN "ping" the resonant filter for percussive tones
- Chaining L OUT to R IN creates aggressive 24dB/oct filtering
- BEYOND + PAN mode produces ring-mod-like effects

## Session Output

Document a self-oscillating patch:
- CUTOFF position (base pitch)
- V/OCT source
- Any additional modulation (FOLLOW, external CV)
- Describe the tone quality
