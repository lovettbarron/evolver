---
title: "Session 08: Thru & Neighbor Machines"
module: "Machines & Playback"
session_number: 8
duration: 20
prerequisite: 7
output_type: technique
difficulty: intermediate
tags: [machines, thru, neighbor, effects-processor, external-audio, input]
instrument: octatrack
reference: "Elektron Manual Ch. 11.1.3-11.1.4"
---

# Session 08: Thru & Neighbor Machines

**Objective:** Use the Octatrack as a real-time effects processor for external gear. Set Track 1 = Thru to bring Input A/B through the FX engine. Set Track 2 = Neighbor to chain a second pair of effects on top. Hear your synth, guitar, or drum machine transformed.

> [!tip] If you only have 5 minutes
> Plug audio into Input A/B. Set Track 1 = Thru, INAB = ON. Open FX1 = Echo Freeze Delay. Play your external gear. The OT is now a delay processor.

## Warm-Up (2 min)

You've spent 7 sessions playing samples *out* of the OT. Now you're playing audio *into* the OT and back out — the box becomes a stereo effects rack. Plug headphones in and confirm you hear the OT's internal sound. Power your external instrument. We're about to bridge them.

## Setup

Start from the `LAB` project. You need:
- An external audio source (synth, drum machine, guitar through DI, mic, phone)
- Cables from that source to **Input A** and **Input B** on the OT's rear panel
- Monitors or headphones on the OT main outputs

Set the input gain: press **[MIX]**, adjust **GAIN A** and **GAIN B** so the level meters bounce healthily without clipping when your source plays. Press **[NO]** to close the mixer.

## Exercises

### Exercise 1: Track 1 = Thru Machine (5 min)

Thru is the simplest: pass audio in, route it through the track's effects, send it to main out.

1. Press **[TRACK 1]**, then **[FUNC] + [SRC]** to open SRC SETUP
2. Set **MACH** = `THRU` (turn knob A)
3. Set **INAB** = `ON` — this routes Input A and B as the source for this track
4. (Optional) Set **INCD** = `OFF` if you have separate gear on inputs C/D you don't want here
5. Press **[NO]** to exit setup
6. Press **[SRC]** — Source page now shows Thru parameters (no sample, just input routing)
7. Play your external instrument. You should hear it through the OT's main output

<div data-octatrack-panel
  data-sections="param"
  data-highlights="key-param-src:amber"
></div>

### Exercise 2: Add Effects to the Thru Track (4 min)

Now the OT becomes the effects processor.

1. With Track 1 still selected, press **[FX1]** to open the FX1 page
2. Press **[FUNC] + [FX1]** to open FX1 SETUP — choose an effect. Try `LO-FI COLLECTION` (knob A cycles types)
3. Press **[NO]** to exit setup
4. On the FX1 page, turn knobs B-F to dial in the effect — bit reduction, sample rate reduction
5. Play your external source — you should hear it lo-fi'd in real time
6. Try other effects: `12/24DB MULTI MODE FILTER` for filter sweeps, `ECHO FREEZE DELAY` for dub, `GATEBOX PLATE REVERB` for space

### Exercise 3: Track 2 = Neighbor — Chain More Effects (5 min)

Each track has 2 effects (FX1 + FX2), so 1 Thru track gives you 2 effects. **Neighbor** lets you chain another track's worth of effects after.

1. Press **[TRACK 2]**, then **[FUNC] + [SRC]** to open SRC SETUP
2. Set **MACH** = `NEIGHBOR`
3. Press **[NO]** to exit. Track 2 is now picking up Track 1's output (Thru → its FX1/FX2 → into Track 2)
4. On Track 2, press **[FUNC] + [FX1]** and assign another effect — try `ECHO FREEZE DELAY`
5. Press **[FUNC] + [FX2]** and assign `GATEBOX PLATE REVERB`
6. Play your external source. The signal is now: Input → Track 1 Thru → FX1 (lo-fi) → FX2 (any) → Track 2 Neighbor → FX1 (delay) → FX2 (reverb) → Main Out
7. **You just chained 4 effects on a single external signal.** The OT is now a serious FX processor

### Exercise 4: Mix Live Input with Internal Tracks (4 min)

Thru tracks aren't isolated — they share the OT's mixer with your sample tracks.

1. Set **Track 3** to Flex, load a drum loop, place trigs on 1, 5, 9, 13. Press **[PLAY]**
2. Now play your external instrument with Tracks 1+2 routing it through the lo-fi → delay → reverb chain
3. You hear: drum loop from Track 3 + your processed external signal — a full mix
4. Use the **Level** knob (top-right) to balance: select Track 1 with **[TRACK 1]**, set its level relative to the drum track
5. Mute/unmute the external Thru with **[FUNC] + [TRACK 1]** to hear the difference

## Exploration (if time allows)

- Sample your external input via track recorder (Module 9 preview): with Thru routed, set up REC1 to capture Input A/B, press **[TRACK 1] + [REC1]** to record. Now you have your processed take as a sample
- Try Track 1 = Thru on Input C/D (set INAB = OFF, INCD = ON) for a second simultaneous external source
- Mute the Neighbor (Track 2) by unmuting/muting it — you can hear "with chain" vs. "without chain" comparisons

## Output Checklist

- [ ] I connected an external audio source to Input A/B
- [ ] I set Track 1 = Thru with INAB = ON and heard external audio through the OT
- [ ] I added at least one effect on the Thru track and heard it process the external source
- [ ] I set Track 2 = Neighbor and chained 2 more effects on top
- [ ] I mixed the live external signal with an internal sample-based track
- [ ] I can describe the signal flow: Input → Thru → FX → Neighbor → FX → Main Out

## Key Takeaways

- **Thru machine** routes external Input A/B (or C/D) through a track — no sample needed
- **Neighbor machine** picks up the previous track's output, letting you chain another 2 effects
- This makes the OT an 8-track effects processor for your studio (you can have multiple Thru tracks for multiple external sources)
- All the same FX1 + FX2 + LFO + scenes apply — your effects can be modulated, p-locked, and morphed via crossfader

## Next Session Preview

Next: Pickup machines (Session 09 — already drafted). The OT becomes a live looper. Record a 4-bar phrase from your external source, loop it, overdub on top. Pickup is the OT's third superpower (after sequencing and effects processing).
