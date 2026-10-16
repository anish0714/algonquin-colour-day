import SceneCanvas from './SceneCanvas.jsx'
import StopPhoto from './StopPhoto.jsx'
import ParkingNote from './ParkingNote.jsx'

export default function StopCard({ stop, seed }) {
  const title = `${stop.order} · ${stop.name}${stop.star ? ' ★' : ''}`
  return (
    <>
      {/* Real photo when we have a licensed one; painted scene otherwise. */}
      {stop.photo
        ? <StopPhoto photo={stop.photo} />
        : <SceneCanvas scene={stop.scene} seed={seed} label={title} />}
      <h3>{title}</h3>
      <p>{stop.description}</p>
      <ParkingNote place={stop} />
      <div className="chips">
        <span className="chip km2">km {stop.km}</span>
        {stop.length && <span className="chip">{stop.length}</span>}
        {stop.duration && <span className="chip">{stop.duration}</span>}
      </div>
    </>
  )
}
