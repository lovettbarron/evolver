---
title: 'Session 01: What is Crow - USB and Druid REPL'
session_number: 1
duration: 25
prerequisite: null
output_type: technique
difficulty: beginner
tags:
  - foundations
  - druid
  - crow
  - scripting
instrument: crow
instrument_type: eurorack_module
reference: 'Crow docs'
section: Foundations
---

# Session 01: What is Crow - USB and Druid REPL

**Objective:** Understand what Crow is, set up the USB connection, install Druid, and send your first voltage command from the computer to your modular system.

> [!tip] If you only have 5 minutes
> Connect Crow via USB-C, run `druid` in a terminal, type `output[1].volts = 3.0` and press enter. Patch output 1 to something you can hear or measure. You just controlled your modular from a computer. That is Crow.

## What You'll Learn

- What Crow is and how it fits into a modular system
- Physical setup: USB-C connection and eurorack power
- Installing and launching Druid (the Crow REPL)
- Sending voltage commands from the REPL
- Reading input voltages from the REPL

## What You'll Need

- Monome Crow (2HP, installed in your eurorack case)
- USB-C cable (to connect Crow to your computer)
- Computer with Python 3 installed
- Patch cables (2-3)
- A destination module to verify output (VCA, mixer, oscillator pitch input, or multimeter)

## Step 1: Understand the Hardware (3 min)

Crow is a 2HP eurorack module with a deceptively simple panel:

<div data-crow-panel data-highlights="usb-crow:amber,jack-crow-in-1:blue,jack-crow-in-2:blue,jack-crow-out-1:blue,jack-crow-out-2:blue,jack-crow-out-3:blue,jack-crow-out-4:blue"></div>

- **USB-C** (top): Connects to your computer for scripting via Druid
- **IN 1, IN 2**: CV inputs that read voltage from your modular (0-10V)
- **1, 2, 3, 4**: CV outputs that send voltage to your modular (-5V to +10V)
- **i2c header** (on the back): Digital bus for communicating with Just Friends, W/, and other modules

Crow is powered by your eurorack power supply -- the USB connection alone does not provide enough power. Both USB and eurorack power must be connected.

## Step 2: Install Druid (3 min)

Druid is the command-line tool for talking to Crow. Open a terminal and install it:

```bash
pip install monome-druid
```

If you use `pip3` on your system:

```bash
pip3 install monome-druid
```

Verify the installation:

```bash
druid --version
```

## Step 3: Connect and Launch (3 min)

1. Ensure Crow is installed in your eurorack case and powered on
2. Connect a USB-C cable from Crow to your computer
3. Open a terminal and type:

```bash
druid
```

You should see a welcome message and the Druid prompt. If Crow is not detected, check:
- Is the eurorack power supply on?
- Is the USB-C cable a data cable (not charge-only)?
- Try a different USB port

## Step 4: First Voltage Output (5 min)

Patch Crow's **output 1** to something you can observe -- an oscillator's pitch input, a VCA's CV input, or a multimeter.

<div data-crow-panel data-highlights="jack-crow-out-1:amber"></div>

In Druid, type:

```lua
output[1].volts = 0
```

Then try:

```lua
output[1].volts = 3.0
```

You should see the destination module respond. Output 1 is now at 3 volts.

Try different voltages:

```lua
output[1].volts = 5.0     -- 5 volts
output[1].volts = -2.0    -- negative voltage
output[1].volts = 1.0     -- 1V (one octave if patched to V/oct)
```

Now try the other outputs:

```lua
output[2].volts = 2.5
output[3].volts = 4.0
output[4].volts = 1.0
```

Each output is independent. You can set all four to different voltages simultaneously.

## Step 5: Reading Input Voltage (5 min)

Patch a CV source (LFO, envelope, sequencer, or even another Crow output) into **input 1**.

<div data-crow-panel data-highlights="jack-crow-in-1:amber"></div>

Set input 1 to stream mode -- it will continuously read and print the voltage:

```lua
input[1].mode('stream', 0.1)
input[1].stream = function(v)
  print('input 1: ' .. string.format('%.2f', v))
end
```

You should see voltage values scrolling in the Druid console. Try turning the source up and down and watch the values change.

To stop the stream, set a different mode:

```lua
input[1].mode('none')
```

## Step 6: Explore the REPL (3 min)

Try these Druid special commands:

| Command | What it does |
|---------|-------------|
| `^^` | Print the current script running on Crow |
| `^^^` | Print raw script (useful for saving) |
| `^^p` | Print current input/output voltage values |

Type `^^p` to see all voltages at once -- this is useful for debugging patches.

## Step 7: Document Your Setup (3 min)

In your daily note, record:
- Druid installation status (working/issues)
- USB connection notes (which cable, which port)
- First successful voltage output and what you patched it to
- Any issues encountered and how you resolved them

## What You Built

- Working Druid REPL connection to Crow
- Ability to set any of the 4 outputs to a specific voltage from the computer
- Ability to read incoming CV voltages on input 1
- Foundation for all future Crow sessions

## Next Session Preview

Session 02 connects inputs to outputs with scripts -- reading a CV voltage and using it to control an output in real-time. You will write your first Crow script that responds to your modular system.
