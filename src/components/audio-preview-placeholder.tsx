import { Volume2 } from 'lucide-react';

export function AudioPreviewPlaceholder() {
  return (
    <div className="bg-surface rounded-[6px] p-md flex items-center gap-sm">
      <Volume2 size={20} className="text-accent" />
      <span className="text-[13px] text-muted">
        Audio preview not yet recorded
      </span>
    </div>
  );
}
