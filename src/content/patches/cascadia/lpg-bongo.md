---
name: "LPG Bongo"
type: drum
session_origin: 9
description: "A natural, woody bongo percussion sound using VCA B/LPF as a Low Pass Gate. A short envelope simultaneously controls amplitude and filter cutoff, creating the classic coupled decay where brightness and volume die together."
tags: [lpg, bongo, percussion, low-pass-gate, west-coast, drum, curriculum, envelopes, intermediate]
instrument: cascadia
created: "2026-04-01"
audio_preview: "lpg-bongo.mp3"
cable_routing:
  - source: "VCO A SAW OUT"
    destination: "VCA B IN"
    purpose: "Route raw sawtooth to Low Pass Gate (overrides Ring Mod normalling)"
  - source: "Envelope A ENV OUT"
    destination: "VCA/LPF B CV IN"
    purpose: "Short envelope controls LPG amplitude and filter (overrides +5V normalling)"
knob_settings:
  Envelope A:
    - control: "A (Attack)"
      value: "7 o'clock"
    - control: "H (Hold)"
      value: "7 o'clock"
    - control: "D (Decay)"
      value: "9 o'clock"
    - control: "S (Sustain)"
      value: "7 o'clock"
    - control: "R (Release)"
      value: "8 o'clock"
    - control: "HOLD POSITION"
      value: "Off"
    - control: "ENVELOPE SPEED"
      value: "Fast"
    - control: "CTRL SOURCE"
      value: "Level"
  VCA B / LPF:
    - control: "CV AMOUNT"
      value: "2 o'clock"
    - control: "VCA CONTROL"
      value: "UP (VCA+LPF / LPG mode)"
  VCO A:
    - control: "OCTAVE"
      value: "position 3"
    - control: "PITCH"
      value: "noon"
  Mixer:
    - control: "SAW"
      value: "noon"
  VCF:
    - control: "FREQ"
      value: "noon"
  Wave Folder:
    - control: "FOLD"
      value: "7 o'clock"
  Output Control:
    - control: "MAIN LEVEL"
      value: "noon"
    - control: "MAIN DRIVE"
      value: "noon"
---

# LPG Bongo

A natural, woody percussion sound created by sending VCO A's sawtooth wave through Cascadia's VCA B/LPF operating as a Low Pass Gate. A fast Envelope A strike simultaneously opens the VCA and the filter, then both close together as the envelope decays -- volume and brightness die in lockstep, producing the organic, acoustic-like transient that defines West Coast percussion.

This is the classic "Buchla bongo" adapted to Cascadia's architecture. The 4-pole ladder filter in VCA B/LPF adds a slight resonant emphasis at the cutoff frequency as it closes, giving each strike a subtle tonal character that a simple VCA cannot produce.

## How to Play

Play short, staccato notes in the C2-C3 range for the deepest bongo tones. Each note should produce a brief, woody "bonk" that decays naturally within about 200ms. The velocity response (via CTRL SOURCE at Level) means harder strikes produce louder, brighter bongos while soft taps give quieter, darker hits.

For a floor-tom character, drop VCO A OCTAVE to position 2. For a higher woodblock click, raise to position 4. The sweet spot for classic bongo is position 3.

Try playing rapid alternating notes at different velocities for a realistic hand-drum pattern. The fast envelope and LPG response create convincing percussion articulation from a simple sawtooth oscillator.

## What Makes It Work

The core technique is routing audio through **VCA B/LPF with VCA CONTROL set to UP (LPG mode)**. In this mode, the CV input simultaneously controls both the VCA amplitude and the 4-pole low-pass filter cutoff. A single envelope controls everything -- when the envelope peaks, the signal is loud and bright; when it decays, the signal gets quieter and darker together.

**Cable 1 (VCO A SAW OUT -> VCA B IN)** overrides the normalled Ring Mod -> VCA B connection, routing a raw sawtooth wave into the LPG. The sawtooth provides rich harmonics for the filter to shape during the strike transient.

**Cable 2 (Envelope A ENV OUT -> VCA/LPF B CV IN)** overrides the normalled +5V DC, replacing the constant voltage with a dynamic envelope. Without this cable, the CV AMOUNT knob would just act as a manual volume control.

**Envelope A at Fast speed** with zero attack, short decay (9 o'clock, approximately 15ms), zero sustain, and very short release creates the sharp, percussive strike. The envelope peaks instantly, then decays quickly -- the LPG translates this into a bright "bonk" that darkens and fades in one smooth motion.

The **CV AMOUNT at 2 o'clock** sets how much the envelope opens the VCA and filter. Higher values produce louder, brighter strikes; lower values create softer, darker hits. This is effectively the "strike intensity" control.

## Created In

[Session 09: VCA B, Low Pass Gate & Mixer Dynamics](/instruments/cascadia/sessions/09)
