---
title: "Session 04: VCO A Waveshapes & Tuning"
module: "Oscillators"
session_number: 4
duration: 20
prerequisite: 3
output_type: technique
difficulty: beginner
tags: [oscillators, waveshapes, tuning, vco-a, saw, pulse, sine, triangle]
instrument: cascadia
reference: "Cascadia Manual pp. 17-19"
---

# Session 04: VCO A Waveshapes & Tuning

**Objective:** Hear and identify VCO A's four waveform outputs -- saw, pulse, triangle, and sine -- and understand how waveshape determines timbre by controlling harmonic content.

> [!tip] If you only have 5 minutes
> Raise only the Mixer SAW slider to ~50% and play a note. Then drop SAW to 0% and raise PULSE to ~50%. Hear the difference: bright and buzzy vs. hollow and reedy. That difference is waveshape.

## What Are Oscillator Waveshapes?

An oscillator generates a repeating voltage pattern -- a waveform. The shape of that waveform determines which harmonics are present in the sound, and harmonics are what give a tone its character (its *timbre*). A sawtooth wave contains all harmonics in a descending series, making it the brightest and buzziest raw tone. A square/pulse wave contains only odd harmonics, giving it a hollow, clarinet-like quality. A triangle wave has only odd harmonics but they fall off much faster, producing a soft, flute-like tone. A sine wave has no harmonics at all -- just the fundamental frequency -- making it the purest and most featureless tone.

Every sound you shape with filters, envelopes, and effects starts from whatever harmonics the oscillator provides. Choosing a waveshape is choosing your raw material.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default sawtooth tone through the filter and wave folder. Now lower VCF FREQ to ~25% and raise VCF FM 1 to ~60% -- recall the filter envelope sweep from Session 3. Return VCF FREQ to ~50% and VCF FM 1 to 0%.

## Setup

From the normalled default:
- Mixer SAW at ~50%, all other Mixer sliders at 0%
- VCO A OCTAVE set to a comfortable range (4 or 5)
- VCF FREQ at ~75% (open the filter wide so you hear the raw waveshape character)
- VCF Q at 0% (no resonance coloring)
- Wave Folder FOLD at 0% (no folding)
- VCF FM 1 at 0% (no envelope sweep -- we want to hear static waveshapes)

## Exercises

<div data-cascadia-panel
  data-sections="vco-a,mixer"
  data-highlights="slider-mixer-saw:blue,slider-mixer-pulse:blue,slider-mixer-in-2:blue,knob-vco-a-pitch:amber,switch-vco-a-octave:amber"
></div>

### Exercise 1: Hear Each Waveform (8 min)

> [!info] Normalled: VCO A Saw -> Mixer (direct connection). VCO A's saw output feeds the Mixer's SAW slider without any cable. The Mixer SAW slider controls how much saw wave enters the mix. Patching into the Mixer input does not override this -- the SAW slider is a dedicated VCO A connection.

1. With Mixer SAW at ~50% and all other Mixer sliders at 0%, play a sustained note around middle C -- you should hear a bright, buzzy tone. This is the sawtooth wave: all harmonics present, the most harmonically rich raw sound
2. Lower Mixer SAW to 0% and raise Mixer PULSE to ~50% -- play the same note. You should hear a brighter, more hollow tone. This is the pulse wave at its default width (50% = square wave), containing only odd harmonics
3. Lower Mixer PULSE to 0% and raise Mixer IN 2 to ~50% -- play the same note. You should hear a pure, smooth tone with almost no character. This is VCO A's sine wave, the simplest possible tone

> [!info] Normalled: Mixer IN 2 <- VCO A Sine. The Mixer's second external input is pre-wired to VCO A's sine wave output. Raising the IN 2 slider adds sine to the mix without any cable. Patching into MIXER IN 2 overrides this connection.

4. Play each waveform (SAW, PULSE, sine via IN 2) at a low note (C2) and a high note (C5). Notice how the saw sounds dramatically different across the range while the sine stays relatively featureless at every pitch

> [!info] Cascadia's Mixer provides direct outputs for VCO A's waveforms (SAW OUT, PULSE OUT, TRI OUT) on dedicated jacks. These are always available for patching elsewhere, even while the same waveforms feed the Mixer internally.

### Exercise 2: Octave Range and Fine Tuning (5 min)

1. Set Mixer SAW at ~50% (other sliders at 0%). Click VCO A's OCTAVE selector through its range from lowest to highest, playing a note at each setting -- you should hear the pitch jump one octave per click, from deep bass rumble to piercing treble
2. Set OCTAVE to position 4 or 5 (a comfortable mid-range). Now slowly turn VCO A PITCH knob from noon toward ~75% -- you should hear the pitch rise smoothly up to 6 semitones above the OCTAVE setting
3. Turn PITCH from noon toward ~25% -- you should hear the pitch drop smoothly up to 6 semitones below the OCTAVE setting
4. Return PITCH to noon (center = in tune with the OCTAVE setting)

<div data-cascadia-panel
  data-sections="vco-a"
  data-knobs="knob-vco-a-pitch:64"
  data-highlights="knob-vco-a-pitch:blue,switch-vco-a-octave:blue,slider-vco-a-pw:amber,switch-vco-a-pulse-position:amber"
></div>

### Exercise 3: Pulse Width and Position (5 min)

1. Set Mixer PULSE at ~50% (SAW and IN 2 at 0%). Play a sustained note -- you should hear the default square wave (50% duty cycle)
2. Move the VCO A PW slider from ~50% toward ~75% -- you should hear the tone become thinner and more nasal as the pulse narrows
3. Move PW toward ~95% -- the sound becomes very thin and buzzy, almost disappearing at the extreme
4. Return PW to ~50%. Now toggle the PULSE POSITION switch between its two positions while holding a note -- you should hear a subtle timbral shift as the pulse wave's phase relationship with other waveforms changes

> [!info] Cascadia's PULSE POSITION switch selects center-triggered vs. edge-triggered pulse wave generation. This changes the phase alignment between the pulse and other VCO A waveforms, which matters when mixing multiple waveforms or using hard sync.

## Exploration (optional, hyperfocus days)

- Raise both Mixer SAW and PULSE to ~50% simultaneously -- hear how combining waveshapes creates a richer tone than either alone
- Add sine (IN 2 at ~30%) to the saw+pulse combination -- the sine reinforces the fundamental frequency, adding weight
- Try each waveshape with the VCF FREQ at ~25% (mostly closed filter) -- notice how the saw still has brightness leaking through while the sine is almost completely silenced

## Output Checklist

- [ ] Can identify saw, pulse, and sine waveforms by ear
- [ ] Understand that waveshape determines which harmonics are present (saw = all, pulse = odd, sine = none)
- [ ] Heard the effect of OCTAVE selector and PITCH fine tuning
- [ ] Heard pulse width changes and the PULSE POSITION switch
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Waveshape is your starting material -- it determines the harmonic content available for filtering, folding, and modulation
- Sawtooth waves are the most versatile starting point because they contain all harmonics -- everything a filter could shape
- The Mixer lets you blend multiple VCO A waveforms (saw, pulse, sine via IN 2) without any cables, using normalled connections
- Fine tuning with the PITCH knob gives +/- 6 semitones of continuous adjustment around the OCTAVE setting

## Next Session Preview

Next time you will explore VCO B -- Cascadia's second oscillator -- and use it to frequency-modulate VCO A. You will create bell-like and metallic tones using the normalled FM connection, explore through-zero FM (a rare analog feature), and save your first FM patch.
