import type { Metadata } from "next";

export const BRAND_NAME = "Your Safety Portal";
export const SITE_URL = "https://www.yoursafetyportal.com.au";

export type PageSeo = {
  title: string;
  description: string;
};

export const PAGE_SEO: Record<string, PageSeo> = {
  home: {
    title: "Your Safety Portal - OHS/WHS Online Safety Management Software",
    description:
      "Manage policies, training, forms, inspections, hazards & contractors in one platform. Built by safety professionals. WHS-aligned. 100+ Australian businesses.",
  },
  "about-us": {
    title: "About Your Safety Portal | Built by Safety Professionals",
    description:
      "Meet the team behind Your Safety Portal - 100 years of combined WHS consulting experience, now built into Australia's leading online safety management platform.",
  },
  blog: {
    title: "Blog | Your Safety Portal",
    description:
      "Stay up to date with the latest WHS compliance insights, workplace safety tips, and product updates from the Your Safety Portal team.",
  },
  "book-a-demo": {
    title: "Book a Free Demo | Your Safety Portal",
    description:
      "See Your Safety Portal in action. Book a free 30-minute live walkthrough and discover how our WHS software can simplify compliance for your business.",
  },
  compare: {
    title: "Compare WHS Safety Software | Your Safety Portal",
    description:
      "See how Your Safety Portal compares to other WHS software solutions. Compare features, ease of use, and value to find the right fit for your business.",
  },
  contact: {
    title: "Contact | Your Safety Portal",
    description:
      "Get in touch with the Your Safety Portal team. Book a demo, ask a question, or learn how our WHS management software can work for your business.",
  },
  forms_module: {
    title: "Digital Safety Forms Builder | Your Safety Portal",
    description:
      "Build and deploy digital forms for any workplace need - risk assessments, checklists, sign-offs, and audits. QR code access, no login required.",
  },
  hazard_module: {
    title: "Site Hazard & Incident Register Software | Your Safety Portal",
    description:
      "Log, track, and close out workplace hazards, incidents, and corrective actions in one place. Risk-ranked, assigned, and fully auditable from any device.",
  },
  inspection_module: {
    title: "Workplace Inspection Software | Your Safety Portal",
    description:
      "Schedule, run, and track workplace inspections from any device. Auto-escalate actions, record the full audit trail, and export professional compliance reports.",
  },
  policies_module: {
    title: "Online WHS Policies & Procedures Management | Your Safety Portal",
    description:
      "Centralise all workplace policies and procedures in one place. Version-controlled, linked to training, and accessible on any device. Always current.",
  },
  training_module: {
    title: "Safety Training Management Software | Your Safety Portal",
    description:
      "Deliver and track site inductions, e-learning, licences, and policy sign-offs in one platform. Role-based training automation with full compliance reporting.",
  },
  contractor_module: {
    title: "Contractor Compliance Software | Your Safety Portal",
    description:
      "Know exactly who is site-ready before they arrive on site.",
  },
  features: {
    title: "Software Features | Your Safety Portal",
    description:
      "Explore Your Safety Portal's full feature set - real-time incident reporting, digital training matrix, custom form builder, compliance audits, and more.",
  },
  industry: {
    title: "Industries | Your Safety Portal",
    description:
      "Your Safety Portal adapts to your industry. Explore tailored WHS compliance solutions for construction, manufacturing, healthcare, retail, and more.",
  },
};

export const INDUSTRY_PAGE_SEO: Record<string, PageSeo> = {
  construction: {
    title: "Construction Safety Compliance Software | Your Safety Portal",
    description:
      "Keep construction sites WHS-compliant with digital inspections, contractor management, site inductions, and mobile hazard reporting. Built for site managers.",
  },
  manufacturing: {
    title: "Manufacturing WHS & Safety Software | Your Safety Portal",
    description:
      "Manage factory floor safety with WHS-aligned workflows. Digitise LOTO procedures, track hazards via QR code, and maintain a complete training matrix.",
  },
};

export function getPageSeo(slug: string): PageSeo | undefined {
  return PAGE_SEO[slug];
}

export function getIndustryPageSeo(slug: string): PageSeo | undefined {
  return INDUSTRY_PAGE_SEO[slug];
}

export function formatTitleWithBrand(pageTitle: string): string {
  return `${pageTitle} | ${BRAND_NAME}`;
}

export function canonicalAlternates(path: string): Metadata["alternates"] {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  return {
    canonical: normalized,
  };
}

export function pageMetadata(path: string, seo: PageSeo): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    alternates: canonicalAlternates(path),
  };
}

export const NOINDEX_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: false,
};

export function noindexPageMetadata(path: string, seo: PageSeo): Metadata {
  return {
    ...pageMetadata(path, seo),
    robots: NOINDEX_ROBOTS,
  };
}
