'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ModuleCard } from '@/components/module-card';

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'vco', label: 'VCO' },
  { value: 'filter', label: 'Filter' },
  { value: 'effects', label: 'Effects' },
  { value: 'modulator', label: 'Modulator' },
  { value: 'function-generator', label: 'Function Generator' },
] as const;

interface ModuleCategoryTabsProps {
  modules: Array<{
    slug: string;
    displayName: string;
    manufacturer: string;
    hpWidth: number;
    categories: string[];
    sessionCount: number;
  }>;
}

export function ModuleCategoryTabs({ modules }: ModuleCategoryTabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCategory = searchParams.get('category') ?? 'all';

  function setCategory(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  }

  const filtered = activeCategory === 'all'
    ? modules
    : modules.filter(m => m.categories.includes(activeCategory));

  return (
    <div>
      <div role="tablist" aria-label="Module categories" className="flex flex-wrap gap-sm mb-md">
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => setCategory(cat.value)}
              className={`rounded-full px-md h-[36px] text-sm transition-colors cursor-pointer ${
                isActive
                  ? 'bg-accent text-bg font-bold'
                  : 'bg-surface-raised text-muted hover:text-text'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-xl">
          {filtered.map(m => (
            <ModuleCard
              key={m.slug}
              slug={m.slug}
              displayName={m.displayName}
              manufacturer={m.manufacturer}
              hpWidth={m.hpWidth}
              categories={m.categories}
              sessionCount={m.sessionCount}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-2xl">
          <h3 className="font-display text-[20px] font-bold text-text">No modules in this category</h3>
          <p className="text-base text-muted mt-sm max-w-[400px] mx-auto">
            Try selecting a different category or browse all modules.
          </p>
        </div>
      )}
    </div>
  );
}
