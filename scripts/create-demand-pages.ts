/**
 * Create or update high-intent demand pages in Prismic.
 *
 * Source research:
 * /home/garth/files/code/ysp/seomachine/research/brief-high-intent-google-demand-2026-07-08.md
 *
 * Usage:
 *   pnpm run create-demand-pages
 *   pnpm run create-demand-pages -- --dry-run
 */

import "dotenv/config";
import * as prismic from "@prismicio/client";

import config from "../slicemachine.config.json";

type TextItem = {
  title: string;
  description: string;
};

type WorkflowStep = {
  step_title: string;
  step_description: string;
};

type ContentSection = {
  heading: string;
  paragraph: string;
};

type ComparisonRow = {
  feature: string;
  ysp_position: string;
  alternative_position: string;
};

type Faq = {
  question: string;
  answer: string;
};

type InternalLink = {
  label: string;
  url: string;
};

type DemandPageData = {
  page_type: "core_intent" | "competitor_alternative" | "module_workflow";
  primary_keyword: string;
  search_intent: string;
  title: string;
  subtitle: string;
  trust_statement: string;
  primary_cta_label: string;
  primary_cta_url: string;
  secondary_cta_label: string | null;
  secondary_cta_url: string | null;
  pain_points: TextItem[];
  capabilities: TextItem[];
  workflow_steps: WorkflowStep[];
  content_sections: ContentSection[];
  comparison_rows: ComparisonRow[];
  proof_quote: string | null;
  proof_client_name: string | null;
  proof_case_study: string | null;
  faqs: Faq[];
  internal_links: InternalLink[];
  meta_title: string;
  meta_description: string;
  meta_image: Record<string, never>;
};

type DemandPageContent = {
  uid: string;
  title: string;
  data: DemandPageData;
};

const TRUST_STATEMENT =
  "Built by Australian safety professionals with 30+ years of WHS experience.";

const CORE_CAPABILITIES: TextItem[] = [
  {
    title: "Policies and procedures",
    description: "Keep WHS policies, SOPs and acknowledgements accessible and current.",
  },
  {
    title: "Forms and inspections",
    description: "Digitise recurring checks, forms, photos and inspection evidence.",
  },
  {
    title: "Training records",
    description: "Track inductions, licences, certificates, competencies and refreshers.",
  },
  {
    title: "Hazards and incidents",
    description: "Capture reports, assign actions and keep a close-out trail.",
  },
  {
    title: "Contractor records",
    description: "Manage contractor documents, inductions, insurance and site readiness.",
  },
  {
    title: "Management visibility",
    description: "See what is complete, overdue or unresolved without spreadsheet chasing.",
  },
];

function demoUrl(uid: string) {
  return `/book-a-demo?source=demand&page=${encodeURIComponent(uid)}`;
}

function baseFaqs(productPhrase: string): Faq[] {
  return [
    {
      question: `Is ${productPhrase} built for Australian WHS?`,
      answer:
        "Yes. Your Safety Portal is positioned around Australian WHS/OHS workflows, with setup support from safety consultants who understand local obligations and practical workplace records.",
    },
    {
      question: "Can it replace spreadsheets and paper forms?",
      answer:
        "Yes. The portal is designed to bring forms, inspections, training records, hazards, actions, policies and contractor records into one place so teams are not relying on disconnected spreadsheets, folders and emails.",
    },
    {
      question: "Do you help set it up?",
      answer:
        "Yes. YSP combines software with consultant-led setup so the portal reflects the records, roles, forms and workflows your business actually needs.",
    },
    {
      question: "What is the best next step?",
      answer:
        "Book a demo and walk through the workflows you need to manage. The team can show how the portal would fit your current WHS records and responsibilities.",
    },
  ];
}

const DEMAND_PAGES: DemandPageContent[] = [
  {
    uid: "safetyculture-alternative-australia",
    title: "SafetyCulture Alternative Australia",
    data: {
      page_type: "competitor_alternative",
      primary_keyword: "SafetyCulture alternative Australia",
      search_intent: "Competitor-aware commercial investigation",
      title: "A Practical SafetyCulture Alternative for Australian SMBs",
      subtitle:
        "Manage WHS policies, forms, inspections, training, hazards and contractors in one supported portal built for Australian businesses that need more than inspection checklists.",
      trust_statement: TRUST_STATEMENT,
      primary_cta_label: "Book a SafetyCulture Alternative Demo",
      primary_cta_url: demoUrl("safetyculture-alternative-australia"),
      secondary_cta_label: null,
      secondary_cta_url: null,
      pain_points: [
        {
          title: "Checklist tools can stop short",
          description:
            "Inspections matter, but most businesses also need policies, training records, hazard close-out, contractor evidence and management visibility.",
        },
        {
          title: "Blank platforms need setup time",
          description:
            "A flexible tool still needs forms, workflows, responsibilities and reporting habits before the team gets value from it.",
        },
        {
          title: "Australian WHS context matters",
          description:
            "SMBs need software that fits local WHS language, records and site workflows without enterprise procurement complexity.",
        },
      ],
      capabilities: CORE_CAPABILITIES,
      workflow_steps: [
        {
          step_title: "Map your current records",
          step_description:
            "Start with the inspections, policies, training, hazards and contractor records your business already needs to manage.",
        },
        {
          step_title: "Set up practical workflows",
          step_description:
            "Configure forms, actions, reminders and responsibilities with support from safety consultants.",
        },
        {
          step_title: "Track what needs attention",
          step_description:
            "Give managers visibility over open actions, missing records and overdue follow-up from one portal.",
        },
      ],
      content_sections: [
        {
          heading: "Built for businesses that need more than checklists",
          paragraph:
            "SafetyCulture is well known for inspections and checklists. Your Safety Portal is built for Australian SMBs that need the broader WHS system around those checks: policies, forms, training, hazards, contractors, corrective actions and evidence retrieval.",
        },
        {
          heading: "Expert setup instead of starting from a blank account",
          paragraph:
            "YSP combines software with safety consultant support, so your forms, records and workflows can be shaped around the way your team actually works. That matters when your goal is adoption by supervisors, managers and frontline workers.",
        },
        {
          heading: "A fair comparison for Australian SMBs",
          paragraph:
            "The right choice depends on what you need to manage. If your main problem is inspection capture, a checklist-first tool may be enough. If you need a connected WHS portal with practical setup support, Your Safety Portal is designed for that job.",
        },
      ],
      comparison_rows: [
        {
          feature: "Primary fit",
          ysp_position: "Australian SMB WHS portal with consultant-led setup.",
          alternative_position: "Broad operations platform with strong checklist and inspection recognition.",
        },
        {
          feature: "Records covered",
          ysp_position: "Policies, forms, inspections, training, hazards, contractors and actions.",
          alternative_position: "Often strongest where the buyer is focused on checklist capture and operational inspections.",
        },
        {
          feature: "Implementation",
          ysp_position: "Supported setup around your WHS records and workflows.",
          alternative_position: "More self-configuration may be needed depending on the account and workflow.",
        },
      ],
      proof_quote: null,
      proof_client_name: null,
      proof_case_study: null,
      faqs: baseFaqs("a SafetyCulture alternative"),
      internal_links: [
        { label: "WHS management software", url: "/whs-management-software-australia" },
        { label: "Workplace inspection software", url: "/workplace-inspection-software-australia" },
        { label: "Industries", url: "/industry" },
      ],
      meta_title: "SafetyCulture Alternative Australia | Your Safety Portal",
      meta_description:
        "A practical SafetyCulture alternative for Australian SMBs that need WHS software, expert setup and more than inspection checklists.",
      meta_image: {},
    },
  },
  {
    uid: "whs-management-software-australia",
    title: "WHS Management Software Australia",
    data: {
      page_type: "core_intent",
      primary_keyword: "WHS management software Australia",
      search_intent: "Core category commercial investigation",
      title: "WHS Management Software for Australian SMBs",
      subtitle:
        "Manage policies, forms, inspections, training records, hazards and contractors in one practical WHS portal, set up with support from Australian safety consultants.",
      trust_statement: TRUST_STATEMENT,
      primary_cta_label: "Book a WHS Software Demo",
      primary_cta_url: demoUrl("whs-management-software-australia"),
      secondary_cta_label: null,
      secondary_cta_url: null,
      pain_points: [
        {
          title: "Records are scattered",
          description:
            "Policies, training records, forms, hazards and contractor documents often sit across folders, inboxes and spreadsheets.",
        },
        {
          title: "Actions are hard to close",
          description:
            "Inspections and hazard reports create follow-up, but managers need a simple way to see ownership and overdue actions.",
        },
        {
          title: "Evidence is needed quickly",
          description:
            "Audits, client requests, insurance reviews and regulator visits all require records that are current and easy to retrieve.",
        },
      ],
      capabilities: CORE_CAPABILITIES,
      workflow_steps: [
        {
          step_title: "Bring records together",
          step_description:
            "Move WHS policies, forms, training, hazards, incidents and contractor evidence into one portal.",
        },
        {
          step_title: "Connect records to actions",
          step_description:
            "Assign corrective actions from inspections, incidents and hazard reports so follow-up is visible.",
        },
        {
          step_title: "Review readiness",
          step_description:
            "Use one place to check what is complete, overdue, missing or unresolved.",
        },
      ],
      content_sections: [
        {
          heading: "What WHS management software should include",
          paragraph:
            "A useful WHS system is more than a document library. It should help manage the records and routines that prove safety work is happening: policies, procedures, inspections, training, hazards, incidents, contractors and corrective actions.",
        },
        {
          heading: "Designed for Australian businesses",
          paragraph:
            "Your Safety Portal uses Australian WHS language and practical workplace workflows. It is built for businesses that need proper safety records without turning implementation into a long enterprise software project.",
        },
        {
          heading: "Software plus safety expertise",
          paragraph:
            "The portal is supported by safety consultants who can help set up the forms, responsibilities and reporting habits your team needs. That combination matters when adoption is the real challenge.",
        },
      ],
      comparison_rows: [],
      proof_quote: null,
      proof_client_name: null,
      proof_case_study: null,
      faqs: baseFaqs("WHS management software"),
      internal_links: [
        { label: "WHS software for small business", url: "/whs-software-small-business" },
        { label: "Safety management system software", url: "/safety-management-system-software-australia" },
        { label: "Industries", url: "/industry" },
      ],
      meta_title: "WHS Management Software Australia | Your Safety Portal",
      meta_description:
        "WHS management software for Australian SMBs. Manage policies, forms, inspections, training, hazards and contractors in one practical portal.",
      meta_image: {},
    },
  },
  {
    uid: "whs-software-small-business",
    title: "WHS Software for Small Business",
    data: {
      page_type: "core_intent",
      primary_keyword: "WHS software for small business",
      search_intent: "SMB buyer looking for a right-sized WHS solution",
      title: "WHS Software for Small Businesses That Need Proper Records",
      subtitle:
        "Replace paper, spreadsheets and inbox follow-up with one practical WHS portal for forms, training, hazards, policies, contractors and actions.",
      trust_statement: TRUST_STATEMENT,
      primary_cta_label: "Book a Small Business WHS Demo",
      primary_cta_url: demoUrl("whs-software-small-business"),
      secondary_cta_label: null,
      secondary_cta_url: null,
      pain_points: [
        {
          title: "Spreadsheets stop scaling",
          description:
            "A spreadsheet can track a few records, but it struggles with reminders, evidence, actions and multiple people updating the same information.",
        },
        {
          title: "Owners need confidence",
          description:
            "Small business leaders need to know what has been done, what is overdue and what would be available if someone asks for proof.",
        },
        {
          title: "Enterprise systems are too heavy",
          description:
            "Many SMBs need a practical WHS portal, not a complex EHS rollout designed for large procurement teams.",
        },
      ],
      capabilities: CORE_CAPABILITIES,
      workflow_steps: [
        {
          step_title: "Start with essential records",
          step_description:
            "Set up the forms, policies, training records and hazard workflows your business actually needs.",
        },
        {
          step_title: "Make it usable for staff",
          step_description:
            "Give workers and supervisors simple ways to complete checks, report hazards and access key records.",
        },
        {
          step_title: "Keep management clear",
          step_description:
            "Track overdue items, open actions and missing evidence without manually chasing every update.",
        },
      ],
      content_sections: [
        {
          heading: "Right-sized WHS software for SMBs",
          paragraph:
            "Small businesses still need reliable WHS records, but they rarely need enterprise software complexity. Your Safety Portal gives SMBs a practical way to manage the records that matter day to day.",
        },
        {
          heading: "What small businesses need to track",
          paragraph:
            "Most small businesses need policies, training records, licences, inductions, site checks, incidents, hazards, contractors and corrective actions. The portal brings those records together so they are easier to maintain and retrieve.",
        },
        {
          heading: "Support matters when time is limited",
          paragraph:
            "The software is supported by Australian safety consultants, helping small teams set up usable workflows instead of leaving them to design a safety system from scratch.",
        },
      ],
      comparison_rows: [],
      proof_quote: null,
      proof_client_name: null,
      proof_case_study: null,
      faqs: baseFaqs("WHS software for small business"),
      internal_links: [
        { label: "WHS management software", url: "/whs-management-software-australia" },
        { label: "Hazard reporting app", url: "/hazard-reporting-app-australia" },
        { label: "Training register software", url: "/safety-training-register-software" },
      ],
      meta_title: "WHS Software for Small Business | Your Safety Portal",
      meta_description:
        "WHS software for small businesses that need proper safety records without enterprise complexity. Manage forms, training, hazards and actions.",
      meta_image: {},
    },
  },
  {
    uid: "safety-management-system-software-australia",
    title: "Safety Management System Software Australia",
    data: {
      page_type: "core_intent",
      primary_keyword: "safety management system software Australia",
      search_intent: "Buyer wants a digital safety management system",
      title: "Safety Management System Software for Australian Workplaces",
      subtitle:
        "Turn policies, inspections, training, hazards and corrective actions into a usable daily workflow, not just a folder of safety documents.",
      trust_statement: TRUST_STATEMENT,
      primary_cta_label: "Book a Safety Management System Demo",
      primary_cta_url: demoUrl("safety-management-system-software-australia"),
      secondary_cta_label: null,
      secondary_cta_url: null,
      pain_points: [
        {
          title: "Manual systems go stale",
          description:
            "Paper manuals and static folders can become disconnected from the checks, training and actions happening in the workplace.",
        },
        {
          title: "Evidence is hard to connect",
          description:
            "A safety management system needs records that connect policies, forms, people, risks and actions.",
        },
        {
          title: "Managers need a live view",
          description:
            "The system should show what is current, overdue, missing or unresolved without waiting for manual reports.",
        },
      ],
      capabilities: CORE_CAPABILITIES,
      workflow_steps: [
        {
          step_title: "Build the system around records",
          step_description:
            "Use policies, procedures, forms, inspections, training records and hazard reports as connected parts of the system.",
        },
        {
          step_title: "Capture evidence as work happens",
          step_description:
            "Let staff complete forms, report hazards and acknowledge procedures from the portal.",
        },
        {
          step_title: "Track the follow-up",
          step_description:
            "Assign actions, monitor close-out and retrieve evidence when audits or client reviews require it.",
        },
      ],
      content_sections: [
        {
          heading: "What a safety management system includes",
          paragraph:
            "A practical safety management system includes the policies, procedures, responsibilities, records and review habits that help a business manage WHS risks. Software makes those parts easier to maintain and prove.",
        },
        {
          heading: "Paper system vs software workflow",
          paragraph:
            "A paper system can document what should happen. Software helps the work happen: forms are completed, records are stored, actions are assigned and managers can see what needs attention.",
        },
        {
          heading: "Built around evidence and action",
          paragraph:
            "Your Safety Portal connects safety management system elements to evidence trails, reminders, corrective actions and reporting visibility.",
        },
      ],
      comparison_rows: [],
      proof_quote: null,
      proof_client_name: null,
      proof_case_study: null,
      faqs: baseFaqs("safety management system software"),
      internal_links: [
        { label: "WHS management software", url: "/whs-management-software-australia" },
        { label: "Workplace inspection software", url: "/workplace-inspection-software-australia" },
        { label: "SafetyCulture alternative", url: "/safetyculture-alternative-australia" },
      ],
      meta_title: "Safety Management System Software Australia | YSP",
      meta_description:
        "Safety management system software for Australian businesses. Manage policies, inspections, training, hazards and corrective actions in one WHS portal.",
      meta_image: {},
    },
  },
  {
    uid: "ehs-software-australian-smbs",
    title: "EHS Software for Australian SMBs",
    data: {
      page_type: "core_intent",
      primary_keyword: "EHS software Australia",
      search_intent: "Buyer using global EHS terminology in an Australian WHS context",
      title: "EHS Software for Australian SMBs That Need WHS Workflows",
      subtitle:
        "Capture EHS search demand while giving Australian businesses the WHS records, workflows and consultant support they actually need.",
      trust_statement: TRUST_STATEMENT,
      primary_cta_label: "Book an EHS/WHS Software Demo",
      primary_cta_url: demoUrl("ehs-software-australian-smbs"),
      secondary_cta_label: null,
      secondary_cta_url: null,
      pain_points: [
        {
          title: "Global terms can be confusing",
          description:
            "Australian buyers may search for EHS or HSE software, but the local operating language is usually WHS or OHS.",
        },
        {
          title: "Enterprise EHS can be too much",
          description:
            "SMBs often need practical worker safety records and actions, not a large global platform rollout.",
        },
        {
          title: "Local setup matters",
          description:
            "The portal should fit Australian WHS workflows, staff roles and evidence requirements.",
        },
      ],
      capabilities: CORE_CAPABILITIES,
      workflow_steps: [
        {
          step_title: "Translate EHS needs into WHS records",
          step_description:
            "Identify the policies, forms, inspections, training, hazards and contractor records your Australian business needs.",
        },
        {
          step_title: "Configure practical workflows",
          step_description:
            "Set up the portal around local responsibilities, evidence and day-to-day safety routines.",
        },
        {
          step_title: "Keep evidence visible",
          step_description:
            "Use one place to manage completion, overdue items, hazards, actions and review readiness.",
        },
      ],
      content_sections: [
        {
          heading: "EHS, HSE, WHS and OHS terminology",
          paragraph:
            "EHS and HSE are common global search terms. In Australia, the workplace safety conversation usually centres on WHS or OHS. Your Safety Portal helps Australian SMBs manage those local safety records and workflows.",
        },
        {
          heading: "A practical alternative to enterprise EHS",
          paragraph:
            "Large EHS platforms can be powerful, but many SMBs need something easier to implement, easier for supervisors to use and supported by people who understand Australian workplaces.",
        },
        {
          heading: "One portal for the daily WHS system",
          paragraph:
            "Use the portal for policies, inspections, forms, training, hazards, contractors, corrective actions and management reporting.",
        },
      ],
      comparison_rows: [
        {
          feature: "Terminology fit",
          ysp_position: "Australian WHS/OHS language and workflows.",
          alternative_position: "Global EHS/HSE terminology may need translation into local practice.",
        },
        {
          feature: "Implementation fit",
          ysp_position: "Consultant-led setup for SMB adoption.",
          alternative_position: "Enterprise EHS tools can require heavier implementation and administration.",
        },
      ],
      proof_quote: null,
      proof_client_name: null,
      proof_case_study: null,
      faqs: baseFaqs("EHS software for Australian SMBs"),
      internal_links: [
        { label: "WHS management software", url: "/whs-management-software-australia" },
        { label: "WHS software for small business", url: "/whs-software-small-business" },
        { label: "Industries", url: "/industry" },
      ],
      meta_title: "EHS Software Australia for SMBs | Your Safety Portal",
      meta_description:
        "EHS software for Australian SMBs, translated into practical WHS workflows for policies, forms, inspections, training, hazards and contractors.",
      meta_image: {},
    },
  },
  {
    uid: "swms-software-australia",
    title: "Digital SWMS Software Australia",
    data: {
      page_type: "module_workflow",
      primary_keyword: "SWMS software Australia",
      search_intent: "High-intent construction and trades buyer",
      title: "Digital SWMS Software for Australian Construction and Trades",
      subtitle:
        "Keep SWMS connected to site inductions, inspections, training records, hazards and corrective actions in one practical WHS portal.",
      trust_statement: TRUST_STATEMENT,
      primary_cta_label: "Book a SWMS Software Demo",
      primary_cta_url: demoUrl("swms-software-australia"),
      secondary_cta_label: null,
      secondary_cta_url: null,
      pain_points: [
        {
          title: "SWMS are often isolated",
          description:
            "A SWMS document does not prove workers can access it, understand it or complete related checks and actions.",
        },
        {
          title: "High-risk work changes",
          description:
            "Construction and trade teams need SWMS evidence that can keep pace with sites, crews, contractors and changed work.",
        },
        {
          title: "Managers need proof",
          description:
            "Site teams need a simple way to show access, sign-off, inspections, hazards and corrective action records.",
        },
      ],
      capabilities: [
        { title: "SWMS access", description: "Keep SWMS available with related sign-off and evidence records." },
        { title: "Site inspections", description: "Complete site, height, scaffold, roofing and trade checks from the field." },
        { title: "Worker inductions", description: "Track site readiness, licences, inductions and role-based training." },
        { title: "Hazard reporting", description: "Capture hazards and photos from site before they get lost in messages." },
        { title: "Corrective actions", description: "Assign actions from checks and track close-out." },
        { title: "Construction visibility", description: "See what is current, overdue or unresolved across sites." },
      ],
      workflow_steps: [
        {
          step_title: "Make SWMS accessible",
          step_description:
            "Keep SWMS records connected to worker access, acknowledgement and site readiness evidence.",
        },
        {
          step_title: "Run related site checks",
          step_description:
            "Use mobile forms for site inspections, scaffold checks, working at heights and other high-risk work evidence.",
        },
        {
          step_title: "Close the loop",
          step_description:
            "Assign corrective actions from inspections and hazard reports, then track completion.",
        },
      ],
      content_sections: [
        {
          heading: "A SWMS template is not the whole workflow",
          paragraph:
            "A SWMS is important, but the practical WHS work continues after the document is created. Workers need access, supervisors need checks, hazards need actions and managers need evidence.",
        },
        {
          heading: "Built for construction and trades",
          paragraph:
            "Use Your Safety Portal for high-risk construction work, scaffolding, roofing, field service, contractor records, inductions and site inspection evidence.",
        },
        {
          heading: "Connected to the construction industry page",
          paragraph:
            "This workflow supports the broader construction and trades safety page, where SWMS, inspections, inductions, training records, hazards and contractor management all fit together.",
        },
      ],
      comparison_rows: [],
      proof_quote: null,
      proof_client_name: null,
      proof_case_study: null,
      faqs: baseFaqs("SWMS software"),
      internal_links: [
        { label: "Construction and trades", url: "/industry/construction-trades" },
        { label: "Workplace inspection software", url: "/workplace-inspection-software-australia" },
        { label: "Hazard reporting app", url: "/hazard-reporting-app-australia" },
      ],
      meta_title: "SWMS Software Australia | Your Safety Portal",
      meta_description:
        "Digital SWMS software for Australian construction and trades. Connect SWMS access with inspections, inductions, hazards and corrective actions.",
      meta_image: {},
    },
  },
  {
    uid: "hazard-reporting-app-australia",
    title: "Hazard Reporting App Australia",
    data: {
      page_type: "module_workflow",
      primary_keyword: "hazard reporting app Australia",
      search_intent: "Buyer wants a simple mobile hazard reporting workflow",
      title: "Hazard Reporting App for Australian SMBs",
      subtitle:
        "Let staff report hazards from any device, add notes or photos, assign corrective actions and track close-out in one WHS portal.",
      trust_statement: TRUST_STATEMENT,
      primary_cta_label: "See Hazard Reporting in a Demo",
      primary_cta_url: demoUrl("hazard-reporting-app-australia"),
      secondary_cta_label: null,
      secondary_cta_url: null,
      pain_points: [
        {
          title: "Hazards disappear in messages",
          description:
            "A text, email or verbal report is easy to miss and hard to track through to close-out.",
        },
        {
          title: "Photos and context matter",
          description:
            "Workers need a simple way to capture what they saw, where it happened and what needs attention.",
        },
        {
          title: "Actions need owners",
          description:
            "A hazard report only reduces risk when someone owns the follow-up and managers can see progress.",
        },
      ],
      capabilities: [
        { title: "Mobile hazard reports", description: "Report hazards from site, floor, store or office workflows." },
        { title: "Photos and notes", description: "Capture context while the issue is visible." },
        { title: "Corrective actions", description: "Assign owners and track close-out." },
        { title: "Hazard register", description: "Keep a searchable record of reports and outcomes." },
        { title: "Manager visibility", description: "See open, overdue and unresolved hazards." },
        { title: "Connected WHS records", description: "Link hazards with inspections, incidents, training and actions." },
      ],
      workflow_steps: [
        {
          step_title: "Report the hazard",
          step_description:
            "Workers capture the issue with notes and supporting details from any device.",
        },
        {
          step_title: "Assign the action",
          step_description:
            "Managers or supervisors assign follow-up and keep responsibility clear.",
        },
        {
          step_title: "Track close-out",
          step_description:
            "The hazard record shows what happened, who followed up and whether the issue is resolved.",
        },
      ],
      content_sections: [
        {
          heading: "Why hazard reports get missed",
          paragraph:
            "Hazard reports often start in the right place but end up scattered across emails, notebooks, photos and conversations. A hazard reporting app keeps the record and follow-up together.",
        },
        {
          heading: "Built for practical Australian workplaces",
          paragraph:
            "Use the workflow across warehouses, construction sites, manufacturing floors, retail stores, offices, schools and community workplaces.",
        },
        {
          heading: "More than a form",
          paragraph:
            "The report is only the beginning. Your Safety Portal connects hazard reporting to corrective actions, registers, evidence and management visibility.",
        },
      ],
      comparison_rows: [],
      proof_quote: null,
      proof_client_name: null,
      proof_case_study: null,
      faqs: baseFaqs("a hazard reporting app"),
      internal_links: [
        { label: "WHS management software", url: "/whs-management-software-australia" },
        { label: "Workplace inspection software", url: "/workplace-inspection-software-australia" },
        { label: "Construction and trades", url: "/industry/construction-trades" },
      ],
      meta_title: "Hazard Reporting App Australia | Your Safety Portal",
      meta_description:
        "A hazard reporting app for Australian SMBs. Staff can report hazards from any device while managers assign actions and track close-out.",
      meta_image: {},
    },
  },
  {
    uid: "workplace-inspection-software-australia",
    title: "Workplace Inspection Software Australia",
    data: {
      page_type: "module_workflow",
      primary_keyword: "workplace inspection software Australia",
      search_intent: "Buyer wants digital inspections, checklists, scheduling and reports",
      title: "Workplace Inspection Software for Australian Businesses",
      subtitle:
        "Schedule inspections, complete checks from any device, capture photo evidence, assign corrective actions and keep reports in one WHS portal.",
      trust_statement: TRUST_STATEMENT,
      primary_cta_label: "Book an Inspection Software Demo",
      primary_cta_url: demoUrl("workplace-inspection-software-australia"),
      secondary_cta_label: null,
      secondary_cta_url: null,
      pain_points: [
        {
          title: "Paper forms are hard to manage",
          description:
            "Completed forms can sit in folders or inboxes while actions and overdue checks remain unclear.",
        },
        {
          title: "Recurring checks need rhythm",
          description:
            "Workplaces need a practical way to keep daily, weekly, monthly and site-specific checks visible.",
        },
        {
          title: "Inspections create actions",
          description:
            "The important part is not just capturing the form. It is assigning and closing out what the form finds.",
        },
      ],
      capabilities: [
        { title: "Digital inspection forms", description: "Complete workplace, site, equipment and area checks from any device." },
        { title: "Scheduling and reminders", description: "Keep recurring checks visible for supervisors and managers." },
        { title: "Photo evidence", description: "Capture supporting evidence while the issue is on site." },
        { title: "Corrective actions", description: "Assign follow-up directly from inspection findings." },
        { title: "Inspection history", description: "Keep a clear record of completed, missed and overdue checks." },
        { title: "Exportable evidence", description: "Retrieve inspection evidence for audits, clients or internal reviews." },
      ],
      workflow_steps: [
        {
          step_title: "Set the inspection",
          step_description:
            "Build the form and schedule the check around the workplace, equipment or site risk.",
        },
        {
          step_title: "Complete from the field",
          step_description:
            "Supervisors complete checks, add photos and flag issues from any device.",
        },
        {
          step_title: "Close out findings",
          step_description:
            "Assign corrective actions and track whether issues are complete, overdue or unresolved.",
        },
      ],
      content_sections: [
        {
          heading: "Digital inspections vs paper forms",
          paragraph:
            "Paper forms capture information, but they do not automatically show what is overdue, what needs action or where evidence sits. Digital inspection software makes the inspection part of the broader WHS workflow.",
        },
        {
          heading: "Inspection examples by industry",
          paragraph:
            "Use inspections for warehouse checks, forklift pre-starts, construction site checks, factory inspections, retail store checks, office inspections, contractor reviews and equipment checks.",
        },
        {
          heading: "Connected to actions and records",
          paragraph:
            "Your Safety Portal connects inspections to corrective actions, hazard reporting, training records, policies and management visibility.",
        },
      ],
      comparison_rows: [],
      proof_quote: null,
      proof_client_name: null,
      proof_case_study: null,
      faqs: baseFaqs("workplace inspection software"),
      internal_links: [
        { label: "SafetyCulture alternative", url: "/safetyculture-alternative-australia" },
        { label: "Hazard reporting app", url: "/hazard-reporting-app-australia" },
        { label: "Warehousing and logistics", url: "/industry/warehousing-logistics-transport" },
      ],
      meta_title: "Workplace Inspection Software Australia | YSP",
      meta_description:
        "Workplace inspection software for Australian businesses. Schedule checks, capture photo evidence, assign actions and keep reports in one WHS portal.",
      meta_image: {},
    },
  },
  {
    uid: "safety-training-register-software",
    title: "Safety Training Register Software",
    data: {
      page_type: "module_workflow",
      primary_keyword: "safety training register software",
      search_intent: "Buyer needs training records, inductions, certificates and expiry tracking",
      title: "Safety Training Register Software for Australian Workplaces",
      subtitle:
        "See who is trained, who is overdue and which licences, certificates or inductions need attention in one practical WHS portal.",
      trust_statement: TRUST_STATEMENT,
      primary_cta_label: "See the Training Register in a Demo",
      primary_cta_url: demoUrl("safety-training-register-software"),
      secondary_cta_label: null,
      secondary_cta_url: null,
      pain_points: [
        {
          title: "Training spreadsheets go stale",
          description:
            "Manual registers can miss expired licences, overdue refreshers and incomplete inductions.",
        },
        {
          title: "Evidence is split across files",
          description:
            "Certificates, sign-offs, licences and training notes often sit in separate folders or inboxes.",
        },
        {
          title: "Managers need readiness visibility",
          description:
            "Before someone starts work, managers need to know whether training and competency records are current.",
        },
      ],
      capabilities: [
        { title: "Training matrix", description: "Track required and completed training by worker, role or site." },
        { title: "Induction records", description: "Keep onboarding and site induction evidence together." },
        { title: "Licence and certificate tracking", description: "Track expiry dates and renewal needs." },
        { title: "Policy sign-offs", description: "Record acknowledgements for procedures and safety communication." },
        { title: "Refresher visibility", description: "See overdue or upcoming training requirements." },
        { title: "Evidence retrieval", description: "Find training proof quickly during audits, tenders or client reviews." },
      ],
      workflow_steps: [
        {
          step_title: "Build the register",
          step_description:
            "Set up required training, licences, certificates, inductions and policies by role or team.",
        },
        {
          step_title: "Attach evidence",
          step_description:
            "Keep certificates, licences, sign-offs and training records together.",
        },
        {
          step_title: "Monitor readiness",
          step_description:
            "See who is current, who is overdue and which records need renewal.",
        },
      ],
      content_sections: [
        {
          heading: "Training records are part of WHS evidence",
          paragraph:
            "Training records help show that workers have been inducted, briefed, licensed or trained for the work they do. A register makes those records easier to maintain and retrieve.",
        },
        {
          heading: "From spreadsheet to live register",
          paragraph:
            "A live training register helps managers see overdue items and upcoming renewals without relying on manual spreadsheet checks.",
        },
        {
          heading: "Connected to policies, inductions and site readiness",
          paragraph:
            "Your Safety Portal connects training records with policy acknowledgements, inductions, contractor records and operational workflows.",
        },
      ],
      comparison_rows: [],
      proof_quote: null,
      proof_client_name: null,
      proof_case_study: null,
      faqs: baseFaqs("safety training register software"),
      internal_links: [
        { label: "WHS software for small business", url: "/whs-software-small-business" },
        { label: "Manufacturing and industrial", url: "/industry/manufacturing-industrial" },
        { label: "Community and education", url: "/industry/community-education-training" },
      ],
      meta_title: "Safety Training Register Software | Your Safety Portal",
      meta_description:
        "Safety training register software for Australian workplaces. Track inductions, licences, certificates, policy sign-offs and overdue training.",
      meta_image: {},
    },
  },
];

const isDryRun = process.argv.includes("--dry-run");

function report(event: prismic.MigrateReporterEvents) {
  if (event.type === "documents:creating") {
    console.log(
      `  Creating ${event.data.current}/${event.data.total}: ${event.data.document.title}`,
    );
  }

  if (event.type === "documents:updating") {
    console.log(
      `  Updating ${event.data.current}/${event.data.total}: ${event.data.document.title}`,
    );
  }
}

async function upsertDemandPages() {
  const writeToken = process.env.PRISMIC_MIGRATION_TOKEN;

  if (!writeToken) {
    console.error("Error: PRISMIC_MIGRATION_TOKEN not found in environment variables");
    console.log("Add it to .env as PRISMIC_MIGRATION_TOKEN=your_token_here");
    process.exit(1);
  }

  const client = prismic.createWriteClient<any>(config.repositoryName, {
    writeToken,
  });
  const migration = prismic.createMigration<any>();

  console.log(`${isDryRun ? "Checking" : "Preparing"} ${DEMAND_PAGES.length} demand pages...\n`);

  for (const page of DEMAND_PAGES) {
    const existingDocument = await client.getByUID("demand_page", page.uid).catch(() => null);

    if (existingDocument) {
      console.log(`- ${page.uid}: update existing document ${existingDocument.id}`);

      if (!isDryRun) {
        migration.updateDocument(
          {
            ...existingDocument,
            data: page.data as any,
            tags: existingDocument.tags ?? [],
          },
          page.title,
        );
      }
    } else {
      console.log(`- ${page.uid}: create new document`);

      if (!isDryRun) {
        migration.createDocument(
          {
            type: "demand_page",
            uid: page.uid,
            lang: "en-us",
            tags: [],
            data: page.data as any,
          },
          page.title,
        );
      }
    }
  }

  if (isDryRun) {
    console.log("\nDry run complete. No Prismic changes were made.");
    return;
  }

  await client.migrate(migration, { reporter: report });

  console.log("\nDemand page migration complete.");
  console.log("Next steps:");
  console.log("1. Review the created/updated Demand Page documents in Prismic.");
  console.log("2. Publish the migration release when the content is ready.");
  console.log("3. Check each root URL listed in the high-intent Google demand brief.");
}

upsertDemandPages().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
