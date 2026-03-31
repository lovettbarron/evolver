---
name: "Granular Noise"
type: texture
session_origin: null
description: "Granular-style texture using S&H stepped pitch, wave folding, and layered noise for complex evolving sound."
tags: [texture, granular, noise, sample-and-hold, complex, cascadia]
instrument: cascadia
created: "2026-03-31"
audio_preview: "granular-noise.mp3"
cable_routing:
  - source: "S&H OUT"
    destination: "VCO A FM 1 IN"
    purpose: "Stepped random pitch from sample and hold for granular character"
  - source: "LFO X OUT"
    destination: "VCF FM 1 IN"
    purpose: "Slow filter sweep across the texture"
  - source: "NOISE OUT"
    destination: "MIXER IN 2"
    purpose: "Noise layer mixed with oscillator for texture density"
  - source: "ENV B OUT"
    destination: "FOLD MOD IN"
    purpose: "Attack-driven fold burst for transient harmonic splash"
  - source: "VCO B TRIANGLE OUT"
    destination: "FOLD MOD IN"
    purpose: "Slow symmetry shift via low-frequency cross-modulation"
  - source: "ENV A OUT"
    destination: "VCA A LEVEL MOD IN"
    purpose: "Amplitude envelope shapes overall texture dynamics"
knob_settings:
  VCO A:
    - control: "OCTAVE"
      value: "5"
    - control: "Waveform"
      value: "Pulse"
    - control: "PW"
      value: "30%"
    - control: "FM 1"
      value: "11 o'clock"
  VCO B:
    - control: "OCTAVE"
      value: "3"
    - control: "Waveform"
      value: "Triangle"
    - control: "VCO/LFO"
      value: "LFO"
  VCF:
    - control: "FREQ"
      value: "12 o'clock"
    - control: "Q"
      value: "11 o'clock"
    - control: "MODE"
      value: "BP2"
    - control: "FM 1"
      value: "11 o'clock"
  Wave Folder:
    - control: "MOD"
      value: "11 o'clock"
    - control: "FOLD"
      value: "1 o'clock"
  Mixer:
    - control: "PULSE"
      value: "2 o'clock"
    - control: "IN 2"
      value: "10 o'clock"
  LFO X/Y/Z:
    - control: "RATE"
      value: "9 o'clock"
---

# Granular Noise

> [!tip] Playing Tips
> The S&H rate controls the "grain" speed -- faster triggering gives glitchy, rapid-fire pitch steps; slower gives more melodic, deliberate stepping. Adjust VCO A FM 1 slider to control how much the S&H affects pitch -- subtle settings give gentle grain variation, extreme settings give wild pitch jumps. Set VCO B to LFO mode for the slowest symmetry cross-modulation.

## Notes

This complex 6-cable patch creates a granular-style texture by combining several of Cascadia's modules. The Sample & Hold (with its normalled noise input and MIDI clock trigger) generates stepped random voltages that drive VCO A's pitch, creating the characteristic "grains" of sound at different pitches. The pulse wave at 30% duty cycle provides an asymmetric tone that responds well to the Wave Folder. Two sources sum at FOLD MOD IN: Envelope B provides a burst of folding on each note attack, while VCO B in LFO mode provides very slow cross-modulation. The noise patched to Mixer IN 2 adds texture density between the pitched grains. The BP2 filter focuses the sound in the midrange, preventing the complex harmonics from becoming harsh.
