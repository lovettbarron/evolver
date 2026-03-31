---
name: "Searing Lead"
type: lead
session_origin: null
description: "Bright, cutting lead with wave folding for harmonic richness and sharp filter attack."
tags: [lead, bright, wave-folder, aggressive, cascadia]
instrument: cascadia
created: "2026-03-31"
audio_preview: "searing-lead.mp3"
cable_routing:
  - source: "ENV B OUT"
    destination: "VCF FM 1 IN"
    purpose: "Sharp filter attack for cutting transients"
  - source: "ENV B OUT"
    destination: "FOLD MOD IN"
    purpose: "Dynamic wave folding intensity on note attack"
  - source: "LFO Y OUT"
    destination: "VCO A FM 1 IN"
    purpose: "Subtle pitch vibrato for expressiveness"
knob_settings:
  VCO A:
    - control: "OCTAVE"
      value: "5"
    - control: "Waveform"
      value: "Saw"
  VCF:
    - control: "FREQ"
      value: "1 o'clock"
    - control: "Q"
      value: "11 o'clock"
    - control: "MODE"
      value: "LP4"
    - control: "FM 1"
      value: "2 o'clock"
  Wave Folder:
    - control: "MOD"
      value: "2 o'clock"
    - control: "FOLD"
      value: "1 o'clock"
  Envelope B:
    - control: "RISE"
      value: "full CCW"
    - control: "FALL"
      value: "10 o'clock"
    - control: "MODE SELECT"
      value: "ENV"
    - control: "TYPE SELECT"
      value: "AD"
---

# Searing Lead

> [!tip] Playing Tips
> Play in the C4-C6 range for maximum cut-through. The Envelope B AD shape means the filter and fold intensity spike on each note attack and then decay -- play staccato for percussive brightness or legato for smoother sustain. Adjust the Wave Folder FOLD slider to control how aggressive the harmonics get.

## Notes

This patch uses Envelope B in AD mode to simultaneously control both the VCF cutoff and Wave Folder modulation depth. The cable to VCF FM 1 overrides the normalled Envelope B connection, but since we are patching Envelope B back to the same destination, the effect is the same -- except now we also split it to the Wave Folder's FOLD MOD input. This creates a characteristic "searing" quality where each note attack explodes with harmonics from both the filter opening and the waveform folding, then settles into a darker sustained tone. The LFO Y vibrato on VCO A pitch adds expressiveness typical of lead patches.
