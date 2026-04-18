---
type: overview
instrument: beads
title: "Beads Overview"
manufacturer: "Mutable Instruments"
---

# Mutable Instruments Beads

*Granular texture synthesizer*

**14HP** | Effects

## Architecture

Beads is a granular texture synthesizer that continuously records audio into a buffer and replays it as a cloud of short grains. Each grain captures a slice of the buffer and plays it back with independent control over time position, pitch, duration, and amplitude envelope.

Audio enters through the stereo inputs (IN L / IN R) and is continuously recorded into an internal buffer. The buffer length depends on the quality setting -- from 4 seconds in stereo at full 48kHz/16-bit resolution to 16 seconds in stereo at reduced 24kHz/8-bit "scorched cassette" quality. Grains are generated from this buffer and mixed with the dry signal at the output.

### Grain Generation Modes

Beads offers three grain generation modes, selected by the SEED button [C]:

1. **Latched** (default): Grains are generated continuously at a rate controlled by the DENSITY knob. The SEED button LED pulses slowly to indicate latching is active. Turn DENSITY clockwise from noon for randomly modulated rate, or counterclockwise for constant rate.

2. **Clocked**: When an external clock or sequence is patched into the SEED input [4], grains are triggered by the clock. DENSITY becomes a clock divider/probability control -- at noon, no grains; clockwise increases probability of triggering; counterclockwise increases division ratio.

3. **Gated**: Grains are generated only when the SEED button is held or a gate is high at the SEED input. DENSITY controls the repetition rate of grains. At noon, one grain per press/gate.

### Quality Settings

The QUALITY button [A] cycles through four recording quality modes:

| LED | Quality | Rate | Resolution | Buffer (Mono) | Buffer (Stereo) |
|-----|---------|------|------------|---------------|-----------------|
| Bright | Digital | 48 kHz | 16-bit | 8s | 4s |
| Green | Cold digital | 32 kHz | 12-bit | 16s | 8s |
| Amber | Sunny tape | 24 kHz | 12-bit | 20s | 10s |
| Red | Scorched cassette | 24 kHz | 8-bit | 32s | 16s |

### Special Modes

- **FREEZE** [B]: Latches the buffer contents. No new audio is recorded while FREEZE is engaged. The buffer snapshot is preserved even through power cycles if held for more than 10 seconds.
- **Delay mode**: Setting SIZE fully clockwise creates one infinite grain that acts as a delay or beat slicer. TIME becomes delay time, DENSITY controls slice behavior.
- **Internal wavetable synth**: If no audio input is connected for approximately 10 seconds, Beads switches to an internal wavetable oscillator, allowing it to function as a sound source rather than a processor.

### Signal Flow

The output signal path is: grains + input -> feedback loop -> dry/wet crossfade -> reverb -> stereo output. The FEEDBACK knob mixes processed output back into the input. Each quality setting uses a different feedback amplitude limiting scheme, from clean brickwall limiting to grungy tape saturation.

## Controls Reference

### Recording and Quality

| Control | ID | Type | Function |
|---------|-----|------|----------|
| Quality [A] | button-beads-quality | Button | Cycles 4 quality modes (48kHz/16-bit to 24kHz/8-bit) |
| Freeze [B] | button-beads-freeze | Button | Latches buffer -- stops recording new audio |
| Input Level [2] | led-beads-input-level | LED | Blinks during auto-gain adjustment |

### Grain Generation

| Control | ID | Type | Function |
|---------|-----|------|----------|
| Density [D] | knob-beads-density | Large knob | Grain rate (latched), probability (clocked), or repetition (gated) |
| Seed [C] | button-beads-seed | Button | Toggles grain generation mode; hold/press for gated grains |

### Grain Playback

| Control | ID | Type | Range | Function |
|---------|-----|------|-------|----------|
| Time [E] | knob-beads-time | Large knob | Buffer start to end | Buffer read position for grains |
| Pitch [F] | knob-beads-pitch | Large knob | -24 to +24 semitones | Grain transposition with virtual notches |
| Size [G] | knob-beads-size | Large knob | 30ms to 4s (fully CW = delay) | Grain duration; fully CW = infinite grain (delay mode) |
| Shape [H] | knob-beads-shape | Medium knob | Clicky to reversed | Grain amplitude envelope shape |

### Attenurandomizers [I]

Four small knobs that serve a dual function depending on direction from noon:

| Control | ID | CW from noon | CCW from noon |
|---------|-----|-------------|---------------|
| Time Att | knob-beads-time-atten | CV modulation depth for TIME | Randomization amount for TIME |
| Size Att | knob-beads-size-atten | CV modulation depth for SIZE | Randomization amount for SIZE |
| Shape Att | knob-beads-shape-atten | CV modulation depth for SHAPE | Randomization amount for SHAPE |
| Pitch Att | knob-beads-pitch-atten | CV modulation depth for PITCH | Randomization amount for PITCH |

With no CV patched, CCW from noon uses an internal peaky random source (values clustered at center), while CW from noon uses uniform random distribution.

### Mixing and Output

| Control | ID | Type | Function |
|---------|-----|------|----------|
| Feedback [J] | knob-beads-feedback | Medium knob | Output-to-input feedback amount |
| Dry/Wet [K] | knob-beads-dry-wet | Medium knob | Crossfade between dry input and granular output |
| Reverb [L] | knob-beads-reverb | Medium knob | Built-in reverb amount |
| CV Assign [M] | button-beads-cv-assign | Button | Assigns CV input [7] to Feedback, Dry/Wet, or Reverb |

### Patch Points

| Jack | ID | Type | Signal |
|------|-----|------|--------|
| In L [1] | jack-beads-in-l | Input | Audio |
| In R [1] | jack-beads-in-r | Input | Audio |
| Freeze [3] | jack-beads-freeze-gate | Input | Gate |
| Seed [4] | jack-beads-seed-gate | Input | Gate |
| Density CV [5] | jack-beads-density-cv | Input | CV |
| Time CV [6] | jack-beads-time-cv | Input | CV |
| Size CV [6] | jack-beads-size-cv | Input | CV |
| Shape CV [6] | jack-beads-shape-cv | Input | CV |
| Pitch CV [6] | jack-beads-pitch-cv | Input | CV |
| Assign CV [7] | jack-beads-assign-cv | Input | CV |
| L [8] | jack-beads-out-l | Output | Audio |
| R [8] | jack-beads-out-r | Output | Audio |

## Basic Patch (Init State)

All sessions start from this known state. Set these positions before beginning any session.

| Control | Position | Result |
|---------|----------|--------|
| Density | 12 o'clock (noon) | No grains generated in latched mode |
| Time | 12 o'clock (noon) | Reading from middle of buffer |
| Pitch | 12 o'clock (noon) | No transposition (0 semitones) |
| Size | 12 o'clock (noon) | Medium grain length (~500ms) |
| Shape | 12 o'clock (noon) | Smooth bell-curve envelope |
| All attenurandomizers | 12 o'clock (noon) | No modulation or randomization |
| Feedback | Fully CCW (minimum) | No feedback |
| Dry/Wet | 3 o'clock | Mostly wet (granular output dominant) |
| Reverb | Fully CCW (minimum) | No reverb |
| Quality | First press (bright LED) | 48kHz/16-bit, 4s stereo buffer |
| Freeze | Off | Recording continuously |
| Seed mode | Latched (LED pulsing) | Continuous grain generation |

**Patching:** Connect an audio source to IN L. Connect OUT L to your mixer or audio interface. For stereo operation, also patch IN R and OUT R.

**What you should hear:** With DENSITY turned slightly clockwise from noon, you should hear the incoming audio broken into grains -- a shimmering, slightly delayed version of the input. Turning DENSITY further clockwise increases the grain rate until the texture becomes dense and cloud-like.

## Sessions

See the [Sessions tab](/modules/beads/sessions/) for the complete Beads curriculum.

## Further Reading

- **Beads Manual** -- The complete reference covering all controls, grain modes, attenurandomizer behavior, delay mode, and signal flow. See `references/beads-manual.pdf`.
- **Mutable Instruments Website Archive** -- Technical specifications, patch ideas, and firmware notes. Available via the Wayback Machine at the original Mutable Instruments URLs.
