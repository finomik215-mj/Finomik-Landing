<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/14Tc8nuWg-gpnuxSrG2GUqfG27CuXe2lx

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the app:
   ```bash
   npm run dev
   ```

## Deploy

1. **Build for production:**
   ```bash
   npm run build
   ```
   This creates the `dist/` folder with the static site.

2. **Deploy the `dist/` folder** to your hosting provider (Netlify, Vercel, GitHub Pages, etc.). Set the publish/output directory to **`dist`** (or upload the contents of `dist/` as the site root).

3. **SPA routing** is already configured:
   - **Netlify:** `public/_redirects` sends all routes to `index.html`.
   - **Vercel:** `vercel.json` rewrites all routes to `index.html`.

4. **HTTPS** and custom domain are configured in your host’s dashboard after the first deploy.
