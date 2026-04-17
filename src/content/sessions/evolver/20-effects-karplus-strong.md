---
title: 'Session 20: Tuned Feedback and Karplus-Strong Synthesis'
session_number: 20
duration: 25
prerequisite: 19
output_type: patch
difficulty: intermediate
tags:
  - effects
  - feedback
  - karplus-strong
  - physical-modeling
  - plucked-string
instrument: evolver
reference: 'Anu Kirk p.55-56, p.66-67, DSI Manual p.19'
section: Effects
instrument_type: instrument
---

# Session 20: Tuned Feedback and Karplus-Strong Synthesis

**Objective:** Use the Evolver's tuned feedback delay lines and digital delay to create plucked string, marimba, and physical modeling sounds through Karplus-Strong synthesis.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set all Osc Levels to `0`. Set Feedback Level to `60`, ENV 3 Dest = `NoL` (Noise Level), Amount = `99`, Decay = `17`. Set Mod Slot 1 and 2: Source = `Nno` (MIDI Note), Dest = `FbF` (Feedback Freq), Amount = `+99`. Play notes -- you hear plucked strings.

## Warm-Up (2 min)

Load your rhythmic delay patch from Session 19. Play a few short notes and listen to the multi-tap echoes. The delay creates repeating patterns from single events. Today you will use feedback and delay in a different way -- as a sound generator, not just an effect. Load the basic patch.

## Setup

From the basic patch:
- Set **Osc 1 Level** to `0`, **Osc 2 Level** to `0`, **Osc 3 Level** to `0`, **Osc 4 Level** to `0` (all oscillators off -- we will generate sound from feedback only)
- Set **LPF Frequency** to `164` (wide open)
- Set ENV 2 (VCA): **Attack** = `0`, **Decay** = `0`, **Sustain** = `100`, **Release** = `30`

We start silent. The feedback and delay will become our sound source.

## Exercises

### Exercise 1: Tuned Feedback Basics (6 min)

The Evolver has two tuned delay lines (one per channel) that feed back to the filter input. The Feedback Frequency parameter tunes them from C0 to C4 in semitones (DSI Manual p.19).

1. Set **Feedback Frequency** to `24` (C2)
2. Set **Feedback Level** to `60`

<div data-evolver-panel data-knobs="knob-osc-level:0,knob-feedback-frequency:24,knob-feedback-amount:60" data-highlights="knob-feedback-frequency:amber,knob-feedback-amount:amber,switch-feedback-grunge:blue" data-sections="feedback"></div>

3. Play a note -- you should hear a pitched tone coming from the feedback loop itself. The feedback delay line is resonating at the frequency you set
4. Slowly increase **Feedback Level** to `80` -- the tone gets stronger and sustains longer
5. Change **Feedback Frequency** to `12` (C1) -- lower pitch. Change to `36` (C3) -- higher pitch. Each step is one semitone
6. Turn on **Grunge** -- the feedback gets harsher, more aggressive. "Enables nasty feedback at higher levels" (DSI Manual p.19). Turn it off for now
7. Lower **LPF Frequency** to `80` -- the feedback tone gets darker because it passes through the filter on each feedback cycle

**Key insight**: Feedback Frequency is static by default -- it does not track your keyboard. Every note plays the same feedback pitch. We will fix that next.

### Exercise 2: Keyboard-Tracking Feedback (5 min)

To make feedback track your keyboard, use MIDI Note Number as a mod source. You need two mod slots for semitone accuracy (Anu Kirk p.55-56 -- each slot provides quarter-tones, so two slots give half-tones).

1. Set **Feedback Frequency** to `0` (C0 -- the base; MIDI notes will add to this)
2. Set **Feedback Level** to `70`
3. Set **Mod Slot 1**: Source = `Nno` (MIDI Note Number), Amount = `+99`, Destination = `FbF` (Feedback Frequency)
4. Set **Mod Slot 2**: Source = `Nno`, Amount = `+99`, Destination = `FbF`
5. Play different notes on the keyboard -- the feedback pitch now tracks your playing chromatically. Lower notes = lower feedback pitch, higher notes = higher pitch
6. The exact pitch may be slightly sharp or flat depending on the filter frequency setting (DSI Manual p.19). Try adjusting **LPF Frequency** between `60` and `120` to hear how the filter influences the feedback tuning

### Exercise 3: Karplus-Strong with Feedback (7 min)

Karplus-Strong synthesis uses a short noise burst ("excitation") fed into a feedback loop to simulate plucked strings (Anu Kirk p.66-67).

1. Keep the keyboard-tracking mod slots from Exercise 2
2. Set **Feedback Level** to `60`
3. Set **ENV 3**: Destination = `NoL` (Noise Level), Amount = `99`, Attack = `0`, Decay = `17`, Sustain = `0`, Release = `0`
4. Play notes -- you should hear a twangy, plucked-string sound. ENV 3 produces a very short burst of noise that "excites" the feedback loop, which then resonates at the tuned pitch
5. Try different **ENV 3 Decay** values: `8` (very tight pluck, like a harpsichord), `25` (softer pluck, more marimba-like), `40` (breathy attack, more like a bowed string beginning)
6. Set **LPF Frequency** to `64` with **4-Pole** ON -- the tone gets warmer and more string-like. The filter removes high harmonics from each feedback cycle, just like damping on a real string
7. Try **Feedback Level** = `50` (note dies quickly like a muted string) vs `80` (note rings long like an open string)

<div data-evolver-panel data-knobs="knob-osc-level:0,knob-feedback-frequency:0,knob-feedback-amount:60,knob-filter-frequency:64,knob-env3-decay:17,knob-env3-amount:99,knob-env3-attack:0,knob-env3-sustain:0" data-highlights="knob-feedback-frequency:amber,knob-feedback-amount:amber,knob-env3-decay:amber,knob-filter-frequency:blue" data-sections="feedback,envelope3,filter" data-zoom="false"></div>

**Save this patch** as your "Plucked String" patch.

### Exercise 4: Karplus-Strong with Digital Delay (5 min)

An alternative Karplus-Strong method uses the digital delay instead of the feedback lines (Anu Kirk p.67).

1. Set **Feedback Level** to `0` (turn off the feedback lines)
2. Set **Delay 1 Level** to `100` (loud -- it is the sound generator)
3. Set **Delay 1 Time** to `94` (a low base pitch)
4. Set **Delay Feedback 1** to `79` (enough to sustain but not ring forever)
5. Set **Mod Slot 1**: Source = `Nno`, Amount = `+99`, Destination = `DT1` (Delay 1 Time)
6. Set **Mod Slot 2**: Source = `Nno`, Amount = `+99`, Destination = `DT1`
7. Keep **ENV 3** from Exercise 3 (noise burst excitation)
8. Play notes -- you should hear a different plucked-string character. The delay-based version sounds different because the delay path is different from the feedback path in the signal chain
9. Try lower **Delay Feedback 1** values: `60` (short pluck) vs `85` (long ring). Too much feedback and the note rings indefinitely

Compare the two methods: feedback-based (Exercise 3) vs delay-based (Exercise 4). Each has its own character.

## Exploration (optional, hyperfocus days)

- With the feedback-based Karplus-Strong, add Grunge ON and Feedback Level at 75 for aggressive, metallic plucks
- Try using ENV 3 with a Destination of `OAL` (All Osc Level) instead of Noise -- the oscillators become the excitation source, giving a different attack character
- Add a small amount of delay to the feedback-based patch for plucked reverb: Delay 1 Time = `120`, Level = `30`, Feedback 1 = `40`

## Output Checklist

- [ ] Plucked string patch saved using Karplus-Strong synthesis
- [ ] Understand tuned feedback: Frequency (C0-C4), Level, Grunge
- [ ] Can make feedback track keyboard pitch using two mod slots
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- The Evolver's tuned feedback is a sound generator, not just an effect -- it creates pitched tones by resonating at a set frequency
- Karplus-Strong synthesis uses a short noise burst to "excite" a tuned feedback or delay loop, simulating plucked strings and percussion
- Two mod slots with MIDI Note Number are needed for chromatic keyboard tracking of feedback frequency (each slot provides quarter-tones)

## Next Session Preview

Session 21 covers the Evolver's distortion, grunge, and output hack -- the destructive effects that add aggression, lo-fi character, and sonic mayhem. You will combine them with what you have learned about delay and feedback.
