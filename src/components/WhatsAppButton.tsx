import { MessageCircle } from 'lucide-react'
import { SITE } from '@/lib/constants'

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${SITE.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 end-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-600/40 transition-transform hover:scale-110"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/40 [animation-duration:2.5s]" />
      <MessageCircle className="relative h-7 w-7" />
    </a>
  )
}
