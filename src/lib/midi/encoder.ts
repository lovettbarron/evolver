import { PROGRAM_PARAMETERS } from './parameters';
import type { ParsedPatch } from './types';

/**
 * Packs raw bytes into MS bit-packed MIDI format.
 * 192 raw bytes -> 224 packed bytes (ceil(192/7) * 8).
 * Only 220 of these are meaningful for the Evolver protocol.
 *
 * Source: DSI Evolver Manual p.45 "Packed Data Format"
 */
export function packMsBit(raw: Uint8Array): Uint8Array {
  const packetCount = Math.ceil(raw.length / 7);
  const packed = new Uint8Array(packetCount * 8);
  let rawIdx = 0;
  for (let p = 0; p < packetCount; p++) {
    const base = p * 8;
    let msBits = 0;
    for (let j = 0; j < 7 && rawIdx < raw.length; j++) {
      msBits |= ((raw[rawIdx] >> 7) & 1) << j;
      packed[base + 1 + j] = raw[rawIdx] & 0x7F;
      rawIdx++;
    }
    packed[base] = msBits;
  }
  return packed;
}

/**
 * Encodes a ParsedPatch back into 192 raw bytes.
 * Inverse of parseProgram.
 */
export function encodeProgram(patch: ParsedPatch): Uint8Array {
  const raw = new Uint8Array(192);
  for (const def of PROGRAM_PARAMETERS) {
    raw[def.index] = patch.parameters[def.key] ?? 0;
  }
  const { seq1_steps, seq2_steps, seq3_steps, seq4_steps } = patch.sequencer;
  for (let i = 0; i < 16; i++) {
    raw[128 + i] = seq1_steps[i] ?? 0;
    raw[144 + i] = seq2_steps[i] ?? 0;
    raw[160 + i] = seq3_steps[i] ?? 0;
    raw[176 + i] = seq4_steps[i] ?? 0;
  }
  return raw;
}
