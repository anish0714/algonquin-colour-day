import { SCENES, seededRandom } from './scenes.js'
import { createFakeContext } from '../test/fakeCanvas.js'
import data from '../data/itinerary.json'

describe('seededRandom', () => {
  it('repeats the same sequence for the same seed', () => {
    const a = seededRandom(42)
    const b = seededRandom(42)
    expect([a(), a(), a()]).toEqual([b(), b(), b()])
  })

  it('stays within [0, 1)', () => {
    const r = seededRandom(1000)
    for (let i = 0; i < 500; i++) {
      const v = r()
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    }
  })
})

describe('SCENES', () => {
  it('has a painter for every scene the data uses', () => {
    for (const s of data.stops) expect(SCENES).toHaveProperty(s.scene)
  })

  it.each(Object.keys(SCENES))('paints the %s scene without errors', (name) => {
    const ctx = createFakeContext()
    expect(() => SCENES[name](ctx, seededRandom(1000))).not.toThrow()
    expect(ctx.calls.fill + (ctx.calls.fillRect ?? 0)).toBeGreaterThan(10)
  })

  it('paints the same picture for the same seed', () => {
    const a = createFakeContext()
    const b = createFakeContext()
    SCENES.lake(a, seededRandom(7))
    SCENES.lake(b, seededRandom(7))
    expect(a.calls).toEqual(b.calls)
  })
})
