---
title: 'Session 08: Chords & Analog Drums'
session_number: 8
duration: 25
prerequisite: 7
output_type: composition
difficulty: advanced
tags:
  - mode-pairs
  - chords
  - drums
  - composition
  - bank-1-model-7
  - bank-1-model-8
  - bank-2-model-6
  - bank-2-model-7
  - bank-2-model-8
instrument: plaits
instrument_type: eurorack_module
reference: 'Plaits Manual pp. 9, 10-11'
section: Mode Pairs
---

# Session 08: Chords & Analog Drums

**Objective:** Explore the chord modes (Bank 1 Models 7-8) and analog drum models (Bank 2 Models 6-8). These are "instant instruments" -- complete musical elements from a single module. Create a short rhythmic composition combining chord stabs with drum hits.

> [!tip] If you only have 5 minutes
> Set init state. Select Bank 1 Model 7 (chords). Sweep HARMONICS to cycle through chord types -- you will hear full 4-note chords from a single oscillator module. Then switch to Bank 2 Model 6 (bass drum) and patch TRIG from a clock. Instant kick drum. That is Plaits as a complete instrument.

## Warm-Up (2 min)

Set init state. Briefly visit the modal resonator (Bank 2 Model 5) and trigger a few strikes to reconnect. Then advance to Bank 1 Model 7 (chords).

## Setup

1. Set all controls to init state
2. Patch V/OCT to **V/OCT**, OUT to mixer
3. Patch a gate or clock source to **TRIG**
4. Select Bank 1 Model 7 (seventh LED in left column)

## Exercises

### Exercise 1: Chord Synthesis (8 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:64,knob-plaits-timbre:64,knob-plaits-morph:30"
  data-highlights="knob-plaits-harmonics:amber,knob-plaits-timbre:blue,knob-plaits-morph:blue,jack-plaits-trig:amber"
></div>

1. With Bank 1 Model 7 selected and TRIG patched, send triggers. You should hear full 4-note chords played by VA or wavetable oscillators
2. Sweep **HARMONICS**: this selects the chord type -- octave, 5th, sus4, minor, M7, M9, 69, minor 9, and minor 11. Each position is a different chord voicing
3. Sweep **TIMBRE**: this controls chord inversion and transposition -- rearranging which notes are on top
4. Sweep **MORPH**: the first half of the knob goes through string-machine-like waveforms. The second half scans a small wavetable. This controls the raw timbre of each chord voice
5. AUX carries the root note of the chord -- useful for a bass line
6. Switch to Bank 1 Model 8 (vowel/speech synthesis -- eighth LED). Note: this model was covered in Session 05 but also works well as the "8th model" in the chord family since it produces complex pitched content

### Exercise 2: Analog Drum Models (8 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:64,knob-plaits-timbre:64,knob-plaits-morph:64"
  data-highlights="knob-plaits-harmonics:amber,knob-plaits-timbre:blue,knob-plaits-morph:blue,jack-plaits-trig:amber"
></div>

1. Switch to Bank 2 Model 6 (press MODEL 2 six times -- sixth LED in right column). This is the **analog bass drum** model. Send triggers
2. Sweep **HARMONICS**: attack sharpness -- from soft, round kicks to snappy, punchy attacks
3. Sweep **TIMBRE**: brightness of the click/transient. Sweep **MORPH**: decay time -- from tight electronic kicks to boomy sub drops
4. Switch to Bank 2 Model 7 (**analog snare drum**). Sweep HARMONICS: balance of harmonic body vs noisy rattle. TIMBRE: balance between different drum modes. MORPH: decay time
5. Switch to Bank 2 Model 8 (**analog hi-hat**). Sweep HARMONICS: balance of metallic vs filtered noise. TIMBRE: high-pass filter cutoff. MORPH: decay time (closed to open hat)
6. AUX on each drum model carries an emulation of another classic drum circuit -- listen to both outputs for two drum sounds per model

### Exercise 3: Rhythmic Composition (7 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:50,knob-plaits-harmonics:64,knob-plaits-morph:40"
  data-highlights="jack-plaits-trig:amber,jack-plaits-out:amber,jack-plaits-aux:blue"
></div>

1. Choose your favorite drum model (bass drum, snare, or hi-hat). Patch a clock or sequencer gate to TRIG
2. Dial in a drum sound you like using HARMONICS/TIMBRE/MORPH. Patch both OUT and AUX to your mixer -- you now have two drum voices from one module
3. Record or sequence a 4-bar rhythmic pattern using the clock/gate source. If your sequencer can send different gate patterns, try accenting certain beats by varying gate length (longer gates = harder hits via the internal LPG)
4. If you have a second output channel, switch to the chord model (Bank 1 Model 7). Dial in a chord (HARMONICS selects type), set MORPH low for string-like texture
5. Layer the chord stabs with your drum pattern. You now have a complete rhythmic composition -- chords + drums -- from a single Plaits module across two takes or two Plaits modules

## Session Output

Document in your Obsidian daily note -- this is your Plaits curriculum capstone:

- **Drum kit settings:** Note HARMONICS/TIMBRE/MORPH for your best bass drum, snare, and hi-hat
- **Chord patch:** Note chord type (HARMONICS position), waveform (MORPH position), and inversion (TIMBRE position)
- **Composition notes:** Describe the rhythmic pattern you created -- tempo, feel, what worked
- **Plaits summary:** After 8 sessions covering all 16 models, which 3 models will you reach for most often? Why?

## Curriculum Complete

You have now explored all 16 synthesis models across 8 sessions. You understand how HARMONICS, TIMBRE, and MORPH change meaning per model, how the internal LPG and envelope work, and how the AUX output provides complementary content. Plaits is a complete voice -- use it as an oscillator, a drum machine, a chord organ, a speech synthesizer, or a noise generator depending on what your patch needs.
