'use client';

import { useState, useEffect, useRef } from 'react';

interface SourceRefProps {
  reference: string;
  detail?: string;
}

export function SourceRef({ reference, detail }: SourceRefProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <span ref={ref} className="relative inline-block">
      <sup>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-muted hover:text-accent transition-colors text-xs cursor-pointer"
        >
          [{reference}]
        </button>
      </sup>
      {isOpen && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-xs bg-surface text-text text-sm p-sm rounded shadow-lg whitespace-nowrap z-50 transition-opacity duration-100 ease-in"
          role="tooltip"
        >
          {detail ?? reference}
        </span>
      )}
    </span>
  );
}
