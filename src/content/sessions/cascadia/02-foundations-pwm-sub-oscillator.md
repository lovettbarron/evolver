---
title: "Session 02: Pulse Width Modulation & Sub-Oscillator"
module: "Foundations"
session_number: 2
duration: 25
prerequisite: 1
output_type: technique
difficulty: beginner
tags: [foundations, pwm, sub-oscillator, pulse-wave, thickness]
instrument: cascadia
reference: "Cascadia Manual pp. 12-13"
---

# Session 02: Pulse Width Modulation & Sub-Oscillator

**Objective:** Understand pulse width modulation and sub-oscillators as two techniques for creating thicker, more animated tones, using Cascadia's normalled LFO and built-in sub-oscillator.

> [!tip] If you only have 5 minutes
> Raise the PW MOD slider on VCO A to ~75%. Play a note and listen to the animated, chorus-like movement. That is PWM. Now raise the Mixer SUB slider to ~50% and hear the instant low-end weight.

## What Is Pulse Width Modulation?

A pulse wave is a waveform that switches between two voltage levels -- high and low. The *pulse width* (also called duty cycle) is the percentage of time the wave spends in the high state. At 50%, it is a perfect square wave with a hollow, woody character. At 25% or 75%, it becomes a narrow pulse with a thin, nasal quality. Changing the pulse width changes the harmonic content: a square wave has only odd harmonics, while asymmetric pulse widths introduce even harmonics.

*Pulse width modulation* (PWM) means continuously changing the pulse width over time, usually with an LFO. The shifting harmonic content creates a rich, animated, chorus-like effect -- one oscillator sounds like two because the timbre is constantly evolving. PWM is one of the most efficient ways to create movement in a sound without adding complexity to the patch.

## What Is a Sub-Oscillator?

A sub-oscillator is a secondary tone generator derived from the main oscillator, running at a lower octave (typically one or two octaves down). Because it is mathematically derived from the main oscillator's signal, it tracks pitch perfectly -- no tuning drift, no beating. Sub-oscillators add weight and fullness to bass sounds and anchor higher-register patches with low-end foundation. They are standard on most analog synthesizers and are especially effective when blended at moderate levels rather than dominating the mix.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default sawtooth tone from Session 1. Now slowly move the VCF FREQ slider from ~75% down to ~25% and back up -- recall how the filter shapes brightness. Return VCF FREQ to ~75%.

## Setup

From the normalled default:
- Ensure VCO A OCTAVE is set to a comfortable range (4 or 5)
- Ensure Mixer SAW slider is at ~50%
- Ensure Mixer PULSE slider is at 0% (we will raise it during exercises)
- All other Mixer sliders at 0%

## Exercises

### Exercise 1: Explore Pulse Width (8 min)

1. Raise the Mixer PULSE slider to ~75% and lower the Mixer SAW slider to 0% -- you should hear a hollow, square-wave tone (the default pulse width is ~50%)
2. Slowly move the VCO A PW slider from ~50% down to ~25% -- you should hear the tone become thinner and more nasal as the pulse narrows
3. Move PW to ~75% -- the tone should sound similar to ~25% (symmetric around 50%) but with a subtly different phase character
4. Return PW to ~50% -- the full, hollow square wave is back

> [!info] Cascadia's PW slider range is 50-95% duty cycle. To reach narrower pulse widths below 50%, you need CV modulation via the PW MOD slider. The slider plus CV together can sweep the full 0-100% range.

### Exercise 2: Add Pulse Width Modulation (8 min)

> [!info] Normalled: LFO Y -> VCO A PWM IN. LFO Y is pre-wired to the pulse width modulation input. Raising VCO A's PW MOD slider immediately adds PWM with no cable needed. Patching into PWM IN overrides this LFO Y connection.

1. With Mixer PULSE at ~75% and SAW at 0%, slowly raise the VCO A PW MOD slider from 0% to ~50% -- you should hear the tone start to shimmer and move as LFO Y modulates the pulse width
2. Raise PW MOD to ~75% -- the movement becomes more dramatic, almost chorus-like
3. Raise PW MOD to ~100% -- at full depth, the sound thins out dramatically at the extremes of each LFO cycle
4. Set PW MOD to ~50% for a balanced effect. Now adjust the LFO RATE knob -- slower rates create a gentle sweep, faster rates create a vibrato-like flutter

> [!info] Cascadia's LFO X/Y/Z module provides three linked LFOs from a single RATE knob. LFO Y is pre-normalled to PWM, so you get modulation immediately. LFO X and Z are available for other destinations via patching.

5. Set LFO RATE to a slow setting (~25%) for a smooth, evolving PWM effect

### Exercise 3: Add the Sub-Oscillator (7 min)

1. Return PW MOD to 0%. Set Mixer PULSE to ~50% and Mixer SAW to ~50% -- you should hear both waveforms blended
2. Raise the Mixer SUB slider to ~50% -- you should hear a strong low-end tone one octave below the main pitch appear underneath

> [!info] Cascadia's sub-oscillator derives from VCO A's pulse wave and offers three types via the SUB TYPE switch: SUB -1 (square wave one octave down), OR (75% duty-cycle pulse two octaves down -- the logical OR of -1 and -2), and SUB -2 (square wave two octaves down). The OR mode is unique to Cascadia and produces a distinctive hollow, deep tone.

3. Toggle the SUB TYPE switch to the top position (SUB -1) -- one octave down, a solid bass foundation
4. Toggle to the middle position (OR) -- two octaves down with a distinctive hollow character
5. Toggle to the bottom position (SUB -2) -- two octaves down, a deeper square wave
6. Set SUB TYPE to SUB -1 and SUB level to ~40% for a balanced low-end addition. Play notes across the keyboard -- the sub tracks perfectly

### Exercise 4: Combine PWM and Sub (2 min)

1. With SUB at ~40% (SUB -1), raise PW MOD back to ~50%
2. Play a sustained chord or single note -- you should hear a thick, animated sound: the PWM adds movement to the upper harmonics while the sub provides a stable low-end anchor
3. This combination -- PWM for animation plus sub for weight -- is a classic technique for rich, full sounds on any analog synthesizer

## Exploration (optional, hyperfocus days)

- Try raising both SAW and PULSE to ~50% with PWM active -- hear how the sawtooth stays steady while the pulse shimmers around it
- Blend the Mixer IN 2 slider to ~25% to mix in VCO A's sine wave (normalled to IN 2) for a softer fundamental underneath the harmonics
- Set SUB TYPE to OR and SUB to ~75% for an aggressive, thick bass tone -- play in the C1-C2 range

## Output Checklist

- [ ] Can hear the difference between narrow and wide pulse widths
- [ ] Can activate PWM using the PW MOD slider (no cable needed)
- [ ] Can hear the three sub-oscillator types and describe their character
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Pulse width modulation creates animated, chorus-like movement from a single oscillator by continuously changing the harmonic content
- The sub-oscillator adds low-end weight that tracks pitch perfectly -- blend it at moderate levels for best results
- Both PWM and the sub-oscillator are available on Cascadia with zero cables, thanks to normalled connections

## Next Session Preview

Next time you will explore the filter envelope, wave folding, and get a taste of FM synthesis and external effects -- completing your tour of Cascadia's normalled signal path. You will save your first patch.
