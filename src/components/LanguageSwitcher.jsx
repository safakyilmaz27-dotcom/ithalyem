import { useState, useRef, useEffect } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useLang, LANGS } from '../i18n/LanguageContext'

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Dışarı tıklayınca kapat.
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const current = LANGS.find((l) => l.code === lang) || LANGS[0]

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-11 items-center gap-1.5 rounded-full border border-brand-700/40 bg-brand-50 px-3 py-2 text-sm font-bold text-brand-700 shadow-sm transition hover:bg-brand-100 hover:shadow"
        aria-label="Dil seçimi / Language / اللغة"
        aria-expanded={open}
      >
        <Globe size={17} className="text-brand-700" />
        <span>{current.short}</span>
        <ChevronDown
          size={15}
          className={`text-brand-700/70 transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute end-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
          <div className="border-b border-slate-100 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Globe size={12} /> Dil / Language
            </span>
          </div>
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code)
                setOpen(false)
              }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-brand-50 ${
                l.code === lang ? 'bg-brand-50 font-bold text-brand-700' : 'text-slate-700'
              }`}
            >
              <span className="text-lg leading-none">{l.flag}</span>
              <span className="flex-1 text-start">{l.label}</span>
              {l.code === lang && <Check size={16} className="text-brand-700" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
