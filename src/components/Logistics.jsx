import { MapPinned, Building2, Tractor, Anchor } from 'lucide-react'

const CITIES = ['Erzurum', 'Malatya', 'Elazığ', 'Iğdır', 'Kars', 'Van', 'Ağrı', 'Bingöl', 'Muş', 'Erzincan']

const TARGETS = [
  { icon: Building2, label: 'Yem Fabrikaları' },
  { icon: Tractor, label: 'Büyük Çiftlikler' },
  { icon: Anchor, label: 'Entegre Tesisler' },
]

export default function Logistics() {
  return (
    <section id="lojistik" className="bg-navy-800 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3 text-gold-400">
              <MapPinned size={32} />
              <span className="text-sm font-bold uppercase tracking-wider">
                Doğu Anadolu Lojistik &amp; Teslimat
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Bölgenizin Kapısına Kadar Doğrudan Teslimat
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-slate-200">
              <strong className="text-white">Erzurum, Malatya, Kars, Van ve Elazığ</strong>{' '}
              başta olmak üzere tüm Doğu Anadolu bölgesindeki yem fabrikalarına, entegre
              tesislere ve büyük çiftliklere doğrudan lojistik sağlıyoruz. Liman ve depo
              teslim seçenekleriyle aracısız, hızlı ve güvenli tedarik.
            </p>

            <div className="mt-8 flex flex-wrap gap-6">
              {TARGETS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-gold-400">
                    <Icon size={22} />
                  </span>
                  <span className="font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hizmet verilen şehirler kartı */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h3 className="text-lg font-bold text-white">Hizmet Verdiğimiz İller</h3>
            <p className="mt-1 text-sm text-slate-300">
              Doğu Anadolu genelinde aktif teslimat ağı
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {CITIES.map((c) => (
                <span
                  key={c}
                  className="rounded-lg border border-gold-400/30 bg-gold-400/10 px-3.5 py-1.5 text-sm font-medium text-gold-400"
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-7 rounded-xl bg-white/5 p-4 text-sm text-slate-200">
              Listede olmayan bir il mi? Doğu Anadolu ve çevre bölgeler için lütfen
              iletişime geçin — özel sevkiyat planlaması yapıyoruz.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
