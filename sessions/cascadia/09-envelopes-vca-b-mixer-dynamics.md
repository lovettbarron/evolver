---
title: "Session 09: VCA B, Low Pass Gate & Mixer Dynamics"
module: "Envelopes & Amplitude"
session_number: 9
duration: 25
prerequisite: 8
output_type: patch
difficulty: intermediate
tags: [lpg, low-pass-gate, vca, west-coast, percussion, bongo, mixer, noise, curriculum]
instrument: cascadia
reference: "Cascadia Manual pp. 32-34, 20-21"
---

# Session 09: VCA B, Low Pass Gate & Mixer Dynamics

**Objective:** Understand what a Low Pass Gate is and why it produces naturally musical dynamics, patch cables to route an oscillator through VCA B/LPF for LPG percussion sounds, explore the Mixer's noise types and soft clipping, and create an LPG bongo patch.

> [!tip] If you only have 5 minutes
> Patch VCO A SAW OUT -> VCA B IN. Patch Envelope A ENV OUT -> VCA/LPF B CV IN. Set VCA CONTROL switch to UP (LPG mode). Set Envelope A to a fast, percussive shape (Attack ~0%, Decay ~20%, Sustain ~0%). Play short notes -- hear that natural, woody bongo tone? That is a Low Pass Gate.

## What Is a Low Pass Gate?

A **Low Pass Gate (LPG)** combines a voltage-controlled amplifier with a low-pass filter controlled by the same voltage source. When a control signal (like an envelope) rises, the LPG simultaneously gets louder AND brighter. When the signal falls, it gets quieter AND darker at the same time. This is exactly how acoustic instruments behave -- a struck drum is loudest and brightest at the moment of impact, then both volume and brightness decay together.

This technique comes from **West Coast synthesis**, pioneered by Don Buchla in the 1960s. The original Buchla Low Pass Gates used vactrols (light-dependent resistors) that naturally produced this coupled amplitude-frequency behavior. The Buchla bongo -- a percussive "bonk" sound created by a short envelope through an LPG -- became one of the most recognizable sounds in electronic music, prized for its organic, woody quality that no simple VCA or filter alone can reproduce.

In traditional (East Coast) synthesis, the VCA and filter are separate modules with separate envelopes. You CAN create similar results by routing the same envelope to both, but an LPG couples them more naturally because the filter cutoff and amplitude respond as a single, unified behavior.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Switch Envelope B MODE SELECT from ENV to LFO, then back to ENV -- recall how one switch changed the filter behavior from Session 8.

## Setup

From the normalled default:
- Mixer SAW at ~50%, all other Mixer sliders at 0%
- VCO A OCTAVE at 3 (lower for a percussion-friendly range)
- VCF FREQ at ~60% (moderately open)
- VCF FM 1 at 0% (no filter envelope on the main path)
- Wave Folder FOLD at 0%
- Envelope A: Attack ~0%, Decay ~25%, Sustain ~0%, Release ~10%, ENVELOPE SPEED at Fast, HOLD POSITION at Off
- VCA A: LEVEL at ~50%, LEVEL MOD at ~50% (main voice stays partially open so you can hear both paths)

## Exercises

### Exercise 1: Patch the Low Pass Gate (8 min)

This exercise requires two cables. You will route VCO A's sawtooth wave through VCA B/LPF and control it with Envelope A.

**Cables for this session:**

| Cable | From | To | Overrides |
|-------|------|----|-----------|
| 1 | VCO A SAW OUT (Mixer section) | VCA B IN | Ring Mod OUT -> VCA B IN normalling |
| 2 | Envelope A ENV OUT (Envelope A section) | VCA/LPF B CV IN | +5V DC -> VCA/LPF B CV IN normalling |

> [!info] Normalled: Ring Mod OUT -> VCA B IN. By default, VCA B receives the ring modulator output. Patching Cable 1 into VCA B IN overrides this, routing VCO A's raw sawtooth to the VCA/LPF instead.

1. Patch Cable 1: **VCO A SAW OUT** -> **VCA B IN**. You may not hear a change yet because VCA B needs a control signal to open

> [!info] Normalled: +5V DC -> VCA/LPF B CV IN. By default, VCA B/LPF receives a constant +5V, which means the CV AMOUNT knob acts as a manual volume/filter control. Patching Cable 2 overrides this with Envelope A's dynamic output.

2. Patch Cable 2: **Envelope A ENV OUT** -> **VCA/LPF B CV IN**. Now Envelope A controls VCA B's amplitude and filter
3. Set VCA CONTROL switch to the UP position (VCA+LPF -- this is LPG mode). Set CV AMOUNT to ~75%
4. You need to hear the LPF B output. Patch a third cable from **LPF B OUT** -> **MAIN 2 IN** on the Output Control section, or simply listen from the LPF B OUT jack with headphones if available. Alternatively, leave VCA A slightly open (as in Setup) so you hear the main voice, and listen for the additional LPG sound blending in through any monitoring path

> [!info] Cascadia's VCA B/LPF has two outputs: VCA B OUT (pre-filter) and LPF B OUT (post-filter). For the full LPG effect, use LPF B OUT where both the VCA and filter have shaped the signal. MAIN 2 IN on Output Control sums this with your main voice.

5. Play short, staccato notes around C2-C3. You should hear a woody, percussive "bonk" -- the sawtooth enters VCA B, gets amplified and filtered simultaneously by the envelope. The sound is bright at the moment of attack and darkens as it decays. This is the Low Pass Gate in action
6. Compare: flip VCA CONTROL to the DOWN position (LPF only). Play the same notes -- now only the filter responds to the envelope while the VCA stays fully open. The sound is less percussive and more like a filter sweep. Flip back to UP (LPG) to hear the difference -- the coupled behavior sounds more natural and organic

### Exercise 2: Shape the Bongo (6 min)

Now refine the LPG sound into the classic Buchla bongo.

1. With VCA CONTROL at UP (LPG mode), set Envelope A: Attack ~0% (instant), Decay ~20% (fast decay), Sustain ~0%, Release ~10% (quick fade). ENVELOPE SPEED at Fast
2. Play single staccato notes at C2 -- you should hear a tight, woody "bonk" with a very short, natural decay. Both brightness and volume die together
3. Raise Decay to ~35% -- the bongo becomes more resonant, ringing slightly longer. The filter stays open longer too, so the tail is brighter
4. Lower CV AMOUNT to ~50% -- the overall level and filter opening decrease. The bongo becomes quieter and darker. Raise CV AMOUNT back to ~75% for a full-bodied sound
5. Try different VCO A OCTAVE settings: at 2, the bongo is deep and thumpy like a floor tom. At 4, it becomes a higher, woodblock-like click. At 3, it sits in the sweet spot for classic bongo territory
6. Set a final bongo sound you like and note the settings -- this becomes your LPG Bongo patch

> [!info] Cascadia's VCA B/LPF uses a 4-pole ladder diode topology, giving it a different filter character than the main VCF. The ladder filter's natural resonance adds a slight emphasis at the cutoff frequency as it closes, contributing to the LPG's distinctive woody quality. This is different from original Buchla vactrols but produces a similar musical result.

### Exercise 3: Mixer Dynamics — Noise and Soft Clip (5 min)

Remove all cables from Exercises 1-2 (restore normalled defaults). This exercise explores the Mixer's dynamics features.

1. Set Mixer SAW at ~60%, NOISE at ~40%. Set NOISE TYPE to WHITE -- play a note. You should hear the sawtooth blended with bright, hissy white noise. The noise adds a breathy, airy quality
2. Switch NOISE TYPE to PINK -- the noise becomes warmer and less harsh, with more low-frequency content. Pink noise sounds more like wind or ocean
3. Switch NOISE TYPE to ALT -- you should hear a different character entirely. This is Cascadia's digital noise mode. Press and hold the PUSH GATE button while the ALT noise is active to cycle through variations (Cymbal, Crunch, Crackle, Velvet)

> [!info] Cascadia's Mixer offers digital noise ALT modes with 4 types and 3 variations each (12 total), accessed by combining the NOISE TYPE switch with the PUSH GATE button. These digital noise algorithms produce metallic, crunchy, and textured noise characters that analog noise cannot replicate -- from cymbal-like sizzle to vinyl crackle.

4. Return NOISE TYPE to WHITE with NOISE at ~40%. Now raise SAW to ~100% and listen -- the Mixer may begin to clip as the combined signal exceeds its headroom. You should see the SOFT CLIP LED light up red
5. Engage the SOFT CLIP switch -- the clipping character changes from harsh digital clipping to a warmer, rounded overdrive. The peaks are gently compressed rather than hard-cut. This is useful for adding warmth and grit to a mix without harshness

> [!info] Normalled: Ring Mod OUT -> Mixer IN 1. The IN 1 slider blends ring-modulated signal (VCO A sine x VCO B sine) into the mixer. Raise IN 1 to ~30% to hear metallic, inharmonic ring mod tones blended with your sawtooth and noise.

## Exploration (optional, hyperfocus days)

- Re-patch the LPG (Cables 1 and 2 from Exercise 1) and try feeding different waveforms: VCO A PULSE OUT or VCO A TRI OUT into VCA B IN instead of SAW OUT. Each waveform produces a different LPG character -- triangle is rounder, pulse is punchier
- In LPG mode, try using Envelope B instead of Envelope A as the CV source: patch Envelope B ENV OUT -> VCA/LPF B CV IN. With Envelope B in AD mode and short RISE/FALL, you get a differently shaped bongo with independent control from the amplitude envelope
- Mix multiple noise types: try ALT noise at low level (~15%) with SAW at ~50% for subtle textural layering

## Output Checklist

- [ ] Successfully patched VCO A SAW OUT -> VCA B IN (overriding Ring Mod normalling)
- [ ] Successfully patched Envelope A ENV OUT -> VCA/LPF B CV IN (overriding +5V normalling)
- [ ] Heard the difference between LPG mode (VCA+LPF) and LPF-only mode
- [ ] Created a bongo/percussion sound with short envelope through LPG
- [ ] Heard white, pink, and ALT digital noise types in the Mixer
- [ ] Heard soft clip rounding off mixer distortion
- [ ] Saved LPG bongo patch (see patches/cascadia/lpg-bongo.md)
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- A Low Pass Gate combines VCA and filter in one, creating natural dynamics where louder = brighter and quieter = darker -- like acoustic instruments
- Cascadia's VCA B/LPF implements LPG behavior via the VCA CONTROL switch (UP = coupled VCA+LPF, DOWN = filter only)
- Short envelopes through an LPG produce the classic "Buchla bongo" -- woody, percussive sounds with organic decay
- The Mixer's noise section offers analog (white, pink) and digital (ALT) noise types, with 12 digital noise variations for textural variety
- Soft clipping rounds off mixer distortion for warmer overdrive character

## Next Session Preview

You have now explored all the core modules in Cascadia's normalled signal path. Phase 11 continues with modules on Modulation & Routing, Sequencing & Performance, and advanced synthesis techniques that combine everything you have learned.
