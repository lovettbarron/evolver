---
title: 'Session 03: Project Setup & File Management'
session_number: 3
duration: 25
prerequisite: 2
output_type: technique
difficulty: beginner
tags:
  - foundations
  - projects
  - sets
  - cf-card
  - audio-pool
  - sample-organization
instrument: octatrack
reference: Elektron Manual Ch. 6-8
section: Foundations
instrument_type: instrument
---

# Session 03: Project Setup & File Management

**Objective:** Create your own Set and Project from scratch, organize samples on the CF card with a folder structure that scales, and load samples into the Flex slot list. Build the lab bench you'll use for every remaining session.

> [!tip] If you only have 5 minutes
> Press [PROJ] → NEW → name it `LEARN`. That's your project. Now copy a folder of samples into the project's audio pool from your computer. You're set up for life.

## Warm-Up (2 min)

From the previous session, the demo patterns are still in your head. Power on, press **[PLAY]** on any demo pattern, listen for 15 seconds, **[STOP]**. The point: those demos came from a *project*. We're about to make our own.

## Setup

You need: the OT, a CF card formatted FAT32 (or the factory card you've been using), a card reader on your computer, and a folder of samples (drum hits, loops, one-shots — anything in `.wav`, 16 or 24-bit, 44.1 or 48 kHz). Connect monitors. Power on.

## Exercises

### Exercise 1: Create a Set (3 min)

A **Set** is the top-level container on the CF card. It holds the Audio Pool (samples shared across projects) and one or more Projects.

1. Press **[PROJ]** to open the Project menu
2. Navigate **PROJECT > LOAD** — note the existing sets (the factory set is probably called `OCTASET` or similar)
3. To make a new set, you need to do this from a computer (the OT can create projects but not sets directly):
   - Eject the CF card and put it in your computer's reader
   - In the card root, create a folder named `LEARN` — this is your set
   - Inside `LEARN`, create a subfolder named `AUDIO` — this is the Audio Pool
   - Eject and reinsert the card into the OT
4. Press **[PROJ] > PROJECT > LOAD** — you should now see `LEARN` as a set option

<div data-octatrack-panel
  data-sections="func,nav"
  data-highlights="key-func-proj:amber,key-nav-yes:cyan"
></div>

### Exercise 2: Create a New Project Inside the Set (4 min)

1. With the `LEARN` set selected (or active), press **[PROJ]** → **PROJECT** → **NEW**
2. Name the project — call it `LAB` for our learning workspace. Use the arrow keys + **[YES]** to enter characters
3. Confirm with **[YES]**. The OT creates an empty project: 16 patterns × 4 banks = 64 empty patterns, no samples assigned, no machines configured
4. Press **[FUNC] + [PROJ]** to save. Get in the habit — save after every meaningful change
5. Press **[PROJ] > PROJECT > LOAD** to confirm `LAB` is selectable. Loading projects swaps the entire workspace

### Exercise 3: Organize the CF Card from Your Computer (5 min)

A messy Audio Pool kills momentum. Build folders that match how you'll think.

1. Eject the CF card. On your computer, navigate to `LEARN/AUDIO/`
2. Create subfolders:
   - `drums/kicks`
   - `drums/snares`
   - `drums/hats`
   - `drums/percussion`
   - `loops/breaks`
   - `loops/tops`
   - `bass/`
   - `synths/`
   - `textures/`
   - `vocal/`
3. Drop your `.wav` files into the appropriate folders. Aim for 5-10 samples per folder to start — restraint, not abundance
4. Eject the card from your computer, reinsert into the OT, power on, **[PROJ] > PROJECT > LOAD > LAB**

### Exercise 4: Load Samples into the Flex Slot List (6 min)

The **Audio Pool** is the shared library on the card. The **Flex slot list** is per-project — samples live in RAM ready to play.

1. Press **[TRACK 1]**, then **[SRC]** to see the Source page
2. Make sure machine is FLEX (if not, **[FUNC] + [SRC]**, set MACH to `FLEX`)
3. Turn **Data Entry knob A** clockwise — the SLOT field highlights. Press **[YES]** to open Quick Assign
4. Browse to `AUDIO/drums/kicks/` — pick a kick. Press **[YES]**
5. The sample loads into Flex slot 1 and is assigned to Track 1
6. Now load slot 2: turn knob A to advance, press **[YES]**, browse to a snare
7. Repeat for slots 3-8: hat, percussion, break loop, bass note, synth one-shot, texture
8. The Flex slot list now has 8 samples. They're available to ANY track that selects FLEX as its machine
9. Place a trigger: **[RECORD]**, **[TRIG 1]**, **[PLAY]** — your kick plays on beat 1

### Exercise 5: Audio Pool vs. Project-Local — The One Distinction That Matters (3 min)

1. Press **[FUNC] + [TRACK 1]** while the SRC page is open to enter the SRC SETUP
2. Look at the SLOT TYPE: it's likely set to `FLEX` (which means RAM-loaded from the project's flex list)
3. The project-local flex list IS your project — those 8 samples are saved into `LAB/`
4. The Audio Pool is the *source* — same samples can feed many projects. The flex list is a *snapshot* of which Audio Pool samples this project pulled
5. If you delete a sample from the CF card later, projects that loaded it will show "MISSING SAMPLE" — keep the Audio Pool stable once projects depend on it
6. Press **[FUNC] + [PROJ]** to save the project with your loaded slots

## Exploration (if time allows)

- Press **[PROJ] > PROJECT > SAVE AS** to fork the project. Now you have `LAB` and `LAB2` — try ideas in `LAB2` without touching `LAB`
- Browse to `AUDIO/loops/breaks/` and load a long break loop into Flex slot 9. Trigger it. Hear how Flex handles a longer sample (RAM-fast, instant)
- Look at the project file structure on your computer: `LEARN/LAB/` contains `project.work`, `project.strd`, and a `samples/` folder. The .work file is your in-progress state — never edit it manually

## Output Checklist

- [ ] I created a `LEARN` Set on the CF card
- [ ] I created a `LAB` Project inside the Set
- [ ] I organized samples into a folder hierarchy (`drums/`, `loops/`, `bass/`, etc.)
- [ ] I loaded at least 8 samples into the Flex slot list
- [ ] I saved the Project with **[FUNC] + [PROJ]**
- [ ] I can articulate the difference between the Audio Pool and the project's Flex slot list

## Key Takeaways

- **Set > Project > Pattern** is the file hierarchy. Sets contain projects, projects contain patterns
- The **Audio Pool** (`AUDIO/` folder) is shared across projects on the same set. Build it once, reuse forever
- The **Flex slot list** is per-project — it's the RAM cache of which Audio Pool samples this project uses
- **Save the project** with **[FUNC] + [PROJ]** any time you load samples or change structural settings — auto-save is not a thing on the OT

## Next Session Preview

Next: dive deeper into loading and assigning samples — Quick Assign vs. SRC Setup, the difference between Flex (RAM, 80 MB) and Static (streamed, up to 2 GB), and how to swap samples between tracks on the fly.
