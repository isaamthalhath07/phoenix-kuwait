import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { Spinner } from '@/components/ui/Skeleton'
import { SITE } from '@/lib/constants'
import { useLocale } from '@/hooks/useLocale'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

type Status = 'idle' | 'sending' | 'success' | 'error'

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&')

export default function Contact() {
  const { t } = useTranslation()
  const { pick } = useLocale()
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  useDocumentMeta(t('contact.title'), t('contact.subtitle'))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', 'bot-field': '', ...form }),
      })
      if (!res.ok) throw new Error('Network error')
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const info = [
    {
      icon: Phone,
      label: t('common.callUs'),
      value: SITE.phone,
      href: `tel:${SITE.phone.replace(/\s/g, '')}`,
      ltr: true,
    },
    { icon: Mail, label: t('common.emailUs'), value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MapPin, label: t('contact.infoTitle'), value: pick(SITE.addressEn, SITE.addressAr) },
    { icon: Clock, label: t('contact.hoursTitle'), value: t('contact.hours') },
  ]

  return (
    <>
      <PageHero eyebrow={t('contact.eyebrow')} title={t('contact.title')} subtitle={t('contact.subtitle')} />

      <section className="container-x grid gap-12 py-16 lg:grid-cols-[1fr_1.3fr]">
        {/* Info */}
        <Reveal variant="left">
          <div className="space-y-5">
            {info.map((item) => {
              const Icon = item.icon
              const content = (
                <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-ink-850 p-5 transition-colors hover:border-ember-400/30">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ember-500/10 text-ember-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-ink-400">{item.label}</p>
                    <p
                      className="mt-1 font-medium text-white"
                      dir={item.ltr ? 'ltr' : undefined}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              )
              return item.href ? (
                <a key={item.label} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              )
            })}
          </div>
        </Reveal>

        {/* Form */}
        <Reveal variant="right">
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-ink-850 p-7 sm:p-9"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={t('contact.name')}
                name="name"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                required
              />
              <Field
                label={t('contact.phone')}
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
              />
            </div>
            <div className="mt-5">
              <Field
                label={t('contact.email')}
                name="email"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                required
              />
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-ink-200">
                {t('contact.message')}
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full resize-none rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-white placeholder-ink-400 outline-none transition-colors focus:border-ember-400 focus:ring-2 focus:ring-ember-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ember-500 to-ember-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-ember-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 sm:w-auto"
            >
              {status === 'sending' && <Spinner className="h-5 w-5 border-white/40 border-t-white" />}
              {status === 'sending' ? t('contact.sending') : t('contact.send')}
            </button>

            {status === 'success' && (
              <p className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
                {t('contact.success')}
              </p>
            )}
            {status === 'error' && (
              <p className="mt-5 flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <AlertCircle className="h-5 w-5" />
                {t('contact.error')}
              </p>
            )}
          </form>
        </Reveal>
      </section>
    </>
  )
}

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-ink-200">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-white placeholder-ink-400 outline-none transition-colors focus:border-ember-400 focus:ring-2 focus:ring-ember-500/20"
      />
    </div>
  )
}
