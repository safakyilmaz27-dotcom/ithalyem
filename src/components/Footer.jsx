import { Link } from 'react-router-dom'
import { Wheat, Phone, Mail, MapPin } from 'lucide-react'
import { SITE, PRODUCT_META, waLink } from '../config'
import { useLang } from '../i18n/LanguageContext'

export default function Footer() {
  const { c } = useLang()
  const f = c.footer
  const year = new Date().getFullYear()

  return (
    <footer className="bg-forest-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marka */}
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500 text-forest-900">
                <Wheat size={22} />
              </span>
              <span className="text-lg font-bold text-white">
                İthalyem<span className="text-gold-400">.com</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">{f.slogan}</p>
          </div>

          {/* Ürünler */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">{f.productsTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PRODUCT_META.map((meta) => (
                <li key={meta.id}>
                  <Link to={`/urunler/${meta.slug}`} className="transition hover:text-gold-400">
                    {c.products.items[meta.id].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">{f.corporateTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/#avantajlar" className="transition hover:text-gold-400">{f.links.whyUs}</Link></li>
              <li><Link to="/#lojistik" className="transition hover:text-gold-400">{f.links.logistics}</Link></li>
              <li><Link to="/blog" className="transition hover:text-gold-400">{f.links.blog}</Link></li>
              <li><Link to="/teklif" className="transition hover:text-gold-400">{f.links.quote}</Link></li>
              <li>
                <a href={waLink(f.wa)} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold-400">
                  {c.nav.whatsapp}
                </a>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">{f.contactTitle}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-gold-400" />
                <a href={`tel:${SITE.phoneRaw}`} className="transition hover:text-gold-400">{SITE.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-gold-400" />
                <a href={`mailto:${SITE.email}`} className="transition hover:text-gold-400">{SITE.email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" />
                <span>{f.region}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO odaklı metin bloğu */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-sm leading-relaxed text-slate-400">{f.seo}</p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm sm:flex-row">
          <span>© {year} İthalyem.com — {f.rights}</span>
          <span className="text-slate-500">{f.slogan}</span>
        </div>
      </div>
    </footer>
  )
}
