'use client';

import { useMemo } from 'react';
import { diffPatches } from '@/lib/midi/diff';
import type { ParsedPatch } from '@/lib/midi/types';
import { clsx } from 'clsx';

interface DiffViewProps {
  patchA: ParsedPatch | null;
  patchB: ParsedPatch | null;
  nameA: string;
  nameB: string;
}

export function DiffView({ patchA, patchB, nameA, nameB }: DiffViewProps) {
  const result = useMemo(() => {
    if (patchA && patchB) {
      return diffPatches(patchA, patchB);
    }
    return null;
  }, [patchA, patchB]);

  // Neither patch selected
  if (!patchA && !patchB) {
    return (
      <div className="flex gap-md flex-col md:flex-row mt-md">
        <div className="flex-1 text-center text-muted text-sm py-xl">
          Select a patch
        </div>
        <div className="flex-1 text-center text-muted text-sm py-xl">
          Select a patch
        </div>
      </div>
    );
  }

  // Only one patch selected, no diff yet
  if (!patchA || !patchB || !result) {
    return (
      <div className="flex gap-md flex-col md:flex-row mt-md">
        <div className="flex-1 text-center text-sm py-xl">
          {patchA ? (
            <span className="text-text">{nameA}</span>
          ) : (
            <span className="text-muted">Select a patch</span>
          )}
        </div>
        <div className="flex-1 text-center text-sm py-xl">
          {patchB ? (
            <span className="text-text">{nameB}</span>
          ) : (
            <span className="text-muted">Select a patch</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-md">
      {/* Summary line */}
      <p className="text-sm text-muted mb-md">
        {result.diffCount === 0
          ? 'Patches are identical'
          : `${result.diffCount} parameters differ`}
      </p>

      {/* Side-by-side columns */}
      <div className="flex gap-md flex-col md:flex-row">
        {/* Column A */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold mb-sm">{nameA}</div>
          <div className="max-h-[600px] overflow-y-auto">
            {result.sections.map((section) => (
              <div key={section.section}>
                <div className="text-sm uppercase tracking-wider text-muted sticky top-0 bg-bg py-xs">
                  {section.sectionName}
                </div>
                <table className="w-full">
                  <thead className="sr-only">
                    <tr>
                      <th>Parameter</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.parameters.map((param) => (
                      <tr
                        key={param.key}
                        className={clsx(
                          param.changed && 'bg-accent/10',
                        )}
                      >
                        <td
                          className={clsx(
                            'text-sm py-xs pr-sm',
                            param.changed ? 'text-text' : 'text-muted',
                          )}
                        >
                          {param.name}
                        </td>
                        <td
                          className={clsx(
                            'font-mono text-sm py-xs text-right',
                            param.changed ? 'text-accent' : 'text-muted',
                          )}
                        >
                          {param.valueA}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>

        {/* Column B */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold mb-sm">{nameB}</div>
          <div className="max-h-[600px] overflow-y-auto">
            {result.sections.map((section) => (
              <div key={section.section}>
                <div className="text-sm uppercase tracking-wider text-muted sticky top-0 bg-bg py-xs">
                  {section.sectionName}
                </div>
                <table className="w-full">
                  <thead className="sr-only">
                    <tr>
                      <th>Parameter</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.parameters.map((param) => (
                      <tr
                        key={param.key}
                        className={clsx(
                          param.changed && 'bg-accent/10',
                        )}
                      >
                        <td
                          className={clsx(
                            'text-sm py-xs pr-sm',
                            param.changed ? 'text-text' : 'text-muted',
                          )}
                        >
                          {param.name}
                        </td>
                        <td
                          className={clsx(
                            'font-mono text-sm py-xs text-right',
                            param.changed ? 'text-accent' : 'text-muted',
                          )}
                        >
                          {param.valueB}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
