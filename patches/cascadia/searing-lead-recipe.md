---
name: "Searing Lead Recipe"
type: lead
session_origin: 21
description: "A cutting, expressive lead with VCO B detuning for thickness, BP2 filtering for mid-range focus, and wave folding for harmonic edge."
tags: [lead, detune, wave-folder, bandpass, recipe, curriculum, sound-design, advanced]
instrument: cascadia
created: "2026-04-04"
audio_preview: "searing-lead-recipe.mp3"
cable_routing:
  - source: "VCO B TRIANGLE OUT"
    destination: "MIXER IN 2"
    purpose: "Blends detuned VCO B triangle into mix for thickness (overrides VCO A SINE normalling)"
knob_settings:
  VCO A:
    - control: "OCTAVE"
      value: "position 4"
    - control: "PITCH"
      value: "noon"
    - control: "PW"
      value: "1 o'clock"
    - control: "PW MOD"
      value: "9 o'clock"
    - control: "INDEX"
      value: "8 o'clock"
    - control: "TZFM/EXP"
      value: "TZFM"
    - control: "AC/DC"
      value: "AC"
  VCO B:
    - control: "OCTAVE"
      value: "position 4"
    - control: "PITCH"
      value: "slightly sharp of noon (+3 cents)"
    - control: "PITCH SOURCE"
      value: "PITCH A+B"
    - control: "VCO/LFO"
      value: "VCO"
  Mixer:
    - control: "SAW"
      value: "1 o'clock"
    - control: "IN 2"
      value: "11 o'clock"
  VCF:
    - control: "FREQ"
      value: "11 o'clock"
    - control: "Q"
      value: "10 o'clock"
    - control: "MODE"
      value: "BP2"
    - control: "LEVEL"
      value: "1 o'clock"
    - control: "FM 1"
      value: "11 o'clock"
    - control: "FM 2"
      value: "noon"
  Envelope B:
    - control: "Attack"
      value: "7:30"
    - control: "Decay"
      value: "10 o'clock"
    - control: "Sustain"
      value: "9 o'clock"
    - control: "Release"
      value: "9 o'clock"
  Envelope A:
    - control: "A (Attack)"
      value: "7:30"
    - control: "D (Decay)"
      value: "10 o'clock"
    - control: "S (Sustain)"
      value: "2 o'clock"
    - control: "R (Release)"
      value: "9 o'clock"
    - control: "ENVELOPE SPEED"
      value: "Fast"
    - control: "HOLD POSITION"
      value: "Off"
    - control: "CTRL SOURCE"
      value: "Level"
  VCA A:
    - control: "LEVEL"
      value: "10 o'clock"
    - control: "LEVEL MOD"
      value: "1 o'clock"
    - control: "AUX IN"
      value: "7 o'clock"
  Wave Folder:
    - control: "FOLD"
      value: "9 o'clock"
  LFO X/Y/Z:
    - control: "RATE"
      value: "9 o'clock"
  Output Control:
    - control: "MAIN DRIVE"
      value: "noon"
    - control: "MAIN LEVEL"
      value: "noon"
---

# Searing Lead Recipe

A cutting lead sound that slices through any mix. Two detuned oscillators -- VCO A's sawtooth and VCO B's triangle, slightly sharp -- create a thick, chorused foundation. The BP2 bandpass filter focuses the energy into the mid-range where leads need to be heard, with moderate resonance adding a vocal, present quality. Wave folding contributes harmonic edge, and subtle FM shimmer from the normalled VCO B -> VCO A connection adds complexity.

The slight attack swell on both envelopes gives the lead a singing quality rather than a harsh onset, making it expressive for melodic playing.

## How to Play

This lead responds well to velocity -- softer playing for mellow phrases, harder strikes for cutting accents. Play legato for smooth, singing phrases and staccato for punchy, rhythmic leads. The C4-C6 range is where the bandpass resonance is most present and the lead cuts best.

Sweep VCF FREQ during performance for a "wah" effect -- the BP2 with resonance creates a vocal quality that responds beautifully to manual cutoff changes.

## What Makes It Work

**Detuned oscillators** are the thickness foundation. VCO B's triangle, just +3 cents sharp, beats against VCO A's saw, creating a natural analog chorus that no digital effect can fully replicate.

**BP2 bandpass filtering** is the key to cutting through. By removing both low mud and high harshness, the bandpass concentrates the lead's energy into the mid-range frequencies that the human ear is most sensitive to. The moderate resonance adds a peak that gives the sound presence and focus.

**Wave folding at 9 o'clock** adds overtones without the harshness of distortion. The harmonics from folding interact with the bandpass filter to create a complex, slightly aggressive character.

## Created In

[Session 21: Lead Sound Design](/instruments/cascadia/sessions/21)
