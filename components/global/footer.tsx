import type { ComponentType } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { inter } from "@/lib/fonts/inter";
import { cn } from "@/lib/utils";

/** Match header; swap file in `public/` as needed. */
const LOGO_SRC = "/logo.png";

type SocialIconProps = {
  className?: string;
};

function IconFacebook({ className }: SocialIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconLinkedIn({ className }: SocialIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconX({ className }: SocialIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconInstagram({ className }: SocialIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function IconYoutube({ className }: SocialIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const socialLinks: Array<{
  label: string;
  href: string;
  Icon: ComponentType<SocialIconProps>;
}> = [
  { label: "Facebook", href: "https://www.facebook.com/", Icon: IconFacebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: IconLinkedIn },
  { label: "X", href: "https://x.com/", Icon: IconX },
  { label: "Instagram", href: "https://www.instagram.com/", Icon: IconInstagram },
  { label: "YouTube", href: "https://www.youtube.com/", Icon: IconYoutube },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const iconClass = "size-5 shrink-0 text-[#7b32d0]";
  const linkClass =
    "text-sm text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7b32d0] focus-visible:ring-offset-2 rounded-sm";

  return (
    <footer className={cn(inter.className, "w-full bg-white")}>
      <div className="container mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-[2.5fr_1fr_1fr_1fr] lg:gap-12">
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex w-fit shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element -- matches header logo pattern */}
              <img
                src={LOGO_SRC}
                alt="Your Safety Partners"
                width={200}
                height={64}
                className="h-14 w-auto"
              />
            </Link>
            <ul className="flex flex-col gap-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <MapPin className={iconClass} strokeWidth={1.75} aria-hidden />
                <span>
                  <span className="font-medium text-slate-800">Melbourne Office</span>
                  {" — "}
                  Level 27, 101 Collins Street Melbourne, VIC 3000
                </span>
              </li>
              <li className="flex gap-3">
                <MapPin className={iconClass} strokeWidth={1.75} aria-hidden />
                <span>
                  <span className="font-medium text-slate-800">Sydney Office</span>
                  {" — "}
                  Suite 1046, Ground Level, 100 George St Parramatta, NSW 2150
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className={iconClass} strokeWidth={1.75} aria-hidden />
                <a href="tel:1300033466" className={cn(linkClass, "underline-offset-2 hover:underline")}>
                  1300 033 466
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className={iconClass} strokeWidth={1.75} aria-hidden />
                <a
                  href="mailto:john@yoursafetypartners.com.au"
                  className={cn(linkClass, "underline-offset-2 hover:underline break-all")}
                >
                  john@yoursafetypartners.com.au
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-[#7b32d0]">Product</h3>
            <nav className="flex flex-col gap-2" aria-label="Product">
              <Link href="/pricing" className={linkClass}>
                Pricing
              </Link>
              <Link href="/contact" className={linkClass}>
                Book a demo
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-[#7b32d0]">Support</h3>
            <nav className="flex flex-col gap-2" aria-label="Support">
              <Link href="/faqs" className={linkClass}>
                FAQs
              </Link>
              <Link href="/help-center" className={linkClass}>
                Help Center
              </Link>
              <Link href="/contact" className={linkClass}>
                Contact Us
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-base font-bold text-slate-800">Follow Us</h3>
            <div className="flex flex-wrap items-center gap-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[#7b32d0] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7b32d0] focus-visible:ring-offset-2 rounded-sm"
                >
                  <Icon className="size-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-violet-700 py-4 text-sm text-white md:py-5">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 md:flex-row md:px-6 lg:px-10">
          <p className="text-center md:text-left">
            &copy;YourSafetyPartners {currentYear}. All Rights Reserved
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center md:justify-end">
            <Link
              href="/terms"
              className="text-white underline-offset-2 transition-opacity hover:underline hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#7b32d0] rounded-sm"
            >
              Terms and Conditions
            </Link>
            <span className="text-white/80" aria-hidden>
              |
            </span>
            <Link
              href="/privacy"
              className="text-white underline-offset-2 transition-opacity hover:underline hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#7b32d0] rounded-sm"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
