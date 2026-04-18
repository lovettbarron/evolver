---
type: overview
instrument: ikarie
title: "Ikarie Overview"
manufacturer: "Bastl Instruments"
---

# Bastl Instruments Ikarie

*Stereo dual-peak resonant filter with envelope follower*

**8HP** | Filter

## Architecture

Ikarie is a stereo dual-peak resonant filter built around two filter cores that operate simultaneously. The CUTOFF knob sweeps from low-pass (fully counterclockwise) through an open filter at center to high-pass (fully clockwise). Both filter cores are always active, and their interaction produces the module's distinctive dual-peak character.

The two filter cores create three simultaneous audio outputs. The L and R outputs provide the main filtered stereo signal, while the BEYOND output provides the spectral difference between the two filter cores -- producing band-pass and twin-peak resonance effects that are unavailable from the main outputs alone.

Two stereo modes control how the filter cores relate to each other. In PAN mode, the STEREO knob pans the signal between left and right outputs. In SPREAD mode, the STEREO knob offsets the cutoff frequency between the two filter cores, creating formant-like dual-peak filtering. The PAN/SPREAD toggle selects between these modes.

The built-in envelope follower (FOLLOW) tracks the amplitude of the input signal and outputs a proportional control voltage. Three speeds are available via the FOLLOW SPEED toggle: SLOW produces a pumping, compressor-like response; MID provides tight, natural dynamics tracking; FAST acts as a full-wave rectifier.

**Critical normalling: FOLLOW output is normalled to MOD input.** Without any cables patched, the filter automatically modulates its cutoff frequency in response to input dynamics -- creating auto-wah behavior. The MOD attenuverter knob controls the depth and polarity of this modulation. Patching a cable to the MOD input breaks this normalling, allowing external modulation sources to control the cutoff instead.

The VCA CV input (0-5V) controls the output level. When no cable is patched, the VCA passes signal at normal level. The V/OCT input provides 1V/octave cutoff tracking for musical filter sweeps and self-oscillation pitch control.

The INPUT knob provides 0x to 5x gain, allowing both clean filtering and deliberate overdrive of the filter cores for additional harmonic content.

## Controls Reference

### Knobs

| Control | Type | Range | Function |
|---------|------|-------|----------|
| CUTOFF | Large knob | LP (CCW) to HP (CW) | Sweeps filter cutoff. Center = open filter |
| INPUT | Medium knob | 0x to 5x | Input gain and overdrive |
| MOD | Medium attenuverter | -1 (CCW) to +1 (CW) | Cutoff modulation depth. Center = no modulation |
| STEREO | Medium knob | Variable | PAN mode: stereo panning. SPREAD mode: filter frequency spread |

### Fader

| Control | Type | Range | Function |
|---------|------|-------|----------|
| RESONANCE | Vertical fader | Min to Max | Emphasizes cutoff frequency. Self-oscillates at maximum |

### Switches

| Control | Type | Positions | Function |
|---------|------|-----------|----------|
| PAN/SPREAD | 2-position toggle | PAN / SPREAD | Selects stereo mode |
| FOLLOW SPEED | 3-position toggle | SLOW / MID / FAST | Sets envelope follower response time |

### Input Jacks

| Jack | Signal | Function |
|------|--------|----------|
| L IN | Audio | Left audio input (normalled to R IN) |
| R IN | Audio | Right audio input |
| V/OCT | CV | 1V/octave cutoff tracking |
| MOD | Modulation | Cutoff modulation input (**normalled from FOLLOW output**) |
| VCA CV | CV | Output VCA level (0-5V, no cable = normal level) |
| STEREO CV | CV | Modulates stereo parameter |
| RES CV | CV | Modulates resonance |

### Output Jacks

| Jack | Signal | Function |
|------|--------|----------|
| L | Audio | Left output (MONO -- sums both channels when only this is patched) |
| R | Audio | Right output |
| BEYOND | Audio | Spectral difference of two filter cores (band-pass/twin-peak) |
| FOLLOW | CV | Envelope follower CV output |

## Basic Patch (Init State)

All sessions start from this known state. Set these positions before beginning any session.

| Control | Position | Result |
|---------|----------|--------|
| CUTOFF | 12 o'clock (noon) | Open filter -- all frequencies pass |
| INPUT | 10 o'clock (~unity) | Unity gain, no overdrive |
| RESONANCE | Minimum (fader at bottom) | No resonant emphasis |
| MOD | 12 o'clock (noon) | No modulation depth (but FOLLOW normalling is still active) |
| STEREO | 12 o'clock (noon) | Center position, no stereo effect |
| FOLLOW SPEED | MID (center position) | Natural dynamics tracking |
| PAN/SPREAD | PAN | Standard panning mode |
| All cables | Removed | Clean start |

**Patching:** Audio source to L IN, L OUT to mixer.

**What you should hear:** The input signal passes through with minimal coloring. The filter is fully open at noon. Even with MOD at noon, the FOLLOW normalling means the filter may subtly respond to input dynamics -- this is normal and intentional. Moving CUTOFF left darkens the sound (low-pass), moving right brightens it (high-pass).

## Patch Tips

These patch ideas from the manual provide inspiration for creative exploration:

1. **Formant Filtering** -- Use SPREAD mode with moderate RESONANCE to create vowel-like dual-peak formant sounds
2. **Quad Acid** -- One CUTOFF knob turn produces 4 simultaneous resonant filter sweeps across the stereo outputs
3. **Beyond Stereo** -- Use L OUT and BEYOND as a stereo pair for unusual stereo imaging from the two filter cores
4. **Pinging & FM Pinging** -- Send trigger pulses into L IN with INPUT cranked for percussive filter sounds
5. **Self-Oscillation** -- RESONANCE to max, INPUT to min, V/OCT for pitch -- Ikarie becomes a sine-ish oscillator
6. **Post-Filter Ring Modulator** -- Use BEYOND output with PAN mode for ring-modulator-like effects
7. **Waveform Crossfading** -- L OUT and R OUT as crossfaded waveform outputs
8. **Aggressive 24dB Filtering** -- Chain L OUT into R IN for a steeper filter slope

## Sessions

See the [Sessions tab](/modules/ikarie/sessions/) for the complete Ikarie curriculum.

## Further Reading

- **Ikarie Manual** -- Complete technical reference covering all controls, signal flow, and patch tips. See `references/ikarie-manual.pdf`.
- **Bastl Instruments** -- [bastl-instruments.com](https://bastl-instruments.com/) for firmware updates and community patches.
