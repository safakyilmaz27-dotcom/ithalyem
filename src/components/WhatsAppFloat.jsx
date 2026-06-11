import { MessageCircle } from 'lucide-react'
import { waLink } from '../config'

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink('Merhaba, ithalyem.com üzerinden ulaşıyorum. Bilgi almak istiyorum.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-xl shadow-green-900/30 transition hover:scale-105 hover:bg-green-700"
    >
      <MessageCircle size={28} />
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/40" />
    </a>
  )
}
