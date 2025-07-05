import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/teme-provider';
import './globals.css';
import { ConvexClientProvider } from './providers/convex-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Zention',
  description: 'Your every little workspace managed in a little space',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo.svg',
        href: '/logo.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.svg',
        href: '/logo-dark.svg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
          <ThemeProvider
            attribute={'class'}
            defaultTheme={'system'}
            enableSystem
            disableTransitionOnChange
            storageKey={'zention-theme'}
          >
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
