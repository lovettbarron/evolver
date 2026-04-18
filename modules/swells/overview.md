---
type: overview
instrument: swells
title: "Swells Overview"
manufacturer: "Intellijel"
---

# Intellijel Swells

*Multi-algorithm stereo reverb with swell generator*

**20HP** | Effects

## Architecture

Swells is a multi-algorithm stereo reverb processor with 9 distinct reverb algorithms selectable via front panel buttons. Audio enters through stereo inputs (IN L, IN R) and exits through stereo outputs (L, R), with a sidechain input for envelope follower triggering from a separate source.

The core reverb engine is controlled by 8 vertical faders: PRE-DELAY, SIZE, DECAY, HI DAMP, LO DAMP, EQ, EBB, and FLOW. The first 6 parameters behave consistently across all algorithms, while EBB and FLOW are algorithm-specific -- they control different tonal and modulation characteristics depending on which of the 9 algorithms is active.

Two additional level faders control INPUT level (pre-reverb gain) and MIX (dry/wet balance). A DRIVE knob adds saturation to the input stage, and TRIM adjusts overall output level.

The built-in Swell Generator is a dynamics processor comprising an envelope follower and an AR (attack-release) envelope. RISE and FALL knobs control the envelope shape, THRESHOLD sets the trigger sensitivity, and EF GAIN / EF HIGH CUT shape the envelope follower response. The Swell Generator outputs a CV signal from the SWELL CV jack, which can control other modules in a patch.

Performance features include FREEZE (captures and holds the current reverb tail indefinitely), REVERSE (plays the reverb tail backwards), BURST (triggers a burst of reverb energy), and SWELL (engages the Swell Generator). LO-FI mode adds bit-crush and sample-rate reduction in 3 positions (OFF, MIN, MAX).

## Controls Reference

### Reverb Parameters

| Control | Type | Function |
|---------|------|----------|
| PRE-DELAY | Fader | Time before reverb onset |
| SIZE | Fader | Virtual room size |
| DECAY | Fader | Reverb tail length |
| HI DAMP | Fader | High frequency absorption |
| LO DAMP | Fader | Low frequency absorption |
| EQ | Fader | Tonal shaping of reverb |
| EBB | Fader | Algorithm-specific parameter 1 |
| FLOW | Fader | Algorithm-specific parameter 2 |

### Level Controls

| Control | Type | Function |
|---------|------|----------|
| INPUT | Fader | Pre-reverb input level |
| MIX | Fader | Dry/wet balance |
| DRIVE | Knob | Input saturation amount |
| TRIM | Knob | Output level trim |

### Swell Generator

| Control | Type | Function |
|---------|------|----------|
| RISE | Knob | Envelope attack time |
| FALL | Knob | Envelope release time |
| THRESHOLD | Knob | Envelope trigger sensitivity |
| EF GAIN | Knob | Envelope follower gain |
| EF HIGH CUT | Knob | Envelope follower high-frequency cutoff |

### Performance Buttons

| Control | Type | Function |
|---------|------|----------|
| SWELL | Button | Engage Swell Generator |
| FREEZE | Button | Capture and hold reverb tail |
| BURST | Button | Trigger reverb burst |
| REVERSE | Button | Reverse reverb tail playback |
| MODEL UP | Button | Cycle to next algorithm |
| MODEL DOWN | Button | Cycle to previous algorithm |

### Switches

| Control | Type | Positions | Function |
|---------|------|-----------|----------|
| LO-FI | 3-position | OFF / MIN / MAX | Bit-crush and sample-rate reduction |
| EF SOURCE | 3-position | IN / SC / OUT | Envelope follower source selection |

### Audio I/O

| Jack | Direction | Signal | Function |
|------|-----------|--------|----------|
| IN L | Input | Audio | Left audio input (mono if only this patched) |
| IN R | Input | Audio | Right audio input |
| SIDECHAIN | Input | Audio | External sidechain input for envelope follower |
| L | Output | Audio | Left audio output |
| R | Output | Audio | Right audio output |

### CV

| Jack | Direction | Signal | Function |
|------|-----------|--------|----------|
| PRE-DELAY CV | Input | CV | Voltage control of pre-delay |
| SIZE CV | Input | CV | Voltage control of size |
| DECAY CV | Input | CV | Voltage control of decay |
| HI DAMP CV | Input | CV | Voltage control of high damping |
| LO DAMP CV | Input | CV | Voltage control of low damping |
| EBB CV | Input | CV | Voltage control of Ebb parameter |
| FLOW CV | Input | CV | Voltage control of Flow parameter |
| TRIG | Input | Gate | Assignable trigger input |
| EF IN | Input | CV | External envelope follower input |
| SWELL CV | Output | CV | Swell Generator envelope output |

## Basic Patch (Init State)

Start every session from this known state:

1. All 8 reverb faders at **12 o'clock** (noon)
2. INPUT fader at **12 o'clock**
3. MIX fader at **12 o'clock** (50% wet)
4. DRIVE at **minimum** (fully CCW)
5. TRIM at **12 o'clock**
6. Select **Fog** algorithm (first algorithm)
7. LO-FI switch to **OFF**
8. EF SOURCE switch to **IN**
9. Patch audio source to **IN L**
10. Patch **L** output to mixer or monitors

## 9 Algorithms Reference

| Algorithm | Character | Best For |
|-----------|-----------|----------|
| Fog | Diffuse, cloudy | Ambient washes, subtle space |
| Blur | Smeared, soft | Blurred textures, gentle decay |
| Shadow | Dark, cavernous | Deep spaces, low-end emphasis |
| Velvet | Lush, shimmering | Shimmer effects, harmonic richness |
| Asterion | Spectral, otherworldly | Experimental textures, alien spaces |
| Deadspace | Void-like, hollow | Dark ambient, horror-adjacent |
| Buckets | Bucket-brigade character | Analog-style modulated reverb |
| Ritual | Ritualistic, resonant | Metallic resonance, ritual drones |
| Gaze | Hypnotic, deep | Shoegaze, deep immersion |

## Further Reading

- [Intellijel Swells Product Page](https://intellijel.com/shop/eurorack/swells/) -- Manual download available under Manual tab
