---
type: module
instrument: cascadia
title: "FX Send/Return"
manufacturer: "Intellijel"
category: utility
control_count: 5
jack_count: 2
has_normals: false
---

# FX Send/Return

## Purpose

Integrates external effects pedals and stompboxes into Cascadia's signal chain. Audio patched into the FX SEND input is routed to the rear panel SEND jack, processed by an external device, returned via the rear panel RETURN jack, and made available at the FX MIX output with adjustable dry/wet blend.

## What Makes It Special

Unlike a simple effects loop at the output, Cascadia's FX Send/Return can be patched anywhere in the signal chain. You can insert effects between the mixer and filter, between the filter and VCA, or anywhere else -- just patch the signal you want to process into FX SEND, then patch FX MIX into the next stage. This flexibility means your favorite fuzz pedal or reverb becomes part of the modular signal flow, not just a post-output effect.

The LINE/PEDAL level switch handles impedance matching between pro-level rack effects (line level) and guitar pedals (instrument level). The PHASE switch corrects for pedals that invert phase, which matters when blending dry and wet signals with the DRY/WET knob. The rear panel RETURN jack also features a Class A triode emulator, allowing direct guitar or piezo pickup input with clean-to-tube-like warmth.

## Controls

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| FX SEND LEVEL | Knob | 0-100% | Output level to rear panel SEND jack |
| SEND LEVEL | Switch (2-pos) | LINE / PEDAL | LINE for pro effects. PEDAL/INST for guitar pedals |
| PHASE | Switch (2-pos) | Normal / Inverted | Inverts return signal phase. Use if FX pedal inverts phase |
| FX RETURN LEVEL | Knob | 0-100% | Input level from rear panel RETURN jack. LED indicates overdrive |
| DRY/WET FX MIX | Knob | Full dry to full wet | Blends original (dry) signal with processed (wet) return. Noon = equal mix |

## Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| FX SEND | Input | None | Audio to send to external effects via rear SEND jack. Level set by FX SEND LEVEL |
| FX MIX | Output | None | Dry/wet mix of original and returned signals. Patch back into Cascadia signal flow |

## LEDs

FX RETURN LEVEL LED lights when the returned signal is overdriving the input -- reduce RETURN LEVEL knob to avoid distortion.

## Normalled Connections

No normalled connections. Both FX SEND input and FX MIX output must be manually patched to insert effects into the signal chain.
