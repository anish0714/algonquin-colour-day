import { PARK_LOTS, nearbyLots } from './parking.js'
import { getSpot } from './spots.js'

describe('PARK_LOTS', () => {
  it('combines our 11 spots with the extra lots', () => {
    expect(PARK_LOTS).toHaveLength(20)
    expect(PARK_LOTS.filter((l) => l.spotPage)).toHaveLength(11)
  })

  it('runs west to east by km', () => {
    const kms = PARK_LOTS.map((l) => l.km)
    expect(kms).toEqual([...kms].sort((a, b) => a - b))
  })

  it('has unique ids so React keys and links stay stable', () => {
    const ids = PARK_LOTS.map((l) => l.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('nearbyLots', () => {
  it('suggests Big Pines first when the Lookout lot is full', () => {
    const lots = nearbyLots(getSpot('lookout'))
    expect(lots[0].id).toBe('big-pines')
    expect(lots[0].distance).toBeCloseTo(0.6, 5)
  })

  it('never suggests the spot itself and sorts by distance', () => {
    const spot = getSpot('spruce-bog')
    const lots = nearbyLots(spot, 5)
    expect(lots).toHaveLength(5)
    expect(lots.map((l) => l.id)).not.toContain(spot.id)
    const distances = lots.map((l) => l.distance)
    expect(distances).toEqual([...distances].sort((a, b) => a - b))
  })
})
