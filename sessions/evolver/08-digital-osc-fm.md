---
title: 'Session 08: FM Synthesis Basics'
session_number: 8
duration: 25
prerequisite: 7
output_type: patch
difficulty: intermediate
tags:
  - digital-oscillators
  - fm-synthesis
  - frequency-modulation
  - bells
  - metallic
instrument: evolver
reference: 'Anu Kirk p.26-32, DSI Manual p.16'
section: Digital Oscillators
instrument_type: instrument
---

# Session 08: FM Synthesis Basics

**Objective:** Use frequency modulation between the digital oscillators to create metallic, bell-like, and complex timbres that are impossible with analog oscillators alone.

> [!tip] If you only have 5 minutes
> Load the basic patch, set Osc 1+2 Level to 0, Osc 3+4 Shape to 1 (sine), and set FM 4->3 to 12. Play a note. That metallic shimmer is FM synthesis.

## Warm-Up (2 min)

Load the basic patch. Set Osc 1+2 Level to `0`. Set Osc 3 to your favorite waveshape from Session 07, Level `50`. Play a few notes across the range and listen to the digital character, including any aliasing at high notes. Today you will transform these timbres further with FM.

## Setup

From the basic patch:
- Set **Osc 1 Level** to `0` and **Osc 2 Level** to `0`
- Set **Osc 3 Shape** to `1` (sine wave), **Level** to `50`, **Frequency** to `C0`
- Set **Osc 4 Shape** to `1` (sine wave), **Level** to `0` (modulator -- we do not want to hear it directly), **Frequency** to `C0`

## Exercises

### Exercise 1: Basic FM -- Sine on Sine (5 min)

<div data-evolver-panel data-knobs="knob-osc-level:50,knob-osc-shapepw:1,knob-osc-frequency:0,knob-osc-fm:0" data-highlights="switch-osc3:amber,switch-osc4:blue,knob-osc-fm:amber" data-sections="oscillators"></div>

1. Play a few notes to hear the pure sine wave from Osc 3 -- you should hear a simple, clean tone
2. Set **FM 4->3** to `5` -- you should hear the sine start to develop harmonics, becoming slightly brighter
3. Increase **FM 4->3** to `12` -- you should hear a noticeably metallic, bell-like quality. "That is not a sine wave anymore, is it?" (Anu Kirk p.27)
4. Increase to `25` -- you should hear more complex, harsh harmonics
5. Increase to `50` -- you should hear a very complex, almost noisy timbre
6. Return to `12` -- this is the sweet spot for many FM sounds

"Very small changes in value can produce very big effects on the timbre" -- Anu Kirk p.27

See Anu Kirk p.26-27 ("Exercise 1: A Simple FM Sound")

### Exercise 2: Different Waveshapes as Modulator (5 min)

The Evolver allows any waveshape as carrier or modulator, unlike the DX-7 which only used sine waves. This makes Evolver FM more aggressive and versatile.

1. Keep **FM 4->3** at `12`, **Osc 3 Shape** at `1` (sine carrier)
2. Set **Osc 4 Shape** to `2` (sawtooth modulator) -- you should hear a much more complex result than sine-on-sine (Anu Kirk p.27)
3. Try **Osc 4 Shape** to `9` -- you should hear a different harmonic character
4. Try **Osc 4 Shape** to `36` -- you should hear yet another timbre
5. Try **Osc 4 Shape** to `70` -- you should hear increasingly wild results
6. Now change the carrier too: set **Osc 3 Shape** to `2` (sawtooth) with Osc 4 at `1` (sine modulating a saw) -- you should hear a fuzzy, harmonically rich tone
7. Try **Osc 3 Shape** to `15` -- you should hear even more complexity

"Unlike the DX-7 which only use sine waves as carriers and modulators, Evolver lets you use any of the digital waveshapes" -- Anu Kirk p.27

See Anu Kirk p.27-28 ("Exercise 2: New Waves")

### Exercise 3: FM Ratios -- The Key to Usable Sounds (8 min)

The frequency ratio between carrier and modulator determines the harmonic character of the FM sound:

1. Reset: **Osc 3 Shape** = `1` (sine), **Osc 4 Shape** = `1` (sine), **FM 4->3** = `12`
2. Verify **Osc 3 Frequency** = `C0`, **Osc 4 Frequency** = `C0` (1:1 ratio) -- play a note
3. Set **Osc 4 Frequency** to `C1` (one octave higher, 2:1 ratio) -- you should hear a distinctly different timbre
4. Set **Osc 4 Frequency** to `G1` (19 semitones up), **Osc 4 Fine** to `+2` (3:1 ratio) -- you should hear another character (Anu Kirk p.29)
5. Set **Osc 4 Frequency** to `C2` (two octaves up, 4:1 ratio) -- you should hear yet another harmonic flavor
6. Try `E2` with Fine `-14` (5:1 ratio) -- this should sound more bell-like
7. Try `C3` (8:1 ratio) -- at high ratios you should hear the modulator as harmonics rather than distinct pitch

**Non-integer ratios** produce inharmonic, bell-like, or metallic timbres:
8. Set **Osc 4 Frequency** to `C#1` (not a simple ratio) -- you should hear clangorous, bell-like tones
9. Try **Osc 4 Frequency** to `F#1` -- you should hear noisy, metallic results

"If your ratios aren't whole numbers, you're going to get non-harmonic partials -- stuff that sounds like bells, or noise" -- Anu Kirk p.29

See Anu Kirk p.28-30 ("Exercise 3: A Certain Ratio")

### Exercise 4: FM Bell Patch (5 min)

Combine what you have learned to create a classic FM bell:

1. **Osc 3 Shape** = `1` (sine carrier), **Frequency** = `C0`, **Level** = `50`
2. **Osc 4 Shape** = `1` (sine modulator), **Frequency** = `E2`, **Fine** = `-14`, **Level** = `0`
3. **FM 4->3** = `18`
4. **VCA Envelope (ENV 2)**: Attack = `0`, Decay = `70`, Sustain = `0`, Release = `45`
5. **Filter Envelope (ENV 1)**: Attack = `0`, Decay = `55`, Sustain = `20`, Release = `30`, **Env Amount** = `60`, **LPF Frequency** = `80`

<div data-evolver-panel data-knobs="knob-osc-shapepw:1,knob-osc-frequency:0,knob-osc-fm:18,knob-amp-attack:0,knob-amp-decay:70,knob-amp-sustain:0,knob-amp-release:45,knob-filter-frequency:80,knob-filter-envamount:60,knob-filter-attack:0,knob-filter-decay:55,knob-filter-sustain:20,knob-filter-release:30" data-highlights="knob-osc-fm:amber,knob-amp-decay:amber,knob-filter-envamount:amber,knob-filter-decay:blue" data-sections="oscillators,amp,filter"></div>

Play a note. You should hear a bell-like tone that rings and decays naturally. Play in the mid to upper range for the most bell-like quality. Lower notes will sound more like a marimba.

**Modulating the FM amount** makes it even more expressive:
6. Set **ENV 3 Destination** to `FM 4->3`, **Amount** = `29`, **Decay** = `46`

Now each note starts with more FM harmonics that quickly decay -- the bell attack is brighter, then mellows. "ENV 3 is modulating the amount of FM -- starting it a little bit higher and dropping it fairly quickly" (Anu Kirk p.30).

**Save this patch** as your FM bell.

See Anu Kirk p.30-31 ("Exercise 4: Modulating FM!")

## Exploration (optional, hyperfocus days)

- Try bidirectional FM: set both **FM 4->3** to `8` AND **FM 3->4** to `8`. "You can do both at the same time... small changes have big results when doing this" (Anu Kirk p.33)
- Mix in an analog oscillator: bring Osc 1 Level to `30` (Saw) to add analog warmth underneath the FM digital tone
- FM can make sounds go out of tune. Use **Fine** on Osc 3 to correct the intonation (Anu Kirk p.31)

## Output Checklist

- [ ] FM bell/metallic patch saved
- [ ] Understand how FM amount, waveshape choice, and ratio affect the timbre
- [ ] Can create both harmonic (integer ratio) and inharmonic (non-integer ratio) FM sounds
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- FM synthesis modulates the frequency of a carrier oscillator with a modulator oscillator, creating harmonics that neither oscillator could produce alone
- Small changes in FM amount have large effects on timbre -- start low and increase gradually
- The ratio between carrier and modulator frequencies is the most important factor: integer ratios produce musical harmonics, non-integer ratios produce bells and metallic textures

## Next Session Preview

Next time you will explore ring modulation -- another way to combine digital oscillators that produces sum and difference frequencies, creating metallic, clangorous textures perfect for percussive and atmospheric sounds.
