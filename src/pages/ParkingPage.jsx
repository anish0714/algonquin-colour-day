import { Link } from 'react-router-dom'
import data from '../data/itinerary.json'
import Icon from '../components/Icon.jsx'
import { PARK_LOTS } from '../lib/parking.js'
import { mapsUrl } from '../lib/maps.js'
import usePageTitle from '../lib/usePageTitle.js'

function LotRow({ lot }) {
  return (
    <li className={lot.spotPage ? 'lot ours' : 'lot'}>
      <span className="lot-km">km {lot.km}</span>
      <div className="lot-body">
        <h3>
          {lot.spotPage ? <Link to={`/spots/${lot.id}`}>{lot.name}</Link> : lot.name}
          <span className="lot-kind">{lot.kind}</span>
        </h3>
        <p>{lot.note}</p>
        <div className="lot-links">
          <span className="fee-pill">Included in pass</span>
          <a href={mapsUrl(lot)} target="_blank" rel="noopener noreferrer">Maps</a>
          {lot.source && <a href={lot.source} target="_blank" rel="noopener noreferrer">Details</a>}
        </div>
      </div>
    </li>
  )
}

export default function ParkingPage() {
  usePageTitle('Parking')
  const { parking } = data

  return (
    <div className="page">
      <header className="page-head">
        <h1>Parking and fees</h1>
        <p className="sub">{parking.summary}</p>
      </header>

      <section className="panel" aria-labelledby="fees-title">
        <h2 id="fees-title">All fees</h2>
        <div className="fee-table" role="table" aria-label="Parking and permit fees">
          <div className="fee-row head" role="row">
            <span role="columnheader">What</span>
            <span role="columnheader">Cost</span>
            <span role="columnheader">Details</span>
          </div>
          {parking.fees.map((f) => (
            <div className="fee-row" role="row" key={f.item}>
              <span role="cell" className="fee-item">{f.item}</span>
              <span role="cell" className="fee-cost">{f.cost}</span>
              <span role="cell" className="fee-note">{f.note}</span>
            </div>
          ))}
        </div>
        <p className="hint">{parking.buyNote}</p>
        <a className="btn primary" href={data.permit.bookAt} target="_blank" rel="noopener noreferrer">
          Book the permit <Icon name="external" size={16} />
        </a>
      </section>

      <div className="two-col">
        <section className="panel" aria-labelledby="lots-title">
          <h2 id="lots-title">Lots along Highway 60</h2>
          <p className="sub">West Gate to East Gate. Names in red are your stops and backups and open their spot page. If a lot is full, try the next one along; never park on the shoulder.</p>
          <ol className="lots">
            {PARK_LOTS.map((l) => <LotRow key={l.id} lot={l} />)}
          </ol>
        </section>

        <section className="panel" aria-labelledby="town-title">
          <h2 id="town-title">Huntsville (lunch and dinner)</h2>
          <p className="sub">All free. Main Street has a 3-hour limit; the town lots are a short walk from the restaurants.</p>
          <ul className="lots">
            {parking.townLots.map((l) => (
              <li className="lot" key={l.name}>
                <span className="lot-km">{l.spaces ? `${l.spaces} spots` : 'Street'}</span>
                <div className="lot-body">
                  <h3>{l.name}</h3>
                  <p>{l.note}</p>
                  <div className="lot-links">
                    <span className="fee-pill">Free</span>
                    <a href={mapsUrl(l)} target="_blank" rel="noopener noreferrer">Maps</a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="sources">
        Sources:{' '}
        {parking.sources.map((s, i) => (
          <span key={s.url}>
            {i > 0 && ' · '}
            <a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
          </span>
        ))}
        {' '}· checked Oct 16, 2026
      </p>
    </div>
  )
}
