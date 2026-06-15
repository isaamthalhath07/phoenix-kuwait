import { useTranslation } from 'react-i18next'
import type { Lang } from '@/i18n'

/** Convenience hook for the active language, direction and field picking. */
export function useLocale() {
  const { i18n } = useTranslation()
  const lang = ((i18n.language || 'en').split('-')[0] as Lang) || 'en'
  const isAr = lang === 'ar'

  /** Pick the Arabic or English variant of a value. */
  const pick = <T>(en: T, ar: T): T => (isAr ? ar : en)

  return { lang, isAr, dir: isAr ? 'rtl' : 'ltr', pick }
}
