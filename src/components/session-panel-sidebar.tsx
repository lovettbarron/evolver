'use client';

import { useState } from 'react';
import { EvolverPanel } from './evolver-panel';

interface SessionPanelSidebarProps {
  highlights?: Array<{ controlId: string; color: 'blue' | 'amber' }>;
  activeSections?: string[];
}

export function SessionPanelSidebar({
  highlights,
  activeSections,
}: SessionPanelSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hidden lg:block">
      <div className="hidden lg:flex justify-end px-md py-sm">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm text-accent hover:text-accent/80 transition-colors"
        >
          {isOpen ? 'Hide Panel' : 'Show Panel'}
        </button>
      </div>
      <div
        className="bg-surface overflow-hidden transition-all duration-200 ease-out"
        style={{ width: isOpen ? 400 : 0 }}
      >
        <div className="w-[400px] p-lg">
          <EvolverPanel
            highlights={highlights}
            activeSections={activeSections}
          />
        </div>
      </div>
    </div>
  );
}
