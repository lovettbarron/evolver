---
phase: 25-complete-the-octatrack-curriculum-work-so-that-it-is-ready-to-add-to-the-evolver-site-focus-on-song-writing-and-arrangement-and-live-sessions-and-looping
plan: 03a
type: execute
wave: 3
depends_on:
  - 25-02
files_modified:
  - sessions/octatrack/02-foundations-demo-patterns-factory-tour.md
  - sessions/octatrack/03-foundations-project-setup.md
  - sessions/octatrack/04-sample-management-loading-assigning.md
  - sessions/octatrack/05-sample-management-audio-editor.md
  - sessions/octatrack/06-sample-management-slicing.md
  - sessions/octatrack/07-machines-flex-static-deep-dive.md
  - sessions/octatrack/08-machines-thru-neighbor.md
  - sessions/octatrack/10-effects-filters-eq.md
  - sessions/octatrack/11-effects-time-based.md
  - sessions/octatrack/12-effects-character.md
  - sessions/octatrack/13-sequencer-grid-live-trig-types.md
  - sessions/octatrack/14-sequencer-parameter-locks.md
  - sessions/octatrack/15-sequencer-conditional-trigs-fills.md
  - sessions/octatrack/16-sequencer-micro-timing-slide-scale.md
  - sessions/octatrack/17-modulation-lfo-basics.md
  - sessions/octatrack/18-modulation-lfo-designer.md
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
  - D-01 (16 of 25 new sessions authored — covering Modules 1-6 plus the sessions 07/08 from Module 3 and 10-12 from Module 4)
  - D-02 (Modules 1-6 get tighter/lighter authoring per bias — focus-module depth lives in 25-03b)
  - D-03 (every session triple-written before task is done)
  - D-04 (frontmatter matches SessionSchema — duration ≤ 30, all required fields)
  - D-20 (sparse panel markers on critical hardware gestures — Parts key, Scene keys, Track keys, REC1-3)
  - D-21 (marker syntax matches existing parser — control IDs from CONTROL_METADATA)

must_haves:
  truths:
    - "16 new session files exist in all three content locations (sessions/, src/content/sessions/, ~/song/sessions/)"
    - "Every new session passes SessionSchema validation (duration ≤ 30, required fields present, instrument: octatrack)"
    - "Every panel marker in every new session uses control IDs from CONTROL_METADATA and/or sections from SECTION_BOUNDS"
    - "scripts/check-triple-write.sh octatrack exits 0 after all sessions are authored"
    - "Session content follows the 5-section template (Objective → If-you-only-have-5-min → Warm-Up → Setup → Exercises → Output) matching existing drafts"
  artifacts:
    - path: sessions/octatrack/02-foundations-demo-patterns-factory-tour.md
      provides: "Module 1 Session 02 — Demo patterns & factory tour"
      contains: "session_number: 2"
    - path: sessions/octatrack/09-machines-pickup-first-loop.md
      provides: "EXISTING — not modified by this plan (just referenced between sessions 08 and 10)"
      contains: "session_number: 9"
    - path: sessions/octatrack/18-modulation-lfo-designer.md
      provides: "Module 6 final session"
      contains: "session_number: 18"
  key_links:
    - from: "sessions/octatrack/XX-*.md (16 new files)"
      to: "src/content/sessions/octatrack/ + ~/song/sessions/octatrack/"
      via: "triple-write after each authoring commit"
      pattern: "triple-write"
    - from: "sessions/octatrack/XX-*.md marker divs"
      to: src/lib/octatrack-panel-data.ts CONTROL_METADATA/SECTION_BOUNDS
      via: "octatrack-marker-ids validator"
      pattern: 'data-(highlights|sections|zoom)='
---

<objective>
Author the 16 Modules-1-6 Octatrack sessions per the authoritative spec in `instruments/octatrack/modules.md`. Scope: sessions 02, 03, 04, 05, 06, 07, 08, 10, 11, 12, 13, 14, 15, 16, 17, 18 (existing session 09 is kept as-is; this plan authors the gaps between and around it). Every session follows the established 5-section template from existing drafts (01, 09), triple-writes to three content locations, validates against SessionSchema, and limits panel markers to critical hardware gestures per D-20 (this plan is bias-lighter — Module 7-10 depth lives in 25-03b).

Purpose: Curriculum foundation. A learner browsing `/instruments/octatrack/sessions` sees 22 of 31 sessions after this plan lands (6 existing + 16 new). Focus-module depth (Modules 7-10) comes from plan 25-03b in parallel. Wave 4 (patches) depends on all 22 being in place so patch `session_origin` references can reach early-module sessions.

Output: 16 new markdown files (triple-written), all passing validate-content, all panel-marker IDs validated against `octatrack-marker-ids.test.ts`.
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
@sessions/octatrack/01-foundations-orientation-first-sound.md
@sessions/octatrack/09-machines-pickup-first-loop.md

<interfaces>
SessionSchema (src/lib/content/schemas.ts:3-14) — every frontmatter must match:
```typescript
{
  title: string,
  module: string,
  session_number: int (positive),
  duration: int (5..30 inclusive),   // ADHD HARD CAP
  prerequisite: number | null,
  output_type: 'patch' | 'technique' | 'recording' | 'composition',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  tags: string[],
  instrument: string,                 // "octatrack"
  reference?: string,                 // "Elektron Manual Ch. X.Y; Merlin Ch. Z"
}
```

Section template (from sessions/octatrack/01 and 09 — verbatim structure):
```markdown
# Session XX: <title>

**Objective:** One sentence — what you will do and why.

> [!tip] If you only have 5 minutes
> One-paragraph micro-tip for the headline gesture.

## Warm-Up (2 min)
One paragraph reusing a gesture from the prior session.

## Setup
Explicit starting state (typically "from the basic project").

## Exercises

### Exercise 1: <name> (N min)
Numbered steps. **[CONTROL KEYS]** in bold. `PARAM NAMES` in backticks.
[Panel marker div — optional, sparse in this plan]

### Exercise 2..N (remaining time budget)

## Exploration (if time allows)
2-3 bullets.

## Output Checklist
- [ ] 4-6 tangible items.

## Key Takeaways
- 2-4 bullets.

## Next Session Preview
One sentence pointing forward to the next session.
```

Time-budget heuristic (D-04 ADHD cap):
- duration = warmup(2) + setup(2) + exercises + output(2) + exploration(optional) + preview(<1)
- Exercise minutes sum ≤ duration - 6
- If you can't fit in ≤ 30 min, split into XXa / XXb rather than over-run

Panel markers (sparse in this plan — D-20):
- Use only for non-obvious hardware gestures: FUNC+key combos, SCENE A/B holds, Track key + REC combos
- Reference CONTROL_METADATA keys — e.g., `key-func-part`, `key-scene-a`, `key-track-1`..`key-track-8`, `key-rec-1`, `slider-mix-crossfader`
- Syntax (exact):
  ```html
  <div data-octatrack-panel
    data-sections="track,rec"
    data-highlights="key-track-8:amber,key-rec-1:amber"
  ></div>
  ```
- Validated by `src/lib/__tests__/octatrack-marker-ids.test.ts` (Wave 0)

Per-module session spec (from instruments/octatrack/modules.md) — this plan authors:

### Module 1: Foundations
- **02**: "Demo patterns & factory tour" | 20 min | prerequisite: 1 | output_type: technique | difficulty: beginner
  - Topic: Play through demo patterns. Crossfader feel for scenes. Mute/unmute to feel the 8-track structure. Note 5 favorite patterns.
- **03**: "Project setup & file management" | 25 min | prerequisite: 2 | output_type: technique | difficulty: beginner
  - Topic: Create set + project from scratch. Organize samples on CF card. Load into Flex slot list. Audio Pool vs. project-local.

### Module 2: Sample Management (3 sessions)
- **04**: "Loading & assigning samples" | 20 min | prerequisite: 3 | output_type: technique | difficulty: beginner
- **05**: "Audio editor: trim, loop, attributes" | 25 min | prerequisite: 4 | output_type: technique | difficulty: beginner
- **06**: "Slicing & slice playback" | 25 min | prerequisite: 5 | output_type: patch | difficulty: intermediate

### Module 3: Machines & Playback (2 of 3 — session 09 exists)
- **07**: "Flex & Static machines deep dive" | 25 min | prerequisite: 6 | output_type: patch | difficulty: intermediate
- **08**: "Thru & Neighbor machines" | 20 min | prerequisite: 7 | output_type: technique | difficulty: intermediate

### Module 4: Effects (3 sessions)
- **10**: "Filters & EQ (Multi Mode, Parametric, DJ Kill)" | 25 min | prerequisite: 9 | output_type: patch | difficulty: intermediate
- **11**: "Time-based FX (Delay, Reverb, Chorus, Phaser, Flanger)" | 25 min | prerequisite: 10 | output_type: patch | difficulty: intermediate
- **12**: "Character FX (Lo-Fi, Compressor, Comb Filter, Spatializer)" | 25 min | prerequisite: 11 | output_type: patch | difficulty: intermediate

### Module 5: Sequencer Deep Dive (4 sessions)
- **13**: "Grid & live recording, trig types" | 20 min | prerequisite: 12 | output_type: recording | difficulty: intermediate
- **14**: "Parameter locks & sample locks" | 25 min | prerequisite: 13 | output_type: patch | difficulty: intermediate
- **15**: "Conditional trigs & fill mode" | 20 min | prerequisite: 14 | output_type: recording | difficulty: intermediate
- **16**: "Micro timing, slide trigs, scale settings" | 25 min | prerequisite: 15 | output_type: recording | difficulty: advanced

### Module 6: Modulation & LFOs (2 sessions)
- **17**: "LFO basics: 3 LFOs per track" | 20 min | prerequisite: 16 | output_type: patch | difficulty: intermediate
- **18**: "LFO Designer & advanced modulation" | 25 min | prerequisite: 17 | output_type: patch | difficulty: advanced
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 3a.1: Author Module 1-2 sessions (02, 03, 04, 05, 06) + triple-write</name>
  <read_first>
    - instruments/octatrack/modules.md §"Module 1: Foundations" + §"Module 2: Sample Management"
    - sessions/octatrack/01-foundations-orientation-first-sound.md (style reference — sentence style, exercise structure, tag vocabulary)
    - instruments/octatrack/basic-patch.md (starting state referenced in Setup section of every session)
    - instruments/octatrack/overview.md §"Physical controls" (hardware key names to use in **[BOLD]** in exercises)
    - instruments/octatrack/signal-flow.md (audio routing terminology)
    - src/lib/octatrack-panel-data.ts lines 67-144 (CONTROL_METADATA — authoritative control ID source for any markers)
  </read_first>
  <action>
    Author 5 session files, one per module target. Use the modules.md session-specifics block AS THE AUTHORING SPEC — do not add topics beyond what it lists, do not drop topics it includes.

    For EACH of the 5 files below, write a complete markdown file at the specified path using the 5-section template. Time-budget each exercise so exercise minutes sum to ≤ (duration - 6). Use warm-up + setup + output + takeaways + preview as the scaffolding. Reference `[CONTROL KEY]` names in **bold** and `PARAM NAMES` in backticks exactly as the style of sessions/01 and 09.

    **02 — sessions/octatrack/02-foundations-demo-patterns-factory-tour.md**
    - title: "Session 02: Demo Patterns & Factory Tour"
    - module: "Foundations"
    - duration: 20
    - tags: [foundations, demo-patterns, crossfader, 8-track, orientation]
    - reference: "Elektron Manual Ch. 1-3; Merlin Ch. 1"
    - Content per modules.md: Play through demo patterns. Crossfader feel. Mute/unmute 8 tracks. Note 5 favorite patterns.
    - Markers: OPTIONAL single sparse marker on scene/mix section when first introducing crossfader

    **03 — sessions/octatrack/03-foundations-project-setup.md**
    - title: "Session 03: Project Setup & File Management"
    - module: "Foundations"
    - duration: 25
    - tags: [foundations, projects, sets, cf-card, audio-pool, sample-organization]
    - reference: "Elektron Manual Ch. 6-8"
    - Content: Create set+project from scratch. CF card organization (drums/, loops/, textures/). Load into Flex slot list. Audio Pool vs. project-local distinction.
    - Markers: sparse — one marker on `key-func-proj` + `key-nav-yes` when creating the new project

    **04 — sessions/octatrack/04-sample-management-loading-assigning.md**
    - title: "Session 04: Loading & Assigning Samples"
    - module: "Sample Management"
    - duration: 20
    - tags: [samples, flex, static, quick-assign, src-setup]
    - reference: "Elektron Manual Ch. 8, 11.3"
    - Content: Load samples from CF card to Flex and Static lists. Assign via Quick Assign and SRC Setup. Flex (RAM, 80 MB) vs. Static (streamed, up to 2 GB). Swap samples between tracks.
    - Markers: sparse — one marker on `key-param-src` + `key-func-func` for SRC Setup

    **05 — sessions/octatrack/05-sample-management-audio-editor.md**
    - title: "Session 05: Audio Editor — Trim, Loop, Attributes"
    - module: "Sample Management"
    - duration: 25
    - tags: [aed, audio-editor, trim, loop-points, gain, sample-attributes]
    - reference: "Elektron Manual Ch. 13"
    - Content: Open AED. Set start/end points. Loop mode (off, loop, ping-pong). GAIN attribute to normalize. Save edits back to slot.
    - Markers: one marker on `key-func-aed` for opening the editor

    **06 — sessions/octatrack/06-sample-management-slicing.md**
    - title: "Session 06: Slicing & Slice Playback"
    - module: "Sample Management"
    - duration: 25
    - tags: [slicing, slices, start-param, flex, drum-loop, slice-menu]
    - reference: "Elektron Manual Ch. 13.5; Merlin Ch. 3"
    - Content: Slice a drum loop into 16 slices. Set flex to use slices (SRC Setup > SLICE = ON). START parameter to select slice. Slices + sample locks = any slice on any step.
    - Markers: optional — could mark `key-func-aed` + `key-param-src`

    After ALL 5 files are written, triple-write them:
    ```bash
    for f in sessions/octatrack/0[2-6]-*.md; do
      cp "$f" "src/content/sessions/octatrack/"
      cp "$f" "$HOME/song/sessions/octatrack/"
    done
    ```

    Then run validation:
    ```bash
    npm run validate-content
    npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts
    bash scripts/check-triple-write.sh octatrack
    ```

    If any session fails validation, fix it, re-triple-write, rerun validation. All three commands must exit 0 before this task is done.
  </action>
  <verify>
    <automated>npm run validate-content 2>&1 | tail -5; VC=$?; npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts 2>&1 | tail -10; MK=$?; bash scripts/check-triple-write.sh octatrack 2>&1 | tail -5; TW=$?; echo "validate=$VC marker-ids=$MK triple-write=$TW"; ls sessions/octatrack/0[2-6]-*.md 2>&1 | wc -l</automated>
  </verify>
  <acceptance_criteria>
    - 5 new files exist at `sessions/octatrack/02-...md` through `sessions/octatrack/06-...md`
    - Each file contains `instrument: octatrack` in frontmatter (grep)
    - Each file contains `session_number: <N>` where N matches the filename prefix (02..06)
    - Each file has a `duration:` frontmatter field with value 20 or 25 (the spec-mandated durations)
    - No `duration:` value > 30 in any file (grep `duration: 3[1-9]|duration: [4-9]` returns empty)
    - Each file contains all 5 required sections: `## Warm-Up`, `## Setup`, `## Exercises`, `## Output Checklist`, `## Key Takeaways` (+ optional `## Next Session Preview`)
    - `npm run validate-content` exits 0
    - `npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts` exits 0
    - `bash scripts/check-triple-write.sh octatrack` exits 0
    - All 5 files appear in both `src/content/sessions/octatrack/` and `~/song/sessions/octatrack/`
  </acceptance_criteria>
  <done>
    Modules 1-2 authored (5 sessions), triple-written, all validators green, marker IDs validated.
  </done>
</task>

<task type="auto">
  <name>Task 3a.2: Author Module 3-4 sessions (07, 08, 10, 11, 12) + triple-write</name>
  <read_first>
    - instruments/octatrack/modules.md §"Module 3: Machines & Playback" (sessions 07 and 08 — skip 09 which already exists) + §"Module 4: Effects"
    - sessions/octatrack/09-machines-pickup-first-loop.md (existing session — reference for the Machines module style)
    - instruments/octatrack/overview.md §"Machines" (Flex/Static/Thru/Neighbor/Pickup — the 5 machine types)
    - src/lib/octatrack-panel-data.ts (CONTROL_METADATA — need `key-param-fx1`, `key-param-fx2`, `key-param-src` at minimum)
    - previous task output (sessions 02-06) for style continuity
  </read_first>
  <action>
    Author 5 session files:

    **07 — sessions/octatrack/07-machines-flex-static-deep-dive.md**
    - title: "Session 07: Flex & Static Machines Deep Dive"
    - module: "Machines & Playback"
    - duration: 25 | prerequisite: 6 | output_type: patch | difficulty: intermediate
    - tags: [machines, flex, static, sample-swap, long-sample]
    - reference: "Elektron Manual Ch. 11.1-11.2; Merlin Ch. 4"
    - Content per modules.md: Compare Flex and Static side-by-side. Load same sample as both. Hear difference (Flex: instant swaps; Static: longer samples, slight load). Use Static for long backing track while Flex handles drums.
    - Markers: sparse — `key-param-src` + `key-func-func` when toggling between machine types

    **08 — sessions/octatrack/08-machines-thru-neighbor.md**
    - title: "Session 08: Thru & Neighbor Machines"
    - module: "Machines & Playback"
    - duration: 20 | prerequisite: 7 | output_type: technique | difficulty: intermediate
    - tags: [machines, thru, neighbor, effects-processor, external-audio, input]
    - reference: "Elektron Manual Ch. 11.1.3-11.1.4"
    - Content: Track 1 = Thru machine, route Input A/B through it, add effects. Track 2 = Neighbor, chain more effects. OT as real-time FX processor for external gear.
    - Markers: one marker on `key-param-src` when setting the machine

    **10 — sessions/octatrack/10-effects-filters-eq.md**
    - title: "Session 10: Filters & EQ — Multi Mode, Parametric, DJ Kill"
    - module: "Effects"
    - duration: 25 | prerequisite: 9 | output_type: patch | difficulty: intermediate
    - tags: [effects, filter, multi-mode, parametric-eq, dj-kill-eq, fx1]
    - reference: "Elektron Manual Ch. 11.4.10, Appendix B"
    - Content per modules.md: 12/24dB Multi Mode Filter (LP, HP, BP, BR). Parametric EQ for surgical cuts. DJ Kill EQ for performance. Apply filter to drum loop, automate cutoff via p-lock on FX1 page.
    - Markers: one marker on `key-param-fx1`

    **11 — sessions/octatrack/11-effects-time-based.md**
    - title: "Session 11: Time-Based FX — Delay, Reverb, Chorus, Phaser, Flanger"
    - module: "Effects"
    - duration: 25 | prerequisite: 10 | output_type: patch | difficulty: intermediate
    - tags: [effects, delay, reverb, chorus, phaser, flanger, echo-freeze, fx2]
    - reference: "Elektron Manual Ch. 11.4.10, Appendix B"
    - Content: Echo Freeze Delay (signature OT effect). Time=sync, feedback to taste. Freeze delay buffer. Gatebox Plate Reverb + Spring Reverb + Dark Reverb for space. Build a dub-style delay pattern.
    - Markers: one marker on `key-param-fx2` or `key-param-fx1`

    **12 — sessions/octatrack/12-effects-character.md**
    - title: "Session 12: Character FX — Lo-Fi, Compressor, Comb Filter, Spatializer"
    - module: "Effects"
    - duration: 25 | prerequisite: 11 | output_type: patch | difficulty: intermediate
    - tags: [effects, lo-fi, compressor, comb-filter, spatializer, dynamix, character]
    - reference: "Elektron Manual Ch. 11.4.10, Appendix B"
    - Content: Lo-Fi Collection (bit/sample-rate reduction). Dynamix Compressor. Comb Filter (metallic resonance). Spatializer for stereo width. Build lo-fi beat from scratch.
    - Markers: sparse (optional)

    After all 5 files written, triple-write + validate:
    ```bash
    for f in sessions/octatrack/{07,08,10,11,12}-*.md; do
      cp "$f" "src/content/sessions/octatrack/"
      cp "$f" "$HOME/song/sessions/octatrack/"
    done
    npm run validate-content
    npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts
    bash scripts/check-triple-write.sh octatrack
    ```
  </action>
  <verify>
    <automated>npm run validate-content 2>&1 | tail -5; VC=$?; npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts 2>&1 | tail -10; MK=$?; bash scripts/check-triple-write.sh octatrack 2>&1 | tail -5; TW=$?; echo "validate=$VC marker-ids=$MK triple-write=$TW"</automated>
  </verify>
  <acceptance_criteria>
    - 5 new files exist: sessions/octatrack/07-..., 08-..., 10-..., 11-..., 12-...
    - Each file has correct `session_number` matching filename prefix (07, 08, 10, 11, 12)
    - No file has `duration > 30` (grep check)
    - Each file has all 5 required sections
    - `npm run validate-content` exits 0
    - `npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts` exits 0
    - `bash scripts/check-triple-write.sh octatrack` exits 0
    - Session 09 (pre-existing) is unchanged (grep against its content to confirm)
  </acceptance_criteria>
  <done>
    Modules 3 (sessions 07-08) and 4 (sessions 10-12) authored, triple-written, all green.
  </done>
</task>

<task type="auto">
  <name>Task 3a.3: Author Module 5-6 sessions (13, 14, 15, 16, 17, 18) + triple-write</name>
  <read_first>
    - instruments/octatrack/modules.md §"Module 5: Sequencer Deep Dive" + §"Module 6: Modulation & LFOs"
    - previous-task outputs (sessions 02-12) for style continuity
    - src/lib/octatrack-panel-data.ts (control IDs — `key-trig-1`..`key-trig-16`, `knob-data-a`..`f`)
    - sessions/octatrack/01-foundations-orientation-first-sound.md (for any repeated stylistic choices — fallback style reference)
  </read_first>
  <action>
    Author 6 session files:

    **13 — sessions/octatrack/13-sequencer-grid-live-trig-types.md**
    - title: "Session 13: Grid & Live Recording — All Trig Types"
    - module: "Sequencer Deep Dive"
    - duration: 20 | prerequisite: 12 | output_type: recording | difficulty: intermediate
    - tags: [sequencer, grid-recording, live-recording, trig-types, sample-trigs, note-trigs, lock-trigs]
    - reference: "Elektron Manual Ch. 12; Merlin Ch. 4"
    - Content: Grid Recording vs. Live Recording. Trig types: sample, note, lock, trigless, one-shot, swing, slide. Place each type and hear the difference.
    - Markers: sparse — possibly `key-trig-1` cluster reference

    **14 — sessions/octatrack/14-sequencer-parameter-locks.md**
    - title: "Session 14: Parameter Locks & Sample Locks"
    - module: "Sequencer Deep Dive"
    - duration: 25 | prerequisite: 13 | output_type: patch | difficulty: intermediate
    - tags: [sequencer, p-locks, parameter-locks, sample-locks, melodic-sequence, per-step]
    - reference: "Elektron Manual Ch. 12; Merlin Ch. 4 (parameter locks)"
    - Content: Lock ANY parameter per step. Lock filter cutoff on step 5. Sample lock on step 9. Lock pitch on individual steps to make melody from single-note sample. OT's most powerful compositional feature.
    - Markers: one marker on `key-trig-1` / `key-param-src` / `knob-data-a` cluster to show "hold trig + turn knob"

    **15 — sessions/octatrack/15-sequencer-conditional-trigs-fills.md**
    - title: "Session 15: Conditional Trigs & Fill Mode"
    - module: "Sequencer Deep Dive"
    - duration: 20 | prerequisite: 14 | output_type: recording | difficulty: intermediate
    - tags: [sequencer, conditional-trigs, fill-mode, generative, probability]
    - reference: "Elektron Manual Ch. 12.5"
    - Content: Conditional trigs make patterns generative. 1:2 = every 2nd loop. 50% = random chance. PRE = only if previous played. FILL = only during fills. Combine for patterns that evolve over 32/64 loops.
    - Markers: sparse

    **16 — sessions/octatrack/16-sequencer-micro-timing-slide-scale.md**
    - title: "Session 16: Micro Timing, Slide Trigs, Scale Settings"
    - module: "Sequencer Deep Dive"
    - duration: 25 | prerequisite: 15 | output_type: recording | difficulty: advanced
    - tags: [sequencer, micro-timing, slide-trigs, scale, polymetric, swing, time-signature]
    - reference: "Elektron Manual Ch. 12.6-12.7"
    - Content: Micro timing shifts individual trigs by up to 23/384th of a step. Slide trigs glide parameters smoothly between steps. Scale settings: per-track length (polymetric), time signature, tempo per pattern.
    - Markers: sparse

    **17 — sessions/octatrack/17-modulation-lfo-basics.md**
    - title: "Session 17: LFO Basics — 3 LFOs Per Track"
    - module: "Modulation & LFOs"
    - duration: 20 | prerequisite: 16 | output_type: patch | difficulty: intermediate
    - tags: [lfo, modulation, wobble, sync, free-running, per-track]
    - reference: "Elektron Manual Ch. 11.4.7-11.4.9"
    - Content: Each track has 3 LFOs. Each targets any parameter. LFO1 on filter frequency for wobble. LFO2 on panning for stereo movement. Sync to sequencer tempo vs. free-running.
    - Markers: one marker on `key-param-lfo`

    **18 — sessions/octatrack/18-modulation-lfo-designer.md**
    - title: "Session 18: LFO Designer & Advanced Modulation"
    - module: "Modulation & LFOs"
    - duration: 25 | prerequisite: 17 | output_type: patch | difficulty: advanced
    - tags: [lfo-designer, custom-lfo, sample-scrub, tremolo, p-lock-lfo, advanced-modulation]
    - reference: "Elektron Manual Ch. 11.4.9"
    - Content: LFO Designer — draw 16-step custom waveshape. Assign to sample START to scrub. Assign to volume for custom tremolo. Combine with p-locks for deeply evolving textures.
    - Markers: one marker on `key-param-lfo`

    Triple-write + validate:
    ```bash
    for f in sessions/octatrack/{13,14,15,16,17,18}-*.md; do
      cp "$f" "src/content/sessions/octatrack/"
      cp "$f" "$HOME/song/sessions/octatrack/"
    done
    npm run validate-content
    npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts
    bash scripts/check-triple-write.sh octatrack
    npm test -- --run
    ```

    Final check: `npm test -- --run` must exit 0 (full suite) — this task is the last authoring task in this plan, so the suite goes from green (Wave 2 baseline) to green (22 sessions in place).
  </action>
  <verify>
    <automated>npm run validate-content 2>&1 | tail -5; VC=$?; npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts 2>&1 | tail -10; MK=$?; bash scripts/check-triple-write.sh octatrack 2>&1 | tail -5; TW=$?; npm test -- --run 2>&1 | tail -15; FS=$?; echo "validate=$VC marker-ids=$MK triple-write=$TW full-suite=$FS"; ls sessions/octatrack/*.md | wc -l</automated>
  </verify>
  <acceptance_criteria>
    - 6 new files exist: sessions/octatrack/13-..., 14-..., 15-..., 16-..., 17-..., 18-...
    - Total count of `sessions/octatrack/*.md` files = 22 (6 pre-existing + 16 from this plan)
    - Each new file has correct `session_number` matching filename prefix
    - No file in `sessions/octatrack/` has `duration > 30`
    - Each new file has all 5 required sections
    - `npm run validate-content` exits 0
    - `npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts` exits 0
    - `bash scripts/check-triple-write.sh octatrack` exits 0
    - `npm test -- --run` (full suite) exits 0
    - `ls src/content/sessions/octatrack/*.md | wc -l` returns 22
    - `ls ~/song/sessions/octatrack/*.md | wc -l` returns 22
  </acceptance_criteria>
  <done>
    Modules 5-6 authored (6 sessions), total 16 new sessions across this plan, all triple-written, full test suite green. 22/31 total octatrack sessions now in place.
  </done>
</task>

</tasks>

<verification>
Wave 3a exit gate (runs in parallel with 25-03b):
1. `ls sessions/octatrack/*.md | wc -l` returns 22 (6 existing + 16 new from this plan)
2. `ls src/content/sessions/octatrack/*.md | wc -l` returns 22 (triple-write verified)
3. `ls ~/song/sessions/octatrack/*.md | wc -l` returns 22 (triple-write verified)
4. `bash scripts/check-triple-write.sh octatrack` exits 0
5. `npm run validate-content` exits 0 — all 22 sessions pass SessionSchema (duration ≤ 30, required fields, instrument: octatrack)
6. `npm test -- --run src/lib/__tests__/octatrack-marker-ids.test.ts` exits 0 — every marker control ID is in CONTROL_METADATA or SECTION_BOUNDS
7. `npm test -- --run` full suite exits 0
8. Manual dev verification (recommended): `/instruments/octatrack/sessions` lists 22 sessions in ascending numeric order; prerequisite chain is visible and correct (02→01, 03→02, 04→03, ..., 18→17)
9. `git diff --stat src/components/octatrack-panel.tsx src/lib/octatrack-panel-data.ts` is empty (D-22)
</verification>

<success_criteria>
- 16 new session files authored matching the modules.md session-specifics spec
- Every new file is triple-written to all three content locations
- Every new file passes SessionSchema (ADHD 30-min cap honored)
- Every panel marker uses valid CONTROL_METADATA or SECTION_BOUNDS IDs
- Session numbering is contiguous and correct: 01, 02, 03, 04, 05, 06, 07, 08, 09 (existing), 10, 11, 12, 13, 14, 15, 16, 17, 18 — 22 total after this plan
- Prerequisites chain forward correctly (each session's prerequisite = session_number − 1, with null for session 01)
- Panel markers are sparse (D-20 — avg < 2 markers per session in this plan; focus-module density is 25-03b's job)
- Full test suite green, validate-content green, check-triple-write green
- D-22 panel files untouched
</success_criteria>

<output>
After completion, create `.planning/phases/25-*/25-03a-SUMMARY.md` recording: list of 16 files authored with their (session_number, duration, output_type) tuple, panel-marker count per session (to confirm sparseness), any ADHD-cap near-misses that got split or trimmed, and the final full-suite test count.
</output>
