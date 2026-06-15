import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LogOut, ExternalLink } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export default function AdminLayout() {
  const { t } = useTranslation()
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-ink-950">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-900/90 backdrop-blur-xl">
        <div className="container-x flex items-center justify-between gap-4 py-4">
          <Link to="/admin" className="flex items-center gap-3">
            <Logo />
            <span className="hidden rounded-full bg-ember-500/15 px-2.5 py-0.5 text-xs font-semibold text-ember-300 sm:inline">
              {t('admin.title')}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-2 text-sm font-medium text-ink-200 transition-colors hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Site</span>
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-2 text-sm font-medium text-ink-200 transition-colors hover:border-red-400/40 hover:text-red-300"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{t('admin.signOut')}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container-x py-10">
        <Outlet />
      </main>
    </div>
  )
}
