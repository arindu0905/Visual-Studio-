Title: Add WordPress theme with the demo site's copy and palette

## What

Adds a classic WordPress theme in `wordpress/visualstudiosplus`. It ports the Next.js site in this repo (same layout, motion and interactions) and uses the copy and colours of https://visualstudiosplus-demo.vercel.app.

- **Palette:** background `#0c0e0c`, zinc greys, lime accent `#dfff24`. The token names are kept from the Next.js code, so `--color-bronze` is now the lime.
- **Copy:** all copy comes from the demo: hero, about, services, philosophy, clients and sectors, call-to-action sections, footer, contact, and the About page with its stats.
- **Editable content:** Films, Case studies (22 from the demo), Services (9), Clients and Photographs are post types. Hero text, contact details, socials and the showreel are in Appearance → Customize → Visual Studios Plus.
- **Activation:** creates the Photography, Services, About and Contact pages, the main menu and all content. Appearance → VS+ Setup re-runs this and can copy the bundled images into the Media Library.
- **Contact form:** sends with `wp_mail` (AJAX, with a fallback that works without JavaScript), and has a nonce and a honeypot field.
- **Build:** `npm run wp:build` compiles Tailwind (new devDependency `@tailwindcss/cli`), copies Lenis and `public/images`, and writes `wordpress/dist/visualstudiosplus.zip`. Build output is git-ignored.

## Notes for review

- The demo's project images are Unsplash stock photos, so they weren't copied. Case studies are text only, and the image slots use the studio's real film posters and photos.
- **Typography:** matches the demo. It uses the system UI font stack (no more Google Fonts request), with weight 900 headlines and bold uppercase labels, nav and buttons. The accent headline line is the same heavy face in lime, not serif italic.
- The demo's Services intro says "6 core studio disciplines" but lists 9. It's copied word for word; this probably needs fixing.
- Client logos are shown in white on the dark background. Multilac keeps its original colours via a per-client option.

## Testing

Tested in WordPress Playground (PHP 8.2/8.3, latest WordPress):
- Every page returns 200 with no PHP warnings or notices.
- Activation seeds all content.
- `/photography-portfolio` redirects with a 301.
- Form validation works. Sending wasn't verified because Playground has no mail server; production probably needs an SMTP plugin.

Not yet tested on a real hosting environment.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
