---
name: "Full Arrangement"
type: sequence
session_origin: 29
description: "A Module 10 complete song arrangement: intro, verse, chorus, verse, chorus, outro chained in the Arranger across 3 Parts and 6 patterns. Uses scene-driven transitions between sections. The graduation project for the Octatrack curriculum."
tags: [octatrack, arranger, arrangement, song-structure, complete-song, integration, composition]
instrument: octatrack
created: "2026-04-17"
---

# Full Arrangement

**Session**: 29 | **Bank**: A | **Type**: composition

## Description

The culmination of the Octatrack curriculum: a complete song arranged in the Arranger with intro, verse, chorus, second verse, second chorus, and outro. Three Parts provide distinct sonic palettes (sparse intro/outro, clean verse, intense chorus). Six patterns define the rhythmic and melodic content. The Arranger chains them into a linear arrangement that plays from start to finish -- a finished composition ready for live performance or recording.

## Sample List

| Slot | Sample | Type | Notes |
|------|--------|------|-------|
| Flex 01 | kick-punch.wav | Drums | Main kick with punch |
| Flex 02 | snare-tight.wav | Drums | Tight snare with snap |
| Flex 03 | hats-16th.wav | Drums | 16th-note hi-hat pattern |
| Flex 04 | bass-deep.wav | Bass | Deep bass one-shot |
| Flex 05 | pad-evolving.wav | Texture | Slowly evolving pad texture |
| Flex 06 | lead-hook.wav | Lead | Main hook melody |
| Flex 07 | stab-bright.wav | Lead | Bright chord stab for chorus |
| Static 01 | ambient-bed.wav | Texture | Long ambient bed for intro/outro |

## Track Configuration

| Track | Machine | Sample | FX1 | FX2 |
|-------|---------|--------|-----|-----|
| T1 | Flex | kick-punch | Compressor | None |
| T2 | Flex | snare-tight | Compressor | Plate Reverb |
| T3 | Flex | hats-16th | Filter | None |
| T4 | Flex | bass-deep | Filter | Compressor |
| T5 | Flex | pad-evolving | Chorus | Dark Reverb |
| T6 | Flex | lead-hook | Delay | Filter |
| T7 | Flex | stab-bright | Distortion | Delay |
| T8 | Static | ambient-bed | Lo-Fi | Dark Reverb |

## Parts

| Part | Sound Palette | Used in Patterns |
|------|--------------|-------------------|
| 1 | Sparse/clean -- minimal FX, ambient bed prominent, subtle drums | A01, A04 |
| 2 | Verse -- clean drums, bass + pad active, lead enters, moderate FX | A02, A03 |
| 3 | Chorus -- full energy, stab + lead prominent, drive on T7, wide delay | A05, A06 |

## Pattern Map

| Pattern | Part | Description |
|---------|------|-------------|
| A01 | 1 | Intro -- ambient bed + sparse kick, building atmosphere |
| A02 | 2 | Verse A -- full verse groove, bass + melody enter |
| A03 | 2 | Verse B -- variation with rhythmic shifts and fills |
| A04 | 1 | Outro -- return to sparse, tracks drop out one by one |
| A05 | 3 | Chorus A -- full energy, stab enters, drive and wide delay |
| A06 | 3 | Chorus B -- variation with percussion fills and scene sweeps |

## Arranger Rows

| Row | Pattern | Part | Repeats | Length | Tempo |
|-----|---------|------|---------|--------|-------|
| 1 | A01 | 1 | 2 | 16 steps | 120 |
| 2 | A02 | 2 | 4 | 16 steps | 120 |
| 3 | A05 | 3 | 4 | 16 steps | 120 |
| 4 | A03 | 2 | 4 | 16 steps | 120 |
| 5 | A06 | 3 | 4 | 16 steps | 120 |
| 6 | A04 | 1 | 2 | 16 steps | 120 |

**Total duration**: 20 bars at 120 BPM = approximately 2 minutes 40 seconds.

## Scene Notes

- **Scene A (Clean)**: Default levels across all tracks. FX at conservative settings. The baseline sound for each section
- **Scene B (Climax)**: Reverb sends at max, delay feedback raised, filter resonance spiking on T3 and T4, distortion engaged on T7. Use at the peak of each chorus for maximum intensity

Scene assignments persist across Part changes, giving you a consistent performance control layer on top of the structural arrangement.

## Performance Tips

- **Arranger mode**: Press [FUNC] + [SONG] to enter Arranger mode. The arrangement plays top to bottom automatically. Press [PLAY] to start from Row 1
- **Live deviations**: While the Arranger is running, you can manually jump to any row by pressing its number. Use this to extend a chorus that is working well or skip ahead if the energy is right
- **Crossfader arc**: During each chorus (rows 3 and 5), slowly push the crossfader from A to B over 3 of the 4 repeats. Pull it back to A on the last repeat to reset before the next verse. This creates a tension-release arc within each section
- **Mute performance**: Keep T8 (ambient bed) unmuted during intro and outro but mute it during verse and chorus -- the Arranger handles pattern/Part changes, but mutes are your real-time dynamics layer
- **Transition fills**: On the last bar before a Part change (e.g., end of verse going into chorus), unmute T8 briefly and trigger a one-shot fill on T2 to signal the transition
- **Recording the arrangement**: Route MAIN out to your DAW and hit record. The Arranger plays the full song linearly -- one take, one bounce, done

## Tags

#octatrack #arranger #arrangement #song-structure #complete-song #composition
