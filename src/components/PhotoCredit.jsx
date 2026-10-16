// Creative Commons credit line, which the licences require wherever a photo is shown large.
export default function PhotoCredit({ photo }) {
  return (
    <span className="credit">
      Photo: <a href={photo.page} target="_blank" rel="noopener noreferrer">{photo.credit}</a>
      {' · '}
      <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer license">{photo.license}</a>
      {photo.date && <> · {photo.date.slice(0, 4)}</>}
    </span>
  )
}
