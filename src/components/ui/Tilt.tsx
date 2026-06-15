import { useRef, type ReactNode } from 'react'

interface TiltProps {
  children: ReactNode
  className?: string
  /** Max rotation in degrees on each axis. */
  max?: number
  /** Lift toward the viewer on hover (px). */
  lift?: number
  /** Show a moving light glare. */
  glare?: boolean
}

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Pointer-tracking 3D tilt. Applies GPU-only transforms (rotate/translateZ)
 * via rAF for a fast, smooth response. Disabled under reduced-motion.
 */
export function Tilt({ children, className, max = 10, lift = 16, glare = true }: TiltProps) {
  const wrap = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const raf = useRef(0)

  const onMove = (e: React.MouseEvent) => {
    if (prefersReduced() || !wrap.current || !inner.current) return
    const rect = wrap.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      if (!inner.current) return
      inner.current.style.transform = `rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(
        px * max
      ).toFixed(2)}deg) translateZ(${lift}px)`
      if (glareRef.current) {
        glareRef.current.style.opacity = '1'
        glareRef.current.style.background = `radial-gradient(circle at ${((px + 0.5) * 100).toFixed(
          0,
        )}% ${((py + 0.5) * 100).toFixed(0)}%, rgba(255,255,255,0.16), transparent 55%)`
      }
    })
  }

  const onLeave = () => {
    cancelAnimationFrame(raf.current)
    if (inner.current) inner.current.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)'
    if (glareRef.current) glareRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={wrap}
      className={className}
      style={{ perspective: '900px' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        ref={inner}
        className="relative h-full transition-transform duration-150 ease-out [transform-style:preserve-3d] will-change-transform"
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-200"
          />
        )}
      </div>
    </div>
  )
}
