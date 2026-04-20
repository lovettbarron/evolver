import Link from 'next/link';

interface SuggestedModule {
  slug: string;
  name: string;
  tagline: string;
  sessionCount: number;
}

interface CategoryGroup {
  category: string;
  categoryLabel: string;
  modules: SuggestedModule[];
}

export function CategorySuggestions({ groups }: { groups: CategoryGroup[] }) {
  if (groups.length === 0) return null;

  return (
    <div className="mt-2xl">
      {groups.map((group) => (
        <div key={group.category} className="mb-lg">
          <h3 className="text-sm uppercase tracking-[0.05em] text-accent mb-sm">
            {group.categoryLabel}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            {group.modules.map((mod) => (
              <Link
                key={mod.slug}
                href={`/modules/${mod.slug}`}
                className="bg-surface rounded-lg border border-border-subtle p-md hover:border-accent transition-colors duration-150"
              >
                <span className="block text-text font-bold">{mod.name}</span>
                <span className="block text-sm text-muted mt-xs">{mod.tagline}</span>
                <span className="block text-sm text-muted mt-xs">{mod.sessionCount} sessions</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
