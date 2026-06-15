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
        <div className="relative overflow-hidden rounded-3xl border border-ember-500/20 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 px-6 py-16 text-center sm:px-16">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-ember-600/25 blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-gold-500/15 blur-[100px]" />
          <EmberBackground density={14} />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-4xl md:text-5xl">
              {t('cta.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-ink-300 md:text-lg">
              {t('cta.subtitle')}
            </p>
            <Button to="/contact" size="lg" className="mt-9">
              {t('cta.button')}
              <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
