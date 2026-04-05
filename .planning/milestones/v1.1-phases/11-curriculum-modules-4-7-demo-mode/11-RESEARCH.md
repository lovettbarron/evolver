# Phase 11: Curriculum Modules 4-7 + Demo Mode - Research

**Researched:** 2026-04-03
**Domain:** Cascadia curriculum content authoring (sessions 10-25), synthetic learner journey, Vercel demo mode integration
**Confidence:** HIGH

## Summary

Phase 11 completes the 25-session Cascadia curriculum by writing 16 new sessions across 4 modules, produces named patches from recipe sessions, extends the synthetic learner journey for Cascadia demo mode, and verifies the landing page shows both instruments with correct counts.

The content authoring follows established patterns from Phase 10 (sessions 1-9) with no format changes. The code changes are small and well-scoped: (1) extend `src/lib/synthetic-daily-notes.ts` with Cascadia journey exports, (2) make `getSyntheticCompletedSessions()` instrument-aware so the progress page shows Cascadia progress instead of Evolver progress for both, (3) run `bundle-content` to copy sessions into `src/content/sessions/cascadia/`. The InstrumentCard already displays session and patch counts -- the landing page auto-discovers instruments from `src/content/instruments/` and counts are computed dynamically.

**Primary recommendation:** Divide work into content-first waves (sessions by module), then a demo-mode wave for code changes and bundling. Content is the bulk of effort; code changes are minimal.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- D-01: 16 sessions split 3-3-4-6 across Modules 4-7
- D-02: Module 4 -- Filter + LPG focus (VCF modes, resonance, filter FM, LPG for west coast percussion)
- D-03: Module 5 -- Modulation/Utilities (LFOs, sample & hold, mixuverter, utility modules)
- D-04: Module 6 -- Complex modulation + FX (cross-modulation, FM chains, ring mod as modulator, self-patching feedback, FX pedal integration, audio-rate modulation)
- D-05: Module 7 -- Sound Design recipe-driven (6 sessions, each builds complete patch: bass, lead, pad, percussion, texture, ambient)
- D-06: Lighter early modules, heavier advanced + sound design
- D-07: Phase 10 session format conventions carry forward unchanged (percentage knob notation, normalled default as basic patch, concept-first, Cascadia-unique callouts, cable summary + inline)
- D-08: Warm-ups return to normalled default then reinforce previous session
- D-09: Recipe sessions produce named patches in patches/cascadia/ format (Phase 9 schema)
- D-10: Cascadia journey has same ADHD pacing shape as Evolver but offset -- starts later, progresses slower
- D-11: Journey stops at end of Module 5: 12 sessions complete, currently in Module 6 with zero Module 6 sessions done
- D-12: Journey data in `src/lib/synthetic-daily-notes.ts` with separate exports (SYNTHETIC_CASCADIA_COMPLETED_SESSIONS, SYNTHETIC_CASCADIA_JOURNEY_WEEKS)
- D-13: Copy all 25 sessions into `src/content/sessions/cascadia/` (same pattern as Evolver)
- D-14: Curriculum patches added to `src/content/patches/cascadia/` alongside existing 13 demo patches
- D-15: No reader code changes -- existing fallback to src/content/ handles everything
- D-16: Verify instrument auto-discovery works with Cascadia content in src/content/
- D-17: Add session count and patch count to InstrumentCard
- D-18: Fix any edge cases where Cascadia content doesn't render in demo mode

### Claude's Discretion
- Exact session topics and exercise design within module boundaries
- Which sessions produce named patches and what those patches are
- Exercise sequencing for optimal ADHD flow
- Session numbering continuation (10-25) and slug format
- Specific LPG techniques for Module 4
- Synthetic journey week-by-week schedule detail
- How to display session/patch counts on InstrumentCard (badge, subtitle, etc.)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CCURR-01 | 25 Cascadia sessions across 7 modules (15-30 min each, ADHD-paced) | Sessions 1-9 exist from Phase 10. This phase writes 10-25 across Modules 4-7 using established frontmatter/format conventions. Module docs provide all control/jack names. |
| CCURR-06 | Recipe sessions produce named patches with full cable routing and knob settings documented | Module 7 (6 sessions) plus select sessions in Modules 4-6 produce patches. Patch schema (cable_routing array, knob_settings map) is established. 4 curriculum patches already exist as format reference. |
| CDEMO-01 | Cascadia content bundled in src/content/ for Vercel demo mode | `scripts/bundle-content.ts` copies sessions/ and patches/ directories automatically. Running `npm run bundle-content` handles this. No code changes needed. |
| CDEMO-02 | Synthetic Cascadia learner journey showing ~50% progress (separate from Evolver journey) | Requires new exports in synthetic-daily-notes.ts AND making getSyntheticCompletedSessions() instrument-aware. Currently returns Evolver set for all instruments. |
| CDEMO-03 | Landing page and instrument selector show both instruments in demo mode | InstrumentCard already accepts sessionCount/patchCount. page.tsx already counts sessions and patches dynamically. Verification needed after content bundling. |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- Session length: 15-30 minutes, always single focused objective
- Every session produces tangible output (patch, technique, recording snippet, or composition element)
- File naming: kebab-case throughout
- Sessions numbered sequentially within modules: `sessions/<instrument>/XX-<module>-<topic>.md`
- Patches documented in `patches/<instrument>/` with full parameter dumps
- Guardrails: don't skip basic patch, don't rush modules, don't create sessions > 30 min, don't make patches without documenting them

## Architecture Patterns

### Content Structure (Established -- No Changes)
```
sessions/cascadia/
  01-foundations-orientation-first-sound.md   # Existing (Phase 10)
  ...
  09-envelopes-vca-b-mixer-dynamics.md       # Existing (Phase 10)
  10-filter-vcf-modes-resonance.md            # NEW: Module 4
  11-filter-lpg-*.md                          # NEW: Module 4
  12-filter-*.md                              # NEW: Module 4
  13-modulation-*.md                          # NEW: Module 5
  14-modulation-*.md                          # NEW: Module 5
  15-modulation-*.md                          # NEW: Module 5
  16-advanced-*.md                            # NEW: Module 6
  17-advanced-*.md                            # NEW: Module 6
  18-advanced-*.md                            # NEW: Module 6
  19-advanced-*.md                            # NEW: Module 6
  20-sound-design-bass.md                     # NEW: Module 7 (recipe)
  21-sound-design-lead.md                     # NEW: Module 7 (recipe)
  22-sound-design-pad.md                      # NEW: Module 7 (recipe)
  23-sound-design-percussion.md               # NEW: Module 7 (recipe)
  24-sound-design-texture.md                  # NEW: Module 7 (recipe)
  25-sound-design-ambient.md                  # NEW: Module 7 (recipe)

patches/cascadia/
  # 4 existing curriculum patches (fm-bell, lpg-bongo, etc.)
  # + new curriculum patches from recipe sessions
```

### Session Frontmatter Schema (Established)
```yaml
---
title: "Session XX: Topic Name"
module: "Module Name"          # Must match groupByModule() expectations
session_number: XX
duration: 20                   # 15-30 minutes
prerequisite: XX               # Previous session number or null
output_type: patch|technique   # What the session produces
difficulty: beginner|intermediate|advanced
tags: [tag1, tag2, curriculum]
instrument: cascadia
reference: "Cascadia Manual pp. XX-XX"
---
```

### Patch Frontmatter Schema (Established)
```yaml
---
name: "Patch Name"
type: bass|lead|pad|drum|texture|fx
session_origin: XX             # Session number that created it
description: "One-line description"
tags: [tag1, tag2, curriculum]
instrument: cascadia
created: "2026-04-03"
audio_preview: "patch-name.mp3"
cable_routing:
  - source: "MODULE JACK OUT"
    destination: "MODULE JACK IN"
    purpose: "What this connection does"
knob_settings:
  Module Name:
    - control: "CONTROL NAME"
      value: "clock position or percentage"
---
```

### Module Names for Frontmatter
Based on existing sessions and the 3-3-4-6 split:

| Module | Frontmatter `module:` value | Sessions |
|--------|---------------------------|----------|
| 1 | "Foundations" | 1-3 |
| 2 | "Oscillators" | 4-6 |
| 3 | "Envelopes & Amplitude" | 7-9 |
| 4 | "Filters & LPG" | 10-12 |
| 5 | "Modulation & Utilities" | 13-15 |
| 6 | "Advanced Patching" | 16-19 |
| 7 | "Sound Design" | 20-25 |

### Session Slug Format
Continuation of established pattern: `{number}-{module-slug}-{topic-slug}.md`
- Module 4: `10-filter-*`, `11-filter-*`, `12-filter-*`
- Module 5: `13-modulation-*`, `14-modulation-*`, `15-modulation-*`
- Module 6: `16-advanced-*`, `17-advanced-*`, `18-advanced-*`, `19-advanced-*`
- Module 7: `20-sound-design-*` through `25-sound-design-*`

### Synthetic Journey Pattern (To Extend)
```typescript
// Existing Evolver pattern in src/lib/synthetic-daily-notes.ts:
export const SYNTHETIC_COMPLETED_SESSIONS: Set<number> = new Set([...]);
export const SYNTHETIC_JOURNEY_WEEKS = [...] as const;

// New Cascadia exports to add (D-12):
export const SYNTHETIC_CASCADIA_COMPLETED_SESSIONS: Set<number> = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12  // Modules 1-5 complete
]);

export const SYNTHETIC_CASCADIA_JOURNEY_WEEKS = [
  // ADHD-paced, offset start, slower pace than Evolver
  // Ends at Module 5 boundary (12 sessions = ~48% of 25)
] as const;
```

### Progress Page Fix (Critical for CDEMO-02)
Current code in `src/app/instruments/[slug]/progress/page.tsx`:
```typescript
const completedSessions = config.vaultPath
  ? (await scanDailyNotes(config.vaultPath)).sessionNumbers
  : getSyntheticCompletedSessions();  // BUG: ignores slug
```

Must become instrument-aware:
```typescript
const completedSessions = config.vaultPath
  ? (await scanDailyNotes(config.vaultPath)).sessionNumbers
  : getSyntheticCompletedSessions(slug);  // Pass instrument slug
```

And `getSyntheticCompletedSessions()` in `src/lib/progress.ts` must accept a slug parameter and return the appropriate set.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Content bundling | Manual file copy scripts | Existing `scripts/bundle-content.ts` via `npm run bundle-content` | Already handles sessions/, patches/, instruments/, references/ |
| Session/patch counting | Custom counting logic | Existing `listSessions()` / `listPatches()` in reader.ts | Landing page already uses these; counts are automatic |
| Module grouping | Custom module detection | Existing `groupByModule()` in sessions.ts | Already groups sessions by frontmatter `module:` field |
| Instrument discovery | Hardcoded instrument list | Existing `discoverInstruments()` in reader.ts | Scans instruments/ directory dynamically |

## Common Pitfalls

### Pitfall 1: Module Name Mismatch
**What goes wrong:** New sessions use a `module:` value that doesn't match what `groupByModule()` expects, causing sessions to appear in the wrong module or not group correctly.
**Why it happens:** Module names are strings in frontmatter, not an enum. A typo or variation ("Filter & LPG" vs "Filters & LPG") creates a separate module grouping.
**How to avoid:** Establish exact module names before writing sessions. Use the same string in every session of that module. Test by checking how sessions group in the UI.
**Warning signs:** Module journey shows extra modules with 1 session, or a module appears to have fewer sessions than expected.

### Pitfall 2: Synthetic Journey Returns Evolver Data for Cascadia
**What goes wrong:** Visiting `/instruments/cascadia/progress` in demo mode shows Evolver's 21 completed sessions instead of Cascadia's 12.
**Why it happens:** `getSyntheticCompletedSessions()` currently returns a single hardcoded set with no instrument parameter. The progress page calls it without a slug.
**How to avoid:** Make the function accept a slug parameter. Add the Cascadia journey data. Test both instrument progress pages in demo mode.
**Warning signs:** Cascadia progress page shows "21 sessions completed" (Evolver's count) instead of 12.

### Pitfall 3: Cable/Knob Name Inconsistency
**What goes wrong:** Session exercises reference a jack as "VCF FM1 IN" but the patch documents it as "VCF FM 1 IN" or the module doc calls it "FM 1 IN".
**Why it happens:** Cascadia's panel labels use spacing conventions that are easy to vary when typing.
**How to avoid:** Use the canonical module docs in `src/content/instruments/cascadia/modules/` as the single source of truth for all control and jack names. Copy-paste from those docs.
**Warning signs:** Patch detail page shows knob settings under module names that don't match the extractModuleName() function.

### Pitfall 4: Session Numbering Gap or Duplicate
**What goes wrong:** A session is numbered 10 but there's already a session 10, or session 13 is skipped.
**Why it happens:** Manual continuation from session 9 across multiple writing batches.
**How to avoid:** Sessions 10-25 map exactly to the 16 new sessions. Verify `session_number` in frontmatter matches the filename number.
**Warning signs:** Session list shows duplicates or gaps in the progress module journey.

### Pitfall 5: Forgetting to Add Curriculum Patches to Both Locations
**What goes wrong:** Recipe session patches are written to `patches/cascadia/` but not bundled to `src/content/patches/cascadia/`, or vice versa.
**Why it happens:** Patches live in the project root `patches/` AND get bundled to `src/content/patches/`. The bundle script copies everything, but `src/content/patches/cascadia/` already has 13 demo patches that were created directly there in Phase 9.
**How to avoid:** Write curriculum patches to `patches/cascadia/` (project root). The bundle script copies the entire `patches/` tree to `src/content/patches/`. The 13 demo patches in `src/content/patches/cascadia/` should also exist in `patches/cascadia/` -- verify this. If not, the bundle script's `cpSync` with `recursive: true` will overwrite the entire directory.
**Warning signs:** Patch count changes after running bundle-content, or demo patches disappear.

### Pitfall 6: Patch type Values Don't Match Filter Options
**What goes wrong:** Recipe session patches use `type: ambient` but the patch browser filters for known types and "ambient" isn't one of them.
**Why it happens:** Patch `type` field has a limited set of accepted values in the PatchSchema.
**How to avoid:** Check PatchSchema for allowed type values before assigning types to recipe patches. The 13 existing demo patches use: bass, lead, pad, drum, texture, fx.
**Warning signs:** Patches don't appear under expected filter category in the patch browser.

## Code Changes Required

### Change 1: Extend synthetic-daily-notes.ts
**File:** `src/lib/synthetic-daily-notes.ts`
**What:** Add two new exports: `SYNTHETIC_CASCADIA_COMPLETED_SESSIONS` (Set of sessions 1-12) and `SYNTHETIC_CASCADIA_JOURNEY_WEEKS` (array following ADHD pacing shape, offset from Evolver)
**Confidence:** HIGH -- pattern is identical to existing Evolver exports

### Change 2: Make getSyntheticCompletedSessions() instrument-aware
**File:** `src/lib/progress.ts`
**What:** Accept optional `instrument` parameter, return Cascadia set when slug is "cascadia", default to Evolver set
**Confidence:** HIGH -- simple conditional

### Change 3: Pass slug to getSyntheticCompletedSessions()
**File:** `src/app/instruments/[slug]/progress/page.tsx`
**What:** Pass `slug` to `getSyntheticCompletedSessions(slug)` call
**Confidence:** HIGH -- one-line change

### Change 4: InstrumentCard already shows counts (D-17 DONE)
**File:** `src/components/instrument-card.tsx`
**What:** Already displays `{sessionCount} sessions / {patchCount} patches`. No change needed.
**Confidence:** HIGH -- verified by reading the component

### Change 5: Bundle content
**Command:** `npm run bundle-content`
**What:** Copies sessions/cascadia/ and patches/cascadia/ into src/content/ for demo mode
**Confidence:** HIGH -- existing script handles this

## Cascadia Module Reference for Session Authoring

### Module 4: Filters & LPG (Sessions 10-12)
Key hardware references:
- **VCF module** (vcf.md): 8 filter modes (LP1/LP2/LP4/BP2/BP4/HP4/NT2/PHZR), 3 FM inputs, LEVEL pre-gain, Q to self-oscillation, dedicated LP4/HP4/VCF OUT jacks
- **VCA B / LPF module** (vca-b-lpf.md): VCA CONTROL switch (LPG mode up, LPF only down), CV AMOUNT knob, normalled from Ring Mod OUT, CV normalled from +5V DC
- Session 9 already introduced the LPG with 2 cables -- Module 4 builds on this

Suggested session topics:
- S10: VCF modes and resonance -- sweep through all 8 modes, resonance to self-oscillation, filter as sine oscillator via FM2
- S11: Filter FM and filter as sound source -- using FM inputs for envelope/LFO modulation, self-oscillation as pitched tone
- S12: LPG deep dive and percussion palette -- dedicated session using VCA B/LPF in LPG mode with various envelopes and sources, building on the LPG bongo from session 9

### Module 5: Modulation & Utilities (Sessions 13-15)
Key hardware references:
- **LFO X/Y/Z** (lfo-xyz.md): 3 linked triangle LFOs, rate dividers (div3/4/5/8), polyrhythmic modulation, LFO Y normalled to VCO A PWM, LFO Z normalled to MULT IN 1
- **Utilities** (utilities.md): Sample & Hold (normalled from MIDI CLK + internal noise), Slew Limiter (3-pos direction, LIN/EXP shape), Mixuverter (attenuvert, offset, x2 doubling)
- **Patchbay** (patchbay.md): BI>UNI converter, multiplier, normalled from LFO Z

Suggested session topics:
- S13: LFO deep dive -- rate linking, dividers, polyrhythmic modulation, audio-rate LFO
- S14: Sample & Hold and Slew -- stepped random from S&H, smoothed random via S&H->Slew chain, MIDI clock triggering
- S15: Mixuverter and voltage processing -- using Mixuverter as DC source, attenuverter, signal combiner

### Module 6: Advanced Patching (Sessions 16-19)
Key hardware references:
- All modules from prior sessions, plus **FX Send/Return** (fx-send-return.md): LINE/PEDAL switch, phase correction, DRY/WET mix
- Cross-modulation uses VCO A/B FM inputs and Ring Mod

Suggested session topics:
- S16: FM chains and cross-modulation -- VCO B modulating VCO A at audio rates, ring mod as modulation source
- S17: Self-patching and feedback loops -- routing outputs back into inputs for complex timbres
- S18: FX pedal integration -- using FX Send/Return with external effects
- S19: Audio-rate modulation mastery -- LFOs at audio rate, VCO B as LFO, complex sidebands

### Module 7: Sound Design (Sessions 20-25)
Each session is recipe-driven, producing a named patch:
- S20: Bass recipe -- deep, usable bass patch
- S21: Lead recipe -- cutting, expressive lead
- S22: Pad recipe -- evolving, textured pad
- S23: Percussion recipe -- complex rhythm/percussion
- S24: Texture recipe -- ambient texture/noise sculpture
- S25: Ambient recipe -- spacious, evolving ambient

Each recipe session walks through building the patch from normalled default, step by step, documenting every cable and knob setting. Output is a fully documented patch in `patches/cascadia/` format.

## Synthetic Cascadia Journey Design

Per D-10, D-11: same ADHD shape as Evolver but offset and slower.

**Evolver journey reference** (8 weeks, 21 sessions, ~60% of 35):
- W1-2: Enthusiastic (3/week)
- W3: Slowing (2-3/week)
- W4: Busy (1 session)
- W5: Break (0)
- W6: Return (3-4/week)
- W7-8: Steady (2-3/week)

**Cascadia journey design** (starts ~3 weeks after Evolver, 12 sessions = 48% of 25):
- Reference start date: 2026-02-22 (3 weeks after Evolver's 2026-02-01)
- W1: Enthusiastic start (2 sessions -- slightly slower than Evolver since it's a second instrument)
- W2: Still going (3 sessions)
- W3: Slowing (2 sessions)
- W4: Break (0 -- same pattern)
- W5: Return (3 sessions)
- W6: Current position (2 sessions) -- total 12, Modules 1-5 complete

**Cascadia module-to-session mapping for journey:**
- Module 1 "Foundations": 1-3 (3 sessions)
- Module 2 "Oscillators": 4-6 (3 sessions)
- Module 3 "Envelopes & Amplitude": 7-9 (3 sessions)
- Module 4 "Filters & LPG": 10-12 (3 sessions)
- Module 5 "Modulation & Utilities": 13-15 (3 sessions)

12 completed sessions covers Modules 1-5 exactly (D-11 says "currently in Module 6 with no Module 6 sessions completed").

Wait -- Module boundaries are 3+3+3+3+3+4+6 = 25. 12 sessions = Modules 1-4 complete (3+3+3+3=12). But D-11 says "Modules 1-5 done." Let me reconcile: Modules 1-3 have 3 sessions each (9 total from Phase 10). Module 4 has 3 sessions (10-12). Module 5 has 3 sessions (13-15). So Modules 1-5 = 3+3+3+3+3 = 15 sessions, not 12.

**Correction:** D-11 says 12 sessions complete ending at Module 5. But Module 5 ends at session 15. This means the journey is 12 sessions covering Modules 1-4 complete (12 sessions) with Module 5 not started. OR: The D-11 text says "Modules 1-5 done" -- re-reading: "Journey stops at end of Module 5: 12 sessions complete (Modules 1-5 done), currently in Module 6 with no Module 6 sessions completed."

This implies Modules 1-5 = 12 sessions. But the 3-3-4-6 split for Modules 4-7 means: M4=3, M5=3, M6=4, M7=6. Modules 1-3 from Phase 10 = 9 sessions. So Modules 1-5 = 9+3+3 = 15 sessions.

**Resolution:** The D-11 statement "12 sessions complete" likely predates the final module boundary decision. The planner should use the clean module boundary (Modules 1-5 complete = 15 sessions) which gives 15/25 = 60%. But D-11 specifically says "12 sessions complete." This needs to be interpreted as: the synthetic journey shows 12 sessions done, which means Modules 1-4 complete (12 sessions), currently in Module 5. The "Modules 1-5 done" text in D-11 appears to be an error vs the "12 sessions" number.

**Recommendation:** Follow the number (12 sessions) and clean module boundary. 12 sessions = Modules 1-4 (3+3+3+3). Currently in Module 5 with zero sessions done. 12/25 = 48% which is "approximately 50%" per the requirement. This is consistent and clean.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.x |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run src/lib/progress.test.ts` |
| Full suite command | `npm test` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CCURR-01 | 25 sessions exist in sessions/cascadia/ | smoke | `ls sessions/cascadia/*.md \| wc -l` (expect 25) | N/A (file count) |
| CCURR-06 | Recipe sessions have patches in patches/cascadia/ | smoke | `grep -l "session_origin:" patches/cascadia/*.md \| wc -l` | N/A (file count) |
| CDEMO-01 | Content bundled in src/content/ | smoke | `npm run bundle-content && ls src/content/sessions/cascadia/*.md \| wc -l` | N/A (script) |
| CDEMO-02 | Synthetic Cascadia journey returns 12 sessions | unit | `npx vitest run src/lib/progress.test.ts` | Exists (needs new tests) |
| CDEMO-03 | Landing page shows both instruments | manual-only | Start dev server, visit localhost:3000, verify both cards show | N/A |

### Sampling Rate
- **Per task commit:** `npx vitest run src/lib/progress.test.ts`
- **Per wave merge:** `npm test`
- **Phase gate:** Full suite green + manual demo verification

### Wave 0 Gaps
- [ ] New test cases in `src/lib/progress.test.ts` for `getSyntheticCompletedSessions('cascadia')` returning Cascadia set
- [ ] New test cases verifying Cascadia journey has exactly 12 completed sessions
- [ ] No new test files needed -- extend existing progress.test.ts

## Open Questions

1. **D-11 Session Count vs Module Boundary**
   - What we know: D-11 says "12 sessions complete (Modules 1-5 done)" but Modules 1-5 = 15 sessions (3+3+3+3+3)
   - What's unclear: Whether "12 sessions" or "Modules 1-5 done" is the intended constraint
   - Recommendation: Use 12 sessions = Modules 1-4 complete (clean boundary at 12), currently in Module 5. 12/25 = 48% which satisfies "approximately 50%." Flag for user if needed.

2. **Demo Patch Overlap**
   - What we know: 13 demo patches exist in `src/content/patches/cascadia/` from Phase 9. 4 curriculum patches exist in `patches/cascadia/`. The bundle script copies `patches/` to `src/content/patches/` with `cpSync recursive`.
   - What's unclear: Whether the 13 demo patches also exist at `patches/cascadia/` or only in `src/content/`. If only in src/content/, the bundle script's cpSync will overwrite them.
   - Recommendation: Before running bundle-content, verify demo patches exist in project root `patches/cascadia/`. If not, copy them there first so bundling preserves them.

3. **PatchSchema Type Enum**
   - What we know: Existing demo patches use types: bass, lead, pad, drum, texture, fx. D-05 says Module 7 covers: bass, lead, pad, percussion, texture, ambient.
   - What's unclear: Whether "percussion" and "ambient" are valid PatchSchema type values
   - Recommendation: Check PatchSchema enum. If "percussion" maps to "drum" and "ambient" maps to "texture" or needs adding, adjust before writing patches.

## Sources

### Primary (HIGH confidence)
- Direct file inspection of all referenced source files in the codebase
- `sessions/cascadia/*.md` -- all 9 existing sessions read for format reference
- `src/content/instruments/cascadia/modules/*.md` -- all 17 module docs for control/jack names
- `src/content/patches/cascadia/*.md` -- existing demo patch format reference
- `src/lib/synthetic-daily-notes.ts` -- existing Evolver journey pattern
- `src/lib/progress.ts` -- synthetic session lookup logic
- `src/app/instruments/[slug]/progress/page.tsx` -- progress page rendering
- `src/app/page.tsx` -- landing page instrument discovery
- `src/components/instrument-card.tsx` -- already shows session/patch counts
- `scripts/bundle-content.ts` -- content bundling mechanism
- `references/cascadia_manual_v1.1_2023.04.18.pdf` pp. 24-34 -- VCF, VCA B/LPF, Envelope details

### Secondary (MEDIUM confidence)
- Session topic suggestions for Modules 4-7 are based on module docs + synthesis pedagogy, not user-validated

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new libraries, all patterns established
- Architecture: HIGH -- extending existing patterns, no new architecture
- Content authoring: HIGH -- 9 sessions establish exact format to follow
- Code changes: HIGH -- small, well-scoped changes to 3 files
- Pitfalls: HIGH -- based on direct code inspection

**Research date:** 2026-04-03
**Valid until:** 2026-05-03 (stable content-authoring phase, no dependencies on moving targets)
