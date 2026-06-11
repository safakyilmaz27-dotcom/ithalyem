import { useState } from 'react'
import { Send, Phone, Mail, MessageCircle, CheckCircle2 } from 'lucide-react'
import { SITE, PRODUCTS, waLink } from '../config'

const EMPTY = { name: '', company: '', phone: '', product: '', tonnage: '', note: '' }

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg =
      `Yeni Teklif Talebi%0A` +
      `Ad Soyad: ${form.name}%0A` +
      `Şirket: ${form.company}%0A` +
      `Telefon: ${form.phone}%0A` +
      `Ürün: ${form.product}%0A` +
      `Tonaj: ${form.tonnage}%0A` +
      `Not: ${form.note || '-'}`
    window.open(`https://wa.me/${SITE.whatsapp}?text=${msg}`, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <section id="iletisim" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Sol bilgi sütunu */}
          <div className="lg:col-span-2">
            <span className="text-sm font-bold uppercase tracking-wider text-forest-700">
              Teklif &amp; İletişim
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-800 sm:text-4xl">
              Hızlı Teklif Alın
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              İhtiyacınız olan ürün ve tonajı bildirin, ekibimiz en kısa sürede güncel
              fiyat ve teslimat şartlarıyla size dönsün.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-forest-700/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-800 text-white">
                  <Phone size={20} />
                </span>
                <div>
                  <div className="text-xs text-slate-500">Telefon</div>
                  <div className="font-semibold text-navy-800">{SITE.phoneDisplay}</div>
                </div>
              </a>

              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-forest-700/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-800 text-white">
                  <Mail size={20} />
                </span>
                <div>
                  <div className="text-xs text-slate-500">E-posta</div>
                  <div className="font-semibold text-navy-800">{SITE.email}</div>
                </div>
              </a>

              <a
                href={waLink('Merhaba, teklif almak istiyorum.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl bg-green-600 p-4 text-white transition hover:bg-green-700"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/20">
                  <MessageCircle size={20} />
                </span>
                <div>
                  <div className="text-xs text-green-50">Anında Yazışma</div>
                  <div className="font-semibold">WhatsApp Hattı</div>
                </div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 size={56} className="text-green-600" />
                  <h3 className="mt-4 text-2xl font-bold text-navy-800">Talebiniz Hazır!</h3>
                  <p className="mt-2 max-w-md text-slate-600">
                    WhatsApp üzerinden talebinizi iletmek üzere yönlendirildiniz. Pencere
                    açılmadıysa aşağıdaki butonu kullanabilirsiniz.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 rounded-lg border border-navy-800 px-5 py-2.5 text-sm font-semibold text-navy-800 transition hover:bg-navy-800 hover:text-white"
                  >
                    Yeni Teklif Oluştur
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Ad Soyad" name="name" value={form.name} onChange={update} required placeholder="Adınız Soyadınız" />
                    <Field label="Şirket Adı" name="company" value={form.company} onChange={update} placeholder="Firma / İşletme adı" />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Telefon" name="phone" type="tel" value={form.phone} onChange={update} required placeholder="05XX XXX XX XX" />
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-navy-800">
                        İlgilendiğiniz Ürün <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="product"
                        value={form.product}
                        onChange={update}
                        required
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-700 outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20"
                      >
                        <option value="" disabled>Ürün seçiniz</option>
                        {PRODUCTS.map((p) => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Field label="Talep Edilen Tonaj" name="tonnage" value={form.tonnage} onChange={update} required placeholder="Örn: 50 ton" />

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-navy-800">
                      Eklemek İstedikleriniz
                    </label>
                    <textarea
                      name="note"
                      value={form.note}
                      onChange={update}
                      rows={3}
                      placeholder="Teslimat ili, termin veya diğer notlarınız..."
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-700 outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest-800 px-6 py-3.5 text-base font-bold text-white transition hover:bg-forest-900"
                  >
                    <Send size={19} /> Teklif Talebini Gönder
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    Talebiniz WhatsApp üzerinden ekibimize iletilir. Bilgileriniz üçüncü
                    kişilerle paylaşılmaz.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, value, onChange, type = 'text', required, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-navy-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-700 outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20"
      />
    </div>
  )
}
