export default function Tips({ tips }) {
  return (
    <section className="panel" aria-labelledby="tips-title">
      <h2 id="tips-title">Photo and packing tips</h2>
      <ul className="tips">
        {tips.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </section>
  )
}
