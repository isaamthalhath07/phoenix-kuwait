import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { PhoenixMark } from '@/components/Logo'
import { useLocale } from '@/hooks/useLocale'

export function AboutPreview() {
  const { t } = useTranslation()
  const { isAr } = useLocale()
  const Arrow = isAr ? ArrowLeft : ArrowRight
  const points = ['about.value1', 'about.value2', 'about.value3', 'about.value4']

  return (
    <section className="container-x py-24">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        {/* Visual */}
        <Reveal variant="left">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-ember-600/20 to-transparent blur-2xl" />
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <PhoenixMark className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 animate-float drop-shadow-[0_0_40px_rgba(249,115,22,0.5)]" />
              <div className="absolute bottom-6 start-6 end-6 glass rounded-2xl p-5">
                <p className="font-display text-3xl font-extrabold text-white">15+</p>
                <p className="text-sm text-ink-300">{t('stats.years')}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal variant="right">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-ember-400">
            <span className="h-px w-7 bg-gradient-to-r from-transparent to-ember-500" />
            {t('about.eyebrow')}
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t('about.title')}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-200">{t('about.lead')}</p>
          <p className="mt-4 leading-relaxed text-ink-300">{t('about.body1')}</p>

          <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm text-ink-200">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-ember-500" />
                {t(`${p}.title`)}
              </li>
            ))}
          </ul>

          <Button to="/about" size="lg" variant="secondary" className="mt-9">
            {t('common.learnMore')}
            <Arrow className="h-5 w-5" />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
