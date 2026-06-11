import { Helmet } from 'react-helmet-async'
import { SITE } from '../config'

// Her sayfa için <title>, <meta description>, <canonical>, Open Graph ve
// opsiyonel JSON-LD structured data'yı dinamik olarak set eder.
export default function Seo({ title, description, path = '/', jsonLd, image }) {
  const url = `${SITE.url}${path}`
  const fullTitle = title ? `${title} | ${SITE.name}` : SITE.name

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="tr_TR" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}
