import type { CSSProperties } from 'react'

/** The six cube-face transforms for a given edge length. */
function faceTransforms(size: number): string[] {
  const h = size / 2
  return [
    `translateZ(${h}px)`,
    `rotateY(180deg) translateZ(${h}px)`,
    `rotateY(90deg) translateZ(${h}px)`,
    `rotateY(-90deg) translateZ(${h}px)`,
    `rotateX(90deg) translateZ(${h}px)`,
    `rotateX(-90deg) translateZ(${h}px)`,
  ]
}

function cubeFaces(size: number, faceClass: string) {
  const h = size / 2
  return faceTransforms(size).map((t, i) => (
    <span
      key={i}
      className={faceClass}
      style={
        {
          width: `${size}px`,
          height: `${size}px`,
          marginLeft: `-${h}px`,
          marginTop: `-${h}px`,
          transform: t,
        } as CSSProperties
      }
    />
  ))
}

interface Structure3DProps {
  className?: string
  outer?: number
  inner?: number
}

/**
 * Architectural wireframe: two nested, counter-rotating blueprint cubes with a
 * glowing core. Pure CSS 3D (preserve-3d + keyframes) — GPU-accelerated.
 */
export function Structure3D({ className, outer = 200, inner = 104 }: Structure3DProps) {
  return (
    <div className={className} style={{ perspective: '1100px' }} aria-hidden>
      <div className="phx-spin">{cubeFaces(outer, 'phx-face')}</div>
      <div className="phx-spin phx-spin-rev">{cubeFaces(inner, 'phx-face phx-face-core')}</div>
      <span className="phx-core-glow" />
    </div>
  )
}
