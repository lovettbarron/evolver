# Phase 29: Maths Curriculum + Panel - Research

**Researched:** 2026-04-18
**Domain:** Make Noise Maths curriculum content, panel data file, eurorack module pedagogy
**Confidence:** HIGH

## Summary

This phase creates three deliverables: (1) a complete 10-12 session curriculum for the Make Noise Maths module, (2) a fully expanded overview page with architecture description, controls reference, and init state, and (3) a panel data file compatible with the Phase 28 generic ModulePanel renderer. The phase is primarily content authoring with one TypeScript data file -- no new React components are needed.

The Maths module has approximately 47 panel elements across 4 channels and a bus section: 10 knobs, 2 cycle buttons, 16 input jacks, 11 output jacks, and 8 LEDs. The UI-SPEC estimate of "~30 controls" undercounts; the actual count must be verified against the downloaded manual PDF before the panel data file is finalized. The channel-symmetric layout (Ch1 and Ch4 are near-mirrors, Ch2 and Ch3 are simple attenuverters) makes the data-driven panel approach ideal.

**Primary recommendation:** Download the Maths manual PDF first (blocking dependency), then author sessions in curriculum order, overview page, and panel data file in parallel. Use the Cascadia panel data pattern (`CONTROL_METADATA` + `CONTROL_POSITIONS` + `SECTION_BOUNDS`) for the panel data file.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** First session focuses on Rise/Fall as a basic attack-decay envelope -- most intuitive use case, immediate musical result (shape a VCA or filter)
- **D-02:** Teach on Channel 1 first, introduce Channel 4's unique features (EOC/EOR) as a later progression -- reduces cognitive load
- **D-03:** Audio-rate Maths gets an early taste (session 3-4, "listen to this!") with a full deep dive later (session 9-10)
- **D-04:** 1-2 integration sessions at the end of the curriculum patching Maths into other owned modules (Cascadia, Plaits, Ikarie) -- shows real-world use after mastering Maths standalone
- **D-05:** Full overview matching the instrument pattern -- architecture description (4 channels, OR/SUM/INV, EOC/EOR), complete controls reference table, and recommended init state
- **D-06:** Define a "basic patch" init state -- specific knob positions producing a known result (e.g., Ch1 as simple envelope, everything else zeroed). All sessions start from here
- **D-07:** Create a Maths panel data file (controls, positions, types) for the generic ModulePanel renderer from Phase 28. Panel won't render until Phase 28 ships, but data is ready
- **D-08:** Channel-based control IDs -- e.g., `knob-ch1-rise`, `knob-ch1-fall`, `jack-ch1-trig`, `jack-or`, `jack-sum` -- matches how Maths users think about the module
- **D-09:** Download the actual Maths manual PDF before curriculum work begins -- essential for accurate content and panel hand-placement
- **D-10:** Reference the official manual plus well-known community guides (e.g., "Maths Illustrated Supplement", Make Noise patch guides) -- more pedagogical than the manual alone

### Claude's Discretion
- Exact session topics and titles for the 10-12 sessions (within the progression constraints above)
- Controls reference table format and detail level
- Specific "basic patch" knob positions for the init state
- Panel data file format (must be compatible with whatever Phase 28 defines)
- Which community guides to reference alongside the official manual

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CURR-01 | Maths curriculum (10-12 sessions covering envelope, LFO, slew, audio-rate, utilities) | Full control inventory verified, curriculum progression mapped to Maths capabilities, session format established from Evolver/Cascadia patterns |
| CURR-08 | Module overview pages per module (architecture, controls reference, init state) | Maths architecture documented (4 channels, OR/SUM/INV bus, EOC/EOR), control inventory complete for reference table |
| CURR-09 | All sessions follow 15-30 min ADHD-friendly format with tangible output | Existing session format (frontmatter schema, warm-up, exercises, panel markers) fully documented |
| PANEL-07 | Hand-placed SVG panel for Make Noise Maths (20HP, ~30 controls) | Actual control count ~47 elements verified via manual analysis; data-driven Cascadia pattern selected; ID convention defined |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Session length:** 15-30 minutes maximum, ADHD constraint is non-negotiable
- **Session output:** Every session produces something tangible
- **File naming:** kebab-case throughout
- **Triple-write:** Content must exist in `sessions/maths/`, `src/content/sessions/maths/`, and `~/song/sessions/maths/`
- **Module content:** Also triple-write to `modules/maths/`, `src/content/modules/maths/`, and `~/song/modules/maths/`
- **Panel reference-first:** Read the synth-panel-builder skill; every control hand-placed from physical panel, never algorithmic
- **Basic patch required:** All sessions start from a known state
- **No undocumented patches:** Every patch exercise must have documented output

## Standard Stack

No new libraries needed. This phase is content authoring + one TypeScript data file.

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| TypeScript | existing | Panel data file type safety | Already in project |
| Zod | existing | SessionSchema validation | Already validates all sessions |
| Vitest | 3.x | Panel data tests | Existing test framework |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| gray-matter | existing | YAML frontmatter parsing | Session markdown files -- already in content pipeline |

## Architecture Patterns

### Content File Structure
```
sessions/maths/                          # Triple-write location 1 (repo)
  01-foundations-rise-fall-envelope.md
  02-foundations-shaping-vca-vcf.md
  ...
  11-integration-maths-into-cascadia.md
src/content/sessions/maths/              # Triple-write location 2 (Vercel)
  [same files]
~/song/sessions/maths/                   # Triple-write location 3 (Obsidian)
  [same files]

modules/maths/overview.md               # Expanded overview (triple-write)
src/content/modules/maths/overview.md
~/song/modules/maths/overview.md

src/lib/maths-panel-data.ts             # Panel data file (code, NOT content)
src/lib/__tests__/maths-panel-data.test.ts
```

### Session Frontmatter Pattern (established)
```yaml
---
title: 'Session 01: Rise & Fall — Your First Envelope'
session_number: 1
duration: 20
prerequisite: null
output_type: technique
difficulty: beginner
tags:
  - foundations
  - envelope
  - rise-fall
instrument: maths
instrument_type: eurorack_module
reference: 'Maths Manual pp. X-Y'
section: Foundations
---
```

Key differences from instrument sessions:
- `instrument: maths` (module slug, not instrument)
- `instrument_type: eurorack_module` (distinguishes from instrument sessions in queries)
- `section` field groups sessions by curriculum section (Foundations, Modulation, Advanced, etc.)

### Panel Data Pattern (Cascadia data-driven approach)
```typescript
export interface MathsControlMeta {
  id: string;
  name: string;       // Short label matching panel silk-screen
  module: string;     // Channel grouping: 'ch1', 'ch2-3', 'ch4', 'buses'
  type: 'knob' | 'button' | 'jack-in' | 'jack-out' | 'led';
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';
}

export const CONTROL_METADATA: Record<string, MathsControlMeta> = {
  // Ch1
  'knob-ch1-rise': { id: 'knob-ch1-rise', name: 'Rise', module: 'ch1', type: 'knob' },
  'knob-ch1-fall': { id: 'knob-ch1-fall', name: 'Fall', module: 'ch1', type: 'knob' },
  'knob-ch1-vari-response': { id: 'knob-ch1-vari-response', name: 'Vari-Response', module: 'ch1', type: 'knob' },
  'knob-ch1-attenuverter': { id: 'knob-ch1-attenuverter', name: 'Attenuverter', module: 'ch1', type: 'knob' },
  'button-ch1-cycle': { id: 'button-ch1-cycle', name: 'Cycle', module: 'ch1', type: 'button' },
  'jack-ch1-signal-in': { id: 'jack-ch1-signal-in', name: 'SIGNAL', module: 'ch1', type: 'jack-in', signalType: 'cv' },
  'jack-ch1-trig-in': { id: 'jack-ch1-trig-in', name: 'TRIG', module: 'ch1', type: 'jack-in', signalType: 'gate' },
  // ... etc
};

export const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  // Hand-placed from manual reference image -- NOT algorithmic
  'knob-ch1-rise': { x: 0, y: 0 },  // Placeholder until manual downloaded
  // ...
};

export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  'ch1': { x: 0, y: 0, width: 0, height: 0 },    // Placeholder
  'ch2-3': { x: 0, y: 0, width: 0, height: 0 },
  'ch4': { x: 0, y: 0, width: 0, height: 0 },
  'buses': { x: 0, y: 0, width: 0, height: 0 },
};
```

### ID Convention (per D-08)
```
Knobs:    knob-{channel}-{name-kebab}     e.g., knob-ch1-rise, knob-ch4-fall
Buttons:  button-{channel}-{name-kebab}   e.g., button-ch1-cycle
Jacks:    jack-{channel}-{name-kebab}     e.g., jack-ch1-trig-in, jack-ch1-unity-out
LEDs:     led-{channel}-{name-kebab}      e.g., led-ch1-cycle, led-ch1-eor
Bus:      jack-{bus-name}                 e.g., jack-or-out, jack-sum-out, jack-inv-out
```

### Anti-Patterns to Avoid
- **Algorithmic control placement:** Never compute positions from a grid. Maths has a specific physical layout that must be hand-traced from the manual/photo
- **Inventing controls:** The UI-SPEC's "~30" estimate was low. Use the verified inventory, not guesses
- **Skipping triple-write:** Every session file must exist in all 3 locations or content won't render in dev or production
- **Sessions over 30 minutes:** Split any session that grows beyond the ADHD constraint

## Verified Maths Control Inventory

**Confidence: HIGH** (verified via official manual content at manuals.plus)

### Channel 1 (17 elements)
| ID | Name | Type |
|----|------|------|
| knob-ch1-rise | Rise | knob |
| knob-ch1-fall | Fall | knob |
| knob-ch1-vari-response | Vari-Response | knob |
| knob-ch1-attenuverter | Attenuverter | knob |
| button-ch1-cycle | Cycle | button |
| led-ch1-cycle | Cycle LED | led |
| led-ch1-unity | Unity LED | led |
| led-ch1-eor | EOR LED | led |
| jack-ch1-signal-in | Signal | jack-in (cv) |
| jack-ch1-trig-in | Trigger | jack-in (gate) |
| jack-ch1-rise-cv-in | Rise CV | jack-in (cv) |
| jack-ch1-fall-cv-in | Fall CV | jack-in (cv) |
| jack-ch1-both-cv-in | Both CV | jack-in (cv) |
| jack-ch1-cycle-in | Cycle | jack-in (gate) |
| jack-ch1-unity-out | Unity | jack-out (cv) |
| jack-ch1-eor-out | EOR | jack-out (gate) |
| jack-ch1-var-out | Ch1 Variable | jack-out (cv) |

### Channel 2 (3 elements)
| ID | Name | Type |
|----|------|------|
| knob-ch2-attenuverter | Attenuverter | knob |
| jack-ch2-signal-in | Signal | jack-in (cv) |
| jack-ch2-var-out | Ch2 Variable | jack-out (cv) |

### Channel 3 (3 elements)
| ID | Name | Type |
|----|------|------|
| knob-ch3-attenuverter | Attenuverter | knob |
| jack-ch3-signal-in | Signal | jack-in (cv) |
| jack-ch3-var-out | Ch3 Variable | jack-out (cv) |

### Channel 4 (17 elements -- mirror of Ch1 with EOC instead of EOR)
| ID | Name | Type |
|----|------|------|
| knob-ch4-rise | Rise | knob |
| knob-ch4-fall | Fall | knob |
| knob-ch4-vari-response | Vari-Response | knob |
| knob-ch4-attenuverter | Attenuverter | knob |
| button-ch4-cycle | Cycle | button |
| led-ch4-cycle | Cycle LED | led |
| led-ch4-unity | Unity LED | led |
| led-ch4-eoc | EOC LED | led |
| jack-ch4-signal-in | Signal | jack-in (cv) |
| jack-ch4-trig-in | Trigger | jack-in (gate) |
| jack-ch4-rise-cv-in | Rise CV | jack-in (cv) |
| jack-ch4-fall-cv-in | Fall CV | jack-in (cv) |
| jack-ch4-both-cv-in | Both CV | jack-in (cv) |
| jack-ch4-cycle-in | Cycle | jack-in (gate) |
| jack-ch4-unity-out | Unity | jack-out (cv) |
| jack-ch4-eoc-out | EOC | jack-out (gate) |
| jack-ch4-var-out | Ch4 Variable | jack-out (cv) |

### Buses (5 elements)
| ID | Name | Type |
|----|------|------|
| jack-or-out | OR | jack-out (cv) |
| jack-sum-out | SUM | jack-out (cv) |
| jack-inv-out | INV | jack-out (cv) |
| led-sum-pos | SUM+ LED | led |
| led-sum-neg | SUM- LED | led |

**Total: 45 elements** (10 knobs, 2 buttons, 16 input jacks, 11 output jacks, 8 LEDs [including 2 SUM LEDs])

Note: The `module` field in CONTROL_METADATA groups these as: `ch1` (17), `ch2` (3), `ch3` (3), `ch4` (17), `buses` (5). Whether Ch2 and Ch3 are grouped as `ch2-3` or kept separate is Claude's discretion -- keeping them separate matches the physical panel layout where they occupy distinct vertical spaces.

## Recommended Curriculum Progression

Based on CONTEXT.md decisions and Maths capabilities:

| # | Section | Topic | Key Concepts | Output |
|---|---------|-------|-------------|--------|
| 01 | Foundations | Rise & Fall: Your First Envelope | Attack-decay envelope, Rise/Fall knobs, basic VCA shaping | Documented envelope shape |
| 02 | Foundations | Shaping Sounds with Maths | Envelope to VCF cutoff, envelope to VCA, comparing shapes | Patch: filter sweep |
| 03 | Foundations | Audio-Rate Maths: Listen to This! | Cycle mode as oscillator, Rise/Fall as pitch, early exposure | Recording: Maths as oscillator |
| 04 | Modulation | Maths as LFO | Cycle mode, Rise/Fall speed, Vari-Response curve shapes | Patch: LFO modulating Cascadia |
| 05 | Modulation | Slew Limiting & Portamento | Signal input, lag processing, stepped-to-smooth CV | Technique: portamento on sequenced notes |
| 06 | Modulation | Voltage Processing with Ch2 & Ch3 | Attenuverters, offset voltages, scaling CV, +/-10V and +/-5V ranges | Technique: voltage math |
| 07 | Utilities | Timing Logic: EOC & EOR | End-of-cycle/rise triggers, cascading envelopes, trigger chains | Patch: cascaded envelope pair |
| 08 | Utilities | The OR/SUM/INV Bus | Combining channels, voltage addition, inversion, mixing CV | Patch: complex modulation from simple sources |
| 09 | Advanced | Audio-Rate Deep Dive | Both channels as oscillators, cross-modulation, FM between Ch1/Ch4 | Recording: FM synthesis with Maths |
| 10 | Advanced | Complex Envelopes & ASR | Signal input for ASR, Vari-Response for curve shaping, complex shapes | Patch: multi-stage envelope |
| 11 | Integration | Maths + Cascadia | Maths envelope to Cascadia VCF, Maths LFO to VCO pitch, cross-patching | Patch: integrated voice |
| 12 | Integration | Maths + Plaits/Ikarie | Maths as modulation source for other modules, real-world patching | Composition element |

This progression follows all locked decisions:
- D-01: Session 01 starts with Rise/Fall envelope
- D-02: Channel 1 first; Ch4 EOC/EOR introduced in session 07
- D-03: Early audio-rate taste in session 03, deep dive in session 09
- D-04: Integration sessions 11-12 at the end

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Session markdown rendering | Custom markdown parser | Existing prose pipeline + session-detail.tsx | Already handles frontmatter, callouts, panel markers |
| Panel component | New MathsPanel React component | Phase 28 generic ModulePanel + data file | D-07 explicitly states data file only |
| Content discovery | Custom file listing | Existing listSessions() + discoverModules() | Already handles instrument_type filtering |
| Triple-write | Manual file copying | Scripted copy to all 3 locations | Prevents drift between locations |

## Common Pitfalls

### Pitfall 1: Maths Manual Not Downloaded
**What goes wrong:** Curriculum content written from memory or web summaries contains inaccuracies; panel positions are guessed
**Why it happens:** The manual placeholder file exists but contains no actual content
**How to avoid:** D-09 requires downloading the PDF first. Block all other work on this
**Warning signs:** Session references say "Maths Manual pp. X" but nobody has verified the page numbers

### Pitfall 2: Undercount of Panel Controls
**What goes wrong:** Panel data file has fewer entries than physical panel; some controls missing
**Why it happens:** UI-SPEC estimated "~30" but actual count is ~45. Maths has many CV input jacks and LEDs that are easy to overlook
**How to avoid:** Use the verified inventory in this research document. Cross-check against downloaded manual photo
**Warning signs:** Panel data test fails on total count

### Pitfall 3: Triple-Write Drift
**What goes wrong:** Sessions render in dev but not production (or vice versa); Obsidian vault missing files
**Why it happens:** Writer forgets one of the three locations, or makes edits in only one place
**How to avoid:** Create all three directories first (`sessions/maths/`, `src/content/sessions/maths/`, `~/song/sessions/maths/`). Copy session files to all three locations atomically
**Warning signs:** "Session content could not be loaded" error in the app

### Pitfall 4: Session Scope Creep Beyond 30 Minutes
**What goes wrong:** Sessions become lectures instead of focused exercises; user loses engagement
**Why it happens:** Maths is deeply versatile -- each topic could fill hours of exploration
**How to avoid:** Strict "one focused objective per session" rule. If a topic needs more depth, split into two sessions
**Warning signs:** Exercise steps exceed 5-6 numbered items; session description mentions multiple unrelated concepts

### Pitfall 5: Panel Positions Without Reference
**What goes wrong:** Control positions look "close enough" but don't match physical panel; user can't map SVG to hardware
**Why it happens:** Attempting to place controls from memory or a verbal description instead of the manual/photo
**How to avoid:** CLAUDE.md guardrail: "Build a panel without the reference image" -- always trace from the actual panel photo in the downloaded manual
**Warning signs:** Controls overlap, symmetric channels don't mirror, bus outputs misaligned

### Pitfall 6: Button vs Switch Confusion
**What goes wrong:** Maths Cycle controls rendered as switches (2-way/3-way toggle) instead of buttons (momentary push)
**Why it happens:** Cascadia uses switches extensively; pattern-matching from the wrong reference
**How to avoid:** Maths Cycle is a **push button** (press to toggle cycle on/off), not a toggle switch. Use `type: 'button'` in CONTROL_METADATA
**Warning signs:** Panel shows a 2-way switch where the physical panel has a push button with an LED

## Code Examples

### Session Frontmatter (verified pattern from existing sessions)
```yaml
---
title: 'Session 01: Rise & Fall — Your First Envelope'
session_number: 1
duration: 20
prerequisite: null
output_type: technique
difficulty: beginner
tags:
  - foundations
  - envelope
  - rise-fall
  - attack-decay
instrument: maths
instrument_type: eurorack_module
reference: 'Maths Manual pp. TBD'
section: Foundations
---
```

### Panel Data File Structure (Cascadia pattern adapted for Maths)
```typescript
// src/lib/maths-panel-data.ts

export interface MathsControlMeta {
  id: string;
  name: string;
  module: string;   // 'ch1' | 'ch2' | 'ch3' | 'ch4' | 'buses'
  type: 'knob' | 'button' | 'jack-in' | 'jack-out' | 'led';
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';
}

export const CONTROL_METADATA: Record<string, MathsControlMeta> = {
  // 45 entries total -- see Verified Maths Control Inventory above
};

export const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  // Hand-placed from manual reference image
  // Positions are relative to SVG viewBox origin
  // Maths is 20HP wide -- use same scale as other panels
};

export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  'ch1': { x: 0, y: 0, width: 0, height: 0 },
  'ch2': { x: 0, y: 0, width: 0, height: 0 },
  'ch3': { x: 0, y: 0, width: 0, height: 0 },
  'ch4': { x: 0, y: 0, width: 0, height: 0 },
  'buses': { x: 0, y: 0, width: 0, height: 0 },
};

export function midiToRotation(value: number): number {
  return -135 + (value / 127) * 270;
}
```

### Panel Marker in Session Markdown
```html
<!-- Highlighting Ch1 Rise and Fall controls during the first exercise -->
<div data-maths-panel
  data-sections="ch1"
  data-knobs="knob-ch1-rise:64,knob-ch1-fall:64"
  data-highlights="jack-ch1-trig-in:amber,led-ch1-cycle:blue"
></div>

<!-- Cable routing for integration sessions -->
<div data-maths-panel
  data-sections="ch1,buses"
  data-cables="jack-ch1-var-out>jack-cascadia-vcf-fm-3-in:cv"
></div>
```

### Overview Controls Reference Table Pattern
```markdown
## Controls Reference

### Channel 1

| Control | Type | Range | Function |
|---------|------|-------|----------|
| Rise | Knob | ~0.5ms to 25 min | Sets rise time of voltage function |
| Fall | Knob | ~0.5ms to 25 min | Sets fall time of voltage function |
| Vari-Response | Knob | Log to Exp | Shapes response curve (logarithmic to linear to exponential) |
| Attenuverter | Knob | -1 to +1 | Scales and/or inverts channel output |
| Cycle | Button + LED | On/Off | Enables self-cycling (LFO mode) |
| Signal IN | Jack | -10V to +10V | Direct-coupled input for slew/lag/ASR |
| Trigger IN | Jack | Gate/Pulse | Triggers envelope regardless of Signal IN |
| Rise CV | Jack | CV | Voltage control of rise time |
| Fall CV | Jack | CV | Voltage control of fall time |
| Both CV | Jack | CV | Controls both rise and fall time simultaneously |
| Cycle IN | Jack | Gate | External cycle enable/disable |
| Unity OUT | Jack | 0-8V | Full-scale unattenuated output |
| EOR OUT | Jack | Gate | End-of-rise trigger pulse |
| Variable OUT | Jack | Scaled | Attenuverter-scaled output |
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Per-module React components | Generic ModulePanel + data files | Phase 28 (v2.0) | Panel data is a .ts file, not a component |
| `module` field in SessionSchema | `section` field | Phase 26 (v2.0) | Avoids collision with eurorack "module" concept |
| Instrument-only sessions | `instrument_type` discriminator | Phase 26 (v2.0) | Maths sessions use `eurorack_module` type |

## Open Questions

1. **Maths Manual Download Method**
   - What we know: The Make Noise website requires browser download; curl returns HTML wrapper (per placeholder note). The 2013 PDF is available at a UCSB mirror URL.
   - What's unclear: Whether the 2020 revision manual can be directly downloaded, or only via browser
   - Recommendation: Try the UCSB mirror for the 2013 version first (direct PDF link); supplement with Make Noise website download in a browser if the 2020 revision has significant differences. For panel layout purposes, the 2013 manual should be sufficient as the Maths panel layout has not changed between revisions.

2. **Phase 28 Panel Data Format Compatibility**
   - What we know: Phase 28 has not shipped yet. The data file format is based on the Cascadia pattern.
   - What's unclear: Whether Phase 28's generic ModulePanel will use exactly the same interface or introduce modifications
   - Recommendation: Author the data file using the Cascadia pattern. If Phase 28 changes the interface, adaptation will be mechanical (rename fields, adjust types). The control inventory and positions are the hard part.

3. **Maths 'button' Control Type**
   - What we know: Maths Cycle is a push button, not a toggle switch. Existing panel types are: knob, slider, switch, jack-in, jack-out, led
   - What's unclear: Whether Phase 28's generic renderer will support a `button` type, or whether Cycle should be modeled as a `switch` with visual customization
   - Recommendation: Use `button` type in the data file. If the renderer doesn't support it yet, a switch fallback with a note is acceptable. The physical control is unambiguously a button.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.x |
| Config file | vitest.config.ts (existing) |
| Quick run command | `npx vitest run src/lib/__tests__/maths-panel-data.test.ts` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PANEL-07 | Panel data has correct control count (45) | unit | `npx vitest run src/lib/__tests__/maths-panel-data.test.ts -x` | Wave 0 |
| PANEL-07 | Every control has required fields | unit | same as above | Wave 0 |
| PANEL-07 | Every jack has signalType | unit | same as above | Wave 0 |
| PANEL-07 | Module names are valid (ch1, ch2, ch3, ch4, buses) | unit | same as above | Wave 0 |
| PANEL-07 | Section bounds have positive dimensions | unit | same as above | Wave 0 |
| CURR-01 | Sessions have valid frontmatter (SessionSchema) | unit | `npx vitest run src/lib/__tests__/sessions.test.ts -x` | Existing |
| CURR-09 | Session durations are 5-30 min (Zod constraint) | unit | same as above | Existing |
| CURR-08 | Overview has valid frontmatter | unit | existing content tests | Existing |

### Sampling Rate
- **Per task commit:** `npx vitest run src/lib/__tests__/maths-panel-data.test.ts`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/lib/__tests__/maths-panel-data.test.ts` -- covers PANEL-07 (mirror of cascadia-panel-data.test.ts)
- [ ] `src/lib/maths-panel-data.ts` -- the data file itself (required for tests to import)

## Sources

### Primary (HIGH confidence)
- manuals.plus/make-noise/maths-complex-function-generator-eurorack-module-manual -- Full control inventory verified
- makenoisemusic.com/modules/maths/ -- Official product page, manual download links
- Existing codebase: cascadia-panel-data.ts, cascadia-panel-data.test.ts, schemas.ts -- Established patterns

### Secondary (MEDIUM confidence)
- w2.mat.ucsb.edu Maths Illustrated Supplement PDF -- Curriculum topic reference (PDF could not be text-extracted)
- modulargrid.net/e/make-noise-maths -- HP width and specs confirmed

### Tertiary (LOW confidence)
- UI-SPEC "~30 controls" estimate -- **CORRECTED to ~45** based on verified inventory

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new libraries, all existing patterns
- Architecture: HIGH -- follows established Cascadia panel data pattern and session format
- Control inventory: HIGH -- verified against official manual content
- Curriculum progression: HIGH -- constrained by locked decisions D-01 through D-04
- Panel positions: LOW -- positions cannot be determined until manual PDF is downloaded and panel photo examined
- Pitfalls: HIGH -- drawn from project experience with Evolver, Cascadia, and Octatrack panels

**Research date:** 2026-04-18
**Valid until:** 2026-05-18 (stable -- Maths hardware is not changing)
