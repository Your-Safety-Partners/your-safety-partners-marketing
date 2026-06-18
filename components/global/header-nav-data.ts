import { getModulePath } from '@/lib/module-routes';

export type NavMenuItem = {
  href: string;
  title: string;
  description: string;
};

export const PORTAL_LOGIN_URL = 'https://app.yoursafetyportal.com.au/login';

export const solutionsItems: NavMenuItem[] = [
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

export const productsItems: NavMenuItem[] = [
  {
    href: getModulePath('policies'),
    title: 'Policies & Procedures',
    description:
      'One hub for workplace policies and procedures — always current, no shared drives.',
  },
  {
    href: getModulePath('forms'),
    title: 'Forms',
    description:
      'Digital forms from sign-offs to audits and risk assessments — any device, no login.',
  },
  {
    href: getModulePath('inspections'),
    title: 'Inspections',
    description:
      'Schedule and track inspections with auto-escalation and exportable reports.',
  },
  {
    href: getModulePath('training'),
    title: 'Training',
    description:
      'Inductions, e-learning, and licence tracking — always know who is up to date.',
  },
  {
    href: getModulePath('hazards'),
    title: 'Hazards',
    description:
      'Log hazards and incidents, assign actions, and track through to close-out.',
  },
  {
    href: getModulePath('contractors'),
    title: 'Contractors',
    description:
      'Inductions, insurance, and compliance — know who is on site and current.',
  },
];

export type NavLinkItem = {
  type: 'link';
  href: string;
  label: string;
};

export type NavDropdownItem = {
  type: 'dropdown';
  label: string;
  items: NavMenuItem[];
  columns?: 1 | 2;
};

export type NavItem = NavLinkItem | NavDropdownItem;

export const mainNavItems: NavItem[] = [
  { type: 'link', href: '/about-us', label: 'About Us' },
  {
    type: 'dropdown',
    label: 'Solutions',
    items: solutionsItems,
    columns: 1,
  },
  { type: 'dropdown', label: 'Products', items: productsItems, columns: 2 },
];
