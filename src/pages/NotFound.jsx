import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Seo from '../components/Seo'
import { useLang } from '../i18n/LanguageContext'

export default function NotFound() {
  const { c } = useLang()
  const n = c.notFound
  return (
    <div className="mx-auto max-w-2xl px-4 py-28 text-center">
      <Seo title={n.title} />
      <div className="text-6xl font-extrabold text-brand-700">{n.code}</div>
      <h1 className="mt-4 text-3xl font-extrabold text-navy-800">{n.title}</h1>
      <p className="mt-4 text-slate-600">{n.text}</p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white transition hover:bg-brand-800"
      >
        <ArrowLeft size={18} className="rtl:rotate-180" /> {n.home}
      </Link>
    </div>
  )
}
