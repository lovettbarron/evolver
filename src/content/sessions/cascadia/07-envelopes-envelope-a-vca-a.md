---
title: "Session 07: Envelope A and VCA A — Shaping Every Note"
module: "Envelopes & Amplitude"
session_number: 7
duration: 20
prerequisite: 6
output_type: patch
difficulty: intermediate
tags: [envelopes, adsr, vca, amplitude, dynamics, velocity, curriculum]
instrument: cascadia
reference: "Cascadia Manual pp. 26-28"
---

# Session 07: Envelope A and VCA A — Shaping Every Note

**Objective:** Understand how an ADSR envelope shapes amplitude over time, explore Envelope A's unique Hold stage and Envelope Speed switch, and create a shaped-dynamics patch that responds to playing velocity.

> [!tip] If you only have 5 minutes
> From the normalled default, set Envelope A Attack to ~75%. Play a note -- it fades in over about 1 second instead of starting instantly. Now set Attack back to ~5% and Decay to ~50%, Sustain to ~40%. Play again -- the note punches in, then settles quieter. That is ADSR shaping.

## What Is an ADSR Envelope?

An envelope is a control signal that changes over time, triggered by each note you play. The most common envelope type is **ADSR** -- four stages that shape how a parameter (usually volume) evolves from the moment you press a key to after you release it:

- **Attack:** How long the signal takes to rise from zero to maximum. Short attack = instant punch. Long attack = gradual fade-in.
- **Decay:** How long it takes to fall from maximum to the sustain level. Short decay = percussive pluck. Long decay = gradual settling.
- **Sustain:** The level held for as long as you keep the key pressed. This is a *level*, not a *time* -- it sets how loud the note stays while your finger is down.
- **Release:** How long it takes to fade to zero after you release the key. Short release = abrupt stop. Long release = natural fade-out.

The distinction between **gate** and **trigger** matters here. A *gate* is a signal that stays high as long as you hold the key -- it determines how long the sustain stage lasts. A *trigger* is a brief pulse at the start of the note -- it tells the envelope to begin its Attack stage. Cascadia's Envelope A receives both from the MIDI input by default.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default sawtooth tone with the wave folder adding some harmonic complexity. Now raise Wave Folder FOLD to ~60% and back to noon -- recall the fold progression from Session 6.

## Setup

From the normalled default:
- Mixer SAW at ~50%, all other Mixer sliders at 0%
- VCF FREQ at ~75% (filter mostly open so you can focus on amplitude changes)
- VCF FM 1 at 0% (no filter sweep -- isolate envelope's effect on amplitude)
- Wave Folder FOLD at 0% (clean signal for clarity)
- VCO A OCTAVE at 4
- Envelope A: all sliders at noon, HOLD POSITION at Off, ENVELOPE SPEED at Med, CTRL SOURCE at Level

> [!info] Normalled: Envelope A ENV OUT -> VCA A LEVEL MOD IN. Every note you play triggers Envelope A, which shapes VCA A's amplitude automatically. This is the connection that turns static oscillator tone into notes with shape and dynamics. Patching into VCA A LEVEL MOD IN overrides this connection.

## Exercises

### Exercise 1: Hear ADSR in Action (6 min)

1. Set VCA A LEVEL to ~0% (minimum) and LEVEL MOD to ~75%. Now Envelope A fully controls the volume -- when the envelope is at zero, you hear nothing; when it peaks, you hear the full signal
2. Play a sustained note around C3. With all envelope sliders at noon, you should hear a moderate attack, a gentle decay to a medium sustain level, and a smooth release when you let go
3. Set Attack to ~75% -- play a note and hold it. You should hear the note fade in over about 1 second, gradually rising to full volume. This is a swell or pad-like articulation
4. Return Attack to ~5%. Set Decay to ~50% and Sustain to ~40% -- play a note. The note should punch in instantly, peak briefly, then settle to a quieter sustained level. This is a classic pluck-like shape
5. Set Sustain to ~0% -- play and hold a note. Even though you hold the key, the note decays to silence because the sustain level is zero. The gate is high, but there is nothing to sustain. This is how you create percussive sounds from a sustained oscillator
6. Set Sustain back to ~60%. Set Release to ~75% -- release a note and listen to the long fade-out. Now set Release to ~5% -- release a note and it cuts off almost instantly. Release shapes the tail of every note

> [!info] Cascadia's Envelope A ENV OUT is also normalled to VCO A IM IN (FM index modulation). This means the envelope can simultaneously shape both your volume AND your FM brightness -- notes that are louder also have more FM harmonics. For this session, keep VCO A INDEX at 0% to isolate the amplitude effect.

### Exercise 2: Explore Hold and Envelope Speed (6 min)

1. Set a punchy envelope: Attack ~5%, Decay ~40%, Sustain ~50%, Release ~30%
2. Flip HOLD POSITION from Off to AHDSR. Set H (Hold) slider to ~40% -- play a note. You should hear the attack reach peak and then STAY at peak for a moment before the decay begins. The Hold stage inserts a sustain-at-peak period after the attack

> [!info] Cascadia's AHDSR Hold stage is unusual -- most synthesizer envelopes have only ADSR. The Hold stage adds a punch to sounds by keeping the peak volume longer before decaying. In Gate Ext mode, Hold sets a minimum gate duration so even short trigger pulses produce full envelopes -- useful for sequencer patterns with very short gates.

3. Try Hold at ~75% -- the peak sustains even longer. This creates a punchy, sustained attack that works well for bass sounds
4. Switch HOLD POSITION to Gate Ext -- play a very short staccato note. Notice the envelope completes its full Hold duration even though you released quickly. This mode guarantees a minimum note length
5. Return HOLD POSITION to Off. Now flip ENVELOPE SPEED from Med to Fast -- play the same envelope. Everything is faster: the attack snaps, the decay is shorter, the release is quicker. This rescales ALL time parameters simultaneously
6. Switch ENVELOPE SPEED to Slow -- play the same envelope. Now everything is glacially slow: the attack takes several seconds, the decay is very long. This mode is for ambient pads and evolving textures

> [!info] Cascadia's ENVELOPE SPEED switch rescales all time parameters simultaneously across three ranges: Fast (0.2ms-2.5s), Med (2ms-10s), Slow (9.3ms-60s). You can go from percussion-fast attacks to minute-long pad swells without repatching or changing slider positions.

### Exercise 3: VCA A Level Balance and Velocity (6 min)

1. Set ENVELOPE SPEED back to Med. Set a musical envelope: Attack ~10%, Decay ~40%, Sustain ~50%, Release ~30%
2. Set VCA A LEVEL at ~0% and LEVEL MOD at ~75% (fully envelope-controlled). Play notes -- volume follows the envelope completely
3. Now raise VCA A LEVEL to ~25% -- play a note. You should hear a constant background tone even when the envelope is at zero. The LEVEL slider sets a *base* amplitude that the envelope modulates on top of
4. Set VCA A LEVEL to ~50% and LEVEL MOD to ~50% -- play notes. The note is always partly audible, and the envelope adds dynamic movement on top. This balance is useful for sustained pads where you want envelope motion without silence between notes
5. Set VCA A LEVEL back to ~0% and LEVEL MOD to ~75%. Now check CTRL SOURCE is at Level -- play notes with different velocities (soft then hard). Softer notes should be noticeably quieter

> [!info] Normalled: MIDI Velocity -> Envelope A CTRL IN. When CTRL SOURCE is at Level, velocity scales the envelope's peak amplitude -- softer playing produces quieter notes. When CTRL SOURCE is at Time, velocity scales the envelope's time parameters -- softer playing produces slower envelopes. Set CTRL SOURCE to Off to ignore velocity entirely.

6. Switch CTRL SOURCE to Time -- play soft then hard notes. Now velocity affects the *speed* of the envelope rather than its *level*. Soft notes have slower attacks and decays, hard notes have snappier envelopes. This creates a natural, instrument-like response

## Exploration (optional, hyperfocus days)

- Raise VCA A AUX IN slider to ~50% to blend the wave folder output into VCA A. Raise FOLD to ~40% and play notes -- you hear the wave-folded signal mixed in, shaped by the same envelope

> [!info] Normalled: Wave Folder OUT -> VCA A AUX IN. The AUX IN slider blends the wave-folded signal into VCA A alongside the main VCF signal. This lets you control the wave folder's presence in your sound without needing a mixer or cables.

- Try extreme settings: Attack ~100%, Decay ~0%, Sustain ~100%, Release ~100% for a pure swell pad. Then Attack ~0%, Decay ~20%, Sustain ~0%, Release ~0% for a tight pluck

## Output Checklist

- [ ] Can hear Attack, Decay, Sustain, and Release stages individually
- [ ] Understand VCA A LEVEL vs LEVEL MOD balance (always-on vs envelope-controlled)
- [ ] Explored HOLD POSITION modes (Off, AHDSR, Gate Ext)
- [ ] Heard ENVELOPE SPEED differences (Fast, Med, Slow)
- [ ] Heard velocity response via CTRL SOURCE (Level vs Time vs Off)
- [ ] Saved shaped-dynamics patch (see patches/cascadia/shaped-dynamics.md)
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- ADSR envelopes shape how volume evolves over each note: Attack (rise), Decay (fall to sustain), Sustain (held level), Release (fade after key-up)
- VCA A LEVEL sets a base amplitude; LEVEL MOD controls how much the envelope adds on top. Fully envelope-controlled (LEVEL at 0%) vs always-partially-open (LEVEL raised) gives very different musical results
- Cascadia's Hold stage (AHDSR) adds punch by extending the peak before decay begins -- rare in synthesizer envelopes
- Envelope Speed rescales all time parameters simultaneously, covering percussion to ambient in one switch
- Velocity normalling makes playing dynamics expressive without any patching

## Next Session Preview

Envelope B is not just another envelope -- it is a full function generator that can act as an envelope, LFO, or burst generator depending on a single switch. You will explore all three modes and hear how they modulate the filter in completely different ways.
