---
phase: 04-midi-sysex-integration
verified: 2026-03-30T10:43:00Z
status: human_needed
score: 14/14 automated must-haves verified
re_verification: false
human_verification:
  - test: "Navigate to /instruments/evolver/midi in a browser and verify the MIDI workspace loads"
    expected: "Page shows Connection, Capture, Send to Device, and Compare Patches sections with correct layout and styling"
    why_human: "Visual rendering and responsive layout cannot be verified by static analysis"
    result: "passed — verified on localhost:3001, layout correct"
  - test: "Connect an Evolver (or any MIDI device) and click Capture Current Patch"
    expected: "App sends SysEx request over Web MIDI, receives 220-byte response, parses it, and displays captured parameter values"
    why_human: "Requires physical hardware and live Web MIDI API — cannot mock end-to-end"
    result: "deferred — Listen Mode did not pick up SysEx dump from hardware Evolver. Buffer fix applied (filter real-time MIDI messages, reset on 0xF0) but not yet re-tested. Needs debugging with hardware connected."
  - test: "After capture, fill in name/type and click Save to Library"
    expected: "POST to /api/patches/save succeeds, markdown + .sysex.json sidecar written to disk, success message shown"
    why_human: "File system write to vault path requires runtime environment"
    result: "deferred — blocked by capture not working"
  - test: "Select a saved patch in Send to Device and confirm the dialog"
    expected: "SysEx dump sent to Evolver edit buffer, Evolver loads the patch"
    why_human: "Requires physical hardware for end-to-end verification"
    result: "deferred — blocked by capture not working"
  - test: "In Compare Patches, select a second patch in the Patch B dropdown"
    expected: "Parameters appear side-by-side; changed params have lime-green accent highlight; identical params in muted gray; summary line shows count"
    why_human: "Visual diff rendering requires visual inspection"
    result: "passed — verified on localhost:3001, diff view renders correctly"
---

# Phase 4: MIDI SysEx Integration Verification Report

**Phase Goal:** Users can capture patches from the Evolver over MIDI, store them as structured data, send patches back, and compare patches side-by-side
**Verified:** 2026-03-30T10:43:00Z
**Status:** human_needed (all automated checks pass; hardware-dependent flows need human testing)
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| #  | Truth | Status | Evidence |
|----|-------|--------|----------|
| 1  | Raw 220 packed SysEx bytes unpack to 192 raw bytes and back losslessly | VERIFIED | 42 MIDI lib tests pass; roundtrip tests in `encoder.test.ts` explicitly cover `unpackMsBit(packMsBit(raw)) === raw` |
| 2  | 192 raw bytes map to 128 named parameters + 64 sequencer step values | VERIFIED | `parameters.test.ts` confirms `PROGRAM_PARAMETERS.length === 128`, `SEQUENCER_PARAMETERS.length === 64`; no duplicate indices |
| 3  | Every parameter has a human-readable key, name, section, and valid range | VERIFIED | 128 entries counted in `parameters.ts`; `parameters.test.ts` validates fields and section membership |
| 4  | The basic patch exists as a JSON sidecar with all parameter values | VERIFIED | `basic-patch.sysex.json` present; `format_version: 1`, 128 parameters, `osc1_freq` key confirmed |
| 5  | PatchSchema accepts optional source, capture_date, and program_number fields | VERIFIED | `schemas.ts` lines 25-27 have all three optional fields with correct Zod types |
| 6  | Content reader discovers .sysex.json sidecars alongside patch markdown | VERIFIED | `reader.ts` lines 100-111 implement sidecar discovery with `fs.access` try/catch; 5 reader-sysex tests pass |
| 7  | Content writer saves markdown + JSON sidecar with correct structure | VERIFIED | `writer.ts` exports `saveCapturedPatch` and `toSlug`; 8 writer tests pass including frontmatter and collision tests |
| 8  | Existing patch loading is not broken by schema extension | VERIFIED | 148 content tests pass (includes all existing patch validation) |
| 9  | User can connect the Evolver via MIDI and see connection status on the MIDI page | VERIFIED (automated) / HUMAN NEEDED (hardware) | `midi-connection.tsx` uses `requestMidiAccess`, `findEvolverPorts`; `status-indicator.tsx` has `aria-live="polite"`; 6 connection tests pass |
| 10 | User can click Capture Current Patch and receive a parsed SysEx dump | VERIFIED (automated) / HUMAN DEFERRED | `capture-panel.tsx` calls `requestEditBuffer` and `parseProgram`; Listen Mode did not pick up dump from hardware — buffer fix applied, needs re-test |
| 11 | User can name and save a captured patch to the library | VERIFIED (automated) / HUMAN DEFERRED | `patch-save-form.tsx` POSTs to `/api/patches/save`; route calls `saveCapturedPatch`; blocked by capture |
| 12 | User can select a stored patch and send it to the Evolver edit buffer | VERIFIED (automated) / HUMAN DEFERRED | `send-panel.tsx` calls `sendEditBuffer`; "Send to Device" string confirmed; blocked by capture |
| 13 | User can select two patches for comparison with basic patch as default Patch A | VERIFIED | `diff-picker.tsx` defaults `selectedA` to `__basic_patch__`, renders "Basic Patch (default baseline)" option; "Select a patch" placeholder confirmed |
| 14 | Parameters are displayed side-by-side with changed params highlighted and a summary line | VERIFIED | `diff-view.tsx` has `bg-accent/10` row highlight, `text-muted` for identical, "parameters differ"/"Patches are identical" strings, `<table>` elements; 9 diff tests pass |

**Score:** 14/14 automated checks verified
**Human verification:** 2/5 passed, 3/5 deferred (hardware MIDI capture/send needs debugging)

### Required Artifacts

| Artifact | Status | Details |
|----------|--------|---------|
| `src/lib/midi/types.ts` | VERIFIED | Exports `ParameterDef`, `ParsedPatch`, `SysexJson`, `PARAMETER_SECTIONS` |
| `src/lib/midi/parameters.ts` | VERIFIED | 128 `PROGRAM_PARAMETERS` entries (grep-counted), 64 `SEQUENCER_PARAMETERS` (programmatic), `getParameterByKey` exported |
| `src/lib/midi/parser.ts` | VERIFIED | Exports `unpackMsBit` and `parseProgram` |
| `src/lib/midi/encoder.ts` | VERIFIED | Exports `packMsBit` and `encodeProgram` |
| `src/lib/midi/sysex.ts` | VERIFIED | Exports `SYSEX_REQUEST_EDIT_BUFFER`, `buildEditBufferDump`, `validateSysexMessage` |
| `src/lib/midi/connection.ts` | VERIFIED | Exports `requestMidiAccess`, `findEvolverPorts`, `requestEditBuffer`, `sendEditBuffer`, `isMidiSupported`, `listMidiDevices` |
| `src/lib/midi/diff.ts` | VERIFIED | Exports `diffPatches`, `DiffResult`, `ParameterDiff`, `SectionDiff` |
| `src/content/instruments/evolver/basic-patch.sysex.json` | VERIFIED | `format_version: 1`, 128 parameters, `osc1_freq` key present |
| `src/lib/content/schemas.ts` | VERIFIED | `source`, `capture_date`, `program_number` optional fields at lines 25-27 |
| `src/lib/content/reader.ts` | VERIFIED | `listPatches` return type includes `sysexData: Record<string, unknown> \| null` |
| `src/lib/content/writer.ts` | VERIFIED | Exports `saveCapturedPatch` and `toSlug` |
| `src/components/midi-page.tsx` | VERIFIED | `'use client'` directive; imports and renders `DiffPicker` and `DiffView`; "Compare Patches" section heading |
| `src/components/midi-connection.tsx` | VERIFIED | Imports `requestMidiAccess` from connection.ts |
| `src/components/capture-panel.tsx` | VERIFIED | Imports `requestEditBuffer` and `parseProgram`; calls both in capture flow |
| `src/components/patch-save-form.tsx` | VERIFIED | POSTs to `/api/patches/save`; "Save to Library" string |
| `src/components/send-panel.tsx` | VERIFIED | Imports and calls `sendEditBuffer`; uses `ConfirmDialog`; "Send to Device" string |
| `src/components/confirm-dialog.tsx` | VERIFIED | `role="dialog"` and `aria-modal="true"` at lines 51-52 |
| `src/components/status-indicator.tsx` | VERIFIED | `aria-live="polite"` at line 19 |
| `src/components/diff-picker.tsx` | VERIFIED | "Basic Patch (default baseline)" and "Select a patch" strings; defaults Patch A to basic patch |
| `src/components/diff-view.tsx` | VERIFIED | `diffPatches` call; `<table>` elements; `bg-accent/10`; both summary strings |
| `src/app/instruments/[slug]/midi/page.tsx` | VERIFIED | `'use client'`; imports and renders `MidiPage`; uses `React.use(params)` for async params |
| `src/app/api/patches/save/route.ts` | VERIFIED | Exports `POST`; imports and calls `saveCapturedPatch` |
| `src/app/api/patches/list/route.ts` | VERIFIED | Exports `GET` |
| `src/components/nav.tsx` | VERIFIED | `/instruments/evolver/midi` at line 12 |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `parser.ts` | `parameters.ts` | `import PROGRAM_PARAMETERS` | WIRED | Line 1 of parser.ts |
| `encoder.ts` | `parameters.ts` | `import PROGRAM_PARAMETERS` | WIRED | Line 1 of encoder.ts |
| `capture-panel.tsx` | `connection.ts` | `requestEditBuffer` call | WIRED | Line 4 import + line 33 call |
| `capture-panel.tsx` | `parser.ts` | `parseProgram` call | WIRED | Line 5 import + line 62 call |
| `send-panel.tsx` | `connection.ts` | `sendEditBuffer` call | WIRED | Line 4 import + line 59 call |
| `patch-save-form.tsx` | `writer.ts` (via API route) | fetch POST `/api/patches/save` → `saveCapturedPatch` | WIRED | Form fetches API route (line 32); API route imports and calls `saveCapturedPatch` (line 28). Indirect but correct — client component correctly uses API route rather than direct server import |
| `diff-view.tsx` | `diff.ts` | `diffPatches` call | WIRED | Line 4 import + line 18 call |
| `diff-picker.tsx` | `diff-view.tsx` | Selection changes passed to DiffView | WIRED | `DiffPicker` is wired via `midi-page.tsx` callback pattern; `midi-page.tsx` imports both (lines 8-9) and passes picker selection state to DiffView props |
| `reader.ts` | `schemas.ts` | `PatchSchema` import | WIRED | Confirmed by 148 passing content tests |
| `writer.ts` | `reader.ts` | `getContentRoot` import | WIRED | `writer.ts` line 4 imports `getContentRoot` from reader |

### Requirements Coverage

| Requirement | Source Plan | Description | Status |
|-------------|------------|-------------|--------|
| MIDI-01 | 04-03 | App can receive SysEx program dumps from the Evolver over MIDI | SATISFIED (code) / DEFERRED (hardware test) — `requestEditBuffer` in `connection.ts` sends request, buffers SysEx response, resolves with `ParsedPatch`. Listen mode buffer fix applied but not re-tested with hardware. |
| MIDI-02 | 04-01 | App parses SysEx data into structured parameter values | SATISFIED — `unpackMsBit` + `parseProgram` form lossless codec. 42 MIDI tests pass including roundtrip verification. |
| MIDI-03 | 04-02 | App stores extracted patches as structured data | SATISFIED — `saveCapturedPatch` writes markdown + `.sysex.json` sidecar. `listPatches` returns `sysexData`. 13 content tests pass. |
| MIDI-04 | 04-03 | App can send SysEx program data back to the Evolver | SATISFIED (code) / DEFERRED (hardware test) — `sendEditBuffer` in `connection.ts` encodes `ParsedPatch` and sends via Web MIDI. Send panel wired with confirmation dialog. |
| MIDI-05 | 04-04 | User can compare two patches parameter-by-parameter | SATISFIED — `diffPatches` + `DiffView` + `DiffPicker` deliver side-by-side comparison with section grouping and accent highlighting. 9 diff tests pass. |

All 5 MIDI requirement IDs from plans are accounted for. No orphaned requirements found.

### Anti-Patterns Found

None detected in the files modified during this phase. No hardcoded hex color values in UI components. No TODO/FIXME/placeholder comments in implementation files. No empty return stubs.

### Human Verification Results

#### 1. MIDI Workspace Page Layout — PASSED

Verified on localhost:3001. Four sections render correctly (Connection, Capture, Send to Device, Compare Patches). Nav shows "MIDI" link. Design system colors applied.

#### 2. End-to-End Capture Flow — DEFERRED

Listen Mode did not pick up SysEx dump from hardware Evolver. Buffer fix applied (filter real-time MIDI messages, reset accumulation on 0xF0 start byte) but not yet re-tested with hardware. Needs dedicated debugging session with Evolver connected.

#### 3. Save Captured Patch — DEFERRED

Blocked by capture flow not working with hardware. Code path verified by automated tests.

#### 4. Send to Device Flow — DEFERRED

Blocked by no captured patches to send. Code path verified by automated tests.

#### 5. Patch Diff View — PASSED

Verified on localhost:3001. Diff view renders correctly with section grouping, accent highlighting for changed params, muted text for identical params.

### Gaps Summary

**Known issue:** SysEx capture (Listen Mode and Capture Current Patch) did not work with physical Evolver hardware. A buffer fix was applied to filter real-time MIDI messages and properly reset on SysEx start bytes, but has not been re-tested. This affects MIDI-01 and MIDI-04 hardware verification. All automated/code-level checks pass — the issue is in the real-time MIDI message handling with actual hardware.

---

_Verified: 2026-03-30T10:43:00Z_
_Verifier: Claude (gsd-verifier) + human (partial)_
