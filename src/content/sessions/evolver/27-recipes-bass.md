---
title: "Session 27: Bass Sounds -- Sub, Acid, and FM"
module: "Sound Design Recipes"
session_number: 27
duration: 25
prerequisite: 26
output_type: patch
difficulty: advanced
tags: [recipes, bass, sub-bass, acid, fm-bass, sound-design]
instrument: evolver
reference: "Anu Kirk p.95-98, DSI Manual p.15-19"
---

# Session 27: Bass Sounds -- Sub, Acid, and FM

**Objective:** Build three distinct bass patches from scratch -- sub bass, acid bass, and FM bass -- using techniques from all previous modules, producing named patches with full parameter documentation.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set Osc 1 Shape = `Saw`, Level = `55`, Osc 2 Shape = `Pulse 50`, Level = `50`, Fine = `+3`. LPF Freq = `45`, Resonance = `70`, 4-Pole ON, Env Amount = `80`, Decay = `45`, Sustain = `5`. Glide = `30`. Instant acid bass.

## Warm-Up (2 min)

Load your generative sequence patch from Session 26. Press START/STOP and listen for 30 seconds to the self-playing pattern. You have mastered every building block: oscillators, filters, modulation, effects, and sequencer. Now you combine them into specific sounds. Stop the sequence and load the basic patch.

## Setup

Each recipe starts from the basic patch. Have 3 empty program slots ready for saving.

## Exercises

### Recipe 1: Sub Bass (7 min)

Deep, fundamental low end. Minimal harmonics, tight envelope, mono output.

1. From the basic patch:
   - **Osc 1 Shape** = `Saw`, **Level** = `55`, **Frequency** = `C0`
   - **Osc 2 Shape** = `Saw`, **Level** = `50`, **Frequency** = `C0`, **Fine** = `+2` (very slight detuning for width)
   - **Osc 3 Level** = `0`, **Osc 4 Level** = `0`
2. Filter settings -- almost closed to remove upper harmonics:
   - **LPF Frequency** = `35`, **Resonance** = `0`, **4-Pole** ON
   - **Key Amount** = `72` (filter tracks keyboard)
   - **Env Amount** = `25`, ENV 1: **Attack** = `0`, **Decay** = `40`, **Sustain** = `60`, **Release** = `15`
3. VCA for tight bass envelope:
   - ENV 2: **Attack** = `0`, **Decay** = `30`, **Sustain** = `80`, **Release** = `10`
4. Output: **Pan** = `Mono` (bass should be centered for mix compatibility)
<div data-evolver-panel data-knobs="knob-osc-shapepw:0,knob-osc-level:55,knob-osc-fine:65,knob-filter-frequency:35,knob-filter-resonance:0,knob-filter-envamount:25,knob-filter-keyamount:72,knob-filter-attack:0,knob-filter-decay:40,knob-filter-sustain:60,knob-filter-release:15,knob-amp-attack:0,knob-amp-decay:30,knob-amp-sustain:80,knob-amp-release:10" data-highlights="knob-osc-level:amber,knob-filter-frequency:amber,knob-filter-resonance:blue,switch-4pole:amber" data-sections="oscillators,filter,amp"></div>

5. Play notes in the C1-C3 range. You should hear a deep, round sub bass with a gentle filter pluck on attack
6. Add **Osc Slop** = `1` for subtle analog warmth

**Save as "Sub Bass"**. This is your go-to low-end patch.

### Recipe 2: Acid Bass (8 min)

Resonant filter sweep, glide between notes, aggressive character. The classic 303-inspired sound.

1. Load the basic patch fresh:
   - **Osc 1 Shape** = `Saw`, **Level** = `55`
   - **Osc 2 Shape** = `Pulse 50`, **Level** = `50`, **Fine** = `+3`
   - **Osc 3 Level** = `0`, **Osc 4 Level** = `0`
   - **Osc Slop** = `3`
2. Acid filter -- high resonance, strong envelope sweep:
   - **LPF Frequency** = `45`, **Resonance** = `70`, **4-Pole** ON
   - **Env Amount** = `80`
   - ENV 1: **Attack** = `0`, **Decay** = `45`, **Sustain** = `5`, **Release** = `15`
   - **Key Amount** = `72`
3. VCA -- punchy:
   - ENV 2: **Attack** = `0`, **Decay** = `35`, **Sustain** = `70`, **Release** = `12`
4. Acid character:
   - **Glide** (Osc 1 and 2) = `30` (fingered glide for slides between notes)
   - **Distortion** = `15` (subtle edge)
<div data-evolver-panel data-knobs="knob-osc-shapepw:0,knob-osc-level:55,knob-osc-fine:67,knob-osc-glide:30,knob-filter-frequency:45,knob-filter-resonance:70,knob-filter-envamount:80,knob-filter-keyamount:72,knob-filter-attack:0,knob-filter-decay:45,knob-filter-sustain:5,knob-filter-release:15,knob-amp-attack:0,knob-amp-decay:35,knob-amp-sustain:70,knob-amp-release:12,knob-distortion-amount:15" data-highlights="knob-filter-resonance:amber,knob-filter-envamount:amber,knob-osc-glide:amber,knob-distortion-amount:amber,switch-4pole:amber" data-sections="oscillators,filter,amp,distortion"></div>

5. Play legato notes in the C1-C2 range. You should hear the classic acid squelch: resonant filter sweep on each note, glide between held notes
6. For extra acid: add **Velocity** on filter = `40` -- harder playing opens the filter more
7. Try it with a sequence: Seq 1 Dest = `OAF`, program `36, 36, 48, 48, 43, oFF, 46, 36`, Step 9 = `rST`, BPM = `130`, Clock Divide = `16th`

**Save as "Acid Bass"**.

### Recipe 3: FM Bass (8 min)

Metallic, punchy low end using FM between digital oscillators. Modern bass sound.

1. Load the basic patch fresh:
   - **Osc 1 Level** = `0`, **Osc 2 Level** = `0` (digital only)
   - **Osc 3 Shape** = `1` (sine), **Level** = `55`, **Frequency** = `C0`
   - **Osc 4 Shape** = `1` (sine), **Level** = `0` (modulator, not heard directly), **Frequency** = `C0`
   - **FM 4->3** = `45` (Osc 4 modulates Osc 3's frequency)
2. Filter -- moderate, controlled:
   - **LPF Frequency** = `55`, **Resonance** = `20`, **4-Pole** ON
   - **Env Amount** = `40`
   - ENV 1: **Attack** = `0`, **Decay** = `50`, **Sustain** = `15`, **Release** = `15`
   - **Key Amount** = `72`
3. VCA:
   - ENV 2: **Attack** = `0`, **Decay** = `35`, **Sustain** = `65`, **Release** = `15`
4. FM envelope for punch -- the FM amount decreases over time for a metallic attack:
   - **ENV 3**: Destination = `FM4` (FM 4->3 Amount), Amount = `55`, Attack = `0`, Decay = `40`, Sustain = `10`, Release = `15`
<div data-evolver-panel data-knobs="knob-osc-level:55,knob-osc-fm:45,knob-filter-frequency:55,knob-filter-resonance:20,knob-filter-envamount:40,knob-filter-keyamount:72,knob-filter-attack:0,knob-filter-decay:50,knob-filter-sustain:15,knob-filter-release:15,knob-amp-attack:0,knob-amp-decay:35,knob-amp-sustain:65,knob-amp-release:15,knob-env3-destination:33,knob-env3-amount:55,knob-env3-attack:0,knob-env3-decay:40,knob-env3-sustain:10,knob-env3-release:15" data-highlights="knob-osc-fm:amber,knob-env3-amount:amber,knob-env3-destination:amber,switch-osc3:amber,switch-osc4:amber" data-sections="oscillators,filter,envelope3"></div>

5. Play notes in the C1-C3 range. You should hear a metallic, complex bass that is punchy on the attack (high FM) and settles to a simpler tone (low FM) as the note sustains
6. Try different Osc 4 Frequency ratios: set Osc 4 to `C1` (one octave up from Osc 3) for a different harmonic series. `G0` creates a 3:2 ratio -- experiment with intervals
7. Add **Distortion** = `10` for extra grit

**Save as "FM Bass"**.

## Exploration (optional, hyperfocus days)

- Combine Sub Bass with a sequenced acid pattern: use the sub bass as the oscillator sound but add acid filter settings
- Add the delay from Session 19 to any bass patch for dubby echoes: Delay 1 Time = `2 Steps`, Level = `35`, Feedback 1 = `40`, Feedback 2 = `25`
- Make a "Reese bass": two detuned saws (Osc 1 Fine = `+8`, Osc 2 Fine = `-8`) with LFO on filter cutoff

## Output Checklist

- [ ] Sub Bass patch saved -- deep, round, centered
- [ ] Acid Bass patch saved -- resonant filter sweep, glide, punchy
- [ ] FM Bass patch saved -- metallic, complex, envelope-shaped FM
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Sub bass uses closed filter and minimal processing for a clean low end; mono output is essential for mix compatibility
- Acid bass depends on three elements: high resonance, strong filter envelope, and glide -- the interplay between these creates the characteristic squelch
- FM bass uses envelope-controlled FM amount to create a metallic attack that decays to a simpler tone -- the FM ratio (oscillator frequency relationship) determines the harmonic character

## Next Session Preview

Session 28 creates three lead patches -- sync lead, FM lead, and filtered lead. These are performance-oriented sounds with expression mappings for mod wheel and velocity.
