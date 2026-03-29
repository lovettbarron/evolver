---
type: basic-patch
instrument: evolver
title: "Evolver Basic Patch"
manufacturer: "Dave Smith Instruments"
---

# The Basic Patch

The "home base" for all learning sessions. Adapted from Anu Kirk's Definitive Guide to Evolver (p.7-8). This is a minimal, neutral patch that lets you isolate and hear the effect of any single parameter change.

**Save this to Program 128 in Bank 1** (and a backup copy elsewhere).

## Why This Matters

Without a known starting state, you can't isolate what you're learning. When you turn a knob and hear a change, you need to know that change came from *that knob* and not some other parameter interaction. The basic patch is your lab bench.

Source: Anu Kirk Guide p.7 -- "The Basic Patch"

## Complete Parameter Dump

Every parameter on the Evolver front panel, organized by section. Values sourced from Anu Kirk's basic patch table (p.7-8) and verified against the DSI Manual parameter definitions (p.14-26).

### Global Parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| Main Volume | 75 | Overall output level |
| Pot Mode | Relative | Recommended for learning -- changes are relative to stored values |

Source: Anu Kirk Guide p.7, DSI Manual p.13

### Oscillator 1 (Analog, Left Channel)

| Parameter | Value | Notes |
|-----------|-------|-------|
| Frequency | C0 | Base pitch, lowest practical range. C3 = middle C |
| Fine | 0 | No detuning (range: -50 to +50 cents) |
| Shape | Saw | Sawtooth wave -- rich harmonics, good for hearing filter changes |
| Level | 50 | Half volume (range: 0-100) |
| Glide | 0 | No portamento (range: 0-100, or Finger 02-100, or Keybd Off) |

### Oscillator 2 (Analog, Right Channel)

| Parameter | Value | Notes |
|-----------|-------|-------|
| Frequency | C0 | Same as Osc 1 |
| Fine | 0 | No detuning |
| Shape | Saw | Sawtooth wave |
| Level | 50 | Half volume |
| Glide | 0 | No portamento |

### Analog Oscillator Shared Parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| Sync 2->1 | OFF | No hard sync (Osc 2 does not reset Osc 1) |
| Osc Slop | 0 | No random frequency drift (range: 0-5) |

### Oscillator 3 (Digital, Left Channel)

| Parameter | Value | Notes |
|-----------|-------|-------|
| Frequency | C0 | Base pitch |
| Fine | 0 | No detuning |
| Shape | 1 | Sine wave (first waveshape in Prophet-VS set) |
| Level | 50 | Half volume |
| Glide | 0 | No portamento |
| FM 4->3 | 0 | No frequency modulation from Osc 4 (range: 0-100) |
| Ring Mod 4->3 | 0 | No ring modulation from Osc 4 (range: 0-100) |
| Shape Seq | OFF | No waveshape sequencing |

### Oscillator 4 (Digital, Right Channel)

| Parameter | Value | Notes |
|-----------|-------|-------|
| Frequency | C0 | Base pitch |
| Fine | 0 | No detuning |
| Shape | 1 | Sine wave |
| Level | 50 | Half volume |
| Glide | 0 | No portamento |
| FM 3->4 | 0 | No frequency modulation from Osc 3 (range: 0-100) |
| Ring Mod 3->4 | 0 | No ring modulation from Osc 3 (range: 0-100) |
| Shape Seq | OFF | No waveshape sequencing |

### Noise

| Parameter | Value | Notes |
|-----------|-------|-------|
| Volume | 0 | No noise mixed in (range: 0-100, feeds both channels equally) |

### Lowpass Filter (Analog, L+R in tandem)

| Parameter | Value | Notes |
|-----------|-------|-------|
| Frequency | 164 | Wide open -- maximum cutoff, all harmonics pass through (range: 0-164) |
| Resonance | 0 | No resonance (range: 0-100, self-oscillates in 4-pole at high values) |
| 2/4 Pole | 2P | 2-pole mode (-12dB/oct). 4-pole is -24dB/oct and can self-oscillate |
| Env Amount | 0 | No filter envelope modulation (range: -99 to +99) |
| Velocity | 0 | No velocity sensitivity on filter envelope |
| Key Amount | 0 | No keyboard tracking on filter cutoff (72 = 1 semitone/note) |
| Audio Mod | 0 | No audio-rate modulation from analog osc (range: 0-100) |
| Split | 0 | L/R filters locked together (range: 0-100, raises L / lowers R) |

### Filter Envelope (ENV 1)

| Parameter | Value | Notes |
|-----------|-------|-------|
| Attack | 0 | Instant attack (range: 0-110) |
| Decay | 0 | No decay (range: 0-110) |
| Sustain | 100 | Full sustain -- filter stays open while key held (range: 0-100) |
| Release | 0 | Instant release (range: 0-110) |

### VCA (Amplifier)

| Parameter | Value | Notes |
|-----------|-------|-------|
| Level | 0 | No base level -- sound only when envelope is active (range: 0-100) |
| Env Amount | 100 | Full envelope control of amplitude (range: 0-100) |
| Velocity | 0 | No velocity sensitivity on VCA envelope |
| Output Pan | St1 | Full stereo (L fully left, R fully right). Options: St1, St2, St3, Mono, rSt1, rSt2, rSt3 |
| Volume | 100 | Voice volume at maximum (range: 0-100) |

### VCA Envelope (ENV 2)

| Parameter | Value | Notes |
|-----------|-------|-------|
| Attack | 0 | Instant attack (range: 0-110) |
| Decay | 0 | No decay (range: 0-110) |
| Sustain | 100 | Full sustain -- sound holds at full level while key pressed (range: 0-100) |
| Release | 0 | Instant release (range: 0-110) |

### Highpass Filter (Digital)

| Parameter | Value | Notes |
|-----------|-------|-------|
| Frequency | 0 | No high-pass filtering (range: 0-99) |

### Tuned Feedback

| Parameter | Value | Notes |
|-----------|-------|-------|
| Frequency | 0 | C0, lowest feedback pitch (range: 0-48, steps in semitones C0-C4) |
| Level | 0 | No feedback (range: 0-100, oscillates at high levels) |
| Grunge | OFF | No nasty feedback character |

### Distortion

| Parameter | Value | Notes |
|-----------|-------|-------|
| Amount | 0 | No distortion (range: 0-99). Note: noise gate activates at any non-zero value |

### Output Hack

| Parameter | Value | Notes |
|-----------|-------|-------|
| Amount | 0 | No bit-crushing (range: 0-14) |

### Delay (All 3 Taps)

| Parameter | Value | Notes |
|-----------|-------|-------|
| Time 1 | 0 | No delay on tap 1 (range: 0-150, or sync values) |
| Level 1 | 0 | Tap 1 silent |
| Time 2 | 0 | No delay on tap 2 |
| Level 2 | 0 | Tap 2 silent |
| Time 3 | 0 | No delay on tap 3 |
| Level 3 | 0 | Tap 3 silent |
| Feedback 1 | 0 | No delay self-feedback (range: 0-100) |
| Feedback 2 | 0 | No delay-to-filter feedback (range: 0-100) |

### Envelope 3 (Mod Envelope)

| Parameter | Value | Notes |
|-----------|-------|-------|
| Destination | OFF | No modulation target |
| Amount | 0 | No modulation amount (range: -99 to +99) |
| Velocity | 0 | No velocity sensitivity |
| Delay | 0 | No pre-attack delay (range: 0-100) |
| Attack | 0 | Instant attack (range: 0-110) |
| Decay | 0 | No decay (range: 0-110) |
| Sustain | 0 | Zero sustain (range: 0-100) |
| Release | 0 | Instant release (range: 0-110) |

### LFO 1 (Low Frequency Oscillator)

| Parameter | Value | Notes |
|-----------|-------|-------|
| Frequency | 0 | Slowest rate (range: 0-150, or sync values) |
| Shape | Tri | Triangle wave (options: Tri, RevSaw, Saw, Square, Random) |
| Amount | 0 | No modulation (range: 0-100) |
| Destination | OFF | No modulation target |
| Key Sync | OFF | LFO free-runs (does not restart on key press) |

### LFO 2

| Parameter | Value | Notes |
|-----------|-------|-------|
| Frequency | 0 | Slowest rate |
| Shape | Tri | Triangle wave |
| Amount | 0 | No modulation |
| Destination | OFF | No modulation target |
| Key Sync | OFF | Free-running |

### LFO 3

| Parameter | Value | Notes |
|-----------|-------|-------|
| Frequency | 0 | Slowest rate |
| Shape | Tri | Triangle wave |
| Amount | 0 | No modulation |
| Destination | OFF | No modulation target |
| Key Sync | OFF | Free-running |

### LFO 4

| Parameter | Value | Notes |
|-----------|-------|-------|
| Frequency | 0 | Slowest rate |
| Shape | Tri | Triangle wave |
| Amount | 0 | No modulation |
| Destination | OFF | No modulation target |
| Key Sync | OFF | Free-running |

### Modulation Slot 1

| Parameter | Value | Notes |
|-----------|-------|-------|
| Source | OFF | No modulation source |
| Amount | 0 | No modulation amount (range: -99 to +99) |
| Destination | OFF | No modulation target |

### Modulation Slot 2

| Parameter | Value | Notes |
|-----------|-------|-------|
| Source | OFF | No modulation source |
| Amount | 0 | No modulation amount |
| Destination | OFF | No modulation target |

### Modulation Slot 3

| Parameter | Value | Notes |
|-----------|-------|-------|
| Source | OFF | No modulation source |
| Amount | 0 | No modulation amount |
| Destination | OFF | No modulation target |

### Modulation Slot 4

| Parameter | Value | Notes |
|-----------|-------|-------|
| Source | OFF | No modulation source |
| Amount | 0 | No modulation amount |
| Destination | OFF | No modulation target |

### MIDI Controllers

| Parameter | Value | Notes |
|-----------|-------|-------|
| Velocity Destination | OFF | No velocity routing |
| Velocity Amount | 0 | No velocity modulation |
| Mod Wheel Amount | 0 | No mod wheel modulation |
| Mod Wheel Destination | OFF | No mod wheel target |
| Pressure Amount | 0 | No aftertouch modulation |
| Pressure Destination | OFF | No aftertouch target |
| Breath Amount | 0 | No breath control modulation |
| Breath Destination | OFF | No breath target |
| Foot Controller Amount | 0 | No foot pedal modulation |
| Foot Controller Destination | OFF | No foot pedal target |

### Sequencer (All 4 Tracks)

| Parameter | Value | Notes |
|-----------|-------|-------|
| Seq 1 Destination | OFF | No sequencer modulation target |
| Seq 2 Destination | OFF | No sequencer modulation target |
| Seq 3 Destination | OFF | No sequencer modulation target |
| Seq 4 Destination | OFF | No sequencer modulation target |
| All Step Values (1-16) | 0 | All 64 steps (4 tracks x 16 steps) set to 0 |

### External Input

| Parameter | Value | Notes |
|-----------|-------|-------|
| Volume | 0 | No external audio (range: 0-100) |
| Mode | St | Stereo mode (options: Stereo, Mono Left, Mono Right, L Control + R Audio) |
| Input Hack | 0 | No input bit-crushing (range: 0-14) |
| Input Peak Amount | 0 | No peak hold modulation |
| Input Peak Destination | OFF | No peak hold target |
| Env Follow Amount | 0 | No envelope follower modulation |
| Env Follow Destination | OFF | No envelope follower target |

### Miscellaneous Parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| Env Shape | Exp | Exponential envelopes (more natural than Linear) |
| Key Off/Transpose | -24 | Keyboard transposed down 2 octaves for best range |
| Pitch Wheel Range | 0 | No pitch bend |
| BPM | 120 | Default tempo |
| Clock Divide | 8n | Eighth note division |
| Trigger Select | Seq or Key | Envelopes triggered by sequencer or keyboard |
| Key Mode | Poly Low Note | Low note priority (Poly for poly chain compatibility) |

Source: Anu Kirk Guide p.7-8, DSI Manual p.14-26

## What It Sounds Like

A plain, bright, sustained tone. Both analog oscillators playing sawtooth waves in stereo with the filter wide open and no modulation. Boring on purpose -- it's a canvas, not a painting.

## Quick Test

After programming, play middle C. You should hear a bright, buzzy, sustained sawtooth tone in stereo. If you hear anything else -- modulation, filtering, echo, distortion -- something is still set wrong.

## Parameter Count Summary

| Section | Parameters |
|---------|-----------|
| Global | 2 |
| Oscillators 1-4 | 26 |
| Analog Shared (Sync, Slop) | 2 |
| Noise | 1 |
| Lowpass Filter | 8 |
| Filter Envelope (ENV 1) | 4 |
| VCA | 5 |
| VCA Envelope (ENV 2) | 4 |
| Highpass Filter | 1 |
| Tuned Feedback | 3 |
| Distortion | 1 |
| Output Hack | 1 |
| Delay (3 taps) | 8 |
| Envelope 3 | 8 |
| LFOs 1-4 | 20 |
| Mod Slots 1-4 | 12 |
| MIDI Controllers | 10 |
| Sequencer | 68 (4 destinations + 64 steps) |
| External Input | 7 |
| Misc Parameters | 7 |
| **Total** | **~198** |
