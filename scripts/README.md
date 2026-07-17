# Industry Pages Migration Script

This script programmatically creates industry documents in Prismic using the **Prismic Migration API**.

## Prerequisites

### 1. Push Industry Custom Type to Prismic

First, make sure the Industry custom type is synced to Prismic:

```bash
pnpm run slicemachine
```

Then in the Slice Machine UI (http://localhost:9999):
1. Find the "Industry" custom type
2. Click "Push to Prismic" or "Review changes"
3. Confirm the sync

### 2. Generate a Migration API Token

1. Go to https://yoursafetyportal.prismic.io/settings/api-security
2. Scroll down to the **"Tokens"** section
3. You'll see:
   - **Migration API endpoint**: `https://migration.prismic.io`
   - **Repository header**: `yoursafetyportal`
4. Click **"Generate a token"** (or use an existing token)
5. Copy the token value

### 3. Add Token to Environment

Add the token to your `.env` file:

```bash
PRISMIC_MIGRATION_TOKEN=your_token_here
```

## What the Script Creates

The script will create **6 industry pages** with complete content:

1. **Construction** - Jobsite inspections, contractor management, site safety plans
2. **Manufacturing** - LOTO automation, equipment safety, hazard tracking
3. **Healthcare** - Clinical safety, infection control, staff safety
4. **Mining** - Critical risk management, pre-start inspections, permits
5. **Logistics & Warehousing** - Forklift safety, loading dock management
6. **Hospitality** - Food safety, venue inspections, training records

Each industry includes:
- Industry name and subtitle
- SEO metadata (title, description)
- 3 content sections with headings and paragraphs
- 6 key features with titles and descriptions
- Empty slices array (ready for you to add Slices in Prismic)

## Running the Script

Once you have your token in `.env`, run:

```bash
pnpm run create-industries
```

The script will:
1. Connect to Prismic Migration API
2. Create 6 industry documents
3. Show progress for each one
4. Report success or any errors

## After Running

The documents will be created in **draft mode**:

1. Go to https://yoursafetyportal.prismic.io
2. You should see 6 new "Industry" documents
3. Click on each one to edit:
   - Add hero images (optional)
   - Add Slices for rich layouts (HeroSection, CallToAction, Testimonial, etc.)
   - Review the content
4. Click **"Publish"** when ready

## Customizing the Data

To add more industries or modify existing ones:

1. Edit `scripts/create-industries.ts`
2. Modify the `INDUSTRIES` array (starting at line 16)
3. Run `pnpm run create-industries` again

Example structure:
```typescript
{
  uid: 'your-industry-slug',
  industry_name: 'Your Industry Name',
  subtitle: 'Brief tagline',
  meta_title: 'SEO title',
  meta_description: 'SEO description',
  content_sections: [
    { heading: 'Section 1', paragraph: 'Content here' }
  ],
  key_features: [
    { feature_title: 'Feature', feature_description: 'Description' }
  ]
}
```

## Troubleshooting

### "PRISMIC_MIGRATION_TOKEN not found"
- Make sure the token is in your `.env` file
- Check for typos: `PRISMIC_MIGRATION_TOKEN` (not WRITE_TOKEN)
- Restart your terminal after adding the variable

### "Custom type 'industry' not found" or 400 error
- Push the Industry custom type via Slice Machine first
- Wait 1-2 minutes for Prismic to sync
- Try the script again

### Document already exists
- If a document with that UID already exists, the API will return an error
- Delete the existing document in Prismic, or
- Change the `uid` in the script to something unique

### Connection errors
- Check your internet connection
- Verify the token is correct
- Try again in a few minutes (API may be temporarily unavailable)

## API Details

The script uses:
- **Endpoint**: `https://migration.prismic.io/documents`
- **Method**: POST
- **Headers**:
  - `Authorization: Bearer <token>`
  - `repository: yoursafetyportal`
  - `Content-Type: application/json`

For more info on the Migration API:
https://prismic.io/docs/migration-api
