'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/instruments/evolver', label: 'Evolver' },
  { href: '/instruments/evolver/sessions', label: 'Sessions' },
  { href: '/instruments/evolver/patches', label: 'Patches' },
  { href: '/instruments/evolver/midi', label: 'MIDI' },
  { href: '/instruments/evolver/progress', label: 'Progress' },
];

export function Nav({ isDemoMode }: { isDemoMode?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-lg px-lg h-[48px] bg-surface border-b border-surface">
      <span className="font-mono text-sm text-muted tracking-wider uppercase mr-auto flex items-center">
        evolver
        {isDemoMode && (
          <span className="text-[10px] font-mono uppercase tracking-wider text-bg bg-accent/80 px-xs py-[1px] rounded ml-sm">
            Demo
          </span>
        )}
      </span>
      <div className="flex items-center gap-md overflow-x-auto">
        {navLinks.map((link) => {
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
