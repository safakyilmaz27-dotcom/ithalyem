import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react'
import { CATEGORY_IDS, metasByCategory, waLink } from '../config'
import { useLang } from '../i18n/LanguageContext'

function ProductCard({ meta, p, labels }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl">
      {/* Üst başlık şeridi */}
      <div className="relative bg-gradient-to-br from-navy-800 to-forest-800 px-6 py-6">
        <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
          {p.tag}
        </span>
        <h3 className="mt-3 text-xl font-bold leading-snug text-white">
          <Link to={`/urunler/${meta.slug}`} className="transition hover:text-gold-400">
            {p.name}
          </Link>
        </h3>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-200">
          <MapPin size={14} /> {labels.menseiLabel}: {p.origin}
        </div>

        {/* Analiz rozeti */}
        <div className="absolute end-5 top-5 flex flex-col items-center rounded-xl bg-gold-500 px-3 py-2 text-navy-900 shadow-lg">
          <span className="text-lg font-extrabold leading-none">{p.badge.value}</span>
          <span className="text-[10px] font-semibold uppercase tracking-wide">
            {p.badge.label}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-relaxed text-slate-600">{p.summary}</p>

        <dl className="mt-5 space-y-2.5">
          {p.specs.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between border-b border-slate-100 pb-2 text-sm"
            >
              <dt className="text-slate-500">{s.label}</dt>
              <dd className="font-semibold text-navy-800">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 flex items-start gap-2 rounded-lg bg-forest-800/5 p-3 text-sm text-forest-800">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <span className="font-medium">{p.highlight}</span>
        </div>

        {/* Aksiyon butonları */}
        <div className="mt-6 flex flex-col gap-2.5">
          <Link
            to={`/urunler/${meta.slug}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-navy-800 px-4 py-2.5 text-sm font-semibold text-navy-800 transition hover:bg-navy-800 hover:text-white"
          >
            {labels.detailBtn} <ArrowRight size={16} className="rtl:rotate-180" />
          </Link>
          <a
            href={waLink(labels.waProduct(p.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <MessageCircle size={17} /> {labels.quoteBtn}
          </a>
        </div>
      </div>
    </article>
  )
}

export default function Products() {
  const { c } = useLang()
  const pr = c.products
  const labels = {
    menseiLabel: pr.menseiLabel,
    detailBtn: pr.detailBtn,
    quoteBtn: pr.quoteBtn,
    waProduct: c.productDetail.wa,
  }

  return (
    <section id="urunler" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-forest-700">
            {pr.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-800 sm:text-4xl">{pr.title}</h2>
          <p className="mt-4 text-lg text-slate-600">{pr.desc}</p>
        </div>

        <div className="mt-16 space-y-16">
          {CATEGORY_IDS.map((catId) => {
            const items = metasByCategory(catId)
            if (items.length === 0) return null
            const cat = pr.categories[catId]
            return (
              <div key={catId}>
                {/* Kategori başlığı */}
                <div className="flex flex-col gap-1 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-extrabold text-navy-800">{cat.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{cat.description}</p>
                  </div>
                  <span className="text-sm font-semibold text-forest-700">
                    {items.length} {pr.countSuffix}
                  </span>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((meta) => (
                    <ProductCard
                      key={meta.id}
                      meta={meta}
                      p={pr.items[meta.id]}
                      labels={labels}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
