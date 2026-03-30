'use client';

import { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface PdfViewerProps {
  src: string;
  initialPage?: number;
  onClose: () => void;
}

export function PdfViewer({ src, initialPage = 1, onClose }: PdfViewerProps) {
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [numPages, setNumPages] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    // Clamp initialPage if it exceeds document length
    if (initialPage > numPages) {
      setPageNumber(numPages);
    }
  }

  const goToPrevPage = useCallback(() => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setPageNumber((prev) => (numPages ? Math.min(numPages, prev + 1) : prev));
  }, [numPages]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      } else if (e.key === 'ArrowRight') {
        goToNextPage();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goToPrevPage, goToNextPage]);

  return (
    <div className="fixed inset-0 z-50 bg-bg/95 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-md py-sm border-b border-surface">
        <div className="flex items-center gap-sm">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="text-muted hover:text-text disabled:opacity-30 transition-colors p-xs"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-muted text-sm font-mono">
            Page {pageNumber}{numPages ? ` of ${numPages}` : ''}
          </span>
          <button
            onClick={goToNextPage}
            disabled={numPages !== null && pageNumber >= numPages}
            className="text-muted hover:text-text disabled:opacity-30 transition-colors p-xs"
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <button
          onClick={onClose}
          className="text-muted hover:text-text transition-colors p-xs"
          aria-label="Close PDF viewer"
        >
          <X size={20} />
        </button>
      </div>

      {/* PDF display area */}
      <div className="flex-1 overflow-auto flex justify-center py-lg">
        <div className="max-w-[800px] mx-auto">
          <Document
            file={src}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="text-muted text-sm p-xl">Loading PDF...</div>
            }
            error={
              <div className="text-muted text-sm p-xl">
                Failed to load PDF. Check the file path.
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              width={780}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>
      </div>
    </div>
  );
}
