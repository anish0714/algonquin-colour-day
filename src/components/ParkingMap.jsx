import Icon from './Icon.jsx'
import { directionsUrl, mapsUrl, osmEmbedUrl } from '../lib/maps.js'

export default function ParkingMap({ spot }) {
  const embed = osmEmbedUrl(spot)
  return (
    <section className="panel parking" aria-labelledby="parking-title">
      <h2 id="parking-title"><span className="park-badge" aria-hidden="true">P</span> Parking</h2>
      <p className="parking-text">{spot.parking}</p>
      {spot.lat != null && (
        <p className="coords">{spot.lat.toFixed(5)}, {spot.lng.toFixed(5)} · Hwy 60 km {spot.km}</p>
      )}
      {embed && (
        <div className="map-frame">
          <iframe title={`Map of ${spot.name} parking`} src={embed} loading="lazy" referrerPolicy="no-referrer" />
        </div>
      )}
      <div className="btn-row">
        <a className="btn primary" href={directionsUrl(spot)} target="_blank" rel="noopener noreferrer">
          <Icon name="car" size={18} /> Directions
        </a>
        <a className="btn" href={mapsUrl(spot)} target="_blank" rel="noopener noreferrer">
          <Icon name="map" size={18} /> Open in Google Maps
        </a>
      </div>
      <p className="hint">Never park on the highway shoulder. If the lot is full, move on and come back later.</p>
    </section>
  )
}
