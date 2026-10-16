import StopCard from './StopCard.jsx'

export default function Timeline({ timeline, stops }) {
  const byId = Object.fromEntries(stops.map((s) => [s.id, s]))

  return (
    <section className="panel" aria-labelledby="timeline-title">
      <h2 id="timeline-title">The day, hour by hour</h2>
      <p className="sub">Red cards are short trails. Gold cards are drive-up views.</p>
      <p className="illo-note">Photos are from Wikimedia Commons, taken in early October. Two Rivers Trail has no free photo, so it shows a drawing.</p>
      <ol className="tl">
        {timeline.map((item, i) => {
          const stop = item.stopId && byId[item.stopId]
          return (
            <li key={`${item.time}-${i}`} className={item.type}>
              <span className="t">{item.time}</span>
              <span className="dot" />
              <div className="body">
                {stop ? (
                  <StopCard stop={stop} seed={1000 + i * 7919} />
                ) : (
                  <>
                    <h3>{item.title}</h3>
                    {item.note && <p>{item.note}</p>}
                  </>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
