'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const TABS = [
  { segment: '', label: 'Overview' },
  { segment: '/sessions', label: 'Sessions' },
  { segment: '/patches', label: 'Patches' },
  { segment: '/panel', label: 'Panel' },
] as const;

export function ModuleSubNav({ slug }: { slug: string }) {
  const pathname = usePathname();
  const basePath = `/modules/${slug}`;

  return (
    <nav
      className="sticky top-[60px] z-30 bg-surface-raised border-b border-border"
      aria-label="Module sections"
    >
      <div className="max-w-[1200px] mx-auto px-lg flex gap-md h-[48px]">
        {TABS.map((tab) => {
          const href = `${basePath}${tab.segment}`;
          const isActive = tab.segment === ''
            ? pathname === basePath || pathname === `${basePath}/`
            : pathname.startsWith(href);

          return (
            <Link
              key={tab.segment}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className={clsx(
                'text-sm flex items-center h-[48px] relative transition-colors duration-150',
                isActive ? 'text-text' : 'text-muted hover:text-text',
              )}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" aria-hidden="true" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
