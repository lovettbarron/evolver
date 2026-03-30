import { describe, it, expect } from 'vitest';
import { packMsBit, encodeProgram } from '../encoder';
import { unpackMsBit, parseProgram } from '../parser';
import type { ParsedPatch } from '../types';

describe('packMsBit', () => {
  it('roundtrip: unpackMsBit(packMsBit(raw)) equals original raw data', () => {
    // Start from raw bytes (the ground truth), pack then unpack
    const original = new Uint8Array(192);
    for (let i = 0; i < 192; i++) {
      original[i] = i; // Values 0-191, includes values > 127
    }

    const packed = packMsBit(original);
    const unpacked = unpackMsBit(packed);

    expect(unpacked.length).toBe(192);
    for (let i = 0; i < 192; i++) {
      expect(unpacked[i]).toBe(original[i]);
    }
  });

  it('roundtrip with all-zeros', () => {
    const original = new Uint8Array(220);
    const raw = unpackMsBit(original);
    const repacked = packMsBit(raw);
    // First 220 bytes should all be 0
    for (let i = 0; i < 220; i++) {
      expect(repacked[i]).toBe(0);
    }
  });

  it('roundtrip preserves values above 127', () => {
    // Create raw bytes with values > 127
    const raw = new Uint8Array(192);
    raw[0] = 200;
    raw[1] = 128;
    raw[2] = 255;
    raw[7] = 164;

    const packed = packMsBit(raw);
    const unpacked = unpackMsBit(packed);

    expect(unpacked[0]).toBe(200);
    expect(unpacked[1]).toBe(128);
    expect(unpacked[2]).toBe(255);
    expect(unpacked[7]).toBe(164);
  });
});

describe('encodeProgram', () => {
  it('roundtrip: encodeProgram(parseProgram(raw)) equals original raw data', () => {
    const original = new Uint8Array(192);
    // Set various parameter values
    original[0] = 60;   // osc1_freq
    original[3] = 50;   // osc1_level
    original[16] = 164; // filter_freq (value > 127)
    original[31] = 100; // program_volume
    original[128] = 42; // seq1 step 1
    original[191] = 99; // seq4 step 16

    const parsed = parseProgram(original);
    const reencoded = encodeProgram(parsed);

    expect(reencoded.length).toBe(192);
    for (let i = 0; i < 192; i++) {
      expect(reencoded[i]).toBe(original[i]);
    }
  });

  it('encodes a patch with known values correctly', () => {
    const patch: ParsedPatch = {
      parameters: {
        osc1_freq: 60,
        osc1_fine: 50,
        osc1_shape: 0,
        osc1_level: 50,
        osc2_freq: 60,
        osc2_fine: 50,
        osc2_shape: 0,
        osc2_level: 50,
      },
      sequencer: {
        seq1_steps: Array(16).fill(0),
        seq2_steps: Array(16).fill(0),
        seq3_steps: Array(16).fill(0),
        seq4_steps: Array(16).fill(0),
      },
    };

    const raw = encodeProgram(patch);
    expect(raw[0]).toBe(60);  // osc1_freq at index 0
    expect(raw[1]).toBe(50);  // osc1_fine at index 1
    expect(raw[2]).toBe(0);   // osc1_shape at index 2
    expect(raw[3]).toBe(50);  // osc1_level at index 3
  });

  it('encodes missing parameters as 0', () => {
    const patch: ParsedPatch = {
      parameters: {},
      sequencer: {
        seq1_steps: Array(16).fill(0),
        seq2_steps: Array(16).fill(0),
        seq3_steps: Array(16).fill(0),
        seq4_steps: Array(16).fill(0),
      },
    };

    const raw = encodeProgram(patch);
    expect(raw.every(b => b === 0)).toBe(true);
  });
});
