import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="page narrow">
      <section className="panel">
        <h1>Page not found</h1>
        <p className="sub">That page isn't part of the trip plan.</p>
        <Link to="/" className="btn primary">Back to overview</Link>
      </section>
    </div>
  )
}
