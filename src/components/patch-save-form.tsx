'use client';

import { useState, Fragment } from 'react';
import { PROGRAM_PARAMETERS } from '@/lib/midi/parameters';
import { PARAMETER_SECTIONS } from '@/lib/midi/types';
import type { ParsedPatch } from '@/lib/midi/types';
import { clsx } from 'clsx';

const PATCH_TYPES = ['bass', 'lead', 'pad', 'drum', 'texture', 'sequence'] as const;

interface PatchSaveFormProps {
  patch: ParsedPatch;
  instrument: string;
  onSaved: () => void;
  onCancel: () => void;
}

export function PatchSaveForm({ patch, instrument, onSaved, onCancel }: PatchSaveFormProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<typeof PATCH_TYPES[number]>('bass');
  const [tags, setTags] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    setError(null);

    try {
      const res = await fetch('/api/patches/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          type,
          tags: tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          instrument,
          description: `Captured from ${instrument} via SysEx.`,
          parameters: patch.parameters,
          sequencer: patch.sequencer,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to save patch');
      }

      setSuccess(true);
      setTimeout(() => {
        onSaved();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save patch');
    } finally {
      setSaving(false);
    }
  };

  if (success) {
    return (
      <p className="text-sm text-accent mt-md">Patch saved to library</p>
    );
  }

  return (
    <div className="mt-md space-y-md">
      <div>
        <label htmlFor="patch-name" className="block text-sm text-muted mb-xs">
          Patch Name
        </label>
        <input
          id="patch-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Warm Bass Lead"
          className="w-full bg-bg text-text text-sm border border-muted/30 rounded-[6px] px-sm py-sm min-h-[44px] focus:outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="patch-type" className="block text-sm text-muted mb-xs">
          Type
        </label>
        <select
          id="patch-type"
          value={type}
          onChange={(e) => setType(e.target.value as typeof PATCH_TYPES[number])}
          className="w-full bg-bg text-text text-sm border border-muted/30 rounded-[6px] px-sm py-sm min-h-[44px]"
        >
          {PATCH_TYPES.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="patch-tags" className="block text-sm text-muted mb-xs">
          Tags (optional)
        </label>
        <input
          id="patch-tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. warm, analog, deep"
          className="w-full bg-bg text-text text-sm border border-muted/30 rounded-[6px] px-sm py-sm min-h-[44px] focus:outline-none focus:border-accent"
        />
      </div>

      {error && <p className="text-sm text-muted">{error}</p>}

      <div className="flex items-center gap-md">
        <button
          type="button"
          onClick={handleSave}
          disabled={!name.trim() || saving}
          className={clsx(
            'text-sm font-bold min-h-[44px] px-lg rounded-[6px] transition-colors',
            name.trim() && !saving
              ? 'bg-accent text-bg hover:opacity-90'
              : 'bg-muted/30 text-muted cursor-not-allowed',
          )}
        >
          {saving ? 'Saving...' : 'Save to Library'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-muted min-h-[44px] px-md transition-colors hover:text-text"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
