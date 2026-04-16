---
type: basic-patch
instrument: octatrack
title: "Octatrack MKII Basic Project"
manufacturer: "Elektron"
---

# Octatrack MKII Basic Project

## Why It Matters

The Octatrack's "basic patch" is not a single sound -- it is a **basic project**: a clean, known starting state for the entire machine. Unlike a synthesizer where you zero out parameters, the OT's basic project is about having the right structure in place:

- A clean project with no leftover samples, machines, or effects
- Tracks assigned to useful default machines
- A simple sample loaded so you can hear changes immediately
- Input routing configured for your setup

This is your **lab bench** for every session. Start here, explore, and return here when lost. The Part reload function (`[FUNC] + [CUE]`) will snap you back to the last saved state.

## Creating the Basic Project

### Step 1: Create a New Set and Project

1. Power on with a formatted CF card inserted
2. Press **[PROJ]** to open the Project menu
3. Navigate to **PROJECT > NEW** and confirm with **[YES]**
4. Name it `LEARN` (or whatever you prefer)
5. The OT creates a clean project: all tracks empty, no samples loaded, no effects

### Step 2: Load a Simple Sample

You need at least one sound to work with. The OT comes with demo content, or load your own.

1. Press **[TRACK]** key for Track 1 to select it
2. Press **[SRC]** (Track Parameter) to open the source page
3. You should see `FLEX` as the machine type (default). If not, press **[FUNC] + [SRC]** to enter SRC SETUP, set MACH to FLEX
4. Turn **Data Entry knob A** to open the Quick Assign menu
5. Navigate to a simple drum loop or one-shot sample from the Audio Pool
6. Select it with **[YES]** -- it is now assigned to Track 1's flex machine and added to the Flex sample slot list

### Step 3: Basic Track Configuration

For a clean starting state, verify these settings on Track 1:

**SRC (Source) Page:**
| Parameter | Value | Notes |
|-----------|-------|-------|
| MACH | FLEX | Flex machine for RAM playback |
| SLOT | (your sample) | The sample you just loaded |

**AMP (Amplifier) Page:**
| Parameter | Value | Notes |
|-----------|-------|-------|
| ATK | 0 | No attack fade |
| HLD | 0 | No hold |
| DEC | 0 | No decay |
| REL | 127 | Full release (sample plays to end) |
| VOL | 0 | Default pre-FX volume (bipolar, 0 = unity) |
| BAL | 0 | Centered panning |

**LFO Page:**
| Parameter | Value | Notes |
|-----------|-------|-------|
| SPD1/2/3 | 0 | No LFO speed |
| DEP1/2/3 | 0 | No LFO depth |
| DST1/2/3 | NONE | No LFO destination |

**FX1 and FX2 Pages:**
| Parameter | Value | Notes |
|-----------|-------|-------|
| Effect | NONE | No effects loaded |

### Step 4: Place a Trigger and Test

1. Make sure you're on Track 1 (the track key should be lit)
2. Press **[RECORD]** to enter Grid Recording mode (the RECORD key lights up steady)
3. Press **[TRIG 1]** to place a trigger on step 1 -- the TRIG LED lights up
4. Press **[PLAY]** to start the pattern
5. You should hear your sample triggering on beat 1 of every bar
6. Press **[RECORD]** again to exit Grid Recording mode

### Step 5: Configure Inputs (If Using External Gear)

If you plan to sample external instruments or use the OT as an effects processor:

1. Press **[MIX]** to open the Mixer page
2. Set **GAIN A/B** to an appropriate level for your input source (0 dB is unity)
3. Set **GAIN C/D** similarly if using the second input pair
4. Set **DIR A/B** to `0` (we don't want direct monitoring yet -- we'll route through tracks)
5. Press **[NO]** to close the Mixer

### Step 6: Save the Part and Project

1. Press **[FUNC] + [PART]** to save the current Part (this is your base camp)
2. Press **[FUNC] + [PROJ]** to save the entire project

## Quick Test

After setup, verify:

- [ ] Pressing [PLAY] plays your sample on beat 1
- [ ] Pressing [STOP] stops playback
- [ ] Turning the **Level** knob changes Track 1's volume
- [ ] **[FUNC] + [CUE]** reloads the Part (should sound identical -- nothing has changed yet)
- [ ] All 8 track keys select different tracks (T2-T8 should be empty/silent)

## The "Return Home" Gesture

Throughout all sessions, this is your safety net:

**`[FUNC] + [CUE]`** = Reload Part (undo all unsaved changes to machines, effects, scenes, volumes)

Think of it like Merlin's "base camp" metaphor: save your Part, experiment wildly, and hit `[FUNC] + [CUE]` to teleport home. This is the Octatrack equivalent of the Evolver's basic patch -- but instead of a set of parameter values, it is a saved project state.

## Session Starting State

Every session in this curriculum will specify one of:

1. **"Start from the basic project"** -- Load the LEARN project, Track 1 with a simple sample, everything else clean
2. **"Start from [specific session] output"** -- Load a project state saved from a previous session
3. **"Start from a new empty pattern"** -- Within an existing project, navigate to an unused pattern

The basic project is always available as a reset point.
