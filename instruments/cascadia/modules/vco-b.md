---
type: module
instrument: cascadia
title: "VCO B"
manufacturer: "Intellijel"
category: sound-source
control_count: 5
jack_count: 6
has_normals: true
---

# VCO B

## Purpose

VCO B is Cascadia's secondary oscillator, providing both additional audio-rate tone generation and LFO-rate modulation. It outputs four simultaneous waveforms (sine, triangle, saw, square) and is normalled to VCO A's FM 2 and SYNC inputs.

## What Makes It Special

The VCO/LFO switch makes VCO B uniquely versatile -- it can serve as either a second voice or as a complex modulation source at 1/1000th its normal frequency range (cycles as slow as ~50 seconds). This dual identity is central to Cascadia's design: with one switch flip, your detuned second oscillator becomes a slow modulator for FM, filter sweeps, or waveshaping depth. Four simultaneous waveform outputs mean you can use VCO B's sine for FM while simultaneously patching its square wave as a clock source, without any signal splitting.

The PITCH SOURCE switch determines whether VCO B tracks VCO A's pitch (PITCH A+B mode, for intervals and detuning) or runs independently (PITCH B mode, for fixed-pitch drones or modulation).

## Controls

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| OCTAVE | Selector (8-pos) | 8 octaves | Coarse tuning, one octave per click |
| PITCH | Knob | +/- 6 semitones | Fine tuning. Surrounded by 4 calibration trim pots |
| VCO/LFO | Switch (2-pos) | VCO / LFO | VCO = audio rates. LFO = 1/1000 frequency (~50 second cycles) |
| PITCH SOURCE | Switch (2-pos) | PITCH A+B / PITCH B | A+B: tracks VCO A pitch + own PITCH IN. B: independent pitch |
| RATE LED | LED | -- | Visual rate indicator. Orange at audio rates, red/green cycling at LFO rates |

## Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| PITCH IN | Input | Depends on PITCH SOURCE switch | In PITCH A+B mode: follows VCO A pitch. In PITCH B mode: independent 1V/oct input |
| SYNC IN | Input | None | Hard sync input -- VCO B syncs to the incoming waveform |
| SINE OUT | Output | VCO A FM 2 IN, Ring Mod IN 2 | Sine wave output. Primary FM modulator source |
| TRIANGLE OUT | Output | None | Triangle wave output |
| SAW OUT | Output | VCO A SYNC IN | Saw wave output. Used as default sync source for VCO A |
| SQUARE OUT | Output | None | Square wave output |

## LEDs

RATE LED shows the triangle core oscillation rate. At audio rates it appears orange. In LFO mode, green indicates positive voltage, red indicates negative, and brightness shows amplitude.

## Normalled Connections

- **SINE OUT** normalled to VCO A FM 2 IN (providing the default FM modulator) and to Ring Mod IN 2
- **SAW OUT** normalled to VCO A SYNC IN (providing the default sync source)
- **PITCH IN** in PITCH A+B mode normalled from VCO A's pitch input, so both oscillators track together
