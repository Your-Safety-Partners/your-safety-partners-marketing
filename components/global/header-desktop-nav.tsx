'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
  columns?: 1 | 2;
};

function NavDropdown({ label, items, columns = 2 }: NavDropdownProps) {
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
        className={cn(
          'max-w-none rounded-lg border border-gray-200 bg-white p-2 shadow-lg',
          columns === 1
            ? 'w-[min(100vw-2rem,24rem)]'
            : 'w-[min(100vw-2rem,44rem)]'
        )}
      >
        <ul
          className={cn(
            'grid gap-2',
            columns === 1 ? 'grid-cols-1' : 'grid-cols-2'
          )}
        >
          {items.map((item) => (
            <li key={item.title}>
              <PopoverClose asChild>
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
              </PopoverClose>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

const PORTAL_LOGIN_URL = 'https://app.yoursafetyportal.com.au/login';

const solutionsItems: MegaMenuItem[] = [
  {
    href: PORTAL_LOGIN_URL,
    title: 'WHS Compliance Management',
    description:
      'Manage obligations, policies, audits, and legislative requirements in one system.',
  },
  {
    href: PORTAL_LOGIN_URL,
    title: 'Safety Training & Competency Management',
    description:
      'Manage inductions, training records, competencies, and certification renewals.',
  },
  {
    href: PORTAL_LOGIN_URL,
    title: 'Safety Audits & Inspections',
    description:
      'Detailed workplace assessments to identify hazards and ensure compliance with local regulations.',
  },
];

const productsItems: MegaMenuItem[] = [
  {
    href: '/policies_module',
    title: 'Policies & Procedures',
    description:
      'One hub for workplace policies and procedures — always current, no shared drives.',
  },
  {
    href: '/forms_module',
    title: 'Forms',
    description:
      'Digital forms from sign-offs to audits and risk assessments — any device, no login.',
  },
  {
    href: '/inspection_module',
    title: 'Inspections',
    description:
      'Schedule and track inspections with auto-escalation and exportable reports.',
  },
  {
    href: '/training_module',
    title: 'Training',
    description:
      'Inductions, e-learning, and licence tracking — always know who is up to date.',
  },
  {
    href: '/hazard_module',
    title: 'Hazards',
    description:
      'Log hazards and incidents, assign actions, and track through to close-out.',
  },
  {
    href: '/contractor_module',
    title: 'Contractors',
    description:
      'Inductions, insurance, and compliance — know who is on site and current.',
  },
];

export function HeaderDesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-6" aria-label="Main">
      <Link href="/about-us" className={navLinkClass}>
        About Us
      </Link>
      <NavDropdown label="Solutions" items={solutionsItems} columns={1} />
      <NavDropdown label="Products" items={productsItems} />
      <Link href="/blog" className={navLinkClass}>
        News
      </Link>
    </nav>
  );
}
