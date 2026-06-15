import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Project } from '@/lib/types'
import { useLocale } from '@/hooks/useLocale'

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { t } = useTranslation()
  const { isAr, pick } = useLocale()
  const Arrow = isAr ? ArrowLeft : ArrowRight

  const title = pick(project.title_en, project.title_ar)
  const excerpt = pick(project.excerpt_en, project.excerpt_ar)
  const location = pick(project.location_en, project.location_ar)

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="card-glow border-glow cyber-corners group flex flex-col overflow-hidden rounded-2xl cyber-glass transition-all duration-500"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {project.cover_image_url ? (
          <img
            src={project.cover_image_url}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-700 to-ink-900">
            <span className="font-display text-4xl font-black text-ember-500/20">PK</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent opacity-85" />
        
        {/* Holographic Category Tag */}
        <span className="absolute start-4 top-4 rounded bg-cyan-500/10 border border-cyan-400/30 px-2.5 py-0.5 text-[10px] font-bold uppercase font-mono tracking-wider text-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.15)]">
          {t(`categories.${project.category}`)}
        </span>

        {/* Telemetry Year String */}
        {project.year && (
          <span className="absolute end-4 top-4 rounded bg-ink-950/80 border border-white/10 px-2.5 py-0.5 text-[10px] font-bold font-mono text-ink-300">
            YR: {project.year}
          </span>
        )}

        {/* Laser scanner sweeps on hover */}
        <div className="laser-scanner opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex flex-1 flex-col p-5 relative">
        {/* Subtle grid backing */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        {location && (
          <span className="mb-2 inline-flex items-center gap-1.5 text-xs text-ink-400 font-medium">
            <MapPin className="h-3.5 w-3.5 text-ember-550 shrink-0" />
            {location}
          </span>
        )}
        <h3 className="text-xl font-bold text-white transition-colors group-hover:text-ember-400">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-300">{excerpt}</p>
        
        <span className="mt-4.5 inline-flex items-center gap-2 text-sm font-bold text-ember-450 group-hover:text-ember-400 transition-colors">
          {t('common.viewProject')}
          <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" />
        </span>
      </div>
    </Link>
  )
}

