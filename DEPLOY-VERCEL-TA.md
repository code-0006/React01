# Deploy Happy Moon v3 to GitHub + Vercel (Tanglish)

## 1. Update your existing local project
New ZIP extract pannitu `Happy-Moon-3D-Website` folder open pannunga. Old repo-la code replace pannumpothu `node_modules` / `dist` copy panna thevai illai. New `src` (including `premium-motion.css`, `SocialLinks.tsx`), `public`, `index.html`, `package.json`, and config files replace pannunga. **Old `src/components/ExperienceScene.tsx` file-a delete pannunga.** `.git` folder (Git history) delete panna vendam.

## 2. VS Code Terminal
```powershell
npm install
npm run build
npm run dev
```
Browser: http://localhost:5173. Build fail aana terminal error-a first fix pannunga.

## 3. Push to existing GitHub repository
Your previous repository was `github.com/code-0006/React01` on branch `main`.
```powershell
git status
git add -A
git commit -m "Remove 3D studio and upgrade animations social icons responsive design"
git push origin main
```
**Don't run `git init` or `git remote add origin` again** if you're inside the existing cloned repo and it already contains `.git` and an origin remote. If instead you open the newly extracted directory without `.git`, copy project files into your existing GitHub repo's local working folder first.

## 4. Vercel
Go to https://vercel.com/dashboard, open the connected project. A GitHub push to `main` normally creates a new deployment.
Settings > Build and Deployment:
- Framework Preset: **Vite**
- Root Directory: **./** only if `package.json` is at GitHub repository root. Otherwise set the real folder containing `package.json`.
- Install: `npm install`
- Build: `npm run build`
- Output: `dist`

If deployment fails, open Vercel **Deployments > Failed Build > Build Logs**. Fix the **first error** in the logs and push again. Only after successful build is it published.

## 5. Social link maintenance
Open `src/components/SocialLinks.tsx`: Facebook, WhatsApp, Instagram, TikTok and Maps original URLs are set. The YouTube icon has no clickable URL because original HTML only had `href="#"`. To add it, edit YouTube entry in `PLATFORMS`, e.g. `href: 'YOUR_OFFICIAL_YOUTUBE_URL'`.

## 6. Mobile checks
Test 320, 360, 390, 430, 768, 1024 and desktop widths with browser Device Toolbar, plus real iPhone/Android if available. Check the bottom action bar, gallery swipe, navigation, contact icon colours, form and nonstop tickers.
