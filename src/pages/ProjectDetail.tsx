import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, MapPin, Calendar, User, Tag, X } from 'lucide-react'
import { useProject } from '@/hooks/useProjects'
import { useLocale } from '@/hooks/useLocale'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { Spinner } from '@/components/ui/Skeleton'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const { isAr, pick } = useLocale()
  const { data: project, loading } = useProject(slug)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const Back = isAr ? ArrowRight : ArrowLeft

  const title = project ? pick(project.title_en, project.title_ar) : ''
  useDocumentMeta(title, project ? pick(project.excerpt_en, project.excerpt_ar) : undefined)

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-9 w-9" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container-x flex min-h-screen flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold">{t('projects.notFound')}</h1>
        <p className="mt-3 max-w-md text-ink-300">{t('projects.notFoundDesc')}</p>
        <Button to="/projects" className="mt-8">
          <Back className="h-5 w-5" />
          {t('common.backToProjects')}
        </Button>
      </div>
    )
  }

  const content = pick(project.content_en, project.content_ar)
  const location = pick(project.location_en, project.location_ar)
  const paragraphs = content.split(/\n\s*\n/).filter(Boolean)

  const meta = [
    project.client && { icon: User, label: t('projects.client'), value: project.client },
    project.year && { icon: Calendar, label: t('projects.year'), value: String(project.year) },
    location && { icon: MapPin, label: t('projects.location'), value: location },
    { icon: Tag, label: t('projects.category'), value: t(`categories.${project.category}`) },
  ].filter(Boolean) as { icon: typeof User; label: string; value: string }[]

  return (
    <article>
      {/* Cover */}
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        {project.cover_image_url ? (
          <img
            src={project.cover_image_url}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-ink-700 to-ink-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/30" />
        <div className="container-x absolute inset-x-0 bottom-0 pb-12">
          <Reveal variant="up">
            <Link
              to="/projects"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-ink-200 transition-colors hover:text-ember-300"
            >
              <Back className="h-4 w-4" />
              {t('common.backToProjects')}
            </Link>
            <span className="block">
              <span className="rounded-full bg-ember-500 px-3 py-1 text-xs font-semibold text-white">
                {t(`categories.${project.category}`)}
              </span>
            </span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold sm:text-5xl md:text-6xl">
              {title}
            </h1>
          </Reveal>
        </div>
      </div>

      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
        {/* Content */}
        <div>
          <Reveal variant="fade">
            <p className="text-xl leading-relaxed text-ink-100">
              {pick(project.excerpt_en, project.excerpt_ar)}
            </p>
          </Reveal>
          <div className="mt-8 space-y-5">
            {paragraphs.map((p, i) => (
              <Reveal key={i} variant="up" delay={i * 0.04}>
                <p className="leading-relaxed text-ink-300">{p}</p>
              </Reveal>
            ))}
          </div>

          {/* Gallery */}
          {project.gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold">{t('projects.gallery')}</h2>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {project.gallery.map((url, i) => (
                  <Reveal key={url} variant="scale" delay={i * 0.05}>
                    <button
                      type="button"
                      onClick={() => setLightbox(url)}
                      className="group block aspect-square w-full overflow-hidden rounded-xl border border-white/5"
                    >
                      <img
                        src={url}
                        alt={`${title} ${i + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar meta */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-white/10 bg-ink-850 p-6">
            <h2 className="text-lg font-bold text-white">{t('projects.details')}</h2>
            <dl className="mt-5 space-y-5">
              {meta.map((m) => {
                const Icon = m.icon
                return (
                  <div key={m.label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-ember-500" />
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-ink-400">{m.label}</dt>
                      <dd className="mt-0.5 font-medium text-white">{m.value}</dd>
                    </div>
                  </div>
                )
              })}
            </dl>
            <Button to="/contact" className="mt-7 w-full">
              {t('cta.button')}
            </Button>
          </div>
        </aside>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/90 p-6 backdrop-blur"
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute end-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox}
              alt=""
              className="max-h-[85vh] max-w-full rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}
