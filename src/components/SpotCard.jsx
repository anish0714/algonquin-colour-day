import { Link } from 'react-router-dom'
import SpotImage from './SpotImage.jsx'
import { plannedVisit, spotTitle } from '../lib/spots.js'

export default function SpotCard({ spot }) {
  const visit = plannedVisit(spot.id)
  return (
    <Link to={`/spots/${spot.id}`} className={`spot-card ${spot.kind}`}>
      <div className="spot-card-img">
        <SpotImage spot={spot} className="card-img" />
        {visit && <span className="time-pill">{visit.time}</span>}
        {spot.kind === 'backup' && <span className="time-pill backup">Backup</span>}
      </div>
      <div className="spot-card-body">
        <h3>{spotTitle(spot)}</h3>
        <p>{spot.description}</p>
        <div className="chips">
          <span className="chip km2">km {spot.km}</span>
          {spot.length && <span className="chip">{spot.length}</span>}
          {spot.difficulty && <span className="chip">{spot.difficulty}</span>}
        </div>
        <span className="more">View photos, info and parking →</span>
      </div>
    </Link>
  )
}
