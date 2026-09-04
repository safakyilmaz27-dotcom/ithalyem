// Build sonrası statik site üretimi (SSG).
//
// Sorun: Site bir React SPA'dır ve GitHub Pages statik hosting kullanır.
// Önceki sürüm yalnızca <head> meta etiketlerini yazıyordu; gövde boş
// (<div id="root"></div>) kaldığı için Googlebot hiçbir sayfada H1 veya
// gövde metni göremiyordu ve sayfalar "içeriksiz" sayılıyordu.
//
// Çözüm: Bilinen her route için React ağacını Node tarafında renderToString ile
// çalıştırıp üretilen HTML'i ve react-helmet-async'in <head> etiketlerini
// dist/<yol>/index.html içine gömüyoruz. Böylece her URL HTTP 200 döner ve ilk
// yanıtta H1 + gövde metni + JSON-LD hazırdır; SPA bundle sonradan yüklenip
// DOM'u hidrate eder (bkz. src/main.jsx).
//
// Aynı route listesinden sitemap.xml ve robots.txt de üretilir; böylece yeni
// bir ürün/blog yazısı eklendiğinde bunları elle güncellemek gerekmez.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const distDir = resolve(root, 'dist')

const { SITE, PRODUCT_META, BLOG_SLUGS } = await import(
  pathToFileURL(resolve(root, 'src/config.js')).href
)

// Prerender edilecek route listesi. priority/changefreq yalnızca sitemap içindir.
const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  ...PRODUCT_META.map((p) => ({
    path: `/urunler/${p.slug}`,
    priority: '0.9',
    changefreq: 'weekly',
  })),
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  ...BLOG_SLUGS.map((slug) => ({
    path: `/blog/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  })),
  { path: '/teklif', priority: '0.6', changefreq: 'monthly' },
]

// SSR bundle'ı yükle (`vite build --ssr src/entry-server.jsx` çıktısı).
const { render } = await import(
  pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href
)

const template = readFileSync(resolve(distDir, 'index.html'), 'utf8')

const HEAD_SLOT = '<!--app-head-->'
const HTML_SLOT = '<!--app-html-->'
const FB_START = '<!--fallback-seo-start-->'
const FB_END = '<!--fallback-seo-end-->'

for (const marker of [HEAD_SLOT, HTML_SLOT, FB_START, FB_END]) {
  if (!template.includes(marker)) {
    throw new Error(`index.html içinde ${marker} yer tutucusu bulunamadı.`)
  }
}

// Dev sunucusuna özel fallback <title>/description bloğunu çıkar; sayfaya özel
// karşılıkları Helmet çıktısından gelir, aksi halde her sayfada çift <title> olur.
const fbStart = template.indexOf(FB_START)
const fbEnd = template.indexOf(FB_END) + FB_END.length
const base = template.slice(0, fbStart).trimEnd() + '\n' + template.slice(fbEnd).trimStart()

let count = 0
for (const route of routes) {
  const { html, head } = render(route.path)

  // Regresyon koruması: gövdesiz veya başlıksız bir sayfa asla yayınlanmasın.
  if (!html.includes('<h1')) {
    throw new Error(`${route.path}: üretilen HTML'de <h1> yok.`)
  }
  if (html.length < 2000) {
    throw new Error(`${route.path}: üretilen HTML beklenenden kısa (${html.length} byte).`)
  }

  const page = base.replace(HEAD_SLOT, head).replace(HTML_SLOT, html)

  const outDir = route.path === '/' ? distDir : resolve(distDir, `.${route.path}`)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(resolve(outDir, 'index.html'), page, 'utf8')
  count++
}

// sitemap.xml
const lastmod = new Date().toISOString().slice(0, 10)
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((r) =>
    [
      '  <url>',
      `    <loc>${SITE.url}${r.path === '/' ? '/' : `${r.path}/`}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${r.changefreq}</changefreq>`,
      `    <priority>${r.priority}</priority>`,
      '  </url>',
    ].join('\n'),
  ),
  '</urlset>',
  '',
].join('\n')
writeFileSync(resolve(distDir, 'sitemap.xml'), sitemap, 'utf8')

// robots.txt: tam tarama izni + sitemap referansı.
writeFileSync(
  resolve(distDir, 'robots.txt'),
  ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE.url}/sitemap.xml`, ''].join('\n'),
  'utf8',
)

console.log(
  `[prerender] ${count} route statik HTML olarak üretildi; sitemap.xml (${routes.length} URL) ve robots.txt yazıldı.`,
)
