# WealthBridge Website Development Service Workflow

## Complete Process Documentation

This document outlines the complete workflow for delivering website development services with visual CMS integration.

---

## Phase 1: AI-Generated Code Creation

### Step 1: Generate Initial Code
**Tools:** Claude Code, ChatGPT, Gemini, or other AI coding assistants

**Process:**
1. Provide AI with design requirements and brand guidelines
2. Generate HTML, CSS, and JavaScript code
3. Review and refine the generated code
4. Test locally to ensure functionality

**Deliverable:** Working static HTML/CSS/JS website

---

## Phase 2: Framework Conversion

### Step 2: Convert to Next.js Framework
**Why:** Enables proper CMS integration, better performance, and scalability

**Process:**
1. Create Next.js project structure with App Router
2. Convert HTML to React components (app/page.tsx)
3. Extract CSS to globals.css
4. Set up TypeScript configuration
5. Configure Next.js fonts optimization
6. Move static assets to public/ folder

**Commands:**
```bash
# Structure created:
/app
  ├── layout.tsx    # Root layout with fonts and metadata
  ├── page.tsx      # Main page component
  └── globals.css   # All CSS styles

/public             # Static assets (images, etc.)
```

**Deliverable:** Next.js application ready for deployment

---

## Phase 3: Version Control Setup

### Step 3: Push to GitHub
**Why:** Version control, collaboration, and automated deployment

**Process:**
1. Initialize Git repository (if not already)
2. Create `.gitignore` file:
   ```
   .env
   .env.local
   node_modules/
   .next/
   out/
   *.log
   ```
3. Commit all code
4. Push to GitHub repository

**Commands:**
```bash
git add -A
git commit -m "Initial Next.js setup"
git push origin main
```

**Deliverable:** Code in GitHub repository

---

## Phase 4: Deployment Setup

### Step 4: Deploy to Vercel
**Why:** Automatic deployments, serverless functions, and global CDN

**Process:**
1. Connect Vercel account to GitHub
2. Import the repository
3. Configure build settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Add environment variables (if needed)
5. Deploy

**Environment Variables:**
```
NEXT_PUBLIC_BUILDER_API_KEY=<your-builder-io-api-key>
```

**Deliverable:** Live website at Vercel URL

---

## Phase 5: Visual CMS Integration

### Step 5: Integrate Builder.io
**Why:** Enable non-technical team members to edit content visually

**Setup Process:**

1. **Create Builder.io Account**
   - Sign up at https://builder.io
   - Create new space for the project

2. **Get API Key**
   - Go to Account Settings
   - Copy Public API Key

3. **Install Builder.io SDK**
   ```bash
   npm install @builder.io/react @builder.io/sdk
   ```

4. **Add to Next.js App**
   - Create `builder.config.ts`:
     ```typescript
     import { Builder } from '@builder.io/sdk'
     Builder.init('YOUR_API_KEY')
     export default Builder
     ```

   - Update `app/layout.tsx` to include Builder.io script

   - Add environment variable:
     ```
     NEXT_PUBLIC_BUILDER_API_KEY=your_api_key_here
     ```

5. **Register Components in Builder.io**
   - Log into Builder.io dashboard
   - Go to Models → Create new model
   - Register your React components as editable sections

**Deliverable:** Website with Builder.io CMS integration

---

## Phase 6: Configure GitHub Sync

### Step 6: Enable Builder.io GitHub Integration
**Why:** All content changes get versioned in Git

**Process:**
1. In Builder.io dashboard, go to Space Settings
2. Navigate to Integrations → GitHub
3. Connect your GitHub account
4. Select the repository
5. Configure:
   - Branch: `main`
   - Content folder: `builder-content/`
6. Enable "Commit on Publish"

**What Happens:**
- VA edits content in Builder.io visual editor
- Clicks "Publish"
- Builder.io creates commit to GitHub
- Vercel auto-deploys the changes

**Deliverable:** Automated content-to-deployment pipeline

---

## Phase 7: Visual Customization

### Step 7: Customize Design in Builder.io
**Who:** You or your design team

**Process:**
1. Log into Builder.io dashboard
2. Use visual editor to:
   - Adjust colors and fonts
   - Modify layouts
   - Update images
   - Edit content
3. Preview changes
4. Publish to production

**Best Practices:**
- Create component library for reusability
- Set up design tokens for brand consistency
- Document editing guidelines for VAs

**Deliverable:** Fully customized website matching client brand

---

## Phase 8: GoHighLevel Integration (Optional)

### Step 8: Connect Forms & Calendars to GoHighLevel
**Why:** Capture leads and bookings in client's CRM

**Integration Points:**

1. **Contact Forms**
   - Use Builder.io to add form components
   - Configure form to POST to GoHighLevel webhook
   - Map form fields to GHL contact fields

2. **Calendars**
   - Embed Calendly widget (connected to GHL)
   - Or use native GHL calendar widget
   - Add scheduling buttons throughout site

3. **CTA Buttons**
   - Link buttons to GHL landing pages
   - Track conversions in GHL pipeline
   - Set up automation workflows

**Example Integration:**
```javascript
// Form submission handler
const handleSubmit = async (formData) => {
  await fetch('https://rest.gohighlevel.com/v1/contacts/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GHL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: formData.email,
      firstName: formData.firstName,
      // ... other fields
    })
  })
}
```

**Deliverable:** Fully integrated lead capture system

---

## Team Access & Handoff

### Granting VA Access

**Builder.io:**
1. Go to Space Settings → Team
2. Click "Invite User"
3. Enter VA email
4. Set role: "Editor" (can edit but not delete)
5. VA receives invite, creates account, can start editing

**What VAs Can Do:**
- Edit text, images, and colors visually
- Create new landing pages using templates
- Publish changes instantly
- No coding required

**What VAs Cannot Do:**
- Access GitHub or Vercel
- Modify code structure
- Delete components
- Change integrations

---

## Maintenance & Updates

### Ongoing Support

**Content Updates:**
- VAs use Builder.io visual editor
- Changes auto-deploy via Vercel
- No developer needed

**Code Updates:**
- Developer updates code in GitHub
- Push to repository
- Vercel auto-deploys

**Rollback Process:**
- GitHub: Revert commit
- Builder.io: Use version history
- Vercel: Redeploy previous version

---

## Tools Summary

| Tool | Purpose | Cost |
|------|---------|------|
| Claude Code / ChatGPT | Code generation | Free - $20/mo |
| Next.js | Framework | Free |
| GitHub | Version control | Free |
| Vercel | Hosting & deployment | Free - $20/mo |
| Builder.io | Visual CMS | Free - $50/mo |
| GoHighLevel | CRM & automation | $97/mo |

---

## Client Deliverables Checklist

- [ ] Live website URL
- [ ] Builder.io account with VA access
- [ ] GitHub repository access (if requested)
- [ ] Vercel dashboard access (if requested)
- [ ] GoHighLevel integration (if included)
- [ ] Training documentation for VAs
- [ ] Brand asset library in Builder.io

---

## Success Metrics

- **Setup Time:** 2-4 hours for complete workflow
- **VA Onboarding:** 15 minutes
- **Content Update Time:** 2-5 minutes (VA can do it)
- **Deployment Time:** Automatic (2-3 minutes)
- **Scalability:** Unlimited landing pages

---

*This workflow represents the standardized process for all client websites, ensuring consistency, quality, and easy handoff.*
