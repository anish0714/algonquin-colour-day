import { useState } from 'react'
import SceneCanvas from './SceneCanvas.jsx'
import PhotoCredit from './PhotoCredit.jsx'

export default function Gallery({ spot }) {
  const [active, setActive] = useState(0)
  const photos = spot.photos ?? []

  if (photos.length === 0) {
    return (
      <figure className="gallery">
        <div className="stage">
          <SceneCanvas scene={spot.scene ?? 'panorama'} seed={1000} label={spot.name} className="stage-img" />
        </div>
        <figcaption className="credit">No free-licensed photo of this spot exists yet, so this is a drawing.</figcaption>
      </figure>
    )
  }

  const photo = photos[Math.min(active, photos.length - 1)]
  // Panoramas would lose most of the frame to cropping, so show them whole.
  const wide = photo.width / photo.height > 2

  return (
    <figure className="gallery">
      <div className="stage">
        <img key={photo.src} className={wide ? 'stage-img contain' : 'stage-img'} src={photo.src} alt={photo.alt} decoding="async" />
        {photos.length > 1 && <span className="count">{active + 1} / {photos.length}</span>}
      </div>
      <figcaption>
        <span className="alt-text">{photo.alt}</span>
        <PhotoCredit photo={photo} />
      </figcaption>
      {photos.length > 1 && (
        <div className="thumbs" role="tablist" aria-label="Photos">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Photo ${i + 1}: ${p.alt}`}
              className={i === active ? 'thumb on' : 'thumb'}
              onClick={() => setActive(i)}
            >
              <img src={p.src} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </figure>
  )
}
