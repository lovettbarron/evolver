---
type: module
instrument: cascadia
title: "Utilities"
manufacturer: "Intellijel"
category: utility
control_count: 8
jack_count: 9
has_normals: true
---

# Utilities

The Utilities strip contains three independent processing tools arranged left to right: Sample & Hold, Slew Limiter / Envelope Follower, and Mixuverter.

## Sample & Hold

### Purpose

Samples the voltage at its input each time a trigger is received, holding that value at the output until the next trigger. Most commonly used to generate stepped random voltages (when sampling noise) for filter cutoff, pitch, or modulation destinations.

### Controls

No dedicated knobs or sliders -- behavior is determined entirely by the input signal and trigger source.

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| (none) | -- | -- | S&H is controlled entirely via its patch points |

### Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| TRIG IN | Input | MIDI CLK OUT | Each trigger samples the current S&H IN voltage. Normalled from MIDI clock |
| S&H IN | Input | Internal digital noise | Signal to be sampled. Normalled from a dedicated digital noise source (independent of Mixer noise) |
| S&H OUT | Output | Slew/Follow IN | Sampled voltage output. Normalled to Slew input for smoothed random voltages |

### LEDs

LED indicates the polarity and level of the held voltage.

### Normalled Connections

- **TRIG IN** normalled from MIDI CLK output. S&H samples at the MIDI clock rate by default.
- **S&H IN** normalled from an internal digital noise generator (separate from the Mixer's NOISE TYPE selection).
- **S&H OUT** normalled to the Slew/Follow input.

## Slew Limiter / Envelope Follower

### Purpose

Smooths voltage transitions by limiting how quickly the output can change, converting sudden jumps into gradual glides. Can also function as an envelope follower to extract amplitude envelopes from audio signals.

### Controls

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| SLEW RATE | Knob | Near-instant to 1s (LIN) or 5s (EXP) | How quickly output responds to input changes. Fully CCW = near-instant |
| SLEW DIRECTION | Switch (3-pos) | Up Only / Both / Down Only | Which direction of voltage change is slewed |
| SLEW SHAPE | Switch (2-pos) | LIN / EXP | Response curve. LIN = constant rate. EXP = decelerating approach |
| ENV FOLLOW | Switch (2-pos) | On / Off | Enables envelope follower mode (full-wave rectifier + ~70Hz LPF) |

### Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| SLEW/FOLLOW IN | Input | S&H OUT | Signal to be slewed or followed. Normalled from S&H output |
| SLEW OUT | Output | None | Slewed version of the input signal |

### LEDs

LED color indicates polarity (green = positive, red = negative). Brightness indicates voltage level.

### Normalled Connections

- **SLEW/FOLLOW IN** normalled from S&H output. The S&H -> Slew chain creates smoothly varying random voltages by default.

## Mixuverter

### Purpose

A voltage processing utility that can mix, double, attenuvert, and offset control voltages. Combines a main input (with attenuation, polarity inversion, and doubling) with a secondary input, summing them to three multed outputs.

### Controls

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| ATTENUATOR | Knob | 0 to full (UNI) or -full to +full (bipolar) | Attenuates or attenuates the MAIN INPUT. With no input, attenuates internal +5V DC |
| x2 SWITCH | Switch (2-pos) | x2 / Off | Doubles the voltage at MAIN INPUT. With internal 5V, produces up to +/-10V |
| POLARITY SWITCH | Switch (2-pos) | UNI / -/+ | UNI: standard attenuator (0 to max). -/+: bipolar attenuverter (-max to +max, center = 0) |

### Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| MAIN INPUT | Input | Internal +5V DC | Primary input. Attenuated/inverted/doubled by the three controls |
| SECONDARY INPUT | Input | None | Summed directly with processed MAIN INPUT. No attenuation |
| MIXUVERTER OUTPUTS (x3) | Output | None | Three multed outputs of the summed signal |

### LEDs

No LEDs on the Mixuverter.

### Normalled Connections

- **MAIN INPUT** normalled from internal +5V DC. With no cable patched, the Mixuverter acts as a controllable DC voltage source (0 to +/-10V with x2 enabled).
