import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Boxes, RefreshCw, ArrowRight } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

// Stok durumu rozeti renkleri (durum anahtarına göre).
const BADGE = {
  stokta: 'bg-green-100 text-green-700',
  sinirli: 'bg-amber-100 text-amber-700',
  yolda: 'bg-slate-200 text-slate-600',
}

// "Güncel Stok Durumu" — statik /data/stock.json'dan okur, dile göre çözümler.
// Fiyat gösterilmez; kullanıcı teklif formuna yönlendirilir (B2B).
export default function StockStatus() {
  const { c, lang } = useLang()
  const s = c.stock
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/data/stock.json')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setError(true))
  }, [])

  const cityName = (key) => c.cities.names[key] || key
  const productName = (id) => c.products.items[id]?.name || id

  return (
    <section id="stok" className="bg-brand-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-700">
            <Boxes size={16} /> {s.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-800 sm:text-4xl">{s.title}</h2>
          <p className="mt-4 text-lg text-slate-600">{s.desc}</p>
        </div>

        {error && <p className="mt-12 text-center text-slate-500">{s.error}</p>}
        {!error && !data && <p className="mt-12 text-center text-slate-500">{s.loading}</p>}

        {data && (
          <div className="mt-12">
            {/* Mobilde yatay scroll container */}
            <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <table className="min-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-sm shadow-sm">
                <thead>
                  <tr className="bg-navy-800 text-start text-white">
                    <th className="whitespace-nowrap px-4 py-3.5 font-semibold">{s.cols.urun}</th>
                    <th className="whitespace-nowrap px-4 py-3.5 font-semibold">{s.cols.bolge}</th>
                    <th className="whitespace-nowrap px-4 py-3.5 font-semibold">{s.cols.teslim}</th>
                    <th className="whitespace-nowrap px-4 py-3.5 font-semibold">{s.cols.durum}</th>
                    <th className="whitespace-nowrap px-4 py-3.5 text-end font-semibold">{s.cols.fiyat}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.durumlar.map((row, i) => (
                    <tr key={i} className="border-t border-slate-100 transition hover:bg-brand-50/60">
                      <td className="whitespace-nowrap px-4 py-3.5 font-semibold text-navy-800">
                        {productName(row.id)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-slate-600">
                        {row.regions.map(cityName).join(' / ')}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-slate-500">
                        {s.delivery[row.teslim] || row.teslim}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            BADGE[row.durum] || 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {s.status[row.durum] || row.durum}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-end">
                        <Link
                          to={`/teklif?urun=${encodeURIComponent(productName(row.id))}`}
                          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-brand-700 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-brand-800"
                        >
                          {s.quoteBtn} <ArrowRight size={14} className="rtl:rotate-180" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col items-center justify-center gap-2 text-sm text-slate-500 sm:flex-row sm:gap-4">
              <span className="inline-flex items-center gap-1.5">
                <RefreshCw size={14} />
                {s.lastUpdate}: {data.tarih?.[lang] || data.tarih?.tr || ''}
              </span>
              <span className="hidden sm:inline">·</span>
              <span>{s.note}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
