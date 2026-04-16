---
type: overview
instrument: octatrack
title: "Octatrack MKII Architecture Overview"
manufacturer: "Elektron"
---

# Elektron Octatrack MKII

## Identity

- **Manufacturer**: Elektron
- **Type**: Dynamic performance sampler
- **Tracks**: 8 stereo audio + 8 MIDI
- **Audio I/O**: 4 in (2 stereo pairs) / 4 out (main L/R + cue L/R) + headphones
- **Sequencer**: 64-step per track, micro timing, conditional trigs, parameter locks
- **Storage**: Compact Flash card (up to 64 GB)
- **RAM**: 80 MB (shared across 128 Flex sample slots)
- **Year**: 2017 (MKII), original MKI 2011
- **OS**: 1.40A+

## What Makes It Special

The Octatrack is not a sampler in the traditional sense -- it is a **performance instrument that happens to use samples**. Where most samplers separate recording and playback into distinct modes, the OT integrates them seamlessly under one sequencer. You can record, mangle, and play back audio without ever stopping the clock.

Its power comes from three interlocking systems:

1. **The Parts system** -- Separates "what sounds play" (machines, effects, scenes) from "when they trigger" (patterns). Multiple patterns can share a single Part, creating coherent variations. Switch Parts for radical timbral shifts without losing your place.

2. **Scenes + Crossfader** -- Assign parameter snapshots to the crossfader's A and B sides. Fade smoothly between two completely different states of your mix. 16 scenes per Part, assignable on both sides. This is the OT's primary live performance tool.

3. **Five machine types** -- Each audio track hosts one machine:
   - **Flex**: Plays samples from RAM (80 MB shared). Instant, glitch-free, supports real-time manipulation
   - **Static**: Streams samples from CF card. Supports files up to 2 GB. Good for backing tracks and long recordings
   - **Thru**: Passes external audio input through the track's effects chain. Makes the OT an effects processor
   - **Neighbor**: Listens to the previous track's output. Chain multiple effects in series
   - **Pickup**: Looper machine. Record, overdub, multiply, reverse. The OT's live looping engine

## Curriculum Focus

This curriculum emphasizes the Octatrack as a **songwriting and live performance tool**:

- **Songwriting**: Building compositions from samples, loops, and live recordings. Using patterns as song sections, banks as songs, and the Arranger for long-form structure
- **Live looping**: Pickup machines for real-time recording and layering. Thru machines for live processing. Track recorders for capturing and re-deploying audio on the fly
- **Improvisation**: Scenes for fluid parameter morphing. Parts for radical timbre shifts. Parameter locks for step-by-step variation. Conditional trigs for generative patterns that evolve over time

## Data Hierarchy

```
Set (top level, lives on CF card)
└── Audio Pool (shared samples across all projects)
    └── Project (the working context)
        ├── Flex Sample Slots (128, loaded into RAM)
        ├── Static Sample Slots (128, streamed from CF)
        ├── 8 Track Recorders (one per audio track, write to record buffers in sample slots)
        ├── 8 Arrangements (song mode sequences)
        └── 16 Banks (A-P)
            ├── 16 Patterns per bank (256 total)
            │   ├── Triggers + parameter locks (per step)
            │   └── Points to a Part (1-4)
            └── 4 Parts per bank
                ├── Machine assignments (what machine type + sample per track)
                ├── Track parameter settings (pitch, amp, LFO, FX1, FX2)
                ├── Effect assignments (which effect on FX1/FX2 per track)
                ├── 16 Scenes
                └── Track volume settings
```

## Key Concepts for Newcomers

### Patterns store triggers. Parts store sounds.

This is the single most important concept. A Pattern holds the sequencer data (which steps trigger, parameter locks). A Part holds the "infrastructure" (machines, effects, scenes, volumes). Multiple patterns can share the same Part -- changes to the Part affect all patterns using it.

### The sample slot list is project-wide

Samples are loaded into a Flex or Static slot list once, then available everywhere in the project. Any flex machine on any track in any pattern can access any sample in the flex list. Sample locks let you swap samples on individual steps.

### Scenes are the performance interface

The crossfader interpolates between Scene A and Scene B. Load different scenes to each side, slide the fader, and parameters morph smoothly. Scenes can control any track parameter including volume (XLEV/XVOL), creating smooth fades, buildups, and transitions.

### Recording never stops the clock

Track recorders, pickup machines, and the sequencer all run simultaneously. You can record external audio, internal audio, or the cue mix while patterns play. Recorded material lands in the sample slot list and is instantly available to any flex machine.

## Physical Controls

### Front Panel (30 controls)
- **Volume knob**: Main output level (FUNC + Volume = track level)
- **Headphones Vol**: Headphone level
- **6 Data Entry knobs** (A-F): Map to the 6 on-screen parameters
- **Level knob**: Active track volume (FUNC = master volume)
- **Crossfader**: Interpolates between Scene A and Scene B
- **8 Track keys** (T1-T8): Select active track / trigger machines
- **16 Trig keys** (1-16): Place triggers, select patterns/banks/scenes
- **Transport**: Play, Stop, Record
- **Navigation**: Arrow keys (Up/Down/Left/Right), Yes, No
- **Function keys**: FUNC, PROJ, PART, AED, MIX, ARR, MIDI
- **Track Parameter keys**: SRC, AMP, LFO, FX1, FX2
- **Scene A / Scene B keys**: Assign scenes to crossfader sides
- **Pattern / Bank / Page keys**: Pattern selection
- **REC1, REC2, REC3**: Track recorder controls
- **CUE key**: Route tracks to cue output
- **Tempo key**: BPM control and tap tempo

### Rear Panel (11 connections)
- Power switch + DC In (12V)
- USB (computer connection, USB disk mode)
- Compact Flash card slot
- MIDI In, Out, Thru
- Input C/D + Input A/B (1/4" mono, balanced capable)
- Cue Out L/R (1/4" mono)
- Main Out L/R (1/4" mono)
- Headphones (1/4" stereo)

## Key References

- **Octatrack MKII User Manual** (Elektron, OS 1.40A) -- Official reference for all parameters, menus, and operations
- **"Some Thoughts on Elektron's Octatrack"** by Merlin (edited by Thermo) -- Community guide that builds understanding from the ground up, especially strong on Parts, Scenes, sampling workflow, and volume handling
