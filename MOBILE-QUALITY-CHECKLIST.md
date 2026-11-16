# Mobile QA checklist — Happy Moon premium animated v3

Code targets 320px, 360px, 375px, 390px, 414px, 430px, 700px, 768px, 980px and larger desktop viewports. Real device QA is still required before production release.

- [ ] Width 320px: no horizontal scroll; navigation/logo/title readable; all CTA buttons tappable.
- [ ] Width 360–430px: hero 3D moon visible; touch scrolling over 3D canvas works.
- [ ] Mobile layout: animated art bridge is stacked (text then image), without overlapping content.
- [ ] Services: one column on extra-small phones, two columns on medium phones and desktop grid.
- [ ] Gallery: two columns, image/lightbox open and close, swipe/keyboard navigation.
- [ ] Two tickers: loop seamlessly and **never pause on hover**.
- [ ] Dark contact: both telephone and WhatsApp numbers visible; location and hours fit.
- [ ] Social icons: Facebook BLUE, WhatsApp GREEN, Instagram GRADIENT, YouTube RED, TikTok MULTICOLOUR, Maps MULTICOLOUR; 6 total shortcuts (5 supplied social icons + 1 Maps).
- [ ] YouTube icon is display-only until owner adds actual YouTube channel URL.
- [ ] Booking form: input text at least 16px on iPhone, WhatsApp message includes provided fields.
- [ ] iPhone safe area: Call/WhatsApp bottom bar does not cover footer content.
- [ ] Android low-power phone: 3D OFF works and animated UI remains usable.
- [ ] Reduced motion preference: background effects reduce, but explicitly requested continuous tickers continue at slower speed.
- [ ] Test the live Vercel deployment on both Wi-Fi and cellular with internet access for gallery media.

**Validation status:** TS/TSX syntactic parse and relative import checks completed, CSS parsed without top-level syntax errors. Full `npm run build` could not be run in the generation environment because npm package installation timed out; run this locally before GitHub/Vercel deployment.
