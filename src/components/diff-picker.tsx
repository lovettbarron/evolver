'use client';

import { useState, useEffect } from 'react';
import type { ParsedPatch, SysexJson } from '@/lib/midi/types';

interface PatchOption {
  slug: string;
  name: string;
  sysexData: Record<string, unknown> | null;
}

interface DiffPickerProps {
  patches: PatchOption[];
  basicPatchData: SysexJson | null;
  onSelectionChange: (
    patchA: ParsedPatch | null,
    patchB: ParsedPatch | null,
    nameA: string,
    nameB: string,
  ) => void;
}

function sysexToParsedPatch(sysex: Record<string, unknown>): ParsedPatch {
  const data = sysex as {
    parameters: Record<string, number>;
    sequencer: {
      seq1_steps: number[];
      seq2_steps: number[];
      seq3_steps: number[];
      seq4_steps: number[];
    };
  };
  return {
    parameters: data.parameters,
    sequencer: data.sequencer,
  };
}

export function DiffPicker({
  patches,
  basicPatchData,
  onSelectionChange,
}: DiffPickerProps) {
  const BASIC_PATCH_VALUE = '__basic_patch__';
  const [selectedA, setSelectedA] = useState(BASIC_PATCH_VALUE);
  const [selectedB, setSelectedB] = useState('');

  const eligiblePatches = patches.filter((p) => p.sysexData !== null);

  useEffect(() => {
    const patchA =
      selectedA === BASIC_PATCH_VALUE && basicPatchData
        ? { parameters: basicPatchData.parameters, sequencer: basicPatchData.sequencer }
        : selectedA
          ? (() => {
              const found = eligiblePatches.find((p) => p.slug === selectedA);
              return found?.sysexData ? sysexToParsedPatch(found.sysexData) : null;
            })()
          : null;

    const patchB = selectedB
      ? (() => {
          const found = eligiblePatches.find((p) => p.slug === selectedB);
          return found?.sysexData ? sysexToParsedPatch(found.sysexData) : null;
        })()
      : null;

    const nameA =
      selectedA === BASIC_PATCH_VALUE
        ? 'Basic Patch (default baseline)'
        : eligiblePatches.find((p) => p.slug === selectedA)?.name ?? '';
    const nameB = eligiblePatches.find((p) => p.slug === selectedB)?.name ?? '';

    onSelectionChange(patchA, patchB, nameA, nameB);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedA, selectedB]);

  const selectClasses =
    'bg-surface text-text border border-muted/20 rounded-[6px] p-sm min-h-[44px] text-sm flex-1 min-w-[200px]';

  return (
    <div className="flex gap-md flex-col md:flex-row">
      <div className="flex-1">
        <label className="block text-sm text-muted mb-xs">Patch A</label>
        <select
          value={selectedA}
          onChange={(e) => setSelectedA(e.target.value)}
          className={selectClasses}
        >
          {basicPatchData && (
            <option value={BASIC_PATCH_VALUE}>
              Basic Patch (default baseline)
            </option>
          )}
          {eligiblePatches.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm text-muted mb-xs">Patch B</label>
        <select
          value={selectedB}
          onChange={(e) => setSelectedB(e.target.value)}
          className={selectClasses}
        >
          <option value="">Select a patch</option>
          {eligiblePatches.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
