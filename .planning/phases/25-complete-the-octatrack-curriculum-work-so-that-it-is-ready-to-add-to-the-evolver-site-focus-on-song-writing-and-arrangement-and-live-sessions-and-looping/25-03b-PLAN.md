---
phase: 25-complete-the-octatrack-curriculum-work-so-that-it-is-ready-to-add-to-the-evolver-site-focus-on-song-writing-and-arrangement-and-live-sessions-and-looping
plan: 03b
type: execute
wave: 3
depends_on:
  - 25-02
files_modified:
  - sessions/octatrack/19-scenes-fundamentals-assign-fade-mute.md
  - sessions/octatrack/20-scenes-xvol-xlev-mix.md
  - sessions/octatrack/21-scenes-stacking-progressions.md
  - sessions/octatrack/22-parts-save-reload-copy.md
  - sessions/octatrack/23-parts-pattern-variations.md
  - sessions/octatrack/24-parts-multiple-parts-transitions.md
  - sessions/octatrack/26-live-sampling-pickup-mastery.md
  - sessions/octatrack/27-live-sampling-resampling-internal.md
  - sessions/octatrack/30-songwriting-midi-sequencer-external.md
  - src/content/sessions/octatrack/
  - ~/song/sessions/octatrack/
autonomous: true
requirements:
  - D-01
  - D-02
  - D-03
  - D-04
  - D-20
  - D-21
requirements_addressed:
  - D-01 (9 of 25 new sessions — completes focus-module curriculum alongside existing drafts 25, 28, 29, 31)
  - D-02 (focus-module bias — DENSE marker coverage, deep content pedagogy matching existing focus drafts)
  - D-03 (triple-write)
  - D-04 (ADHD 30-min cap)
  - D-20 (dense panel markers on focus-module hero controls: Scene A/B, Crossfader, Parts key, Track+REC combos, MIDI key, Arranger)
  - D-21 (all marker IDs valid against CONTROL_METADATA)

must_haves:
  truths:
    - "9 new focus-module session files exist in all three content locations"
    - "Focus-module sessions have >= 2 panel markers on average"
    - "All panel markers use valid CONTROL_METADATA and/or SECTION_BOUNDS IDs"
    - "scripts/check-triple-write.sh octatrack exits 0 after this plan"
    - "Style matches existing focus-module drafts (25, 28, 29, 31)"
    - "After 25-03a + 25-03b both land, total octatrack sessions = 31 (6 existing + 16 from 25-03a + 9 from this plan)"
  artifacts:
    - path: sessions/octatrack/19-scenes-fundamentals-assign-fade-mute.md
      provides: "Module 7 Session 19 — foundational scene gesture"
      contains: "data-octatrack-panel"
    - path: sessions/octatrack/22-parts-save-reload-copy.md
      provides: "Module 8 Session 22 — Parts mental model cornerstone"
      contains: "data-octatrack-panel"
    - path: sessions/octatrack/26-live-sampling-pickup-mastery.md
      provides: "Module 9 Session 26 — Pickup machine mastery"
      contains: "data-octatrack-panel"
    - path: sessions/octatrack/30-songwriting-midi-sequencer-external.md
      provides: "Module 10 Session 30 — MIDI sequencer for external gear"
      contains: "data-octatrack-panel"
  key_links:
    - from: "sessions/octatrack/19..30-*.md (9 new files)"
      to: "src/content/sessions/octatrack/ + ~/song/sessions/octatrack/"
      via: "triple-write"
      pattern: "triple-write"
    - from: "marker divs in focus-module sessions"
      to: src/lib/octatrack-panel-data.ts CONTROL_METADATA
      via: "octatrack-marker-ids validator"
      pattern: "key-scene-a|key-scene-b|slider-mix-crossfader|key-func-part|key-func-arr|key-func-midi"
---

<objective>
Author the 9 focus-module (Modules 7-10) Octatrack sessions that have NOT already been drafted: sessions 19, 20, 21, 22, 23, 24, 26, 27, 30. Existing drafts 25, 28, 29, 31 remain in place unmodified. Per D-02, authoring weight is biased HEAVY here: deeper content, denser panel markers pointing to hero controls for each focus module (Scene A/B + Crossfader for Module 7; Parts key for Module 8; Pickup machines + REC1-3 for Module 9; Arranger + MIDI tracks for Module 10). This is the headline curriculum content that makes "ready for the site" real.

Purpose: Runs parallel to 25-03a (different session numbers, no file conflicts). Together the two plans complete all 31 sessions. Wave 4 (patches) depends on session numbers 19, 22, 26, 30 existing so patch `session_origin` fields can reference them.

Output: 9 new markdown files (triple-written), all validate-content green, all marker IDs valid.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/phases/25-*/25-CONTEXT.md
@.planning/phases/25-*/25-RESEARCH.md
@.planning/phases/25-*/25-00-PLAN.md
@instruments/octatrack/modules.md
@instruments/octatrack/basic-patch.md
@sessions/octatrack/25-live-sampling-track-recorders.md
@sessions/octatrack/28-live-sampling-improvisation-workflow.md
@sessions/octatrack/29-songwriting-arranger.md
@sessions/octatrack/31-songwriting-composition-workflow.md

<interfaces>
SessionSchema constraint: duration ≤ 30 (ADHD hard cap); all required frontmatter fields.

Section template (same 5-section structure as 25-03a):
Objective → If-you-only-have-5-min → Warm-Up → Setup → Exercises → Output → Takeaways → Next Preview

Focus-module hero controls (where markers MUST appear in this plan):

Module 7 (Scenes & Crossfader) — hero: `key-scene-a`, `key-scene-b`, `slider-mix-crossfader`
  Sections: scene, mix, param
  Typical marker:
  `<div data-octatrack-panel data-sections="scene,mix,param" data-highlights="key-scene-a:amber,key-scene-b:amber,slider-mix-crossfader:blue"></div>`

Module 8 (Parts & Pattern Workflow) — hero: `key-func-part`, `key-nav-pattern`, `key-nav-bank`
  Sections: func, nav
  Typical marker:
  `<div data-octatrack-panel data-sections="func,nav" data-highlights="key-func-part:amber,key-nav-pattern:amber,key-nav-bank:blue"></div>`

Module 9 (Live Sampling & Looping) — hero: `key-track-1`..`key-track-8`, `key-rec-1`..`key-rec-3`, `slider-mix-crossfader`
  Sections: track, rec, scene
  Typical marker:
  `<div data-octatrack-panel data-sections="track,rec,scene" data-highlights="key-track-8:amber,key-rec-1:amber,slider-mix-crossfader:blue" data-zoom="track,rec"></div>`

Module 10 (Songwriting & Arrangement) — hero: `key-func-arr`, `key-func-midi`, `key-nav-pattern`, `key-func-proj`
  Sections: func, nav
  Typical marker:
  `<div data-octatrack-panel data-sections="func,nav" data-highlights="key-func-arr:amber,key-func-midi:blue"></div>`

Per-module session spec (from modules.md) — this plan authors:

Module 7: Scenes & Crossfader
- 19: "Scene fundamentals: assign, fade, mute" | 25 min | prereq 18 | output_type: technique | intermediate
- 20: "XVOL, XLEV, and mix scenes" | 20 min | prereq 19 | output_type: patch | intermediate
- 21: "Scene stacking for smooth progressions" | 25 min | prereq 20 | output_type: patch | advanced

Module 8: Parts & Pattern Workflow
- 22: "Parts deep dive: save, reload, copy" | 25 min | prereq 21 | output_type: technique | intermediate
- 23: "Multiple patterns, one Part (variations)" | 25 min | prereq 22 | output_type: patch | intermediate
- 24: "Multiple Parts for radical transitions" | 25 min | prereq 23 | output_type: composition | advanced

Module 9: Live Sampling & Looping (2 of 4 new — sessions 25, 28 already exist)
- 26: "Pickup machine mastery: loop, overdub, multiply" | 25 min | prereq 25 | output_type: recording | intermediate
- 27: "Live resampling: recording internal audio" | 20 min | prereq 26 | output_type: recording | intermediate

Module 10: Songwriting & Arrangement (1 of 3 new — sessions 29, 31 already exist)
- 30: "MIDI sequencer: controlling external gear" | 25 min | prereq 29 | output_type: technique | advanced
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 3b.1: Author Module 7 sessions (19, 20, 21) — Scenes and Crossfader</name>
  <read_first>
    - instruments/octatrack/modules.md §"Module 7: Scenes and Crossfader"
    - sessions/octatrack/25-live-sampling-track-recorders.md (focus-module style reference)
    - sessions/octatrack/28-live-sampling-improvisation-workflow.md (another focus-module style reference)
    - src/lib/octatrack-panel-data.ts lines 93-98 (scene/mix section — key-scene-a, key-scene-b, slider-mix-crossfader)
    - .planning/phases/25-*/25-RESEARCH.md §"Example 4: Session authoring — Module 7 Session 19" (provides full template for session 19 — use it)
  </read_first>
  <action>
    Author 3 session files. Each MUST include at least 2 panel markers (D-20 focus-module density). First marker typically appears right before Exercise 1; subsequent markers can highlight different sections (e.g., param page when tweaking, scene when performing).

    19 — sessions/octatrack/19-scenes-fundamentals-assign-fade-mute.md
    - title: "Session 19: Scene Fundamentals — Assign, Fade, Mute"
    - module: "Scenes & Crossfader"
    - duration: 25 | prerequisite: 18 | output_type: technique | difficulty: intermediate
    - tags: [scenes, crossfader, parameter-snapshots, scene-mute, performance]
    - reference: "Elektron Manual Ch. 10.3; Merlin Ch. 6"
    - Content per modules.md: Hold [SCENE A/B] + [TRIG] to assign. Scene A clean/default. Scene B filter sweeps + delay feedback + lo-fi. Crossfader morphs. Mute/unmute for instant jumps.
    - Follow RESEARCH.md §"Example 4" — it provides the full session template. Use it (including the 4 exercise skeletons and 2 markers shown there).
    - Required markers: min 2 — one at Exercise 1 showing scene+mix+param sections with scene keys highlighted, one at the mute-as-instant-jump exercise

    20 — sessions/octatrack/20-scenes-xvol-xlev-mix.md
    - title: "Session 20: XVOL, XLEV, and Mix Scenes"
    - module: "Scenes & Crossfader"
    - duration: 20 | prerequisite: 19 | output_type: patch | difficulty: intermediate
    - tags: [scenes, xvol, xlev, mix-fade, performance, track-volume]
    - reference: "Elektron Manual Ch. 10.3.4"
    - Content: XLEV (post-FX track volume in scenes). XVOL (pre-FX amp volume). Build scene that fades in tracks gradually via XLEV. Build scene that fades out via XVOL (letting reverb tails ring). Practice crossfader gestures.
    - Required markers: min 2 — one on scene+param sections showing amp/fx page, one on the mix-fade exercise

    21 — sessions/octatrack/21-scenes-stacking-progressions.md
    - title: "Session 21: Scene Stacking for Smooth Progressions"
    - module: "Scenes & Crossfader"
    - duration: 25 | prerequisite: 20 | output_type: patch | difficulty: advanced
    - tags: [scenes, scene-stacking, progressions, live-set, tension-release, crossfader-gestures]
    - reference: "Merlin Ch. 6 (scene stacking)"
    - Content: Build scenes 1-8 on left side and 9-16 on right side. Each scene adds incremental changes on top of previous. Moving through scenes creates smooth escalation. Tension and release in a live set.
    - Required markers: min 2 — one general scene-section marker at the introduction, one at the 16-scene crossfader exercise

    Triple-write and validate:
    ```bash
    for f in sessions/octatrack/19-*.md sessions/octatrack/20-*.md sessions/octatrack/21-*.md; do
      cp "$f" "src/content/sessions/octatrack/"
      cp "$f" "$HOME/song/sessions/octatrack/"
    done
    npm run validate-content
    npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts
    bash scripts/check-triple-write.sh octatrack
    ```
  </action>
  <verify>
    <automated>npm run validate-content 2>&1 | tail -5; VC=$?; npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts 2>&1 | tail -10; MK=$?; bash scripts/check-triple-write.sh octatrack 2>&1 | tail -5; TW=$?; echo "validate=$VC marker-ids=$MK triple-write=$TW"; grep -c "data-octatrack-panel" sessions/octatrack/19-*.md sessions/octatrack/20-*.md sessions/octatrack/21-*.md</automated>
  </verify>
  <acceptance_criteria>
    - 3 new files exist at sessions/octatrack/19-..., 20-..., 21-...
    - Each file has `module: "Scenes & Crossfader"` in frontmatter
    - Each file has correct `session_number` (19, 20, 21)
    - Each file has `duration` ≤ 30
    - Each file contains the substring `data-octatrack-panel` at least 2 times (grep count per file ≥ 2)
    - At least one marker across sessions 19-21 uses `key-scene-a` OR `key-scene-b` OR `slider-mix-crossfader` in data-highlights
    - `npm run validate-content` exits 0
    - `npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts` exits 0 (all marker IDs valid)
    - `bash scripts/check-triple-write.sh octatrack` exits 0
  </acceptance_criteria>
  <done>
    Module 7 authored (3 sessions) with dense markers on hero scene controls, triple-written, all validators green.
  </done>
</task>

<task type="auto">
  <name>Task 3b.2: Author Module 8 sessions (22, 23, 24) — Parts and Pattern Workflow</name>
  <read_first>
    - instruments/octatrack/modules.md §"Module 8: Parts and Pattern Workflow"
    - previous task output (sessions 19-21) for style continuity
    - sessions/octatrack/29-songwriting-arranger.md (pattern-level thinking reference)
    - src/lib/octatrack-panel-data.ts lines 99-111 (func/nav — key-func-part, key-nav-pattern, key-nav-bank, key-func-proj)
    - .planning/phases/25-*/25-RESEARCH.md §"Open Question 3: Session 22 scope" — answers: author to fit 25 min; if it overruns, split 22a/22b, but prefer tight
  </read_first>
  <action>
    Author 3 session files. Min 2 markers each. Focus on Parts key and pattern navigation.

    22 — sessions/octatrack/22-parts-save-reload-copy.md
    - title: "Session 22: Parts Deep Dive — Save, Reload, Copy"
    - module: "Parts & Pattern Workflow"
    - duration: 25 | prerequisite: 21 | output_type: technique | difficulty: intermediate
    - tags: [parts, pattern-workflow, save, reload, copy, part-vs-pattern, mental-model]
    - reference: "Elektron Manual Ch. 10.1-10.2; Merlin Ch. 7"
    - Content per modules.md: What Parts store (machines, effects, scenes, volumes) vs. Patterns (triggers, p-locks). Save Part 1. Copy to Part 2. In Part 2, swap bass sample for aggressive, change hi-hat FX. Two completely different sounds sharing trigger patterns.
    - Required markers: min 2 — one showing key-func-part + key-nav-pattern relationship, one on the save/reload gesture (key-func-proj + key-nav-yes)
    - IMPORTANT: If content feels like > 25 min, trim the copy-mechanics to a short paragraph and focus the time budget on save-reload gesture mastery. Do NOT split into 22a/22b unless authoring genuinely overruns.

    23 — sessions/octatrack/23-parts-pattern-variations.md
    - title: "Session 23: Multiple Patterns, One Part — Pattern Variations"
    - module: "Parts & Pattern Workflow"
    - duration: 25 | prerequisite: 22 | output_type: patch | difficulty: intermediate
    - tags: [patterns, variations, intro-verse-chorus, copy-pattern, pattern-chain, same-part]
    - reference: "Elektron Manual Ch. 12"
    - Content: Pattern on A01, Part 1 saved. Copy to A02, A03, A04 — all share Part 1. Each pattern has different triggers + p-locks. A01=intro (sparse), A02=verse (full beat), A03=chorus (added melody), A04=break (fills). Chain via PTN + A02.
    - Required markers: min 2 — one on key-nav-pattern + trig cluster, one on the pattern-chain exercise

    24 — sessions/octatrack/24-parts-multiple-parts-transitions.md
    - title: "Session 24: Multiple Parts for Radical Transitions"
    - module: "Parts & Pattern Workflow"
    - duration: 25 | prerequisite: 23 | output_type: composition | difficulty: advanced
    - tags: [parts, transitions, song-structure, radical-change, multi-part, bank-structure]
    - reference: "Elektron Manual Ch. 10.1-10.2, 12; Merlin Ch. 7"
    - Content: Combine lessons. Part 1 = verse sound (clean drums, subtle reverb). Part 2 = chorus sound (distorted drums, aggressive filter). A01-A04 use Part 1. A05-A08 use Part 2. Transitions via scenes. Complete song in one bank.
    - Required markers: min 2 — one on Parts + Scenes together (key-func-part + key-scene-a), one on the bank-structure moment

    Triple-write and validate:
    ```bash
    for f in sessions/octatrack/22-*.md sessions/octatrack/23-*.md sessions/octatrack/24-*.md; do
      cp "$f" "src/content/sessions/octatrack/"
      cp "$f" "$HOME/song/sessions/octatrack/"
    done
    npm run validate-content
    npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts
    bash scripts/check-triple-write.sh octatrack
    ```
  </action>
  <verify>
    <automated>npm run validate-content 2>&1 | tail -5; VC=$?; npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts 2>&1 | tail -10; MK=$?; bash scripts/check-triple-write.sh octatrack 2>&1 | tail -5; TW=$?; echo "validate=$VC marker-ids=$MK triple-write=$TW"; grep -c "data-octatrack-panel" sessions/octatrack/22-*.md sessions/octatrack/23-*.md sessions/octatrack/24-*.md; grep -c "key-func-part" sessions/octatrack/22-*.md sessions/octatrack/23-*.md sessions/octatrack/24-*.md</automated>
  </verify>
  <acceptance_criteria>
    - 3 new files exist at sessions/octatrack/22-..., 23-..., 24-...
    - Each file has `module: "Parts & Pattern Workflow"` in frontmatter
    - Each file has correct session_number and duration ≤ 30
    - Each file has ≥ 2 `data-octatrack-panel` markers (grep count per file)
    - At least one marker across the 3 sessions uses `key-func-part` (the Module 8 hero gesture) — grep `key-func-part` returns ≥ 1 across these 3 files
    - `npm run validate-content` exits 0
    - `npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts` exits 0
    - `bash scripts/check-triple-write.sh octatrack` exits 0
  </acceptance_criteria>
  <done>
    Module 8 authored (3 sessions), dense markers on Parts + Pattern hero controls, triple-written, all green.
  </done>
</task>

<task type="auto">
  <name>Task 3b.3: Author Modules 9+10 sessions (26, 27, 30) — Live Sampling and MIDI Sequencer</name>
  <read_first>
    - instruments/octatrack/modules.md §"Module 9: Live Sampling and Looping" + §"Module 10: Songwriting and Arrangement"
    - sessions/octatrack/25-live-sampling-track-recorders.md (immediately precedes session 26 — style continuity)
    - sessions/octatrack/28-live-sampling-improvisation-workflow.md (session 28 exists; 26-27 author around it)
    - sessions/octatrack/29-songwriting-arranger.md (session 30 author between 29 and 31)
    - sessions/octatrack/31-songwriting-composition-workflow.md (session 31 exists)
    - src/lib/octatrack-panel-data.ts (track/rec/func sections — key-track-N, key-rec-1 to key-rec-3, key-func-arr, key-func-midi)
  </read_first>
  <action>
    Author 3 session files. Min 2 markers each.

    26 — sessions/octatrack/26-live-sampling-pickup-mastery.md
    - title: "Session 26: Pickup Machine Mastery — Loop, Overdub, Multiply"
    - module: "Live Sampling & Looping"
    - duration: 25 | prerequisite: 25 | output_type: recording | difficulty: intermediate
    - tags: [pickup-machines, master-slave, overdub, multiply, live-looping, loop-length]
    - reference: "Elektron Manual Ch. 17.1.4-17.1.5; Merlin Ch. 9"
    - Content per modules.md: Master and Slave Pickup machines. Record first loop on Master (sets length). Overdub on Master. Record complementary on Slave (syncs). Record/play/overdub cycle: [TRACK] + [REC] record, again stop, [PLAY] play. Multiply (double length + add new).
    - Required markers: min 2 — one zooming to track+rec showing key-track-8:amber,key-rec-1:amber,slider-mix-crossfader:blue; one for the Master/Slave distinction
    - Build directly on session 09's Pickup intro; session 26 is the mastery step

    27 — sessions/octatrack/27-live-sampling-resampling-internal.md
    - title: "Session 27: Live Resampling — Recording Internal Audio"
    - module: "Live Sampling & Looping"
    - duration: 20 | prerequisite: 26 | output_type: recording | difficulty: intermediate
    - tags: [resampling, internal-audio, track-recorder, main-output, self-sampling, slice]
    - reference: "Elektron Manual Ch. 17.2"
    - Content per modules.md: Track recorder source = MAIN (main output) or another track. Record your own pattern output. Slice, p-lock, mangle. OT eating its own output.
    - Required markers: min 2 — one on rec section with key-rec-1:amber, one on the resampled-pattern exercise

    30 — sessions/octatrack/30-songwriting-midi-sequencer-external.md
    - title: "Session 30: MIDI Sequencer — Controlling External Gear"
    - module: "Songwriting & Arrangement"
    - duration: 25 | prerequisite: 29 | output_type: technique | difficulty: advanced
    - tags: [midi, midi-sequencer, external-gear, cc, arpeggiator, brain, integration]
    - reference: "Elektron Manual Ch. 15"
    - Content per modules.md: 8 MIDI tracks sequence external gear. Each sends notes, CCs, program changes. MIDI track controlling external synth: note page for melody, CC page for filter automation, arpeggiator for rhythm. OT as brain of the setup (audio + MIDI in one box).
    - Required markers: min 2 — one on key-func-midi, one on CC/arpeggiator config
    - NOTE: This is the FIRST session surfacing `midi_sequencer=true` capability from the schema. Content is informational only (D-10) — no special UI affordance yet.

    Triple-write and validate:
    ```bash
    for f in sessions/octatrack/26-*.md sessions/octatrack/27-*.md sessions/octatrack/30-*.md; do
      cp "$f" "src/content/sessions/octatrack/"
      cp "$f" "$HOME/song/sessions/octatrack/"
    done
    npm run validate-content
    npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts
    bash scripts/check-triple-write.sh octatrack
    npm test -- --run
    ```

    After this task, if 25-03a has also landed, total `sessions/octatrack/*.md` count should be 31. Verify file count.
  </action>
  <verify>
    <automated>npm run validate-content 2>&1 | tail -5; VC=$?; npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts 2>&1 | tail -10; MK=$?; bash scripts/check-triple-write.sh octatrack 2>&1 | tail -5; TW=$?; npm test -- --run 2>&1 | tail -15; FS=$?; echo "validate=$VC marker-ids=$MK triple-write=$TW full-suite=$FS"; ls sessions/octatrack/*.md | wc -l; grep -c "data-octatrack-panel" sessions/octatrack/26-*.md sessions/octatrack/27-*.md sessions/octatrack/30-*.md</automated>
  </verify>
  <acceptance_criteria>
    - 3 new files exist at sessions/octatrack/26-..., 27-..., 30-...
    - Each file has correct `module` frontmatter (26/27 = "Live Sampling & Looping", 30 = "Songwriting & Arrangement")
    - Each file has correct session_number and duration ≤ 30
    - Each file has ≥ 2 `data-octatrack-panel` markers
    - At least one marker uses `key-rec-1` or `key-rec-2` or `key-rec-3` across sessions 26-27
    - Session 30 contains at least one marker using `key-func-midi`
    - `npm run validate-content` exits 0
    - `npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts` exits 0
    - `bash scripts/check-triple-write.sh octatrack` exits 0
    - `npm test -- --run` (full suite) exits 0
    - If 25-03a has landed: `ls sessions/octatrack/*.md | wc -l` returns 31
  </acceptance_criteria>
  <done>
    Modules 9 (sessions 26-27) and 10 (session 30) authored, dense markers on Pickup/REC and MIDI hero controls, triple-written, full suite green.
  </done>
</task>

</tasks>

<verification>
Wave 3b exit gate (runs in parallel with 25-03a):
1. 9 new session files exist in sessions/octatrack/ covering session numbers 19, 20, 21, 22, 23, 24, 26, 27, 30
2. All 9 new files are triple-written to src/content/sessions/octatrack/ and ~/song/sessions/octatrack/
3. Every focus-module session has ≥ 2 panel markers
4. All panel markers use valid CONTROL_METADATA and/or SECTION_BOUNDS IDs (marker-ids test green)
5. `npm run validate-content` exits 0
6. `bash scripts/check-triple-write.sh octatrack` exits 0
7. `npm test -- --run` full suite exits 0
8. When both 25-03a and 25-03b complete: `ls sessions/octatrack/*.md | wc -l` returns 31 (full curriculum)
9. `git diff --stat src/components/octatrack-panel.tsx src/lib/octatrack-panel-data.ts` is empty (D-22)
</verification>

<success_criteria>
- 9 new focus-module session files authored matching the modules.md session-specifics spec
- Each file is triple-written to all three content locations
- Each file passes SessionSchema (ADHD cap honored)
- Every file has ≥ 2 panel markers on focus-module hero controls
- Module 7 sessions reference key-scene-a / key-scene-b / slider-mix-crossfader
- Module 8 sessions reference key-func-part
- Module 9 sessions reference key-rec-1/2/3 and key-track-*
- Module 10 session 30 references key-func-midi
- Combined with 25-03a and the 6 existing drafts, total 31 sessions live in all three content locations
- Full test suite green, validate-content green, check-triple-write green
- D-22 panel files untouched
</success_criteria>

<output>
After completion, create `.planning/phases/25-*/25-03b-SUMMARY.md` recording: list of 9 files authored with (session_number, duration, output_type, marker_count) tuple, distribution of hero controls used in markers (count per unique control ID), any ADHD-cap near-misses that got trimmed (per Open Question 3), and confirmation of total session count once both 25-03a and 25-03b have landed.
</output>
