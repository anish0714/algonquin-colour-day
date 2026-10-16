import { useEffect } from 'react'
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom'
import FallingLeaves from './FallingLeaves.jsx'
import Icon from './Icon.jsx'

const TABS = [
  { to: '/', label: 'Overview', icon: 'home', end: true },
  { to: '/schedule', label: 'Schedule', icon: 'clock' },
  { to: '/spots', label: 'Spots', icon: 'pin' },
  { to: '/food', label: 'Food', icon: 'food' },
  { to: '/tips', label: 'Tips', icon: 'info' },
]

function TabLinks({ className }) {
  return (
    <nav className={className} aria-label="Sections">
      {TABS.map((t) => (
        <NavLink key={t.to} to={t.to} end={t.end} className="tab">
          <Icon name={t.icon} />
          <span>{t.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default function Layout() {
  const { pathname } = useLocation()

  // Each tab and spot page starts at the top, like a real page load.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <FallingLeaves />
      <header className="topbar">
        <div className="topbar-inner">
          <Link to="/" className="brand">
            <svg className="brand-mark" viewBox="-12 -12 24 24" aria-hidden="true">
              <path d="M0-10Q7.5-3 0 10Q-7.5-3 0-10Z" />
              <path d="M0-8V12" fill="none" stroke="rgba(70,25,10,.55)" strokeWidth="1" />
            </svg>
            <span>
              <b>Algonquin Colour Day</b>
              <small>Sat · Oct 17 · Hwy 60</small>
            </span>
          </Link>
          <TabLinks className="tabs-top" />
        </div>
      </header>
      <main className="wrap">
        <Outlet />
        <footer className="foot">Times are estimates. Check ontarioparks.ca for alerts before you leave.</footer>
      </main>
      <TabLinks className="tabs-bottom" />
    </>
  )
}
