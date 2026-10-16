import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from '../test/renderApp.jsx'
import data from '../data/itinerary.json'
import { SPOTS } from '../lib/spots.js'

// Both tab bars render; CSS hides one per screen size. Use the top one.
const topTabs = () => within(screen.getAllByRole('navigation', { name: 'Sections' })[0])

describe('tabs', () => {
  it.each([
    ['/', 'Algonquin Fall Colour Day', 'Overview'],
    ['/schedule', 'The day, hour by hour', 'Schedule'],
    ['/spots', 'Spots', 'Spots'],
    ['/parking', 'Parking and fees', 'Parking'],
    ['/food', 'Food in Huntsville', 'Food'],
    ['/tips', 'Tips & permit', 'Tips'],
  ])('%s shows its page and highlights its tab', (path, heading, tab) => {
    renderApp(path)
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
    expect(topTabs().getByRole('link', { name: tab })).toHaveClass('active')
  })

  it('moves between tabs when one is clicked', async () => {
    const user = userEvent.setup()
    renderApp('/')
    await user.click(topTabs().getByRole('link', { name: 'Parking' }))
    expect(screen.getByRole('heading', { level: 1, name: 'Parking and fees' })).toBeInTheDocument()
  })

  it('sets the browser tab title per page', () => {
    renderApp('/food')
    expect(document.title).toBe('Food · Algonquin Colour Day')
  })
})

describe('overview', () => {
  it('features the best spot and links to its page', async () => {
    const user = userEvent.setup()
    renderApp('/')
    expect(screen.getByRole('heading', { name: data.bestSpot.heading })).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: /see photos and parking/i }))
    expect(screen.getByRole('heading', { level: 1, name: '4 · Lookout Trail ★' })).toBeInTheDocument()
  })

  it('links every stop and backup on the route', () => {
    renderApp('/')
    const route = screen.getByRole('heading', { name: 'Your route through the park' }).closest('section')
    expect(within(route).getAllByRole('link')).toHaveLength(SPOTS.length)
  })
})

describe('spots list', () => {
  it('shows a card for every stop and backup', () => {
    renderApp('/spots')
    for (const s of SPOTS) {
      expect(screen.getByRole('link', { name: new RegExp(s.name) })).toHaveAttribute('href', `/spots/${s.id}`)
    }
  })
})

describe('spot page', () => {
  it.each(SPOTS.map((s) => [s.id]))('%s renders photos or a drawing, facts and parking', (id) => {
    renderApp(`/spots/${id}`)
    const spot = SPOTS.find((s) => s.id === id)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(spot.name)
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /parking/i, level: 2 })).toBeInTheDocument()
    expect(screen.getByText('Fee: included')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /directions$/i })).toHaveAttribute('href', expect.stringContaining('/maps/dir/'))
    expect(screen.getByTitle(`Map of ${spot.name} parking`)).toBeInTheDocument()
  })

  it('suggests nearby lots when the lot is full', () => {
    renderApp('/spots/lookout')
    const list = screen.getByRole('heading', { name: 'If this lot is full' }).nextElementSibling
    const items = within(list).getAllByRole('listitem')
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent('Big Pines Trail')
    expect(items[0]).toHaveTextContent('+0.6 km')
  })

  it('shows the planned time for stops and "Backup only" for backups', () => {
    renderApp('/spots/lookout')
    expect(screen.getByText('2:15 PM')).toBeInTheDocument()
  })

  it('labels backups', () => {
    renderApp('/spots/peck-lake')
    expect(screen.getByText('Backup only')).toBeInTheDocument()
    expect(screen.getByText('Backup spot')).toBeInTheDocument()
  })

  it('steps to the next spot', async () => {
    const user = userEvent.setup()
    renderApp('/spots/lookout')
    await user.click(screen.getByRole('link', { name: /next spruce bog/i }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Spruce Bog Boardwalk')
  })

  it('shows "Page not found" for an unknown spot', () => {
    renderApp('/spots/nowhere')
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })
})

describe('parking page', () => {
  it('lists every fee, including the $21 permit', () => {
    renderApp('/parking')
    const table = screen.getByRole('table', { name: /parking and permit fees/i })
    expect(within(table).getAllByRole('row')).toHaveLength(data.parking.fees.length + 1)
    expect(within(table).getByText('$21.00 per vehicle')).toBeInTheDocument()
  })

  it('lists all Highway 60 lots and Huntsville lots', () => {
    renderApp('/parking')
    const lists = screen.getAllByRole('list')
    const hwy = screen.getByRole('heading', { name: 'Lots along Highway 60' }).closest('section')
    const town = screen.getByRole('heading', { name: /Huntsville/ }).closest('section')
    expect(lists.length).toBeGreaterThan(0)
    expect(within(hwy).getAllByRole('listitem')).toHaveLength(20)
    expect(within(town).getAllByRole('listitem')).toHaveLength(data.parking.townLots.length)
  })
})

describe('unknown routes', () => {
  it('show "Page not found" with a way back', () => {
    renderApp('/nope')
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to overview' })).toHaveAttribute('href', '/')
  })
})
