import data from './itinerary.json'

const spots = [...data.stops, ...data.backups]
// Generous box around the Highway 60 corridor; a typo in lat/lng lands outside it.
const inCorridor = (p) => p.lat > 45.4 && p.lat < 45.7 && p.lng > -78.9 && p.lng < -78.2

describe('itinerary data', () => {
  it('gives every spot a unique id', () => {
    const ids = spots.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(spots.map((s) => [s.id, s]))('%s has the facts its page needs', (_id, s) => {
    expect(s.name).toBeTruthy()
    expect(typeof s.km).toBe('number')
    expect(s.description).toBeTruthy()
    expect(s.about).toBeTruthy()
    expect(s.parking).toBeTruthy()
    expect(['Easy', 'Moderate', 'Difficult']).toContain(s.difficulty)
    expect(inCorridor(s)).toBe(true)
  })

  it('credits every photo with a licence, as Creative Commons requires', () => {
    const photos = spots.flatMap((s) => s.photos)
    expect(photos.length).toBeGreaterThan(0)
    for (const p of photos) {
      expect(p.src).toMatch(/^https:\/\/upload\.wikimedia\.org\//)
      expect(p.alt).toBeTruthy()
      expect(p.credit).toBeTruthy()
      expect(p.license).toMatch(/^CC BY/)
      expect(p.licenseUrl).toMatch(/^https:\/\/creativecommons\.org\//)
      expect(p.page).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/)
      expect(p.width).toBeGreaterThan(0)
      expect(p.height).toBeGreaterThan(0)
    }
  })

  it('points every timeline stop and route link at a real spot', () => {
    const ids = new Set(spots.map((s) => s.id))
    for (const t of data.timeline.filter((t) => t.stopId)) expect(ids).toContain(t.stopId)
    for (const r of data.route.filter((r) => r.id)) expect(ids).toContain(r.id)
    expect(ids).toContain(data.bestSpot.stopId)
  })

  it('visits every stop exactly once on the timeline', () => {
    const visited = data.timeline.filter((t) => t.stopId).map((t) => t.stopId).sort()
    expect(visited).toEqual(data.stops.map((s) => s.id).sort())
  })

  it('keeps the route in km order from West Gate to East Gate', () => {
    const kms = data.route.map((r) => r.km)
    expect(kms).toEqual([...kms].sort((a, b) => a - b))
    expect(data.route[0].name).toBe('West Gate')
    expect(data.route.at(-1).name).toBe('East Gate')
  })

  it('lists every extra park lot with a km marker and a way to find it', () => {
    for (const l of data.parking.parkLots) {
      expect(l.km).toBeGreaterThanOrEqual(0)
      expect(l.km).toBeLessThanOrEqual(56)
      expect(inCorridor(l) || Boolean(l.mapsQuery)).toBe(true)
    }
  })

  it('gives every restaurant a cuisine, a meal, hours, and chicken and vegan picks', () => {
    for (const p of data.food.places) {
      expect(p.cuisine).toBeTruthy()
      expect(p.meals.length).toBeGreaterThan(0)
      expect(p.meals.every((m) => m === 'lunch' || m === 'dinner')).toBe(true)
      expect(p.hours).toBeTruthy()
      expect(p.chicken).toBeTruthy()
      expect(p.vegan).toBeTruthy()
    }
    expect(data.food.places.some((p) => p.cuisine === 'Indian')).toBe(true)
  })

  it('never publishes the home or pickup street address', () => {
    const text = JSON.stringify(data)
    expect(text).not.toMatch(/Prince St|Graydon|M3A/i)
  })
})
