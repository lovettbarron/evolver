---
type: module
instrument: cascadia
title: "VCA A"
manufacturer: "Intellijel"
category: utility
control_count: 3
jack_count: 3
has_normals: true
---

# VCA A

## Purpose

VCA A is Cascadia's primary voltage-controlled amplifier. It shapes the amplitude of the audio signal over time, controlled by Envelope A through normalling. It is the final gain stage before the output section.

## What Makes It Special

VCA A is a unity-gain linear VCA with an auxiliary input, allowing two signals to be summed before amplification. The AUX IN is normalled from the Wave Folder output, so the default signal path includes both the VCF output (via VCA IN) and the wave-folded signal (via AUX IN) -- you control the wave folder's presence in the mix with the AUX IN slider without needing a separate mixer.

The LEVEL MOD input accepts CV for amplitude modulation and is normalled from Envelope A, creating the standard "envelope shapes volume" behavior. The LEVEL slider sets the base bias -- with it fully up, the VCA passes signal at unity gain even without CV modulation. This is useful when you want the VCA always open and modulation to add tremolo on top.

Note that VCA A's output jack is physically located in the Output Control section (top of the panel), not adjacent to these controls.

## Controls

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| AUX IN | Slider | 0-100% | Sets level of signal at AUX IN jack. Normalled from Wave Folder output |
| LEVEL MOD | Slider | 0-100% | Attenuates CV at LEVEL MOD IN. Controls how much envelope (or other CV) modulates amplitude |
| LEVEL | Slider | 0 to unity gain | Base amplitude bias before modulation. Fully up = unity gain |

## Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| AUX IN | Input | Wave Folder OUT | Auxiliary audio input summed with VCA IN before amplification |
| VCA IN | Input | VCF OUT (selectable mode) | Main VCA audio input. Normalled from VCF selected output |
| LEVEL MOD IN | Input | ENV A OUT | CV input for amplitude modulation. Normalled from Envelope A |

## LEDs

No LEDs on VCA A controls. The VCA A output jack (in Output Control section) has its own level indicator.

## Normalled Connections

- **AUX IN** normalled from Wave Folder output. Raise the AUX IN slider to blend wave-folded signal into the VCA.
- **VCA IN** normalled from VCF output (the MODE-selected filter output). Patching overrides the filter connection.
- **LEVEL MOD IN** normalled from ENV A output. Envelope A shapes the amplitude of every note by default.
- **VCA A output** (in Output Control section) normalled to MAIN 1 input, feeding the final output stage.
