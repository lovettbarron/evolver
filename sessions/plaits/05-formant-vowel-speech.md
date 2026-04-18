---
title: 'Session 05: Formant Oscillator & Vowel/Speech'
session_number: 5
duration: 20
prerequisite: 4
output_type: patch
difficulty: intermediate
tags:
  - mode-pairs
  - formant
  - vowel
  - speech
  - bank-1-model-4
  - bank-2-model-8
instrument: plaits
instrument_type: eurorack_module
reference: 'Plaits Manual pp. 8, 11'
section: Mode Pairs
---

# Session 05: Formant Oscillator & Vowel/Speech

**Objective:** Explore two voice-like synthesis modes: the granular formant oscillator (Bank 1 Model 4) and vowel/speech synthesis (Bank 2 Model 8). Both produce formant-rich, vocal timbres through different techniques.

> [!tip] If you only have 5 minutes
> Set init state. Select Bank 2 Model 8 (vowel/speech). Patch TRIG from a gate source. Sweep TIMBRE slowly -- you will hear the voice character change from Daleks to chipmunks. Turn MORPH to select different phonemes. Instant robot vocals.

## Warm-Up (2 min)

Set init state. Briefly switch to Bank 1 Model 3 (FM) and play a few notes with moderate TIMBRE to reconnect. Then advance to Model 4 (formant oscillator).

## Setup

1. Set all controls to init state
2. Patch V/OCT to **V/OCT**, OUT to mixer
3. Select Bank 1 Model 4 (fourth LED in left column)

## Exercises

### Exercise 1: Granular Formant Oscillator (7 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:64,knob-plaits-timbre:64,knob-plaits-morph:64"
  data-highlights="knob-plaits-harmonics:amber,knob-plaits-timbre:blue,knob-plaits-morph:blue"
></div>

1. With Bank 1 Model 4 selected, play a few notes. You should hear a nasal, vowel-like tone. This model simulates formants through multiplication, addition, and synchronization of sine wave segments
2. Sweep **HARMONICS**: this controls the frequency ratio between formant 1 and formant 2. Different ratios produce different vowel-like qualities
3. Sweep **TIMBRE**: this controls the formant frequency -- lower values produce darker, "oo"-like tones, higher values produce brighter, "ee"-like tones
4. Sweep **MORPH**: this controls formant width and shape -- narrow formants sound more vocal, wide formants blend into smoother tones
5. AUX carries a simulation of filtered waveforms by windowed sine waves -- a recreation of Braids' Z*** models. On AUX, HARMONICS controls the filter type (peaking, LP, BP, HP)

### Exercise 2: Vowel and Speech Synthesis (7 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:30,knob-plaits-timbre:64,knob-plaits-morph:64"
  data-highlights="knob-plaits-harmonics:amber,knob-plaits-timbre:blue,knob-plaits-morph:amber,jack-plaits-trig:blue"
></div>

1. Switch to Bank 2 Model 8 (press MODEL 2 until the bottom LED in the right column lights up). This is the vowel and speech synthesis model
2. Sweep **HARMONICS**: this crossfades between formant filtering, SAM, and LPC vowels, then continues through several banks of LPC words. Each zone has a distinct vocal character
3. Sweep **TIMBRE**: this is the species selector -- from deep Dalek-like voices to high-pitched chipmunk squeaks. Find a voice character you like
4. Sweep **MORPH**: this selects phonemes or word segments within the current HARMONICS bank
5. Patch a gate source to **TRIG**. Use the **FM ATT** knob (with no cable in FM) to control intonation -- the internal envelope shifts pitch during each word. Use the **MORPH ATT** knob (with no cable in MORPH CV) to control speech speed

### Exercise 3: Vocal Texture Comparison (4 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-timbre:64"
  data-highlights="knob-plaits-timbre:amber,knob-plaits-harmonics:blue"
></div>

1. Set both models to similar TIMBRE (noon) and HARMONICS (about 10 o'clock) positions
2. Switch between Bank 1 Model 4 (granular formant) and Bank 2 Model 8 (vowel/speech) while playing the same notes
3. Notice: the formant oscillator produces a continuous, evolving vocal color. The speech model produces distinct phonemes and syllables. One is an instrument, the other is a voice
4. Both respond to V/OCT for pitch tracking -- try playing a melody on each

## Session Output

Document in your Obsidian daily note:

- **Formant oscillator vowel:** Note HARMONICS/TIMBRE/MORPH positions that produced the most convincing vocal tone
- **Speech model word:** Note the HARMONICS zone and MORPH position for your favorite word/syllable
- **Formant vs speech:** Which approach to vocal synthesis did you find more musically useful?

## What's Next

In the next session, you will explore the harmonic oscillator (Bank 1 Model 5) and inharmonic string modeling (Bank 2 Model 4) -- a direct contrast between orderly harmonic spectra and the complex, detuned overtones of physical objects.
