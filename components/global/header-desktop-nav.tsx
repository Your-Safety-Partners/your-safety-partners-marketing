'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

import {
  mainNavItems,
  type NavMenuItem,
} from '@/components/global/header-nav-data';
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

type NavDropdownProps = {
  label: string;
  items: NavMenuItem[];
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

export function HeaderDesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-6" aria-label="Main">
      {mainNavItems.map((item) =>
        item.type === 'link' ? (
          <Link key={item.href} href={item.href} className={navLinkClass}>
            {item.label}
          </Link>
        ) : (
          <NavDropdown
            key={item.label}
            label={item.label}
            items={item.items}
            columns={item.columns}
          />
        )
      )}
    </nav>
  );
}
