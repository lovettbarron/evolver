'use client';

import { useEffect, useRef } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel: string;
}

export function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  title,
  body,
  confirmLabel,
  cancelLabel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      confirmRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="bg-surface rounded-[6px] p-lg max-w-[400px] w-full mx-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[20px] font-bold mb-md">{title}</h2>
        <p
          className="text-sm text-muted mb-lg"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <div className="flex items-center justify-end gap-md">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-muted min-h-[44px] px-md transition-colors hover:text-text"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            className="text-sm font-bold bg-accent text-bg min-h-[44px] px-lg rounded-[6px] transition-colors hover:opacity-90"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
