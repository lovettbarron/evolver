import { describe, it, expect, vi, beforeEach } from 'vitest';

// Build mock types for Web MIDI API
function createMockMIDIPort(overrides: Partial<{ id: string; name: string; manufacturer: string }> = {}) {
  return {
    id: overrides.id ?? 'port-1',
    name: overrides.name ?? 'Test MIDI Device',
    manufacturer: overrides.manufacturer ?? 'Test',
  };
}

function createMockMIDIAccess(opts: {
  inputs?: Array<{ id: string; name: string; manufacturer: string }>;
  outputs?: Array<{ id: string; name: string; manufacturer: string }>;
} = {}) {
  const inputs = new Map<string, unknown>();
  const outputs = new Map<string, unknown>();
  for (const inp of opts.inputs ?? []) {
    inputs.set(inp.id, inp);
  }
  for (const out of opts.outputs ?? []) {
    outputs.set(out.id, out);
  }
  return { inputs, outputs } as unknown as MIDIAccess;
}

describe('isMidiSupported', () => {
  it('returns false when navigator.requestMIDIAccess is undefined', async () => {
    // Ensure no requestMIDIAccess on navigator
    const orig = (globalThis.navigator as Record<string, unknown>)?.requestMIDIAccess;
    if (typeof globalThis.navigator !== 'undefined') {
      delete (globalThis.navigator as Record<string, unknown>).requestMIDIAccess;
    }

    const { isMidiSupported } = await import('../connection');
    expect(isMidiSupported()).toBe(false);

    // Restore
    if (orig) {
      (globalThis.navigator as Record<string, unknown>).requestMIDIAccess = orig;
    }
  });
});

describe('findEvolverPorts', () => {
  it('prefers ports with "evolver" in name', async () => {
    const { findEvolverPorts } = await import('../connection');

    const access = createMockMIDIAccess({
      inputs: [
        { id: 'in-1', name: 'Generic MIDI', manufacturer: '' },
        { id: 'in-2', name: 'DSI Evolver', manufacturer: 'DSI' },
      ],
      outputs: [
        { id: 'out-1', name: 'Generic MIDI', manufacturer: '' },
        { id: 'out-2', name: 'DSI Evolver', manufacturer: 'DSI' },
      ],
    });

    const result = findEvolverPorts(access);
    expect((result.input as unknown as { id: string })?.id).toBe('in-2');
    expect((result.output as unknown as { id: string })?.id).toBe('out-2');
  });

  it('falls back to first available port when no evolver found', async () => {
    const { findEvolverPorts } = await import('../connection');

    const access = createMockMIDIAccess({
      inputs: [{ id: 'in-1', name: 'USB MIDI Interface', manufacturer: '' }],
      outputs: [{ id: 'out-1', name: 'USB MIDI Interface', manufacturer: '' }],
    });

    const result = findEvolverPorts(access);
    expect((result.input as unknown as { id: string })?.id).toBe('in-1');
    expect((result.output as unknown as { id: string })?.id).toBe('out-1');
  });

  it('returns null for empty port lists', async () => {
    const { findEvolverPorts } = await import('../connection');

    const access = createMockMIDIAccess({ inputs: [], outputs: [] });
    const result = findEvolverPorts(access);
    expect(result.input).toBeNull();
    expect(result.output).toBeNull();
  });
});

describe('requestEditBuffer', () => {
  it('resolves with ParsedPatch when valid SysEx received', async () => {
    const { requestEditBuffer } = await import('../connection');
    const { packMsBit, encodeProgram } = await import('../encoder');

    // Build a known ParsedPatch
    const knownPatch = {
      parameters: {} as Record<string, number>,
      sequencer: {
        seq1_steps: Array(16).fill(0),
        seq2_steps: Array(16).fill(0),
        seq3_steps: Array(16).fill(0),
        seq4_steps: Array(16).fill(0),
      },
    };

    const rawBytes = encodeProgram(knownPatch);
    const packed = packMsBit(rawBytes);
    // Build a complete SysEx message: F0 01 20 01 03 [220 packed bytes] F7
    const sysexMsg = new Uint8Array(226);
    sysexMsg[0] = 0xF0;
    sysexMsg[1] = 0x01;
    sysexMsg[2] = 0x20;
    sysexMsg[3] = 0x01;
    sysexMsg[4] = 0x03;
    sysexMsg.set(packed.slice(0, 220), 5);
    sysexMsg[225] = 0xF7;

    const mockSend = vi.fn();
    const mockOutput = { send: mockSend } as unknown as MIDIOutput;
    let messageHandler: ((event: MIDIMessageEvent) => void) | null = null;
    const mockInput = {
      set onmidimessage(handler: ((event: MIDIMessageEvent) => void) | null) {
        messageHandler = handler;
      },
      get onmidimessage() {
        return messageHandler;
      },
    } as unknown as MIDIInput;

    const promise = requestEditBuffer(mockOutput, mockInput);

    // Simulate receiving the SysEx response
    expect(messageHandler).not.toBeNull();
    messageHandler!({ data: sysexMsg } as unknown as MIDIMessageEvent);

    const result = await promise;
    expect(result).toBeDefined();
    expect(result.parameters).toBeDefined();
    expect(result.sequencer).toBeDefined();
    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  it('rejects on timeout', async () => {
    vi.useFakeTimers();
    const { requestEditBuffer } = await import('../connection');

    const mockOutput = { send: vi.fn() } as unknown as MIDIOutput;
    let messageHandler: ((event: MIDIMessageEvent) => void) | null = null;
    const mockInput = {
      set onmidimessage(handler: ((event: MIDIMessageEvent) => void) | null) {
        messageHandler = handler;
      },
      get onmidimessage() {
        return messageHandler;
      },
    } as unknown as MIDIInput;

    const promise = requestEditBuffer(mockOutput, mockInput);
    vi.advanceTimersByTime(3001);

    await expect(promise).rejects.toThrow('SysEx response timeout');

    vi.useRealTimers();
  });
});

describe('sendEditBuffer', () => {
  it('calls output.send with correct SysEx header bytes', async () => {
    const { sendEditBuffer } = await import('../connection');

    const mockSend = vi.fn();
    const mockOutput = { send: mockSend } as unknown as MIDIOutput;

    const patch = {
      parameters: {} as Record<string, number>,
      sequencer: {
        seq1_steps: Array(16).fill(0),
        seq2_steps: Array(16).fill(0),
        seq3_steps: Array(16).fill(0),
        seq4_steps: Array(16).fill(0),
      },
    };

    sendEditBuffer(mockOutput, patch);

    expect(mockSend).toHaveBeenCalledTimes(1);
    const sentData = mockSend.mock.calls[0][0] as Uint8Array;
    // First byte should be 0xF0 (SysEx start)
    expect(sentData[0]).toBe(0xF0);
    // Last byte should be 0xF7 (SysEx end)
    expect(sentData[sentData.length - 1]).toBe(0xF7);
    // Total length: 5 header + 220 data + 1 footer = 226
    expect(sentData.length).toBe(226);
  });
});
