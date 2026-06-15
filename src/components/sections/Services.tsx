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
import { Tilt } from '@/components/ui/Tilt'

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
    <section className="container-x py-24 relative overflow-hidden" id="services">
      {/* Subtle blueprint grid overlay */}
      <div className="cyber-grid opacity-30 pointer-events-none" />

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
              <Tilt className="h-full" max={9}>
                <article className="card-glow border-glow cyber-corners group h-full rounded-2xl cyber-glass p-7 [transform-style:preserve-3d] transition-all duration-300">
                  {/* Subtle inner card grid lines */}
                  <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />
                  
                  {/* Glowing core indicator */}
                  <span className="absolute top-5 right-5 h-1.5 w-1.5 rounded-full bg-ember-500 opacity-30 shadow-[0_0_8px_#f97316] transition-all duration-500 group-hover:scale-125 group-hover:opacity-100 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_#22d3ee]" />

                  <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-ember-500/15 to-ember-600/5 text-ember-450 border border-ember-550/20 transition-all duration-500 group-hover:from-ember-500 group-hover:to-ember-600 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] [transform:translateZ(28px)]">
                    <Icon className="h-7 w-7 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  
                  <h3 className="mt-6 text-xl font-bold text-white tracking-wide transition-colors group-hover:text-ember-400 [transform:translateZ(18px)]">
                    {t(`services.${service.key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-300">
                    {t(`services.${service.key}.desc`)}
                  </p>
                </article>
              </Tilt>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

