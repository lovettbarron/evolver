---
name: "Auto-Wah FX"
type: fx
session_origin: null
description: "Auto-wah effect using LFO-modulated bandpass filter with high resonance for external audio processing."
tags: [fx, auto-wah, filter, lfo, external-audio, cascadia]
instrument: cascadia
created: "2026-03-31"
audio_preview: "auto-wah-fx.mp3"
cable_routing:
  - source: "LFO X OUT"
    destination: "VCF FM 1 IN"
    purpose: "LFO drives the wah sweep across the frequency range"
  - source: "LINE IN OUT"
    destination: "MIXER IN 2"
    purpose: "External audio input routed into the signal chain"
  - source: "ENV A OUT"
    destination: "VCF FM 3 IN"
    purpose: "Envelope follower effect adds dynamics-responsive filter sweep"
knob_settings:
  VCF:
    - control: "FREQ"
      value: "12 o'clock"
    - control: "Q"
      value: "2 o'clock"
    - control: "MODE"
      value: "BP4"
    - control: "FM 1"
      value: "3 o'clock"
    - control: "FM 3"
      value: "1 o'clock"
  Mixer:
    - control: "SAW"
      value: "full CCW"
    - control: "PULSE"
      value: "full CCW"
    - control: "IN 2"
      value: "full CW"
  LFO X/Y/Z:
    - control: "RATE"
      value: "11 o'clock"
---

# Auto-Wah FX

> [!tip] Playing Tips
> Feed external audio through the rear panel LINE IN jack for processing. Adjust Q for wah intensity -- higher values give a more vocal, resonant sweep. Works great with guitar, drum loops, or other synth outputs. LFO X RATE controls the wah speed -- set it to match your tempo. Try different VCF MODE positions: BP4 for classic wah, LP4 for a subtler sweep, PHZR for phaser-like effects.

## Notes

This patch turns Cascadia into an external audio processor. The internal oscillators are silenced by turning Mixer SAW and PULSE to zero, and external audio from the LINE IN module is routed through Mixer IN 2 into the VCF. The LFO X drives the primary wah sweep via VCF FM 1, overriding the normalled Envelope B connection. The BP4 bandpass filter with high resonance creates the classic wah-wah vowel sound as it sweeps across the frequency spectrum. The Envelope A connection to FM 3 adds a dynamics-responsive element -- louder passages push the filter higher, softer passages let it settle, mimicking how a real wah pedal responds to playing dynamics.
