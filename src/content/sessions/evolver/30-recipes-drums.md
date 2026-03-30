---
title: "Session 30: Drums and Percussion -- Kick, Snare, and Hats"
module: "Sound Design Recipes"
session_number: 30
duration: 25
prerequisite: 29
output_type: patch
difficulty: advanced
tags: [recipes, drums, percussion, kick, snare, hats, sequencer, sound-design]
instrument: evolver
reference: "Anu Kirk p.95-98 (drum synthesis), DSI Manual p.15-19, p.27-32"
---

# Session 30: Drums and Percussion -- Kick, Snare, and Hats

**Objective:** Build kick, snare, and hi-hat patches using short envelopes, noise, and FM percussion techniques, then combine them into a complete drum beat sequence using all 4 sequencer tracks.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set LPF Frequency = `40`, Resonance = `90`, 4-Pole ON. Env Amount = `99`. ENV 1: Attack = `0`, Decay = `25`, Sustain = `0`. ENV 2: Attack = `0`, Decay = `20`, Sustain = `0`. All Osc Levels = `0`. Play a key -- instant analog kick drum from self-oscillating filter.

## Warm-Up (2 min)

Load your modulated texture from Session 29. Hold a note for 10 seconds and listen to it evolve. Pads use slow envelopes and gentle modulation. Drums are the opposite extreme: the fastest envelopes possible, sounds that exist for milliseconds. Load the basic patch.

## Setup

Each recipe starts from the basic patch. The drum beat in Exercise 4 combines all three sounds into one patch -- save that final combination.

## Exercises

### Recipe 1: Analog Kick Drum (5 min)

Using self-oscillating filter for a deep, thumpy kick (Anu Kirk p.95-96). The Evolver's analog filter in 4-pole mode produces a sine wave when resonance is high enough -- combined with a pitch envelope, this is a classic analog kick.

1. From the basic patch:
   - **Osc 1 Level** = `0`, **Osc 2 Level** = `0`, **Osc 3 Level** = `0`, **Osc 4 Level** = `0`
   - **Noise Volume** = `0`
   - All sound comes from the self-oscillating filter
2. Self-oscillating filter for the kick body:
   - **LPF Frequency** = `40`, **Resonance** = `90`, **4-Pole** ON
   - **Env Amount** = `99` (maximum positive -- the envelope sweeps the filter from high to low)
   - ENV 1: **Attack** = `0`, **Decay** = `25`, **Sustain** = `0`, **Release** = `5`
   - The filter starts high (click/punch) and decays down to the base frequency (the thump)
3. VCA -- very short:
   - ENV 2: **Attack** = `0`, **Decay** = `20`, **Sustain** = `0`, **Release** = `5`
4. Play a key. You should hear a deep thump with a punchy attack. Adjust:
   - **LPF Frequency** lower (30-35) for deeper kick
   - **ENV 1 Decay** shorter (15-20) for tighter kick, longer (30-35) for boomy kick
   - **Env Amount** lower (70-80) for less click on the attack
5. Add **Distortion** = `10` for subtle weight

Note the sound -- you will recreate this within a combined drum patch later.

### Recipe 2: FM Snare (6 min)

Noise body with FM transient for a sharp, metallic snare attack (Anu Kirk p.96-97).

1. Load the basic patch fresh:
   - **Osc 1 Level** = `0`, **Osc 2 Level** = `0`
   - **Osc 3 Shape** = `1` (sine), **Level** = `35`, **Frequency** = `C2`
   - **Osc 4 Shape** = `1` (sine), **Level** = `0`, **Frequency** = `E3` (non-harmonic interval for metallic character)
   - **FM 4->3** = `60` (high FM for inharmonic "snap")
   - **Noise Volume** = `55` (noise provides the snare body)
2. Filter -- shapes the noise character:
   - **LPF Frequency** = `75`, **Resonance** = `10`, **4-Pole** ON
   - **Env Amount** = `40`
   - ENV 1: **Attack** = `0`, **Decay** = `30`, **Sustain** = `0`, **Release** = `10`
3. VCA -- short but slightly longer than the kick:
   - ENV 2: **Attack** = `0`, **Decay** = `25`, **Sustain** = `0`, **Release** = `10`
4. FM decay for the transient snap:
   - **ENV 3**: Destination = `FM4` (FM 4->3 Amount), Amount = `70`, Attack = `0`, Decay = `15`, Sustain = `0`, Release = `5`
   - The FM is strongest at the very start (the "crack") and decays quickly, leaving the noise tail
5. Play a key. You should hear a sharp transient followed by a noisy tail. Adjust:
   - **Noise Volume** higher for more body, lower for more crack
   - **Osc 4 Frequency** to different intervals for different metallic characters
   - **ENV 2 Decay** for snare length (20 = tight, 35 = loose)

### Recipe 3: Hi-Hats (5 min)

Short noise bursts shaped by the highpass filter for bright, metallic percussion.

1. Load the basic patch fresh:
   - **Osc 1 Level** = `0`, **Osc 2 Level** = `0`
   - **Osc 3 Shape** = `1` (sine), **Level** = `0`
   - **Osc 4 Shape** = `1` (sine), **Level** = `0`
   - **Noise Volume** = `70` (noise is the primary source)
2. Filter -- highpass removes low end, lowpass shapes the brightness:
   - **LPF Frequency** = `95`, **Resonance** = `5`
   - **HPF Frequency** = `60` (removes all low-end content, leaving only bright noise)
   - **Env Amount** = `15`, ENV 1: **Attack** = `0`, **Decay** = `12`, **Sustain** = `0`, **Release** = `5`
3. VCA -- extremely short for closed hat:
   - ENV 2: **Attack** = `0`, **Decay** = `8`, **Sustain** = `0`, **Release** = `3`
4. Play a key. You should hear a short, bright "tick" -- a closed hi-hat
5. For an open hi-hat variation: increase **ENV 2 Decay** to `35` and **Release** to `20`. The longer decay lets the noise sustain, creating the open hat "tssssh"
6. Add **Osc 3 Level** = `15`, **FM 4->3** = `45` for metallic ring on top of the noise

### Exercise 4: Combined Drum Beat Sequence (7 min)

Now combine all three drum sounds into a single sequenced patch. The sequencer modulates parameters to switch between kick, snare, and hat characters on different steps.

1. Load the basic patch fresh. Set up a versatile starting point:
   - **Osc 3 Shape** = `1`, **Level** = `30`, **Frequency** = `C2`
   - **Osc 4 Shape** = `1`, **Level** = `0`, **Frequency** = `E3`
   - **FM 4->3** = `20`
   - **Noise Volume** = `40`
   - **LPF Frequency** = `60`, **Resonance** = `50`, **4-Pole** ON
   - **HPF Frequency** = `20`
   - **Env Amount** = `70`, ENV 1: **Attack** = `0`, **Decay** = `20`, **Sustain** = `0`, **Release** = `5`
   - ENV 2: **Attack** = `0`, **Decay** = `18`, **Sustain** = `0`, **Release** = `5`
2. Sequencer Track 1 -- filter cutoff creates different drum characters per step:
   - **Seq 1 Dest** = `FiL`, **Clock Divide** = `16th`, **BPM** = `120`
   - Step 1 = `30` (low = kick), Step 2 = `oFF`, Step 3 = `90` (high = hat), Step 4 = `90`
   - Step 5 = `65` (mid = snare), Step 6 = `oFF`, Step 7 = `90`, Step 8 = `oFF`
   - Step 9 = `30`, Step 10 = `90`, Step 11 = `90`, Step 12 = `65`
   - Step 13 = `30`, Step 14 = `oFF`, Step 15 = `90`, Step 16 = `65`
   - Step 17 = `rST`
3. Sequencer Track 2 -- resonance variation (high for kick, low for hats):
   - **Seq 2 Dest** = `RES`
   - Step 1 = `90`, Step 2 = `oFF`, Step 3 = `5`, Step 4 = `5`
   - Step 5 = `20`, Step 6 = `oFF`, Step 7 = `5`, Step 8 = `oFF`
   - Step 9 = `90`, Step 10 = `5`, Step 11 = `5`, Step 12 = `20`
   - Step 13 = `90`, Step 14 = `oFF`, Step 15 = `5`, Step 16 = `20`
   - Step 17 = `rST`
4. Sequencer Track 3 -- noise volume (up for snare/hat, down for kick):
   - **Seq 3 Dest** = `NoV` (Noise Volume)
   - Step 1 = `10`, Step 2 = `oFF`, Step 3 = `70`, Step 4 = `60`
   - Step 5 = `80`, Step 6 = `oFF`, Step 7 = `60`, Step 8 = `oFF`
   - Step 9 = `10`, Step 10 = `60`, Step 11 = `60`, Step 12 = `80`
   - Step 13 = `10`, Step 14 = `oFF`, Step 15 = `60`, Step 16 = `80`
   - Step 17 = `rST`
5. Set **Trigger Select** = `Seq Only` and press **START/STOP**
6. You should hear a recognizable drum pattern: kicks on beats 1, 9, 13 (low filter, high resonance, low noise), snares on 5, 12, 16 (mid filter, some noise), and hats filling in between
7. Add **Distortion** = `12` for weight and **Delay 1 Time** = `3 Steps`, **Level** = `15` for space

**Save as "Drum Machine"**.

## Exploration (optional, hyperfocus days)

- Use Seq 4 to modulate FM amount -- creates metallic accents on specific drum hits
- Change BPM to `80` and Clock Divide to `8th` for a half-time feel
- Layer the drum patch with your acid bass from Session 27 by alternating programs -- one for drums, one for bass, switching between them with MIDI program change

> [!challenge] Create Your Own Drum Sound
> Build a percussive sound using short envelopes and noise or FM techniques.
> Your patch should approximate the punch of [[analog-kick]].
> Save your result with `challenge_id: 30-1` in the frontmatter.

## Output Checklist

- [ ] Kick drum sound created -- deep, punchy, self-oscillating filter
- [ ] Snare sound created -- noise + FM transient, sharp attack
- [ ] Hi-hat sound created -- filtered noise, short decay
- [ ] Complete drum beat sequence saved with 3 tracks modulating different parameters
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Drum synthesis on the Evolver uses extremely short envelopes (decay under 30) -- drums are all about the first few milliseconds of a sound
- Self-oscillating filter (4-pole, resonance 85+) produces a sine wave that, combined with a fast envelope, creates classic analog kicks
- The sequencer can morph a single patch into multiple drum sounds by modulating filter, resonance, and noise on each step -- the Evolver becomes a one-voice drum machine

## Next Session Preview

Session 31 sets up the Evolver for expressive live performance -- mapping mod wheel, aftertouch, and expression pedal to useful destinations. You will create a patch that responds dynamically to your playing style.
