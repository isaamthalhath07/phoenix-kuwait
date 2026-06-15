import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Save, Upload, X, ImagePlus, AlertCircle, CheckCircle2 } from 'lucide-react'
import { PROJECT_CATEGORIES, type ProjectInput } from '@/lib/types'
import {
  createProject,
  fetchProjectById,
  slugify,
  updateProject,
  uploadProjectImage,
} from '@/lib/projects'
import { useLocale } from '@/hooks/useLocale'
import { Spinner } from '@/components/ui/Skeleton'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { cn } from '@/lib/cn'

const emptyForm: ProjectInput = {
  slug: '',
  title_en: '',
  title_ar: '',
  excerpt_en: '',
  excerpt_ar: '',
  content_en: '',
  content_ar: '',
  category: 'residential',
  location_en: '',
  location_ar: '',
  client: '',
  year: new Date().getFullYear(),
  cover_image_url: '',
  gallery: [],
  featured: false,
  status: 'draft',
}

export default function ProjectEditor() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id && id !== 'new')
  const { t } = useTranslation()
  const { isAr } = useLocale()
  const navigate = useNavigate()
  const Back = isAr ? ArrowRight : ArrowLeft

  const [form, setForm] = useState<ProjectInput>(emptyForm)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const slugTouched = useRef(isEdit)

  useDocumentMeta(isEdit ? t('admin.editProject') : t('admin.newProject'))

  useEffect(() => {
    if (!isEdit || !id) return
    fetchProjectById(id)
      .then((p) => {
        if (p) {
          setForm({
            slug: p.slug,
            title_en: p.title_en,
            title_ar: p.title_ar,
            excerpt_en: p.excerpt_en,
            excerpt_ar: p.excerpt_ar,
            content_en: p.content_en,
            content_ar: p.content_ar,
            category: p.category,
            location_en: p.location_en,
            location_ar: p.location_ar,
            client: p.client ?? '',
            year: p.year,
            cover_image_url: p.cover_image_url ?? '',
            gallery: p.gallery ?? [],
            featured: p.featured,
            status: p.status,
          })
        } else {
          setError(t('projects.notFound'))
        }
      })
      .catch((e) => setError(String(e?.message ?? e)))
      .finally(() => setLoading(false))
  }, [id, isEdit, t])

  const set = <K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const onTitleEn = (value: string) => {
    set('title_en', value)
    if (!slugTouched.current) set('slug', slugify(value))
  }

  const handleSubmit = async () => {
    setError(null)
    setSaved(false)
    if (!form.title_en.trim() || !form.title_ar.trim() || !form.slug.trim()) {
      setError(t('admin.form.required'))
      return
    }
    setSaving(true)
    try {
      const payload: ProjectInput = {
        ...form,
        slug: slugify(form.slug),
        client: form.client?.trim() ? form.client : null,
        year: form.year ? Number(form.year) : null,
        cover_image_url: form.cover_image_url || null,
      }
      if (isEdit && id) {
        await updateProject(id, payload)
      } else {
        await createProject(payload)
      }
      setSaved(true)
      setTimeout(() => navigate('/admin'), 700)
    } catch (e: unknown) {
      setError(String((e as Error)?.message ?? e))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-300 transition-colors hover:text-white"
      >
        <Back className="h-4 w-4" />
        {t('admin.backToDashboard')}
      </Link>

      <h1 className="mt-4 text-3xl font-bold">
        {isEdit ? t('admin.editProject') : t('admin.newProject')}
      </h1>

      <div className="mt-8 space-y-8">
        {/* Titles */}
        <Card>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t('admin.form.titleEn')} required>
              <input
                className={inputCls}
                value={form.title_en}
                onChange={(e) => onTitleEn(e.target.value)}
              />
            </Field>
            <Field label={t('admin.form.titleAr')} required>
              <input
                dir="rtl"
                className={inputCls}
                value={form.title_ar}
                onChange={(e) => set('title_ar', e.target.value)}
              />
            </Field>
          </div>
          <Field label={t('admin.form.slug')} hint={t('admin.form.slugHint')} className="mt-5">
            <input
              dir="ltr"
              className={inputCls}
              value={form.slug}
              onChange={(e) => {
                slugTouched.current = true
                set('slug', e.target.value)
              }}
            />
          </Field>
        </Card>

        {/* Summaries */}
        <Card>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t('admin.form.excerptEn')}>
              <textarea
                rows={3}
                className={cn(inputCls, 'resize-none')}
                value={form.excerpt_en}
                onChange={(e) => set('excerpt_en', e.target.value)}
              />
            </Field>
            <Field label={t('admin.form.excerptAr')}>
              <textarea
                dir="rtl"
                rows={3}
                className={cn(inputCls, 'resize-none')}
                value={form.excerpt_ar}
                onChange={(e) => set('excerpt_ar', e.target.value)}
              />
            </Field>
          </div>
        </Card>

        {/* Content */}
        <Card>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t('admin.form.contentEn')}>
              <textarea
                rows={8}
                className={cn(inputCls, 'resize-y')}
                value={form.content_en}
                onChange={(e) => set('content_en', e.target.value)}
              />
            </Field>
            <Field label={t('admin.form.contentAr')}>
              <textarea
                dir="rtl"
                rows={8}
                className={cn(inputCls, 'resize-y')}
                value={form.content_ar}
                onChange={(e) => set('content_ar', e.target.value)}
              />
            </Field>
          </div>
        </Card>

        {/* Meta */}
        <Card>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Field label={t('admin.form.category')}>
              <select
                className={inputCls}
                value={form.category}
                onChange={(e) => set('category', e.target.value as ProjectInput['category'])}
              >
                {PROJECT_CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-ink-900">
                    {t(`categories.${c}`)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t('admin.form.client')}>
              <input
                className={inputCls}
                value={form.client ?? ''}
                onChange={(e) => set('client', e.target.value)}
              />
            </Field>
            <Field label={t('admin.form.year')}>
              <input
                type="number"
                className={inputCls}
                value={form.year ?? ''}
                onChange={(e) => set('year', e.target.value ? Number(e.target.value) : null)}
              />
            </Field>
            <Field label={t('admin.form.locationEn')}>
              <input
                className={inputCls}
                value={form.location_en}
                onChange={(e) => set('location_en', e.target.value)}
              />
            </Field>
            <Field label={t('admin.form.locationAr')}>
              <input
                dir="rtl"
                className={inputCls}
                value={form.location_ar}
                onChange={(e) => set('location_ar', e.target.value)}
              />
            </Field>
          </div>
        </Card>

        {/* Images */}
        <Card>
          <CoverUploader
            label={t('admin.form.coverImage')}
            value={form.cover_image_url}
            onChange={(url) => set('cover_image_url', url)}
          />
          <div className="mt-8">
            <GalleryUploader
              label={t('admin.form.gallery')}
              value={form.gallery}
              onChange={(g) => set('gallery', g)}
            />
          </div>
        </Card>

        {/* Status */}
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <Field label={t('admin.form.status')} className="w-44">
              <select
                className={inputCls}
                value={form.status}
                onChange={(e) => set('status', e.target.value as ProjectInput['status'])}
              >
                <option value="draft" className="bg-ink-900">
                  {t('admin.draft')}
                </option>
                <option value="published" className="bg-ink-900">
                  {t('admin.published')}
                </option>
              </select>
            </Field>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set('featured', e.target.checked)}
                className="h-5 w-5 accent-ember-500"
              />
              <span className="text-sm font-medium text-ink-200">
                {t('admin.form.markFeatured')}
              </span>
            </label>
          </div>
        </Card>

        {error && (
          <p className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
            <AlertCircle className="h-5 w-5" />
            {error}
          </p>
        )}
        {saved && (
          <p className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            <CheckCircle2 className="h-5 w-5" />
            {t('admin.saved')}
          </p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember-500 to-ember-600 px-7 py-3 font-semibold text-white shadow-lg shadow-ember-600/30 transition-all hover:-translate-y-0.5 disabled:opacity-60"
          >
            {saving ? (
              <Spinner className="h-5 w-5 border-white/40 border-t-white" />
            ) : (
              <Save className="h-5 w-5" />
            )}
            {saving ? t('admin.saving') : t('admin.save')}
          </button>
          <Link
            to="/admin"
            className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-ink-200 transition-colors hover:text-white"
          >
            {t('admin.cancel')}
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ---------- small building blocks ---------- */

const inputCls =
  'w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-white outline-none transition-colors focus:border-ember-400 focus:ring-2 focus:ring-ember-500/20'

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-white/10 bg-ink-850 p-6">{children}</div>
}

function Field({
  label,
  hint,
  required,
  className,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-ink-200">
        {label}
        {required && <span className="text-ember-400"> *</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-ink-400">{hint}</p>}
    </div>
  )
}

function CoverUploader({
  label,
  value,
  onChange,
}: {
  label: string
  value: string | null
  onChange: (url: string) => void
}) {
  const { t } = useTranslation()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    setErr(null)
    try {
      const url = await uploadProjectImage(file)
      onChange(url)
    } catch (e) {
      setErr(String((e as Error)?.message ?? e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-ink-200">{label}</p>
      {value ? (
        <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-white/10">
          <img src={value} alt="" className="aspect-video w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute end-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink-950/80 text-white hover:bg-red-500"
            aria-label={t('admin.form.remove')}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex aspect-video w-full max-w-sm cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-ink-900 text-ink-400 transition-colors hover:border-ember-400/40 hover:text-ember-300">
          {busy ? (
            <Spinner className="h-7 w-7" />
          ) : (
            <>
              <Upload className="h-7 w-7" />
              <span className="text-sm">{t('admin.form.upload')}</span>
            </>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={busy} />
        </label>
      )}
      {err && <p className="mt-2 text-xs text-red-300">{err}</p>}
    </div>
  )
}

function GalleryUploader({
  label,
  value,
  onChange,
}: {
  label: string
  value: string[]
  onChange: (urls: string[]) => void
}) {
  const { t } = useTranslation()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const onFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setBusy(true)
    setErr(null)
    try {
      const urls = await Promise.all(files.map((f) => uploadProjectImage(f)))
      onChange([...value, ...urls])
    } catch (e) {
      setErr(String((e as Error)?.message ?? e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-ink-200">{label}</p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {value.map((url) => (
          <div key={url} className="relative aspect-square overflow-hidden rounded-lg border border-white/10">
            <img src={url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(value.filter((u) => u !== url))}
              className="absolute end-1.5 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-950/80 text-white hover:bg-red-500"
              aria-label={t('admin.form.remove')}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-white/15 bg-ink-900 text-ink-400 transition-colors hover:border-ember-400/40 hover:text-ember-300">
          {busy ? (
            <Spinner className="h-6 w-6" />
          ) : (
            <>
              <ImagePlus className="h-6 w-6" />
              <span className="text-xs">{t('admin.form.upload')}</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onFiles}
            disabled={busy}
          />
        </label>
      </div>
      {err && <p className="mt-2 text-xs text-red-300">{err}</p>}
    </div>
  )
}
