import { clsx } from 'clsx';

export function NarrowShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('max-w-[720px] mx-auto px-lg', className)}>
      {children}
    </div>
  );
}

export function WideShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('max-w-[1200px] mx-auto px-lg', className)}>
      {children}
    </div>
  );
}
