import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import Seo from '../components/Seo'
import { REGION_META, SITE } from '../config'
import { useLang } from '../i18n/LanguageContext'

// /bolgeler — il sayfalarının hub'ı. Tek başına da bir giriş sayfasıdır ve
// sekiz bölge sayfasına iç bağlantı vererek taranmalarını hızlandırır.
export default function RegionList() {
  const { c } = useLang()
  const r = c.regions

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: r.indexH1,
    itemListElement: REGION_META.map((meta, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.cities.names[meta.id],
      url: `${SITE.url}/bolgeler/${meta.slug}/`,
    })),
  }

  return (
    <section className="bg-white py-16 sm:py-20">
      <Seo title={r.indexTitle} description={r.indexDesc} path="/bolgeler" jsonLd={jsonLd} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-700">{r.eyebrow}</span>
          <h1 className="mt-2 text-3xl font-extrabold text-navy-800 sm:text-4xl">{r.indexH1}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{r.indexIntro}</p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {REGION_META.map((meta) => {
            const city = c.cities.names[meta.id]
            return (
              <li key={meta.id}>
                <Link
                  to={`/bolgeler/${meta.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-700/30 hover:shadow-lg"
                >
                  <span className="inline-flex items-center gap-2 text-xl font-extrabold text-navy-800 transition group-hover:text-brand-700">
                    <MapPin size={20} className="text-brand-700" /> {city}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-slate-600">
                    {meta.districts.join(', ')}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
                    {r.cardCta} <ArrowRight size={16} className="rtl:rotate-180" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
