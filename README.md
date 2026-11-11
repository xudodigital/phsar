# Phsar

A local video-commerce mockup for Cambodia, built with HTML, CSS and vanilla JavaScript. Interface languages: English, Chinese and Khmer.

## Clone

This repository uses Git LFS for the photo-search model. Install Git LFS, then clone with:

```sh
git lfs install
git clone https://github.com/xudodigital/phsar.git
cd phsar
git lfs pull
```

## Run

From this directory:

```sh
python3 server.py
```

Open http://localhost:8765/. Use this server for shared video-view counts; a generic static server does not provide the API. Keep the same hostname to retain browser-local data.

## Project layout

- `index.html` — application shell and ordered script loading.
- `css/style.css` — responsive layout and components.
- `js/` — application logic, catalog, icons, playback, search, stores, orders, support and shipping.
- `assets/products/` — current product videos, thumbnails and attribution metadata.
- `assets/reference-home.png` — active source image for the banner portrait; do not remove.
- `assets/models/`, `assets/vendor/` — photo-search model and runtime, with license files.
- `tests/` — Node regression tests and the synthetic voice test fixture.
- `data/` — persistent SQLite video-view counts; not publicly served.
- `server.py` — localhost server and shared video-view API.

## Validation

```sh
node --test tests/*.test.cjs
```

Scripts use shared browser globals and must retain the loading order in `index.html`. Photo search dynamically imports `js/photo-search.js`, which starts its sibling worker; model and runtime paths are relative to that worker.

## Current mockup boundaries

- Product videos, browsing, categories, cart, favourites, store follows and local chats are implemented.
- Most viewed aggregates qualifying video playback through the local server, or Cloudflare D1 on the published site. Recently viewed remains local to the browser.
- Login is a local profile, not online authentication. Orders and support conversations are browser-local.
- Checkout groups products into packages by store. Delivery is a planning estimate ($2.50 per store within Phnom Penh, $4 elsewhere), not a live carrier quote.
- New orders require prepaid payment; COD is unavailable. Payment remains unpaid until a real payment integration exists. Unpaid prepaid orders cannot progress to shipment.
- Contact Us provides support topic selection, automated preview conversations, closing and reopening. No messages reach a support team.
- Voice clips stay on the device. Text translation sends only the selected message to MyMemory when Translate is pressed.
- Media attribution remains available under Video information on product details. Preserve vendor, model and product license files.

## Cleanup

Legacy source backups and unused media were removed from the active project on 2026-11-10. The recovery archive was also deleted at the user’s request. Product assets, licenses, tests and persistent data were retained.

## Cloudflare Pages deployment

`python3 scripts/build-pages.py` prepares the public `dist/` directory. Never upload the project root: it contains tests and a local database. The build splits the photo model into 20 MiB parts; `cloudflare/worker.js` streams the original model path without uploading user photos. The same worker serves `/api/video-views` through a D1 binding named `DB`; initialize it using `cloudflare/schema.sql`. No local view database or browser-local account/order/chat data is uploaded. Cloudflare deployment requires account authorization and the Pages project `phsar`.

Published URL: https://phsar.pages.dev

Deploy updates after building with `CLOUDFLARE_ACCOUNT_ID=8f3f57651a529fda44db4894a1f26982 wrangler pages deploy dist --project-name phsar --branch main`. The `wrangler.jsonc` file binds the shared D1 database. Authentication is stored by Wrangler outside this project.

## Usability update — 2026-11-10

Phone and Facebook sign-in are local previews (`js/usability.js`). The phone flow uses the displayed test code 123456 and never sends SMS; the Facebook flow selects an explicit sample profile without collecting credentials. Legacy profiles remain readable. Location autocomplete uses a small Cambodian sample dataset, not Google Places; selecting a location fills editable address fields and updates the estimated shipping zone. A real Places integration requires a restricted API key and billing setup. Currency amounts display the riel symbol ៛. Search uses visualViewport metrics for overlay keyboards and supports resized-content viewports. Responsive checks covered 320, 390, 768 and 1440 CSS pixels, with a reduced-height keyboard simulation; physical mobile keyboards were not directly tested.

## Interactive map preview

`js/delivery-map.js` uses locally bundled Leaflet 1.9.4 (license in `assets/vendor/leaflet/`) and OpenStreetMap tiles. The draggable marker and map taps select the nearest local sample address within 30 km; this is not live reverse geocoding. Confirming with Use this location updates editable address fields, map link and delivery estimate together. Outside the sample coverage, confirmation is disabled. Map drafts do not alter the saved checkout fields before confirmation. Verification covered actual pointer dragging between Phnom Penh samples and Siem Reap, different delivery estimates, unsupported areas and a 320px viewport.
