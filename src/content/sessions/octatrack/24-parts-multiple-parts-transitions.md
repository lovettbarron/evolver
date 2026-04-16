---
title: "Session 24: Multiple Parts for Radical Transitions"
module: "Parts & Pattern Workflow"
session_number: 24
duration: 25
prerequisite: 23
output_type: composition
difficulty: advanced
tags: [parts, transitions, song-structure, radical-change, multi-part, bank-structure]
instrument: octatrack
reference: "Elektron Manual Ch. 10.1-10.2, 12; Merlin Ch. 7"
---

# Session 24: Multiple Parts for Radical Transitions

**Objective:** Combine the lessons from Sessions 22-23. Part 1 = verse sound (clean drums, subtle reverb). Part 2 = chorus sound (distorted drums, aggressive filter). Patterns A01-A04 use Part 1. Patterns A05-A08 use Part 2. Build smooth transitions via scenes. The output is a complete song structure in a single Bank.

> [!tip] If you only have 5 minutes
> A01-A04 link to Part 1 (verse sound). A05-A08 link to Part 2 (chorus sound). When you switch from A04 to A05, the OT auto-loads Part 2 — radical timbre shift on the bar line. That's your chorus drop.

## Warm-Up (3 min)

Sessions 22-23 gave you Part-vs-Pattern fluency. This session puts it together for a complete song. You'll have two timbral worlds (clean verse + dirty chorus) and four patterns in each world. Eight patterns total, two Parts, one Bank. Press [PLAY] on A02 from your `LAB` project. Picture: this is the verse. Now picture the same triggers under a much bigger, more aggressive sound. That's the chorus you're about to build.

## Setup

Start from your work in Session 23: Part 1 saved with the verse sound, A01-A04 built as intro/verse/chorus/break variations. Make sure A01-A04 are all **linked to Part 1** (the OT often defaults to this — check the Pattern's part assignment in the screen).

Save the Project before starting (you're about to do extensive work): **[FUNC] + [PROJ]** → confirm.

## Exercises

### Exercise 1: Build Part 2 — The Chorus Sound (6 min)

Recall Session 22's copy-then-modify gesture. Build a much more aggressive sibling of Part 1.

1. Press **[PART]**, navigate to Part 1 (the source). Open Part operations: **[FUNC] + [PART]**, select **COPY**, confirm
2. Navigate to Part 2 (destination). **[FUNC] + [PART]**, **PASTE**, confirm
3. Switch to Part 2 (select it in the Part menu, [YES])
4. Now transform Part 2 into the chorus version:
   - **Track 1 (drums)**: open SRC. Quick-Assign a punchier/crushed kick sample. On FX1 (Multi Mode Filter), drop FREQ to 70 and boost RESONANCE to 50. On FX2, swap reverb for **Lo-Fi Collection** (bit crush + sample rate reduction)
   - **Track 2 (bass)**: SRC → bigger, fatter bass sample. FX1 with steep LP filter, FREQ 60, RES 70 — moaning resonance
   - **Track 3 (pad)**: open AMP — boost VOL by 20. FX2 reverb DECAY to 100, MIX to 80 (huge wash)
   - **Track 4 (hat)**: AMP RELEASE shorter for tighter chorus hats
5. **[FUNC] + [PART] → SAVE** to commit Part 2

### Exercise 2: Link A05-A08 to Part 2 (5 min)

Patterns are linked to a Part via the Part Slot setting. Make A05-A08 use Part 2.

1. Navigate to **A05**: press **[PTN]**, **[TRIG 5]**
2. **Copy A02 (the verse) to A05**: go back to A02, **[FUNC] + [RECORD]** to copy. Navigate to A05, **[FUNC] + [STOP]** to paste. A05 now has the verse triggers
3. Make sure A05 is linked to Part 2: in the Pattern setup screen (firmware-dependent — usually accessible via [FUNC] + [PTN] or via the Pattern menu), set the Part assignment to Part 2
4. Press **[PLAY]** on A05. The triggers are A02's verse pattern, but the *sound* is Part 2 — the chorus version. That's the timbral shift on the chorus
5. Repeat for A06, A07, A08:
   - A06 = copy of A03 (chorus melody hook), linked to Part 2 (= bigger chorus)
   - A07 = copy of A02 again, linked to Part 2 (= verse-like density with chorus sound — "chorus 2")
   - A08 = copy of A04 (break), linked to Part 2 (= dirty break)
6. Save the Project

<div data-octatrack-panel
  data-sections="func,nav"
  data-highlights="key-func-part:amber,key-nav-pattern:amber,key-nav-bank:cyan"
></div>

### Exercise 3: Build Transition Scenes Within Each Part (5 min)

The Part change at the pattern boundary will be sudden. Use scenes within each Part for smoother build-and-drop.

1. **In Part 1** (switch to it via the Part menu): with crossfader at right, build Scene B as a "build-up" — closing filters, raising delay feedback, slightly raising track levels. This Scene B prepares the listener for the chorus drop
2. Save Part 1: **[FUNC] + [PART]** → SAVE
3. **In Part 2**: with crossfader at right, build Scene B as the "destruction" — full lo-fi, max FX, walls of resonance
4. Save Part 2
5. **The performance gesture**: while playing A04 (last verse Pattern, Part 1), slowly sweep the crossfader from left to right over 2 bars. Filters close, build builds. At the bar boundary, A05 cues — Part switches automatically to Part 2. Snap the crossfader back to left, you land on Part 2 Scene A (the clean chorus baseline). The chorus drops with maximum impact

### Exercise 4: Walk the Full 8-Pattern Song (4 min)

Perform the structure end-to-end.

1. Press **[STOP]**. Navigate to **A01** (intro). Press **[PLAY]**
2. After 2 bars: **[PTN] + [TRIG 2]** queue A02. Switches at boundary — verse 1 begins (Part 1)
3. After 4 bars of verse: build the crossfader sweep (Scene B of Part 1) over the last bar
4. **[PTN] + [TRIG 5]** to queue A05 — chorus 1 begins (Part 2 auto-loads). Snap crossfader back. Drop hits
5. After 4 bars of chorus: queue A03 — wait, A03 is the verse-with-hook from Session 23 in Part 1. Or queue A02 again for verse 2. Choose your structure
6. Possible flow:
   - A01 (intro, P1) ×2 bars
   - A02 (verse 1, P1) ×4 bars
   - A05 (chorus 1, P2) ×4 bars
   - A02 (verse 2, P1) ×4 bars
   - A06 (chorus 2 with hook, P2) ×4 bars
   - A04 (break, P1) ×2 bars
   - A06 (final chorus, P2) ×4 bars
   - A08 (chorus break, P2) ×2 bars
7. **The result**: a complete song in a single Bank. Two Parts give you two timbral worlds. Eight Patterns give you the arrangement granularity

<div data-octatrack-panel
  data-sections="scene,nav,func"
  data-highlights="key-scene-a:amber,key-scene-b:amber,key-func-part:cyan"
></div>

### Exercise 5: Save Everything and Document (2 min)

The complete song needs preservation.

1. Save Part 1, Part 2, and the Project: **[FUNC] + [PART] → SAVE** for each Part, then **[FUNC] + [PROJ] → SAVE**
2. **Document** in your session notes:
   - Part 1 = "VERSE": clean drums, subtle reverb, [list any specific samples by name]
   - Part 2 = "CHORUS": crushed drums, lo-fi, big reverb wash
   - Pattern map: A01 intro, A02-A04 verse variants, A05-A08 chorus variants
   - Scene B in P1 = build-up; Scene B in P2 = destruction
3. This documentation IS the patch for this session — you can recreate or evolve the song from these notes

## Output Checklist

- [ ] Part 1 (verse sound) saved with clean drums, subtle FX
- [ ] Part 2 (chorus sound) saved with crushed drums, aggressive FX, big reverb
- [ ] Patterns A01-A04 are linked to Part 1 (verse world)
- [ ] Patterns A05-A08 are linked to Part 2 (chorus world)
- [ ] I built scenes within each Part for tension/release transitions
- [ ] I performed an end-to-end song structure walking through all 8 patterns
- [ ] I documented the song structure (Parts + Pattern map)

## Key Takeaways

- **Multi-Part songwriting** = each Part is a timbral world; each Pattern is an arrangement variant. Combine them for radical-yet-consistent song sections
- **Pattern → Part linkage** is per-Pattern: switching patterns can auto-switch Parts. This makes the chorus drop *automatic* on the bar boundary
- **Scenes within each Part** add micro-tension within sections; **Part switches** add macro-tension between sections
- **Eight patterns × two parts = 16 conceptual song-section variants** — more than most songs need. Don't fill every slot, leave room for performance choice
- **Document the song**: without notes you'll lose the structure when you reopen the project later

## Next Session Preview

Next module: Live Sampling & Looping. You've been composing with pre-loaded samples. Now we move to *live* sampling — capturing audio at the moment via track recorders (Session 25 already covered this), and going deep with Pickup machines for layered live looping (Session 26). The OT becomes a live performance instrument.
