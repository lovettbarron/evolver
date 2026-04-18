---
title: 'Session 07: Wavetable & Modal Resonator'
session_number: 7
duration: 25
prerequisite: 6
output_type: patch
difficulty: advanced
tags:
  - mode-pairs
  - wavetable
  - modal-resonator
  - physical-modeling
  - bank-1-model-6
  - bank-2-model-5
instrument: plaits
instrument_type: eurorack_module
reference: 'Plaits Manual pp. 9, 10'
section: Mode Pairs
---

# Session 07: Wavetable & Modal Resonator

**Objective:** Explore the wavetable oscillator (Bank 1 Model 6) and modal resonator (Bank 2 Model 5) -- both use stored models or lookup tables to create tones, but wavetable scanning produces smooth timbral morphing while the modal resonator simulates physical struck/plucked objects.

> [!tip] If you only have 5 minutes
> Set init state. Select Bank 1 Model 6 (wavetable). Sweep TIMBRE slowly -- you are scanning through a row of 8 waveforms with smooth interpolation. Then sweep MORPH to move through the columns. You are navigating a 2D map of timbres. This is classic wavetable synthesis.

## Warm-Up (2 min)

Set init state. Briefly visit Bank 1 Model 5 (harmonic oscillator) and sweep HARMONICS to recall the additive synthesis concept. Then advance to Model 6 (wavetable).

## Setup

1. Set all controls to init state
2. Patch V/OCT to **V/OCT**, OUT to mixer
3. Select Bank 1 Model 6 (sixth LED in left column)

## Exercises

### Exercise 1: Wavetable Oscillator (8 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:64,knob-plaits-timbre:30,knob-plaits-morph:64"
  data-highlights="knob-plaits-harmonics:amber,knob-plaits-timbre:blue,knob-plaits-morph:blue"
></div>

1. With Bank 1 Model 6 selected, play a sustained note and sweep **TIMBRE** slowly from CCW to CW. You are scanning through a row of waveforms in a 4x8x8 wavetable bank. Within a row, waves are sorted by spectral brightness
2. Sweep **MORPH**: this moves through the columns of the wavetable -- different waveform families
3. Sweep **HARMONICS**: this selects the wavetable bank. The first 4 banks use interpolation between waveforms (smooth morphing). The next 4 banks play the same waveforms without interpolation (stepped, glitchy transitions)
4. Set HARMONICS to about 10 o'clock (interpolated bank). Hold a note and slowly sweep TIMBRE with one hand and MORPH with the other. You are navigating a 2D timbral space -- this is the classic wavetable synthesis experience
5. AUX carries a low-fi version of the output

### Exercise 2: Modal Resonator -- Mini-Rings (8 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:64,knob-plaits-timbre:64,knob-plaits-morph:64"
  data-highlights="knob-plaits-harmonics:amber,knob-plaits-timbre:blue,knob-plaits-morph:blue,jack-plaits-trig:amber"
></div>

1. Switch to Bank 2 Model 5 (press MODEL 2 five times -- fifth LED in right column). This is the modal resonator -- described in the manual as "a mini-Rings." Patch a gate source to **TRIG**
2. Send triggers. You should hear struck/plucked resonant tones -- like hitting a physical object
3. Sweep **HARMONICS**: this controls inharmonicity and material selection. Different positions simulate different materials -- from glass to wood to metal
4. Sweep **TIMBRE**: this controls excitation brightness and dust density. Low = dark, muffled strikes. High = bright, sharp attacks
5. Sweep **MORPH**: this controls decay time (energy absorption). Short decay = sharp percussive hits. Long decay = ringing, sustained resonance
6. AUX carries the raw exciter signal -- the "hammer" before it hits the resonator. Compare OUT (the resonated result) with AUX (the raw excitation)

### Exercise 3: Modulated Exploration (5 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-timbre:64,knob-plaits-timbre-attenuverter:90,knob-plaits-morph-attenuverter:90"
  data-highlights="knob-plaits-timbre-attenuverter:amber,knob-plaits-morph-attenuverter:blue,jack-plaits-trig:amber"
></div>

1. Stay on the modal resonator (Bank 2 Model 5) with TRIG patched
2. Turn **TIMBRE ATT** clockwise past noon (with no cable in TIMBRE CV). Each trigger now causes TIMBRE to be modulated by the internal envelope -- the brightness changes dynamically with each strike
3. Add **MORPH ATT** clockwise past noon too. Now each strike has evolving brightness AND evolving decay character
4. Experiment with different HARMONICS positions (different materials) while the internal envelope modulates TIMBRE and MORPH. Each material responds differently to the same modulation

## Session Output

Document in your Obsidian daily note:

- **Wavetable navigation:** Note the HARMONICS bank, TIMBRE row position, and MORPH column that produced your favorite evolving pad sound
- **Modal resonator material:** Note the HARMONICS position that produced the most convincing metallic bell vs wooden percussion
- **Modulated resonator:** How did the internal envelope modulation change the modal resonator's character?

## What's Next

In the final session, you will explore chords (Bank 1 Models 7-8) and analog drum models (Bank 2 Models 6-8) -- complete musical elements that turn Plaits into an instant instrument. You will create a short rhythmic composition combining both.
