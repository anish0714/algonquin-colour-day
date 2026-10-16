import { render, screen } from '@testing-library/react'
import Maintenance from './Maintenance.jsx'
import data from './data/itinerary.json'

describe('Maintenance', () => {
  it('says the site is temporarily unavailable', () => {
    render(<Maintenance />)
    expect(screen.getByRole('heading', { level: 1, name: 'Temporarily unavailable' })).toBeInTheDocument()
  })

  it('reveals nothing about the trip', () => {
    const { container } = render(<Maintenance />)
    const text = container.textContent
    for (const word of [data.trip.title, 'Algonquin', 'Oct 17', 'Huntsville', ...data.stops.map((s) => s.name)]) {
      expect(text).not.toContain(word)
    }
    expect(container.querySelectorAll('a')).toHaveLength(0)
  })
})
