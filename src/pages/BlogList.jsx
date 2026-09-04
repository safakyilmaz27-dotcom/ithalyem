import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import Seo from '../components/Seo'
import { BLOG_SLUGS, INTL_LOCALE, SITE } from '../config'
import { useLang } from '../i18n/LanguageContext'

export default function BlogList() {
  const { c, lang } = useLang()
  const b = c.blog
  const locale = INTL_LOCALE[lang] || 'tr-TR'

  const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE.name} — ${b.title}`,
    url: `${SITE.url}/blog`,
    blogPost: BLOG_SLUGS.map((slug) => {
      const post = b.posts[slug]
      return {
        '@type': 'BlogPosting',
        headline: post.title,
        datePublished: post.date,
        url: `${SITE.url}/blog/${slug}`,
      }
    }),
  }

  return (
    <section className="bg-white py-16 sm:py-20">
      <Seo title={c.seo.blogList.title} description={c.seo.blogList.desc} path="/blog" jsonLd={blogJsonLd} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-700">{b.eyebrow}</span>
          <h1 className="mt-2 text-3xl font-extrabold text-navy-800 sm:text-4xl">{c.seo.blogList.h1 || b.title}</h1>
          <p className="mt-3 text-lg text-slate-600">{b.desc}</p>
        </div>

        <div className="mt-12 space-y-6">
          {BLOG_SLUGS.map((slug) => {
            const post = b.posts[slug]
            return (
              <article
                key={slug}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-700/30 hover:shadow-lg sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} /> {fmtDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} /> {post.readMin} {b.minRead}
                  </span>
                </div>
                <h2 className="mt-3 text-xl font-extrabold text-navy-800 sm:text-2xl">
                  <Link to={`/blog/${slug}`} className="transition hover:text-brand-700">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 leading-relaxed text-slate-600">{post.excerpt}</p>
                <Link
                  to={`/blog/${slug}`}
                  className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                >
                  {b.readMore} <ArrowRight size={16} className="rtl:rotate-180" />
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
