import { useTranslation } from 'react-i18next'
import { Search, PencilRuler, HardHat, KeyRound, type LucideIcon } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

const STEPS: { key: string; icon: LucideIcon }[] = [
  { key: 'step1', icon: Search },
  { key: 'step2', icon: PencilRuler },
  { key: 'step3', icon: HardHat },
  { key: 'step4', icon: KeyRound },
]

export function Process() {
  const { t } = useTranslation()

  return (
    <section className="container-x py-24">
      <SectionHeading eyebrow={t('process.eyebrow')} title={t('process.title')} />

      <div className="relative mt-16">
        {/* connecting line */}
        <div className="absolute start-0 top-9 hidden h-px w-full bg-gradient-to-r from-transparent via-ember-600/40 to-transparent lg:block" />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal key={step.key} delay={i * 0.12} variant="up" className="relative text-center">
                <div className="relative mx-auto inline-flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-ember-500/30 bg-ink-900 text-ember-400 shadow-lg shadow-ember-900/30">
                  <Icon className="h-8 w-8" />
                  <span className="absolute -end-2 -top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ember-500 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">
                  {t(`process.${step.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">
                  {t(`process.${step.key}.desc`)}
                </p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
