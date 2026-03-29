---
title: "Session 33: Recording Workflow -- MIDI and Audio in Your DAW"
module: "Integration & Composition"
session_number: 33
duration: 25
prerequisite: 32
output_type: recording
difficulty: advanced
tags: [integration, recording, daw, midi, audio, workflow, template]
instrument: evolver
reference: "DSI Manual p.9-14 (basic operations), p.36-40 (MIDI implementation), p.41-45 (SysEx)"
---

# Session 33: Recording Workflow -- MIDI and Audio in Your DAW

**Objective:** Set up a complete DAW recording template for the Evolver with MIDI output for note recall and stereo audio capture, including SysEx patch backup and Local Control configuration.

> [!tip] If you only have 5 minutes
> Connect Evolver MIDI Out to your interface. In your DAW, create one MIDI track (Evolver channel) and one stereo audio track (Evolver inputs). Arm both. Record. Now you have MIDI notes AND audio captured simultaneously -- you can replay the performance or edit the audio.

## Warm-Up (2 min)

Load your performance patch from Session 31. Play a phrase using the mod wheel and aftertouch. This is the kind of expressive performance you want to capture. Up to now, every session has been about learning the Evolver. Now you connect it to your music-making workflow so everything you have learned can go into songs. Load any patch you like for this session.

## Setup

**Physical connections required:**
- **Audio:** Evolver Main Output L and R to your audio interface inputs (two 1/4" cables for stereo)
- **MIDI:** Evolver MIDI Out to your interface's MIDI In (5-pin DIN or USB-MIDI adapter)
- **MIDI In (optional but recommended):** Your interface's MIDI Out to Evolver MIDI In -- for recording MIDI to DAW and playing it back

**On the Evolver (Global Parameters -- press GLOBAL):**
- **MIDI Channel** = your chosen channel (1-16, default is 1). DSI Manual p.9
- **Local Control** = `ON` for standalone playing, `OFF` if your DAW echoes MIDI back (prevents double-triggering). DSI Manual p.12
- **MIDI Program Change** = `ON` if you want the DAW to switch Evolver patches. DSI Manual p.10
- **MIDI Clock** = `External` if you want the Evolver to sync to your DAW's tempo. `Internal` if the Evolver is the clock source. DSI Manual p.10

## Exercises

### Exercise 1: DAW Template Setup (8 min)

Create a reusable template with tracks for MIDI and audio.

1. In your DAW, create the following tracks:
   - **Track 1: "Evolver MIDI"** -- MIDI track
     - Input: your MIDI controller or Evolver MIDI Out
     - Output: Evolver's MIDI channel (the channel you set in Global)
     - This records your note data, mod wheel, aftertouch, pitch bend
   - **Track 2: "Evolver Audio L"** and **Track 3: "Evolver Audio R"** -- OR a single stereo audio track "Evolver Audio"
     - Input: the audio interface inputs connected to Evolver's outputs
     - This captures the actual sound
2. Set your DAW tempo to match the Evolver BPM (or set Evolver MIDI Clock to External to follow the DAW)
3. **Arm both MIDI and audio tracks simultaneously**
4. Play a short phrase on the Evolver. In your DAW you should see:
   - MIDI notes appearing on the MIDI track
   - Audio waveform recording on the audio track
5. Stop recording. Play back the audio -- you should hear your performance
6. Now play back the MIDI -- the Evolver should replay the performance (if MIDI Out is connected). The audio may differ slightly due to analog character -- this is normal and desirable

### Exercise 2: MIDI CC Recording (5 min)

Capture expression data alongside notes for full performance recall.

1. Check that your DAW records continuous controller (CC) data:
   - **CC 1** = Mod Wheel (DSI Manual p.36)
   - **Channel Aftertouch** = Pressure
   - **CC 11** = Expression Pedal (if connected)
   - **Velocity** = captured automatically with each note
2. Arm the MIDI track and record a phrase using mod wheel sweeps and aftertouch
3. After recording, open the MIDI editor. You should see:
   - Notes with varying velocities
   - CC 1 (mod wheel) automation lane showing your wheel movement
   - Aftertouch data showing your pressure changes
4. Edit a CC value in the DAW and play back through the Evolver -- confirm the Evolver responds to the edited automation
5. This workflow means you can perform expressively, capture everything, then fine-tune the CC automation in the DAW later

### Exercise 3: SysEx Patch Backup (5 min)

Back up your patches to the DAW using SysEx dumps (DSI Manual p.41-45).

1. In your DAW, create a new MIDI track for SysEx data (some DAWs need a dedicated SysEx recorder/librarian)
2. On the Evolver:
   - Press **GLOBAL**, navigate to **MIDI SysEx** parameters
   - Select **Send Program** to dump the current patch
   - Your DAW should capture the SysEx data on the armed MIDI track
3. To send all programs: use **Send All Programs** (DSI Manual p.42). This sends all 512 patches -- takes several seconds
4. Save this SysEx data in your DAW session or export as a .syx file
5. **Why this matters:** If you ever need to restore patches, you can send the SysEx data back to the Evolver from the DAW. This is your patch backup strategy
6. Note: SysEx can also be used to automate patch changes within a song -- send a program dump at the start of a section to switch the Evolver's patch

### Exercise 4: Recording a Complete Take (5 min)

Practice the full recording workflow end-to-end.

1. Load a patch you are proud of (any recipe from Sessions 27-30)
2. Set your DAW to a comfortable tempo (Evolver synced via MIDI Clock)
3. Arm MIDI and audio tracks
4. Record a 30-second musical phrase:
   - Use velocity dynamics (soft and hard playing)
   - Use the mod wheel during the take
   - Add aftertouch for vibrato on sustained notes
5. Stop. Listen back to the audio
6. Trim, edit, or loop the best section
7. This is the workflow for every future recording: perform, capture, edit

**Save your DAW session as a template** for future Evolver recording.

## Exploration (optional, hyperfocus days)

- Set up MIDI Program Change automation in the DAW to switch Evolver patches at different song sections
- Record the internal sequencer: start the Evolver sequence, capture the audio, then layer additional live playing on top
- Try the Evolver as a MIDI-controlled effect: send MIDI CC from the DAW to automate filter sweeps, delay changes, or mod amounts while processing external audio (Session 32 technique)

## Output Checklist

- [ ] DAW template created with MIDI track and stereo audio track for Evolver
- [ ] MIDI + audio recorded simultaneously and verified
- [ ] MIDI CC (mod wheel, aftertouch) captured and editable
- [ ] SysEx patch backup sent and captured
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Recording both MIDI and audio simultaneously gives you the best of both worlds: the audio captures the analog character, while the MIDI lets you replay or edit the performance later
- Local Control OFF prevents double-triggering when your DAW echoes MIDI back to the Evolver -- this is the most common setup issue
- SysEx backup is your insurance policy for patches -- always dump your patches before making major changes to the Evolver's memory

## Next Session Preview

Session 34 focuses on mixing the Evolver in a musical context -- frequency planning, stereo imaging, and effects sends to make the Evolver sit well alongside other instruments in a mix.
