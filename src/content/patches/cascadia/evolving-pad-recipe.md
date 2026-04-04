---
name: "Evolving Pad Recipe"
type: pad
session_origin: 22
description: "A warm, breathing pad with slow LFO filter movement, pulse width drift, smoothed random pitch wandering, and long envelope swells."
tags: [pad, evolving, lfo, ambient, recipe, curriculum, sound-design, advanced]
instrument: cascadia
created: "2026-04-04"
audio_preview: "evolving-pad-recipe.mp3"
cable_routing:
  - source: "LFO X OUT"
    destination: "VCF FM 3 IN"
    purpose: "Slow LFO modulates filter cutoff for evolving brightness"
  - source: "SLEW OUT"
    destination: "VCO A FM 1 IN"
    purpose: "Smoothed random voltage creates subtle pitch drift"
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
      value: "7 o'clock"
  Mixer:
    - control: "SAW"
      value: "11 o'clock"
    - control: "PULSE"
      value: "10 o'clock"
  VCF:
    - control: "FREQ"
      value: "11 o'clock"
    - control: "Q"
      value: "8 o'clock"
    - control: "MODE"
      value: "LP4"
    - control: "LEVEL"
      value: "noon"
    - control: "FM 1"
      value: "10 o'clock"
    - control: "FM 2"
      value: "noon"
    - control: "FM 3"
      value: "9 o'clock"
  Envelope B:
    - control: "Attack"
      value: "10 o'clock"
    - control: "Decay"
      value: "11 o'clock"
    - control: "Sustain"
      value: "11 o'clock"
    - control: "Release"
      value: "11 o'clock"
  Envelope A:
    - control: "A (Attack)"
      value: "11 o'clock"
    - control: "D (Decay)"
      value: "10 o'clock"
    - control: "S (Sustain)"
      value: "2 o'clock"
    - control: "R (Release)"
      value: "noon"
    - control: "ENVELOPE SPEED"
      value: "Med"
    - control: "HOLD POSITION"
      value: "Off"
    - control: "CTRL SOURCE"
      value: "Off"
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
      value: "div5"
  Utilities:
    - control: "SLEW RATE"
      value: "1 o'clock"
    - control: "SLEW DIRECTION"
      value: "Both"
    - control: "SLEW SHAPE"
      value: "EXP"
  Output Control:
    - control: "MAIN DRIVE"
      value: "noon"
    - control: "MAIN LEVEL"
      value: "noon"
---

# Evolving Pad Recipe

A warm, breathing pad that swells in slowly and evolves continuously over long holds. The blended sawtooth and pulse waves provide harmonic richness, shaped by an LP4 filter with a moderate cutoff that keeps the sound warm without being dark. Three layers of modulation create organic movement: LFO X slowly drifts the filter cutoff, LFO Y drifts the pulse width (via normalling), and slew-smoothed S&H random voltage gently wanders the pitch.

The long envelopes (Med speed, high attack and release) mean notes swell in over 2-3 seconds and fade out over 4-5 seconds, creating a breathing quality where overlapping notes blend naturally.

## How to Play

Hold notes for at least 3-4 seconds to hear the full swell and evolving character. Play simple two- or three-note chords in the C3-C5 range -- the slow attack blends notes smoothly. Layer under a lead or bass for a complete arrangement. The long release means notes overlap naturally, so play slowly and let the tails blend.

## What Makes It Work

**Multiple slow modulation sources** create the evolving quality. The LFO on the filter (~15% depth at ~10% rate) moves the brightness; the LFO on pulse width (via normalling) moves the timbre; the slew-smoothed S&H on pitch (~5% depth) adds organic drift. Each modulation layer operates at a slightly different timescale, so the movement never repeats exactly.

**Long envelopes at Med speed** create the breathing character. The slow attack means each note emerges gradually rather than appearing suddenly. The long release means notes linger after release, overlapping and blending with subsequent notes.

**Subtle wave folding** adds harmonic depth that your ear registers as richness without identifying as a specific effect. Combined with LP4 filtering, it gives the pad an inner warmth.

## Created In

[Session 22: Pad Sound Design](/instruments/cascadia/sessions/22)
