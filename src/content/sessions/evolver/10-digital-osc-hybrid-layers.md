---
title: "Session 10: Analog + Digital Hybrid Combinations"
module: "Digital Oscillators"
session_number: 10
duration: 25
prerequisite: 7
output_type: patch
difficulty: intermediate
tags: [digital-oscillators, analog-digital, hybrid, shape-sequence, layering]
instrument: evolver
reference: "Anu Kirk p.36, DSI Manual p.16-17"
---

# Session 10: Analog + Digital Hybrid Combinations

**Objective:** Combine analog warmth with digital complexity to create hybrid layered patches, and explore the Shape Sequence feature for per-step waveshape changes.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set Osc 1+2 to Saw at Level 40, Osc 3+4 to Shape 15 at Level 30 with FM 4->3 at 8. Play a note. That is analog warmth plus digital complexity in one patch.

## Warm-Up (2 min)

Load your ring mod texture patch from Session 09. Play a few notes and listen to the metallic shimmer over analog warmth. Today you will take hybrid layering further and explore a unique Evolver feature: Shape Sequences. Load the basic patch.

## Setup

From the basic patch, all oscillators should be at Level `50`, Frequency `C0`. Filter wide open at `164`.

## Exercises

### Exercise 1: Analog Foundation + Digital Detail (7 min)

Build a hybrid patch step by step, listening to how each layer changes the character:

1. Set **Osc 1 Shape** to `Saw`, **Level** to `45`. Set **Osc 2 Shape** to `Saw`, **Level** to `45`
2. Set **Osc 1 Fine** to `+2`, **Osc 2 Fine** to `-2` (subtle detuning)
3. Play a sustained note -- you should hear a warm, slightly chorused analog saw sound
4. Set **Osc 3 Level** to `0`, **Osc 4 Level** to `0` (digital off for now)
5. Now set **Osc 3 Shape** to `15`, **Level** to `25` -- you should hear the digital waveshape add harmonic detail on the left channel
6. Set **Osc 4 Shape** to `15`, **Level** to `25` -- you should hear stereo digital detail on both sides
7. The analog oscillators provide the warm foundation; the digital add complexity on top. Adjust **Osc 3+4 Level** between `15` and `40` to find the right balance -- you should hear the blend shift from analog-dominant to more digital

"Remember that you can use the analog oscillators at the same time! You can use them to subtly fatten up a primarily digital/FM sound" -- Anu Kirk p.36

### Exercise 2: Hybrid with FM (5 min)

Add FM between the digital oscillators for even more complexity:

1. Keep the hybrid setup from Exercise 1
2. Set **FM 4->3** to `8` -- you should hear the digital layer gain metallic harmonics while the analog layer remains warm and stable underneath
3. Try **FM 4->3** at `15` -- you should hear more aggressive FM harmonics
4. Set **Osc 4 Frequency** to `C1` (one octave higher than Osc 3) for a 2:1 FM ratio -- you should hear the FM character change
5. Add **Ring Mod 4->3** to `20` on top of the FM -- you should hear additional inharmonic content layered in. "You can use FM and Ring mod on both oscillators, and you can use both at the same time" (Anu Kirk p.36)

### Exercise 3: Shape Sequence (8 min)

The Shape Sequence feature changes the digital oscillator's waveshape on every sequencer step, creating timbral rhythm.

1. First, program a simple sequence. Open **Seq 1** and enter these step values:
   - Steps 1-4: `10`, `25`, `40`, `55`
   - Steps 5-8: `70`, `45`, `20`, `5`
   - Steps 9-16: repeat the pattern or enter your own values between 1 and 96
2. Set **Osc 3 Shape Seq** to `Seq1` (DSI Manual p.16-17) -- "At each step of the sequence, Evolver will change the waveshape for the selected oscillator to the value indicated by the sequence" (Anu Kirk p.36)
3. Press **START/STOP** to start the sequencer
4. Play a note -- you should hear the timbre change on every step as different waveshapes are loaded. The pitch stays the same but the harmonic content shifts rhythmically
5. Try setting **Osc 4 Shape Seq** to `Seq1` as well -- you should hear both digital oscillators changing shapes in sync (or set Osc 4 to Seq2 with different values for stereo variation)
6. Stop the sequencer. Set **Osc 3 Shape Seq** back to `OFF` for the final patch

"One obvious and fun thing you can do is combine shape sequences with FM and/or Ring Mod to produce sounds that change dramatically from note to note" -- Anu Kirk p.36

See Anu Kirk p.36 ("Shape Sequence"), DSI Manual p.16-17

### Exercise 4: Build and Save Your Hybrid Patch (3 min)

Create a final hybrid patch combining the best of what you have learned:

1. **Osc 1**: Shape `Saw`, Level `40`, Fine `+3`
2. **Osc 2**: Shape `P-48`, Level `40`, Fine `-3`
3. **Osc 3**: Shape `15` (or your favorite from Session 07), Level `30`
4. **Osc 4**: Shape `15`, Level `30`
5. **FM 4->3** = `8`
6. **Osc Slop** = `2` (subtle analog drift)
7. **VCA Envelope**: Attack = `20`, Decay = `0`, Sustain = `100`, Release = `30`

Play a sustained note. You should hear warm analog oscillators with subtle detuning and drift, topped with harmonically complex digital oscillators enhanced by light FM. The sum of four oscillators across both stereo channels should be wide and full.

**Save this patch** as your "Hybrid Layer" patch.

## Exploration (optional, hyperfocus days)

- Try different analog waveshapes: Osc 1 = Tri, Osc 2 = Saw creates an asymmetric stereo image with different harmonic content per channel
- Use the Shape Sequence with FM active -- the timbral changes become more dramatic as the FM harmonics shift with each new waveshape
- Create a second hybrid patch using ring mod instead of FM for the digital layer: Ring Mod 4->3 = 60, Osc 4 Frequency = G1

## Output Checklist

- [ ] Hybrid layered patch saved with analog + digital + FM
- [ ] Experienced the Shape Sequence feature changing timbres per step
- [ ] Understand how to balance analog warmth and digital complexity using oscillator levels
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- The Evolver's true power is in combining all four oscillators: analog for warmth and body, digital for harmonic complexity and FM/ring mod capabilities
- Oscillator levels are the primary mixing tool -- keeping the sum below 125 prevents clipping (Anu Kirk p.16)
- Shape Sequence adds timbral rhythm by changing waveshapes per sequencer step, creating patterns of harmonic variation without any pitch change

## Next Session Preview

Next time you enter the filter world -- the lowpass filter is the heart of subtractive synthesis. You will learn cutoff, resonance, and the dramatic difference between 2-pole and 4-pole modes.
