import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, HelpCircle, MessageCircle, Phone } from 'lucide-react'
import Seo from '../components/Seo'
import RichText from '../components/RichText'
import { REGION_META, regionBySlug, SITE, waLink } from '../config'
import { useLang } from '../i18n/LanguageContext'

// İl bazlı tedarik sayfası — /bolgeler/<slug>.
//
// Metnin tamamı content.regions.build() şablonundan üretilir; burada yalnızca
// sunum ve yapılandırılmış veri var. Sayfada TEK bir <h1> bulunur ve bölümler
// <h2> ile ayrılır; S.S.S. hem görünür HTML hem de FAQPage JSON-LD olarak
// yayınlanır (Google, schema'daki sorunun sayfada da görünmesini şart koşar).
export default function RegionPage() {
  const { slug } = useParams()
  const { c } = useLang()
  const r = c.regions
  const meta = regionBySlug(slug)

  if (!meta) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-28 text-center">
        <Seo title={c.notFound.title} path={`/bolgeler/${slug}`} />
        <h1 className="text-3xl font-extrabold text-navy-800">{c.notFound.title}</h1>
        <p className="mt-4 text-slate-600">{c.notFound.text}</p>
        <Link
          to="/bolgeler"
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white transition hover:bg-brand-800"
        >
          <ArrowLeft size={18} className="rtl:rotate-180" /> {r.breadcrumb}
        </Link>
      </div>
    )
  }

  const city = c.cities.names[meta.id]
  const page = r.build({
    city,
    districts: meta.districts,
    neighborNames: meta.neighbors.map((id) => c.cities.names[id]),
  })
  const pageUrl = `${SITE.url}/bolgeler/${meta.slug}/`
  const others = REGION_META.filter((o) => o.id !== meta.id)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: SITE.name, item: `${SITE.url}/` },
          { '@type': 'ListItem', position: 2, name: r.breadcrumb, item: `${SITE.url}/bolgeler/` },
          { '@type': 'ListItem', position: 3, name: page.h1, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  }

  return (
    <article className="bg-white">
      <Seo title={page.title} description={page.desc} path={`/bolgeler/${meta.slug}`} jsonLd={jsonLd} />

      <header className="bg-gradient-to-br from-navy-800 to-brand-800 py-14 text-white sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/bolgeler"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-slate-200 transition hover:text-white"
          >
            <ArrowLeft size={18} className="rtl:rotate-180" /> {r.breadcrumb}
          </Link>
          <span className="mt-4 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            {r.eyebrow}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">{page.h1}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-200">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} /> {city}
            </span>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="inline-flex items-center gap-1.5 font-semibold text-white hover:underline"
            >
              <Phone size={15} /> {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <RichText blocks={page.body} />

        {/* S.S.S. — FAQPage JSON-LD ile birebir aynı metin */}
        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-2xl font-extrabold text-navy-800">
            <HelpCircle size={24} className="text-brand-700" /> {r.faqTitle}
          </h2>
          <dl className="mt-5 space-y-4">
            {page.faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-slate-200 bg-white p-5">
                <dt className="text-base font-bold text-navy-800">{item.q}</dt>
                <dd className="mt-2 leading-relaxed text-slate-700">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-brand-700/20 bg-brand-50 p-6 text-center">
          <p className="text-lg font-bold text-navy-800">{r.ctaTitle(city)}</p>
          <p className="mx-auto mt-2 max-w-xl text-slate-700">{r.ctaText}</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={`/teklif?urun=${encodeURIComponent(c.products.items.kepek.name)}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-3 font-bold text-white transition hover:bg-brand-800"
            >
              {r.quoteCta}
            </Link>
            <a
              href={waLink(`${city} — ${c.products.items.kepek.name}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              <MessageCircle size={17} /> {c.nav.whatsapp}
            </a>
          </div>
        </div>

        {/* Diğer iller — bölge sayfaları arası iç bağlantı */}
        <nav className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            {r.otherCitiesTitle}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {others.map((o) => (
              <li key={o.id}>
                <Link
                  to={`/bolgeler/${o.slug}`}
                  className="inline-block rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-navy-800 transition hover:border-brand-700/40 hover:bg-brand-50"
                >
                  {c.cities.names[o.id]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  )
}
