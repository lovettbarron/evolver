# Phase 4: MIDI SysEx Integration - Research

**Researched:** 2026-03-30
**Domain:** Web MIDI API, DSI Evolver SysEx protocol, browser-based MIDI I/O
**Confidence:** HIGH

## Summary

This phase adds bidirectional MIDI SysEx communication between the browser and a Dave Smith Evolver keyboard synthesizer. The Web MIDI API provides native browser support for MIDI device access including SysEx messages, but is limited to Chromium-based browsers (Chrome, Edge, Opera). The Evolver uses a well-documented SysEx protocol with a "packed MS bit" data format that encodes 192 raw parameter bytes into 220 MIDI-safe bytes.

The implementation requires: (1) a MIDI connection manager using `navigator.requestMIDIAccess({ sysex: true })`, (2) a SysEx parser/encoder that handles the DSI packed data format and maps 128 program parameters + 64 sequencer steps to human-readable names, (3) file I/O for writing markdown + JSON sidecar files to the vault or bundled content directory, and (4) a diff engine that compares two parsed parameter sets and groups differences by synth section.

**Primary recommendation:** Use the native Web MIDI API directly (no wrapper library needed). The Evolver protocol is simple enough that a thin abstraction layer in `src/lib/midi/` is cleaner and more maintainable than pulling in a general-purpose MIDI library. The SysEx parsing is the most complex part -- build it as a pure function module with the parameter map as static data, fully unit-testable without hardware.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Both capture modes**: primary "Capture Current Patch" button (app sends SysEx dump request) plus passive "Listen" toggle for advanced users
- **Dedicated MIDI page** at `/instruments/[slug]/midi` with nav link
- **Auto-detect + manual select** for MIDI device connection
- **Name + save flow** after capture with parsed parameter preview
- **Same library, extended schema**: PatchSchema gets optional fields (source, capture_date, program_number)
- **JSON sidecar** for parameter data: `.sysex.json` alongside `.md` patch files
- **Named parameters** in JSON sidecar: `{"osc1_freq": 64, "lpf_cutoff": 80, ...}`
- **Vault-first writes**: captured patches write to ~/song vault in local mode, bundled content in demo mode
- **Side-by-side columns** diff view with parameters aligned row-by-row, grouped by synth section
- **Show all parameters, highlight diffs**: differences in accent, identical in muted
- **Basic patch as default Patch A** in diff view
- **Send from MIDI page** with confirmation dialog, edit buffer only
- **Picker on MIDI page** with two dropdown selectors; only patches with SysEx data eligible

### Claude's Discretion
- Web MIDI API wrapper architecture and error handling patterns
- SysEx message framing and byte-level parsing implementation
- Parameter name mapping data structure
- MIDI page layout details (spacing, section ordering, responsive behavior)
- JSON sidecar naming convention
- Loading states and animations for MIDI operations
- Browser compatibility handling (non-Web MIDI browsers)
- Content reader changes to discover JSON sidecar files

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| MIDI-01 | App can receive SysEx program dumps from the Evolver over MIDI | Web MIDI API `requestMIDIAccess({ sysex: true })`, edit buffer dump request format `F0 01 20 01 06 F7`, MIDIInput `midimessage` event handler |
| MIDI-02 | App parses SysEx data into structured parameter values matching the Evolver's program format | Packed MS bit format documented, 128 program parameters + 64 sequencer steps, parameter number table extracted from manual pp.48-52 |
| MIDI-03 | App stores extracted patches as structured data (markdown + JSON sidecar) | Extended PatchSchema, JSON sidecar with named parameters, content reader extension, vault-first write path via config.ts |
| MIDI-04 | App can send SysEx program data back to the Evolver to restore a patch | Edit buffer data dump format `F0 01 20 01 03 [220 packed bytes] F7`, MIDIOutput.send() |
| MIDI-05 | User can compare two patches parameter-by-parameter (diff view) | Parameter grouping by synth section, basic patch as default baseline, ~198 parameters across 20 sections |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Web MIDI API (native) | W3C Spec | MIDI device access, SysEx send/receive | Browser-native, no dependency needed. Only API that provides raw SysEx access |
| React 19 | 19.2.4 | UI components | Already in project |
| Next.js 15 | 15.5.14 | App router, file-based routing | Already in project |
| Zod 3 | 3.23.0 | Schema validation for parsed SysEx data | Already in project, used for all content validation |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 1.7.0 | Icons (Usb, Wifi, Check, AlertTriangle, ArrowLeftRight) | Already in project |
| clsx | 2.1.1 | Conditional class names | Already in project |
| gray-matter | 4.0.3 | Frontmatter writing for generated patch markdown | Already in project |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Native Web MIDI API | webmidi.js (v3.1.14) | Adds 50KB+ for high-level abstractions we don't need. Evolver protocol is simple enough for direct API use. webmidi.js excels for note/CC workflows but adds unnecessary indirection for raw SysEx |
| Native Web MIDI API | MIDIVal | TypeScript-native but still overkill for our single-device SysEx use case |

**Installation:**
```bash
# No new packages needed -- all dependencies already in project
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── lib/
│   ├── midi/
│   │   ├── connection.ts       # MIDIAccess wrapper, device detection, reconnection
│   │   ├── sysex.ts           # SysEx message builders (request dump, send program)
│   │   ├── parser.ts          # Packed data unpacker, parameter extraction
│   │   ├── encoder.ts         # Parameter values -> packed SysEx bytes
│   │   ├── parameters.ts      # Static parameter map: number -> name, range, section
│   │   └── types.ts           # MidiDevice, ParsedPatch, ParameterDef types
│   ├── content/
│   │   ├── reader.ts          # Extended: discover .sysex.json sidecars
│   │   ├── writer.ts          # NEW: write markdown + JSON sidecar to vault/bundle
│   │   └── schemas.ts         # Extended: source, capture_date, program_number fields
│   └── patches.ts             # Extended: filter patches with SysEx data for diff
├── components/
│   ├── midi-page.tsx          # Top-level MIDI workspace (client component)
│   ├── midi-connection.tsx    # Device selector + status indicator
│   ├── capture-panel.tsx      # Capture button + listen toggle + preview
│   ├── patch-save-form.tsx    # Name/type/tags form for saving captured patch
│   ├── send-panel.tsx         # Patch selector + send button
│   ├── diff-view.tsx          # Side-by-side parameter comparison
│   ├── diff-picker.tsx        # Patch A / Patch B dropdown selectors
│   ├── confirm-dialog.tsx     # Reusable confirmation modal
│   └── status-indicator.tsx   # Connection status dot + label
├── app/
│   └── instruments/
│       └── [slug]/
│           └── midi/
│               └── page.tsx   # Route: /instruments/[slug]/midi
```

### Pattern 1: Client-Only MIDI Page
**What:** The entire MIDI page is a client component because the Web MIDI API is browser-only. No server components for MIDI operations.
**When to use:** Any page that requires browser APIs not available in Node.js.
**Example:**
```typescript
// src/app/instruments/[slug]/midi/page.tsx
'use client';

import { MidiPage } from '@/components/midi-page';

export default function MidiRoute({ params }: { params: { slug: string } }) {
  return <MidiPage instrumentSlug={params.slug} />;
}
```

### Pattern 2: MIDI Connection as React Context/State
**What:** MIDI connection state (access object, selected device, connection status) managed in a parent component and passed down via props. No global store needed -- all MIDI state lives on the MIDI page.
**When to use:** When multiple child components need access to the same MIDI connection.
**Example:**
```typescript
// Connection state shape
interface MidiConnectionState {
  status: 'unsupported' | 'detecting' | 'disconnected' | 'connected';
  access: MIDIAccess | null;
  input: MIDIInput | null;
  output: MIDIOutput | null;
  deviceName: string | null;
  error: string | null;
}
```

### Pattern 3: Pure Function SysEx Parser
**What:** SysEx parsing and encoding as pure functions with no side effects. Takes raw byte arrays, returns structured data. Fully unit-testable without hardware.
**When to use:** All SysEx data transformation.
**Example:**
```typescript
// src/lib/midi/parser.ts
export function unpackMsBit(packed: Uint8Array): Uint8Array {
  // 220 packed bytes -> 192 raw bytes (128 params + 64 seq steps)
  const raw = new Uint8Array(192);
  let rawIdx = 0;
  for (let i = 0; i < packed.length; i += 8) {
    const msBits = packed[i];
    for (let j = 1; j < 8 && rawIdx < 192; j++) {
      const msb = (msBits >> (j - 1)) & 1;
      raw[rawIdx++] = packed[i + j] | (msb << 7);
    }
  }
  return raw;
}

export function parseProgram(rawBytes: Uint8Array): Record<string, number> {
  const params: Record<string, number> = {};
  for (const [index, def] of PARAMETER_MAP.entries()) {
    params[def.key] = rawBytes[index];
  }
  return params;
}
```

### Pattern 4: Server Action for File Writes
**What:** Patch saving uses a Next.js server action (or API route) because file I/O requires Node.js `fs`. The client component calls the server action after capture.
**When to use:** Writing captured patches to the vault or bundled content directory.
**Example:**
```typescript
// src/lib/content/writer.ts
'use server';

import fs from 'fs/promises';
import path from 'path';
import { loadConfig } from '@/lib/config';
import { getContentRoot } from '@/lib/content/reader';

export async function saveCapturedPatch(
  instrument: string,
  slug: string,
  frontmatter: Record<string, unknown>,
  markdown: string,
  sysexData: Record<string, number>,
): Promise<void> {
  const config = await loadConfig();
  const root = getContentRoot(config);
  const dir = path.join(root, 'patches', instrument);

  // Write markdown file
  const mdContent = `---\n${Object.entries(frontmatter).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join('\n')}\n---\n\n${markdown}`;
  await fs.writeFile(path.join(dir, `${slug}.md`), mdContent, 'utf-8');

  // Write JSON sidecar
  await fs.writeFile(
    path.join(dir, `${slug}.sysex.json`),
    JSON.stringify(sysexData, null, 2),
    'utf-8',
  );
}
```

### Anti-Patterns to Avoid
- **Global MIDI state**: Do not put MIDI connection in a React context provider at the app level. MIDI is only used on the MIDI page. Keep state local.
- **Polling for MIDI devices**: Use the `statechange` event on MIDIAccess, not setInterval polling.
- **Blocking on SysEx response**: Use event-driven pattern with timeout, not synchronous waiting. SysEx responses can take 50-200ms.
- **Storing raw SysEx bytes**: Always store parsed named parameters. Raw bytes are not human-readable and not useful for diff.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| MIDI device access | Custom USB/serial driver | Web MIDI API `navigator.requestMIDIAccess()` | Browser handles device enumeration, permissions, driver layer |
| Frontmatter generation | String concatenation for YAML | gray-matter `matter.stringify()` | Already in project, handles edge cases (quoting, escaping) |
| Schema validation | Manual type checking for parsed params | Zod schema for SysEx JSON sidecar | Consistent with project pattern, catches malformed data |
| File path resolution | Hardcoded paths | `getContentRoot(config)` from existing reader.ts | Vault-first pattern already established |

**Key insight:** The SysEx packed data format is the one area where custom code is unavoidable and correct -- no library handles the DSI-specific 7-in-8 packing. But it is only ~20 lines of bitwise logic and is fully unit-testable.

## Common Pitfalls

### Pitfall 1: SysEx Permission Denied
**What goes wrong:** `requestMIDIAccess({ sysex: true })` fails with NotAllowedError.
**Why it happens:** SysEx access requires explicit user permission in Chrome 124+. Some browsers (Firefox, Safari) don't support Web MIDI at all.
**How to avoid:** Check `navigator.requestMIDIAccess` existence first. Handle permission denial gracefully with the "Web MIDI Not Supported" UI state from the UI-SPEC. Always call with `{ sysex: true }`.
**Warning signs:** Works in development but fails in production (HTTPS required for permissions).

### Pitfall 2: Packed Data Off-By-One
**What goes wrong:** Parameters are shifted by one position, returning wrong values.
**Why it happens:** The packed format has the MS bits byte FIRST (index 0 in each 8-byte packet), then 7 data bytes. Easy to confuse which bit maps to which byte.
**How to avoid:** The manual specifies bit 0 of the MS byte corresponds to parameter A (first data byte), bit 6 to parameter G (seventh data byte). Write comprehensive unit tests with known SysEx dumps.
**Warning signs:** Parameter values that are always 0-127 when they should exceed 127, or values doubled/halved.

### Pitfall 3: Edit Buffer vs Program Dump Confusion
**What goes wrong:** Sending a program dump (with bank/slot) overwrites a specific program slot on the hardware.
**Why it happens:** Program Data Dump (command 0x02) includes bank and program number. Edit Buffer Data Dump (command 0x03) does not.
**How to avoid:** ALWAYS use Edit Buffer for both request and send. Request: `F0 01 20 01 06 F7`. Send: `F0 01 20 01 03 [data] F7`. Never use command 0x02/0x05.
**Warning signs:** User reports their stored programs were overwritten.

### Pitfall 4: SysEx Message Reassembly
**What goes wrong:** The `midimessage` event fires with partial SysEx data or multiple messages concatenated.
**Why it happens:** Some MIDI drivers split large SysEx messages across multiple events. The 220-byte payload is small enough that this rarely happens with the Evolver, but USB-MIDI adapters can behave unpredictably.
**How to avoid:** Buffer incoming bytes. Start collecting on `0xF0`, stop on `0xF7`. Validate the complete message before parsing.
**Warning signs:** Parse errors on otherwise valid SysEx responses.

### Pitfall 5: MIDI Page in Server Component
**What goes wrong:** Build fails or runtime error because Web MIDI API is called during SSR.
**Why it happens:** Next.js 15 server components run on Node.js where `navigator` doesn't exist.
**How to avoid:** The MIDI page must be `'use client'`. All MIDI API calls happen in useEffect or event handlers, never at module scope.
**Warning signs:** "navigator is not defined" errors during build.

### Pitfall 6: File Write Race Conditions
**What goes wrong:** Two rapid captures overwrite each other or produce corrupt files.
**Why it happens:** Async file writes without proper sequencing.
**How to avoid:** Serialize write operations. Use unique slug generation (kebab-case from user-provided name). Check for existing files before writing.
**Warning signs:** Missing patches or truncated JSON sidecar files.

## Code Examples

### Evolver SysEx Protocol Reference

Source: DSI Evolver Keyboard Manual v1.3, pp.41-52

```
Manufacturer ID: 0x01 (DSI / Sequential)
Device ID: 0x20 (Evolver)
File Version: 0x01

Request Edit Buffer:  F0 01 20 01 06 F7
Edit Buffer Dump:     F0 01 20 01 03 [220 packed bytes] F7
Program Parameters:   F0 01 20 01 01 [param#] [LS nibble] [MS nibble] F7
Request Program Dump: F0 01 20 01 05 [bank 0-3] [program 0-127] F7
Program Data Dump:    F0 01 20 01 02 [bank] [program] [220 packed bytes] F7
Program Name Dump:    F0 01 20 01 11 [bank] [program] [16 ASCII bytes] F7
```

### Packed MS Bit Format (from manual p.45)

```
Input (7 raw bytes A-G):
  A: A7 A6 A5 A4 A3 A2 A1 A0
  B: B7 B6 B5 B4 B3 B2 B1 B0
  ... through G

Packed (8 MIDI bytes):
  Byte 1: 0  G7 F7 E7 D7 C7 B7 A7   (MS bits, bit 7 always 0 for MIDI)
  Byte 2: 0  A6 A5 A4 A3 A2 A1 A0   (A without MS bit)
  Byte 3: 0  B6 B5 B4 B3 B2 B1 B0   (B without MS bit)
  ... through Byte 8: G without MS bit

192 raw bytes -> 220 packed bytes (ceil(192/7) * 8 = 224, last packet partial)
```

### Web MIDI API Connection
```typescript
// Source: MDN Web MIDI API docs
async function connectMidi(): Promise<MIDIAccess> {
  if (!navigator.requestMIDIAccess) {
    throw new Error('Web MIDI API not supported');
  }
  const access = await navigator.requestMIDIAccess({ sysex: true });
  return access;
}

function findEvolverPorts(access: MIDIAccess): { input: MIDIInput | null; output: MIDIOutput | null } {
  let input: MIDIInput | null = null;
  let output: MIDIOutput | null = null;

  access.inputs.forEach((port) => {
    if (port.name?.toLowerCase().includes('evolver') || !input) {
      input = port;
    }
  });
  access.outputs.forEach((port) => {
    if (port.name?.toLowerCase().includes('evolver') || !output) {
      output = port;
    }
  });

  return { input, output };
}
```

### Request and Receive Edit Buffer
```typescript
const SYSEX_REQUEST_EDIT_BUFFER = new Uint8Array([0xF0, 0x01, 0x20, 0x01, 0x06, 0xF7]);

function requestEditBuffer(output: MIDIOutput, input: MIDIInput): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      input.onmidimessage = null;
      reject(new Error('SysEx response timeout'));
    }, 3000);

    const buffer: number[] = [];
    input.onmidimessage = (event: MIDIMessageEvent) => {
      const data = event.data;
      for (const byte of data) {
        buffer.push(byte);
        if (byte === 0xF7) {
          clearTimeout(timeout);
          input.onmidimessage = null;
          resolve(new Uint8Array(buffer));
        }
      }
    };

    output.send(SYSEX_REQUEST_EDIT_BUFFER);
  });
}
```

### Parameter Map Structure
```typescript
// src/lib/midi/parameters.ts
export interface ParameterDef {
  index: number;      // 0-127 for program params, 0-63 for seq steps
  key: string;        // Machine-readable key: "osc1_freq"
  name: string;       // Human name: "Oscillator 1 Frequency"
  section: string;    // Group: "oscillators" | "filter" | "envelopes" | "lfos" | "sequencer" | ...
  min: number;
  max: number;
  display?: (v: number) => string; // Optional value formatter
}

// First 8 of 128 program parameters (from manual pp.48-52):
export const PROGRAM_PARAMETERS: ParameterDef[] = [
  { index: 0,  key: 'osc1_freq',      name: 'Oscillator 1 Frequency',  section: 'oscillators', min: 0, max: 120 },
  { index: 1,  key: 'osc1_fine',      name: 'Oscillator 1 Fine Tune',  section: 'oscillators', min: 0, max: 100 },
  { index: 2,  key: 'osc1_shape',     name: 'Oscillator 1 Shape',      section: 'oscillators', min: 0, max: 102 },
  { index: 3,  key: 'osc1_level',     name: 'Oscillator 1 Level',      section: 'oscillators', min: 0, max: 100 },
  { index: 4,  key: 'osc2_freq',      name: 'Oscillator 2 Frequency',  section: 'oscillators', min: 0, max: 120 },
  { index: 5,  key: 'osc2_fine',      name: 'Oscillator 2 Fine Tune',  section: 'oscillators', min: 0, max: 100 },
  { index: 6,  key: 'osc2_shape',     name: 'Oscillator 2 Shape',      section: 'oscillators', min: 0, max: 102 },
  { index: 7,  key: 'osc2_level',     name: 'Oscillator 2 Level',      section: 'oscillators', min: 0, max: 100 },
  // ... continues through parameter 127
];

// Sections for grouping in diff view (matches patch-detail layout):
export const PARAMETER_SECTIONS = [
  'oscillators',
  'filter',
  'envelopes',
  'vca',
  'feedback',
  'delay',
  'lfos',
  'modulation',
  'sequencer',
  'external_input',
  'misc',
] as const;
```

### JSON Sidecar Format
```json
{
  "format_version": 1,
  "raw_byte_count": 192,
  "parameters": {
    "osc1_freq": 36,
    "osc1_fine": 50,
    "osc1_shape": 0,
    "osc1_level": 50,
    "osc2_freq": 36,
    "osc2_fine": 50,
    "osc2_shape": 0,
    "osc2_level": 50
  },
  "sequencer": {
    "seq1_steps": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "seq2_steps": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "seq3_steps": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "seq4_steps": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
}
```

### Extended PatchSchema
```typescript
export const PatchSchema = z.object({
  name: z.string(),
  type: z.enum(['bass', 'lead', 'pad', 'drum', 'texture', 'sequence']),
  session_origin: z.union([z.number(), z.null()]),
  description: z.string(),
  tags: z.array(z.string()),
  instrument: z.string(),
  created: z.string(),
  // New optional fields for SysEx integration
  source: z.enum(['manual', 'sysex']).optional(),
  capture_date: z.string().optional(),
  program_number: z.number().int().min(0).max(127).optional(),
}).passthrough();
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Java applets for MIDI | Web MIDI API | Chrome 43 (2015), standardized 2023 | No plugins needed, browser-native |
| MIDI without permissions | Permission-gated MIDI | Chrome 124 (2024) | Must handle permission prompts |
| SysEx blocked by default | SysEx via opt-in flag | W3C spec | `{ sysex: true }` required in requestMIDIAccess |

**Deprecated/outdated:**
- Jazz-Plugin (browser plugin for MIDI): obsolete, replaced by native Web MIDI API
- MIDI.js: unmaintained, last updated 2019
- Chrome Apps MIDI: deprecated with Chrome Apps platform

**Browser support as of 2026:**
- Chrome/Edge/Opera: Full Web MIDI + SysEx support
- Firefox: Partial support (behind flag, SysEx may require additional permissions)
- Safari: No Web MIDI API support
- The UI-SPEC already includes a "Web MIDI Not Supported" banner for incompatible browsers

## Open Questions

1. **SysEx response timing with USB-MIDI adapters**
   - What we know: Direct USB connection to Evolver should respond within 100-200ms. The manual doesn't specify timing guarantees.
   - What's unclear: Third-party USB-MIDI adapters (not the Evolver's built-in USB) may introduce latency or split SysEx messages.
   - Recommendation: Use a 3-second timeout with buffered message reassembly. This handles worst-case adapter behavior.

2. **Basic patch as JSON sidecar**
   - What we know: The basic patch exists as `instruments/evolver/basic-patch.md` with a human-readable parameter table. The diff view needs it as structured data.
   - What's unclear: Should we create a static `basic-patch.sysex.json` file manually, or derive it from the markdown parameter table?
   - Recommendation: Create a hand-crafted `basic-patch.sysex.json` as reference data in `src/lib/midi/` (or alongside the basic-patch.md). This is the baseline for all diffs and should be version-controlled, not auto-generated.

3. **Naming convention for JSON sidecar**
   - What we know: CONTEXT.md says `.sysex.json` alongside `.md` files.
   - What's unclear: Whether content reader glob `*.md` will accidentally pick up `.sysex.json` files.
   - Recommendation: Use `{slug}.sysex.json` convention. The content reader already globs `*.md` so JSON files won't interfere. Reader extension needs to look for `{slug}.sysex.json` when loading each patch.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | vitest 3.x |
| Config file | none -- uses package.json scripts (`vitest run`) |
| Quick run command | `npm test` |
| Full suite command | `npm test` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| MIDI-01 | Receive SysEx program dump | unit (mock MIDIAccess) | `npx vitest run src/lib/midi/__tests__/connection.test.ts -t "request edit buffer"` | Wave 0 |
| MIDI-02 | Parse SysEx into named parameters | unit | `npx vitest run src/lib/midi/__tests__/parser.test.ts` | Wave 0 |
| MIDI-02 | Encode parameters back to packed bytes | unit | `npx vitest run src/lib/midi/__tests__/encoder.test.ts` | Wave 0 |
| MIDI-03 | Store patches as markdown + JSON sidecar | unit | `npx vitest run src/lib/content/__tests__/writer.test.ts` | Wave 0 |
| MIDI-03 | Content reader discovers JSON sidecars | unit | `npx vitest run src/lib/content/__tests__/reader-sysex.test.ts` | Wave 0 |
| MIDI-04 | Send SysEx to restore patch | unit (mock MIDIOutput) | `npx vitest run src/lib/midi/__tests__/connection.test.ts -t "send edit buffer"` | Wave 0 |
| MIDI-05 | Diff two parsed parameter sets | unit | `npx vitest run src/lib/midi/__tests__/diff.test.ts` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npm test`
- **Per wave merge:** `npm test`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/lib/midi/__tests__/parser.test.ts` -- covers MIDI-02: pack/unpack roundtrip with known data
- [ ] `src/lib/midi/__tests__/encoder.test.ts` -- covers MIDI-02/MIDI-04: encode parameters to packed bytes
- [ ] `src/lib/midi/__tests__/connection.test.ts` -- covers MIDI-01/MIDI-04: mock Web MIDI API for request/send
- [ ] `src/lib/midi/__tests__/diff.test.ts` -- covers MIDI-05: parameter comparison logic
- [ ] `src/lib/content/__tests__/writer.test.ts` -- covers MIDI-03: file write with frontmatter + JSON sidecar
- [ ] `src/lib/content/__tests__/reader-sysex.test.ts` -- covers MIDI-03: sidecar discovery

## Sources

### Primary (HIGH confidence)
- DSI Evolver Keyboard Operation Manual v1.3 (local: `references/Evo_Key_Manual_1.3.pdf`) -- SysEx protocol specification pp.41-55, packed data format p.45, parameter table pp.48-52, modulation destinations pp.53-54, modulation sources p.55
- [MDN Web MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API) -- requestMIDIAccess, MIDIAccess, MIDIInput, MIDIOutput, midimessage event, statechange event
- [MDN Navigator.requestMIDIAccess()](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/requestMIDIAccess) -- sysex option, permission handling

### Secondary (MEDIUM confidence)
- [Chrome Web MIDI Permission Blog](https://developer.chrome.com/blog/web-midi-permission-prompt) -- Permission requirement from Chrome 124+
- [Cycling '74 Forums - packed data format](https://cycling74.com/forums/converting-packed-data-formatted-sysex-data) -- Community validation of DSI packed format implementation
- [Elektronauts - Evolver SysEx dumps](https://www.elektronauts.com/t/dsi-evolver-sysex-dump-and-programs/58265) -- Edit buffer vs program dump distinction confirmed

### Tertiary (LOW confidence)
- [Vintage Synth Forums - Evolver SysEx](https://forum.vintagesynth.com/viewtopic.php?t=66832) -- Nibble format discussion, DSI manufacturer ID 0x01

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies needed, all browser-native + existing project libs
- Architecture: HIGH -- SysEx protocol fully documented in manual, Web MIDI API well-documented on MDN
- Pitfalls: HIGH -- common MIDI integration issues well-known in the synth programming community
- Parameter map: HIGH -- complete parameter table extracted from official DSI manual pp.48-52 (128 program params + 64 seq steps = 192 bytes)

**Research date:** 2026-03-30
**Valid until:** 2026-06-30 (Web MIDI API is stable, Evolver protocol is fixed hardware)
