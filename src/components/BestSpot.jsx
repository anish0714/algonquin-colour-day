import StopPhoto from './StopPhoto.jsx'
import { mapsUrl } from '../lib/maps.js'

export default function BestSpot({ best, stops }) {
  const stop = stops.find((s) => s.id === best.stopId)
  if (!stop) return null

  return (
    <section className="panel best" aria-labelledby="best-title">
      <span className="best-badge">★ Best spot</span>
      <h2 id="best-title">{best.heading}</h2>
      {stop.photo && <StopPhoto photo={stop.photo} className="best-photo" />}
      <p className="best-lead">{best.lead}</p>
      <dl className="best-points">
        {best.points.map((p) => (
          <div key={p.label}>
            <dt>{p.label}</dt>
            <dd>{p.text}</dd>
          </div>
        ))}
      </dl>
      <p className="best-links">
        <a href={mapsUrl(stop)} target="_blank" rel="noopener noreferrer">Open in Maps</a>
        {' · '}
        <a href={best.source.url} target="_blank" rel="noopener noreferrer">{best.source.name}</a>
      </p>
    </section>
  )
}
