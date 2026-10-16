// A real photo with its Creative Commons credit, which the licences require.
export default function StopPhoto({ photo, className = 'scene' }) {
  return (
    <figure className="photo">
      <img className={className} src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
      <figcaption>
        Photo: <a href={photo.page} target="_blank" rel="noopener noreferrer">{photo.credit}</a>
        {' · '}
        <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer license">{photo.license}</a>
      </figcaption>
    </figure>
  )
}
