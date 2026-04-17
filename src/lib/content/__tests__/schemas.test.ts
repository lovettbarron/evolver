import { describe, it, expect } from 'vitest';
import { SessionSchema, PatchSchema, InstrumentFileSchema, ConfigSchema, InstrumentConfigSchema, ModuleConfigSchema, ModuleCategoryEnum } from '../schemas.js';
import { ZodError } from 'zod';

describe('SessionSchema', () => {
  it('parses valid session data', () => {
    const data = {
      title: 'Session 01: Navigation',
      section: 'Foundations',
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
      section: 'Foundations',
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
      section: 'Foundations',
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

  it('accepts patch data with typed cable_routing array', () => {
    const data = {
      name: 'Modular Patch',
      type: 'texture',
      session_origin: null,
      description: 'CV routing test',
      tags: ['modular'],
      instrument: 'cascadia',
      created: '2026-03-15',
      cable_routing: [{ source: 'LFO Out', destination: 'VCF In', purpose: 'Modulation' }],
    };
    const result = PatchSchema.parse(data);
    expect(result.cable_routing).toHaveLength(1);
    expect(result.cable_routing![0].source).toBe('LFO Out');
  });

  it('accepts patch data with typed knob_settings record', () => {
    const data = {
      name: 'Modular Patch',
      type: 'texture',
      session_origin: null,
      description: 'Knob test',
      tags: ['modular'],
      instrument: 'cascadia',
      created: '2026-03-15',
      knob_settings: { 'VCF': [{ control: 'cutoff', value: '0.7' }, { control: 'resonance', value: '0.3' }] },
    };
    const result = PatchSchema.parse(data);
    expect(result.knob_settings!['VCF']).toHaveLength(2);
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

describe('PatchSchema - Phase 9 refinements', () => {
  const cascadiaBase = {
    name: 'Test Patch',
    type: 'bass' as const,
    session_origin: null,
    description: 'Test description',
    tags: ['test'],
    instrument: 'cascadia',
    created: '2026-03-31',
  };

  it('accepts fx as valid patch type', () => {
    const data = { ...cascadiaBase, type: 'fx' };
    const result = PatchSchema.parse(data);
    expect(result.type).toBe('fx');
  });

  it('accepts typed cable_routing array', () => {
    const data = {
      ...cascadiaBase,
      cable_routing: [
        { source: 'LFO X Out', destination: 'VCO A FM 1 In', purpose: 'Slow pitch vibrato' },
      ],
    };
    const result = PatchSchema.parse(data);
    expect(result.cable_routing[0].source).toBe('LFO X Out');
  });

  it('rejects cable_routing as arbitrary object', () => {
    const data = {
      ...cascadiaBase,
      cable_routing: { output_a: 'input_b' },
    };
    expect(() => PatchSchema.parse(data)).toThrow(ZodError);
  });

  it('rejects cable_routing entry missing purpose', () => {
    const data = {
      ...cascadiaBase,
      cable_routing: [{ source: 'A', destination: 'B' }],
    };
    expect(() => PatchSchema.parse(data)).toThrow(ZodError);
  });

  it('accepts typed knob_settings record', () => {
    const data = {
      ...cascadiaBase,
      knob_settings: {
        'VCO A': [{ control: 'Octave', value: '4' }],
      },
    };
    const result = PatchSchema.parse(data);
    expect(result.knob_settings['VCO A'][0].control).toBe('Octave');
  });

  it('rejects knob_settings as flat array', () => {
    const data = {
      ...cascadiaBase,
      knob_settings: [{ knob: 'cutoff', value: 0.7 }],
    };
    expect(() => PatchSchema.parse(data)).toThrow(ZodError);
  });

  it('accepts audio_preview as optional string', () => {
    const data = {
      ...cascadiaBase,
      audio_preview: 'sub-bass-01.mp3',
    };
    const result = PatchSchema.parse(data);
    expect(result.audio_preview).toBe('sub-bass-01.mp3');
  });

  it('backward compatible: Evolver patch without new fields', () => {
    const data = {
      name: 'Fat Bass',
      type: 'bass' as const,
      session_origin: 6,
      description: 'Deep sub',
      tags: ['bass'],
      instrument: 'evolver',
      created: '2026-01-15',
      source: 'manual' as const,
    };
    const result = PatchSchema.parse(data);
    expect(result.name).toBe('Fat Bass');
    expect(result.cable_routing).toBeUndefined();
    expect(result.knob_settings).toBeUndefined();
    expect(result.audio_preview).toBeUndefined();
  });

  it('accepts complete Cascadia patch frontmatter', () => {
    const data = {
      ...cascadiaBase,
      cable_routing: [
        { source: 'LFO X Out', destination: 'VCO A FM 1 In', purpose: 'Slow pitch vibrato' },
        { source: 'VCO A Saw Out', destination: 'VCF In', purpose: 'Audio signal path' },
      ],
      knob_settings: {
        'VCO A': [
          { control: 'Octave', value: '4' },
          { control: 'Fine Tune', value: '0' },
        ],
        'VCF': [
          { control: 'Cutoff', value: '7' },
          { control: 'Resonance', value: '3' },
        ],
      },
      audio_preview: 'cascadia-bass-01.mp3',
    };
    const result = PatchSchema.parse(data);
    expect(result.cable_routing).toHaveLength(2);
    expect(result.knob_settings['VCF'][0].control).toBe('Cutoff');
    expect(result.audio_preview).toBe('cascadia-bass-01.mp3');
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

  it('accepts type module with module-specific fields', () => {
    const data = {
      type: 'module',
      instrument: 'cascadia',
      title: 'VCO A',
      manufacturer: 'Intellijel',
      category: 'sound-source',
      control_count: 11,
      jack_count: 8,
      has_normals: true,
    };
    const result = InstrumentFileSchema.parse(data);
    expect(result.type).toBe('module');
    expect(result.category).toBe('sound-source');
    expect(result.control_count).toBe(11);
    expect(result.jack_count).toBe(8);
    expect(result.has_normals).toBe(true);
  });

  it('accepts type module without optional module fields', () => {
    const data = {
      type: 'module',
      instrument: 'cascadia',
      title: 'Simple Module',
      manufacturer: 'Intellijel',
    };
    const result = InstrumentFileSchema.parse(data);
    expect(result.type).toBe('module');
    expect(result.category).toBeUndefined();
    expect(result.control_count).toBeUndefined();
  });

  it('rejects invalid category enum for module', () => {
    const data = {
      type: 'module',
      instrument: 'cascadia',
      title: 'Bad',
      manufacturer: 'Intellijel',
      category: 'invalid-category',
    };
    expect(() => InstrumentFileSchema.parse(data)).toThrow(ZodError);
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

  // Phase 25 Wave 1 — InstrumentConfigSchema extended with optional
  // sampler/sequencer/midi_sequencer flags (D-08).
  it('accepts valid Octatrack config with sampler/sequencer/midi_sequencer flags', () => {
    const data = JSON.parse(
      require('fs').readFileSync(
        require('path').join(__dirname, '__fixtures__/instruments/octatrack/instrument.json'),
        'utf-8'
      )
    );
    const result = InstrumentConfigSchema.parse(data);
    expect(result.display_name).toBe('Octatrack MKII');
    expect(result.manufacturer).toBe('Elektron');
    expect(result.sampler).toBe(true);
    expect(result.sequencer).toBe(true);
    expect(result.midi_sequencer).toBe(true);
  });

  it('accepts Octatrack config where sysex=false and patch_memory=false', () => {
    const data = JSON.parse(
      require('fs').readFileSync(
        require('path').join(__dirname, '__fixtures__/instruments/octatrack/instrument.json'),
        'utf-8'
      )
    );
    const result = InstrumentConfigSchema.parse(data);
    expect(result.sysex).toBe(false);
    expect(result.patch_memory).toBe(false);
  });

  it('treats missing sampler flag as undefined (backward compat for evolver/cascadia)', () => {
    const cascadiaLike = {
      display_name: 'Cascadia',
      tagline: 'West coast modular synthesis exploration',
      manufacturer: 'Intellijel',
      sysex: false,
      patch_memory: false,
      reference_pdfs: [],
    };
    const result = InstrumentConfigSchema.parse(cascadiaLike);
    expect(result.sampler).toBeUndefined();
    expect(result.sequencer).toBeUndefined();
    expect(result.midi_sequencer).toBeUndefined();
  });

  it('rejects non-boolean sampler flag (D-08 — flags must be boolean)', () => {
    const data = {
      display_name: 'Test',
      tagline: 'test',
      manufacturer: 'test',
      sysex: false,
      patch_memory: false,
      sampler: 'true',
      reference_pdfs: [],
    };
    expect(() => InstrumentConfigSchema.parse(data)).toThrow(ZodError);
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

describe('ModuleConfigSchema', () => {
  const validMathsConfig = {
    display_name: 'Maths',
    tagline: 'Analog computer for control voltage',
    manufacturer: 'Make Noise',
    hp_width: 20,
    categories: ['function-generator', 'envelope-generator', 'modulator'],
    power_specs: { plus_12v_ma: 60, minus_12v_ma: 50 },
    reference_pdfs: [{ label: 'Maths Manual (2020 Rev)', file: 'maths-manual.pdf' }],
  };

  it('parses valid Maths config', () => {
    const result = ModuleConfigSchema.parse(validMathsConfig);
    expect(result.display_name).toBe('Maths');
    expect(result.hp_width).toBe(20);
    expect(result.categories).toHaveLength(3);
  });

  it('rejects empty object (missing required fields)', () => {
    expect(() => ModuleConfigSchema.parse({})).toThrow(ZodError);
  });

  it('rejects hp_width: -1 (must be positive int)', () => {
    expect(() => ModuleConfigSchema.parse({ ...validMathsConfig, hp_width: -1 })).toThrow(ZodError);
  });

  it('rejects empty categories array (min 1)', () => {
    expect(() => ModuleConfigSchema.parse({ ...validMathsConfig, categories: [] })).toThrow(ZodError);
  });

  it('accepts multi-category module', () => {
    const result = ModuleConfigSchema.parse(validMathsConfig);
    expect(result.categories).toContain('function-generator');
    expect(result.categories).toContain('envelope-generator');
    expect(result.categories).toContain('modulator');
  });

  it('passes through unknown fields', () => {
    const result = ModuleConfigSchema.parse({ ...validMathsConfig, future_field: 'test' });
    expect(result.future_field).toBe('test');
  });
});

describe('ModuleCategoryEnum', () => {
  const validCategories = ['vco', 'filter', 'effects', 'modulator', 'function-generator', 'envelope-generator'];

  it('accepts all 6 valid categories', () => {
    for (const cat of validCategories) {
      expect(ModuleCategoryEnum.parse(cat)).toBe(cat);
    }
  });

  it('rejects invalid category string', () => {
    expect(() => ModuleCategoryEnum.parse('invalid-category')).toThrow(ZodError);
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
