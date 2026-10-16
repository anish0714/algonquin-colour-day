import { Link } from 'react-router-dom'
import data from '../data/itinerary.json'
import Hero from '../components/Hero.jsx'
import Facts from '../components/Facts.jsx'
import BestSpot from '../components/BestSpot.jsx'
import RouteStrip from '../components/RouteStrip.jsx'
import usePageTitle from '../lib/usePageTitle.js'

const NEXT = [
  { to: '/schedule', title: 'Schedule', text: 'Hour by hour, 8 AM to home' },
  { to: '/spots', title: 'Spots', text: 'Photos, info and parking for every stop' },
  { to: '/parking', title: 'Parking', text: 'Every lot on Hwy 60 and all fees' },
  { to: '/food', title: 'Food', text: 'Indian, Thai, Mexican and more in Huntsville' },
  { to: '/tips', title: 'Tips & permit', text: 'Your pass, packing and photo tips' },
]

export default function OverviewPage() {
  usePageTitle(null)
  return (
    <div className="page">
      <Hero trip={data.trip} />
      <Facts facts={data.facts} />
      <div className="overview-grid">
        <BestSpot best={data.bestSpot} />
        <RouteStrip route={data.route} />
      </div>
      <nav className="jump" aria-label="More">
        {NEXT.map((n) => (
          <Link key={n.to} to={n.to} className="jump-card">
            <b>{n.title} →</b>
            <span>{n.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
