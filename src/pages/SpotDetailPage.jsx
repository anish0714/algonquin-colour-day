import { Link, useParams } from 'react-router-dom'
import Gallery from '../components/Gallery.jsx'
import ParkingMap from '../components/ParkingMap.jsx'
import Icon from '../components/Icon.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import { getSpot, neighbours, plannedVisit, spotTitle } from '../lib/spots.js'
import usePageTitle from '../lib/usePageTitle.js'

// Timeline times are 12-hour without AM/PM; the day runs 8 AM to 10:30 PM.
function withMeridiem(time) {
  const hour = Number(time.split(':')[0])
  return `${time} ${hour >= 8 && hour < 12 ? 'AM' : 'PM'}`
}

export default function SpotDetailPage() {
  const { id } = useParams()
  const spot = getSpot(id)
  usePageTitle(spot?.name ?? 'Not found')
  if (!spot) return <NotFoundPage />

  const visit = plannedVisit(spot.id)
  const { prev, next } = neighbours(spot.id)
  const facts = [
    ['When', visit ? withMeridiem(visit.time) : 'Backup only'],
    ['Highway 60', `km ${spot.km}`],
    spot.length && ['Length', spot.length],
    spot.duration && ['Time', spot.duration],
    spot.difficulty && ['Difficulty', spot.difficulty],
  ].filter(Boolean)

  return (
    <div className="page">
      <Link to="/spots" className="back"><Icon name="back" size={18} /> All spots</Link>

      <header className="page-head spot-head">
        <span className={`kind-badge ${spot.kind}`}>{spot.kind === 'stop' ? `Stop ${spot.order} of 7` : 'Backup spot'}</span>
        <h1>{spotTitle(spot)}</h1>
        <p className="sub">{spot.description}</p>
      </header>

      <div className="detail-grid">
        <Gallery key={spot.id} spot={spot} />

        <div className="detail-side">
          <section className="panel">
            <dl className="fact-list">
              {facts.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </section>

          <section className="panel">
            <h2>About</h2>
            <p className="about">{spot.about}</p>
            {spot.highlights?.length > 0 && (
              <ul className="highlights">
                {spot.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            )}
            {spot.source && (
              <a className="source" href={spot.source.url} target="_blank" rel="noopener noreferrer">
                {spot.source.name} <Icon name="external" size={14} />
              </a>
            )}
          </section>
        </div>
      </div>

      <ParkingMap spot={spot} />

      <nav className="pager" aria-label="Other spots">
        {prev ? (
          <Link to={`/spots/${prev.id}`} className="pager-link">
            <Icon name="back" size={18} />
            <span><small>Previous</small>{prev.name}</span>
          </Link>
        ) : <span />}
        {next && (
          <Link to={`/spots/${next.id}`} className="pager-link next">
            <span><small>Next</small>{next.name}</span>
            <Icon name="next" size={18} />
          </Link>
        )}
      </nav>
    </div>
  )
}
