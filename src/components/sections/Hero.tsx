import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmberBackground } from '@/components/EmberBackground'
import { Button } from '@/components/ui/Button'
import { useLocale } from '@/hooks/useLocale'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
}

export function Hero() {
  const { t } = useTranslation()
  const { isAr } = useLocale()
  const Arrow = isAr ? ArrowLeft : ArrowRight

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      {/* Layered background */}
      <div className="absolute inset-0 bg-ink-950" />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)',
        }}
      />
      <div className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-ember-600/25 blur-[130px] animate-glow" />
      <div
        className="absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full bg-gold-500/15 blur-[130px] animate-glow"
        style={{ animationDelay: '1.5s' }}
      />
      <EmberBackground density={26} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-x relative z-10 py-16"
      >
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-ember-500/30 bg-ember-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ember-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-ember-500" />
            {t('hero.badge')}
          </span>
        </motion.div>

        <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-[1.05] sm:text-6xl md:text-7xl">
          <motion.span variants={item} className="block">
            {t('hero.titleLine1')}{' '}
            <span className="text-gradient">{t('hero.titleHighlight')}</span>
          </motion.span>
          <motion.span variants={item} className="block text-ink-200">
            {t('hero.titleLine2')}
          </motion.span>
        </h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-base leading-relaxed text-ink-300 md:text-lg"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
          <Button to="/contact" size="lg">
            {t('hero.ctaPrimary')}
            <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Button>
          <Button to="/projects" variant="secondary" size="lg">
            {t('hero.ctaSecondary')}
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-400 md:flex"
      >
        <span className="text-[0.7rem] uppercase tracking-[0.25em]">{t('hero.scroll')}</span>
        <ChevronDown className="h-5 w-5 animate-bounce text-ember-400" />
      </motion.div>
    </section>
  )
}
