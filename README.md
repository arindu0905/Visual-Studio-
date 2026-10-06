# Visual Studios Plus — website (frontend)

A ground-up rebuild of [visualstudiosplus.com](https://visualstudiosplus.com) as a cinematic, editorial creative-agency site.
Frontend only — no backend, CMS or database.

**Stack:** Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP (ScrollTrigger, one section) · Lucide icons

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build + type check
npm start
```

## Routes

| Route | Content |
| --- | --- |
| `/` | Hero showreel, about, services index, selected films, pinned photography reel, showreel, clients, CTA |
| `/work` | All films + photography categories |
| `/work/[slug]` | Film pages (4) with lazy YouTube player |
| `/photography` | Filterable 115-image archive with lightbox (`?category=food\|fashion\|jewellery\|hospitality`). `/photography-portfolio` 301-redirects here. |
| `/services` | Videography, Photography, Social / Paid Media / Branding Strategy |
| `/about` | Studio statement, manifesto, disciplines, clients |
| `/contact` | Details + enquiry form (opens the visitor's email app — no backend) |

## Editing content

All copy and media references live in `src/data/`:

- `site.ts` — company info, contact details, social links, hero copy, showreel
- `services.ts` — services (summaries are editable placeholder copy; the old site had none)
- `projects.ts` — film projects (YouTube IDs)
- `photography.ts` — gallery images and categories
- `clients.ts` — client logos
- `navigation.ts` — menu

## Images & video

Media is currently loaded from the existing WordPress library (`visualstudiosplus.com/wp-content/uploads/2024/09`) and optimised by `next/image`.
**Before the old WordPress site is switched off**, make the new site self-contained:

```bash
npm run assets:download                       # copies every referenced file into public/images
echo NEXT_PUBLIC_ASSET_BASE=/images > .env.local
```

## Notes

- Animations respect `prefers-reduced-motion` (no parallax, no autoplaying video, no custom cursor, static marquee).
- Custom cursor only on mouse/trackpad devices.
- The live WordPress footer contains injected spam links ("not on gamstop", "winnerz nl") — the old site appears compromised; those were not carried over.
- Instagram / Pinterest / X icons on the old site had no URLs — add them to `socials` in `src/data/site.ts`.
