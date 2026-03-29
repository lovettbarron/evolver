---
title: "Session 03: Analog Oscillator Waveshapes"
module: "Analog Oscillators"
session_number: 3
duration: 20
prerequisite: 1
output_type: technique
difficulty: beginner
tags: [analog-oscillators, waveshapes, sawtooth, triangle, pulse, timbre]
instrument: evolver
reference: "Anu Kirk p.9-16, DSI Manual p.15"
---

# Session 03: Analog Oscillator Waveshapes

**Objective:** Hear and identify the four analog waveshape types -- sawtooth, triangle, saw-tri mix, and pulse -- and understand why waveshape is the foundation of timbre.

> [!tip] If you only have 5 minutes
> Do Exercise 1 only. Set Osc 3 and 4 Level to 0, solo Osc 1, and step through the four shapes while holding a note. You will hear why waveshape matters.

## Warm-Up (2 min)

Load your basic patch (Bank 1, Program 128). Play a few notes across the keyboard. Solo Osc 1 (hold the OSC 1 button). Now solo Osc 2. They should sound identical -- both sawtooth waves, one in each stereo channel. Release the solo button.

## Setup

From the basic patch:
- Set **Osc 3 Level** to `0` and **Osc 4 Level** to `0` (we only want to hear the analog oscillators)
- Keep Osc 1 and Osc 2 at Level `50`

## Exercises

### Exercise 1: The Four Shapes (5 min)

Solo **Osc 1** (hold the OSC 1 button). Hold down a note around middle C and change the **Shape** parameter through each option. Listen carefully to each for at least 5 seconds:

1. Set Shape to **Saw** -- you should hear a bright, buzzy tone. This is the "generic synthesizer" sound because sawtooth waves contain all harmonics. It responds very well to filtering (Anu Kirk p.11)
2. Set Shape to **Tri** -- you should hear a muted, flute-like tone. Triangle waves have very few harmonics, similar to a sine wave but with more character (Anu Kirk p.12)
3. Set Shape to **Saw-Tri** (the mix setting) -- you should hear something between the two: some brightness from the saw, but softer
4. Set Shape to **P-50** -- you should hear a bright, hollow tone. This is a square wave (pulse at 50% duty cycle) which contains only odd harmonics (Anu Kirk p.12)

Now play each shape at a low note (C1) and a high note (C5). You should hear how the character of each shape changes dramatically across the range.

See Anu Kirk p.11-12 ("Sawtooth", "Triangle", "Mix", "Pulse Waves")

### Exercise 2: Pulse Width Exploration (5 min)

Stay on Osc 1 solo. Set Shape to **P-50** (square wave). Now slowly change the pulse width number:

1. **P-50** -- full square wave, bright and hollow. You should hear the classic square wave tone
2. **P-25** -- narrower pulse. You should hear a thinner, more nasal tone
3. **P-75** -- wide pulse from the other side. You should hear it sound similar to P-25 (think about why -- the ratio is symmetric)
4. **P-10** -- very narrow pulse. You should hear a thin, buzzy tone with less volume
5. **P-01** -- almost nothing. The pulse is so narrow it barely produces sound -- "the pulse width will turn off at the two extremes" (DSI Manual p.15)
6. **P-99** -- same disappearing effect from the other extreme

The pulse width determines the ratio of "on" to "off" in the wave. P-50 is equal (square). Moving away from 50 in either direction makes the sound thinner until it disappears at the extremes. This disappearing behavior is what makes pulse width modulation possible -- interesting territory for modulation.

See Anu Kirk p.12-13 ("Pulse Waves"), DSI Manual p.15 (Shape/PW parameter)

### Exercise 3: Two Oscillators Together (8 min)

Release the Osc 1 solo. Now you hear both Osc 1 (left) and Osc 2 (right) in stereo.

1. Set both to **Saw**. Play a sustained note -- you should hear a full, classic synth sound in stereo
2. Set Osc 1 to **Saw**, Osc 2 to **Tri** -- you should hear the saw dominate but the triangle adds warmth and body underneath
3. Set both to **P-50** -- you should hear a very hollow, organ-like quality
4. Set Osc 1 to **P-48**, Osc 2 to **P-52** -- slightly different pulse widths. You should hear subtle movement because the tiny difference creates timbral interaction between the channels
5. Now set Osc 1 **Fine** to `+3` cents, keeping both as slightly different pulses -- you should hear a slow beating/chorus effect from the detuning
6. Set Osc 2 **Fine** to `-3` cents (so they detune in opposite directions) -- the beating should be richer now
7. Return both **Fine** values to `0` when done

See Anu Kirk p.11 ("Fine") for detuning technique

## Exploration (optional, hyperfocus days)

- Try each waveshape with the **4-POLE** switch engaged and **LPF Frequency** at `80` -- you should hear how filtering interacts differently with each shape's harmonic content
- Set both oscillators to **Saw** but put Osc 2 one octave lower (Frequency `C-1`) -- this is the classic sub-oscillator technique
- Find a waveshape combination you genuinely like and save it to an empty program slot

## Output Checklist

- [ ] Can identify sawtooth, triangle, and pulse waves by ear
- [ ] Understand what pulse width does and why extremes go silent
- [ ] Heard the effect of detuning (Fine) between two oscillators
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Waveshape determines the harmonic content of a sound -- saw has all harmonics (bright), triangle has few (muted), square has only odd harmonics (hollow)
- Pulse width controls the duty cycle ratio and the sound thins out toward the extremes, disappearing at P-01 and P-99
- Small detuning between oscillators (Fine +/- 2-3 cents) creates chorus-like richness without any effects

## Next Session Preview

Next time you will use an LFO to automatically sweep the pulse width, creating the classic analog string sound. This is pulse width modulation (PWM) -- your first modulation technique, and it sounds great.
