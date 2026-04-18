---
title: 'Session 06: Harmonic Oscillator & Inharmonic String'
session_number: 6
duration: 25
prerequisite: 5
output_type: patch
difficulty: intermediate
tags:
  - mode-pairs
  - harmonic
  - inharmonic
  - string-modeling
  - additive
  - bank-1-model-5
  - bank-2-model-4
instrument: plaits
instrument_type: eurorack_module
reference: 'Plaits Manual pp. 8, 10'
section: Mode Pairs
---

# Session 06: Harmonic Oscillator & Inharmonic String

**Objective:** Contrast the harmonic oscillator (Bank 1 Model 5) -- an additive synthesis model with perfectly tuned harmonics -- against the inharmonic string model (Bank 2 Model 4) -- physical modeling with detuned, metallic overtones.

> [!tip] If you only have 5 minutes
> Set init state. Select Bank 1 Model 5 (harmonic oscillator). Sweep HARMONICS slowly -- you are selecting how many sine harmonics are present, from one (pure sine) to a dense sawtooth-like spectrum. This is additive synthesis controlled by a single knob.

## Warm-Up (2 min)

Set init state. Briefly visit Bank 2 Model 8 (speech) from last session and trigger a few words to reconnect. Then select Bank 1 Model 5 (harmonic oscillator -- fifth LED in left column).

## Setup

1. Set all controls to init state
2. Patch V/OCT to **V/OCT**, OUT to mixer
3. Select Bank 1 Model 5 (fifth LED in left column)

## Exercises

### Exercise 1: Harmonic Oscillator -- Additive Synthesis (8 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:40,knob-plaits-timbre:64,knob-plaits-morph:64"
  data-highlights="knob-plaits-harmonics:amber,knob-plaits-timbre:blue,knob-plaits-morph:blue"
></div>

1. With Bank 1 Model 5 selected, set HARMONICS low. You should hear a relatively simple tone with few harmonics
2. Sweep **HARMONICS** clockwise: you are adding more sine harmonics to the spectrum -- from a pure sine through hollow square-wave-like spectra to dense, bright sawtooth-like tones. This is the number of "bumps" in the spectrum
3. Sweep **TIMBRE**: this selects which harmonic is most prominent (the index of the peak). Low TIMBRE emphasizes the fundamental; high TIMBRE emphasizes upper partials
4. Sweep **MORPH**: this controls the shape of each harmonic bump -- from flat and wide (smooth blend) to peaked and narrow (individual harmonics stand out clearly)
5. AUX carries a variant that includes only a subset of harmonics, like the drawbars of a Hammond organ. Compare OUT and AUX side by side

### Exercise 2: Inharmonic String Modeling (8 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:64,knob-plaits-timbre:64,knob-plaits-morph:64"
  data-highlights="knob-plaits-harmonics:amber,knob-plaits-timbre:blue,knob-plaits-morph:blue,jack-plaits-trig:amber"
></div>

1. Switch to Bank 2 Model 4 (press MODEL 2 four times -- fourth LED in right column). Patch a gate source to **TRIG** -- this model benefits from being triggered, as the Bank 2 models use their own decay envelope
2. Send triggers and listen: you should hear metallic, bell-like or string-like tones with overtones that are not perfectly harmonic
3. Sweep **HARMONICS**: this controls the amount of inharmonicity -- how far the overtones deviate from perfect harmonic ratios. Low = nearly harmonic (string-like). High = very inharmonic (metallic, bell-like, gamelan)
4. Sweep **TIMBRE**: this controls excitation brightness and dust density. Higher values produce brighter, sharper attacks
5. Sweep **MORPH**: this controls decay time (energy absorption). Short = plucked. Long = sustained, ringing

### Exercise 3: Harmonic vs Inharmonic Contrast (5 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:80"
  data-highlights="knob-plaits-harmonics:amber"
></div>

1. On the harmonic oscillator (Bank 1 Model 5), set HARMONICS high (many harmonics) and play a chord or melody. The tone is bright but perfectly tuned -- every overtone is an integer multiple of the fundamental
2. Switch to the inharmonic string (Bank 2 Model 4) with the same high HARMONICS. Send triggers -- the tone is similarly complex but with a metallic, shimmering quality because the overtones are detuned from harmonic ratios
3. This is the fundamental difference: harmonic spectra sound musical and blended. Inharmonic spectra sound physical and metallic -- like the difference between a flute and a bell

## Session Output

Document in your Obsidian daily note:

- **Harmonic organ patch:** Note HARMONICS/TIMBRE/MORPH positions that produced a convincing organ-like tone (hint: use AUX output)
- **Metallic bell:** Note HARMONICS/MORPH positions on the inharmonic string that created the best bell sound
- **Harmonic vs inharmonic:** Describe the timbral difference you heard in your own words

## What's Next

In the next session, you will explore the wavetable oscillator (Bank 1 Model 6) and modal resonator (Bank 2 Model 5) -- both use lookup/model-based synthesis to create tones that evolve as you sweep through their parameter space.
