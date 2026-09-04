import { createContext, useContext, useEffect, useState } from 'react'
import tr from './content/tr'
import en from './content/en'
import ar from './content/ar'

const CONTENT = { tr, en, ar }

// Desteklenen diller (switcher sırası). flag = emoji bayrak (cihaz destekliyorsa).
export const LANGS = [
  { code: 'tr', label: 'Türkçe', short: 'TR', flag: '🇹🇷' },
  { code: 'en', label: 'English', short: 'EN', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', short: 'AR', flag: '🇸🇦' },
]

const RTL_LANGS = ['ar']
const STORAGE_KEY = 'ithalyem_lang'

const LanguageCtx = createContext(null)

export function LanguageProvider({ children }) {
  // Build sırasında (prerender) ve ilk client render'da her zaman 'tr' ile
  // başlarız. Kayıtlı dil localStorage'dan mount sonrası okunur; böylece
  // prerender edilmiş HTML ile ilk client render birebir eşleşir ve React
  // hidrasyon uyuşmazlığı oluşmaz.
  const [lang, setLangState] = useState('tr')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved && CONTENT[saved] && saved !== 'tr') setLangState(saved)
    } catch {
      /* localStorage erişilemezse varsayılanda kal */
    }
  }, [])

  // <html lang> ve <html dir> (Arapça için rtl) değerlerini senkronize et.
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr'
  }, [lang])

  const setLang = (code) => {
    if (!CONTENT[code]) return
    setLangState(code)
    try {
      localStorage.setItem(STORAGE_KEY, code)
    } catch {
      /* yoksay */
    }
  }

  const value = {
    lang,
    setLang,
    c: CONTENT[lang],
    dir: RTL_LANGS.includes(lang) ? 'rtl' : 'ltr',
    isRtl: RTL_LANGS.includes(lang),
  }

  return <LanguageCtx.Provider value={value}>{children}</LanguageCtx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => {
  const ctx = useContext(LanguageCtx)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
