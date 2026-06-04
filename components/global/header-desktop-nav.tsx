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
        className="w-[min(100vw-2rem,44rem)] max-w-none rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
      >
        <ul className="grid grid-cols-2 gap-2">
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
      <NavDropdown label="Our Services" items={ourServicesItems} />
      <NavDropdown label="Products" items={productsItems} />
      <Link href="/blog" className={navLinkClass}>
        News
      </Link>
    </nav>
  );
}
