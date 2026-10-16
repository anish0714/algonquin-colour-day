const BASE = 'https://www.google.com/maps/search/?api=1&query='

// A place with lat/lng links to exact coordinates; otherwise fall back to a text search.
export function mapsUrl(place) {
  if (place.lat != null && place.lng != null) {
    return BASE + encodeURIComponent(`${place.lat},${place.lng}`)
  }
  return BASE + encodeURIComponent(place.mapsQuery ?? place.name)
}
