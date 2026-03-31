---
name: "Shimmer Pad"
type: pad
session_origin: null
description: "Shimmering pad with wave folding harmonics, dual LFO modulation, and highpass filtering."
tags: [pad, shimmer, wave-folder, complex, highpass, cascadia]
instrument: cascadia
created: "2026-03-31"
audio_preview: "shimmer-pad.mp3"
cable_routing:
  - source: "LFO X OUT"
    destination: "FOLD MOD IN"
    purpose: "Evolving harmonic content via slow wave folding modulation"
  - source: "LFO Y OUT"
    destination: "VCF FM 1 IN"
    purpose: "Slow filter movement for spectral drift"
  - source: "LFO Z OUT"
    destination: "VCO A FM 1 IN"
    purpose: "Gentle pitch drift for organic detuning"
  - source: "ENV A OUT"
    destination: "VCA A LEVEL MOD IN"
    purpose: "Amplitude envelope for note shaping"
  - source: "ENV B OUT"
    destination: "FOLD MOD IN"
    purpose: "Attack-driven fold intensity burst"
knob_settings:
  VCO A:
    - control: "OCTAVE"
      value: "5"
    - control: "Waveform"
      value: "Saw"
  VCF:
    - control: "FREQ"
      value: "2 o'clock"
    - control: "Q"
      value: "10 o'clock"
    - control: "MODE"
      value: "HP4"
    - control: "FM 1"
      value: "11 o'clock"
  Wave Folder:
    - control: "MOD"
      value: "12 o'clock"
    - control: "FOLD"
      value: "11 o'clock"
  Envelope A:
    - control: "A (Attack)"
      value: "3 o'clock"
    - control: "D (Decay)"
      value: "full CW"
    - control: "S (Sustain)"
      value: "2 o'clock"
    - control: "R (Release)"
      value: "3 o'clock"
  LFO X/Y/Z:
    - control: "RATE"
      value: "8 o'clock"
---

# Shimmer Pad

> [!tip] Playing Tips
> Play in the C4-C6 range for the brightest shimmer effect. Hold notes for 5+ seconds to hear the full LFO evolution cycle. The highpass filter removes low-end mud, keeping the shimmer airy and crystalline. Layer this with the Deep Sub Bass patch on a second voice for a full-spectrum pad.

## Notes

This complex 5-cable patch creates a shimmering, evolving pad by combining wave folding with multi-LFO modulation and highpass filtering. The saw wave from VCO A provides rich harmonic starting material. Two separate sources modulate the Wave Folder: LFO X provides slow, continuous harmonic evolution, while Envelope B adds a burst of fold intensity on each note attack (both patch to FOLD MOD IN, where they sum). The HP4 filter mode removes low frequencies, leaving the bright, shimmery upper harmonics that give the patch its name. Three LFOs running at different rates (via the rate divider switches) create polyrhythmic modulation patterns that prevent the sound from ever quite repeating.
