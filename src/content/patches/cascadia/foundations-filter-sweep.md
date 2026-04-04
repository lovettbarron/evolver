---
name: "Foundations Filter Sweep"
type: pad
session_origin: 3
description: "A warm filter sweep with gentle wave folding, built entirely from normalled connections. Envelope B sweeps the filter cutoff while the wave folder adds subtle harmonic complexity."
tags: [filter-sweep, envelope, wave-folding, curriculum, foundations, beginner]
instrument: cascadia
created: "2026-04-01"
audio_preview: "foundations-filter-sweep.mp3"
cable_routing: []
knob_settings:
  VCF:
    - control: "FREQ"
      value: "9 o'clock"
    - control: "Q"
      value: "10 o'clock"
    - control: "FM 1"
      value: "1 o'clock"
    - control: "MODE"
      value: "LP4"
  Envelope B:
    - control: "RISE"
      value: "10 o'clock"
    - control: "FALL"
      value: "1 o'clock"
    - control: "MODE SELECT"
      value: "ENV"
    - control: "TYPE SELECT"
      value: "AHR"
  Wave Folder:
    - control: "FOLD"
      value: "10 o'clock"
  Mixer:
    - control: "SAW"
      value: "noon"
  Output Control:
    - control: "MAIN LEVEL"
      value: "noon"
    - control: "MAIN DRIVE"
      value: "noon"
---

# Foundations Filter Sweep

A warm, evolving pad sound built entirely from Cascadia's normalled signal path -- zero cables required. Envelope B sweeps the VCF cutoff on each note, creating a gradual brightening that decays into a dark, filtered tone. The wave folder adds a touch of harmonic complexity on top, giving the sweep a subtle metallic shimmer that a standard subtractive patch would lack.

This is the sound you created in Session 3 of the Foundations module. It demonstrates how much timbral movement is possible using only Cascadia's built-in connections: an oscillator through a filter swept by an envelope, with wave folding for extra character.

## How to Play

Play sustained notes or slow chords in the C3-C5 range. Hold each note long enough to hear the full filter sweep -- the brightness rises over about half a second, then gradually decays. The effect is most pronounced on single notes where you can focus on the timbral movement. Try playing two notes a fifth apart and holding them for a slowly evolving pad texture.

For a more dramatic sweep, raise the VCF FM 1 slider further. For a subtler effect, lower it. The FOLD slider on the Wave Folder controls how much harmonic complexity is layered on top of the filter sweep.

## What Makes It Work

The core of this patch is the normalled connection from **Envelope B to VCF FM 1**. Every time you play a note, MIDI gate triggers Envelope B, which outputs a voltage curve shaped by the RISE and FALL sliders. This voltage sweeps the filter cutoff up and back down, creating the characteristic brightness-then-darkness movement.

The VCF FREQ slider sets the resting cutoff frequency (low, around 9 o'clock), so notes start dark. Envelope B pushes the cutoff higher during its rise stage, then the cutoff falls back as the envelope decays. The VCF Q at 10 o'clock adds a mild resonance bump that emphasizes the sweep frequency as it passes through, making the movement more audible.

The Wave Folder at 10 o'clock adds harmonics to the already-filtered signal. Because the wave folder sits after the VCF in Cascadia's signal chain, it folds a signal that is already spectrally shaped -- this creates a warmer, more controlled folding effect than folding a raw oscillator would produce.

## Created In

[Session 03: Filter Envelope, Wave Folding, FM & FX](/instruments/cascadia/sessions/03)
