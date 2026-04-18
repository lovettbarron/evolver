---
title: 'Session 01: Foundations -- Controls, Buffer & Quality Settings'
session_number: 1
duration: 25
prerequisite: null
output_type: technique
difficulty: beginner
tags:
  - foundations
  - controls
  - buffer
  - quality
instrument: beads
instrument_type: eurorack_module
reference: 'Beads Manual pp. 4-8'
section: Foundations
---

# Session 01: Foundations -- Controls, Buffer & Quality Settings

**Objective:** Learn the Beads control layout, hear how the four quality modes change the buffer character, and explore the three primary grain parameters (DENSITY, TIME, SIZE) and FREEZE.

> [!tip] If you only have 5 minutes
> Set Beads to the init state. Patch audio to IN L, OUT L to mixer. Turn DENSITY slightly clockwise from noon. You should hear granular texture. Press QUALITY a few times and listen to the lo-fi degradation. Press FREEZE to snapshot the buffer. That is the core of Beads.

## Warm-Up (2 min)

This is your first Beads session -- no warm-up needed. Look at the module's front panel. The top row has the FREEZE and SEED buttons flanking the large DENSITY knob. Below that are TIME, PITCH, SIZE, and SHAPE. The bottom row has four small attenurandomizer knobs, the mixing controls (FEEDBACK, DRY/WET, REVERB), and the jacks.

## Setup

1. Set all Beads controls to the Basic Patch init state (see [Beads Overview](/modules/beads/))
2. Patch a continuous audio source (oscillator, synth pad, or audio playback) to **IN L**
3. Patch **OUT L** to your mixer or audio interface
4. Set **DENSITY** to 12 o'clock (noon) -- no grains yet
5. Set **DRY/WET** to 3 o'clock (mostly wet)

## Exercises

### Exercise 1: First Grains (5 min)

<div data-beads-panel
  data-knobs="knob-beads-density:80,knob-beads-time:64,knob-beads-size:64"
  data-highlights="knob-beads-density:amber"
></div>

1. Slowly turn **DENSITY** clockwise from noon -- grains begin to appear. At first you hear occasional fragments of your input, then increasingly dense texture
2. Turn DENSITY to about 2 o'clock -- the grains overlap and create a shimmering cloud
3. Turn DENSITY fully clockwise -- maximum grain rate, very dense texture
4. Now turn DENSITY counterclockwise from noon -- constant rate grains at decreasing intervals
5. Return DENSITY to about 1 o'clock for a moderate grain rate

### Exercise 2: Quality Modes (5 min)

<div data-beads-panel
  data-highlights="button-beads-quality:amber,led-beads-input-level:blue"
></div>

1. Press **QUALITY** once -- note the LED color change. Listen to the audio character
2. Press again -- second mode (cold digital, 32kHz/12-bit). The sound becomes grittier, and the buffer is now longer
3. Press again -- third mode (sunny tape, 24kHz). Warm, slightly lo-fi character. The dry signal runs at full 48kHz while the grains are at reduced quality
4. Press again -- fourth mode (scorched cassette, 24kHz/8-bit). Heavy degradation with wow and flutter artifacts. Maximum buffer length (32s mono)
5. Press once more to return to the first mode (bright, 48kHz/16-bit)
6. Pick the quality mode you find most musically interesting and note it

### Exercise 3: Time, Size, and Density Interaction (8 min)

<div data-beads-panel
  data-knobs="knob-beads-density:80,knob-beads-time:64,knob-beads-size:64"
  data-highlights="knob-beads-time:amber,knob-beads-size:blue,knob-beads-density:amber"
></div>

1. With DENSITY at 1 o'clock, slowly sweep **TIME** from fully CCW to fully CW -- you are scanning through the buffer from most recent audio to oldest. Notice how the grain content changes as you move through the buffer
2. Return TIME to noon. Now sweep **SIZE** from fully CCW (tiny 30ms grains -- clicky, percussive) to about 3 o'clock (long 2-4s grains -- smooth, ambient)
3. With SIZE at a small value (9 o'clock), increase DENSITY to maximum -- rapid-fire micro-grains create a buzzing texture
4. With SIZE at a large value (3 o'clock), reduce DENSITY to just past noon -- sparse, overlapping long grains create a pad-like wash

### Exercise 4: Freeze (3 min)

<div data-beads-panel
  data-highlights="button-beads-freeze:amber,jack-beads-freeze-gate:blue"
></div>

1. With grains playing, press **FREEZE** -- the LED illuminates and the buffer stops recording. The current buffer content is locked
2. Sweep TIME to scan through the frozen buffer -- you are now playing back a fixed audio snapshot as grains
3. Change SIZE and DENSITY while frozen -- the texture changes but the source material stays the same
4. Press FREEZE again to release -- the buffer resumes recording live audio

### Exercise 5: Grain Generation Modes (2 min)

<div data-beads-panel
  data-highlights="button-beads-seed:amber"
></div>

1. Note the current mode -- **Latched** (SEED LED pulsing slowly). This is the default: continuous grain generation
2. Short-press **SEED** to switch to **Gated** mode (SEED LED off). Now grains only play when you hold the SEED button or send a gate to the SEED input
3. Hold SEED and listen -- grains play while held. Release and they stop
4. To return to Latched mode, hold SEED for 4 seconds (or press FREEZE while holding SEED)

> [!info] The third mode -- **Clocked** -- activates automatically when you patch an external clock to the SEED input jack. We will explore this in Session 04.

## Session Output

Document the following in your Obsidian daily note:

- **Preferred quality mode:** Which of the 4 settings did you like best and why?
- **Density sweet spot:** What DENSITY position gave you the most musical texture?
- **Time sweep character:** How did scanning TIME change the grain content?
- **Freeze impression:** What happened when you froze and then manipulated the frozen buffer?

## What's Next

In Session 02, you will focus on granular mode in depth -- using TIME for time-stretching, PITCH for pitch-shifting, and SHAPE for envelope character to create specific granular textures from a simple audio source.
