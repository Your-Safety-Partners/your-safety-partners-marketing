/**
 * Create or update Industry pages in Prismic.
 *
 * Source research:
 * /home/garth/files/code/ysp/seomachine/research/brief-*-2026-07-07.md
 *
 * Usage:
 *   pnpm run create-industries
 *   pnpm run create-industries -- --dry-run
 */

import "dotenv/config";
import * as prismic from "@prismicio/client";

import type { IndustryDocument } from "../prismicio-types";
import config from "../slicemachine.config.json";

type IndustryContent = {
  uid: string;
  title: string;
  data: IndustryDocument["data"];
};

const INDUSTRIES: IndustryContent[] = [
  {
    uid: "construction-trades",
    title: "Construction & Trades",
    data: {
      industry_name: "Construction & Trades",
      subtitle:
        "Manage SWMS, site inspections, inductions, training records, hazards, contractors and corrective actions in one practical portal built for Australian builders and trade teams.",
      hero_image: {},
      slices: [],
      key_features: [
        {
          feature_title: "SWMS and site records",
          feature_description:
            "Keep SWMS, site checks, photos and evidence organised for high-risk construction work.",
          feature_icon: null,
        },
        {
          feature_title: "Site inspections",
          feature_description:
            "Run mobile site inspections, roofing checks, scaffold checks and corrective actions from one portal.",
          feature_icon: null,
        },
        {
          feature_title: "Inductions and training",
          feature_description:
            "Track worker inductions, toolbox talks, licences and refresher training before people step on site.",
          feature_icon: null,
        },
        {
          feature_title: "Contractor compliance",
          feature_description:
            "Manage subcontractor records, insurance, sign-offs and site readiness without spreadsheet chasing.",
          feature_icon: null,
        },
        {
          feature_title: "Hazards and actions",
          feature_description:
            "Report hazards from site, assign actions and keep a close-out trail for managers and audits.",
          feature_icon: null,
        },
        {
          feature_title: "Consultant-led setup",
          feature_description:
            "Set up practical construction WHS workflows with safety consultants who understand Australian worksites.",
          feature_icon: null,
        },
      ],
      content_sections: [
        {
          heading: "Built for Australian construction and trade teams",
          paragraph:
            "Construction WHS records often live in too many places: SWMS in folders, site checks on paper, inductions in email threads, training records in spreadsheets and hazard reports in supervisor notebooks. Your Safety Portal brings the working records together so builders, roofing contractors, scaffolding businesses and site-based teams can see what is current, overdue and unresolved.",
        },
        {
          heading: "A SWMS template is not the full safety system",
          paragraph:
            "A SWMS is important, but the document on its own does not prove that workers can access it, understand the controls, complete the related inspections, report hazards, close actions and keep evidence available when work changes. YSP helps connect SWMS access with inspections, inductions, training records, hazards and corrective actions.",
        },
        {
          heading: "Control the site workflows that create risk",
          paragraph:
            "Use the portal for high-risk construction work, working at heights, roofing hazards, scaffolding checks, field service work, contractor records and site inspection evidence. Supervisors can complete forms from site, while managers keep visibility over open actions and missing records.",
        },
        {
          heading: "Practical alternative to templates and enterprise EHS",
          paragraph:
            "Templates help you start. Enterprise platforms can be powerful. Many trade businesses need something simpler to implement and easier for site supervisors to use. Your Safety Portal is built for practical adoption, with safety consultants who understand Australian workplaces.",
        },
        {
          heading: "Relevant client proof: Scaffright",
          paragraph:
            '"With scaffold work moving across active sites, we need inspection records, SWMS access, inductions, hazards and corrective actions to be visible without chasing paper folders or text messages. Your Safety Portal gives our team a clearer way to keep site safety evidence organised and follow actions through."',
        },
        {
          heading: "Mini case study angle: scaffold safety records across active sites",
          paragraph:
            "Scaffright's work depends on keeping safety records current while crews, contractors and site conditions change. A practical case study would focus on replacing scattered scaffold inspection notes, SWMS sign-offs, worker records and action follow-up with one portal for site evidence. Supervisors can capture checks and hazards from the field, actions can be assigned to the right person, and managers can see what is complete, overdue or unresolved across active jobs.",
        },
      ],
      meta_title: "Construction WHS Software Australia | Your Safety Portal",
      meta_description:
        "WHS software for Australian builders and trades. Manage SWMS, inspections, inductions, training, hazards, contractors and actions in one portal.",
      meta_image: {},
    },
  },
  {
    uid: "manufacturing-industrial",
    title: "Manufacturing & Industrial",
    data: {
      industry_name: "Manufacturing & Industrial",
      subtitle:
        "Manage policies, SOPs, inspections, training records, hazards, contractors and corrective actions in one practical portal built for Australian manufacturers.",
      hero_image: {},
      slices: [],
      key_features: [
        {
          feature_title: "Factory inspections",
          feature_description:
            "Digitise factory, plant, equipment and production-floor checks with photo evidence and action tracking.",
          feature_icon: null,
        },
        {
          feature_title: "SOP and policy sign-offs",
          feature_description:
            "Keep WHS policies and SOPs accessible, current and linked to worker acknowledgement records.",
          feature_icon: null,
        },
        {
          feature_title: "Training matrix",
          feature_description:
            "Track worker training, licences, competencies and overdue refreshers across production teams.",
          feature_icon: null,
        },
        {
          feature_title: "Hazard close-out",
          feature_description:
            "Report production-floor hazards, assign corrective actions and keep managers clear on unresolved risks.",
          feature_icon: null,
        },
        {
          feature_title: "Contractor and visitor records",
          feature_description:
            "Manage site inductions, contractor documents and visitor safety records in one place.",
          feature_icon: null,
        },
        {
          feature_title: "Audit-ready evidence",
          feature_description:
            "Find inspections, sign-offs, training records, hazards and actions quickly during audits or customer reviews.",
          feature_icon: null,
        },
      ],
      content_sections: [
        {
          heading: "WHS software for the production floor",
          paragraph:
            "Manufacturing safety records often sit across paper inspection forms, SOP folders, spreadsheets, emails and notebooks. Your Safety Portal gives Australian manufacturers one place to manage policies, SOPs, inspections, training records, hazards, contractors and corrective actions.",
        },
        {
          heading: "Keep plant, machinery and equipment checks visible",
          paragraph:
            "Use digital forms for machine checks, plant inspections, manual handling risks, forklift checks, chemical controls and production-area inspections. Supervisors can complete checks on the floor, and managers can see what is due, overdue and unresolved.",
        },
        {
          heading: "Connect SOPs, training and hazards",
          paragraph:
            "Manufacturing teams usually need more than an inspection app. YSP connects forms to SOP access, policy sign-offs, worker competency records, incident reports, hazard close-out and contractor management.",
        },
        {
          heading: "Built for SMB manufacturers, not enterprise complexity",
          paragraph:
            "Enterprise EHS platforms can be heavy to implement. YSP is built for practical adoption across food production, meat processing, sheetmetal, fabrication, equipment manufacturing and industrial workshops, with setup support from Australian safety consultants.",
        },
        {
          heading: "Relevant client proof: V&V Meats",
          paragraph:
            '"In a production environment, safety records need to be easy for supervisors to use on the floor. Your Safety Portal helps keep inspections, training records, SOP acknowledgements, hazards and corrective actions together so we can follow up issues without relying on separate spreadsheets, paper forms and emails."',
        },
        {
          heading: "Mini case study angle: WHS records for meat production",
          paragraph:
            "V&V Meats is a practical manufacturing proof point because meat production needs WHS records that work around real operational pressure. A passable case study would show production checks, worker training, SOP sign-offs, hazards and corrective actions being managed in one place instead of across clipboards and spreadsheets. The story should stay focused on cleaner record control, easier supervisor follow-up and faster access to evidence for audits or internal reviews.",
        },
      ],
      meta_title: "Manufacturing WHS Software Australia | Your Safety Portal",
      meta_description:
        "WHS software for Australian manufacturers. Manage policies, SOPs, inspections, training, hazards, contractors and actions in one practical portal.",
      meta_image: {},
    },
  },
  {
    uid: "warehousing-logistics-transport",
    title: "Warehousing, Logistics & Transport",
    data: {
      industry_name: "Warehousing, Logistics & Transport",
      subtitle:
        "Manage warehouse inspections, forklift checks, training records, hazards and contractor compliance in one Australian WHS portal built for logistics teams.",
      hero_image: {},
      slices: [],
      key_features: [
        {
          feature_title: "Forklift and warehouse checks",
          feature_description:
            "Run pre-starts, racking checks, loading dock inspections and warehouse safety forms from any device.",
          feature_icon: null,
        },
        {
          feature_title: "Training and licence records",
          feature_description:
            "Track forklift licences, inductions, refreshers and role-based training evidence.",
          feature_icon: null,
        },
        {
          feature_title: "Traffic and loading dock risks",
          feature_description:
            "Capture hazards around vehicle movement, pedestrian separation, loading docks and manual handling.",
          feature_icon: null,
        },
        {
          feature_title: "Driver and contractor compliance",
          feature_description:
            "Keep contractor, visitor and driver records together with site access and induction evidence.",
          feature_icon: null,
        },
        {
          feature_title: "Corrective action tracking",
          feature_description:
            "Assign actions from inspections and hazard reports, then track close-out across busy operations.",
          feature_icon: null,
        },
        {
          feature_title: "Multi-site visibility",
          feature_description:
            "Give managers visibility across warehouses, depots, transport yards and high-turnover teams.",
          feature_icon: null,
        },
      ],
      content_sections: [
        {
          heading: "Built for busy warehouses, depots and transport operations",
          paragraph:
            "Warehouses, depots and transport yards run on movement. Forklifts, vehicles, contractors, drivers, deliveries, racking, loading docks and manual handling all create safety admin that paper forms struggle to keep up with.",
        },
        {
          heading: "Replace scattered records with one WHS portal",
          paragraph:
            "YSP helps logistics and warehouse teams bring clipboards, spreadsheets, inboxes and shared drives into one place for inspections, training records, forms, hazards, policies and contractor compliance.",
        },
        {
          heading: "Control the risks that show up every day",
          paragraph:
            "Use the portal for forklift and pedestrian separation, loading dock risks, traffic movement, manual handling, driver records, contractor inductions, hazard reporting and missed inspection follow-up.",
        },
        {
          heading: "More than a warehouse inspection app",
          paragraph:
            "Inspection apps capture forms. WHS software connects those forms to training records, hazards, contractors, policies, evidence and management visibility, with consultant-led setup to make the workflows practical.",
        },
        {
          heading: "Relevant client proof: AA Semi Trailers",
          paragraph:
            '"Our safety records need to keep up with trailer work, yard activity, contractors and equipment checks. Your Safety Portal gives us one place for pre-starts, inspections, training records, hazards and corrective actions, so managers can see what needs attention without chasing spreadsheets, folders or messages."',
        },
        {
          heading: "Mini case study angle: safety evidence for trailer and transport operations",
          paragraph:
            "AA Semi Trailers is a strong fit for a transport and equipment-focused case study because safety admin is created by everyday operational movement: trailer checks, yard work, workshop activity, contractors and vehicle interactions. A passable case study would show pre-starts, inspection records, training evidence, contractor documents, hazard reports and corrective actions being brought into one portal. The value is simple: equipment checks create actions, actions have owners, and managers can see what is ready, overdue or unresolved before records are needed for a client, regulator or internal review.",
        },
      ],
      meta_title: "Warehouse & Logistics WHS Software | YSP",
      meta_description:
        "Manage warehouse inspections, forklift checks, training records, hazards and contractor compliance in one Australian WHS portal built for logistics teams.",
      meta_image: {},
    },
  },
  {
    uid: "food-beverage-agribusiness",
    title: "Food, Beverage & Agribusiness",
    data: {
      industry_name: "Food, Beverage & Agribusiness",
      subtitle:
        "Manage safety forms, inspections, training records, policies, hazards, contractors and corrective actions in one practical portal built for Australian operational teams.",
      hero_image: {},
      slices: [],
      key_features: [
        {
          feature_title: "Production and site checks",
          feature_description:
            "Digitise production, farm, equipment, restaurant and cellar-door WHS checks.",
          feature_icon: null,
        },
        {
          feature_title: "Training and competency",
          feature_description:
            "Track role training, licences, inductions and refresher records for operational teams.",
          feature_icon: null,
        },
        {
          feature_title: "Policies and SOPs",
          feature_description:
            "Keep WHS policies, procedures and acknowledgements accessible and current.",
          feature_icon: null,
        },
        {
          feature_title: "Hazards and incidents",
          feature_description:
            "Capture hazards, incidents, near misses and corrective actions from production, farm or venue teams.",
          feature_icon: null,
        },
        {
          feature_title: "Contractor records",
          feature_description:
            "Manage contractor inductions, insurance, site records and follow-up actions.",
          feature_icon: null,
        },
        {
          feature_title: "WHS alongside operational checks",
          feature_description:
            "Keep worker safety evidence visible alongside the operational checks your team already understands.",
          feature_icon: null,
        },
      ],
      content_sections: [
        {
          heading: "WHS records for food, beverage and agribusiness teams",
          paragraph:
            "Food, beverage and agribusiness safety records often sit in too many places: paper production checklists, training spreadsheets, shared-drive SOPs, hazard reports in emails or notebooks, contractor files and informal farm or equipment checks.",
        },
        {
          heading: "Food safety and WHS are not the same job",
          paragraph:
            "Food safety systems help protect consumers and support food compliance. WHS systems help protect workers and support workplace safety duties. YSP focuses on the WHS side: inspections, forms, training, policies, hazards, corrective actions and contractor records.",
        },
        {
          heading: "Built for mixed operational environments",
          paragraph:
            "Use the portal across food production, meat and smallgoods, farms, horticulture, restaurants, wineries, cellar doors, beverage operations and equipment-heavy sites where practical worker safety records need to be easy to find.",
        },
        {
          heading: "Connect forms to the rest of the safety system",
          paragraph:
            "A checklist app can digitise a form. A WHS portal connects the form to the rest of the safety system: training records, policies, hazards, actions, contractors and management visibility.",
        },
        {
          heading: "Relevant client proof: Greenlife Oil Holdings",
          paragraph:
            '"We need WHS records that fit around practical operational work, not a system that sits separately from the way the business runs. Your Safety Portal helps bring site checks, equipment inspections, worker training, contractor records, hazards and corrective actions together so safety follow-up is easier to see and manage."',
        },
        {
          heading: "Mini case study angle: WHS records alongside food and agribusiness operations",
          paragraph:
            "Greenlife Oil Holdings gives the food, beverage and agribusiness page a practical proof point for teams that need worker safety records alongside operational checks. A passable case study would keep WHS separate from food safety while showing how site checks, equipment inspections, worker training, contractor records, hazard reporting and action follow-up can be managed in one place. The case study should focus on practical visibility: managers know what has been completed, what needs action and where evidence sits when it is needed.",
        },
      ],
      meta_title: "Food & Agribusiness WHS Software | Your Safety Portal",
      meta_description:
        "WHS software for Australian food, beverage and agribusiness teams. Manage forms, inspections, training, hazards, contractors and actions in one portal.",
      meta_image: {},
    },
  },
  {
    uid: "multi-site-retail-franchise",
    title: "Multi-site Retail & Franchise",
    data: {
      industry_name: "Multi-site Retail & Franchise",
      subtitle:
        "Manage WHS across every store with retail safety software for Australian multi-site and franchise teams. Inspections, training, hazards and policies in one portal.",
      hero_image: {},
      slices: [],
      key_features: [
        {
          feature_title: "Consistent store inspections",
          feature_description:
            "Standardise daily, weekly and monthly checks across every store, showroom, clinic or workshop.",
          feature_icon: null,
        },
        {
          feature_title: "Frontline hazard reporting",
          feature_description:
            "Make it simple for store teams to report hazards, incidents, photos and actions.",
          feature_icon: null,
        },
        {
          feature_title: "Training and sign-offs",
          feature_description:
            "Know who is trained, who is overdue and which policies new starters have acknowledged.",
          feature_icon: null,
        },
        {
          feature_title: "Head-office visibility",
          feature_description:
            "Spot repeat risks, overdue actions and inconsistent processes across locations.",
          feature_icon: null,
        },
        {
          feature_title: "Retail risk coverage",
          feature_description:
            "Manage manual handling, slips and trips, lacerations, equipment, maintenance and customer aggression records.",
          feature_icon: null,
        },
        {
          feature_title: "Franchise consistency",
          feature_description:
            "Keep processes consistent across stores and franchisees without relying on manager memory.",
          feature_icon: null,
        },
      ],
      content_sections: [
        {
          heading: "WHS software built for multi-site retail operations",
          paragraph:
            "Every store has similar WHS obligations, but not every store follows the same process. YSP gives retail and franchise teams one practical portal for policies, forms, inspections, training and hazards.",
        },
        {
          heading: "Keep store inspections and actions consistent",
          paragraph:
            "Use standard forms for stockrooms, showrooms, clinics, workshops and service locations. Store teams can complete checks quickly, while head office can see overdue actions and repeat risks across locations.",
        },
        {
          heading: "Track training, inductions and policy sign-offs",
          paragraph:
            "Keep new starters current, standardise procedures across stores, and maintain evidence of training, policy acknowledgement and safety communication across retail and franchise teams.",
        },
        {
          heading: "Manage the risks that actually show up in retail",
          paragraph:
            "Use the portal for manual handling and stock movement, slips and trips, equipment maintenance, lacerations, customer aggression, stress and psychosocial hazard reporting.",
        },
        {
          heading: "Relevant client proof: Your Reformer",
          paragraph:
            '"As the business grows across reformer products, education, app content, support and commercial customers, consistency matters. Your Safety Portal helps us keep policies, training, equipment-related checks, contractor records and team actions organised so safety processes can keep pace with the way the business operates."',
        },
        {
          heading: "Mini case study angle: WHS consistency for a fast-growing wellness brand",
          paragraph:
            "Your Reformer is a useful multi-site retail and franchise proof point because the public business footprint spans consumer reformer products, an on-demand app, education, support and commercial fit-outs. A passable case study would show how a growing wellness brand can keep policies, training, equipment-related checks, showroom tasks, contractor records and team actions consistent across consumer, commercial and digital channels. The story connects operational complexity to repeatable WHS workflows without relying on unapproved performance metrics.",
        },
      ],
      meta_title: "Retail Safety Software Australia | Your Safety Portal",
      meta_description:
        "Manage WHS across every store with retail safety software for Australian multi-site and franchise teams. Inspections, training, hazards and policies.",
      meta_image: {},
    },
  },
  {
    uid: "professional-services-office-based",
    title: "Professional Services & Office-based",
    data: {
      industry_name: "Professional Services & Office-based",
      subtitle:
        "Office WHS software for Australian professional services teams. Manage policies, training, incidents, hazards, ergonomic checks and contractors.",
      hero_image: {},
      slices: [],
      key_features: [
        {
          feature_title: "Policy sign-offs",
          feature_description:
            "Keep WHS policies, workplace behaviour procedures and acknowledgements in one place.",
          feature_icon: null,
        },
        {
          feature_title: "Office training records",
          feature_description:
            "Track inductions, emergency procedures, psychosocial hazard awareness, ergonomics and manual handling training.",
          feature_icon: null,
        },
        {
          feature_title: "Incident and hazard reporting",
          feature_description:
            "Capture office, remote-worker, visitor and contractor incidents with corrective action tracking.",
          feature_icon: null,
        },
        {
          feature_title: "Ergonomic checks",
          feature_description:
            "Manage workstation setup, home office checklists, equipment requests and follow-up actions.",
          feature_icon: null,
        },
        {
          feature_title: "Psychosocial hazard records",
          feature_description:
            "Give office teams a structured way to record and respond to psychosocial hazards.",
          feature_icon: null,
        },
        {
          feature_title: "Hybrid work support",
          feature_description:
            "Keep WHS records for office-based, hybrid and working-from-home teams visible and current.",
          feature_icon: null,
        },
      ],
      content_sections: [
        {
          heading: "Office businesses still need WHS records",
          paragraph:
            "Professional services and office-based businesses still need practical WHS records, even if they do not run forklifts or construction sites. Policies, training, incidents, ergonomic checks and contractor records are often scattered across HR files, spreadsheets and emails.",
        },
        {
          heading: "Keep policies, procedures and sign-offs in one place",
          paragraph:
            "Use YSP to manage WHS policies, workplace behaviour procedures, hybrid work procedures, version control and acknowledgement records so leaders can see what has been communicated and signed off.",
        },
        {
          heading: "Cover office risks that are easy to overlook",
          paragraph:
            "Manage psychosocial hazards, ergonomics, slips and trips, manual handling, office equipment, visitors, contractors and facilities work with records that are easy to update and retrieve.",
        },
        {
          heading: "Support hybrid and working-from-home WHS",
          paragraph:
            "Use home workstation checklists, remote incident reporting, equipment requests and corrective action tracking to keep WHS visible for teams that do not work in one place every day.",
        },
      ],
      meta_title: "Office WHS Software Australia | Your Safety Portal",
      meta_description:
        "Office WHS software for Australian professional services teams. Manage policies, training, incidents, hazards, ergonomic checks and contractors.",
      meta_image: {},
    },
  },
  {
    uid: "community-education-training",
    title: "Community, Education & Training",
    data: {
      industry_name: "Community, Education & Training",
      subtitle:
        "Manage WHS records for schools, RTOs and community organisations. Training, policies, inspections, incidents and hazards in one portal.",
      hero_image: {},
      slices: [],
      key_features: [
        {
          feature_title: "Staff and volunteer records",
          feature_description:
            "Keep inductions, onboarding, policy sign-offs, contractor records and visitor records together.",
          feature_icon: null,
        },
        {
          feature_title: "Training and competency",
          feature_description:
            "Track staff training, trainer and assessor records, renewals and overdue items.",
          feature_icon: null,
        },
        {
          feature_title: "Incident and hazard reporting",
          feature_description:
            "Capture staff, student, client, visitor, aggression and psychosocial hazard reports with actions.",
          feature_icon: null,
        },
        {
          feature_title: "Facility and activity inspections",
          feature_description:
            "Run school, office, training room, practical area, excursion and off-site activity checks.",
          feature_icon: null,
        },
        {
          feature_title: "People-facing risk controls",
          feature_description:
            "Manage psychosocial hazards, manual handling, people handling, slips and trips, equipment and outreach risks.",
          feature_icon: null,
        },
        {
          feature_title: "Leadership visibility",
          feature_description:
            "Give leaders confidence that training, policies, incidents, inspections and actions are being managed consistently.",
          feature_icon: null,
        },
      ],
      content_sections: [
        {
          heading: "Built for people-facing organisations",
          paragraph:
            "Community, education and training organisations often have safety records everywhere: staff files, student systems, paper forms, emails and spreadsheets. YSP gives one practical WHS portal for policies, forms, inspections, training, hazards and contractors.",
        },
        {
          heading: "Keep staff, volunteer and contractor records together",
          paragraph:
            "Manage inductions, onboarding, policy and procedure sign-offs, contractor documents and visitor records in one place so WHS evidence is not split across disconnected systems.",
        },
        {
          heading: "Manage training, incidents and site activity",
          paragraph:
            "Track staff training registers, trainer and assessor records, renewal reminders, school and office inspections, practical area checks, excursions, off-site activities, incidents, hazards and corrective actions.",
        },
        {
          heading: "Cover the risks that show up in people-facing work",
          paragraph:
            "Use the portal for psychosocial hazards, aggression reports, manual handling, people handling, slips and trips, machinery or practical learning spaces, remote work and outreach activity.",
        },
      ],
      meta_title: "Education WHS Software Australia | Your Safety Portal",
      meta_description:
        "Manage WHS records for schools, RTOs and community organisations. Training, policies, inspections, incidents and hazards in one portal.",
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

async function upsertIndustries() {
  const writeToken = process.env.PRISMIC_MIGRATION_TOKEN;

  if (!writeToken) {
    console.error("Error: PRISMIC_MIGRATION_TOKEN not found in environment variables");
    console.log("Add it to .env as PRISMIC_MIGRATION_TOKEN=your_token_here");
    process.exit(1);
  }

  const client = prismic.createWriteClient<IndustryDocument>(config.repositoryName, {
    writeToken,
  });
  const migration = prismic.createMigration<IndustryDocument>();

  console.log(`${isDryRun ? "Checking" : "Preparing"} ${INDUSTRIES.length} industry pages...\n`);

  for (const industry of INDUSTRIES) {
    const existingDocument = await client.getByUID("industry", industry.uid).catch(() => null);

    if (existingDocument) {
      console.log(`- ${industry.uid}: update existing document ${existingDocument.id}`);

      if (!isDryRun) {
        migration.updateDocument(
          {
            ...existingDocument,
            data: industry.data,
            tags: existingDocument.tags ?? [],
          },
          industry.title,
        );
      }
    } else {
      console.log(`- ${industry.uid}: create new document`);

      if (!isDryRun) {
        migration.createDocument(
          {
            type: "industry",
            uid: industry.uid,
            lang: "en-us",
            tags: [],
            data: industry.data,
          },
          industry.title,
        );
      }
    }
  }

  if (isDryRun) {
    console.log("\nDry run complete. No Prismic changes were made.");
    return;
  }

  await client.migrate(migration, { reporter: report });

  console.log("\nIndustry migration complete.");
  console.log("Next steps:");
  console.log("1. Review the created/updated Industry documents in Prismic.");
  console.log("2. Publish the migration release when the content is ready.");
  console.log("3. Check /industry and the individual /industry/[uid] pages.");
}

upsertIndustries().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
