---
title: 'Session 02: Granular Mode -- Time-Stretching & Pitch-Shifting'
session_number: 2
duration: 20
prerequisite: 1
output_type: recording
difficulty: beginner
tags:
  - granular
  - time-stretch
  - pitch-shift
  - latched
instrument: beads
instrument_type: eurorack_module
reference: 'Beads Manual pp. 8-10'
section: Grain Modes
cross_references:
  - ref: 'swells/06-freeze-reverse-performance'
    reason: 'Chain Beads granular output into Swells reverb for deep ambient layers'
---

# Session 02: Granular Mode -- Time-Stretching & Pitch-Shifting

**Objective:** Use latched grain generation to create time-stretched and pitch-shifted textures from a simple audio source, exploring how TIME, PITCH, SIZE, and SHAPE interact.

> [!tip] If you only have 5 minutes
> Set init state, patch audio to IN L. Set DENSITY to 1 o'clock for moderate grains. Turn TIME fully CCW (most recent audio). Set PITCH to 2 o'clock (+12 semitones). You are hearing the input pitched up one octave in granular fragments. That is granular pitch-shifting.

## Warm-Up (2 min)

Set Beads to the init state. Patch audio and set DENSITY to about 1 o'clock to hear grains. Confirm you are in Latched mode (SEED LED pulsing). Sweep TIME briefly to confirm you are reading from the buffer. Return TIME to noon.

## Exercises

### Exercise 1: Time-Stretching (6 min)

<div data-beads-panel
  data-knobs="knob-beads-density:90,knob-beads-time:20,knob-beads-size:80"
  data-highlights="knob-beads-time:amber,knob-beads-size:blue"
></div>

1. Set **SIZE** to about 2 o'clock (long grains, ~1-2s)
2. Set **DENSITY** to about 2 o'clock (dense overlapping grains)
3. Set **TIME** fully counterclockwise -- grains play from the most recent part of the buffer. The texture follows the input closely, like a slightly blurred echo
4. Slowly turn **TIME** clockwise -- the grains now read from progressively older audio. With a changing input, this creates a time-stretched effect: the source material slows down and stretches
5. Try feeding a rhythmic source (drums, arpeggio). With TIME set to a fixed position and high DENSITY + large SIZE, the rhythm smears into a continuous wash -- this is granular time-stretching
6. Reduce SIZE to 10 o'clock while keeping high DENSITY -- the same time-stretch becomes more grainy and articulated

### Exercise 2: Pitch-Shifting (5 min)

<div data-beads-panel
  data-knobs="knob-beads-pitch:90,knob-beads-density:80"
  data-highlights="knob-beads-pitch:amber"
></div>

1. Return SIZE to noon and TIME to noon
2. Slowly turn **PITCH** clockwise from noon -- each virtual notch is a semitone. At about 1 o'clock you are up roughly an octave (+12 semitones)
3. Listen to how the grains carry the pitch shift -- each grain plays back at the transposed pitch independently
4. Turn PITCH counterclockwise from noon -- now the grains are pitched down. Fully CCW is -24 semitones (two octaves down)
5. Set PITCH to +7 semitones (a perfect fifth up) and increase DENSITY -- you get a harmonized granular cloud that adds a fifth above the input
6. Return PITCH to noon

### Exercise 3: Shape and Envelope Character (4 min)

<div data-beads-panel
  data-knobs="knob-beads-shape:30,knob-beads-size:50"
  data-highlights="knob-beads-shape:amber"
></div>

1. Set SIZE to about 11 o'clock (short-medium grains) and DENSITY to 1 o'clock
2. Turn **SHAPE** fully counterclockwise -- grains have a rectangular envelope. The onset is clicky and percussive
3. Turn SHAPE to noon -- smooth bell-curve envelope. Grains fade in and out gently
4. Turn SHAPE fully clockwise -- reversed envelope with slow attack. Grains swell in and cut off, creating a breathing, backwards quality
5. Find a SHAPE position that sounds good with your current source and leave it there

### Exercise 4: Combined Texture (3 min)

<div data-beads-panel
  data-knobs="knob-beads-density:100,knob-beads-time:40,knob-beads-pitch:80,knob-beads-size:85,knob-beads-shape:90"
  data-highlights="knob-beads-density:blue,knob-beads-time:amber,knob-beads-pitch:amber,knob-beads-size:blue"
></div>

1. Set a combination: high DENSITY, TIME reading from recent audio, PITCH up a few semitones, large SIZE, SHAPE slightly clockwise
2. Listen to the composite texture -- this is the granular synthesis sweet spot where time-stretching and pitch-shifting combine
3. Record a 30-second clip of this texture for your session output
4. While recording, slowly sweep TIME to add movement to the texture

## Session Output

Document the following in your Obsidian daily note:

- **Time-stretch observation:** How did changing TIME position affect the rhythmic character of the source?
- **Pitch-shift sweet spot:** Which interval (semitones up or down) sounded most musical?
- **Shape preference:** Which envelope shape worked best for your source material?
- **Recording:** Save a 30-second clip of your combined granular texture

## What's Next

In Session 03, you will discover Beads' delay mode -- what happens when SIZE is turned fully clockwise to create one infinite grain that transforms Beads into a delay and beat slicer.
