import type { CSSProperties } from 'react'

export function CyberHUD({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}
      style={{ perspective: '1200px' }}
    >
      {/* 3D HUD Layer */}
      <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]">
        {/* Rotating Outer Blueprint Grid Circle */}
        <div
          className="absolute h-[500px] w-[500px] rounded-full border border-dashed border-ember-500/10 [transform-style:preserve-3d] animate-spin-slow"
          style={{ transform: 'rotateX(70deg) rotateZ(0deg)' } as CSSProperties}
        >
          {/* Internal elements of outer circle */}
          <div className="absolute inset-4 rounded-full border border-double border-gold-500/5" />
          <div className="absolute inset-16 rounded-full border border-ember-500/10" />
        </div>

        {/* Counter-rotating Inner Compass Ring */}
        <div
          className="absolute h-[340px] w-[340px] rounded-full border border-ember-500/20 [transform-style:preserve-3d]"
          style={
            {
              transform: 'rotateX(70deg) rotateZ(0deg)',
              animation: 'phx-rotate-rev 15s linear infinite',
            } as CSSProperties
          }
        >
          {/* Ticks */}
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-0 h-3 w-[1px] bg-ember-400/50"
              style={
                {
                  transformOrigin: '50% 170px',
                  transform: `rotateZ(${i * 30}deg)`,
                } as CSSProperties
              }
            />
          ))}
          <div className="absolute inset-2 rounded-full border border-dashed border-gold-500/20" />
        </div>

        {/* Diagonal Crosshairs / Tech Reticle */}
        <div
          className="absolute h-[600px] w-[600px] [transform-style:preserve-3d]"
          style={{ transform: 'rotateX(75deg) rotateY(0deg) rotateZ(45deg)' } as CSSProperties}
        >
          <div className="absolute left-0 right-0 top-1/2 h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-ember-500/20 to-transparent" />
          <div className="absolute bottom-0 top-0 left-1/2 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-ember-500/20 to-transparent" />
          
          {/* Grid Scanner Nodes */}
          <span className="absolute left-1/4 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/40 shadow-[0_0_8px_#fbbf24] animate-pulse" />
          <span className="absolute right-1/4 top-1/2 h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-400/40 shadow-[0_0_8px_#f97316] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Ambient Pulsating Core */}
        <div
          className="absolute h-[120px] w-[120px] rounded-full bg-gradient-to-br from-ember-600/10 to-gold-500/5 blur-xl animate-pulse"
          style={{ transform: 'translateZ(10px)' } as CSSProperties}
        />
      </div>
    </div>
  )
}
