import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import { PatchSchema } from '../schemas.js';
import { listPatches } from '../reader.js';
import type { AppConfig } from '../schemas.js';

const FIXTURES_DIR = path.join(import.meta.dirname, '__fixtures__');

// Create a sysex sidecar fixture for testing
const SYSEX_SIDECAR = {
  format_version: 1,
  raw_byte_count: 192,
  parameters: { osc1_freq: 64, osc1_level: 100, lpf_freq: 80 },
  sequencer: {
    seq1_steps: [36, 36, 48, 48],
    seq2_steps: [0, 0, 0, 0],
    seq3_steps: [0, 0, 0, 0],
    seq4_steps: [0, 0, 0, 0],
  },
};

const SYSEX_PATCH_FRONTMATTER = `---
name: "Sysex Test Patch"
type: lead
session_origin: null
description: "A patch captured via SysEx"
tags: [lead, sysex]
instrument: evolver
created: "2026-03-30"
source: sysex
capture_date: "2026-03-30T12:00:00Z"
program_number: 42
---

# Sysex Test Patch

Captured via SysEx dump.
`;

beforeAll(async () => {
  // Create sysex test patch markdown
  const patchDir = path.join(FIXTURES_DIR, 'patches', 'evolver');
  await fs.writeFile(path.join(patchDir, 'sysex-test-patch.md'), SYSEX_PATCH_FRONTMATTER, 'utf-8');
  // Create matching sidecar JSON
  await fs.writeFile(
    path.join(patchDir, 'sysex-test-patch.sysex.json'),
    JSON.stringify(SYSEX_SIDECAR, null, 2),
    'utf-8',
  );
});

afterAll(async () => {
  const patchDir = path.join(FIXTURES_DIR, 'patches', 'evolver');
  await fs.unlink(path.join(patchDir, 'sysex-test-patch.md')).catch(() => {});
  await fs.unlink(path.join(patchDir, 'sysex-test-patch.sysex.json')).catch(() => {});
});

describe('PatchSchema SysEx fields', () => {
  it('parses existing patches without SysEx fields (backward compat)', () => {
    const existingPatch = {
      name: 'Fat Bass',
      type: 'bass',
      session_origin: 6,
      description: 'Deep sub bass patch',
      tags: ['bass', 'sub'],
      instrument: 'evolver',
      created: '2026-01-15',
    };
    const result = PatchSchema.parse(existingPatch);
    expect(result.name).toBe('Fat Bass');
    expect(result).not.toHaveProperty('source');
    expect(result).not.toHaveProperty('capture_date');
    expect(result).not.toHaveProperty('program_number');
  });

  it('parses SysEx patches with source, capture_date, and program_number', () => {
    const sysexPatch = {
      name: 'Captured Lead',
      type: 'lead',
      session_origin: null,
      description: 'Captured via SysEx',
      tags: ['lead'],
      instrument: 'evolver',
      created: '2026-03-30',
      source: 'sysex',
      capture_date: '2026-03-30T12:00:00Z',
      program_number: 42,
    };
    const result = PatchSchema.parse(sysexPatch);
    expect(result.source).toBe('sysex');
    expect(result.capture_date).toBe('2026-03-30T12:00:00Z');
    expect(result.program_number).toBe(42);
  });

  it('parses manual patches with source: manual', () => {
    const manualPatch = {
      name: 'Hand-Made Pad',
      type: 'pad',
      session_origin: 10,
      description: 'Manually created pad',
      tags: ['pad'],
      instrument: 'evolver',
      created: '2026-03-30',
      source: 'manual',
    };
    const result = PatchSchema.parse(manualPatch);
    expect(result.source).toBe('manual');
  });
});

describe('listPatches sysexData discovery', () => {
  it('returns sysexData: null for patches without a .sysex.json sidecar', async () => {
    const config: AppConfig = { vaultPath: FIXTURES_DIR, instrument: 'evolver' };
    const patches = await listPatches('evolver', config);
    const fatBass = patches.find((p) => p.slug === 'fat-bass');
    expect(fatBass).toBeDefined();
    expect(fatBass!.sysexData).toBeNull();
  });

  it('returns sysexData with parsed JSON for patches with a .sysex.json sidecar', async () => {
    const config: AppConfig = { vaultPath: FIXTURES_DIR, instrument: 'evolver' };
    const patches = await listPatches('evolver', config);
    const sysexPatch = patches.find((p) => p.slug === 'sysex-test-patch');
    expect(sysexPatch).toBeDefined();
    expect(sysexPatch!.sysexData).not.toBeNull();
    expect(sysexPatch!.sysexData).toHaveProperty('format_version', 1);
    expect(sysexPatch!.sysexData).toHaveProperty('parameters');
  });
});
