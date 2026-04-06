'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface InstrumentSwitcherProps {
  instruments: Array<{ slug: string; displayName: string; sysex: boolean }>;
  currentSlug: string;
}

export function InstrumentSwitcher({ instruments, currentSlug }: InstrumentSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const currentInstrument = instruments.find((i) => i.slug === currentSlug);
  const triggerLabel = currentInstrument?.displayName ?? 'Select';

  const close = useCallback(() => setIsOpen(false), []);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close]);

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  // Keyboard navigation within dropdown
  function handleDropdownKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return;
    const focusedIndex = itemsRef.current.findIndex((el) => el === document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = focusedIndex < instruments.length - 1 ? focusedIndex + 1 : 0;
      itemsRef.current[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = focusedIndex > 0 ? focusedIndex - 1 : instruments.length - 1;
      itemsRef.current[prev]?.focus();
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Switch instrument"
        className="flex items-center gap-xs text-[14px] text-muted uppercase tracking-wider hover:text-text transition-colors"
      >
        {triggerLabel}
        <ChevronDown
          size={14}
          className={`transition-transform duration-100 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Instruments"
          onKeyDown={handleDropdownKeyDown}
          className="absolute top-full left-0 mt-xs min-w-[200px] bg-surface border border-[color-mix(in_srgb,var(--color-surface)_50%,var(--color-muted))] rounded-md z-50 animate-[fadeIn_100ms_ease-out]"
        >
          {instruments.map((instrument, index) => {
            const isActive = instrument.slug === currentSlug;
            return (
              <Link
                key={instrument.slug}
                ref={(el) => { itemsRef.current[index] = el; }}
                href={`/instruments/${instrument.slug}`}
                role="option"
                aria-selected={isActive}
                aria-label={`Switch to ${instrument.displayName}`}
                onClick={close}
                className={`block text-sm text-text px-md py-sm min-h-[44px] flex items-center transition-colors hover:bg-[color-mix(in_srgb,var(--color-surface)_80%,var(--color-muted))] ${
                  isActive ? 'border-l-2 border-accent' : ''
                }`}
              >
                {instrument.displayName}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
