---
type: overview
instrument: just-friends
title: "Just Friends Overview"
manufacturer: "Mannequins"
---

# Mannequins Just Friends

*Six-channel function generator and oscillator*

**14HP** | Function Generator, Envelope Generator, LFO, VCO

## Architecture

Just Friends is a six-channel function generator that operates in three distinct modes -- Shape, Cycle, and Sound -- selected by a combination of two switches. The SOUND/SHAPE switch selects the operating domain (function generator vs audio-rate oscillator), while the MODE switch selects the trigger response (Transient, Sustain, or Cycle). Together, these two switches create six fundamental behaviors from a single module.

All six channels share four global controls: TIME sets the base rate, INTONE spreads the channels across harmonic ratios, CURVE shapes the waveshape (linear to exponential to logarithmic), and RAMP controls the asymmetry between rise and fall times. Despite sharing these controls, each channel produces an independent output.

The six channels are named after their harmonic relationship: IDENTITY (fundamental), 2N (2nd harmonic), 3N (3rd harmonic), 4N (4th harmonic), 5N (5th harmonic), and 6N (6th harmonic). When INTONE is at noon, all channels operate at the same rate. As INTONE is turned clockwise, each channel shifts to an integer multiple of the base TIME rate, creating harmonically related envelopes, LFOs, or oscillator pitches.

Trigger inputs are normalled in a cascade: patching a trigger to IDENTITY automatically triggers all six channels below it. Patching into a lower channel (e.g., 3N) breaks the chain at that point -- channels above receive the trigger, channels below do not. This normalling makes it easy to trigger all channels from a single source or to create independent trigger patterns.

The RUN jack fundamentally extends Just Friends beyond basic triggered operation. With a high voltage at RUN, channels operate continuously. The specific behavior depends on the mode: in Shape mode, RUN creates LFO-like cycling. In Cycle mode, RUN enables Volley and Floom behaviors. In Sound mode, RUN activates Plume mode for dynamic voice allocation.

## Controls Reference

### Global Controls

| Control | Type | Range | Function |
|---------|------|-------|----------|
| TIME | Large knob | 60s to 60Hz | Base rate for all channels. V/Oct tracking via TIME CV input in Sound mode |
| INTONE | Large knob | Compressed to Spread | Harmonic spread between channels. Center = all same rate. CW = integer harmonic ratios |
| FM | Knob (attenuverter) | Bipolar | Amount and polarity of frequency modulation from FM CV input. Acts as fine-tune when FM jack is unpatched |
| CURVE | Knob | Log to Exp | Waveshape of slopes. Center = linear. CW = exponential. CCW = logarithmic |
| RAMP | Knob | Fall-heavy to Rise-heavy | Rise/fall asymmetry. Center = symmetrical. CW = longer fall (percussive). CCW = longer rise |
| SOUND/SHAPE | 2-way switch | Sound / Shape | Operating domain: function generator (Shape) or audio-rate oscillator (Sound) |
| MODE | 3-way switch | Transient / Sustain / Cycle | Trigger response: triggered slope / gated ASR / free-running |

### Inputs

| Jack | Signal Type | Function |
|------|------------|----------|
| IDENTITY trigger | Gate | Trigger/gate input for channel 1. Normalled to all channels below |
| 2N trigger | Gate | Trigger/gate input for channel 2. Normalled from IDENTITY |
| 3N trigger | Gate | Trigger/gate input for channel 3. Normalled from 2N |
| 4N trigger | Gate | Trigger/gate input for channel 4. Normalled from 3N |
| 5N trigger | Gate | Trigger/gate input for channel 5. Normalled from 4N |
| 6N trigger | Gate | Trigger/gate input for channel 6. Normalled from 5N |
| V/8 TIME | CV (1V/Oct) | Pitch/rate CV input. Primary pitch control in Sound mode |
| INTONE | CV | Modulation of harmonic spread. Adds to INTONE knob position |
| FM | CV | Frequency modulation input. Amount controlled by FM knob |
| RUN | CV/Gate | Enables continuous operation. Changes behavior in all modes |

### Outputs

| Jack | Signal Type | Function |
|------|------------|----------|
| IDENTITY | CV/Audio | Channel 1 output |
| 2N | CV/Audio | Channel 2 output |
| 3N | CV/Audio | Channel 3 output |
| 4N | CV/Audio | Channel 4 output |
| 5N | CV/Audio | Channel 5 output |
| 6N | CV/Audio | Channel 6 output |
| MIX | CV/Audio | Equal mix of all six channel outputs |

### LEDs

Six LEDs (one per channel) indicate the current output voltage of each channel. In Shape mode they show envelope activity. In Cycle mode they show LFO phase. In Sound mode they blur at audio rates.

## Recommended Init State

Use this starting position before each session unless the session specifies otherwise:

| Control | Position | Notes |
|---------|----------|-------|
| SOUND/SHAPE | Shape | Function generator domain |
| MODE | Transient | Triggered envelopes |
| TIME | 12 o'clock | Medium rate |
| INTONE | 12 o'clock | All channels at same rate |
| CURVE | 12 o'clock | Linear slopes |
| RAMP | 12 o'clock | Symmetrical rise/fall |
| FM | 12 o'clock (center) | No modulation |
| Patches | None | All jacks unpatched |

**Trigger normalling note:** With no cables patched to the trigger inputs, patching a single trigger to IDENTITY will trigger all six channels simultaneously (the normalling cascade is active). This is the simplest way to hear all channels respond together.

## Signal Flow

```
Trigger/Gate --> [IDENTITY] --> normalling cascade --> [2N] [3N] [4N] [5N] [6N]
                     |              |        |      |      |      |
                     v              v        v      v      v      v
               Function Gen   Function Gen (x5, harmonically offset via INTONE)
                     |              |        |      |      |      |
                     v              v        v      v      v      v
                IDENTITY out    2N out   3N out  4N out  5N out  6N out
                     |              |        |      |      |      |
                     +------+-------+--------+------+------+------+
                            |
                            v
                         MIX out

Global modifiers:
  TIME -------> Base rate (all channels)
  INTONE -----> Per-channel rate offset (harmonic ratios)
  CURVE ------> Waveshape (all channels)
  RAMP -------> Rise/fall ratio (all channels)
  FM ---------> Frequency modulation (all channels)
  RUN --------> Continuous operation mode
```

## Mode Matrix

| SOUND/SHAPE | MODE | Behavior |
|-------------|------|----------|
| Shape | Transient | Triggered attack-decay envelopes |
| Shape | Sustain | Gated ASR (attack-sustain-release) envelopes |
| Shape | Cycle | Free-running function generator (LFO-like) |
| Sound | Transient | Triggered oscillator (plucked/percussive) |
| Sound | Sustain | Gated oscillator (sustained notes) |
| Sound | Cycle | Free-running oscillator bank |

Adding RUN to any mode enables continuous operation and unlocks additional behaviors (Strata, Burst, Volley, Floom, Plume).
