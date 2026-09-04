import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Clock, Phone } from 'lucide-react'
import Seo from '../components/Seo'
import { INTL_LOCALE, SITE } from '../config'
import { useLang } from '../i18n/LanguageContext'

export default function BlogPost() {
  const { slug } = useParams()
  const { c, lang } = useLang()
  const b = c.blog
  const post = b.posts[slug]
  // SERP için kısaltılmış başlık/açıklama; yoksa yazının kendi metinlerine düşer.
  const ps = c.pageSeo.posts[slug]
  const locale = INTL_LOCALE[lang] || 'tr-TR'

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-28 text-center">
        <Seo title={c.notFound.title} path={`/blog/${slug}`} />
        <h1 className="text-3xl font-extrabold text-navy-800">{c.notFound.title}</h1>
        <Link
          to="/blog"
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white transition hover:bg-brand-800"
        >
          <ArrowLeft size={18} className="rtl:rotate-180" /> {b.back}
        </Link>
      </div>
    )
  }

  const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: SITE.ogImage,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    inLanguage: lang,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: SITE.ogImage },
    },
    mainEntityOfPage: `${SITE.url}/blog/${slug}/`,
  }

  return (
    <article className="bg-white">
      <Seo
        title={ps?.title || post.title}
        description={ps?.desc || post.excerpt}
        path={`/blog/${slug}`}
        jsonLd={articleJsonLd}
      />

      <header className="bg-gradient-to-br from-navy-800 to-brand-800 py-14 text-white sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-slate-200 transition hover:text-white"
          >
            <ArrowLeft size={18} className="rtl:rotate-180" /> {b.back}
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-200">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={15} /> {fmtDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={15} /> {post.readMin} {b.minRead}
            </span>
            {slug === 'toptan-kepek-alim-rehberi' && (
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="inline-flex items-center gap-1.5 font-semibold text-white hover:underline"
              >
                <Phone size={15} /> {SITE.phoneDisplay}
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-5">
          {post.body.map((block, i) =>
            block.type === 'h2' ? (
              <h2 key={i} className="pt-4 text-2xl font-extrabold text-navy-800">
                {block.text}
              </h2>
            ) : (
              <p key={i} className="text-lg leading-relaxed text-slate-700">
                {block.text}
              </p>
            )
          )}
        </div>

        <div className="mt-12 rounded-2xl border border-brand-700/20 bg-brand-50 p-6 text-center">
          <p className="text-lg font-semibold text-navy-800">{c.contact.title}</p>
          <Link
            to="/teklif"
            className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-3 font-bold text-white transition hover:bg-brand-800"
          >
            {c.nav.getQuote}
          </Link>
        </div>
      </div>
    </article>
  )
}
