import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface NoSysexPageProps {
  displayName: string;
  patchesHref: string;
}

export function NoSysexPage({ displayName, patchesHref }: NoSysexPageProps) {
  return (
    <div className="max-w-[480px] mx-auto px-lg pt-3xl text-center">
      <AlertCircle size={48} className="text-muted mx-auto mb-lg" />
      <h1 className="text-2xl font-bold mb-lg">
        {displayName} doesn&apos;t support MIDI SysEx
      </h1>
      <p className="text-base text-muted mb-lg">
        This instrument uses CV/gate patching instead of MIDI program memory.
        Patches are documented with cable routing and knob positions.
      </p>
      <Link
        href={patchesHref}
        className="text-accent underline underline-offset-2 hover:brightness-110"
      >
        Browse {displayName} Patches
      </Link>
    </div>
  );
}
