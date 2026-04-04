---
title: "Session 19: Audio-Rate Modulation Mastery"
module: "Advanced Patching"
session_number: 19
duration: 25
prerequisite: 18
output_type: technique
difficulty: advanced
tags: [audio-rate, fm, ring-mod, modulation, sidebands, advanced, curriculum]
instrument: cascadia
reference: "Cascadia Manual pp. 11-18, 24-27, 35-36"
---

# Session 19: Audio-Rate Modulation Mastery

**Objective:** Explore the continuum from slow vibrato to audio-rate FM, stack multiple audio-rate modulation sources for complex evolving textures, and use the Ring Mod for classic amplitude modulation tones.

> [!tip] If you only have 5 minutes
> Set LFO RATE to ~10% and patch LFO X OUT -> VCO A FM 1 IN with FM 1 at ~15%. Play a note -- gentle vibrato. Now slowly turn RATE to maximum. Listen to the transition from wobble to buzzy sidebands. That continuum from modulation to timbre is the core of audio-rate synthesis.

## What Happens When Modulation Reaches Audio Rate?

All modulation exists on a continuum. At **sub-audio rates** (below ~20Hz), modulation creates rhythmic movement you can count: vibrato, tremolo, filter wobble. As the rate increases through ~20Hz, something fundamental changes -- individual cycles blur together and your ear begins perceiving the modulation as **timbral change** rather than rhythmic movement.

At audio rates (20Hz+), the modulation source generates **sidebands** -- new frequencies that appear at the sum and difference of the carrier and modulator frequencies. A 440Hz tone modulated by a 100Hz signal produces new frequencies at 540Hz and 340Hz. These sidebands are what make FM synthesis and ring modulation sound metallic, bell-like, or clangorous.

The transition zone (~15-50Hz) is musically interesting: too fast for your ear to track individual cycles, too slow for clean sidebands. This creates a grainy, buzzy quality -- neither clean modulation nor clean FM. Many aggressive and experimental synth sounds live in this zone.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Raise VCO A INDEX to ~30% and listen to the FM bell tone (VCO B -> VCO A). Return INDEX to 0%. This warm-up recalls Session 16's FM chain.

## Setup

From the normalled default:
- Mixer SAW at ~60%, all other Mixer sliders at 0%
- VCO A OCTAVE at 4
- VCO A INDEX at 0%, FM 1 at 0%
- VCF FREQ at ~60%, Q at ~10%, MODE at LP4
- VCF FM 1 at ~35% (envelope on filter)
- Envelope B: Attack ~0%, Decay ~40%, Sustain ~20%, Release ~25%
- LFO RATE at ~15% (slow)

## Exercises

### Exercise 1: The Vibrato-to-FM Continuum (8 min)

This exercise requires one cable.

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | LFO X OUT | VCO A FM 1 IN | Pitch modulation from LFO | Nothing (FM 1 has no normal) |

1. Patch Cable 1: **LFO X OUT** -> **VCO A FM 1 IN**. Set VCO A FM 1 to ~15%
2. Play and hold a note. With RATE at ~15%, you should hear gentle vibrato -- the pitch wobbles slowly up and down. This is classic vibrato, musically useful and familiar
3. Slowly increase RATE to ~30%. The vibrato speeds up -- still clearly rhythmic but faster. Like a singer with an exaggerated vibrato
4. Push RATE to ~50%. The modulation is now fast enough that individual cycles start to blur. You can no longer easily count the wobbles. The sound takes on a slightly buzzy, unstable quality -- this is the transition zone
5. Continue to ~70%. The sound is now clearly grainy and textured rather than vibrato. New tonal qualities emerge as sidebands begin to form. You are hearing the modulation become part of the timbre
6. Push RATE to ~90% (near maximum, ~75Hz). The LFO is now generating audio-rate sidebands. The sound is buzzy and metallic with a rough FM character. Lower FM 1 to ~8% for a subtle audio-rate texture, or raise to ~25% for aggressive sideband generation

> [!info] Cascadia's LFOs reach approximately 75Hz at maximum rate, crossing well into audio territory. This means you can sweep continuously from sub-audio modulation through the transition zone into audio-rate FM using a single LFO and one cable. Most semi-modular LFOs top out before reaching audio rates.

7. Return RATE to ~15%. Remove Cable 1

### Exercise 2: VCO B as Sub-Audio Modulator (7 min)

This exercise uses VCO B in LFO mode as a complex modulation source for the filter.

One cable required:

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | VCO B SAW OUT | VCF FM 3 IN | VCO B saw as filter modulator | Nothing (FM 3 has no normal) |

1. Set VCO B VCO/LFO switch to **LFO**. Set VCO B OCTAVE at 4 (in LFO mode this is a relatively slow rate). Set PITCH SOURCE to PITCH B (independent from VCO A)
2. Patch Cable 1: **VCO B SAW OUT** -> **VCF FM 3 IN**. Set VCF FM 3 to ~30%
3. Play and hold a note. You should hear the filter cutoff being swept by VCO B's sawtooth wave -- a repeating ramp-up-and-reset pattern rather than the smooth triangle of the LFOs. The sawtooth gives a "rising then dropping" character to the filter sweep
4. Lower VCO B OCTAVE to 2 -- the sweep slows dramatically (remember, LFO mode is 1/1000th frequency). Each filter sweep cycle takes several seconds. Raise to 6 -- the sweep speeds up into rhythmic pulsing territory
5. Now flip VCO B VCO/LFO back to **VCO**. With OCTAVE at a low setting (2 or 3), VCO B is now at audio rate. The filter cutoff is being modulated at audio frequencies -- you should hear a throbbing, growling quality on sustained notes as sidebands form in the filter response

> [!info] Cascadia's VCO B has a VCO/LFO switch that drops its frequency by a factor of 1000. This means one oscillator covers the entire range from ~50-second cycles to full audio rate, making it an extremely versatile modulation source. Four simultaneous waveform outputs (sine, triangle, saw, square) let you choose the modulation shape.

6. Try VCO B SINE OUT instead of SAW OUT for smoother filter FM. The sine produces cleaner sidebands; the saw produces harsher, more harmonically complex modulation. Return to SAW OUT
7. Remove Cable 1. Set VCO B back to VCO mode, PITCH SOURCE to PITCH A+B

### Exercise 3: Stacked Audio-Rate Modulation (6 min)

Now combine multiple audio-rate sources for complex, evolving textures.

1. Remove all cables. Set VCO A INDEX to ~30% (VCO B sine -> VCO A FM, from Session 16). VCO B at OCTAVE 4, PITCH SOURCE PITCH A+B
2. Patch one cable: **LFO X OUT** -> **VCF FM 3 IN**. Set RATE to ~80% (near audio rate), FM 3 to ~20%
3. Play and hold a note. You should hear the FM bell tone from VCO B modulating VCO A, PLUS the audio-rate LFO modulating the filter. The two modulation sources create interacting sidebands -- the sound is complex, metallic, and evolving
4. Raise Mixer IN 1 to ~25% to blend in the Ring Mod output. Now three audio-rate interactions are happening simultaneously: VCO B -> VCO A (FM), LFO -> VCF (filter FM), and VCO A x VCO B (ring mod). The resulting timbre is dense and otherworldly
5. Slowly sweep VCF FREQ from ~30% to ~70%. The filter scans through the dense sideband spectrum, highlighting different harmonic regions. At each FREQ position, a different subset of sidebands is prominent -- the sound morphs continuously
6. Lower LFO RATE to ~40%. The filter modulation drops below audio rate and becomes a rhythmic sweep through the FM/ring mod spectrum. The combination of audio-rate FM (VCO B on VCO A) with sub-audio filter modulation (LFO on VCF) creates a sound that has both timbral complexity and rhythmic movement
7. Remove all cables. Return INDEX to 0%, IN 1 to 0%

## Exploration (optional, hyperfocus days)

- Patch VCO B SQUARE OUT -> Wave Folder FOLD MOD IN with MOD at ~40%. Audio-rate wave fold modulation creates extremely complex harmonic patterns that change with every note
- Try tuning VCO B to a musical interval from VCO A (5th = 7 semitones, octave = same OCTAVE setting). FM with musical intervals produces harmonic sidebands. Detune slightly for beating, evolving textures
- Combine audio-rate FM (VCO B -> VCO A) with envelope-controlled INDEX MOD (Envelope A on IM slider) for timbres that are complex on attack and simple during sustain

## Output Checklist

- [ ] Heard the continuous transition from vibrato through the buzzy transition zone to audio-rate FM
- [ ] Used VCO B in LFO mode as a filter modulator, then switched to VCO mode for audio-rate filter FM
- [ ] Stacked multiple audio-rate modulation sources (FM + filter FM + ring mod)
- [ ] Swept the filter through a dense sideband spectrum
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Modulation exists on a continuum: sub-audio rates create rhythmic movement, the transition zone (~15-50Hz) creates buzzy textures, and audio rates create sidebands and new frequencies
- Stacking multiple audio-rate modulation sources (oscillator FM + filter FM + ring mod) creates dense, complex timbres impossible to achieve with any single technique
- The filter becomes a "sideband scanner" when swept through a dense FM spectrum -- different cutoff positions highlight different harmonic regions of the complex timbre

## Next Session Preview

Session 20 begins **Module 7: Sound Design** -- the curriculum payoff. You will build a complete bass patch from scratch, documenting every cable and knob setting as a recipe you can recreate anytime. Every remaining session produces a named, saved patch.
