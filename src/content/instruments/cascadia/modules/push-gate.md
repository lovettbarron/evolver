---
type: module
instrument: cascadia
title: "Push Gate"
manufacturer: "Intellijel"
category: utility
control_count: 1
jack_count: 1
has_normals: true
---

# Push Gate

## Purpose

Provides a manual gate signal for triggering envelopes and other gate-responsive modules without requiring a MIDI controller or external CV source. Press and hold the button for a sustained gate; release to end it.

## What Makes It Special

The Push Gate is deceptively useful despite its simplicity. It is normalled to both Envelope A and Envelope B gate inputs (via the same gate bus as MIDI GATE), so pressing the button triggers both envelopes simultaneously -- letting you audition patches, test sounds, or play Cascadia without any external controller connected. This makes it invaluable during sound design sessions when you want to focus on tweaking parameters rather than playing a keyboard.

Important: inserting a cable into the GATE OUT jack disconnects the button from the internal gate bus. The button then only drives the GATE OUT jack, and the envelopes must be triggered separately (via MIDI, CV, or a patched gate source). This lets you use the Push Gate as a manual gate source for other modules without affecting the envelope triggering.

## Controls

| Control | Type | Range | Notes |
|---------|------|-------|-------|
| MANUAL GATE | Button | Momentary | Outputs +5V while held. Also used in combination with MIDI/CV buttons to select ALT noise types |

## Patch Points

| Jack | Type | Normalled To | Notes |
|------|------|-------------|-------|
| GATE OUT | Output | ENV A GATE, ENV B GATE (via internal bus) | +5V gate while button held. Inserting a cable disconnects the internal bus routing |

## LEDs

LED above the GATE OUT jack lights whenever the gate is high (+5V).

## Normalled Connections

- **GATE OUT** normalled to Envelope A GATE and Envelope B GATE inputs (via the internal gate bus, shared with MIDI GATE and EXT CV GATE). Inserting a cable into GATE OUT breaks this normalling -- the button then only drives the patched destination.
