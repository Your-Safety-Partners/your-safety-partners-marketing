'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';

import {
  mainNavItems,
  type NavDropdownItem,
  type NavLinkItem,
} from '@/components/global/header-nav-data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

const mobileNavTextClass =
  'text-base font-medium text-gray-900 transition-colors hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2';

const mobileLinkClass = cn(mobileNavTextClass, 'block rounded-md px-4 py-3');

const mobileSubLinkClass =
  'block rounded-md px-3 py-2.5 transition-colors hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2';

const sheetContentClass = cn(
  inter.className,
  'flex w-full flex-col border-gray-200 bg-white p-0 text-gray-900 shadow-[0_4px_14px_-4px_rgba(15,23,42,0.12),0_2px_6px_-4px_rgba(15,23,42,0.08)] sm:max-w-sm',
  '[&>button]:rounded-md [&>button]:text-gray-500 [&>button]:hover:bg-gray-100 [&>button]:hover:text-gray-900'
);

function MobileNavLink({ item }: { item: NavLinkItem }) {
  return (
    <SheetClose asChild>
      <Link href={item.href} className={mobileLinkClass}>
        {item.label}
      </Link>
    </SheetClose>
  );
}

function MobileNavDropdown({ section }: { section: NavDropdownItem }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={section.label} className="border-b-0">
        <AccordionTrigger
          className={cn(
            mobileNavTextClass,
            'w-full rounded-md px-4 py-3 hover:no-underline [&>svg]:text-gray-500 [&[data-state=open]]:bg-violet-50 [&[data-state=open]]:text-violet-700'
          )}
        >
          {section.label}
        </AccordionTrigger>
        <AccordionContent className="bg-white px-1 pb-2">
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.title}>
                <SheetClose asChild>
                  <Link href={item.href} className={mobileSubLinkClass}>
                    <span className="block font-semibold text-gray-800">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-gray-500">
                      {item.description}
                    </span>
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function HeaderMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden border-0 bg-transparent text-gray-800 shadow-none hover:bg-violet-700/10 hover:text-violet-700"
          aria-label="Open menu"
        >
          <Menu className="size-5" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className={sheetContentClass}>
        <SheetHeader className="border-b border-gray-200 bg-white px-4 py-4 text-left">
          <SheetTitle className="text-lg font-semibold text-gray-900">
            Menu
          </SheetTitle>
        </SheetHeader>

        <nav
          className="flex-1 overflow-y-auto bg-white px-2 py-2"
          aria-label="Main mobile"
        >
          {mainNavItems.map((item) =>
            item.type === 'link' ? (
              <MobileNavLink key={item.href} item={item} />
            ) : (
              <MobileNavDropdown key={item.label} section={item} />
            )
          )}
        </nav>

        <SheetFooter className="border-t border-gray-200 bg-white p-4">
          <SheetClose asChild>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-md bg-violet-700 px-5 py-3 text-base font-medium text-white transition-colors hover:bg-violet-700/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
            >
              Contact Us
            </Link>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
