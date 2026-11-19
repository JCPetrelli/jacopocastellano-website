# jacopocastellano.com redesign (JC-827)

The site design since November 2026. Pages live in `src/pages/` as usual; shared layout, components and styles are in the `redesign/` folders below. `src/layouts/redesign/paths.ts`: `P` is the URL prefix (empty), `LIVE = true` turns on indexing, GA4 and outbound/store click tracking.

## Files
- `src/layouts/redesign/SiteLayout.astro`: head (live SEO component, share images, RSS), top bar + full-screen menu, footer. `paths.ts`: prefix, LIVE flag, nav, socials, date/category helpers.
- `src/components/redesign/WorkList.astro`: projects as a hover list (home Work + portfolio). `Framed.astro` + `imageSize.ts`: images in fixed frames that never cut badly (see Images). `DigestEdition.astro`: one AI Digest edition.
- `src/pages/`: every page, same collections, forms (Formspree, Buttondown) and structured data (CreativeWork, Product, breadcrumbs) as the live pages.
- `src/styles/redesign/`: `tokens.css`, `site.css` (base, top bar, menu, hero, footer, frames), `pages.css` (page header, prose, tags, forms), one file per page type. Homepage hero: the p5 "Rise" sketch in `public/rise/`; `?hero=iri` swaps in the WebGL shader `public/iridescent.js`.

## Design system
- Monochrome interface; the home hero is black and white too (Rise).
- Inter. Weights 300/400. Display 225px, whisper headings 78px/300, anchor headings 94px tight, 11–12px uppercase labels.
- 0px radius everywhere except 75px pills (buttons, tags). No shadows. 1078px container, generous section gaps, hairline rows, black bands.
- Top bar: "Jacopo Castellano" left, `..:::: JC ::::..` logo centred, menu right. Transparent white over the hero, then ink on a translucent blur.
- Motion `cubic-bezier(0.19, 1, 0.22, 1)` 0.8s/1.25s; rotating scroll badge.
- Dark theme follows the system setting.

## Images
- Audit (148 framed images): 103 would have been cut by fixed frames: square thumbnails in 4:3, 1.9:1 social cards, portrait stage photos (up to 59% lost), banners like the 5.6:1 tab-chroma GIF.
- Project previews (home Work, portfolio): a big typographic hover list, chosen by Jacopo over natural-shape, mat and per-project-cover options (compared side by side). Desktop: the thumbnail follows the cursor, whole and at its own shape, other titles dim; keyboard focus shows it beside the row; phones show a small thumbnail per row. Pictures preload on first hover.
- Other frames (store, latest blog post): `Framed` reads each image's real size at build time. Within ~12% of the frame ratio it fills the frame; otherwise the whole image sits on a flat gray mat (the blurred backdrop was dropped: Jacopo found it muddy). Files under 600 px are never stretched beyond 1.5×.
- Galleries (projects, Orchestra Instruments) use natural ratios in two columns: nothing cropped. Blog covers and project heroes: natural ratio, no max-height crop.
- Low-resolution sources that look soft at any size (replace when possible): 280 px: beethoven-9, eden, elective-affinities, lak, licht (+3 gallery frames), lookout, mwt-memory, nacho-duato-interview, the-lost-steps illustration. 570 px: backup-scripts, carmina-burana, chuck-norris-teams, dracula, pi-games, stabat-mater, the-lost-steps, youtube-downloader.

## UX pass
Fixed:
- Navigation below 1080px: there was none (links hidden). Now a "Menu" button opens a full-screen menu (focus moves in, Esc closes, closes when resizing to desktop).
- Skip-to-content link; visible keyboard focus everywhere; current page marked in the nav (`aria-current`).
- Gallery viewer: dialog role, focus goes to Close and returns to the image, Tab stays inside, arrows/Esc work.
- Anchors (#newsletter, store categories) no longer hide under the fixed bar.
- Footer links: bigger tap targets on phones; no "Say hello" self-link on the contact page; RSS link and © line added.
- Reduced motion: hero still frame, no glides or zooms.
- In-article links to live pages are pointed to `/redesign/` while previewing.
- Mobile overflow from code blocks in posts.
Checked: 204 pages crawled, every internal link and image returns 200 (only `/loci/` fails, and only on the local dev server; it works live). No sideways scroll, broken or stretched images or script errors on 19 page types × 2 widths × 2 themes.
Open (decisions for Jacopo):
- Home placeholder copy: "Code & Light", "Backend systems by day. Light on stage by night.", footer "Say hello".
- No light/dark toggle (follows the system); the live site was dark-only.
- Blog list has 60+ posts in one list; a tag or year filter could help later.
