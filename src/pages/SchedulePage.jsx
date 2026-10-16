import data from '../data/itinerary.json'
import Timeline from '../components/Timeline.jsx'
import usePageTitle from '../lib/usePageTitle.js'

export default function SchedulePage() {
  usePageTitle('Schedule')
  return (
    <div className="page narrow">
      <header className="page-head">
        <h1>The day, hour by hour</h1>
        <p className="sub">Red cards are short trails. Gold cards are drive-up views. Tap any stop for photos and parking.</p>
      </header>
      <section className="panel">
        <Timeline timeline={data.timeline} />
      </section>
    </div>
  )
}
