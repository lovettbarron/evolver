---
title: 'Session 02: Classic Waveforms & Filtered Noise'
session_number: 2
duration: 20
prerequisite: 1
output_type: patch
difficulty: beginner
tags:
  - mode-pairs
  - va-synthesis
  - filtered-noise
  - bank-1-model-1
  - bank-2-model-2
instrument: plaits
instrument_type: eurorack_module
reference: 'Plaits Manual pp. 7, 9'
section: Mode Pairs
---

# Session 02: Classic Waveforms & Filtered Noise

**Objective:** Compare Bank 1 Model 1 (virtual analog waveforms) with Bank 2 Model 2 (filtered noise), learning how the same HARMONICS/TIMBRE/MORPH controls produce tonal vs textural results.

> [!tip] If you only have 5 minutes
> Set init state. On Bank 1 Model 1, sweep HARMONICS to hear two oscillators detune. Then switch to Bank 2 Model 2 (filtered noise) and sweep HARMONICS -- it now sweeps the filter type from LP to BP to HP. Same knob, totally different sonic territory.

## Warm-Up (2 min)

From your last session, recall the three Bank 1 models you liked most. Set Plaits to init state and briefly cycle to one of those models -- play a few notes to reconnect with the module.

## Setup

1. Set all controls to init state
2. Patch V/OCT to **V/OCT**, OUT to mixer
3. Select Bank 1 Model 1 (top LED in left column)

## Exercises

### Exercise 1: VA Waveform Deep Dive (7 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:20,knob-plaits-timbre:64,knob-plaits-morph:64"
  data-highlights="knob-plaits-harmonics:amber,knob-plaits-timbre:blue,knob-plaits-morph:blue"
></div>

1. With Bank 1 Model 1 selected, set HARMONICS fully CCW. The two oscillators are in unison -- a strong, focused tone
2. Slowly turn HARMONICS clockwise. The detuning increases, producing chorus-like thickening, then wider intervals
3. Return HARMONICS to noon. Sweep TIMBRE: you hear the waveshape change from narrow pulse to full square to hardsync formants. A narrow pulse or wide notch results in **silence** -- this is by design
4. Sweep MORPH: triangle to saw with an increasingly wide notch (Braids' CSAW waveform)
5. Listen to the **AUX** output (patch a second cable from AUX to another mixer channel). AUX carries the sum of two hardsynced waveforms shaped by MORPH and detuned by HARMONICS

### Exercise 2: Filtered Noise Deep Dive (7 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:40,knob-plaits-timbre:80,knob-plaits-morph:64"
  data-highlights="knob-plaits-harmonics:amber,knob-plaits-timbre:blue,knob-plaits-morph:blue"
></div>

1. Switch to Bank 2 Model 2 (press MODEL 2 button twice -- second LED in right column). You should hear filtered noise instead of pitched tones
2. Sweep HARMONICS slowly: the filter response changes from low-pass to band-pass to high-pass. This is a complete filter type selector in one knob
3. Sweep TIMBRE: this controls the filter cutoff frequency (clock frequency). Higher TIMBRE = brighter noise
4. Sweep MORPH: this controls filter resonance. Past noon it starts to ring and whistle
5. Listen to AUX: it carries a variant processed by two band-pass filters with separation controlled by HARMONICS -- a stereo-like spread in mono

### Exercise 3: Tonal + Textural Layer (4 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:64"
  data-highlights="jack-plaits-out:amber,jack-plaits-aux:blue"
></div>

1. Stay on Bank 2 Model 2 (filtered noise). Patch both OUT and AUX to your mixer on separate channels
2. Set HARMONICS at noon (band-pass), TIMBRE at about 2 o'clock, MORPH low
3. Play with the mixer balance between OUT (the main filtered noise) and AUX (the dual band-pass variant). Blend them for a richer texture
4. Now switch back to Bank 1 Model 1 -- with both outputs still patched, listen to how the AUX output changes character entirely (now it is hardsynced waveforms instead of dual band-pass noise)

## Session Output

Document in your Obsidian daily note:

- **VA patch settings:** Note your favorite HARMONICS/TIMBRE/MORPH positions for a usable VA tone
- **Filtered noise patch settings:** Note positions for a good textural noise -- what filter type (HARMONICS position) sounded best?
- **Key insight:** How did HARMONICS behave differently between the two models?

## What's Next

In the next session, you will explore the waveshaping oscillator (Bank 1 Model 2) and granular cloud (Bank 2 Model 1) -- two models that transform simple sources into complex, evolving textures.
