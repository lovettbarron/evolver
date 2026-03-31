---
type: module
instrument: cascadia
title: "LFO X/Y/Z"
manufacturer: "Intellijel"
category: modulator
control_count: 4
jack_count: 4
has_normals: true
---

# LFO X/Y/Z

## Purpose

Three bipolar triangle-wave LFOs linked by a shared rate control. LFO X sets the base rate; LFO Y and LFO Z derive their rates from LFO X via divider switches and trimmers, providing three phase-shifted, rate-related modulation sources.

## What Makes It Special

Having three linked LFOs in a single module is unusual for a semi-modular synthesizer. The rate-linking design means all three LFOs respond to the same RATE knob and CV input, but each can be offset via its rate divider switch (dividing by 3, 4, 5, or 8) and fine-tuned with its trimmer. This creates musically related modulation patterns -- for example, LFO X at 2Hz, LFO Y at 2/3 Hz, and LFO Z at 2/5 Hz -- producing polyrhythmic modulation from a single rate control.

From the factory, LFO Y and LFO Z are set to approximately the same rate as LFO X but with shifted phase, giving three-phase modulation out of the box. The rate range extends from ~15 seconds per cycle up to ~75 Hz, covering everything from glacial modulation to audio-rate effects.

LFO Y is normalled to VCO A's PWM input, and LFO Z is normalled to MULT IN 1 in the Patchbay (and from there to BI>UNI and EXP SRC), making all three LFOs immediately useful without patching.

## Controls

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| RATE | Knob | ~15s to ~75Hz | Sets LFO X rate directly. LFO Y and Z rates derived from this. CV-modulatable |
| LFO Y RATE DIVIDER | Switch (3-pos) | x1 / div3 / div4 | Center: matches trimmer rate. Up: 1/3 rate. Down: 1/4 rate |
| LFO Z RATE DIVIDER | Switch (3-pos) | x1 / div5 / div8 | Center: matches trimmer rate. Up: 1/5 rate. Down: 1/8 rate |
| RATE TRIMMERS (2x) | Trimmer | Fine rate offset | Left trimmer offsets LFO Y rate. Right trimmer offsets LFO Z rate. Factory set for phase-shifted matching |

## Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| LFO X OUT | Output | None | Bipolar +/-5V triangle LFO. Rate set directly by RATE knob |
| LFO Y OUT | Output | VCO A PWM IN | Bipolar +/-5V triangle LFO. Rate = RATE knob x trimmer x divider |
| LFO Z OUT | Output | MULT IN 1, BI>UNI IN | Bipolar +/-5V triangle LFO. Rate = RATE knob x trimmer x divider |
| LFO RATE CV | Input | None | CV input to modulate rate. Positive = faster, negative = slower. Affects all three LFOs |

## LEDs

Each LFO output jack has an LED. Color indicates polarity (green = positive, red = negative). Brightness indicates absolute voltage level. At high rates the LED appears to shimmer.

## Normalled Connections

- **LFO Y OUT** normalled to VCO A PWM IN. Raising VCO A's PW MOD slider immediately adds pulse width modulation.
- **LFO Z OUT** normalled to MULT IN 1 in the Patchbay (for distribution to multiple destinations) and to BI>UNI IN (for unipolar conversion).
