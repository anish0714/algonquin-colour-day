import data from '../data/itinerary.json'
import FoodSection from '../components/FoodSection.jsx'
import usePageTitle from '../lib/usePageTitle.js'

export default function FoodPage() {
  usePageTitle('Food')
  return (
    <div className="page">
      <header className="page-head">
        <h1>Food in Huntsville</h1>
        <p className="sub">Grab lunch to go on the way up and eat dinner on the way home. {data.food.note}</p>
      </header>
      <FoodSection food={data.food} />
    </div>
  )
}
