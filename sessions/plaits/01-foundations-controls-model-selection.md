---
title: 'Session 01: Controls, Model Selection & Internal Voice'
session_number: 1
duration: 25
prerequisite: null
output_type: technique
difficulty: beginner
tags:
  - foundations
  - model-selection
  - internal-lpg
  - controls-overview
instrument: plaits
instrument_type: eurorack_module
reference: 'Plaits Manual pp. 3-6'
section: Foundations
---

# Session 01: Controls, Model Selection & Internal Voice

**Objective:** Learn the Plaits panel layout, cycle through Bank 1 models, explore the main tone controls, and discover the built-in LPG and internal envelope behavior.

> [!tip] If you only have 5 minutes
> Set Plaits to init state. Patch V/OCT + OUT. Press the MODEL 1 button repeatedly and listen to each of the 8 Bank 1 models change character. Sweep HARMONICS on model 1 -- you will hear two oscillators detune against each other. That is the core concept: one module, sixteen instruments.

## Warm-Up (2 min)

This is your first Plaits session -- no warm-up needed. Look at the front panel. At the top are two model selection buttons with LED columns. Below them sit the two large knobs (FREQUENCY and HARMONICS). In the middle row are TIMBRE and MORPH. Below those are three small attenuverter knobs. The bottom half has all the jacks: CV inputs on top, audio outputs at the bottom.

## Setup

1. Set all Plaits controls to the Basic Patch init state (see [Plaits Overview](/modules/plaits/))
2. Patch V/OCT from a keyboard, sequencer, or pitch CV source to **V/OCT**
3. Patch **OUT** to a mixer, audio interface, or headphone amp
4. Make sure no other cables are patched to Plaits

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:64,knob-plaits-timbre:64,knob-plaits-morph:64"
  data-highlights="jack-plaits-v-oct:blue,jack-plaits-out:amber"
></div>

## Exercises

### Exercise 1: Meet Bank 1 (8 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:64"
  data-highlights="button-plaits-model-1:amber,knob-plaits-harmonics:blue"
></div>

1. With Model 1 selected (top LED in left column), play a few notes. You should hear a pair of classic waveforms -- virtual analog synthesis
2. Press **MODEL 1** once. The second LED lights up -- this is the waveshaping oscillator. Play some notes and listen to the difference
3. Continue pressing MODEL 1 to cycle through all 8 models. Spend about 30 seconds on each, playing a few notes. Notice how radically different each model sounds even with the same knob positions
4. Return to Model 1 (press until the top LED lights up again)

### Exercise 2: Explore HARMONICS and TIMBRE (7 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:64,knob-plaits-timbre:64"
  data-highlights="knob-plaits-harmonics:amber,knob-plaits-timbre:blue"
></div>

1. On Model 1 (VA oscillator pair), slowly sweep **HARMONICS** from fully CCW to fully CW. You are detuning the two oscillators against each other -- from unison to wide intervals
2. Return HARMONICS to noon. Now sweep **TIMBRE** from fully CCW to fully CW. You are changing the waveform shape -- from a narrow pulse to a full square to hardsync formants
3. Now sweep **MORPH**. On this model it changes from triangle to saw with an increasingly wide notch (Braids' CSAW)
4. Switch to Model 3 (Two-operator FM) and repeat the sweeps. Notice how HARMONICS now controls frequency ratio, TIMBRE controls modulation index, and MORPH controls feedback. Same knobs, completely different behavior

### Exercise 3: Internal LPG and Envelope (8 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:64,knob-plaits-timbre-attenuverter:90"
  data-highlights="jack-plaits-trig:amber,knob-plaits-timbre-attenuverter:blue"
></div>

1. Patch a gate or trigger source to **TRIG**. You should hear Plaits produce a plucked or struck sound -- the internal envelope is now controlling the LPG, giving each note an amplitude and brightness contour
2. With TRIG patched and no CV cables in the TIMBRE/FM/MORPH jacks, turn the **TIMBRE ATT** knob clockwise past noon. Send a trigger -- notice how TIMBRE now moves with each trigger. The attenuverter is controlling how much the internal envelope modulates TIMBRE
3. This is the dual-function attenuverter behavior: when the corresponding CV input is unpatched and TRIG is patched, the attenuverter sets internal envelope modulation depth. If you unplug a CV cable and forget to reset the attenuverter to noon, the internal envelope will take over
4. Try the same with MORPH ATT and FM ATT -- each one lets the internal envelope modulate its parameter
5. Return all three attenuverters to 12 o'clock (noon) and remove the TRIG cable

## Session Output

Document the following in your Obsidian daily note:

- **Three favorite Bank 1 models:** Which three models caught your ear? Note their LED position (1-8) and a one-word description of each
- **HARMONICS on Model 1 vs Model 3:** How did the same knob produce different results?
- **Internal envelope discovery:** When you patched TRIG and turned an attenuverter, what happened to the sound?

## What's Next

In the next session, you will do a focused comparison of two models side by side: the classic VA waveforms (Bank 1, Model 1) and filtered noise (Bank 2, Model 2). You will learn how the same controls produce both tonal and textural results.
