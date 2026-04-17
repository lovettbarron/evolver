---
title: 'Session 23: Multiple Patterns, One Part — Pattern Variations'
session_number: 23
duration: 25
prerequisite: 22
output_type: patch
difficulty: intermediate
tags:
  - patterns
  - variations
  - intro-verse-chorus
  - copy-pattern
  - pattern-chain
  - same-part
instrument: octatrack
reference: Elektron Manual Ch. 12
section: Parts & Pattern Workflow
instrument_type: instrument
---

# Session 23: Multiple Patterns, One Part — Pattern Variations

**Objective:** Build A01-A04 as four pattern variations all sharing Part 1: A01 = intro (sparse), A02 = verse (full beat), A03 = chorus (added melody), A04 = break (fills). Chain them manually using [PTN] + [TRIG]. The basic shape of a song using only one Part.

> [!tip] If you only have 5 minutes
> On A01, hit [FUNC] + [RECORD] (copy pattern). Navigate to A02 (press [PTN] + [TRIG 2]). Hit [FUNC] + [STOP] (paste). A02 is now a clone of A01. Add some triggers, change a few. Chain A01 → A02 by pressing [PTN] + [TRIG 2] while A01 plays.

## Warm-Up (2 min)

You learned in Session 22 that Patterns store triggers and Parts store sound. This session uses *one* Part across *four* patterns. The sound stays consistent — the triggers are what change. This is how a song gets sectional structure without sound shocks. Press [PLAY] on your current pattern. Picture: same sound, but here it has 4 hits, in the next section 16 hits, in the next section a totally different rhythmic feel.

## Setup

Start from the `LAB` project with Part 1 saved (the verse sound from Session 22). Make sure you're on **A01** (Bank A, Pattern 01) and currently using Part 1. The pattern should have a baseline groove with at least Track 1 (drums) and Track 2 (bass) active.

If you have multiple Parts saved, the OT may auto-switch when you switch patterns (Pattern → Part linkage is part of the Part Slot setting). For this session, we'll keep all four patterns linked to Part 1.

## Exercises

### Exercise 1: Set Up A01 as the Intro (3 min)

Strip A01 down to be sparse — the intro state.

1. Make sure you're on **A01**: press **[PTN]**, then **[TRIG 1]** to select Pattern 01 in Bank A
2. Make A01 minimal:
   - Track 1 (drums): keep just kicks on **[TRIG 1, 9]** (half-time feel — kick on beat 1 and 3)
   - Track 2 (bass): single trig on **[TRIG 1]** with the root note p-lock
   - Track 3 (pad): trig on **[TRIG 1]** with long sample length — let it ring
   - Track 4 (hat): empty (silent — saved for verse)
3. Press **[PLAY]**. This is your intro. Sparse, atmospheric, room to breathe
4. Save the Project: **[FUNC] + [PROJ]** → confirm

### Exercise 2: Copy A01 to A02 and Build the Verse (6 min)

Copy the pattern, then add density.

1. With A01 active, press **[FUNC] + [RECORD]** to **copy** the current pattern to clipboard. The screen shows "PATTERN COPIED" or similar
2. Navigate to A02: press **[PTN]**, then **[TRIG 2]**. The pattern queues — wait for the boundary or press [FUNC] + [TRIG 2] to switch instantly
3. Press **[FUNC] + [STOP]** to **paste** — A02 is now a clone of A01
4. Build the verse: enter Grid Recording (**[RECORD]**) and add density:
   - Track 1 (drums): add kicks on every beat (1, 5, 9, 13). Add hats on offbeats (3, 7, 11, 15). Add a snare on 5 and 13
   - Track 2 (bass): add notes on **[TRIG 1, 5, 9, 13]** with pitch p-locks (root, third, root, fifth — see Session 14)
   - Track 4 (hat): add a basic 16th-note hat pattern
5. Exit Grid Recording (**[RECORD]**)
6. Press **[PLAY]**. Hear the difference — A01 was sparse, A02 is full. Same sound design (Part 1), totally different density

<div data-octatrack-panel
  data-sections="nav,trig"
  data-highlights="key-nav-pattern:amber,key-trig-2:amber"
></div>

### Exercise 3: A03 — The Chorus (Add a Melodic Hook) (5 min)

Copy A02 to A03 and add a melodic element on top.

1. With A02 active, **[FUNC] + [RECORD]** to copy
2. Navigate to **A03** (PTN + TRIG 3), **[FUNC] + [STOP]** to paste
3. **The hook**: in Grid Recording, on Track 3 (pad), add trigs on **[TRIG 1, 5, 9, 13]** with PITCH p-locks creating a melodic motif: e.g., +0, +5, +7, +5 (a simple 4-note hook in your scale)
4. Optionally boost Track 2 LEV in this Pattern? — wait, that's a Part-level thing. Volume changes are in the Part, not the Pattern. So if you want a chorus volume boost, do it via XLEV in a Scene (Session 20)
5. Or via a single-step volume p-lock per trig (LEV is on the AMP page; hold a TRIG, raise LEV → that step's track plays louder)
6. Press **[PLAY]**. A03 is your chorus — same density as the verse, plus a melodic hook on top

### Exercise 4: A04 — The Break (5 min)

A04 is the fills/break section. Strip back, add detail.

1. **[FUNC] + [RECORD]** on A03, navigate to **A04**, paste with **[FUNC] + [STOP]**
2. Strip the drums: remove kicks except on **[TRIG 1, 9]**. Remove the snare. Keep hats
3. Add fills on Track 1 in the last bar (steps 13-16): rapid kicks, snare rolls, or use **conditional FILL trigs** (Session 15) — hold a trig, set its CONDITION to FILL, so it only fires during fill mode
4. Add a reverse texture on Track 3: hold a TRIG, **PITCH p-lock to -64** (some firmware) or set the sample to reverse playback (firmware-specific)
5. Press **[PLAY]**. A04 is the break — sparser drums, fill flourishes, ambient texture

### Exercise 5: Chain the Patterns Manually (4 min)

Walk through your song structure live.

1. Press **[STOP]**. Go back to **A01** (PTN + TRIG 1)
2. Press **[PLAY]**. A01 (intro) plays
3. After 2 bars, press **[PTN] + [TRIG 2]**. A02 queues — at the next pattern boundary, it switches. The QUEUED indicator appears on the screen
4. After 4 bars of A02 (verse), press **[PTN] + [TRIG 3]** to queue A03 (chorus). It switches at the boundary
5. After 4 bars of A03, **[PTN] + [TRIG 2]** to queue A02 (verse return)
6. After 4 bars, **[PTN] + [TRIG 3]** for chorus 2
7. After 4 bars, **[PTN] + [TRIG 4]** for the break/outro
8. **The flow**: A01 (intro) → A02 (verse) → A03 (chorus) → A02 (verse) → A03 (chorus) → A04 (break). 22 bars total
9. **Important**: The Part is unchanged across this entire chain — the *sound* stays consistent. Only the triggers change

<div data-octatrack-panel
  data-sections="nav,trig"
  data-highlights="key-nav-pattern:amber,key-trig-1:amber,key-trig-2:amber,key-trig-3:amber,key-trig-4:amber"
></div>

## Output Checklist

- [ ] A01 is a sparse intro version of the pattern
- [ ] A02 is a full verse version with added density
- [ ] A03 is the chorus with a melodic hook on top of A02's groove
- [ ] A04 is a stripped break with fills
- [ ] All 4 patterns share Part 1 (same machines, same FX, same scenes)
- [ ] I chained A01 → A02 → A03 → A02 → A03 → A04 manually using [PTN] + [TRIG]
- [ ] I saved the Project

## Key Takeaways

- **Copy a pattern**: [FUNC] + [RECORD]. **Paste**: [FUNC] + [STOP]. Standard OT clipboard verbs work everywhere
- **Pattern chaining**: [PTN] + [TRIG N] queues pattern N to play at the next pattern boundary. Tightly synced section transitions
- **One Part across many Patterns** = consistent sound, varied arrangement. The sound design stays put while the song shape develops
- **Volume changes per section** belong in scenes (XVOL/XLEV) or per-step LEV p-locks — not in the Part itself, since the Part is shared
- **Section structure A01 → A02 → A03 → A02 → A03 → A04** is the bones of a typical pop arrangement (intro/verse/chorus/verse/chorus/break) — yours to refine

## Next Session Preview

Next: multiple Parts for radical transitions. You've used one Part across four patterns — now we use Part 1 for verses (A01-A04) and Part 2 for choruses (A05-A08). Same triggers, different timbres, dramatic section contrast. Plus scene-driven transitions between Parts. A complete song in a single Bank.
