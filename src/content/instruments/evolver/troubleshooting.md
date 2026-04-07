---
type: troubleshooting
instrument: evolver
title: "Evolver Troubleshooting Guide"
---

## No Audio Output

- [ ] **Master Volume** is above 80 — this is the final output level, easy to overlook after a patch change
- [ ] **Osc 1 Level** and/or **Osc 2 Level** are above 80 — at least one oscillator needs to be feeding the mixer
- [ ] **Env 3 Amount** is greater than 0 and **Env 3 Destination** is set to VCA — Env 3 controls the amplifier by default
- [ ] **Audio cable** is connected to the Main Output (left output = mono sum) and your audio interface input gain is up
- [ ] **Program** is not a Bank 4 drone or external processing patch — try loading Bank 1, Program 128 (basic patch) to confirm audio works

## Filter Sounds Wrong

- [ ] **LPF Frequency** is not fully closed (value 0) — a closed filter cuts all sound regardless of other settings
- [ ] **Filter Mode** matches what you expect — 2-pole (-12dB, gentler) vs 4-pole (-24dB, steeper, self-oscillates at high resonance)
- [ ] **Resonance** level is intentional — values above 90 in 4-pole mode cause self-oscillation, which can overpower the input signal
- [ ] **Env 1 Amount** is set and Env 1 is routed to the filter — this is the default filter envelope; check both Amount and Destination
- [ ] **Audio Path** is correct — verify both analog (Osc 1/2) and digital (Osc 3/4) paths are active if you expect both; check HPF position (pre/post) if highs are missing

## Modulation Not Working

- [ ] **Mod Destination** is assigned — check Mod Matrix rows 1-4, each needs a valid destination selected
- [ ] **Mod Amount** is greater than 0 — even with correct routing, zero amount means no modulation
- [ ] **LFO Rate** is not at minimum (value 0) — a stopped LFO produces no movement
- [ ] **Key Sync** is set correctly — if the envelope or LFO should retrigger per note, Key Sync must be on
- [ ] **Sequencer** state matches your intent — if a sequencer track targets the same destination, it may override or sum with your modulation

## MIDI / SysEx Issues

- [ ] **MIDI Channel** matches between Evolver and your controller/DAW — check the Global parameter (default: channel 1)
- [ ] **MIDI cables** are connected correctly — Evolver MIDI IN from controller MIDI OUT; check for swapped In/Out/Thru
- [ ] **Local Control** is set correctly — On for standalone playing, Off when using a DAW to avoid double-triggering
- [ ] **SysEx Enable** is turned on if sending/receiving patches or program dumps
- [ ] **Program Change Receive** is enabled if you want external program changes to work — check the Global settings
