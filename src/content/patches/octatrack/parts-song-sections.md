---
name: "Parts -- Song Sections"
type: sequence
session_origin: 24
description: "A Module 8 arrangement project using two Parts as verse and chorus sound palettes. Patterns A01-A04 use Part 1 (clean verse); Patterns A05-A08 use Part 2 (aggressive chorus). Transitions between Parts via pattern changes. A complete song structure in one bank."
tags: [octatrack, parts, song-structure, verse-chorus, pattern-workflow, arrangement]
instrument: octatrack
created: "2026-04-17"
---

# Parts -- Song Sections

**Session**: 24 | **Bank**: A | **Type**: composition

## Description

A project demonstrating the Parts system as a song-structure tool. Part 1 holds a clean, spacious verse sound -- subtle reverb, gentle filtering, subdued drums. Part 2 holds an aggressive chorus sound -- overdrive, wider stereo FX, louder layers. Switching patterns between A01-A04 and A05-A08 swaps the entire sonic palette because each range is assigned to a different Part.

## Sample List

| Slot | Sample | Type | Notes |
|------|--------|------|-------|
| Flex 01 | kick-deep.wav | Drums | Verse kick -- round and subdued |
| Flex 02 | snare-ghost.wav | Drums | Ghost snare for verse patterns |
| Flex 03 | hats-soft.wav | Drums | Soft hi-hat loop |
| Flex 04 | bass-clean.wav | Bass | Clean bass one-shot |
| Flex 05 | pad-ethereal.wav | Texture | Airy pad for verse atmosphere |
| Flex 06 | lead-melody.wav | Lead | Main melodic phrase |
| Flex 07 | stab-chorus.wav | Lead | Aggressive chord stab for chorus |
| Flex 08 | perc-fill.wav | Drums | Percussion fill element |

## Track Configuration

| Track | Machine | Sample | FX1 | FX2 |
|-------|---------|--------|-----|-----|
| T1 | Flex | kick-deep | Compressor | None |
| T2 | Flex | snare-ghost | Compressor | Dark Reverb |
| T3 | Flex | hats-soft | Filter | None |
| T4 | Flex | bass-clean | Filter | Compressor |
| T5 | Flex | pad-ethereal | Chorus | Plate Reverb |
| T6 | Flex | lead-melody | Delay | Filter |
| T7 | Flex | stab-chorus | Distortion | Delay |
| T8 | Flex | perc-fill | Compressor | None |

## Parts

| Part | Sound Palette | Used in Patterns |
|------|--------------|-------------------|
| 1 | Clean verse -- subtle reverb, low drive, gentle filter, pad prominent | A01, A02, A03, A04 |
| 2 | Aggressive chorus -- overdrive on T7, wide delay, filter resonance up, stab prominent | A05, A06, A07, A08 |

## Pattern Map

| Pattern | Part | Description |
|---------|------|-------------|
| A01 | 1 | Intro -- kick and pad only, sparse |
| A02 | 1 | Verse A -- full verse groove, bass + melody enter |
| A03 | 1 | Verse B -- variation with ghost snare fills |
| A04 | 1 | Pre-chorus -- building energy, hats double-time |
| A05 | 2 | Chorus A -- full energy, stab enters, drive engaged |
| A06 | 2 | Chorus B -- variation with percussion fills |
| A07 | 2 | Breakdown -- strip to pad + delayed lead, Part 2 FX still active |
| A08 | 2 | Outro -- chorus fading, tracks mute one by one |

## Scene Notes

- **Scene A (Clean)**: Default mix levels, FX at conservative settings. Used within both Parts for the "dry" starting point of each section
- **Scene B (Wet)**: Reverb sends increased, delay feedback raised, filter opening on pads. Use the crossfader to add wash and space within any section

Scenes stay consistent across both Parts -- the Part swap changes the underlying sound palette while scenes add performance dynamics on top.

## Performance Tips

- **Pattern chain for full song**: Chain A01 > A01 > A02 > A02 > A04 > A05 > A05 > A06 > A03 > A03 > A05 > A06 > A08 for a complete verse-chorus-verse-chorus-outro arrangement
- **Part transitions**: The Octatrack crossfades between Parts when you switch patterns across Part boundaries. The transition is instant on the pattern boundary -- design your patterns so the last bar of A04 (verse) sets up the energy for A05 (chorus)
- **Mid-section dynamics**: Use track mutes within a Part to vary energy without changing patterns. Mute T5 (pad) in the verse for a stripped-back feel; unmute it in the pre-chorus to build
- **Scene layer**: Even though Parts handle the macro structure, the crossfader adds micro-dynamics. Slow morph to Scene B during the second chorus for extra intensity

## Tags

#octatrack #parts #song-structure #verse-chorus #arrangement
