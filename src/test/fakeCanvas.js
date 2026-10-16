// A stand-in 2D context that accepts every drawing call and counts them, so canvas code can run in jsdom.
export function createFakeContext() {
  const calls = {}
  const gradient = { addColorStop: () => {} }
  const ctx = new Proxy(
    { calls },
    {
      get(target, prop) {
        if (prop in target) return target[prop]
        if (prop === 'createLinearGradient' || prop === 'createRadialGradient') {
          return () => gradient
        }
        return () => {
          calls[prop] = (calls[prop] ?? 0) + 1
        }
      },
      set(target, prop, value) {
        target[prop] = value
        return true
      },
    },
  )
  return ctx
}
