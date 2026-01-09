# Decap CMS Setup Guide

## What's Been Added

Your WealthBridge website now has a **visual CMS interface** that allows team members and VAs to edit content, colors, links, and text without touching code.

## File Structure

```
wealthbridge/
├── admin/
│   ├── index.html          # CMS admin interface
│   └── config.yml          # CMS configuration (editable fields)
├── content/
│   ├── settings.json       # Site-wide settings (colors, Calendly URL)
│   └── home.json          # Home page content
└── index.html             # Main website (now loads from JSON)
```

## How It Works

1. **Edit Content**: Navigate to `/admin` on your site
2. **Log In**: Authenticate with GitHub
3. **Make Changes**: Edit text, colors, links using the visual interface
4. **Save**: Changes are committed to GitHub automatically
5. **Deploy**: Vercel auto-deploys when GitHub is updated

## Editable Content

### Site Settings (`settings.json`)
- Brand colors (Gold, Sage, Cream, Navy)
- Calendly booking URL

### Home Page (`home.json`)
- **Hero Section**: Title, subtitle, eyebrow text, CTA buttons
- **Problem Section**: Title, definition, comparison badges
- **Solution Section**: Eyebrow, title, lead text
- **Process Cards**: All 4 process card titles and descriptions
- **Footer**: Tagline, copyright, disclaimer

## Local Testing

1. Start a local server:
   ```bash
   python -m http.server 8000
   ```

2. Open in browser:
   - Main site: http://localhost:8000
   - CMS admin: http://localhost:8000/admin

3. Test the admin interface (note: local mode enabled in `config.yml`)

## GitHub OAuth Setup (Required for Production)

Before deploying, you need to configure GitHub authentication:

1. **Create GitHub OAuth App**:
   - Go to: https://github.com/settings/developers
   - Click "New OAuth App"
   - Fill in:
     - Application name: `WealthBridge CMS`
     - Homepage URL: `https://your-domain.com`
     - Authorization callback URL: `https://api.netlify.com/auth/done`
   - Click "Register application"
   - Copy the **Client ID** and **Client Secret**

2. **Update Vercel/Netlify**:
   - Add environment variables:
     - `GITHUB_CLIENT_ID`
     - `GITHUB_CLIENT_SECRET`

3. **Update `admin/config.yml`**:
   - Remove or comment out `local_backend: true` for production

## Deployment to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add Decap CMS"
   git push
   ```

2. **Connect to Vercel**:
   - Go to vercel.com
   - Import your GitHub repository: `nerddigitalgit/wealthbridge`
   - Deploy (automatic on push)

3. **Access Admin Panel**:
   - Visit: `https://your-domain.com/admin`
   - Log in with GitHub
   - Start editing!

## Granting Team Access

To allow VAs and team members to use the CMS:

1. **Add them as collaborators** to your GitHub repository:
   - Go to: https://github.com/nerddigitalgit/wealthbridge/settings/access
   - Click "Add people"
   - Enter their GitHub username
   - Select "Write" access

2. **They can now**:
   - Visit your site at `/admin`
   - Log in with their GitHub account
   - Make edits through the CMS interface
   - Save (commits to GitHub automatically)
   - Changes deploy to Vercel automatically

## Workflow

### For Quick Edits (VAs/Team):
1. Go to `yoursite.com/admin`
2. Log in with GitHub
3. Edit content in the visual interface
4. Click "Save"
5. Changes go live automatically

### For Major Changes (You):
1. Use AI (Claude/Gemini) to generate new designs
2. Polish the code manually
3. Commit to GitHub
4. Extract any new content to JSON files
5. Update `admin/config.yml` if new fields are added
6. Team can now edit the new content via CMS

## Troubleshooting

### CMS admin shows 404
- Make sure the `admin/` folder is committed to GitHub
- Verify the path is `/admin` (not `/admin/index.html`)

### Content not loading
- Open browser console (F12) and check for errors
- Verify `content/settings.json` and `content/home.json` exist
- Check that JSON files are valid (use jsonlint.com)

### Changes not appearing on site
- Clear browser cache (Ctrl+Shift+R)
- Check Vercel deployment logs
- Verify GitHub commit was successful

### Can't log in to CMS
- Verify GitHub OAuth app is configured
- Check that collaborator has "Write" access to repo
- Make sure `local_backend: true` is removed from production `config.yml`

## Notes

- The CMS is **Git-based**: All changes are version controlled
- The site **degrades gracefully**: If JSON fails to load, default HTML content is used
- **No build process required**: Pure static files with client-side JSON loading
- **Fast and lightweight**: No frameworks, just vanilla JavaScript
