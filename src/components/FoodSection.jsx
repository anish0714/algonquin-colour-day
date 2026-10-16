import { useState } from 'react'
import { mapsUrl } from '../lib/maps.js'

function Place({ place }) {
  const street = place.address.replace(/, Huntsville$/, '')
  return (
    <div className="fd">
      <span className="cuisine">{place.cuisine}</span>
      <h4>{place.name}</h4>
      <p className="hrs">{street} · {place.hours}</p>
      <p><b className="tag ch">Chicken</b>{place.chicken}</p>
      <p><b className="tag vg">Vegan</b>{place.vegan}</p>
      {place.extra && <p className="extra">{place.extra}</p>}
      <a href={mapsUrl(place)} target="_blank" rel="noopener noreferrer">Open in Maps</a>
    </div>
  )
}

function Meal({ title, places }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {places.length > 0 ? (
        <div className="food">
          {places.map((p) => <Place key={p.name} place={p} />)}
        </div>
      ) : (
        <p className="sub">No picks for this cuisine at this meal.</p>
      )}
    </section>
  )
}

export default function FoodSection({ food }) {
  const [cuisine, setCuisine] = useState('All')
  const cuisines = ['All', ...new Set(food.places.map((p) => p.cuisine))]
  const shown = food.places.filter((p) => cuisine === 'All' || p.cuisine === cuisine)
  // Lunch lists only places that suit lunch; dinner-first places that also do lunch appear in both.
  const lunch = shown.filter((p) => p.meals.includes('lunch'))
  const dinner = shown.filter((p) => p.meals.includes('dinner'))

  return (
    <>
      <div className="filter" role="group" aria-label="Filter by cuisine">
        {cuisines.map((c) => (
          <button
            key={c}
            type="button"
            className={c === cuisine ? 'filter-btn on' : 'filter-btn'}
            aria-pressed={c === cuisine}
            onClick={() => setCuisine(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <Meal title={`Lunch to go · ${food.lunchTime}`} places={lunch} />
      <Meal title={`Dinner · ${food.dinnerTime}`} places={dinner} />
      <p className="sources">
        {food.sources.map((s) => (
          <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
        ))}
        . Dishes are typical picks for each kitchen; menus change, so confirm when you order.
      </p>
    </>
  )
}
