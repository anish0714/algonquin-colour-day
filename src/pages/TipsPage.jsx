import { Link } from 'react-router-dom'
import data from '../data/itinerary.json'
import Tips from '../components/Tips.jsx'
import usePageTitle from '../lib/usePageTitle.js'

export default function TipsPage() {
  usePageTitle('Tips & permit')
  const { permit } = data
  return (
    <div className="page">
      <header className="page-head">
        <h1>Tips & permit</h1>
        <p className="sub">What your pass covers, and what to bring.</p>
      </header>
      <div className="two-col">
        <section className="panel" aria-labelledby="permit-title">
          <h2 id="permit-title">Your park pass</h2>
          <dl className="fact-list">
            <div><dt>Pass</dt><dd>{permit.name}</dd></div>
            <div><dt>Cost</dt><dd>{permit.cost}</dd></div>
            <div><dt>Valid</dt><dd>{permit.validHours}</dd></div>
            <div><dt>Covers</dt><dd>{permit.covers}</dd></div>
            <div><dt>Checked by</dt><dd>{permit.checkedBy}</dd></div>
            <div><dt>Not covered</dt><dd>{permit.doesNotCover.join('; ')}</dd></div>
          </dl>
          <div className="btn-row">
            <a className="btn primary" href={permit.bookAt} target="_blank" rel="noopener noreferrer">Book at Ontario Parks</a>
            <Link className="btn" to="/parking">All parking fees</Link>
          </div>
        </section>
        <Tips tips={data.tips} />
      </div>
    </div>
  )
}
