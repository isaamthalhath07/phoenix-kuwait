import type { CSSProperties } from 'react'

interface Arch3DProps {
  className?: string
  width?: number
  height?: number
}

/**
 * 3D Holographic Architectural Wireframe Tower.
 * Consists of vertical pillars, stacked grid floors, and a counter-rotating core.
 * Features an active construction loop: core spire lights up, pillars grow, and blueprint floors assemble.
 */
export function Arch3D({ className, width = 220, height = 500 }: Arch3DProps) {
  const halfW = width / 2
  const floors = 5
  const floorSpacing = height / (floors - 1)

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute select-none ${className ?? ''}`}
      style={{ perspective: '1600px', width: `${width}px`, height: `${height}px` }}
    >
      {/* 3D Container */}
      <div
        className="relative w-full h-full [transform-style:preserve-3d]"
        style={{
          transform: 'rotateX(-18deg) rotateY(15deg)',
          animation: 'phx-rotate 28s linear infinite',
        } as CSSProperties}
      >
        {/* 1. Stacked Floor Planes (Assemble bottom-to-top with delay) */}
        {Array.from({ length: floors }).map((_, i) => {
          const yOffset = i * floorSpacing
          // bottom-to-top build order delay
          const delay = 2.0 + (floors - 1 - i) * 0.65
          return (
            <div
              key={i}
              className="absolute top-0 left-1/2 border border-cyan-500/25 rounded-sm [transform-style:preserve-3d]"
              style={
                {
                  width: `${width}px`,
                  height: `${width}px`,
                  marginLeft: `-${halfW}px`,
                  '--y-dest': `${yOffset}px`,
                  transformOrigin: 'center center',
                  animation: 'floor-build 14s ease-in-out infinite',
                  animationDelay: `${delay}s`,
                  background: 'rgba(11, 15, 25, 0.15)',
                  backgroundImage:
                    'repeating-linear-gradient(0deg, rgba(6, 182, 212, 0.08) 0 1px, transparent 1px 16px), repeating-linear-gradient(90deg, rgba(6, 182, 212, 0.08) 0 1px, transparent 1px 16px)',
                  boxShadow:
                    '0 0 12px rgba(6, 182, 212, 0.1), inset 0 0 16px rgba(249, 115, 22, 0.05)',
                } as CSSProperties
              }
            >
              {/* Inner concentric ring for architectural details */}
              <div
                className="absolute inset-4 rounded-full border border-dashed border-ember-500/20"
                style={{ transform: 'translateZ(1px)' }}
              />
              <div
                className="absolute inset-8 rounded-full border border-double border-cyan-400/10"
                style={{ transform: 'translateZ(2px)' }}
              />
            </div>
          )
        })}

        {/* 2. Vertical Pillars (Grow from bottom) */}
        {/* Pillar 1: Front-Left */}
        <div
          className="absolute top-0 w-[1px] bg-gradient-to-b from-cyan-400/60 via-ember-500/40 to-transparent shadow-[0_0_8px_rgba(6,182,212,0.3)]"
          style={
            {
              height: `${height}px`,
              left: '50%',
              transformOrigin: 'bottom',
              '--px': `-${halfW}px`,
              '--pz': `${halfW}px`,
              animation: 'pillar-build 14s ease-in-out infinite',
              animationDelay: '0.4s',
            } as CSSProperties
          }
        />
        {/* Pillar 2: Front-Right */}
        <div
          className="absolute top-0 w-[1px] bg-gradient-to-b from-cyan-400/60 via-ember-500/40 to-transparent shadow-[0_0_8px_rgba(6,182,212,0.3)]"
          style={
            {
              height: `${height}px`,
              left: '50%',
              transformOrigin: 'bottom',
              '--px': `${halfW}px`,
              '--pz': `${halfW}px`,
              animation: 'pillar-build 14s ease-in-out infinite',
              animationDelay: '0.4s',
            } as CSSProperties
          }
        />
        {/* Pillar 3: Back-Left */}
        <div
          className="absolute top-0 w-[1px] bg-gradient-to-b from-cyan-400/60 via-ember-500/40 to-transparent shadow-[0_0_8px_rgba(6,182,212,0.3)]"
          style={
            {
              height: `${height}px`,
              left: '50%',
              transformOrigin: 'bottom',
              '--px': `-${halfW}px`,
              '--pz': `-${halfW}px`,
              animation: 'pillar-build 14s ease-in-out infinite',
              animationDelay: '0.4s',
            } as CSSProperties
          }
        />
        {/* Pillar 4: Back-Right */}
        <div
          className="absolute top-0 w-[1px] bg-gradient-to-b from-cyan-400/60 via-ember-500/40 to-transparent shadow-[0_0_8px_rgba(6,182,212,0.3)]"
          style={
            {
              height: `${height}px`,
              left: '50%',
              transformOrigin: 'bottom',
              '--px': `${halfW}px`,
              '--pz': `-${halfW}px`,
              animation: 'pillar-build 14s ease-in-out infinite',
              animationDelay: '0.4s',
            } as CSSProperties
          }
        />

        {/* 3. Counter-Rotating Central Core Spire (Source column) */}
        <div
          className="absolute top-0 left-1/2 w-[60px] [transform-style:preserve-3d]"
          style={
            {
              height: `${height}px`,
              marginLeft: '-30px',
              animation: 'phx-rotate-rev 15s linear infinite',
            } as CSSProperties
          }
        >
          {/* Central spire core line */}
          <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-ember-500 to-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-pulse" />

          {/* Staggered glowing telemetry guides */}
          {Array.from({ length: floors - 1 }).map((_, idx) => {
            const delay = 1.3 + (floors - 1 - idx) * 0.65
            return (
              <div
                key={idx}
                className="absolute left-1/2 w-4 h-4 -ml-2 rounded-full border border-gold-450/40 bg-ember-500/30 blur-[1px] animate-pulse"
                style={
                  {
                    top: `${(idx + 0.5) * floorSpacing}px`,
                    transform: 'translateZ(0px)',
                    animationDelay: `${delay}s`,
                  } as CSSProperties
                }
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

