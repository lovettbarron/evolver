---
title: 'Session 18: Complex Modulation -- Stacking Sources'
session_number: 18
duration: 30
prerequisite: 16
output_type: patch
difficulty: advanced
tags:
  - modulation
  - complex
  - stacking
  - evolving
  - texture
  - advanced
instrument: evolver
reference: 'Anu Kirk p.68-74, DSI Manual p.21-23'
section: Modulation
instrument_type: instrument
---

# Session 18: Complex Modulation -- Stacking Sources

**Objective:** Combine multiple modulation sources -- LFOs, envelopes, sequencer, and controllers -- to create sounds that evolve over time with deep, layered complexity.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set LFO 1 to filter (Tri, Freq 25, Amt 40, Dest FiL), LFO 2 to LFO 1 amount (Tri, Freq 5, Amt 30, Dest LF1A). Play a note. The filter sweep itself is now sweeping -- modulation of modulation.

## Warm-Up (3 min)

Load your expressive performance patch from Session 17. Play some notes with varying velocity, aftertouch, and mod wheel. You have been using single modulation sources targeting single destinations. Today you will stack and cross-connect them for sounds that evolve in unpredictable, organic ways. Load the basic patch.

## Setup

From the basic patch:
- Set **Osc 1 Shape** to `Saw`, **Level** to `45`, **Fine** to `+2`
- Set **Osc 2 Shape** to `Saw`, **Level** to `45`, **Fine** to `-2`
- Set **Osc 3 Level** to `25`, **Shape** to `15`
- Set **Osc 4 Level** to `25`, **Shape** to `15`
- Set **Osc Slop** to `2`
- Set **LPF Frequency** to `50`, **Resonance** to `35`, **4-Pole** ON
- Set **Key Amount** to `72`
- Set ENV 1: **Attack** = `20`, **Decay** = `60`, **Sustain** = `40`, **Release** = `35`, **Env Amount** = `70`
- Set ENV 2 (VCA): **Attack** = `30`, **Decay** = `0`, **Sustain** = `100`, **Release** = `45`

This gives us a warm, hybrid pad with some filter envelope movement as a foundation.

<div data-evolver-panel data-knobs="knob-osc-level:45,knob-osc-fine:66,knob-filter-frequency:50,knob-filter-resonance:35,knob-filter-keyamount:72,knob-filter-envamount:70,knob-filter-attack:20,knob-filter-decay:60,knob-filter-sustain:40,knob-amp-attack:30,knob-amp-sustain:100" data-highlights="knob-filter-frequency:blue,knob-filter-resonance:blue,knob-osc-level:blue" data-sections="oscillators,filter" data-zoom="false"></div>

## Exercises

### Exercise 1: Modulation of Modulation (8 min)

The most powerful technique is using one modulation source to control the depth of another:

1. Set **LFO 1**: Shape = `Tri`, Frequency = `25`, Amount = `40`, Destination = `FiL` (Filter Frequency)
2. Play a sustained note -- you should hear the filter sweep back and forth at a steady rate and depth
3. Now set **LFO 2**: Shape = `Tri`, Frequency = `5` (very slow), Amount = `30`, Destination = `LF1A` (LFO 1 Amount)
4. Play a sustained note and hold for 20+ seconds -- you should hear the filter sweep depth change over time. Sometimes the filter barely moves, sometimes it sweeps widely. LFO 2 is modulating how much LFO 1 affects the filter
5. Add **LFO 3**: Shape = `Random`, Frequency = `12`, Amount = `15`, Destination = `LF1F` (LFO 1 Frequency)
6. Play and hold again -- now even the speed of the filter sweep changes randomly. The result should feel organic and unpredictable, like the sound is breathing and shifting on its own

This is three layers of modulation: LFO 1 moves the filter, LFO 2 controls how much it moves, LFO 3 controls how fast it moves.

### Exercise 2: Envelope Controlling LFO (5 min)

Use ENV 3 to create modulation that changes over the course of a note:

1. Keep LFOs from Exercise 1
2. Set **ENV 3**: Destination = `LF1A` (LFO 1 Amount), Amount = `60`, Attack = `0`, Decay = `80`, Sustain = `10`, Release = `40`
3. Play a note -- you should hear the filter sweep start wide (bright initial movement) and gradually narrow (settle down) as ENV 3 decays. The sound evolves from active to calm within each note
4. Try reversing: set **ENV 3 Amount** to `-60` -- now the sound starts calm and the filter sweep builds in intensity as the note sustains

### Exercise 3: Sequencer as Modulation Layer (7 min)

Add the sequencer as another modulation source for rhythmic variation:

1. Program **Seq 1** steps 1-16 with varied values: `20, 80, 40, 90, 10, 70, 50, 60, 30, 85, 15, 75, 45, 95, 25, 55`
2. Set **Mod Slot 1**: Source = `Seq1` (Sequencer Track 1), Amount = `25`, Destination = `FiL` (Filter Frequency)
3. Press **START/STOP** to start the sequencer
4. Play a sustained note -- you should hear a rhythmic filter pattern from the sequencer layered ON TOP of the LFO sweep from Exercise 1. The two modulation sources add together at the filter destination
5. Set **Mod Slot 2**: Source = `Seq1`, Amount = `10`, Destination = `RES` (Resonance) -- now the sequencer also subtly varies the resonance, making some steps more "quacky" than others
6. Add velocity sensitivity: **Filter Velocity** = `40` -- harder playing opens the filter more, adding yet another layer of variation

This creates a sound where every note is shaped by velocity, LFO movement varies over time via other LFOs, and the sequencer adds rhythmic timbral pattern. No two moments sound exactly the same.

### Exercise 4: Build the Evolving Texture Patch (8 min)

Pull everything together into a final complex modulation patch:

1. Verify the hybrid oscillator setup from the Setup section is still active
2. **LFO 1**: Shape = `Tri`, Frequency = `20`, Amount = `35`, Destination = `FiL` -- filter sweep
3. **LFO 2**: Shape = `Tri`, Frequency = `4` (very slow), Amount = `25`, Destination = `LF1A` -- sweep depth modulation
4. **LFO 3**: Shape = `RevSaw`, Frequency = `8`, Amount = `10`, Destination = `SpL` (Filter Split) -- slow stereo movement
5. **LFO 4**: Shape = `Tri`, Frequency = `45`, Amount = `5`, Destination = `OAF` (All Osc Frequency) -- subtle vibrato
6. **ENV 3**: Destination = `LF1A`, Amount = `40`, Attack = `0`, Decay = `90`, Sustain = `15`, Release = `50` -- envelope shapes the filter sweep intensity per note
7. **Mod Slot 1**: Source = `Noi` (Noise), Amount = `8`, Destination = `FiL` -- subtle grit on the filter
8. **Mod Slot 2**: Source = `MWl` (Mod Wheel), Amount = `-40`, Destination = `FiL` -- mod wheel darkens
9. **Pressure Destination** = `LF4A` (LFO 4 Amount), **Pressure Amount** = `30` -- aftertouch adds vibrato depth
10. **Filter Velocity** = `45`, **VCA Velocity** = `25`

<div data-evolver-panel data-knobs="knob-lfo-frequency:20,knob-lfo-amount:35,knob-filter-frequency:50,knob-filter-resonance:35,knob-filter-velocity:45,knob-amp-velocity:25,knob-mod-amount:8" data-highlights="knob-lfo-amount:amber,knob-lfo-frequency:amber,knob-mod-amount:amber,knob-filter-velocity:amber" data-sections="lfos,modulators,filter" data-zoom="false"></div>

Play this patch. Hold notes for 30+ seconds. You should hear:
- The filter sweep evolving in depth and character over time
- Subtle stereo movement from the split modulation
- Gentle vibrato that deepens with aftertouch
- Rhythmic grit from the noise modulation
- Dynamic response to velocity
- Mod wheel control for live darkening

**Save this patch** as your "Evolving Texture" patch.

## Exploration (optional, hyperfocus days)

- Add the sequencer: program Seq 1 with random-ish values, set Seq 1 Destination to FiL, start the sequencer. The rhythmic pattern adds another layer to the already complex modulation
- Try cross-modulating LFOs: LFO 2 Dest = LF3F (LFO 3 Frequency). Now the stereo split speed is itself modulated. Chaos in a good way
- Reduce everything to one modulation layer at a time to understand each layer's contribution. Then add them back one by one

## Output Checklist

- [ ] Evolving texture patch saved with multiple stacked modulation layers
- [ ] Understand modulation-of-modulation (LFO controlling another LFO's depth or rate)
- [ ] Can combine LFOs, envelopes, sequencer, and controllers for complex evolving sounds
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Modulation of modulation is the key to organic, evolving sounds -- one LFO controlling another's depth or speed creates movement that never exactly repeats
- Multiple modulation sources targeting the same destination add together, creating compound movement that is richer than any single source
- The Evolver's modulation architecture (4 LFOs + 3 envelopes + 4 mod slots + 4 sequencer tracks + controllers) provides enough routing for deeply complex, self-evolving patches

## Next Session Preview

You have now completed the foundational modules (1-5). You understand oscillators (analog and digital), filters, envelopes, and modulation. Next you will enter the effects world -- delay, feedback, and distortion -- where the Evolver's post-processing transforms raw synthesis into finished sounds.
