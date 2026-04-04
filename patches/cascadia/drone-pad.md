---
name: "Drone Pad"
type: pad
session_origin: null
description: "Evolving drone using both VCOs with slow cross-modulation and wave folding for movement."
tags: [pad, drone, cross-modulation, wave-folder, evolving, cascadia]
instrument: cascadia
created: "2026-03-31"
audio_preview: "drone-pad.mp3"
cable_routing:
  - source: "VCO B TRIANGLE OUT"
    destination: "VCO A FM 1 IN"
    purpose: "Slow cross-modulation between oscillators for harmonic complexity"
  - source: "LFO X OUT"
    destination: "FOLD MOD IN"
    purpose: "Evolving wave fold depth for timbral movement"
  - source: "LFO Z OUT"
    destination: "VCF FM 1 IN"
    purpose: "Slow filter drift for spectral wandering"
  - source: "ENV B OUT"
    destination: "VCA A LEVEL MOD IN"
    purpose: "Gate envelope for sustained drone amplitude"
knob_settings:
  VCO A:
    - control: "OCTAVE"
      value: "3"
    - control: "Waveform"
      value: "Saw"
    - control: "FM 1"
      value: "10 o'clock"
  VCO B:
    - control: "OCTAVE"
      value: "2"
    - control: "Waveform"
      value: "Triangle"
  VCF:
    - control: "FREQ"
      value: "1 o'clock"
    - control: "Q"
      value: "11 o'clock"
    - control: "MODE"
      value: "LP4"
    - control: "FM 1"
      value: "10 o'clock"
  Wave Folder:
    - control: "MOD"
      value: "11 o'clock"
    - control: "FOLD"
      value: "2 o'clock"
  LFO X/Y/Z:
    - control: "RATE"
      value: "8 o'clock"
---

# Drone Pad

> [!tip] Playing Tips
> Hold a single low note (C2 or C3) and let the patch evolve over 30+ seconds. The cross-modulation and wave folding create constantly shifting harmonics. Try setting VCO B to LFO mode for even slower modulation -- the triangle wave becomes a glacial modulator that transforms VCO A's timbre over minutes.

## Notes

This drone patch creates an ever-evolving sound by combining three modulation techniques: VCO B's triangle wave cross-modulates VCO A's pitch at a low audio rate (set one octave below VCO A for sub-harmonic complexity), the Wave Folder adds harmonic folding modulated by LFO X, and the VCF cutoff drifts via LFO Z. The Envelope B cable to VCA A overrides the normalled Envelope A amplitude connection, using Envelope B in AHR mode for a gate-style envelope that holds the drone open as long as the key is held. The low octave settings and LP4 filter keep the sound grounded and deep while the upper harmonics shift and evolve.
