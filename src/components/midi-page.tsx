'use client';

import { useState, useEffect, useCallback } from 'react';
import { MidiConnection } from './midi-connection';
import { CapturePanel } from './capture-panel';
import { PatchSaveForm } from './patch-save-form';
import { SendPanel } from './send-panel';
import type { ParsedPatch } from '@/lib/midi/types';

interface MidiPageProps {
  instrumentSlug: string;
}

export function MidiPage({ instrumentSlug }: MidiPageProps) {
  const [connectionState, setConnectionState] = useState<{
    input: MIDIInput | null;
    output: MIDIOutput | null;
    status: 'unsupported' | 'detecting' | 'disconnected' | 'connected';
    deviceName: string | null;
  }>({
    input: null,
    output: null,
    status: 'detecting',
    deviceName: null,
  });

  const [capturedPatch, setCapturedPatch] = useState<ParsedPatch | null>(null);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [patches, setPatches] = useState<
    Array<{ slug: string; name: string; sysexData: Record<string, unknown> | null }>
  >([]);

  const fetchPatches = useCallback(() => {
    fetch(`/api/patches/list?instrument=${instrumentSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPatches(data);
        }
      })
      .catch(() => {
        // Silently fail — patches list is non-critical
      });
  }, [instrumentSlug]);

  useEffect(() => {
    fetchPatches();
  }, [fetchPatches]);

  const handleConnectionChange = useCallback(
    (state: typeof connectionState) => {
      setConnectionState(state);
    },
    [],
  );

  const handleCapture = useCallback((patch: ParsedPatch) => {
    setCapturedPatch(patch);
    setShowSaveForm(true);
  }, []);

  const handleSaved = () => {
    setShowSaveForm(false);
    setCapturedPatch(null);
    fetchPatches();
  };

  const isConnected = connectionState.status === 'connected';

  return (
    <div className="max-w-[960px] mx-auto px-lg py-2xl">
      {/* Connection Section */}
      <section className="bg-surface rounded-[6px] p-lg mb-xl">
        <h2 className="text-[20px] font-bold mb-md">Connection</h2>
        <MidiConnection onConnectionChange={handleConnectionChange} />
      </section>

      {/* Capture Section */}
      <section className="bg-surface rounded-[6px] p-lg mb-xl">
        <h2 className="text-[20px] font-bold mb-md">Capture</h2>
        <CapturePanel
          input={connectionState.input}
          output={connectionState.output}
          connected={isConnected}
          onCapture={handleCapture}
        />

        {showSaveForm && capturedPatch && (
          <PatchSaveForm
            patch={capturedPatch}
            instrument={instrumentSlug}
            onSaved={handleSaved}
            onCancel={() => {
              setShowSaveForm(false);
              setCapturedPatch(null);
            }}
          />
        )}
      </section>

      {/* Send to Device Section */}
      <section className="bg-surface rounded-[6px] p-lg mb-xl">
        <h2 className="text-[20px] font-bold mb-md">Send to Device</h2>
        <SendPanel
          output={connectionState.output}
          connected={isConnected}
          patches={patches}
        />
      </section>
    </div>
  );
}
