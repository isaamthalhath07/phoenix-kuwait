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
    <section className="container-x py-24 relative overflow-hidden">
      {/* Background cyber grid */}
      <div className="cyber-grid opacity-20 pointer-events-none" />

      <SectionHeading eyebrow={t('process.eyebrow')} title={t('process.title')} />

      <div className="relative mt-20">
        {/* Futuristic energy pipeline line */}
        <div className="absolute start-0 top-10 hidden h-[2px] w-full bg-gradient-to-r from-transparent via-ember-500/40 to-transparent lg:block animate-pulse" />
        
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal key={step.key} delay={i * 0.12} variant="up" className="relative text-center group">
                {/* Schematic node wrapper */}
                <div className="relative mx-auto inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-ember-500/25 bg-ink-950 text-ember-450 shadow-[0_0_15px_rgba(249,115,22,0.06)] transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-400 group-hover:text-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                  <Icon className="h-8 w-8 transition-transform duration-300 group-hover:rotate-6" />
                  
                  {/* Digital node label */}
                  <span className="absolute -right-2 -top-2 font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-ink-900 border border-white/10 text-ink-300 shadow group-hover:border-cyan-400/50 group-hover:text-cyan-400 transition-colors duration-300">
                    0{i + 1}
                  </span>
                </div>
                
                <h3 className="mt-6 text-lg font-bold text-white tracking-wide transition-colors group-hover:text-ember-400">
                  {t(`process.${step.key}.title`)}
                </h3>
                <p className="mt-3.5 text-sm leading-relaxed text-ink-300 px-2">
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

