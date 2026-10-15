# Visual Studios Plus — WordPress theme

A classic WordPress theme port of the Next.js site in this repo (same layout, motion and interactions), using the
**copy and colour palette of the demo at https://visualstudiosplus-demo.vercel.app** — dark `#0c0e0c`
background, zinc greys and a lime `#dfff24` accent.

```
wordpress/
  src/theme.css            Tailwind source for the theme stylesheet
  visualstudiosplus/       the theme (PHP templates, inc/, assets/js/theme.js)
  dist/                    built zips (git-ignored)
```

## Build

```bash
npm install
npm run wp:build      # compiles CSS, copies Lenis + public/images into the theme, writes wordpress/dist/visualstudiosplus.zip
npm run wp:css        # CSS only, while editing templates
```

The zip is ~56 MB because it bundles the photography and the showreel. If your host's upload limit is lower,
run `npm run wp:build -- --no-media`, upload that zip, then copy `visualstudiosplus/assets/media/` to the
server over FTP/SFTP.

## Install

1. **Appearance → Themes → Add New → Upload Theme**, choose the zip, then **Activate**.
2. On activation the theme creates the Photography, Services, About and Contact pages, the main menu, and all
   content (4 films, 22 case studies, 9 services, 18 clients, 115 photographs). Projects live at `/work/`.
3. **Settings → General**: set Site Title to *Visual Studios Plus* and Tagline to
   *The Digital Creative Marketing Agency* (used in the homepage `<title>`).
4. Optional: **Appearance → VS+ Setup → Copy images to Media Library** so WordPress generates responsive sizes.
5. The contact form emails the address set in the Customizer. Most hosts need an SMTP plugin for `wp_mail()`.

## Editing

| What | Where |
| --- | --- |
| Hero label/headline/intro, about text, philosophy lines, contact details, social links, showreel | Appearance → Customize → Visual Studios Plus |
| Films (YouTube) | Films |
| Case studies (client, result, tags, summary — first three are featured on the homepage) | Case studies |
| Services | Services |
| Client logos and sectors | Clients |
| Photo archive | Photographs (+ Photo categories) |
| Header menu | Appearance → Menus |

Order everything with **Page Attributes → Order**. Colours are tokens at the top of `src/theme.css`
(`--color-bronze` is the lime accent; the token names were kept from the Next.js code).

## Local testing without PHP

```bash
npx @wp-playground/cli@3.1.55 server --port=9400 --mount=./wordpress/visualstudiosplus:/wordpress/wp-content/themes/visualstudiosplus
```

Then activate the theme at http://127.0.0.1:9400/wp-admin/themes.php (on Windows, run it from PowerShell).
