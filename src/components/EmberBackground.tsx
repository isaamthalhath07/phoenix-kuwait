import { useMemo, type CSSProperties } from 'react'

interface EmberBackgroundProps {
  density?: number
  className?: string
}

/**
 * Floating ember particles — the phoenix motif. Pure CSS transform/opacity
 * animation (no JS per-frame), so it stays smooth and cheap.
 */
export function EmberBackground({ density = 22, className }: EmberBackgroundProps) {
  const embers = useMemo(
    () =>
      Array.from({ length: density }).map(() => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 5,
        delay: Math.random() * 8,
        duration: 7 + Math.random() * 9,
        drift: Math.random() * 80 - 40,
        opacity: 0.3 + Math.random() * 0.55,
      })),
    [density],
  )

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}
    >
      {embers.map((e, i) => (
        <span
          key={i}
          className="absolute bottom-[-10px] rounded-full"
          style={
            {
              left: `${e.left}%`,
              width: `${e.size}px`,
              height: `${e.size}px`,
              background:
                'radial-gradient(circle, #fed7aa 0%, #f97316 55%, transparent 75%)',
              boxShadow: '0 0 8px 1px rgba(249,115,22,0.55)',
              opacity: e.opacity,
              '--drift': `${e.drift}px`,
              animation: `ember-rise ${e.duration}s linear ${e.delay}s infinite`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
