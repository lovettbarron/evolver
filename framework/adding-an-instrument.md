# Adding a New Instrument

This guide walks through everything needed to add a new instrument to the project — from content structure through web app integration and interactive panel building.

## Prerequisites

- The instrument's manual/documentation (PDF in `references/`)
- A photo or diagram of the physical panel layout
- Understanding of the instrument's signal flow and module structure

## Step 1: Content Structure

Create the instrument's content directories:

```
instruments/<name>/
├── overview.md          # Architecture, capabilities, identity
├── signal-flow.md       # Audio path diagram (normalled connections)
├── basic-patch.md       # Starting patch with full parameter dump
├── modules.md           # Module map (sections of the panel)
└── modules/             # Per-module detail files
    ├── vco-a.md
    ├── vcf.md
    └── ...

sessions/<name>/         # Learning sessions (15-30 min each)
├── 01-foundations-*.md
├── 02-foundations-*.md
└── ...

patches/<name>/          # Documented patches
├── basic-patch.md
└── ...
```

Map the instrument's features to the [Module Taxonomy](README.md#module-taxonomy) in `modules.md`. Each module file should list all controls, their types, and patch points.

## Step 2: Web App Content

Mirror the content into `src/content/` for the bundled web app:

```
src/content/
├── instruments/<name>/
│   ├── overview.md
│   ├── signal-flow.md
│   ├── basic-patch.md
│   └── modules/
├── sessions/<name>/
└── patches/<name>/
```

Also sync to the Obsidian vault (`~/song/`) if `evolver.config.json` has a `vaultPath` configured. The app reads from the vault locally and falls back to `src/content/` on Vercel.

**Important**: When modifying session files (e.g., adding panel markers), update all three locations:
1. `sessions/<name>/` — repo source of truth
2. `src/content/sessions/<name>/` — bundled for deploys
3. `~/song/sessions/<name>/` — Obsidian vault (local dev reads from here)

## Step 3: App Configuration

### Instrument config

The app discovers instruments by scanning the content directory. Each instrument needs:
- `instruments/<name>/overview.md` with frontmatter including `instrument: <name>`
- Sessions with frontmatter including `instrument: <name>`

### Routes

The app uses dynamic `[slug]` routes, so `/instruments/<name>/sessions`, `/instruments/<name>/patches`, etc. work automatically once content exists.

## Step 4: Panel Data File

Create `src/lib/<name>-panel-data.ts` with control metadata for every control on the physical panel.

```typescript
export interface <Name>ControlMeta {
  id: string;
  name: string;
  module: string;
  type: 'knob' | 'slider' | 'switch' | 'jack-in' | 'jack-out' | 'led';
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';  // required for jacks
}

export const CONTROL_METADATA: Record<string, <Name>ControlMeta> = {
  // Every control on the physical panel, grouped by module
};

export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  // Bounding box for each module section, matching physical layout
};

export function midiToRotation(value: number): number {
  return ((value / 127) * 270) - 135;
}

export function midiToSliderPosition(value: number): number {
  return value / 127;
}
```

### Control ID convention

`{type}-{module}-{name-kebab}`

Examples: `knob-vco-a-pitch`, `jack-mixer-out`, `switch-vcf-mode`, `slider-envelope-a-attack`

### Data accuracy checklist

Before creating metadata, verify against the physical panel:

- Every jack typed correctly as `jack-in` or `jack-out`
- External inputs are `jack-in`, not switches
- Rotary selectors (click positions) are `knob` type, not `switch`
- Toggle switches classified as 2-way or 3-way
- No phantom controls that don't exist on the panel
- Output jack names don't include "OUT"
- Control count per module matches the physical panel

## Step 5: Panel Component

Create `src/components/<name>-panel.tsx`. Use the **data-driven approach** (recommended for modular/semi-modular instruments) or the **inline JSX approach** (for instruments with unique one-off UI elements like LCD screens or keyboards).

See `.claude/skills/synth-panel-builder/SKILL.md` for the complete reference on both approaches, control type rendering, layout rules, and spacing guidelines.

### Data-driven approach (recommended)

```typescript
'use client';

// Hand-placed positions for every control — NOT computed algorithmically
const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  'knob-vco-a-pitch': { x: 200, y: 150 },
  // ... every control
};

// Selector knobs with labeled click positions
const SELECTOR_KNOBS: Record<string, string[]> = {
  'knob-vcf-mode': ['LP1', 'LP2', 'LP4', 'BP2', 'BP4', 'HP4', 'NT2', 'PHZ'],
};

// 2-way switches (all others default to 3-way rendering)
const TWO_WAY_SWITCHES = new Set([
  'switch-vco-a-tzfm',
  // ...
]);
```

The component renders by looping over `CONTROL_METADATA`, looking up each control's position, and rendering the appropriate component based on type.

### Key principle: reference-first

**Every control position must come from studying the physical panel image.** Do not compute positions from a grid or algorithm. Real panels have intentional non-uniform layouts. Work module by module, comparing your rendering to the reference image.

## Step 6: Panel Integration

Wire the panel into four integration points:

### Session detail (`src/components/session-detail.tsx`)

Add a regex and parser for the new instrument's panel markers:

```typescript
const <NAME>_PANEL_RE = /<div data-<name>-panel([^>]*)>\s*<\/div>/g;

function parse<Name>PanelProps(attrString: string) {
  // Parse data-knobs, data-highlights, data-sections, data-zoom, data-cables
}
```

Add detection and conditional rendering in the component body.

### Standalone route (`src/app/instruments/[slug]/panel/page.tsx`)

Add the instrument to `PANEL_CONFIG`:

```typescript
const PANEL_CONFIG = {
  // ...existing...
  '<name>': {
    title: '<Name> Panel',
    description: 'Interactive panel reference.',
    maxWidth: 'max-w-[1200px]',
  },
};
```

Update `standalone-panel-client.tsx` to render the new panel for the slug.

### Quick reference (`src/components/quick-ref-panel.tsx`)

Add conditional rendering for the Panel tab:

```typescript
{instrumentSlug === '<name>' && <NamePanel className="w-full" />}
```

### Patch detail (`src/components/patch-detail.tsx`)

Add conditional rendering with cable routing mapping for patches.

## Step 7: Session Panel Markers

Add `data-<name>-panel` marker divs to session markdown files at points where the learner interacts with specific controls:

```html
<div data-<name>-panel
  data-sections="vco-a,mixer"
  data-knobs="knob-vco-a-pitch:64"
  data-highlights="knob-vco-a-pitch:blue,jack-mixer-out:amber"
  data-cables="jack-vco-a-saw>jack-mixer-in-1:audio"
></div>
```

Place markers AFTER the text describes what to do — the panel appears as a visual reference for the instructions above it. 1-3 markers per session.

See `framework/curriculum-authoring-guide.md` for the full marker format documentation.

**Remember to sync across all three content locations** (Step 2).

## Step 8: Tests

### Data tests (`src/lib/__tests__/<name>-panel-data.test.ts`)

```typescript
describe('<name>-panel-data', () => {
  test('CONTROL_METADATA has N entries', () => { ... });
  test('every entry has required fields', () => { ... });
  test('every jack has signalType', () => { ... });
  test('every module is a known module', () => { ... });
  test('SECTION_BOUNDS has N entries', () => { ... });
  test('midiToRotation boundary values', () => { ... });
  test('module control counts match inventory', () => { ... });
});
```

### Component tests (`src/components/__tests__/<name>-panel.test.tsx`)

```typescript
describe('<Name>Panel', () => {
  test('renders without crashing', () => { ... });
  test('renders SVG with correct viewBox', () => { ... });
  test('renders cable paths (if modular)', () => { ... });
  test('applies glow filter for highlights', () => { ... });
  test('zooms viewBox when zoomSections provided', () => { ... });
});
```

## Step 9: Iterate

Panel building is visual and iterative. After the initial implementation:

1. View the standalone panel page at `/instruments/<name>/panel`
2. Compare module by module against the reference image
3. Fix positions, spacing, control types
4. Check a session page to verify markers render correctly
5. Tighten whitespace, align controls across sections

This is normal and expected. The Cascadia panel required ~20 rounds of visual comparison and adjustment to get right.

## Existing Implementations

| Instrument | Pattern | Controls | Panel file | Data file |
|-----------|---------|----------|------------|-----------|
| Evolver | Inline JSX | ~110 knobs/switches/LEDs | `evolver-panel.tsx` (782 lines) | `evolver-panel-data.ts` |
| Cascadia | Data-driven | 179 knobs/sliders/switches/jacks | `cascadia-panel.tsx` (~1200 lines) | `cascadia-panel-data.ts` |

The Evolver uses inline JSX because it has unique elements (LCD, sequencer LEDs, keyboard). The Cascadia uses the data-driven approach because it's modular with many repeated control types. **Default to data-driven for new instruments.**
