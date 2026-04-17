---
title: 'Session 34: Mixing the Evolver -- Frequency Planning and Stereo'
session_number: 34
duration: 25
prerequisite: 33
output_type: recording
difficulty: advanced
tags:
  - integration
  - mixing
  - frequency
  - stereo
  - effects
  - daw
  - production
instrument: evolver
reference: 'DSI Manual p.19-21 (output, delay, pan), p.15-17 (oscillator ranges)'
section: Integration & Composition
instrument_type: instrument
---

# Session 34: Mixing the Evolver -- Frequency Planning and Stereo

**Objective:** Record an Evolver part that sits well in a mix context by applying frequency planning, stereo imaging, and effects send strategy -- transforming a good patch into a good mix element.

> [!tip] If you only have 5 minutes
> Load any patch. Before recording, ask: "Where does this sound live in frequency?" Bass = LPF below 60, mono output. Lead = mid-range, slight stereo. Pad = wide stereo, HPF at 30 to leave room for bass. Set Output Pan and HPF accordingly, then record.

## Warm-Up (2 min)

Open your DAW template from Session 33. Load your acid bass from Session 27 and record a short phrase. Now load your PWM pad from Session 29 and record over it. Listen -- do they fight for space, or do they complement each other? Today you learn how to make the Evolver fit in a mix. Load the basic patch.

## Setup

Open your DAW template from Session 33. You will need:
- At least one other audio element to mix against (a drum loop, a vocal sample, another synth -- anything). Import or record something if needed. Even a simple drum loop from a sample pack works perfectly
- The Evolver connected for recording (MIDI + audio as configured in Session 33)

## Exercises

### Exercise 1: Frequency Planning (7 min)

Every sound occupies a frequency range. Two sounds in the same range fight for space. Plan before you patch.

1. **Map the frequency ranges** of the Evolver's sound types:
   - **Sub bass** (Sessions 27): C1-C2, fundamental below 100Hz. LPF Frequency low (30-45)
   - **Bass/Acid** (Session 27): C1-C3, fundamental 50-250Hz. LPF shapes the upper harmonics
   - **Leads** (Session 28): C3-C5, fundamental 250Hz-1kHz. Filter and sync harmonics extend higher
   - **Pads** (Session 29): wide range, but energy concentrated where the filter sits
   - **Drums** (Session 30): kick below 100Hz, snare 200Hz-2kHz, hats above 5kHz
2. Load your **sub bass** patch from Session 27:
   - Set **Output Pan** = `Mono` -- bass must be centered for mix clarity
   - Set **HPF Frequency** = `0` -- keep all the low end
   - Record a short bass line
3. Load your **sync lead** from Session 28:
   - Set **HPF Frequency** = `25` -- remove sub-bass content that would clash with the bass part
   - Set **Output Pan** = `St2` (moderate stereo) -- the lead should have presence but not be fully wide
   - Record a melody over the bass
<div data-evolver-panel data-knobs="knob-osc-level:50,knob-filter-frequency:55,knob-hpf-frequency:25,knob-amp-outputpan:72" data-highlights="knob-hpf-frequency:amber,knob-amp-outputpan:amber,knob-filter-frequency:blue" data-sections="hp-filter,amp,filter"></div>

4. Listen back. The bass and lead should occupy different spaces without competing. If they clash:
   - Lower the lead's LPF Frequency slightly to remove harsh upper harmonics
   - Or raise the bass's LPF Frequency to let the lead's low mids through

### Exercise 2: Stereo Imaging (5 min)

Use the Evolver's stereo architecture to create width without muddiness.

1. Load your **PWM pad** from Session 29:
   - Set **Output Pan** = `St1` (full stereo width)
   - Set **HPF Frequency** = `35` -- remove low end to leave room for bass
   - Set **Filter Split** = `20` -- L and R filters at different cutoffs for natural stereo spread
   - Record a sustained chord or drone over your bass + lead
2. Listen to all three parts together. The mix should be:
   - **Center:** bass (mono, low)
   - **Moderate width:** lead (slight stereo, mid)
   - **Wide:** pad (full stereo, mid-high)
<div data-evolver-panel data-knobs="knob-amp-outputpan:0,knob-hpf-frequency:35,knob-filter-lrsplit:20" data-highlights="knob-amp-outputpan:amber,knob-hpf-frequency:amber,knob-filter-lrsplit:amber" data-sections="amp,hp-filter,filter"></div>

3. Evolver Output Pan options and their mix roles (DSI Manual p.19):
   - `Mono` = centered, for bass and elements that need focus
   - `St1` = full stereo (L hard left, R hard right), for pads and wide textures
   - `St2` = moderate stereo, for leads and melodic elements
   - `St3` = narrow stereo, for elements that need slight width
   - `rSt1/2/3` = reversed stereo (L goes right, R goes left)
4. Adjust the pad's level so it fills space without overwhelming the lead. Pads should be felt more than heard in a mix

### Exercise 3: Effects Send Strategy (6 min)

Decide which effects are "baked in" (part of the patch) versus added in the DAW.

1. **Baked-in effects** (Evolver's internal processing):
   - Delay: good for rhythmic character that is part of the sound's identity (e.g., dub bass, rhythmic lead)
   - Distortion: bake in when it defines the sound (acid bass, dirty lead)
   - Feedback: always bake in -- this is an Evolver-specific character
   - Rule: if removing the effect changes the sound's identity, bake it in
2. **DAW effects** (add in the mix):
   - Reverb: almost always add in the DAW. The Evolver has no reverb, and DAW reverb lets you place the sound in a consistent space with other instruments
   - EQ: use DAW EQ for surgical cuts (e.g., remove 300Hz mud, boost 3kHz presence)
   - Compression: add in the DAW for dynamics control and to glue the Evolver with other elements
3. **Practical test:** Load your acid bass. Record it with internal delay ON (Delay 1 Time = `2 Steps`, Level = `30`, Feedback 1 = `35`). Then record it with delay OFF and add DAW delay instead. Listen to both -- the Evolver delay has a unique character because Feedback 2 routes through the analog filter. Keep it baked in
4. Add DAW reverb to your lead recording (a short plate or room reverb). Notice how it places the lead in a "space" that connects it to the rest of the mix

### Exercise 4: Record a Mix-Ready Part (5 min)

Put it all together: record an Evolver part that is mix-ready from the start.

1. Choose a role for the Evolver in your song sketch:
   - **Bass:** mono output, no HPF, internal delay optional, record dry for maximum mix flexibility
   - **Lead:** moderate stereo, HPF at 20-30, internal effects to taste, DAW reverb
   - **Pad:** wide stereo, HPF at 30-40, internal delay + filter split, DAW reverb
   - **Drums:** mono or narrow stereo, HPF variable, internal delay for groove
2. Load the appropriate patch, apply the Output Pan and HPF settings for that role
3. Set your DAW tempo, arm MIDI + audio tracks
4. Record a 1-minute part, performing expressively (use all your Session 31 expression mappings)
5. Listen in context with your other audio element. Adjust Evolver level and any DAW effects to sit well
6. **This is the workflow you will use in Session 35 for the capstone composition**

## Exploration (optional, hyperfocus days)

- Record the same phrase with different Output Pan settings and A/B compare in the mix
- Try parallel processing: duplicate the Evolver audio track, add heavy distortion to the copy, blend at low volume for thickness without harshness
- Experiment with sidechain: use a kick drum to duck the Evolver pad (in the DAW) for a pumping effect

## Output Checklist

- [ ] Frequency-planned bass, lead, and pad parts recorded in separate takes
- [ ] Stereo imaging applied: bass mono, lead moderate, pad wide
- [ ] Effects strategy decided: internal effects vs. DAW effects
- [ ] Mix-ready Evolver part recorded in context with another audio element
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Frequency planning before patching prevents mix conflicts: decide where the Evolver lives in the frequency spectrum before dialing in the patch, not after
- The Evolver's Output Pan modes are a first-class mixing tool: mono for bass, full stereo for pads, moderate for leads -- set this as part of the patch, not as an afterthought
- Bake effects into the patch when they define the sound's identity (delay, distortion, feedback), but add reverb, EQ, and compression in the DAW for mix consistency

## Next Session Preview

Session 35 is the capstone: compose a short piece using the Evolver as the primary voice. You will choose a sound palette, sequence or perform parts, record, and produce a complete song sketch -- the culmination of everything you have learned across 35 sessions.
