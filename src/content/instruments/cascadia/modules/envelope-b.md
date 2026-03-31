---
type: module
instrument: cascadia
title: "Envelope B"
manufacturer: "Intellijel"
category: modulator
control_count: 9
jack_count: 6
has_normals: true
---

# Envelope B

## Purpose

Envelope B is a multimode function generator that operates as an Envelope, LFO, or Burst Generator depending on the MODE SELECT switch position. It is normalled to the VCF FM 1 input, making it the default filter modulation source.

## What Makes It Special

Envelope B is not really an "envelope" -- it is a full function generator that packs three distinct tools into one module. The triple-mode design (Envelope / LFO / Burst) means the same physical controls morph their behavior based on the mode switch. The RISE slider becomes an attack time in Envelope mode, an LFO rate in LFO mode, and a burst pulse rate in Burst mode. This modal reuse is space-efficient but conceptually deep.

In LFO mode, the Low Frequency Vacillator (LFV) sub-mode is particularly unusual -- it generates randomly-varying, chaotic oscillations rather than a predictable repeating waveform. The DELTA control sets how far each oscillation can deviate from the previous, and SLEW smooths the transitions. This creates organic, never-repeating modulation that sits between a standard LFO and random S&H.

The Burst Generator mode outputs a programmable series of pulses within a time window -- useful for ratcheting effects, burst-fire gates, and complex rhythmic triggering that would otherwise require an external sequencer.

All three CV modulation inputs (RISE MOD, FALL MOD, SHAPE MOD) use attenuverters (bipolar), giving both positive and negative modulation from a single source.

## Controls

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| MODE SELECT | Switch (3-pos) | ENV / LFO / BURST | Selects the function generator mode |
| TYPE SELECT | Switch (3-pos) | AD-AHR-CYCLE (ENV/BURST) or FREE-SYNC-LFV (LFO) | Sub-mode selector, behavior depends on MODE SELECT |
| RISE | Slider | 2ms-5s (ENV), rate (LFO), pulse rate (BURST) | Attack time in ENV mode. LFO rate in LFO mode. Pulse rate in BURST mode |
| FALL | Slider | 2ms-5s (ENV), phase/delta (LFO), length (BURST) | Decay/release in ENV. Phase offset or delta in LFO. Burst duration in BURST |
| SHAPE | Slider | Log-Lin-Exp (ENV), tilt/slew (LFO), tilt (BURST) | Envelope curvature in ENV. Saw-tri-ramp tilt in LFO. Pulse shape in BURST |
| RISE MOD | Slider (bipolar) | -max to +max | Attenuverter for RISE MOD CV input. Center = no effect |
| FALL MOD | Slider (bipolar) | -max to +max | Attenuverter for FALL MOD CV input. Center = no effect |
| SHAPE MOD | Slider (bipolar) | -max to +max | Attenuverter for SHAPE MOD CV input. Center = no effect |
| SYNC LED | LED | -- | Dual purpose: LFO sync indicator and MIDI configuration feedback |

## Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| RISE MOD IN | Input | None | CV input to modulate RISE time/rate. Attenuverted by RISE MOD slider |
| FALL MOD IN | Input | None | CV input to modulate FALL time/phase/delta. Attenuverted by FALL MOD slider |
| SHAPE MOD IN | Input | None | CV input to modulate SHAPE/tilt/slew. Attenuverted by SHAPE MOD slider |
| GATE/SYNC IN | Input | MIDI GATE / EXT CV GATE | Trigger/gate input (ENV), clock sync input (LFO SYNC mode), or trigger (BURST) |
| EOF (End of Fall) OUT | Output | None | Trigger or gate at end of FALL stage (configurable via Config App) |
| ENV B OUT | Output | VCF FM 1 IN, Inverter IN | Main output, 0-5V (ENV/BURST) or bipolar (LFO). LED shows polarity and amplitude |

## LEDs

- SYNC LED: In LFO SYNC mode, flashes in time with the synchronized LFO. Also used for MIDI configuration feedback (channel learn, CC learn, etc.)
- EOF LED: Lights when End of Fall output is high
- ENV B OUT LED: Green for positive voltage, red for negative. Brightness indicates amplitude.

## Normalled Connections

- **GATE/SYNC IN** normalled from MIDI GATE (and summed with EXT CV GATE). In LFO SYNC mode, patch a clock here instead.
- **ENV B OUT** normalled to VCF FM 1 input (filter envelope modulation) and to Patchbay Inverter IN.

## Envelope Mode

Set MODE SELECT to ENV (top position). The TYPE SELECT switch chooses between three envelope types:

### AD (Attack/Decay)

A two-stage envelope. RISE sets attack time (2ms-5s), FALL sets decay time. The envelope completes its full cycle on any trigger -- gate duration is ignored. SHAPE controls curvature: below center = logarithmic (percussive), center = linear, above center = exponential (plucked character).

### AHR (Attack/Hold/Release)

A three-stage envelope gated by the input signal. RISE sets attack time, FALL sets release time. The envelope holds at maximum level for as long as the gate is high. If the gate goes low before attack completes, release begins immediately from the current level. SHAPE controls curvature.

### Cycle

A continuously cycling AD envelope that behaves like a unipolar LFO. Frequency is determined by the sum of RISE and FALL times. The ratio of RISE to FALL sets the waveform skew (asymmetry). Free-running, but a trigger at GATE/SYNC resets the cycle.

## LFO Mode

Set MODE SELECT to LFO (middle position). The TYPE SELECT switch chooses between three LFO types:

### FREE

A free-running bipolar LFO. RISE becomes RATE (sets frequency). FALL becomes PHASE (0-360 degree offset). SHAPE becomes TILT (saw at bottom, triangle at center, ramp at top). All three CV mod inputs attenuvert their respective parameters.

### SYNC

A clock-synchronized LFO. Patch a clock into GATE/SYNC IN. RISE becomes a clock multiplier/divider for RATE. FALL becomes PHASE offset. SHAPE becomes TILT. The SYNC LED flashes in time with the synchronized LFO.

### LFV (Low Frequency Vacillator)

A chaotic, non-repeating oscillator. RISE becomes RATE (base oscillation speed). FALL becomes DELTA -- how far each oscillation can deviate from the previous one. SHAPE becomes SLEW -- smoothing applied to transitions between values. Low DELTA with high SLEW produces gentle meandering; high DELTA with low SLEW produces erratic jumps.

## Burst Generator Mode

Set MODE SELECT to BURST (bottom position). Generates a series of pulses within a time envelope. RISE becomes RATE (pulse frequency within the burst). FALL becomes LENGTH (overall burst duration). SHAPE becomes TILT (shapes both the overall amplitude curve and individual pulse waveforms). TYPE SELECT switches between AD, AHR, and CYCLE triggering behaviors for the burst envelope itself.
