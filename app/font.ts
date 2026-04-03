import { Inter } from 'next/font/google';

/**
 * Inter — loaded via next/font for zero-layout-shift, self-hosted delivery.
 * Exposed as the CSS variable --font-inter so it can be toggled on/off
 * without overriding the default system font stack.
 */
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
