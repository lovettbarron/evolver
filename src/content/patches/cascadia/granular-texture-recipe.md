---
name: "Granular Texture Recipe"
type: texture
session_origin: 24
description: "An evolving noise texture using BP4-filtered noise with S&H random filter modulation, slew-smoothed wave fold depth, and LFO resonance pulsing."
tags: [texture, noise, sample-hold, wave-folder, generative, recipe, curriculum, sound-design, advanced]
instrument: cascadia
created: "2026-04-04"
audio_preview: "granular-texture-recipe.mp3"
cable_routing:
  - source: "S&H OUT"
    destination: "VCF FM 3 IN"
    purpose: "Stepped random voltages modulate filter cutoff for unpredictable spectral changes"
  - source: "SLEW OUT"
    destination: "Wave Folder FOLD MOD IN"
    purpose: "Smoothed random voltage modulates fold depth for evolving harmonics"
  - source: "LFO X OUT"
    destination: "VCF Q MOD IN"
    purpose: "LFO modulates resonance for pulsing spectral character"
knob_settings:
  VCO A:
    - control: "OCTAVE"
      value: "position 4"
    - control: "PITCH"
      value: "noon"
  Mixer:
    - control: "NOISE"
      value: "2 o'clock"
    - control: "NOISE TYPE"
      value: "WHITE"
    - control: "SAW"
      value: "8 o'clock"
  VCF:
    - control: "FREQ"
      value: "10 o'clock"
    - control: "Q"
      value: "11 o'clock"
    - control: "MODE"
      value: "BP4"
    - control: "LEVEL"
      value: "1 o'clock"
    - control: "FM 1"
      value: "9 o'clock"
    - control: "FM 2"
      value: "noon"
    - control: "FM 3"
      value: "10 o'clock"
    - control: "QM"
      value: "10 o'clock"
  Envelope B:
    - control: "Attack"
      value: "8 o'clock"
    - control: "Decay"
      value: "noon"
    - control: "Sustain"
      value: "10 o'clock"
    - control: "Release"
      value: "11 o'clock"
  Envelope A:
    - control: "A (Attack)"
      value: "8 o'clock"
    - control: "D (Decay)"
      value: "10 o'clock"
    - control: "S (Sustain)"
      value: "1 o'clock"
    - control: "R (Release)"
      value: "11 o'clock"
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
      value: "noon"
    - control: "AUX IN"
      value: "7 o'clock"
  Wave Folder:
    - control: "FOLD"
      value: "9 o'clock"
    - control: "MOD"
      value: "11 o'clock"
  LFO X/Y/Z:
    - control: "RATE"
      value: "9 o'clock"
  Utilities:
    - control: "SLEW RATE"
      value: "11 o'clock"
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

# Granular Texture Recipe

An evolving, non-pitched texture built primarily from white noise shaped by a narrow BP4 bandpass filter with moderate resonance. Three independent modulation sources create constantly changing character: the S&H sends stepped random voltages directly to the filter cutoff (abrupt spectral jumps), the Slew Limiter smooths those same random steps and sends them to the wave folder (gradual harmonic evolution), and LFO X modulates the resonance (pulsing spectral emphasis).

The result is a sound that never quite repeats -- a generative atmosphere that works as a background element, a transition effect, or a rhythmic texture depending on clock rate and modulation depth.

## How to Play

Hold notes for 10+ seconds to hear the full evolving character. The S&H and slew create changes that unfold over time, and faster MIDI clock rates increase the pace of random changes. Play at different pitches to shift the subtle pitched undertone (from the ~15% sawtooth) that colors the noise texture.

This patch works best as a background element layered under tonal instruments, or as a standalone atmospheric effect.

## What Makes It Work

**Splitting the same random source** into two different characters is the core technique. The S&H generates random stepped voltages (from normalled internal noise). Cable 1 sends these steps directly to the filter -- abrupt, unpredictable cutoff changes. The Slew Limiter (normalled from S&H OUT) smooths those same steps into gentle curves, which Cable 2 sends to the wave folder -- gradual, organic harmonic evolution. Same source, two complementary behaviors.

**BP4 filtering** concentrates the noise into a narrow band, giving it a focused, resonant character rather than broadband hiss. The moderate resonance adds a tonal quality that makes the noise musical rather than purely noisy.

**LFO on resonance** (Cable 3) adds a third modulation layer. The resonant peak pulses slowly, sometimes emphasizing a narrow singing quality, sometimes broadening to a wider wash. This prevents the texture from settling into a static state.

## Created In

[Session 24: Texture Sound Design](/instruments/cascadia/sessions/24)
