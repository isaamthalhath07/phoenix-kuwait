import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en'
import ar from './locales/ar'

export const LANGS = ['en', 'ar'] as const
export type Lang = (typeof LANGS)[number]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en, ar },
    fallbackLng: 'en',
    supportedLngs: LANGS,
    load: 'languageOnly',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'phoenix-lang',
    },
    interpolation: { escapeValue: false },
  })

/** Apply <html dir/lang> based on the active language. */
export function applyDirection(lng: string) {
  const base = (lng || 'en').split('-')[0]
  const dir = base === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = base
  document.documentElement.dir = dir
}

applyDirection(i18n.language)
i18n.on('languageChanged', applyDirection)

export default i18n
