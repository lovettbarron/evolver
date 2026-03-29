---
title: "Session 11: Lowpass Filter Basics -- Cutoff, Resonance, Poles"
module: "Filters & Envelopes"
session_number: 11
duration: 20
prerequisite: 6
output_type: patch
difficulty: beginner
tags: [filters, lowpass, cutoff, resonance, 2-pole, 4-pole, subtractive]
instrument: evolver
reference: "Anu Kirk p.42-45, DSI Manual p.17-18"
---

# Session 11: Lowpass Filter Basics -- Cutoff, Resonance, Poles

**Objective:** Control the Evolver's analog lowpass filter with confidence -- understand cutoff frequency, resonance, and the dramatic difference between 2-pole and 4-pole modes.

> [!tip] If you only have 5 minutes
> Load the basic patch, set Osc 3+4 Level to 0, and slowly turn the Filter Frequency knob from 164 down to 0 while holding a note. That brightness disappearing is subtractive synthesis.

## Warm-Up (2 min)

Load your hybrid layered patch from Session 10. Play a note and listen to the analog-digital blend. Notice how the filter is wide open at 164 -- all harmonics are passing through. Now slowly close the filter by turning Filter Frequency to `60`. You should hear the brightness roll off, leaving a warmer, darker version of the same sound. Return to `164`. Load the basic patch.

## Setup

From the basic patch:
- Set **Osc 3 Level** to `0` and **Osc 4 Level** to `0` (analog saws give the filter lots of harmonics to work with)
- Verify **LPF Frequency** is `164` (wide open) and **Resonance** is `0`

## Exercises

### Exercise 1: Cutoff Frequency Sweep (5 min)

The cutoff frequency determines where the filter starts removing harmonics. Frequency range is 0-164, covering over 13 octaves (DSI Manual p.17).

1. Hold a low note (around C2) and slowly sweep **Filter Frequency** from `164` down to `0`
   - **164-100**: You should hear barely any change -- you are above most of the harmonics
   - **100-60**: You should hear noticeable darkening, losing brightness and presence
   - **60-30**: You should hear significant muffling -- the sound gets rounded, warm, paddy
   - **30-0**: You should hear only the fundamental remaining -- very dark and subby
2. Sweep it back up from `0` to `164` -- you should hear the brightness return. This is the most fundamental synthesizer gesture: the filter sweep
3. Find these "sweet spots" and play a few notes at each:
   - **~80**: Slightly warm, great for pads
   - **~50**: Dark but present, good for bass
   - **~30**: Underwater, ambient territory

"The frequency parameter simply determines the center of where the filter starts to work" -- Anu Kirk p.43

See Anu Kirk p.42-43 ("Lowpass Filter", "Frequency"), DSI Manual p.17

### Exercise 2: Resonance (5 min)

Resonance feeds the filter's output back into its input, creating a peak at the cutoff frequency.

1. Set **Filter Frequency** to `80` (partially closed)
2. Set **Resonance** to `0` -- you should hear a smooth, neutral rolloff
3. Set **Resonance** to `30` -- you should hear a subtle peak at the cutoff frequency adding character
4. Set **Resonance** to `50` -- you should hear a noticeable "nose", more nasal and defined
5. Set **Resonance** to `70` -- you should hear a strong peak that sounds like a wah pedal
6. Set **Resonance** to `85` -- you should hear the filter start to ring and whistle
7. Now sweep **Filter Frequency** with Resonance at `70` -- you should hear the classic "wahh" filter sweep

"Resonance emphasizes the filter's character by creating a feedback loop" -- Anu Kirk p.44

See Anu Kirk p.44 ("Exercise 2: Resonance")

### Exercise 3: 2-Pole vs 4-Pole (5 min)

Set **Filter Frequency** to `60`, **Resonance** to `50`.

1. **4-POLE switch OFF** (2-pole mode, -12dB/octave): Play a note -- you should hear a gentle rolloff where frequencies above the cutoff are reduced but still somewhat audible. The sound is more "open" and wider
2. **4-POLE switch ON** (4-pole mode, -24dB/octave): Play the same note -- you should hear a much more aggressive rolloff. Frequencies above cutoff are killed more sharply. The sound is more "focused"
3. Toggle back and forth several times to internalize the difference:
   - **2-pole**: gentler slope, more harmonics leak through, sounds wider (Anu Kirk p.43)
   - **4-pole**: steeper slope, tighter sound, resonance can self-oscillate

"The filter only oscillates when in 4-pole mode" -- DSI Manual FAQ p.4

### Exercise 4: Save a Filter Sweep Patch (3 min)

Create a usable filtered sound:

1. Set **4-Pole** to ON
2. Set **Filter Frequency** to `70`
3. Set **Resonance** to `40`
4. Assign **Mod Wheel Destination** to `FiL` (Filter Frequency)
5. Set **Mod Wheel Amount** to `99`

Play notes and move the mod wheel. You should hear real-time filter control -- mod wheel up opens the filter (brighter), mod wheel down closes it (darker).

**Save this patch** as your "Filter Sweep" patch.

See Anu Kirk p.43-44 ("Exercise 1: Filter Frequency")

## Exploration (optional, hyperfocus days)

- Try the filter sweep with Osc 1 Shape = P-50 vs Saw -- different starting harmonics mean different filter response character
- Set **Key Amount** to `72` -- the filter now tracks the keyboard so higher notes have a brighter cutoff. Play up and down the keyboard to hear the tracking (Anu Kirk p.45)
- Try **Audio Mod** at `30` -- the analog oscillator modulates the filter cutoff at audio rate, adding a sizzly, gritty texture (DSI Manual p.18)

## Output Checklist

- [ ] Filter sweep patch saved with mod wheel control
- [ ] Can sweep the filter confidently and identify sweet spots for different timbres
- [ ] Understand resonance as a peak at the cutoff frequency
- [ ] Hear the difference between 2-pole (gentle) and 4-pole (aggressive)
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- The lowpass filter removes harmonics above the cutoff frequency -- lower cutoff means darker, fewer harmonics
- Resonance creates a feedback peak at the cutoff frequency, adding character from subtle warmth to aggressive whistling
- 2-pole (-12dB/oct) is gentler and wider; 4-pole (-24dB/oct) is steeper and tighter, and only 4-pole mode can self-oscillate

## Next Session Preview

Next time you will use the filter envelope (ENV 1) to automatically sweep the filter over time with every note. This is how you make plucks, basses, and pads that move -- the core of subtractive synthesis.
