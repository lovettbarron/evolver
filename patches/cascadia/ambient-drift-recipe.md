---
name: "Ambient Drift Recipe"
type: pad
session_origin: 25
description: "A spacious, evolving ambient patch combining glacial envelopes, detuned oscillators, S&H pitch drift, LFO filter movement, wave folding, and a ring mod shimmer layer. The curriculum capstone."
tags: [pad, ambient, evolving, capstone, recipe, curriculum, sound-design, advanced]
instrument: cascadia
created: "2026-04-04"
audio_preview: "ambient-drift-recipe.mp3"
cable_routing:
  - source: "LFO X OUT"
    destination: "VCF FM 3 IN"
    purpose: "Glacial LFO drifts filter cutoff over 10+ second cycles"
  - source: "SLEW OUT"
    destination: "VCO A FM 1 IN"
    purpose: "Smoothed random voltage creates barely perceptible pitch wandering"
  - source: "VCO B TRIANGLE OUT"
    destination: "MIXER IN 2"
    purpose: "Detuned second oscillator for natural analog chorus (overrides VCO A SINE normalling)"
  - source: "LPF B OUT"
    destination: "MAIN 2 IN"
    purpose: "Filtered ring mod shimmer layer summed at output"
  - source: "Envelope A ENV OUT"
    destination: "VCA/LPF B CV IN"
    purpose: "Envelope controls LPF B cutoff for ring mod shimmer dynamics (overrides +5V normalling)"
knob_settings:
  VCO A:
    - control: "OCTAVE"
      value: "position 4"
    - control: "PITCH"
      value: "noon"
    - control: "PW"
      value: "noon"
    - control: "PW MOD"
      value: "10 o'clock"
    - control: "INDEX"
      value: "8 o'clock"
    - control: "TZFM/EXP"
      value: "TZFM"
    - control: "AC/DC"
      value: "AC"
    - control: "SYNC TYPE"
      value: "Off"
  VCO B:
    - control: "OCTAVE"
      value: "position 4"
    - control: "PITCH"
      value: "slightly flat of noon (-3 cents)"
    - control: "PITCH SOURCE"
      value: "PITCH A+B"
    - control: "VCO/LFO"
      value: "VCO"
  Mixer:
    - control: "SAW"
      value: "10 o'clock"
    - control: "PULSE"
      value: "9 o'clock"
    - control: "IN 2"
      value: "9 o'clock"
    - control: "NOISE"
      value: "8 o'clock"
    - control: "NOISE TYPE"
      value: "PINK"
  VCF:
    - control: "FREQ"
      value: "10 o'clock"
    - control: "Q"
      value: "8 o'clock"
    - control: "MODE"
      value: "LP4"
    - control: "LEVEL"
      value: "noon"
    - control: "FM 1"
      value: "9 o'clock"
    - control: "FM 2"
      value: "noon"
    - control: "FM 3"
      value: "8 o'clock"
  Envelope B:
    - control: "Attack"
      value: "11 o'clock"
    - control: "Decay"
      value: "11 o'clock"
    - control: "Sustain"
      value: "11 o'clock"
    - control: "Release"
      value: "1 o'clock"
  Envelope A:
    - control: "A (Attack)"
      value: "noon"
    - control: "D (Decay)"
      value: "11 o'clock"
    - control: "S (Sustain)"
      value: "3 o'clock"
    - control: "R (Release)"
      value: "1 o'clock"
    - control: "ENVELOPE SPEED"
      value: "Med"
    - control: "HOLD POSITION"
      value: "Off"
    - control: "CTRL SOURCE"
      value: "Off"
  VCA B / LPF:
    - control: "CV AMOUNT"
      value: "1 o'clock"
    - control: "VCA CONTROL"
      value: "DOWN (LPF only)"
  VCA A:
    - control: "LEVEL"
      value: "10 o'clock"
    - control: "LEVEL MOD"
      value: "1 o'clock"
    - control: "AUX IN"
      value: "7 o'clock"
  Wave Folder:
    - control: "FOLD"
      value: "8 o'clock"
  LFO X/Y/Z:
    - control: "RATE"
      value: "8 o'clock"
    - control: "LFO Z RATE DIVIDER"
      value: "div8"
  Utilities:
    - control: "SLEW RATE"
      value: "2 o'clock"
    - control: "SLEW DIRECTION"
      value: "Both"
    - control: "SLEW SHAPE"
      value: "EXP"
  Output Control:
    - control: "MAIN DRIVE"
      value: "noon"
    - control: "SOFT CLIP"
      value: "On"
    - control: "MAIN LEVEL"
      value: "noon"
---

# Ambient Drift Recipe

The curriculum capstone: a spacious ambient patch that uses techniques from every module in the 25-session Cascadia curriculum. Detuned oscillators (Module 2) provide natural chorus. Glacial envelopes (Module 3) create slow swells that take 5+ seconds to develop. LP4 filtering (Module 4) keeps the tone warm. Slow LFO modulation (Module 5) and slew-smoothed S&H drift move the filter and pitch imperceptibly. Subtle FM (Module 6) adds harmonic shimmer. A secondary LPF B path adds a ring mod shimmer layer through VCA B's low-pass filter.

Five cables create a patch with multiple dimensions of evolving movement. The result is an environment rather than an instrument -- a sonic space that rewards patience and unfolds over minutes.

## How to Play

Hold notes for 10-30 seconds minimum. This patch is designed to evolve on a long timescale. Play single notes or simple two-note intervals (octaves, fifths) in the C3-C5 range -- complex chords muddy the ambient space. Let the long release tails overlap naturally with new notes.

Layer with the Granular Texture Recipe (Session 24) for a complete ambient environment. If you have a reverb pedal, route VCF LP4 OUT through the FX Send/Return (Session 18) for additional spatial depth.

## What Makes It Work

**Glacial envelopes** (Med speed, Attack at noon = ~3-4 seconds, Release at 1 o'clock = ~5-6 seconds) define the ambient character. Notes emerge from silence gradually and fade back into it over several seconds, creating a breathing, organic quality.

**Multiple modulation layers** at different timescales prevent the sound from ever settling into stasis: LFO X drifts the filter (~10-second cycles), LFO Y drifts pulse width (same rate), slew-smoothed S&H wanders the pitch (random, ~3-5 second transitions), and the detuned VCO B creates a slow beat frequency. These overlapping modulations ensure the sound is always changing.

**Dual signal paths** -- the main voice through VCA A, plus the filtered ring mod through VCA B/LPF -- create harmonic complexity from a single note. The ring mod shimmer (VCO A x VCO B) filtered by LPF B adds metallic overtones that swell with the main envelope, enriching the harmonic palette.

**Soft clipping** on the output gently rounds off peaks from the multiple layered signals, adding warmth to the final output.

## Created In

[Session 25: Ambient Sound Design](/instruments/cascadia/sessions/25)
