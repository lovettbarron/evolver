import Link from 'next/link';
import { Nav } from '@/components/nav';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-surface px-lg py-lg text-sm text-muted">
        <div className="max-w-[720px] mx-auto flex items-center justify-between">
          <span>Evolver Deep Learning</span>
          <Link
            href="/about"
            className="text-muted hover:text-text underline underline-offset-2"
          >
            About this method
          </Link>
        </div>
      </footer>
    </div>
  );
}
