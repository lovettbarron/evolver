import { Inter, JetBrains_Mono } from 'next/font/google';
import { AppShell } from '@/components/app-shell';
import { loadConfig } from '@/lib/config';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Evolver - Instrument Deep Learning',
  description: 'ADHD-friendly structured instrument mastery',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const config = await loadConfig();
  const isDemoMode = !config.vaultPath;

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <AppShell isDemoMode={isDemoMode}>{children}</AppShell>
      </body>
    </html>
  );
}
