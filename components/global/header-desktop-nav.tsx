'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const navItemBase =
  'text-base font-medium text-gray-700 rounded-md p-2 transition-colors hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2';

const navLinkClass = `${navItemBase} inline-flex items-center`;

const navTriggerClass = cn(
  navItemBase,
  'inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent',
  'data-[state=open]:bg-violet-50 data-[state=open]:text-violet-700'
);

type MegaMenuItem = {
  href: string;
  title: string;
  description: string;
};

type NavDropdownProps = {
  label: string;
  items: MegaMenuItem[];
};

function NavDropdown({ label, items }: NavDropdownProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className={navTriggerClass}>
          {label}
          <ChevronDown className="size-4 shrink-0" aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-[min(100vw-2rem,22rem)] max-w-none rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
      >
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="group block rounded-md p-2 outline-none transition-colors hover:bg-violet-50 focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2"
              >
                <span className="block font-semibold text-gray-800 group-hover:text-violet-700">
                  {item.title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-gray-500 group-hover:text-violet-600">
                  {item.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

const ourServicesItems: MegaMenuItem[] = [
  {
    href: '/industry',
    title: 'Safety Audits & Inspections',
    description:
      'Detailed workplace assessments to identify hazards and ensure compliance with local regulations.',
  },
  {
    href: '/about-us',
    title: 'WHS/OHS Consulting',
    description:
      'Expert advice on developing safety management systems (SMS) and legal compliance frameworks.',
  },
  {
    href: '/features',
    title: 'Risk Assessments',
    description:
      'Formal identification of workplace risks (e.g., SWMS, JSEA) and the development of control measures.',
  },
  {
    href: '/contact',
    title: 'Training & Induction',
    description:
      'On-site or classroom-based safety training, including First Aid, Fire Safety, or Manual Handling.',
  },
  {
    href: '/features',
    title: 'Incident Investigation',
    description:
      'Professional analysis of workplace accidents to determine root causes and prevent recurrence.',
  },
];

const softwareItems: MegaMenuItem[] = [
  {
    href: '/features',
    title: 'Digital Safety Forms',
    description:
      'Mobile-friendly checklists for site inspections, pre-starts, and hazard reporting.',
  },
  {
    href: '/features',
    title: 'Asset & Equipment Tracking',
    description:
      'Tools for managing maintenance schedules, service history, and equipment registers.',
  },
  {
    href: '/compare',
    title: 'Incident Reporting & Analytics',
    description:
      'A dashboard for logging incidents in real-time and generating trend reports.',
  },
  {
    href: '/features',
    title: 'Online Inductions',
    description:
      'A system for workers to complete safety training and site orientations before they arrive.',
  },
];

export function HeaderDesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-6" aria-label="Main">
      <Link href="/about-us" className={navLinkClass}>
        About Us
      </Link>
      <NavDropdown label="Our Services" items={ourServicesItems} />
      <NavDropdown label="Software" items={softwareItems} />
      <Link href="/blog" className={navLinkClass}>
        News
      </Link>
    </nav>
  );
}
