import data from '../data/itinerary.json'

// Every spot with a page: today's stops in visit order, then the backups.
export const SPOTS = [
  ...[...data.stops].sort((a, b) => a.order - b.order).map((s) => ({ ...s, kind: 'stop' })),
  ...data.backups.map((b) => ({ ...b, kind: 'backup' })),
]

const byId = Object.fromEntries(SPOTS.map((s) => [s.id, s]))

export function getSpot(id) {
  return byId[id]
}

// The timeline entry that visits this spot, if it is on today's plan.
export function plannedVisit(id) {
  return data.timeline.find((t) => t.stopId === id)
}

export function neighbours(id) {
  const i = SPOTS.findIndex((s) => s.id === id)
  return { prev: SPOTS[i - 1], next: SPOTS[i + 1] }
}

export function spotTitle(spot) {
  const prefix = spot.kind === 'stop' ? `${spot.order} · ` : ''
  return `${prefix}${spot.name}${spot.star ? ' ★' : ''}`
}
