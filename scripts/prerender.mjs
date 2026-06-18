// Build sonrası statik prerender.
//
// Sorun: Site bir React SPA'dır ve GitHub Pages statik hosting kullanır.
// Derin URL'ler (/urunler/..., /blog/..., /teklif) doğrudan istendiğinde
// GitHub Pages bunlara karşılık gelen bir dosya bulamaz, 404.html'i HTTP 404
// durum koduyla döndürür. Googlebot 404 gördüğü için bu sayfaları indekslemez.
//
// Çözüm: Bilinen her route için dist/<yol>/index.html üret. Böylece her URL
// HTTP 200 ve sayfaya özel doğru <title>/description/canonical/OG meta ile
// yanıt verir. SPA bundle yine yüklenir ve gövdeyi hidrate eder; Google ise
// hem doğru status kodunu hem de doğru meta etiketlerini anında görür.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const distDir = resolve(root, 'dist')

// Kaynaktaki tek doğruluk noktasından (config + TR içerik) route meta'sını al.
const { SITE, PRODUCT_META, BLOG_SLUGS } = await import(
  pathToFileURL(resolve(root, 'src/config.js')).href
)
const { default: tr } = await import(
  pathToFileURL(resolve(root, 'src/i18n/content/tr.js')).href
)

// Seo.jsx ile aynı başlık biçimi: "<sayfa> | <site>".
const fullTitle = (title) => (title ? `${title} | ${SITE.name}` : SITE.name)

// Prerender edilecek route'lar. ("/" kökü vite'ın ürettiği index.html ile
// zaten doğru ana sayfa meta'sına sahip, ona dokunmuyoruz.)
const routes = []

for (const p of PRODUCT_META) {
  const item = tr.products.items[p.id]
  if (!item) continue
  routes.push({
    path: `/urunler/${p.slug}`,
    title: fullTitle(item.name),
    description: item.summary,
  })
}

routes.push({
  path: '/blog',
  title: fullTitle(tr.seo.blogList.title),
  description: tr.seo.blogList.desc,
})

for (const slug of BLOG_SLUGS) {
  const post = tr.blog.posts[slug]
  if (!post) continue
  routes.push({
    path: `/blog/${slug}`,
    title: fullTitle(post.title),
    description: post.excerpt,
  })
}

routes.push({
  path: '/teklif',
  title: fullTitle(tr.seo.quote.title),
  description: tr.seo.quote.desc,
})

// HTML attribute değeri için kaçış.
const attr = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

// <title> içi metin için kaçış.
const text = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const template = readFileSync(resolve(distDir, 'index.html'), 'utf8')

// index.html içindeki ilgili etiketi sayfaya özel değerle değiştir.
// Her etiket "/>" veya ">" ile bittiği ve değerleri bunu içermediği için
// non-greedy eşleşme güvenli.
function applyMeta(html, { path, title, description }) {
  // Seo.jsx ile aynı normalize: nihai (slash'lı) URL ile eşleş.
  const normPath = path === '/' ? path : path.replace(/\/?$/, '/')
  const url = `${SITE.url}${normPath}`
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${text(title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${attr(description)}" />`,
    )
    .replace(
      /<link rel="canonical"[\s\S]*?\/>/,
      `<link rel="canonical" href="${attr(url)}" />`,
    )
    .replace(
      /<meta property="og:title"[\s\S]*?\/>/,
      `<meta property="og:title" content="${attr(title)}" />`,
    )
    .replace(
      /<meta property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${attr(description)}" />`,
    )
    .replace(
      /<meta property="og:url"[\s\S]*?\/>/,
      `<meta property="og:url" content="${attr(url)}" />`,
    )
}

let count = 0
for (const route of routes) {
  const outDir = resolve(distDir, `.${route.path}`)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(resolve(outDir, 'index.html'), applyMeta(template, route), 'utf8')
  count++
}

console.log(`[prerender] ${count} route için statik HTML üretildi.`)
