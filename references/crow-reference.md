# Crow Reference Documentation

**Source:** https://monome.org/docs/crow/
**Module:** Monome Crow
**Format:** 2HP Eurorack
**Power:** +12V 50mA

## Overview

Crow is a scriptable USB-CV-i2c bridge by Monome. It bridges the gap between a computer and a modular synthesizer via USB, while also communicating with other modules over i2c. It runs Lua scripts that define how its inputs and outputs behave.

## Physical Specifications

- **Width:** 2HP (10.16mm)
- **Depth:** 30mm
- **Power:** +12V 50mA, 0mA on -12V
- **USB:** USB-C for computer connection (Druid REPL, script upload)
- **Inputs:** 2 CV inputs (0-10V, configurable)
- **Outputs:** 4 CV outputs (+/-10V)
- **i2c:** Bus for communicating with other modules (Just Friends, W/, Ansible, etc.)
- **LED:** USB-C status indicator

## Panel Layout (top to bottom)

```
+--------+
|  crow  |  <- Title text
|        |
|  [USB] |  <- USB-C connector / LED indicator
|        |
| [IN 1] |  <- Input jack 1 (dark)
| [IN 2] |  <- Input jack 2 (dark)
|        |
| [  1 ] |  <- Output jack 1 (white)
| [  2 ] |  <- Output jack 2 (white)
| [  3 ] |  <- Output jack 3 (white)
| [  4 ] |  <- Output jack 4 (white)
|        |
| monome |  <- Brand text
+--------+
```

## Druid REPL

Druid is the command-line tool for interacting with Crow over USB.

### Installation

```bash
pip install monome-druid
```

### Basic Usage

- Connect Crow via USB-C
- Run `druid` in terminal
- Type Lua commands directly
- `^^` prints the current script
- `^^^` prints raw script (for saving)
- `^^p` prints input/output values

### Example Commands

```lua
-- Set output 1 to 3 volts
output[1].volts = 3.0

-- Set output 2 to a specific voltage
output[2].volts = -1.5

-- Read input 1 value
print(input[1].volts)
```

## Input Modes

Each input can be configured to respond to incoming CV in different ways:

### Stream Mode
Continuously reads the input voltage at a specified interval.

```lua
input[1].mode('stream', 0.1)  -- sample every 0.1 seconds
input[1].stream = function(v)
  print('input 1: ' .. v)
end
```

### Change Mode
Triggers a callback when voltage crosses a threshold.

```lua
input[1].mode('change', 1.0, 0.1, 'rising')
-- threshold: 1.0V, hysteresis: 0.1V, direction: 'rising'
input[1].change = function(state)
  if state then
    output[1].volts = 5.0
  else
    output[1].volts = 0.0
  end
end
```

### Peak Mode (window)
Detects local minima and maxima.

```lua
input[1].mode('window', 1.0, 5.0)
-- reports when voltage enters/exits the 1V-5V window
```

## Output Control

### Direct Voltage

```lua
output[1].volts = 3.0    -- set to 3V
output[2].volts = 0       -- set to 0V
output[3].volts = -2.5    -- set to -2.5V
```

### Slew (portamento)

```lua
output[1].slew = 0.1      -- 100ms slew time
output[1].volts = 5.0     -- slides to 5V over 100ms
```

### Shape (time-based modulation)

```lua
output[1].shape = 'linear'   -- linear interpolation
output[1].shape = 'sine'     -- sinusoidal
output[1].shape = 'expo'     -- exponential
output[1].shape = 'log'      -- logarithmic
output[1].shape = 'now'      -- instant (no interpolation)
```

## ASL (A Slope Language)

ASL is Crow's built-in language for constructing voltage trajectories -- envelopes, LFOs, sequences, and arbitrary shapes -- without external triggers.

### Basic Syntax

```lua
-- Go to a voltage over a duration
to(voltage, duration)
to(voltage, duration, shape)

-- Shapes: 'linear', 'sine', 'expo', 'log', 'over', 'under', 'rebound'
```

### Envelope Types

```lua
-- AD envelope (attack-decay)
output[1].action = once{ to(5, 0.01), to(0, 0.5) }
output[1]()  -- trigger it

-- ASR envelope (attack-sustain-release)
output[1].action = once{ to(5, 0.01), held{ to(5,0) }, to(0, 0.3) }
output[1](true)   -- gate on
output[1](false)  -- gate off

-- AR with exponential shapes
output[1].action = once{ to(5, 0.01, 'expo'), to(0, 0.5, 'log') }
```

### Looping (LFOs)

```lua
-- Triangle LFO
output[1].action = loop{ to(5, 1), to(0, 1) }

-- Sawtooth LFO
output[1].action = loop{ to(5, 2, 'expo'), to(0, 0) }

-- Square LFO
output[1].action = loop{ to(5, 0, 'now'), to(5, 0.5), to(0, 0, 'now'), to(0, 0.5) }
```

### lfo() Helper

```lua
-- Built-in LFO helper
output[1].action = lfo()           -- default: 1Hz sine 0-5V
output[1].action = lfo(2)          -- 2Hz
output[1].action = lfo(0.5, 8)    -- 0.5Hz, 8V peak-to-peak
output[1].action = lfo(1, 5, 'sine')  -- explicit shape
```

## Sequins

Sequins is a pattern sequencer built into Crow for creating melodic and rhythmic patterns.

```lua
-- Basic sequence
s = sequins{0, 2, 4, 7}
output[1].volts = s()  -- returns 0, then 2, then 4, then 7, then 0...

-- With ASL for auto-advancing
s = sequins{0, 2.5, 5, 7.5}
output[1].action = loop{ to(s(), 0.25) }

-- Nested sequins
s = sequins{0, sequins{2, 3}, 5, 7}

-- Transformations
s:step(2)      -- advance by 2 each call
s:select(3)    -- jump to position 3
s:reset()      -- back to start
```

## Metro (Timed Callbacks)

```lua
-- Create a repeating timer
metro[1].event = function(count)
  output[1].volts = (count % 2 == 0) and 5 or 0
end
metro[1].time = 0.5  -- every 500ms
metro[1]:start()
metro[1]:stop()
```

## i2c Communication

Crow can communicate with other i2c-enabled modules:

### Supported Modules
- **Just Friends** (via Just Type protocol)
- **W/** (Mannequins tape/delay module)
- **Ansible** (Monome grid/arc interface)
- **ER-301** (Sound computer)
- **Teletype** (Monome scripting platform)
- **16n Faderbank**

### Just Type Protocol (Crow to Just Friends)

```lua
-- Set JF to Sound mode
ii.jf.mode(1)

-- Play a note on channel 1
ii.jf.play_note(0, 5)  -- pitch (V/oct), velocity (0-5V)

-- Play a velocity on channel (triggers in Shape mode)
ii.jf.play_voice(1, 0, 5)  -- channel, pitch, velocity

-- Set JF to polyphonic allocation
ii.jf.mode(1)
ii.jf.play_note(0, 5)     -- allocates to next free voice

-- Set run voltage
ii.jf.run_mode(1)
ii.jf.run(5)

-- Direct parameter control
ii.jf.transpose(0)   -- global transpose
ii.jf.vtrigger(1, 5) -- trigger channel 1 with 5V velocity
ii.jf.god_mode(1)     -- enable god mode (all channels independent)
```

### Just Type Commands Reference

| Command | Description |
|---------|-------------|
| `ii.jf.mode(mode)` | Set JF mode: 0=normal, 1=Just Type |
| `ii.jf.play_note(pitch, vel)` | Polyphonic note allocation |
| `ii.jf.play_voice(ch, pitch, vel)` | Monophonic per-voice |
| `ii.jf.vtrigger(ch, vel)` | Trigger a voice |
| `ii.jf.transpose(v)` | Global transpose in V/oct |
| `ii.jf.run_mode(mode)` | 0=normal, 1=i2c controlled |
| `ii.jf.run(volts)` | Set RUN voltage via i2c |
| `ii.jf.god_mode(state)` | 0=normal, 1=independent channels |
| `ii.jf.tick(bpm)` | Clock sync |

## Init Script

Crow runs its stored `init()` function on power-up:

```lua
function init()
  -- Setup runs on boot
  input[1].mode('stream', 0.1)
  output[1].action = lfo(1, 5)
end

-- The init function is called automatically at startup
```

## Script Upload

Scripts can be uploaded to Crow's flash memory via Druid:

```bash
druid upload myscript.lua
```

Or via Norns, Max/MSP, or any USB serial connection at 115200 baud.

## Voltage Ranges

| Element | Range | Resolution |
|---------|-------|------------|
| Input 1 | 0V to +10V | ~1.2mV (14-bit ADC) |
| Input 2 | 0V to +10V | ~1.2mV (14-bit ADC) |
| Output 1 | -5V to +10V | ~0.4mV (16-bit DAC) |
| Output 2 | -5V to +10V | ~0.4mV (16-bit DAC) |
| Output 3 | -5V to +10V | ~0.4mV (16-bit DAC) |
| Output 4 | -5V to +10V | ~0.4mV (16-bit DAC) |

## Calibration

Crow auto-calibrates its DACs and ADCs on power-up. Manual calibration can be triggered:

```lua
cal.source()   -- calibrate using input 1
cal.default()  -- reset to factory calibration
```
