---
type: signal-flow
instrument: octatrack
title: "Octatrack MKII Signal Flow"
manufacturer: "Elektron"
---

# Octatrack MKII Signal Flow

## Audio Path Overview

The Octatrack's signal flow has three layers: external inputs, internal tracks, and outputs.

```
EXTERNAL INPUTS                    INTERNAL TRACKS                    OUTPUTS
                                                                     
Input A/B ──→ [Gain] ──→ [DIR] ───────────────────────────────→ Main Out L/R
                │         │                                         ↑
                │         ├──→ [Scenes/XDIR] ──→ Main Out           │
                │         │                                         │
                │         └──→ Track Recorders                      │
                │                     │                              │
Input C/D ──→ [Gain] ──→ [DIR] ──→   │    ──────────────────→ Main Out L/R
                │         │          │                              ↑
                │         ├──→ Scenes│                              │
                │         │          │                              │
                │         └──→ Track Recorders                      │
                                     │                              │
                                     ▼                              │
              ┌──────────────────────────────────────────────┐      │
              │              PER-TRACK CHAIN (x8)            │      │
              │                                              │      │
              │  [Machine] → [Amp Env] → [FX1] → [FX2] → ──┼──→ Main Out
              │      ↑          │ VOL       │        │       │      │
              │      │          │           │        │       │   or │
              │  Sample from    ↑           ↑        ↑       │      │
              │  slot list    XVOL       (scene-    Track    │   Cue Out L/R
              │  or input    (scene)    controlled) Volume   │
              │  or neighbor             params     (XLEV)   │
              └──────────────────────────────────────────────┘
```

## Per-Track Signal Flow (Detailed)

Each of the 8 audio tracks follows this path:

```
                                        Scene-controlled
                                        parameters (XVOL, XLEV)
                                              │         │
                                              ▼         ▼
Machine ──→ Amp Envelope ──→ [XVOL] ──→ FX1 ──→ FX2 ──→ Track Volume ──→ [XLEV] ──→ Output
  │              │                                            │
  │           VOL param                                    Level knob
  │         (-64 to +63)                                   (or track
  │                                                        vol in Part)
  │
  ├── Flex Machine (sample from RAM)
  ├── Static Machine (sample from CF card)
  ├── Thru Machine (external input A/B or C/D)
  ├── Neighbor Machine (previous track's output)
  └── Pickup Machine (looper -- records and plays back)
```

### Volume Architecture (Critical for Live Use)

The OT has **four volume stages** per track. Understanding these prevents the most common mixing headaches:

1. **Sample Gain** (Audio Editor > Attributes > GAIN): Corrects the source sample's level. Set once, affects the sample everywhere. Range: +/- 24 dB
2. **Amp Volume** (AMP page > VOL): Pre-FX volume. Bipolar (-64 to +63, default 0). Good for tremolo via LFO modulation
3. **Track Volume** (Level knob / Part-stored): Post-FX volume. The main mixing control
4. **Scene Volumes** (XVOL and XLEV): Scene-exclusive parameters.
   - **XVOL**: Pre-FX volume control via scene (same point as Amp VOL)
   - **XLEV**: Post-FX volume control via scene (same point as Track Volume)

**Why this matters**: If you fade out a track using XVOL, the reverb/delay tails die naturally. If you fade using XLEV, you also fade the FX tails. Choose based on musical intent.

## Input Signal Flow

```
                          ┌─────────────────────────────────┐
Input A/B ──→ [GAIN] ──→ │ DIR ──────────────→ Main Out L/R │
                │         │  ↑                               │
                │         │ XDIR (scene-controlled)          │
                │         │                                  │
                │         │ To Track Recorders ──→ Record    │
                │         │ (any combination of    Buffers   │
                │         │  A/B, C/D, track,     (in sample │
                │         │  main, or cue)         slot list)│
                │         │                                  │
Input C/D ──→ [GAIN] ──→ │ DIR ──────────────→ Main Out L/R │
                          └─────────────────────────────────┘
```

**GAIN** (Mixer page): Boosts or suppresses incoming signal by up to 12 dB. Set once at the start of a project to normalize input levels. Not automatable.

**DIR** (Mixer page): Controls how much input signal goes directly to main outs. Independent of track processing.

**XDIR** (Scene-controlled): Allows scenes to fade inputs in/out via crossfader without touching the Mixer page. Essential for live performance.

## Recording Signal Flow

Each of the 8 tracks has its own **Track Recorder** that writes to a dedicated **Record Buffer** in the sample slot list.

```
Sources:               Track Recorder          Destination:
                           │
Input A/B ────────→        │
Input C/D ────────→   [Recorder N] ────→ Record Buffer N
Any Track  ───────→        │                (in Flex sample
Main Out  ────────→        │                 slot list)
Cue Out   ────────→        │
                           │
               Trigger methods:
               • Sequencer trig (quantized, repeatable)
               • One-shot trig (record once, stop)
               • Manual (press REC + TRACK)
               • Quantized manual (QREC/QPL settings)
```

**Key insight**: Record buffers live in the sample slot list. Once audio is recorded, it is instantly available to any flex machine anywhere in the project. No preparation step needed.

## Pickup Machine Signal Flow

Pickup machines have their own recording signal path, independent of track recorders:

```
Input A/B or C/D ──→ [Pickup Machine] ──→ Loop Buffer
                          │                    │
                          │    ┌────────────────┘
                          │    │
                          ▼    ▼
                     [Overdub / Multiply]
                          │
                          ▼
                    Loop Playback ──→ FX1 ──→ FX2 ──→ Output
```

Pickup machines support:
- **Master/Slave**: One pickup sets the loop length, others sync to it
- **Overdub**: Layer new audio on top of existing loop
- **Multiply**: Double the loop length while recording
- **Reverse**: Flip playback direction
- **Half-speed**: Halve playback speed (doubles pitch down)

## Neighbor Machine Chaining

Neighbor machines create effects chains by routing one track's output into the next:

```
Track 1 (Flex) ──→ FX1 ──→ FX2 ──→ Output
                                       │
                                       ▼
Track 2 (Neighbor) ──→ FX1 ──→ FX2 ──→ Output
                                          │
                                          ▼
Track 3 (Neighbor) ──→ FX1 ──→ FX2 ──→ Output
```

This gives up to 6 chained effects (3 tracks x 2 FX slots) on a single audio source. The trade-off is using multiple tracks for one sound.

## Output Routing

```
                    ┌─────────────┐
Track 1-8 ────────→ │   Main Out  │ ──→ Main Out L/R
                    │   (default) │
                    └─────────────┘
                           │
                    ┌──────┴──────┐
Track 1-8 ────────→ │   Cue Out   │ ──→ Cue Out L/R
(when CUE+TRACK     │ (headphones │     (or headphones)
 is pressed)        │  preview)   │
                    └─────────────┘
```

- **Main Out**: Default destination for all tracks. Controlled by FUNC + Level
- **Cue Out**: Independent output for previewing, submixing, or routing to track recorders. Press CUE + TRACK to toggle
- **Headphones**: Can be set to Main, Cue, or Main+Cue in the Mixer menu
