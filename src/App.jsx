import data from './data/itinerary.json'
import FallingLeaves from './components/FallingLeaves.jsx'
import Hero from './components/Hero.jsx'
import Facts from './components/Facts.jsx'
import BestSpot from './components/BestSpot.jsx'
import RouteStrip from './components/RouteStrip.jsx'
import Timeline from './components/Timeline.jsx'
import FoodSection from './components/FoodSection.jsx'
import Backups from './components/Backups.jsx'
import Tips from './components/Tips.jsx'

export default function App() {
  return (
    <>
      <FallingLeaves />
      <div className="wrap">
        <Hero trip={data.trip} />
        <Facts facts={data.facts} />
        {data.bestSpot && <BestSpot best={data.bestSpot} stops={data.stops} />}
        <RouteStrip route={data.route} />
        <Timeline timeline={data.timeline} stops={data.stops} />
        <FoodSection food={data.food} />
        <Backups backups={data.backups} skip={data.skip} />
        <Tips tips={data.tips} />
        <footer>Times are estimates. Check ontarioparks.ca for alerts before you leave.</footer>
      </div>
    </>
  )
}
