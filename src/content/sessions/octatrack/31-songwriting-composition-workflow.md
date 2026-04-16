---
title: "Session 31: Composition Workflow — From Idea to Finished Piece"
module: "Songwriting & Arrangement"
session_number: 31
duration: 25
prerequisite: 30
output_type: composition
difficulty: advanced
tags: [composition, songwriting, workflow, arrangement, documentation, capstone]
instrument: octatrack
reference: "Elektron Manual Ch. 9, 10, 12, 14, 15"
---

# Session 31: Composition Workflow — From Idea to Finished Piece

**Objective:** Compose a documented piece using the full Octatrack toolkit: samples, machines, effects, parameter locks, scenes, parts, and the arranger. Document the piece so you can reproduce and evolve it.

> [!tip] If you only have 5 minutes
> Open a new pattern. Load a drum loop on Track 1, a bass sample on Track 2, a pad on Track 3. Grid-record basic triggers. Save the Part. You have the seed of a composition. Come back later to grow it.

## Warm-Up (2 min)

Listen to something that inspires you for 90 seconds. Not Octatrack music -- anything. A song, a field recording, a podcast intro. Ask: what is the **feeling** of this? What is the **rhythm**? What is the **texture**? This is what you are trying to capture in your composition. Close your eyes and hold that feeling.

## Setup

Start from a clean project (or a clean bank within an existing project). Have your sample library organized on the CF card. If you have external instruments, connect them to Input A/B.

This session uses a **5-phase workflow** designed for ADHD-friendly composition. Each phase has a clear goal and a clear end point. You do not need to complete all 5 phases in one session -- save your project and return.

## The 5-Phase Composition Workflow

### Phase 1: The Seed (5 min)

**Goal**: Find the core musical idea. One sound, one rhythm, one texture.

1. Browse your sample library. Load 3-5 interesting samples into the Flex slot list
2. Assign them to Tracks 1-4
3. Place a few triggers on Track 1 -- just enough to hear a rhythm
4. Listen. Turn one knob -- pitch, filter, start point. Does something click? Does a particular sound or rhythm grab you?
5. When something feels right, **stop**. That is the seed. Save the Part immediately

**Constraint**: Do not spend more than 5 minutes on this phase. The first idea that excites you is the seed. Do not search for a "better" one.

### Phase 2: The Groove (5 min)

**Goal**: Build a 1-pattern groove around the seed.

1. **Drums**: Program a beat on Track 1. Use parameter locks to vary velocity and pitch across steps. Add conditional trigs (1:2, 1:4) for variation
2. **Bass/Melodic**: On Track 2, p-lock the pitch parameter to create a bassline from a single sample. Use STRT p-locks to play different sections of a longer sample
3. **Texture**: On Track 3, load an atmospheric sample (pad, field recording, noise). Set it to loop. Reduce the volume. Add reverb on FX1
4. **Space**: Leave Tracks 5-8 empty for now. Resist the urge to fill every track
5. Press [PLAY] and listen to the full pattern for 2 minutes. Mute/unmute to find the best combination

**Save the Part** after this phase.

### Phase 3: The Palette (5 min)

**Goal**: Create the timbral range for the song using Parts and effects.

1. **Part 1** = your current sound (verse). Save it
2. **Copy Part 1 to Part 2**: [PART] menu > Copy > Part 2
3. **Switch to Part 2**: Select it in the Part menu
4. **Transform Part 2** (chorus):
   - Swap the drum sample on Track 1 for something bigger
   - Add more aggressive effects (filter sweep, lo-fi, compressor)
   - Change the reverb character (Dark Reverb → Plate Reverb)
   - Build 2 scenes: Scene B = maximum intensity, Scene A (muted) = default
5. Save Part 2

Now you have two timbral palettes. The verse world (Part 1) and the chorus world (Part 2). Pattern triggers can stay similar or diverge.

### Phase 4: The Structure (5 min)

**Goal**: Build the song structure using patterns and the Arranger.

1. **Copy the pattern** to create variations:
   - A01 = Intro (sparse triggers from Part 1)
   - A02 = Verse (full groove, Part 1)
   - A03 = Chorus (full groove, Part 2 -- switch Part in the Part menu while on A03)
   - A04 = Bridge/Break (stripped down, maybe just texture + bass, Part 1)
   - A05 = Outro (A01 variation, fade out via scene)
2. **Build the Arrangement**: Press [ARR] > EDIT
   - Row 1: A01 x2 (intro)
   - Row 2: A02 x4 (verse 1)
   - Row 3: A03 x4 (chorus 1)
   - Row 4: A02 x4 (verse 2, maybe add a fill pattern)
   - Row 5: A03 x4 (chorus 2)
   - Row 6: A04 x2 (bridge)
   - Row 7: A03 x4 (final chorus)
   - Row 8: A05 x2 (outro)
3. **Save** the arrangement

### Phase 5: The Polish (3 min)

**Goal**: Listen, refine, document.

1. Enable Arrangement mode (**[FUNC] + [ARR]**)
2. Press **[PLAY]** and listen to the full arrangement without touching anything
3. Note what works and what doesn't:
   - Transitions too abrupt? Insert a transition pattern
   - Section too long? Reduce repeats
   - Mix imbalanced? Adjust track volumes in the Part
4. Make at most 3 changes (resist the urge to keep tweaking)
5. Save everything: Part, Project

## Documentation

After completing the composition (or reaching a good stopping point), create a patch document:

```markdown
# [Composition Name]

**Date**: YYYY-MM-DD
**BPM**: XX
**Project**: [project name] / Bank [X]

## Sample List
- Track 1: [sample name] (drums) — Flex slot XX
- Track 2: [sample name] (bass) — Flex slot XX
- Track 3: [sample name] (texture) — Flex slot XX

## Pattern Map
- A01: Intro (Part 1, 4 bars, sparse)
- A02: Verse (Part 1, 4 bars, full groove)
- A03: Chorus (Part 2, 4 bars, aggressive)
- A04: Bridge (Part 1, 4 bars, stripped)
- A05: Outro (Part 1, 4 bars, fade)

## Scene Notes
- Part 1 Scene B: Filter sweep + delay feedback increase
- Part 2 Scene B: Full destruction (lo-fi + max delay + filter resonance)

## Arrangement
Row 1: A01 x2 → Row 2: A02 x4 → Row 3: A03 x4 → ...

## Performance Notes
- Crossfader builds during last 2 bars of each verse
- Mute Track 1 drums at start of bridge, bring back on beat 1 of final chorus
- [Any other performance gestures]
```

## Output Checklist

- [ ] I composed a piece with at least 3 distinct sections (intro/verse/chorus)
- [ ] I used 2 Parts for timbral contrast between sections
- [ ] I built scenes for performance transitions
- [ ] I created an Arrangement that plays the full song
- [ ] I documented the composition (samples, patterns, scenes, arrangement)

## Key Takeaways

- **5 phases keep you moving**: Seed → Groove → Palette → Structure → Polish. Each phase has a clear deliverable. Stop when it is done, not when it is perfect
- **Parts = song sections**: Part 1 for verse, Part 2 for chorus. The timbral shift is what makes sections feel different, even with similar rhythms
- **The Arranger is your song form**: Don't just jam endlessly -- commit to a structure. You can always change it later
- **Document the piece**: An undocumented composition is a lost composition. Write down what you did so future-you can reproduce, evolve, or remix it

## Course Complete

Congratulations -- you have completed the Octatrack curriculum. You can now:
- Navigate the OT's interface fluently
- Load, edit, and slice samples
- Use all five machine types
- Process audio through the effects chain
- Sequence with parameter locks, conditional trigs, and micro timing
- Modulate with LFOs and the LFO Designer
- Perform with scenes and the crossfader
- Build song structures with Parts and patterns
- Loop and sample live audio
- Compose and arrange complete pieces

The Octatrack is an instrument you will spend years exploring. These sessions give you the vocabulary -- now make music.
