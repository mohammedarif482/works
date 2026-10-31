# Arif Builds

Personal portfolio site — React 18 + Vite + GSAP.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
```

## Structure

- `src/data.js` — all content (projects, journey, stack, facts). Edit this to update the site.
- `src/components/` — Nav, Hero, Sections (Work/Journey/Stack/Contact), Scenery (sky, hills, cursor), SwapText.
- `src/useMotion.js` — all GSAP / ScrollTrigger animation, scoped with `useGSAP` and `gsap.matchMedia` (respects reduced motion).
- `src/styles.css` — design tokens and styles, with light/dark themes.

Deploys as a static site (Vercel, Netlify, Cloudflare Pages): build command `npm run build`, output `dist`.
