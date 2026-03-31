---
type: module
instrument: cascadia
title: "Output Control"
manufacturer: "Intellijel"
category: utility
control_count: 3
jack_count: 5
has_normals: true
---

# Output Control

## Purpose

The final output stage of Cascadia. Sums up to two input signals, applies drive and soft clipping, and controls the master output level sent to the MAIN OUT jack, rear panel LINE OUT, and rear panel PHONES OUT.

## What Makes It Special

Output Control provides direct access to both the Wave Folder output (FOLD jack) and VCA A output (VCA A jack) before they reach the summing stage. This means you can tap these signals for parallel processing or external recording while they continue through the main signal path.

The MAIN DRIVE knob adds gain that can push the output into distortion, while the SOFT CLIP switch rounds off the clipping for a warmer overdrive character (similar to the Mixer's soft clip, but applied to the final output). The two-input summing (MAIN 1 + MAIN 2) allows blending the main signal path with a secondary source -- for example, patching VCA B/LPF output into MAIN 2 to blend the Low Pass Gate signal with the primary voice.

## Controls

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| MAIN DRIVE | Knob | Unity to overdrive | Gain stage before output. High values drive into distortion |
| SOFT CLIP | Switch (2-pos) | On / Off | Rounds off clipped signal for warmer distortion character |
| MAIN LEVEL | Knob | 0-100% | Master output volume. Controls MAIN OUT, LINE OUT, and PHONES OUT simultaneously |

## Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| FOLD OUT | Output | None | Direct output of the Wave Folder section |
| VCA A OUT | Output | MAIN 1 IN | Direct output of VCA A. Normalled to MAIN 1 input |
| MAIN 1 IN | Input | VCA A OUT | First summing input. Normalled from VCA A output |
| MAIN 2 IN | Input | None | Second summing input. Summed with MAIN 1 before drive/clip/level |
| MAIN OUT | Output | None | Final output after drive, soft clip, and level. Also drives rear LINE OUT and PHONES OUT |

## LEDs

No LEDs on Output Control (signal monitoring relies on the headphone output and external metering).

## Normalled Connections

- **MAIN 1 IN** normalled from VCA A output. The primary signal path (oscillator -> mixer -> filter -> wave folder -> VCA A) reaches the output with zero cables.
- Patching into MAIN 1 IN overrides the VCA A connection, allowing you to substitute any signal as the main output source.
