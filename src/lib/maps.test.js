import { directionsUrl, mapsUrl, osmEmbedUrl } from './maps.js'

const withCoords = { name: 'Lookout Trail', lat: 45.579123, lng: -78.406543 }
const withQuery = { name: 'Leaf Lake overflow', mapsQuery: 'Leaf Lake, Algonquin Provincial Park' }
const nameOnly = { name: 'Main Street' }

describe('mapsUrl', () => {
  it('links to exact coordinates when a place has them', () => {
    expect(mapsUrl(withCoords)).toBe('https://www.google.com/maps/search/?api=1&query=45.579123%2C-78.406543')
  })

  it('falls back to the search text, then the name', () => {
    expect(mapsUrl(withQuery)).toBe('https://www.google.com/maps/search/?api=1&query=Leaf%20Lake%2C%20Algonquin%20Provincial%20Park')
    expect(mapsUrl(nameOnly)).toBe('https://www.google.com/maps/search/?api=1&query=Main%20Street')
  })
})

describe('directionsUrl', () => {
  it('uses the Google Maps directions endpoint', () => {
    expect(directionsUrl(withCoords)).toBe('https://www.google.com/maps/dir/?api=1&destination=45.579123%2C-78.406543')
    expect(directionsUrl(withQuery)).toContain('destination=Leaf%20Lake')
  })
})

describe('osmEmbedUrl', () => {
  it('returns null without coordinates', () => {
    expect(osmEmbedUrl(withQuery)).toBeNull()
  })

  it('centres a bounding box on the place and drops a marker there', () => {
    const url = new URL(osmEmbedUrl(withCoords))
    expect(url.origin + url.pathname).toBe('https://www.openstreetmap.org/export/embed.html')
    expect(url.searchParams.get('marker')).toBe('45.579123,-78.406543')

    const [west, south, east, north] = url.searchParams.get('bbox').split(',').map(Number)
    expect(west).toBeLessThan(withCoords.lng)
    expect(east).toBeGreaterThan(withCoords.lng)
    expect(south).toBeLessThan(withCoords.lat)
    expect(north).toBeGreaterThan(withCoords.lat)
    expect((west + east) / 2).toBeCloseTo(withCoords.lng, 4)
  })
})
