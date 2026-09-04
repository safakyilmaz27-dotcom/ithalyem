// Build zamanı statik render (SSG) giriş noktası.
//
// scripts/prerender.mjs bu modülü Vite'ın SSR yükleyicisiyle çağırır ve her
// route için hazır HTML gövdesi + <head> etiketleri üretir. Böylece Googlebot
// JS çalıştırmadan da H1, gövde metni ve JSON-LD'yi ilk yanıtta görür.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext'

export function render(url) {
  const helmetContext = {}

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <LanguageProvider>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </LanguageProvider>
    </HelmetProvider>,
  )

  const { helmet } = helmetContext
  // Helmet'in ürettiği head etiketlerini tek bir string olarak topla.
  const head = helmet
    ? [
        helmet.title,
        helmet.meta,
        helmet.link,
        helmet.script,
      ]
        .map((t) => t.toString().trim())
        .filter(Boolean)
        .join('\n    ')
    : ''

  return { html, head }
}
