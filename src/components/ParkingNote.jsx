import { mapsUrl } from '../lib/maps.js'

export default function ParkingNote({ place }) {
  return (
    <div className="park">
      <span className="park-badge" aria-label="Parking">P</span>
      <span className="ptxt">
        {place.parking}{' '}
        <a href={mapsUrl(place)} target="_blank" rel="noopener noreferrer">Open in Maps</a>
      </span>
    </div>
  )
}
