import { mapsUrl } from '../lib/maps.js'

export default function Backups({ backups, skip }) {
  return (
    <section className="panel" aria-labelledby="backups-title">
      <h2 id="backups-title">Backups if a lot is full</h2>
      <p className="sub">Never park on the highway shoulder. Move on and come back later.</p>
      <div className="swaps">
        {backups.map((b) => (
          <div key={b.name} className="swap">
            <h4>{b.name}</h4>
            <p>km {b.km} · {b.length} · {b.note}</p>
            <p className="pk">
              <span className="park-badge small" aria-label="Parking">P</span>
              {b.parking} · <a href={mapsUrl(b)} target="_blank" rel="noopener noreferrer">Maps</a>
            </p>
          </div>
        ))}
      </div>
      {skip.length > 0 && <p className="skip">Skip {skip.join(' and ')}.</p>}
    </section>
  )
}
