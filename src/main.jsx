import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Maintenance from './Maintenance.jsx'

const root = createRoot(document.getElementById('root'))

// Set at build time (repo variable MAINTENANCE_MODE). Vite folds this to a constant, so a
// maintenance build drops the app and the itinerary data from the bundle entirely.
if (import.meta.env.VITE_MAINTENANCE === 'true') {
  root.render(
    <StrictMode>
      <Maintenance />
    </StrictMode>,
  )
} else {
  Promise.all([import('react-router-dom'), import('./App.jsx')]).then(([{ HashRouter }, { default: App }]) => {
    // Hash routing keeps deep links working on GitHub Pages, which has no SPA fallback.
    root.render(
      <StrictMode>
        <HashRouter>
          <App />
        </HashRouter>
      </StrictMode>,
    )
  })
}
