import { SYSEX_REQUEST_EDIT_BUFFER, buildEditBufferDump, validateSysexMessage } from './sysex';
import { unpackMsBit, parseProgram } from './parser';
import { encodeProgram, packMsBit } from './encoder';
import type { ParsedPatch } from './types';

export interface MidiDevice {
  id: string;
  name: string;
  manufacturer: string;
}

export interface MidiConnectionState {
  status: 'unsupported' | 'detecting' | 'disconnected' | 'connected';
  access: MIDIAccess | null;
  input: MIDIInput | null;
  output: MIDIOutput | null;
  deviceName: string | null;
  error: string | null;
}

export function isMidiSupported(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.requestMIDIAccess === 'function';
}

export async function requestMidiAccess(): Promise<MIDIAccess> {
  if (!isMidiSupported()) {
    throw new Error('Web MIDI API not supported in this browser');
  }
  return navigator.requestMIDIAccess({ sysex: true });
}

export function listMidiDevices(access: MIDIAccess): { inputs: MidiDevice[]; outputs: MidiDevice[] } {
  const inputs: MidiDevice[] = [];
  const outputs: MidiDevice[] = [];
  access.inputs.forEach((port) => {
    inputs.push({ id: port.id, name: port.name ?? 'Unknown', manufacturer: port.manufacturer ?? '' });
  });
  access.outputs.forEach((port) => {
    outputs.push({ id: port.id, name: port.name ?? 'Unknown', manufacturer: port.manufacturer ?? '' });
  });
  return { inputs, outputs };
}

export function findEvolverPorts(access: MIDIAccess): { input: MIDIInput | null; output: MIDIOutput | null } {
  let input: MIDIInput | null = null;
  let output: MIDIOutput | null = null;
  access.inputs.forEach((port) => {
    if (port.name?.toLowerCase().includes('evolver')) input = port;
    else if (!input) input = port;
  });
  access.outputs.forEach((port) => {
    if (port.name?.toLowerCase().includes('evolver')) output = port;
    else if (!output) output = port;
  });
  return { input, output };
}

export function requestEditBuffer(
  output: MIDIOutput,
  input: MIDIInput,
  timeoutMs = 3000,
): Promise<ParsedPatch> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      input.onmidimessage = null;
      reject(new Error('SysEx response timeout (3s). Check MIDI connection.'));
    }, timeoutMs);

    let buffer: number[] = [];
    let inSysex = false;
    input.onmidimessage = (event: MIDIMessageEvent) => {
      const data = event.data;
      if (!data) return;
      for (let i = 0; i < data.length; i++) {
        const byte = data[i];
        // Skip real-time messages (clock, active sensing, etc.)
        if (byte >= 0xF8) continue;
        if (byte === 0xF0) {
          buffer = [0xF0];
          inSysex = true;
          continue;
        }
        if (!inSysex) continue;
        buffer.push(byte);
        if (byte === 0xF7) {
          inSysex = false;
          clearTimeout(timeout);
          input.onmidimessage = null;
          const raw = new Uint8Array(buffer);
          const validation = validateSysexMessage(raw);
          if (!validation.valid) {
            reject(new Error('Invalid SysEx message received'));
            return;
          }
          const packedData = raw.slice(5, raw.length - 1);
          const unpacked = unpackMsBit(packedData);
          resolve(parseProgram(unpacked));
        }
      }
    };

    output.send(SYSEX_REQUEST_EDIT_BUFFER);
  });
}

export function sendEditBuffer(output: MIDIOutput, patch: ParsedPatch): void {
  const rawBytes = encodeProgram(patch);
  const packedBytes = packMsBit(rawBytes);
  // packMsBit returns ceil(192/7)*8 = 224 bytes, but Evolver protocol uses 220
  const trimmed = packedBytes.slice(0, 220);
  const message = buildEditBufferDump(trimmed);
  output.send(message);
}
