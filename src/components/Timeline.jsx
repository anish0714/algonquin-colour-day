import { Link } from 'react-router-dom'
import SpotImage from './SpotImage.jsx'
import ParkingNote from './ParkingNote.jsx'
import { getSpot, spotTitle } from '../lib/spots.js'

function StopItem({ stop, seed }) {
  return (
    <div className="stop-item">
      <Link to={`/spots/${stop.id}`} className="stop-thumb" tabIndex={-1} aria-hidden="true">
        <SpotImage spot={stop} className="thumb-img" seed={seed} />
      </Link>
      <div className="stop-text">
        <h3><Link to={`/spots/${stop.id}`}>{spotTitle(stop)}</Link></h3>
        <p>{stop.description}</p>
        <ParkingNote place={stop} />
        <div className="chips">
          <span className="chip km2">km {stop.km}</span>
          {stop.length && <span className="chip">{stop.length}</span>}
          {stop.duration && <span className="chip">{stop.duration}</span>}
        </div>
        <Link to={`/spots/${stop.id}`} className="more">Photos, info and parking →</Link>
      </div>
    </div>
  )
}

export default function Timeline({ timeline }) {
  return (
    <ol className="tl">
      {timeline.map((item, i) => {
        const stop = item.stopId && getSpot(item.stopId)
        return (
          <li key={`${item.time}-${i}`} className={item.type}>
            <span className="t">{item.time}</span>
            <span className="dot" />
            <div className="body">
              {stop ? (
                <StopItem stop={stop} seed={1000 + i * 7919} />
              ) : (
                <>
                  <h3>{item.title}</h3>
                  {item.note && <p>{item.note}</p>}
                </>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
