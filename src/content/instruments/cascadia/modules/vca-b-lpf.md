---
type: module
instrument: cascadia
title: "VCA B / LPF"
manufacturer: "Intellijel"
category: shaper
control_count: 3
jack_count: 4
has_normals: true
---

# VCA B / LPF

## Purpose

A combined voltage-controlled amplifier and 4-pole ladder low-pass filter that can operate independently or together as a Low Pass Gate (LPG). Provides a second VCA and an additional filter beyond the main VCF.

## What Makes It Special

The Low Pass Gate configuration is a hallmark of West Coast synthesis, pioneered by Don Buchla. An LPG simultaneously controls both amplitude and brightness with a single CV source -- as a note gets louder, it also gets brighter (higher cutoff frequency), mimicking the natural behavior of acoustic instruments where louder sounds contain more harmonics. Cascadia implements this by linking the VCA and LPF to the same CV input when the VCA CONTROL switch is in the UP position.

When the VCA CONTROL switch is DOWN, the VCA runs at full gain and only the LPF responds to CV, giving you a standalone voltage-controlled filter with a different character than the main VCF (4-pole ladder diode topology vs. the main VCF's multimode design).

The input is normalled from the Ring Modulator output, so VCA B/LPF can process ring-modulated signals without any patching -- just send a CV to shape the dynamics.

## Controls

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| CV AMOUNT | Knob | Fully closed to fully open | Attenuates CV input. Acts as manual frequency/volume control when using normalled +5V DC |
| CV LEVEL LED | LED | -- | Brightness = CV level post-attenuator. Green = positive, Red = negative |
| VCA CONTROL | Switch (2-pos) | VCA+LPF (up) / LPF only (down) | Up: CV controls both VCA amplitude and LPF cutoff (LPG mode). Down: CV controls only LPF cutoff |

## Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| VCA B IN | Input | RINGMOD OUT | Audio input to VCA B. Signal is amplified then split to VCA B OUT and through LPF to LPF B OUT |
| VCA/LPF B CV IN | Input | +5V DC | CV for LPF cutoff (and VCA amplitude if VCA CONTROL = up). Normalled to +5V, making CV AMOUNT a manual control |
| VCA B OUT | Output | None | Direct VCA B output (pre-filter) |
| LPF B OUT | Output | None | Output of the 4-pole ladder low-pass filter (post-VCA) |

## LEDs

CV LEVEL LED shows the post-attenuator control voltage level. Brightness indicates amplitude; green for positive, red for negative.

## Normalled Connections

- **VCA B IN** normalled from RINGMOD OUT. Ring-modulated signal is available at VCA B without patching.
- **VCA/LPF B CV IN** normalled to +5V DC. The CV AMOUNT knob acts as a manual cutoff/volume control with no cable patched. Patch an envelope or LFO here for dynamic control.
