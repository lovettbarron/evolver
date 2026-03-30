'use client';

import { useState } from 'react';
import { sendEditBuffer } from '@/lib/midi/connection';
import { ConfirmDialog } from './confirm-dialog';
import type { ParsedPatch } from '@/lib/midi/types';
import { clsx } from 'clsx';

interface SendPanelProps {
  output: MIDIOutput | null;
  connected: boolean;
  patches: Array<{
    slug: string;
    name: string;
    sysexData: Record<string, unknown> | null;
  }>;
}

export function SendPanel({ output, connected, patches }: SendPanelProps) {
  const [selectedSlug, setSelectedSlug] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Only show patches that have sysex data
  const eligiblePatches = patches.filter((p) => p.sysexData !== null);
  const selectedPatch = eligiblePatches.find((p) => p.slug === selectedSlug);

  const handleSendClick = () => {
    if (!selectedPatch) return;
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    setConfirmOpen(false);
    if (!output || !selectedPatch?.sysexData) return;

    setSending(true);
    setError(null);
    setSuccess(false);

    try {
      const sysex = selectedPatch.sysexData as {
        parameters: Record<string, number>;
        sequencer: {
          seq1_steps: number[];
          seq2_steps: number[];
          seq3_steps: number[];
          seq4_steps: number[];
        };
      };

      const patch: ParsedPatch = {
        parameters: sysex.parameters,
        sequencer: sysex.sequencer,
      };

      sendEditBuffer(output, patch);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('Send failed. Check your MIDI connection and try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-md flex-wrap">
        <select
          value={selectedSlug}
          onChange={(e) => {
            setSelectedSlug(e.target.value);
            setError(null);
            setSuccess(false);
          }}
          className="bg-bg text-text text-sm border border-muted/30 rounded-[6px] px-sm py-sm min-h-[44px] flex-1 min-w-[200px]"
        >
          <option value="">Select a patch...</option>
          {eligiblePatches.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleSendClick}
          disabled={!connected || !selectedPatch || sending}
          className={clsx(
            'text-sm font-bold min-h-[44px] px-lg rounded-[6px] transition-colors border',
            connected && selectedPatch && !sending
              ? 'border-accent text-accent hover:bg-accent hover:text-bg'
              : 'border-muted/30 text-muted cursor-not-allowed',
          )}
        >
          {sending ? 'Sending...' : 'Send to Device'}
        </button>
      </div>

      {success && (
        <p className="text-sm text-accent mt-sm">Patch loaded on Evolver</p>
      )}

      {error && (
        <p className="text-sm text-muted mt-sm">{error}</p>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
        title="Send Patch to Evolver"
        body={`This will load <strong>${selectedPatch?.name ?? ''}</strong> into the Evolver's edit buffer. Your current unsaved edits on the hardware will be replaced.`}
        confirmLabel="Send Patch"
        cancelLabel="Don't Send"
      />
    </div>
  );
}
