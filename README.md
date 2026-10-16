# Algonquin Fall Colour Day

A responsive React app (Vite, no backend) for our Algonquin Park fall colour day trip on Saturday, Oct 17, 2026. It works on phones (bottom tab bar) and desktops (top tabs, multi-column layouts).

## Run it

```bash
npm install
npm run dev
```

`npm run build` makes a static site in `dist/`.

Live site: https://anish0714.github.io/algonquin-colour-day/. Every push to `main` lints, builds and redeploys it through `.github/workflows/deploy.yml`, and pull requests run the same lint and build as a check.

## Pages

Routing uses `HashRouter`, so deep links like `#/spots/lookout` work on GitHub Pages.

| Tab | Route | What's on it |
| --- | --- | --- |
| Overview | `#/` | Trip header, key facts, best spot, Highway 60 route |
| Schedule | `#/schedule` | Hour-by-hour timeline |
| Spots | `#/spots` | Cards for all 7 stops and 4 backups |
| Spot page | `#/spots/:id` | Photo gallery, facts, about, parking map with directions |
| Parking | `#/parking` | All fees, every lot on Highway 60, free lots in Huntsville |
| Food | `#/food` | Lunch and dinner picks in Huntsville, filterable by cuisine |
| Tips | `#/tips` | Park pass details and packing/photo tips |

## Where things live

- `src/data/itinerary.json` holds all the trip content. Each stop and backup has its official length, difficulty, coordinates, a short `about`, `highlights`, a `source` link and a `photos` gallery. Edit this to change the plan.
- `src/pages/` has one component per tab, plus the spot detail page. `src/components/Layout.jsx` holds the header and both tab bars.
- `src/lib/spots.js` merges stops and backups into one ordered list for the spot pages.
- `src/lib/maps.js` builds Google Maps search and directions links, and the keyless OpenStreetMap embed used for parking maps.
- Photos are Creative Commons images from Wikimedia Commons, loaded from Wikimedia and credited under each photo as the licences require.
- `src/lib/scenes.js` holds painted canvas illustrations, used for any spot without a photo (currently Two Rivers Trail).
- Trail facts come from the Friends of Algonquin Park trail pages, linked on each spot page.
- `docs/` has the original brief (`CHAT_HISTORY.md`) and the first single-page design (`reference-page.html`).

Light and dark mode follow the system setting. The falling leaves stay still when the device asks for reduced motion.
