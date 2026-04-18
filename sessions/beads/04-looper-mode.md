---
title: 'Session 04: Looper Mode -- Gated Grains & External Clock'
session_number: 4
duration: 25
prerequisite: 3
output_type: recording
difficulty: intermediate
tags:
  - clocked
  - gated
  - looper
  - rhythm
instrument: beads
instrument_type: eurorack_module
reference: 'Beads Manual pp. 11-12'
section: Grain Modes
---

# Session 04: Looper Mode -- Gated Grains & External Clock

**Objective:** Use Clocked and Gated grain generation modes to create rhythmically synchronized granular textures with external clock and manual triggering.

> [!tip] If you only have 5 minutes
> Set init state. Patch a clock to the SEED input jack. DENSITY at 1 o'clock. Grains now fire in sync with the clock. Turn DENSITY CCW for clock division (every 2nd, 4th, 8th pulse). That is clocked mode.

## Warm-Up (2 min)

Set Beads to init state. Confirm latched mode (SEED LED pulsing). Send a few grains by turning DENSITY past noon. Return to noon. Make sure SIZE is at noon (medium grains) and PITCH at noon (no transposition).

## Exercises

### Exercise 1: Gated Mode -- Manual Grain Triggering (5 min)

<div data-beads-panel
  data-knobs="knob-beads-density:64,knob-beads-size:50"
  data-highlights="button-beads-seed:amber,jack-beads-seed-gate:blue"
></div>

1. Short-press **SEED** to switch from Latched to **Gated** mode (SEED LED turns off)
2. Now press and hold SEED -- grains play only while the button is held. Release and they stop
3. With DENSITY at noon, each press produces a single grain. Tap SEED rhythmically to create a pattern of grain bursts
4. Turn DENSITY clockwise -- now each button press triggers multiple grains at an increasing rate. You can create rapid-fire bursts by holding SEED with high DENSITY
5. Patch a gate source (keyboard gate, sequencer gate, or LFO square wave) to the **SEED input jack** [4] -- now grains trigger on each gate high. This is useful for performance: gate on = grains, gate off = silence

### Exercise 2: Clocked Mode -- External Clock Sync (6 min)

<div data-beads-panel
  data-knobs="knob-beads-density:80"
  data-highlights="jack-beads-seed-gate:amber,jack-beads-density-cv:blue,knob-beads-density:amber"
></div>

1. Patch a **clock or sequence** into the SEED input jack [4]. If you were in Gated mode, Beads automatically switches to **Clocked** mode when it detects a regular clock signal
2. With the clock running, turn DENSITY to about 1 o'clock -- grains now trigger in sync with the clock. Each clock tick fires a grain
3. Turn DENSITY clockwise toward 3 o'clock -- the probability of triggering on each clock tick increases. At full CW, every clock tick triggers a grain
4. Turn DENSITY counterclockwise from noon -- now DENSITY acts as a clock divider. The grain triggers on every 2nd, 4th, 8th, or 16th clock pulse, creating rhythmic gaps
5. With a moderate clock rate (120 BPM / 8th notes), set DENSITY to create a pattern that triggers on every other beat -- listen to the rhythmic granular texture

### Exercise 3: Clock Division Patterns (5 min)

<div data-beads-panel
  data-knobs="knob-beads-density:40,knob-beads-time:50,knob-beads-pitch:70"
  data-highlights="knob-beads-density:amber,knob-beads-time:blue"
></div>

1. With clock patched, set DENSITY to about 10 o'clock (significant division -- sparse triggers)
2. Sweep TIME slowly -- each grain that fires reads from a different buffer position. With a changing input, this creates a sample-and-hold effect on the audio
3. Add slight PITCH offset (1-2 semitones up) -- each triggered grain is subtly pitch-shifted, creating a detuned rhythmic pattern
4. Change SIZE to very short (9 o'clock) -- the clocked grains become percussive hits rather than sustained fragments
5. Change SIZE to very long (3 o'clock) -- the clocked grains overlap and blend into each other despite the rhythmic triggering

### Exercise 4: Clock-Synced Granular Texture (5 min)

<div data-beads-panel
  data-knobs="knob-beads-density:90,knob-beads-size:70,knob-beads-shape:80,knob-beads-feedback:40"
  data-highlights="knob-beads-density:amber,knob-beads-feedback:blue"
></div>

1. Set DENSITY to about 2 o'clock (high probability)
2. Set SIZE to about 1 o'clock (medium-long grains)
3. Set SHAPE to about 1 o'clock (slightly reversed envelope)
4. Add slight FEEDBACK (10 o'clock) -- the rhythmic grain pattern feeds back on itself
5. This combination creates a clock-synced granular texture where grains fire rhythmically but the texture itself is smooth and evolving
6. Record a 30-second clip of this clock-synced texture

### Exercise 5: Return to Latched (2 min)

1. Unplug the clock from SEED input
2. Hold SEED for 4 seconds to return to **Latched** mode (SEED LED resumes pulsing)
3. Confirm continuous grain generation is restored

## Session Output

Document the following in your Obsidian daily note:

- **Gated mode:** How did manual SEED button control feel for performance?
- **Clocked mode:** What clock division felt most musical?
- **Clock + TIME sweep:** Describe the sample-and-hold-like effect
- **Best grain size for rhythmic use:** Short, medium, or long grains?
- **Recording:** Save your clock-synced granular texture clip

## What's Next

In Session 05, you will take a deep dive into the four attenurandomizers -- learning how they provide CV modulation control (clockwise from noon) and randomization (counterclockwise from noon) for TIME, SIZE, SHAPE, and PITCH.
