import { useState } from 'react'
import { Wheat, Menu, X, Phone } from 'lucide-react'
import { SITE, waLink } from '../config'

const LINKS = [
  { href: '#avantajlar', label: 'Neden Biz?' },
  { href: '#urunler', label: 'Ürünler' },
  { href: '#lojistik', label: 'Lojistik' },
  { href: '#iletisim', label: 'Teklif Al' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-800 text-gold-400">
            <Wheat size={22} />
          </span>
          <span className="text-lg font-bold tracking-tight text-navy-800">
            İthalyem<span className="text-gold-500">.com</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 transition hover:text-forest-800"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-navy-800"
          >
            <Phone size={16} /> {SITE.phoneDisplay}
          </a>
          <a
            href={waLink('Merhaba, ürünleriniz hakkında bilgi almak istiyorum.')}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            WhatsApp
          </a>
        </div>

        <button
          className="text-navy-800 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menüyü aç/kapat"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="space-y-1 px-4 py-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                {l.label}
              </a>
            ))}
            <a
              href={waLink('Merhaba, ürünleriniz hakkında bilgi almak istiyorum.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block rounded-lg bg-green-600 px-3 py-2.5 text-center text-base font-semibold text-white"
            >
              Hızlı Teklif / WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
