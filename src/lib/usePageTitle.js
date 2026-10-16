import { useEffect } from 'react'

const SITE = 'Algonquin Colour Day'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : SITE
  }, [title])
}
