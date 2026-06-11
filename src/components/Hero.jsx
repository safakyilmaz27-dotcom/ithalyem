import { Package, MessageCircle, ShieldCheck } from 'lucide-react'
import { waLink } from '../config'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest-900">
      {/* Arka plan görsel katmanı + overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2000&q=80')",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-forest-900/95 via-forest-900/85 to-navy-900/90" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-sm font-medium text-gold-400">
            <ShieldCheck size={16} />
            Orta Asya Menşeli · Güvenilir Tedarik
          </span>

          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Orta Asya'nın En Kaliteli Yem Ham Maddeleri{' '}
            <span className="text-gold-400">Doğu Anadolu'da!</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">
            Özellikle{' '}
            <strong className="font-semibold text-white">%32 Nişasta</strong> oranına
            sahip ithal kepek ve{' '}
            <strong className="font-semibold text-white">%22.80 proteinli</strong> pamuk
            yağı küspesi ile yem rasyonlarınızı güçlendirin. Doğrudan liman ve depo teslim
            seçenekleriyle.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#urunler"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold-500 px-7 py-3.5 text-base font-bold text-navy-900 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400"
            >
              <Package size={20} />
              Güncel Stok & Fiyatlar
            </a>
            <a
              href={waLink('Merhaba, hızlı teklif almak istiyorum.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-green-900/30 transition hover:bg-green-700"
            >
              <MessageCircle size={20} />
              Hızlı Teklif / WhatsApp
            </a>
          </div>

          {/* Hızlı analiz şeridi */}
          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/15 pt-6">
            {[
              { v: '%32', l: 'Kepek Nişasta' },
              { v: '%36', l: 'ATK Protein' },
              { v: '%22.80', l: 'Küspe Protein' },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-extrabold text-gold-400 sm:text-3xl">{s.v}</div>
                <div className="mt-1 text-xs text-slate-300 sm:text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
