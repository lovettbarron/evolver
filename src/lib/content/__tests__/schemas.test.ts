import { describe, it, expect } from 'vitest';
import { SessionSchema, PatchSchema, InstrumentFileSchema, ConfigSchema } from '../schemas.js';
import { ZodError } from 'zod';

describe('SessionSchema', () => {
  it('parses valid session data', () => {
    const data = {
      title: 'Session 01: Navigation',
      module: 'Foundations',
      session_number: 1,
      duration: 20,
      prerequisite: null,
      output_type: 'patch',
      difficulty: 'beginner',
      tags: ['navigation'],
      instrument: 'evolver',
    };
    const result = SessionSchema.parse(data);
    expect(result.title).toBe('Session 01: Navigation');
    expect(result.session_number).toBe(1);
    expect(result.duration).toBe(20);
  });

  it('rejects duration over 30', () => {
    const data = {
      title: 'Bad',
      module: 'Foundations',
      session_number: 1,
      duration: 60,
      prerequisite: null,
      output_type: 'patch',
      difficulty: 'beginner',
      tags: ['test'],
      instrument: 'evolver',
    };
    expect(() => SessionSchema.parse(data)).toThrow(ZodError);
  });

  it('rejects missing required fields', () => {
    const data = { title: 'Bad' };
    expect(() => SessionSchema.parse(data)).toThrow(ZodError);
  });

  it('allows extra fields via passthrough', () => {
    const data = {
      title: 'Session 01: Navigation',
      module: 'Foundations',
      session_number: 1,
      duration: 20,
      prerequisite: null,
      output_type: 'patch',
      difficulty: 'beginner',
      tags: ['navigation'],
      instrument: 'evolver',
      obsidian_custom: 'foo',
    };
    const result = SessionSchema.parse(data);
    expect(result.obsidian_custom).toBe('foo');
  });
});

describe('PatchSchema', () => {
  it('parses valid patch data', () => {
    const data = {
      name: 'Fat Bass',
      type: 'bass',
      session_origin: 6,
      description: 'Deep sub',
      tags: ['bass'],
      instrument: 'evolver',
      created: '2026-01-15',
    };
    const result = PatchSchema.parse(data);
    expect(result.name).toBe('Fat Bass');
    expect(result.type).toBe('bass');
  });

  it('rejects invalid type enum', () => {
    const data = {
      name: 'Bad',
      type: 'invalid_type',
      session_origin: null,
      description: 'test',
      tags: [],
      instrument: 'evolver',
      created: '2026-01-15',
    };
    expect(() => PatchSchema.parse(data)).toThrow(ZodError);
  });

  it('allows extra fields via passthrough', () => {
    const data = {
      name: 'Fat Bass',
      type: 'bass',
      session_origin: 6,
      description: 'Deep sub',
      tags: ['bass'],
      instrument: 'evolver',
      created: '2026-01-15',
      custom_field: 'bar',
    };
    const result = PatchSchema.parse(data);
    expect(result.custom_field).toBe('bar');
  });
});

describe('InstrumentFileSchema', () => {
  it('parses valid instrument file data', () => {
    const data = {
      type: 'signal-flow',
      instrument: 'evolver',
      title: 'Evolver Signal Flow',
      manufacturer: 'Dave Smith Instruments',
    };
    const result = InstrumentFileSchema.parse(data);
    expect(result.type).toBe('signal-flow');
    expect(result.manufacturer).toBe('Dave Smith Instruments');
  });

  it('rejects invalid type enum', () => {
    const data = {
      type: 'invalid',
      instrument: 'evolver',
      title: 'Test',
      manufacturer: 'Test',
    };
    expect(() => InstrumentFileSchema.parse(data)).toThrow(ZodError);
  });

  it('allows extra fields via passthrough', () => {
    const data = {
      type: 'overview',
      instrument: 'evolver',
      title: 'Overview',
      manufacturer: 'DSI',
      extra: 'allowed',
    };
    const result = InstrumentFileSchema.parse(data);
    expect(result.extra).toBe('allowed');
  });
});

describe('ConfigSchema', () => {
  it('returns demo mode with no vaultPath', () => {
    const result = ConfigSchema.parse({});
    expect(result.vaultPath).toBeUndefined();
    expect(result.instrument).toBe('evolver');
  });

  it('returns local mode with vaultPath', () => {
    const result = ConfigSchema.parse({ vaultPath: '/path/to/vault' });
    expect(result.vaultPath).toBe('/path/to/vault');
    expect(result.instrument).toBe('evolver');
  });
});
