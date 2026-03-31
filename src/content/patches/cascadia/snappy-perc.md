---
name: "Snappy Perc"
type: drum
session_origin: null
description: "Snappy percussive hit using noise through a resonant bandpass filter with a short envelope."
tags: [drum, percussion, noise, snappy, simple, cascadia]
instrument: cascadia
created: "2026-03-31"
audio_preview: "snappy-perc.mp3"
cable_routing:
  - source: "NOISE OUT"
    destination: "MIXER IN 2"
    purpose: "Noise source for unpitched percussion"
  - source: "ENV A OUT"
    destination: "VCF FM 1 IN"
    purpose: "Filter snap for percussive transient"
knob_settings:
  VCF:
    - control: "FREQ"
      value: "2 o'clock"
    - control: "Q"
      value: "2 o'clock"
    - control: "MODE"
      value: "BP4"
    - control: "FM 1"
      value: "3 o'clock"
  Mixer:
    - control: "SAW"
      value: "full CCW"
    - control: "PULSE"
      value: "full CCW"
    - control: "IN 2"
      value: "2 o'clock"
  Envelope A:
    - control: "A (Attack)"
      value: "full CCW"
    - control: "D (Decay)"
      value: "9 o'clock"
    - control: "S (Sustain)"
      value: "full CCW"
    - control: "R (Release)"
      value: "8 o'clock"
    - control: "ENVELOPE SPEED"
      value: "Fast"
---

# Snappy Perc

> [!tip] Playing Tips
> Adjust VCF FREQ to tune the percussion -- lower for toms, higher for hi-hats. Higher Q values give more tonal, pitched percussion; lower Q gives broader noise bursts. Try switching NOISE TYPE on the Mixer between White, Pink, and ALT for different textures. Use Push Gate for triggering.

## Notes

A simple 2-cable percussion patch built on filtered noise. The Mixer's oscillator levels (SAW, PULSE) are turned fully down so only the noise through IN 2 reaches the filter. The BP4 bandpass filter with high resonance isolates a narrow frequency band from the noise, giving the hit a semi-pitched character. Envelope A provides a very fast attack and short decay for the snappy transient. The envelope to VCF FM 1 overrides the normalled Envelope B connection, sweeping the filter frequency on each hit for added snap. This is a building block for more complex drum patches -- add a second cable from an LFO to Q MOD IN for dynamic resonance.
