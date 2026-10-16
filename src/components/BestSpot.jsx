import { Link } from 'react-router-dom'
import PhotoCredit from './PhotoCredit.jsx'
import { getSpot } from '../lib/spots.js'

export default function BestSpot({ best }) {
  const stop = getSpot(best.stopId)
  if (!stop) return null
  const photo = stop.photos?.[0]

  return (
    <section className="panel best" aria-labelledby="best-title">
      {photo && (
        <figure className="best-figure">
          <img className="best-photo" src={photo.src} alt={photo.alt} decoding="async" />
          <figcaption><PhotoCredit photo={photo} /></figcaption>
        </figure>
      )}
      <div className="best-body">
        <span className="best-badge">★ Best spot</span>
        <h2 id="best-title">{best.heading}</h2>
        <p className="best-lead">{best.lead}</p>
        <dl className="best-points">
          {best.points.map((p) => (
            <div key={p.label}>
              <dt>{p.label}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
        <Link to={`/spots/${stop.id}`} className="btn primary best-cta">See photos and parking →</Link>
      </div>
    </section>
  )
}
