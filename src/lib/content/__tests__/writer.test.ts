import { describe, it, expect, afterEach } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import matter from 'gray-matter';
import { saveCapturedPatch, toSlug, type CapturedPatchInput } from '../writer.js';
import type { AppConfig } from '../schemas.js';

const TEST_INPUT: CapturedPatchInput = {
  name: 'Warm Bass Lead',
  type: 'bass',
  tags: ['bass', 'warm', 'sysex'],
  instrument: 'evolver',
  description: 'A warm bass lead captured via SysEx',
  parameters: { osc1_freq: 64, osc1_level: 100, lpf_freq: 80 },
  sequencer: {
    seq1_steps: [36, 36, 48, 48],
    seq2_steps: [0, 0, 0, 0],
    seq3_steps: [0, 0, 0, 0],
    seq4_steps: [0, 0, 0, 0],
  },
  programNumber: 42,
};

let tmpDir: string;

afterEach(async () => {
  if (tmpDir) {
    await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  }
});

async function createTmpDir(): Promise<string> {
  tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'evolver-writer-test-'));
  return tmpDir;
}

describe('toSlug', () => {
  it('converts "Warm Bass Lead" to "warm-bass-lead"', () => {
    expect(toSlug('Warm Bass Lead')).toBe('warm-bass-lead');
  });

  it('strips leading/trailing hyphens', () => {
    expect(toSlug('  --Hello World-- ')).toBe('hello-world');
  });

  it('collapses multiple special chars to single hyphen', () => {
    expect(toSlug('My!!!Patch###Name')).toBe('my-patch-name');
  });
});

describe('saveCapturedPatch', () => {
  it('writes both .md and .sysex.json files', async () => {
    const dir = await createTmpDir();
    const config: AppConfig = { vaultPath: dir, instrument: 'evolver' };
    const result = await saveCapturedPatch(TEST_INPUT, config);

    expect(result.slug).toBe('warm-bass-lead');
    const mdExists = await fs.access(result.mdPath).then(() => true).catch(() => false);
    const jsonExists = await fs.access(result.jsonPath).then(() => true).catch(() => false);
    expect(mdExists).toBe(true);
    expect(jsonExists).toBe(true);
  });

  it('writes .md with valid frontmatter containing source: sysex and capture_date', async () => {
    const dir = await createTmpDir();
    const config: AppConfig = { vaultPath: dir, instrument: 'evolver' };
    const result = await saveCapturedPatch(TEST_INPUT, config);

    const raw = await fs.readFile(result.mdPath, 'utf-8');
    const { data } = matter(raw);
    expect(data.source).toBe('sysex');
    expect(data.capture_date).toBeDefined();
    expect(data.name).toBe('Warm Bass Lead');
    expect(data.type).toBe('bass');
    expect(data.program_number).toBe(42);
  });

  it('writes .sysex.json with format_version: 1 and parameters', async () => {
    const dir = await createTmpDir();
    const config: AppConfig = { vaultPath: dir, instrument: 'evolver' };
    const result = await saveCapturedPatch(TEST_INPUT, config);

    const raw = await fs.readFile(result.jsonPath, 'utf-8');
    const json = JSON.parse(raw);
    expect(json.format_version).toBe(1);
    expect(json.parameters).toHaveProperty('osc1_freq', 64);
    expect(json.sequencer).toHaveProperty('seq1_steps');
  });

  it('throws when target file already exists', async () => {
    const dir = await createTmpDir();
    const config: AppConfig = { vaultPath: dir, instrument: 'evolver' };

    // Write once successfully
    await saveCapturedPatch(TEST_INPUT, config);

    // Second write should throw
    await expect(saveCapturedPatch(TEST_INPUT, config)).rejects.toThrow(
      /already exists/,
    );
  });

  it('omits program_number from frontmatter when not provided', async () => {
    const dir = await createTmpDir();
    const config: AppConfig = { vaultPath: dir, instrument: 'evolver' };
    const inputNoProg = { ...TEST_INPUT, name: 'No Prog Patch', programNumber: undefined };
    const result = await saveCapturedPatch(inputNoProg, config);

    const raw = await fs.readFile(result.mdPath, 'utf-8');
    const { data } = matter(raw);
    expect(data).not.toHaveProperty('program_number');
  });
});
