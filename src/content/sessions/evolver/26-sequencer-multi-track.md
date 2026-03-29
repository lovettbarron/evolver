---
title: "Session 26: Multi-Track Sequences -- 4 Tracks at Once"
module: "Sequencer"
session_number: 26
duration: 25
prerequisite: 25
output_type: patch
difficulty: advanced
tags: [sequencer, multi-track, generative, self-playing, polyrhythm, advanced]
instrument: evolver
reference: "Anu Kirk p.87-93, DSI Manual p.27-32"
---

# Session 26: Multi-Track Sequences -- 4 Tracks at Once

**Objective:** Build a complete self-playing generative patch using all 4 sequencer tracks controlling pitch, filter, effects, and timbre simultaneously -- the Evolver's signature capability.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set Seq 1 Dest = `OAF` (8 steps), Seq 2 Dest = `FiL` (7 steps), Seq 3 Dest = `RES` (5 steps), Seq 4 Dest = `DT1` (3 steps). Program each with varied values and different-length loops. Press START/STOP. The patch plays itself and never exactly repeats.

## Warm-Up (2 min)

Load your complex rhythm patch from Session 25. Press START/STOP and listen to the polyrhythmic pattern you created with different-length tracks. Today you build the ultimate version -- a self-playing generative patch where all 4 tracks work together to create a complete, evolving piece. Stop the sequence and load the basic patch.

## Setup

From the basic patch:
- Set **Osc 1 Shape** to `Saw`, **Level** to `40`, **Fine** to `+2`
- Set **Osc 2 Shape** to `Pulse 50`, **Level** to `40`, **Fine** to `-2`
- Set **Osc 3 Shape** to `15`, **Level** to `25`
- Set **Osc 4 Shape** to `15`, **Level** to `25`
- Set **Osc Slop** to `2`
- Set **LPF Frequency** to `55`, **Resonance** to `50`, **4-Pole** ON
- Set **Key Amount** to `72`
- Set **Env Amount** (filter) to `45`, ENV 1: **Attack** = `5`, **Decay** = `55`, **Sustain** = `20`, **Release** = `25`
- Set ENV 2 (VCA): **Attack** = `3`, **Decay** = `50`, **Sustain** = `60`, **Release** = `30`
- Set **Delay 1 Time** to `2 Steps`, **Level** to `40`, **Feedback 1** to `35`
- Set **BPM** to `108`, **Clock Divide** to `16th`
- Set **Trigger Select** to `Seq Only` (the sequence drives everything)

This creates a warm, hybrid sound with delay and moderate filter activity -- a good canvas for generative sequencing.

## Exercises

### Exercise 1: Track 1 -- Melodic Foundation (5 min)

Build a melodic pattern with rests that provides the pitch skeleton.

1. Press **SEQ EDIT**, select **Seq 1**, set Destination to `OAF` (Osc All Freq)
2. Program a 16-step pattern with rests for rhythm:
   - Step 1 = `48`, Step 2 = `oFF`, Step 3 = `55`, Step 4 = `52`
   - Step 5 = `oFF`, Step 6 = `60`, Step 7 = `55`, Step 8 = `oFF`
   - Step 9 = `48`, Step 10 = `52`, Step 11 = `oFF`, Step 12 = `55`
   - Step 13 = `60`, Step 14 = `oFF`, Step 15 = `52`, Step 16 = `48`
3. Press **START/STOP** -- confirm the melody sounds musical with good rhythmic variety from the rests
4. Stop the sequence

### Exercise 2: Track 2 -- Filter Animation (5 min)

Add a filter cutoff sequence at a different loop length for evolving timbral variation.

1. Select **Seq 2**, set Destination to `FiL` (Filter Frequency)
2. Program a 13-step loop (prime number for maximum pattern variety against the 16-step Seq 1):
   - Step 1 = `15`, Step 2 = `45`, Step 3 = `70`, Step 4 = `35`
   - Step 5 = `85`, Step 6 = `20`, Step 7 = `55`, Step 8 = `90`
   - Step 9 = `30`, Step 10 = `65`, Step 11 = `40`, Step 12 = `75`
   - Step 13 = `50`, Step 14 = `rST`
3. Press **START/STOP** -- the filter moves independently of the melody. Because the loop lengths differ (16 vs 13), the filter pattern shifts against the melody. The two tracks will not realign for 208 steps (16 x 13)
4. Listen for at least 30 seconds to hear the pattern evolve. Notes that were bright on the first pass become dark on the second

### Exercise 3: Tracks 3 and 4 -- Depth and Detail (7 min)

Add resonance and delay modulation with even more varied loop lengths.

1. Select **Seq 3**, set Destination to `RES` (Resonance)
2. Program a 7-step loop:
   - Step 1 = `10`, Step 2 = `50`, Step 3 = `30`, Step 4 = `80`
   - Step 5 = `20`, Step 6 = `60`, Step 7 = `40`, Step 8 = `rST`
3. Select **Seq 4**, set Destination to `DL1` (Delay 1 Level)
4. Program a 5-step loop:
   - Step 1 = `0`, Step 2 = `60`, Step 3 = `0`, Step 4 = `0`
   - Step 5 = `80`, Step 6 = `rST`
5. Press **START/STOP** -- all 4 tracks now run simultaneously. You have:
   - Seq 1 (16 steps): melody with rests
   - Seq 2 (13 steps): filter cutoff sweep
   - Seq 3 (7 steps): resonance variation
   - Seq 4 (5 steps): delay that appears and disappears
6. The combined cycle length before exact repetition is LCM(16, 13, 7, 5) = 7,280 steps. At 108 BPM / 16th notes, that is over 16 minutes of non-repeating pattern. The patch effectively plays itself with constant variation

### Exercise 4: Add LFO Layers and Polish (6 min)

Layer slower LFO modulation on top of the sequencer for organic movement.

1. Keep the sequence running
2. Set **LFO 1**: Shape = `Tri`, Frequency = `4` (very slow), Amount = `10`, Destination = `FiL` -- adds slow filter drift on top of the sequencer pattern
3. Set **LFO 2**: Shape = `Tri`, Frequency = `3`, Amount = `8`, Destination = `SpL` (Filter Split) -- subtle stereo movement
4. Set **LFO 3**: Shape = `Random`, Frequency = `15`, Amount = `5`, Destination = `OAF` -- tiny random pitch variations, like analog drift
5. Add **Feedback Level** = `30`, **Feedback Frequency** to `24` -- adds a subtle resonant undertone
6. Adjust **Delay Feedback 2** to `20` -- delay echoes pass through the filter, adding depth
7. Listen to the complete patch for 1-2 minutes. It should sound like a complete piece of music that constantly shifts and evolves

**Save this patch** as your "Generative Sequence" patch. This is a landmark patch in the curriculum -- the Evolver playing itself.

## Exploration (optional, hyperfocus days)

- Switch Trigger Select to `Key, Gates Seq` and play keys to transpose the entire generative patch. Each key creates a completely different version of the pattern
- Add Shape Seq: set Osc 3 Shape Seq to `SE3` and use Seq 3 values to also change waveshapes per step (DSI Manual p.16)
- Try extreme tempo: BPM = `250` with Clock Divide = `32nd` for texture-speed sequences that become timbral rather than melodic

## Output Checklist

- [ ] Self-playing generative sequence patch saved with all 4 tracks active
- [ ] Used different-length loops (16, 13, 7, 5) for non-repeating evolution
- [ ] Combined sequencer tracks with LFO layers for organic depth
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Using all 4 sequencer tracks with different loop lengths creates generative music that constantly evolves -- prime-number lengths maximize the time before exact repetition
- Layering LFO modulation on top of sequencer patterns adds organic slow movement that makes the mechanical sequencer feel alive
- The self-playing generative patch is the Evolver's signature capability -- it turns a monophonic synthesizer into a complete self-contained composition tool

## Next Session Preview

You have now completed all the foundational and intermediate modules (1-7). You understand oscillators, filters, modulation, effects, and the sequencer. Session 27 begins the Sound Design Recipes module -- you will combine everything to build specific bass sounds from scratch, producing 3 named patches in a single session.
