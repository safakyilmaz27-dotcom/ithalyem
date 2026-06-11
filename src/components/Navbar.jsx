import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Wheat, Menu, X, Phone } from 'lucide-react'
import { SITE, waLink } from '../config'
import { useLang } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const { c } = useLang()
  const [open, setOpen] = useState(false)

  // Bölüm linkleri ana sayfadaki #anchor'lara gider; alt sayfalardan da çalışır.
  const links = [
    { to: '/#avantajlar', label: c.nav.whyUs },
    { to: '/#urunler', label: c.nav.products },
    { to: '/#stok', label: c.nav.stock },
    { to: '/#lojistik', label: c.nav.logistics },
    { to: '/blog', label: c.nav.blog },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-800 text-gold-400">
            <Wheat size={22} />
          </span>
          <span className="text-lg font-bold tracking-tight text-navy-800">
            İthalyem<span className="text-gold-500">.com</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-slate-600 transition hover:text-brand-700"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="flex min-h-11 items-center gap-1.5 text-sm font-semibold text-navy-800"
          >
            <Phone size={16} /> {SITE.phoneDisplay}
          </a>
          <Link
            to="/teklif"
            className="rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            {c.nav.getQuote}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            className="flex h-11 w-11 items-center justify-center text-navy-800"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="space-y-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/teklif"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-lg bg-brand-700 px-3 py-3 text-center text-base font-semibold text-white"
            >
              {c.nav.getQuote}
            </Link>
            <a
              href={waLink(c.navWa)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block rounded-lg bg-green-600 px-3 py-3 text-center text-base font-semibold text-white"
            >
              {c.nav.whatsapp}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
