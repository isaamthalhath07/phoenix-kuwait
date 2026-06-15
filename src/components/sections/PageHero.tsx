import { motion } from 'framer-motion'
import { EmberBackground } from '@/components/EmberBackground'

interface PageHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-12 pt-36">
      <div className="absolute inset-0 bg-ink-950" />
      <div className="absolute -top-20 start-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-ember-600/20 blur-[120px]" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 70% 80% at 50% 0%, black, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 50% 0%, black, transparent 70%)',
        }}
      />
      <EmberBackground density={14} />
      <div className="container-x relative text-center">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-[0.25em] text-ember-400"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-4xl font-extrabold sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.7 }}
            className="mx-auto mt-5 max-w-2xl text-base text-ink-300 md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
