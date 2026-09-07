import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// Blog yazıları, ürün sayfası gövdeleri ve bölge sayfaları için ortak blok
// renderer'ı. Blok tipleri:
//
//   { type: 'h2' | 'h3', text }
//   { type: 'p', text }                       → metin içinde [etiket](/yol) linki
//   { type: 'ul', items: [text, ...] }
//   { type: 'note', text }                    → vurgulu bilgi kutusu
//   { type: 'table', head: [...], rows: [[...], ...] }
//
// Paragraf, liste ve tablo hücrelerindeki metinlerde markdown biçiminde iç
// bağlantı yazılabilir: "[Teklif İste](/teklif) sayfasından ulaşın".
// Site içi yollar <Link> ile, http(s) ile başlayanlar <a> ile render edilir.

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g

export function inline(text) {
  if (typeof text !== 'string') return text
  const out = []
  let last = 0
  let m
  LINK_RE.lastIndex = 0
  while ((m = LINK_RE.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const [, label, href] = m
    out.push(
      href.startsWith('http') ? (
        <a
          key={`${m.index}-${href}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
        >
          {label}
        </a>
      ) : (
        <Link
          key={`${m.index}-${href}`}
          to={href}
          className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
        >
          {label}
        </Link>
      ),
    )
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out.map((part, i) => <Fragment key={i}>{part}</Fragment>)
}

export default function RichText({ blocks, className = '' }) {
  if (!blocks?.length) return null

  return (
    <div className={`space-y-5 ${className}`}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2 key={i} className="pt-4 text-2xl font-extrabold text-navy-800">
                {block.text}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={i} className="pt-2 text-xl font-bold text-navy-800">
                {block.text}
              </h3>
            )
          case 'ul':
            return (
              <ul key={i} className="list-disc space-y-2 ps-6 text-lg leading-relaxed text-slate-700">
                {block.items.map((item, j) => (
                  <li key={j}>{inline(item)}</li>
                ))}
              </ul>
            )
          case 'note':
            return (
              <p
                key={i}
                className="rounded-xl border-s-4 border-brand-700 bg-brand-50 p-5 text-lg leading-relaxed text-navy-800"
              >
                {inline(block.text)}
              </p>
            )
          case 'table':
            return (
              <div key={i} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                <table className="min-w-full overflow-hidden rounded-xl border border-slate-200 text-sm">
                  {block.head && (
                    <thead className="bg-navy-800 text-white">
                      <tr>
                        {block.head.map((h) => (
                          <th key={h} className="px-5 py-3 text-start font-bold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className={r % 2 ? 'bg-slate-50' : 'bg-white'}>
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={
                              ci === 0
                                ? 'px-5 py-3.5 font-semibold text-navy-800'
                                : 'px-5 py-3.5 text-slate-700'
                            }
                          >
                            {inline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          default:
            return (
              <p key={i} className="text-lg leading-relaxed text-slate-700">
                {inline(block.text)}
              </p>
            )
        }
      })}
    </div>
  )
}
