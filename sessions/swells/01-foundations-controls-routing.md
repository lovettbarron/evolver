---
title: 'Session 01: Foundations -- Controls, Routing & Your First Reverb'
session_number: 1
duration: 25
prerequisite: null
output_type: technique
difficulty: beginner
tags:
  - foundations
  - reverb
  - routing
  - faders
instrument: swells
instrument_type: eurorack_module
reference: 'Swells Manual'
section: Foundations
---

# Session 01: Foundations -- Controls, Routing & Your First Reverb

**Objective:** Set up Swells in its init state with the Fog algorithm, explore the 8 parameter faders systematically, and understand stereo routing.

> [!tip] If you only have 5 minutes
> Patch any audio source to IN L. Patch L output to your mixer. Select the Fog algorithm. Set MIX to 50%. Sweep the DECAY fader from bottom to top -- listen to the reverb tail grow from nothing to infinite wash. That is the core interaction.

## Warm-Up (2 min)

This is your first Swells session -- no warm-up needed. Look at the front panel. Notice the 8 tall faders in the center (these are your main reverb controls), the level faders and knobs on the left, the performance buttons, and the row of jacks at the bottom.

## Setup

1. Set all controls to the **Basic Patch** init state (see [Swells Overview](/modules/swells/))
2. Patch an audio source (oscillator, sample player, or instrument output) to **IN L**
3. Patch **L** output to your mixer or monitors
4. Select the **Fog** algorithm (first algorithm -- use MODEL UP/DOWN buttons)
5. Make sure LO-FI is **OFF** and EF SOURCE is **IN**

## Exercises

### Exercise 1: Meet the Faders (8 min)

<div data-swells-panel
  data-highlights="slider-swells-pre-delay:amber,slider-swells-size:amber,slider-swells-decay:amber,slider-swells-hi-damp:amber,slider-swells-lo-damp:amber,slider-swells-eq:amber"
></div>

1. With audio playing, slowly sweep **DECAY** from minimum to maximum. Listen to the tail grow from dry to infinite wash
2. Return DECAY to noon. Now sweep **SIZE** -- notice how the space changes from small room to vast hall
3. Sweep **PRE-DELAY** -- hear the gap between the dry signal and reverb onset grow
4. Sweep **HI DAMP** -- at maximum, the reverb becomes dark and muffled. At minimum, it stays bright
5. Sweep **LO DAMP** -- this thins out the low end of the reverb. Useful for keeping the mix clear
6. Sweep **EQ** -- notice the overall tonal shift of the reverb

> [!info] The first 6 faders (PRE-DELAY through EQ) behave the same across all 9 algorithms. EBB and FLOW change behavior depending on which algorithm is active.

### Exercise 2: EBB and FLOW with Fog (5 min)

<div data-swells-panel
  data-highlights="slider-swells-ebb:blue,slider-swells-flow:blue"
></div>

1. With Fog selected and a medium DECAY, sweep **EBB** from minimum to maximum. Listen for how it affects the Fog algorithm's diffusion character
2. Return EBB to noon. Now sweep **FLOW** -- listen for the movement and modulation it adds
3. Try EBB and FLOW at extreme positions together -- full EBB + full FLOW, then minimum EBB + maximum FLOW

### Exercise 3: Level Controls and Routing (5 min)

<div data-swells-panel
  data-highlights="slider-swells-input:amber,slider-swells-mix:amber,knob-swells-drive:blue,knob-swells-trim:blue"
></div>

1. Sweep the **INPUT** fader -- this controls how hot the signal hits the reverb engine. Too high may cause distortion (which can be musical)
2. Sweep **MIX** from fully dry (CCW) to fully wet (CW). At fully wet, you hear only the reverb -- useful for send/return configurations
3. Turn up **DRIVE** gradually -- notice the saturation it adds to the input stage. This colors the reverb in a distinctive way
4. Adjust **TRIM** to balance the overall output level

### Exercise 4: Stereo Routing (5 min)

<div data-swells-panel
  data-highlights="jack-swells-in-l:amber,jack-swells-in-r:amber,jack-swells-out-l:blue,jack-swells-out-r:blue"
></div>

1. With only **IN L** patched, listen to both **L** and **R** outputs. Swells produces a stereo reverb even from a mono input
2. If you have a stereo source, patch both **IN L** and **IN R**. Notice how the stereo image of the reverb changes
3. Try patching a different source to **IN L** and **IN R** -- Swells will process them as a stereo pair

## What You Learned

- The 8 parameter faders and what each one controls
- How INPUT, MIX, DRIVE, and TRIM shape the overall signal
- Mono-in/stereo-out routing behavior
- The Fog algorithm's basic character

## Document Your Results

Note your first impressions of the Fog algorithm. Which fader positions created your favorite reverb character? Write down the fader positions (approximate clock positions) for a setting you liked.
