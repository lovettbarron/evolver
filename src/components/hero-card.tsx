'use client';

import Link from 'next/link';
import { SpringCard } from '@/components/motion/spring-card';

export interface HeroCardProps {
  moduleName: string;
  sessionTitle: string;
  objective: string;
  duration: number;
  href: string;
}

export function HeroCard({ moduleName, sessionTitle, objective, duration, href }: HeroCardProps) {
  return (
    <SpringCard>
      <div className="card card-hero max-w-[480px] w-full">
        <p className="text-muted text-sm uppercase tracking-wide mb-sm">
          {moduleName}
        </p>
        <h2 className="text-4xl font-bold leading-[1.1] mb-md">
          {sessionTitle}
        </h2>
        <p className="text-text text-base mb-md">
          {objective}
        </p>
        <p className="text-muted text-sm mb-lg">
          {duration} min
        </p>
        <Link
          href={href}
          className="inline-flex items-center justify-center bg-accent text-bg font-bold py-md px-xl rounded min-h-[48px] hover:brightness-110 transition-[filter]"
        >
          Start Session
        </Link>
      </div>
    </SpringCard>
  );
}
