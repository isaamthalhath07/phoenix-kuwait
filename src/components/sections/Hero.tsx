import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmberBackground } from '@/components/EmberBackground'
import { CyberHUD } from '@/components/CyberHUD'
import { Structure3D } from '@/components/Structure3D'
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
    <section className="relative flex min-h-screen items-center overflow-hidden pt-28">
      {/* Background blueprint grid, glowing orbs, & 3D HUD */}
      <div className="absolute inset-0 bg-ink-950" />
      <div className="cyber-grid opacity-50" />
      <CyberHUD className="opacity-70" />

      {/* Cyber Orbs */}
      <div className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-ember-600/20 blur-[130px] animate-glow pointer-events-none" />
      <div
        className="absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full bg-cyan-500/15 blur-[130px] animate-glow pointer-events-none"
        style={{ animationDelay: '1.5s' }}
      />
      <EmberBackground density={20} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950" />

      {/* Content layout (2 Columns on desktop) */}
      <div className="container-x relative z-10 py-16 grid items-center gap-12 lg:grid-cols-2">
        {/* Left Col: Text & CTA */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-ember-500/30 bg-ember-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ember-300 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-ember-500" />
              {t('hero.badge')}
            </span>
          </motion.div>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6.5xl lg:text-7xl">
            <motion.span variants={item} className="block">
              {t('hero.titleLine1')}{' '}
              <span className="text-gradient font-black">{t('hero.titleHighlight')}</span>
            </motion.span>
            <motion.span variants={item} className="block text-ink-200 mt-1">
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
            <Button to="/contact" size="lg" className="cyber-corners shadow-lg shadow-ember-600/20">
              {t('hero.ctaPrimary')}
              <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Button>
            <Button to="/projects" variant="secondary" size="lg">
              {t('hero.ctaSecondary')}
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Col: Holographic 3D Blueprint Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="relative hidden lg:flex items-center justify-center min-h-[460px]"
        >
          <div className="relative w-full max-w-[380px] aspect-square rounded-3xl cyber-glass border border-ember-500/25 flex items-center justify-center p-6 shadow-[0_0_50px_rgba(249,115,22,0.12)] animate-float">
            {/* Tech Corner Decors */}
            <div className="absolute top-4 left-4 font-mono text-[9px] text-ember-500/40 select-none tracking-widest">
              SYS_LOC // KWT
            </div>
            <div className="absolute top-4 right-4 font-mono text-[9px] text-cyan-400/40 select-none tracking-widest">
              STATUS // ACTIVE
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-[9px] text-ink-400/40 select-none tracking-widest">
              PHX_EST.2008
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[9px] text-gold-400/40 select-none tracking-widest">
              REV_3.2
            </div>

            {/* Laser scanning line */}
            <div className="laser-scanner rounded-full" />

            {/* Nested rotating cubes wireframe */}
            <Structure3D className="absolute inset-0 pointer-events-none opacity-90 scale-95" outer={190} inner={96} />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-400 md:flex"
      >
        <span className="text-[0.7rem] uppercase tracking-[0.25em] font-bold">{t('hero.scroll')}</span>
        <ChevronDown className="h-5 w-5 animate-bounce text-ember-550" />
      </motion.div>
    </section>
  )
}

