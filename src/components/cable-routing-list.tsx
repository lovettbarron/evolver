import type { CableConnection } from '@/lib/content/schemas';

interface CableRoutingListProps {
  cables: CableConnection[];
}

export function CableRoutingList({ cables }: CableRoutingListProps) {
  return (
    <section>
      <div className="flex items-center gap-sm mb-md">
        <h2 className="text-2xl font-bold">Cable Routing</h2>
        <span className="text-sm text-accent">{cables.length} cables</span>
      </div>

      <div className="flex flex-col gap-sm">
        {cables.map((cable, index) => (
          <div key={index} className="bg-surface rounded-[6px] p-lg">
            <div>
              <span className="font-mono text-[13px] text-param">
                {cable.source}
              </span>
              <span className="text-muted"> --&gt; </span>
              <span className="font-mono text-[13px] text-param">
                {cable.destination}
              </span>
            </div>
            <p className="text-[13px] text-muted font-sans mt-xs">
              {cable.purpose}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
