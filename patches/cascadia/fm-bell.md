---
name: "FM Bell"
type: lead
session_origin: 5
description: "A clean metallic bell tone using through-zero FM synthesis. VCO B's sine wave modulates VCO A at a 4:1 ratio, producing pitch-stable bell harmonics with natural decay."
tags: [fm, bell, metallic, curriculum, oscillators, beginner]
instrument: cascadia
created: "2026-04-01"
audio_preview: "fm-bell.mp3"
cable_routing: []
knob_settings:
  VCO A:
    - control: "INDEX"
      value: "1 o'clock"
    - control: "TZFM/EXP"
      value: "TZFM"
    - control: "AC/DC"
      value: "AC"
    - control: "SYNC TYPE"
      value: "Off"
    - control: "OCTAVE"
      value: "position 4"
    - control: "PITCH"
      value: "noon"
  VCO B:
    - control: "OCTAVE"
      value: "position 6 (2 above VCO A)"
    - control: "PITCH"
      value: "noon"
    - control: "PITCH SOURCE"
      value: "PITCH A+B"
    - control: "VCO/LFO"
      value: "VCO"
  Envelope A:
    - control: "A (Attack)"
      value: "7 o'clock"
    - control: "D (Decay)"
      value: "noon"
    - control: "S (Sustain)"
      value: "7 o'clock"
    - control: "R (Release)"
      value: "11 o'clock"
    - control: "ENVELOPE SPEED"
      value: "Fast"
    - control: "HOLD POSITION"
      value: "Off"
  Mixer:
    - control: "SAW"
      value: "noon"
  VCF:
    - control: "FREQ"
      value: "2 o'clock"
    - control: "FM 1"
      value: "7 o'clock"
  Wave Folder:
    - control: "FOLD"
      value: "7 o'clock"
  Output Control:
    - control: "MAIN LEVEL"
      value: "noon"
    - control: "MAIN DRIVE"
      value: "noon"
---

# FM Bell

A clean, metallic bell tone built entirely from Cascadia's normalled FM connection -- zero cables required. VCO B's sine wave modulates VCO A's frequency through the through-zero FM circuit at a 4:1 frequency ratio, producing harmonically predictable sidebands that ring out like a struck bell. The TZFM mode with AC coupling keeps the pitch locked and stable across the keyboard, giving you bell tones that play chromatically without the pitch drift common in analog FM.

The fast envelope with zero sustain creates the natural struck-bell articulation: an instant attack followed by a smooth decay. Lower notes produce deep, gong-like resonances while higher notes give glassy, crystalline chimes.

## How to Play

Play staccato notes in the C4-C6 range for the clearest bell tones. Each note should ring out and decay naturally thanks to the zero-sustain envelope. Try playing simple melodies -- the bell character gives each note a distinct, percussive quality that works well for melodic lines.

For gong-like timbres, play in the C2-C3 range. The lower fundamental frequency produces deeper, more complex sideband patterns that evolve as they decay. For maximum shimmer, play in the C5-C6 range where the sidebands are bright and crystalline.

Try playing two notes a perfect fifth apart (C4 and G4) simultaneously -- the FM sidebands interact to create a rich, shimmering chord.

## What Makes It Work

The core of this patch is the normalled connection from **VCO B Sine to VCO A FM 2 IN**. VCO B's pure sine wave is the ideal FM modulator -- its single frequency creates the cleanest possible sideband pattern. The INDEX slider at 1 o'clock sets the modulation depth high enough to produce several bright sidebands without overwhelming the fundamental.

**Through-zero FM (TZFM)** with **AC coupling** is the critical combination. TZFM allows VCO A's frequency to pass through zero and reverse direction, producing symmetrical sidebands that track pitch accurately. AC coupling blocks VCO B's DC offset from shifting VCO A's center frequency, keeping the bell tone in tune with the played note. Exponential FM would produce similar harmonics but with increasing pitch drift at higher modulation depths.

The **4:1 frequency ratio** (VCO B two octaves above VCO A) creates widely spaced, harmonically related sidebands -- the characteristic of musical bell tones. A 1:1 ratio would produce denser, more metallic tones; non-integer ratios create inharmonic, clangy timbres.

**Envelope A** at Fast speed with zero attack and sustain creates the struck-bell articulation. The decay at noon gives approximately 0.5 seconds of ring time, and the release at 11 o'clock ensures notes die away smoothly when released.

## Created In

[Session 05: VCO B, FM Synthesis & Sync](/instruments/cascadia/sessions/05)
