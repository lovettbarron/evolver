---
title: "Session 07: Digital Oscillator Waveshapes"
module: "Digital Oscillators"
session_number: 7
duration: 20
prerequisite: 3
output_type: technique
difficulty: beginner
tags: [digital-oscillators, waveshapes, prophet-vs, aliasing, timbre]
instrument: evolver
reference: "Anu Kirk p.22-25, DSI Manual p.16"
---

# Session 07: Digital Oscillator Waveshapes

**Objective:** Explore the Evolver's 96 digital waveshapes from the Prophet-VS lineage and identify your 10 favorites for use in future sessions.

> [!tip] If you only have 5 minutes
> Load the basic patch, set Osc 1+2+4 Level to 0, and step through Osc 3 Shape from 1 to 20, playing a note at each. You will hear how different digital waveshapes sound compared to analog.

## Warm-Up (2 min)

Load your fat detuned patch from Session 06. Play a note and listen to the analog warmth with subtle digital support. Today you focus on the digital side -- Osc 3 and 4 have 96+ unique waveshapes that sound nothing like the analog oscillators. Load the basic patch.

## Setup

From the basic patch:
- Set **Osc 1 Level** to `0` and **Osc 2 Level** to `0` (isolate the digital oscillators)
- Set **Osc 4 Level** to `0` (start with just Osc 3)
- Verify **Osc 3 Shape** is `1`, **Level** is `50`, **Frequency** is `C0`

## Exercises

### Exercise 1: Waveshape Survey (8 min)

Hold a note around middle C and step through the digital waveshapes:

1. **Shape 1** -- this is a sine wave. You should hear a pure, simple tone with no harmonics
2. **Shape 2** -- sawtooth. You should hear it sound similar to the analog saw but with a digital edge
3. **Shape 3** -- square wave. You should hear it sound similar to analog P-50 but crisper
4. **Shapes 4-10** -- step through these, holding a note at each. You should hear increasingly complex timbres with different harmonic flavors. These are single-cycle waveforms from the Prophet-VS (Anu Kirk p.22-24)
5. **Shapes 11-30** -- move faster, spending 3-4 seconds on each. Write down any that grab you
6. **Shapes 31-60** -- continue scanning. Some will sound bell-like, some organ-like, some harsh
7. **Shapes 61-95** -- the higher numbers tend to be more harmonically complex. Shape 95 is a "blank" wave (DSI Manual p.16)
8. **Shape 96** -- unique to the Evolver, not from the Prophet-VS set

"Waveshapes determine the basic harmonic structure of a sound" -- Anu Kirk p.25

Write down your top 10 favorites with the shape number and a one-word description.

See Anu Kirk p.22-25 ("Exploring the Digital Difference"), DSI Manual p.16

### Exercise 2: Digital vs Analog Character (5 min)

Compare the digital and analog sound directly:

1. Set **Osc 3 Shape** to `2` (digital sawtooth), **Level** to `50`
2. Set **Osc 1 Level** to `50`, **Shape** to `Saw` (analog sawtooth)
3. Solo Osc 3 (hold OSC 3 button) and play a note -- you should hear the digital saw
4. Solo Osc 1 (hold OSC 1 button) and play the same note -- you should hear the analog saw. Notice the difference in warmth and character
5. Play both together (release solo) -- you should hear them combine, with the analog adding warmth to the digital precision
6. Now play high notes (C4 and above) with Osc 3 solo -- you should hear aliasing: a "swirly digital noise" that appears at higher frequencies. "Like it or not, there isn't anything that can be done about this" (Anu Kirk p.26). This is part of the Evolver's digital character

### Exercise 3: Pitch Range and Aliasing (5 min)

Aliasing is a defining characteristic of the Evolver's digital oscillators:

1. Set **Osc 3 Shape** to `3` (square wave), all other oscillators to Level `0`
2. Verify **Key Off/Xpose** (in Misc Params) is set to `-24` and **Pitch Wheel Range** to `7`
3. Play middle C and slowly bend the pitch up using the pitch wheel -- you should hear the swirly aliasing artifacts appear as the pitch rises (Anu Kirk p.25-26)
4. Try different waveshapes (4, 15, 36, 70) and play across the full keyboard range -- you should hear how some waveshapes alias more than others at high pitches
5. Try **Shape 1** (sine wave) at high pitches -- you should hear less aliasing because a sine has no harmonics to alias

"The digital oscillators in Evolvers get quite trashy at higher frequencies" -- DSI Manual p.16

This aliasing is not a flaw -- it is a sonic resource. Many great Evolver sounds use the digital grit intentionally.

## Exploration (optional, hyperfocus days)

- Bring back all 4 oscillators: Osc 1+2 analog saws at Level 40, Osc 3+4 with your favorite digital waveshapes at Level 30. Find a mix that blends analog warmth with digital complexity
- Shapes 97-128 are user-loadable slots (DSI Manual p.16). They ship as copies of shapes 1-32 but can be replaced via SysEx
- Try the same waveshape on both Osc 3 and 4 but detune one (Fine = +5) -- digital detuning has a different quality than analog

## Output Checklist

- [ ] Top 10 favorite waveshapes documented with shape numbers and descriptions
- [ ] Can hear the difference between analog and digital oscillator character
- [ ] Understand what aliasing sounds like and when it appears
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- The Evolver's 96 digital waveshapes come from the Prophet-VS lineage -- each is a single-cycle waveform with unique harmonic content
- Digital oscillators have a crisper, more precise character than analog, with aliasing artifacts at higher frequencies that give the Evolver its distinctive digital grit
- Waveshape selection is the digital equivalent of choosing between saw/tri/pulse on analog oscillators -- it sets the fundamental timbre before any filtering or modulation

## Next Session Preview

Next time you will use FM synthesis -- one digital oscillator modulating the frequency of another to create metallic bells, complex timbres, and sounds that are impossible with analog oscillators alone.
