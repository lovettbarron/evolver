'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { InstrumentSwitcher } from '@/components/instrument-switcher';
import { SearchBar } from '@/components/search-bar';

interface NavInstrument {
  slug: string;
  displayName: string;
  sysex: boolean;
}

export function Nav({
  isDemoMode,
  instruments,
}: {
  isDemoMode?: boolean;
  instruments: NavInstrument[];
}) {
  const pathname = usePathname();

  // Extract current instrument slug from URL pattern /instruments/{slug}/...
  const slugMatch = pathname.match(/\/instruments\/([^/]+)/);
  const currentSlug = slugMatch ? slugMatch[1] : '';

  // Find current instrument capabilities
  const currentInstrument = instruments.find((i) => i.slug === currentSlug);

  // Build dynamic sub-links based on current instrument
  const subLinks: Array<{ href: string; label: string }> = [{ href: '/', label: 'Home' }];

  if (currentSlug) {
    subLinks.push({ href: `/instruments/${currentSlug}/sessions`, label: 'Sessions' });
    subLinks.push({ href: `/instruments/${currentSlug}/patches`, label: 'Patches' });

    if (currentInstrument?.sysex) {
      subLinks.push({ href: `/instruments/${currentSlug}/midi`, label: 'MIDI' });
    }

    subLinks.push({ href: `/instruments/${currentSlug}/progress`, label: 'Progress' });
  }

  return (
    <nav className="flex items-center gap-lg px-lg h-[48px] bg-surface border-b border-surface">
      <span className="font-mono text-sm text-muted tracking-wider uppercase flex items-center gap-sm">
        evolver
        {isDemoMode && (
          <span className="text-[10px] font-mono uppercase tracking-wider text-bg bg-accent/80 px-xs py-[1px] rounded">
            Demo
          </span>
        )}
      </span>
      <InstrumentSwitcher instruments={instruments} currentSlug={currentSlug} />
      <SearchBar />
      <div className="flex items-center gap-md overflow-x-auto ml-auto">
        {subLinks.map((link) => {
          const isActive =
            link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'text-sm whitespace-nowrap min-h-[48px] flex items-center transition-colors',
                isActive
                  ? 'text-text underline underline-offset-4'
                  : 'text-muted hover:text-text',
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
