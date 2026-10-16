import { useEffect, useRef } from 'react'

const COLORS = ['#b8361d', '#d9572b', '#e07a1f', '#e0a91f', '#c4471f', '#e8b93a']

function makeLeaf(w, h, randomY) {
  return {
    x: Math.random() * w,
    y: randomY ? Math.random() * h : -20,
    s: 8 + Math.random() * 12,
    vy: 0.3 + Math.random() * 0.5,
    sway: Math.random() * 6.28,
    sw: 0.4 + Math.random() * 0.8,
    r: Math.random() * 6.28,
    vr: (Math.random() - 0.5) * 0.02,
    col: COLORS[(Math.random() * COLORS.length) | 0],
    a: 0.35 + Math.random() * 0.3,
  }
}

function drawLeaf(ctx, l) {
  ctx.save()
  ctx.translate(l.x, l.y)
  ctx.rotate(l.r)
  ctx.globalAlpha = l.a
  ctx.fillStyle = l.col
  ctx.beginPath()
  ctx.moveTo(0, -l.s)
  ctx.quadraticCurveTo(l.s * 0.75, -l.s * 0.3, 0, l.s)
  ctx.quadraticCurveTo(-l.s * 0.75, -l.s * 0.3, 0, -l.s)
  ctx.fill()
  ctx.globalAlpha = l.a * 0.6
  ctx.strokeStyle = 'rgba(70,25,10,.6)'
  ctx.lineWidth = 0.8
  ctx.beginPath()
  ctx.moveTo(0, -l.s * 0.8)
  ctx.lineTo(0, l.s * 1.25)
  ctx.stroke()
  ctx.restore()
}

// Slowly drifting leaves behind the page. Drawn once and left still under prefers-reduced-motion.
export default function FallingLeaves() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return

    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0

    const size = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()

    const count = Math.round(Math.min(26, Math.max(12, w / 30)))
    const leaves = Array.from({ length: count }, () => makeLeaf(w, h, true))

    const frame = () => {
      ctx.clearRect(0, 0, w, h)
      leaves.forEach((l, i) => {
        if (!still) {
          l.sway += 0.012
          l.y += l.vy
          l.x += Math.sin(l.sway) * l.sw
          l.r += l.vr
          if (l.y > h + 20) leaves[i] = makeLeaf(w, h, false)
        }
        drawLeaf(ctx, leaves[i])
      })
      if (!still) raf = requestAnimationFrame(frame)
    }

    const onResize = () => {
      size()
      if (still) frame()
    }
    window.addEventListener('resize', onResize)
    frame()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas id="leaves" ref={ref} aria-hidden="true" />
}
