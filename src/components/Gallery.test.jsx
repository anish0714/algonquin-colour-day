import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Gallery from './Gallery.jsx'
import { getSpot } from '../lib/spots.js'

describe('Gallery', () => {
  it('shows the first photo with its credit and a counter', () => {
    const spot = getSpot('lookout')
    render(<Gallery spot={spot} />)

    const main = screen.getByRole('img', { name: spot.photos[0].alt })
    expect(main).toHaveAttribute('src', spot.photos[0].src)
    expect(screen.getByText(`1 / ${spot.photos.length}`)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: spot.photos[0].credit })).toHaveAttribute('href', spot.photos[0].page)
  })

  it('switches photos from the thumbnails', async () => {
    const user = userEvent.setup()
    const spot = getSpot('lookout')
    render(<Gallery spot={spot} />)

    const thumbs = screen.getAllByRole('tab')
    expect(thumbs).toHaveLength(spot.photos.length)
    expect(thumbs[0]).toHaveAttribute('aria-selected', 'true')

    await user.click(thumbs[1])
    expect(thumbs[1]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('img', { name: spot.photos[1].alt })).toBeInTheDocument()
    expect(screen.getByText(`2 / ${spot.photos.length}`)).toBeInTheDocument()
  })

  it('shows panoramas whole instead of cropping them', async () => {
    const user = userEvent.setup()
    const spot = getSpot('spruce-bog')
    render(<Gallery spot={spot} />)
    // Kettle Bog is a 1280×418 panorama.
    await user.click(screen.getAllByRole('tab')[2])
    expect(screen.getByRole('img', { name: spot.photos[2].alt })).toHaveClass('contain')
  })

  it('falls back to the drawing when a spot has no photo', () => {
    render(<Gallery spot={getSpot('two-rivers-trail')} />)
    expect(screen.getByRole('img', { name: 'Illustration of Two Rivers Trail' })).toBeInTheDocument()
    expect(screen.getByText(/no free-licensed photo/i)).toBeInTheDocument()
    expect(screen.queryByRole('tab')).not.toBeInTheDocument()
  })
})
