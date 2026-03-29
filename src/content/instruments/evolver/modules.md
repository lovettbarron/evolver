---
type: modules
instrument: evolver
title: "Evolver Learning Modules"
manufacturer: "Dave Smith Instruments"
---

# Evolver Learning Modules

Structured progression from "I can turn it on" to "I reach for it when making music." Each module maps to the framework's taxonomy, adapted for the Evolver's specific architecture.

Module ordering follows Anu Kirk's pedagogical approach (oscillators before filters before modulation before sequencer) while grouping related topics into ADHD-friendly sessions of 15-30 minutes each.

## Module Map

```
Module 1: Foundations
    +---> Module 2: Analog Oscillators
         +---> Module 3: Digital Oscillators (FM, Ring Mod, Waveshapes)
         |    +---> Module 5: Modulation (LFOs, Mod Slots, Expression)
         |         +---> Module 7: Sequencer & Arpeggiator
         |         |    +---> Module 8: Sound Design Recipes
         |         |         +---> Module 10: Integration & Composition
         |         +---> Module 9: Performance & Expression
         |              +---> Module 10: Integration & Composition
         +---> Module 4: Filters & Envelopes
              +---> Module 5: Modulation
                   +---> Module 6: Effects (Delay, Distortion, Feedback)
                        +---> Module 8: Sound Design Recipes
```

**Dependency rationale**: Oscillators first (you need sound sources before shaping them). Filters and digital oscillators can be explored in either order after analog oscillators. Modulation requires understanding what it's modulating. Sequencer requires modulation concepts. Sound design recipes and integration come last because they combine everything.

## Modules Detail

### Module 1: Foundations (2 sessions, ~45 min total)

**Goal**: Navigate the instrument confidently. Save and recall programs. Understand the basic patch.

**Source**: Anu Kirk Guide p.5-8 ("Before We Start", "The Basic Patch"), DSI Manual p.1-3 ("Quick Start"), p.9-14 ("Basic Operations", "Global Parameters")

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 01 | Navigation and the basic patch | 20 min | Basic patch saved to 2 locations |
| 02 | Factory tour and favorites | 25 min | 5 favorite presets identified and noted |

**Session 01 specifics**: Program the basic patch from scratch (Anu Kirk p.7-8), learn save/recall, understand pot modes (Relative recommended), navigate banks. Output: basic patch verified and saved.

**Session 02 specifics**: Explore factory banks 1-4, understand the organization (keyboard vs sequencer vs drone vs signal processing programs per DSI Manual p.3). Identify 5 favorites to reference later.

---

### Module 2: Analog Oscillators (4 sessions, ~85 min total)

**Goal**: Understand and use all analog oscillator parameters. Create PWM and hard sync sounds.

**Source**: Anu Kirk Guide p.9-21 ("Analog Oscillators" through "Special Analog Oscillator Features"), DSI Manual p.15-16

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 03 | Waveshapes: saw, triangle, saw-tri, pulse | 20 min | Documented sound character of each shape |
| 04 | Pulse width modulation: strings and horns | 20 min | PWM strings patch saved |
| 05 | Hard sync: the classic sound | 25 min | Sync lead patch saved |
| 06 | Detuning, osc slop, and stereo layering | 20 min | Fat detuned patch saved |

**Session 03 specifics**: From basic patch, explore each Shape setting (Saw, Tri, Saw-Tri, Pulse 50) one at a time. Note the harmonic content difference. Anu Kirk exercises p.11-15 cover waveshape exploration with specific parameter values.

**Session 04 specifics**: Anu Kirk p.13-15 covers PWM in detail. Start with Pulse 50 (square wave), modulate PW with LFO for classic string/horn sounds. The pulse width "turns off at the two extremes" (DSI Manual p.15) -- interesting modulation territory.

**Session 05 specifics**: Enable Sync 2->1 (Anu Kirk p.17-19). Sweep Osc 1 frequency while synced to hear the classic hard sync tone. Create a sync lead by using the filter envelope to sweep Osc 1 pitch.

**Session 06 specifics**: Anu Kirk p.16-17 covers detuning. Fine-tune Osc 2 against Osc 1 for beating/chorus. Use Osc Slop (0-5) for analog drift character. Layer analog + digital at different levels for stereo width.

---

### Module 3: Digital Oscillators (4 sessions, ~90 min total)

**Goal**: Use digital waveshapes, FM synthesis, and ring modulation to create complex timbres.

**Source**: Anu Kirk Guide p.22-36 ("Digital Oscillators"), DSI Manual p.16-17

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 07 | Exploring waveshapes 1-96 | 20 min | Top 10 favorite waveshapes noted |
| 08 | FM synthesis basics | 25 min | FM bell/metallic patch saved |
| 09 | Ring modulation | 20 min | Ring mod texture patch saved |
| 10 | Analog plus digital combinations | 25 min | Hybrid layered patch saved |

**Session 07 specifics**: Anu Kirk p.22-25 ("Exploring the Digital Difference"). Waveshapes 1-95 from Prophet-VS lineage, 96 is Evolver-unique, 97-128 are user-loadable. "Get quite trashy at higher frequencies" (DSI Manual p.16). Methodically scan through waveshapes, note favorites.

**Session 08 specifics**: Anu Kirk p.26-32 covers FM synthesis in depth with multiple exercises. FM 4->3 and FM 3->4 can both be active simultaneously. Start with one direction, build to bidirectional. Classic FM bell: high FM amount, fast envelope decay.

**Session 09 specifics**: Anu Kirk p.33-35 covers ring modulation. Similar to FM but produces sum and difference frequencies. "If the Ring Mod amount is turned up, you will get output from the Oscillator even if the Oscillator Level is set to zero" (DSI Manual p.16). Good for metallic/inharmonic textures.

**Session 10 specifics**: Anu Kirk p.36 final digital tips. Combine analog warmth (Saw/Pulse from Osc 1-2) with digital complexity (waveshapes/FM from Osc 3-4). Shape Seq feature allows waveshape changes per sequencer step.

---

### Module 4: Filters and Envelopes (4 sessions, ~90 min total)

**Goal**: Shape sounds with filters and envelopes. Understand 2-pole vs 4-pole, self-oscillation, and stereo filter split.

**Source**: Anu Kirk Guide p.38-53 ("The VCA and Envelope 2", "The Filters"), DSI Manual p.17-19

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 11 | LPF basics: cutoff, resonance, 2/4 pole | 20 min | Filter sweep patch saved |
| 12 | Filter envelope and VCA: classic subtractive shapes | 25 min | Pluck and pad patches saved |
| 13 | Self-oscillation and audio mod | 20 min | Self-oscillating filter patch saved |
| 14 | Highpass filter and stereo split | 20 min | Split stereo filter patch saved |

**Session 11 specifics**: Anu Kirk p.42-45 covers LPF basics. From basic patch, sweep Frequency (0-164). Add Resonance. Switch between 2-pole (gentler, -12dB/oct) and 4-pole (steeper, -24dB/oct). "The filter only oscillates when in 4-pole mode" (DSI Manual FAQ p.4).

**Session 12 specifics**: Anu Kirk p.38-41 (ADSR Explained) and p.46-49 (Filter Envelope). VCA envelope shapes amplitude (ENV 2), filter envelope shapes brightness (ENV 1). Create plucks (fast A, medium D, zero S) and pads (slow A, full S, slow R). Bipolar Env Amount (-99 to +99) for inverted envelopes.

**Session 13 specifics**: Anu Kirk p.45-46 covers self-oscillation. In 4-pole mode, high resonance produces a sine tone at the filter frequency. Audio Mod (DSI Manual p.18) feeds analog oscillator into filter for audio-rate modulation -- Osc 1 modulates LPF L, Osc 2 modulates LPF R.

**Session 14 specifics**: Anu Kirk p.50-53 covers the highpass filter. Split parameter (DSI Manual p.18) separates L/R filter cutoffs. HP Pre/Post switching changes character dramatically. Combine LPF and HPF for bandpass-like effects.

---

### Module 5: Modulation (4 sessions, ~100 min total)

**Goal**: Master LFOs, mod slots, velocity, aftertouch, and mod wheel assignments. Create sounds with movement.

**Source**: Anu Kirk Guide p.68-74 ("Modulation"), DSI Manual p.21-23 ("LFOs", "Modulators")

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 15 | LFO basics: shapes, rates, destinations | 25 min | Vibrato and tremolo patches saved |
| 16 | Mod slots: flexible routing | 20 min | 2 creative mod routing patches |
| 17 | Velocity, aftertouch, mod wheel | 25 min | Expressive performance patch saved |
| 18 | Complex modulation: stacking sources | 30 min | Evolving texture patch saved |

**Session 15 specifics**: Anu Kirk p.70-71 covers LFOs. Each LFO has: Shape (Tri, RevSaw, Saw, Square, Random), Frequency (0-150 or sync), Amount, Destination, Key Sync. Classic vibrato = LFO to osc frequency. Tremolo = LFO to VCA. Above freq 90, LFO steps in semitones up to 150 (middle C) for audio-rate effects.

**Session 16 specifics**: Anu Kirk p.72-74 covers mod slots. 4 slots with any Source -> Amount -> Destination. Sources include oscillators, noise, envelope follower -- allowing audio-rate modulation. "General-purpose mod slot Sources are not filtered" (DSI Manual p.23) so response is faster but may step.

**Session 17 specifics**: MIDI controller routing via Misc Params (DSI Manual p.23-24). Velocity Amount/Destination for dynamic response. Pressure (aftertouch) for expressive control. Mod Wheel for performance gestures. These are "filtered/smoothed" unlike raw mod slot sources.

**Session 18 specifics**: Combine multiple modulation sources. LFO modulating filter while envelope controls LFO amount. Sequencer modulating mod slot amount. Layer velocity sensitivity on top. Create sounds that evolve over time with subtle complexity.

---

### Module 6: Effects (3 sessions, ~70 min total)

**Goal**: Use delay creatively, understand feedback and distortion, master Karplus-Strong synthesis.

**Source**: Anu Kirk Guide p.54-67 ("Let it Rip!", "The Digital Delay"), DSI Manual p.19-21

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 19 | Delay basics: time, taps, sync | 25 min | Rhythmic delay patch saved |
| 20 | Tuned feedback and Karplus-Strong | 25 min | Plucked string patch saved |
| 21 | Distortion, grunge, output hack | 20 min | Dirty lead patch saved |

**Session 19 specifics**: Anu Kirk p.58-65 covers basic and advanced delay. 3 independent taps, each with Time (0-150 or sync) and Level. Feedback 1 = delay self-feedback. Feedback 2 = delay output back to filter input. "If all three Delay taps are in use, the Levels of each should be set to lower amounts" (DSI Manual p.20). Sync delay to tempo for rhythmic effects.

**Session 20 specifics**: Anu Kirk p.55-56 (Feedback) and p.66-67 (Karplus-Strong masterclass). Tuned feedback frequency C0-C4 in semitones. Physical model technique: "Use Envelope 3 with Noise as a destination (all oscillators off). Play around with different Feedback Levels, and adjust the filter cutoff frequency" (DSI Manual p.19). Creates plucked string / marimba sounds.

**Session 21 specifics**: Anu Kirk p.54-57 covers distortion, grunge, and output hack. Distortion 0-99 with built-in noise gate. Grunge "enables nasty feedback at higher levels" (DSI Manual p.19). Output Hack 0-14 "trashes the output signal, quite rudely" (DSI Manual p.21). Pre/Post positioning changes everything.

---

### Module 7: Sequencer (5 sessions, ~120 min total)

**Goal**: Program sequences for melodies, arpeggiation, and parameter modulation. Create complete self-playing patches.

**Source**: Anu Kirk Guide p.75-94 ("The Sequencer"), DSI Manual p.27-32

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 22 | Sequencer basics: steps, destinations, triggers | 25 min | Simple 8-step melody |
| 23 | Pitch sequences: melodies and basslines | 25 min | Sequenced bassline patch |
| 24 | Parameter modulation sequences | 20 min | Rhythmic filter sequence patch |
| 25 | Rests, tempo, clock division, variable lengths | 25 min | Complex rhythmic patch |
| 26 | Multi-track sequences: 4 tracks at once | 25 min | Self-playing generative patch |

**Session 22 specifics**: Anu Kirk p.75-79 (What is it? / Parameters). 4 tracks, 16 steps each. Each track has a Destination. Trigger Select modes (DSI Manual p.24-25): Seq or Key, Seq Only, Key Only, Gated modes. Step values 0-127. Start with simple 8-step sequence to oscillator frequency.

**Session 23 specifics**: Anu Kirk p.80-86 (Traditional Step Sequencer). MIDI note to sequencer value conversion (Appendix A, p.103). Program melodic patterns by entering note values per step. Key Off/Transpose parameter affects playback range. Create a bassline with specific note values.

**Session 24 specifics**: Anu Kirk p.91-93 (Modulation Source). Route sequence to filter cutoff, delay time, LFO rate, or any other destination. Sequence values become modulation amounts. Creates rhythmic timbral changes independent of pitch.

**Session 25 specifics**: Anu Kirk p.79 and DSI Manual p.27-32. Tempo (30-250 BPM), Clock Divide settings (Half through 64trip), swing options (half swing and full swing). Step values of 126/127 create rests. Combining Clock Divide with BPM for precise timing control.

**Session 26 specifics**: Anu Kirk p.87-90 (Motif/Arpeggiator live playback). All 4 tracks running simultaneously: Track 1 = pitch, Track 2 = filter, Track 3 = another parameter, Track 4 = another. Creates self-playing patches with evolving character. "Key Gates Seq" trigger mode for keyboard-controlled sequencer playback.

---

### Module 8: Sound Design Recipes (4 sessions, ~90 min total)

**Goal**: Combine everything to build specific sound types from scratch.

**Source**: Anu Kirk Guide p.95-98 ("Making Sounds"), plus techniques from all previous chapters applied to specific sound goals.

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 27 | Bass sounds: sub, acid, FM | 25 min | 3 bass patches saved |
| 28 | Leads: sync, FM, filtered | 20 min | 3 lead patches saved |
| 29 | Pads and textures: PWM, waveshape, modulated | 25 min | 3 pad/texture patches saved |
| 30 | Drums and percussion: kick, snare, hats | 20 min | Drum patches plus drum beat sequence |

**Session 27 specifics**: Sub bass (low osc, 4-pole filter, short envelope). Acid bass (resonant filter, envelope sweep, glide). FM bass (digital osc FM for metallic low end). Each patch documented with full parameter values.

**Session 28 specifics**: Sync lead (Module 2 technique + filter envelope). FM lead (Module 3 + velocity-sensitive FM amount). Filtered lead (resonant filter sweep + mod wheel control). Performance-oriented with expression mappings.

**Session 29 specifics**: PWM pad (Module 2 technique + slow LFO). Digital waveshape pad (evolving waveshape + detuning). Complex modulated texture (multiple LFOs, mod slots, slow movement). Long attack/release envelopes.

**Session 30 specifics**: Anu Kirk p.95-98 covers drum sounds. Kick (self-oscillating filter, pitch envelope). Snare (noise + short envelope). Hats (noise + HPF + short envelope). Then combine with sequencer for a complete drum beat pattern.

---

### Module 9: Performance and Expression (2 sessions, ~45 min total)

**Goal**: Set up the Evolver for expressive live playing and MIDI control.

**Source**: Anu Kirk p.99-101 ("Using Evolver Effectively"), DSI Manual p.23-24 (Modulators, Misc Params)

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 31 | Performance mappings: wheel, pressure, pedal | 25 min | Performance-ready patch |
| 32 | External processing: using Evolver as effects | 20 min | Signal processing patch |

**Session 31 specifics**: Map mod wheel to filter cutoff, aftertouch to vibrato depth, foot controller to expression. Velocity curves 1-4 (DSI Manual p.13). Pedal routing options: FootCtrl, Breath, Expression, Volume, LpFilter (DSI Manual p.12). Create a patch that responds dynamically to playing style.

**Session 32 specifics**: Anu Kirk p.99-101 covers external input processing. Input Mode settings (Stereo, Mono Left, Mono Right, L Control + R Audio). Input Gain (0-24dB). Input Hack for destruction. Envelope Follower and Peak Hold for sidechain-style effects on external audio. Process a drum loop or guitar through Evolver.

---

### Module 10: Integration and Composition (3 sessions, ~70 min total)

**Goal**: Use the Evolver confidently in actual songs. DAW recording workflow.

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 33 | Recording workflow: MIDI plus audio in DAW | 25 min | DAW template set up |
| 34 | Evolver in a mix: frequency planning, stereo | 25 min | Evolver part recorded in a song |
| 35 | Putting it all together: compose with Evolver | 20 min | Song sketch using Evolver as primary voice |

**Session 33 specifics**: MIDI setup (DSI Manual p.36-40). SysEx for patch backup (DSI Manual p.41-45). Record MIDI + audio simultaneously for recall. Local Control On/Off for DAW use. Template with audio tracks for L/R stereo capture.

**Session 34 specifics**: Frequency planning -- Evolver excels in mid and upper-mid range with analog oscillators, can cover sub with careful filter work. Stereo field: Output Pan settings, Filter Split for stereo interest. Record an Evolver part that sits well in a mix context.

**Session 35 specifics**: Free composition session with structure. Choose a sound palette (3-5 patches from the course). Sequence a pattern or perform live. Record a complete sketch. Document the patch choices and arrangement decisions.

## Summary

- **35 sessions** total
- **~13 hours** of focused practice
- **~30+ patches** documented
- **1 song** with Evolver as primary voice

At 3-4 sessions per week (45-90 min/week), this is roughly a **9-10 week program**.

All session durations are 15-30 minutes, compliant with ADHD design constraints. Every session produces a tangible output (saved patch, documented technique, or recorded audio).
