import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NAV_ITEMS, SERVICES, SITE } from '@/lib/constants'
import { useLocale } from '@/hooks/useLocale'
import { Logo } from '@/components/Logo'
import { InstagramIcon, LinkedinIcon, FacebookIcon } from '@/components/BrandIcons'

export function Footer() {
  const { t } = useTranslation()
  const { isAr, pick } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/5 bg-ink-900/90 py-16">
      {/* Background blueprint grid and glowing orb */}
      <div className="cyber-grid opacity-60" />
      <div className="absolute -top-32 start-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-ember-600/15 blur-[120px] pointer-events-none" />

      <div className="container-x relative z-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-300">
              {t('footer.about')}
            </p>
            <div className="mt-6 flex gap-3.5">
              <SocialLink href={SITE.social.instagram} label="Instagram">
                <InstagramIcon className="h-4.5 w-4.5" />
              </SocialLink>
              <SocialLink href={SITE.social.linkedin} label="LinkedIn">
                <LinkedinIcon className="h-4.5 w-4.5" />
              </SocialLink>
              <SocialLink href={SITE.social.facebook} label="Facebook">
                <FacebookIcon className="h-4.5 w-4.5" />
              </SocialLink>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.quickLinks')}
            </h4>
            <ul className="mt-5 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-ink-300 transition-colors hover:text-ember-400"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.services')}
            </h4>
            <ul className="mt-5 space-y-3">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.key} className="text-sm text-ink-300 transition-colors hover:text-ember-450">
                  {t(`services.${s.key}.title`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.contact')}
            </h4>
            <ul className="mt-5 space-y-4 text-sm text-ink-300">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ember-500" />
                <span>{pick(SITE.addressEn, SITE.addressAr)}</span>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 transition-colors hover:text-ember-400"
                  dir="ltr"
                >
                  <Phone className="h-4.5 w-4.5 shrink-0 text-ember-500" />
                  <span>{SITE.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-ember-400"
                >
                  <Mail className="h-4.5 w-4.5 shrink-0 text-ember-500" />
                  <span>{SITE.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-center text-xs text-ink-400 sm:flex-row sm:text-start">
          <p>
            © {year} {isAr ? SITE.nameAr : SITE.nameEn}. {t('footer.rights')}
          </p>
          <p className="text-ink-400 hover:text-ember-400 transition-colors duration-300">{t('footer.builtWith')}</p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-ink-200 bg-ink-950/40 transition-all duration-300 hover:-translate-y-1 hover:border-ember-500/50 hover:text-ember-450 hover:shadow-[0_0_15px_rgba(249,115,22,0.25)]"
    >
      <span className="transition-transform duration-500 group-hover:rotate-[360deg]">
        {children}
      </span>
    </a>
  )
}

