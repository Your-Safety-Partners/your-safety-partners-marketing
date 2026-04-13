import { Inter } from 'next/font/google';

/** Shared Inter instance — import from here so the font is only registered once. */
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
