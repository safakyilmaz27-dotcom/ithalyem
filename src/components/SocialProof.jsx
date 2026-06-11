import { Truck, MapPin, Anchor, FileCheck2 } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

const ICONS = [Truck, MapPin, Anchor, FileCheck2]

export default function SocialProof() {
  const { c } = useLang()
  const s = c.social

  return (
    <section id="referanslar" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-700">
            {s.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-800 sm:text-4xl">{s.title}</h2>
          <p className="mt-4 text-lg text-slate-600">{s.desc}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map((item, i) => {
            const Icon = ICONS[i] || Truck
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-brand-50/40 p-7 text-center transition hover:border-brand-700/30 hover:shadow-lg"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-brand-700 text-white">
                  <Icon size={26} />
                </div>
                <div className="mt-5 text-3xl font-extrabold text-brand-700">{item.stat}</div>
                <h3 className="mt-2 text-base font-bold text-navy-800">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
