// Shown instead of the app while the site is switched off. Deliberately holds no trip details.
export default function Maintenance() {
  return (
    <main className="maintenance">
      <div className="maintenance-card">
        <svg className="brand-mark" viewBox="-12 -12 24 24" aria-hidden="true">
          <path d="M0-10Q7.5-3 0 10Q-7.5-3 0-10Z" />
        </svg>
        <h1>Temporarily unavailable</h1>
        <p>This page is offline for now. Please check back later.</p>
      </div>
    </main>
  )
}
