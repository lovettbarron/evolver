---
type: module
instrument: cascadia
title: "MIDI/CV"
manufacturer: "Intellijel"
category: utility
control_count: 4
jack_count: 8
has_normals: true
---

# MIDI/CV

## Purpose

Converts incoming MIDI data (from the rear panel MIDI IN or USB MIDI port) into control voltages for driving Cascadia's oscillators, envelopes, and other modules. This is the primary interface between a MIDI controller and the analog signal chain.

## What Makes It Special

Unlike a simple MIDI-to-CV converter that outputs just pitch and gate, Cascadia's MIDI/CV section provides 8 independently assignable outputs. The MIDI LFO output is particularly unusual -- it generates an LFO synchronized to the incoming MIDI clock with selectable waveform shapes and rate divisions, giving you tempo-synced modulation without patching an external clock. The CC and MOD outputs use a learn mode, making it trivially easy to assign any MIDI CC or aftertouch to a CV output for real-time control.

## Controls

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| PITCH button | Button | Push / Long-push | Push: Channel Learn Mode. Long-push: MIDI Panic (All Notes Off) |
| MIDI CC button | Button | Push / Long-push | Push: CC Learn Mode for CC OUT. Long-push: MOD Learn Mode for MOD OUT |
| MIDI LFO button | Button | Push / Long-push | Push: Cycle through rate divisions (16th to breve). Long-push: Cycle LFO shapes (Sine/Square/Ramp/Saw) |
| MIDI CLK button | Button | Push / Long-push | Push: Tap tempo (Tap mode) or cycle clock divisions (MIDI mode). Long-push: Toggle MIDI/Tap clock mode |

## Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| MIDI PITCH OUT | Output | VCO A PITCH, VCO B PITCH, VCF FM 2 | 1V/oct, 10-octave range (+/-5V). Also summed with EXT CV PITCH |
| MIDI CC OUT | Output | None | CV from user-selected MIDI CC or aftertouch. Default: CC 2 (Breath) |
| MIDI LFO OUT | Output | None | Bipolar LFO synced to MIDI clock with selectable shape and division |
| MIDI CLK OUT | Output | S&H TRIG IN | Clock output from MIDI clock division or internal tap tempo |
| MIDI VEL OUT | Output | ENV A CTRL IN | 0-5V proportional to last note velocity |
| MIDI MOD OUT | Output | None | CV from user-selected MIDI CC or aftertouch. Default: CC 1 (Mod Wheel) |
| MIDI GATE OUT | Output | ENV A GATE, ENV B GATE | +5V when note held. Summed with EXT CV GATE |
| MIDI TRIG OUT | Output | ENV A RETRIG | 5V trigger on MIDI note-on. Default 5ms length (configurable via Config App) |

## LEDs

Each of the 8 output jacks has a corresponding LED. Brightness indicates voltage level. For bipolar outputs (CC, LFO, MOD), green indicates positive voltage and red indicates negative.

## Normalled Connections

- **MIDI PITCH** normalled to VCO A PITCH input, VCO B PITCH input (when PITCH SOURCE switch = PITCH A+B), and VCF FM 2 input
- **MIDI VEL** normalled to ENV A CTRL input (scales envelope amplitude or time depending on CTRL SOURCE switch)
- **MIDI GATE** normalled to ENV A GATE input and ENV B GATE input
- **MIDI TRIG** normalled to ENV A RETRIG input
- **MIDI CLK** normalled to S&H TRIG input
