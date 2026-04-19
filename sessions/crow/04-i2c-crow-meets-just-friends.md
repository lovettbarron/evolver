---
title: 'Session 04: i2c -- Crow Meets Just Friends'
session_number: 4
duration: 30
prerequisite: 3
output_type: technique
difficulty: intermediate
tags:
  - i2c
  - just-friends
  - crow
  - combined
instrument: crow
instrument_type: eurorack_module
reference: 'Just Type protocol'
section: i2c Integration
requires_modules:
  - just-friends
  - crow
---

# Session 04: i2c -- Crow Meets Just Friends

**Objective:** Make your first i2c connection between Crow and Just Friends. Learn the physical hookup, test communication with trigger and mode commands, and play your first note over the digital bus -- no patch cables to JF needed.

> [!tip] If you only have 5 minutes
> Connect Crow to JF with a 3-pin i2c cable (GND, SDA, SCL). In Druid: `ii.jf.trigger(1, 1)`. If JF's IDENTITY LED flashes, the connection works. Then try `ii.jf.mode(1)` followed by `ii.jf.play_note(0, 5)` -- you just played a note over i2c.

> [!important] This session requires both Crow and Just Friends
> You need both modules installed in your case, connected via an i2c cable. If you have not completed Crow Sessions 01-03, do those first -- you need to be comfortable with Druid and basic Crow scripting. Reviewing JF Session 01 (Foundations) is also recommended for understanding JF's architecture and modes.

## What You'll Learn

- Physical i2c connection between Crow and Just Friends
- Basic Just Type commands: `trigger`, `mode`, `play_note`
- The difference between normal JF operation and Synthesis mode
- How i2c control bypasses JF's panel trigger inputs entirely

## What You'll Need

- Monome Crow with USB connected and Druid running
- Mannequins Just Friends
- i2c cable (3-pin: GND, SDA, SCL) -- often included with Crow or available from Monome
- Patch cables (1-2, for JF audio output)
- Audio interface or mixer to hear JF's output

## Starting State

| Control | Position |
|---------|----------|
| **Crow** | USB connected, Druid open |
| **JF SOUND/SHAPE** | Shape |
| **JF MODE** | Transient |
| **JF TIME** | 12 o'clock |
| **JF INTONE** | 12 o'clock |
| **JF CURVE** | 12 o'clock |
| **JF RAMP** | 12 o'clock |

Patch JF's MIX output to your mixer or audio interface so you can hear the results.

## Warm-Up: Confirm Druid Works (2 min)

Quick check that Crow is responsive:

```lua
output[1].volts = 3.0
output[1].volts = 0
```

If output 1 responds (check with a multimeter or patch to an LED module), you are ready.

## Step 1: Physical i2c Connection (3 min)

Power down your case before connecting i2c cables.

1. Locate the **i2c header** on the back of Crow -- a small 3-pin connector near the power header
2. Locate the **i2c header** on the back of Just Friends -- labeled GND, SDA, SCL
3. Connect the i2c cable between the two modules. The cable has 3 wires: **GND** (ground), **SDA** (data), **SCL** (clock)
4. Double-check orientation: GND to GND, SDA to SDA, SCL to SCL. Incorrect wiring will not damage modules but communication will fail
5. Power your case back on
6. Open Druid and connect to Crow

> [!warning] Power Off First
> Always power down your eurorack case before connecting or disconnecting i2c cables. Hot-plugging i2c can cause communication errors or require a module restart.

## Step 2: First i2c Trigger (5 min)

<div data-crow-panel data-highlights="usb-crow:blue"></div>

Set JF to **Shape / Transient** mode (SOUND/SHAPE = Shape, MODE = Transient). This makes JF respond to triggers with an envelope on each channel.

In Druid, send a trigger command:

```lua
ii.jf.trigger(1, 1)
```

Watch JF's **IDENTITY** LED -- it should flash, and you will see an envelope on the IDENTITY output (or hear it through MIX if patched to audio).

Now trigger each channel individually:

```lua
ii.jf.trigger(1, 1)   -- IDENTITY
ii.jf.trigger(2, 1)   -- 2N
ii.jf.trigger(3, 1)   -- 3N
ii.jf.trigger(4, 1)   -- 4N
ii.jf.trigger(5, 1)   -- 5N
ii.jf.trigger(6, 1)   -- 6N
```

> [!info] Listen For
> Each channel fires independently. Unlike patching a trigger cable to JF's IDENTITY input (which normalles down to all channels), i2c triggers are per-channel -- you can fire channel 4 without affecting any others. Watch the LEDs light up one at a time.

If nothing happens: check i2c cable orientation, ensure both modules are powered, and try power-cycling your case.

## Step 3: Enter Synthesis Mode (5 min)

<div data-just-friends-panel data-highlights="jack-jf-mix-out:blue"></div>

Synthesis mode is a special i2c-only state that transforms JF into a polyphonic voice engine. It is not accessible from the panel -- only via i2c commands.

Enter Synthesis mode:

```lua
ii.jf.mode(1)
```

JF is now in Synthesis mode. The panel switches (SOUND/SHAPE, MODE) are overridden -- i2c has full control.

Play a note:

```lua
ii.jf.play_note(0, 5)
```

- **First argument (0):** Pitch in V/oct. `0` = middle C reference point
- **Second argument (5):** Level in volts. `5` = maximum amplitude

You should hear a tone from JF's MIX output. JF automatically allocates this note to an available channel.

Try different pitches:

```lua
ii.jf.play_note(0, 5)        -- C (root)
ii.jf.play_note(0.25, 5)     -- E (major third)
ii.jf.play_note(0.583, 5)    -- G (perfect fifth)
ii.jf.play_note(1.0, 5)      -- C (octave up)
```

> [!info] Listen For
> Each `play_note` call allocates a new voice. With six channels, JF can play up to six simultaneous notes. After all six are used, the oldest note is stolen for new ones (round-robin allocation).

## Step 4: Exit Synthesis Mode (3 min)

Return JF to normal panel-controlled operation:

```lua
ii.jf.mode(0)
```

JF now responds to its panel switches and trigger inputs again. The i2c connection remains active -- you can re-enter Synthesis mode at any time.

Test the difference:

```lua
-- Normal mode: triggers follow panel settings
ii.jf.mode(0)
ii.jf.trigger(1, 1)  -- fires an envelope per Shape/Transient settings

-- Synthesis mode: play_note controls pitch and amplitude
ii.jf.mode(1)
ii.jf.play_note(0, 5)  -- plays a synthesized note
```

## Step 5: Build a Simple Trigger Script (10 min)

Combine i2c commands with Crow's scripting to create an automated trigger pattern:

```lua
-- Auto-trigger all 6 JF channels in sequence
function init()
  metro[1].time = 0.3
  metro[1].event = trigger_next
  counter = 0
  metro[1]:start()
end

function trigger_next()
  counter = (counter % 6) + 1
  ii.jf.trigger(counter, 1)
end
```

This fires each JF channel in turn, creating a rolling pattern of envelopes across all six outputs.

Experiment with timing:

```lua
metro[1].time = 0.1   -- fast: machine-gun triggers
metro[1].time = 0.5   -- slow: deliberate sequence
metro[1].time = 1.0   -- very slow: one trigger per second
```

Now try it in Synthesis mode with notes:

```lua
notes = sequins{0, 0.25, 0.583, 1.0}

function init()
  ii.jf.mode(1)  -- enter Synthesis mode
  metro[1].time = 0.4
  metro[1].event = play_next
  metro[1]:start()
end

function play_next()
  ii.jf.play_note(notes(), 5)
end
```

You now have a four-note arpeggio playing through JF's six voices, entirely controlled by Crow over i2c.

## Step 6: Document Your First i2c Connection (2 min)

Record in your daily note:

```
## Crow Session 04 - i2c: Crow Meets Just Friends
- i2c connection: [worked on first try / needed troubleshooting]
- trigger test: [all 6 channels responding? any issues?]
- Synthesis mode: [describe the sound of play_note vs normal triggers]
- Favorite command so far: [trigger / play_note / other]
- Script: [paste your final trigger/arpeggio script]
```

## What You Built

- Physical i2c connection between Crow and Just Friends
- Per-channel triggers via `ii.jf.trigger(channel, state)`
- Synthesis mode entry/exit via `ii.jf.mode(state)`
- Note playback via `ii.jf.play_note(pitch, level)`
- Automated trigger and arpeggio scripts using metro and sequins

## Next Session Preview

Session 05 explores **polyphonic sequencing** -- using `play_voice` to assign specific pitches to specific JF channels, `transpose` to shift everything at once, and `run_mode` for sustaining voices. You will build a chord-playing script that cycles through voicings.
