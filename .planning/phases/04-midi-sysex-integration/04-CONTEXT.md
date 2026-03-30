# Phase 4: MIDI SysEx Integration - Context

**Gathered:** 2026-03-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Users can capture patches from the Evolver over MIDI, store them as structured data, send patches back to the hardware, and compare patches side-by-side with parameter differences highlighted. This phase adds Web MIDI API integration, SysEx parsing/encoding, patch storage with full parameter data, a dedicated MIDI tools page, and a parameter diff view.

</domain>

<decisions>
## Implementation Decisions

### Capture workflow
- **Both capture modes**: primary "Capture Current Patch" button (app sends SysEx dump request to Evolver, which responds) plus a passive "Listen" toggle for advanced users who trigger dumps from the hardware front panel
- **Dedicated MIDI page** at `/instruments/[slug]/midi` — all MIDI operations (capture, send, diff) live here. Nav gets a "MIDI" link. Keeps the patch library as a read-only browsing experience
- **Auto-detect + manual select** for MIDI device connection: app detects MIDI devices on page load, dropdown if multiple devices found, auto-reconnect on replug. Connection status always visible on the MIDI page
- **Name + save flow** after capture: show parsed parameters inline, prompt for name and optional type/tags, then save to library. Captured patches appear in the library immediately

### Patch storage format
- **Same library, extended schema**: captured patches join the existing patch library alongside hand-written demo patches. PatchSchema gets optional fields: `source` ('manual' | 'sysex'), `capture_date`, `program_number`
- **JSON sidecar** for parameter data: markdown file for human-readable content (same format as existing patches) plus a separate `.sysex.json` file with the full parameter dump. Keeps markdown clean for Obsidian rendering
- **Named parameters** in the JSON sidecar: `{"osc1_freq": 64, "lpf_cutoff": 80, ...}` — human-readable, diffable, self-documenting. Parameter name mapping derived from the Evolver SysEx spec in the DSI manual
- **Vault-first writes**: in local mode, captured patches write to ~/song vault (appear in Obsidian immediately). In demo mode, fall back to bundled content directory. Consistent with vault-as-source-of-truth philosophy

### Diff view design
- **Side-by-side columns** with parameters aligned row-by-row. Differences highlighted with accent color. Parameters grouped by synth section (Oscillators, Filter, Envelopes, LFOs, Sequencer) matching the patch detail layout from Phase 3
- **Show all parameters, highlight diffs**: all ~220 parameters visible, differences use accent highlight, identical parameters in muted text. Consistent with ADHD-friendly scanning — everything visible, key info pops
- **Picker on MIDI page**: two dropdown selectors to pick Patch A and Patch B. Only patches with SysEx data (JSON sidecar) are eligible for comparison
- **Basic patch as default Patch A**: the basic patch is pre-loaded as the comparison baseline by default. Shows "what changed from the starting point." User can change Patch A to any other patch. Reinforces the curriculum's basic-patch-first philosophy

### Send-to-device flow
- **Send from MIDI page**: "Send to Device" section with a patch selector. All MIDI operations centralized in one place
- **Confirmation dialog** before sending: "This will load [Patch Name] into the Evolver's edit buffer. Your current unsaved edits on the hardware will be replaced." Requires explicit confirm
- **Edit buffer only**: send always loads into the Evolver's edit buffer (temporary). Never overwrites stored programs. User saves to a program slot from the hardware if they want to keep it
- **Simple status feedback**: brief "Sending..." state, then success confirmation ("Patch loaded on Evolver") or error state if MIDI fails

### Claude's Discretion
- Web MIDI API wrapper architecture and error handling patterns
- SysEx message framing and byte-level parsing implementation
- Parameter name mapping data structure (how the ~220 Evolver parameters are defined)
- MIDI page layout details (spacing, section ordering, responsive behavior)
- JSON sidecar naming convention (e.g., `patch-name.sysex.json` vs `patch-name.midi.json`)
- Loading states and animations for MIDI operations
- How to handle browsers that don't support Web MIDI API (Chrome-only currently)
- Content reader changes to discover and associate JSON sidecar files with markdown patches

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Evolver SysEx specification
- `references/Evo_Key_Manual_1.3.pdf` — Official DSI manual: SysEx format specification, program dump format, parameter numbering, MIDI implementation chart. **Critical** for building the SysEx parser and parameter name mapping
- `references/evolverguide.pdf` — Anu Kirk's guide: parameter descriptions and musical context for what each parameter does

### Existing patch infrastructure
- `src/lib/content/schemas.ts` — PatchSchema (needs extension with source, capture_date, program_number fields)
- `src/lib/content/reader.ts` — Content reader with `listPatches()` — needs to discover JSON sidecar files
- `src/lib/patches.ts` — PatchWithMeta type, groupByType, getAvailableTypes utilities
- `src/lib/content/types.ts` — Patch type export

### Existing UI patterns
- `src/components/patch-detail.tsx` — Patch detail page (parameter display pattern)
- `src/components/patch-grid.tsx` — Patch grid layout
- `src/components/patch-card.tsx` — Patch card component
- `src/components/sticky-header.tsx` — Sticky header pattern for new MIDI page
- `src/components/nav.tsx` — Nav component (needs "MIDI" link added)

### Design system
- `src/app/globals.css` — Tailwind theme tokens (bg, surface, text, muted, accent, param)

### Baseline reference
- `instruments/evolver/basic-patch.md` — Basic patch parameter dump (default Patch A in diff view, foundation for all captures)
- `src/content/patches/evolver/` — 16 demo patches (will coexist with captured patches in the library)

### Project context
- `.planning/REQUIREMENTS.md` — MIDI-01 through MIDI-05 requirements
- `.planning/PROJECT.md` — Constraints and key decisions

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/content/reader.ts`: Content reader with `listPatches()` — data layer exists, needs extension for JSON sidecar discovery
- `src/lib/content/schemas.ts`: PatchSchema — needs optional fields added (source, capture_date, program_number)
- `src/lib/patches.ts`: PatchWithMeta type, groupByType/getAvailableTypes — will work with extended patches
- `src/components/patch-detail.tsx`: Parameter display grouped by synth section — diff view can reuse this grouping logic
- `src/components/sticky-header.tsx`: Reusable sticky header for the MIDI page
- `src/lib/markdown/processor.ts`: Markdown rendering pipeline — renders captured patch markdown bodies

### Established Patterns
- Server components for data loading, client components for interactivity (MIDI page will be mostly client-side due to Web MIDI API)
- Instrument-scoped routing: `/instruments/[slug]/midi`
- Tailwind-only styling via CSS custom properties (no hardcoded colors)
- Content validated via Zod at parse time with `.passthrough()` for Obsidian tolerance
- URL-based state via useSearchParams (used in patch filtering, could apply to diff view)
- Config-based vault path detection for write target selection

### Integration Points
- Route: `/instruments/[slug]/midi` (new page)
- Nav component: add "MIDI" link
- Content reader: extend to read `.sysex.json` sidecar files alongside `.md` patch files
- PatchSchema: add optional fields for SysEx source tracking
- Write path: config.ts vault path for determining write target (vault vs bundle)

</code_context>

<specifics>
## Specific Ideas

- The MIDI page is a **workspace**, not a browse view — it's where you interact with the hardware. Distinct from the read-only patch library
- Basic patch as default diff baseline reinforces the curriculum philosophy: every patch is a departure from the known starting point
- JSON sidecar keeps markdown clean for Obsidian while preserving full machine-readable parameter data for diff and send operations
- "Capture Current Patch" as the primary mode — one click and the app handles the SysEx handshake. Passive listen is the power-user escape hatch
- Edit buffer only for send — never risk overwriting stored programs. The hardware's save flow handles permanence

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-midi-sysex-integration*
*Context gathered: 2026-03-30*
