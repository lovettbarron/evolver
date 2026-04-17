---
title: 'Session 13: Self-Oscillation & Audio Mod'
session_number: 13
duration: 20
prerequisite: 11
output_type: patch
difficulty: intermediate
tags:
  - filters
  - self-oscillation
  - audio-mod
  - resonance
  - sine-wave
  - extreme
instrument: evolver
reference: 'Anu Kirk p.45-48, DSI Manual p.17-18'
section: Filters & Envelopes
instrument_type: instrument
---

# Session 13: Self-Oscillation & Audio Mod

**Objective:** Push the lowpass filter to extremes -- use self-oscillation to turn the filter into a sine wave oscillator, and use audio modulation for gritty, sizzly filter textures.

> [!tip] If you only have 5 minutes
> Load the basic patch, set all Osc Levels to 0, 4-Pole ON, Resonance to 100. Set Mod Slot 1: Source = Nno (MIDI Note), Amount = 99, Dest = FiL. Play notes. The filter is now a playable sine wave oscillator.

## Warm-Up (2 min)

Load your pluck patch from Session 12. Play a few notes to hear the filter envelope shape the brightness. Notice how resonance adds that "quack" at the cutoff frequency. Today you will push resonance to the extreme and beyond. Load the basic patch.

## Setup

From the basic patch:
- Set **Osc 3 Level** to `0` and **Osc 4 Level** to `0`
- Set **4-Pole** to ON (self-oscillation only works in 4-pole mode)

## Exercises

### Exercise 1: Self-Oscillation (5 min)

When resonance is high enough in 4-pole mode, the filter's feedback becomes so strong it generates its own sine tone:

1. Set **all Osc Levels** to `0` (Osc 1, 2, 3, 4 all at 0) -- no sound sources
2. Set **Resonance** to `100`
3. Set **LPF Frequency** to `80`

<div data-evolver-panel data-knobs="knob-osc-level:0,knob-filter-frequency:80,knob-filter-resonance:100" data-highlights="knob-filter-resonance:amber,knob-filter-frequency:amber,switch-4pole:amber,knob-osc-level:blue" data-sections="filter"></div>

4. Take your hands off the keyboard. You should hear the filter singing by itself -- a pure, sweet sine tone at the filter's cutoff frequency
5. Slowly sweep **Filter Frequency** from `0` to `164` -- you should hear the pitch rise and fall. You are playing the filter like an oscillator
6. Notice the slight chorusing or beating in the tone -- that is evidence that the two analog filters (left and right) are behaving slightly differently. "Because they're both analog filters, they always behave a little differently" (Anu Kirk p.48)

"When Evolver's lowpass filter is in 4-pole mode, high resonance values cause the filter to feedback so much it self-oscillates at the filter frequency" -- Anu Kirk p.45

See Anu Kirk p.45-46 ("Self-Oscillation"), DSI Manual FAQ p.4

### Exercise 2: Playing the Filter Chromatically (5 min)

Make the self-oscillating filter playable from the keyboard:

1. Keep all Osc Levels at `0`, Resonance at `100`, 4-Pole ON
2. Set **LPF Frequency** to `0` (base frequency at minimum)
3. Set **Mod Slot 1**: Source = `Nno` (MIDI Note Number), Amount = `99`, Destination = `FiL` (LPF Frequency)
4. Play notes up and down the keyboard -- you should hear the self-oscillating filter track your notes, producing pitched sine tones

Now add a VCA envelope:
5. Set ENV 2: **Attack** = `0`, **Decay** = `70`, **Sustain** = `0`, **Release** = `30`
6. Play notes -- you should hear decaying sine tones, ethereal and watery. "It has an ethereal, mysterious, almost watery quality" (Anu Kirk p.48)

Add noise for texture:
7. Set **Noise Volume** to `50` -- you should hear the noise being "pitched" by the extreme filter resonance. The self-oscillating filter shapes the noise into a tonal sound

"What you're hearing is the Evolver's noise generator being pitched by extreme filter resonance" -- Anu Kirk p.48

See Anu Kirk p.47-48 ("Exercise 3: Extreme Resonance")

### Exercise 3: Audio Mod (5 min)

Audio Mod feeds an analog oscillator's output directly into the filter cutoff, modulating it at audio rate:

1. Set **all Osc Levels** back to `50` (Osc 1 and 2), Osc 3+4 Level to `0`
2. Set **Resonance** to `40`, **LPF Frequency** to `80`, **4-Pole** ON
3. Set **Audio Mod** to `0` -- play a note. You should hear a normal filtered sound
4. Set **Audio Mod** to `20` -- you should hear a subtle sizzle or grit added to the filter character
5. Set **Audio Mod** to `50` -- you should hear more obvious harmonic distortion from the audio-rate modulation
6. Set **Audio Mod** to `80` -- you should hear aggressive, buzzy filter modulation

"Audio Mod allows the sound of the analog oscillators themselves to affect the frequency of the lowpass filter" -- Anu Kirk p.50

Note: Audio Mod is per-channel -- Osc 1 modulates LPF Left, Osc 2 modulates LPF Right (DSI Manual p.18). This preserves the stereo character.

### Exercise 4: Self-Oscillating Filter Patch (3 min)

Create a usable patch combining self-oscillation with oscillators:

1. Set **Osc 1 Level** to `40`, **Osc 2 Level** to `40` (Saw)
2. Set **Resonance** to `90` (just below full self-oscillation -- the filter adds a strong harmonic peak without completely overpowering the oscillators)
3. Set **LPF Frequency** to `60`
4. Set **Key Amount** to `72` (filter tracks keyboard)
5. Set **Distortion** to `80` -- "turn the distortion on and crank it up to around 80... now you're getting something that almost sounds like a square wave" (Anu Kirk p.48)

<div data-evolver-panel data-knobs="knob-osc-level:40,knob-filter-frequency:60,knob-filter-resonance:90,knob-filter-keyamount:72,knob-distortion-amount:80" data-highlights="knob-filter-resonance:amber,knob-filter-keyamount:amber,knob-distortion-amount:amber,knob-filter-frequency:blue" data-sections="filter,distortion"></div>

Play some notes. You should hear an aggressive, singing, almost vocal quality with the high resonance adding a sharp harmonic peak to each note.

**Save this patch** as your self-oscillating filter patch.

## Exploration (optional, hyperfocus days)

- Try self-oscillation with slow envelope sweeps: all Osc Levels at 0, Resonance 100, ENV 1 Attack = 78, Decay = 98, Amount = 99, LPF Frequency = 5. Play notes for ethereal, swooping sine tones (Anu Kirk p.48)
- Use **Filter Split** at `30` with self-oscillation -- you should hear two different pitched filter tones, one from each channel
- Try Audio Mod with different Osc 1 waveshapes: Saw produces the most harmonics (most grit), Triangle produces the least

## Output Checklist

- [ ] Self-oscillating filter patch saved
- [ ] Understand that self-oscillation only works in 4-pole mode at high resonance
- [ ] Heard audio mod's sizzly effect on the filter
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- In 4-pole mode, maximum resonance makes the filter self-oscillate at its cutoff frequency, producing a pure sine tone
- MIDI Note Number routed to filter frequency via a mod slot makes the self-oscillating filter playable from the keyboard
- Audio Mod feeds the analog oscillator into the filter at audio rate, adding grit and harmonic complexity proportional to the amount setting

## Next Session Preview

Next time you will explore the highpass filter, filter split for stereo separation, and combining LPF and HPF to create bandpass effects -- finishing your understanding of the Evolver's filter architecture.
