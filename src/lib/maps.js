const SEARCH = 'https://www.google.com/maps/search/?api=1&query='
const DIRECTIONS = 'https://www.google.com/maps/dir/?api=1&destination='

const hasCoords = (place) => place.lat != null && place.lng != null
const query = (place) => (hasCoords(place) ? `${place.lat},${place.lng}` : place.mapsQuery ?? place.name)

// A place with lat/lng links to exact coordinates; otherwise fall back to a text search.
export function mapsUrl(place) {
  return SEARCH + encodeURIComponent(query(place))
}

export function directionsUrl(place) {
  return DIRECTIONS + encodeURIComponent(query(place))
}

// Keyless OpenStreetMap embed centred on the place, with a marker.
export function osmEmbedUrl(place, span = 0.012) {
  if (!hasCoords(place)) return null
  const { lat, lng } = place
  const bbox = [lng - span, lat - span * 0.6, lng + span, lat + span * 0.6].map((n) => n.toFixed(5)).join(',')
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`
}
