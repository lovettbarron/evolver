---
type: overview
instrument: evolver
title: "Evolver Architecture Overview"
manufacturer: "Dave Smith Instruments"
---

# Dave Smith Mono Evolver Keyboard

## Identity

- **Manufacturer**: Dave Smith Instruments (now Sequential)
- **Type**: Monophonic analog/digital hybrid synthesizer
- **Keyboard**: 3-octave (37 keys) with velocity and aftertouch
- **Programs**: 512 (4 banks x 128)
- **Year**: ~2005-2010
- **OS**: Version 1.3+

## What Makes It Special

The Evolver is a **true stereo** synthesizer with parallel left/right signal paths. It combines:

- 2 analog oscillators (warm, fat, modern CEM-style)
- 2 digital oscillators (Prophet-VS waveshapes, 128 waves including user-loadable)
- 2 independent analog lowpass filters (one per channel)
- Digital highpass filter
- 3 ADSR envelopes
- 4 LFOs
- 4-track 16-step sequencer
- Stereo digital delay
- Tuned feedback
- Distortion, output hack
- External audio processing

The analog/digital hybrid architecture is its superpower -- you get warmth from the analog path and complexity from the digital, with the DSP handling modulation calculations at high precision.

## Voice Architecture

### Analog/Digital Hybrid Design

The Evolver voice is built around a high-speed Digital Signal Processor (DSP) that surrounds the analog electronics. The DSP computes control voltages for the analog circuitry with high precision, and also provides the digital audio functions.

**Analog components** (per channel):
- 1 analog waveshape oscillator (saw, triangle, saw-tri mix, pulse with variable width)
- 1 resonant lowpass filter (switchable 2-pole/4-pole, self-oscillating in 4-pole mode)
- 1 VCA (voltage controlled amplifier)

**Digital components** (shared/stereo):
- 2 digital oscillators (Prophet-VS waveshapes 1-128, including 32 user-loadable)
- FM synthesis between digital oscillators (bidirectional)
- Ring modulation between digital oscillators (bidirectional)
- Highpass filter (4-pole digital, pre/post switchable)
- Distortion with noise gate (pre/post switchable)
- 3-tap digital delay (up to 1 second, 16-bit 48kHz, tempo-syncable)
- Tuned feedback via two delay lines (one per channel)
- Output hack (bit-crushing effect)
- All modulation calculations (envelopes, LFOs, routing)

**Converters**: Two sets of stereo A/D and D/A converters running at 48kHz sampling rate with 24 bits of precision bridge the analog and digital sections.

### Stereo Signal Path

The stereo architecture is fundamental to the Evolver's character:

- **Left channel**: Analog Osc 1 + Digital Osc 3 + Noise + External In L --> Analog LPF L --> VCA L
- **Right channel**: Analog Osc 2 + Digital Osc 4 + Noise + External In R --> Analog LPF R --> VCA R
- **Post-VCA** (digital, stereo): HPF --> Distortion --> Pan --> Delay --> Tuned Feedback --> Output

The two analog lowpass filters are normally driven together in tandem but can be separated using the Split parameter or independent filter modulation destinations. Since they are true analog, there are always subtle differences between the two, giving a natural stereo character.

### Modulation Architecture

The Evolver provides extensive modulation capabilities:

- **3 ADSR envelopes**: ENV 1 (dedicated to filter), ENV 2 (dedicated to VCA), ENV 3 (freely assignable with delay parameter)
- **4 LFOs**: Each with shape (tri, rev saw, saw, square, random), frequency (0-150 or tempo-synced), amount, destination, and key sync
- **4 modulation slots**: Any source --> amount --> any destination routing
- **4-track 16-step sequencer**: Each track can target any modulation destination
- **MIDI controllers**: Velocity, aftertouch/pressure, mod wheel, breath, foot controller -- each with assignable destination and amount
- **External input analysis**: Envelope follower and peak hold for sidechain-style modulation

Modulation destinations include nearly every synthesis parameter (oscillator frequency, level, shape/PW, filter cutoff, resonance, envelope times, delay parameters, feedback, etc.) plus sequencer-only MIDI destinations for controlling external gear.

### Filter Topology

The analog lowpass filters are the heart of the Evolver's sound shaping:

- **2-pole mode**: -12dB/octave slope, gentler rolloff, does not self-oscillate
- **4-pole mode**: -24dB/octave slope, steeper rolloff, self-oscillates at high resonance
- **Frequency range**: 0-164 (over 13 octaves) with special smoothing for clean manual sweeps
- **Envelope amount**: Bipolar (-99 to +99) for inverted envelope control
- **Audio modulation**: Analog oscillator modulates its own channel's filter (Osc 1 --> LPF L, Osc 2 --> LPF R)
- **Key tracking**: 0-100 (72 = 1 semitone per note for pitch tracking)
- **Split**: Separates L/R filter cutoffs (raises left, lowers right)

The digital highpass filter (4-pole) can be positioned pre or post the analog filter chain, dramatically changing its role in the signal path.

## Program Organization (Factory)

| Bank | Programs | Content |
|------|----------|---------|
| 1 | 1-128 | Classic keyboard sounds |
| 2 | 1-128 | Classic keyboard sounds |
| 3 | 1-128 | Sequencer-based (use Start/Stop, not keyboard) |
| 4 | 1-19 | Drones (always playing) |
| 4 | 20-29 | Guitar signal processing |
| 4 | 30-39 | Stereo signal processing |
| 4 | 40-127 | Misc keyboard sounds |
| Any | 128 | Basic init patch (good starting point) |

## Controls

- **Knobs**: 58 total (43 pots + 15 encoders)
- **Pot modes**: Relative, Passthru, Jump
- **LCD**: 2x16 character display
- **Navigation**: PARAM 1 (value/program), PARAM 2 (value/bank), +/YES, -/NO
- **Dedicated switches**: Osc 1-4 select, Delay 1-3 select, 4-pole, Sync, Compare, Write
- **Sequence LEDs**: 16 step indicators (double as VU meter in input gain mode)

## Key Capabilities for Learning

1. **Subtractive synthesis** -- analog oscillators --> analog filters (the classic)
2. **Digital waveshape synthesis** -- 128 waveshapes from Prophet-VS lineage
3. **FM synthesis** -- digital oscillators can FM each other (bidirectional)
4. **Ring modulation** -- digital oscillators can ring mod each other (bidirectional)
5. **Hard sync** -- Osc 2 syncs Osc 1
6. **Karplus-Strong** -- physical modeling via tuned feedback + noise
7. **Step sequencing** -- 4 tracks, 16 steps, any parameter as destination
8. **External processing** -- use as a stereo effects unit with envelope follower
9. **Poly chaining** -- link with other Evolvers/Poly Evolvers for polyphony
