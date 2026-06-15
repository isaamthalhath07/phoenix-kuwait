import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Stats } from '@/components/sections/Stats'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { Process } from '@/components/sections/Process'
import { AboutPreview } from '@/components/sections/AboutPreview'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

export default function Home() {
  useDocumentMeta(
    '',
    'Phoenix Kuwait — premier construction and contracting company building landmarks across Kuwait with precision, integrity and craftsmanship.',
  )
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <AboutPreview />
      <FeaturedProjects />
      <Process />
      <ContactCTA />
    </>
  )
}
