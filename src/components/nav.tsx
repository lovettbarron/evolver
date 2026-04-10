'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Menu, X } from 'lucide-react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Click outside to close
  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        toggleRef.current && !toggleRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen, closeMenu]);

  // Escape key to close
  useEffect(() => {
    if (!menuOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeMenu();
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, closeMenu]);

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
    <>
      <nav className="sticky top-0 z-sticky flex items-center gap-lg px-lg h-[60px] bg-surface-raised border-b border-border shadow-[0_1px_4px_oklch(0_0_0/0.2)]">
        <span className="font-display text-[20px] font-bold text-text tracking-[-0.025em] flex items-center gap-sm hover:text-accent transition-colors duration-150">
          evolver
          {isDemoMode && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-bg bg-accent/80 px-xs py-[1px] rounded">
              Demo
            </span>
          )}
        </span>
        <InstrumentSwitcher instruments={instruments} currentSlug={currentSlug} />
        <SearchBar />
        <button
          ref={toggleRef}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          className="md:hidden ml-auto w-[44px] h-[44px] flex items-center justify-center text-muted hover:text-text transition-colors duration-150 focus:outline-2 focus:outline-accent focus:outline-offset-2"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="hidden md:flex items-center gap-md overflow-x-auto ml-auto">
          {subLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={clsx(
                  'text-sm whitespace-nowrap h-[60px] flex items-center transition-colors duration-150 relative focus:outline-2 focus:outline-accent focus:outline-offset-2',
                  isActive
                    ? 'text-text'
                    : 'text-muted hover:text-text',
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-surface-raised border-b border-border shadow-[0_1px_4px_oklch(0_0_0/0.2)] motion-safe:animate-[slideDown_150ms_ease-out] motion-reduce:animate-none"
          role="navigation"
          aria-label="Navigation menu"
        >
          <div className="flex flex-col px-lg py-sm">
            {subLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={clsx(
                    'text-sm h-[48px] flex items-center transition-colors duration-150 relative pl-md',
                    isActive ? 'text-text' : 'text-muted hover:text-text',
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[24px] bg-accent" aria-hidden="true" />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
