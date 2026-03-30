import { describe, it, expect } from 'vitest';
import { PROGRAM_PARAMETERS, SEQUENCER_PARAMETERS, getParameterByKey } from '../parameters';
import { PARAMETER_SECTIONS } from '../types';

describe('PROGRAM_PARAMETERS', () => {
  it('has exactly 128 entries', () => {
    expect(PROGRAM_PARAMETERS).toHaveLength(128);
  });

  it('has no duplicate indices', () => {
    const indices = PROGRAM_PARAMETERS.map(p => p.index);
    expect(new Set(indices).size).toBe(128);
  });

  it('covers indices 0-127 contiguously', () => {
    const indices = PROGRAM_PARAMETERS.map(p => p.index).sort((a, b) => a - b);
    expect(indices[0]).toBe(0);
    expect(indices[127]).toBe(127);
  });

  it('all section values are valid PARAMETER_SECTIONS members', () => {
    for (const param of PROGRAM_PARAMETERS) {
      expect(PARAMETER_SECTIONS).toContain(param.section);
    }
  });

  it('every entry has required fields with correct types', () => {
    for (const param of PROGRAM_PARAMETERS) {
      expect(typeof param.index).toBe('number');
      expect(typeof param.key).toBe('string');
      expect(typeof param.name).toBe('string');
      expect(typeof param.section).toBe('string');
      expect(typeof param.min).toBe('number');
      expect(typeof param.max).toBe('number');
      expect(param.max).toBeGreaterThanOrEqual(param.min);
    }
  });

  it('keys are unique', () => {
    const keys = PROGRAM_PARAMETERS.map(p => p.key);
    expect(new Set(keys).size).toBe(128);
  });

  it('keys are snake_case', () => {
    for (const param of PROGRAM_PARAMETERS) {
      expect(param.key).toMatch(/^[a-z][a-z0-9_]*$/);
    }
  });
});

describe('SEQUENCER_PARAMETERS', () => {
  it('has exactly 64 entries', () => {
    expect(SEQUENCER_PARAMETERS).toHaveLength(64);
  });

  it('has no duplicate indices', () => {
    const indices = SEQUENCER_PARAMETERS.map(p => p.index);
    expect(new Set(indices).size).toBe(64);
  });

  it('covers indices 0-63 contiguously', () => {
    const indices = SEQUENCER_PARAMETERS.map(p => p.index).sort((a, b) => a - b);
    expect(indices[0]).toBe(0);
    expect(indices[63]).toBe(63);
  });

  it('all entries are in the sequencer section', () => {
    for (const param of SEQUENCER_PARAMETERS) {
      expect(param.section).toBe('sequencer');
    }
  });
});

describe('getParameterByKey', () => {
  it('returns the correct parameter for a known key', () => {
    const param = getParameterByKey('osc1_freq');
    expect(param).toBeDefined();
    expect(param!.index).toBe(0);
    expect(param!.name).toBe('Oscillator 1 Frequency');
  });

  it('returns undefined for an unknown key', () => {
    expect(getParameterByKey('nonexistent')).toBeUndefined();
  });
});
