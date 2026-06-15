import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { EmberBackground } from '@/components/EmberBackground'
import { useLocale } from '@/hooks/useLocale'

export function ContactCTA() {
  const { t } = useTranslation()
  const { isAr } = useLocale()
  const Arrow = isAr ? ArrowLeft : ArrowRight

  return (
    <section className="container-x py-16">
      <Reveal variant="scale">
        <div className="relative overflow-hidden rounded-3xl border border-ember-500/30 cyber-glass-cyan px-6 py-16 text-center sm:px-16 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
          {/* Cyber grid, laser scanline and neon orbs */}
          <div className="cyber-grid opacity-40 pointer-events-none" />
          <div className="laser-scanner opacity-40" />
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-ember-600/25 blur-[100px] pointer-events-none animate-glow" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-[100px] pointer-events-none animate-glow" style={{ animationDelay: '1s' }} />
          <EmberBackground density={12} />
          
          <div className="relative z-10">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl md:text-5xl leading-tight text-white tracking-wide">
              {t('cta.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-ink-300 md:text-lg leading-relaxed font-semibold">
              {t('cta.subtitle')}
            </p>
            <Button to="/contact" size="lg" className="mt-10 cyber-corners shadow-lg shadow-ember-600/20">
              {t('cta.button')}
              <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

