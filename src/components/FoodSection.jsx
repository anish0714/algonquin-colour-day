import { mapsUrl } from '../lib/maps.js'

function Place({ place }) {
  const street = place.address.replace(/, Huntsville$/, '')
  return (
    <div className="fd">
      <h4>{place.name}</h4>
      <p className="hrs">{street} · {place.hours}</p>
      <p><b className="tag ch">Chicken</b>{place.chicken}</p>
      <p><b className="tag vg">Vegan</b>{place.vegan}</p>
      <a href={mapsUrl(place)} target="_blank" rel="noopener noreferrer">Open in Maps</a>
    </div>
  )
}

function Meal({ title, meal }) {
  return (
    <section className="panel">
      <h2>{title} · {meal.time}</h2>
      <div className="food">
        {meal.places.map((p) => <Place key={p.name} place={p} />)}
      </div>
    </section>
  )
}

export default function FoodSection({ food }) {
  return (
    <>
      <Meal title="Lunch to go" meal={food.lunch} />
      <Meal title="Dinner" meal={food.dinner} />
    </>
  )
}
