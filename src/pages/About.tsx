import { useTranslation } from 'react-i18next'
import { Target, Eye, ShieldCheck, HardHat, Gem, Handshake, type LucideIcon } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Stats } from '@/components/sections/Stats'
import { Process } from '@/components/sections/Process'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { Reveal } from '@/components/ui/Reveal'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

const VALUE_ICONS: LucideIcon[] = [ShieldCheck, HardHat, Gem, Handshake]

export default function About() {
  const { t } = useTranslation()
  useDocumentMeta(t('about.title'), t('about.lead'))
  const values = ['value1', 'value2', 'value3', 'value4']

  return (
    <>
      <PageHero eyebrow={t('about.eyebrow')} title={t('about.title')} subtitle={t('about.lead')} />

      {/* Story */}
      <section className="container-x py-16">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-ink-300">
          <Reveal variant="up">
            <p>{t('about.body1')}</p>
          </Reveal>
          <Reveal variant="up" delay={0.08}>
            <p>{t('about.body2')}</p>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container-x py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { icon: Target, title: t('about.missionTitle'), body: t('about.mission') },
            { icon: Eye, title: t('about.visionTitle'), body: t('about.vision') },
          ].map((card, i) => {
            const Icon = card.icon
            return (
              <Reveal key={card.title} variant={i === 0 ? 'left' : 'right'}>
                <div className="card-glow border-glow h-full rounded-2xl bg-ink-850 p-8">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-ember-500/20 to-ember-600/5 text-ember-400">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-white">{card.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-300">{card.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Values */}
      <section className="container-x py-16">
        <Reveal variant="fade">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">{t('about.valuesTitle')}</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = VALUE_ICONS[i]
            return (
              <Reveal key={v} variant="up" delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/5 bg-ink-900 p-6 text-center transition-colors hover:border-ember-400/30">
                  <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-ember-500/10 text-ember-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white">{t(`about.${v}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">{t(`about.${v}.desc`)}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <Stats />
      <Process />
      <ContactCTA />
    </>
  )
}
