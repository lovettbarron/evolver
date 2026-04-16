---
type: modules
instrument: octatrack
title: "Octatrack MKII Learning Modules"
manufacturer: "Elektron"
---

# Octatrack MKII Learning Modules

## Module Dependency Graph

```
Module 1: Foundations
    │
    ├──→ Module 2: Sample Management
    │        │
    │        ├──→ Module 3: Machines & Playback
    │        │        │
    │        │        ├──→ Module 4: Effects
    │        │        │        │
    │        │        │        └──→ Module 5: Sequencer Deep Dive
    │        │        │                 │
    │        │        │                 ├──→ Module 6: Modulation & LFOs
    │        │        │                 │
    │        │        │                 └──→ Module 7: Scenes & Crossfader
    │        │        │                          │
    │        │        └──────────────────→ Module 8: Parts & Pattern Workflow
    │        │                                   │
    │        └──→ Module 9: Live Sampling & Looping
    │                                            │
    └────────────────────────────────────→ Module 10: Songwriting & Arrangement
```

## Module Adaptations from Framework Taxonomy

The universal framework maps to the Octatrack like this:

| Framework Module | Octatrack Adaptation | Why |
|---|---|---|
| 1. Foundations | Foundations | Same: navigation, saving, known state |
| 2. Sound Sources | Sample Management + Machines | OT's "oscillators" are samples and machines |
| 3. Sound Shaping | Effects | OT shapes sound through its FX chain, not filters |
| 4. Envelopes | Part of Machines & Playback | AMP envelope is simpler, tied to playback |
| 5. Modulation | Modulation & LFOs | Similar: LFOs modulate track parameters |
| 6. Effects | (merged into Sound Shaping) | -- |
| 7. Sequencer/Arp | Sequencer Deep Dive | Massively expanded: p-locks, conditional trigs, micro timing |
| 8. Sound Design | Scenes & Crossfader + Parts | OT's "sound design" is combining all systems |
| 9. Performance | Live Sampling & Looping | OT's unique strength: pickup machines, live recording |
| 10. Integration | Songwriting & Arrangement | Arranger, MIDI sequencer, DAW, composition |

---

## Module 1: Foundations (3 sessions, ~65 min total)

**Goal**: Navigate the Octatrack confidently. Create a project, load a sample, hear sound. Save and recall states.

**Source**: Elektron Manual Ch. 1-8, Merlin Ch. 1-3

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 01 | Orientation & first sound | 20 min | Basic project saved |
| 02 | Demo patterns & factory tour | 20 min | 5 favorite demo patterns noted |
| 03 | Project setup & file management | 25 min | Personal project with organized sample folders |

**Session specifics:**
- **01**: Power on, understand the screen, select tracks, load the demo set, trigger a sample manually. Save the basic project. Establish the `[FUNC] + [CUE]` Part reload habit.
- **02**: Play through demo patterns. Use crossfader to feel scenes. Mute/unmute tracks to understand the 8-track structure. Note which patterns inspire you.
- **03**: Create your own set and project from scratch. Organize samples on the CF card (drums/, loops/, textures/). Load samples into the Flex slot list. Understand the Audio Pool vs. project-local samples.

---

## Module 2: Sample Management (3 sessions, ~70 min total)

**Goal**: Load, edit, slice, and organize samples fluently. Understand the sample slot list as the foundation of everything.

**Source**: Elektron Manual Ch. 8, 13; Merlin Ch. 2-3

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 04 | Loading & assigning samples | 20 min | 8 samples loaded across flex slots |
| 05 | Audio editor: trim, loop, attributes | 25 min | 3 samples trimmed and loop-pointed |
| 06 | Slicing & slice playback | 25 min | 1 drum loop sliced into 16 hits |

**Session specifics:**
- **04**: Load samples from CF card to Flex and Static lists. Assign samples to machines via Quick Assign and SRC Setup. Understand Flex (RAM, 80 MB) vs. Static (streamed, up to 2 GB). Swap samples between tracks.
- **05**: Open the Audio Editor (AED). Set start/end points. Define loop points. Set loop mode (off, loop, ping-pong). Adjust GAIN attribute to normalize volumes across samples. Save edits back to sample slot.
- **06**: Slice a drum loop into 16 slices using the Slice menu. Set the flex machine to use slices (SRC Setup > SLICE = ON). Use the START parameter to select which slice plays. Understand that slices + sample locks = any slice on any step.

---

## Module 3: Machines & Playback (3 sessions, ~70 min total)

**Goal**: Master the five machine types and understand when to use each. Control sample playback with precision.

**Source**: Elektron Manual Ch. 11, Appendix A; Merlin Ch. 4

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 07 | Flex & Static machines deep dive | 25 min | Pattern using both Flex and Static machines |
| 08 | Thru & Neighbor machines | 20 min | External synth processed through OT effects |
| 09 | Pickup machines: your first loop | 25 min | 4-bar loop recorded and playing back |

**Session specifics:**
- **07**: Compare Flex and Static machines side by side. Load the same sample as both. Hear the difference (Flex: instant, glitch-free sample swaps; Static: longer samples, slight load time). Use a Static machine for a long backing track while Flex machines handle drums.
- **08**: Set Track 1 to Thru machine. Route Input A/B through it. Add effects. Set Track 2 to Neighbor. Chain more effects. This turns the OT into a real-time effects processor for external gear.
- **09**: Set a track to Pickup machine. Connect an external source (synth, guitar, mic). Record a 4-bar loop. Overdub on top. Use the sequencer to sync the pickup. This is the OT's looper mode -- practice the record/overdub/stop gesture until it is muscle memory.

---

## Module 4: Effects (3 sessions, ~75 min total)

**Goal**: Know every effect type. Build effect chains that enhance your sound without muddying it. Use FX musically.

**Source**: Elektron Manual Ch. 11.4.10, Appendix B; Merlin Ch. 5

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 10 | Filters & EQ (Multi Mode, Parametric, DJ Kill) | 25 min | Pattern with sculpted drum mix |
| 11 | Time-based FX (Delay, Reverb, Chorus, Phaser, Flanger) | 25 min | Dub-style delay pattern |
| 12 | Character FX (Lo-Fi, Compressor, Comb Filter, Spatializer) | 25 min | Lo-fi beat with compressed drums |

**Session specifics:**
- **10**: The 12/24dB Multi Mode Filter is the workhorse -- LP, HP, BP, BR modes. Parametric EQ for surgical cuts. DJ Kill EQ for performance. Apply filter to a drum loop, automate cutoff via a trig on the FX1 page.
- **11**: Echo Freeze Delay is the OT's signature effect. Set time to sync, feedback to taste. Try "freezing" the delay buffer (it captures and loops whatever is in the delay). Gatebox Plate Reverb and Spring Reverb for space. Dark Reverb for atmosphere.
- **12**: Lo-Fi Collection degrades audio beautifully (bit reduction, sample rate reduction). Dynamix Compressor glues drums together. Comb Filter creates metallic resonances. Spatializer for stereo width. Build a lo-fi beat from scratch.

**Effects Reference (FX1 and FX2 per track):**

| Effect | Type | Key Use |
|--------|------|---------|
| None | -- | Bypass |
| 12/24dB Multi Mode Filter | Filter | Frequency sculpting, sweeps |
| 2-Band Parametric EQ | EQ | Surgical frequency control |
| DJ Style Kill EQ | EQ | Performance kills (low/mid/high) |
| 2-10 Stage Phaser | Modulation | Movement, sweep |
| Flanger | Modulation | Metallic sweep, jet effect |
| 2-10 Tap Chorus | Modulation | Width, thickening |
| Spatializer | Stereo | Stereo image, panning |
| Comb Filter | Filter | Metallic resonance, tuned feedback |
| Dynamix Compressor | Dynamics | Glue, punch, sidechain-style pumping |
| Lo-Fi Collection | Degradation | Bit crush, sample rate reduction, vinyl |
| Echo Freeze Delay | Delay | Dub delay, buffer freeze, repeater |
| Gatebox Plate Reverb | Reverb | Lush plate reverb |
| Spring Reverb | Reverb | Classic spring character |
| Dark Reverb | Reverb | Dense, dark atmospheric reverb |

---

## Module 5: Sequencer Deep Dive (4 sessions, ~90 min total)

**Goal**: Use the sequencer as a compositional tool, not just a trigger grid. Master parameter locks, conditional trigs, and micro timing.

**Source**: Elektron Manual Ch. 12; Merlin Ch. 4 (parameter locks)

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 13 | Grid & live recording, trig types | 20 min | 8-track beat with all trig types |
| 14 | Parameter locks & sample locks | 25 min | Melodic sequence using p-locks |
| 15 | Conditional trigs & fill mode | 20 min | Evolving pattern that never repeats the same way |
| 16 | Micro timing, slide trigs, scale settings | 25 min | Swung, humanized groove |

**Session specifics:**
- **13**: Grid Recording (step entry) vs. Live Recording (real-time). Trig types: sample trigs, note trigs, lock trigs, trigless trigs, one-shot trigs, swing trigs, slide trigs. Place each type and hear the difference.
- **14**: Parameter locks let you change ANY parameter on a single step. Lock the filter cutoff on step 5. Lock a different sample on step 9 (sample lock). Lock pitch on individual steps to create a melody from a single-note sample. This is the OT's most powerful compositional feature.
- **15**: Conditional trigs make patterns generative. 1:2 = every 2nd loop. 50% = random chance. PRE = only if previous trig played. FILL = only during fills. Combine them for patterns that evolve over 32, 64, or more loops.
- **16**: Micro timing shifts individual trigs off the grid by up to 23/384th of a step in either direction. Slide trigs glide parameters smoothly between steps. Scale settings: change pattern length per track (polymetric), set time signature, change tempo per pattern.

---

## Module 6: Modulation & LFOs (2 sessions, ~45 min total)

**Goal**: Add movement and life to static patterns. Use LFOs as compositional tools.

**Source**: Elektron Manual Ch. 11.4.7-11.4.9

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 17 | LFO basics: 3 LFOs per track | 20 min | Wobbling filter bass pattern |
| 18 | LFO Designer & advanced modulation | 25 min | Custom LFO shape driving sample start |

**Session specifics:**
- **17**: Each track has 3 LFOs. Each can target any track parameter. Set LFO1 to modulate filter frequency for a classic wobble. Set LFO2 to modulate panning for stereo movement. Sync LFO speed to the sequencer tempo. Try free-running vs. trig-synced modes.
- **18**: The LFO Designer lets you draw a 16-step custom LFO waveshape. Draw a shape, assign it to sample START position -- the LFO now scrubs through the sample. Assign it to volume for custom tremolo patterns. Combine LFO Designer with parameter locks for deeply evolving textures.

---

## Module 7: Scenes & Crossfader (3 sessions, ~70 min total)

**Goal**: Build scenes that transform your mix in real-time. Use the crossfader as your primary performance tool.

**Source**: Elektron Manual Ch. 10.3; Merlin Ch. 6

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 19 | Scene fundamentals: assign, fade, mute | 25 min | 2 scenes: clean mix and "destroyed" variant |
| 20 | XVOL, XLEV, and mix scenes | 20 min | Performance mix using scenes for all fading |
| 21 | Scene stacking for smooth progressions | 25 min | 8-scene progression for a live set section |

**Session specifics:**
- **19**: Hold [SCENE A/B] + [TRIG] to assign scenes. Set up Scene A (muted) with default. Set up Scene B with filter sweeps, increased delay feedback, lo-fi degradation. Move the crossfader slowly and hear the transformation. Mute/unmute scenes for instant jumps.
- **20**: XLEV (post-FX track volume in scenes) and XVOL (pre-FX amp volume in scenes) are the secret to smooth, professional-sounding mixes. Build a scene that fades in tracks gradually using XLEV. Build another that fades out tracks using XVOL (letting reverb tails ring). Practice crossfader gestures.
- **21**: Scene stacking from the Merlin guide: build scenes 1-8 on the left side and 9-16 on the right. Each scene adds incremental changes on top of the previous. Moving through scenes creates a smooth escalation. This is how you build tension and release in a live set.

---

## Module 8: Parts & Pattern Workflow (3 sessions, ~75 min total)

**Goal**: Use Parts to build song sections. Chain patterns into arrangements. Understand the Parts/Patterns relationship deeply.

**Source**: Elektron Manual Ch. 10.1-10.2, 12; Merlin Ch. 7

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 22 | Parts deep dive: save, reload, copy | 25 min | 2 Parts: verse and chorus, sharing one pattern |
| 23 | Multiple patterns, one Part (variations) | 25 min | 4 pattern variations (intro/verse/chorus/break) |
| 24 | Multiple Parts for radical transitions | 25 min | Bank A: full song structure with 2 Parts |

**Session specifics:**
- **22**: Understand what Parts store (machines, effects, scenes, volumes) vs. what Patterns store (triggers, parameter locks). Save Part 1. Copy to Part 2. In Part 2, swap out the bass sample for something aggressive, change the hi-hat effects. Now two completely different sounds sharing the same trigger patterns.
- **23**: Start with a pattern on A01, Part 1 saved. Copy the pattern to A02, A03, A04. All share Part 1 -- same machines, effects, scenes. But each pattern has different triggers and p-locks. A01 = intro (sparse triggers), A02 = verse (full beat), A03 = chorus (added melodic elements), A04 = break (stripped back, fills). Chain them: PTN + A02 queues the next pattern.
- **24**: Combine lessons. Part 1 = verse sound (clean drums, subtle reverb). Part 2 = chorus sound (distorted drums, aggressive filter). Pattern A01-A04 use Part 1. Pattern A05-A08 use Part 2. Build transitions between Parts using scenes. This is a complete song in one bank.

---

## Module 9: Live Sampling & Looping (4 sessions, ~95 min total)

**Goal**: Record, loop, and improvise with live audio. Turn the OT into a live looper and real-time remix machine.

**Source**: Elektron Manual Ch. 9, 17; Merlin Ch. 9

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 25 | Track recorder basics: capture external audio | 25 min | Recorded and sliced live input |
| 26 | Pickup machine mastery: loop, overdub, multiply | 25 min | Multi-layered live loop |
| 27 | Live resampling: recording internal audio | 20 min | Resampled and mangled OT output |
| 28 | Improvisation workflow: combining it all | 25 min | 15-min improvised performance recorded |

**Session specifics:**
- **25**: Set up a track recorder to record Input A/B. Use sequencer trigs to trigger recording (quantized, perfectly timed). Play back the captured audio immediately via the flex machine. Slice the recording. Try one-shot recorder trigs for "capture once" workflows. This is the foundation of live sampling.
- **26**: Set up Master and Slave Pickup machines. Record a first loop on the Master (this sets the loop length). Overdub on the Master. Record complementary material on a Slave (syncs to Master's length). Practice the record/play/overdub cycle: `[TRACK] + [REC]` to record, again to stop, `[PLAY]` to play. Multiply the loop (double the length while adding new material).
- **27**: Set a track recorder source to MAIN (the main output) or another track. Record your own pattern output. Now you have a sample of your own performance that you can slice, p-lock, and mangle. This is live resampling -- the OT eating its own output.
- **28**: Combine everything: Start with empty patterns. Loop a drum pattern on a Pickup machine. Sample a synth phrase via track recorder. Slice it. Build a sequence using p-locks. Add effects. Use scenes to morph. Chain patterns to build structure. Record the whole improvisation. This session is the "graduation exercise" for live performance skills.

---

## Module 10: Songwriting & Arrangement (3 sessions, ~75 min total)

**Goal**: Compose complete songs using the OT. Use the Arranger for long-form structure. Integrate with external gear and DAW.

**Source**: Elektron Manual Ch. 14, 15, 16

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 29 | The Arranger: sequencing patterns into songs | 25 min | Complete arrangement of a 3-minute piece |
| 30 | MIDI sequencer: controlling external gear | 25 min | OT driving an external synth + drum machine |
| 31 | Composition workflow: from idea to finished piece | 25 min | Documented composition using all OT systems |

**Session specifics:**
- **29**: The Arranger chains patterns into a linear song. Press [ARR] to enter Arranger mode. Add rows: each row specifies a pattern, repeat count, length, and tempo. Build a song structure: intro (A01 x2) → verse (A02 x4) → chorus (A05 x4) → verse (A03 x4) → chorus (A06 x4) → outro (A04 x2). Save the arrangement. Press [FUNC] + [ARR] to toggle arrangement mode on/off.
- **30**: The 8 MIDI tracks sequence external gear. Each MIDI track sends notes, CCs, and program changes. Set up a MIDI track to control an external synth: note page for melody, CC page for filter automation, arpeggiator for rhythmic patterns. The OT becomes the brain of your setup -- audio sampling + MIDI sequencing in one box.
- **31**: Bring everything together for a documented composition. Start with an idea (a sample, a loop, a melody). Build a drum pattern. Add bass using p-locked pitch on a single sample. Layer textures via live sampling. Create verse/chorus using Parts. Build transitions with scenes. Arrange into a song. Document the composition as a patch file with sample list, pattern descriptions, and performance notes.

---

## Summary

| Module | Sessions | Total Time | Focus |
|--------|----------|------------|-------|
| 1. Foundations | 01-03 | ~65 min | Navigation, project setup |
| 2. Sample Management | 04-06 | ~70 min | Loading, editing, slicing samples |
| 3. Machines & Playback | 07-09 | ~70 min | Machine types, first loop |
| 4. Effects | 10-12 | ~75 min | FX chain, per-track processing |
| 5. Sequencer Deep Dive | 13-16 | ~90 min | P-locks, conditional trigs, micro timing |
| 6. Modulation & LFOs | 17-18 | ~45 min | LFOs, LFO Designer |
| 7. Scenes & Crossfader | 19-21 | ~70 min | Performance crossfader, scene stacking |
| 8. Parts & Pattern Workflow | 22-24 | ~75 min | Song structure, Part transitions |
| 9. Live Sampling & Looping | 25-28 | ~95 min | Pickup machines, live recording, improv |
| 10. Songwriting & Arrangement | 29-31 | ~75 min | Arranger, MIDI, composition workflow |
| **Total** | **31 sessions** | **~730 min (~12.2 hours)** | **8-10 weeks at 3-4 sessions/week** |

## Recommended Session Order

The sessions are numbered sequentially and should be followed in order, with one exception: **Module 9 (Live Sampling & Looping) can be started after Module 3** if you're eager to loop. The pickup machine (Session 09) is introduced in Module 3 specifically to enable this. Modules 4-8 deepen your toolkit, but live looping is accessible early.

For a songwriter who wants to compose ASAP:
- Modules 1-3 (Foundations → first loop): 9 sessions, ~3.5 hours
- Module 8 (Parts & Patterns for song sections): 3 sessions, ~1.25 hours
- Module 10 (Arranger for song structure): 3 sessions, ~1.25 hours
- Then backfill Modules 4-7, 9 for depth
