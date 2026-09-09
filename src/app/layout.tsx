import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ReducedMotionProvider } from '@/components/common/ReducedMotionContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Raj - Blockchain Developer',
    template: '%s | Raj',
  },
  description:
    'Blockchain developer building DeFi protocols, on-chain applications, and enterprise distributed ledger solutions across SVM and EVM.',
  openGraph: {
    title: 'Raj - Blockchain Developer',
    description:
      'Building DeFi protocols and on-chain applications across SVM and EVM.',
    type: 'website',
  },
};

import { ConsoleEasterEgg } from '@/components/common/ConsoleEasterEgg';

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning>
        <ReducedMotionProvider>
          <ConsoleEasterEgg />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ReducedMotionProvider>
      </body>
    </html>
  );
}
