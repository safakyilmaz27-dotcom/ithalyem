import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  FlaskConical,
  Wheat,
  PackageCheck,
  FileText,
  CheckCircle2,
  MessageCircle,
  FileDown,
  HelpCircle,
} from 'lucide-react'
import Seo from '../components/Seo'
import { metaBySlug, SITE, waLink } from '../config'
import { useLang } from '../i18n/LanguageContext'

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { c } = useLang()
  const d = c.productDetail
  const meta = metaBySlug(slug)
  const p = meta ? c.products.items[meta.id] : null
  // Sayfaya özel SEO metinleri; tanımlı değilse ürün adına/özetine düşer.
  const ps = meta ? c.pageSeo.products[meta.id] : null
  const faq = (meta && c.pageSeo.faq[meta.id]) || []

  if (!meta || !p) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-28 text-center">
        <Seo title={d.notFoundTitle} path={`/urunler/${slug}`} />
        <h1 className="text-3xl font-extrabold text-navy-800">{d.notFoundTitle}</h1>
        <p className="mt-4 text-slate-600">{d.notFoundText}</p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white transition hover:bg-brand-800"
        >
          <ArrowLeft size={18} className="rtl:rotate-180" /> {d.backHome}
        </Link>
      </div>
    )
  }

  const documents = meta.hideAnalysis ? d.documentsShell : d.documents

  const pageUrl = `${SITE.url}/urunler/${meta.slug}/`

  // Product schema'sı BİLİNÇLİ OLARAK yayınlanmıyor.
  //
  // Google, herhangi bir Product düğümünde "offers", "review" veya
  // "aggregateRating" alanlarından en az birini ZORUNLU tutar; yoksa Search
  // Console'da kritik hata verir. Search Console canlı testinde doğrulandı
  // (4 Eyl 2026): «"offers", "review" veya "aggregateRating" belirtilmelidir».
  //
  // Fiyatlandırma teklif usulü olduğu için herkese açık sabit bir fiyat yok ve
  // gerçek kullanıcı yorumu bulunmuyor. Bu alanları uydurmak hem hatayı
  // çözmez hem de yapılandırılmış veri politikasını ihlal eder. Bu nedenle
  // ürün bilgisi yalnızca görünür HTML'de (analiz tablosu, rasyon oranları,
  // S.S.S.) sunuluyor; schema tarafında geçerli kalan BreadcrumbList ve
  // FAQPage yayınlanıyor.
  //
  // Gerçek bir fiyat listesi yayınlanırsa Product + Offer(price, priceCurrency,
  // availability) geri eklenebilir.
  const breadcrumbNode = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: SITE.name, item: `${SITE.url}/` },
      { '@type': 'ListItem', position: 2, name: p.name, item: pageUrl },
    ],
  }

  // FAQPage: yalnızca sayfada görünür olarak render edilen sorular yayınlanır.
  const faqNode = faq.length
    ? {
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }
    : null

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbNode, ...(faqNode ? [faqNode] : [])],
  }

  return (
    <article className="bg-white">
      <Seo
        title={ps?.title || p.name}
        description={ps?.desc || p.summary}
        path={`/urunler/${meta.slug}`}
        jsonLd={productJsonLd}
      />

      {/* Başlık şeridi */}
      <header className="bg-gradient-to-br from-navy-800 to-brand-800 py-14 text-white sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-slate-200 transition hover:text-white"
          >
            <ArrowLeft size={18} className="rtl:rotate-180" /> {d.back}
          </button>
          <span className="mt-4 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            {p.tag}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{ps?.h1 || p.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-200">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} /> {d.menseiLabel}: {p.origin}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <PackageCheck size={15} /> {d.minOrderLabel}: {d.minOrder}
            </span>
          </div>
          <p className="mt-5 max-w-2xl leading-relaxed text-slate-100">{p.summary}</p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            {/* Teknik analiz tablosu */}
            {!meta.hideAnalysis && p.analysis && (
              <section>
                <h2 className="flex items-center gap-2 text-2xl font-extrabold text-navy-800">
                  <FlaskConical size={24} className="text-brand-700" /> {d.analysisTitle}
                </h2>
                <div className="mt-5 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                  <table className="min-w-full overflow-hidden rounded-xl border border-slate-200 text-sm">
                    <tbody>
                      {p.analysis.map((a, i) => (
                        <tr key={a.label} className={i % 2 ? 'bg-slate-50' : 'bg-white'}>
                          <td className="px-5 py-3.5 font-medium text-slate-600">{a.label}</td>
                          <td className="px-5 py-3.5 text-end font-bold text-navy-800">{a.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Tipik rasyon kullanım oranları */}
            {p.rations && (
              <section>
                <h2 className="flex items-center gap-2 text-2xl font-extrabold text-navy-800">
                  <Wheat size={24} className="text-brand-700" /> {d.rationsTitle}
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {['buyukbas', 'kucukbas', 'kanatli'].map((key) => (
                    <div
                      key={key}
                      className="rounded-xl border border-slate-200 bg-brand-50/40 p-5 text-center"
                    >
                      <div className="text-sm font-semibold text-slate-500">{d.rationCols[key]}</div>
                      <div className="mt-2 text-xl font-extrabold text-brand-700">
                        {p.rations[key] || '—'}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-500">{d.rationNote}</p>
              </section>
            )}

            {/* Belge listesi */}
            <section>
              <h2 className="flex items-center gap-2 text-2xl font-extrabold text-navy-800">
                <FileText size={24} className="text-brand-700" /> {d.docsTitle}
              </h2>
              <ul className="mt-5 space-y-2.5">
                {documents.map((doc) => (
                  <li
                    key={doc}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                  >
                    <CheckCircle2 size={18} className="shrink-0 text-brand-700" />
                    {doc}
                  </li>
                ))}
              </ul>
            </section>

            {/* S.S.S. — FAQPage JSON-LD ile birebir aynı metin */}
            {faq.length > 0 && (
              <section>
                <h2 className="flex items-center gap-2 text-2xl font-extrabold text-navy-800">
                  <HelpCircle size={24} className="text-brand-700" /> {d.faqTitle}
                </h2>
                <dl className="mt-5 space-y-4">
                  {faq.map((item) => (
                    <div
                      key={item.q}
                      className="rounded-xl border border-slate-200 bg-white p-5"
                    >
                      <dt className="text-base font-bold text-navy-800">{item.q}</dt>
                      <dd className="mt-2 leading-relaxed text-slate-700">{item.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>

          {/* Yan panel: özet + CTA */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">{p.badge.label}</span>
                <span className="rounded-lg bg-brand-700 px-3 py-1 text-lg font-extrabold text-white">
                  {p.badge.value}
                </span>
              </div>

              <dl className="mt-5 space-y-2.5">
                {p.specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between border-b border-slate-200 pb-2 text-sm"
                  >
                    <dt className="text-slate-500">{s.label}</dt>
                    <dd className="font-semibold text-navy-800">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 flex items-start gap-2 rounded-lg bg-brand-700/10 p-3 text-sm text-brand-800">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                <span className="font-medium">{p.highlight}</span>
              </div>

              <div className="mt-6 space-y-2.5">
                <Link
                  to={`/teklif?urun=${encodeURIComponent(p.name)}`}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-3 text-base font-bold text-white transition hover:bg-brand-800"
                >
                  {d.quoteBtn}
                </Link>
                <a
                  href={waLink(d.wa(p.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  <MessageCircle size={17} /> {d.waBtn}
                </a>
                {!meta.hideAnalysis && (
                  <a
                    href={`/analiz/${meta.id}.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-navy-800 px-5 py-3 text-sm font-semibold text-navy-800 transition hover:bg-navy-800 hover:text-white"
                  >
                    <FileDown size={17} /> {d.pdfBtn}
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
