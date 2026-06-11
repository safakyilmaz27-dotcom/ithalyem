import { Truck, FlaskConical, MapPin } from 'lucide-react'

const ITEMS = [
  {
    icon: Truck,
    title: 'Güvenli Lojistik ve Tedarik',
    text: "Orta Asya'nın en güvenilir üreticilerinden kesintisiz sevkiyat ile stok güvenliği ve zamanında teslimat.",
  },
  {
    icon: FlaskConical,
    title: 'Yüksek Analiz Değerleri',
    text: '%32 Nişasta oranlı kepek ve %22.80 proteinli küspe ile yem rasyonlarınızda yüksek verim ve verimlilik.',
  },
  {
    icon: MapPin,
    title: "Doğu Anadolu'ya Doğrudan Teslimat",
    text: 'Bölgedeki yem fabrikaları ve büyük çiftliklere doğrudan teslimatla zaman ve maliyet avantajı.',
  },
]

export default function Advantages() {
  return (
    <section id="avantajlar" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-forest-700">
            Neden İthal Yem?
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-800 sm:text-4xl">
            Rakamlarla Güven Veren Tedarik
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Kaliteli ham madde, güvenilir lojistik ve bölgesel teslimat avantajını bir
            arada sunuyoruz.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {ITEMS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-forest-700/30 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-forest-800 text-gold-400 transition group-hover:bg-forest-900">
                <Icon size={28} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-navy-800">{title}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
