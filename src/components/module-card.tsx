import Link from 'next/link';
import { SpringCard } from '@/components/motion/spring-card';
import { HpOutline } from '@/components/hp-outline';

interface ModuleCardProps {
  slug: string;
  displayName: string;
  manufacturer: string;
  hpWidth: number;
  categories: string[];
  sessionCount: number;
}

export function ModuleCard({ slug, displayName, manufacturer, hpWidth, categories, sessionCount }: ModuleCardProps) {
  return (
    <SpringCard>
      <Link href={`/modules/${slug}`} className="card block">
        <div className="flex flex-col gap-sm">
          <HpOutline hpWidth={hpWidth} />
          <h2 className="font-display text-[20px] font-bold text-text leading-[1.2]">{displayName}</h2>
          <p className="text-sm text-muted">{manufacturer}</p>
          <div className="flex flex-wrap gap-sm">
            {categories.map(cat => (
              <span key={cat} className="text-sm uppercase tracking-[0.05em] text-accent bg-accent/10 rounded-full px-sm py-xs">
                {cat.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
          <p className="text-sm font-mono text-param">{hpWidth}HP / {sessionCount} sessions</p>
          <span className="text-sm text-accent underline underline-offset-2 mt-md">
            Explore {displayName}
          </span>
        </div>
      </Link>
    </SpringCard>
  );
}
