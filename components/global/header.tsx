import Link from 'next/link';

import { HeaderDesktopNav } from '@/components/global/header-desktop-nav';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

/** Place your logo file in `public/` and set this path (e.g. `/logo.png`). */
const LOGO_SRC = '/logo.png';

export function Header() {
  return (
    <header
      className={cn(
        inter.className,
        'sticky top-0 z-50 w-full bg-white shadow-[0_4px_14px_-4px_rgba(15,23,42,0.12),0_2px_6px_-4px_rgba(15,23,42,0.08)]'
      )}
    >
      <div className="container mx-auto flex items-center justify-between max-w-7xl px-4 md:px-6 lg:px-10 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex shrink-0 items-center">
            {/* Plain img so the logo path is easy to swap; prefer next/image if you want optimization. */}
            {/* eslint-disable-next-line @next/next/no-img-element -- explicit requirement: static logo path */}
            <img
              src={LOGO_SRC}
              alt="Your Safety Partners"
              width={200}
              height={64}
              className="h-16 w-auto"
            />
          </Link>
          <HeaderDesktopNav />
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-violet-700 px-[20px] py-[12px] text-base font-medium text-white transition-colors hover:bg-violet-700/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
        >
          Contact Us
        </Link>
      </div>
    </header>
  );
}
