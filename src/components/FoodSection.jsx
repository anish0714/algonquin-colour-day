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
    <>
      <h3 className="meal">{title} · {meal.time}</h3>
      <div className="food">
        {meal.places.map((p) => <Place key={p.name} place={p} />)}
      </div>
    </>
  )
}

export default function FoodSection({ food }) {
  return (
    <section className="panel" aria-labelledby="food-title">
      <h2 id="food-title">Food in Huntsville</h2>
      <p className="sub">
        Grab lunch to go on the way up and eat dinner on the way home. {food.note}
      </p>
      <Meal title="Lunch to go" meal={food.lunch} />
      <Meal title="Dinner" meal={food.dinner} />
    </section>
  )
}
