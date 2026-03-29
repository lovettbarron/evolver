---
title: "Session 32: External Processing -- Evolver as Effects Box"
module: "Performance & Expression"
session_number: 32
duration: 20
prerequisite: 31
output_type: patch
difficulty: advanced
tags: [performance, external-input, effects-processor, envelope-follower, signal-processing]
instrument: evolver
reference: "Anu Kirk p.99-101 (external processing), DSI Manual p.7-8 (signal flow), p.16 (external in), p.22 (env follower)"
---

# Session 32: External Processing -- Evolver as Effects Box

**Objective:** Set up the Evolver to process external audio through its analog filters, delay, distortion, and modulation -- turning it into a powerful effects processor for other instruments, drum machines, or audio playback.

> [!tip] If you only have 5 minutes
> Connect audio to the Evolver's input. Set External In Volume = `80`, Mode = `St`. LPF Frequency = `90`, Resonance = `40`, 4-Pole ON. Delay 1 Time = `2 Steps`, Level = `40`, Feedback 1 = `45`. Play audio through it and sweep the filter with the knob. Instant analog filter + delay processing.

## Warm-Up (2 min)

Load your performance patch from Session 31. Play a few notes using the mod wheel and aftertouch. You have been using the Evolver as a sound source. Now you use it as a sound processor -- external audio replaces the oscillators while the Evolver's filters, effects, and modulation do the work. Load the basic patch.

## Setup

**Physical connections required:**
- Connect an audio source (drum machine, phone, laptop, another synth) to the Evolver's Audio Input jacks (1/4" L and R on the back panel)
- If your source is mono, use the Left input only

From the basic patch:
- **Osc 1 Level** = `0`, **Osc 2 Level** = `0`, **Osc 3 Level** = `0`, **Osc 4 Level** = `0`
- **Noise Volume** = `0`
- All internal sound sources off -- only external audio will be heard
- **External In Volume** = `80`
- **External In Mode** = `St` (stereo, or `MonoL` if using a single cable)
- ENV 2: **Attack** = `0`, **Decay** = `0`, **Sustain** = `100`, **Release** = `0`
- Set the VCA to always pass audio (the external signal should be heard without pressing keys)

**Important:** You may need to set **Trigger Select** to `Seq Only` and start the sequencer with a single held note, OR set **VCA Level** = `100` (bypasses the envelope). Check DSI Manual p.19 for the VCA Level parameter -- at `100`, the VCA stays open regardless of envelope state.

## Exercises

### Exercise 1: Analog Filter Processing (5 min)

The Evolver's true analog lowpass filter is the star of external processing.

1. Play audio through the Evolver. You should hear it pass through cleanly with the filter wide open
2. Slowly turn down **LPF Frequency** from `164` toward `40`. You should hear the audio darken progressively -- high frequencies being removed by the analog filter
3. Set **LPF Frequency** = `70`, **Resonance** = `55`, **4-Pole** ON
   - The audio now has a resonant character -- frequencies near the cutoff are boosted
4. Sweep the filter cutoff knob while audio plays. This is classic analog filter processing -- the same technique used in dub reggae, techno, and DJ sets
5. Add **LFO 1**: Shape = `Tri`, Frequency = `8`, Amount = `25`, Destination = `FiL`
   - The filter now sweeps automatically. Adjust LFO Frequency for different sweep speeds
6. Try the **HPF** (Highpass Filter): set **HPF Frequency** = `30`. This removes low end from the external signal -- useful for thinning out drum loops or creating telephone-like effects. Push it to `60-70` for a dramatic thin sound

### Exercise 2: Delay and Feedback Processing (5 min)

Add the Evolver's delay and feedback to the filtered external audio.

1. Keep the filter settings from Exercise 1
2. Add delay: **Delay 1 Time** = `2 Steps`, **Level** = `45`, **Feedback 1** = `50`
   - Set **BPM** to match your audio source tempo for rhythmic echoes
3. Add **Feedback 2** = `30` -- this routes the delay output back through the analog filter
   - The echoes pass through the filter each time, getting progressively darker and more resonant
   - Increase Feedback 1 to `70` for longer echo tails that gradually filter away
4. Add **Tuned Feedback**: **Level** = `25`, **Frequency** = `24` (C2)
   - This adds a pitched resonance to the signal -- the external audio gains a tonal character at the feedback frequency
   - Try different Feedback Frequency values to find pitches that complement your source material
5. For dub-style effects: sweep the filter cutoff while the delay feeds back. The combination of analog filter sweep + delay feedback is the classic dub sound

### Exercise 3: Distortion and Destruction (4 min)

Add the Evolver's distortion chain to mangle external audio.

1. Set **Distortion** = `30`
   - The external audio gains grit and saturation. On drums, this adds punch. On melodic content, it adds harmonics
2. Increase to **Distortion** = `60` -- notice the noise gate activates between sounds. The Evolver's distortion includes a built-in gate (DSI Manual p.19)
3. Add **Output Hack** = `5`
   - This bit-crushes the signal. Low values (3-5) add a subtle lo-fi character. Higher values (8-14) are destructive
4. Try **Grunge** = ON with **Feedback Level** = `40`
   - "Grunge enables nasty feedback at higher levels" (DSI Manual p.19). Combined with external audio, this can create extreme, self-oscillating chaos
   - **Reduce quickly if it gets too loud** -- grunge + high feedback can be very intense
5. For a lo-fi radio effect: HPF Frequency = `45`, LPF Frequency = `85`, Distortion = `25`, Output Hack = `3`

### Exercise 4: Envelope Follower and Dynamic Processing (4 min)

Use the Evolver's envelope follower to make the processing respond to the input signal's dynamics.

1. Set up the envelope follower (DSI Manual p.22):
   - **Env Follow Amount** = `50`, **Env Follow Destination** = `FiL`
   - The filter now opens in response to loud moments in the external audio and closes during quiet moments
   - On drums: the filter opens on each hit, creating an auto-wah effect
   - On music: loud passages are bright, quiet passages are dark
2. Try **Env Follow Destination** = `RES`, Amount = `40`
   - Resonance increases with volume -- loud moments become more resonant and "quacky"
3. Set up **Peak Hold** for triggered effects:
   - **Input Peak Amount** = `60`, **Input Peak Destination** = `DL1` (Delay Level)
   - Loud transients (drum hits, note attacks) trigger the delay -- echoes only appear on strong beats
4. Combine both: Env Follower to filter, Peak Hold to delay. The processing now dynamically responds to what is being played through it

**Save as "External Processor"**.

## Exploration (optional, hyperfocus days)

- Use the sequencer to modulate filter cutoff while processing external audio -- creates rhythmic filter patterns on top of the input signal
- Process a drum loop and add the Evolver's sequencer as an additional rhythmic layer (turn oscillators back on at low levels)
- Try Input Mode = `L Control + R Audio` (DSI Manual p.16) -- the left input controls parameters while the right input is the audio source

## Output Checklist

- [ ] External audio successfully routed through the Evolver's filters
- [ ] Analog filter sweep and delay processing demonstrated
- [ ] Envelope follower responding dynamically to input level
- [ ] External Processor patch saved
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- The Evolver's true analog filters give external processing a warmth that digital plugins cannot replicate -- sweeping the cutoff knob on a drum loop is one of the most satisfying things the Evolver does
- Feedback 2 (delay to filter input) is the secret weapon for external processing -- echoes get progressively filtered, creating natural-sounding decay that evolves over time
- The envelope follower makes processing dynamic and responsive -- the Evolver reacts to what it hears, not just static settings

## Next Session Preview

Session 33 moves to the Integration module -- setting up a DAW recording workflow for capturing both MIDI and audio from the Evolver, creating a template you will use for the final composition sessions.
