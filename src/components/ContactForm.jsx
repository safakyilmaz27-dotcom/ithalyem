import { useState } from 'react'
import { Send, Phone, Mail, MessageCircle, CheckCircle2 } from 'lucide-react'
import { SITE, PRODUCT_META, waLink } from '../config'
import { useLang } from '../i18n/LanguageContext'

export default function ContactForm() {
  const { c } = useLang()
  const t = c.contact
  const EMPTY = { name: '', company: '', phone: '', product: '', tonnage: '', note: '' }
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const f = t.waFields
    const msg =
      `${t.waLabel}%0A` +
      `${f.name}: ${form.name}%0A` +
      `${f.company}: ${form.company}%0A` +
      `${f.phone}: ${form.phone}%0A` +
      `${f.product}: ${form.product}%0A` +
      `${f.tonnage}: ${form.tonnage}%0A` +
      `${f.note}: ${form.note || '-'}`
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
              {t.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-800 sm:text-4xl">{t.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{t.desc}</p>

            <div className="mt-8 space-y-4">
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-forest-700/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-800 text-white">
                  <Phone size={20} />
                </span>
                <div>
                  <div className="text-xs text-slate-500">{t.phoneLabel}</div>
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
                  <div className="text-xs text-slate-500">{t.emailLabel}</div>
                  <div className="font-semibold text-navy-800">{SITE.email}</div>
                </div>
              </a>

              <a
                href={waLink(t.wa)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl bg-green-600 p-4 text-white transition hover:bg-green-700"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/20">
                  <MessageCircle size={20} />
                </span>
                <div>
                  <div className="text-xs text-green-50">{t.waSub}</div>
                  <div className="font-semibold">{t.waTitle}</div>
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
                  <h3 className="mt-4 text-2xl font-bold text-navy-800">{t.success.title}</h3>
                  <p className="mt-2 max-w-md text-slate-600">{t.success.text}</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 min-h-11 rounded-lg border border-navy-800 px-5 py-2.5 text-sm font-semibold text-navy-800 transition hover:bg-navy-800 hover:text-white"
                  >
                    {t.success.again}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t.fields.name} name="name" value={form.name} onChange={update} required placeholder={t.placeholders.name} />
                    <Field label={t.fields.company} name="company" value={form.company} onChange={update} placeholder={t.placeholders.company} />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t.fields.phone} name="phone" type="tel" value={form.phone} onChange={update} required placeholder={t.placeholders.phone} />
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-navy-800">
                        {t.fields.product} <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="product"
                        value={form.product}
                        onChange={update}
                        required
                        className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-700 outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20"
                      >
                        <option value="" disabled>{t.productPlaceholder}</option>
                        {PRODUCT_META.map((meta) => {
                          const name = c.products.items[meta.id].name
                          return <option key={meta.id} value={name}>{name}</option>
                        })}
                      </select>
                    </div>
                  </div>

                  <Field label={t.fields.tonnage} name="tonnage" value={form.tonnage} onChange={update} required placeholder={t.placeholders.tonnage} />

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-navy-800">
                      {t.fields.note}
                    </label>
                    <textarea
                      name="note"
                      value={form.note}
                      onChange={update}
                      rows={3}
                      placeholder={t.placeholders.note}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-700 outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-forest-800 px-6 py-3.5 text-base font-bold text-white transition hover:bg-forest-900"
                  >
                    <Send size={19} /> {t.submit}
                  </button>
                  <p className="text-center text-xs text-slate-400">{t.privacy}</p>
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
        className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-700 outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20"
      />
    </div>
  )
}
