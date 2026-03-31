import { describe, it, expect } from 'vitest';
import path from 'path';
import { ZodError } from 'zod';
import { readContentFile, discoverInstruments, listSessions, listPatches, getContentRoot, loadInstrumentConfig } from '../reader.js';
import { InstrumentFileSchema, SessionSchema, PatchSchema } from '../schemas.js';
import type { AppConfig } from '../schemas.js';

const FIXTURES_DIR = path.join(import.meta.dirname, '__fixtures__');

describe('getContentRoot', () => {
  it('returns bundled path when no vaultPath configured', () => {
    const config: AppConfig = { instrument: 'evolver' };
    const result = getContentRoot(config);
    expect(result).toBe(path.join(process.cwd(), 'src/content'));
  });

  it('returns vault path when configured', () => {
    const config: AppConfig = { vaultPath: '/foo', instrument: 'evolver' };
    const result = getContentRoot(config);
    expect(result).toBe('/foo');
  });
});

describe('readContentFile', () => {
  it('reads and validates a file from vault path', async () => {
    const config: AppConfig = { vaultPath: FIXTURES_DIR, instrument: 'evolver' };
    const result = await readContentFile('instruments/evolver/overview.md', InstrumentFileSchema, config);
    expect(result.data.type).toBe('overview');
    expect(result.data.instrument).toBe('evolver');
    expect(result.data.title).toBe('Dave Smith Mono Evolver');
    expect(result.content).toContain('monophonic analog/digital hybrid');
  });

  it('throws ZodError for invalid frontmatter', async () => {
    const config: AppConfig = { vaultPath: FIXTURES_DIR, instrument: 'evolver' };
    await expect(
      readContentFile('instruments/evolver/invalid.md', InstrumentFileSchema, config)
    ).rejects.toThrow(ZodError);
  });

  it('returns { data, content } shape', async () => {
    const config: AppConfig = { vaultPath: FIXTURES_DIR, instrument: 'evolver' };
    const result = await readContentFile('sessions/evolver/01-foundations-navigation.md', SessionSchema, config);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('content');
    expect(typeof result.content).toBe('string');
  });
});

describe('discoverInstruments', () => {
  it('returns instrument directory names', async () => {
    const config: AppConfig = { vaultPath: FIXTURES_DIR, instrument: 'evolver' };
    const instruments = await discoverInstruments(config);
    expect(instruments).toContain('evolver');
  });

  it('returns both cascadia and evolver', async () => {
    const config: AppConfig = { vaultPath: FIXTURES_DIR, instrument: 'evolver' };
    const instruments = await discoverInstruments(config);
    expect(instruments).toContain('cascadia');
    expect(instruments).toContain('evolver');
  });

  it('does not include dotfiles or non-directories', async () => {
    const config: AppConfig = { vaultPath: FIXTURES_DIR, instrument: 'evolver' };
    const instruments = await discoverInstruments(config);
    for (const name of instruments) {
      expect(name).not.toMatch(/^\./);
    }
  });
});

describe('loadInstrumentConfig', () => {
  it('loads and validates Evolver instrument config', async () => {
    const config: AppConfig = { vaultPath: FIXTURES_DIR, instrument: 'evolver' };
    const result = await loadInstrumentConfig('evolver', config);
    expect(result.display_name).toBe('Mono Evolver');
    expect(result.sysex).toBe(true);
    expect(result.patch_memory).toBe(true);
  });

  it('loads and validates Cascadia instrument config', async () => {
    const config: AppConfig = { vaultPath: FIXTURES_DIR, instrument: 'evolver' };
    const result = await loadInstrumentConfig('cascadia', config);
    expect(result.display_name).toBe('Cascadia');
    expect(result.sysex).toBe(false);
    expect(result.patch_memory).toBe(false);
  });

  it('throws for nonexistent instrument', async () => {
    const config: AppConfig = { vaultPath: FIXTURES_DIR, instrument: 'evolver' };
    await expect(loadInstrumentConfig('nonexistent', config)).rejects.toThrow();
  });
});

describe('listSessions', () => {
  it('returns sessions sorted by session_number', async () => {
    const config: AppConfig = { vaultPath: FIXTURES_DIR, instrument: 'evolver' };
    const sessions = await listSessions('evolver', config);
    expect(sessions.length).toBe(2);
    expect(sessions[0].data.session_number).toBe(1);
    expect(sessions[1].data.session_number).toBe(2);
  });

  it('returns slug for each session', async () => {
    const config: AppConfig = { vaultPath: FIXTURES_DIR, instrument: 'evolver' };
    const sessions = await listSessions('evolver', config);
    expect(sessions[0].slug).toBe('01-foundations-navigation');
  });
});

describe('listPatches', () => {
  it('returns patch objects', async () => {
    const config: AppConfig = { vaultPath: FIXTURES_DIR, instrument: 'evolver' };
    const patches = await listPatches('evolver', config);
    expect(patches.length).toBe(1);
    expect(patches[0].data.name).toBe('Fat Bass');
    expect(patches[0].slug).toBe('fat-bass');
  });
});
