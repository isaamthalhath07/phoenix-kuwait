import { useLocale } from '@/hooks/useLocale'
import { SITE } from '@/lib/constants'

/** Phoenix flame mark + wordmark. */
export function Logo({ compact = false }: { compact?: boolean }) {
  const { isAr } = useLocale()
  return (
    <span className="flex items-center gap-2.5">
      <PhoenixMark className="h-9 w-9 shrink-0" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-extrabold tracking-tight text-white">
            {isAr ? SITE.nameAr : 'PHOENIX'}
          </span>
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-ember-400">
            {isAr ? SITE.taglineAr : 'KUWAIT'}
          </span>
        </span>
      )}
    </span>
  )
}

export function PhoenixMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="phx" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="45%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
      </defs>
      <path
        d="M24 3c2.6 6.2 1.4 10.6-1.4 14.4 4.6-1 7.2-4 8.6-7.6 2.4 5.6 1.4 11-2.2 15.4 3.4-.6 6-2.4 7.8-5 .8 6.6-2.4 12.4-8 15.6 3 .4 5.8-.2 8.2-1.6-2.8 5.4-8.6 9-15 9-8.8 0-16-6.6-16-15 0-5.4 3-9.8 6.4-13.6-1 3.2-.8 6 .8 8.4C18.2 22.4 18 13.4 24 3Z"
        fill="url(#phx)"
      />
      <path
        d="M24 41c-3.6 0-6.6-2.6-6.6-6 0-3 2.4-5.4 4.4-8 .6 2 1.6 3.2 3 4-.4-2.6.2-4.8 1.6-6.8 1.4 2.4 4.2 4.8 4.2 9.2 0 4.2-3 7.6-6.6 7.6Z"
        fill="#fff7ed"
        opacity="0.92"
      />
    </svg>
  )
}
