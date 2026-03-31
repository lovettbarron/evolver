---
name: "Analog Kick"
type: drum
session_origin: null
description: "Punchy analog kick drum using VCO A with fast pitch envelope sweep and short amplitude envelope."
tags: [drum, kick, percussive, pitch-sweep, cascadia]
instrument: cascadia
created: "2026-03-31"
audio_preview: "analog-kick.mp3"
cable_routing:
  - source: "ENV B OUT"
    destination: "VCO A FM 1 IN"
    purpose: "Fast pitch sweep down for kick body"
  - source: "ENV A OUT"
    destination: "VCA A LEVEL MOD IN"
    purpose: "Short amplitude envelope for punch"
  - source: "ENV A OUT"
    destination: "VCF FM 1 IN"
    purpose: "Filter click on attack for transient snap"
knob_settings:
  VCO A:
    - control: "OCTAVE"
      value: "2"
    - control: "Waveform"
      value: "Sine"
  VCF:
    - control: "FREQ"
      value: "9 o'clock"
    - control: "Q"
      value: "10 o'clock"
    - control: "MODE"
      value: "LP4"
    - control: "FM 1"
      value: "3 o'clock"
  Envelope A:
    - control: "A (Attack)"
      value: "full CCW"
    - control: "D (Decay)"
      value: "10 o'clock"
    - control: "S (Sustain)"
      value: "full CCW"
    - control: "R (Release)"
      value: "9 o'clock"
    - control: "ENVELOPE SPEED"
      value: "Fast"
  Envelope B:
    - control: "RISE"
      value: "full CCW"
    - control: "FALL"
      value: "9 o'clock"
    - control: "MODE SELECT"
      value: "ENV"
    - control: "TYPE SELECT"
      value: "AD"
---

# Analog Kick

> [!tip] Playing Tips
> Use Push Gate for triggering -- tap it for consistent kick hits. Short Envelope B decay controls the pitch sweep depth and character. Shorter FALL = tighter kick, longer FALL = more boomy. Try adjusting VCO A FM 1 slider to control how dramatic the pitch sweep is. Set Envelope A to Fast speed for the punchiest transient.

## Notes

Classic analog kick drum synthesis: a sine wave with a fast downward pitch sweep. Envelope B in AD mode creates a rapid pitch transient -- the oscillator starts high and swoops down to its base frequency, creating the characteristic "thump" of an analog kick. Envelope A handles both the amplitude (via VCA A) and adds a filter click by opening the VCF briefly on the attack. The LP4 filter removes any unwanted high harmonics. Keep VCO A at octave 2 for sub-heavy kicks; try octave 3 for more mid-present kicks that cut through a mix.
