# 🌙 Happy Moon Decoration — Premium Animated Website v3

இந்த project உங்களுடைய original Tamil `index.html` + 3 uploaded logo images அடிப்படையில் தயாரிக்கப்பட்டது. **3D Design Studio / theme selector முழுமையாக நீக்கப்பட்டுள்ளது.** Website-ல் real React Three Fiber 3D moon hero மட்டும் உள்ளது; மற்ற sections-ல் CSS3 perspective, premium hover, scroll reveal, cinematic image motion, 2 uninterrupted marquees, branded social icon animation ஆகியவை உள்ளன.

## Features
- Luxury Tamil + English event-decor website; original contact details retained.
- Hero: real 3D golden moon, metallic balloons, branded medallion, moving light beams & particles, interactive spotlight on desktop; lightweight fallback.
- Cinematic art section, 3D-depth service cards, continuously moving two tickers, 3D-perspective signature carousel, gallery lightbox with mobile swipe, animated event timeline, premium booking form.
- **Contact & social:** screenshot style dark section with 0743745875 / 0741340367, two WhatsApp choices, Kaithady North and 8 AM–9 PM hours. Facebook blue, WhatsApp green, Instagram original gradient, YouTube red, TikTok 3-colour icon. Sixth shortcut = Google Maps (not a new social profile).
- **Original links retained:** Facebook, WhatsApp, Instagram, TikTok and Google Maps. Original YouTube `href="#"` was a placeholder; YouTube icon is shown without a dead link. To enable, add official YouTube channel URL in `src/components/SocialLinks.tsx` under `PLATFORMS`.
- Mobile-first layout (320px+), safe-area contact bar, form fields at least 16px on phones, reduced heavy animations, WebGL can be turned off manually.

## Run in Windows / VS Code
1. Install Node.js LTS: https://nodejs.org/.
2. Extract the ZIP and open the **Happy-Moon-3D-Website** folder in VS Code (the folder containing `package.json`).
3. Open VS Code Terminal (PowerShell) and run:

```powershell
npm install
npm run dev
```

4. Open: http://localhost:5173

For production testing:
```powershell
npm run build
npm run preview
```

Alternatively Windows: double-click `START_WEBSITE.bat` (requires Node.js).

**Important:** `index.html` alone should not be double-clicked, because React + TypeScript need Vite.

## Upload to GitHub and Vercel
Read `DEPLOY-VERCEL-TA.md` for complete commands. Vercel project settings: **Vite**; Root Directory **./**; Build Command **npm run build**; Output Directory **dist**; Install Command **npm install**. If your GitHub repo contains the whole project nested in a subfolder, set Vercel Root Directory to that subfolder instead.

## File guide
- `src/App.tsx` — navbar, hero, 2 tickers, about, animated art section, services, carousel, process, contact & footer
- `src/components/MoonScene.tsx` — real 3D hero, mobile fallback and 3D ON/OFF
- `src/components/SocialLinks.tsx` — SVG brand icons and URLs
- `src/components/Gallery.tsx` — image/video gallery & swipeable modal
- `src/components/BookingForm.tsx` — WhatsApp enquiry, no server data storage
- `src/styles.css` — base design and responsive CSS
- `src/premium-motion.css` — premium motion, branding and small-screen refinements
- `src/data/gallery.ts` — media items carried from the earlier site
- `public/images/` — optimized branding assets
- `original-site/original-index.html` — original HTML backup

## Testing / limitations
Static source checks (TypeScript syntax, relative import paths and CSS parsing) were run. A full production build, real-device browser verification, and external social/gallery URL availability could **not** be completed in the generation environment because npm dependency installation timed out. Before publishing, use `npm install && npm run build` on your machine and follow `MOBILE-QUALITY-CHECKLIST.md`. Neither actual social follower counts nor customer testimonials are invented.
