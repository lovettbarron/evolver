# Just Friends - Mannequins Module Documentation

**Source:** Compiled from whimsicalraps.com, Mannequins Technical Maps (GitHub), and community documentation
**Module:** Mannequins Just Friends
**HP:** 14
**Format:** Eurorack 3U
**Power:** +12V 55mA, -12V 20mA

## Overview

Just Friends is a six-channel function generator and oscillator by Mannequins (Whimsical Raps). It operates in three distinct modes -- Shape, Cycle, and Sound -- selected by a combination of two switches: SOUND/SHAPE and MODE (Transient/Sustain/Cycle). Each mode fundamentally changes how the module behaves, making it one of the most versatile modules in eurorack.

At its core, Just Friends generates slopes (rising and falling voltage segments). How those slopes are triggered, shaped, and output depends on the mode configuration. All six channels share global controls (TIME, INTONE, CURVE, RAMP) but produce independent outputs.

## Architecture

### Six Channels

Just Friends has six channels, each with:
- A trigger/gate input jack
- An LED indicator
- An output jack

The channels are named:
1. **IDENTITY** (fundamental)
2. **2N** (2nd harmonic)
3. **3N** (3rd harmonic)
4. **4N** (4th harmonic)
5. **5N** (5th harmonic)
6. **6N** (6th harmonic)

The naming reflects the harmonic series relationship when INTONE is engaged -- each channel operates at an integer multiple of the base TIME rate.

### Trigger Input Normalling

The trigger inputs are normalled in a cascade:
- IDENTITY input normalles down to 2N
- 2N normalles down to 3N
- 3N normalles down to 4N
- 4N normalles down to 5N
- 5N normalles down to 6N

This means patching a single trigger to IDENTITY triggers all six channels simultaneously. Patching into a lower channel breaks the normalling chain at that point.

### MIX Output

The MIX output is an equal mix of all six channel outputs. This is particularly useful in Sound mode for hearing all oscillators as a chord.

## Controls

### TIME (large knob, upper right)

Sets the base rate/speed for all six channels.
- **Shape mode:** Controls envelope speed (60s slow to 8Hz fast)
- **Cycle mode:** Controls LFO rate
- **Sound mode:** Controls pitch (V/Oct tracking via TIME CV input)

The scale markings show 60s to 60Hz range, with 8s and 8Hz intermediary markers.

### INTONE (large knob, upper left)

Controls the harmonic spread between channels.
- **Center (12 o'clock):** All channels at the same rate
- **Clockwise:** Channels spread to integer harmonic ratios (2N = 2x, 3N = 3x, etc.)
- **Counter-clockwise:** Channels compress below the fundamental rate

INTONE is one of Just Friends' most distinctive features -- it creates six related but different rates/pitches from a single TIME setting.

### FM (center knob, white/silver)

Attenuverter for the FM input jack. When FM jack is unpatched, acts as a fine-tune control.
- Bipolar: center = no modulation, CW = positive, CCW = negative
- At audio rates, enables through-zero FM synthesis

### CURVE (knob, right side)

Controls the waveshape of the slopes.
- **Center:** Linear slopes
- **Clockwise:** Exponential (sharp attack, slow release)
- **Counter-clockwise:** Logarithmic (slow attack, sharp release)

### RAMP (knob, left side)

Controls the asymmetry between rise and fall times.
- **Center:** Symmetrical (equal rise and fall)
- **Clockwise:** Longer fall, shorter rise (percussive envelopes)
- **Counter-clockwise:** Longer rise, shorter fall (reversed envelopes)

### SOUND/SHAPE Switch (2-way toggle)

Selects the fundamental operating domain:
- **Shape:** Function generator (envelopes, LFOs)
- **Sound:** Oscillator (audio-rate signals)

### MODE Switch (3-way toggle)

Selects the trigger/gate response:
- **Transient (top):** Triggered slopes -- ignores gate length
- **Sustain (middle):** Gated slopes -- ASR envelope behavior
- **Cycle (bottom):** Free-running -- channels cycle continuously

## Inputs

### Trigger/Gate Inputs (6)

Six trigger/gate input jacks (IDENTITY, 2N, 3N, 4N, 5N, 6N). Behavior depends on MODE switch:
- **Transient:** Rising edge triggers a complete slope
- **Sustain:** Gate high = rise + sustain, gate low = fall
- **Cycle:** Trigger starts cycling, re-trigger resets phase

### RUN Jack

The RUN jack enables continuous operation and changes behavior across all modes:
- **Shape + RUN high:** Channels run continuously as LFOs
- **Cycle + RUN:** Enables Volley (gate) and Floom (CV) behaviors
- **Sound + RUN:** Enables Plume mode (dynamic voice allocation)

RUN fundamentally extends JF's capabilities beyond basic triggered/gated operation.

### TIME CV Input (V/Oct)

1V/octave pitch tracking input. Primary pitch control in Sound mode. In Shape/Cycle modes, modulates the base rate.

### INTONE CV Input

CV control over harmonic spread. Adds to the INTONE knob position.

### FM CV Input

Modulation input for frequency modulation. Amount controlled by the FM attenuverter knob. Enables through-zero FM at audio rates.

## Outputs

### Channel Outputs (6)

Six individual channel outputs (IDENTITY, 2N, 3N, 4N, 5N, 6N). Output signal depends on mode:
- **Shape:** Envelope/LFO voltages (0-8V unipolar)
- **Cycle:** LFO voltages (bipolar approximately +/-5V)
- **Sound:** Audio-rate waveforms

### MIX Output

Equal mix of all six channels. Particularly useful for:
- Monitoring all channels at once
- Hearing chord voicings in Sound mode
- Creating complex modulation from multiple LFOs

## Modes in Detail

### Shape Mode (SOUND/SHAPE = Shape)

Function generator mode. Generates slopes in response to triggers or gates.

**Shape + Transient:** Each trigger fires a complete attack-decay envelope. CURVE shapes the curve. RAMP sets attack/decay ratio. Great for percussive modulation.

**Shape + Sustain:** Each gate produces an ASR (attack-sustain-release) envelope. Gate length determines sustain duration. Classic envelope generator behavior.

**Shape + Cycle:** Channels loop continuously. Adding a RUN signal creates burst behavior:
- **Strata:** RUN gate high = channels cycle, low = stop
- **Burst:** RUN trigger causes a finite burst of cycles

### Cycle Mode (SOUND/SHAPE = Shape, MODE = Cycle)

LFO mode with phase relationships between channels. INTONE creates polyrhythmic patterns with integer-ratio relationships.

**Cycle + RUN (Volley):** Gate input to RUN enables/disables cycling. Channels accumulate phase offsets.

**Cycle + RUN (Floom):** CV to RUN smoothly controls cycling amplitude. Crossfades between static and cycling.

### Sound Mode (SOUND/SHAPE = Sound)

Audio-rate oscillator mode. TIME becomes pitch control (V/Oct via TIME CV). INTONE creates chord intervals.

**Sound + Transient:** Each trigger plays a note (plucked/percussive oscillator)

**Sound + Sustain:** Each gate plays a sustained note

**Sound + Cycle (Plume):** Free-running oscillators. With RUN, enables dynamic voice allocation -- triggers assign voices from a pool.

## i2c Interface (Just Type Protocol)

Just Friends supports i2c communication via the Mannequins bus connector. The primary controller is Monome Crow, but Teletype and other i2c hosts also work.

### Key Commands

| Command | Description |
|---------|-------------|
| `ii.jf.trigger(channel, state)` | Trigger a specific channel |
| `ii.jf.play_note(pitch, level)` | Play a note with dynamic voice allocation |
| `ii.jf.play_voice(channel, pitch, level)` | Play a note on a specific channel |
| `ii.jf.mode(state)` | Enter/exit Synthesis mode |
| `ii.jf.run_mode(mode)` | Set RUN behavior |
| `ii.jf.transpose(pitch)` | Transpose all channels |
| `ii.jf.vtrigger(channel, level)` | Velocity-sensitive trigger |
| `ii.jf.tick(divisions)` | Clock input for Geode mode |
| `ii.jf.retune(channel, numerator, denominator)` | Custom INTONE ratios |
| `ii.jf.god_mode(state)` | Enable/disable alternate tuning |
| `ii.jf.pitch(channel, pitch)` | Set channel pitch directly |
| `ii.jf.address(addr)` | Set i2c address |
| `ii.jf.speed(state)` | Toggle speed range |
| `ii.jf.quantize(state)` | Toggle quantization |

### Synthesis Mode (via i2c)

Entering Synthesis mode (`ii.jf.mode(1)`) unlocks additional capabilities:
- Dynamic voice allocation with `play_note`
- Individual voice control with `play_voice`
- Geode rhythmic mode with `tick`

### Geode Mode

When Synthesis mode is active and `tick` commands are received, Just Friends enters Geode mode -- a rhythmic subdivision engine. Each channel responds to different divisions of the incoming clock, creating polyrhythmic patterns.

## Technical Specifications

| Spec | Value |
|------|-------|
| Width | 14HP |
| Depth | 25mm |
| Power (+12V) | 55mA |
| Power (-12V) | 20mA |
| Output range | Approximately +/-8V |
| V/Oct tracking | Via TIME CV input |
| i2c address | 0x70 (default) |

## Panel Layout

The Just Friends panel follows a columnar eurorack layout:

```
Top:          JUST FRIENDS title
Upper:        INTONE (large, left)    TIME (very large, right)
Middle:       RAMP (left)   FM (center, silver)   CURVE (right)
Switches:     MODE 3-way (far left)   SOUND/SHAPE 2-way (center-left)
CV row:       RUN  RAMP  FM  V/8TIME jacks + INTONE CURVE labels + MIX out
Trigger row:  6 trigger jacks with LEDs
Output row:   IDENTITY  2N  3N  4N  5N  6N output jacks
Bottom:       MANNEQUINS brand text
```

## Signal Flow

```
Trigger/Gate Input --> Function Generator Channel --> Channel Output
                  |                                    |
                  +-- Normalling chain                 +--> MIX Output
                      (IDENTITY cascades to 6N)

Global Controls:
  TIME ---------> Base rate (all channels)
  INTONE -------> Harmonic spread (per channel offset)
  CURVE --------> Waveshape (all channels)
  RAMP ---------> Rise/fall asymmetry (all channels)
  FM -----------> Frequency modulation (all channels)
  RUN ----------> Continuous operation enable

Mode Selection:
  SOUND/SHAPE --> Domain (function gen vs oscillator)
  MODE ---------> Response (transient/sustain/cycle)
```

## References

- Whimsical Raps official documentation: https://www.whimsicalraps.com/pages/just-friends
- Mannequins Technical Maps: https://github.com/whimsicalraps/Mannequins-Technical-Maps
- Just Type i2c protocol: https://github.com/whimsicalraps/Just-Friends/blob/main/Just-Type.md
- Lines community: https://llllllll.co/t/just-friends/22758
- ModularGrid: https://modulargrid.net/e/mannequins-just-friends
