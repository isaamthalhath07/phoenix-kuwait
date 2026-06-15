import { useTranslation } from 'react-i18next'
import { STATS } from '@/lib/constants'
import { Counter } from '@/components/ui/Counter'
import { Reveal } from '@/components/ui/Reveal'
import { EmberBackground } from '@/components/EmberBackground'

export function Stats() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-ink-900 py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-ember-600/5 via-transparent to-gold-500/5" />
      <EmberBackground density={12} />
      <div className="container-x relative">
        <Reveal variant="fade">
          <h2 className="mb-14 text-center text-2xl font-bold text-white sm:text-3xl">
            {t('stats.title')}
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.key} delay={i * 0.1} variant="up" className="text-center">
              <div className="font-display text-5xl font-extrabold text-gradient sm:text-6xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 text-sm font-medium uppercase tracking-wider text-ink-300">
                {t(`stats.${stat.key}`)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
