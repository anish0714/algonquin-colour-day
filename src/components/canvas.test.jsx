import { render, screen } from '@testing-library/react'
import FallingLeaves from './FallingLeaves.jsx'
import SceneCanvas from './SceneCanvas.jsx'
import { createFakeContext } from '../test/fakeCanvas.js'

let ctx
let originalGetContext

beforeEach(() => {
  ctx = createFakeContext()
  originalGetContext = HTMLCanvasElement.prototype.getContext
  HTMLCanvasElement.prototype.getContext = () => ctx
})

afterEach(() => {
  HTMLCanvasElement.prototype.getContext = originalGetContext
  delete window.matchMedia
  jest.restoreAllMocks()
})

const prefersReducedMotion = (reduce) => {
  window.matchMedia = (q) => ({ matches: reduce && q.includes('reduce'), media: q })
}

describe('SceneCanvas', () => {
  it('paints its scene and labels it for screen readers', () => {
    render(<SceneCanvas scene="bog" seed={1000} label="Spruce Bog" />)
    expect(screen.getByRole('img', { name: 'Illustration of Spruce Bog' })).toBeInTheDocument()
    expect(ctx.calls.fill).toBeGreaterThan(0)
  })

  it('draws nothing for an unknown scene', () => {
    render(<SceneCanvas scene="volcano" seed={1} label="Nowhere" />)
    expect(ctx.calls.fill).toBeUndefined()
  })
})

describe('FallingLeaves', () => {
  it('animates leaves and stops when unmounted', () => {
    prefersReducedMotion(false)
    const raf = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 7)
    const cancel = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})

    const { unmount } = render(<FallingLeaves />)
    expect(ctx.calls.fill).toBeGreaterThanOrEqual(12)
    expect(raf).toHaveBeenCalledTimes(1)

    // Run a second frame by hand, then unmount.
    raf.mock.calls[0][0]()
    expect(raf).toHaveBeenCalledTimes(2)
    unmount()
    expect(cancel).toHaveBeenCalledWith(7)
  })

  it('draws once and holds still when the user prefers reduced motion', () => {
    prefersReducedMotion(true)
    const raf = jest.spyOn(window, 'requestAnimationFrame')

    render(<FallingLeaves />)
    expect(ctx.calls.fill).toBeGreaterThan(0)
    expect(raf).not.toHaveBeenCalled()

    // A resize redraws the still frame.
    const before = ctx.calls.fill
    window.dispatchEvent(new Event('resize'))
    expect(ctx.calls.fill).toBeGreaterThan(before)
  })

  it('is hidden from screen readers', () => {
    prefersReducedMotion(true)
    const { container } = render(<FallingLeaves />)
    expect(container.querySelector('#leaves')).toHaveAttribute('aria-hidden', 'true')
  })
})
