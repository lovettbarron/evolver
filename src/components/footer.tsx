import Link from 'next/link';

interface FooterInstrument {
  slug: string;
  displayName: string;
}

export function Footer({
  instruments,
  isDemoMode,
}: {
  instruments: FooterInstrument[];
  isDemoMode?: boolean;
}) {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-[1200px] mx-auto px-lg py-xl">
        <div className="flex flex-col md:flex-row md:justify-between gap-xl">
          {/* Left column: Project identity */}
          <div>
            <p className="text-sm font-bold text-text">Evolver Deep Learning</p>
            <p className="text-sm text-muted mt-xs">Structured instrument mastery</p>
            {isDemoMode && (
              <p className="text-xs text-muted mt-md">
                Demo mode —{' '}
                <a
                  href="https://github.com/lovettbarron/evolver#getting-started"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-text transition-colors duration-150"
                >
                  Run it yourself
                </a>
              </p>
            )}
          </div>

          {/* Right column: Instrument quick-links */}
          <div className="flex flex-col sm:flex-row gap-xl">
            {instruments.map((inst) => (
              <div key={inst.slug}>
                <p className="text-sm font-bold text-muted mb-sm">{inst.displayName}</p>
                <ul className="space-y-xs">
                  <li>
                    <Link
                      href={`/instruments/${inst.slug}/sessions`}
                      className="text-sm text-muted hover:text-text transition-colors duration-150 focus:outline-2 focus:outline-accent focus:outline-offset-2"
                    >
                      Sessions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/instruments/${inst.slug}/patches`}
                      className="text-sm text-muted hover:text-text transition-colors duration-150 focus:outline-2 focus:outline-accent focus:outline-offset-2"
                    >
                      Patches
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
            <div>
              <p className="text-sm font-bold text-muted mb-sm">&nbsp;</p>
              <ul className="space-y-xs">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-muted hover:text-text transition-colors duration-150 focus:outline-2 focus:outline-accent focus:outline-offset-2"
                  >
                    About this method
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
