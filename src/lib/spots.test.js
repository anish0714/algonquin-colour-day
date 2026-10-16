import { SPOTS, getSpot, neighbours, plannedVisit, spotTitle } from './spots.js'

describe('SPOTS', () => {
  it('lists the 7 stops in visit order, then the 4 backups', () => {
    expect(SPOTS).toHaveLength(11)
    const stops = SPOTS.filter((s) => s.kind === 'stop')
    expect(stops.map((s) => s.order)).toEqual([1, 2, 3, 4, 5, 6, 7])
    expect(SPOTS.slice(7).every((s) => s.kind === 'backup')).toBe(true)
  })
})

describe('getSpot', () => {
  it('finds stops and backups by id', () => {
    expect(getSpot('lookout').name).toBe('Lookout Trail')
    expect(getSpot('logging-museum').kind).toBe('backup')
  })

  it('returns undefined for unknown ids', () => {
    expect(getSpot('not-a-spot')).toBeUndefined()
  })
})

describe('plannedVisit', () => {
  it('returns the timeline entry for a planned stop', () => {
    expect(plannedVisit('lookout').time).toBe('2:15')
  })

  it('returns nothing for backups', () => {
    expect(plannedVisit('peck-lake')).toBeUndefined()
  })
})

describe('neighbours', () => {
  it('has no previous spot at the start and no next spot at the end', () => {
    expect(neighbours(SPOTS[0].id).prev).toBeUndefined()
    expect(neighbours(SPOTS.at(-1).id).next).toBeUndefined()
  })

  it('links a stop to the ones either side of it', () => {
    const { prev, next } = neighbours('lookout')
    expect(prev.id).toBe('two-rivers-trail')
    expect(next.id).toBe('spruce-bog')
  })
})

describe('spotTitle', () => {
  it('numbers stops and stars the best spot', () => {
    expect(spotTitle(getSpot('lookout'))).toBe('4 · Lookout Trail ★')
    expect(spotTitle(getSpot('whiskey-rapids'))).toBe('1 · Whiskey Rapids Trail')
  })

  it('leaves backups unnumbered', () => {
    expect(spotTitle(getSpot('peck-lake'))).toBe('Peck Lake')
  })
})
