import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Send, CheckCircle2, ArrowLeft, MessageCircle } from 'lucide-react'
import Seo from '../components/Seo'
import { QUOTE, waLink } from '../config'
import { useLang } from '../i18n/LanguageContext'

export default function QuotePage() {
  const { c } = useLang()
  const q = c.quote
  const [params] = useSearchParams()
  const preselect = params.get('urun')

  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    city: q.cities[0],
    products: preselect && q.products.includes(preselect) ? [preselect] : [],
    amount: '',
    note: '',
  })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const toggleProduct = (name) =>
    setForm((f) => ({
      ...f,
      products: f.products.includes(name)
        ? f.products.filter((p) => p !== name)
        : [...f.products, name],
    }))

  const buildBody = () => {
    const m = q.mailFields
    return [
      `${m.name}: ${form.name}`,
      `${m.company}: ${form.company}`,
      `${m.phone}: ${form.phone}`,
      `${m.city}: ${form.city}`,
      `${m.products}: ${form.products.join(', ') || '-'}`,
      `${m.amount}: ${form.amount || '-'}`,
      `${m.note}: ${form.note || '-'}`,
    ].join('\n')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1) Formspree entegrasyonu (QUOTE.formspreeId doluysa)
    if (QUOTE.formspreeId) {
      setSending(true)
      try {
        const res = await fetch(`https://formspree.io/f/${QUOTE.formspreeId}`, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ad_soyad: form.name,
            firma: form.company,
            telefon: form.phone,
            il: form.city,
            urunler: form.products.join(', '),
            miktar: form.amount,
            not: form.note,
          }),
        })
        setSending(false)
        if (res.ok) {
          setSent(true)
          return
        }
      } catch {
        setSending(false)
      }
    }

    // 2) mailto fallback
    const subject = encodeURIComponent(q.mailSubject)
    const body = encodeURIComponent(buildBody())
    window.location.href = `mailto:${QUOTE.mailto}?subject=${subject}&body=${body}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-28 text-center">
        <Seo title={c.seo.quoteSuccess.title} path="/teklif" description={c.seo.quoteSuccess.desc} />
        <CheckCircle2 size={64} className="mx-auto text-green-600" />
        <h1 className="mt-5 text-3xl font-extrabold text-navy-800">{q.success.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{q.success.text}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white transition hover:bg-brand-800"
          >
            <ArrowLeft size={18} className="rtl:rotate-180" /> {q.success.home}
          </Link>
          <a
            href={waLink(q.wa)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            <MessageCircle size={18} /> {q.success.wa}
          </a>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Seo title={c.seo.quote.title} description={c.seo.quote.desc} path="/teklif" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-brand-700"
        >
          <ArrowLeft size={18} className="rtl:rotate-180" /> {q.back}
        </Link>

        <div className="mt-4 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-700">{q.eyebrow}</span>
          <h1 className="mt-2 text-3xl font-extrabold text-navy-800 sm:text-4xl">{q.title}</h1>
          <p className="mt-3 text-lg text-slate-600">
            {q.descLead}
            <strong className="text-navy-800">{q.minOrder}</strong>.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={q.fields.name} name="name" value={form.name} onChange={update} required placeholder={q.placeholders.name} />
            <Field label={q.fields.company} name="company" value={form.company} onChange={update} required placeholder={q.placeholders.company} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={q.fields.phone} name="phone" type="tel" value={form.phone} onChange={update} required placeholder={q.placeholders.phone} />
            <div>
              <label htmlFor="city" className="mb-1.5 block text-sm font-semibold text-navy-800">
                {q.fields.city}
              </label>
              <select
                id="city"
                name="city"
                value={form.city}
                onChange={update}
                className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-700 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-700/20"
              >
                {q.cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ürün seçimi — checkbox */}
          <div>
            <span className="mb-2 block text-sm font-semibold text-navy-800">{q.fields.products}</span>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {q.products.map((name) => (
                <label
                  key={name}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-brand-700"
                >
                  <input
                    type="checkbox"
                    checked={form.products.includes(name)}
                    onChange={() => toggleProduct(name)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-700 focus:ring-brand-700"
                  />
                  {name}
                </label>
              ))}
            </div>
          </div>

          <Field label={q.fields.amount} name="amount" value={form.amount} onChange={update} placeholder={q.placeholders.amount} />

          <div>
            <label htmlFor="note" className="mb-1.5 block text-sm font-semibold text-navy-800">
              {q.fields.note} <span className="font-normal text-slate-400">{q.optional}</span>
            </label>
            <textarea
              id="note"
              name="note"
              value={form.note}
              onChange={update}
              rows={3}
              placeholder={q.placeholders.note}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-700 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-700/20"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 text-base font-bold text-white transition hover:bg-brand-800 disabled:opacity-60"
          >
            <Send size={19} /> {sending ? q.sending : q.submit}
          </button>
          <p className="text-center text-xs text-slate-400">{q.privacy}</p>
        </form>
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
        className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-700 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-700/20"
      />
    </div>
  )
}
