'use client';

import { useEffect, useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { X } from 'lucide-react';
import { EvolverPanel } from '@/components/evolver-panel';
import { CascadiaPanel } from '@/components/cascadia-panel';
import { OctatrackPanel } from '@/components/octatrack-panel';
import { PlaitsPanel } from '@/components/plaits-panel';
import { BeadsPanel } from '@/components/beads-panel';
import { SwellsPanel } from '@/components/swells-panel';
import { IkariePanel } from '@/components/ikarie-panel';
import { JustFriendsPanel } from '@/components/just-friends-panel';

const MermaidRenderer = dynamic(
  () => import('@/components/mermaid-renderer').then((m) => ({ default: m.MermaidRenderer })),
  { ssr: false },
);

interface QuickRefPanelProps {
  content: { label: string; html: string }[];
  isOpen: boolean;
  onClose: () => void;
  instrumentSlug?: string;
}

export function QuickRefPanel({ content, isOpen, onClose, instrumentSlug }: QuickRefPanelProps) {
  const [activeTab, setActiveTab] = useState(0);
  const showPanelTab =
    instrumentSlug === 'evolver' ||
    instrumentSlug === 'cascadia' ||
    instrumentSlug === 'octatrack' ||
    instrumentSlug === 'plaits' ||
    instrumentSlug === 'beads' ||
    instrumentSlug === 'swells' ||
    instrumentSlug === 'ikarie' ||
    instrumentSlug === 'just-friends';
  const isPanelTab = showPanelTab && activeTab === content.length;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-bg/50 z-50 transition-opacity duration-150 ease-in ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-label="Quick reference"
        className={`fixed top-0 right-0 h-full w-[380px] max-w-full bg-surface z-50 shadow-xl transition-transform duration-200 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-lg border-b border-muted/20">
          <h2 className="text-lg font-bold">Quick Reference</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick reference panel"
            className="text-muted hover:text-text transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        {(content.length > 1 || showPanelTab) && (
          <div className="flex gap-sm px-lg pt-md flex-wrap">
            {content.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`text-sm px-md py-xs rounded transition-colors ${
                  activeTab === index && !isPanelTab
                    ? 'bg-bg text-text'
                    : 'text-muted hover:text-text'
                }`}
              >
                {item.label}
              </button>
            ))}
            {showPanelTab && (
              <button
                type="button"
                onClick={() => setActiveTab(content.length)}
                className={`text-sm px-md py-xs rounded transition-colors ${
                  isPanelTab
                    ? 'bg-bg text-text'
                    : 'text-muted hover:text-text'
                }`}
              >
                Panel
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-lg overflow-y-auto h-[calc(100%-120px)]">
          {isPanelTab ? (
            <div className="py-sm">
              {instrumentSlug === 'just-friends' ? (
                <JustFriendsPanel className="w-full" />
              ) : instrumentSlug === 'ikarie' ? (
                <IkariePanel className="w-full" />
              ) : instrumentSlug === 'swells' ? (
                <SwellsPanel className="w-full" />
              ) : instrumentSlug === 'beads' ? (
                <BeadsPanel className="w-full" />
              ) : instrumentSlug === 'plaits' ? (
                <PlaitsPanel className="w-full" />
              ) : instrumentSlug === 'octatrack' ? (
                <OctatrackPanel className="w-full" />
              ) : instrumentSlug === 'cascadia' ? (
                <CascadiaPanel className="w-full" />
              ) : (
                <EvolverPanel className="w-full" />
              )}
            </div>
          ) : (
            <>
              {content.length > 0 && (
                <div
                  className="prose quick-ref-prose"
                  dangerouslySetInnerHTML={{ __html: content[activeTab]?.html ?? '' }}
                />
              )}
              <MermaidRenderer />
            </>
          )}
        </div>
      </div>
    </>
  );
}
