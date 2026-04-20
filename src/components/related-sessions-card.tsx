import Link from 'next/link';

interface CrossReference {
  moduleSlug: string;
  sessionSlug: string;
  sessionTitle: string;
  moduleName: string;
  reason: string;
}

export function RelatedSessionsCard({ references }: { references: CrossReference[] }) {
  if (references.length === 0) return null;

  return (
    <div className="mt-2xl bg-surface rounded-lg border border-border-subtle p-md">
      <h3 className="text-[20px] font-bold mb-md">Related Sessions</h3>
      <div className="flex flex-col">
        {references.map((ref) => (
          <Link
            key={`${ref.moduleSlug}/${ref.sessionSlug}`}
            href={`/modules/${ref.moduleSlug}/sessions/${ref.sessionSlug}`}
            className="flex items-start justify-between py-sm px-sm rounded hover:bg-surface-raised transition-colors duration-150"
          >
            <div>
              <span className="text-accent text-sm uppercase tracking-wider">
                {ref.moduleName}
              </span>
              <span className="block text-text">{ref.sessionTitle}</span>
            </div>
            <span className="text-muted text-sm ml-md flex-shrink-0">{ref.reason}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
