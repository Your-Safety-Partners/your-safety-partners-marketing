/**
 * Create or update the Done-With-You WHS System Setup page in Prismic.
 *
 * Source research:
 * /home/garth/files/code/ysp/seomachine/research/brief-referral-partner-channel-done-with-you-whs-2026-07-08.md
 *
 * Usage:
 *   pnpm run create-done-with-you-page
 *   pnpm run create-done-with-you-page -- --dry-run
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

type Faq = {
  question: string;
  answer: string;
};

type InternalLink = {
  label: string;
  url: string;
};

type DemandPageData = {
  page_type: "partner_program";
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
  comparison_rows: [];
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

const PAGE: DemandPageContent = {
  uid: "done-with-you-whs-system-setup",
  title: "Done-With-You WHS System Setup",
  data: {
    page_type: "partner_program",
    primary_keyword: "Done-With-You WHS System Setup",
    search_intent: "Partner and referral channel landing page",
    title: "Done-With-You WHS System Setup for Australian SMBs",
    subtitle:
      "We set up the WHS system your business actually needs: the software, the forms, the inspections, the registers and the staff workflow, with support from experienced Australian safety consultants.",
    trust_statement:
      "Your Safety Partners combines practical WHS consulting experience with software your team can keep using.",
    primary_cta_label: "Book a Partner Call",
    primary_cta_url:
      "/book-a-demo?source=partner&page=done-with-you-whs-system-setup",
    secondary_cta_label: "Refer a Business",
    secondary_cta_url: "/contact?source=partner-referral",
    pain_points: [
      {
        title: "Insurance brokers",
        description:
          "Refer clients who need better WHS evidence around incidents, claims, renewals, risk recommendations, vehicles, equipment or growing operational exposure.",
      },
      {
        title: "HR, IR and employment advisors",
        description:
          "Introduce clients when policies, psychosocial hazards, contractor management, incidents or workplace behaviour issues need a practical WHS system around them.",
      },
      {
        title: "RTOs and training providers",
        description:
          "Give training clients a way to turn inductions, registers, licences, refreshers and supervisor training into maintained workplace routines.",
      },
      {
        title: "Industry associations",
        description:
          "Offer members a practical WHS setup pathway through webinars, health checks, starter packs or industry-specific implementation support.",
      },
      {
        title: "Equipment and workplace service providers",
        description:
          "Help clients manage the WHS system around new plant, PPE, machinery, vehicles, chemicals, maintenance, height safety or workplace services.",
      },
      {
        title: "Safety consultants without SaaS",
        description:
          "Use Your Safety Portal as the software backbone while keeping your consulting relationship and client advisory role intact.",
      },
    ],
    capabilities: [
      {
        title: "WHS gap review",
        description:
          "Identify the practical records, forms, inspections and registers the client needs to manage.",
      },
      {
        title: "Industry-specific setup",
        description:
          "Configure forms, inspections, registers and workflows around the client’s industry and risk profile.",
      },
      {
        title: "Software configuration",
        description:
          "Set up Your Safety Portal so policies, training, hazards, contractors and actions are ready to use.",
      },
      {
        title: "Staff workflow support",
        description:
          "Show managers, supervisors and workers how the system is used day to day.",
      },
      {
        title: "30/60/90 day check-ins",
        description:
          "Support implementation beyond launch so records, forms and actions do not fall back into old habits.",
      },
      {
        title: "Partner handoff process",
        description:
          "Give partners a clear referral path, briefing note and follow-up process so clients are looked after.",
      },
    ],
    workflow_steps: [
      {
        step_title: "Refer the client",
        step_description:
          "A partner introduces an SMB that needs a practical WHS system, not just another blank software account.",
      },
      {
        step_title: "Scope the WHS setup",
        step_description:
          "YSP reviews the client’s records, roles, industry risks and current process to identify what needs to be set up.",
      },
      {
        step_title: "Configure the portal",
        step_description:
          "The software is configured with the forms, inspections, registers, training records, hazards and actions the client needs.",
      },
      {
        step_title: "Walk the team through it",
        step_description:
          "Managers and staff are shown how to use the system so the portal becomes part of the daily WHS workflow.",
      },
      {
        step_title: "Keep it moving",
        step_description:
          "Follow-up check-ins help the business keep records current, actions visible and improvements moving.",
      },
      {
        step_title: "Close the loop with the partner",
        step_description:
          "Partners can receive agreed updates, referral recognition, margin or reciprocal referral support depending on the arrangement.",
      },
    ],
    content_sections: [
      {
        heading: "A safety consulting company with software",
        paragraph:
          "Your Safety Partners is not just a software provider. The offer is software plus practical WHS implementation support: here is the system you need, here are the forms, here are the inspections, here is how your staff use it and here is how we help you keep it current.",
      },
      {
        heading: "Why partners introduce YSP",
        paragraph:
          "WHS buying is trust-heavy. SMB owners usually respond best to a provider that feels practical, local and credible. Brokers, advisors, RTOs, associations, suppliers and consultants already have trusted relationships with businesses that need better safety systems.",
      },
      {
        heading: "Partner options",
        paragraph:
          "The initial partner model can stay simple: referral fee, partner margin or reciprocal referral. The right option depends on the partner’s role, professional obligations and preferred client relationship.",
      },
      {
        heading: "Client package options",
        paragraph:
          "The setup can be packaged as Starter Setup for small businesses that need the basics, Industry Setup for higher-risk SMBs with repeatable operational work, or Partner-Led Setup for referrals through brokers, HR advisors, RTOs, consultants and associations.",
      },
      {
        heading: "Guardrails",
        paragraph:
          "YSP helps clients build and maintain practical WHS systems. Referral arrangements should stay transparent, avoid implying that software alone makes a business compliant, and respect partner obligations in regulated fields such as insurance, legal and employment advice.",
      },
    ],
    comparison_rows: [],
    proof_quote: null,
    proof_client_name: null,
    proof_case_study: null,
    faqs: [
      {
        question: "Who is the Done-With-You WHS setup for?",
        answer:
          "It is for Australian SMBs that need a practical WHS system but do not want to configure a blank platform themselves. It is also for trusted advisors who want a credible implementation partner for clients with WHS record, training, inspection or risk-management gaps.",
      },
      {
        question: "What does the client get?",
        answer:
          "The client gets Your Safety Portal plus expert setup support: WHS gap review, industry-specific forms and inspections, software configuration, staff workflow support and implementation check-ins.",
      },
      {
        question: "What can partners receive?",
        answer:
          "Depending on the relationship, partners can receive a referral fee, partner margin or reciprocal referrals. Any commercial arrangement should be clear, simple and compatible with the partner’s professional obligations.",
      },
      {
        question: "Does this replace legal, insurance or employment advice?",
        answer:
          "No. YSP supports practical WHS systems, records and implementation. Partners should continue providing advice within their own professional scope, and specialist legal, insurance or employment advice should remain with appropriately qualified advisors.",
      },
      {
        question: "How should an existing client refer a similar business?",
        answer:
          "Introduce the business to YSP with a short note about the WHS problem they need to solve. YSP can then run a practical conversation around software, setup and the safety records the business needs to manage.",
      },
    ],
    internal_links: [
      {
        label: "WHS management software",
        url: "/whs-management-software-australia",
      },
      {
        label: "WHS software for small business",
        url: "/whs-software-small-business",
      },
      {
        label: "SafetyCulture alternative",
        url: "/safetyculture-alternative-australia",
      },
      {
        label: "Industries",
        url: "/industry",
      },
    ],
    meta_title: "Done-With-You WHS System Setup | Your Safety Partners",
    meta_description:
      "Refer Australian SMBs that need a practical WHS system. YSP provides safety software plus expert setup for forms, inspections, registers and staff workflows.",
    meta_image: {},
  },
};

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

async function upsertPage() {
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

  console.log(`${isDryRun ? "Checking" : "Preparing"} ${PAGE.uid}...\n`);

  const existingDocument = await client.getByUID("demand_page", PAGE.uid).catch(() => null);

  if (existingDocument) {
    console.log(`- ${PAGE.uid}: update existing document ${existingDocument.id}`);

    if (!isDryRun) {
      migration.updateDocument(
        {
          ...existingDocument,
          data: PAGE.data as any,
          tags: existingDocument.tags ?? [],
        },
        PAGE.title,
      );
    }
  } else {
    console.log(`- ${PAGE.uid}: create new document`);

    if (!isDryRun) {
      migration.createDocument(
        {
          type: "demand_page",
          uid: PAGE.uid,
          lang: "en-us",
          tags: [],
          data: PAGE.data as any,
        },
        PAGE.title,
      );
    }
  }

  if (isDryRun) {
    console.log("\nDry run complete. No Prismic changes were made.");
    return;
  }

  await client.migrate(migration, { reporter: report });

  console.log("\nDone-With-You WHS page migration complete.");
  console.log("Next steps:");
  console.log("1. Review the Demand Page document in Prismic.");
  console.log("2. Publish the migration release when the content is ready.");
  console.log("3. Check /done-with-you-whs-system-setup.");
}

upsertPage().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
