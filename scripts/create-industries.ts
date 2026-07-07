/**
 * Migration Script: Create Industry Pages in Prismic
 *
 * This script programmatically creates industry documents in Prismic using the Migration API.
 *
 * Prerequisites:
 * 1. Push the Industry custom type to Prismic via Slice Machine
 * 2. Create a token in Prismic Settings > API & Security > Tokens section
 * 3. Add it to your .env file as PRISMIC_MIGRATION_TOKEN
 *
 * Usage:
 *   pnpm run create-industries
 */

import 'dotenv/config';

// Industry data to create
const INDUSTRIES = [
  {
    uid: 'construction',
    industry_name: 'Construction',
    subtitle: 'Built specifically for the unique hazards and fast-paced environment of construction sites.',
    meta_title: 'Construction Safety Software | Your Safety Partners',
    meta_description: 'Ensure OSHA compliance and streamline safety management on construction sites with our dedicated safety software.',
    content_sections: [
      {
        heading: 'Streamline Jobsite Inspections',
        paragraph: 'Conduct daily hazard assessments and tool-box talks directly from your mobile device. Keep your team safe and compliant with real-time reporting.'
      },
      {
        heading: 'Manage Subcontractor Compliance',
        paragraph: 'Ensure every contractor on site has the proper certifications and training records before stepping foot on the job. Automated reminders keep everyone current.'
      },
      {
        heading: 'Site-Specific Safety Plans',
        paragraph: 'Create and distribute site-specific safety plans instantly. Update workers on new hazards and control measures in real-time.'
      }
    ],
    key_features: [
      { feature_title: 'Mobile Inspections', feature_description: 'Complete safety inspections from anywhere on site' },
      { feature_title: 'Contractor Portal', feature_description: 'Manage subcontractor credentials and compliance' },
      { feature_title: 'Offline Mode', feature_description: 'Work without internet, sync when connected' },
      { feature_title: 'Incident Reporting', feature_description: 'Report and track incidents in real-time' },
      { feature_title: 'Toolbox Talks', feature_description: 'Digital toolbox talk delivery and attendance' },
      { feature_title: 'Site Inductions', feature_description: 'Automate site induction and sign-offs' }
    ]
  },
  {
    uid: 'manufacturing',
    industry_name: 'Manufacturing',
    subtitle: 'Reduce downtime and protect your workers with streamlined EHS compliance for the factory floor.',
    meta_title: 'Manufacturing Safety & EHS Software | Your Safety Partners',
    meta_description: 'Automate lock-out/tag-out procedures and manage factory floor safety with our manufacturing EHS software.',
    content_sections: [
      {
        heading: 'Lockout/Tagout Automation',
        paragraph: 'Digitize your LOTO procedures to ensure absolute compliance and worker safety during machine maintenance. Track every lock, every time.'
      },
      {
        heading: 'Real-time Hazard Tracking',
        paragraph: 'Empower floor workers to report near-misses and hazards instantly via QR codes. Get ahead of incidents before they happen.'
      },
      {
        heading: 'Equipment Safety Management',
        paragraph: 'Maintain comprehensive records of machine safety checks, maintenance schedules, and compliance documentation all in one place.'
      }
    ],
    key_features: [
      { feature_title: 'LOTO Management', feature_description: 'Digital lockout/tagout procedures and tracking' },
      { feature_title: 'QR Code Reporting', feature_description: 'Scan and report hazards instantly' },
      { feature_title: 'Training Matrix', feature_description: 'Track employee certifications and training' },
      { feature_title: 'Audit Trails', feature_description: 'Complete compliance documentation' },
      { feature_title: 'Machine Safety', feature_description: 'Equipment inspection and maintenance tracking' },
      { feature_title: 'Near Miss Reporting', feature_description: 'Capture and analyze near-miss incidents' }
    ]
  },
  {
    uid: 'healthcare',
    industry_name: 'Healthcare',
    subtitle: 'Protect your staff and patients with comprehensive healthcare safety management.',
    meta_title: 'Healthcare Safety Management Software | Your Safety Partners',
    meta_description: 'Manage clinical safety, infection control, and compliance for hospitals, aged care, and healthcare facilities.',
    content_sections: [
      {
        heading: 'Clinical Safety Management',
        paragraph: 'Track clinical incidents, manage patient safety reporting, and maintain compliance with healthcare regulations all in one integrated platform.'
      },
      {
        heading: 'Infection Control Monitoring',
        paragraph: 'Monitor and document infection control procedures, track outbreaks, and ensure staff compliance with hygiene protocols.'
      },
      {
        heading: 'Staff Safety & Wellbeing',
        paragraph: 'Manage workplace violence prevention, manual handling training, and staff incident reporting to protect your healthcare workers.'
      }
    ],
    key_features: [
      { feature_title: 'Clinical Incident Reporting', feature_description: 'Comprehensive patient safety incident tracking' },
      { feature_title: 'Infection Control', feature_description: 'Monitor hygiene and infection prevention measures' },
      { feature_title: 'Manual Handling', feature_description: 'Track training and equipment compliance' },
      { feature_title: 'Workplace Violence Prevention', feature_description: 'Document and manage security incidents' },
      { feature_title: 'PPE Management', feature_description: 'Track PPE usage and compliance' },
      { feature_title: 'Regulatory Compliance', feature_description: 'Meet NDIS, aged care, and health standards' }
    ]
  },
  {
    uid: 'mining',
    industry_name: 'Mining',
    subtitle: 'Heavy industry safety management for mining operations of all sizes.',
    meta_title: 'Mining Safety Software | Your Safety Partners',
    meta_description: 'Comprehensive safety management for mining operations. Track hazards, manage compliance, and protect your workforce.',
    content_sections: [
      {
        heading: 'Critical Risk Management',
        paragraph: 'Identify, assess, and control critical risks specific to mining operations. Implement and track critical control management programs.'
      },
      {
        heading: 'Pre-Start Inspections',
        paragraph: 'Digital pre-start checks for all mobile equipment and machinery. Ensure every shift starts safely with documented inspections.'
      },
      {
        heading: 'High Risk Work Permits',
        paragraph: 'Streamline permit-to-work systems for high-risk activities. Ensure all controls are in place before work begins.'
      }
    ],
    key_features: [
      { feature_title: 'Critical Risk Controls', feature_description: 'Manage and verify critical controls' },
      { feature_title: 'Pre-Start Checklists', feature_description: 'Digital equipment inspection forms' },
      { feature_title: 'Permit to Work', feature_description: 'Digital permit and isolation management' },
      { feature_title: 'Fatigue Management', feature_description: 'Track hours and manage fatigue risks' },
      { feature_title: 'Emergency Response', feature_description: 'Emergency management and mustering' },
      { feature_title: 'Contractor Management', feature_description: 'Comprehensive contractor compliance tracking' }
    ]
  },
  {
    uid: 'logistics',
    industry_name: 'Logistics & Warehousing',
    subtitle: 'Keep your warehouse operations safe, compliant, and efficient.',
    meta_title: 'Warehouse & Logistics Safety Software | Your Safety Partners',
    meta_description: 'Safety management for warehousing, distribution, and logistics operations. Forklift safety, loading dock management, and more.',
    content_sections: [
      {
        heading: 'Forklift & Mobile Equipment Safety',
        paragraph: 'Manage operator licenses, conduct daily pre-operational checks, and track equipment maintenance to prevent incidents.'
      },
      {
        heading: 'Loading Dock Safety',
        paragraph: 'Monitor and control loading dock operations with digital checklists, vehicle restraints verification, and driver communications.'
      },
      {
        heading: 'Manual Handling Prevention',
        paragraph: 'Track manual handling risks, ensure proper training, and document safe work procedures for warehouse operations.'
      }
    ],
    key_features: [
      { feature_title: 'Forklift Management', feature_description: 'License tracking and equipment checks' },
      { feature_title: 'Loading Dock Safety', feature_description: 'Control dock operations and loading procedures' },
      { feature_title: 'Manual Handling', feature_description: 'Risk assessment and training tracking' },
      { feature_title: 'Warehouse Inspections', feature_description: 'Racking, PPE, and facility inspections' },
      { feature_title: 'Traffic Management', feature_description: 'Pedestrian and vehicle separation monitoring' },
      { feature_title: 'Chemical Management', feature_description: 'Track dangerous goods and hazardous substances' }
    ]
  },
  {
    uid: 'hospitality',
    industry_name: 'Hospitality',
    subtitle: 'Food safety, workplace safety, and compliance for restaurants, hotels, and venues.',
    meta_title: 'Hospitality Safety Management Software | Your Safety Partners',
    meta_description: 'Integrated safety and food safety management for hospitality venues. Track incidents, manage training, ensure compliance.',
    content_sections: [
      {
        heading: 'Food Safety Management',
        paragraph: 'Digital temperature logs, food safety checklists, and HACCP documentation. Ensure compliance with food safety standards.'
      },
      {
        heading: 'Venue Safety Inspections',
        paragraph: 'Conduct regular safety inspections of kitchens, dining areas, and facilities. Identify and resolve hazards quickly.'
      },
      {
        heading: 'Staff Training Records',
        paragraph: 'Track food handling certificates, RSA, and other mandatory training. Automated reminders ensure staff stay current.'
      }
    ],
    key_features: [
      { feature_title: 'Food Safety Logs', feature_description: 'Digital temperature and safety checks' },
      { feature_title: 'Kitchen Safety', feature_description: 'Equipment inspections and hazard reporting' },
      { feature_title: 'Incident Management', feature_description: 'Track slips, trips, and workplace incidents' },
      { feature_title: 'Training Tracking', feature_description: 'Food handler and RSA certification management' },
      { feature_title: 'Cleaning Schedules', feature_description: 'Track cleaning and maintenance tasks' },
      { feature_title: 'Allergen Management', feature_description: 'Document allergen procedures and training' }
    ]
  }
];

// Helper to delay between requests (avoid rate limiting)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function createIndustries() {
  const migrationToken = process.env.PRISMIC_MIGRATION_TOKEN;

  if (!migrationToken) {
    console.error('❌ Error: PRISMIC_MIGRATION_TOKEN not found in environment variables');
    console.log('\n📝 To get your Migration API token:');
    console.log('1. Go to https://yoursafetyportal.prismic.io/settings/api-security');
    console.log('2. Scroll down to the "Tokens" section');
    console.log('3. Click "Generate a token" or use an existing one');
    console.log('4. Add to .env: PRISMIC_MIGRATION_TOKEN=your_token_here\n');
    process.exit(1);
  }

  const migrationApiEndpoint = 'https://migration.prismic.io';
  const repository = 'yoursafetyportal';

  console.log('🚀 Starting industry document creation via Migration API...\n');

  for (const industry of INDUSTRIES) {
    try {
      console.log(`📄 Creating: ${industry.industry_name} (${industry.uid})...`);

      const response = await fetch(`${migrationApiEndpoint}/documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${migrationToken}`,
          'Content-Type': 'application/json',
          'repository': repository,
          'x-api-key': migrationToken
        },
        body: JSON.stringify({
          title: industry.industry_name,
          type: 'industry',
          uid: industry.uid,
          lang: 'en-us',
          data: {
            industry_name: industry.industry_name,
            subtitle: industry.subtitle,
            meta_title: industry.meta_title,
            meta_description: industry.meta_description,
            content_sections: industry.content_sections,
            key_features: industry.key_features,
            slices: []
          }
        })
      });

      const responseText = await response.text();

      if (!response.ok) {
        console.error(`  ❌ Failed to create ${industry.industry_name}`);
        console.error(`  Status: ${response.status} ${response.statusText}`);
        console.error(`  Response: ${responseText}`);

        // Try to parse error message
        try {
          const errorData = JSON.parse(responseText);
          if (errorData.message) {
            console.error(`  Error: ${errorData.message}`);
          }
        } catch {
          // Not JSON, already logged raw response
        }
        continue;
      }

      const result = JSON.parse(responseText);
      console.log(`  ✅ Created successfully (ID: ${result.id || 'created'})`);

    } catch (error) {
      console.error(`  ❌ Error creating ${industry.industry_name}:`, error instanceof Error ? error.message : error);
    }

    // Wait 2 seconds between requests to avoid rate limiting
    await delay(2000);
  }

  console.log('\n✨ Migration complete!');
  console.log('📋 Next steps:');
  console.log('1. Go to https://yoursafetyportal.prismic.io');
  console.log('2. Review your new Industry documents');
  console.log('3. Add hero images and Slices to each page');
  console.log('4. Publish each document when ready');
}

createIndustries().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
