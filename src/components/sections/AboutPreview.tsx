import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Structure3D } from '@/components/Structure3D'
import { useLocale } from '@/hooks/useLocale'

export function AboutPreview() {
  const { t } = useTranslation()
  const { isAr } = useLocale()
  const Arrow = isAr ? ArrowLeft : ArrowRight
  const points = ['about.value1', 'about.value2', 'about.value3', 'about.value4']

  return (
    <section className="container-x py-24 relative overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        {/* Visual Panel */}
        <Reveal variant="left">
          <div className="relative group">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-ember-600/10 to-cyan-550/10 blur-2xl pointer-events-none" />
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 cyber-glass shadow-[0_0_40px_rgba(249,115,22,0.08)]">
              {/* Futuristic Cyber grid and scanning line */}
              <div className="cyber-grid opacity-60" />
              <div className="laser-scanner opacity-85" />
              
              <Structure3D className="absolute inset-0 scale-95" />

              <div className="absolute bottom-6 start-6 end-6 cyber-glass rounded-2xl p-5 border border-ember-500/20 shadow-lg">
                {/* Tech Bracket Details */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-ember-500/50" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-ember-500/50" />
                <p className="font-display text-4xl font-black text-gradient">15+</p>
                <p className="text-xs uppercase tracking-wider font-bold text-ink-300 mt-1">{t('stats.years')}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text Area */}
        <Reveal variant="right">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-ember-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-transparent to-ember-500" />
            {t('about.eyebrow')}
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl leading-tight">{t('about.title')}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-200 font-medium">{t('about.lead')}</p>
          <p className="mt-4 leading-relaxed text-ink-300 text-sm sm:text-base">{t('about.body1')}</p>

          <ul className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm text-ink-200 hover:text-white transition-colors duration-300">
                <span className="font-mono text-cyan-400 font-bold text-base select-none" aria-hidden>&gt;&gt;</span>
                <span className="font-semibold">{t(`${p}.title`)}</span>
              </li>
            ))}
          </ul>

          <Button to="/about" size="lg" variant="secondary" className="mt-10">
            {t('common.learnMore')}
            <Arrow className="h-5 w-5" />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

