---
type: overview
instrument: crow
title: "Crow Overview"
manufacturer: "Monome"
---

# Monome Crow

*Scriptable USB-CV-i2c bridge*

**2HP** | Modulator, Utility, i2c Host

## Architecture

Crow is a scriptable bridge between a computer and a eurorack modular synthesizer. At only 2HP wide, it is one of the smallest modules in any system, but its capabilities extend far beyond its physical size. Crow runs Lua scripts that define how its inputs and outputs behave -- turning it into a programmable envelope generator, LFO, sequencer, CV processor, or i2c controller depending entirely on the script loaded.

The module has three domains of operation:

1. **USB connection** -- Crow connects to a computer via USB-C. The Druid REPL allows real-time scripting: type a Lua command and Crow executes it immediately. Scripts can also be uploaded to flash memory and run autonomously on power-up.

2. **CV I/O** -- Two 0-10V inputs (configurable for stream, change detection, or windowed modes) and four +/-10V outputs (direct voltage, slewed, or ASL-driven). This is where Crow interfaces with the rest of your modular system.

3. **i2c bus** -- Crow communicates with other i2c-enabled modules (Just Friends, W/, Ansible, ER-301, Teletype) over the i2c bus. This enables control without patch cables -- Crow can set Just Friends to Sound mode, play polyphonic notes, or control parameters, all via digital messages on the bus.

## I/O Reference

| Element | Type | Voltage Range | Description |
|---------|------|---------------|-------------|
| IN 1 | CV Input | 0V to +10V | Configurable: stream, change, window modes |
| IN 2 | CV Input | 0V to +10V | Configurable: stream, change, window modes |
| 1 | CV Output | -5V to +10V | Scriptable: direct voltage, slew, or ASL |
| 2 | CV Output | -5V to +10V | Scriptable: direct voltage, slew, or ASL |
| 3 | CV Output | -5V to +10V | Scriptable: direct voltage, slew, or ASL |
| 4 | CV Output | -5V to +10V | Scriptable: direct voltage, slew, or ASL |
| USB-C | Digital | -- | Computer connection for Druid REPL and script upload |

## Druid Setup

Druid is the command-line REPL for interacting with Crow. It requires Python 3.

### Installation

```bash
pip install monome-druid
```

### Connecting

1. Connect Crow to your computer via USB-C
2. Ensure Crow is powered by your eurorack power supply (USB alone is not enough)
3. Open a terminal and run `druid`
4. You should see the Crow REPL prompt

### Basic REPL Commands

| Command | Action |
|---------|--------|
| `output[1].volts = 3.0` | Set output 1 to 3 volts |
| `print(input[1].volts)` | Read current voltage at input 1 |
| `^^` | Print the current running script |
| `^^^` | Print raw script (for saving to a file) |
| `^^p` | Print input/output values |

### Uploading Scripts

```bash
druid upload myscript.lua
```

Scripts stored in flash run automatically on power-up via the `init()` function.

## Scripting Quick Reference

### Input Modes

```lua
-- Stream: continuously read voltage
input[1].mode('stream', 0.1)
input[1].stream = function(v) print(v) end

-- Change: detect threshold crossings
input[1].mode('change', 1.0, 0.1, 'rising')
input[1].change = function(state) ... end
```

### Output Control

```lua
output[1].volts = 5.0          -- set voltage directly
output[1].slew = 0.1           -- add portamento (100ms)
output[1].shape = 'expo'       -- set interpolation curve
```

### ASL (A Slope Language)

```lua
-- AD envelope
output[1].action = once{ to(5, 0.01), to(0, 0.5) }
output[1]()  -- trigger

-- Triangle LFO
output[1].action = loop{ to(5, 1), to(0, 1) }

-- LFO helper
output[1].action = lfo(1, 5, 'sine')
```

### Sequins

```lua
s = sequins{0, 2, 4, 7}
output[1].action = loop{ to(s(), 0.25) }
```

### Metro (Timed Callbacks)

```lua
metro[1].event = function(c) output[1].volts = (c % 2 == 0) and 5 or 0 end
metro[1].time = 0.5
metro[1]:start()
```

## i2c Overview

Crow can communicate with other i2c-enabled eurorack modules without patch cables. The i2c bus is a digital communication protocol that allows modules to send commands to each other.

### Supported Modules

- **Mannequins Just Friends** -- via Just Type protocol (polyphonic note allocation, parameter control)
- **Mannequins W/** -- tape and delay control
- **Monome Ansible** -- grid and arc interface
- **Monome Teletype** -- scripting platform (Crow can be a Teletype expander)
- **Orthogonal Devices ER-301** -- sound computer
- **16n Faderbank** -- MIDI/i2c fader controller

### Just Type Example

```lua
-- Enable Just Type mode on Just Friends
ii.jf.mode(1)

-- Play a polyphonic note (pitch in V/oct, velocity in volts)
ii.jf.play_note(0, 5)

-- Set RUN voltage via i2c
ii.jf.run_mode(1)
ii.jf.run(5)
```

The combined Crow + Just Friends sessions (Sessions 04+) explore the Just Type protocol in depth.

## Power

| Rail | Current |
|------|---------|
| +12V | 50mA |
| -12V | 0mA |

## Init Script

Crow runs the `init()` function on power-up:

```lua
function init()
  input[1].mode('stream', 0.1)
  output[1].action = lfo(1, 5)
end
```

This allows Crow to function as a standalone module (LFO, envelope, sequencer) without a computer connected after initial setup.
