import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext'

const tree = (
  <StrictMode>
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  </StrictMode>
)

const container = document.getElementById('root')

// Build çıktısı prerender edilmiş HTML içerir (scripts/prerender.mjs).
// Bu durumda mevcut DOM'u hidrate et; dev sunucusunda kök boş olduğu için
// normal client render'a düş.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
