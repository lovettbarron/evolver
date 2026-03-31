---
name: "Deep Sub Bass"
type: bass
session_origin: null
description: "Thick sub bass using VCO A triangle with slow LFO vibrato and envelope-controlled filter sweep."
tags: [bass, sub, triangle, simple, cascadia]
instrument: cascadia
created: "2026-03-31"
audio_preview: "deep-sub-bass.mp3"
cable_routing:
  - source: "LFO X OUT"
    destination: "VCO A FM 1 IN"
    purpose: "Slow vibrato adds subtle pitch movement"
  - source: "ENV A OUT"
    destination: "VCF FM 1 IN"
    purpose: "Envelope-controlled filter sweep for each note"
knob_settings:
  VCO A:
    - control: "OCTAVE"
      value: "3"
    - control: "Waveform"
      value: "Triangle"
  VCF:
    - control: "FREQ"
      value: "10 o'clock"
    - control: "Q"
      value: "9 o'clock"
    - control: "MODE"
      value: "LP4"
    - control: "FM 1"
      value: "2 o'clock"
  Envelope A:
    - control: "A (Attack)"
      value: "full CCW"
    - control: "D (Decay)"
      value: "1 o'clock"
    - control: "S (Sustain)"
      value: "10 o'clock"
    - control: "R (Release)"
      value: "11 o'clock"
  LFO X/Y/Z:
    - control: "RATE"
      value: "8 o'clock"
---

# Deep Sub Bass

> [!tip] Playing Tips
> Play in the C1-C2 range for the deepest impact. The LFO vibrato is subtle -- keep the FM 1 slider on VCO A low (around 9 o'clock) to avoid detuning. This patch relies on the normalled VCO A triangle path through the Mixer to the VCF, so no audio cables are needed beyond the two modulation cables.

## Notes

A minimal 2-cable patch that demonstrates how much tone-shaping is possible using Cascadia's normalled signal path. VCO A's triangle wave passes through the Mixer and VCF without any explicit audio patching. The Envelope A cable to VCF FM 1 overrides the normalled Envelope B connection, giving you direct control over the filter sweep shape. The slow LFO vibrato adds life without being obvious -- turn it off to hear the difference.
