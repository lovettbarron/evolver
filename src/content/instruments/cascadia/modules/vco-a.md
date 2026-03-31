---
type: module
instrument: cascadia
title: "VCO A"
manufacturer: "Intellijel"
category: sound-source
control_count: 11
jack_count: 6
has_normals: true
---

# VCO A

## Purpose

VCO A is Cascadia's primary analog oscillator, providing the core tone generation for most patches. It produces saw, triangle, pulse, sine, and sub-oscillator waveforms, and serves as the main audio source feeding the Mixer.

## What Makes It Special

VCO A's standout feature is its through-zero FM (TZFM) capability. Most analog oscillators only support exponential FM, which detunes the carrier pitch as modulation depth increases. TZFM allows the oscillator frequency to pass through zero and reverse direction, producing cleaner, more harmonically predictable FM timbres that track pitch accurately across the keyboard -- a feature historically associated with digital FM synthesis (like the DX7) but implemented here in a purely analog circuit. The selectable AC/DC coupling for TZFM gives two flavors: DC for deeper modulation ideal with slow LFO sources, and AC for more pitch-accurate tonal FM.

VCO A also offers both hard and soft sync modes. The soft sync uses a "flip" technique (reversing the triangle core direction rather than resetting it), producing gentler sync timbres than the aggressive hard sync found on most synths.

## Controls

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| PITCH | Knob | +/- 6 semitones | Fine tuning around the OCTAVE setting. Surrounded by 4 calibration trim pots |
| OCTAVE | Selector (8-pos) | 8 octaves | Coarse tuning, one octave per click |
| PW MOD | Slider | 0-100% | Attenuates PWM CV input. Normalled from LFO Y |
| PW | Slider | 50-95% duty cycle | Sets pulse width. 50% = square wave. Can reach 0/100% via PW MOD |
| FM 1 | Slider (bipolar) | -max to +max | Exponential FM amount from FM 1 IN jack |
| INDEX MOD (IM) | Slider | 0-100% | Attenuates IM IN CV controlling FM 2 depth. Normalled from ENV A |
| INDEX | Slider | 0-100% | Sets base FM 2 modulation depth. FM 2 source normalled from VCO B sine |
| TZFM/EXP | Switch (2-pos) | TZFM / EXP | Selects FM 2 type: through-zero linear or exponential |
| AC/DC | Switch (2-pos) | AC / DC | TZFM coupling. DC = deeper, for LFOs. AC = pitch-accurate, for audio FM |
| SYNC TYPE | Switch (3-pos) | Hard / Off / Soft | Hard sync resets waveform; Soft sync flips direction. Sync source from SYNC IN |
| PULSE POSITION | Switch (2-pos) | Center / Edge | Center-triggered vs edge-triggered pulse waves. Affects phase relationship with other waveforms |

## Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| PITCH IN | Input | MIDI PITCH / EXT CV PITCH | 1V/oct pitch control |
| PWM IN | Input | LFO Y | Pulse width modulation CV input. Attenuated by PW MOD slider |
| FM 1 IN | Input | None | Exponential FM input. Attenuated by FM 1 slider (bipolar) |
| IM IN | Input | ENV A OUT | Index modulation CV -- controls FM 2 depth over time. Attenuated by INDEX MOD slider |
| FM 2 IN | Input | VCO B SINE OUT | Second FM input (TZFM or EXP selectable). Depth set by INDEX slider |
| SYNC IN | Input | VCO B SAW OUT | Sync source input. SYNC TYPE switch selects Hard/Off/Soft |

## LEDs

RATE LED shows the triangle core oscillation rate. At audio rates, the LED appears orange (rapidly cycling red/green). At LFO rates, individual colors are visible: green for positive voltage, red for negative.

## Normalled Connections

- **PITCH IN** normalled from MIDI PITCH (and summed with EXT CV PITCH). Patching breaks the MIDI pitch connection.
- **PWM IN** normalled from LFO Y output. Patching breaks the LFO Y connection.
- **IM IN** normalled from ENV A output. Patching breaks the envelope-to-FM-index connection.
- **FM 2 IN** normalled from VCO B sine wave output. Patching breaks the VCO B FM connection.
- **SYNC IN** normalled from VCO B saw wave output. Patching substitutes your own sync source.
- VCO A's waveform outputs (SAW, TRI, PULSE, SINE) are available as direct outs in the Mixer section and normalled to the Mixer input.
