---
title: 'Session 06: i2c -- Geode Rhythms and Generative Patches'
session_number: 6
duration: 30
prerequisite: 3
output_type: patch
difficulty: advanced
tags:
  - i2c
  - just-friends
  - crow
  - combined
  - geode
  - generative
instrument: crow
instrument_type: eurorack_module
reference: 'Just Type protocol'
section: i2c Integration
requires_modules:
  - just-friends
  - crow
---

# Session 06: i2c -- Geode Rhythms and Generative Patches

**Objective:** Unlock JF's Geode rhythmic mode via i2c, where each channel subdivides a clock at different integer ratios. Combine Crow's scripting with JF's six voices to build a self-playing generative instrument.

> [!tip] If you only have 5 minutes
> In Druid: `ii.jf.mode(1)` then use metro to send ticks: `metro[1].time = 0.5; metro[1].event = function() ii.jf.tick(0) end; metro[1]:start()`. JF distributes rhythmic pulses across six channels based on INTONE. Turn the INTONE knob to reshape the polyrhythm.

> [!important] This session requires both Crow and Just Friends
> Continue from the i2c connection established in Session 04. Both modules should be connected via i2c cable with Druid running. This session builds on all previous Crow sessions -- you will use metro, sequins, ASL, input handlers, and Just Type commands together.

## What You'll Learn

- Geode mode: rhythmic subdivision across six channels via `tick`
- Custom channel ratios with `retune`
- Combining Crow inputs, metros, and sequins with JF's voices
- Building a generative self-playing patch

## What You'll Need

- Monome Crow with USB connected and Druid running
- Mannequins Just Friends (i2c connected)
- Patch cables (3-6, for JF individual outputs and Crow inputs)
- Audio interface or mixer (ideally with multiple inputs for individual JF channels)
- Optional: external CV source (LFO, random, sequencer) patched to Crow IN 1

## Starting State

| Control | Position |
|---------|----------|
| **Crow** | USB connected, Druid open |
| **JF** | Any switch position (Synthesis mode overrides panel) |
| **JF TIME** | 12 o'clock |
| **JF INTONE** | 12 o'clock (start at unison, then explore) |
| **JF CURVE** | 12 o'clock |
| **JF RAMP** | 2 o'clock (slightly percussive for rhythmic clarity) |

Patch JF's MIX output to your mixer, and if possible, patch 2-3 individual channel outputs (IDENTITY, 3N, 6N) to separate mixer channels to hear the polyrhythm spatially.

## Warm-Up: Quick Synthesis Mode Check (2 min)

Confirm i2c is working:

```lua
ii.jf.mode(1)
ii.jf.play_note(0, 5)
```

If you hear a tone, the connection is live. Clear it:

```lua
ii.jf.mode(0)
```

## Step 1: Enter Geode Mode (5 min)

Geode is activated when JF is in Synthesis mode and receives `tick` commands. The six channels become rhythmic subdividers -- each channel fires at a different division of the incoming clock.

```lua
ii.jf.mode(1)

-- Send ticks using a metro (120 BPM = 0.5s per beat)
metro[1].time = 0.5
metro[1].event = function()
  ii.jf.tick(0)
end
metro[1]:start()
```

> [!info] Listen For
> With INTONE at noon, all six channels fire on every tick -- you hear a unified pulse. Now slowly turn **INTONE clockwise**. The channels begin firing at different subdivisions: IDENTITY on every beat, 2N on every other, 3N on every third, and so on. You are hearing a polyrhythmic pattern emerge from a single clock source.

Try different tempos:

```lua
metro[1].time = 0.25   -- 240 BPM: fast, dense polyrhythm
metro[1].time = 1.0    -- 60 BPM: slow, spacious pattern
metro[1].time = 0.125  -- 480 BPM: rapid-fire, almost textural
```

## Step 2: Shape the Rhythm with INTONE (5 min)

<div data-just-friends-panel data-highlights="knob-jf-intone:amber,knob-jf-ramp:blue"></div>

INTONE is the key creative control in Geode mode. It sets the ratio relationship between channels:

1. **INTONE at noon:** All channels fire together (unison rhythm)
2. **INTONE clockwise (1-2 o'clock):** Channels spread to integer ratios. 2N fires half as often as IDENTITY, 3N one-third, etc. Classic polyrhythm
3. **INTONE fully clockwise:** Maximum spread -- channel 6N fires very rarely relative to IDENTITY
4. **INTONE counter-clockwise:** Sub-division ratios compress. Channels fire faster than the base clock, creating dense bursts

Experiment with INTONE while the metro runs. Each position creates a completely different rhythmic pattern from the same clock.

Now adjust **RAMP** to shape the envelope of each hit:

```
RAMP at 2 o'clock = short, percussive clicks (good for rhythmic clarity)
RAMP at noon = balanced attack/decay
RAMP at 10 o'clock = slow attack, reversed feel
```

## Step 3: Custom Channel Ratios with retune (5 min)

Override INTONE's harmonic-series ratios with custom values using `retune`:

```lua
-- Set channel 2 to fire at 3/2 ratio (dotted rhythm)
ii.jf.retune(2, 3, 2)

-- Set channel 3 to fire at 5/4 ratio
ii.jf.retune(3, 5, 4)

-- Set channel 4 to fire at 7/8 ratio (faster than base)
ii.jf.retune(4, 7, 8)
```

The `retune(channel, numerator, denominator)` command sets a channel's ratio as a fraction. `retune(2, 3, 2)` means channel 2 fires at 3/2 the base rate -- three hits for every two base ticks.

Reset a channel to its default INTONE-controlled ratio:

```lua
-- Reset channel 2 to INTONE control
ii.jf.retune(2, 1, 1)
```

> [!info] Listen For
> Custom ratios create rhythmic patterns that INTONE alone cannot produce. The 7/8 ratio on channel 4 creates a subtle drift against the other channels -- the pattern takes many cycles before it repeats exactly. This is where Geode becomes genuinely generative.

## Step 4: Build a Generative Patch (10 min)

Combine everything: Crow reads external CV, generates evolving pitch sequences, and drives JF's rhythmic engine.

### Basic generative script:

```lua
-- Generative patch: Crow + JF Geode
pitches = sequins{0, 0.25, 0.333, 0.583, 0.75, 1.0}
levels = sequins{3, 5, 4, 5, 2, 5}

function init()
  ii.jf.mode(1)

  -- Metro 1: Geode clock
  metro[1].time = 0.4
  metro[1].event = function()
    ii.jf.tick(0)
  end
  metro[1]:start()

  -- Metro 2: Evolving pitch changes
  metro[2].time = 2.0
  metro[2].event = function()
    ii.jf.play_note(pitches(), levels())
  end
  metro[2]:start()
end
```

This creates two layers: Geode rhythms on the clock metro, and slowly evolving pitched notes on a second metro.

### Add external CV control:

```lua
-- Read Crow IN 1 to control Geode tempo
input[1].mode('stream', 0.1)
input[1].stream = function(v)
  -- Map 0-5V to tempo range (0.1s to 1.0s)
  local tempo = 0.1 + (v / 5.0) * 0.9
  metro[1].time = tempo
end
```

Patch an LFO or random voltage to Crow's IN 1 -- the Geode tempo will follow the incoming CV, creating tempo variations that interact with JF's INTONE ratios.

### Add ASL modulation on Crow outputs:

```lua
-- Output 1: slow LFO for external modulation
output[1].action = lfo(0.1, 5, 'sine')

-- Output 2: envelope triggered by Geode clock
output[2].action = once{ to(5, 0.01), to(0, 0.3) }

-- Modify the tick event to also trigger Crow's envelope
metro[1].event = function()
  ii.jf.tick(0)
  output[2]()  -- fire envelope on each tick
end
```

Patch Crow's output 1 to JF's FM input for slow timbral modulation. Patch output 2 to a VCA for clock-synced dynamics.

## Step 5: The Self-Playing System (2 min)

Your final patch should be a system that evolves on its own:

- **JF Geode** generates polyrhythmic patterns from Crow's clock
- **JF INTONE knob** (manual) shapes the rhythmic complexity
- **Crow metro** drives the clock (and optionally responds to external CV)
- **Crow sequins** add pitch evolution via `play_note`
- **Crow ASL** provides modulation on its outputs
- **External CV** (optional) adds tempo variation

Let it run. Reach in occasionally to turn JF's INTONE knob or adjust Crow's metro timing. The system plays itself -- you are curating the parameters.

## Step 6: Document Your Generative Patch (1 min)

Record in your daily note:

```
## Crow Session 06 - Geode Rhythms & Generative Patch
- Geode tempo: [metro time value]
- INTONE position: [approximate clock position]
- Custom retune ratios: [any custom channel ratios used]
- External CV source: [what's patched to Crow IN 1, if anything]
- Crow outputs: [what each output does and where it's patched]
- Script: [paste your final generative script]
- Recording: [filename if you recorded the self-playing system]
```

Make a short recording (60-120 seconds) of the self-playing system. This is your capstone patch for the Crow curriculum.

## What You Built

- Geode rhythmic mode via `tick` with polyrhythmic subdivisions
- Custom channel ratios with `retune` for non-harmonic rhythms
- A multi-layer generative patch combining Geode, play_note, ASL, and external CV
- A self-playing instrument system spanning two modules and the i2c bus

## Curriculum Complete

You have completed all six Crow sessions. You can now:
- Connect to Crow via USB and use the Druid REPL (Session 01)
- Read inputs and control outputs with scripts (Session 02)
- Build envelopes, LFOs, and sequences with ASL (Session 03)
- Communicate with Just Friends over i2c (Session 04)
- Control polyphonic voices and sequence chords (Session 05)
- Drive generative polyrhythmic systems with Geode (Session 06)

Crow is your modular system's scripting brain -- experiment with combining these techniques in your own patches.
