'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const PdfViewer = dynamic(
  () =>
    import('./pdf-viewer')
      .then((m) => ({ default: m.PdfViewer }))
      .catch(() => ({
        default: ({ onClose }: { onClose: () => void; src: string; initialPage?: number }) => (
          <div className="fixed inset-0 z-50 bg-bg/95 flex items-center justify-center">
            <div className="text-center p-xl">
              <p className="text-muted mb-md">PDF viewer failed to load.</p>
              <button onClick={onClose} className="text-accent hover:underline">Close</button>
            </div>
          </div>
        ),
      })),
  { ssr: false },
);

const PDF_MAP: Record<string, string> = {
  'anu kirk': '/api/references/evolverguide.pdf',
  'dsi manual': '/api/references/Evo_Key_Manual_1.3.pdf',
  'evolver guide': '/api/references/evolverguide.pdf',
  'cascadia manual': '/api/references/cascadia_manual_v1.1.pdf',
  'intellijel': '/api/references/cascadia_manual_v1.1.pdf',
};

function parsePdfRef(reference: string): { pdfPath: string; page: number } | null {
  const lower = reference.toLowerCase();
  let pdfPath: string | null = null;

  for (const [key, path] of Object.entries(PDF_MAP)) {
    if (lower.includes(key)) {
      pdfPath = path;
      break;
    }
  }

  if (!pdfPath) return null;

  const pageMatch = reference.match(/p\.?\s*(\d+)/i);
  const page = pageMatch ? parseInt(pageMatch[1], 10) : 1;

  return { pdfPath, page };
}

interface SourceRefProps {
  reference: string;
  detail?: string;
}

export function SourceRef({ reference, detail }: SourceRefProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const pdfRef = parsePdfRef(reference);

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

  function handleClick() {
    if (pdfRef) {
      setShowPdf(true);
    } else {
      setIsOpen(!isOpen);
    }
  }

  return (
    <>
      <span ref={ref} className="relative inline-block">
        <sup>
          <button
            type="button"
            onClick={handleClick}
            className="text-muted hover:text-accent transition-colors text-xs cursor-pointer"
          >
            [{reference}]
          </button>
        </sup>
        {isOpen && !pdfRef && (
          <span
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-xs bg-surface text-text text-sm p-sm rounded shadow-lg whitespace-nowrap z-50 transition-opacity duration-100 ease-in"
            role="tooltip"
          >
            {detail ?? reference}
          </span>
        )}
      </span>
      {showPdf && pdfRef && (
        <PdfViewer
          src={pdfRef.pdfPath}
          initialPage={pdfRef.page}
          onClose={() => setShowPdf(false)}
        />
      )}
    </>
  );
}
