---
title: 'Session 25: Rests, Tempo, Clock Division, and Variable Lengths'
session_number: 25
duration: 25
prerequisite: 24
output_type: patch
difficulty: intermediate
tags:
  - sequencer
  - rests
  - tempo
  - clock-divide
  - swing
  - rhythm
  - variable-length
instrument: evolver
reference: 'Anu Kirk p.79, p.84-86, DSI Manual p.24-25, p.27-32'
section: Sequencer
instrument_type: instrument
---

# Session 25: Rests, Tempo, Clock Division, and Variable Lengths

**Objective:** Create complex rhythmic sequences using rests (oFF), swing timing, clock division settings, tempo clock modulation for variable step lengths, and different-length track loops.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set Seq 1 Dest = `OAF`. Program: `52, oFF, 46, 42, oFF, oFF, 38, 52`. Step 9 = `rST`. Set Clock Divide to `8swing`. Press START/STOP. Instant swung rhythm with syncopation.

## Warm-Up (2 min)

Load your rhythmic filter sequence from Session 24. Press START/STOP and hold a key to hear the multi-parameter animation. You have been using straight eighth or sixteenth note timing. Today you add rhythmic sophistication -- swing, syncopation, and variable step lengths. Stop the sequence and load the basic patch.

## Setup

From the basic patch:
- Set **Osc 1 Level** to `45`, **Osc 2 Level** to `45`, **Osc 2 Fine** to `+3`
- Set **Osc 3 Level** to `0`, **Osc 4 Level** to `0`
- Set **LPF Frequency** to `75`, **Resonance** to `45`, **4-Pole** ON
- Set **Env Amount** (filter) to `55`, ENV 1: **Decay** = `40`, **Sustain** = `20`
- Set ENV 2 (VCA): **Decay** = `40`, **Sustain** = `70`, **Release** = `15`
- Set **BPM** to `115`, **Clock Divide** to `16th`

<div data-evolver-panel data-knobs="knob-osc-level:45,knob-osc-fine:66,knob-filter-frequency:75,knob-filter-resonance:45,knob-filter-envamount:55,knob-filter-decay:40,knob-filter-sustain:20,knob-amp-decay:40,knob-amp-sustain:70,knob-amp-release:15" data-highlights="knob-filter-frequency:blue,knob-filter-resonance:blue,switch-startstop:amber,switch-seq-edit:amber" data-sections="filter,sequencer"></div>

## Exercises

### Exercise 1: Rests for Syncopation (6 min)

Rests (oFF) in Sequence 1 silence that step across all four tracks. Strategic placement creates rhythm (Anu Kirk p.78-79, DSI Manual p.27-28).

1. Press **SEQ EDIT**, select **Seq 1**, set Destination to `OAF`
2. Program a 16-step pattern with rests for syncopation:
   - Step 1 = `48`, Step 2 = `oFF`, Step 3 = `48`, Step 4 = `52`
   - Step 5 = `oFF`, Step 6 = `oFF`, Step 7 = `55`, Step 8 = `48`
   - Step 9 = `oFF`, Step 10 = `52`, Step 11 = `48`, Step 12 = `oFF`
   - Step 13 = `55`, Step 14 = `52`, Step 15 = `oFF`, Step 16 = `48`
3. Press **START/STOP** -- the rests create gaps that make the pattern breathe. The rhythm feels syncopated because notes land on unexpected beats
4. Move the rests around: change Step 2 from `oFF` to `50`, and Step 3 from `48` to `oFF`. Hear how the rhythm shifts completely with just one rest repositioned
5. Try a sparser pattern: set Steps 2, 4, 6, 8, 10, 12, 14, 16 all to `oFF` -- every other step is silent. This creates a half-time feel

### Exercise 2: Clock Division and Swing (6 min)

Clock Divide changes the fundamental step speed. Swing settings offset alternating steps for groove (DSI Manual p.27-28).

1. Keep the syncopated pattern from Exercise 1 (restore the original if you changed it)
2. Change **Clock Divide** to `Eighth` -- the pattern plays at half the speed (BPM x 2 instead of x 4)
3. Change to `Quartr` -- even slower, one step per beat. Each step is very deliberate
4. Change back to `16th`, then try `8swing` -- eighth note speed with full swing timing. The odd steps (1, 3, 5...) are slightly delayed, the even steps slightly early. You should hear a shuffle groove
5. Try `16swng` -- sixteenth note speed with swing. Faster and more subtle
6. Try `8 half` -- half swing, a gentler shuffle. Compare directly with `8swing` to hear the difference
7. Try `8 trip` -- eighth note triplets (BPM x 3). A completely different rhythmic feel, like a waltz or shuffle

### Exercise 3: Tempo Clock Modulation (7 min)

Tempo Clock Mod is a special destination that changes step duration per step, allowing variable note lengths within a single sequence (Anu Kirk p.84-86).

1. Stop the sequence. Set **Seq 2 Destination** to `CLO` (Clock Mod)
2. The clock mod value is centered at `40` = normal speed. Below 40 = faster, above 40 = slower. Value of `20` = double speed, `80` = half speed (DSI Manual p.30-31)
3. Program Seq 2 to create variable step lengths:
   - Steps 1-4 = `40` (normal speed)
   - Steps 5-6 = `20` (double speed -- these steps fly by)
   - Steps 7-8 = `80` (half speed -- these steps are twice as long)
   - Step 9 = `rST`
4. Make sure Seq 1 still has notes: `48, 52, 55, 60, 64, 67, 72, 60`, Step 9 = `rST`
5. Press **START/STOP** -- you should hear steps 1-4 at normal tempo, steps 5-6 rush by quickly, and steps 7-8 linger. The melody now has built-in rhythmic variation
6. Try extreme values: set Step 3 to `10` (4x speed) -- that step almost disappears. Set Step 7 to `100` (very slow) -- it stretches out dramatically

### Exercise 4: Different-Length Tracks (4 min)

When tracks have different lengths, the patterns shift against each other, creating evolving polyrhythmic patterns (Anu Kirk p.78).

1. Keep Seq 1 (pitch, 8 steps) and Seq 2 (clock mod, 8 steps)
2. Set **Seq 3 Destination** to `FiL` (Filter Frequency)
3. Program Seq 3 with a 5-step loop: `20, 50, 80, 50, 20`, Step 6 = `rST`
4. Set **Seq 4 Destination** to `RES` (Resonance)
5. Program Seq 4 with a 3-step loop: `10, 60, 90`, Step 4 = `rST`
6. Press **START/STOP** -- Seq 1 cycles every 8 steps, Seq 3 every 5 steps, Seq 4 every 3 steps. The combined pattern does not repeat until step 120 (LCM of 8, 5, 3). It sounds like it is constantly evolving

<div data-evolver-panel data-knobs="knob-osc-level:45,knob-osc-fine:66,knob-filter-frequency:75,knob-filter-resonance:45" data-highlights="switch-seq1:amber,switch-seq2:amber,switch-seq3:amber,switch-seq4:amber,switch-startstop:amber" data-sections="sequencer" data-zoom="false"></div>

**Save this patch** as your "Complex Rhythm" patch.

## Exploration (optional, hyperfocus days)

- Combine swing timing with Clock Mod: set Clock Divide to `8swing` and use Seq 2 for additional tempo variation on top of the swing
- Try `64trip` clock divide for extremely fast, granular patterns. Combined with filter modulation sequences, this creates textures rather than melodies
- Use the RESET button to manually restart the sequence at dramatic moments -- all tracks realign

## Output Checklist

- [ ] Complex rhythm patch saved with rests, swing, and variable step lengths
- [ ] Understand oFF (rest) placement for syncopation
- [ ] Heard the difference between swing timings (8swing, 8 half, 8 trip)
- [ ] Used Clock Mod destination for variable step durations
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Rests (oFF) in Sequence 1 create silence across all tracks -- strategic placement transforms a steady stream of notes into a rhythmic pattern with groove
- Clock Division sets the base speed and feel (straight, swing, triplet). Swing offsets alternate steps for shuffle grooves
- Tempo Clock Mod (CLO destination, centered at 40) allows individual steps to be shorter or longer, creating complex rhythmic figures within a single sequence

## Next Session Preview

Session 26 brings it all together: all 4 sequencer tracks running simultaneously controlling pitch, filter, and other parameters to create a self-playing generative patch. This is the Evolver at its most distinctive -- a complete instrument that plays itself.
