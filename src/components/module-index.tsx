'use client';

import { useState } from 'react';
import { ModuleCard } from './module-card';
import { WideShell } from '@/components/page-shell';

interface ModuleData {
  slug: string;
  title: string;
  category?: string;
  controlCount?: number;
  jackCount?: number;
  hasNormals?: boolean;
  purpose: string;
}

interface ModuleIndexProps {
  instrumentSlug: string;
  instrumentName: string;
  modules: ModuleData[];
}

const CATEGORY_ORDER = ['sound-source', 'modulator', 'shaper', 'utility'] as const;

const CATEGORY_LABELS: Record<string, string> = {
  'sound-source': 'Sound Sources',
  modulator: 'Modulators',
  shaper: 'Shapers',
  utility: 'Utilities',
};

type FilterValue = 'all' | (typeof CATEGORY_ORDER)[number];

export function ModuleIndex({ instrumentSlug, instrumentName, modules }: ModuleIndexProps) {
  const [filter, setFilter] = useState<FilterValue>('all');

  const filters: FilterValue[] = ['all', ...CATEGORY_ORDER];

  const filteredModules =
    filter === 'all' ? modules : modules.filter((m) => m.category === filter);

  // Group by category for "all" view
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat] ?? cat,
    modules: filteredModules.filter((m) => m.category === cat),
  })).filter((g) => g.modules.length > 0);

  return (
    <WideShell className="lg:px-xl py-2xl">
      <h1 className="text-4xl font-bold leading-[1.1] mb-sm">Modules</h1>
      <p className="text-muted text-sm mb-xl">
        {instrumentName} &mdash; {modules.length} hardware modules
      </p>

      <div className="flex flex-wrap gap-sm mb-2xl">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`py-xs px-md rounded text-sm transition-colors ${
              filter === f
                ? 'bg-accent text-bg font-bold'
                : 'bg-surface text-text border border-transparent hover:border-accent'
            }`}
          >
            {f === 'all' ? 'All' : CATEGORY_LABELS[f] ?? f}
          </button>
        ))}
      </div>

      {filter === 'all' ? (
        <div className="flex flex-col gap-2xl">
          {grouped.map((group) => (
            <section key={group.category}>
              <h2 className="text-[20px] font-bold leading-[1.2] mb-md">
                {group.label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                {group.modules.map((mod) => (
                  <ModuleCard
                    key={mod.slug}
                    instrumentSlug={instrumentSlug}
                    {...mod}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          {filteredModules.map((mod) => (
            <ModuleCard
              key={mod.slug}
              instrumentSlug={instrumentSlug}
              {...mod}
            />
          ))}
        </div>
      )}

      {filteredModules.length === 0 && (
        <div className="text-center py-2xl">
          <h2 className="text-[20px] font-bold leading-[1.2] mb-sm">
            No modules documented yet
          </h2>
          <p className="text-muted text-base">
            Module documentation is coming soon. Check back after the next update.
          </p>
        </div>
      )}
    </WideShell>
  );
}
