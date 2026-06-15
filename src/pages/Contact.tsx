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

/** Keep only valid phone characters: digits, spaces, hyphens, parentheses, and a single leading "+". */
function sanitizePhone(raw: string): string {
  let v = raw.replace(/[^\d+()\s-]/g, '')
  const hasPlus = v.trimStart().startsWith('+')
  v = v.replace(/\+/g, '') // strip all "+"
  if (hasPlus) v = '+' + v // re-add a single leading "+"
  return v.replace(/\s{2,}/g, ' ').replace(/-{2,}/g, '-').slice(0, 20)
}

const digitCount = (v: string) => (v.match(/\d/g) ?? []).length

export default function Contact() {
  const { t } = useTranslation()
  const { pick } = useLocale()
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [phoneTouched, setPhoneTouched] = useState(false)

  useDocumentMeta(t('contact.title'), t('contact.subtitle'))

  // Phone is optional, but if provided it must contain a plausible number of digits.
  const phoneInvalid = form.phone.trim().length > 0 && (digitCount(form.phone) < 7 || digitCount(form.phone) > 15)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPhoneTouched(true)
    if (phoneInvalid) return
    setStatus('sending')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          'bot-field': '',
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
        }),
      })
      if (!res.ok) throw new Error('Network error')
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
      setPhoneTouched(false)
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

      <section className="container-x grid gap-12 py-16 lg:grid-cols-[1fr_1.3fr] relative">
        {/* Page blueprint grid */}
        <div className="cyber-grid opacity-30 pointer-events-none -mt-40 h-[140%] z-0" />

        {/* Info Cards */}
        <Reveal variant="left" className="z-10 relative">
          <div className="space-y-5">
            {info.map((item) => {
              const Icon = item.icon
              const content = (
                <div className="flex items-start gap-4 rounded-2xl border border-ember-500/10 bg-ink-900/60 p-5 backdrop-blur-md transition-all duration-350 hover:border-cyan-400/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold font-mono uppercase tracking-widest text-ink-400">{item.label}</p>
                    <p
                      className="mt-1.5 font-semibold text-white tracking-wide"
                      dir={item.ltr ? 'ltr' : undefined}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              )
              return item.href ? (
                <a key={item.label} href={item.href} className="block group">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              )
            })}
          </div>
        </Reveal>

        {/* Form Container */}
        <Reveal variant="right" className="z-10 relative">
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            noValidate
            className="rounded-3xl border border-ember-500/25 cyber-glass-cyan cyber-corners p-7 sm:p-9 shadow-lg shadow-black/40 group relative"
          >
            {/* Holographic scanner laser line on hover */}
            <div className="laser-scanner opacity-20 pointer-events-none" />

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
                autoComplete="name"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                required
              />
              <Field
                label={t('contact.phone')}
                name="phone"
                type="tel"
                dir="ltr"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+965 0000 0000"
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: sanitizePhone(v) }))}
                onBlur={() => setPhoneTouched(true)}
                error={phoneTouched && phoneInvalid ? t('contact.phoneInvalid') : undefined}
              />
            </div>
            
            <div className="mt-5">
              <Field
                label={t('contact.email')}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                dir="ltr"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                required
              />
            </div>
            
            <div className="mt-5">
              <label className="mb-2 block text-xs font-bold font-mono uppercase tracking-wider text-ink-300 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                {t('contact.message')}
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full resize-none rounded-xl border border-white/10 bg-ink-950/70 px-4 py-3 text-white placeholder-ink-400/50 outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/10 font-medium tracking-wide"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ember-500 to-ember-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-ember-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 sm:w-auto cyber-corners cursor-pointer"
            >
              {status === 'sending' && <Spinner className="h-5 w-5 border-white/40 border-t-white" />}
              {status === 'sending' ? t('contact.sending') : t('contact.send')}
            </button>

            {status === 'success' && (
              <p className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                {t('contact.success')}
              </p>
            )}
            {status === 'error' && (
              <p className="mt-5 flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                <AlertCircle className="h-5 w-5 shrink-0" />
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
  onBlur,
  type = 'text',
  inputMode,
  autoComplete,
  dir,
  placeholder,
  required,
  error,
}: {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  onBlur?: () => void
  type?: string
  inputMode?: 'text' | 'tel' | 'email' | 'numeric'
  autoComplete?: string
  dir?: 'ltr' | 'rtl'
  placeholder?: string
  required?: boolean
  error?: string
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold font-mono uppercase tracking-wider text-ink-300 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        {label}
        {required && <span className="text-ember-500"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        dir={dir}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`w-full rounded-xl border bg-ink-950/70 px-4 py-3 text-white placeholder-ink-400/50 outline-none transition-all focus:ring-2 font-medium tracking-wide ${
          error
            ? 'border-red-400/60 focus:border-red-400 focus:ring-red-500/10'
            : 'border-white/10 focus:border-cyan-400 focus:ring-cyan-500/10'
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-350">{error}</p>}
    </div>
  )
}

