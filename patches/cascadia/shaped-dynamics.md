---
name: "Shaped Dynamics"
type: bass
session_origin: 7
description: "A dynamically shaped bass sound using Envelope A's ADSR to control VCA A amplitude. Velocity-responsive playing with punchy attack and controlled decay, showcasing Envelope A's Hold stage for extended peak sustain."
tags: [envelope, dynamics, vca, velocity, curriculum, envelopes, intermediate]
instrument: cascadia
created: "2026-04-01"
audio_preview: "shaped-dynamics.mp3"
cable_routing: []
knob_settings:
  Envelope A:
    - control: "A (Attack)"
      value: "8 o'clock"
    - control: "H (Hold)"
      value: "10 o'clock"
    - control: "D (Decay)"
      value: "noon"
    - control: "S (Sustain)"
      value: "10 o'clock"
    - control: "R (Release)"
      value: "11 o'clock"
    - control: "HOLD POSITION"
      value: "AHDSR"
    - control: "ENVELOPE SPEED"
      value: "Med"
    - control: "CTRL SOURCE"
      value: "Level"
  VCA A:
    - control: "LEVEL"
      value: "7 o'clock"
    - control: "LEVEL MOD"
      value: "3 o'clock"
    - control: "AUX IN"
      value: "7 o'clock"
  Mixer:
    - control: "SAW"
      value: "noon"
  VCO A:
    - control: "OCTAVE"
      value: "position 3"
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

# Shaped Dynamics

A punchy, velocity-responsive bass sound built entirely from Cascadia's normalled signal path -- zero cables required. Envelope A shapes VCA A through the normalled connection, with the AHDSR Hold stage adding a brief sustain at peak volume before the decay begins. This creates a characteristic "punch then settle" articulation that makes each note feel deliberate and weighty.

The CTRL SOURCE switch at Level means playing dynamics directly affect the envelope's peak amplitude -- hard notes are loud and present, soft notes are quiet and recessed. This is the patch that taught you how ADSR envelopes shape every note you play.

## How to Play

Play in the C2-C4 range for the best bass tone. Use varying velocity to explore the dynamics -- hard strikes produce a full, punchy attack with the Hold stage extending the peak brightness, while soft touches create a more subdued, gentle bass. The Hold stage at 10 o'clock adds approximately 200ms of peak sustain, giving each note a sense of weight before the decay takes over.

Try playing staccato eighth notes for a rhythmic bass pattern. The short release ensures notes end cleanly without running into each other. For a more sustained feel, hold notes longer and the Sustain at 10 o'clock maintains a quieter, steady tone below the initial punch.

## What Makes It Work

The core of this patch is the normalled connection from **Envelope A ENV OUT to VCA A LEVEL MOD IN**. With VCA A LEVEL at minimum and LEVEL MOD at 3 o'clock, the envelope has near-total control over the amplitude. When the envelope is at zero, you hear silence. When it peaks, you hear the full sawtooth tone.

The **AHDSR Hold stage** is what distinguishes this from a standard ADSR patch. After the fast attack reaches peak, the Hold time at 10 o'clock keeps the signal at maximum for a brief moment before the decay begins. This creates a punchier, more present attack than a plain ADSR where decay begins immediately. The Hold stage is a distinctive Cascadia feature that most synthesizer envelopes lack.

**CTRL SOURCE at Level** enables the normalled MIDI velocity -> Envelope A CTRL IN connection. Velocity scales the envelope's peak amplitude, so playing dynamics directly translate to volume dynamics. This is the foundation of expressive synthesizer playing.

The VCF is mostly open (FREQ at 2 o'clock) with no filter envelope modulation (FM 1 at minimum), isolating the amplitude shaping effect. The sawtooth through the open filter gives a rich, harmonically full bass timbre.

## Created In

[Session 07: Envelope A and VCA A](/instruments/cascadia/sessions/07)
