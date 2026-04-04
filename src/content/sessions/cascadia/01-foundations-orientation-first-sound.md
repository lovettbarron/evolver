---
title: "Session 01: Orientation & First Sound"
module: "Foundations"
session_number: 1
duration: 20
prerequisite: null
output_type: technique
difficulty: beginner
tags: [foundations, normalling, first-sound, orientation, signal-path]
instrument: cascadia
reference: "Cascadia Manual pp. 11-12"
---

# Session 01: Orientation & First Sound

**Objective:** Learn what a semi-modular synthesizer is, connect your Cascadia, and hear its normalled default sound so you have a reliable starting point for every future session.

> [!tip] If you only have 5 minutes
> Connect MIDI and audio. Power on. Play a note. Listen to the default sound -- that sawtooth tone is your home base. Every session starts here.

## What Is a Semi-Modular Synthesizer?

A modular synthesizer is a collection of independent modules -- oscillators, filters, amplifiers, envelopes -- connected by patch cables. You decide what goes where. A *semi-modular* synthesizer is the same thing, but with a twist: the manufacturer has pre-wired a default signal path between modules using internal connections called *normals*. You get a complete, playable instrument with zero cables. Every cable you add overrides one of these normalled connections, replacing the default routing with your own.

This means a semi-modular gives you two instruments in one. Without cables, it behaves like a fixed-architecture synth with a specific sound character. With cables, it becomes a fully patchable modular system where you decide the signal flow. The Cascadia's normalled path runs from oscillator through mixer, filter, wave folder, and amplifier to the output -- a complete subtractive/waveshaping voice that plays with zero patches but rewards every cable you add.

## Warm-Up (2 min)

This is your first session -- no warm-up needed. We will start by connecting the instrument.

## Setup

1. Connect a MIDI keyboard or controller to Cascadia's rear panel MIDI IN (5-pin DIN) or USB MIDI port
2. Connect Cascadia's rear panel MAIN OUT (1/4" jack) to your mixer, audio interface, or headphones via the rear panel PHONES OUT
3. Power on the Cascadia
4. Set MAIN LEVEL on the Output Control section to ~50%
5. Set MAIN DRIVE on Output Control to ~50% (noon)
6. Make sure all cables are removed from the front panel -- we want the pure normalled default

## Exercises

### Exercise 1: Hear the Normalled Default (5 min)

Play a note on your MIDI controller. You should hear a bright, buzzy sawtooth tone that responds to the keyboard -- higher notes are higher pitched, lower notes are lower.

> [!info] Normalled: MIDI PITCH -> VCO A PITCH and VCO B PITCH. MIDI note data sets the pitch of both oscillators via 1V/octave CV. Patching into VCO A PITCH IN or VCO B PITCH IN overrides this connection for that oscillator.

> [!info] Normalled: MIDI GATE -> Envelope A GATE and Envelope B GATE. When you press a key, the gate signal triggers both envelopes. Releasing the key starts the release stage. Patching into either GATE IN overrides the MIDI gate for that envelope.

> [!info] Normalled: Envelope A -> VCA A LEVEL MOD. Envelope A controls the volume of each note over time. Without this connection, the VCA would be silent (or always open). Patching into VCA A LEVEL MOD IN overrides this.

1. Play and hold a note in the middle of your keyboard -- you should hear a sustained sawtooth tone
2. Play short, staccato notes -- the notes should start and stop cleanly with each key press
3. Play notes across the full range of your keyboard -- pitch should track accurately from low to high

### Exercise 2: Trace the Signal Path (8 min)

Now that you hear the default sound, let's understand what is making it. The sound travels through these modules in order, all via normalled connections:

> [!info] Normalled: VCO A -> Mixer. VCO A's sawtooth waveform feeds the Mixer automatically. Patching into MIXER IN 1 or MIXER IN 2 overrides their respective normalled sources.

> [!info] Normalled: Mixer OUT -> VCF IN. The mixed signal enters the filter for spectral shaping. Patching into VCF IN overrides this connection.

> [!info] Normalled: VCF OUT -> Wave Folder IN. The filtered signal passes through the wave folder. Even at minimum fold, the signal passes through. Patching into Wave Folder IN overrides this.

> [!info] Normalled: Wave Folder -> VCA A. The wave folder output feeds VCA A's input, completing the audio chain before the output stage. Patching into VCA A's inputs overrides this.

> [!info] Normalled: VCA A -> Output Control MAIN 1. VCA A's output is normalled to the MAIN 1 input on Output Control, which drives the headphones and line outputs. Patching into MAIN 1 IN overrides this.

1. While holding a note, slowly raise the Mixer SAW slider from 0% to ~75% -- you should hear the sawtooth get louder as you increase its level in the mix
2. Now lower SAW back to ~50% and raise the Mixer PULSE slider to ~50% -- you should hear a thinner, hollower tone blend in alongside the saw
3. Lower PULSE back to 0%. Slowly move the VCF FREQ slider from ~75% down to ~25% -- you should hear the brightness of the sound reduce as the filter closes, making it duller and darker
4. Return VCF FREQ to ~75%. Raise the Wave Folder FOLD slider from 0% to ~50% -- you should hear new harmonics appear as the waveform is folded, creating a metallic, complex tone

> [!info] Cascadia's signal path places the Wave Folder *after* the VCF, which is unusual. Most synths filter last. This means you can fold an already-filtered signal, creating timbres that are impossible on a standard subtractive synth. You can also patch the wave folder before the filter if you prefer the conventional order.

5. Return FOLD to 0% and all other knobs to their starting positions

### Exercise 3: Identify the Modulation (5 min)

The default sound is not just an oscillator through a filter -- two envelope generators are shaping it automatically.

> [!info] Normalled: Envelope B -> VCF FM 1. Envelope B modulates the filter cutoff by default. This creates a filter sweep on every note -- the brightness changes over time. Patching into VCF FM 1 IN overrides this.

> [!info] Normalled: MIDI/CV -> VCF FM 2 (keyboard tracking). MIDI pitch is normalled to VCF FM 2, so the filter cutoff tracks the keyboard. Higher notes sound brighter because the filter opens proportionally. Patching into VCF FM 2 IN overrides this.

1. Play a note and listen for any brightness change over time -- you may hear a subtle envelope sweep as the note sounds and decays
2. Raise the VCF FM 1 slider to ~75% -- now play a note. You should hear a more pronounced filter sweep: the sound starts bright and gets darker as Envelope B's decay stage completes
3. Return VCF FM 1 to ~25%. Play a low note, then a high note -- the high note should sound brighter due to keyboard tracking via FM 2
4. Return all sliders to their starting positions

## Exploration (optional, hyperfocus days)

- Raise the Mixer SUB slider to ~50% and toggle the SUB TYPE switch between the three positions -- listen to how the sub-oscillator fattens the sound at different octaves
- Try the Mixer NOISE slider at ~25% with different NOISE TYPE switch positions -- hear how noise adds breath and texture
- Raise VCA A's LEVEL slider to ~50% to add a constant base volume, then play notes -- the envelope adds volume on top of this base

## Output Checklist

- [ ] Can hear the normalled default sound when playing MIDI notes
- [ ] Understand that the signal path is: VCO A -> Mixer -> VCF -> Wave Folder -> VCA A -> Output
- [ ] Can name at least 3 normalled connections in the default signal path
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- The Cascadia plays with zero cables -- its normalled connections form a complete synthesizer voice
- Every cable you patch overrides one normalled connection, replacing the default routing with your choice
- The default sound is a sawtooth oscillator through a filter, wave folder, and amplitude envelope -- your starting point for every session

## Next Session Preview

Next time you will explore pulse width modulation and the sub-oscillator -- two ways to thicken and animate the Cascadia's sound using the controls already normalled and ready to go.
