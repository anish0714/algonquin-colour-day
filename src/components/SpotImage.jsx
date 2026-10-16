import SceneCanvas from './SceneCanvas.jsx'

// First photo of a spot, or its painted scene when no licensed photo exists. No caption: use on cards.
export default function SpotImage({ spot, className = 'scene', seed = 1000 }) {
  const photo = spot.photos?.[0]
  if (photo) {
    return <img className={className} src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
  }
  return <SceneCanvas scene={spot.scene ?? 'panorama'} seed={seed} label={spot.name} className={className} />
}
