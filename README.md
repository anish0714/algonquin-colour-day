# Algonquin Fall Colour Day

A responsive React app (Vite, no backend) for our Algonquin Park fall colour day trip on Saturday, Oct 17, 2026. It works on phones (bottom tab bar) and desktops (top tabs, multi-column layouts).

## Run it

```bash
npm install
npm run dev
```

`npm run build` makes a static site in `dist/`.

Live site: https://anish0714.github.io/algonquin-colour-day/

## Tests

Jest with React Testing Library (jsdom). Babel (`babel.config.json`) is only used by Jest; Vite builds the app.

```bash
npm test
```

```bash
npm run test:coverage
```

| File | What it checks |
| --- | --- |
| `src/lib/*.test.js` | Maps links, spot ordering and neighbours, nearest parking lots, scene painting |
| `src/data/itinerary.test.js` | Trip data: unique ids, coordinates inside the park, photo credits and licences, timeline and route links, restaurants, no street addresses |
| `src/components/*.test.jsx` | Photo gallery, cuisine filter, painted scenes, falling leaves (including reduced motion) |
| `src/pages/pages.test.jsx` | Every tab and all 11 spot pages render, navigation, parking fees and lots, not-found pages |

Coverage must stay above 80% for lines, statements and functions, and 70% for branches, or the run fails.

## CI/CD

`.github/workflows/ci-cd.yml` runs on every pull request and every push to `main`:

1. **Lint** and **Unit and component tests** run in parallel. Tests publish a coverage summary on the run page and a full HTML report as an artifact.
2. **Build** runs once both pass.
3. On `main` only: **Deploy to GitHub Pages**, then a **Smoke test** that fetches the live site and checks the page title and that every JS and CSS file loads.

Dependabot (`.github/dependabot.yml`) opens weekly PRs for npm packages and GitHub Actions, which go through the same checks.

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
