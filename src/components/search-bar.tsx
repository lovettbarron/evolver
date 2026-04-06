'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchData } from '@/components/search-provider';
import { searchItems } from '@/lib/search';
import { SearchDropdown } from '@/components/search-dropdown';

export function SearchBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { sessions, patches } = useSearchData();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract instrument slug from URL
  const instrumentSlug = useMemo(() => {
    const match = pathname.match(/\/instruments\/([^/]+)/);
    return match ? match[1] : '';
  }, [pathname]);

  // Search results
  const results = useMemo(() => {
    if (!query.trim() || !instrumentSlug) {
      return { sessions: [], patches: [] };
    }
    return searchItems(query, sessions, patches, instrumentSlug);
  }, [query, sessions, patches, instrumentSlug]);

  const totalResults = Math.min(results.sessions.length, 4) + Math.min(results.patches.length, 4);

  // Reset focused index when query changes
  useEffect(() => {
    setFocusedIndex(-1);
  }, [query]);

  // Clear search when instrument changes
  useEffect(() => {
    setQuery('');
    setIsOpen(false);
  }, [instrumentSlug]);

  // Click-outside handler
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  // Global / shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === '/' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Build flat result list for Enter navigation
  const getFocusedHref = useCallback((): string | null => {
    if (focusedIndex < 0) return null;
    const sessionSlice = results.sessions.slice(0, 4);
    const patchSlice = results.patches.slice(0, 4);
    if (focusedIndex < sessionSlice.length) {
      const s = sessionSlice[focusedIndex];
      return `/instruments/${instrumentSlug}/sessions/${s.slug}`;
    }
    const patchIdx = focusedIndex - sessionSlice.length;
    if (patchIdx < patchSlice.length) {
      const p = patchSlice[patchIdx];
      return `/instruments/${instrumentSlug}/patches/${p.slug}`;
    }
    return null;
  }, [focusedIndex, results, instrumentSlug]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Escape':
          if (query) {
            setQuery('');
          } else {
            inputRef.current?.blur();
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          setIsOpen(true);
          setFocusedIndex((prev) => Math.min(prev + 1, totalResults - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 1, -1));
          break;
        case 'Enter': {
          const href = getFocusedHref();
          if (href) {
            e.preventDefault();
            router.push(href);
            setIsOpen(false);
            setQuery('');
            inputRef.current?.blur();
          }
          break;
        }
      }
    },
    [query, totalResults, getFocusedHref, router],
  );

  const handleSelect = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    inputRef.current?.blur();
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
    inputRef.current?.focus();
  }, []);

  // Don't render on pages without an instrument
  if (!instrumentSlug) return null;

  const showDropdown = isOpen && query.length >= 1;

  return (
    <div ref={containerRef} className="relative">
      {/* Search icon */}
      <svg
        className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${
          isFocused ? 'text-accent' : 'text-muted'
        }`}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>

      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          setIsFocused(true);
          if (query.length >= 1) setIsOpen(true);
        }}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder="Search sessions & patches..."
        className={`h-[36px] rounded-full bg-surface border border-transparent hover:border-muted/30 focus:border-accent pl-[36px] pr-md text-sm text-text placeholder:text-muted outline-none transition-all duration-200 ease-out ${
          isFocused ? 'w-[320px]' : 'w-[200px]'
        }`}
      />

      {/* Clear button */}
      {query.length > 0 && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text cursor-pointer"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}

      {showDropdown && (
        <SearchDropdown
          sessions={results.sessions}
          patches={results.patches}
          query={query}
          focusedIndex={focusedIndex}
          instrumentSlug={instrumentSlug}
          onSelect={handleSelect}
          onClear={handleClear}
        />
      )}
    </div>
  );
}
