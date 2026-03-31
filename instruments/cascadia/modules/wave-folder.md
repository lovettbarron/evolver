---
type: module
instrument: cascadia
title: "Wave Folder"
manufacturer: "Intellijel"
category: shaper
control_count: 2
jack_count: 2
has_normals: true
---

# Wave Folder

## Purpose

Reshapes audio waveforms by folding their peaks back toward the center whenever they exceed a threshold. This creates harmonically rich, complex timbres distinct from both filtering and clipping.

## What Makes It Special

Wave folding is the signature technique of West Coast synthesis, originating with Don Buchla's designs in the 1960s. Unlike distortion (which clips peaks flat) or filtering (which removes frequencies), wave folding generates entirely new harmonic content by literally folding the waveform back on itself. The result is a shifting, otherworldly timbral sweep that becomes more complex as the fold amount increases -- each fold creates additional harmonics in a musically related pattern.

Cascadia's wave folder sits after the VCF in the normalled signal chain, meaning you can filter first and then fold -- or patch it before the filter for the opposite effect. The combination of filtering and folding in either order is a key part of Cascadia's sound design palette. The MOD input allows CV control of fold depth, enabling dynamic wave folding that tracks an envelope, LFO, or any other modulation source.

The output is normalled to both VCA A IN 1 (via the main signal path) and available as a direct output at the FOLD jack in the Output Control section.

## Controls

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| MOD | Slider | 0-100% | Attenuates the CV input at FOLD MOD IN, controlling modulation depth of fold amount |
| FOLD | Slider | 0 to max folding | Sets the base fold amount. Higher values increase gain into the fold circuit, creating more folds |

## Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| FOLD MOD IN | Input | None | CV input for modulating fold amount. Attenuated by MOD slider |
| IN | Input | VCO A SINE (via VCF) | Audio input to the fold circuit. Normalled from VCO A sine wave through the VCF path |

## LEDs

No LEDs on this module.

## Normalled Connections

- **IN** normalled from VCO A's sine wave output (via the VCF signal path). Patching into IN overrides with your own signal.
- **Output** normalled to VCA A IN 1 (the main audio path continues to the VCA). Also available directly at the FOLD output jack in the Output Control section.
