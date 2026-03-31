---
name: "Warm Pad"
type: pad
session_origin: null
description: "Simple warm pad with slow attack, gentle LFO filter modulation, and pulse width movement."
tags: [pad, warm, simple, slow-attack, cascadia]
instrument: cascadia
created: "2026-03-31"
audio_preview: "warm-pad.mp3"
cable_routing:
  - source: "LFO X OUT"
    destination: "VCF FM 1 IN"
    purpose: "Slow filter sweep for evolving brightness"
  - source: "LFO Y OUT"
    destination: "VCO A FM 1 IN"
    purpose: "Gentle pitch movement for width and warmth"
knob_settings:
  VCO A:
    - control: "OCTAVE"
      value: "4"
    - control: "Waveform"
      value: "Pulse"
    - control: "PW"
      value: "50%"
    - control: "PW MOD"
      value: "2 o'clock"
  VCF:
    - control: "FREQ"
      value: "12 o'clock"
    - control: "Q"
      value: "9 o'clock"
    - control: "MODE"
      value: "LP2"
    - control: "FM 1"
      value: "11 o'clock"
  Envelope A:
    - control: "A (Attack)"
      value: "2 o'clock"
    - control: "D (Decay)"
      value: "3 o'clock"
    - control: "S (Sustain)"
      value: "2 o'clock"
    - control: "R (Release)"
      value: "2 o'clock"
  LFO X/Y/Z:
    - control: "RATE"
      value: "9 o'clock"
---

# Warm Pad

> [!tip] Playing Tips
> Hold notes for at least 3-4 seconds to let the slow attack bloom. The LFO filter sweep is subtle -- listen for the brightness gently shifting over time. The pulse wave with PW MOD from the normalled LFO Y adds natural width. Try playing sustained chords if using an external MIDI keyboard with polyphonic voice allocation.

## Notes

A minimal 2-cable patch that creates a lush pad sound from Cascadia's normalled path. The pulse wave provides a hollow, warm foundation, and the normalled LFO Y pulse width modulation (via the PW MOD slider) adds movement without any explicit cable. The LFO X cable to VCF FM 1 overrides Envelope B's normalled filter connection, replacing the per-note filter sweep with a slow, continuous filter drift. The LFO Y cable to VCO A FM 1 adds gentle pitch movement. The long attack and release on Envelope A create the characteristic pad swell.
