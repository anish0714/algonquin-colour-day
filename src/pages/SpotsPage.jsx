import data from '../data/itinerary.json'
import SpotCard from '../components/SpotCard.jsx'
import { SPOTS } from '../lib/spots.js'
import usePageTitle from '../lib/usePageTitle.js'

export default function SpotsPage() {
  usePageTitle('Spots')
  const stops = SPOTS.filter((s) => s.kind === 'stop')
  const backups = SPOTS.filter((s) => s.kind === 'backup')

  return (
    <div className="page">
      <header className="page-head">
        <h1>Spots</h1>
        <p className="sub">Every place on the plan, in the order you'll visit. Open one for photos, details and a parking map.</p>
      </header>

      <h2 className="group-title">Today's stops</h2>
      <div className="spot-grid">
        {stops.map((s) => <SpotCard key={s.id} spot={s} />)}
      </div>

      <h2 className="group-title">Backups if a lot is full</h2>
      <div className="spot-grid">
        {backups.map((s) => <SpotCard key={s.id} spot={s} />)}
      </div>
      {data.skip.length > 0 && <p className="skip">Skip {data.skip.join(' and ')}.</p>}
    </div>
  )
}
