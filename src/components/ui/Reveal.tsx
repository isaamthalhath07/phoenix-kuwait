import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { useLocale } from '@/hooks/useLocale'

type Variant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'

interface RevealProps {
  children: ReactNode
  variant?: Variant
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  as?: 'div' | 'span' | 'li' | 'section'
}

const EASE = [0.16, 1, 0.3, 1] as const

function buildVariants(variant: Variant, isAr: boolean): Variants {
  const dist = 44
  const rtlFactor = isAr ? -1 : 1
  const map: Record<Variant, { x?: number; y?: number; scale?: number }> = {
    up: { y: dist },
    down: { y: -dist },
    left: { x: dist * rtlFactor },
    right: { x: -dist * rtlFactor },
    scale: { scale: 0.9 },
    fade: {},
  }
  const offset = map[variant]
  return {
    hidden: { opacity: 0, ...offset },
    show: { opacity: 1, x: 0, y: 0, scale: 1 },
  }
}

/** Animates its children into view on scroll. GPU-friendly transform + opacity only. */
export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.7,
  className,
  once = true,
  as = 'div',
}: RevealProps) {
  const { isAr } = useLocale()
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-70px' }}
      transition={{ duration, delay, ease: EASE }}
      variants={buildVariants(variant, isAr)}
    >
      {children}
    </MotionTag>
  )
}
