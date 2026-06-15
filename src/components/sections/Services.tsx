import {
  Building2,
  TrafficCone,
  Hammer,
  Sofa,
  PlugZap,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SERVICES } from '@/lib/constants'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

const ICONS: Record<string, LucideIcon> = {
  Building2,
  TrafficCone,
  Hammer,
  Sofa,
  PlugZap,
  ClipboardList,
}

export function Services() {
  const { t } = useTranslation()

  return (
    <section className="container-x py-24" id="services">
      <SectionHeading
        eyebrow={t('services.eyebrow')}
        title={t('services.title')}
        subtitle={t('services.subtitle')}
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => {
          const Icon = ICONS[service.icon] ?? Building2
          return (
            <Reveal key={service.key} delay={i * 0.07} variant="up">
              <article className="card-glow border-glow group h-full rounded-2xl bg-ink-850 p-7">
                <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-ember-500/20 to-ember-600/5 text-ember-400 transition-all duration-500 group-hover:from-ember-500 group-hover:to-ember-600 group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">
                  {t(`services.${service.key}.desc`)}
                </p>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
