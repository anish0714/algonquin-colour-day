import data from '../data/itinerary.json'
import { SPOTS } from './spots.js'

// Every Highway 60 lot, west to east: our stops and backups (with spot pages) plus the extra lots.
export const PARK_LOTS = [
  ...SPOTS.map((s) => ({
    id: s.id,
    name: s.name,
    km: s.km,
    lat: s.lat,
    lng: s.lng,
    kind: s.kind === 'stop' ? 'Today’s stop' : 'Backup trail',
    note: s.parking,
    spotPage: true,
  })),
  ...data.parking.parkLots,
].sort((a, b) => a.km - b.km)

// Closest other lots along the highway, for when a spot's own lot is full.
export function nearbyLots(spot, count = 3) {
  return PARK_LOTS
    .filter((l) => l.id !== spot.id && Math.abs(l.km - spot.km) > 0.05)
    .map((l) => ({ ...l, distance: Math.abs(l.km - spot.km) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count)
}
