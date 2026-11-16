# Happy Moon v3 — Customizing 3D hero & motion

The 3D Design Studio and its theme switcher were removed as requested. The site keeps the real 3D moon hero (React Three Fiber) and uses hardware-friendly CSS animations across the other sections.

- `src/components/MoonScene.tsx`: change metallic moon material, floating balloons, scene lighting, star particles. Existing `show3D = ready === true && enabled` resolves the original Vercel `aria-pressed` TS2322 error.
- `src/premium-motion.css`: edit animated glow, firefly field, social icons, cinematic bridge, and mobile effects.
- `src/App.tsx`: edit service text, ticker text (continuous groups), contact info, and content order.
- `src/components/SocialLinks.tsx`: modify the 5 original social icons' destination links and the 6th Google Maps location. YouTube has no link until an official URL is supplied.
- `src/data/gallery.ts`: replace existing hosted media URLs with your own images/videos when needed.
- `public/images`: original branding assets, optimized WebP and source PNG.

Performance: on low-memory/save-data/reduced-motion devices the 3D hero can switch to a still emblem; on mobile some decorative animations are intentionally lighter. The two tickers stay continuous by request.
