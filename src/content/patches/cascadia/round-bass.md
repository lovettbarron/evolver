---
name: "Round Bass"
type: bass
session_origin: null
description: "Warm, round bass using both VCOs slightly detuned through a gentle LP2 filter."
tags: [bass, warm, detuned, dual-oscillator, cascadia]
instrument: cascadia
created: "2026-03-31"
audio_preview: "round-bass.mp3"
cable_routing:
  - source: "VCO B SAW OUT"
    destination: "MIXER IN 2"
    purpose: "Adds second oscillator to the mix for thickness"
  - source: "LFO Z OUT"
    destination: "VCO B FM 1 IN"
    purpose: "Slow detune drift between the two oscillators"
  - source: "ENV A OUT"
    destination: "VCF FM 1 IN"
    purpose: "Filter envelope for each note attack"
knob_settings:
  VCO A:
    - control: "OCTAVE"
      value: "4"
  VCO B:
    - control: "OCTAVE"
      value: "4"
    - control: "PITCH"
      value: "+3 cents sharp"
  VCF:
    - control: "FREQ"
      value: "11 o'clock"
    - control: "MODE"
      value: "LP2"
    - control: "FM 1"
      value: "1 o'clock"
  Mixer:
    - control: "SAW"
      value: "2 o'clock"
    - control: "IN 2"
      value: "1 o'clock"
---

# Round Bass

> [!tip] Playing Tips
> Play monophonic lines in the C2-C3 range. The slight detuning between VCO A and VCO B creates a natural chorus effect. Adjust VCO B PITCH for more or less beating. The LP2 filter mode keeps the bass warm without the aggressive rolloff of LP4.

## Notes

This patch uses VCO B's saw wave patched into Mixer IN 2, breaking the normalled VCO A sine connection on that input. VCO A's saw wave is mixed via the default Mixer SAW slider. The two oscillators are set to the same octave with VCO B tuned slightly sharp for a gentle beating/chorus effect. The LFO Z drift on VCO B's pitch adds organic movement -- the detuning amount shifts slowly over time rather than staying static. The LP2 filter mode gives a gentler rolloff that preserves more low-end harmonics than LP4.
