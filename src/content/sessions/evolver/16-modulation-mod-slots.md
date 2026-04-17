---
title: 'Session 16: Mod Slots -- Flexible Routing'
session_number: 16
duration: 20
prerequisite: 15
output_type: patch
difficulty: intermediate
tags:
  - modulation
  - mod-slots
  - routing
  - audio-rate
  - creative-routing
instrument: evolver
reference: 'Anu Kirk p.72-74, DSI Manual p.23'
section: Modulation
instrument_type: instrument
---

# Session 16: Mod Slots -- Flexible Routing

**Objective:** Use the Evolver's 4 general-purpose modulation slots to create creative modulation routings, including audio-rate modulation from oscillators and noise.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set Mod Slot 1: Source = Noi (Noise), Amount = 30, Destination = FiL (Filter). Set LPF Frequency to 60, Resonance to 40. Play a note. That gritty, crackling quality is audio-rate noise modulating the filter.

## Warm-Up (2 min)

Load your vibrato + filter LFO patch from Session 15. Play a note and hear the LFO-driven movement. LFOs have dedicated destinations, but they are limited to one destination each. Mod slots give you 4 more flexible routings with a wider range of sources. Load the basic patch.

## Setup

From the basic patch:
- Set **Osc 3 Level** to `0` and **Osc 4 Level** to `0`
- Set **LPF Frequency** to `80`, **Resonance** to `30`, **4-Pole** ON

## Exercises

### Exercise 1: Basic Mod Slot Routing (5 min)

Each mod slot has three parameters: Source, Amount, and Destination. Any source can go to any destination.

1. Press **Mod 1** switch to select Mod Slot 1
2. Set **Source** to `LF1` (LFO 1) -- this is the same as using LFO 1's own destination, but now LFO 1 can also go somewhere else simultaneously
3. Set **Amount** to `40`
4. Set **Destination** to `FiL` (Filter Frequency)
5. Set LFO 1: Shape = `Tri`, Frequency = `35`, Amount = `50`, Destination = `O1F` (Osc 1 Freq -- vibrato)

<div data-evolver-panel data-knobs="knob-mod-source:10,knob-mod-amount:40,knob-mod-dest:20,knob-lfo-frequency:35,knob-lfo-amount:50" data-highlights="knob-mod-source:amber,knob-mod-amount:amber,knob-mod-dest:amber,switch-mod1:blue" data-sections="modulators,lfos"></div>

Play a note. You should hear both vibrato (from LFO 1's own destination) AND filter movement (from Mod Slot 1 using LFO 1 as a source). One LFO, two destinations.

See Anu Kirk p.72 ("Modulation Slots 1-4")

### Exercise 2: Audio-Rate Modulation (5 min)

Mod slots can use oscillators and noise as sources -- these are audio-rate signals that produce gritty, buzzy, or crackling effects:

1. Set **Mod Slot 1**: Source = `Noi` (Noise), Amount = `25`, Destination = `FiL` (Filter Frequency)
2. Play a note -- you should hear a crackling, textured quality added to the filter. The noise is modulating the filter cutoff thousands of times per second
3. Increase **Amount** to `50` -- you should hear more aggressive, gritty modulation
4. Change Source to `O3` (Digital Oscillator 3) -- you should hear a different character: a pitched, buzzy modulation at Osc 3's frequency
5. Try Source = `O1` (Analog Oscillator 1) -- you should hear yet another character, with the analog oscillator's waveform imprinting on the filter

"General-purpose mod slot Sources are not filtered, so a MIDI controller going through this route will react quicker, but may produce stepping noise" -- DSI Manual p.23

Note: Mod slot sources are unfiltered (raw, fast response) unlike the dedicated MIDI controller routings which are smoothed (Anu Kirk p.72).

### Exercise 3: Envelope as Mod Source (5 min)

Use ENV 3 as a mod source for more complex behavior:

1. Set **Mod Slot 1**: Source = `En3` (Envelope 3), Amount = `60`, Destination = `RES` (Resonance)
2. Set **ENV 3**: Attack = `0`, Decay = `50`, Sustain = `0`, Release = `0`, Amount = `99`, Destination = `OFF`
3. Set **LPF Frequency** to `70`, **Resonance** to `20`
4. Play a note -- you should hear the resonance spike on the attack and then decay, adding a "quack" or "pop" to each note without permanently changing the base resonance
5. Now set **Mod Slot 2**: Source = `Seq1` (Sequencer Track 1), Amount = `40`, Destination = `FiL`
6. Program Seq 1 with varied step values (e.g., steps 1-8: `10, 80, 30, 60, 50, 20, 90, 40`)
7. Press START/STOP and play -- you should hear the filter cutoff change on each sequencer step, creating a rhythmic timbral pattern while the envelope adds resonance pops

### Exercise 4: Two Creative Mod Routing Patches (3 min)

**Patch A -- Noise-Animated Filter:**
1. Set **Mod Slot 1**: Source = `Noi`, Amount = `20`, Destination = `FiL`
2. Set **LPF Frequency** to `50`, **Resonance** to `60`, **4-Pole** ON
3. Set ENV 1: Attack = `0`, Decay = `40`, Sustain = `15`, Env Amount = `80`

<div data-evolver-panel data-knobs="knob-mod-amount:20,knob-filter-frequency:50,knob-filter-resonance:60,knob-filter-envamount:80,knob-filter-attack:0,knob-filter-decay:40,knob-filter-sustain:15" data-highlights="knob-mod-amount:amber,knob-filter-frequency:amber,knob-filter-resonance:blue" data-sections="modulators,filter"></div>

4. Play -- you should hear punchy, gritty notes with crackling filter texture

**Save** as your "Noise Filter" patch.

**Patch B -- Oscillator Cross-Modulation:**
5. Set **Mod Slot 1**: Source = `O3`, Amount = `15`, Destination = `O1F` (Osc 1 Frequency)
6. Set **Osc 3 Level** to `0` (use it only as a modulation source, not audible)
7. Set **Osc 3 Shape** to `1` (sine), **Frequency** = `C2`
8. Play -- you should hear Osc 1's pitch being modulated by a sine wave at Osc 3's frequency, creating FM-like effects through the mod slot

**Save** as your "Cross-Mod" patch.

## Exploration (optional, hyperfocus days)

- Try bipolar mod amounts: Amount = `-40` inverts the modulation. Set Mod Slot 1: Source = LF1, Amount = -60, Dest = FiL. The LFO now pushes the filter in the opposite direction
- Use MIDI Note Number (Nno) as a source to make any parameter track the keyboard -- great for making filter, delay, or LFO rate respond to pitch
- Set up 4 mod slots all from different sources to the same destination (e.g., all to FiL). The modulations add together, creating complex compound movement

## Output Checklist

- [ ] Two creative mod routing patches saved
- [ ] Understand how to set up Source -> Amount -> Destination routing
- [ ] Heard audio-rate modulation from noise and oscillators
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Mod slots let any source (LFOs, envelopes, sequencer, noise, oscillators, MIDI note, controllers) modulate any destination -- 4 flexible routing points
- Audio-rate sources (noise, oscillators) produce gritty, textured effects that cannot be achieved with LFOs alone
- Mod slot sources are unfiltered (fast but may step); dedicated MIDI controller routings are smoothed

## Next Session Preview

Next time you will map velocity, aftertouch, and mod wheel to create expressive performance patches that respond to how you play -- harder, softer, with pressure and wheel gestures.
