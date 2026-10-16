export default function RouteStrip({ route }) {
  return (
    <section className="panel" aria-labelledby="route-title">
      <h2 id="route-title">Your route through the park</h2>
      <p className="sub">Highway 60 from West Gate to East Gate. Numbers show the order you'll visit.</p>
      <ol className="route">
        {route.map((p) => (
          <li key={p.name} className={p.kind}>
            <span className="km">{p.km === 0 ? 'km 0' : p.km}</span>
            <span className="pin">{p.kind === 'stop' ? p.order : null}</span>
            <span className="nm">
              {p.name}
              {p.star && ' ★'}
              {p.kind === 'backup' && ' (backup)'}
              {p.note && <em> · {p.note}</em>}
            </span>
          </li>
        ))}
      </ol>
      <div className="legend">
        <span><i className="stop" />Today's stops</span>
        <span><i className="backup" />Backup if a lot is full</span>
      </div>
    </section>
  )
}
