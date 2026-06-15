import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LogIn, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { isSupabaseConfigured } from '@/lib/supabase'
import { PhoenixMark } from '@/components/Logo'
import { Spinner } from '@/components/ui/Skeleton'
import { EmberBackground } from '@/components/EmberBackground'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

export default function AdminLogin() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { signIn, session } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useDocumentMeta(t('admin.login'))

  useEffect(() => {
    if (session) navigate('/admin', { replace: true })
  }, [session, navigate])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    const { error } = await signIn(email, password)
    setBusy(false)
    if (error) {
      setError(t('admin.loginError'))
      return
    }
    navigate('/admin', { replace: true })
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 p-6">
      <EmberBackground density={18} />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-ember-600/15 blur-[120px]" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-ink-850/90 p-8 backdrop-blur-xl">
        <div className="text-center">
          <PhoenixMark className="mx-auto h-14 w-14" />
          <h1 className="mt-4 text-2xl font-bold">{t('admin.login')}</h1>
          <p className="mt-1 text-sm text-ink-300">{t('admin.loginSubtitle')}</p>
        </div>

        {!isSupabaseConfigured && (
          <p className="mt-6 flex items-start gap-2 rounded-xl bg-amber-500/10 px-4 py-3 text-xs text-amber-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to
            enable login.
          </p>
        )}

        <form onSubmit={onSubmit} className="mt-7 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-ink-200">{t('admin.email')}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-white outline-none transition-colors focus:border-ember-400 focus:ring-2 focus:ring-ember-500/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-ink-200">
              {t('admin.password')}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-white outline-none transition-colors focus:border-ember-400 focus:ring-2 focus:ring-ember-500/20"
            />
          </div>

          {error && (
            <p className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
              <AlertCircle className="h-4 w-4" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ember-500 to-ember-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-ember-600/30 transition-all hover:-translate-y-0.5 disabled:opacity-60"
          >
            {busy ? (
              <Spinner className="h-5 w-5 border-white/40 border-t-white" />
            ) : (
              <LogIn className="h-5 w-5" />
            )}
            {busy ? t('admin.signingIn') : t('admin.signIn')}
          </button>
        </form>
      </div>
    </section>
  )
}
