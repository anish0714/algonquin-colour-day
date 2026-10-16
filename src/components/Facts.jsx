export default function Facts({ facts }) {
  return (
    <section className="facts" aria-label="Key facts">
      {facts.map((f) => (
        <div key={f.value} className={f.tone === 'ok' ? 'fact ok' : 'fact'}>
          <b>{f.value}</b>
          <span>{f.label}</span>
        </div>
      ))}
    </section>
  )
}
