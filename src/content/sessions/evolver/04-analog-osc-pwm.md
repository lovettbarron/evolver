---
title: "Session 04: Pulse Width Modulation -- Strings & Horn"
module: "Analog Oscillators"
session_number: 4
duration: 20
prerequisite: 3
output_type: patch
difficulty: beginner
tags: [analog-oscillators, pwm, pulse-width, lfo, strings, horn, modulation]
instrument: evolver
reference: "Anu Kirk p.13-16, DSI Manual p.15, p.22"
---

# Session 04: Pulse Width Modulation -- Strings & Horn

**Objective:** Create two classic analog synth sounds -- PWM strings and a synth horn -- using pulse width modulation, your first taste of how modulation brings static sounds to life.

> [!tip] If you only have 5 minutes
> Load the basic patch, set Osc 3+4 Level to 0, set Osc 1 Shape to P-52, LFO 1 to Tri / Freq 42 / Amount 30 / Dest O1P. Play a note. That swirling sound is PWM.

## Warm-Up (2 min)

Load your basic patch. Set Osc 3 and 4 Level to `0`. Set Osc 1 Shape to `P-50`. Hold a note and manually turn the Shape knob slowly from P-01 to P-99. You should hear the timbre sweep from thin to full to thin again. That is what we are about to automate with an LFO.

## Setup

From the basic patch:
- Set **Osc 3 Level** to `0` and **Osc 4 Level** to `0`
- Set **Osc 1 Shape** to `P-52`
- Set **Osc 2 Shape** to `P-48`

## Exercises

### Exercise 1: PWM Strings (8 min)

This is the classic analog string sound. Enter these values exactly as specified:

**LFO 1** (press LFO 1 switch):
1. Set **Shape** to `Tri` (triangle -- smoothest modulation)
2. Set **Frequency** to `42`
3. Set **Amount** to `30`
4. Set **Destination** to `O1P` (Osc 1 Pulse Width)

**LFO 2** (press LFO 2 switch):
5. Set **Shape** to `Tri`
6. Set **Frequency** to `32` (slightly different speed from LFO 1 -- this is key)
7. Set **Amount** to `23`
8. Set **Destination** to `O2P` (Osc 2 Pulse Width)

**VCA Envelope (ENV 2):**
9. Set **Attack** to `61` (slow fade in for string character)
10. Set **Release** to `34` (gentle fade out)

Now play a sustained note in the middle of the keyboard. Hold it for at least 10 seconds. You should hear the sound swirl and breathe -- the two LFOs at slightly different speeds create an ever-shifting, organic texture that never quite repeats.

"A classic analog string sound comes from modulating the pulse width" -- Anu Kirk p.13

**Why it works**: Each LFO sweeps the pulse width of its oscillator. Because the two LFOs run at different speeds (42 vs 32), the two oscillators are always slightly out of phase, creating rich movement.

See Anu Kirk p.13-14 ("Exercise 2: PWM Strings")

### Exercise 2: Add Depth with a Third LFO (3 min)

Keep the strings patch. Add a slow underlying modulation layer:

**LFO 3** (press LFO 3 switch):
1. Set **Shape** to `Tri`
2. Set **Frequency** to `5` (very slow)
3. Set **Amount** to `14` (subtle)
4. Set **Destination** to `OAP` (Osc ALL Pulse Width)

Play and hold a note again. You should hear an even more alive quality -- a slow, broad sweep underneath the faster modulation, like a section of string players where no two instruments bow identically.

"The key to making the string sound rich is to make the variation of the pulse widths irregular, but not too extreme" -- Anu Kirk p.15

See Anu Kirk p.15 (third LFO addition)

### Exercise 3: Mod Wheel Filter Control (2 min)

Make the mod wheel useful for live control:

1. Set **Mod Wheel Destination** to `FiL` (Filter Frequency)
2. Set **Mod Wheel Amount** to `-78`

Hold a note. Push the mod wheel up. You should hear the filter close, darkening the sound. Pull it back down -- brightness returns. You now have real-time tonal control over your strings.

**Save this patch** to an empty location (e.g., Bank 1, Program 125). Name it "PWM Strings".

See Anu Kirk p.14 (mod wheel assignment)

### Exercise 4: Synth Horn (5 min)

Load the basic patch again. Set Osc 3 and 4 Level to `0`. Now enter:

1. Set **Osc 1 Shape** to `P-01`
2. Set **Osc 2 Shape** to `P-03`
3. Set **Output Pan** to `St1` (full stereo)

**ENV 3** (the mod envelope):
4. Set **Attack** to `26`
5. Set **Decay** to `78`
6. Set **Sustain** to `7`
7. Set **Release** to `83`
8. Set **Amount** to `61`
9. Set **Destination** to `OAP` (Osc ALL Pulse Width)

Play some staccato notes. You should hear a "bwaaah" attack -- the envelope sweeps the pulse width from narrow to wide and back, giving each note a shaped timbral contour. Instead of continuous LFO modulation, you get a single shaped sweep per note.

Same technique (pulse width modulation), different modulation source (envelope instead of LFO), completely different character.

Try adjusting ENV 3 values:
- Higher **Attack** (`50`) -- you should hear a slower swell
- Lower **Decay** (`40`) -- you should hear a snappier response
- Higher **Amount** (`80`) -- you should hear a more dramatic sweep

Save if you find a setting you like.

See Anu Kirk p.15-16 ("Exercise 3: PWM Horn")

## Exploration (optional, hyperfocus days)

- Try substituting very slow, synced sawtooth LFOs (Shape = `Saw`, Frequency = `5`) for the triangle LFOs in your strings patch -- you should hear subtle rhythmic throbbing instead of smooth swirling
- Experiment with extreme LFO amounts (60+) on both oscillators -- the sound should get wild and unstable
- Try the horn with different waveshapes for Osc 1 and 2 (Saw or Tri instead of pulse) -- ENV 3 modulating all pulse width will have no effect on non-pulse shapes, which teaches you about modulation routing

## Output Checklist

- [ ] PWM Strings patch saved with 3 LFOs and mod wheel filter control
- [ ] Understand the difference between LFO modulation and envelope modulation of pulse width
- [ ] Heard how mismatched LFO speeds create organic textures
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- PWM (Pulse Width Modulation) creates movement by continuously changing the harmonic content of pulse waves
- Using multiple LFOs at different speeds creates organic, non-repeating textures
- The same modulation target (pulse width) produces completely different results depending on the modulation source (LFO = continuous movement, envelope = shaped contour per note)

## Next Session Preview

Next time you will explore hard sync -- where Osc 2 forces Osc 1 to restart its waveform, creating aggressive, harmonically rich timbres. This is the signature Dave Smith / Prophet-5 sound.
