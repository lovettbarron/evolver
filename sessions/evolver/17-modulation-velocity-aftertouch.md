---
title: "Session 17: Velocity, Aftertouch & Mod Wheel"
module: "Modulation"
session_number: 17
duration: 25
prerequisite: 15
output_type: patch
difficulty: intermediate
tags: [modulation, velocity, aftertouch, pressure, mod-wheel, expression, performance]
instrument: evolver
reference: "Anu Kirk p.40-41, p.50, DSI Manual p.23-24, p.12-13"
---

# Session 17: Velocity, Aftertouch & Mod Wheel

**Objective:** Map velocity, aftertouch (pressure), and the mod wheel to synthesis parameters to create an expressive performance patch that responds to how you play.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set Filter Velocity to 60, LPF Frequency to 30, Env Amount to 80, ENV 1 Decay to 40. Play notes at different strengths. Harder hits should sound brighter -- that is velocity-controlled filter opening.

## Warm-Up (2 min)

Load one of your mod slot patches from Session 16. Play some notes and hear the modulation routing at work. Today you add human expression -- making the Evolver respond to your playing dynamics and gestures. Load the basic patch.

## Setup

From the basic patch:
- Set **Osc 3 Level** to `0` and **Osc 4 Level** to `0`
- Set **LPF Frequency** to `30`, **Resonance** to `30`, **4-Pole** ON
- Set ENV 1: **Attack** = `0`, **Decay** = `40`, **Sustain** = `15`, **Release** = `20`
- Set **Env Amount** to `80`

This gives us a basic plucky sound to add expression to.

## Exercises

### Exercise 1: Velocity to Filter (5 min)

Velocity determines how hard you press a key. Mapping it to the filter makes harder hits brighter:

1. Set **Filter Velocity** (the LPF Velocity parameter) to `0` -- play notes at different strengths. You should hear no difference between soft and hard hits
2. Set **Filter Velocity** to `30` -- play soft and hard. You should hear subtle brightness differences -- harder hits open the filter more
3. Set **Filter Velocity** to `60` -- play soft and hard. You should hear obvious dynamics -- soft notes are dark and mellow, hard notes are bright and punchy
4. Set **Filter Velocity** to `90` -- play soft and hard. You should hear extreme range -- soft notes are very dark, hard notes are very bright

Find the setting that matches your playing style. If your keyboard has a heavier action, lower values work better.

"This parameter affects how much MIDI velocity affects VCA envelope level" -- Anu Kirk p.41

Now add VCA velocity:
5. Set **VCA Velocity** to `40` -- now harder hits are both brighter AND louder. Softer hits are darker AND quieter. This mimics how acoustic instruments behave

See DSI Manual p.17 (Filter Velocity), p.18 (VCA Velocity)

### Exercise 2: Aftertouch (Pressure) (5 min)

Aftertouch is the pressure you apply to a key after it is already held down. The Evolver keyboard has channel aftertouch built in.

1. Set **Pressure Destination** (in Misc Params) to `FiL` (Filter Frequency)
2. Set **Pressure Amount** to `50`
3. Play a note and hold it. Press harder into the key -- you should hear the filter open as you increase pressure, adding brightness. Release pressure and the filter closes back
4. Try **Pressure Amount** to `80` -- you should hear more dramatic filter opening with pressure
5. Change **Pressure Destination** to `OAF` (All Osc Frequency) with Amount `5` -- play a note and apply pressure. You should hear a subtle pitch rise, like vocal expression
6. Return Pressure Destination to `FiL`, Amount `50`

"Pressure (aftertouch) provides expressive control... These are filtered/smoothed unlike raw mod slot sources" -- DSI Manual p.23

Note: The Pressure and Mod Wheel routings in Misc Params are smoothed, which means they respond cleanly without stepping noise (unlike mod slot sources). This makes them better for performance control.

See DSI Manual p.23-24 ("Modulators", "Misc Parameters")

### Exercise 3: Mod Wheel (5 min)

The mod wheel provides continuous real-time control over any parameter:

1. Set **Mod Wheel Destination** to `LFO 1 Amount` -- we need LFO 1 active first
2. Set **LFO 1**: Shape = `Tri`, Frequency = `50`, Amount = `0`, Destination = `OAF` (All Osc Frequency)
3. Set **Mod Wheel Amount** to `15`
4. Play a note. With the mod wheel at minimum, you should hear no vibrato. Push the mod wheel up -- you should hear vibrato gradually increase. This is the classic "mod wheel adds vibrato" setup

Now create a more complex mod wheel mapping:
5. Set **Mod Wheel Destination** to `FiL` (Filter Frequency)
6. Set **Mod Wheel Amount** to `-60`
7. Play a note with the mod wheel at minimum -- full brightness. Push the mod wheel up -- you should hear the filter close, darkening the sound
8. Combine: set **Mod Slot 1**: Source = `MWl` (Mod Wheel), Amount = `10`, Destination = `OAF`. Now the mod wheel controls both filter (via dedicated routing) and adds slight vibrato (via mod slot)

### Exercise 4: Build the Expressive Performance Patch (8 min)

Combine all expression sources into one patch:

1. **Osc 1 Shape** = `Saw`, Level = `50`. **Osc 2 Shape** = `P-48`, Level = `45`, Fine = `-3`
2. **Osc Slop** = `2`
3. **LPF Frequency** = `25`, **Resonance** = `35`, **4-Pole** ON, **Key Amount** = `72`
4. **ENV 1**: Attack = `0`, Decay = `45`, Sustain = `20`, Release = `25`, **Env Amount** = `85`
5. **ENV 2** (VCA): Attack = `5`, Decay = `0`, Sustain = `100`, Release = `30`
6. **Filter Velocity** = `55` -- harder hits open the filter more
7. **VCA Velocity** = `35` -- harder hits are louder
8. **Pressure Destination** = `FiL`, **Pressure Amount** = `45` -- aftertouch opens the filter
9. **Mod Wheel Destination** = `FiL`, **Mod Wheel Amount** = `-55` -- mod wheel darkens the sound
10. **LFO 1**: Shape = `Tri`, Frequency = `50`, Amount = `0`, Destination = `OAF`
11. **Mod Slot 1**: Source = `MWl`, Amount = `8`, Destination = `LF1A` (LFO 1 Amount) -- mod wheel also introduces vibrato

Play this patch expressively:
- Soft notes should sound dark and quiet
- Hard notes should sound bright and punchy
- Holding a key and pressing harder should open the filter further
- Mod wheel up should darken the sound and add vibrato

**Save this patch** as your "Expressive Lead" or "Performance" patch.

## Exploration (optional, hyperfocus days)

- Check the **Velocity Curve** (Global page 9, 1-4) and **Pressure Curve** (1-4) settings to match your playing style (DSI Manual p.13)
- Map **Foot Controller** to a parameter: set Pedal 1 to FootCtrl in Global (DSI Manual p.12), then set Foot Controller Destination to `VCA` Level, Amount = `50` for swell pedal control
- Try ENV 3 Velocity = `60` with ENV 3 Destination = `O1F` for velocity-sensitive sync-like sweeps without using hard sync

## Output Checklist

- [ ] Expressive performance patch saved with velocity, aftertouch, and mod wheel mapped
- [ ] Understand velocity sensitivity on both filter and VCA
- [ ] Can use aftertouch for live expression while holding notes
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Velocity makes every note dynamically different -- mapping it to both filter and VCA creates natural, acoustic-like response
- Aftertouch (pressure) adds expression after a note is struck -- ideal for filter opening, vibrato depth, or pitch bending
- Dedicated controller routings (Pressure, Mod Wheel, Breath, Foot) are smoothed for clean performance control, unlike raw mod slot sources

## Next Session Preview

Next time you will stack multiple modulation sources together -- LFOs modulating envelope amounts, sequences controlling LFO rates, velocity affecting modulation depth. This creates sounds that evolve with deep, layered complexity.
