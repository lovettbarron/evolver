import { describe, it, expect } from 'vitest';
import { diffPatches, type DiffResult } from '../diff';
import type { ParsedPatch } from '../types';
import { PARAMETER_SECTIONS } from '../types';

/** Helper: create a ParsedPatch with all parameters zeroed out */
function makeEmptyPatch(): ParsedPatch {
  return {
    parameters: {
      osc1_freq: 0, osc1_fine: 0, osc1_shape: 0, osc1_level: 0,
      osc2_freq: 0, osc2_fine: 0, osc2_shape: 0, osc2_level: 0,
      osc3_freq: 0, osc3_fine: 0, osc3_shape: 0, osc3_level: 0,
      osc4_freq: 0, osc4_fine: 0, osc4_shape: 0, osc4_level: 0,
      filter_freq: 0, filter_env_amount: 0, filter_env_attack: 0,
      filter_env_decay: 0, filter_env_sustain: 0, filter_env_release: 0,
      filter_resonance: 0, filter_key_amount: 0,
      vca_level: 0, vca_env_amount: 0, vca_env_attack: 0, vca_env_decay: 0,
      vca_env_sustain: 0, vca_env_release: 0, output_pan: 0, program_volume: 0,
      feedback_freq: 0, feedback_amount: 0, feedback_grunge: 0,
      delay1_time: 0, delay1_level: 0, delay_feedback_to_delay: 0,
      delay_feedback_to_filter: 0, output_hack: 0,
      lfo1_freq: 0, lfo1_shape: 0, lfo1_amount: 0, lfo1_destination: 0,
      lfo2_freq: 0, lfo2_shape: 0, lfo2_amount: 0, lfo2_destination: 0,
      env3_amount: 0, env3_destination: 0, env3_attack: 0, env3_decay: 0,
      env3_sustain: 0, env3_release: 0,
      trigger_select: 0, key_off_transpose: 0,
      seq1_destination: 0, seq2_destination: 0, seq3_destination: 0, seq4_destination: 0,
      noise_volume: 0, ext_input_volume: 0, ext_input_mode: 0, input_hack_amount: 0,
      osc1_glide: 0, osc_sync: 0, program_tempo: 0, program_clock_divide: 0,
      osc2_glide: 0, osc_slop: 0, pitch_bend_range: 0, key_mode: 0,
      osc3_glide: 0, osc3_fm: 0, osc3_shape_mod: 0, osc3_ring_mod: 0,
      osc4_glide: 0, osc4_fm: 0, osc4_shape_mod: 0, osc4_ring_mod: 0,
      filter_poles: 0, filter_env_velocity: 0, filter_audio_mod: 0,
      filter_split: 0, highpass_filter: 0,
      mod1_source: 0, mod1_amount: 0, mod1_destination: 0,
      env_shape: 0, vca_env_velocity: 0,
      mod2_source: 0, mod2_amount: 0, mod2_destination: 0,
      mod3_source: 0, mod3_amount: 0, mod3_destination: 0,
      mod4_source: 0, mod4_amount: 0, mod4_destination: 0,
      delay2_time: 0, delay2_level: 0, delay3_time: 0, delay3_level: 0,
      distortion: 0,
      lfo3_freq: 0, lfo3_shape: 0, lfo3_amount: 0, lfo3_destination: 0,
      lfo4_freq: 0, lfo4_shape: 0, lfo4_amount: 0, lfo4_destination: 0,
      env3_delay: 0, env3_velocity: 0,
      ext_input_peak_amount: 0, ext_input_peak_destination: 0,
      ext_input_envfollow_amount: 0, ext_input_envfollow_dest: 0,
      velocity_amount: 0, velocity_destination: 0,
      mod_wheel_amount: 0, mod_wheel_destination: 0,
      pressure_amount: 0, pressure_destination: 0,
      breath_amount: 0, breath_destination: 0,
      foot_amount: 0, foot_destination: 0,
    },
    sequencer: {
      seq1_steps: Array(16).fill(0),
      seq2_steps: Array(16).fill(0),
      seq3_steps: Array(16).fill(0),
      seq4_steps: Array(16).fill(0),
    },
  };
}

describe('diffPatches', () => {
  it('returns diffCount: 0 for identical patches', () => {
    const patchA = makeEmptyPatch();
    const patchB = makeEmptyPatch();
    const result = diffPatches(patchA, patchB);

    expect(result.diffCount).toBe(0);
    // All parameters should be marked as not changed
    for (const section of result.sections) {
      for (const param of section.parameters) {
        expect(param.changed).toBe(false);
      }
    }
  });

  it('returns diffCount: 1 when one program parameter differs', () => {
    const patchA = makeEmptyPatch();
    const patchB = makeEmptyPatch();
    patchB.parameters.osc1_freq = 64;

    const result = diffPatches(patchA, patchB);

    expect(result.diffCount).toBe(1);

    // Find the changed parameter
    const oscSection = result.sections.find((s) => s.section === 'oscillators');
    expect(oscSection).toBeDefined();
    const changedParam = oscSection!.parameters.find((p) => p.key === 'osc1_freq');
    expect(changedParam).toBeDefined();
    expect(changedParam!.changed).toBe(true);
    expect(changedParam!.valueA).toBe(0);
    expect(changedParam!.valueB).toBe(64);
    expect(changedParam!.name).toBe('Oscillator 1 Frequency');
  });

  it('returns correct diffCount for multiple differences across sections', () => {
    const patchA = makeEmptyPatch();
    const patchB = makeEmptyPatch();
    patchB.parameters.osc1_freq = 48;       // oscillators
    patchB.parameters.filter_freq = 100;     // filter
    patchB.parameters.lfo1_amount = 50;      // lfos
    patchB.parameters.delay1_time = 80;      // delay

    const result = diffPatches(patchA, patchB);
    expect(result.diffCount).toBe(4);
  });

  it('includes sequencer steps in the sequencer section', () => {
    const patchA = makeEmptyPatch();
    const patchB = makeEmptyPatch();
    patchB.sequencer.seq1_steps[0] = 64;
    patchB.sequencer.seq3_steps[15] = 127;

    const result = diffPatches(patchA, patchB);
    expect(result.diffCount).toBe(2);

    const seqSection = result.sections.find((s) => s.section === 'sequencer');
    expect(seqSection).toBeDefined();
    expect(seqSection!.hasChanges).toBe(true);

    const step1 = seqSection!.parameters.find((p) => p.key === 'seq1_step_01');
    expect(step1).toBeDefined();
    expect(step1!.changed).toBe(true);
    expect(step1!.valueA).toBe(0);
    expect(step1!.valueB).toBe(64);
  });

  it('orders sections according to PARAMETER_SECTIONS', () => {
    const patchA = makeEmptyPatch();
    const patchB = makeEmptyPatch();
    const result = diffPatches(patchA, patchB);

    const resultSections = result.sections.map((s) => s.section);
    const expectedOrder = PARAMETER_SECTIONS.filter((s) =>
      resultSections.includes(s)
    );
    expect(resultSections).toEqual(expectedOrder);
  });

  it('sets hasChanges to true only when section has a differing parameter', () => {
    const patchA = makeEmptyPatch();
    const patchB = makeEmptyPatch();
    patchB.parameters.filter_freq = 80;

    const result = diffPatches(patchA, patchB);

    const filterSection = result.sections.find((s) => s.section === 'filter');
    expect(filterSection!.hasChanges).toBe(true);

    const oscSection = result.sections.find((s) => s.section === 'oscillators');
    expect(oscSection!.hasChanges).toBe(false);
  });

  it('each ParameterDiff has all required fields', () => {
    const patchA = makeEmptyPatch();
    const patchB = makeEmptyPatch();
    const result = diffPatches(patchA, patchB);

    for (const section of result.sections) {
      for (const param of section.parameters) {
        expect(param).toHaveProperty('key');
        expect(param).toHaveProperty('name');
        expect(param).toHaveProperty('section');
        expect(param).toHaveProperty('valueA');
        expect(param).toHaveProperty('valueB');
        expect(param).toHaveProperty('changed');
        expect(typeof param.key).toBe('string');
        expect(typeof param.name).toBe('string');
        expect(typeof param.changed).toBe('boolean');
      }
    }
  });

  it('totalCount includes both program and sequencer parameters', () => {
    const patchA = makeEmptyPatch();
    const patchB = makeEmptyPatch();
    const result = diffPatches(patchA, patchB);

    // 128 program params + 64 sequencer steps = 192 total
    expect(result.totalCount).toBe(192);
  });
});
