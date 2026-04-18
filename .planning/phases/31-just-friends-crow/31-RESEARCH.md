# Phase 31: Just Friends + Crow - Research

**Researched:** 2026-04-19
**Domain:** Eurorack module curriculum authoring + interactive SVG panel components
**Confidence:** HIGH

## Summary

Phase 31 adds two new modules -- Mannequins Just Friends (14HP) and Monome Crow (2HP) -- following the proven end-to-end pattern from Phases 29-30. The deliverables are: 11 JF sessions, 5-6 Crow sessions (3 standalone + 2-3 i2c combined), 2 hand-placed panel SVGs, scraped web documentation as local markdown, and all integration wiring (session-detail regex, standalone panel pages, quick-ref-panel).

Just Friends is a well-documented six-channel function generator with 4 knobs, 2 switches, 6 trigger inputs, 6 outputs, 1 MIX output, 1 FM input, and 1 RUN jack (21 total controls + 6 LEDs). It has columnar eurorack layout. Crow is the smallest panel in the project at 2HP with only 2 inputs, 4 outputs, and a USB-C connector (6 jacks total, no knobs/switches). The i2c integration between Crow and JF is well-documented via the "Just Type" protocol with 14 commands.

**Primary recommendation:** Follow Phase 30's module-by-module execution pattern. Build JF end-to-end first (curriculum + panel + overview), then Crow standalone, then i2c combined sessions last. Scrape reference documentation before any curriculum writing begins.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Crow gets 3 standalone sessions: (1) what Crow is, USB connection, Druid REPL; (2) basic input/output scripts (read a knob, send a voltage); (3) ASL slope language for envelopes/LFOs
- **D-02:** Crow is taught as a scripting platform with its own value before introducing i2c. Standalone sessions build the foundation needed to understand what Crow brings to the JF connection
- **D-03:** 2-3 combined i2c sessions live under Crow's namespace (`sessions/crow/04-i2c-*.md` onwards). Crow is the "host" that drives JF -- JF's sessions stay purely standalone
- **D-04:** Combined sessions are marked in frontmatter as requiring both modules. They're optional extensions, clearly flagged in the UI as needing JF + Crow
- **D-05:** This puts Crow at 5-6 total sessions (3 standalone + 2-3 combined), aligning with the CURR-05 requirement range of 4-6
- **D-06:** Just Friends gets 11 sessions total (stretching slightly beyond the CURR-04 range of 8-10). JF is a deep module with three distinct modes -- the extra session is justified
- **D-07:** Session distribution: 1 foundations, 1 dedicated Run/Intone session, 3 Shape mode, 3 Cycle mode, 3 Sound mode. Equal depth across all three modes
- **D-08:** Run jack and Intone get their own dedicated session early in the curriculum. These span all modes and fundamentally change JF's behavior -- they deserve focused attention rather than being woven into mode sessions
- **D-09:** Scrape web documentation to local markdown files in `references/`. Mannequins docs from whimsicalraps.com, Crow docs from monome.org. Ensures offline access and stable references
- **D-10:** Download high-res panel photos alongside the scraped docs for hand-placement of panel SVGs
- **D-11:** Full interactive panel SVG for both modules, including Crow at 2HP. Consistency across all modules -- same tooltips, session annotations, and interactive behavior regardless of size
- **D-12:** JF panel at 14HP with 6-channel layout (6 outputs, trigger/run/intone/fm inputs, time/intone/fm knobs, mode switch)
- **D-13:** Crow panel at 2HP -- smallest panel in the project (~6 controls: 2 inputs, 2 outputs, USB indicator)
- **D-14:** Follow Phase 30 pattern: one module end-to-end before starting the next
- **D-15:** Just Friends first (more sessions, more complex panel), then Crow standalone, then i2c combined sessions last (requires both modules to be complete)

### Claude's Discretion
- Specific session topics and titles within the mode/progression constraints above
- Panel SVG control placement coordinates (hand-placed from scraped references and photos)
- Session frontmatter tags, difficulty progression, and warm-up design
- Specific i2c integration exercises and creative patch ideas
- Which web pages to scrape and how to structure the local markdown

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CURR-04 | Just Friends curriculum (8-10 sessions for Shape/Cycle/Sound modes) | D-06/D-07: 11 sessions covering all 3 modes with equal depth. Control inventory, mode documentation, and RUN modes all researched. |
| CURR-05 | Crow curriculum (4-6 sessions for scripting, i2c, standalone I/O) | D-01/D-05: 5-6 sessions (3 standalone + 2-3 i2c combined). Crow scripting API, ASL, Druid, and Just Type i2c protocol all documented. |
| PANEL-05 | Hand-placed SVG panel for Mannequins Just Friends (14HP, modulator/VCO/EG) | Complete control inventory: 4 knobs, 2 switches, 6 trigger inputs, 6 outputs, MIX out, FM in, RUN jack, 6 LEDs = 27 elements. ViewBox: 210x380. |
| PANEL-06 | Hand-placed SVG panel for Monome Crow (2HP, scriptable I/O) | Complete control inventory: 2 inputs, 4 outputs, USB-C indicator = 7 elements. ViewBox: 60x380 (closest clean 2HP mapping). |

</phase_requirements>

## Standard Stack

### Core (already in project)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.x | Panel component rendering | Project standard |
| Next.js | 15.x | App routing, SSR | Project standard |
| Vitest | 3.2.4 | Unit/component testing | Project standard |
| Zod | 4.x | Schema validation (SessionSchema) | Project standard |
| TypeScript | 5.x | Type safety | Project standard |

### No New Dependencies
This phase requires zero new npm packages. All patterns are established from Phases 28-30.

## Architecture Patterns

### File Structure for New Modules
```
src/lib/just-friends-panel-data.ts        # Control metadata + positions
src/lib/crow-panel-data.ts                # Control metadata + positions
src/components/just-friends-panel.tsx      # Panel React component
src/components/crow-panel.tsx             # Panel React component
src/lib/__tests__/just-friends-panel-data.test.ts
src/lib/__tests__/crow-panel-data.test.ts
src/components/__tests__/just-friends-panel.test.tsx
src/components/__tests__/crow-panel.test.tsx
sessions/just-friends/*.md                # 11 sessions
sessions/crow/*.md                        # 5-6 sessions
modules/just-friends/overview.md          # Expanded overview (stub exists)
modules/crow/overview.md                  # Expanded overview (stub exists)
references/just-friends-docs.md           # Scraped from whimsicalraps.com
references/crow-reference.md             # Scraped from monome.org
```

### Pattern 1: Data-Driven Panel (Cascadia/Maths pattern)
Both JF and Crow should use the data-driven approach (not inline JSX). JF has repeated control types (6 trigger inputs, 6 outputs) that benefit from loop rendering. Crow is tiny but consistency across all module panels matters.

```typescript
// src/lib/just-friends-panel-data.ts
export interface JustFriendsControlMeta {
  id: string;
  name: string;
  module: string; // 'controls' | 'triggers' | 'outputs' | 'io'
  type: 'knob' | 'switch' | 'jack-in' | 'jack-out' | 'led';
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';
}
```

### Pattern 2: Session Frontmatter (eurorack module format)
```yaml
---
title: 'Session 01: Foundations -- Just Friends Architecture'
session_number: 1
duration: 25
prerequisite: null
output_type: technique
difficulty: beginner
tags:
  - foundations
  - just-friends
instrument: just-friends
instrument_type: eurorack_module
reference: 'Just Friends docs'
section: Foundations
---
```

### Pattern 3: i2c Combined Session Frontmatter
Combined sessions need to clearly indicate dual-module requirement:
```yaml
---
title: 'Session 04: i2c -- Crow Meets Just Friends'
session_number: 4
duration: 30
prerequisite: 3
output_type: technique
difficulty: intermediate
tags:
  - i2c
  - just-friends
  - crow
  - combined
instrument: crow
instrument_type: eurorack_module
reference: 'Just Type protocol'
section: i2c Integration
requires_modules:
  - just-friends
  - crow
---
```
Note: `requires_modules` is not currently in SessionSchema. Either extend the schema or use tags + a frontmatter convention. Recommend using `.passthrough()` behavior (already enabled) so extra fields are preserved without schema changes.

### Pattern 4: Integration Wiring Checklist
Each new panel requires updates to these files:
1. `src/components/session-detail.tsx` -- add regex, parser, conditional render
2. `src/app/modules/[slug]/panel/page.tsx` -- add to PANEL_CONFIG
3. `src/app/modules/[slug]/panel/module-panel-client.tsx` -- add conditional render
4. `src/components/quick-ref-panel.tsx` -- add conditional render
5. `src/components/patch-detail.tsx` -- add conditional render (if patches exist)

### Anti-Patterns to Avoid
- **Algorithmic control placement:** Never compute JF or Crow positions from a grid. Hand-place from panel photos
- **Horizontal row layout for JF:** JF is columnar eurorack, not row-based desktop synth
- **Merging JF and Crow into one curriculum:** They are separate modules with separate configs, sessions, and panels
- **Writing i2c sessions before standalone Crow sessions:** The standalone sessions build prerequisite knowledge

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Panel SVG rendering | Custom SVG generator | Data-driven pattern from Maths/Ikarie | 8 proven implementations exist |
| Session schema validation | Custom parser | Zod SessionSchema with .passthrough() | Already validates all session files |
| Cable rendering | Custom path math | CablePath component from Cascadia | Bezier geometry already handled |
| Content pipeline | New file watchers | Existing triple-write pattern | Proven in all prior modules |

## Just Friends -- Complete Control Inventory

**Source:** Whimsical Raps Technical Maps (GitHub), ModularGrid, official documentation
**Confidence:** HIGH

### Physical Controls (27 elements + 6 LEDs = 33 total)

**Knobs (4):**
| ID | Name | Signal |
|----|------|--------|
| knob-jf-time | TIME | -- |
| knob-jf-intone | INTONE | -- |
| knob-jf-curve | CURVE | -- |
| knob-jf-ramp | RAMP | -- |

Note: The FM knob is actually an attenuverter for the FM input jack. It doubles as a fine-tune control when FM jack is unpatched.

**Knobs or Attenuverters (1):**
| ID | Name | Signal |
|----|------|--------|
| knob-jf-fm | FM | -- |

**Switches (2):**
| ID | Name | Type | Positions |
|----|------|------|-----------|
| switch-jf-sound-shape | SOUND/SHAPE | 2-way | Sound, Shape |
| switch-jf-mode | MODE | 3-way | Transient, Sustain, Cycle |

**Trigger/Gate Inputs (6):**
| ID | Name | Signal |
|----|------|--------|
| jack-jf-identity-trig | IDENTITY | gate |
| jack-jf-2n-trig | 2N | gate |
| jack-jf-3n-trig | 3N | gate |
| jack-jf-4n-trig | 4N | gate |
| jack-jf-5n-trig | 5N | gate |
| jack-jf-6n-trig | 6N | gate |

**CV Inputs (4):**
| ID | Name | Signal |
|----|------|--------|
| jack-jf-time-in | TIME | cv |
| jack-jf-intone-in | INTONE | cv |
| jack-jf-fm-in | FM | cv |
| jack-jf-run-in | RUN | cv |

**Outputs (7):**
| ID | Name | Signal |
|----|------|--------|
| jack-jf-identity-out | IDENTITY | cv |
| jack-jf-2n-out | 2N | cv |
| jack-jf-3n-out | 3N | cv |
| jack-jf-4n-out | 4N | cv |
| jack-jf-5n-out | 5N | cv |
| jack-jf-6n-out | 6N | cv |
| jack-jf-mix-out | MIX | cv |

**LEDs (6):**
| ID | Name |
|----|------|
| led-jf-identity | IDENTITY LED |
| led-jf-2n | 2N LED |
| led-jf-3n | 3N LED |
| led-jf-4n | 4N LED |
| led-jf-5n | 5N LED |
| led-jf-6n | 6N LED |

**Total: 5 knobs + 2 switches + 10 jacks-in + 7 jacks-out + 6 LEDs = 30 elements**

### JF ViewBox
14HP = 70.1mm wide. ViewBox: `0 0 210 380` (14HP standard from dimensions table)

### JF Panel Layout (Columnar)
```
Top:        JUST FRIENDS title + Mannequins brand
Upper:      TIME knob (left), INTONE knob (right)
            CURVE knob (left), RAMP knob (right)
            FM knob (center), switches (SOUND/SHAPE, MODE)
Middle:     6 trigger inputs across (IDENTITY through 6N)
            6 LEDs (one per channel)
Lower:      6 channel outputs across (IDENTITY through 6N)
Bottom:     RUN, FM, TIME, INTONE CV inputs + MIX output
```

**CRITICAL:** This layout is estimated from documentation. Actual positions MUST be hand-placed from a downloaded panel photo per the synth-panel-builder skill hard gate.

## Crow -- Complete Control Inventory

**Source:** Monome official documentation
**Confidence:** HIGH

### Physical Controls (6 jacks + 1 USB = 7 elements)

**Inputs (2):**
| ID | Name | Signal |
|----|------|--------|
| jack-crow-in-1 | IN 1 | cv |
| jack-crow-in-2 | IN 2 | cv |

**Outputs (4):**
| ID | Name | Signal |
|----|------|--------|
| jack-crow-out-1 | 1 | cv |
| jack-crow-out-2 | 2 | cv |
| jack-crow-out-3 | 3 | cv |
| jack-crow-out-4 | 4 | cv |

**USB (1):**
| ID | Name | Type |
|----|------|------|
| usb-crow | USB-C | led (indicator) |

**Total: 2 jacks-in + 4 jacks-out + 1 LED indicator = 7 elements**

No knobs, no switches, no sliders. This is a purely digital module controlled via scripting.

### Crow ViewBox
2HP = 10.2mm wide. ViewBox: `0 0 60 380` (extrapolating from 4HP=60 in the dimensions table -- 2HP is actually ~30px wide at the standard scale, but 60px minimum for legibility). The 2HP physical width is only 10.2mm, making this the tightest panel in the project. Consider `0 0 40 380` for true scale, or `0 0 60 380` for readability.

**Decision needed by implementer:** True-to-scale (40x380, very narrow) vs. readable (60x380, slightly wider than physical). Recommend 60x380 for usability -- tooltip text and jack labels need minimum width.

## Crow Scripting & i2c Reference

### Druid REPL
Druid is a command-line tool for communicating with Crow over USB. Install via `pip install monome-druid`. Allows real-time Lua execution and script uploading.

### Core Scripting Concepts (for curriculum)
1. **Inputs:** `input[1].mode('stream', 0.1)` -- configure input behavior (stream, change, peak, freq, clock)
2. **Outputs:** `output[1].volts = 3.0` -- set output voltage directly
3. **ASL (A Slope Language):** `output[1].action = loop{ to(5, 1), to(0, 1) }` -- build envelopes/LFOs
4. **Sequins:** `s = sequins{0, 2, 4, 7}` -- musical sequencing tables
5. **Metro:** `metro[1].time = 0.5; metro[1].event = function() ... end` -- timed events

### Just Type i2c Protocol (14 commands)
Key commands for curriculum:
| Command | Args | Use in Curriculum |
|---------|------|-------------------|
| `ii.jf.trigger(ch, state)` | channel 1-6, state 0/1 | Session 4: First i2c control |
| `ii.jf.play_note(pitch, level)` | V/oct pitch, level volts | Session 5: Polyphonic voice allocation |
| `ii.jf.play_voice(ch, pitch, level)` | channel, pitch, level | Session 5: Specific voice control |
| `ii.jf.mode(state)` | 0 or 1 | Session 4: Enter Synthesis/Geode mode |
| `ii.jf.run_mode(mode)` | 0 or 1 | Session 5/6: RUN modes over i2c |
| `ii.jf.transpose(pitch)` | V/oct offset | Session 5: Pitch transposition |
| `ii.jf.tick(bpm_or_clock)` | BPM or clock ticks | Session 6: Geode rhythmic mode |
| `ii.jf.retune(ch, num, den)` | channel, ratio | Advanced: Custom INTONE ratios |

## Curriculum Structure

### Just Friends (11 sessions)
| # | Title Suggestion | Section | Mode | Difficulty | Duration |
|---|-----------------|---------|------|------------|----------|
| 01 | Foundations -- JF Architecture & First Slopes | Foundations | All | beginner | 25 |
| 02 | Run & Intone -- The Cross-Cutting Controls | Foundations | All | beginner | 25 |
| 03 | Shape: Triggered Envelopes (Transient) | Shape Mode | Shape | beginner | 25 |
| 04 | Shape: Gated Envelopes & ASR (Sustain) | Shape Mode | Shape | intermediate | 25 |
| 05 | Shape: Burst & Strata (Cycle + RUN) | Shape Mode | Shape | intermediate | 30 |
| 06 | Cycle: LFO Textures & Phase Relationships | Cycle Mode | Cycle | intermediate | 25 |
| 07 | Cycle: Rhythmic Modulation with INTONE | Cycle Mode | Cycle | intermediate | 25 |
| 08 | Cycle: Volley & Floom (RUN Modes) | Cycle Mode | Cycle | advanced | 30 |
| 09 | Sound: Six Oscillators & INTONE Chords | Sound Mode | Sound | intermediate | 25 |
| 10 | Sound: FM Synthesis & Impulse Trains | Sound Mode | Sound | advanced | 25 |
| 11 | Sound: Plume & Dynamic Voice Allocation | Sound Mode | Sound | advanced | 30 |

### Crow Standalone (3 sessions)
| # | Title Suggestion | Section | Difficulty | Duration |
|---|-----------------|---------|------------|----------|
| 01 | What is Crow -- USB, Druid REPL, First Voltage | Foundations | beginner | 25 |
| 02 | Input/Output Scripts -- Read & Respond | Scripting | beginner | 25 |
| 03 | ASL -- Slopes, Envelopes, and LFOs | Scripting | intermediate | 30 |

### Crow i2c Combined (2-3 sessions)
| # | Title Suggestion | Section | Difficulty | Duration |
|---|-----------------|---------|------------|----------|
| 04 | i2c: Crow Meets Just Friends | i2c Integration | intermediate | 30 |
| 05 | i2c: Polyphonic Sequencing & Voice Allocation | i2c Integration | advanced | 30 |
| 06 | i2c: Geode Rhythms & Generative Patches | i2c Integration | advanced | 30 |

Session 06 is optional (D-05 says 2-3 combined sessions).

## Common Pitfalls

### Pitfall 1: Proceeding Without Panel Photos
**What goes wrong:** Agent generates layout from textual description, produces wrong aspect ratio and misplaced controls. Requires full rewrite.
**Why it happens:** JF and Crow docs are web-only (no PDF manuals). Scraping text gives control names but not positions.
**How to avoid:** D-10 explicitly requires downloading panel photos BEFORE panel work. Block panel tasks on photo availability.
**Warning signs:** Panel component created without a `references/*.jpg` file for the module.

### Pitfall 2: Wrong ViewBox for 2HP Crow
**What goes wrong:** Using the same scale as larger modules produces an illegibly tiny panel, or using an oversized viewBox produces a panel that looks nothing like the physical module.
**Why it happens:** 2HP is unprecedented in this project. The dimensions table doesn't include 2HP explicitly.
**How to avoid:** Test render Crow panel early. Start with 60x380 viewBox and adjust based on visual result.
**Warning signs:** Jack labels overlapping, tooltips clipped, or panel appearing as a thin stripe.

### Pitfall 3: JF Trigger Input Normalling
**What goes wrong:** Sessions or panel don't explain that JF trigger inputs are normalled (IDENTITY cascades to 2N, 2N to 3N, etc.). Users patch triggers to each input individually when they don't need to.
**Why it happens:** Normalling is documented but easy to overlook when writing individual mode sessions.
**How to avoid:** Cover normalling explicitly in Session 01 (Foundations). Add a note in the panel tooltip for trigger jacks.
**Warning signs:** Session exercises ask users to patch 6 separate triggers when 1 would suffice.

### Pitfall 4: Missing Triple-Write for Sessions
**What goes wrong:** Sessions written to `sessions/` directory but not synced to `src/content/sessions/` and `~/song/sessions/`.
**Why it happens:** Easy to forget the three-location requirement, especially when writing many sessions.
**How to avoid:** Each session-writing task must explicitly list all three write locations. Use the established triple-write pipeline.
**Warning signs:** Sessions visible in the repo but not rendering in the app.

### Pitfall 5: i2c Sessions Without Clear Prerequisites
**What goes wrong:** Users attempt i2c sessions without completing standalone Crow or JF sessions, get confused by unfamiliar concepts from both modules simultaneously.
**How to avoid:** i2c sessions (04-06) have `prerequisite: 3` (Crow session 03). Session text should also reference specific JF sessions as recommended background.

## Code Examples

### Panel Data File Pattern (from Maths)
```typescript
// Source: src/lib/maths-panel-data.ts (verified in codebase)
export interface JustFriendsControlMeta {
  id: string;
  name: string;
  module: string;
  type: 'knob' | 'switch' | 'jack-in' | 'jack-out' | 'led';
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';
}

export const CONTROL_METADATA: Record<string, JustFriendsControlMeta> = {
  'knob-jf-time': { id: 'knob-jf-time', name: 'TIME', module: 'controls', type: 'knob' },
  // ... remaining controls
};

export const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  // Hand-placed from panel photo -- DO NOT compute algorithmically
};
```

### Session Detail Integration (regex pattern)
```typescript
// Source: src/components/session-detail.tsx (verified in codebase)
const JF_PANEL_RE = /<div data-just-friends-panel((?:[^>"]|"[^"]*")*)>\s*<\/div>/g;
const CROW_PANEL_RE = /<div data-crow-panel((?:[^>"]|"[^"]*")*)>\s*<\/div>/g;
```

### Standalone Panel Page Config
```typescript
// Source: src/app/modules/[slug]/panel/page.tsx (verified in codebase)
// Add to PANEL_CONFIG:
'just-friends': {
  title: 'Just Friends Panel',
  description: 'Interactive panel reference for Mannequins Just Friends. Six-channel function generator and oscillator. Drag knobs to explore.',
  maxWidth: 'max-w-[400px]',
},
crow: {
  title: 'Crow Panel',
  description: 'Interactive panel reference for Monome Crow. Scriptable USB-CV-i2c bridge.',
  maxWidth: 'max-w-[200px]',
},
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Per-module React components | Data-driven CONTROL_METADATA + generic render loop | Phase 28 (2026-04) | All new modules use data-driven pattern |
| PDF manual reference | Web-scraped markdown | Phase 31 (this phase) | JF and Crow docs are web-only, no PDFs exist |
| Single-module sessions only | Combined multi-module sessions | Phase 31 (this phase) | First time the project has cross-module sessions |

## Open Questions

1. **Crow ViewBox width**
   - What we know: 2HP = 10.2mm physical. No 2HP entry in dimensions table. 4HP = 60px wide.
   - What's unclear: Whether 30-40px width is usable or if 60px is needed for legibility
   - Recommendation: Start with 60x380, test render, adjust if needed

2. **`requires_modules` frontmatter field**
   - What we know: SessionSchema uses `.passthrough()` so extra fields are preserved. No validation will break.
   - What's unclear: Whether the UI needs to read this field to show "requires JF + Crow" badges
   - Recommendation: Add the field in frontmatter, rely on `.passthrough()`. UI support can come in a follow-up phase if needed. Tags (`combined`, `i2c`) provide basic filtering.

3. **Panel photos availability**
   - What we know: D-10 requires downloading photos. No JF or Crow photos exist yet in `public/modules/`
   - What's unclear: Whether ModularGrid or manufacturer sites have suitable high-res images
   - Recommendation: Task 1 should include downloading photos. If no suitable photo is found, ask user for a panel photo before proceeding with panel work (per skill hard gate).

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.2.4 |
| Config file | vitest.config.ts (exists) |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PANEL-05 | JF panel data has correct control count, types, positions | unit | `npx vitest run src/lib/__tests__/just-friends-panel-data.test.ts -x` | Wave 0 |
| PANEL-05 | JF panel component renders without crash | unit | `npx vitest run src/components/__tests__/just-friends-panel.test.tsx -x` | Wave 0 |
| PANEL-06 | Crow panel data has correct control count, types, positions | unit | `npx vitest run src/lib/__tests__/crow-panel-data.test.ts -x` | Wave 0 |
| PANEL-06 | Crow panel component renders without crash | unit | `npx vitest run src/components/__tests__/crow-panel.test.tsx -x` | Wave 0 |
| CURR-04 | JF sessions valid frontmatter (11 sessions) | manual | Verify each session file has valid YAML frontmatter | -- |
| CURR-05 | Crow sessions valid frontmatter (5-6 sessions) | manual | Verify each session file has valid YAML frontmatter | -- |
| CURR-04 | JF sessions cover Shape, Cycle, Sound modes | manual | Check session section/tags distribution | -- |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/lib/__tests__/just-friends-panel-data.test.ts` -- covers PANEL-05 data
- [ ] `src/components/__tests__/just-friends-panel.test.tsx` -- covers PANEL-05 component
- [ ] `src/lib/__tests__/crow-panel-data.test.ts` -- covers PANEL-06 data
- [ ] `src/components/__tests__/crow-panel.test.tsx` -- covers PANEL-06 component

## Project Constraints (from CLAUDE.md)

- **Session length:** 15-30 minutes, always with a single focused objective
- **Session output:** Every session produces something tangible
- **File naming:** kebab-case throughout
- **Panel skill:** Read `.claude/skills/synth-panel-builder/SKILL.md` before any panel work
- **Reference-first:** Never place controls without a reference image (hard gate)
- **Triple-write:** Update `sessions/`, `src/content/sessions/`, and `~/song/sessions/`
- **No rushing modules:** Mastery requires repetition
- **Documented patches:** Undocumented patches are lost patches

## Sources

### Primary (HIGH confidence)
- [whimsicalraps/Mannequins-Technical-Maps](https://github.com/whimsicalraps/Mannequins-Technical-Maps/blob/main/just-friends/just-friends.md) -- Complete JF control inventory, mode documentation, RUN modes
- [whimsicalraps/Just-Friends/Just-Type.md](https://github.com/whimsicalraps/Just-Friends/blob/main/Just-Type.md) -- Full i2c Just Type protocol reference (14 commands)
- [monome/crow/lua/ii/jf.lua](https://github.com/monome/crow/blob/main/lua/ii/jf.lua) -- Crow-side i2c command definitions
- [monome.org/docs/crow](https://monome.org/docs/crow/) -- Crow physical specs, scripting overview
- [monome.org/docs/crow/reference](https://monome.org/docs/crow/reference/) -- Crow scripting API reference
- Codebase: `src/lib/maths-panel-data.ts`, `src/lib/ikarie-panel-data.ts` -- Panel data patterns
- Codebase: `src/components/session-detail.tsx` -- Integration wiring pattern
- Codebase: `src/app/modules/[slug]/panel/page.tsx` -- Standalone panel config pattern
- Codebase: `.claude/skills/synth-panel-builder/SKILL.md` -- Panel design principles

### Secondary (MEDIUM confidence)
- [whimsicalraps.com/pages/just-friends](https://www.whimsicalraps.com/pages/just-friends) -- JF product page (partial control info)
- [modulargrid.net/e/mannequins-just-friends](https://modulargrid.net/e/mannequins-just-friends) -- JF specs confirmation

### Tertiary (LOW confidence)
- JF panel layout diagram in this research is estimated from documentation, not verified against a photo. Panel positions MUST be verified against a downloaded photo before implementation.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies, all patterns proven in 8 prior modules
- Architecture: HIGH -- exact same file structure and integration points as Phases 29-30
- Control inventory (JF): HIGH -- verified against GitHub technical maps
- Control inventory (Crow): HIGH -- verified against official monome docs
- Panel layout: LOW -- no panel photos downloaded yet, positions estimated from text descriptions
- Curriculum structure: MEDIUM -- mode coverage and session distribution well-defined in CONTEXT.md, specific exercises TBD
- i2c integration: HIGH -- Just Type protocol fully documented with all 14 commands

**Research date:** 2026-04-19
**Valid until:** 2026-05-19 (stable -- established patterns, no fast-moving dependencies)
