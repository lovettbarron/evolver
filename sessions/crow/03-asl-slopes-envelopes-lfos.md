---
title: 'Session 03: ASL - Slopes, Envelopes, and LFOs'
session_number: 3
duration: 30
prerequisite: 2
output_type: technique
difficulty: intermediate
tags:
  - scripting
  - asl
  - envelopes
  - lfos
  - crow
instrument: crow
instrument_type: eurorack_module
reference: 'Crow docs'
section: Scripting
---

# Session 03: ASL - Slopes, Envelopes, and LFOs

**Objective:** Use Crow's ASL (A Slope Language) to build envelopes, LFOs, and melodic sequences that Crow generates entirely on its own -- no external triggers or CV sources needed.

> [!tip] If you only have 5 minutes
> In Druid: `output[1].action = loop{ to(5, 1), to(0, 1) }`. Patch output 1 to a VCA or filter cutoff. You now have a triangle LFO generated entirely by Crow's script. Adjust the times: `to(5, 0.5)` for faster, `to(5, 3)` for slower.

## What You'll Learn

- ASL syntax: `to(voltage, duration, shape)`
- Building AD and ASR envelopes with `once{}` and `held{}`
- Creating LFOs with `loop{}`
- The `lfo()` helper function
- Sequins for melodic patterns with ASL
- Combining ASL across multiple outputs

## What You'll Need

- Monome Crow with USB connected and Druid working
- Destination modules for outputs (VCA, filter, oscillator pitch)
- Patch cables (2-4)
- No CV input sources needed -- Crow generates everything internally

## Warm-up: Quick Output Check (2 min)

```lua
output[1].volts = 0
output[1].volts = 5.0
output[1].volts = 0
```

Confirm output 1 responds. Patch it to a VCA's CV input or a filter cutoff for this session.

## Step 1: The to() Function (3 min)

ASL is built on one fundamental operation: `to(voltage, duration, shape)`.

- **voltage**: target voltage (-5 to +10)
- **duration**: time in seconds to reach the target
- **shape** (optional): curve shape -- `'linear'`, `'sine'`, `'expo'`, `'log'`

Try a single slope:

```lua
output[1].action = once{ to(5, 1) }
output[1]()
```

Crow ramps from its current voltage to 5V over 1 second, then stops. Call `output[1]()` again to repeat it.

Try with a shape:

```lua
output[1].action = once{ to(5, 1, 'expo') }
output[1]()
```

Exponential rise -- slow at first, fast at the end. Compare with `'log'` (fast then slow) and `'sine'` (smooth S-curve).

## Step 2: AD Envelope (5 min)

An attack-decay envelope chains two slopes: fast rise (attack) then slower fall (decay).

<div data-crow-panel data-highlights="jack-crow-out-1:amber"></div>

```lua
output[1].action = once{ to(5, 0.01), to(0, 0.5) }
output[1]()
```

This creates:
- **Attack**: 0 to 5V in 10ms (snappy)
- **Decay**: 5V to 0V in 500ms (smooth falloff)

Trigger it repeatedly by typing `output[1]()`. Each call restarts the envelope from the beginning.

Try different attack/decay ratios:

```lua
-- Plucky (fast attack, fast decay)
output[1].action = once{ to(5, 0.005), to(0, 0.1) }

-- Slow swell (slow attack, slow decay)
output[1].action = once{ to(5, 0.5), to(0, 2.0) }

-- Percussive with exponential decay
output[1].action = once{ to(5, 0.01, 'expo'), to(0, 0.3, 'log') }
```

## Step 3: ASR Envelope with held{} (4 min)

For sustaining envelopes (keyboard-style), use `held{}` to pause the slope until the gate releases:

```lua
output[1].action = once{ to(5, 0.01), held{ to(5, 0) }, to(0, 0.3) }
```

- Gate on: `output[1](true)` -- attacks to 5V and holds
- Gate off: `output[1](false)` -- releases to 0V over 300ms

```lua
output[1](true)    -- hold...
output[1](false)   -- release
```

If you have a gate source patched to IN 1, you can trigger it from hardware:

```lua
input[1].mode('change', 1.0, 0.1, 'both')
input[1].change = function(state)
  output[1](state)
end
```

Now Crow is a full envelope generator controlled by an external gate.

## Step 4: Triangle LFO with loop{} (4 min)

Replace `once{}` with `loop{}` to create repeating shapes:

```lua
output[1].action = loop{ to(5, 1), to(0, 1) }
```

This is a triangle LFO: rise to 5V over 1 second, fall to 0V over 1 second, repeat forever. Total period = 2 seconds = 0.5 Hz.

Variations:

```lua
-- Fast triangle (4 Hz)
output[1].action = loop{ to(5, 0.125), to(0, 0.125) }

-- Sawtooth (slow rise, instant fall)
output[1].action = loop{ to(5, 2, 'expo'), to(0, 0) }

-- Ramp (instant rise, slow fall)
output[1].action = loop{ to(5, 0, 'now'), to(0, 2, 'log') }

-- Square wave (instant transitions with dwell time)
output[1].action = loop{ to(5, 0, 'now'), to(5, 0.5), to(0, 0, 'now'), to(0, 0.5) }
```

## Step 5: The lfo() Helper (3 min)

Crow has a built-in `lfo()` function for common LFO shapes:

```lua
-- Default: 1Hz sine, 0-5V
output[1].action = lfo()

-- 2Hz sine
output[1].action = lfo(2)

-- 0.5Hz, 8V peak-to-peak
output[1].action = lfo(0.5, 8)

-- 1Hz, 5V, explicit sine shape
output[1].action = lfo(1, 5, 'sine')

-- 3Hz linear (triangle)
output[1].action = lfo(3, 5, 'linear')
```

The `lfo()` helper is convenient for quick modulation. For more complex shapes, use `loop{}` with explicit `to()` calls.

## Step 6: Sequins for Melodic Patterns (5 min)

Sequins creates repeating patterns of values. Combined with ASL, it produces melodic sequences:

```lua
s = sequins{0, 2.5, 5, 7.5}
output[1].action = loop{ to(s(), 0.25) }
```

Crow now steps through 0V, 2.5V, 5V, 7.5V -- each held for 250ms. Patch output 1 to an oscillator's V/oct input for a four-note melody.

Musical intervals in volts (V/oct):

```lua
-- C major scale (relative to 0V root)
s = sequins{0, 0.167, 0.333, 0.417, 0.583, 0.75, 0.917, 1.0}
output[1].action = loop{ to(s(), 0.3) }

-- Pentatonic (fewer notes, always sounds good)
s = sequins{0, 0.167, 0.333, 0.583, 0.75}
output[1].action = loop{ to(s(), 0.4) }

-- Simple arpeggio (root, third, fifth, octave)
s = sequins{0, 0.333, 0.583, 1.0}
output[1].action = loop{ to(s(), 0.2) }
```

## Step 7: Multi-Output Composition (2 min)

Combine everything across multiple outputs:

```lua
-- Output 1: Melodic sequence
s = sequins{0, 0.333, 0.583, 1.0}
output[1].action = loop{ to(s(), 0.25) }

-- Output 2: Slow triangle LFO for filter modulation
output[2].action = lfo(0.2, 5, 'sine')

-- Output 3: Fast LFO for tremolo
output[3].action = lfo(6, 3, 'sine')

-- Output 4: Envelope triggered by input gate
output[4].action = once{ to(5, 0.01), to(0, 0.5) }
input[1].mode('change', 1.0, 0.1, 'rising')
input[1].change = function() output[4]() end
```

Crow is now simultaneously running a sequencer, two LFOs, and an envelope generator -- from a 2HP module.

## Step 8: Document Your Composition (2 min)

Record your final multi-output script in your daily note:

```
## Crow Session 03 - ASL
- Output 1: [what it does, what it controls]
- Output 2: [what it does, what it controls]
- Output 3: [what it does, what it controls]
- Output 4: [what it does, what it controls]
- Sequins pattern: [note values]
- Observation: [how the combined outputs interacted]
```

## What You Built

- AD and ASR envelopes using `once{}` and `held{}`
- Triangle, sawtooth, ramp, and square LFOs using `loop{}`
- Quick LFOs with the `lfo()` helper
- Melodic sequences with sequins
- Multi-output composition combining sequences, LFOs, and envelopes

## Next Session Preview

Sessions 04+ introduce i2c communication -- Crow talking to Just Friends digitally over the i2c bus. Instead of patching CV cables, Crow sends commands that set Just Friends to Sound mode, play polyphonic notes, and control parameters. This is where Crow transforms from a standalone utility into the conductor of your modular system.
