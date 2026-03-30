'use client';

import { clsx } from 'clsx';

interface StatusIndicatorProps {
  status: 'unsupported' | 'detecting' | 'disconnected' | 'connected';
  deviceName: string | null;
}

const statusText: Record<StatusIndicatorProps['status'], string> = {
  unsupported: 'Web MIDI not supported',
  detecting: 'Detecting MIDI devices...',
  disconnected: 'No MIDI device detected',
  connected: 'Connected',
};

export function StatusIndicator({ status, deviceName }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-sm" aria-live="polite">
      <span
        className={clsx(
          'inline-block w-[8px] h-[8px] rounded-full shrink-0',
          status === 'connected' ? 'bg-accent' : 'bg-muted',
          status === 'detecting' && 'animate-pulse',
        )}
      />
      <span className={clsx('text-sm', status === 'connected' ? 'text-text' : 'text-muted')}>
        {status === 'connected' && deviceName
          ? <><span className="text-muted">Connected:</span>{' '}<span className="font-mono">{deviceName}</span></>
          : statusText[status]}
      </span>
    </div>
  );
}
