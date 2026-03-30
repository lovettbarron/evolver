import { describe, it, expect } from 'vitest';
import { unpackMsBit, parseProgram } from '../parser';
import { PROGRAM_PARAMETERS } from '../parameters';

describe('unpackMsBit', () => {
  it('correctly extracts MS bits from a hand-crafted 8-byte packet', () => {
    // Pack 7 raw bytes: [0x80, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06]
    // Byte 0 (raw 0x80 = 10000000): MS bit = 1, lower 7 = 0x00
    // Byte 1 (raw 0x01): MS bit = 0, lower 7 = 0x01
    // Byte 2 (raw 0x02): MS bit = 0, lower 7 = 0x02
    // Byte 3 (raw 0x03): MS bit = 0, lower 7 = 0x03
    // Byte 4 (raw 0x04): MS bit = 0, lower 7 = 0x04
    // Byte 5 (raw 0x05): MS bit = 0, lower 7 = 0x05
    // Byte 6 (raw 0x06): MS bit = 0, lower 7 = 0x06
    // MS bits byte: bit0=1 (for byte A), rest 0 => 0x01
    const packed = new Uint8Array(220);
    packed[0] = 0x01; // MS bits: only bit 0 set (first data byte has bit 7 set)
    packed[1] = 0x00; // lower 7 of 0x80
    packed[2] = 0x01; // lower 7 of 0x01
    packed[3] = 0x02;
    packed[4] = 0x03;
    packed[5] = 0x04;
    packed[6] = 0x05;
    packed[7] = 0x06;
    // rest are zeros

    const raw = unpackMsBit(packed);
    expect(raw[0]).toBe(0x80); // MS bit restored
    expect(raw[1]).toBe(0x01);
    expect(raw[2]).toBe(0x02);
    expect(raw[3]).toBe(0x03);
    expect(raw[4]).toBe(0x04);
    expect(raw[5]).toBe(0x05);
    expect(raw[6]).toBe(0x06);
  });

  it('produces 192 raw bytes from 220 packed bytes', () => {
    const packed = new Uint8Array(220);
    const raw = unpackMsBit(packed);
    expect(raw.length).toBe(192);
  });

  it('handles all-zeros input correctly', () => {
    const packed = new Uint8Array(220);
    const raw = unpackMsBit(packed);
    expect(raw.every(b => b === 0)).toBe(true);
  });

  it('correctly handles values above 127 (MS bit set)', () => {
    const packed = new Uint8Array(220);
    // Set all 7 MS bits in first packet: 0x7F = 01111111
    packed[0] = 0x7F;
    packed[1] = 0x00; // lower 7 bits all 0, but MS bit = 1 => raw = 128
    packed[2] = 0x00;
    packed[3] = 0x00;
    packed[4] = 0x00;
    packed[5] = 0x00;
    packed[6] = 0x00;
    packed[7] = 0x00;

    const raw = unpackMsBit(packed);
    // All 7 bytes in first packet should have value 128
    for (let i = 0; i < 7; i++) {
      expect(raw[i]).toBe(128);
    }
  });

  it('correctly restores mixed values across packet boundary', () => {
    const packed = new Uint8Array(220);
    // Second packet starts at byte 8
    packed[8] = 0x05; // MS bits: bit0=1, bit2=1 -> bytes 0,2 of packet get MS bit
    packed[9] = 0x32;  // 0x32 | 0x80 = 0xB2 (178)
    packed[10] = 0x00;
    packed[11] = 0x64; // 0x64 | 0x80 = 0xE4 (228)
    packed[12] = 0x00;
    packed[13] = 0x00;
    packed[14] = 0x00;
    packed[15] = 0x00;

    const raw = unpackMsBit(packed);
    expect(raw[7]).toBe(0xB2);  // 0x32 | 0x80
    expect(raw[8]).toBe(0x00);
    expect(raw[9]).toBe(0xE4);  // 0x64 | 0x80
  });
});

describe('parseProgram', () => {
  it('produces correct keys from PROGRAM_PARAMETERS', () => {
    const raw = new Uint8Array(192);
    raw[0] = 60; // osc1_freq
    raw[3] = 50; // osc1_level
    raw[16] = 164; // filter_freq

    const patch = parseProgram(raw);
    expect(patch.parameters['osc1_freq']).toBe(60);
    expect(patch.parameters['osc1_level']).toBe(50);
    expect(patch.parameters['filter_freq']).toBe(164);
  });

  it('has all 128 program parameter keys', () => {
    const raw = new Uint8Array(192);
    const patch = parseProgram(raw);
    expect(Object.keys(patch.parameters).length).toBe(128);
    for (const def of PROGRAM_PARAMETERS) {
      expect(patch.parameters).toHaveProperty(def.key);
    }
  });

  it('extracts sequencer steps into 4 tracks of 16', () => {
    const raw = new Uint8Array(192);
    // Set some sequencer values
    raw[128] = 42; // seq1 step 1
    raw[144] = 99; // seq2 step 1
    raw[160] = 64; // seq3 step 1
    raw[176] = 127; // seq4 step 1

    const patch = parseProgram(raw);
    expect(patch.sequencer.seq1_steps).toHaveLength(16);
    expect(patch.sequencer.seq2_steps).toHaveLength(16);
    expect(patch.sequencer.seq3_steps).toHaveLength(16);
    expect(patch.sequencer.seq4_steps).toHaveLength(16);
    expect(patch.sequencer.seq1_steps[0]).toBe(42);
    expect(patch.sequencer.seq2_steps[0]).toBe(99);
    expect(patch.sequencer.seq3_steps[0]).toBe(64);
    expect(patch.sequencer.seq4_steps[0]).toBe(127);
  });
});
