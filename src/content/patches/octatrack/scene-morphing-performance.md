---
name: "Scene Morphing Performance"
type: texture
session_origin: 21
description: "A Module 7 performance project demonstrating scene assignment, crossfader morphing, and scene stacking across 8 tracks. Scene A holds a clean mix; Scene B introduces filter sweeps, delay feedback, and lo-fi degradation. Moving the crossfader transforms the entire mix in real time."
tags: [octatrack, scenes, crossfader, performance, scene-morphing, live-performance]
instrument: octatrack
created: "2026-04-17"
---

# Scene Morphing Performance

**Session**: 21 | **Bank**: A | **Type**: performance

## Description

A fully loaded 8-track groove where the crossfader morphs the entire mix from a clean, punchy state (Scene A) to a destroyed, atmospheric wash (Scene B). Every track has scene assignments on both sides so the crossfader affects the whole project simultaneously -- the hallmark of scene stacking from Module 7.

## Sample List

| Slot | Sample | Type | Notes |
|------|--------|------|-------|
| Flex 01 | kick-tight.wav | Drums | Punchy acoustic kick |
| Flex 02 | snare-crack.wav | Drums | Crisp snare with body |
| Flex 03 | hats-loop.wav | Drums | Closed hi-hat pattern loop |
| Flex 04 | bass-sub.wav | Bass | Deep sub bass one-shot |
| Flex 05 | pad-warm.wav | Texture | Sustained warm pad chord |
| Flex 06 | lead-pluck.wav | Lead | Short melodic pluck |
| Static 01 | atmosphere-long.wav | Texture | Long evolving ambient texture |
| Static 02 | vinyl-noise.wav | FX | Vinyl crackle layer |

## Track Configuration

| Track | Machine | Sample | FX1 | FX2 |
|-------|---------|--------|-----|-----|
| T1 | Flex | kick-tight | Compressor | None |
| T2 | Flex | snare-crack | Compressor | Dark Reverb |
| T3 | Flex | hats-loop | Filter | None |
| T4 | Flex | bass-sub | Filter | Compressor |
| T5 | Flex | pad-warm | Chorus | Dark Reverb |
| T6 | Flex | lead-pluck | Delay | Filter |
| T7 | Static | atmosphere-long | Lo-Fi | Delay |
| T8 | Static | vinyl-noise | Filter | None |

## Pattern Map

| Pattern | Part | Description |
|---------|------|-------------|
| A01 | 1 | Main groove -- all 8 tracks active, designed for crossfader performance |

## Scene Notes

### Scene A (Clean)

The left side of the crossfader. All tracks in their natural, unprocessed state:

| Track | Scene A Settings |
|-------|-----------------|
| T1 | Kick at full volume, no filter |
| T2 | Snare dry, reverb send at 0 |
| T3 | Hi-hats crisp, filter fully open |
| T4 | Bass sub clean, filter wide open |
| T5 | Pad subtle, chorus depth low, reverb send minimal |
| T6 | Lead pluck dry, delay feedback at 0 |
| T7 | Atmosphere muted (XVOL = 0) |
| T8 | Vinyl noise muted (XVOL = 0) |

### Scene B (Destroyed)

The right side of the crossfader. Filter sweeps, feedback, and lo-fi degradation:

| Track | Scene B Settings |
|-------|-----------------|
| T1 | Kick filtered down (cutoff 40), volume reduced |
| T2 | Snare smeared in reverb (send 100), attack softened |
| T3 | Hi-hats filtered to ghosts (cutoff 20), resonance high |
| T4 | Bass filter sweep down (cutoff 30), drive increased |
| T5 | Pad washed out, chorus depth max, reverb send 100 |
| T6 | Lead swallowed in delay (feedback 110), filter closing |
| T7 | Atmosphere full volume (XVOL = 127), lo-fi bitcrush engaged |
| T8 | Vinyl noise full volume (XVOL = 127), filter resonance spike |

## Performance Tips

- **Slow morph (4-8 bars)**: Gradually push the crossfader from A to B during a verse to build tension. The mix dissolves from clean to destroyed over time -- the audience feels the shift before they consciously hear it
- **Fast snap**: Yank the crossfader from A to B on the downbeat for a sudden drop into the destroyed texture. Snap it back to A after 2 bars for an instant return to clarity
- **Halfway park**: Leave the crossfader at the midpoint for a blend of both worlds -- partially filtered, partially wet. This is often the sweetest spot for sustained grooves
- **Mute sequences**: While crossfading, toggle track mutes with the TRIG keys. Muting the kick (T1) at Scene B creates a pure atmospheric wash; unmuting it snaps the groove back
- **Scene stacking**: To add more variation, assign different scene parameters per track. For example, T1-T4 respond to crossfader position while T5-T8 use XVOL fades -- creating independent layers of control within a single gesture

## Tags

#octatrack #scenes #crossfader #performance #scene-morphing
