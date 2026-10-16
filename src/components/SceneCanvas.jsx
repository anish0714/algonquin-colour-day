import { useEffect, useRef } from 'react'
import { SCENES, SCENE_W, SCENE_H, seededRandom } from '../lib/scenes.js'

export default function SceneCanvas({ scene, seed, label }) {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = ref.current?.getContext('2d')
    const paint = SCENES[scene]
    if (!ctx || !paint) return
    ctx.clearRect(0, 0, SCENE_W, SCENE_H)
    paint(ctx, seededRandom(seed))
  }, [scene, seed])

  return (
    <canvas
      ref={ref}
      className="scene"
      width={SCENE_W}
      height={SCENE_H}
      role="img"
      aria-label={`Illustration of ${label}`}
    />
  )
}
