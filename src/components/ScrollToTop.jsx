import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Route değişiminde sayfayı başa kaydırır. Hash (#anchor) varsa, ilgili
// section'a kaydırır — böylece alt sayfalardan ana sayfa bölümlerine geçiş çalışır.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Hedef element route geçişinden sonra mount olabileceği için bir tık bekle.
      const id = hash.replace('#', '')
      const scroll = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
      const t = setTimeout(scroll, 50)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
