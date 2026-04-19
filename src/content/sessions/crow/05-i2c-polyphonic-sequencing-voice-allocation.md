---
title: 'Session 05: i2c -- Polyphonic Sequencing and Voice Allocation'
session_number: 5
duration: 30
prerequisite: 3
output_type: patch
difficulty: advanced
tags:
  - i2c
  - just-friends
  - crow
  - combined
  - polyphony
  - sequencing
instrument: crow
instrument_type: eurorack_module
reference: 'Just Type protocol'
section: i2c Integration
requires_modules:
  - just-friends
  - crow
---

# Session 05: i2c -- Polyphonic Sequencing and Voice Allocation

**Objective:** Move beyond single notes to polyphonic voice control. Learn to assign specific pitches to specific JF channels, transpose all voices globally, sustain notes with run_mode, and build a chord-sequencing script.

> [!tip] If you only have 5 minutes
> In Druid: `ii.jf.mode(1)` then send three notes rapidly: `ii.jf.play_note(0, 5)` `ii.jf.play_note(0.333, 5)` `ii.jf.play_note(0.583, 5)`. You just played a C major chord through JF's voice allocator -- three of the six channels now sound simultaneously.

> [!important] This session requires both Crow and Just Friends
> Continue from the i2c connection established in Session 04. Both modules should be connected via i2c cable with Druid running. Review JF Session 09 (Sound mode) for context on INTONE and oscillator behavior.

## What You'll Learn

- Automatic voice allocation with `play_note` (round-robin)
- Explicit voice assignment with `play_voice`
- Global transposition with `transpose`
- Sustaining notes with `run_mode`
- Building a chord sequencer script

## What You'll Need

- Monome Crow with USB connected and Druid running
- Mannequins Just Friends (i2c connected from Session 04)
- Patch cables (1-2, for JF audio output)
- Audio interface or mixer

## Starting State

| Control | Position |
|---------|----------|
| **Crow** | USB connected, Druid open |
| **JF** | Any switch position (Synthesis mode overrides panel) |
| **JF TIME** | 12 o'clock |
| **JF INTONE** | 12 o'clock |
| **JF CURVE** | 12 o'clock |

Patch JF's MIX output to your mixer. Enter Synthesis mode:

```lua
ii.jf.mode(1)
```

## Warm-Up: Review play_note (2 min)

Quick refresher from Session 04 -- play a few notes and listen to voice allocation:

```lua
ii.jf.play_note(0, 5)
ii.jf.play_note(0.25, 5)
ii.jf.play_note(0.583, 5)
```

Three channels are now sounding. JF allocates each `play_note` call to the next available channel automatically.

## Step 1: Automatic Voice Allocation (5 min)

Play six notes in quick succession to fill all channels:

```lua
ii.jf.play_note(0, 5)       -- Ch 1: C
ii.jf.play_note(0.167, 5)   -- Ch 2: D
ii.jf.play_note(0.333, 5)   -- Ch 3: E
ii.jf.play_note(0.417, 5)   -- Ch 4: F
ii.jf.play_note(0.583, 5)   -- Ch 5: G
ii.jf.play_note(0.75, 5)    -- Ch 6: A
```

All six LEDs should be lit. Now play a seventh note:

```lua
ii.jf.play_note(0.917, 5)   -- B -- steals the oldest voice (Ch 1)
```

> [!info] Listen For
> The oldest note (C on channel 1) disappears as its voice is reassigned to B. This is round-robin voice stealing -- JF always replaces the voice that has been sounding longest. With six voices, you can hold rich chords before stealing begins.

## Step 2: Explicit Voice Control with play_voice (5 min)

<div data-just-friends-panel data-highlights="jack-jf-identity-out:amber,jack-jf-2n-out:amber,jack-jf-3n-out:amber"></div>

Unlike `play_note` (automatic allocation), `play_voice` lets you assign a specific pitch to a specific channel:

```lua
-- Build a C major triad on channels 1-3
ii.jf.play_voice(1, 0, 5)       -- Ch 1 (IDENTITY): C
ii.jf.play_voice(2, 0.333, 5)   -- Ch 2 (2N): E
ii.jf.play_voice(3, 0.583, 5)   -- Ch 3 (3N): G
```

Now change just one voice:

```lua
ii.jf.play_voice(2, 0.25, 5)    -- Ch 2: move E down to Eb (C minor!)
```

> [!info] Listen For
> Only channel 2 changes pitch. The other channels remain untouched. This is the power of `play_voice` -- surgical control over individual voices in a chord.

Build a wider voicing across all six channels:

```lua
ii.jf.play_voice(1, -1.0, 5)    -- Ch 1: C (one octave below)
ii.jf.play_voice(2, 0, 5)       -- Ch 2: C (root)
ii.jf.play_voice(3, 0.333, 5)   -- Ch 3: E
ii.jf.play_voice(4, 0.583, 5)   -- Ch 4: G
ii.jf.play_voice(5, 1.0, 5)     -- Ch 5: C (octave up)
ii.jf.play_voice(6, 1.333, 5)   -- Ch 6: E (octave up)
```

## Step 3: Global Transpose (4 min)

`transpose` shifts all channels by a V/oct offset without changing their relative intervals:

```lua
-- Start with a chord
ii.jf.play_voice(1, 0, 5)       -- C
ii.jf.play_voice(2, 0.333, 5)   -- E
ii.jf.play_voice(3, 0.583, 5)   -- G

-- Transpose up a perfect fourth
ii.jf.transpose(0.417)

-- Transpose up an octave
ii.jf.transpose(1.0)

-- Back to original
ii.jf.transpose(0)
```

> [!info] Listen For
> The chord shape stays identical -- the intervals between voices do not change. Only the root shifts. This is like shifting a barre chord shape up the guitar neck.

## Step 4: Sustaining Notes with run_mode (5 min)

By default in Synthesis mode, notes are percussive -- they attack and decay. Enable `run_mode` to sustain notes until explicitly released:

```lua
ii.jf.run_mode(1)   -- enable sustained notes
```

Now play a note -- it sustains indefinitely:

```lua
ii.jf.play_note(0, 5)    -- this note holds until voice is stolen
```

Play more notes to build up a sustained chord:

```lua
ii.jf.play_note(0.333, 5)
ii.jf.play_note(0.583, 5)
```

To release all notes, send them with zero level:

```lua
ii.jf.play_note(0, 0)
ii.jf.play_note(0.333, 0)
ii.jf.play_note(0.583, 0)
```

Return to percussive mode:

```lua
ii.jf.run_mode(0)
```

## Step 5: Chord Sequencer Script (7 min)

Combine everything into a script that cycles through chord voicings:

```lua
-- Chord sequencer: cycles through 4 chords
chords = {
  {0, 0.333, 0.583},         -- C major (C E G)
  {0.417, 0.75, 1.0},        -- F major (F A C)
  {0.583, 0.917, 1.167},     -- G major (G B D)
  {0, 0.25, 0.583}           -- C minor (C Eb G)
}

chord_index = 1

function init()
  ii.jf.mode(1)
  metro[1].time = 1.5  -- chord changes every 1.5 seconds
  metro[1].event = next_chord
  metro[1]:start()
end

function next_chord()
  local c = chords[chord_index]
  ii.jf.play_voice(1, c[1], 5)
  ii.jf.play_voice(2, c[2], 5)
  ii.jf.play_voice(3, c[3], 5)
  chord_index = (chord_index % #chords) + 1
end
```

Try variations:

```lua
-- Faster changes
metro[1].time = 0.75

-- Add a bass note on channel 4
function next_chord()
  local c = chords[chord_index]
  ii.jf.play_voice(1, c[1] - 1.0, 5)  -- bass (octave down)
  ii.jf.play_voice(2, c[1], 5)         -- root
  ii.jf.play_voice(3, c[2], 5)         -- third
  ii.jf.play_voice(4, c[3], 5)         -- fifth
  chord_index = (chord_index % #chords) + 1
end

-- Add transposition that drifts over time
drift = sequins{0, 0, 0.167, 0.167, 0.333, 0.333, 0, 0}

function next_chord()
  local c = chords[chord_index]
  ii.jf.transpose(drift())
  ii.jf.play_voice(1, c[1], 5)
  ii.jf.play_voice(2, c[2], 5)
  ii.jf.play_voice(3, c[3], 5)
  chord_index = (chord_index % #chords) + 1
end
```

## Step 6: Document Your Chord Sequencer (2 min)

Record in your daily note:

```
## Crow Session 05 - Polyphonic Sequencing
- Voice allocation: [describe round-robin behavior]
- play_voice vs play_note: [which did you prefer?]
- Favorite chord voicing: [list V/oct values]
- Transpose range explored: [min/max V/oct]
- Final script: [paste your chord sequencer code]
- Observation: [how JF's timbre interacted with the chord voicings]
```

## What You Built

- Round-robin voice allocation with `play_note` (automatic)
- Per-channel voice assignment with `play_voice` (explicit)
- Global pitch transposition with `transpose`
- Sustained vs. percussive note modes with `run_mode`
- A four-chord sequencer script with bass voice and drifting transposition

## Next Session Preview

Session 06 explores **Geode mode** -- JF's rhythmic engine. Using `tick` and `retune`, Crow feeds a clock to JF which distributes polyrhythmic patterns across six channels based on their INTONE ratios. Combined with Crow's own input handlers and sequins, you will build a generative self-playing instrument.
