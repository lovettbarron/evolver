---
name: "Deep Sub Bass Recipe"
type: bass
session_origin: 20
description: "A warm, powerful bass patch using sawtooth plus sub-oscillator through LP4 with a tight filter envelope for attack definition. Zero cables required."
tags: [bass, sub, recipe, curriculum, sound-design, advanced]
instrument: cascadia
created: "2026-04-04"
audio_preview: "deep-sub-bass-recipe.mp3"
cable_routing: []
knob_settings:
  VCO A:
    - control: "OCTAVE"
      value: "position 2"
    - control: "PITCH"
      value: "noon"
    - control: "PW"
      value: "noon"
    - control: "PW MOD"
      value: "8 o'clock"
    - control: "INDEX"
      value: "7 o'clock"
  Mixer:
    - control: "SAW"
      value: "2 o'clock"
    - control: "SUB"
      value: "11 o'clock"
    - control: "SUB TYPE"
      value: "SUB -1"
  VCF:
    - control: "FREQ"
      value: "9 o'clock"
    - control: "Q"
      value: "8 o'clock"
    - control: "MODE"
      value: "LP4"
    - control: "LEVEL"
      value: "1 o'clock"
    - control: "FM 1"
      value: "noon"
    - control: "FM 2"
      value: "noon"
  Envelope B:
    - control: "Attack"
      value: "7 o'clock"
    - control: "Decay"
      value: "10 o'clock"
    - control: "Sustain"
      value: "8 o'clock"
    - control: "Release"
      value: "8 o'clock"
  Envelope A:
    - control: "A (Attack)"
      value: "7 o'clock"
    - control: "D (Decay)"
      value: "9 o'clock"
    - control: "S (Sustain)"
      value: "1 o'clock"
    - control: "R (Release)"
      value: "8 o'clock"
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
      value: "8 o'clock"
  LFO X/Y/Z:
    - control: "RATE"
      value: "9 o'clock"
  Output Control:
    - control: "MAIN DRIVE"
      value: "noon"
    - control: "MAIN LEVEL"
      value: "noon"
---

# Deep Sub Bass Recipe

A warm, powerful bass patch that lives in the low end of the frequency spectrum. The sawtooth oscillator at octave 2 provides harmonic richness while the sub-oscillator (one octave below) fills out the very lowest frequencies. The LP4 filter with a low cutoff removes harsh upper harmonics, and a tight filter envelope provides the attack definition that lets the bass cut through a mix despite its dark tonal character.

This patch requires zero cables -- everything runs through Cascadia's normalled signal path. The subtle wave folding and slow LFO-driven pulse width modulation add movement and presence to sustained notes without muddying the fundamental.

## How to Play

Play in the C1-C3 range. C2 is the sweet spot for most musical contexts. Staccato playing emphasizes the filter envelope's "pluck" attack. Held notes sustain at a warm, moderate level. Velocity sensitivity (CTRL SOURCE at Level) means harder strikes produce louder, brighter bass notes -- play dynamically for expressive bass lines.

Try octave jumps between C2 and C3 for classic synth bass movement. For a more aggressive character, increase VCF LEVEL and FOLD.

## What Makes It Work

The **sawtooth + sub-oscillator** combination provides both harmonic richness (saw) and fundamental weight (sub). The sub at SUB -1 reinforces the octave below, filling the very lowest frequencies.

The **LP4 filter at a low cutoff** removes the harsh upper harmonics that would make the bass too bright for a mix. The **filter envelope** (Envelope B -> FM 1) opens the filter briefly on each attack, providing the "pluck" definition that lets individual notes be heard clearly despite the dark sustain.

**Wave folding at a low amount** adds subtle grit on the attack (where the filter is open and harmonics pass through), giving presence without muddying the sustained low end.

## Created In

[Session 20: Bass Sound Design](/instruments/cascadia/sessions/20)
