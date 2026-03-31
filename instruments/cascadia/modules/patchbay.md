---
type: module
instrument: cascadia
title: "Patchbay"
manufacturer: "Intellijel"
category: utility
control_count: 1
jack_count: 17
has_normals: true
---

# Patchbay

The Patchbay contains six independent utility circuits for signal routing, processing, and conversion. Each is described in its own section below.

## Multiples

### Purpose

Three buffered mults that duplicate an input signal to multiple outputs. Unlike passive mults (Y-cables), buffered mults make electrical copies that maintain voltage accuracy -- critical for distributing 1V/oct pitch signals to multiple oscillators.

### Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| MULT IN 1 | Input | LFO Z OUT | Input to first mult pair. Normalled from LFO Z |
| MULT IN 2 | Input | MULT IN 1 | Input to second mult pair. Normalled from MULT IN 1 (cascade) |
| MULT IN 3 | Input | MULT IN 2 | Input to third mult pair. Normalled from MULT IN 2 (cascade) |
| MULT OUT 1 (x2) | Output | None | Two copies of MULT IN 1 signal |
| MULT OUT 2 (x2) | Output | None | Two copies of MULT IN 2 signal |
| MULT OUT 3 (x2) | Output | None | Two copies of MULT IN 3 signal |

The cascade normalling means patching a single signal into MULT IN 1 (with nothing in IN 2 or IN 3) distributes it to all 6 outputs. Patching into IN 2 breaks the cascade at that point.

### LEDs

MULT IN 1 LED indicates polarity (green = positive, red = negative) and voltage level (brightness).

## Summing

### Purpose

Adds two input voltages together, producing their sum at the output. Useful for combining CV sources (e.g., adding an LFO to an envelope) or mixing audio signals.

### Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| SUM IN 1 | Input | None | First input signal |
| SUM IN 2 | Input | None | Second input signal |
| SUM OUT | Output | None | Sum of both inputs |

## Inverter

### Purpose

Inverts a signal so positive voltages become negative and vice versa. Useful for flipping envelopes (attack becomes decay shape), reversing LFO direction (saw becomes ramp), or creating inverted modulation.

### Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| INVERTER IN | Input | ENV B OUT | Signal to invert. Normalled from Envelope B output |
| INVERTER OUT | Output | None | Inverted version of input |

## Bipolar-to-Unipolar

### Purpose

Converts a bipolar signal (e.g., +/-5V LFO) into a unipolar signal (0-5V). Adds +5V to the input then divides by 2. Essential when you want modulation that only increases (or only decreases) a parameter from its base value, rather than oscillating around it.

### Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| BI IN | Input | LFO Z OUT | Bipolar input. Normalled from LFO Z |
| UNI OUT | Output | EXP SRC IN | Unipolar output. Formula: (input + 5V) / 2. Normalled to EXP SRC |

## Exponential Source

### Purpose

Routes a CV signal to the rear panel EXP OUT jack for controlling an expression pedal input on an external effects pedal. The EXP LEVEL knob attenuates the signal before it reaches the back panel.

### Controls

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| EXP LEVEL | Knob | 0-100% | Attenuates CV before sending to rear EXP OUT jack (3.3V TRS) |

### Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| EXP SRC IN | Input | UNI OUT (BI>UNI) | CV source for expression control. Normalled from BI>UNI output |

## Ring Modulator

### Purpose

Multiplies two input waveforms, producing a signal containing the sum and difference frequencies of the inputs. Creates metallic, inharmonic, bell-like tones at audio rates, and complex modulation shapes at LFO rates.

### Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| RINGMOD IN 1 | Input | VCO A SINE | First input. DC coupled (works with LFOs and audio). Normalled from VCO A sine |
| RINGMOD IN 2 | Input | VCO B SINE | Second input. DC coupled. Normalled from VCO B sine |
| RINGMOD OUT | Output | MIXER IN 1, VCA B IN | Ring mod output. Normalled to Mixer IN 1 and VCA B input |

### LEDs

RINGMOD OUT LED indicates polarity (green = positive, red = negative) and amplitude (brightness). At audio rates, acts as an output level indicator.

## Normalled Connections Summary

- **MULT IN 1** normalled from LFO Z. Cascade normalling distributes to all 6 mult outputs.
- **INVERTER IN** normalled from ENV B output. Provides inverted envelope without patching.
- **BI IN** normalled from LFO Z. Converts LFO Z to unipolar automatically.
- **UNI OUT** normalled to EXP SRC IN. LFO Z -> BI>UNI -> EXP SRC chain works with zero cables.
- **RINGMOD IN 1** normalled from VCO A sine. **RINGMOD IN 2** normalled from VCO B sine.
- **RINGMOD OUT** normalled to MIXER IN 1 and VCA B IN.
