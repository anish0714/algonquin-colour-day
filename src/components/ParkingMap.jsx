import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { directionsUrl, mapsUrl, osmEmbedUrl } from '../lib/maps.js'
import { nearbyLots } from '../lib/parking.js'

export default function ParkingMap({ spot }) {
  const embed = osmEmbedUrl(spot)
  const nearby = nearbyLots(spot)
  return (
    <section className="panel parking" aria-labelledby="parking-title">
      <h2 id="parking-title"><span className="park-badge" aria-hidden="true">P</span> Parking</h2>
      <p className="parking-text">{spot.parking}</p>
      <p className="fee-line"><span className="fee-pill">Fee: included</span> Covered by your $21 Daily Vehicle Permit. <Link to="/parking">All fees</Link></p>
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

      <h3 className="nearby-title">If this lot is full</h3>
      <ul className="nearby">
        {nearby.map((l) => (
          <li key={l.id}>
            <span className="lot-km">{l.km > spot.km ? '+' : '−'}{l.distance.toFixed(1)} km</span>
            <span className="nearby-name">
              {l.spotPage ? <Link to={`/spots/${l.id}`}>{l.name}</Link> : l.name}
              <small>{l.kind} · km {l.km}</small>
            </span>
            <a href={directionsUrl(l)} target="_blank" rel="noopener noreferrer" aria-label={`Directions to ${l.name}`}>
              <Icon name="car" size={18} />
            </a>
          </li>
        ))}
      </ul>
      <p className="hint">Never park on the highway shoulder. <Link to="/parking">See every lot on Highway 60</Link>.</p>
    </section>
  )
}
