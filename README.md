# Algonquin Fall Colour Day

A mobile-first React app (Vite, no backend) for our Algonquin Park fall colour day trip on Saturday, Oct 17, 2026.

## Run it

```bash
npm install
npm run dev
```

`npm run build` makes a static site in `dist/`.

Live site: https://anish0714.github.io/algonquin-colour-day/. Every push to `main` lints, builds and redeploys it through `.github/workflows/deploy.yml`, and pull requests run the same lint and build as a check.

## Where things live

- `src/data/itinerary.json` holds all the trip content: timeline, stops, route, food, backups and tips. Edit this to change the plan; no component changes are needed.
- `src/components/` has one component per section: `Hero`, `Facts`, `RouteStrip`, `Timeline`, `StopCard`, `SceneCanvas`, `ParkingNote`, `FoodSection`, `Backups`, `Tips`, `FallingLeaves`.
- Stop photos are Creative Commons images from Wikimedia Commons, loaded from Wikimedia and credited under each photo as the licences require. Each stop's `photo` in the data holds the URL, credit and licence.
- `src/lib/scenes.js` holds the painted canvas illustrations, used for any stop without a `photo` (currently Two Rivers Trail).
- `bestSpot` in the data drives the "Best spot" panel near the top (Lookout Trail).
- `src/lib/maps.js` builds the Google Maps links from coordinates, or from a text search when there are none.
- `docs/` has the original brief (`CHAT_HISTORY.md`) and the single-page design this app matches (`reference-page.html`).

Light and dark mode follow the system setting. The falling leaves stay still when the device asks for reduced motion.
