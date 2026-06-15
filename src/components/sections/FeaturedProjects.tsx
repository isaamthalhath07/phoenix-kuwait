import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useFeaturedProjects } from '@/hooks/useProjects'
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectCardSkeleton } from '@/components/ui/Skeleton'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { useLocale } from '@/hooks/useLocale'

export function FeaturedProjects() {
  const { t } = useTranslation()
  const { isAr } = useLocale()
  const { data, loading } = useFeaturedProjects(6)
  const Arrow = isAr ? ArrowLeft : ArrowRight

  return (
    <section className="container-x py-24">
      <SectionHeading
        eyebrow={t('projects.eyebrow')}
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
      />

      <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <ProjectCardSkeleton key={i} />)
        ) : data.length > 0 ? (
          data.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)
        ) : (
          <p className="col-span-full rounded-2xl border border-dashed border-white/10 py-16 text-center text-ink-400">
            {t('projects.empty')}
          </p>
        )}
      </div>

      {data.length > 0 && (
        <Reveal className="mt-12 text-center" variant="fade">
          <Button to="/projects" variant="secondary" size="lg">
            {t('common.viewAll')}
            <Arrow className="h-5 w-5" />
          </Button>
        </Reveal>
      )}
    </section>
  )
}
