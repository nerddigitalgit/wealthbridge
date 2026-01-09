# Testing the CMS Locally

## Problem

You got a 404 error because:
1. Python isn't accessible from your Git Bash
2. Node.js/npm isn't in your PATH
3. A local development server is required for Decap CMS to work

## Solution: Use VS Code Live Server Extension

### Step 1: Install Live Server

1. Open Cursor/VS Code
2. Click Extensions icon (or press Ctrl+Shift+X)
3. Search for "Live Server"
4. Install "Live Server" by Ritwick Dey
5. Click "Reload" if prompted

### Step 2: Start the Server

1. Open the file `c:\Users\marci\Git\wealthbridge\index.html` in Cursor
2. Right-click anywhere in the file
3. Select "Open with Live Server"
4. OR click the "Go Live" button in the bottom-right status bar

### Step 3: Access the CMS

Once Live Server is running (usually on port 5500):

- **Main website**: http://localhost:5500/index.html
  or http://127.0.0.1:5500/index.html

- **CMS Admin**: http://localhost:5500/admin
  or http://127.0.0.1:5500/admin

## Alternative: Deploy to Vercel First

If you want to skip local testing and go straight to production:

1. Push the code to GitHub
2. Deploy to Vercel
3. Access the CMS at `https://your-domain.com/admin`

This is actually the **recommended approach** because:
- No local server setup required
- You'll need to deploy anyway
- The CMS works better in production
- You can test with real GitHub OAuth

## Quick Test Without Server

If you just want to see the website design (not the CMS):

1. Navigate to `c:\Users\marci\Git\wealthbridge`
2. Double-click `index.html`
3. It opens in your browser using `file://` protocol
4. The page displays with default HTML content
5. JSON loading won't work (CORS restriction)
6. Admin panel won't work

## Next Steps

**Recommended path forward:**

1. ✅ CMS files are created and ready
2. ⏭️ Push to GitHub
3. ⏭️ Deploy to Vercel
4. ⏭️ Set up GitHub OAuth
5. ⏭️ Test CMS at your-domain.com/admin
6. ⏭️ Grant team access

Would you like me to help you push to GitHub and deploy now?
