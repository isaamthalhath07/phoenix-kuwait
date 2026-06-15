import { useTranslation } from 'react-i18next'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { EmberBackground } from '@/components/EmberBackground'
import { PhoenixMark } from '@/components/Logo'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

export default function NotFound() {
  const { t } = useTranslation()
  useDocumentMeta(t('notFound.title'))

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center">
      <EmberBackground density={20} />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-600/15 blur-[120px]" />
      <div className="container-x relative">
        <PhoenixMark className="mx-auto h-20 w-20 animate-float" />
        <p className="mt-6 font-display text-7xl font-black text-gradient sm:text-9xl">404</p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{t('notFound.title')}</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-300">{t('notFound.desc')}</p>
        <Button to="/" className="mt-8">
          <Home className="h-5 w-5" />
          {t('notFound.home')}
        </Button>
      </div>
    </section>
  )
}
