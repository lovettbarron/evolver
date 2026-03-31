---
type: module
instrument: cascadia
title: "VCF"
manufacturer: "Intellijel"
category: shaper
control_count: 8
jack_count: 8
has_normals: true
---

# VCF

## Purpose

Cascadia's multimode voltage-controlled filter shapes the spectral content of the audio signal. It provides 8 filter types through a rotary MODE selector, three dedicated FM inputs for frequency modulation, and a resonance modulation input. Three simultaneous outputs (LP4, HP4, and the selectable MODE output) are always available.

## What Makes It Special

Most semi-modular synths offer one or two filter types. Cascadia's VCF provides eight: three low-pass slopes (LP1 6dB, LP2 12dB, LP4 24dB), two bandpass (BP2, BP4), a highpass (HP4), a notch (NT2), and a phaser (PHZR). All modes self-oscillate at high resonance, turning the filter into a sine oscillator playable via the FM 2 input with 1V/oct tracking. The dedicated LP4 and HP4 output jacks are always active regardless of the MODE selector position, meaning you can simultaneously use a bandpass from the MODE output while tapping the LP4 and HP4 outputs for parallel processing.

The LEVEL knob before the filter input adds pre-filter gain, pushing the signal into distortion territory before it even reaches the filter -- giving gritty, characterful tones distinct from post-filter distortion.

Three FM inputs with different scaling (FM 1 for envelopes, FM 2 for 1V/oct tracking, FM 3 for linear modulation) provide flexible modulation options without external attenuators.

## Controls

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| FM 1 | Slider | 0-2x input range | Attenuates FM 1 input. Normalled from ENV B. For envelope-to-filter modulation |
| FM 2 | Slider (bipolar) | -1V/oct to +1V/oct | Attenuverter for FM 2 input. Normalled from MIDI PITCH. For keyboard tracking |
| FM 3 | Slider (bipolar) | -1V/oct to +1V/oct | Attenuverter for FM 3 input. No normal -- open for LFOs or other sources |
| QM | Slider | 0-100% | Attenuates resonance modulation CV input. No normal |
| FREQ | Slider | Full audio range | Cutoff frequency. Combined with FM 1/2/3 inputs for final frequency |
| Q | Slider | 0 to self-oscillation | Resonance. High values cause self-oscillation in all filter modes |
| MODE | Selector (8-pos) | LP1/LP2/LP4/BP2/BP4/HP4/NT2/PHZR | Selects filter type for the VCF OUT jack |
| LEVEL | Knob | Unity to overdrive | Pre-filter gain. High values clip the input for gritty character. LED indicates clipping |

## Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| FM 1 IN | Input | ENV B OUT | First frequency modulation CV input. Ideal for envelopes |
| FM 2 IN | Input | MIDI PITCH / EXT CV PITCH | Second FM input, 1V/oct scaling. For keyboard tracking or pitch-synced self-oscillation |
| FM 3 IN | Input | None | Third FM input, linear scaling. Open for LFOs, sequencers, etc. |
| Q MOD IN | Input | None | CV input for resonance modulation. Attenuated by QM slider |
| VCF IN | Input | MIXER OUT | Audio input to the filter |
| LP4 OUT | Output | None | Dedicated 4-pole (24dB/oct) lowpass output. Always available regardless of MODE |
| HP4 OUT | Output | None | Dedicated 4-pole (24dB/oct) highpass output. Always available regardless of MODE |
| VCF OUT | Output | Wave Folder IN | Configurable output per MODE selector. Normalled to Wave Folder |

## LEDs

LEVEL LED lights red when the input signal is clipping, indicating overdrive. Brightness increases with distortion level.

## Normalled Connections

- **FM 1 IN** normalled from ENV B output. Envelope B modulates the filter cutoff by default.
- **FM 2 IN** normalled from MIDI PITCH (via EXT PITCH). Provides keyboard tracking for the filter.
- **VCF IN** normalled from MIXER output. The full mix feeds the filter by default.
- **VCF OUT** normalled to Wave Folder IN. Patching into the Wave Folder input overrides this.
