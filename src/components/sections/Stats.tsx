import { useTranslation } from 'react-i18next'
import { STATS } from '@/lib/constants'
import { Counter } from '@/components/ui/Counter'
import { Reveal } from '@/components/ui/Reveal'
import { EmberBackground } from '@/components/EmberBackground'

export function Stats() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-ink-900/80 py-24">
      {/* Background cyber grid and ember rise */}
      <div className="cyber-grid opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-ember-500/5 via-cyan-500/5 to-gold-500/5" />
      <EmberBackground density={14} />

      <div className="container-x relative z-10">
        <Reveal variant="fade">
          <h2 className="mb-16 text-center text-2xl font-bold text-white sm:text-3xl tracking-wide uppercase">
            <span className="text-ember-500 font-mono text-sm mr-2 block sm:inline">[ TELEMETRY ]</span>
            {t('stats.title')}
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.key} delay={i * 0.1} variant="up" className="text-center">
              <div className="relative inline-block mx-auto min-w-[170px] px-6 py-7 rounded-2xl cyber-glass-cyan border border-cyan-500/20 shadow-[0_0_25px_rgba(6,182,212,0.08)] [transform-style:preserve-3d] group hover:-translate-y-1 transition-all duration-300">
                {/* Tech Bracket Details */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-cyan-400/40" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-cyan-400/40" />
                <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-cyan-400/40" />
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-cyan-400/40" />

                {/* Laser scan sweeping inside */}
                <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#22d3ee] pointer-events-none opacity-0 group-hover:opacity-100" style={{ animation: 'scan-line 2.5s ease-in-out infinite' }} />

                <div className="font-display text-4.5xl font-black text-gradient sm:text-5.5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                
                <p className="mt-3.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ink-300">
                  {t(`stats.${stat.key}`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

