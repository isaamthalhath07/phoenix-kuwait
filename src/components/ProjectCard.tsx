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
      className="card-glow border-glow group flex flex-col overflow-hidden rounded-2xl bg-ink-850"
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
            <span className="font-display text-4xl font-black text-ember-500/30">PK</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent opacity-80" />
        <span className="absolute start-4 top-4 rounded-full bg-ember-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {t(`categories.${project.category}`)}
        </span>
        {project.year && (
          <span className="absolute end-4 top-4 rounded-full glass px-3 py-1 text-xs font-semibold text-white">
            {project.year}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {location && (
          <span className="mb-2 inline-flex items-center gap-1.5 text-xs text-ink-400">
            <MapPin className="h-3.5 w-3.5 text-ember-500" />
            {location}
          </span>
        )}
        <h3 className="text-xl font-bold text-white transition-colors group-hover:text-ember-300">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-300">{excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ember-400">
          {t('common.viewProject')}
          <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
