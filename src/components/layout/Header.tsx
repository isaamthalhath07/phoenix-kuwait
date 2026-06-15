import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Button } from '@/components/ui/Button'

export function Header() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'top-4 px-4 sm:px-6' : 'top-0 px-0',
      )}
    >
      <div
        className={cn(
          'mx-auto flex items-center justify-between gap-4 transition-all duration-500',
          scrolled
            ? 'cyber-glass max-w-6xl rounded-full px-6 py-2.5 border border-ember-500/25 shadow-lg shadow-ember-950/40'
            : 'container-x py-6 bg-transparent border-b border-transparent',
        )}
      >
        <Link to="/" aria-label="Phoenix Kuwait home" className="group">
          <div className="transition-transform duration-300 group-hover:scale-105">
            <Logo />
          </div>
        </Link>

        <nav className="hidden items-center gap-1.5 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'relative rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300',
                  isActive
                    ? 'text-white bg-white/5 border border-ember-500/20 shadow-[0_0_12px_rgba(249,115,22,0.15)]'
                    : 'text-ink-300 hover:text-white hover:bg-white/5 border border-transparent',
                )
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3.5 lg:flex">
          <LanguageSwitcher />
          <Button to="/contact" size="md" className="cyber-corners shadow-[0_0_15px_rgba(249,115,22,0.15)]">
            {t('nav.getQuote')}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white bg-ink-900/60 backdrop-blur-md transition-colors hover:border-ember-500/30"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/5 bg-ink-950/98 backdrop-blur-2xl lg:hidden mt-2 rounded-2xl mx-4 border border-ember-500/20"
          >
            <nav className="container-x flex flex-col gap-1 py-5">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-xl px-4 py-3 text-base font-semibold transition-all',
                        isActive 
                          ? 'bg-white/5 text-ember-400 border-l-2 border-ember-500 pl-3' 
                          : 'text-ink-200 hover:bg-white/5 pl-4',
                      )
                    }
                  >
                    {t(item.key)}
                  </NavLink>
                </motion.div>
              ))}
              <Button to="/contact" size="lg" className="mt-3 w-full">
                {t('nav.getQuote')}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

