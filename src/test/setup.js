import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'node:util'

// jsdom lacks these; React Router needs them.
Object.assign(globalThis, { TextEncoder, TextDecoder })

// jsdom has no canvas or scrolling; the leaves and painted scenes just skip drawing.
HTMLCanvasElement.prototype.getContext = () => null
window.scrollTo = () => {}
