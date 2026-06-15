import { useTranslation } from 'react-i18next'
import { Languages } from 'lucide-react'
import { cn } from '@/lib/cn'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n } = useTranslation()
  const isAr = (i18n.language || 'en').startsWith('ar')
  const next = isAr ? 'en' : 'ar'

  return (
    <button
      type="button"
      onClick={() => i18n.changeLanguage(next)}
      aria-label={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-sm font-semibold text-ink-200 transition-all hover:border-ember-400/50 hover:text-white',
        className,
      )}
    >
      <Languages className="h-4 w-4 text-ember-400" />
      <span className="font-display">{isAr ? 'EN' : 'العربية'}</span>
    </button>
  )
}
