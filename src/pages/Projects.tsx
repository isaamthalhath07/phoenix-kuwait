import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { usePublishedProjects } from '@/hooks/useProjects'
import { PROJECT_CATEGORIES, type ProjectCategory } from '@/lib/types'
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectCardSkeleton } from '@/components/ui/Skeleton'
import { Tilt } from '@/components/ui/Tilt'
import { PageHero } from '@/components/sections/PageHero'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { cn } from '@/lib/cn'

type Filter = 'all' | ProjectCategory

export default function Projects() {
  const { t } = useTranslation()
  const { data, loading } = usePublishedProjects()
  const [filter, setFilter] = useState<Filter>('all')

  useDocumentMeta(t('projects.pageTitle'), t('projects.pageSubtitle'))

  // Only show category chips that actually have projects.
  const available = useMemo(() => {
    const set = new Set(data.map((p) => p.category))
    return PROJECT_CATEGORIES.filter((c) => set.has(c))
  }, [data])

  const filtered = useMemo(
    () => (filter === 'all' ? data : data.filter((p) => p.category === filter)),
    [data, filter],
  )

  return (
    <>
      <PageHero
        eyebrow={t('projects.eyebrow')}
        title={t('projects.pageTitle')}
        subtitle={t('projects.pageSubtitle')}
      />

      <section className="container-x pb-24 relative">
        {/* Subtle grid pattern for pages */}
        <div className="cyber-grid opacity-30 pointer-events-none -mt-40 h-[150%] z-0" />

        {available.length > 0 && (
          <div className="mb-14 flex flex-wrap justify-center gap-3 cyber-glass max-w-3xl mx-auto p-2 rounded-full border border-white/5 shadow-lg shadow-black/45 z-10 relative">
            <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
              {t('projects.filterAll')}
            </FilterChip>
            {available.map((c) => (
              <FilterChip key={c} active={filter === c} onClick={() => setFilter(c)}>
                {t(`categories.${c}`)}
              </FilterChip>
            ))}
          </div>
        )}

        <div className="z-10 relative">
          {loading ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <motion.div layout className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Tilt className="h-full" max={8}>
                      <ProjectCard project={project} index={i} />
                    </Tilt>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <p className="rounded-2xl border border-dashed border-white/10 py-20 text-center text-ink-400">
              {data.length === 0 ? t('projects.empty') : t('projects.emptyFiltered')}
            </p>
          )}
        </div>
      </section>
    </>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer select-none',
        active
          ? 'bg-cyan-500/15 border border-cyan-400 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
          : 'border border-transparent text-ink-300 hover:border-white/10 hover:bg-white/5 hover:text-white',
      )}
    >
      {children}
    </button>
  )
}

