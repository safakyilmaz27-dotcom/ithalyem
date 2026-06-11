import { Wheat, Phone, Mail, MapPin } from 'lucide-react'
import { SITE, PRODUCTS, waLink } from '../config'

export default function Footer() {
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
            <p className="mt-4 text-sm leading-relaxed">{SITE.slogan}</p>
          </div>

          {/* Ürünler */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Ürünler</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <a href="#urunler" className="transition hover:text-gold-400">{p.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Kurumsal</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#avantajlar" className="transition hover:text-gold-400">Neden İthal Yem?</a></li>
              <li><a href="#lojistik" className="transition hover:text-gold-400">Lojistik &amp; Teslimat</a></li>
              <li><a href="#iletisim" className="transition hover:text-gold-400">Teklif &amp; İletişim</a></li>
              <li>
                <a href={waLink('Merhaba, bilgi almak istiyorum.')} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold-400">
                  WhatsApp Hattı
                </a>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">İletişim</h3>
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
                <span>{SITE.region}, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO odaklı metin bloğu */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-sm leading-relaxed text-slate-400">
            <strong className="text-slate-300">İthalyem.com</strong> — Doğu Anadolu ithal
            kepek, %32 nişastalı kepek fiyatları, Erzurum pamuk yağı küspesi, %22.80
            proteinli küspe tedariki, ATK 36 ve DDGS ithalatı alanında B2B ve toplu satış
            çözümleri sunar. Orta Asya menşeli yüksek analiz değerli yem ham maddeleri ile
            Erzurum, Malatya, Elazığ, Iğdır, Kars ve Van başta olmak üzere tüm Doğu Anadolu
            bölgesindeki yem fabrikaları, entegre tesisler ve büyük çiftliklere doğrudan
            liman ve depo teslim seçenekleriyle hizmet veriyoruz.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm sm:flex-row">
          <span>© {year} İthalyem.com — Tüm hakları saklıdır.</span>
          <span className="text-slate-500">{SITE.slogan}</span>
        </div>
      </div>
    </footer>
  )
}
