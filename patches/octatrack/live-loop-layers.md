---
name: "Live Loop Layers"
type: texture
session_origin: 26
description: "A Module 9 live-sampling performance project using Pickup machines on Tracks 7-8 and track recorders on Tracks 2-4. Demonstrates Master/Slave sync, overdub layering, and live resampling from external input."
tags: [octatrack, live-looping, pickup-machines, resampling, performance, track-recorders]
instrument: octatrack
created: "2026-04-17"
---

# Live Loop Layers

**Session**: 26 | **Bank**: A | **Type**: performance

## Description

A performance-oriented project state. Input A/B carries your live source (synth, guitar, or voice). Track 8 is the Master Pickup -- first recording sets the loop length. Track 7 is a Slave Pickup that syncs to Track 8. Tracks 2-4 are Flex machines pointed at recorder buffers, reading audio captured via Recorder Trigs on every pattern loop.

## Sample List

| Slot | Sample | Type | Notes |
|------|--------|------|-------|
| Flex 01 | basic-kick.wav | Drums | Foundation beat on Track 1 |
| Flex 02 | recorder-2 | Buffer | Captured from Input A/B on every loop |
| Flex 03 | recorder-3 | Buffer | One-shot capture (re-armable) |
| Flex 04 | recorder-4 | Buffer | Captures MAIN output for resampling |

## Track Configuration

| Track | Machine | Sample | FX1 | FX2 |
|-------|---------|--------|-----|-----|
| T1 | Flex | basic-kick | Compressor | None |
| T2 | Flex | recorder-2 | Filter | Delay |
| T3 | Flex | recorder-3 | Lo-Fi | Reverb |
| T4 | Flex | recorder-4 | None | None |
| T5 | -- | -- | -- | -- |
| T6 | -- | -- | -- | -- |
| T7 | Pickup (Slave) | live input | None | Reverb |
| T8 | Pickup (Master) | live input | Filter | Delay |

## Pattern Map

| Pattern | Part | Description |
|---------|------|-------------|
| A01 | 1 | Kick only -- Master loop setup |
| A02 | 1 | Kick + track recorders armed |
| A03 | 1 | Full loop layering |

## Scene Notes

- **Scene A (Default)**: Flat mix, subtle FX. All tracks at natural levels, filters open, delay and reverb at conservative settings
- **Scene B (Breakdown)**: Filter closes on Tracks 2-3, delay feedback increases on T7-T8, crossfader sweep builds tension for breakdown. Vinyl-style degradation on the captured buffers

## Performance Tips

1. **Start with A01** -- play drums, hold [TRACK 8] + [REC1] to start recording the Master loop. Play 4 bars of your input source. Hit [TRACK 8] + [REC1] again to close the loop -- this sets the global loop length
2. **Switch to A02** -- now Recorder Trigs on Tracks 2-4 fire every loop. Your input becomes a live sample fed through Filter, Lo-Fi, and resample chains. Each loop iteration captures new audio
3. **Switch to A03** -- Slave Pickup (T7) enables on the next loop boundary. Layer harmony or counter-rhythm on top of the Master loop. One-shot trig on T3 captures "the good take" and holds it
4. **Crossfader**: Slow morph from Scene A to Scene B over 16 bars builds the breakdown. The filter closes on the captured buffers while delay feedback swells -- creating a wash that dissolves the loops
5. **Overdub on Master**: With A03 active, hold [TRACK 8] + [REC1] briefly to overdub onto the Master loop. Layer percussion, melodic fragments, or textural noise. Each pass adds to the loop without erasing what came before
6. **Resample the mix**: Track 4 captures the MAIN output. After building up layers, mute T2-T3, unmute T4 -- now you have a frozen snapshot of the entire mix on a single track that you can slice, retrig, or process further

## Tags

#octatrack #performance #live-looping #pickup-machines #resampling
