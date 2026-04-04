---
name: "Ring Mod FX"
type: fx
session_origin: null
description: "Ring modulation effect using VCO B as carrier against external input for metallic and bell-like tones."
tags: [fx, ring-mod, metallic, external-audio, carrier, cascadia]
instrument: cascadia
created: "2026-03-31"
audio_preview: "ring-mod-fx.mp3"
cable_routing:
  - source: "LINE IN OUT"
    destination: "MIXER IN 2"
    purpose: "External audio input as ring mod signal source"
  - source: "VCO B SINE OUT"
    destination: "VCA/LPF B CV IN"
    purpose: "Ring modulation carrier signal via VCA B amplitude modulation"
  - source: "LFO X OUT"
    destination: "VCO B FM 1 IN"
    purpose: "Slow carrier frequency drift for evolving ring mod character"
  - source: "ENV A OUT"
    destination: "VCF FM 1 IN"
    purpose: "Filter envelope shapes ring mod output spectrum"
knob_settings:
  VCO B:
    - control: "OCTAVE"
      value: "5"
    - control: "Waveform"
      value: "Sine"
  VCF:
    - control: "FREQ"
      value: "2 o'clock"
    - control: "MODE"
      value: "LP4"
    - control: "FM 1"
      value: "11 o'clock"
  Mixer:
    - control: "SAW"
      value: "full CCW"
    - control: "PULSE"
      value: "full CCW"
    - control: "IN 2"
      value: "2 o'clock"
  LFO X/Y/Z:
    - control: "RATE"
      value: "8 o'clock"
---

# Ring Mod FX

> [!tip] Playing Tips
> VCO B OCTAVE controls the character of the ring modulation. Lower octaves (2-3) give tremolo-like amplitude effects. Higher octaves (5-7) give metallic, bell-like, and robotic tones. Try switching VCO B between Sine and Triangle waveforms for different harmonic content in the modulation. Feed guitar, vocals, or drum loops through LINE IN for dramatic transformation.

## Notes

This patch uses VCO B as a ring modulation carrier. The external audio enters via LINE IN to Mixer IN 2 (with internal oscillators silenced), passes through the signal chain, and is processed by VCA B with VCO B's sine wave as the CV input. Ring modulation multiplies two signals together, producing sum and difference frequencies -- when the carrier (VCO B) is at audio rates, the result is the characteristic metallic, inharmonic tones associated with ring mod effects. The LFO X drift on VCO B's pitch means the ring mod frequencies shift slowly over time, creating an evolving, alien quality. The LP4 filter on the output tames the harsh upper harmonics that ring mod can produce.
