---
type: overview
instrument: plaits
title: "Plaits Overview"
manufacturer: "Mutable Instruments"
---

# Mutable Instruments Plaits

*Macro oscillator with 16 synthesis models*

**12HP** | VCO

## Architecture

Plaits is a digital voltage-controlled sound source capable of sixteen different synthesis techniques, organized into two banks of eight models each. Bank 1 contains pitched, tonal models (virtual analog, waveshaping, FM, formant, harmonic, wavetable, chords, and vowel/speech synthesis). Bank 2 contains noise, percussion, and physical modeling modes (granular cloud, filtered noise, particle noise, inharmonic string, modal resonator, analog bass drum, snare drum, and hi-hat).

Two model selection buttons (one per bank) cycle through the eight models in each bank, with two columns of eight LEDs indicating the active model via color coding (green, red, and yellow for different synthesis families).

Plaits includes a built-in low-pass gate (LPG) that can be opened via the LEVEL CV input, providing simultaneous amplitude and brightness control without an external VCA or VCF. A TRIG input triggers an internal decaying envelope that strikes the LPG and excites percussive models, making Plaits a self-contained voice capable of producing complete sounds from a single trigger.

The three attenuverter knobs (TIMBRE, FM, MORPH) have a dual function: when a CV input is patched, the attenuverter scales and optionally inverts the incoming CV. When the CV input is left unpatched and TRIG is patched, the attenuverter controls how much the internal decaying envelope modulates the corresponding parameter. This means unplugging a CV cable without resetting the attenuverter to 12 o'clock can cause the internal envelope to take over modulation -- always reset attenuverters to noon when removing CV cables.

The AUX output carries a variant, sidekick, or by-product of the main signal on the OUT jack. The exact AUX content varies per model -- it might be an alternative waveshape, a sub-oscillator, raw exciter noise, or a low-fi version of the main output.

## Controls Reference

### Main Controls

| Control | Type | Range | Function |
|---------|------|-------|----------|
| FREQUENCY (B) | Large Knob | 8 octaves (or 14 semitones) | Coarse frequency / pitch control |
| HARMONICS (C) | Large Knob | Model-dependent | Spectral content from dark/sparse to bright/dense |
| TIMBRE (D) | Medium Knob | Model-dependent | Lateral timbral variation |
| MORPH (E) | Medium Knob | Model-dependent | Frequency spread or balance of tone constituents |

### Attenuverters (F)

| Control | Type | Range | Function |
|---------|------|-------|----------|
| TIMBRE ATT | Small Knob | -1 to +1 | Scales TIMBRE CV input (or internal envelope depth) |
| FM ATT | Small Knob | -1 to +1 | Scales FM CV input (or internal envelope depth) |
| MORPH ATT | Small Knob | -1 to +1 | Scales MORPH CV input (or internal envelope depth) |

### Buttons (A)

| Control | Type | Function |
|---------|------|----------|
| MODEL 1 | Button | Cycles through Bank 1 (8 pitched/tonal models) |
| MODEL 2 | Button | Cycles through Bank 2 (8 noise/percussion models) |

### Input Jacks

| Jack | Signal Type | Function |
|------|------------|----------|
| MODEL (1) | CV | Selects model via voltage (two LEDs show current + CV target) |
| TIMBRE (2) | CV | CV modulation of TIMBRE parameter |
| FM (2) | CV | CV modulation of frequency (FM input) |
| HARMO (2) | CV | CV modulation of MORPH/HARMONICS parameter |
| TRIG (3) | Gate | Triggers internal envelope, excites percussive models, strikes LPG |
| LEVEL (4) | CV | Opens internal LPG for amplitude + brightness control |
| V/OCT (5) | CV | 1V/oct pitch tracking (-3 to +5 octaves relative to FREQUENCY) |

### Output Jacks

| Jack | Signal Type | Function |
|------|------------|----------|
| OUT (6) | Audio | Main synthesis output |
| AUX (7) | Audio | Variant/sidekick/by-product output (varies per model) |

## Basic Patch (Init State)

All sessions start from this known state. Set these positions before beginning any session.

| Control | Position | Result |
|---------|----------|--------|
| FREQUENCY | 12 o'clock (noon) | Approximately C3 |
| HARMONICS | 12 o'clock (noon) | Neutral spectral content |
| TIMBRE | 12 o'clock (noon) | Neutral timbral position |
| MORPH | 12 o'clock (noon) | Neutral morph position |
| TIMBRE ATT | 12 o'clock (noon) | No CV scaling / no internal envelope modulation |
| FM ATT | 12 o'clock (noon) | No CV scaling / no internal envelope modulation |
| MORPH ATT | 12 o'clock (noon) | No CV scaling / no internal envelope modulation |
| MODEL 1 | First LED lit (top) | Bank 1, Model 1: Pair of classic waveforms (VA) |
| All cables | Removed | Clean start |

**What you should hear:** Patch V/OCT from a keyboard or sequencer, and OUT to a mixer or audio interface. With Bank 1 Model 1 selected, you will hear a pair of classic analog-style waveforms. Sweeping HARMONICS detunes the two oscillators against each other. Sweeping TIMBRE changes the pulse width of the square wave component.

## Sessions

See the [Sessions tab](/modules/plaits/sessions/) for the complete Plaits curriculum.

## Further Reading

- **Plaits Manual** -- The complete technical reference covering all 16 synthesis models, controls, calibration, and hidden settings. See `references/plaits-manual.pdf` or the [Mutable Instruments website archive](https://pichenettes.github.io/mutable-instruments-documentation/modules/plaits/).
- **Mutable Instruments Documentation Archive** -- Community-maintained archive of all Mutable Instruments module documentation, firmware changelogs, and technical details.
