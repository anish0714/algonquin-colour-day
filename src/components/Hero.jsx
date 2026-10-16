function formatDate(iso) {
  // Parse as a local date so the weekday never shifts with the viewer's time zone.
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' })
  const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return `${weekday} · ${monthDay}, ${y}`
}

export default function Hero({ trip }) {
  return (
    <header className="hero">
      <small>{formatDate(trip.date)} · Highway 60</small>
      <h1>{trip.title}</h1>
      <p>{trip.summary}</p>
    </header>
  )
}
