import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Plus, Pencil, Trash2, Star, Eye, EyeOff } from 'lucide-react'
import type { Project } from '@/lib/types'
import { fetchAllProjects, deleteProject } from '@/lib/projects'
import { useLocale } from '@/hooks/useLocale'
import { Spinner } from '@/components/ui/Skeleton'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

export default function Dashboard() {
  const { t } = useTranslation()
  const { pick } = useLocale()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useDocumentMeta(t('admin.title'))

  const load = () => {
    setLoading(true)
    fetchAllProjects()
      .then((data) => {
        setProjects(data)
        setError(null)
      })
      .catch((e) => setError(String(e?.message ?? e)))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (project: Project) => {
    if (!confirm(t('admin.confirmDelete'))) return
    await deleteProject(project.id)
    setProjects((prev) => prev.filter((p) => p.id !== project.id))
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('admin.title')}</h1>
          {!loading && (
            <p className="mt-1 text-sm text-ink-400">
              {t('admin.projectsCount', { count: projects.length })}
            </p>
          )}
        </div>
        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember-500 to-ember-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-ember-600/30 transition-all hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          {t('admin.newProject')}
        </Link>
      </div>

      {error && (
        <p className="mt-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
      )}

      {loading ? (
        <div className="mt-16 flex justify-center">
          <Spinner className="h-8 w-8" />
        </div>
      ) : projects.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-white/10 py-20 text-center">
          <p className="text-ink-400">{t('admin.noProjects')}</p>
          <Link
            to="/admin/projects/new"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-ember-500 px-5 py-2.5 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            {t('admin.newProject')}
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-start text-sm">
            <thead className="bg-ink-900 text-xs uppercase tracking-wider text-ink-400">
              <tr>
                <th className="px-5 py-4 text-start font-semibold">{t('admin.form.titleEn')}</th>
                <th className="hidden px-5 py-4 text-start font-semibold md:table-cell">
                  {t('admin.form.category')}
                </th>
                <th className="px-5 py-4 text-start font-semibold">{t('admin.form.status')}</th>
                <th className="px-5 py-4 text-end font-semibold">{t('admin.edit')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((project) => (
                <tr key={project.id} className="bg-ink-850 transition-colors hover:bg-ink-800">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-ink-700">
                        {project.cover_image_url && (
                          <img
                            src={project.cover_image_url}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {pick(project.title_en, project.title_ar)}
                        </p>
                        <p className="text-xs text-ink-400">/{project.slug}</p>
                      </div>
                      {project.featured && (
                        <Star className="h-4 w-4 fill-gold-400 text-gold-400" aria-label="Featured" />
                      )}
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 text-ink-300 md:table-cell">
                    {t(`categories.${project.category}`)}
                  </td>
                  <td className="px-5 py-4">
                    {project.status === 'published' ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                        <Eye className="h-3.5 w-3.5" />
                        {t('admin.published')}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-700 px-2.5 py-1 text-xs font-semibold text-ink-300">
                        <EyeOff className="h-3.5 w-3.5" />
                        {t('admin.draft')}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/projects/${project.id}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-ink-200 transition-colors hover:border-ember-400/40 hover:text-ember-300"
                        aria-label={t('admin.edit')}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(project)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-ink-200 transition-colors hover:border-red-400/40 hover:text-red-300"
                        aria-label={t('admin.delete')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
