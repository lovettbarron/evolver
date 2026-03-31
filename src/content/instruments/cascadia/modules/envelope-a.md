---
type: module
instrument: cascadia
title: "Envelope A"
manufacturer: "Intellijel"
category: modulator
control_count: 8
jack_count: 6
has_normals: true
---

# Envelope A

## Purpose

Envelope A is Cascadia's primary amplitude envelope generator. It shapes the volume of each note over time via the normalled connection to VCA A, and can also modulate other parameters (VCO A FM index, filter cutoff) through patching or normalling.

## What Makes It Special

Beyond the standard ADSR, Envelope A adds a configurable Hold stage with three modes via the HOLD POSITION switch. In AHDSR mode, the Hold stage inserts a sustain-at-peak period after the Attack, creating punchy sounds with extended brightness before the Decay begins. In Gate Extender mode, the Hold time acts as a minimum gate duration -- even a short trigger input produces a full envelope, solving the common problem of clipped envelopes from short gates. The three-position ENVELOPE SPEED switch (Fast/Med/Slow) rescales all time parameters simultaneously, giving percussion-fast envelopes (0.2ms attack) or glacier-slow pads (60s attack) without needing to repatch.

The CTRL IN jack with its three-mode switch (Level/Off/Time) adds velocity sensitivity or time scaling from any CV source -- normalled from MIDI velocity by default, making notes respond dynamically to playing intensity.

## Controls

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| H (Hold) | Slider | 0.001ms - 2.5s/10s/60s | Hold time duration. Range depends on ENVELOPE SPEED switch |
| A (Attack) | Slider | 0.2ms-1.5s / 2ms-10s / 9.3ms-60s | Attack time. Range depends on ENVELOPE SPEED switch |
| D (Decay) | Slider | 0.6ms-2.5s / 3.5ms-10s / 30ms-60s | Decay time. Range depends on ENVELOPE SPEED switch |
| S (Sustain) | Slider | 0-5V | Sustain level |
| R (Release) | Slider | 0.6ms-2.5s / 3.5ms-10s / 30ms-60s | Release time. Range depends on ENVELOPE SPEED switch |
| HOLD POSITION | Switch (3-pos) | Gate Ext / Off / AHDSR | Off: standard ADSR. AHDSR: hold after attack. Gate Ext: minimum gate time |
| ENVELOPE SPEED | Switch (3-pos) | Fast / Med / Slow | Rescales all envelope times. Fast for percussion, Slow for pads |
| CTRL SOURCE | Switch (3-pos) | Level / Off / Time | How CTRL IN affects envelope. Level: scales amplitude. Time: scales duration. Off: ignored |

## Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| GATE IN | Input | MIDI GATE / EXT CV GATE | Gate high starts envelope, gate low triggers release |
| CTRL IN | Input | MIDI VEL OUT | CV to scale amplitude (Level mode) or time (Time mode). Switch selects behavior |
| RETRIG IN | Input | MIDI TRIG OUT / EXT CV TRIG | Trigger resets envelope to attack stage from current level |
| EOH (End of Hold) OUT | Output | None | Trigger/gate at end of Hold stage. Works even when Hold Position = Off (delayed trigger) |
| EOA (End of Attack) OUT | Output | None | Trigger/gate at end of Attack stage |
| ENV A OUT | Output | VCA A LEVEL MOD IN, VCO A IM IN | Main envelope output, 0-5V |

## LEDs

- EOH LED lights when the End of Hold trigger/gate is high
- EOA LED lights when the End of Attack trigger/gate is high
- ENV A OUT LED brightness tracks the envelope voltage level

## Normalled Connections

- **GATE IN** normalled from MIDI GATE (and summed with EXT CV GATE). Patching overrides MIDI gate.
- **CTRL IN** normalled from MIDI VEL output. In Level mode, softer notes produce quieter envelopes. In Time mode, softer notes produce slower envelopes.
- **RETRIG IN** normalled from MIDI TRIG (and summed with EXT CV TRIG).
- **ENV A OUT** normalled to VCA A LEVEL MOD IN (amplitude envelope) and to VCO A IM IN (FM index modulation).
