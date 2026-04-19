---
title: 'Session 02: Input/Output Scripts - Read and Respond'
session_number: 2
duration: 25
prerequisite: 1
output_type: technique
difficulty: beginner
tags:
  - scripting
  - input-output
  - crow
  - cv-processing
instrument: crow
instrument_type: eurorack_module
reference: 'Crow docs'
section: Scripting
---

# Session 02: Input/Output Scripts - Read and Respond

**Objective:** Write Crow scripts that read CV input and respond with output -- turning Crow into a real-time CV processor that reacts to your modular system.

> [!tip] If you only have 5 minutes
> Patch an LFO into IN 1 and output 1 to an oscillator's pitch. In Druid: `input[1].mode('stream', 0.1)` then `input[1].stream = function(v) output[1].volts = v * 2 end`. Your LFO is now doubled in voltage. That is Crow processing CV in real-time.

## What You'll Learn

- Stream mode for continuous CV reading
- Writing handler functions that connect input to output
- Voltage scaling and offset (CV math)
- Change mode for gate/trigger detection
- Combining multiple inputs and outputs

## What You'll Need

- Monome Crow with USB connected and Druid working (from Session 01)
- CV source for input (LFO, envelope, sequencer, or manual knob)
- Destination module for output (oscillator, VCA, filter)
- Patch cables (3-4)

## Warm-up: Verify Connection (2 min)

Launch Druid and confirm Crow responds:

```lua
output[1].volts = 0
output[1].volts = 3.0
output[1].volts = 0
```

If voltages change at your destination, you are ready.

## Step 1: Voltage Follower (5 min)

The simplest useful script: whatever voltage arrives at input 1, send it straight to output 1.

Patch a CV source (LFO, sequencer CV, or envelope) into **IN 1**. Patch **output 1** to a destination.

<div data-crow-panel data-highlights="jack-crow-in-1:blue,jack-crow-out-1:amber"></div>

```lua
input[1].mode('stream', 0.1)
input[1].stream = function(v)
  output[1].volts = v
end
```

Crow now follows the input voltage. This is a buffered multiple -- Crow reads IN 1 and copies the voltage to output 1. Not exciting yet, but it proves the input-to-output pipeline works.

## Step 2: Voltage Scaling (5 min)

Now make the output a scaled version of the input. This is where Crow becomes useful -- it can do CV math that would otherwise require dedicated utility modules.

**Double the voltage:**

```lua
input[1].stream = function(v)
  output[1].volts = v * 2
end
```

**Halve the voltage:**

```lua
input[1].stream = function(v)
  output[1].volts = v * 0.5
end
```

**Invert the voltage:**

```lua
input[1].stream = function(v)
  output[1].volts = -v
end
```

**Offset by 2.5V:**

```lua
input[1].stream = function(v)
  output[1].volts = v + 2.5
end
```

**Clamp to a range:**

```lua
input[1].stream = function(v)
  local clamped = math.max(0, math.min(5, v))
  output[1].volts = clamped
end
```

Try each one. Listen to how the output changes relative to the input source. If patched to an oscillator's pitch, doubling the voltage doubles the pitch range.

## Step 3: Multiple Outputs (3 min)

Crow has 4 outputs. Use one input to drive several outputs with different transformations:

```lua
input[1].stream = function(v)
  output[1].volts = v             -- direct copy
  output[2].volts = v * 2         -- doubled
  output[3].volts = -v            -- inverted
  output[4].volts = v + 2.5       -- offset
end
```

Patch each output to a different destination and hear four related but different CV signals from a single source.

## Step 4: Gate Detection with Change Mode (5 min)

Stream mode reads continuous voltages. **Change mode** detects when voltage crosses a threshold -- perfect for gates and triggers.

Patch a gate source (clock, keyboard gate, or sequencer gate) into **IN 1**.

```lua
input[1].mode('change', 1.0, 0.1, 'rising')
input[1].change = function(state)
  if state then
    output[1].volts = 5.0
  else
    output[1].volts = 0.0
  end
end
```

Parameters:
- `1.0` -- threshold voltage (triggers when crossing 1V)
- `0.1` -- hysteresis (prevents false triggers from noisy signals)
- `'rising'` -- detect rising edge only (alternatives: `'falling'`, `'both'`)

Try changing the threshold:

```lua
input[1].mode('change', 3.0, 0.2, 'both')
```

Now the trigger fires on both rising and falling edges at 3V. This is useful for converting analog signals into digital gates.

## Step 5: Combining Input Modes (3 min)

Use both inputs simultaneously -- stream on one, change on the other:

```lua
-- Input 1: continuous CV reading
input[1].mode('stream', 0.1)
input[1].stream = function(v)
  output[1].volts = v * 2
end

-- Input 2: gate detection
input[2].mode('change', 1.0, 0.1, 'rising')
input[2].change = function(state)
  if state then
    output[2].volts = 5.0
  else
    output[2].volts = 0.0
  end
end
```

Now Crow processes two independent CV streams simultaneously.

## Step 6: Document Your Script (2 min)

In your daily note, record the most useful script you wrote:

```
## Crow Session 02
- Script: [paste your favorite script]
- Input source: [what you patched to IN 1]
- Output destination: [where output 1 went]
- Observation: [what did it sound like / how did it behave]
```

Save the script text so you can reload it in future sessions.

## What You Built

- Voltage follower (buffered multiple)
- Voltage scaler, inverter, and offset processor
- Multi-output CV distribution from a single input
- Gate detector using change mode
- Dual-input script with independent processing

## Next Session Preview

Session 03 introduces ASL (A Slope Language) -- Crow's built-in system for creating envelopes, LFOs, and sequences without any external triggers. You will build shapes that Crow generates entirely on its own.
