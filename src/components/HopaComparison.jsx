import { CheckCircle2, Anchor } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

// Hopa güzergah avantajı karşılaştırma tablosu.
export default function HopaComparison() {
  const { c } = useLang()
  const h = c.hopa

  return (
    <section id="hopa-avantaji" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-700">
            <Anchor size={16} /> {h.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-800 sm:text-4xl">{h.title}</h2>
          <p className="mt-4 text-lg text-slate-600">{h.desc}</p>
        </div>

        <div className="mt-12 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="min-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-sm shadow-sm">
            <thead>
              <tr className="bg-navy-800 text-start text-white">
                <th className="whitespace-nowrap px-5 py-4 font-semibold">{h.cols.route}</th>
                <th className="whitespace-nowrap px-5 py-4 font-semibold">{h.cols.port}</th>
                <th className="px-5 py-4 font-semibold">{h.cols.transport}</th>
              </tr>
            </thead>
            <tbody>
              {h.rows.map((row, i) => {
                const best = i === 0
                return (
                  <tr
                    key={row.route}
                    className={`border-t border-slate-100 ${best ? 'bg-brand-50' : ''}`}
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-bold text-navy-800">
                      <span className="inline-flex items-center gap-2">
                        {best && (
                          <CheckCircle2 size={18} className="shrink-0 text-brand-700" />
                        )}
                        {row.route}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-700">
                      {row.port}
                    </td>
                    <td
                      className={`px-5 py-4 ${
                        best ? 'font-semibold text-brand-700' : 'text-slate-600'
                      }`}
                    >
                      {row.transport}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
