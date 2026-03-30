'use client';

import { useState, useCallback, useEffect, useRef, Fragment } from 'react';
import { requestEditBuffer } from '@/lib/midi/connection';
import { unpackMsBit, parseProgram } from '@/lib/midi/parser';
import { validateSysexMessage } from '@/lib/midi/sysex';
import { PROGRAM_PARAMETERS } from '@/lib/midi/parameters';
import { PARAMETER_SECTIONS } from '@/lib/midi/types';
import type { ParsedPatch } from '@/lib/midi/types';
import { clsx } from 'clsx';

interface CapturePanelProps {
  input: MIDIInput | null;
  output: MIDIOutput | null;
  connected: boolean;
  onCapture: (patch: ParsedPatch) => void;
}

export function CapturePanel({ input, output, connected, onCapture }: CapturePanelProps) {
  const [capturing, setCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listenMode, setListenMode] = useState(false);
  const [capturedPatch, setCapturedPatch] = useState<ParsedPatch | null>(null);
  const listenRef = useRef(false);

  const handleCapture = async () => {
    if (!output || !input || capturing) return;
    setCapturing(true);
    setError(null);
    setCapturedPatch(null);

    try {
      const patch = await requestEditBuffer(output, input);
      setCapturedPatch(patch);
      onCapture(patch);
    } catch (err) {
      setError('Capture failed. Check your MIDI connection and try again.');
    } finally {
      setCapturing(false);
    }
  };

  // Listen mode: passively receive SysEx dumps
  useEffect(() => {
    listenRef.current = listenMode;
    if (!listenMode || !input) return;

    const buffer: number[] = [];
    input.onmidimessage = (event: MIDIMessageEvent) => {
      if (!listenRef.current) return;
      const data = event.data;
      if (!data) return;
      for (let i = 0; i < data.length; i++) {
        buffer.push(data[i]);
        if (data[i] === 0xF7) {
          const raw = new Uint8Array(buffer);
          buffer.length = 0;
          const validation = validateSysexMessage(raw);
          if (validation.valid) {
            const packedData = raw.slice(5, raw.length - 1);
            const unpacked = unpackMsBit(packedData);
            const patch = parseProgram(unpacked);
            setCapturedPatch(patch);
            onCapture(patch);
          }
        }
      }
    };

    return () => {
      if (input) {
        input.onmidimessage = null;
      }
    };
  }, [listenMode, input, onCapture]);

  const paramsBySection = PARAMETER_SECTIONS.map((section) => ({
    section,
    params: PROGRAM_PARAMETERS.filter((p) => p.section === section),
  })).filter((g) => g.params.length > 0);

  return (
    <div>
      <div className="flex items-center gap-md flex-wrap">
        <button
          type="button"
          onClick={handleCapture}
          disabled={!connected || capturing}
          className={clsx(
            'font-bold text-sm min-h-[44px] px-lg rounded-[6px] transition-colors',
            connected && !capturing
              ? 'bg-accent text-bg hover:opacity-90'
              : 'bg-muted/30 text-muted cursor-not-allowed',
            capturing && 'animate-pulse',
          )}
        >
          {capturing ? 'Receiving...' : 'Capture Current Patch'}
        </button>

        <button
          type="button"
          onClick={() => setListenMode(!listenMode)}
          disabled={!connected}
          className={clsx(
            'text-sm min-h-[44px] px-md rounded-full transition-colors border',
            listenMode
              ? 'bg-accent text-bg border-accent'
              : 'bg-transparent text-muted border-muted/30 hover:text-text hover:border-muted',
            !connected && 'opacity-50 cursor-not-allowed',
          )}
        >
          Listen Mode
        </button>
      </div>

      {listenMode && connected && (
        <p className="text-sm text-muted mt-sm">Listening for incoming SysEx dumps...</p>
      )}

      <div aria-live="assertive">
        {error && (
          <p className="text-sm text-muted mt-sm">{error}</p>
        )}
      </div>

      {capturedPatch && (
        <div className="mt-md max-h-[400px] overflow-y-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left text-muted font-normal px-sm py-xs">Parameter</th>
                <th className="text-right text-muted font-normal px-sm py-xs">Value</th>
              </tr>
            </thead>
            <tbody>
              {paramsBySection.map((group) => (
                <Fragment key={group.section}>
                  <tr>
                    <td
                      colSpan={2}
                      className="text-[14px] uppercase tracking-wider text-muted pt-md pb-xs px-sm font-normal"
                    >
                      {group.section.replace(/_/g, ' ')}
                    </td>
                  </tr>
                  {group.params.map((param) => (
                    <tr key={param.key} className="even:bg-surface">
                      <td className="px-sm py-xs text-text">{param.name}</td>
                      <td className="px-sm py-xs text-right font-mono text-param">
                        {capturedPatch.parameters[param.key] ?? 0}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
