---
title: "Session 14: Highpass Filter & Stereo Split"
module: "Filters & Envelopes"
session_number: 14
duration: 20
prerequisite: 11
output_type: patch
difficulty: intermediate
tags: [filters, highpass, stereo-split, bandpass, hpf, lpf]
instrument: evolver
reference: "Anu Kirk p.50-53, DSI Manual p.18-19, p.26"
---

# Session 14: Highpass Filter & Stereo Split

**Objective:** Use the highpass filter and filter split parameter to shape stereo width and create bandpass effects, completing your understanding of the Evolver's filter architecture.

> [!tip] If you only have 5 minutes
> Load the basic patch, set Osc 3+4 Level to 0, and increase the Highpass parameter from 0 to 50. You will hear the low end disappear, leaving only the bright upper harmonics.

## Warm-Up (2 min)

Load your self-oscillating filter patch from Session 13. Play a note and hear the singing resonance. Today you work with the other filter -- the digital highpass -- and the stereo split parameter. Load the basic patch.

## Setup

From the basic patch:
- Set **Osc 3 Level** to `0` and **Osc 4 Level** to `0`
- Verify **Highpass** is at `0` (bypassed) and **LPF Frequency** at `164`

## Exercises

### Exercise 1: Highpass Filter Basics (5 min)

The highpass filter removes low frequencies and lets high frequencies pass through. It is digital, 4-pole, and has no resonance control.

1. Play a sustained low note (C1 or C2) and slowly increase **Highpass** from `0` to `50` -- you should hear the low end and body disappear, leaving only the bright, thin upper harmonics
2. Continue to **Highpass** = `80` -- you should hear a very thin, almost empty sound with only the highest frequencies remaining
3. Set **Highpass** back to `0` -- the full sound returns immediately
4. The HPF at `0` is completely bypassed -- "when set to 0, it is removed completely from the circuit" (Anu Kirk p.51). This means modulating the HPF will have no effect unless you set it to `1` or higher first

Important: The Highpass parameter has two ranges (DSI Manual p.19):
- **o1-o99**: HPF on the oscillators (post-VCA position)
- **i1-i99**: HPF on the external input only (pre-filter position)

For this session, keep it on oscillators (o-values).

See Anu Kirk p.50-51 ("Highpass Filter"), DSI Manual p.19

### Exercise 2: HPF as a Sound-Shaping Tool (5 min)

The highpass filter is useful for removing mud and adding brightness:

1. Set **LPF Frequency** to `80`, **Resonance** to `30`, **4-Pole** ON
2. Play a note -- you should hear a warm, filtered sound
3. Set **Highpass** to `15` -- you should hear a subtle thinning of the low end, making the sound cleaner without obviously sounding "filtered"
4. Set **Highpass** to `30` -- you should hear more obvious low-end removal. The sound becomes lighter and more present in the midrange
5. Now modulate the HPF with ENV 3: set **ENV 3 Destination** to `HiP` (Highpass Frequency), **Amount** to `99`, **Attack** = `78`, **Decay** = `98`, **Sustain** = `0`. Set **Highpass** to `5` (must be non-zero for modulation to work)
6. Play a note -- you should hear the highpass filter sweep up, progressively removing low frequencies. The sound starts full and becomes thinner (Anu Kirk p.52)

See Anu Kirk p.51-52 (HPF practical applications)

### Exercise 3: Filter Split for Stereo Width (5 min)

The Split parameter separates the left and right LPF cutoff frequencies -- raising the left and lowering the right.

1. Set **LPF Frequency** to `80`, **Resonance** to `40`, **4-Pole** ON. Set Highpass back to `0`
2. Set **Split** to `0` -- play a note. Both channels should sound identical
3. Set **Split** to `20` -- you should hear a subtle stereo widening. The left channel is slightly brighter (higher cutoff), the right slightly darker (lower cutoff)
4. Set **Split** to `50` -- you should hear obvious stereo difference. One ear gets more brightness than the other
5. Set **Split** to `80` -- you should hear extreme stereo separation where the left filter is nearly wide open while the right is much more closed

"Even small amounts of filter split can have big effects on your sound" -- Anu Kirk p.49

Now try modulating split with an LFO:
6. Set **LFO 1 Destination** to `SpL` (Split), **Frequency** to `25`, **Amount** to `40`, **Shape** to `Tri`
7. Play a sustained note -- you should hear the stereo balance sweep back and forth as the split oscillates

See Anu Kirk p.48-49 ("Exercise 4: Let's Split!")

### Exercise 4: Bandpass Filter (3 min)

Combine the LPF and HPF to create a bandpass effect that only lets a band of frequencies through:

1. Set **LPF Frequency** to `76`, **Resonance** to `0`, **4-Pole** ON
2. Set **Highpass** to `30`
3. Play a note -- you should hear only a narrow band of midrange frequencies. The LPF removes the highs, the HPF removes the lows
4. Set **Mod Wheel Dest** to `FiL` (LPF Frequency), **Amount** to `99`
5. Set **Mod Slot 1**: Source = `MWl` (Mod Wheel), Amount = `99`, Destination = `HiP` (Highpass)
6. Move the mod wheel -- you should hear both filters sweep together, moving the bandpass center frequency up and down (Anu Kirk p.52-53)

**Save this patch** as your "Stereo Split Filter" patch.

See Anu Kirk p.52-53 ("Creating a Bandpass Filter")

## Exploration (optional, hyperfocus days)

- Try independent filter modulation: LFO 1 to Left Filter Cutoff (F1F) and LFO 2 to Right Filter Cutoff (F2F) at different rates and shapes -- "you can hear the two LFOs addressing each filter independently" (Anu Kirk p.49)
- Check the **HP Pre/Post** setting in Misc Params (DSI Manual p.26): Pre = HPF before LPF (only affects external input), Post = HPF after VCA (filters everything). Try both positions
- Use Split with self-oscillation (Resonance = 100) -- you should hear two different pitched sine tones from the two filters

## Output Checklist

- [ ] Split stereo filter patch saved
- [ ] Understand how the highpass filter removes low frequencies
- [ ] Can use Split to create stereo width from the filter section
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- The highpass filter removes low frequencies and must be set above 0 for modulation to work -- at 0 it is completely bypassed
- The Split parameter separates left and right LPF cutoffs, creating stereo width from the filter section alone
- Combining LPF and HPF creates a bandpass filter that isolates a frequency band -- sweeping both together moves the band up and down

## Next Session Preview

Next time you enter the modulation world -- LFOs (Low Frequency Oscillators) that add movement and animation to any parameter. You will create vibrato, tremolo, and filter animation using the four LFOs.
