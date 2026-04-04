---
name: "FM Lead"
type: lead
session_origin: null
description: "Metallic FM lead using VCO B as modulator into VCO A through-zero FM with bandpass filtering."
tags: [lead, fm, metallic, tzfm, complex, cascadia]
instrument: cascadia
created: "2026-03-31"
audio_preview: "fm-lead.mp3"
cable_routing:
  - source: "VCO B SINE OUT"
    destination: "VCO A FM 1 IN"
    purpose: "FM carrier-modulator pair for metallic timbres"
  - source: "ENV A OUT"
    destination: "VCF FM 1 IN"
    purpose: "Filter envelope shapes spectral content per note"
  - source: "ENV B OUT"
    destination: "VCO A IM IN"
    purpose: "Envelope controls FM depth over time"
  - source: "LFO X OUT"
    destination: "VCO B FM 1 IN"
    purpose: "Slow modulator vibrato for timbral shimmer"
knob_settings:
  VCO A:
    - control: "OCTAVE"
      value: "5"
    - control: "TZFM/EXP"
      value: "TZFM"
    - control: "AC/DC"
      value: "AC"
    - control: "FM 1"
      value: "1 o'clock"
  VCO B:
    - control: "OCTAVE"
      value: "6"
    - control: "Waveform"
      value: "Sine"
  VCF:
    - control: "FREQ"
      value: "2 o'clock"
    - control: "Q"
      value: "10 o'clock"
    - control: "MODE"
      value: "BP2"
    - control: "FM 1"
      value: "1 o'clock"
  Envelope B:
    - control: "RISE"
      value: "full CCW"
    - control: "FALL"
      value: "11 o'clock"
    - control: "MODE SELECT"
      value: "ENV"
    - control: "TYPE SELECT"
      value: "AHR"
  LFO X/Y/Z:
    - control: "RATE"
      value: "9 o'clock"
---

# FM Lead

> [!tip] Playing Tips
> Play in the C3-C5 range for the best FM character. The ratio between VCO A (octave 5) and VCO B (octave 6) creates a 1:2 carrier-to-modulator ratio -- classic FM bell tones. Try changing VCO B's octave for different harmonic ratios: octave 7 gives 1:4 (brighter), octave 5 gives 1:1 (more dissonant). The AC coupling keeps FM timbres pitch-accurate across the keyboard.

## Notes

This patch demonstrates through-zero FM synthesis using Cascadia's analog TZFM circuit. VCO B's sine wave is patched to VCO A's FM 1 input for the primary FM modulation, while Envelope B is patched to VCO A's IM input to control the FM depth dynamically -- the metallic harmonics swell with each note and then decay. The ENV A cable to VCF FM 1 overrides the normalled Envelope B, giving independent filter and FM depth envelopes. The bandpass filter (BP2) emphasizes the midrange harmonics created by FM, and the LFO on VCO B's pitch creates subtle timbral shimmer as the modulator frequency drifts.
