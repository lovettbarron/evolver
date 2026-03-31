---
type: module
instrument: cascadia
title: "Mixer"
manufacturer: "Intellijel"
category: utility
control_count: 8
jack_count: 7
has_normals: true
---

# Mixer

## Purpose

Blends multiple sound sources into a single output that feeds the VCF. Combines VCO A's pulse and saw waveforms, a sub-oscillator, a noise generator, and two patchable external inputs. Also provides direct outputs for VCO A's waveforms and noise.

## What Makes It Special

The Mixer goes well beyond simple signal combining. The sub-oscillator is derived from VCO A's pulse wave and offers three flavors: one octave down (SUB -1), two octaves down (SUB -2), or a 75% duty-cycle pulse two octaves down (OR mode, which is the logical OR of SUB -1 and -2). The noise generator offers three selectable types plus four switchable ALT digital noise sources (Cymbal, Crunch, Crackle, Velvet -- each with three variations), accessed via button combinations with the Push Gate. Soft clipping rounds off the mixer output for warmer overdrive character compared to hard clipping.

The two external inputs (IN 1 and IN 2) have useful normals: IN 1 defaults to the Ring Modulator output, and IN 2 defaults to VCO A's sine wave -- so even without patching, these sources are available at their sliders.

## Controls

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| IN 1 | Slider | 0-100% | Level for MIXER IN 1 jack. Normalled from Ring Mod output |
| IN 2 | Slider | 0-100% | Level for MIXER IN 2 jack. Normalled from VCO A sine wave |
| PULSE | Slider | 0-100% | VCO A pulse wave level in mix |
| SAW | Slider | 0-100% | VCO A saw wave level in mix |
| SUB | Slider | 0-100% | Sub-oscillator level. Pitch and shape set by SUB TYPE switch |
| NOISE | Slider | 0-100% | Noise level. Type selected by NOISE TYPE switch |
| SUB TYPE | Switch (3-pos) | SUB -1 / OR / SUB -2 | -1: square 1 oct down. -2: square 2 oct down. OR: pulse 2 oct down (75% duty) |
| NOISE TYPE | Switch (3-pos) | WHITE / PINK / ALT | White: equal energy per freq. Pink: equal energy per octave. ALT: digital noise (4 types x 3 variations) |

## Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| MIXER IN 1 | Input | Ring Mod OUT | External signal input 1. Level set by IN 1 slider |
| MIXER IN 2 | Input | VCO A SINE | External signal input 2. Level set by IN 2 slider |
| VCO A TRI OUT | Output | None | Direct triangle wave output of VCO A |
| VCO A SAW OUT | Output | None | Direct, unattenuated saw output of VCO A |
| VCO A PULSE OUT | Output | None | Direct, unattenuated pulse output of VCO A |
| NOISE OUT | Output | None | Direct, unattenuated noise output (type per NOISE TYPE switch) |
| MIXER OUT | Output | VCF IN | Mixed output of all sources. Normalled to VCF input |

## LEDs

SOFT CLIP LED monitors the mixer output level. Red indicates clipping; engaging SOFT CLIP reduces peak-to-peak voltage and the LED goes out.

## Normalled Connections

- **MIXER IN 1** normalled from Ring Mod output. Patching overrides with your signal.
- **MIXER IN 2** normalled from VCO A sine wave. Patching overrides with your signal.
- **MIXER OUT** normalled to VCF IN. The entire mixer output feeds the filter by default.
