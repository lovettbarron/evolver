'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import type { Patch } from '@/lib/content/types';
import { CableRoutingList } from './cable-routing-list';
import { CableRoutingDiagram } from './cable-routing-diagram';
import { KnobSettingsTable } from './knob-settings-table';
import { AudioPreviewPlaceholder } from './audio-preview-placeholder';
import { EvolverPanel } from './evolver-panel';
import { CascadiaPanel } from './cascadia-panel';
import { OctatrackPanel } from './octatrack-panel';
import { resolveCascadiaCableId, getCascadiaCableSignalType } from '@/lib/cascadia-cable-lookup';
import type { CableConnection, KnobSetting } from '@/lib/content/schemas';

interface PatchDetailProps {
  patch: Patch;
  html: string;
  instrumentSlug: string;
  originSession: {
    slug: string;
    title: string;
    number: number;
  } | null;
}

export function PatchDetail({
  patch,
  html,
  instrumentSlug,
  originSession,
}: PatchDetailProps) {
  const hasCableRouting =
    patch.cable_routing &&
    (patch.cable_routing as CableConnection[]).length > 0;
  const hasKnobSettings =
    patch.knob_settings &&
    Object.keys(patch.knob_settings as Record<string, KnobSetting[]>).length >
      0;

  return (
    <div>
      <header className="sticky top-0 z-40 h-[48px] bg-surface flex items-center px-lg border-b border-muted/20">
        <Link
          href={`/instruments/${instrumentSlug}/patches`}
          aria-label="Back to patch list"
          className="flex items-center text-muted hover:text-text transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="text-sm ml-xs">Patches</span>
        </Link>
        <span className="flex-1 text-center text-sm text-muted truncate px-md">
          {patch.name}
        </span>
        <div className="w-[80px]" />
      </header>

      <div className="max-w-[720px] mx-auto px-lg py-2xl">
        <h1 className="text-2xl font-bold mb-sm">{patch.name}</h1>

        <div className="flex items-center gap-sm text-sm mb-lg">
          <span className="uppercase tracking-wider text-accent">
            {patch.type}
          </span>
          {originSession && (
            <>
              <span className="text-muted">-</span>
              <Link
                href={`/instruments/${instrumentSlug}/sessions/${originSession.slug}`}
                className="text-text underline underline-offset-2 hover:text-accent transition-colors"
              >
                Created in Session {originSession.number}:{' '}
                {originSession.title}
              </Link>
            </>
          )}
          {!originSession && patch.instrument !== 'evolver' && (
            <>
              <span className="text-muted">-</span>
              <span className="text-sm text-muted">Standalone</span>
            </>
          )}
        </div>

        {patch.audio_preview && (
          <div className="mb-lg">
            <AudioPreviewPlaceholder />
          </div>
        )}

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {hasCableRouting && (
          <div className="mt-xl">
            <CableRoutingList
              cables={patch.cable_routing as CableConnection[]}
            />
            <CableRoutingDiagram
              cables={patch.cable_routing as CableConnection[]}
            />
          </div>
        )}

        {hasKnobSettings && (
          <div className="mt-xl">
            <KnobSettingsTable
              settings={
                patch.knob_settings as Record<string, KnobSetting[]>
              }
            />
          </div>
        )}

        {instrumentSlug === 'evolver' && (
          <div className="mt-xl">
            <h2 className="text-lg font-bold mb-md">Panel View</h2>
            <EvolverPanel />
          </div>
        )}

        {instrumentSlug === 'cascadia' && (
          <div className="mt-xl">
            <h3 className="text-lg font-semibold mb-md">Panel View</h3>
            <CascadiaPanel
              cables={hasCableRouting
                ? (patch.cable_routing as CableConnection[]).map((c) => ({
                    sourceId: resolveCascadiaCableId(c.source),
                    destId: resolveCascadiaCableId(c.destination),
                    signalType: getCascadiaCableSignalType(resolveCascadiaCableId(c.source)),
                  }))
                : undefined
              }
            />
          </div>
        )}

        {instrumentSlug === 'octatrack' && (
          <div className="mt-xl">
            <h3 className="text-lg font-semibold mb-md">Panel View</h3>
            <OctatrackPanel />
          </div>
        )}
      </div>
    </div>
  );
}
