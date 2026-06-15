import { useEffect } from 'react'
import { SITE } from '@/lib/constants'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Sets the document title and core meta tags for a page. */
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE.nameEn}` : `${SITE.nameEn} | ${SITE.taglineEn}`
    document.title = fullTitle
    setMeta('property', 'og:title', fullTitle)
    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
    }
  }, [title, description])
}
