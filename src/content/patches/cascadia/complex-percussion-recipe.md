---
name: "Complex Percussion Recipe"
type: drum
session_origin: 23
description: "A multi-layered percussion patch combining LPG body, noise transient, ring mod metallic character, and FM overtones through dual signal paths."
tags: [drum, percussion, lpg, ring-mod, fm, recipe, curriculum, sound-design, advanced]
instrument: cascadia
created: "2026-04-04"
audio_preview: "complex-percussion-recipe.mp3"
cable_routing:
  - source: "VCO A SAW OUT"
    destination: "VCA B IN"
    purpose: "Routes raw sawtooth to LPG (overrides Ring Mod normalling)"
  - source: "Envelope A ENV OUT"
    destination: "VCA/LPF B CV IN"
    purpose: "Percussive envelope controls LPG dynamics (overrides +5V normalling)"
  - source: "LPF B OUT"
    destination: "MAIN 2 IN"
    purpose: "Sums LPG percussion output with main signal path at output"
knob_settings:
  VCO A:
    - control: "OCTAVE"
      value: "position 3"
    - control: "PITCH"
      value: "noon"
    - control: "INDEX"
      value: "8 o'clock"
    - control: "TZFM/EXP"
      value: "TZFM"
    - control: "AC/DC"
      value: "AC"
  VCO B:
    - control: "OCTAVE"
      value: "position 5"
    - control: "PITCH SOURCE"
      value: "PITCH A+B"
    - control: "VCO/LFO"
      value: "VCO"
  Mixer:
    - control: "SAW"
      value: "10 o'clock"
    - control: "NOISE"
      value: "9 o'clock"
    - control: "NOISE TYPE"
      value: "PINK"
    - control: "IN 1"
      value: "9 o'clock"
  VCF:
    - control: "FREQ"
      value: "1 o'clock"
    - control: "Q"
      value: "8 o'clock"
    - control: "MODE"
      value: "LP4"
    - control: "LEVEL"
      value: "noon"
    - control: "FM 1"
      value: "1 o'clock"
    - control: "FM 2"
      value: "noon"
  Envelope B:
    - control: "Attack"
      value: "7 o'clock"
    - control: "Decay"
      value: "9 o'clock"
    - control: "Sustain"
      value: "7 o'clock"
    - control: "Release"
      value: "8 o'clock"
  Envelope A:
    - control: "A (Attack)"
      value: "7 o'clock"
    - control: "D (Decay)"
      value: "9 o'clock"
    - control: "S (Sustain)"
      value: "7 o'clock"
    - control: "R (Release)"
      value: "8 o'clock"
    - control: "ENVELOPE SPEED"
      value: "Fast"
    - control: "HOLD POSITION"
      value: "Off"
    - control: "CTRL SOURCE"
      value: "Level"
  VCA B / LPF:
    - control: "CV AMOUNT"
      value: "3 o'clock"
    - control: "VCA CONTROL"
      value: "UP (VCA+LPF / LPG mode)"
  VCA A:
    - control: "LEVEL"
      value: "9 o'clock"
    - control: "LEVEL MOD"
      value: "noon"
    - control: "AUX IN"
      value: "7 o'clock"
  Wave Folder:
    - control: "FOLD"
      value: "8 o'clock"
  Output Control:
    - control: "MAIN DRIVE"
      value: "noon"
    - control: "MAIN LEVEL"
      value: "noon"
---

# Complex Percussion Recipe

A rich, multi-layered drum sound that goes far beyond the basic LPG bongo. The patch runs dual signal paths simultaneously: the main path (sawtooth + pink noise + ring mod through VCF and VCA A) provides the transient click and metallic character, while the LPG path (sawtooth through VCA B/LPF with a fast envelope) provides the woody body. Both paths sum at Output Control.

VCO A INDEX at a low amount adds FM metallic overtones (from the normalled VCO B at a high octave ratio), giving the percussion a tonal shimmer that sits between pitched and unpitched.

## How to Play

Play staccato notes in the C2-C4 range. Lower notes produce deeper drums; higher notes produce more metallic clicks. Velocity controls the LPG strike intensity (CTRL SOURCE at Level) -- soft taps for ghost notes, hard strikes for full accents. Try rapid alternating C2/C3 patterns for a kick/snare-like feel.

For variation, change VCO A OCTAVE: position 2 for kick-like thuds, position 4 for snare-like snaps. The sweet spot for complex percussion is position 3.

## What Makes It Work

**Dual signal paths** are the key. The LPG path (Cables 1-2) provides the resonant body: the sawtooth enters VCA B, and Envelope A simultaneously controls both the VCA amplitude and the 4-pole low-pass filter cutoff. The main path provides transient definition: noise gives the initial "snap," ring mod (via Mixer IN 1) adds metallic overtones, and the VCF with a fast envelope sweep shapes the spectral character.

**Cable 3 (LPF B OUT -> MAIN 2 IN)** sums both paths at the output stage. The balance between the main path and the LPG is controlled by their respective levels.

**FM at a low amount** (INDEX ~10% with VCO B at octave 5, a 5:3 ratio) adds inharmonic metallic shimmer that makes the percussion sound complex and textured without being obviously pitched.

## Created In

[Session 23: Percussion Sound Design](/instruments/cascadia/sessions/23)
