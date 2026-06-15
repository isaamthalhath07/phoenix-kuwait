/**
 * Central business configuration for Phoenix Kuwait.
 * NOTE: Contact details below are placeholders — update them with the
 * company's real phone, email, address and social links.
 */
export const SITE = {
  nameEn: 'Phoenix Kuwait',
  nameAr: 'فينيكس الكويت',
  taglineEn: 'Construction & Contracting',
  taglineAr: 'الإنشاءات والمقاولات',
  phone: '+965 0000 0000',
  whatsapp: '96500000000',
  email: 'info@phoenixkuwait.com',
  addressEn: 'Kuwait City, State of Kuwait',
  addressAr: 'مدينة الكويت، دولة الكويت',
  foundedYear: 2009,
  social: {
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
    facebook: 'https://facebook.com/',
  },
} as const

export interface NavItem {
  key: string
  to: string
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.about', to: '/about' },
  { key: 'nav.projects', to: '/projects' },
  { key: 'nav.contact', to: '/contact' },
]

export interface ServiceItem {
  key: string
  icon: string
}

/** icon names map to lucide-react icons resolved in the Services component */
export const SERVICES: ServiceItem[] = [
  { key: 'building', icon: 'Building2' },
  { key: 'civil', icon: 'TrafficCone' },
  { key: 'renovation', icon: 'Hammer' },
  { key: 'interior', icon: 'Sofa' },
  { key: 'mep', icon: 'PlugZap' },
  { key: 'management', icon: 'ClipboardList' },
]

export interface StatItem {
  value: number
  suffix: string
  key: string
}

export const STATS: StatItem[] = [
  { value: 250, suffix: '+', key: 'projects' },
  { value: 15, suffix: '+', key: 'years' },
  { value: 180, suffix: '+', key: 'team' },
  { value: 98, suffix: '%', key: 'satisfaction' },
]
