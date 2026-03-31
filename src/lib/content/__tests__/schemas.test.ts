import { describe, it, expect } from 'vitest';
import { SessionSchema, PatchSchema, InstrumentFileSchema, ConfigSchema, InstrumentConfigSchema } from '../schemas.js';
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

  it('accepts patch data with cable_routing and knob_settings undefined', () => {
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
    expect(result.cable_routing).toBeUndefined();
    expect(result.knob_settings).toBeUndefined();
  });

  it('accepts patch data with cable_routing set to an arbitrary object', () => {
    const data = {
      name: 'Modular Patch',
      type: 'texture',
      session_origin: null,
      description: 'CV routing test',
      tags: ['modular'],
      instrument: 'cascadia',
      created: '2026-03-15',
      cable_routing: { output_a: 'input_b', mult: ['vca', 'filter'] },
    };
    const result = PatchSchema.parse(data);
    expect(result.cable_routing).toEqual({ output_a: 'input_b', mult: ['vca', 'filter'] });
  });

  it('accepts patch data with knob_settings set to an arbitrary array', () => {
    const data = {
      name: 'Modular Patch',
      type: 'texture',
      session_origin: null,
      description: 'Knob test',
      tags: ['modular'],
      instrument: 'cascadia',
      created: '2026-03-15',
      knob_settings: [{ knob: 'cutoff', value: 0.7 }, { knob: 'resonance', value: 0.3 }],
    };
    const result = PatchSchema.parse(data);
    expect(result.knob_settings).toHaveLength(2);
  });

  it('still accepts existing Evolver patch data without cable_routing or knob_settings', () => {
    const data = {
      name: 'Fat Bass',
      type: 'bass',
      session_origin: 6,
      description: 'Deep sub',
      tags: ['bass'],
      instrument: 'evolver',
      created: '2026-01-15',
      source: 'manual',
    };
    const result = PatchSchema.parse(data);
    expect(result.name).toBe('Fat Bass');
    expect(result.source).toBe('manual');
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

describe('InstrumentConfigSchema', () => {
  it('accepts valid Evolver config', () => {
    const data = {
      display_name: 'Mono Evolver',
      tagline: 'Analog/digital hybrid synthesizer mastery',
      manufacturer: 'Dave Smith Instruments',
      sysex: true,
      patch_memory: true,
      reference_pdfs: [
        { label: 'DSI Evolver Manual (v1.3)', file: 'Evo_Key_Manual_1.3.pdf' },
      ],
    };
    const result = InstrumentConfigSchema.parse(data);
    expect(result.display_name).toBe('Mono Evolver');
    expect(result.sysex).toBe(true);
    expect(result.patch_memory).toBe(true);
    expect(result.reference_pdfs).toHaveLength(1);
  });

  it('accepts valid Cascadia config', () => {
    const data = {
      display_name: 'Cascadia',
      tagline: 'West coast modular synthesis exploration',
      manufacturer: 'Intellijel',
      sysex: false,
      patch_memory: false,
      reference_pdfs: [
        { label: 'Cascadia Manual (v1.1)', file: 'cascadia_manual_v1.1.pdf' },
      ],
    };
    const result = InstrumentConfigSchema.parse(data);
    expect(result.display_name).toBe('Cascadia');
    expect(result.sysex).toBe(false);
    expect(result.patch_memory).toBe(false);
  });

  it('rejects object missing display_name', () => {
    const data = {
      tagline: 'test',
      manufacturer: 'test',
      sysex: true,
      patch_memory: true,
      reference_pdfs: [],
    };
    expect(() => InstrumentConfigSchema.parse(data)).toThrow(ZodError);
  });

  it('rejects sysex as string instead of boolean', () => {
    const data = {
      display_name: 'Test',
      tagline: 'test',
      manufacturer: 'test',
      sysex: 'true',
      patch_memory: true,
      reference_pdfs: [],
    };
    expect(() => InstrumentConfigSchema.parse(data)).toThrow(ZodError);
  });

  it('passes through unknown fields', () => {
    const data = {
      display_name: 'Test',
      tagline: 'test',
      manufacturer: 'test',
      sysex: true,
      patch_memory: true,
      reference_pdfs: [],
      future_field: 'hello',
    };
    const result = InstrumentConfigSchema.parse(data);
    expect(result.future_field).toBe('hello');
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
