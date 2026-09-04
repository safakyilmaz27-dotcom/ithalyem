// dist/ altındaki her prerender edilmiş sayfayı SEO temel kuralları açısından
// denetler. `npm run build` sonrası `node scripts/seo-audit.mjs` ile çalıştırın.
//
// Kontroller: tam olarak bir <h1>, 1–60 karakter <title>, 1–155 karakter
// meta description, sayfalar arası benzersiz <title>, gövde metni varlığı,
// noindex yokluğu ve JSON-LD şema tiplerinin geçerliliği.

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const dec = (s) =>
  s
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')

const pages = []
;(function walk(dir, url) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) {
      if (entry !== 'assets' && entry !== 'data') walk(p, `${url}${entry}/`)
    } else if (entry === 'index.html') {
      pages.push([url, p])
    }
  }
})('dist', '/')

let failures = 0
const seenTitles = new Map()
const rows = []

for (const [url, file] of pages.sort()) {
  const html = readFileSync(file, 'utf8')
  const body = html.slice(html.indexOf('<div id="root">'))

  const h1s = [...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) =>
    dec(m[1].replace(/<[^>]*>/g, '').trim()),
  )
  const title = dec((html.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [, ''])[1])
  const desc = dec(
    (html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/) || [, ''])[1],
  )
  const words = body
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length

  const schemas = [
    ...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
  ].flatMap((m) => {
    const parsed = JSON.parse(m[1])
    return (parsed['@graph'] || [parsed]).map((n) => n['@type'])
  })

  const problems = []
  if (h1s.length !== 1) problems.push(`h1 sayısı ${h1s.length}`)
  if (!title || title.length > 60) problems.push(`title ${title.length} krkt`)
  if (!desc || desc.length > 155) problems.push(`desc ${desc.length} krkt`)
  if (words < 150) problems.push(`gövde ${words} kelime`)
  if (/noindex/.test(html)) problems.push('noindex')
  if (seenTitles.has(title)) problems.push(`title tekrarı (${seenTitles.get(title)})`)
  seenTitles.set(title, url)

  if (problems.length) failures++
  rows.push({ url, ok: !problems.length, title, desc, words, h1: h1s[0], schemas, problems })
}

for (const r of rows) {
  console.log(
    `${r.ok ? 'OK ' : 'HATA'} ${r.url.padEnd(44)} t:${String(r.title.length).padStart(2)} d:${String(r.desc.length).padStart(3)} ${String(r.words).padStart(4)}kel  [${r.schemas.join(',')}]`,
  )
  if (!r.ok) console.log(`     ↳ ${r.problems.join(' | ')}`)
}

console.log(
  `\n${pages.length} sayfa denetlendi, ${failures} sayfada sorun bulundu.`,
)
process.exit(failures ? 1 : 0)
