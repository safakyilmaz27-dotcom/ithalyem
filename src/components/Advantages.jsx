import { Truck, FlaskConical, MapPin } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

const ICONS = [Truck, FlaskConical, MapPin]

export default function Advantages() {
  const { c } = useLang()
  const a = c.advantages

  return (
    <section id="avantajlar" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-forest-700">
            {a.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-800 sm:text-4xl">{a.title}</h2>
          <p className="mt-4 text-lg text-slate-600">{a.desc}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {a.items.map((item, i) => {
            const Icon = ICONS[i] || Truck
            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-forest-700/30 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-forest-800 text-gold-400 transition group-hover:bg-forest-900">
                  <Icon size={28} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-navy-800">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{item.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
