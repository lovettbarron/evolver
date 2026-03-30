import { PROGRAM_PARAMETERS } from './parameters';
import type { ParsedPatch } from './types';

/**
 * Unpacks MS bit-packed MIDI data to raw bytes.
 * 220 packed bytes -> 192 raw bytes.
 *
 * Each 8-byte packet: byte 0 = MS bits, bytes 1-7 = lower 7 bits.
 * Bit N of the MS byte is the 7th bit of byte N+1.
 *
 * Source: DSI Evolver Manual p.45 "Packed Data Format"
 */
export function unpackMsBit(packed: Uint8Array): Uint8Array {
  const raw = new Uint8Array(192);
  let rawIdx = 0;
  for (let i = 0; i < packed.length && rawIdx < 192; i += 8) {
    const msBits = packed[i];
    for (let j = 1; j < 8 && rawIdx < 192; j++) {
      if (i + j < packed.length) {
        const msb = (msBits >> (j - 1)) & 1;
        raw[rawIdx++] = packed[i + j] | (msb << 7);
      }
    }
  }
  return raw;
}

/**
 * Parses 192 raw bytes into a structured ParsedPatch.
 * Bytes 0-127: program parameters (mapped by PROGRAM_PARAMETERS)
 * Bytes 128-191: sequencer step data (4 tracks x 16 steps)
 */
export function parseProgram(rawBytes: Uint8Array): ParsedPatch {
  const parameters: Record<string, number> = {};
  for (const def of PROGRAM_PARAMETERS) {
    parameters[def.key] = rawBytes[def.index];
  }
  const sequencer = {
    seq1_steps: Array.from({ length: 16 }, (_, i) => rawBytes[128 + i]),
    seq2_steps: Array.from({ length: 16 }, (_, i) => rawBytes[144 + i]),
    seq3_steps: Array.from({ length: 16 }, (_, i) => rawBytes[160 + i]),
    seq4_steps: Array.from({ length: 16 }, (_, i) => rawBytes[176 + i]),
  };
  return { parameters, sequencer };
}
