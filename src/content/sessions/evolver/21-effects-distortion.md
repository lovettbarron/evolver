---
title: "Session 21: Distortion, Grunge, and Output Hack"
module: "Effects"
session_number: 21
duration: 20
prerequisite: 20
output_type: patch
difficulty: intermediate
tags: [effects, distortion, grunge, output-hack, bit-crushing, noise-gate]
instrument: evolver
reference: "Anu Kirk p.54-57, DSI Manual p.19, p.21, p.26"
---

# Session 21: Distortion, Grunge, and Output Hack

**Objective:** Use distortion, grunge, and output hack to add aggression, lo-fi character, and timbral destruction to your sounds, understanding pre/post signal positioning.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set Distortion to `40`. Play notes -- hear the edge it adds. Now set Output Hack to `8`. The sound becomes crunchy and lo-fi. Set it back to `0` and try Feedback Level = `60`, Grunge = ON. Raw aggression.

## Warm-Up (2 min)

Load your plucked string patch from Session 20. Play a few notes across the keyboard to hear the Karplus-Strong synthesis. That was feedback as a sound generator. Today you will use distortion and bit-crushing as timbral shapers -- the Evolver's destructive effects. Load the basic patch.

## Setup

From the basic patch:
- Set **Osc 1 Level** to `40`, **Osc 2 Level** to `40`
- Set **Osc 3 Level** to `0`, **Osc 4 Level** to `0`
- Set **LPF Frequency** to `100`, **Resonance** to `20`, **4-Pole** ON
- Set ENV 1 (Filter): **Decay** = `70`, **Sustain** = `30`, **Env Amount** = `50`
- Set ENV 2 (VCA): **Attack** = `0`, **Decay** = `0`, **Sustain** = `100`, **Release** = `20`
- Lower **Main Volume** before starting -- distortion dramatically increases loudness

This gives a mildly filtered sound with some envelope movement as a canvas for destructive effects.

## Exercises

### Exercise 1: Distortion Basics (5 min)

Distortion is digital clipping that squares off waveform peaks, adding harmonics and aggression (Anu Kirk p.54-55). It ranges from 0-99.

1. Set **Distortion** to `15` -- play a note. You should hear a subtle edge added to the sound, like mild overdrive
2. Increase to `40` -- more obvious distortion, the tone becomes more aggressive and harmonically rich
3. Increase to `75` -- heavy distortion. The waveform is being severely clipped. Notice how the volume has increased dramatically
4. Set **Distortion** to `99` -- maximum. The sound is very compressed and aggressive
5. Try playing at different pitches -- distortion sounds different on low notes vs high notes because it emphasizes higher harmonics
6. Set **Distortion** back to `40`. Now sweep **LPF Frequency** from `100` down to `40` -- the filter tames the harshness of the distortion. This is a key technique: distort then filter (Anu Kirk p.54)

**Important**: Whenever distortion is non-zero, the Evolver's noise gate activates. The noise gate is triggered by the left channel level (DSI Manual p.19). If you want the noise gate alone without distortion, set Distortion to `1`.

### Exercise 2: Pre/Post Distortion Positioning (4 min)

Distortion can be placed at two points in the signal chain. This changes its character dramatically (DSI Manual p.26).

1. Keep **Distortion** at `40`
2. Open **Misc Params** and find **Dist Pre/Post**. Set to **Post (After VCA)** -- this is the default for internal sounds. Distortion comes after the filter and VCA
3. Play notes and listen -- the distortion affects the fully shaped sound
4. Switch to **Pre (After ExtIn)** -- now distortion is placed before the analog filter. For internal oscillators, this positioning only affects external input. You should hear the distortion disappear or change character on internal sounds
5. Switch back to **Post (After VCA)** for the rest of this session

**Key insight**: Post = distortion on everything (internal sounds). Pre = distortion on external input only, allowing the analog filter to shape the distorted signal.

### Exercise 3: Output Hack -- Bit Crushing (4 min)

Output Hack reduces bit depth from 16 bits down to 2 bits. It "trashes the output signal, quite rudely" (DSI Manual p.21).

1. Set **Distortion** to `0` (isolate the output hack effect)
2. Set **Output Hack** to `4` -- play a note. You should hear a subtle gritty texture added
3. Increase to `8` -- the sound becomes noticeably lo-fi, like an old video game console
4. Increase to `12` -- extreme bit crushing. The sound is heavily degraded, stairstepped, and crunchy
5. Set to `14` -- only 2 bits remain. The sound is almost pure square wave at any input
6. Now combine: set **Distortion** to `30` and **Output Hack** to `6` together -- distortion adds harmonics, then output hack crushes the resolution. The combination is more extreme than either alone

### Exercise 4: Grunge and the Dirty Lead (5 min)

Grunge intensifies the feedback character (Anu Kirk p.56). Combined with distortion, it creates aggressive leads.

1. Set **Output Hack** to `0`, **Distortion** to `45`
2. Set **Feedback Level** to `50`, **Feedback Frequency** to `24` (C2)
3. Turn **Grunge** ON
4. Play notes -- you should hear a harsh, aggressive quality layered on top of your sound from the feedback interacting with the distortion and grunge circuit
5. Increase **Feedback Level** to `70` -- the grunge character becomes more prominent. At higher feedback levels, grunge "enables nasty feedback" (DSI Manual p.19)
6. Add some filter envelope: set **Env Amount** to `65` -- the filter sweep through the distortion creates a classic dirty synth lead sound
7. Set **Osc Slop** to `3` for some analog drift, and **Osc 2 Fine** to `+5` for detuning thickness

**Save this patch** as your "Dirty Lead" patch.

## Exploration (optional, hyperfocus days)

- Combine all three: Distortion = `50`, Output Hack = `5`, Grunge = ON, Feedback Level = `60`. Extreme destruction
- Add your rhythmic delay from Session 19 (Delay 1 Time = `1 Step`, Level = `50`, Feedback 1 = `40`) to the dirty lead -- distorted delay is a classic sound
- Try HP Pre/Post switching in Misc Params -- moving the highpass filter changes which frequencies reach the distortion

## Output Checklist

- [ ] Dirty lead patch saved with distortion, grunge, and feedback
- [ ] Understand distortion (0-99), output hack (0-14 bit reduction), and grunge (feedback intensifier)
- [ ] Heard the difference between pre/post distortion positioning
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Distortion clips waveforms, adding harmonics and aggression; output hack reduces bit depth for lo-fi character; grunge intensifies feedback harshness
- Pre/post positioning changes what gets distorted: Post affects everything, Pre affects only external input (allowing the analog filter to tame it)
- The noise gate activates whenever distortion is non-zero -- use distortion = 1 for noise gate only without audible distortion

## Next Session Preview

Session 22 introduces the Evolver's 4-track, 16-step sequencer -- the instrument's killer feature. You will program basic sequences, understand step values, and create your first sequenced melody.
